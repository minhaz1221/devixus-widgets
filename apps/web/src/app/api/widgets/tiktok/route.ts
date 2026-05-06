import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
}

// 30-minute in-process cache for oEmbed (public profiles)
const oembed_cache = new Map<string, { data: TikTokProfile; expiry: number }>()

interface TikTokVideo {
  id: string
  cover_image_url: string
  caption: string
  views: string
  likes: string
  comments: string
  duration: string
  color: string
}

interface TikTokProfile {
  username: string
  display_name: string
  avatar: string
  follower_count: number
  source: 'api' | 'oembed' | 'mock'
  videos: TikTokVideo[]
  message?: string
}

const COLORS = ['#1a1a2e','#16213e','#0f3460','#533483','#2d2d2d','#1e3a5f','#2d1b69','#0d1b2a','#1a0a2e']

function formatCount(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace('.0', '') + 'M'
  if (n >= 1_000)     return (n / 1_000).toFixed(1).replace('.0', '') + 'K'
  return String(n)
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

function mockVideos(username: string): TikTokVideo[] {
  const seeds = ['a','b','c','d','e','f','g','h','i']
  const captions = [
    'Day in my life as a content creator 🎬 #dayinmylife',
    'This editing trick changed everything ✨ #editing',
    'Studio setup tour 2024 🖥️ #setup #studio',
    'POV: You finally nailed the transition 🔥',
    'My top 3 apps for creators 📱 #apps #creator',
    'Behind the scenes of a viral video 👀 #bts',
    'Morning routine for productivity ☀️ #routine',
    'Realistic vs expectation 😂 #funny #relatable',
    'How I grew to 80k followers 📈 #growthtips',
  ]
  const viewNums  = [125000,892000,45000,234000,67000,1200000,34000,445000,156000]
  const likeNums  = [8900,67000,3400,19800,5100,98000,2800,38000,12400]
  const commentNums=[234,1203,189,445,312,2340,145,890,678]
  const durSecs   = [32,47,62,15,58,75,45,22,123]

  return seeds.map((seed, i) => ({
    id:              `${username}_${seed}`,
    cover_image_url: `https://picsum.photos/seed/${username}${seed}/360/640`,
    caption:         captions[i],
    views:           formatCount(viewNums[i]),
    likes:           formatCount(likeNums[i]),
    comments:        formatCount(commentNums[i]),
    duration:        formatDuration(durSecs[i]),
    color:           COLORS[i % COLORS.length],
  }))
}

async function fetchOEmbed(username: string): Promise<Partial<TikTokProfile> | null> {
  try {
    const res = await fetch(
      `https://www.tiktok.com/oembed?url=${encodeURIComponent(`https://www.tiktok.com/@${username}`)}`,
      { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Devixus/1.0)', Accept: 'application/json' },
        signal: AbortSignal.timeout(6000) }
    )
    if (!res.ok) return null
    const d = await res.json()
    return {
      display_name: d.author_name || username,
      avatar:       d.thumbnail_url || `https://i.pravatar.cc/150?u=${username}`,
    }
  } catch { return null }
}

// Fetch real videos from TikTok API using stored access token
async function fetchConnectedVideos(accessToken: string): Promise<TikTokVideo[]> {
  const res = await fetch('https://open.tiktokapis.com/v2/video/list/', {
    method: 'POST',
    headers: {
      Authorization:  `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      max_count: 20,
      fields: ['id','title','cover_image_url','share_url','view_count','like_count','comment_count','duration','create_time'],
    }),
    signal: AbortSignal.timeout(10000),
  })
  if (!res.ok) throw new Error(`TikTok API ${res.status}`)
  const data = await res.json() as { data?: { videos?: Array<Record<string,unknown>> }; error?: { code: number } }
  if (data.error && data.error.code !== 0) throw new Error(`TikTok error ${data.error.code}`)

  return ((data.data?.videos ?? []) as Array<Record<string,unknown>>).map((v, i) => ({
    id:              String(v.id ?? i),
    cover_image_url: String(v.cover_image_url ?? ''),
    caption:         String(v.title ?? ''),
    views:           formatCount(Number(v.view_count ?? 0)),
    likes:           formatCount(Number(v.like_count ?? 0)),
    comments:        formatCount(Number(v.comment_count ?? 0)),
    duration:        formatDuration(Number(v.duration ?? 0)),
    color:           COLORS[i % COLORS.length],
  }))
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const mode = searchParams.get('mode') ?? 'public'

  // ── MODE: connected account (uses stored OAuth token) ────────────────────
  if (mode === 'connected') {
    try {
      const supabase = await createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

      const { data: conn, error: connErr } = await supabase
        .from('user_connections')
        .select('access_token, open_id, expires_at, profile_data')
        .eq('user_id', user.id)
        .eq('platform', 'tiktok')
        .single()

      if (connErr || !conn) {
        return NextResponse.json({ connected: false }, { headers: CORS })
      }

      const profile = (conn.profile_data ?? {}) as Record<string, unknown>
      let videos: TikTokVideo[] = []
      let apiError: string | null = null

      try {
        videos = await fetchConnectedVideos(conn.access_token as string)
      } catch (err) {
        apiError = err instanceof Error ? err.message : 'API error'
      }

      const result: TikTokProfile & { connected: boolean; api_error?: string } = {
        connected:     true,
        username:      String(profile.display_name ?? ''),
        display_name:  String(profile.display_name ?? ''),
        avatar:        String(profile.avatar_url ?? ''),
        follower_count: Number(profile.follower_count ?? 0),
        source:        'api',
        videos:        videos.length ? videos : mockVideos(String(profile.display_name ?? 'you')),
        ...(apiError ? { api_error: apiError } : {}),
      }

      return NextResponse.json(result, { headers: { ...CORS, 'x-data-source': 'api' } })
    } catch {
      return NextResponse.json({ error: 'Internal error' }, { status: 500, headers: CORS })
    }
  }

  // ── MODE: check connection status only ────────────────────────────────────
  if (mode === 'check') {
    try {
      const supabase = await createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return NextResponse.json({ connected: false }, { headers: CORS })

      const { data: conn } = await supabase
        .from('user_connections')
        .select('open_id, profile_data')
        .eq('user_id', user.id)
        .eq('platform', 'tiktok')
        .single()

      if (!conn) return NextResponse.json({ connected: false }, { headers: CORS })
      const profile = (conn.profile_data ?? {}) as Record<string, unknown>
      return NextResponse.json({
        connected:    true,
        display_name: profile.display_name ?? '',
        avatar:       profile.avatar_url ?? '',
        follower_count: profile.follower_count ?? 0,
      }, { headers: CORS })
    } catch {
      return NextResponse.json({ connected: false }, { headers: CORS })
    }
  }

  // ── MODE: disconnect ───────────────────────────────────────────────────────
  if (mode === 'disconnect') {
    try {
      const supabase = await createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      await supabase.from('user_connections').delete().eq('user_id', user.id).eq('platform', 'tiktok')
      return NextResponse.json({ disconnected: true }, { headers: CORS })
    } catch {
      return NextResponse.json({ error: 'Internal error' }, { status: 500, headers: CORS })
    }
  }

  // ── MODE: public profile (oEmbed + mock videos) ───────────────────────────
  const raw      = searchParams.get('username') ?? 'creativestudio'
  const username = raw.replace(/^@/, '').replace(/.*tiktok\.com\/@?/, '').split('?')[0].trim() || raw

  const cached = oembed_cache.get(username)
  if (cached && cached.expiry > Date.now()) {
    return NextResponse.json(cached.data, { headers: { ...CORS, 'x-data-source': cached.data.source, 'x-cache': 'hit' } })
  }

  const oembedData = await fetchOEmbed(username)
  const profile: TikTokProfile = {
    username,
    display_name:  oembedData?.display_name ?? username,
    avatar:        oembedData?.avatar ?? `https://i.pravatar.cc/150?u=${username}`,
    follower_count: 0,
    source:        oembedData ? 'oembed' : 'mock',
    videos:        mockVideos(username),
    message:       'Public profiles show sample videos. Connect your TikTok account to display your real videos.',
  }

  oembed_cache.set(username, { data: profile, expiry: Date.now() + 1_800_000 })
  return NextResponse.json(profile, { headers: { ...CORS, 'x-data-source': profile.source } })
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS })
}

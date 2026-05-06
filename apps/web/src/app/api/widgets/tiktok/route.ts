import { NextRequest, NextResponse } from 'next/server'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
}

// 1-hour in-process cache to avoid hammering TikTok
const cache = new Map<string, { data: TikTokProfile; expiry: number }>()

interface TikTokProfile {
  username: string
  display_name: string
  avatar: string
  followers: number
  following: number
  likes: number
  bio: string
  source: 'oembed' | 'mock'
  videos: TikTokVideo[]
}

interface TikTokVideo {
  id: string
  thumbnail: string
  caption: string
  views: number
  likes: number
  comments: number
  shares: number
  duration: string
  timestamp: string
}

function mockVideos(username: string): TikTokVideo[] {
  const seeds = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']
  const captions = [
    `Day in my life as a content creator 🎬 #dayinmylife`,
    `This editing trick changed everything ✨ #editing`,
    `Studio setup tour 2024 🖥️ #setup #studio`,
    `POV: You finally nailed the transition 🔥`,
    `My top 3 apps for creators 📱 #apps #creator`,
    `Behind the scenes of a viral video 👀 #bts`,
    `Morning routine for productivity ☀️ #routine`,
    `Realistic vs expectation 😂 #funny #relatable`,
    `How I grew to 80k followers 📈 #growthtips`,
  ]
  const views   = [125000, 892000, 45000, 234000, 67000, 1200000, 34000, 445000, 156000]
  const likes   = [8900, 67000, 3400, 19800, 5100, 98000, 2800, 38000, 12400]
  const comments = [234, 1203, 189, 445, 312, 2340, 145, 890, 678]
  const shares  = [156, 4500, 78, 890, 234, 8900, 67, 2300, 1200]
  const durations = ['0:32', '0:47', '1:02', '0:15', '0:58', '1:15', '0:45', '0:22', '2:03']

  return seeds.map((seed, i) => ({
    id: `${username}_${seed}`,
    thumbnail: `https://picsum.photos/seed/${username}${seed}/360/640`,
    caption: captions[i],
    views: views[i],
    likes: likes[i],
    comments: comments[i],
    shares: shares[i],
    duration: durations[i],
    timestamp: new Date(Date.now() - (i + 1) * 86400000).toISOString(),
  }))
}

async function fetchOEmbed(username: string): Promise<Partial<TikTokProfile> | null> {
  try {
    const profileUrl = `https://www.tiktok.com/@${username}`
    const res = await fetch(
      `https://www.tiktok.com/oembed?url=${encodeURIComponent(profileUrl)}`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; Devixus/1.0)',
          'Accept': 'application/json',
        },
        signal: AbortSignal.timeout(6000),
      }
    )
    if (!res.ok) return null
    const data = await res.json()
    return {
      display_name: data.author_name || username,
      avatar: data.thumbnail_url || `https://i.pravatar.cc/150?u=${username}`,
    }
  } catch {
    return null
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const raw = searchParams.get('username') || 'creativestudio'
  const username = raw.replace(/^@/, '').replace(/.*tiktok\.com\/@?/, '').split('?')[0].trim() || raw

  const cached = cache.get(username)
  if (cached && cached.expiry > Date.now()) {
    return NextResponse.json(cached.data, {
      headers: { ...CORS_HEADERS, 'x-data-source': cached.data.source, 'x-cache': 'hit' },
    })
  }

  // Try oEmbed for real profile info
  const oembedData = await fetchOEmbed(username)

  const profile: TikTokProfile = {
    username,
    display_name: oembedData?.display_name ?? username,
    avatar: oembedData?.avatar ?? `https://i.pravatar.cc/150?u=${username}`,
    followers: 84500,
    following: 312,
    likes: 1200000,
    bio: '🎬 Video Creator | Daily Content',
    source: oembedData ? 'oembed' : 'mock',
    videos: mockVideos(username),
  }

  // Cache for 1 hour
  cache.set(username, { data: profile, expiry: Date.now() + 3_600_000 })

  return NextResponse.json(profile, {
    headers: { ...CORS_HEADERS, 'x-data-source': profile.source },
  })
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS })
}

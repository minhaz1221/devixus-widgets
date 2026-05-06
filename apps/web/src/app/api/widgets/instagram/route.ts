import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'x-data-source': 'mock-pending-approval',
}

// Realistic post seeds — consistent per-username via seed param
function makePosts(username: string) {
  const seeds = ['a','b','c','d','e','f','g','h','i']
  const captions = [
    'Beautiful morning in the city ☀️ #photography #urban',
    'Golden hour magic 🌄 #nature #sunset',
    'Coffee and code ☕ #developer #worklife',
    'Weekend vibes 🎉 #weekend #lifestyle',
    'Travel diary ep.3 ✈️ #travel #adventure',
    'Street food tour 🍜 #food #culture',
    'Morning run 🏃 #fitness #health',
    'Studio session 🎵 #music #creative',
    'Behind the scenes 🎬 #bts #content',
  ]
  const likeCounts    = [1204, 893, 2341, 567, 1876, 3201, 445, 987, 1543]
  const commentCounts = [43, 21, 87, 12, 65, 102, 8, 34, 56]
  const types = ['image','image','video','image','video','image','image','video','image'] as const

  return seeds.map((seed, i) => ({
    id:        `${username}_${seed}`,
    type:      types[i],
    thumbnail: `https://picsum.photos/seed/${username}${seed}/400/400`,
    caption:   captions[i],
    likes:     likeCounts[i],
    comments:  commentCounts[i],
    timestamp: new Date(Date.now() - (i + 1) * 86_400_000 * 3).toISOString(),
  }))
}

function followerEstimate(username: string): number {
  // deterministic pseudo-random based on username length
  const base = (username.length * 3_741 + username.charCodeAt(0) * 997) % 90_000
  return base + 10_000
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const username = (searchParams.get('username') ?? 'yourhandle').replace(/^@/, '').trim() || 'yourhandle'

  // Waitlist join action
  if (searchParams.get('action') === 'waitlist') {
    try {
      const supabase = await createClient()
      const { data: { user } } = await supabase.auth.getUser()
      await supabase.from('api_waitlist').upsert(
        {
          user_id:  user?.id ?? null,
          platform: 'instagram',
          username,
          email:    user?.email ?? searchParams.get('email') ?? null,
        },
        { onConflict: 'user_id,platform' }
      )
    } catch { /* waitlist is best-effort */ }
    return NextResponse.json({ joined: true }, { headers: CORS })
  }

  const followers = followerEstimate(username)

  return NextResponse.json(
    {
      username,
      full_name:       username.charAt(0).toUpperCase() + username.slice(1).replace(/[._-]/g, ' '),
      profile_picture: `https://i.pravatar.cc/150?u=${username}`,
      followers,
      following:       Math.floor(followers * 0.07),
      bio:             '📸 Content Creator | Sharing moments that matter',
      posts:           makePosts(username),
      is_mock:         true,
      is_pending:      true,
      message:         'Instagram API approval pending — showing sample content. Your widget will display real posts once approved.',
    },
    { headers: CORS }
  )
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, OPTIONS' },
  })
}

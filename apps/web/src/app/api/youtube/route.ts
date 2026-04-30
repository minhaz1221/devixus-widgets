import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const YT_BASE = 'https://www.googleapis.com/youtube/v3'

function formatCount(n: string | undefined): string {
  if (!n) return ''
  const num = parseInt(n, 10)
  if (isNaN(num)) return ''
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`
  return n
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const channelId = searchParams.get('channel_id')
  const maxResults = Math.min(parseInt(searchParams.get('max_results') ?? '6'), 50)

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
  }

  if (!channelId) {
    return NextResponse.json(
      { error: 'channel_id is required' },
      { status: 400, headers: corsHeaders }
    )
  }

  const apiKey = process.env.YOUTUBE_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      { error: 'YouTube API not configured' },
      { status: 500, headers: corsHeaders }
    )
  }

  try {
    const [videosRes, channelRes] = await Promise.all([
      fetch(
        `${YT_BASE}/search?part=snippet&channelId=${channelId}&maxResults=${maxResults}&order=date&type=video&key=${apiKey}`
      ),
      fetch(
        `${YT_BASE}/channels?part=snippet,statistics&id=${channelId}&key=${apiKey}`
      ),
    ])

    if (!videosRes.ok || !channelRes.ok) {
      throw new Error('YouTube API request failed')
    }

    const [videosData, channelData] = await Promise.all([
      videosRes.json(),
      channelRes.json(),
    ])

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const channelItem = channelData.items?.[0] as any
    const channel = channelItem
      ? {
          id: channelItem.id as string,
          name: (channelItem.snippet?.title ?? '') as string,
          avatar: (channelItem.snippet?.thumbnails?.default?.url ?? '') as string,
          subscriber_count: formatCount(channelItem.statistics?.subscriberCount),
          video_count: formatCount(channelItem.statistics?.videoCount),
        }
      : null

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const videos = ((videosData.items ?? []) as any[]).map((item) => ({
      id: (item.id?.videoId ?? '') as string,
      title: (item.snippet?.title ?? '') as string,
      description: (item.snippet?.description ?? '') as string,
      thumbnail: (
        item.snippet?.thumbnails?.medium?.url ??
        item.snippet?.thumbnails?.default?.url ??
        ''
      ) as string,
      url: `https://www.youtube.com/watch?v=${item.id?.videoId ?? ''}`,
      published_at: (item.snippet?.publishedAt ?? '') as string,
      view_count: '',
    }))

    return NextResponse.json({ channel, videos }, { headers: corsHeaders })
  } catch (error) {
    console.error('YouTube API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch YouTube data' },
      { status: 500, headers: corsHeaders }
    )
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
    },
  })
}

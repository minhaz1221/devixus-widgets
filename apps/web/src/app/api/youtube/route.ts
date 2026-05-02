import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const YT_BASE = 'https://www.googleapis.com/youtube/v3'

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
}

function formatCount(n: string | undefined): string {
  if (!n) return ''
  const num = parseInt(n, 10)
  if (isNaN(num)) return ''
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`
  return n
}

// Mock data for preview when no channel is configured or API key is missing
const MOCK_CHANNEL = {
  id: 'MOCK',
  name: 'Your YouTube Channel',
  avatar: '',
  subscriber_count: '10K',
  video_count: '50',
}

const MOCK_VIDEOS = Array.from({ length: 12 }, (_, i) => ({
  id: `mock-${i}`,
  title: [
    'How to Get Started with Your Channel',
    'Top 10 Tips for Content Creators',
    'Behind the Scenes: Our Latest Project',
    'Q&A — Your Questions Answered',
    'Weekly Vlog — What We Did This Week',
    'Tutorial: Step-by-Step Guide',
    'Product Review — Is It Worth It?',
    'Live Stream Highlights',
    'Interview with Industry Expert',
    'Full Documentary — 2024 Edition',
    'Reaction Video — Trending Now',
    'Monthly Update — What\'s New',
  ][i],
  description: 'This is a sample video description for the preview.',
  thumbnail: '',
  url: '#',
  published_at: new Date(Date.now() - i * 2 * 86400000).toISOString(),
  view_count: '',
}))

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const channelId = searchParams.get('channel_id')
  const maxResults = Math.min(parseInt(searchParams.get('max_results') ?? '6'), 50)

  // No channel configured — return mock data for preview
  if (!channelId) {
    return NextResponse.json(
      { channel: MOCK_CHANNEL, videos: MOCK_VIDEOS.slice(0, maxResults), is_mock: true },
      { headers: CORS }
    )
  }

  const apiKey = process.env.YOUTUBE_API_KEY
  // No API key — return mock data so the widget still renders
  if (!apiKey) {
    return NextResponse.json(
      { channel: MOCK_CHANNEL, videos: MOCK_VIDEOS.slice(0, maxResults), is_mock: true },
      { headers: CORS }
    )
  }

  try {
    // Videos fetch is required — uses search.list which is broadly allowed
    const videosRes = await fetch(
      `${YT_BASE}/search?part=snippet&channelId=${channelId}&maxResults=${maxResults}&order=date&type=video&key=${apiKey}`
    )
    const videosData = await videosRes.json()

    // Check for YouTube API error in response body (API can return 200 with an error body)
    if (videosData.error) {
      return NextResponse.json(
        { channel: MOCK_CHANNEL, videos: MOCK_VIDEOS.slice(0, maxResults), is_mock: true, api_error: videosData.error.message },
        { headers: CORS }
      )
    }

    // Channel info fetch is optional — channels.list may be restricted on some API keys
    let channel: typeof MOCK_CHANNEL | null = null
    try {
      const channelRes = await fetch(
        `${YT_BASE}/channels?part=snippet,statistics&id=${channelId}&key=${apiKey}`
      )
      const channelData = await channelRes.json()
      if (!channelData.error && channelData.items?.[0]) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const item = channelData.items[0] as any
        channel = {
          id: item.id as string,
          name: (item.snippet?.title ?? '') as string,
          avatar: (item.snippet?.thumbnails?.default?.url ?? '') as string,
          subscriber_count: formatCount(item.statistics?.subscriberCount),
          video_count: formatCount(item.statistics?.videoCount),
        }
      }
    } catch {
      // channel info is optional — proceed without it
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const videos = ((videosData.items ?? []) as any[]).map(item => ({
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

    if (videos.length === 0) {
      return NextResponse.json(
        { channel, videos: [], is_mock: false },
        { headers: CORS }
      )
    }

    return NextResponse.json({ channel, videos, is_mock: false }, { headers: CORS })
  } catch (error) {
    console.error('YouTube API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch YouTube data' },
      { status: 500, headers: CORS }
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

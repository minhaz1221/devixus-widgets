import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const YT_BASE = 'https://www.googleapis.com/youtube/v3'

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
}

// HTTP-referrer-restricted API keys reject server-side calls with no Referer header.
// Adding this lets calls through when the key allows the app's domain.
const YT_HEADERS = {
  'Referer': 'https://devixus-widgets-web.vercel.app',
  'Origin': 'https://devixus-widgets-web.vercel.app',
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
    // Use playlistItems.list (1 quota unit) instead of search.list (100 quota units).
    // Every YouTube channel has an auto-generated "uploads" playlist: channel UC→ playlist UU.
    const uploadsPlaylistId = `UU${channelId.slice(2)}`
    const videosRes = await fetch(
      `${YT_BASE}/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=${maxResults}&key=${apiKey}`,
      { headers: YT_HEADERS }
    )
    const videosData = await videosRes.json()

    // Check for YouTube API error in response body (API can return 200 with an error body)
    if (videosData.error) {
      const errMsg: string = videosData.error.message ?? 'YouTube API error'
      const isRefererBlocked = videosData.error.errors?.some(
        (e: { reason: string }) => e.reason === 'ipRefererBlocked'
      )
      const userFacingError = isRefererBlocked
        ? 'YouTube API key has HTTP referrer restrictions. In Google Cloud Console, set the key restriction to "IP addresses" or "None" for server-side use.'
        : errMsg
      return NextResponse.json(
        { channel: MOCK_CHANNEL, videos: MOCK_VIDEOS.slice(0, maxResults), is_mock: true, api_error: userFacingError },
        { headers: CORS }
      )
    }

    // Channel info fetch is optional — channels.list may be restricted on some API keys
    let channel: typeof MOCK_CHANNEL | null = null
    try {
      const channelRes = await fetch(
        `${YT_BASE}/channels?part=snippet,statistics&id=${channelId}&key=${apiKey}`,
        { headers: YT_HEADERS }
      )
      const channelData = await channelRes.json()
      if (!channelData.error && channelData.items?.[0]) {
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

    // playlistItems returns resourceId.videoId (not id.videoId like search does)
    const videos = ((videosData.items ?? []) as any[]).map(item => {
      const videoId = (item.snippet?.resourceId?.videoId ?? '') as string
      return {
        id: videoId,
        title: (item.snippet?.title ?? '') as string,
        description: (item.snippet?.description ?? '') as string,
        thumbnail: (
          item.snippet?.thumbnails?.maxres?.url ??
          item.snippet?.thumbnails?.high?.url ??
          item.snippet?.thumbnails?.medium?.url ??
          item.snippet?.thumbnails?.default?.url ??
          ''
        ) as string,
        url: `https://www.youtube.com/watch?v=${videoId}`,
        published_at: (item.snippet?.publishedAt ?? '') as string,
        view_count: '',
      }
    })

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

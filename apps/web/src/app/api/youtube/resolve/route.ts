import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const YT_BASE = 'https://www.googleapis.com/youtube/v3'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get('url')?.trim() ?? ''

  if (!url) {
    return NextResponse.json({ error: 'url is required' }, { status: 400 })
  }

  const apiKey = process.env.YOUTUBE_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'YouTube API not configured' }, { status: 500 })
  }

  try {
    let channelId: string | null = null
    let channelName = ''

    // Direct channel ID: UCxxxxxxxxxxxxxxxxxxxxxxxx (24 chars)
    if (/^UC[\w-]{22}$/.test(url)) {
      channelId = url
    }
    // /channel/UCxxxxxxxxxxxxxxxxxxxxxxxx
    else if (url.includes('/channel/')) {
      const match = url.match(/\/channel\/(UC[\w-]{22})/)
      channelId = match?.[1] ?? null
    }
    // @handle (new-style)
    else if (url.includes('@')) {
      const handle = url.match(/@([\w.-]+)/)?.[1]
      if (handle) {
        const res = await fetch(
          `${YT_BASE}/channels?part=snippet&forHandle=${handle}&key=${apiKey}`
        )
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data = await res.json() as any
        channelId = data.items?.[0]?.id ?? null
        channelName = data.items?.[0]?.snippet?.title ?? ''
      }
    }
    // /c/name (legacy custom URL)
    else if (url.includes('/c/')) {
      const name = url.match(/\/c\/([\w.-]+)/)?.[1]
      if (name) {
        const res = await fetch(
          `${YT_BASE}/channels?part=snippet&forUsername=${name}&key=${apiKey}`
        )
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data = await res.json() as any
        channelId = data.items?.[0]?.id ?? null
        channelName = data.items?.[0]?.snippet?.title ?? ''
      }
    }
    // /user/name (legacy)
    else if (url.includes('/user/')) {
      const name = url.match(/\/user\/([\w.-]+)/)?.[1]
      if (name) {
        const res = await fetch(
          `${YT_BASE}/channels?part=snippet&forUsername=${name}&key=${apiKey}`
        )
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data = await res.json() as any
        channelId = data.items?.[0]?.id ?? null
        channelName = data.items?.[0]?.snippet?.title ?? ''
      }
    }

    if (!channelId) {
      return NextResponse.json(
        { error: 'Could not resolve channel ID from this URL' },
        { status: 400 }
      )
    }

    // Fetch channel name if we don't have it yet
    if (!channelName) {
      const res = await fetch(
        `${YT_BASE}/channels?part=snippet&id=${channelId}&key=${apiKey}`
      )
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data = await res.json() as any
      channelName = data.items?.[0]?.snippet?.title ?? ''
    }

    return NextResponse.json({ channel_id: channelId, channel_name: channelName })
  } catch (error) {
    console.error('YouTube resolve error:', error)
    return NextResponse.json({ error: 'Failed to resolve channel' }, { status: 500 })
  }
}

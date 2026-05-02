import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const YT_BASE = 'https://www.googleapis.com/youtube/v3'

async function resolveHandleViaSearch(handle: string, apiKey: string): Promise<{ id: string; name: string } | null> {
  const res = await fetch(
    `${YT_BASE}/search?part=snippet&type=channel&q=${encodeURIComponent('@' + handle)}&key=${apiKey}`
  )
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = await res.json() as any
  if (data.error || !data.items?.length) return null
  const item = data.items[0]
  return {
    id: (item.id?.channelId ?? item.id) as string,
    name: (item.snippet?.title ?? '') as string,
  }
}

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
    // @handle (new-style) — try channels?forHandle first, fall back to search
    else if (url.includes('@')) {
      const handle = url.match(/@([\w.-]+)/)?.[1]
      if (handle) {
        // Primary: channels?forHandle (may be blocked on some API key configs)
        const res = await fetch(
          `${YT_BASE}/channels?part=id,snippet&forHandle=${handle}&key=${apiKey}`
        )
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data = await res.json() as any

        if (!data.error && data.items?.length) {
          channelId = data.items[0].id as string
          channelName = (data.items[0].snippet?.title ?? '') as string
        } else {
          // Fallback: search API (uses search.list, not channels.list)
          const found = await resolveHandleViaSearch(handle, apiKey)
          if (!found) {
            const reason = data.error?.message ?? `No channel found for @${handle}`
            return NextResponse.json({ error: reason }, { status: data.error ? 502 : 404 })
          }
          channelId = found.id
          channelName = found.name
        }
      }
    }
    // /c/name (legacy custom URL)
    else if (url.includes('/c/')) {
      const name = url.match(/\/c\/([\w.-]+)/)?.[1]
      if (name) {
        const res = await fetch(
          `${YT_BASE}/channels?part=id,snippet&forUsername=${name}&key=${apiKey}`
        )
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data = await res.json() as any
        if (data.error) {
          return NextResponse.json(
            { error: `YouTube API error: ${data.error.message}` },
            { status: 502 }
          )
        }
        if (!data.items?.length) {
          return NextResponse.json({ error: `No channel found for /c/${name}` }, { status: 404 })
        }
        channelId = data.items[0].id as string
        channelName = (data.items[0].snippet?.title ?? '') as string
      }
    }
    // /user/name (legacy)
    else if (url.includes('/user/')) {
      const name = url.match(/\/user\/([\w.-]+)/)?.[1]
      if (name) {
        const res = await fetch(
          `${YT_BASE}/channels?part=id,snippet&forUsername=${name}&key=${apiKey}`
        )
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data = await res.json() as any
        if (data.error) {
          return NextResponse.json(
            { error: `YouTube API error: ${data.error.message}` },
            { status: 502 }
          )
        }
        if (!data.items?.length) {
          return NextResponse.json({ error: `No channel found for /user/${name}` }, { status: 404 })
        }
        channelId = data.items[0].id as string
        channelName = (data.items[0].snippet?.title ?? '') as string
      }
    }

    if (!channelId) {
      return NextResponse.json(
        { error: 'Could not parse a channel ID or handle from this URL' },
        { status: 400 }
      )
    }

    // If we resolved via channel ID without a name, try to fetch it — but don't fail if blocked
    if (!channelName) {
      try {
        const res = await fetch(
          `${YT_BASE}/channels?part=snippet&id=${channelId}&key=${apiKey}`
        )
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data = await res.json() as any
        if (!data.error && data.items?.[0]) {
          channelName = (data.items[0].snippet?.title ?? '') as string
        }
      } catch {
        // channel name is nice-to-have, not required
      }
    }

    return NextResponse.json({ channel_id: channelId, channel_name: channelName })
  } catch (error) {
    console.error('YouTube resolve error:', error)
    return NextResponse.json({ error: 'Failed to resolve channel' }, { status: 500 })
  }
}

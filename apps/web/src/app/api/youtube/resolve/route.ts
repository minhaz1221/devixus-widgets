import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const YT_BASE = 'https://www.googleapis.com/youtube/v3'

// When an API key has HTTP-referrer restrictions, server-side Vercel calls have no
// Referer header and get "ipRefererBlocked". Adding this header lets the call pass
// through when the key is configured to allow the app's domain.
const YT_HEADERS = {
  'Referer': 'https://devixus-widgets-web.vercel.app',
  'Origin': 'https://devixus-widgets-web.vercel.app',
}

function isBlocked(data: Record<string, unknown>): boolean {
  const errors = (data.error as any)?.errors as Array<{ reason: string }> | undefined
  return errors?.some(e => e.reason === 'ipRefererBlocked') ?? false
}

/** Try channels.list?forHandle — costs 1 quota unit. Returns null on any error. */
async function resolveViaHandle(handle: string, apiKey: string) {
  try {
    const res = await fetch(
      `${YT_BASE}/channels?part=id,snippet&forHandle=${encodeURIComponent(handle)}&key=${apiKey}`,
      { headers: YT_HEADERS }
    )
      const data = await res.json() as any
    if (!data.error && data.items?.length) {
      return { id: data.items[0].id as string, name: (data.items[0].snippet?.title ?? '') as string }
    }
  } catch { /* fall through */ }
  return null
}

/** Try channels.list?forUsername — costs 1 quota unit. Returns null on any error. */
async function resolveViaUsername(username: string, apiKey: string) {
  try {
    const res = await fetch(
      `${YT_BASE}/channels?part=id,snippet&forUsername=${encodeURIComponent(username)}&key=${apiKey}`,
      { headers: YT_HEADERS }
    )
      const data = await res.json() as any
    if (!data.error && data.items?.length) {
      return { id: data.items[0].id as string, name: (data.items[0].snippet?.title ?? '') as string }
    }
  } catch { /* fall through */ }
  return null
}

/** Last resort: search.list — costs 100 quota units. Returns null on any error. */
async function resolveViaSearch(handle: string, apiKey: string) {
  try {
    const res = await fetch(
      `${YT_BASE}/search?part=snippet&type=channel&q=${encodeURIComponent(handle)}&maxResults=5&key=${apiKey}`,
      { headers: YT_HEADERS }
    )
      const data = await res.json() as any
    if (!data.error && data.items?.length) {
      // Prefer an exact handle match, otherwise take first result
      const exact = data.items.find(
              (it: any) => (it.snippet?.customUrl ?? '').toLowerCase() === `@${handle.toLowerCase()}`
      ) ?? data.items[0]
      return {
        id: (exact.id?.channelId ?? exact.id) as string,
        name: (exact.snippet?.title ?? '') as string,
      }
    }
    if (isBlocked(data)) {
      throw new Error('API key has HTTP referrer restrictions that block server-side calls. In Google Cloud Console, set the key restriction to "IP addresses" or "None (unrestricted)" for server-side use.')
    }
  } catch (err) {
    if (err instanceof Error && err.message.includes('HTTP referrer')) throw err
  }
  return null
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get('url')?.trim() ?? ''

  if (!url) {
    return NextResponse.json({ error: 'url is required' }, { status: 400 })
  }

  const apiKey = process.env.YOUTUBE_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      { error: 'YouTube API key is not configured. Add YOUTUBE_API_KEY to your environment variables.' },
      { status: 500 }
    )
  }

  try {
    let channelId: string | null = null
    let channelName = ''

    // 1. Direct channel ID: UCxxxxxxxxxxxxxxxxxxxxxxxx (24 chars)
    if (/^UC[\w-]{22}$/.test(url)) {
      channelId = url
    }
    // 2. URL containing /channel/UCxxxxxxxx
    else if (url.includes('/channel/')) {
      const match = url.match(/\/channel\/(UC[\w-]{22})/)
      channelId = match?.[1] ?? null
    }
    // 3. @handle — most common modern format
    else if (url.includes('@')) {
      const handle = url.match(/@([\w.-]+)/)?.[1] ?? ''
      if (handle) {
        // Try forHandle first (1 quota unit), then username, then search (100 units)
        const found = await resolveViaHandle(handle, apiKey)
          ?? await resolveViaUsername(handle, apiKey)
          ?? await resolveViaSearch(handle, apiKey)

        if (!found) {
          return NextResponse.json(
            { error: `No YouTube channel found for @${handle}. Check the URL and try again.` },
            { status: 404 }
          )
        }
        channelId = found.id
        channelName = found.name
      }
    }
    // 4. /c/name (legacy custom URL)
    else if (url.includes('/c/')) {
      const name = url.match(/\/c\/([\w.-]+)/)?.[1] ?? ''
      if (name) {
        const found = await resolveViaHandle(name, apiKey)
          ?? await resolveViaUsername(name, apiKey)
          ?? await resolveViaSearch(name, apiKey)
        if (!found) {
          return NextResponse.json({ error: `No channel found for /c/${name}` }, { status: 404 })
        }
        channelId = found.id
        channelName = found.name
      }
    }
    // 5. /user/name (legacy)
    else if (url.includes('/user/')) {
      const name = url.match(/\/user\/([\w.-]+)/)?.[1] ?? ''
      if (name) {
        const found = await resolveViaUsername(name, apiKey) ?? await resolveViaSearch(name, apiKey)
        if (!found) {
          return NextResponse.json({ error: `No channel found for /user/${name}` }, { status: 404 })
        }
        channelId = found.id
        channelName = found.name
      }
    }

    if (!channelId) {
      return NextResponse.json(
        { error: 'Could not parse a channel ID or handle from this URL. Try pasting the full channel URL (e.g. https://youtube.com/@channelname).' },
        { status: 400 }
      )
    }

    // Fetch channel name if we only have an ID (best-effort, don't fail on error)
    if (!channelName) {
      const result = await resolveViaHandle(channelId, apiKey)
      if (result) channelName = result.name
    }

    return NextResponse.json({ channel_id: channelId, channel_name: channelName })
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Failed to resolve channel'
    console.error('YouTube resolve error:', msg)
    return NextResponse.json({ error: msg }, { status: 502 })
  }
}

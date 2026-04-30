import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const PLACES_BASE = 'https://maps.googleapis.com/maps/api/place'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query')

  if (!query) {
    return NextResponse.json({ error: 'query is required' }, { status: 400 })
  }

  const apiKey = process.env.YOUTUBE_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'Google API not configured' }, { status: 500 })
  }

  try {
    const res = await fetch(
      `${PLACES_BASE}/textsearch/json?query=${encodeURIComponent(query)}&key=${apiKey}`
    )

    if (!res.ok) {
      throw new Error('Places text search failed')
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = await res.json() as any

    if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
      return NextResponse.json(
        { error: data.error_message ?? `Places API error: ${data.status}` },
        { status: 400 }
      )
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const results = ((data.results ?? []) as any[]).slice(0, 5).map((r) => ({
      place_id: (r.place_id ?? '') as string,
      name: (r.name ?? '') as string,
      address: (r.formatted_address ?? '') as string,
      rating: (r.rating ?? 0) as number,
      total_ratings: (r.user_ratings_total ?? 0) as number,
    }))

    return NextResponse.json({ results })
  } catch (error) {
    console.error('Google Places search error:', error)
    return NextResponse.json({ error: 'Failed to search places' }, { status: 500 })
  }
}

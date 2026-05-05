import { NextRequest, NextResponse } from 'next/server'
import { rateLimit, getClientIp } from '@/lib/rate-limit'

export const dynamic = 'force-dynamic'

const PLACES_BASE = 'https://maps.googleapis.com/maps/api/place'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
}

const MOCK_PLACE = {
  name: 'Your Business Name',
  address: '123 Main St, Anytown, USA',
  overall_rating: 4.7,
  total_reviews: 128,
  google_url: '#',
}

const MOCK_REVIEWS = [
  { author_name: 'Sarah Johnson',    author_photo: '', rating: 5, text: 'Absolutely fantastic service! Highly recommend to everyone looking for quality.',    time: Math.floor(Date.now() / 1000) - 86400,   relative_time: '1 day ago' },
  { author_name: 'Michael Chen',     author_photo: '', rating: 5, text: 'Exceptional quality and outstanding customer support. Will definitely return.',      time: Math.floor(Date.now() / 1000) - 172800,  relative_time: '2 days ago' },
  { author_name: 'Emily Rodriguez',  author_photo: '', rating: 4, text: 'Really pleased with the experience. Great attention to detail and friendly staff.',  time: Math.floor(Date.now() / 1000) - 259200,  relative_time: '3 days ago' },
  { author_name: 'David Kim',        author_photo: '', rating: 5, text: 'Outstanding! Best in class. Everything exceeded my expectations.',                   time: Math.floor(Date.now() / 1000) - 345600,  relative_time: '4 days ago' },
  { author_name: 'Jessica Williams', author_photo: '', rating: 5, text: 'Top notch experience from start to finish. Highly recommend this business.',        time: Math.floor(Date.now() / 1000) - 432000,  relative_time: '5 days ago' },
]

export async function GET(request: NextRequest) {
  const ip = getClientIp(request.headers)
  const rl = rateLimit(`gr:${ip}`, 30, 60_000)
  if (!rl.ok) {
    return NextResponse.json(
      { error: 'Rate limit exceeded. Try again in a minute.' },
      { status: 429, headers: corsHeaders }
    )
  }

  const { searchParams } = new URL(request.url)
  const placeId = searchParams.get('place_id')
  const maxReviews = Math.min(Math.max(1, parseInt(searchParams.get('max_reviews') ?? '6')), 20)
  const minRating  = Math.min(Math.max(1, parseInt(searchParams.get('min_rating')  ?? '1')), 5)

  if (!placeId) {
    return NextResponse.json(
      { error: 'place_id is required' },
      { status: 400, headers: corsHeaders }
    )
  }

  if (!/^[A-Za-z0-9_-]{10,300}$/.test(placeId)) {
    return NextResponse.json(
      { error: 'Invalid place_id format' },
      { status: 400, headers: corsHeaders }
    )
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      { place: MOCK_PLACE, reviews: MOCK_REVIEWS.slice(0, maxReviews), is_mock: true },
      { headers: corsHeaders }
    )
  }

  try {
    const fields = 'name,rating,user_ratings_total,reviews,formatted_address,url'
    const res = await fetch(
      `${PLACES_BASE}/details/json?place_id=${encodeURIComponent(placeId)}&fields=${fields}&key=${apiKey}`
    )

    if (!res.ok) {
      throw new Error('Places API request failed')
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = await res.json() as any

    if (data.status !== 'OK') {
      return NextResponse.json(
        { place: MOCK_PLACE, reviews: MOCK_REVIEWS.slice(0, maxReviews), is_mock: true, api_error: data.error_message ?? `Places API error: ${data.status}` },
        { headers: corsHeaders }
      )
    }

    const result = data.result

    const place = {
      name: (result.name ?? '') as string,
      address: (result.formatted_address ?? '') as string,
      overall_rating: (result.rating ?? 0) as number,
      total_reviews: (result.user_ratings_total ?? 0) as number,
      google_url: (result.url ?? '') as string,
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const allReviews = ((result.reviews ?? []) as any[])
      .filter((r) => r.rating >= minRating)
      .slice(0, maxReviews)
      .map((r) => ({
        author_name: (r.author_name ?? '') as string,
        author_photo: (r.profile_photo_url ?? '') as string,
        rating: (r.rating ?? 0) as number,
        text: (r.text ?? '') as string,
        time: (r.time ?? 0) as number,
        relative_time: (r.relative_time_description ?? '') as string,
      }))

    return NextResponse.json({ place, reviews: allReviews }, { headers: corsHeaders })
  } catch (error) {
    console.error('Google Places API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
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

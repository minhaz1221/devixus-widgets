import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// CORS for embedded widgets on external domains — credentials require specific origin
function corsHeaders(origin: string | null): HeadersInit {
  const allowed = origin && !origin.includes('localhost') ? origin : '*'
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Credentials': 'true',
    'Vary': 'Origin',
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const origin = request.headers.get('origin')
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ isOwner: false }, { status: 200, headers: corsHeaders(origin) })
    }

    const { data: widget } = await supabase
      .from('widgets')
      .select('user_id')
      .eq('id', params.id)
      .single()

    const isOwner = widget?.user_id === user.id

    return NextResponse.json(
      { isOwner, widgetId: params.id },
      { headers: corsHeaders(origin) }
    )
  } catch {
    return NextResponse.json({ isOwner: false }, { headers: corsHeaders(origin) })
  }
}

export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get('origin')
  return new NextResponse(null, { status: 204, headers: corsHeaders(origin) })
}

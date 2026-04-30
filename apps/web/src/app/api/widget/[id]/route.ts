import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createAdminClient()

    const { data: widget, error } = await supabase
      .from('widgets')
      .select('id, type, config, show_branding, is_active')
      .eq('id', params.id)
      .single()

    if (error || !widget) {
      return NextResponse.json(
        { error: 'Widget not found' },
        { status: 404 }
      )
    }

    if (!widget.is_active) {
      return NextResponse.json(
        { error: 'Widget is inactive' },
        { status: 404 }
      )
    }

    const { data: viewData } = await supabase.rpc(
      'increment_widget_views',
      { p_widget_id: params.id }
    )

    const limitReached = viewData?.limit_reached || false
    const monthlyViews = viewData?.monthly_views || 0
    const monthlyViewLimit = viewData?.monthly_view_limit || 200
    const plan = viewData?.plan || 'free'

    const nearLimit = monthlyViewLimit !== -1 && monthlyViews > monthlyViewLimit * 0.9

    return NextResponse.json(
      {
        id: widget.id,
        type: widget.type,
        config: widget.config,
        show_branding: widget.show_branding,
        limit_reached: limitReached,
        monthly_views: monthlyViews,
        monthly_view_limit: monthlyViewLimit,
        plan,
      },
      {
        headers: {
          'Cache-Control': nearLimit
            ? 'public, s-maxage=10, stale-while-revalidate=30'
            : 'public, s-maxage=60, stale-while-revalidate=300',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET',
        },
      }
    )
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}

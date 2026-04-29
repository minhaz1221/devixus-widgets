import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { canCreateWidget } from '@/lib/plan-limits'

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: widgets, error } = await supabase
      .from('widgets')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ widgets })
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const allowed = await canCreateWidget(user.id)
    if (!allowed) {
      return NextResponse.json(
        {
          error: 'Widget limit reached. Please upgrade your plan.',
          code: 'PLAN_LIMIT_REACHED',
        },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { name, type, config } = body

    if (!name || !type || !config) {
      return NextResponse.json(
        { error: 'name, type, and config are required' },
        { status: 400 }
      )
    }

    const validTypes = [
      'whatsapp', 'testimonials', 'google_reviews',
      'countdown', 'contact_form', 'social_follow',
    ]

    if (!validTypes.includes(type)) {
      return NextResponse.json(
        { error: 'Invalid widget type' },
        { status: 400 }
      )
    }

    const { data: widget, error } = await supabase
      .from('widgets')
      .insert({
        user_id: user.id,
        name,
        type,
        config,
        is_active: true,
        show_branding: true,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ widget }, { status: 201 })
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

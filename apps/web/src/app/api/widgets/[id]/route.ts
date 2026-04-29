import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

async function getWidgetForUser(supabase: Awaited<ReturnType<typeof createClient>>, widgetId: string, userId: string) {
  const { data: widget, error } = await supabase
    .from('widgets')
    .select('*')
    .eq('id', widgetId)
    .single()

  if (error || !widget) return { widget: null, problem: 404 as const }
  if (widget.user_id !== userId) return { widget: null, problem: 403 as const }
  return { widget, problem: null }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { widget, problem } = await getWidgetForUser(supabase, params.id, user.id)

    if (problem === 404) {
      return NextResponse.json({ error: 'Widget not found' }, { status: 404 })
    }
    if (problem === 403) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    return NextResponse.json({ widget })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { widget: existing, problem } = await getWidgetForUser(supabase, params.id, user.id)

    if (problem === 404) {
      return NextResponse.json({ error: 'Widget not found' }, { status: 404 })
    }
    if (problem === 403 || !existing) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()

    // Only allow these fields to be updated
    const allowed = ['name', 'config', 'is_active', 'show_branding'] as const
    const updates: Record<string, unknown> = {}
    for (const key of allowed) {
      if (key in body) updates[key] = body[key]
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: 'No valid fields to update' },
        { status: 400 }
      )
    }

    const { data: widget, error } = await supabase
      .from('widgets')
      .update(updates)
      .eq('id', params.id)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ widget })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { problem } = await getWidgetForUser(supabase, params.id, user.id)

    if (problem === 404) {
      return NextResponse.json({ error: 'Widget not found' }, { status: 404 })
    }
    if (problem === 403) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { error } = await supabase
      .from('widgets')
      .delete()
      .eq('id', params.id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return new NextResponse(null, { status: 204 })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

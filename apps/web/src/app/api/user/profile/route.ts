import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, company, website, bio, avatar_url, email')
    .eq('id', user.id)
    .single()

  return NextResponse.json({
    user_id: user.id,
    profile: {
      full_name: profile?.full_name ?? user.user_metadata?.full_name ?? '',
      company:   profile?.company   ?? '',
      website:   profile?.website   ?? '',
      bio:       profile?.bio       ?? '',
      avatar_url:profile?.avatar_url ?? user.user_metadata?.avatar_url ?? '',
      email:     user.email ?? '',
    },
  })
}

export async function PATCH(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json() as Record<string, string | undefined>
  const fields: Record<string, string | null> = { id: user.id, email: user.email ?? '' }
  if (body.full_name  !== undefined) fields.full_name  = body.full_name  || null
  if (body.company    !== undefined) fields.company    = body.company    || null
  if (body.website    !== undefined) fields.website    = body.website    || null
  if (body.bio        !== undefined) fields.bio        = body.bio        || null
  if (body.avatar_url !== undefined) fields.avatar_url = body.avatar_url || null

  const { error } = await supabase.from('profiles').upsert(fields)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ success: true })
}

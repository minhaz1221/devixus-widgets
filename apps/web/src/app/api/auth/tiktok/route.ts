import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://app.devixus.com'

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.redirect(new URL('/login', APP_URL))
  }

  const params = new URLSearchParams({
    client_key: process.env.TIKTOK_CLIENT_KEY ?? '',
    response_type: 'code',
    scope: 'user.info.basic,user.info.stats,video.list',
    redirect_uri: process.env.TIKTOK_REDIRECT_URI ?? `${APP_URL}/api/auth/tiktok/callback`,
    state: user.id,
  })

  return NextResponse.redirect(`https://www.tiktok.com/v2/auth/authorize/?${params}`)
}

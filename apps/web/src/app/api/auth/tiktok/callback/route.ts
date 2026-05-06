import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://app.devixus.com'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code    = searchParams.get('code')
  const userId  = searchParams.get('state')
  const errCode = searchParams.get('error')

  if (errCode || !code || !userId) {
    return NextResponse.redirect(`${APP_URL}/dashboard?tiktok_error=${errCode ?? 'missing_code'}`)
  }

  try {
    const tokenRes = await fetch('https://open.tiktokapis.com/v2/oauth/token/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_key:    process.env.TIKTOK_CLIENT_KEY ?? '',
        client_secret: process.env.TIKTOK_CLIENT_SECRET ?? '',
        code,
        grant_type:    'authorization_code',
        redirect_uri:  process.env.TIKTOK_REDIRECT_URI ?? `${APP_URL}/api/auth/tiktok/callback`,
      }),
    })

    if (!tokenRes.ok) throw new Error(`Token exchange failed: ${tokenRes.status}`)
    const token = await tokenRes.json() as {
      access_token: string; refresh_token: string; open_id: string; expires_in: number
    }

    // Fetch user profile while we have the token
    const userRes = await fetch(
      'https://open.tiktokapis.com/v2/user/info/?fields=open_id,avatar_url,display_name,follower_count,video_count',
      { headers: { Authorization: `Bearer ${token.access_token}` } }
    )
    const userData = userRes.ok ? await userRes.json() : {}
    const userInfo = (userData.data?.user ?? {}) as Record<string, unknown>

    const supabase = await createClient()
    await supabase.from('user_connections').upsert(
      {
        user_id:       userId,
        platform:      'tiktok',
        access_token:  token.access_token,
        refresh_token: token.refresh_token,
        open_id:       token.open_id,
        expires_at:    new Date(Date.now() + token.expires_in * 1000).toISOString(),
        profile_data: {
          display_name:   userInfo.display_name ?? '',
          avatar_url:     userInfo.avatar_url ?? '',
          follower_count: userInfo.follower_count ?? 0,
          video_count:    userInfo.video_count ?? 0,
        },
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id,platform' }
    )

    return NextResponse.redirect(`${APP_URL}/dashboard?tiktok_connected=1`)
  } catch {
    return NextResponse.redirect(`${APP_URL}/dashboard?tiktok_error=callback_failed`)
  }
}

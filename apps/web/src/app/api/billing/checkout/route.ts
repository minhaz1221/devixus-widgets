import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { setupLemonSqueezy, createCheckout } from '@/lib/lemonsqueezy'
import { PLANS, PlanKey } from '@/lib/plans'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { plan } = await request.json()

    if (!plan || plan === 'free') {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
    }

    if (!PLANS[plan as PlanKey]) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
    }

    const variantId = plan === 'pro'
      ? process.env.LEMONSQUEEZY_PRO_VARIANT_ID
      : process.env.LEMONSQUEEZY_AGENCY_VARIANT_ID

    if (!variantId) {
      console.error('Missing variant ID for plan:', plan)
      return NextResponse.json({ error: 'Plan not found' }, { status: 400 })
    }

    const storeId = process.env.LEMONSQUEEZY_STORE_ID!

    console.log('Checkout attempt:', { plan, variantId, storeId })

    const { data: profile } = await supabase
      .from('profiles')
      .select('email, full_name')
      .eq('id', user.id)
      .single()

    setupLemonSqueezy()

    const { data, error } = await createCheckout(storeId, variantId, {
      checkoutOptions: {
        embed: false,
        media: false,
        logo: true,
      },
      checkoutData: {
        email: profile?.email ?? user.email ?? '',
        name: profile?.full_name ?? '',
        custom: {
          user_id: user.id,
          plan,
        },
      },
      productOptions: {
        enabledVariants: [parseInt(variantId)],
        redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing?success=true`,
        receiptButtonText: 'Go to Dashboard',
        receiptThankYouNote: 'Thank you for upgrading Devixus Widgets!',
      },
    })

    if (error || !data) {
      console.error('Checkout error:', error)
      return NextResponse.json({ error: 'Failed to create checkout' }, { status: 500 })
    }

    const checkoutUrl = data.data?.attributes?.url
    return NextResponse.json({ url: checkoutUrl })
  } catch (err) {
    console.error('Checkout error:', err)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}

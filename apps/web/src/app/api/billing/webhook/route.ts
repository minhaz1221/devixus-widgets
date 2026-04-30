import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { sendUpgradeEmail } from '@/lib/email'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text()
    const signature = request.headers.get('x-signature')
    const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET!

    // Verify webhook signature
    const hmac = crypto.createHmac('sha256', secret).update(rawBody).digest('hex')
    if (hmac !== signature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    const payload = JSON.parse(rawBody)
    const eventName: string = payload.meta?.event_name
    const customData = payload.meta?.custom_data
    const attributes = payload.data?.attributes

    const supabase = createAdminClient()

    switch (eventName) {
      case 'subscription_created':
      case 'order_created': {
        const userId: string | undefined = customData?.user_id
        const plan: string | undefined = customData?.plan
        if (!userId || !plan) break

        const { data: planData } = await supabase
          .from('plans')
          .select('id')
          .eq('name', plan)
          .single()
        if (!planData) break

        const subscriptionId = String(payload.data?.id ?? '')
        const customerId = String(attributes?.customer_id ?? '')
        const periodEnd: string =
          attributes?.ends_at ??
          attributes?.renews_at ??
          new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()

        await supabase.from('subscriptions').upsert(
          {
            user_id: userId,
            plan_id: planData.id,
            stripe_customer_id: customerId,
            stripe_subscription_id: subscriptionId,
            status: 'active',
            current_period_end: periodEnd,
          },
          { onConflict: 'user_id' }
        )

        if (plan === 'pro' || plan === 'agency') {
          await supabase
            .from('widgets')
            .update({ show_branding: false })
            .eq('user_id', userId)
        }

        const { data: profile } = await supabase
          .from('profiles')
          .select('email, full_name')
          .eq('id', userId)
          .single()

        if (profile?.email) {
          await sendUpgradeEmail(
            profile.email,
            plan.charAt(0).toUpperCase() + plan.slice(1),
            profile.full_name
          )
        }
        break
      }

      case 'subscription_updated': {
        const subscriptionId = String(payload.data?.id ?? '')
        const status: string = attributes?.status ?? 'active'
        const periodEnd: string = attributes?.renews_at ?? attributes?.ends_at ?? ''
        if (!subscriptionId) break

        await supabase
          .from('subscriptions')
          .update({ status, current_period_end: periodEnd })
          .eq('stripe_subscription_id', subscriptionId)
        break
      }

      case 'subscription_cancelled':
      case 'subscription_expired': {
        const subscriptionId = String(payload.data?.id ?? '')
        const userId: string | undefined = customData?.user_id
        if (!subscriptionId) break

        const { data: freePlan } = await supabase
          .from('plans')
          .select('id')
          .eq('name', 'free')
          .single()

        if (freePlan) {
          await supabase
            .from('subscriptions')
            .update({ plan_id: freePlan.id, status: 'cancelled', stripe_subscription_id: null })
            .eq('stripe_subscription_id', subscriptionId)
        }

        if (userId) {
          await supabase
            .from('widgets')
            .update({ show_branding: true })
            .eq('user_id', userId)
        }
        break
      }

      case 'subscription_payment_failed': {
        const subscriptionId = String(payload.data?.id ?? '')
        if (!subscriptionId) break
        await supabase
          .from('subscriptions')
          .update({ status: 'past_due' })
          .eq('stripe_subscription_id', subscriptionId)
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    console.error('Webhook error:', err)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }
}

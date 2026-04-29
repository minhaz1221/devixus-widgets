# Vercel Environment Variables

Add these in Vercel Dashboard → Project → Settings → Environment Variables
for the **apps/web** (dashboard) project.

## Required — Supabase

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (secret) |

## Required — App

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_APP_URL` | Production URL e.g. `https://devixus-widgets-web.vercel.app` |

## Required — Lemon Squeezy (billing)

| Variable | Description |
|---|---|
| `LEMONSQUEEZY_API_KEY` | Your LS API key (Settings → API Keys) |
| `LEMONSQUEEZY_STORE_ID` | Store ID: `360438` |
| `LEMONSQUEEZY_PRO_VARIANT_ID` | Pro variant ID: `1592192` |
| `LEMONSQUEEZY_AGENCY_VARIANT_ID` | Agency variant ID: `1592195` |
| `LEMONSQUEEZY_WEBHOOK_SECRET` | Webhook signing secret (Settings → Webhooks) |

## Webhook setup in Lemon Squeezy

1. Go to Lemon Squeezy → Settings → Webhooks → Add webhook
2. URL: `https://devixus-widgets-web.vercel.app/api/billing/webhook`
3. Enable these events:
   - `subscription_created`
   - `subscription_updated`
   - `subscription_cancelled`
   - `subscription_expired`
   - `subscription_payment_failed`
   - `order_created`
4. Copy the signing secret → paste as `LEMONSQUEEZY_WEBHOOK_SECRET`

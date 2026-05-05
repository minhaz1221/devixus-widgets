import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { rateLimit, getClientIp } from '@/lib/rate-limit'

const UUID_RE   = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
const DOMAIN_RE = /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?(\.[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*\.[a-z]{2,}$/i

function normaliseDomain(raw: string): string | null {
  try {
    const host = raw.replace(/^https?:\/\//i, '').split('/')[0].split(':')[0].toLowerCase().trim()
    return DOMAIN_RE.test(host) ? host : null
  } catch {
    return null
  }
}

// In-memory per widget+domain throttle: 1 event per 10s
const recentRequests = new Map<string, number>()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { widget_id, domain: rawDomain, event_type = 'load' } = body

    if (!widget_id || !rawDomain) {
      return NextResponse.json({ ok: true }, { status: 200 })
    }

    // Validate widget_id is a UUID
    if (!UUID_RE.test(widget_id)) {
      return NextResponse.json({ ok: true }, { status: 200 })
    }

    // Validate + normalise domain
    const domain = normaliseDomain(rawDomain)
    if (!domain) {
      return NextResponse.json({ ok: true }, { status: 200 })
    }

    // Per-IP flood protection: 60 events/min
    const ip = getClientIp(request.headers)
    const ipOk = rateLimit(`track:ip:${ip}`, 60, 60_000)
    if (!ipOk.ok) {
      return NextResponse.json({ ok: true }, { status: 200 })
    }

    // Per widget+domain throttle: 1 event per 10s
    const key = `${widget_id}:${domain}`
    const now = Date.now()
    const last = recentRequests.get(key) ?? 0
    if (now - last < 10_000) {
      return NextResponse.json({ ok: true }, { status: 200 })
    }
    recentRequests.set(key, now)

    // Prevent unbounded memory growth
    if (recentRequests.size > 1000) {
      const cutoff = now - 60_000
      for (const [k, v] of recentRequests.entries()) {
        if (v < cutoff) recentRequests.delete(k)
      }
    }

    const supabase = createAdminClient()

    await Promise.all([
      supabase.from('events').insert({ widget_id, domain, event_type }),

      supabase.from('widget_installs').upsert(
        { widget_id, domain, last_seen: new Date().toISOString() },
        { onConflict: 'widget_id,domain', ignoreDuplicates: false }
      ),

      supabase.rpc('increment_install_count', { p_widget_id: widget_id }),
    ])

    return NextResponse.json(
      { ok: true },
      { status: 200, headers: { 'Access-Control-Allow-Origin': '*' } }
    )
  } catch {
    return NextResponse.json({ ok: true }, { status: 200 })
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}

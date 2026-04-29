import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

// Simple in-memory rate limiter: 1 event per widget+domain per 10s
const recentRequests = new Map<string, number>()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { widget_id, domain, event_type = 'load' } = body

    if (!widget_id || !domain) {
      return NextResponse.json({ ok: true }, { status: 200 })
    }

    // Rate limit check
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

    // Run all three writes concurrently — failures are silently swallowed
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
    // Always 200 — tracking must never surface errors to embeds
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

interface Slot { count: number; resetAt: number }
const buckets = new Map<string, Slot>()
let nextPrune = Date.now() + 60_000

function maybePrune() {
  const now = Date.now()
  if (now < nextPrune) return
  nextPrune = now + 60_000
  for (const [k, v] of buckets) if (now > v.resetAt) buckets.delete(k)
}

export function rateLimit(key: string, limit: number, windowMs: number): { ok: boolean; remaining: number } {
  maybePrune()
  const now = Date.now()
  const slot = buckets.get(key)
  if (!slot || now > slot.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs })
    return { ok: true, remaining: limit - 1 }
  }
  if (slot.count >= limit) return { ok: false, remaining: 0 }
  slot.count++
  return { ok: true, remaining: limit - slot.count }
}

export function getClientIp(headers: Headers): string {
  return (
    headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    headers.get('x-real-ip') ??
    'unknown'
  )
}

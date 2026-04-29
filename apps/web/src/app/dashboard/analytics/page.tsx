import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { AnalyticsClient } from './_components/AnalyticsClient'

export default async function AnalyticsPage({
  searchParams,
}: {
  searchParams: { range?: string }
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const range = searchParams.range === '30d' ? 30 : searchParams.range === 'all' ? null : 7
  const since = range
    ? new Date(Date.now() - range * 24 * 60 * 60 * 1000).toISOString()
    : null

  // Get user's widget IDs first (RLS-safe)
  const { data: userWidgets } = await supabase
    .from('widgets')
    .select('id, name')
    .eq('user_id', user.id)

  const widgetIds = (userWidgets ?? []).map(w => w.id)
  const widgetNameMap: Record<string, string> = Object.fromEntries(
    (userWidgets ?? []).map(w => [w.id, w.name])
  )

  if (widgetIds.length === 0) {
    return (
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <div className="bg-white rounded-xl border border-gray-200 py-20 text-center">
          <p className="text-gray-400 text-sm">No widgets yet — create one to see analytics.</p>
        </div>
      </div>
    )
  }

  // Events query (scoped to user's widgets)
  let eventsQuery = supabase
    .from('events')
    .select('id, widget_id, domain, event_type, created_at')
    .in('widget_id', widgetIds)
    .order('created_at', { ascending: false })

  if (since) eventsQuery = eventsQuery.gte('created_at', since)

  const { data: events } = await eventsQuery.limit(500)
  const allEvents = events ?? []

  // Total loads
  const totalLoads = allEvents.length

  // Unique domains
  const uniqueDomains = new Set(allEvents.map(e => e.domain).filter(Boolean)).size

  // Top widgets by load count
  const widgetCounts: Record<string, number> = {}
  for (const e of allEvents) {
    widgetCounts[e.widget_id] = (widgetCounts[e.widget_id] ?? 0) + 1
  }
  const topWidgets = Object.entries(widgetCounts)
    .map(([id, count]) => ({ id, name: widgetNameMap[id] ?? 'Unknown', count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)

  // Top domains
  const domainCounts: Record<string, number> = {}
  for (const e of allEvents) {
    if (e.domain) domainCounts[e.domain] = (domainCounts[e.domain] ?? 0) + 1
  }
  const topDomains = Object.entries(domainCounts)
    .map(([domain, count]) => ({ domain, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)

  // Recent events (last 20) with widget names
  const recentEvents = allEvents.slice(0, 20).map(e => ({
    id: e.id,
    widgetName: widgetNameMap[e.widget_id] ?? 'Unknown',
    domain: e.domain ?? '—',
    createdAt: e.created_at,
  }))

  const maxWidgetCount = topWidgets[0]?.count ?? 1
  const maxDomainCount = topDomains[0]?.count ?? 1

  return (
    <AnalyticsClient
      range={range}
      totalLoads={totalLoads}
      uniqueDomains={uniqueDomains}
      topWidgets={topWidgets}
      topDomains={topDomains}
      recentEvents={recentEvents}
      maxWidgetCount={maxWidgetCount}
      maxDomainCount={maxDomainCount}
    />
  )
}

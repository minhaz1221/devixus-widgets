import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { ArrowLeft, Globe, Eye, Calendar, BarChart2 } from 'lucide-react'

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60_000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

export default async function WidgetAnalyticsPage({
  params,
}: {
  params: { widgetId: string }
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: widget } = await supabase
    .from('widgets')
    .select('id, name, type, is_active, monthly_views, install_count, created_at')
    .eq('id', params.widgetId)
    .eq('user_id', user.id)
    .single()

  if (!widget) notFound()

  // Events for this widget (last 30 days)
  const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
  const { data: events } = await supabase
    .from('events')
    .select('id, domain, created_at')
    .eq('widget_id', params.widgetId)
    .gte('created_at', since)
    .order('created_at', { ascending: false })
    .limit(500)

  const allEvents = events ?? []

  // Domains breakdown
  const domainCounts: Record<string, number> = {}
  for (const e of allEvents) {
    if (e.domain) domainCounts[e.domain] = (domainCounts[e.domain] ?? 0) + 1
  }
  const topDomains = Object.entries(domainCounts)
    .map(([domain, count]) => ({ domain, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)

  const maxDomainCount = topDomains[0]?.count ?? 1

  // Events by day (last 14 days)
  const dayCounts: Record<string, number> = {}
  for (const e of allEvents) {
    const day = e.created_at.slice(0, 10)
    dayCounts[day] = (dayCounts[day] ?? 0) + 1
  }
  const days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(Date.now() - (13 - i) * 24 * 60 * 60 * 1000)
    const key = d.toISOString().slice(0, 10)
    return { key, label: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), count: dayCounts[key] ?? 0 }
  })
  const maxDay = Math.max(...days.map(d => d.count), 1)

  // Installs list
  const { data: installs } = await supabase
    .from('widget_installs')
    .select('domain, last_seen')
    .eq('widget_id', params.widgetId)
    .order('last_seen', { ascending: false })
    .limit(20)

  const recentEvents = allEvents.slice(0, 20)

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Back + header */}
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/analytics"
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={14} /> Analytics
        </Link>
        <span className="text-gray-300">/</span>
        <h1 className="text-xl font-bold text-gray-900 truncate">{widget.name}</h1>
        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${widget.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
          {widget.is_active ? 'Live' : 'Inactive'}
        </span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Views this month', value: (widget.monthly_views ?? 0).toLocaleString(), icon: Eye, color: '#6366f1' },
          { label: 'Total installs',   value: (widget.install_count  ?? 0).toLocaleString(), icon: Globe, color: '#10b981' },
          { label: 'Events (30d)',     value: allEvents.length.toLocaleString(),              icon: BarChart2, color: '#8b5cf6' },
          { label: 'Domains',          value: topDomains.length.toLocaleString(),             icon: Globe, color: '#f59e0b' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4">
            <div className="rounded-xl p-2.5 shrink-0" style={{ background: `${s.color}18` }}>
              <s.icon size={20} style={{ color: s.color }} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 leading-none">{s.value}</p>
              <p className="text-xs text-gray-500 mt-1">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Daily chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="font-semibold text-gray-900 mb-5">Views — last 14 days</h2>
        {allEvents.length === 0 ? (
          <div className="py-8 text-center text-sm text-gray-400">No events in the last 30 days</div>
        ) : (
          <div className="flex items-end gap-1 h-28">
            {days.map(d => (
              <div key={d.key} className="flex-1 flex flex-col items-center gap-1" title={`${d.label}: ${d.count} views`}>
                <div
                  className="w-full rounded-t-sm transition-all"
                  style={{
                    height: `${Math.max(4, Math.round((d.count / maxDay) * 96))}px`,
                    background: d.count > 0 ? '#6366f1' : '#e5e7eb',
                  }}
                />
                {d.count > 0 && (
                  <span className="text-[9px] text-gray-400 hidden sm:block">{d.label.split(' ')[1]}</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Top domains */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Top domains</h2>
          {topDomains.length === 0 ? (
            <div className="py-6 text-center text-sm text-gray-400">No installs yet</div>
          ) : (
            <ul className="space-y-3">
              {topDomains.map(d => (
                <li key={d.domain}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-mono text-gray-700 truncate max-w-[200px]">{d.domain}</span>
                    <span className="text-xs font-bold text-gray-600 ml-2">{d.count}</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${Math.round((d.count / maxDomainCount) * 100)}%`, background: '#10b981' }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Installs */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Active installs</h2>
          {!installs || installs.length === 0 ? (
            <div className="py-6 text-center text-sm text-gray-400">No installs tracked yet</div>
          ) : (
            <ul className="space-y-2.5">
              {installs.map(inst => (
                <li key={inst.domain} className="flex items-center justify-between">
                  <span className="text-sm font-mono text-gray-700 truncate max-w-[200px]">{inst.domain}</span>
                  <div className="flex items-center gap-1 text-xs text-gray-400 shrink-0 ml-2">
                    <Calendar size={11} />
                    {timeAgo(inst.last_seen)}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Recent events */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">Recent events</h2>
          <span className="text-xs text-gray-400">{allEvents.length} in last 30 days</span>
        </div>
        {recentEvents.length === 0 ? (
          <div className="px-6 py-12 text-center text-sm text-gray-400">No events yet</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Domain</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">When</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentEvents.map(e => (
                  <tr key={e.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-3 font-mono text-xs text-gray-600">{e.domain ?? '—'}</td>
                    <td className="px-6 py-3 text-xs text-gray-400">{timeAgo(e.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick action */}
      <div className="flex gap-3">
        <Link
          href={`/dashboard/widgets/${params.widgetId}`}
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Configure widget →
        </Link>
        <Link
          href="/dashboard/analytics"
          className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
        >
          All analytics
        </Link>
      </div>
    </div>
  )
}

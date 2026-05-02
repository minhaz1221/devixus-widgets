'use client'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { BarChart2, Globe, Zap, TrendingUp, AlertCircle, ArrowRight } from 'lucide-react'

interface TopWidget { id: string; name: string; count: number }
interface TopDomain { domain: string; count: number }
interface RecentEvent { id: string; widgetName: string; domain: string; createdAt: string }
interface WidgetView { id: string; name: string; monthly_views: number; views_reset_at: string }

interface Props {
  range: number | null
  totalLoads: number
  uniqueDomains: number
  topWidgets: TopWidget[]
  topDomains: TopDomain[]
  recentEvents: RecentEvent[]
  maxWidgetCount: number
  maxDomainCount: number
  viewLimitPlan: string
  viewLimitTotal: number
  viewLimitMax: number
  widgetViews: WidgetView[]
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60_000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

function limitBarColor(pct: number) {
  if (pct >= 100) return '#ef4444'
  if (pct >= 80)  return '#f97316'
  if (pct >= 50)  return '#eab308'
  return '#22c55e'
}

const RANGES = [
  { label: '7 days',   value: '7d' },
  { label: '30 days',  value: '30d' },
  { label: 'All time', value: 'all' },
]

export function AnalyticsClient({
  range,
  totalLoads,
  uniqueDomains,
  topWidgets,
  topDomains,
  recentEvents,
  maxWidgetCount,
  maxDomainCount,
  viewLimitPlan,
  viewLimitTotal,
  viewLimitMax,
  widgetViews,
}: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const currentRange = range === 30 ? '30d' : range === null ? 'all' : '7d'
  const unlimited = viewLimitMax === -1
  const overallPct = !unlimited && viewLimitMax > 0
    ? Math.min(100, Math.round((viewLimitTotal / viewLimitMax) * 100))
    : 0

  function setRange(v: string) {
    router.push(`${pathname}?range=${v}`)
  }

  const STATS = [
    { label: 'Total loads',      value: totalLoads,         icon: Zap,       color: '#6366f1' },
    { label: 'Unique domains',   value: uniqueDomains,      icon: Globe,     color: '#10b981' },
    { label: 'Widgets tracked',  value: topWidgets.length,  icon: BarChart2, color: '#8b5cf6' },
    { label: 'Views this month', value: viewLimitTotal,     icon: TrendingUp,color: '#f59e0b' },
  ]

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-500 text-sm mt-1">Widget load events across all your installations.</p>
        </div>
        {/* Date range selector */}
        <div className="flex bg-gray-100 rounded-xl p-1 gap-1">
          {RANGES.map(r => (
            <button
              key={r.value}
              onClick={() => setRange(r.value)}
              className={[
                'px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all',
                currentRange === r.value
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700',
              ].join(' ')}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {STATS.map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4">
            <div className="rounded-xl p-2.5 shrink-0" style={{ background: `${s.color}18` }}>
              <s.icon size={20} style={{ color: s.color }} />
            </div>
            <div className="min-w-0">
              <p className="text-2xl font-bold text-gray-900 leading-none">{s.value.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-1 leading-tight">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* View Limit Status */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="font-semibold text-gray-900">View Limit Status</h2>
            <p className="text-sm text-gray-500 mt-0.5 capitalize">{viewLimitPlan} plan</p>
          </div>
          {viewLimitPlan.toLowerCase() === 'free' && (
            <Link
              href="/dashboard/billing"
              className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:underline"
            >
              Upgrade <ArrowRight size={13} />
            </Link>
          )}
        </div>

        {unlimited ? (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Zap size={15} className="text-green-500" />
            {viewLimitTotal.toLocaleString()} views this month &nbsp;·&nbsp; Unlimited
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-600">Total views this month</span>
              <span className={`font-semibold ${overallPct >= 100 ? 'text-red-600' : 'text-gray-900'}`}>
                {viewLimitTotal.toLocaleString()} / {viewLimitMax.toLocaleString()}
              </span>
            </div>
            <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden mb-2">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${overallPct}%`, background: limitBarColor(overallPct) }}
              />
            </div>
            {overallPct >= 80 && (
              <div className="flex items-center gap-2 text-xs text-amber-700 bg-amber-50 rounded-lg px-3 py-2 mt-3">
                <AlertCircle size={13} className="shrink-0" />
                {overallPct >= 100
                  ? 'View limit reached — widgets are paused. Upgrade to restore service.'
                  : `${overallPct}% of your monthly view limit used.`}
              </div>
            )}

            {widgetViews.length > 0 && (
              <ul className="mt-5 space-y-3 border-t border-gray-100 pt-5">
                {widgetViews.map(w => {
                  const pct = Math.min(100, Math.round((w.monthly_views / viewLimitMax) * 100))
                  return (
                    <li key={w.id} className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-gray-700 truncate max-w-[240px]">{w.name}</span>
                        <div className="flex items-center gap-2 ml-2 shrink-0">
                          {pct >= 100 && (
                            <span className="text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded-full">
                              Limit reached
                            </span>
                          )}
                          <span className="text-xs text-gray-500">
                            {w.monthly_views.toLocaleString()} / {viewLimitMax.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{ width: `${pct}%`, background: limitBarColor(pct) }}
                        />
                      </div>
                    </li>
                  )
                })}
              </ul>
            )}
          </>
        )}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-2 gap-4">
        {/* Top widgets */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-5">Top widgets</h2>
          {topWidgets.length === 0 ? (
            <div className="py-8 text-center">
              <BarChart2 size={24} className="text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-400">No data yet</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {topWidgets.map(w => (
                <li key={w.id}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-gray-700 truncate max-w-[180px] font-medium">{w.name}</span>
                    <span className="text-xs font-bold text-gray-600 ml-2">{w.count.toLocaleString()}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${Math.round((w.count / maxWidgetCount) * 100)}%`, background: '#6366f1' }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Top domains */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-5">Top domains</h2>
          {topDomains.length === 0 ? (
            <div className="py-8 text-center">
              <Globe size={24} className="text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-400">No data yet</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {topDomains.map(d => (
                <li key={d.domain}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-gray-700 font-mono truncate max-w-[180px]">{d.domain}</span>
                    <span className="text-xs font-bold text-gray-600 ml-2">{d.count.toLocaleString()}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${Math.round((d.count / maxDomainCount) * 100)}%`, background: '#10b981' }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Recent events */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Recent events</h2>
        </div>
        {recentEvents.length === 0 ? (
          <div className="px-6 py-14 text-center">
            <BarChart2 size={28} className="text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-gray-500 font-medium">No events yet</p>
            <p className="text-sm text-gray-400 mt-1">Embed a widget on a website to start tracking loads.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Widget</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Domain</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">When</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentEvents.map(e => (
                  <tr key={e.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-3 font-medium text-gray-900">{e.widgetName}</td>
                    <td className="px-6 py-3 font-mono text-xs text-gray-500">{e.domain}</td>
                    <td className="px-6 py-3 text-xs text-gray-400">{timeAgo(e.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

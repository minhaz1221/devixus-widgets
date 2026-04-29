'use client'

import { useRouter, usePathname } from 'next/navigation'
import { BarChart2, Globe, Zap } from 'lucide-react'

interface TopWidget { id: string; name: string; count: number }
interface TopDomain { domain: string; count: number }
interface RecentEvent { id: string; widgetName: string; domain: string; createdAt: string }

interface Props {
  range: number | null
  totalLoads: number
  uniqueDomains: number
  topWidgets: TopWidget[]
  topDomains: TopDomain[]
  recentEvents: RecentEvent[]
  maxWidgetCount: number
  maxDomainCount: number
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

const RANGES = [
  { label: '7 days', value: '7d' },
  { label: '30 days', value: '30d' },
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
}: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const currentRange = range === 30 ? '30d' : range === null ? 'all' : '7d'

  function setRange(v: string) {
    router.push(`${pathname}?range=${v}`)
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-500 text-sm mt-1">Widget load events across all your installations.</p>
        </div>
        {/* Date range selector */}
        <div className="flex bg-gray-100 rounded-lg p-1 gap-1">
          {RANGES.map(r => (
            <button
              key={r.value}
              onClick={() => setRange(r.value)}
              className={[
                'px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
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

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total loads', value: totalLoads, icon: Zap, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Unique domains', value: uniqueDomains, icon: Globe, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Widgets tracked', value: topWidgets.length, icon: BarChart2, color: 'text-purple-600', bg: 'bg-purple-50' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4">
            <div className={`${s.bg} ${s.color} rounded-lg p-2.5`}>
              <s.icon size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{s.value}</p>
              <p className="text-sm text-gray-500">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Top widgets bar chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="font-semibold text-gray-900 mb-4">Top widgets</h2>
          {topWidgets.length === 0 ? (
            <p className="text-sm text-gray-400">No data yet.</p>
          ) : (
            <ul className="space-y-3">
              {topWidgets.map(w => (
                <li key={w.id}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-700 truncate max-w-[180px]">{w.name}</span>
                    <span className="text-xs font-semibold text-gray-500 ml-2">{w.count}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full transition-all"
                      style={{ width: `${Math.round((w.count / maxWidgetCount) * 100)}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Top domains */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="font-semibold text-gray-900 mb-4">Top domains</h2>
          {topDomains.length === 0 ? (
            <p className="text-sm text-gray-400">No data yet.</p>
          ) : (
            <ul className="space-y-3">
              {topDomains.map(d => (
                <li key={d.domain}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-700 font-mono truncate max-w-[180px]">{d.domain}</span>
                    <span className="text-xs font-semibold text-gray-500 ml-2">{d.count}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 rounded-full transition-all"
                      style={{ width: `${Math.round((d.count / maxDomainCount) * 100)}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Recent events table */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Recent events</h2>
        </div>
        {recentEvents.length === 0 ? (
          <div className="px-6 py-12 text-center text-sm text-gray-400">
            No events recorded yet. Embed a widget on a website to start tracking.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-left">
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Widget</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Domain</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">When</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentEvents.map(e => (
                  <tr key={e.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-3 font-medium text-gray-900">{e.widgetName}</td>
                    <td className="px-6 py-3 font-mono text-gray-600">{e.domain}</td>
                    <td className="px-6 py-3 text-gray-400">{timeAgo(e.createdAt)}</td>
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

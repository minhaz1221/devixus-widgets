'use client'

import { useEffect, useState, useMemo } from 'react'
import Link from 'next/link'
import { Plus, Settings2, Trash2, Zap, ZapOff, Copy, Check, Search } from 'lucide-react'
import { NewWidgetModal } from './_components/NewWidgetModal'
import type { Widget } from '@/types/widget'

const EMBED_ORIGIN = 'https://devixus-widgets-web.vercel.app'

const TYPE_COLORS: Record<string, string> = {
  whatsapp: 'bg-green-100 text-green-700 border-green-400',
  testimonials: 'bg-blue-100 text-blue-700 border-blue-400',
  google_reviews: 'bg-yellow-100 text-yellow-700 border-yellow-400',
  countdown_timer: 'bg-purple-100 text-purple-700 border-purple-400',
  countdown: 'bg-purple-100 text-purple-700 border-purple-400',
  contact_form: 'bg-orange-100 text-orange-700 border-orange-400',
  social_follow: 'bg-pink-100 text-pink-700 border-pink-400',
  youtube_feed: 'bg-red-100 text-red-700 border-red-400',
  announcement_bar: 'bg-orange-100 text-orange-700 border-orange-400',
}

const TYPE_BORDER: Record<string, string> = {
  whatsapp: '#22c55e',
  testimonials: '#3b82f6',
  google_reviews: '#eab308',
  countdown_timer: '#8b5cf6',
  countdown: '#8b5cf6',
  contact_form: '#f97316',
  social_follow: '#ec4899',
  youtube_feed: '#ef4444',
  announcement_bar: '#f97316',
}

const TYPE_ICONS: Record<string, string> = {
  whatsapp: '💬',
  testimonials: '⭐',
  google_reviews: '🏢',
  countdown_timer: '⏱',
  countdown: '⏱',
  contact_form: '✉',
  social_follow: '📱',
  youtube_feed: '▶',
  announcement_bar: '📢',
}

function barColor(pct: number): string {
  if (pct >= 100) return 'bg-red-500'
  if (pct >= 80) return 'bg-orange-500'
  if (pct >= 50) return 'bg-yellow-500'
  return 'bg-green-500'
}

function nextResetDate(resetAt: string): string {
  const d = new Date(resetAt)
  const next = new Date(d.getFullYear(), d.getMonth() + 1, 1)
  return next.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function CopyEmbedButton({ widgetId }: { widgetId: string }) {
  const [copied, setCopied] = useState(false)
  const code = `<script src="${EMBED_ORIGIN}/widget.js" data-widget-id="${widgetId}"></script>`

  async function copy(e: React.MouseEvent) {
    e.preventDefault()
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={copy}
      title="Copy embed code"
      className="px-3 py-2 border border-gray-200 text-gray-500 text-xs font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1"
    >
      {copied ? <><Check size={12} className="text-green-500" /> Copied</> : <><Copy size={12} /> Embed</>}
    </button>
  )
}

export default function WidgetsPage() {
  const [widgets, setWidgets] = useState<Widget[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [togglingId, setTogglingId] = useState<string | null>(null)
  const [planViewLimit, setPlanViewLimit] = useState<number | null>(null)
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<'newest' | 'views' | 'name'>('newest')

  async function loadWidgets() {
    const res = await fetch('/api/widgets')
    if (res.ok) {
      const data = await res.json()
      setWidgets(data.widgets ?? [])
    }
    setLoading(false)
  }

  useEffect(() => {
    loadWidgets()
    fetch('/api/plan')
      .then(r => r.json())
      .then(d => setPlanViewLimit(d.plan?.monthly_view_limit ?? 200))
      .catch(() => {})
  }, [])

  async function handleToggle(widget: Widget) {
    setTogglingId(widget.id)
    setWidgets(prev => prev.map(w => w.id === widget.id ? { ...w, is_active: !w.is_active } : w))
    await fetch(`/api/widgets/${widget.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_active: !widget.is_active }),
    })
    setTogglingId(null)
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this widget? This cannot be undone.')) return
    setDeletingId(id)
    await fetch(`/api/widgets/${id}`, { method: 'DELETE' })
    setWidgets(prev => prev.filter(w => w.id !== id))
    setDeletingId(null)
  }

  const filtered = useMemo(() => {
    let list = [...widgets]
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(w => w.name.toLowerCase().includes(q) || w.type.toLowerCase().includes(q))
    }
    if (sort === 'views') list.sort((a, b) => (b.monthly_views ?? 0) - (a.monthly_views ?? 0))
    else if (sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name))
    return list
  }, [widgets, search, sort])

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Widgets</h1>
          <p className="text-gray-500 text-sm mt-1">Manage and configure your embedded widgets.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 text-white text-sm font-semibold rounded-lg transition-opacity hover:opacity-90"
          style={{ background: '#ff6914' }}
        >
          <Plus size={16} /> New Widget
        </button>
      </div>

      {/* Search + sort */}
      {!loading && widgets.length > 0 && (
        <div className="flex gap-3 items-center">
          <div className="relative flex-1 max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name or type…"
              className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={sort}
            onChange={e => setSort(e.target.value as 'newest' | 'views' | 'name')}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="newest">Newest first</option>
            <option value="views">Most views</option>
            <option value="name">Name A–Z</option>
          </select>
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 animate-pulse h-48" />
          ))}
        </div>
      ) : widgets.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 py-20 text-center">
          <div className="text-5xl mb-4">🧩</div>
          <h3 className="font-semibold text-gray-800 text-lg">No widgets yet</h3>
          <p className="text-gray-400 text-sm mt-1 mb-6">Create your first widget and embed it on your website in seconds.</p>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-white text-sm font-semibold rounded-lg transition-opacity hover:opacity-90"
            style={{ background: '#ff6914' }}
          >
            <Plus size={15} /> Create your first widget
          </button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 py-12 text-center">
          <p className="text-gray-400 text-sm">No widgets match &quot;{search}&quot;</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(widget => {
            const views = widget.monthly_views ?? 0
            const limit = planViewLimit
            const unlimited = limit === -1
            const pct = limit && limit > 0 && !unlimited ? Math.round((views / limit) * 100) : 0
            const atLimit = !unlimited && limit !== null && views >= limit
            const borderColor = TYPE_BORDER[widget.type] ?? '#e5e7eb'

            return (
              <div
                key={widget.id}
                className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col gap-4"
                style={{ borderLeftWidth: 3, borderLeftColor: borderColor }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{TYPE_ICONS[widget.type] ?? '🔧'}</span>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${TYPE_COLORS[widget.type]?.split(' ').slice(0, 2).join(' ') ?? 'bg-gray-100 text-gray-600'}`}>
                        {widget.type.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 text-sm leading-tight">{widget.name}</h3>
                  </div>
                  <button
                    onClick={() => handleToggle(widget)}
                    disabled={togglingId === widget.id}
                    title={widget.is_active ? 'Deactivate' : 'Activate'}
                    className={`p-1.5 rounded-lg transition-colors ${widget.is_active ? 'text-green-600 hover:bg-green-50' : 'text-gray-300 hover:bg-gray-100'}`}
                  >
                    {widget.is_active ? <Zap size={16} /> : <ZapOff size={16} />}
                  </button>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span className={`w-2 h-2 rounded-full ${widget.is_active ? 'bg-green-500' : 'bg-gray-300'}`} />
                  <span className={widget.is_active ? 'text-green-600 font-medium' : 'text-gray-400'}>
                    {widget.is_active ? 'Live' : 'Inactive'}
                  </span>
                  <span className="text-gray-300">·</span>
                  <span>{widget.install_count} install{widget.install_count !== 1 ? 's' : ''}</span>
                </div>

                {/* View usage */}
                {limit !== null && (
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {unlimited
                          ? `${views.toLocaleString()} views`
                          : `${views.toLocaleString()} / ${limit.toLocaleString()} views`}
                      </span>
                      {atLimit && (
                        <span className="text-xs font-semibold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">
                          Limit reached
                        </span>
                      )}
                    </div>
                    {!unlimited && (
                      <>
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${barColor(pct)}`}
                            style={{ width: `${Math.min(100, pct)}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-400">
                          Resets {widget.views_reset_at ? nextResetDate(widget.views_reset_at) : 'next month'}
                        </p>
                      </>
                    )}
                  </div>
                )}

                <div className="flex gap-2 mt-auto">
                  <Link
                    href={`/dashboard/widgets/${widget.id}`}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 border border-gray-200 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Settings2 size={13} /> Configure
                  </Link>
                  <CopyEmbedButton widgetId={widget.id} />
                  <button
                    onClick={() => handleDelete(widget.id)}
                    disabled={deletingId === widget.id}
                    className="px-3 py-2 border border-red-100 text-red-500 text-xs font-medium rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {showModal && <NewWidgetModal onClose={() => { setShowModal(false); loadWidgets() }} />}
    </div>
  )
}

'use client'

import { useEffect, useState, useMemo } from 'react'
import Link from 'next/link'
import { Plus, Settings2, Trash2, Zap, ZapOff, Copy, Check, Search, Eye, Globe, Layers } from 'lucide-react'
import { NewWidgetModal } from './_components/NewWidgetModal'
import type { Widget } from '@/types/widget'

const EMBED_ORIGIN = 'https://devixus-widgets-web.vercel.app'

const TYPE_META: Record<string, { label: string; icon: string; bg: string; text: string; dot: string }> = {
  whatsapp:         { label: 'WhatsApp Chat',     icon: '💬', bg: 'bg-green-50',   text: 'text-green-700',  dot: '#22c55e' },
  testimonials:     { label: 'Testimonials',       icon: '⭐', bg: 'bg-blue-50',    text: 'text-blue-700',   dot: '#3b82f6' },
  google_reviews:   { label: 'Google Reviews',     icon: '🏢', bg: 'bg-yellow-50',  text: 'text-yellow-700', dot: '#eab308' },
  countdown_timer:  { label: 'Countdown Timer',    icon: '⏱',  bg: 'bg-purple-50',  text: 'text-purple-700', dot: '#8b5cf6' },
  countdown:        { label: 'Countdown Timer',    icon: '⏱',  bg: 'bg-purple-50',  text: 'text-purple-700', dot: '#8b5cf6' },
  contact_form:     { label: 'Contact Form',       icon: '✉',  bg: 'bg-orange-50',  text: 'text-orange-700', dot: '#f97316' },
  social_follow:    { label: 'Social Follow',      icon: '📱', bg: 'bg-pink-50',    text: 'text-pink-700',   dot: '#ec4899' },
  youtube_feed:     { label: 'YouTube Feed',       icon: '▶',  bg: 'bg-red-50',     text: 'text-red-700',    dot: '#ef4444' },
  announcement_bar: { label: 'Announcement Bar',   icon: '📢', bg: 'bg-orange-50',  text: 'text-orange-700', dot: '#f97316' },
  instagram_feed:   { label: 'Instagram Feed',     icon: '📸', bg: 'bg-pink-50',    text: 'text-pink-700',   dot: '#E1306C' },
  tiktok_feed:      { label: 'TikTok Feed',        icon: '🎵', bg: 'bg-gray-50',    text: 'text-gray-700',   dot: '#010101' },
}

function barColor(pct: number): string {
  if (pct >= 100) return 'bg-red-500'
  if (pct >= 80)  return 'bg-orange-500'
  if (pct >= 50)  return 'bg-yellow-500'
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
      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 border border-gray-200 text-gray-600 text-xs font-medium rounded-lg hover:bg-gray-50 transition-colors"
    >
      {copied
        ? <><Check size={12} className="text-green-500" /> Copied</>
        : <><Copy size={12} /> Embed</>}
    </button>
  )
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col gap-4">
      <div className="flex items-start gap-3">
        <div className="skeleton w-12 h-12 rounded-xl" />
        <div className="flex-1 space-y-2">
          <div className="skeleton h-3 w-16 rounded" />
          <div className="skeleton h-4 w-32 rounded" />
        </div>
      </div>
      <div className="skeleton h-3 w-24 rounded" />
      <div className="skeleton h-1.5 w-full rounded" />
      <div className="flex gap-2">
        <div className="skeleton h-8 flex-1 rounded-lg" />
        <div className="skeleton h-8 flex-1 rounded-lg" />
        <div className="skeleton h-8 w-10 rounded-lg" />
      </div>
    </div>
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
          className="inline-flex items-center gap-2 px-4 py-2 text-white text-sm font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm"
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
              className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"
            />
          </div>
          <select
            value={sort}
            onChange={e => setSort(e.target.value as 'newest' | 'views' | 'name')}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"
          >
            <option value="newest">Newest first</option>
            <option value="views">Most views</option>
            <option value="name">Name A–Z</option>
          </select>
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map(i => <SkeletonCard key={i} />)}
        </div>
      ) : widgets.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 py-20 text-center">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center mx-auto mb-4">
            <Layers size={28} className="text-indigo-400" />
          </div>
          <h3 className="font-semibold text-gray-800 text-lg">No widgets yet</h3>
          <p className="text-gray-400 text-sm mt-1 mb-6">Create your first widget and embed it on your site in seconds.</p>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-white text-sm font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 transition-colors"
          >
            <Plus size={15} /> Create your first widget
          </button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 py-12 text-center">
          <p className="text-gray-400 text-sm">No widgets match &quot;{search}&quot;</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((widget, idx) => {
            const meta   = TYPE_META[widget.type] ?? { label: widget.type, icon: '🔧', bg: 'bg-gray-50', text: 'text-gray-700', dot: '#6b7280' }
            const views  = widget.monthly_views ?? 0
            const limit  = planViewLimit
            const unlimited = limit === -1
            const pct    = limit && limit > 0 && !unlimited ? Math.round((views / limit) * 100) : 0
            const atLimit = !unlimited && limit !== null && views >= limit

            return (
              <div
                key={widget.id}
                className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col gap-4 card-hover card-animate"
                style={{ animationDelay: `${idx * 40}ms` }}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {/* Icon block */}
                    <div className={`w-12 h-12 rounded-xl ${meta.bg} flex items-center justify-center text-2xl shrink-0`}>
                      {meta.icon}
                    </div>
                    <div>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${meta.bg} ${meta.text}`}>
                        {meta.label}
                      </span>
                      <h3 className="font-semibold text-gray-900 text-sm leading-tight mt-1">{widget.name}</h3>
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggle(widget)}
                    disabled={togglingId === widget.id}
                    title={widget.is_active ? 'Deactivate' : 'Activate'}
                    className={`p-1.5 rounded-lg transition-colors shrink-0 ${widget.is_active ? 'text-green-600 hover:bg-green-50' : 'text-gray-300 hover:bg-gray-100'}`}
                  >
                    {widget.is_active ? <Zap size={16} /> : <ZapOff size={16} />}
                  </button>
                </div>

                {/* Status + installs */}
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${widget.is_active ? 'bg-green-500' : 'bg-gray-300'}`} />
                    <span className={widget.is_active ? 'text-green-600 font-medium' : 'text-gray-400'}>
                      {widget.is_active ? 'Live' : 'Inactive'}
                    </span>
                  </span>
                  <span className="text-gray-300">·</span>
                  <span className="flex items-center gap-1">
                    <Globe size={11} />
                    {widget.install_count} install{widget.install_count !== 1 ? 's' : ''}
                  </span>
                  <span className="text-gray-300">·</span>
                  <span className="flex items-center gap-1">
                    <Eye size={11} />
                    {views.toLocaleString()} views
                  </span>
                </div>

                {/* View usage bar */}
                {limit !== null && !unlimited && (
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {views.toLocaleString()} / {limit.toLocaleString()} views
                      </span>
                      {atLimit && (
                        <span className="text-xs font-semibold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">
                          Limit reached
                        </span>
                      )}
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${barColor(pct)}`}
                        style={{ width: `${Math.min(100, pct)}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-400">
                      Resets {widget.views_reset_at ? nextResetDate(widget.views_reset_at) : 'next month'}
                    </p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 mt-auto">
                  <Link
                    href={`/dashboard/widgets/${widget.id}`}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
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

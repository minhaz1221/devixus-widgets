'use client'

import { useEffect, useState, useMemo, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import {
  Plus, Settings2, Trash2, Copy, Check, Search, Eye, Globe, Layers,
  MoreVertical, MessageCircle, Star, Play, Timer, Megaphone, Mail,
  Share2, Camera, Music, PauseCircle, PlayCircle, BarChart2, type LucideIcon,
} from 'lucide-react'
import { NewWidgetModal } from './_components/NewWidgetModal'
import type { Widget } from '@/types/widget'

const EMBED_ORIGIN = 'https://devixus-widgets-web.vercel.app'

// Widget type metadata — lucide icons + brand colors, no emoji
const TYPE_META: Record<string, { label: string; icon: LucideIcon; color: string }> = {
  whatsapp:         { label: 'WhatsApp Chat',    icon: MessageCircle, color: '#25D366' },
  testimonials:     { label: 'Testimonials',      icon: Star,          color: '#f59e0b' },
  youtube_feed:     { label: 'YouTube Feed',      icon: Play,          color: '#ff0000' },
  google_reviews:   { label: 'Google Reviews',    icon: Globe,         color: '#4285f4' },
  countdown_timer:  { label: 'Countdown Timer',   icon: Timer,         color: '#8b5cf6' },
  countdown:        { label: 'Countdown Timer',   icon: Timer,         color: '#8b5cf6' },
  announcement_bar: { label: 'Announcement Bar',  icon: Megaphone,     color: '#6366f1' },
  contact_form:     { label: 'Contact Form',      icon: Mail,          color: '#10b981' },
  social_follow:    { label: 'Social Follow',     icon: Share2,        color: '#ec4899' },
  instagram_feed:   { label: 'Instagram Feed',    icon: Camera,        color: '#e4405f' },
  tiktok_feed:      { label: 'TikTok Feed',       icon: Music,         color: '#2d2d2d' },
}

function barColor(pct: number) {
  if (pct >= 100) return '#ef4444'
  if (pct >= 80)  return '#eab308'
  if (pct >= 50)  return '#eab308'
  return '#22c55e'
}

function nextResetDate(resetAt: string) {
  const d = new Date(resetAt)
  const next = new Date(d.getFullYear(), d.getMonth() + 1, 1)
  return next.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

// ── Skeleton ──────────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col gap-4">
      <div className="flex items-start gap-3">
        <div className="skeleton w-11 h-11 rounded-xl" />
        <div className="flex-1 space-y-2 pt-1">
          <div className="skeleton h-3 w-20 rounded" />
          <div className="skeleton h-4 w-32 rounded" />
        </div>
        <div className="skeleton w-6 h-6 rounded-lg" />
      </div>
      <div className="skeleton h-3 w-28 rounded" />
      <div className="skeleton h-1.5 w-full rounded" />
      <div className="skeleton h-9 w-full rounded-lg" />
    </div>
  )
}

// ── Three-dot dropdown menu ───────────────────────────────────────────────────
interface CardMenuProps {
  widgetId: string
  isActive: boolean
  onToggle: () => void
  onDelete: () => void
  copyEmbed: () => void
  copiedId: string | null
}

function CardMenu({ widgetId, isActive, onToggle, onDelete, copyEmbed, copiedId }: CardMenuProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [open])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <MoreVertical size={15} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-20 py-1.5 w-52 overflow-hidden">
          <Link
            href={`/dashboard/widgets/${widgetId}`}
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Settings2 size={14} className="text-gray-400" />
            Configure widget
          </Link>
          <button
            onClick={() => { copyEmbed(); setOpen(false) }}
            className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left"
          >
            {copiedId === widgetId
              ? <><Check size={14} className="text-green-500" /> Copied!</>
              : <><Copy size={14} className="text-gray-400" /> Copy embed code</>}
          </button>
          <button
            onClick={() => { onToggle(); setOpen(false) }}
            className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left"
          >
            {isActive
              ? <><PauseCircle size={14} className="text-gray-400" /> Pause widget</>
              : <><PlayCircle  size={14} className="text-gray-400" /> Activate widget</>}
          </button>
          <div className="border-t border-gray-100 my-1" />
          <button
            onClick={() => { onDelete(); setOpen(false) }}
            className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
          >
            <Trash2 size={14} /> Delete widget
          </button>
        </div>
      )}
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function WidgetsPage() {
  const searchParams = useSearchParams()

  const [widgets, setWidgets]         = useState<Widget[]>([])
  const [loading, setLoading]         = useState(true)
  const [showModal, setShowModal]     = useState(false)
  const [deletingId, setDeletingId]   = useState<string | null>(null)
  const [togglingId, setTogglingId]   = useState<string | null>(null)
  const [copiedId, setCopiedId]       = useState<string | null>(null)
  const [planViewLimit, setPlanViewLimit] = useState<number | null>(null)
  const [search, setSearch]           = useState('')
  const [sort, setSort]               = useState<'newest' | 'views' | 'name'>('newest')

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

  // Auto-open modal when navigated with ?new=1
  useEffect(() => {
    if (searchParams.get('new') === '1') setShowModal(true)
  }, [searchParams])

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

  function handleCopyEmbed(widgetId: string) {
    const code = `<script src="${EMBED_ORIGIN}/widget.js" data-widget-id="${widgetId}"></script>`
    navigator.clipboard.writeText(code)
    setCopiedId(widgetId)
    setTimeout(() => setCopiedId(null), 2000)
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
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Widgets</h1>
          <p className="text-gray-500 text-sm mt-1">Manage and configure your embedded widgets.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <Plus size={15} strokeWidth={2.5} /> New Widget
        </button>
      </div>

      {/* Search + sort */}
      {!loading && widgets.length > 0 && (
        <div className="flex gap-3 items-center">
          <div className="relative flex-1 max-w-xs">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search widgets…"
              className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-400 outline-none"
            />
          </div>
          <select
            value={sort}
            onChange={e => setSort(e.target.value as 'newest' | 'views' | 'name')}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="newest">Newest first</option>
            <option value="views">Most views</option>
            <option value="name">Name A–Z</option>
          </select>
        </div>
      )}

      {/* Content */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map(i => <SkeletonCard key={i} />)}
        </div>
      ) : widgets.length === 0 ? (
        /* Empty state */
        <div className="bg-white rounded-xl border border-gray-200 py-20 text-center">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center mx-auto mb-4">
            <Layers size={26} className="text-indigo-400" />
          </div>
          <h3 className="font-semibold text-gray-800 text-lg">No widgets yet</h3>
          <p className="text-gray-400 text-sm mt-1.5 mb-6 max-w-xs mx-auto">
            Create your first widget and start embedding it on your website in seconds.
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
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
            const meta  = TYPE_META[widget.type] ?? { label: widget.type.replace(/_/g, ' '), icon: Layers, color: '#6b7280' }
            const Icon  = meta.icon
            const views = widget.monthly_views ?? 0
            const limit = planViewLimit
            const unlimited = limit === -1
            const pct   = limit && limit > 0 && !unlimited ? Math.min(100, Math.round((views / limit) * 100)) : 0
            const atLimit = !unlimited && limit !== null && views >= limit

            return (
              <div
                key={widget.id}
                className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col gap-4 card-hover card-animate"
                style={{ animationDelay: `${idx * 40}ms` }}
              >
                {/* Card header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Brand icon block */}
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: `${meta.color}15` }}
                    >
                      <Icon size={20} style={{ color: meta.color }} />
                    </div>
                    <div className="min-w-0">
                      {/* Type badge */}
                      <span
                        className="inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full"
                        style={{ background: `${meta.color}15`, color: meta.color }}
                      >
                        {meta.label}
                      </span>
                      {/* Widget name */}
                      <h3 className="font-semibold text-gray-900 text-sm leading-tight mt-1 truncate">
                        {widget.name}
                      </h3>
                    </div>
                  </div>

                  {/* Three-dot menu */}
                  <CardMenu
                    widgetId={widget.id}
                    isActive={widget.is_active}
                    onToggle={() => handleToggle(widget)}
                    onDelete={() => handleDelete(widget.id)}
                    copyEmbed={() => handleCopyEmbed(widget.id)}
                    copiedId={copiedId}
                  />
                </div>

                {/* Status + stats row */}
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${widget.is_active ? 'bg-green-500' : 'bg-gray-300'}`} />
                    <span className={widget.is_active ? 'text-green-600 font-medium' : 'text-gray-400'}>
                      {widget.is_active ? 'Live' : 'Inactive'}
                    </span>
                  </span>
                  <span className="text-gray-300">·</span>
                  <span className="flex items-center gap-1">
                    <Globe size={11} className="text-gray-400" />
                    {widget.install_count} install{widget.install_count !== 1 ? 's' : ''}
                  </span>
                  <span className="text-gray-300">·</span>
                  <span className="flex items-center gap-1">
                    <Eye size={11} className="text-gray-400" />
                    {views.toLocaleString()}
                  </span>
                </div>

                {/* View usage bar */}
                {limit !== null && !unlimited && (
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{views.toLocaleString()} / {limit.toLocaleString()} views</span>
                      {atLimit && (
                        <span className="text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded-full">Limit reached</span>
                      )}
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${pct}%`, background: barColor(pct) }}
                      />
                    </div>
                    <p className="text-[11px] text-gray-400">
                      Resets {widget.views_reset_at ? nextResetDate(widget.views_reset_at) : 'next month'}
                    </p>
                  </div>
                )}

                {/* Primary action */}
                <div className="mt-auto flex gap-2">
                  <Link
                    href={`/dashboard/widgets/${widget.id}`}
                    className="flex items-center justify-center gap-1.5 flex-1 px-3 py-2.5 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    <Settings2 size={13} /> Configure
                  </Link>
                  <Link
                    href={`/dashboard/analytics/${widget.id}`}
                    className="flex items-center justify-center gap-1 px-2.5 py-2.5 border border-gray-200 text-gray-500 text-xs font-medium rounded-lg hover:bg-gray-50 hover:text-gray-700 transition-colors"
                    title="View analytics"
                  >
                    <BarChart2 size={13} />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {showModal && (
        <NewWidgetModal onClose={() => { setShowModal(false); loadWidgets() }} />
      )}
    </div>
  )
}

'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft, Plus, Settings2, MoreVertical, Copy, Pause, Play, Trash2,
  Layers, Download, Sparkles, type LucideIcon,
  MessageCircle, Star, Globe, Timer, Megaphone, Mail, Share2,
  Camera, Music, HelpCircle, Hash, MapPin,
} from 'lucide-react'
import { generateThumbnailHTML } from '@/lib/thumbnail-renderer'
import { InstallModal } from '../../_components/InstallModal'

// ── Type metadata ──────────────────────────────────────────────────────────
interface TypeMeta {
  label: string
  description: string
  icon: LucideIcon
  color: string
}

const TYPE_META: Record<string, TypeMeta> = {
  whatsapp:         { label: 'WhatsApp Chat',    description: 'Floating chat button',           icon: MessageCircle, color: '#25D366' },
  testimonials:     { label: 'Testimonials',      description: 'Slider or grid of reviews',      icon: Star,          color: '#f59e0b' },
  youtube_feed:     { label: 'YouTube Feed',      description: 'Channel video gallery',          icon: Sparkles,      color: '#ff0000' },
  google_reviews:   { label: 'Google Reviews',    description: 'Google Reviews carousel',        icon: Globe,         color: '#4285f4' },
  countdown_timer:  { label: 'Countdown Timer',   description: 'Countdown to any date',          icon: Timer,         color: '#8b5cf6' },
  announcement_bar: { label: 'Announcement Bar',  description: 'Top or bottom bar',              icon: Megaphone,     color: '#6366f1' },
  contact_form:     { label: 'Contact Form',      description: 'Email contact form',             icon: Mail,          color: '#10b981' },
  social_follow:    { label: 'Social Follow',     description: 'Social media follow links',      icon: Share2,        color: '#ec4899' },
  instagram_feed:   { label: 'Instagram Feed',    description: 'Instagram photo grid',           icon: Camera,        color: '#e4405f' },
  tiktok_feed:      { label: 'TikTok Feed',       description: 'TikTok video grid',              icon: Music,         color: '#2d2d2d' },
  faq_accordion:    { label: 'FAQ',               description: 'Collapsible FAQ section',        icon: HelpCircle,    color: '#f97316' },
  number_counter:   { label: 'Number Counter',    description: 'Animated stats display',         icon: Hash,          color: '#06b6d4' },
  google_maps:      { label: 'Google Maps',       description: 'Interactive map embed',          icon: MapPin,        color: '#10b981' },
}

// Other types for "Discover More Apps"
const ALL_TYPES = Object.keys(TYPE_META)

// ── Interfaces ──────────────────────────────────────────────────────────────
interface WidgetRow {
  id: string
  name: string
  type: string
  is_active: boolean
  monthly_views: number
  views_reset_at: string | null
  config: Record<string, unknown>
  thumbnail_html: string | null
  created_at: string
}

interface PlanInfo {
  name: string
  view_limit: number
  widget_limit: number
}

// ── Helpers ─────────────────────────────────────────────────────────────────
function formatDate(iso: string) {
  const d = new Date(iso)
  const now = new Date()
  const days = Math.floor((now.getTime() - d.getTime()) / 86400000)
  if (days === 0) return 'Today'
  if (days === 1) return '1 day ago'
  if (days < 30) return `${days} days ago`
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function formatResetDate(iso: string | null) {
  if (!iso) return null
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

// ── Thumbnail iframe ─────────────────────────────────────────────────────────
function WidgetThumbnail({ widget }: { widget: WidgetRow }) {
  const html = widget.thumbnail_html || generateThumbnailHTML(widget.type, widget.config)
  const ref = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    if (ref.current) ref.current.srcdoc = html
  }, [html])

  return (
    <iframe
      ref={ref}
      title={widget.name}
      sandbox="allow-scripts allow-same-origin"
      style={{ width: '100%', height: '100%', border: 'none', pointerEvents: 'none', display: 'block' }}
    />
  )
}

// ── Three-dot menu ───────────────────────────────────────────────────────────
function WidgetMenu({
  widget,
  onDuplicate,
  onToggle,
  onDelete,
}: {
  widget: WidgetRow
  onDuplicate: () => void
  onToggle: () => void
  onDelete: () => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function click(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', click)
    return () => document.removeEventListener('mousedown', click)
  }, [open])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={e => { e.stopPropagation(); setOpen(o => !o) }}
        className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        title="More options"
      >
        <MoreVertical size={14} />
      </button>

      {open && (
        <div className="absolute right-0 top-8 z-30 w-44 bg-white rounded-xl shadow-xl border border-gray-100 py-1 text-sm">
          <button
            className="w-full flex items-center gap-2.5 px-3.5 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
            onClick={() => { onDuplicate(); setOpen(false) }}
          >
            <Copy size={13} className="text-gray-400" /> Duplicate
          </button>
          <button
            className="w-full flex items-center gap-2.5 px-3.5 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
            onClick={() => { onToggle(); setOpen(false) }}
          >
            {widget.is_active
              ? <><Pause size={13} className="text-amber-400" /> Pause</>
              : <><Play  size={13} className="text-green-500" /> Activate</>
            }
          </button>
          <div className="h-px bg-gray-100 my-1" />
          <button
            className="w-full flex items-center gap-2.5 px-3.5 py-2 text-red-600 hover:bg-red-50 transition-colors"
            onClick={() => { onDelete(); setOpen(false) }}
          >
            <Trash2 size={13} /> Delete
          </button>
        </div>
      )}
    </div>
  )
}

// ── Main Page ────────────────────────────────────────────────────────────────
export default function AppTypePage() {
  const params = useParams()
  const type = typeof params.type === 'string' ? params.type : ''

  const [widgets, setWidgets] = useState<WidgetRow[]>([])
  const [plan, setPlan]       = useState<PlanInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [tab, setTab]         = useState<'widgets' | 'news'>('widgets')
  const [installWidget, setInstallWidget] = useState<WidgetRow | null>(null)
  const [toast, setToast]     = useState<string | null>(null)

  const meta = TYPE_META[type] ?? { label: type.replace(/_/g, ' '), description: '', icon: Layers, color: '#6b7280' }
  const Icon = meta.icon

  const load = useCallback(() => {
    setLoading(true)
    fetch('/api/widgets')
      .then(r => r.json())
      .then((data: { widgets?: WidgetRow[] }) => {
        setWidgets((data.widgets ?? []).filter(w => w.type === type))
      })
      .finally(() => setLoading(false))
  }, [type])

  useEffect(() => {
    load()
    fetch('/api/plan')
      .then(r => r.json())
      .then(d => setPlan(d.plan))
      .catch(() => {})
  }, [load])

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  // Aggregate monthly views for this widget type
  const totalViews = widgets.reduce((s, w) => s + (w.monthly_views || 0), 0)
  const viewLimit = plan?.view_limit ?? 200
  const viewPct = Math.min(100, Math.round((totalViews / viewLimit) * 100))
  const resetDate = formatResetDate(widgets[0]?.views_reset_at ?? null)
  const planName = plan?.name ?? 'free'
  const isPro = planName.toLowerCase() !== 'free'

  async function handleDuplicate(widget: WidgetRow) {
    const res = await fetch('/api/widgets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: `${widget.name} (Copy)`, type: widget.type, config: widget.config }),
    })
    if (res.ok) { load(); showToast('Widget duplicated') }
    else showToast('Failed to duplicate widget')
  }

  async function handleToggle(widget: WidgetRow) {
    const res = await fetch(`/api/widgets/${widget.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_active: !widget.is_active }),
    })
    if (res.ok) {
      setWidgets(ws => ws.map(w => w.id === widget.id ? { ...w, is_active: !w.is_active } : w))
      showToast(widget.is_active ? 'Widget paused' : 'Widget activated')
    }
  }

  async function handleDelete(widget: WidgetRow) {
    if (!confirm(`Delete "${widget.name}"? This cannot be undone.`)) return
    const res = await fetch(`/api/widgets/${widget.id}`, { method: 'DELETE' })
    if (res.ok) { setWidgets(ws => ws.filter(w => w.id !== widget.id)); showToast('Widget deleted') }
  }

  // Types the user does NOT have widgets for yet (for "Discover More Apps")
  const discoverTypes = ALL_TYPES.filter(t => t !== type && !widgets.find(w => w.type === t)).slice(0, 3)

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white text-sm font-medium px-4 py-2.5 rounded-xl shadow-lg animate-in slide-in-from-bottom-2">
          {toast}
        </div>
      )}

      {/* Install modal */}
      {installWidget && (
        <InstallModal
          widgetId={installWidget.id}
          widgetName={installWidget.name}
          onClose={() => setInstallWidget(null)}
        />
      )}

      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4 min-w-0">
          <Link
            href="/dashboard/widgets"
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors shrink-0"
          >
            <ArrowLeft size={15} />
          </Link>

          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${meta.color}18` }}>
            <Icon size={20} style={{ color: meta.color }} />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl font-bold text-gray-900 leading-tight">{meta.label}</h1>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${isPro ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                {planName}
              </span>
            </div>
            {meta.description && <p className="text-gray-500 text-sm mt-0.5">{meta.description}</p>}
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {/* View counter */}
          <div className="hidden sm:flex flex-col items-end gap-1">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-gray-700">WIDGETS {widgets.length}/{plan?.widget_limit === -1 ? '∞' : (plan?.widget_limit ?? '—')}</span>
              <span className="text-xs font-semibold text-gray-700">VIEWS {totalViews}/{viewLimit === -1 ? '∞' : viewLimit}</span>
            </div>
            <div className="w-40 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${viewPct}%`, background: viewPct > 80 ? '#ef4444' : '#10b981' }}
              />
            </div>
            {resetDate && <p className="text-[10px] text-gray-400">RESETS ON {resetDate}</p>}
          </div>

          {!isPro && (
            <Link
              href="/dashboard/billing"
              className="px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-lg hover:bg-indigo-100 transition-colors whitespace-nowrap"
            >
              Select Plan
            </Link>
          )}

          <Link
            href={`/dashboard/widgets?new=1&type=${type}`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
          >
            <Plus size={14} strokeWidth={2.5} /> Create Widget
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {([['widgets', 'Widgets'], ['news', "What's New"]] as const).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`px-4 py-2.5 text-sm font-semibold border-b-2 -mb-px transition-colors ${
              tab === key
                ? 'border-indigo-600 text-indigo-700'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            {label}
            {key === 'widgets' && widgets.length > 0 && (
              <span className="ml-1.5 text-[10px] font-bold bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full">
                {widgets.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab: Widgets */}
      {tab === 'widgets' && (
        <>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <div className="h-44 bg-gray-100 animate-pulse" />
                  <div className="p-4 space-y-2">
                    <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4" />
                    <div className="h-2.5 bg-gray-100 rounded animate-pulse w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : widgets.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 py-20 text-center">
              <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: `${meta.color}18` }}>
                <Icon size={26} style={{ color: meta.color }} />
              </div>
              <h3 className="font-semibold text-gray-800 text-lg">No widgets yet</h3>
              <p className="text-gray-400 text-sm mt-1.5 mb-6 max-w-xs mx-auto">
                Create your first {meta.label} widget and embed it on your website.
              </p>
              <Link
                href={`/dashboard/widgets?new=1&type=${type}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Plus size={14} /> Create your first {meta.label} widget
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {widgets.map(widget => (
                <div key={widget.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md hover:border-indigo-200 transition-all group">
                  {/* Thumbnail */}
                  <div className="relative h-44 bg-gray-50 overflow-hidden">
                    <WidgetThumbnail widget={widget} />

                    {/* Status badge */}
                    <div className="absolute top-2 left-2">
                      <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-sm ${
                        widget.is_active
                          ? 'bg-green-100/90 text-green-700'
                          : 'bg-gray-100/90 text-gray-500'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${widget.is_active ? 'bg-green-500' : 'bg-gray-400'}`} />
                        {widget.is_active ? 'Live' : 'Paused'}
                      </span>
                    </div>

                    {/* Three-dot menu */}
                    <div className="absolute top-2 right-2">
                      <WidgetMenu
                        widget={widget}
                        onDuplicate={() => handleDuplicate(widget)}
                        onToggle={() => handleToggle(widget)}
                        onDelete={() => handleDelete(widget)}
                      />
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-4">
                    <p className="font-semibold text-gray-900 text-sm truncate mb-0.5">{widget.name}</p>
                    <p className="text-[11px] text-gray-400">Created {formatDate(widget.created_at)}</p>

                    {/* Views micro-bar */}
                    <div className="mt-2 mb-3">
                      <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                        <span>{widget.monthly_views || 0} views</span>
                        <span>{viewLimit === -1 ? '∞' : viewLimit} limit</span>
                      </div>
                      <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${Math.min(100, ((widget.monthly_views || 0) / viewLimit) * 100)}%`,
                            background: ((widget.monthly_views || 0) / viewLimit) > 0.8 ? '#ef4444' : '#10b981',
                          }}
                        />
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => setInstallWidget(widget)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-gray-200 text-gray-700 text-xs font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Download size={12} /> Install
                      </button>
                      <Link
                        href={`/dashboard/widgets/${widget.id}`}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
                      >
                        <Settings2 size={12} /> Edit
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Tab: What's New */}
      {tab === 'news' && (
        <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
          {[
            { date: 'May 2026', title: 'Owner floating bar', body: 'When you visit a page with your own widget, a control bar now appears so you can edit instantly without going back to the dashboard.' },
            { date: 'Apr 2026', title: 'oEmbed profile sync', body: 'TikTok and Instagram profiles now fetch real display names and avatars from the platform on first load.' },
            { date: 'Mar 2026', title: 'Multi-source support (coming)', body: 'Soon you will be able to combine multiple profiles into a single feed — great for agency accounts.' },
          ].map((item, i) => (
            <div key={i} className="px-5 py-4">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">{item.date}</p>
              <p className="font-semibold text-gray-900 text-sm mb-0.5">{item.title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      )}

      {/* Discover More Apps */}
      {discoverTypes.length > 0 && (
        <div className="mt-8">
          <h2 className="text-sm font-bold text-gray-900 mb-4">Discover More Apps</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {discoverTypes.map(t => {
              const m = TYPE_META[t]
              if (!m) return null
              const DIcon = m.icon
              return (
                <div key={t} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-3 hover:shadow-sm hover:border-indigo-200 transition-all">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${m.color}18` }}>
                    <DIcon size={18} style={{ color: m.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm truncate">{m.label}</p>
                    <p className="text-[11px] text-gray-400 truncate">{m.description}</p>
                  </div>
                  <Link
                    href={`/dashboard/widgets?new=1&type=${t}`}
                    className="px-3 py-1.5 text-xs font-semibold bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors whitespace-nowrap shrink-0"
                  >
                    Add App
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

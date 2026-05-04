'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft, Plus, Settings2, BarChart2, MessageCircle, Star, Play, Globe,
  Timer, Megaphone, Mail, Share2, Camera, Music, Layers, type LucideIcon,
} from 'lucide-react'

interface WidgetRow {
  id: string
  name: string
  type: string
  is_active: boolean
  monthly_views: number
  created_at: string
}

interface TypeMeta {
  label: string
  description: string
  icon: LucideIcon
  color: string
}

const TYPE_META: Record<string, TypeMeta> = {
  whatsapp:         { label: 'WhatsApp Chat',    description: 'Floating WhatsApp button',    icon: MessageCircle, color: '#25D366' },
  testimonials:     { label: 'Testimonials',      description: 'Testimonials slider or grid', icon: Star,          color: '#f59e0b' },
  youtube_feed:     { label: 'YouTube Feed',      description: 'Latest YouTube videos widget', icon: Play,         color: '#ff0000' },
  google_reviews:   { label: 'Google Reviews',    description: 'Google Reviews carousel',     icon: Globe,         color: '#4285f4' },
  countdown_timer:  { label: 'Countdown Timer',   description: 'Countdown to any date',       icon: Timer,         color: '#8b5cf6' },
  announcement_bar: { label: 'Announcement Bar',  description: 'Top or bottom bar',           icon: Megaphone,     color: '#6366f1' },
  contact_form:     { label: 'Contact Form',      description: 'Email contact form',          icon: Mail,          color: '#10b981' },
  social_follow:    { label: 'Social Follow',     description: 'Social media follow links',   icon: Share2,        color: '#ec4899' },
  instagram_feed:   { label: 'Instagram Feed',    description: 'Instagram photo grid',        icon: Camera,        color: '#e4405f' },
  tiktok_feed:      { label: 'TikTok Feed',       description: 'TikTok video grid',           icon: Music,         color: '#2d2d2d' },
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function AppTypePage() {
  const params = useParams()
  const type = typeof params.type === 'string' ? params.type : ''

  const [widgets, setWidgets] = useState<WidgetRow[]>([])
  const [loading, setLoading]  = useState(true)

  const meta = TYPE_META[type] ?? { label: type.replace(/_/g, ' '), description: '', icon: Layers, color: '#6b7280' }
  const Icon = meta.icon

  useEffect(() => {
    fetch('/api/widgets')
      .then(r => r.json())
      .then((data: { widgets?: WidgetRow[] }) => {
        const all = data.widgets ?? []
        setWidgets(all.filter(w => w.type === type))
      })
      .finally(() => setLoading(false))
  }, [type])

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <Link
            href="/dashboard/widgets"
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors shrink-0"
          >
            <ArrowLeft size={15} />
          </Link>

          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: `${meta.color}18` }}
          >
            <Icon size={20} style={{ color: meta.color }} />
          </div>

          <div className="min-w-0">
            <h1 className="text-xl font-bold text-gray-900 leading-tight">
              All {meta.label} Widgets
            </h1>
            {meta.description && (
              <p className="text-gray-500 text-sm mt-0.5">{meta.description}</p>
            )}
          </div>
        </div>

        <Link
          href={`/dashboard/widgets?new=1&type=${type}`}
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors shadow-sm shrink-0"
        >
          <Plus size={14} strokeWidth={2.5} /> Create Widget
        </Link>
      </div>

      {/* Content */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4">
              <div className="skeleton w-10 h-10 rounded-xl" />
              <div className="flex-1 space-y-2">
                <div className="skeleton h-3 w-32 rounded" />
                <div className="skeleton h-3 w-20 rounded" />
              </div>
              <div className="skeleton h-8 w-24 rounded-lg" />
            </div>
          ))}
        </div>
      ) : widgets.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 py-20 text-center">
          <div
            className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center"
            style={{ background: `${meta.color}18` }}
          >
            <Icon size={26} style={{ color: meta.color }} />
          </div>
          <h3 className="font-semibold text-gray-800 text-lg">No widgets yet</h3>
          <p className="text-gray-400 text-sm mt-1.5 mb-6 max-w-xs mx-auto">
            Create your first {meta.label} widget and start embedding it on your website.
          </p>
          <Link
            href={`/dashboard/widgets?new=1&type=${type}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus size={14} /> Create your first {meta.label} widget
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <ul className="divide-y divide-gray-100">
            {widgets.map(widget => (
              <li
                key={widget.id}
                className="px-6 py-4 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
              >
                {/* Left: name + meta */}
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: `${meta.color}15` }}
                  >
                    <Icon size={16} style={{ color: meta.color }} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-gray-900 text-sm truncate">{widget.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">Created {formatDate(widget.created_at)}</p>
                  </div>
                </div>

                {/* Right: badges + actions */}
                <div className="flex items-center gap-3 shrink-0">
                  {/* Views badge */}
                  <span className="hidden sm:inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                    {widget.monthly_views.toLocaleString()} views
                  </span>

                  {/* Status badge */}
                  <span
                    className={[
                      'inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full',
                      widget.is_active
                        ? 'bg-green-50 text-green-700'
                        : 'bg-gray-100 text-gray-500',
                    ].join(' ')}
                  >
                    <span
                      className={[
                        'w-1.5 h-1.5 rounded-full',
                        widget.is_active ? 'bg-green-500' : 'bg-gray-400',
                      ].join(' ')}
                    />
                    {widget.is_active ? 'Live' : 'Inactive'}
                  </span>

                  {/* Edit button */}
                  <Link
                    href={`/dashboard/widgets/${widget.id}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    <Settings2 size={12} /> Edit
                  </Link>

                  {/* Analytics link */}
                  <Link
                    href={`/dashboard/analytics/${widget.id}`}
                    className="w-7 h-7 flex items-center justify-center border border-gray-200 text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700 transition-colors"
                    title="View analytics"
                  >
                    <BarChart2 size={13} />
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

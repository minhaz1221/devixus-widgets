'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { X, MessageCircle, Star, Play, Globe, Timer, Megaphone, Mail, Share2, Camera, Music, Lock } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Props {
  onClose: () => void
}

type Category = 'all' | 'social' | 'tools' | 'forms' | 'reviews'

interface WidgetType {
  type: string
  label: string
  description: string
  icon: LucideIcon
  color: string
  category: Category
  available: boolean
  comingSoon?: boolean
  navigateTo?: string
  defaultConfig: Record<string, unknown>
}

const WIDGET_TYPES: WidgetType[] = [
  {
    type: 'whatsapp',
    label: 'WhatsApp Chat',
    description: 'Floating chat button that opens WhatsApp directly',
    icon: MessageCircle,
    color: '#25D366',
    category: 'social',
    available: true,
    defaultConfig: {
      phone_number: '',
      welcome_message: 'Hello! How can I help you?',
      button_color: '#25D366',
      position: 'bottom-right',
      button_size: 'medium',
      show_on_mobile: true,
      show_on_desktop: true,
    },
  },
  {
    type: 'testimonials',
    label: 'Testimonials',
    description: 'Scrollable customer testimonial cards or grid',
    icon: Star,
    color: '#f59e0b',
    category: 'reviews',
    available: true,
    defaultConfig: {
      testimonials: [],
      autoplay: true,
      autoplay_speed: 3000,
      show_rating: true,
      theme: 'light',
    },
  },
  {
    type: 'google_reviews',
    label: 'Google Reviews',
    description: 'Display your Google Business reviews',
    icon: Globe,
    color: '#4285f4',
    category: 'reviews',
    available: true,
    defaultConfig: {
      place_id: '',
      place_name: '',
      place_address: '',
      layout: 'grid',
      min_rating: 1,
      max_reviews: 6,
      show_header: true,
      show_overall_rating: true,
      show_review_date: true,
      show_reviewer_photo: true,
      theme: 'light',
      accent_color: '#4285f4',
      write_review_link: true,
    },
  },
  {
    type: 'countdown_timer',
    label: 'Countdown Timer',
    description: 'Create urgency with a live countdown to any date',
    icon: Timer,
    color: '#8b5cf6',
    category: 'tools',
    available: true,
    defaultConfig: {
      target_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      target_time: '23:59',
      timezone: 'UTC',
      title: 'Offer ends in',
      expired_message: 'This offer has ended',
      redirect_url: '',
      style: 'blocks',
      theme: 'light',
      bg_color: '#ffffff',
      text_color: '#1a1a1a',
      accent_color: '#8b5cf6',
      show_days: true,
      show_hours: true,
      show_minutes: true,
      show_seconds: true,
      show_labels: true,
    },
  },
  {
    type: 'contact_form',
    label: 'Contact Form',
    description: 'Beautiful popup or inline contact & lead form',
    icon: Mail,
    color: '#10b981',
    category: 'forms',
    available: true,
    defaultConfig: {
      title: 'Contact Us',
      subtitle: "Send us a message and we'll get back to you.",
      recipient_email: '',
      button_text: 'Send Message',
      button_color: '#6366f1',
      success_message: "Thank you! We'll be in touch soon.",
      display_mode: 'inline',
      trigger_text: '✉ Contact Us',
      trigger_style: 'button',
      fields: { name: true, email: true, phone: false, subject: false, message: true },
      required_fields: { name: true, email: true, message: true },
      theme: 'light',
      border_radius: 8,
      accent_color: '#6366f1',
    },
  },
  {
    type: 'social_follow',
    label: 'Social Follow',
    description: 'Multi-platform social media follow buttons',
    icon: Share2,
    color: '#ec4899',
    category: 'social',
    available: true,
    defaultConfig: {
      networks: { facebook: '', instagram: '', twitter: '', youtube: '' },
      layout: 'horizontal',
      style: 'filled',
      size: 'medium',
      show_labels: true,
      label_type: 'network_name',
      custom_label: 'Follow us',
      theme: 'light',
      border_radius: 50,
      animation: 'hover_grow',
    },
  },
  {
    type: 'youtube_feed',
    label: 'YouTube Feed',
    description: 'Show your latest YouTube videos in a grid',
    icon: Play,
    color: '#ff0000',
    category: 'social',
    available: true,
    defaultConfig: {
      channel_id: '',
      channel_url: '',
      max_results: 6,
      layout: 'grid',
      columns: 3,
      show_title: true,
      show_description: false,
      show_views: false,
      show_date: true,
      theme: 'light',
      accent_color: '#ff0000',
    },
  },
  {
    type: 'announcement_bar',
    label: 'Announcement Bar',
    description: 'Sticky top or bottom banner for promotions',
    icon: Megaphone,
    color: '#6366f1',
    category: 'tools',
    available: true,
    defaultConfig: {
      message: 'Special offer — Limited time only!',
      link_text: 'Shop now',
      link_url: '',
      position: 'top',
      bg_color: '#6366f1',
      text_color: '#ffffff',
      link_color: '#ffffff',
      show_close_button: true,
      show_emoji: true,
      emoji: '🎉',
      style: 'solid',
      is_sticky: true,
    },
  },
  {
    type: 'instagram_feed',
    label: 'Instagram Feed',
    description: 'Display your latest Instagram posts',
    icon: Camera,
    color: '#e4405f',
    category: 'social',
    available: true,
    comingSoon: false,
    navigateTo: '/dashboard/widgets/new/instagram_feed',
    defaultConfig: {
      username: '',
      layout: 'grid',
      columns: 3,
      show_caption: false,
      show_likes: true,
      show_video_icon: true,
      border_radius: '8px',
      gap: '8px',
      num_posts: 9,
      link_behavior: 'instagram',
      theme: 'light',
    },
  },
  {
    type: 'tiktok_feed',
    label: 'TikTok Feed',
    description: 'Embed your TikTok videos in a grid or carousel',
    icon: Music,
    color: '#2d2d2d',
    category: 'social',
    available: true,
    comingSoon: false,
    navigateTo: '/dashboard/widgets/new/tiktok_feed',
    defaultConfig: {
      username: '',
      layout: 'grid',
      columns: 3,
      show_duration: true,
      show_view_count: true,
      show_caption: false,
      show_like_count: true,
      border_radius: '8px',
      gap: '8px',
      num_videos: 9,
      autoplay_on_hover: false,
      theme: 'light',
    },
  },
]

const CATEGORY_LABELS: { id: Category; label: string }[] = [
  { id: 'all',     label: 'All' },
  { id: 'social',  label: 'Social' },
  { id: 'tools',   label: 'Tools' },
  { id: 'forms',   label: 'Forms' },
  { id: 'reviews', label: 'Reviews' },
]

export function NewWidgetModal({ onClose }: Props) {
  const router = useRouter()
  const [creating, setCreating] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<Category>('all')

  const filtered = WIDGET_TYPES.filter(w => filter === 'all' || w.category === filter)

  async function handleSelect(wt: WidgetType) {
    if (!wt.available || creating || wt.comingSoon) return

    if (wt.navigateTo) {
      router.push(wt.navigateTo)
      onClose()
      return
    }

    setCreating(wt.type)
    setError(null)

    try {
      const res = await fetch('/api/widgets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: `My ${wt.label}`, type: wt.type, config: wt.defaultConfig }),
      })

      if (!res.ok) {
        const data = await res.json()
        if (data.code === 'PLAN_LIMIT_REACHED') throw new Error('Widget limit reached. Upgrade your plan at Dashboard → Billing.')
        throw new Error(data.error ?? 'Failed to create widget')
      }

      const { widget } = await res.json()
      router.push(`/dashboard/widgets/${widget.id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setCreating(null)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col modal-animate">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 shrink-0">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Add a widget</h2>
            <p className="text-sm text-gray-400 mt-0.5">Choose the widget type to embed on your site</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Category tabs */}
        <div className="px-6 border-b border-gray-100 shrink-0">
          <div className="flex gap-0">
            {CATEGORY_LABELS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setFilter(id)}
                className={[
                  'px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors',
                  filter === id
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700',
                ].join(' ')}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Widget grid */}
        <div className="overflow-y-auto p-6">
          <div className="grid grid-cols-2 gap-3">
            {filtered.map((wt, i) => {
              const Icon = wt.icon
              const isLoading = creating === wt.type
              const isDisabled = !wt.available || !!creating

              return (
                <button
                  key={wt.type}
                  disabled={isDisabled || !!wt.comingSoon}
                  onClick={() => handleSelect(wt)}
                  className={[
                    'relative text-left rounded-xl border-2 p-4 transition-all card-animate group',
                    wt.comingSoon
                      ? 'border-gray-100 bg-gray-50 cursor-not-allowed opacity-70'
                      : isDisabled
                      ? 'border-gray-100 bg-gray-50 cursor-not-allowed opacity-60'
                      : 'border-gray-200 hover:border-indigo-300 hover:shadow-md cursor-pointer',
                    isLoading ? 'opacity-70' : '',
                  ].join(' ')}
                  style={{ animationDelay: `${i * 30}ms` }}
                >
                  <div className="flex items-start gap-3">
                    {/* Brand icon */}
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105"
                      style={{ background: `${wt.color}15` }}
                    >
                      <Icon size={20} style={{ color: wt.color }} />
                    </div>

                    <div className="min-w-0 flex-1">
                      {/* Type badge */}
                      <span
                        className="inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full mb-1"
                        style={{ background: `${wt.color}15`, color: wt.color }}
                      >
                        {wt.label}
                      </span>
                      <p className="text-xs text-gray-500 leading-relaxed">{wt.description}</p>
                    </div>
                  </div>

                  {isLoading && (
                    <p className="text-xs text-indigo-600 mt-2 font-semibold">Creating…</p>
                  )}

                  {/* Coming soon overlay */}
                  {wt.comingSoon && (
                    <div className="absolute inset-0 rounded-xl bg-white/80 flex items-center justify-center">
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded-full">
                        <Lock size={11} className="text-gray-500" />
                        <span className="text-xs font-semibold text-gray-600">Coming Soon</span>
                      </div>
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mx-6 mb-6 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700 shrink-0">
            {error}
          </div>
        )}
      </div>
    </div>
  )
}

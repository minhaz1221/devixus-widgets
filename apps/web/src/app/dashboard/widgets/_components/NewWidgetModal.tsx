'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { X } from 'lucide-react'

interface Props {
  onClose: () => void
}

const WIDGET_TYPES = [
  {
    type: 'whatsapp',
    label: 'WhatsApp Chat',
    description: 'Floating chat button that opens WhatsApp',
    color: 'border-green-200 hover:border-green-400 hover:bg-green-50',
    badge: 'bg-green-100 text-green-700',
    available: true,
    defaultConfig: {
      phone_number: '',
      welcome_message: 'Hello! How can I help you?',
      button_color: '#25D366',
      position: 'bottom-right',
      show_on_mobile: true,
      show_on_desktop: true,
    },
  },
  {
    type: 'testimonials',
    label: 'Testimonials',
    description: 'Scrollable customer testimonial cards',
    color: 'border-blue-200 hover:border-blue-400 hover:bg-blue-50',
    badge: 'bg-blue-100 text-blue-700',
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
    color: 'border-yellow-200 hover:border-yellow-400 hover:bg-yellow-50',
    badge: 'bg-yellow-100 text-yellow-700',
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
    description: 'Create urgency with a live countdown',
    color: 'border-purple-200 hover:border-purple-400 hover:bg-purple-50',
    badge: 'bg-purple-100 text-purple-700',
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
    description: 'Beautiful popup or inline contact form',
    color: 'border-orange-200 hover:border-orange-400 hover:bg-orange-50',
    badge: 'bg-orange-100 text-orange-700',
    available: true,
    defaultConfig: {
      title: 'Contact Us',
      subtitle: "Send us a message and we'll get back to you.",
      recipient_email: '',
      button_text: 'Send Message',
      button_color: '#ff6914',
      success_message: "Thank you! We'll be in touch soon.",
      display_mode: 'inline',
      trigger_text: '✉ Contact Us',
      trigger_style: 'button',
      fields: {
        name: true, email: true, phone: false,
        subject: false, message: true,
      },
      required_fields: {
        name: true, email: true, message: true,
      },
      theme: 'light',
      border_radius: 8,
      accent_color: '#ff6914',
    },
  },
  {
    type: 'social_follow',
    label: 'Social Follow',
    description: 'Social media follow buttons bundle',
    color: 'border-pink-200 hover:border-pink-400 hover:bg-pink-50',
    badge: 'bg-pink-100 text-pink-700',
    available: true,
    defaultConfig: {
      networks: {
        facebook: '',
        instagram: '',
        twitter: '',
        youtube: '',
      },
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
    description: 'Show your latest YouTube videos on your website',
    color: 'border-red-200 hover:border-red-400 hover:bg-red-50',
    badge: 'bg-red-100 text-red-700',
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
    description: 'Sticky top or bottom bar for promotions',
    color: 'border-orange-200 hover:border-orange-400 hover:bg-orange-50',
    badge: 'bg-orange-100 text-orange-700',
    available: true,
    defaultConfig: {
      message: '🎉 Special offer — Limited time only!',
      link_text: 'Shop now',
      link_url: '',
      position: 'top',
      bg_color: '#ff6914',
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
    description: 'Display your Instagram posts on any website',
    color: 'border-pink-200 hover:border-pink-400 hover:bg-pink-50',
    badge: 'bg-pink-100 text-pink-700',
    available: true,
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
    description: 'Embed your TikTok videos on any website',
    color: 'border-gray-200 hover:border-gray-400 hover:bg-gray-50',
    badge: 'bg-gray-100 text-gray-700',
    available: true,
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

export function NewWidgetModal({ onClose }: Props) {
  const router = useRouter()
  const [creating, setCreating] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleSelect(wt: typeof WIDGET_TYPES[0]) {
    if (!wt.available || creating) return

    // Widgets with dedicated creation pages
    if ('navigateTo' in wt && wt.navigateTo) {
      router.push(wt.navigateTo as string)
      onClose()
      return
    }

    setCreating(wt.type)
    setError(null)

    try {
      const res = await fetch('/api/widgets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `My ${wt.label}`,
          type: wt.type,
          config: wt.defaultConfig,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        if (data.code === 'PLAN_LIMIT_REACHED') {
          throw new Error('Widget limit reached. Upgrade your plan at Dashboard → Billing.')
        }
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
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Choose a widget type</h2>
            <p className="text-sm text-gray-500 mt-0.5">Select the widget you want to add to your site</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 grid grid-cols-2 gap-3">
          {WIDGET_TYPES.map(wt => (
            <button
              key={wt.type}
              disabled={!wt.available || creating !== null}
              onClick={() => handleSelect(wt)}
              className={[
                'relative text-left rounded-xl border-2 p-4 transition-all',
                wt.available
                  ? `${wt.color} cursor-pointer`
                  : 'border-gray-100 bg-gray-50 cursor-not-allowed opacity-60',
                creating === wt.type ? 'opacity-70' : '',
              ].join(' ')}
            >
              {!wt.available && (
                <span className="absolute top-3 right-3 text-xs bg-gray-200 text-gray-500 px-2 py-0.5 rounded-full">
                  Coming soon
                </span>
              )}
              <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full mb-2 ${wt.badge}`}>
                {wt.label}
              </span>
              <p className="text-sm text-gray-600">{wt.description}</p>
              {creating === wt.type && (
                <p className="text-xs text-blue-600 mt-2 font-medium">Creating…</p>
              )}
            </button>
          ))}
        </div>

        {error && (
          <div className="mx-6 mb-6 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}
      </div>
    </div>
  )
}

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
    color: 'border-yellow-200',
    badge: 'bg-yellow-100 text-yellow-700',
    available: false,
    defaultConfig: {},
  },
  {
    type: 'countdown',
    label: 'Countdown Timer',
    description: 'Urgency timer for sales and events',
    color: 'border-purple-200',
    badge: 'bg-purple-100 text-purple-700',
    available: false,
    defaultConfig: {},
  },
  {
    type: 'contact_form',
    label: 'Contact Form',
    description: 'Embedded contact form with email delivery',
    color: 'border-orange-200',
    badge: 'bg-orange-100 text-orange-700',
    available: false,
    defaultConfig: {},
  },
  {
    type: 'social_follow',
    label: 'Social Follow',
    description: 'Social media follow buttons bundle',
    color: 'border-pink-200',
    badge: 'bg-pink-100 text-pink-700',
    available: false,
    defaultConfig: {},
  },
]

export function NewWidgetModal({ onClose }: Props) {
  const router = useRouter()
  const [creating, setCreating] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleSelect(wt: typeof WIDGET_TYPES[0]) {
    if (!wt.available || creating) return
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

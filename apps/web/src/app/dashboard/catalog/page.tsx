'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  MessageCircle, Star, Play, Globe, Timer, Megaphone,
  Mail, Share2, Camera, Music, HelpCircle, Hash, MapPin, type LucideIcon,
} from 'lucide-react'

interface WidgetDef {
  label: string
  description: string
  icon: LucideIcon
  color: string
  category: string
  badge?: string
}

const WIDGETS: Record<string, WidgetDef> = {
  whatsapp: {
    label: 'WhatsApp Chat',
    description: 'Floating WhatsApp button that opens a chat window. Increases conversions by 30%.',
    icon: MessageCircle,
    color: '#25D366',
    category: 'chat',
  },
  testimonials: {
    label: 'Testimonials',
    description: 'Auto-playing slider or grid of customer testimonials with star ratings.',
    icon: Star,
    color: '#f59e0b',
    category: 'reviews',
    badge: 'Popular',
  },
  youtube_feed: {
    label: 'YouTube Feed',
    description: 'Display your latest YouTube videos in a grid, list, or carousel layout.',
    icon: Play,
    color: '#ff0000',
    category: 'social',
    badge: 'Popular',
  },
  google_reviews: {
    label: 'Google Reviews',
    description: 'Show your Google star rating and customer reviews automatically.',
    icon: Globe,
    color: '#4285f4',
    category: 'reviews',
  },
  countdown_timer: {
    label: 'Countdown Timer',
    description: 'Create urgency with a live countdown to a sale, launch, or event.',
    icon: Timer,
    color: '#8b5cf6',
    category: 'tools',
  },
  announcement_bar: {
    label: 'Announcement Bar',
    description: 'A dismissable top or bottom bar for promotions, shipping notices, and updates.',
    icon: Megaphone,
    color: '#6366f1',
    category: 'tools',
  },
  contact_form: {
    label: 'Contact Form',
    description: 'Beautiful contact form that sends submissions directly to your email.',
    icon: Mail,
    color: '#10b981',
    category: 'forms',
  },
  social_follow: {
    label: 'Social Follow',
    description: 'Showcase your social media profiles with branded icons and follow buttons.',
    icon: Share2,
    color: '#ec4899',
    category: 'social',
  },
  instagram_feed: {
    label: 'Instagram Feed',
    description: 'Show your Instagram photos in a stunning grid or masonry layout.',
    icon: Camera,
    color: '#e4405f',
    category: 'social',
  },
  tiktok_feed: {
    label: 'TikTok Feed',
    description: 'Embed your TikTok videos as a feed. Great for creators and brands.',
    icon: Music,
    color: '#2d2d2d',
    category: 'social',
  },
  faq_accordion: {
    label: 'FAQ',
    description: 'Collapsible FAQ accordion to answer common questions and boost SEO.',
    icon: HelpCircle,
    color: '#f97316',
    category: 'tools',
    badge: 'New',
  },
  number_counter: {
    label: 'Number Counter',
    description: 'Animated stats and metrics widget to showcase your achievements.',
    icon: Hash,
    color: '#06b6d4',
    category: 'tools',
    badge: 'New',
  },
  google_maps: {
    label: 'Google Maps',
    description: 'Embed an interactive Google Map showing your location or any address.',
    icon: MapPin,
    color: '#10b981',
    category: 'tools',
    badge: 'New',
  },
}

const CATEGORIES = [
  { key: 'all',     label: 'All' },
  { key: 'social',  label: 'Social' },
  { key: 'reviews', label: 'Reviews' },
  { key: 'forms',   label: 'Forms' },
  { key: 'tools',   label: 'Tools' },
  { key: 'chat',    label: 'Chat' },
]

export default function CatalogPage() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filtered = Object.entries(WIDGETS).filter(
    ([, def]) => activeCategory === 'all' || def.category === activeCategory
  )

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Widget Catalog</h1>
        <p className="text-gray-500 text-sm mt-1">All available widgets — click to add to your account</p>
      </div>

      {/* Category filter */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {CATEGORIES.map(cat => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={[
              'px-4 py-1.5 rounded-lg text-sm font-medium transition-colors',
              activeCategory === cat.key
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900',
            ].join(' ')}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Widget grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(([type, def]) => {
          const Icon = def.icon
          return (
            <div
              key={type}
              className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col gap-4 hover:shadow-md transition-shadow"
            >
              {/* Icon + badge row */}
              <div className="flex items-start justify-between gap-2">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${def.color}18` }}
                >
                  <Icon size={24} style={{ color: def.color }} />
                </div>
                {def.badge && (
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
                    {def.badge}
                  </span>
                )}
              </div>

              {/* Text */}
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 text-sm">{def.label}</h3>
                <p className="text-gray-500 text-xs mt-1 leading-relaxed">{def.description}</p>
              </div>

              {/* CTA */}
              <Link
                href={`/dashboard/widgets?new=1&type=${type}`}
                className="inline-flex items-center justify-center px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Add Widget
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}

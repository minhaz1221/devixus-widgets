'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Template {
  id: string
  name: string
  type: string
  category: string
  description: string
  config: Record<string, unknown>
}

const TEMPLATES: Template[] = [
  {
    id: 'yt-grid',
    name: 'YouTube Grid',
    type: 'youtube_feed',
    category: 'social',
    description: 'Classic 3-column grid showing your latest uploads',
    config: { layout: 'grid', columns: 3, theme: 'light', header_style: 'full', show_title: true, show_date: true, max_results: 9 },
  },
  {
    id: 'yt-dark',
    name: 'YouTube Dark Showcase',
    type: 'youtube_feed',
    category: 'social',
    description: 'Dark carousel for channel showcase pages',
    config: { layout: 'carousel', columns: 3, theme: 'dark', header_style: 'full', show_title: true, max_results: 8 },
  },
  {
    id: 'ig-grid',
    name: 'Instagram Business',
    type: 'instagram_feed',
    category: 'social',
    description: 'Clean grid with 9 posts, minimal gaps',
    config: { layout: 'grid', columns: 3, num_posts: 9, gap: '4px', border_radius: '0px' },
  },
  {
    id: 'tiktok-feed',
    name: 'TikTok Creator Feed',
    type: 'tiktok_feed',
    category: 'social',
    description: 'Masonry-style feed perfect for creators',
    config: { layout: 'grid', columns: 3, num_videos: 6, gap: '8px', border_radius: '12px' },
  },
  {
    id: 'google-showcase',
    name: 'Google Reviews Showcase',
    type: 'google_reviews',
    category: 'reviews',
    description: 'List layout showing 4+ star reviews with header',
    config: { layout: 'list', min_rating: 4, max_reviews: 6, show_header: true, show_overall_rating: true, theme: 'light' },
  },
  {
    id: 'testimonials-slider',
    name: 'Testimonials Slider',
    type: 'testimonials',
    category: 'reviews',
    description: 'Auto-playing carousel with card shadows',
    config: { layout: 'slider', theme: 'light', card_shadow: 'medium', show_quote_icon: true, show_arrows: true, autoplay: true },
  },
  {
    id: 'trust-badge',
    name: 'Trust Badge',
    type: 'testimonials',
    category: 'reviews',
    description: 'Compact 5-star only testimonials row',
    config: { layout: 'grid', columns: 3, theme: 'light', card_shadow: 'none', show_quote_icon: false },
  },
  {
    id: 'flash-sale',
    name: 'Flash Sale Countdown',
    type: 'countdown_timer',
    category: 'ecommerce',
    description: 'Red urgency-style countdown for sales',
    config: { style: 'blocks', theme: 'light', title: 'Sale ends in', accent_color: '#ef4444', bg_color: '#fff5f5' },
  },
  {
    id: 'holiday-banner',
    name: 'Holiday Banner',
    type: 'announcement_bar',
    category: 'ecommerce',
    description: 'Festive announcement bar with close button',
    config: { style: 'gradient', bg_color: '#6366f1', text_color: '#ffffff', position: 'top', is_sticky: true, show_close_button: true, message: '🎄 Holiday Sale — Free shipping on all orders!' },
  },
  {
    id: 'contact-full',
    name: 'Full Contact Form',
    type: 'contact_form',
    category: 'forms',
    description: 'Name, email, phone, subject, and message fields',
    config: { theme: 'light', display_mode: 'inline', accent_color: '#6366f1', fields: { name: true, email: true, phone: true, subject: true, message: true } },
  },
  {
    id: 'whatsapp-classic',
    name: 'WhatsApp Classic',
    type: 'whatsapp',
    category: 'chat',
    description: 'Standard WhatsApp button, bottom-right, pulsing',
    config: { button_color: '#25D366', button_size: 'medium', position: 'bottom-right', pulse_animation: true, tooltip_text: 'Chat with us!' },
  },
]

const TYPE_COLORS: Record<string, string> = {
  youtube_feed:     '#ff0000',
  instagram_feed:   '#e4405f',
  tiktok_feed:      '#2d2d2d',
  google_reviews:   '#4285f4',
  testimonials:     '#f59e0b',
  countdown_timer:  '#8b5cf6',
  announcement_bar: '#6366f1',
  contact_form:     '#10b981',
  whatsapp:         '#25D366',
  social_follow:    '#ec4899',
}

const TYPE_LABELS: Record<string, string> = {
  youtube_feed:     'YouTube Feed',
  instagram_feed:   'Instagram Feed',
  tiktok_feed:      'TikTok Feed',
  google_reviews:   'Google Reviews',
  testimonials:     'Testimonials',
  countdown_timer:  'Countdown Timer',
  announcement_bar: 'Announcement Bar',
  contact_form:     'Contact Form',
  whatsapp:         'WhatsApp Chat',
  social_follow:    'Social Follow',
}

const CATEGORIES = [
  { key: 'all',       label: 'All' },
  { key: 'social',    label: 'Social' },
  { key: 'reviews',   label: 'Reviews' },
  { key: 'ecommerce', label: 'E-Commerce' },
  { key: 'forms',     label: 'Forms' },
  { key: 'chat',      label: 'Chat' },
]

export default function TemplatesPage() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filtered = TEMPLATES.filter(
    t => activeCategory === 'all' || t.category === activeCategory
  )

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Templates</h1>
        <p className="text-gray-500 text-sm mt-1">Start with a pre-built template — customize it to make it yours</p>
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

      {/* Templates grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(template => {
          const color = TYPE_COLORS[template.type] ?? '#6366f1'
          const typeLabel = TYPE_LABELS[template.type] ?? template.type

          return (
            <div
              key={template.id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col"
            >
              {/* Colored header band */}
              <div
                className="h-9 shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${color}30 0%, ${color}15 100%)`,
                  borderBottom: `1px solid ${color}20`,
                }}
              />

              {/* Card body */}
              <div className="p-5 flex flex-col gap-3 flex-1">
                {/* Type badge */}
                <span
                  className="self-start text-[11px] font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: `${color}18`, color }}
                >
                  {typeLabel}
                </span>

                {/* Text */}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-sm">{template.name}</h3>
                  <p className="text-gray-500 text-xs mt-1 leading-relaxed">{template.description}</p>
                </div>

                {/* CTA */}
                <Link
                  href={`/dashboard/widgets?new=1&type=${template.type}&template=${template.id}`}
                  className="inline-flex items-center justify-center px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700 transition-colors mt-auto"
                >
                  Use Template
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

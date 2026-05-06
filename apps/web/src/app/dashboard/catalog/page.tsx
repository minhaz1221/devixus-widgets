'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  MessageCircle, Star, Play, Globe, Timer, Megaphone,
  Mail, Share2, Camera, Music, HelpCircle, Hash, MapPin,
  ShoppingCart, CreditCard, Radio, Mic2, FileText, Users,
  TrendingUp, Sparkles, Award, Flame, type LucideIcon,
} from 'lucide-react'

interface WidgetDef {
  label: string
  description: string
  icon: LucideIcon
  color: string
  categories: string[]
  badge?: 'BEST SELLER' | 'TRENDING' | 'NEW' | 'AI'
  available: boolean
  type?: string
}

const WIDGETS: WidgetDef[] = [
  // Social
  {
    label: 'Instagram Feed',
    description: 'Show your Instagram photos in a stunning grid or masonry layout.',
    icon: Camera, color: '#e4405f',
    categories: ['social'],
    badge: 'BEST SELLER', available: true, type: 'instagram_feed',
  },
  {
    label: 'TikTok Feed',
    description: 'Embed your TikTok videos as a feed. Great for creators and brands.',
    icon: Music, color: '#2d2d2d',
    categories: ['social'],
    badge: 'TRENDING', available: true, type: 'tiktok_feed',
  },
  {
    label: 'YouTube Gallery',
    description: 'Display your latest YouTube videos in a grid, list, or carousel.',
    icon: Play, color: '#ff0000',
    categories: ['social', 'video'],
    badge: 'BEST SELLER', available: true, type: 'youtube_feed',
  },
  {
    label: 'Twitter / X Feed',
    description: 'Show your latest tweets or a curated timeline on any page.',
    icon: Share2, color: '#000000',
    categories: ['social'],
    available: false,
  },
  {
    label: 'LinkedIn Feed',
    description: 'Showcase your professional content and company updates.',
    icon: Users, color: '#0A66C2',
    categories: ['social'],
    available: false,
  },
  {
    label: 'Pinterest Feed',
    description: 'Display your Pinterest boards and pins in a beautiful mosaic.',
    icon: Share2, color: '#E60023',
    categories: ['social'],
    available: false,
  },
  {
    label: 'Facebook Feed',
    description: 'Embed your Facebook page posts and updates automatically.',
    icon: Share2, color: '#1877F2',
    categories: ['social'],
    available: false,
  },
  {
    label: 'Social Follow',
    description: 'Showcase your social media profiles with branded follow buttons.',
    icon: Share2, color: '#ec4899',
    categories: ['social'],
    available: true, type: 'social_follow',
  },

  // Reviews
  {
    label: 'Google Reviews',
    description: 'Show your Google star rating and customer reviews automatically.',
    icon: Globe, color: '#4285f4',
    categories: ['reviews'],
    badge: 'BEST SELLER', available: true, type: 'google_reviews',
  },
  {
    label: 'Testimonials',
    description: 'Auto-playing slider or grid of customer testimonials with ratings.',
    icon: Star, color: '#f59e0b',
    categories: ['reviews'],
    badge: 'TRENDING', available: true, type: 'testimonials',
  },
  {
    label: 'Yelp Reviews',
    description: 'Import and display your Yelp ratings and reviews on your site.',
    icon: Star, color: '#d32323',
    categories: ['reviews'],
    available: false,
  },
  {
    label: 'Trustpilot Reviews',
    description: 'Display your Trustpilot score and reviews with live sync.',
    icon: Award, color: '#00b67a',
    categories: ['reviews'],
    available: false,
  },
  {
    label: 'Airbnb Reviews',
    description: 'Show your host ratings and guest reviews from Airbnb.',
    icon: Star, color: '#ff5a5f',
    categories: ['reviews'],
    available: false,
  },

  // E-Commerce
  {
    label: 'Pricing Table',
    description: 'Beautiful 3-tier pricing comparison table with feature lists.',
    icon: CreditCard, color: '#8b5cf6',
    categories: ['ecommerce'],
    badge: 'NEW', available: false,
  },
  {
    label: 'Countdown Timer',
    description: 'Create urgency with a live countdown to a sale, launch, or event.',
    icon: Timer, color: '#8b5cf6',
    categories: ['ecommerce', 'tools'],
    badge: 'BEST SELLER', available: true, type: 'countdown_timer',
  },
  {
    label: 'Product Cards',
    description: 'Showcase products with images, prices, and buy buttons.',
    icon: ShoppingCart, color: '#10b981',
    categories: ['ecommerce'],
    available: false,
  },

  // Chat
  {
    label: 'WhatsApp Chat',
    description: 'Floating WhatsApp button that opens a chat. Boosts conversions 30%.',
    icon: MessageCircle, color: '#25D366',
    categories: ['chat'],
    badge: 'BEST SELLER', available: true, type: 'whatsapp',
  },
  {
    label: 'AI Chatbot',
    description: 'Embed a GPT-powered chatbot trained on your business content.',
    icon: Sparkles, color: '#6366f1',
    categories: ['chat'],
    badge: 'AI', available: false,
  },
  {
    label: 'Facebook Chat',
    description: 'Add Facebook Messenger live chat to any website page.',
    icon: MessageCircle, color: '#0084ff',
    categories: ['chat'],
    available: false,
  },

  // Forms
  {
    label: 'Contact Form',
    description: 'Beautiful contact form that sends submissions to your email.',
    icon: Mail, color: '#10b981',
    categories: ['forms'],
    available: true, type: 'contact_form',
  },
  {
    label: 'Announcement Bar',
    description: 'Dismissable top or bottom bar for promotions and updates.',
    icon: Megaphone, color: '#6366f1',
    categories: ['forms', 'tools'],
    available: true, type: 'announcement_bar',
  },
  {
    label: 'Subscription Form',
    description: 'Capture email subscribers with a clean, conversion-focused form.',
    icon: Mail, color: '#6366f1',
    categories: ['forms'],
    available: false,
  },

  // Video
  {
    label: 'Video Gallery',
    description: 'Beautiful video gallery that plays inline with autoplay support.',
    icon: Play, color: '#7c3aed',
    categories: ['video'],
    available: false,
  },

  // Audio
  {
    label: 'Radio Player',
    description: 'Embed a live radio stream player with station info and artwork.',
    icon: Radio, color: '#0ea5e9',
    categories: ['audio'],
    available: false,
  },
  {
    label: 'Spotify Player',
    description: 'Embed Spotify tracks, albums, or playlists on your website.',
    icon: Mic2, color: '#1DB954',
    categories: ['audio'],
    available: false,
  },

  // Tools
  {
    label: 'FAQ Accordion',
    description: 'Collapsible FAQ accordion to answer common questions and boost SEO.',
    icon: HelpCircle, color: '#f97316',
    categories: ['tools'],
    badge: 'NEW', available: true, type: 'faq_accordion',
  },
  {
    label: 'Number Counter',
    description: 'Animated stats widget to showcase your achievements and metrics.',
    icon: Hash, color: '#06b6d4',
    categories: ['tools'],
    badge: 'NEW', available: true, type: 'number_counter',
  },
  {
    label: 'Google Maps',
    description: 'Embed an interactive Google Map showing your location.',
    icon: MapPin, color: '#10b981',
    categories: ['tools'],
    badge: 'NEW', available: true, type: 'google_maps',
  },
  {
    label: 'Weather Widget',
    description: 'Show live weather for any location with forecast support.',
    icon: TrendingUp, color: '#3b82f6',
    categories: ['tools'],
    available: false,
  },
  {
    label: 'Restaurant Menu',
    description: 'Display your restaurant menu with categories, prices, and photos.',
    icon: FileText, color: '#f59e0b',
    categories: ['tools'],
    available: false,
  },
]

type CategoryKey = 'all' | 'social' | 'reviews' | 'ecommerce' | 'chat' | 'forms' | 'video' | 'audio' | 'tools'

const SIDEBAR_SECTIONS = [
  { key: 'highlights', label: 'Highlights', items: [
    { key: 'all',      label: 'All Apps',    icon: Flame },
    { key: 'social',   label: 'Social',      icon: Share2 },
    { key: 'reviews',  label: 'Reviews',     icon: Star },
  ] },
  { key: 'categories', label: 'Categories', items: [
    { key: 'ecommerce', label: 'E-Commerce', icon: ShoppingCart },
    { key: 'chat',      label: 'Chat',        icon: MessageCircle },
    { key: 'forms',     label: 'Forms',       icon: Mail },
    { key: 'video',     label: 'Video',       icon: Play },
    { key: 'audio',     label: 'Audio',       icon: Radio },
    { key: 'tools',     label: 'Tools',       icon: Hash },
  ] },
]

const BADGE_STYLES: Record<string, string> = {
  'BEST SELLER': 'bg-pink-100 text-pink-700',
  'TRENDING':    'bg-green-100 text-green-700',
  'NEW':         'bg-blue-100 text-blue-700',
  'AI':          'bg-violet-100 text-violet-700',
}

function WidgetCard({ def }: { def: WidgetDef }) {
  const Icon = def.icon
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md hover:border-indigo-200 transition-all group">
      {/* Preview area */}
      <div
        className="h-36 flex items-center justify-center relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${def.color}15 0%, ${def.color}30 100%)` }}
      >
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: `repeating-linear-gradient(45deg, ${def.color} 0, ${def.color} 1px, transparent 0, transparent 50%)`, backgroundSize: '10px 10px' }}
        />
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg relative"
          style={{ background: def.color }}
        >
          <Icon size={30} className="text-white" />
        </div>
        {def.badge && (
          <span className={`absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full ${BADGE_STYLES[def.badge]}`}>
            {def.badge}
          </span>
        )}
        {!def.available && (
          <span className="absolute bottom-3 left-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-900/70 text-white backdrop-blur-sm">
            COMING SOON
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-sm mb-1">{def.label}</h3>
        <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-3">{def.description}</p>

        {def.available && def.type ? (
          <Link
            href={`/dashboard/widgets?new=1&type=${def.type}`}
            className="inline-flex items-center justify-center w-full px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700 transition-colors group-hover:shadow-sm"
          >
            Add to My Apps
          </Link>
        ) : (
          <button
            disabled
            className="inline-flex items-center justify-center w-full px-4 py-2 bg-gray-100 text-gray-400 text-xs font-semibold rounded-lg cursor-not-allowed"
          >
            Coming Soon
          </button>
        )}
      </div>
    </div>
  )
}

export default function CatalogPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('all')

  const filtered = WIDGETS.filter(
    w => activeCategory === 'all' || w.categories.includes(activeCategory)
  )

  const availableCount = filtered.filter(w => w.available).length
  const totalCount = filtered.length

  return (
    <div className="flex gap-6 max-w-7xl mx-auto">
      {/* Left sidebar */}
      <aside className="w-48 shrink-0 hidden lg:block">
        <div className="sticky top-4 space-y-5">
          {SIDEBAR_SECTIONS.map(section => (
            <div key={section.key}>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2 mb-1">
                {section.label}
              </p>
              <div className="space-y-0.5">
                {section.items.map(item => {
                  const SideIcon = item.icon
                  const isActive = activeCategory === item.key
                  return (
                    <button
                      key={item.key}
                      onClick={() => setActiveCategory(item.key as CategoryKey)}
                      className={[
                        'w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all text-left',
                        isActive
                          ? 'bg-indigo-50 text-indigo-700'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
                      ].join(' ')}
                    >
                      <SideIcon size={15} className={isActive ? 'text-indigo-600' : 'text-gray-400'} />
                      {item.label}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 min-w-0 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Widget Catalog</h1>
            <p className="text-gray-500 text-sm mt-0.5">
              {availableCount} available · {totalCount - availableCount} coming soon
            </p>
          </div>
        </div>

        {/* Mobile category tabs */}
        <div className="flex items-center gap-1.5 flex-wrap lg:hidden">
          {[
            { key: 'all', label: 'All' },
            { key: 'social', label: 'Social' },
            { key: 'reviews', label: 'Reviews' },
            { key: 'chat', label: 'Chat' },
            { key: 'forms', label: 'Forms' },
            { key: 'tools', label: 'Tools' },
          ].map(cat => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key as CategoryKey)}
              className={[
                'px-4 py-1.5 rounded-lg text-sm font-medium transition-colors',
                activeCategory === cat.key
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50',
              ].join(' ')}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Widget grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((def, i) => (
            <WidgetCard key={i} def={def} />
          ))}
        </div>
      </div>
    </div>
  )
}

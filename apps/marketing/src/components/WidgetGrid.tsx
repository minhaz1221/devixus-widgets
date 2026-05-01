import Link from 'next/link'

const WEB_APP = 'https://devixus-widgets-web.vercel.app'

/* Brand SVG icons — inline paths */
function WhatsAppIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#25D366" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function YouTubeIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#FF0000" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

function GoogleIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  )
}

function InstagramIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f09433" />
          <stop offset="25%" stopColor="#e6683c" />
          <stop offset="50%" stopColor="#dc2743" />
          <stop offset="75%" stopColor="#cc2366" />
          <stop offset="100%" stopColor="#bc1888" />
        </linearGradient>
      </defs>
      <path fill="url(#ig-grad)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  )
}

function TikTokIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#000" aria-hidden="true">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  )
}

import { Clock, Megaphone, Mail, Share2 } from 'lucide-react'
import React from 'react'

const WIDGETS = [
  {
    slug: 'whatsapp-chat-button',
    name: 'WhatsApp Chat',
    description: 'Let visitors message you instantly. Boost leads and support.',
    icon: <WhatsAppIcon />,
    bg: '#f0fdf4',
    available: true,
  },
  {
    slug: 'youtube-feed',
    name: 'YouTube Feed',
    description: 'Display your latest videos. Grow your channel from your site.',
    icon: <YouTubeIcon />,
    bg: '#fff1f2',
    available: true,
  },
  {
    slug: 'google-reviews',
    name: 'Google Reviews',
    description: 'Auto-sync your Google Business reviews. Build instant trust.',
    icon: <GoogleIcon />,
    bg: '#fefce8',
    available: true,
  },
  {
    slug: 'countdown-timer',
    name: 'Countdown Timer',
    description: 'Create urgency for sales, launches, and events.',
    icon: <Clock size={28} strokeWidth={1.5} className="text-indigo-600" />,
    bg: '#eef2ff',
    available: true,
  },
  {
    slug: 'announcement-bar',
    name: 'Announcement Bar',
    description: 'Sticky top or bottom bar for promotions and announcements.',
    icon: <Megaphone size={28} strokeWidth={1.5} className="text-amber-500" />,
    bg: '#fffbeb',
    available: true,
  },
  {
    slug: 'contact-form',
    name: 'Contact Form',
    description: 'Beautiful popup or inline form. Submissions go straight to your inbox.',
    icon: <Mail size={28} strokeWidth={1.5} className="text-blue-500" />,
    bg: '#eff6ff',
    available: true,
  },
  {
    slug: 'social-follow-buttons',
    name: 'Social Follow',
    description: 'Grow your following across all platforms in one widget.',
    icon: <Share2 size={28} strokeWidth={1.5} className="text-violet-500" />,
    bg: '#f5f3ff',
    available: true,
  },
  {
    slug: 'instagram-feed',
    name: 'Instagram Feed',
    description: 'Embed your Instagram posts in a gorgeous grid or carousel.',
    icon: <InstagramIcon />,
    bg: '#fdf2f8',
    available: true,
    comingSoon: true,
  },
  {
    slug: 'tiktok-feed',
    name: 'TikTok Feed',
    description: 'Showcase your TikTok videos with view counts and likes.',
    icon: <TikTokIcon />,
    bg: '#f9fafb',
    available: true,
    comingSoon: true,
  },
]

export function WidgetGrid() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14 reveal">
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Everything your website needs
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
            9 powerful widgets, all free to start. Customize and embed in minutes.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {WIDGETS.map((w, i) => (
            <div
              key={w.slug}
              className={`reveal reveal-delay-${Math.min(i + 1, 6)} group relative rounded-2xl border border-gray-100 p-6 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${w.comingSoon ? 'opacity-70' : ''}`}
            >
              {w.comingSoon && (
                <span className="absolute top-4 right-4 text-xs font-semibold bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                  Coming soon
                </span>
              )}

              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ background: w.bg }}
              >
                {w.icon}
              </div>

              <h3 className="font-semibold text-gray-900 text-base">{w.name}</h3>
              <p className="text-sm text-gray-500 mt-1 leading-relaxed">{w.description}</p>

              {!w.comingSoon && (
                <a
                  href={`${WEB_APP}/signup`}
                  className="mt-4 inline-flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors opacity-0 group-hover:opacity-100"
                >
                  Try it free →
                </a>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-10 reveal">
          <Link
            href="/widgets"
            className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            View all widgets →
          </Link>
        </div>
      </div>
    </section>
  )
}

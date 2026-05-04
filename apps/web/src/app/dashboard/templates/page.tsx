'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, Zap, Check } from 'lucide-react'

interface Template {
  id: string
  name: string
  widgetType: string
  category: string
  description: string
  isPro: boolean
  accent: string
  bg: string
  config: Record<string, unknown>
}

const TEMPLATES: Template[] = [
  // ── WhatsApp ──────────────────────────────────────────────────────────────
  {
    id: 'wa-classic',
    name: 'Classic Green',
    widgetType: 'whatsapp',
    category: 'chat',
    description: 'Standard WhatsApp button with pulse animation, bottom-right corner.',
    isPro: false,
    accent: '#25D366',
    bg: '#f0fdf4',
    config: { button_color: '#25D366', button_size: 'medium', position: 'bottom-right', pulse_animation: true, tooltip_text: 'Chat with us!', show_on_mobile: true, show_on_desktop: true },
  },
  {
    id: 'wa-dark',
    name: 'Dark Mode',
    widgetType: 'whatsapp',
    category: 'chat',
    description: 'Dark-styled button for dark-themed websites.',
    isPro: false,
    accent: '#128C7E',
    bg: '#0f172a',
    config: { button_color: '#128C7E', button_size: 'large', position: 'bottom-right', pulse_animation: false, tooltip_text: 'Message us!', show_on_mobile: true, show_on_desktop: true },
  },
  {
    id: 'wa-brand',
    name: 'Brand Colors Pro',
    widgetType: 'whatsapp',
    category: 'chat',
    description: 'Custom brand color button with animated tooltip for higher CTR.',
    isPro: true,
    accent: '#6366f1',
    bg: '#eef2ff',
    config: { button_color: '#6366f1', button_size: 'large', position: 'bottom-right', pulse_animation: true, tooltip_text: 'We reply in minutes!', show_on_mobile: true, show_on_desktop: true },
  },
  // ── Testimonials ──────────────────────────────────────────────────────────
  {
    id: 'test-slider',
    name: 'Light Slider',
    widgetType: 'testimonials',
    category: 'reviews',
    description: 'Auto-playing slider with arrows, card shadows, and star ratings.',
    isPro: false,
    accent: '#f59e0b',
    bg: '#fffbeb',
    config: { layout: 'slider', theme: 'light', card_shadow: 'medium', show_quote_icon: true, show_arrows: true, autoplay: true, autoplay_speed: 4000, show_rating: true, avatar_shape: 'circle' },
  },
  {
    id: 'test-grid',
    name: 'Trust Grid',
    widgetType: 'testimonials',
    category: 'reviews',
    description: '2-column grid showing multiple testimonials at once.',
    isPro: false,
    accent: '#10b981',
    bg: '#f0fdf4',
    config: { layout: 'grid', columns: 2, theme: 'light', card_shadow: 'small', show_quote_icon: false, show_rating: true, avatar_shape: 'circle' },
  },
  {
    id: 'test-dark',
    name: 'Dark Elegance',
    widgetType: 'testimonials',
    category: 'reviews',
    description: 'Premium dark-themed testimonial slider for luxury brands.',
    isPro: true,
    accent: '#8b5cf6',
    bg: '#1e1b4b',
    config: { layout: 'slider', theme: 'dark', card_shadow: 'large', show_quote_icon: true, show_arrows: true, autoplay: true, show_rating: true, avatar_shape: 'circle' },
  },
  // ── YouTube Feed ──────────────────────────────────────────────────────────
  {
    id: 'yt-grid',
    name: 'Grid Classic',
    widgetType: 'youtube_feed',
    category: 'social',
    description: '3-column grid showing latest uploads with channel header.',
    isPro: false,
    accent: '#ff0000',
    bg: '#fff5f5',
    config: { layout: 'grid', columns: 3, theme: 'light', header_style: 'full', show_title: true, show_date: true, max_results: 9, accent_color: '#ff0000' },
  },
  {
    id: 'yt-dark',
    name: 'Dark Showcase',
    widgetType: 'youtube_feed',
    category: 'social',
    description: 'Dark-themed channel showcase with subscriber count.',
    isPro: true,
    accent: '#ff0000',
    bg: '#0f0f0f',
    config: { layout: 'grid', columns: 3, theme: 'dark', header_style: 'full', show_title: true, show_subscriber_count: true, max_results: 6, accent_color: '#ff0000' },
  },
  {
    id: 'yt-list',
    name: 'List View',
    widgetType: 'youtube_feed',
    category: 'social',
    description: 'Horizontal list layout for a blog-style video feed.',
    isPro: false,
    accent: '#ef4444',
    bg: '#fef2f2',
    config: { layout: 'list', theme: 'light', header_style: 'compact', show_title: true, show_view_count: true, max_results: 5, accent_color: '#ef4444' },
  },
  // ── Google Reviews ────────────────────────────────────────────────────────
  {
    id: 'gr-cards',
    name: 'Review Cards',
    widgetType: 'google_reviews',
    category: 'reviews',
    description: 'Grid of review cards showing 5-star reviews with photos.',
    isPro: false,
    accent: '#4285f4',
    bg: '#eff6ff',
    config: { layout: 'grid', min_rating: 4, max_reviews: 6, show_header: true, show_overall_rating: true, show_review_date: true, show_reviewer_photo: true, theme: 'light', accent_color: '#4285f4', write_review_link: true },
  },
  {
    id: 'gr-dark',
    name: 'Dark Reviews',
    widgetType: 'google_reviews',
    category: 'reviews',
    description: 'Dark-themed review display for dark-background websites.',
    isPro: true,
    accent: '#4285f4',
    bg: '#0f172a',
    config: { layout: 'grid', min_rating: 4, max_reviews: 6, show_header: true, show_overall_rating: true, show_reviewer_photo: true, theme: 'dark', accent_color: '#4285f4', write_review_link: false },
  },
  {
    id: 'gr-list',
    name: 'List Showcase',
    widgetType: 'google_reviews',
    category: 'reviews',
    description: 'Full-width list layout, great for review-focused landing pages.',
    isPro: false,
    accent: '#34a853',
    bg: '#f0fdf4',
    config: { layout: 'list', min_rating: 5, max_reviews: 8, show_header: true, show_overall_rating: true, show_review_date: true, show_reviewer_photo: true, theme: 'light', accent_color: '#34a853', write_review_link: true },
  },
  // ── Countdown Timer ───────────────────────────────────────────────────────
  {
    id: 'cd-sale',
    name: 'Flash Sale',
    widgetType: 'countdown_timer',
    category: 'ecommerce',
    description: 'Red urgency countdown for limited-time sales.',
    isPro: false,
    accent: '#ef4444',
    bg: '#fef2f2',
    config: { style: 'blocks', theme: 'light', title: 'Sale ends in', accent_color: '#ef4444', bg_color: '#fff5f5', text_color: '#1a1a1a', show_days: true, show_hours: true, show_minutes: true, show_seconds: true, show_labels: true },
  },
  {
    id: 'cd-launch',
    name: 'Product Launch',
    widgetType: 'countdown_timer',
    category: 'ecommerce',
    description: 'Purple minimalist countdown for product or event launches.',
    isPro: false,
    accent: '#8b5cf6',
    bg: '#f5f3ff',
    config: { style: 'minimal', theme: 'light', title: 'Launching in', accent_color: '#8b5cf6', bg_color: '#ffffff', text_color: '#1a1a1a', show_days: true, show_hours: true, show_minutes: true, show_seconds: true, show_labels: true },
  },
  {
    id: 'cd-dark-event',
    name: 'Dark Event',
    widgetType: 'countdown_timer',
    category: 'ecommerce',
    description: 'Dramatic dark countdown for concerts, webinars, and events.',
    isPro: true,
    accent: '#f59e0b',
    bg: '#111827',
    config: { style: 'blocks', theme: 'dark', title: 'Event starts in', accent_color: '#f59e0b', bg_color: '#1e293b', text_color: '#f1f5f9', show_days: true, show_hours: true, show_minutes: true, show_seconds: true, show_labels: true },
  },
  // ── Announcement Bar ──────────────────────────────────────────────────────
  {
    id: 'ann-promo',
    name: 'Promo Banner',
    widgetType: 'announcement_bar',
    category: 'ecommerce',
    description: 'Indigo banner for promotions with CTA link and close button.',
    isPro: false,
    accent: '#6366f1',
    bg: '#eef2ff',
    config: { message: 'Free shipping on all orders over $50!', link_text: 'Shop now', link_url: '', position: 'top', bg_color: '#6366f1', text_color: '#ffffff', link_color: '#ffffff', show_close_button: true, show_emoji: true, emoji: '🚚', style: 'solid', is_sticky: true },
  },
  {
    id: 'ann-gradient',
    name: 'Gradient Bar',
    widgetType: 'announcement_bar',
    category: 'ecommerce',
    description: 'Eye-catching gradient bar for holiday and seasonal campaigns.',
    isPro: false,
    accent: '#ec4899',
    bg: '#fdf2f8',
    config: { message: 'Holiday Sale — Up to 50% off everything!', link_text: 'See deals', link_url: '', position: 'top', bg_color: '#ec4899', text_color: '#ffffff', link_color: '#ffffff', show_close_button: true, show_emoji: true, emoji: '🎉', style: 'gradient', is_sticky: true },
  },
  {
    id: 'ann-dark',
    name: 'Dark Alert',
    widgetType: 'announcement_bar',
    category: 'ecommerce',
    description: 'Minimal dark bar for important notices and system updates.',
    isPro: true,
    accent: '#1f2937',
    bg: '#f9fafb',
    config: { message: 'Scheduled maintenance on Saturday 10–11pm UTC.', link_text: 'Learn more', link_url: '', position: 'top', bg_color: '#1f2937', text_color: '#f9fafb', link_color: '#6366f1', show_close_button: true, show_emoji: false, emoji: '', style: 'solid', is_sticky: true },
  },
  // ── Contact Form ──────────────────────────────────────────────────────────
  {
    id: 'cf-minimal',
    name: 'Minimal',
    widgetType: 'contact_form',
    category: 'forms',
    description: 'Clean name + email + message form, perfect for any site.',
    isPro: false,
    accent: '#6366f1',
    bg: '#eef2ff',
    config: { title: 'Contact Us', subtitle: "We'd love to hear from you.", button_text: 'Send Message', button_color: '#6366f1', theme: 'light', display_mode: 'inline', accent_color: '#6366f1', border_radius: 8, fields: { name: true, email: true, phone: false, subject: false, message: true }, required_fields: { name: true, email: true, message: true } },
  },
  {
    id: 'cf-full',
    name: 'Full Form',
    widgetType: 'contact_form',
    category: 'forms',
    description: 'All fields: name, email, phone, subject, and message.',
    isPro: false,
    accent: '#10b981',
    bg: '#f0fdf4',
    config: { title: 'Get in Touch', subtitle: 'Fill in the form and our team will get back to you within 24 hours.', button_text: 'Submit', button_color: '#10b981', theme: 'light', display_mode: 'inline', accent_color: '#10b981', border_radius: 12, fields: { name: true, email: true, phone: true, subject: true, message: true }, required_fields: { name: true, email: true, message: true } },
  },
  {
    id: 'cf-dark',
    name: 'Dark Pro',
    widgetType: 'contact_form',
    category: 'forms',
    description: 'Premium dark-themed form for modern dark websites.',
    isPro: true,
    accent: '#6366f1',
    bg: '#0f172a',
    config: { title: 'Say Hello', subtitle: 'Drop us a message and we\'ll respond within 24 hours.', button_text: 'Send Message', button_color: '#6366f1', theme: 'dark', display_mode: 'inline', accent_color: '#6366f1', border_radius: 12, fields: { name: true, email: true, phone: false, subject: true, message: true }, required_fields: { name: true, email: true, message: true } },
  },
  // ── Social Follow ─────────────────────────────────────────────────────────
  {
    id: 'sf-row',
    name: 'Filled Row',
    widgetType: 'social_follow',
    category: 'social',
    description: 'Horizontal row of filled social buttons with network labels.',
    isPro: false,
    accent: '#ec4899',
    bg: '#fdf2f8',
    config: { layout: 'horizontal', style: 'filled', size: 'medium', show_labels: true, label_type: 'network_name', theme: 'light', border_radius: 8, animation: 'hover_grow', networks: {} },
  },
  {
    id: 'sf-icons',
    name: 'Icon Grid',
    widgetType: 'social_follow',
    category: 'social',
    description: 'Compact icon-only grid, perfect for footers and sidebars.',
    isPro: false,
    accent: '#6366f1',
    bg: '#eef2ff',
    config: { layout: 'grid', style: 'minimal', size: 'medium', show_labels: false, label_type: 'network_name', theme: 'light', border_radius: 50, animation: 'hover_bounce', networks: {} },
  },
  // ── FAQ ────────────────────────────────────────────────────────────────────
  {
    id: 'faq-light',
    name: 'Clean Light',
    widgetType: 'faq_accordion',
    category: 'tools',
    description: 'Minimal white accordion, great for product and service FAQs.',
    isPro: false,
    accent: '#6366f1',
    bg: '#eef2ff',
    config: { questions: [], allow_multiple: false, open_first: true, theme: 'light', accent_color: '#6366f1', border_radius: 8, show_icon: true },
  },
  {
    id: 'faq-dark',
    name: 'Dark FAQ',
    widgetType: 'faq_accordion',
    category: 'tools',
    description: 'Dark-themed accordion for dark-background pages.',
    isPro: true,
    accent: '#8b5cf6',
    bg: '#1e1b4b',
    config: { questions: [], allow_multiple: false, open_first: true, theme: 'dark', accent_color: '#8b5cf6', border_radius: 10, show_icon: true },
  },
  {
    id: 'faq-orange',
    name: 'Help Center',
    widgetType: 'faq_accordion',
    category: 'tools',
    description: 'Orange accented accordion, perfect for help center pages.',
    isPro: false,
    accent: '#f97316',
    bg: '#fff7ed',
    config: { questions: [], allow_multiple: true, open_first: true, theme: 'light', accent_color: '#f97316', border_radius: 6, show_icon: true, title: 'Frequently Asked Questions' },
  },
  // ── Number Counter ────────────────────────────────────────────────────────
  {
    id: 'nc-stats',
    name: 'Stats Banner',
    widgetType: 'number_counter',
    category: 'tools',
    description: 'Clean white cards with big numbers for key business metrics.',
    isPro: false,
    accent: '#6366f1',
    bg: '#eef2ff',
    config: { stats: [], animate: true, theme: 'light', accent_color: '#6366f1', columns: 3, title: 'Our Numbers' },
  },
  {
    id: 'nc-dark',
    name: 'Dark Metrics',
    widgetType: 'number_counter',
    category: 'tools',
    description: 'Bold dark-themed stats display for impressive impact.',
    isPro: true,
    accent: '#06b6d4',
    bg: '#0c1222',
    config: { stats: [], animate: true, theme: 'dark', accent_color: '#06b6d4', columns: 3 },
  },
  {
    id: 'nc-teal',
    name: 'Teal Counters',
    widgetType: 'number_counter',
    category: 'tools',
    description: 'Teal-accented stat cards, great for SaaS and tech websites.',
    isPro: false,
    accent: '#06b6d4',
    bg: '#ecfeff',
    config: { stats: [], animate: true, theme: 'light', accent_color: '#06b6d4', columns: 4 },
  },
  // ── Google Maps ───────────────────────────────────────────────────────────
  {
    id: 'gm-standard',
    name: 'Location Map',
    widgetType: 'google_maps',
    category: 'tools',
    description: 'Clean embedded map with rounded corners for contact pages.',
    isPro: false,
    accent: '#10b981',
    bg: '#f0fdf4',
    config: { embed_url: '', height: 400, border_radius: 12, title: 'Find Us' },
  },
  {
    id: 'gm-tall',
    name: 'Tall Map',
    widgetType: 'google_maps',
    category: 'tools',
    description: 'Taller map embed for sidebar placement or full feature sections.',
    isPro: false,
    accent: '#4285f4',
    bg: '#eff6ff',
    config: { embed_url: '', height: 550, border_radius: 8 },
  },
]

const TYPE_META: Record<string, { label: string; color: string }> = {
  whatsapp:         { label: 'WhatsApp Chat',    color: '#25D366' },
  testimonials:     { label: 'Testimonials',      color: '#f59e0b' },
  youtube_feed:     { label: 'YouTube Feed',      color: '#ff0000' },
  google_reviews:   { label: 'Google Reviews',    color: '#4285f4' },
  countdown_timer:  { label: 'Countdown Timer',   color: '#8b5cf6' },
  announcement_bar: { label: 'Announcement Bar',  color: '#6366f1' },
  contact_form:     { label: 'Contact Form',      color: '#10b981' },
  social_follow:    { label: 'Social Follow',     color: '#ec4899' },
  instagram_feed:   { label: 'Instagram Feed',    color: '#e4405f' },
  tiktok_feed:      { label: 'TikTok Feed',       color: '#2d2d2d' },
  faq_accordion:    { label: 'FAQ',               color: '#f97316' },
  number_counter:   { label: 'Number Counter',    color: '#06b6d4' },
  google_maps:      { label: 'Google Maps',       color: '#10b981' },
}

const CATEGORIES = [
  { key: 'all',       label: 'All' },
  { key: 'social',    label: 'Social' },
  { key: 'reviews',   label: 'Reviews' },
  { key: 'ecommerce', label: 'E-Commerce' },
  { key: 'forms',     label: 'Forms' },
  { key: 'chat',      label: 'Chat' },
  { key: 'tools',     label: 'Tools' },
]

function MiniPreview({ template }: { template: Template }) {
  const { widgetType, accent, bg, isPro } = template
  const a = accent
  const isLight = bg.startsWith('#f') || bg.startsWith('#e') || bg.startsWith('#fff') || bg === '#ecfeff'
  const textColor = isLight ? '#1f2937' : '#f1f5f9'
  const subColor = isLight ? '#6b7280' : '#94a3b8'
  const cardBg = isLight ? '#ffffff' : '#1e293b'

  if (widgetType === 'whatsapp') {
    return (
      <div className="h-28 relative rounded-t-xl overflow-hidden" style={{ background: bg }}>
        <div className="absolute inset-0 p-3 flex items-end justify-end">
          <div className="w-12 h-12 rounded-full shadow-lg flex items-center justify-center" style={{ background: a }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a6.37 6.37 0 0 0-.57-.01c-.198 0-.52.074-.792.372C7.092 9.675 6 10.845 6 12.312c0 1.466 1.065 2.88 1.213 3.078.149.199 2.096 3.2 5.077 4.487.709.306 1.262.49 1.694.626.712.226 1.36.194 1.872.118.57-.085 1.758-.72 2.005-1.413.248-.694.248-1.29.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
          </div>
        </div>
        <div className="absolute inset-0 p-3">
          <div className="h-2 rounded" style={{ background: `${textColor}20`, width: '60%', marginBottom: 4 }} />
          <div className="h-2 rounded" style={{ background: `${textColor}10`, width: '40%' }} />
        </div>
      </div>
    )
  }

  if (widgetType === 'testimonials') {
    return (
      <div className="h-28 rounded-t-xl overflow-hidden p-3" style={{ background: bg }}>
        <div className="rounded-lg p-2.5 shadow-sm" style={{ background: cardBg }}>
          <div className="flex gap-0.5 mb-1.5">{[1,2,3,4,5].map(i => <div key={i} className="w-2 h-2 rounded-sm" style={{ background: i <= 5 ? '#f59e0b' : '#e5e7eb' }} />)}</div>
          <div className="h-1.5 rounded mb-1" style={{ background: `${subColor}30`, width: '90%' }} />
          <div className="h-1.5 rounded mb-2" style={{ background: `${subColor}20`, width: '70%' }} />
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded-full" style={{ background: a }} />
            <div className="h-1.5 rounded" style={{ background: `${textColor}30`, width: '40%' }} />
          </div>
        </div>
      </div>
    )
  }

  if (widgetType === 'youtube_feed' || widgetType === 'instagram_feed' || widgetType === 'tiktok_feed') {
    const colors = ['#FF6B6B','#4ECDC4','#45B7D1','#96CEB4','#FFEAA7','#DDA0DD']
    const isVertical = widgetType === 'tiktok_feed'
    return (
      <div className="h-28 rounded-t-xl overflow-hidden p-2.5" style={{ background: bg }}>
        <div className="grid grid-cols-3 gap-1 h-full">
          {colors.slice(0, 6).map((c, i) => (
            <div key={i} className="rounded flex items-center justify-center relative" style={{ background: c, aspectRatio: isVertical ? '9/16' : '16/9' }}>
              {widgetType === 'youtube_feed' && (
                <div className="w-4 h-4 rounded-full bg-black/40 flex items-center justify-center">
                  <div className="w-0 h-0 border-t-[3px] border-b-[3px] border-l-[5px] border-t-transparent border-b-transparent border-l-white ml-0.5" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (widgetType === 'google_reviews') {
    return (
      <div className="h-28 rounded-t-xl overflow-hidden p-3" style={{ background: bg }}>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold text-white" style={{ background: a }}>G</div>
          <div>
            <div className="flex gap-0.5 mb-0.5">{[1,2,3,4,5].map(i => <div key={i} className="w-2 h-1.5 rounded-sm" style={{ background: '#f59e0b' }} />)}</div>
            <div className="h-1 rounded" style={{ background: `${textColor}30`, width: 48 }} />
          </div>
        </div>
        {[1,2].map(i => (
          <div key={i} className="flex items-center gap-1.5 mb-1.5">
            <div className="w-4 h-4 rounded-full shrink-0" style={{ background: `${a}60` }} />
            <div className="flex-1"><div className="h-1.5 rounded mb-0.5" style={{ background: `${textColor}20`, width: `${70 - i*10}%` }} /></div>
          </div>
        ))}
      </div>
    )
  }

  if (widgetType === 'countdown_timer') {
    return (
      <div className="h-28 rounded-t-xl overflow-hidden flex items-center justify-center" style={{ background: bg }}>
        <div className="flex gap-2">
          {['07', '23', '45', '12'].map((v, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold shadow-sm" style={{ background: cardBg, color: a }}>
                {v}
              </div>
              <div className="h-1 rounded mt-1" style={{ background: `${a}50`, width: 28 }} />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (widgetType === 'announcement_bar') {
    return (
      <div className="h-28 rounded-t-xl overflow-hidden" style={{ background: bg }}>
        <div className="px-4 py-2.5 flex items-center justify-between" style={{ background: a }}>
          <div className="h-2 rounded" style={{ background: 'rgba(255,255,255,0.7)', width: '60%' }} />
          <div className="h-2 rounded" style={{ background: 'rgba(255,255,255,0.9)', width: '16%' }} />
        </div>
        <div className="p-3 space-y-2">
          {[1,2,3].map(i => <div key={i} className="h-1.5 rounded" style={{ background: `${textColor}10`, width: `${90 - i*15}%` }} />)}
        </div>
      </div>
    )
  }

  if (widgetType === 'contact_form') {
    return (
      <div className="h-28 rounded-t-xl overflow-hidden p-3" style={{ background: bg }}>
        <div className="rounded-lg p-2.5 shadow-sm" style={{ background: cardBg }}>
          <div className="h-1.5 rounded mb-2" style={{ background: `${textColor}30`, width: '40%' }} />
          {[1,2].map(i => <div key={i} className="h-5 rounded mb-1 border" style={{ background: isLight ? '#f9fafb' : '#111827', borderColor: `${a}30` }} />)}
          <div className="h-4 rounded mt-1" style={{ background: a, width: '100%' }} />
        </div>
      </div>
    )
  }

  if (widgetType === 'social_follow') {
    const colors2 = ['#1877f2','#e4405f','#1da1f2','#ff0000','#0a66c2']
    return (
      <div className="h-28 rounded-t-xl overflow-hidden flex items-center justify-center" style={{ background: bg }}>
        <div className="flex gap-2">
          {colors2.map((c, i) => (
            <div key={i} className="w-9 h-9 rounded-full flex items-center justify-center shadow-sm" style={{ background: c }}>
              <div className="w-3 h-3 rounded-sm" style={{ background: 'rgba(255,255,255,0.8)' }} />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (widgetType === 'faq_accordion') {
    return (
      <div className="h-28 rounded-t-xl overflow-hidden p-3" style={{ background: bg }}>
        <div className="space-y-1.5">
          {[{ w: '70%', open: true }, { w: '55%', open: false }, { w: '65%', open: false }].map((row, i) => (
            <div key={i} className="rounded-lg flex items-center justify-between px-2.5 py-1.5 shadow-sm" style={{ background: cardBg }}>
              <div className="h-1.5 rounded" style={{ background: `${textColor}25`, width: row.w }} />
              <div className="w-3 h-3 rounded flex items-center justify-center text-xs font-bold" style={{ color: a }}>{row.open ? '−' : '+'}</div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (widgetType === 'number_counter') {
    return (
      <div className="h-28 rounded-t-xl overflow-hidden flex items-center justify-center p-4" style={{ background: bg }}>
        <div className="grid grid-cols-3 gap-3 w-full">
          {['10K+', '98%', '50+'].map((v, i) => (
            <div key={i} className="rounded-lg p-2 text-center shadow-sm" style={{ background: cardBg }}>
              <div className="text-sm font-bold" style={{ color: a }}>{v}</div>
              <div className="h-1 rounded mt-1" style={{ background: `${textColor}20`, width: '70%', margin: '4px auto 0' }} />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (widgetType === 'google_maps') {
    return (
      <div className="h-28 rounded-t-xl overflow-hidden relative" style={{ background: '#e8f0fe' }}>
        <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 opacity-30">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="border border-blue-200" />
          ))}
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <svg width="24" height="30" viewBox="0 0 24 30" fill="none"><path d="M12 0C5.37 0 0 5.37 0 12c0 8.5 12 18 12 18s12-9.5 12-18c0-6.63-5.37-12-12-12z" fill={a}/><circle cx="12" cy="12" r="4" fill="white"/></svg>
          </div>
        </div>
      </div>
    )
  }

  // Generic fallback
  return (
    <div className="h-28 rounded-t-xl overflow-hidden flex items-center justify-center" style={{ background: bg }}>
      <div className="w-12 h-12 rounded-xl" style={{ background: `${a}30` }} />
    </div>
  )
}

export default function TemplatesPage() {
  const router = useRouter()
  const [activeCategory, setActiveCategory] = useState('all')
  const [creating, setCreating] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [created, setCreated] = useState<string | null>(null)

  const filtered = TEMPLATES.filter(
    t => activeCategory === 'all' || t.category === activeCategory
  )

  async function useTemplate(template: Template) {
    if (creating) return
    setCreating(template.id)
    setError(null)

    try {
      const widgetName = template.name + ' Widget'
      const res = await fetch('/api/widgets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: widgetName, type: template.widgetType, config: template.config }),
      })

      if (!res.ok) {
        const data = await res.json()
        if (data.code === 'PLAN_LIMIT_REACHED') throw new Error('Widget limit reached. Upgrade your plan.')
        throw new Error(data.error ?? 'Failed to create widget')
      }

      const { widget } = await res.json()
      setCreated(template.id)
      setTimeout(() => router.push(`/dashboard/widgets/${widget.id}`), 300)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setCreating(null)
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Templates</h1>
          <p className="text-gray-500 text-sm mt-1">{TEMPLATES.length} pre-built templates — click to create a widget instantly</p>
        </div>
        <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-xl px-4 py-2.5">
          <Lock size={13} className="text-indigo-400" />
          <div>
            <p className="text-xs font-semibold text-indigo-800 leading-none">Pro templates</p>
            <p className="text-[11px] text-indigo-500 mt-0.5">Upgrade to unlock all</p>
          </div>
        </div>
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

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Templates grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map(template => {
          const meta = TYPE_META[template.widgetType]
          const color = meta?.color ?? '#6366f1'
          const isCreating = creating === template.id
          const isDone = created === template.id

          return (
            <div
              key={template.id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-indigo-200 transition-all flex flex-col group"
            >
              {/* Visual preview */}
              <MiniPreview template={template} />

              {/* Card body */}
              <div className="p-4 flex flex-col gap-3 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <span
                    className="inline-block text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wide"
                    style={{ background: `${color}18`, color }}
                  >
                    {meta?.label}
                  </span>
                  {template.isPro ? (
                    <span className="flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700">
                      <Zap size={9} /> Pro
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-green-100 text-green-700">Free</span>
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-sm leading-tight">{template.name}</h3>
                  <p className="text-gray-500 text-xs mt-1 leading-relaxed line-clamp-2">{template.description}</p>
                </div>

                <button
                  onClick={() => useTemplate(template)}
                  disabled={!!creating || isDone}
                  className={[
                    'inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition-colors w-full',
                    isDone
                      ? 'bg-green-500 text-white'
                      : isCreating
                      ? 'bg-indigo-400 text-white cursor-wait'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700',
                  ].join(' ')}
                >
                  {isDone ? (
                    <><Check size={12} /> Created!</>
                  ) : isCreating ? (
                    'Creating…'
                  ) : (
                    'Use Template'
                  )}
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg font-medium">No templates in this category yet</p>
          <p className="text-sm mt-1">More coming soon!</p>
        </div>
      )}
    </div>
  )
}

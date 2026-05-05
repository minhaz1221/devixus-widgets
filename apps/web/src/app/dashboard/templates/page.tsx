'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, Zap, Check, Sparkles, TrendingUp } from 'lucide-react'

interface Template {
  id: string
  name: string
  widgetType: string
  category: string
  description: string
  isPro: boolean
  accent: string
  bg: string
  tags?: string[]
  badge?: 'new' | 'popular' | 'trending'
  config: Record<string, unknown>
}

// ── Gradient palettes for realistic thumbnails ─────────────────────────────
const YT_GRADIENTS = [
  'linear-gradient(135deg,#FF6B6B,#FF8E53)',
  'linear-gradient(135deg,#4ECDC4,#44A08D)',
  'linear-gradient(135deg,#667eea,#764ba2)',
  'linear-gradient(135deg,#f093fb,#f5576c)',
  'linear-gradient(135deg,#4facfe,#00f2fe)',
  'linear-gradient(135deg,#43e97b,#38f9d7)',
  'linear-gradient(135deg,#fa709a,#fee140)',
  'linear-gradient(135deg,#a18cd1,#fbc2eb)',
  'linear-gradient(135deg,#fccb90,#d57eeb)',
]

const IG_GRADIENTS = [
  'linear-gradient(135deg,#f093fb,#f5576c)',
  'linear-gradient(135deg,#4facfe,#00f2fe)',
  'linear-gradient(135deg,#43e97b,#38f9d7)',
  'linear-gradient(135deg,#fa709a,#fee140)',
  'linear-gradient(135deg,#a1c4fd,#c2e9fb)',
  'linear-gradient(135deg,#ffecd2,#fcb69f)',
  'linear-gradient(135deg,#d4fc79,#96e6a1)',
  'linear-gradient(135deg,#f6d365,#fda085)',
  'linear-gradient(135deg,#89f7fe,#66a6ff)',
]

// ── TEMPLATES ──────────────────────────────────────────────────────────────
const TEMPLATES: Template[] = [
  // ── WhatsApp ─────────────────────────────────────────────────────────────
  {
    id: 'wa-classic',
    name: 'Classic Green',
    widgetType: 'whatsapp',
    category: 'chat',
    description: 'Standard WhatsApp button with pulse animation and tooltip.',
    isPro: false,
    accent: '#25D366',
    bg: '#f0fdf4',
    tags: ['Animated', 'Tooltip'],
    badge: 'popular',
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
    tags: ['Dark Mode'],
    config: { button_color: '#128C7E', button_size: 'large', position: 'bottom-right', pulse_animation: false, tooltip_text: 'Message us!', show_on_mobile: true, show_on_desktop: true },
  },
  {
    id: 'wa-brand',
    name: 'Brand Colors',
    widgetType: 'whatsapp',
    category: 'chat',
    description: 'Custom brand color button for higher CTR.',
    isPro: true,
    accent: '#6366f1',
    bg: '#eef2ff',
    tags: ['Animated', 'Custom Color'],
    config: { button_color: '#6366f1', button_size: 'large', position: 'bottom-right', pulse_animation: true, tooltip_text: 'We reply in minutes!', show_on_mobile: true, show_on_desktop: true },
  },
  {
    id: 'wa-minimal',
    name: 'Minimal Left',
    widgetType: 'whatsapp',
    category: 'chat',
    description: 'Clean left-aligned button, no tooltip.',
    isPro: false,
    accent: '#25D366',
    bg: '#ffffff',
    tags: ['Minimal'],
    config: { button_color: '#25D366', button_size: 'medium', position: 'bottom-left', pulse_animation: false, show_on_mobile: true, show_on_desktop: true },
  },
  {
    id: 'wa-orange',
    name: 'Orange Pulse',
    widgetType: 'whatsapp',
    category: 'chat',
    description: 'Warm orange button with attention-grabbing pulse.',
    isPro: true,
    accent: '#f97316',
    bg: '#fff7ed',
    tags: ['Animated', 'Custom Color'],
    badge: 'new',
    config: { button_color: '#f97316', button_size: 'large', position: 'bottom-right', pulse_animation: true, tooltip_text: 'Need help? Chat now!', show_on_mobile: true, show_on_desktop: true },
  },

  // ── Testimonials ─────────────────────────────────────────────────────────
  {
    id: 'test-slider',
    name: 'Light Slider',
    widgetType: 'testimonials',
    category: 'reviews',
    description: 'Auto-playing slider with arrows and star ratings.',
    isPro: false,
    accent: '#f59e0b',
    bg: '#fffbeb',
    tags: ['Auto-play', 'Arrows'],
    badge: 'popular',
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
    tags: ['Grid', '2 Columns'],
    config: { layout: 'grid', columns: 2, theme: 'light', card_shadow: 'small', show_quote_icon: false, show_rating: true, avatar_shape: 'circle' },
  },
  {
    id: 'test-dark',
    name: 'Dark Elegance',
    widgetType: 'testimonials',
    category: 'reviews',
    description: 'Premium dark-themed slider for luxury brands.',
    isPro: true,
    accent: '#8b5cf6',
    bg: '#1e1b4b',
    tags: ['Dark Mode', 'Auto-play'],
    config: { layout: 'slider', theme: 'dark', card_shadow: 'large', show_quote_icon: true, show_arrows: true, autoplay: true, show_rating: true, avatar_shape: 'circle' },
  },
  {
    id: 'test-3col',
    name: 'Triple Column',
    widgetType: 'testimonials',
    category: 'reviews',
    description: 'Wide 3-column grid for feature-rich landing pages.',
    isPro: true,
    accent: '#6366f1',
    bg: '#eef2ff',
    tags: ['Grid', '3 Columns'],
    badge: 'new',
    config: { layout: 'grid', columns: 3, theme: 'light', card_shadow: 'medium', show_quote_icon: true, show_rating: true, avatar_shape: 'rounded' },
  },
  {
    id: 'test-minimal',
    name: 'Minimal White',
    widgetType: 'testimonials',
    category: 'reviews',
    description: 'Clean white testimonials, no shadows, pure typography.',
    isPro: false,
    accent: '#64748b',
    bg: '#f8fafc',
    tags: ['Minimal'],
    config: { layout: 'slider', theme: 'light', card_shadow: 'none', show_quote_icon: false, show_arrows: true, autoplay: false, show_rating: true, avatar_shape: 'circle' },
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
    tags: ['Grid', '3 Columns', 'Channel Header'],
    badge: 'popular',
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
    tags: ['Dark Mode', 'Channel Header'],
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
    tags: ['List View', 'Compact'],
    config: { layout: 'list', theme: 'light', header_style: 'compact', show_title: true, max_results: 5, accent_color: '#ef4444' },
  },
  {
    id: 'yt-popup',
    name: 'Popup Player',
    widgetType: 'youtube_feed',
    category: 'social',
    description: 'Videos play in a fullscreen lightbox — no page redirect.',
    isPro: true,
    accent: '#dc2626',
    bg: '#fef2f2',
    tags: ['Popup', 'Lightbox'],
    badge: 'new',
    config: { layout: 'grid', columns: 3, theme: 'light', header_style: 'compact', show_title: true, max_results: 6, accent_color: '#dc2626', play_behavior: 'popup' },
  },
  {
    id: 'yt-carousel',
    name: 'Scroll Carousel',
    widgetType: 'youtube_feed',
    category: 'social',
    description: 'Horizontally scrollable video strip.',
    isPro: false,
    accent: '#ff0000',
    bg: '#fafafa',
    tags: ['Carousel', 'Scrollable'],
    config: { layout: 'carousel', theme: 'light', header_style: 'none', show_title: true, max_results: 8, accent_color: '#ff0000' },
  },
  {
    id: 'yt-dark-popup',
    name: 'Dark Popup',
    widgetType: 'youtube_feed',
    category: 'social',
    description: 'Dark grid with popup lightbox player.',
    isPro: true,
    accent: '#ef4444',
    bg: '#111827',
    tags: ['Dark Mode', 'Popup'],
    config: { layout: 'grid', columns: 3, theme: 'dark', header_style: 'full', show_title: true, max_results: 6, accent_color: '#ef4444', play_behavior: 'popup' },
  },

  // ── Google Reviews ────────────────────────────────────────────────────────
  {
    id: 'gr-cards',
    name: 'Review Cards',
    widgetType: 'google_reviews',
    category: 'reviews',
    description: 'Grid of review cards with photos and ratings.',
    isPro: false,
    accent: '#4285f4',
    bg: '#eff6ff',
    tags: ['Grid', 'Photos'],
    badge: 'popular',
    config: { layout: 'grid', min_rating: 4, max_reviews: 6, show_header: true, show_overall_rating: true, show_review_date: true, show_reviewer_photo: true, theme: 'light', accent_color: '#4285f4', write_review_link: true },
  },
  {
    id: 'gr-dark',
    name: 'Dark Reviews',
    widgetType: 'google_reviews',
    category: 'reviews',
    description: 'Dark-themed review display for dark websites.',
    isPro: true,
    accent: '#4285f4',
    bg: '#0f172a',
    tags: ['Dark Mode', 'Photos'],
    config: { layout: 'grid', min_rating: 4, max_reviews: 6, show_header: true, show_overall_rating: true, show_reviewer_photo: true, theme: 'dark', accent_color: '#4285f4', write_review_link: false },
  },
  {
    id: 'gr-list',
    name: 'List Showcase',
    widgetType: 'google_reviews',
    category: 'reviews',
    description: 'Full-width list layout for review-focused pages.',
    isPro: false,
    accent: '#34a853',
    bg: '#f0fdf4',
    tags: ['List View', '5-Star Only'],
    config: { layout: 'list', min_rating: 5, max_reviews: 8, show_header: true, show_overall_rating: true, show_review_date: true, show_reviewer_photo: true, theme: 'light', accent_color: '#34a853', write_review_link: true },
  },
  {
    id: 'gr-minimal',
    name: 'Minimal Clean',
    widgetType: 'google_reviews',
    category: 'reviews',
    description: 'Simple, clean review layout without reviewer photos.',
    isPro: false,
    accent: '#4285f4',
    bg: '#f8fafc',
    tags: ['Minimal'],
    badge: 'new',
    config: { layout: 'grid', min_rating: 4, max_reviews: 4, show_header: true, show_overall_rating: true, show_review_date: false, show_reviewer_photo: false, theme: 'light', accent_color: '#4285f4', write_review_link: false },
  },
  {
    id: 'gr-carousel',
    name: 'Review Carousel',
    widgetType: 'google_reviews',
    category: 'reviews',
    description: 'Carousel layout that auto-scrolls through reviews.',
    isPro: true,
    accent: '#f59e0b',
    bg: '#fffbeb',
    tags: ['Carousel', 'Auto-play'],
    config: { layout: 'carousel', min_rating: 4, max_reviews: 8, show_header: true, show_overall_rating: true, show_reviewer_photo: true, theme: 'light', accent_color: '#f59e0b', write_review_link: true },
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
    tags: ['Blocks Style', 'Urgency'],
    badge: 'popular',
    config: { style: 'blocks', theme: 'light', title: 'Sale ends in', accent_color: '#ef4444', bg_color: '#fff5f5', text_color: '#1a1a1a', show_days: true, show_hours: true, show_minutes: true, show_seconds: true, show_labels: true },
  },
  {
    id: 'cd-launch',
    name: 'Product Launch',
    widgetType: 'countdown_timer',
    category: 'ecommerce',
    description: 'Purple minimalist countdown for launches.',
    isPro: false,
    accent: '#8b5cf6',
    bg: '#f5f3ff',
    tags: ['Minimal Style'],
    config: { style: 'minimal', theme: 'light', title: 'Launching in', accent_color: '#8b5cf6', bg_color: '#ffffff', text_color: '#1a1a1a', show_days: true, show_hours: true, show_minutes: true, show_seconds: true, show_labels: true },
  },
  {
    id: 'cd-dark-event',
    name: 'Dark Event',
    widgetType: 'countdown_timer',
    category: 'ecommerce',
    description: 'Dramatic dark countdown for events and webinars.',
    isPro: true,
    accent: '#f59e0b',
    bg: '#111827',
    tags: ['Dark Mode', 'Blocks Style'],
    config: { style: 'blocks', theme: 'dark', title: 'Event starts in', accent_color: '#f59e0b', bg_color: '#1e293b', text_color: '#f1f5f9', show_days: true, show_hours: true, show_minutes: true, show_seconds: true, show_labels: true },
  },
  {
    id: 'cd-teal',
    name: 'Teal Minimal',
    widgetType: 'countdown_timer',
    category: 'ecommerce',
    description: 'Teal minimalist countdown, great for SaaS launches.',
    isPro: false,
    accent: '#06b6d4',
    bg: '#ecfeff',
    tags: ['Minimal Style'],
    badge: 'new',
    config: { style: 'minimal', theme: 'light', title: 'Launching soon', accent_color: '#06b6d4', bg_color: '#ffffff', text_color: '#0f172a', show_days: true, show_hours: true, show_minutes: true, show_seconds: true, show_labels: true, separator_style: 'colon' },
  },
  {
    id: 'cd-dark-minimal',
    name: 'Dark Minimal',
    widgetType: 'countdown_timer',
    category: 'ecommerce',
    description: 'Clean dark minimal timer, very modern.',
    isPro: true,
    accent: '#6366f1',
    bg: '#030712',
    tags: ['Dark Mode', 'Minimal Style'],
    config: { style: 'minimal', theme: 'dark', title: 'Coming soon', accent_color: '#6366f1', bg_color: '#111827', text_color: '#f9fafb', show_days: true, show_hours: true, show_minutes: true, show_seconds: true, show_labels: true },
  },

  // ── Announcement Bar ──────────────────────────────────────────────────────
  {
    id: 'ann-promo',
    name: 'Promo Banner',
    widgetType: 'announcement_bar',
    category: 'ecommerce',
    description: 'Indigo banner for promotions with CTA link.',
    isPro: false,
    accent: '#6366f1',
    bg: '#eef2ff',
    tags: ['Sticky', 'CTA', 'Top'],
    badge: 'popular',
    config: { message: 'Free shipping on all orders over $50!', link_text: 'Shop now', link_url: '', position: 'top', bg_color: '#6366f1', text_color: '#ffffff', link_color: '#ffffff', show_close_button: true, show_emoji: true, emoji: '🚚', style: 'solid', is_sticky: true },
  },
  {
    id: 'ann-gradient',
    name: 'Gradient Bar',
    widgetType: 'announcement_bar',
    category: 'ecommerce',
    description: 'Eye-catching gradient bar for seasonal campaigns.',
    isPro: false,
    accent: '#ec4899',
    bg: '#fdf2f8',
    tags: ['Gradient', 'Emoji'],
    config: { message: 'Holiday Sale — Up to 50% off everything!', link_text: 'See deals', link_url: '', position: 'top', bg_color: '#ec4899', text_color: '#ffffff', link_color: '#ffffff', show_close_button: true, show_emoji: true, emoji: '🎉', style: 'gradient', is_sticky: true },
  },
  {
    id: 'ann-dark',
    name: 'Dark Alert',
    widgetType: 'announcement_bar',
    category: 'ecommerce',
    description: 'Minimal dark bar for important notices.',
    isPro: true,
    accent: '#1f2937',
    bg: '#f9fafb',
    tags: ['Dark Mode', 'Minimal'],
    config: { message: 'Scheduled maintenance on Saturday 10–11pm UTC.', link_text: 'Learn more', link_url: '', position: 'top', bg_color: '#1f2937', text_color: '#f9fafb', link_color: '#6366f1', show_close_button: true, show_emoji: false, emoji: '', style: 'solid', is_sticky: true },
  },
  {
    id: 'ann-green',
    name: 'Success Green',
    widgetType: 'announcement_bar',
    category: 'ecommerce',
    description: 'Green bar for positive announcements and launches.',
    isPro: false,
    accent: '#10b981',
    bg: '#f0fdf4',
    tags: ['Emoji', 'Top'],
    badge: 'new',
    config: { message: '🎉 Just launched: Version 2.0 is here!', link_text: 'See what\'s new', link_url: '', position: 'top', bg_color: '#10b981', text_color: '#ffffff', link_color: '#ffffff', show_close_button: true, show_emoji: false, emoji: '', style: 'solid', is_sticky: true },
  },
  {
    id: 'ann-bottom',
    name: 'Cookie Bottom',
    widgetType: 'announcement_bar',
    category: 'ecommerce',
    description: 'Bottom-placed bar, great for cookie notices.',
    isPro: false,
    accent: '#334155',
    bg: '#f1f5f9',
    tags: ['Bottom Bar', 'Sticky'],
    config: { message: 'We use cookies to improve your experience.', link_text: 'Accept', link_url: '', position: 'bottom', bg_color: '#1e293b', text_color: '#f1f5f9', link_color: '#6366f1', show_close_button: true, show_emoji: false, emoji: '', style: 'solid', is_sticky: true },
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
    tags: ['Inline', '3 Fields'],
    badge: 'popular',
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
    tags: ['Inline', '5 Fields'],
    config: { title: 'Get in Touch', subtitle: 'Our team will respond within 24 hours.', button_text: 'Submit', button_color: '#10b981', theme: 'light', display_mode: 'inline', accent_color: '#10b981', border_radius: 12, fields: { name: true, email: true, phone: true, subject: true, message: true }, required_fields: { name: true, email: true, message: true } },
  },
  {
    id: 'cf-dark',
    name: 'Dark Pro',
    widgetType: 'contact_form',
    category: 'forms',
    description: 'Premium dark-themed form for modern websites.',
    isPro: true,
    accent: '#6366f1',
    bg: '#0f172a',
    tags: ['Dark Mode', 'Inline'],
    config: { title: 'Say Hello', subtitle: "Drop a message and we'll respond within 24 hours.", button_text: 'Send Message', button_color: '#6366f1', theme: 'dark', display_mode: 'inline', accent_color: '#6366f1', border_radius: 12, fields: { name: true, email: true, phone: false, subject: true, message: true }, required_fields: { name: true, email: true, message: true } },
  },
  {
    id: 'cf-popup',
    name: 'Popup Form',
    widgetType: 'contact_form',
    category: 'forms',
    description: 'Floating trigger button that opens a contact form popup.',
    isPro: true,
    accent: '#8b5cf6',
    bg: '#f5f3ff',
    tags: ['Popup', 'Trigger Button'],
    badge: 'new',
    config: { title: 'Contact Us', subtitle: 'Send us a message.', button_text: 'Send', button_color: '#8b5cf6', theme: 'light', display_mode: 'popup', trigger_text: '✉ Contact Us', accent_color: '#8b5cf6', border_radius: 12, fields: { name: true, email: true, phone: false, subject: false, message: true }, required_fields: { name: true, email: true, message: true } },
  },

  // ── Social Follow ─────────────────────────────────────────────────────────
  {
    id: 'sf-row',
    name: 'Filled Row',
    widgetType: 'social_follow',
    category: 'social',
    description: 'Horizontal row of filled social buttons with labels.',
    isPro: false,
    accent: '#ec4899',
    bg: '#fdf2f8',
    tags: ['Horizontal', 'Filled', 'Labels'],
    config: { layout: 'horizontal', style: 'filled', size: 'medium', show_labels: true, label_type: 'network_name', theme: 'light', border_radius: 8, animation: 'hover_grow', networks: {} },
  },
  {
    id: 'sf-icons',
    name: 'Icon Grid',
    widgetType: 'social_follow',
    category: 'social',
    description: 'Compact icon-only grid, perfect for footers.',
    isPro: false,
    accent: '#6366f1',
    bg: '#eef2ff',
    tags: ['Grid', 'Icons Only'],
    config: { layout: 'grid', style: 'minimal', size: 'medium', show_labels: false, label_type: 'network_name', theme: 'light', border_radius: 50, animation: 'hover_bounce', networks: {} },
  },
  {
    id: 'sf-dark',
    name: 'Dark Mode',
    widgetType: 'social_follow',
    category: 'social',
    description: 'Dark-themed social buttons for dark websites.',
    isPro: true,
    accent: '#6366f1',
    bg: '#0f172a',
    tags: ['Dark Mode', 'Filled'],
    config: { layout: 'horizontal', style: 'filled', size: 'medium', show_labels: true, label_type: 'follow_us', theme: 'dark', border_radius: 8, animation: 'hover_grow', networks: {} },
  },
  {
    id: 'sf-outline',
    name: 'Outline Style',
    widgetType: 'social_follow',
    category: 'social',
    description: 'Clean outline-bordered social buttons.',
    isPro: false,
    accent: '#64748b',
    bg: '#f8fafc',
    tags: ['Outline', 'Minimal'],
    badge: 'new',
    config: { layout: 'horizontal', style: 'outline', size: 'medium', show_labels: true, label_type: 'network_name', theme: 'light', border_radius: 8, animation: 'none', networks: {} },
  },

  // ── Instagram Feed ────────────────────────────────────────────────────────
  {
    id: 'ig-grid',
    name: 'Classic Grid',
    widgetType: 'instagram_feed',
    category: 'social',
    description: '3×3 Instagram photo grid with hover like counts.',
    isPro: false,
    accent: '#e4405f',
    bg: '#fff5f7',
    tags: ['Grid', '3 Columns'],
    badge: 'popular',
    config: { layout: 'grid', columns: 3, show_caption: false, show_likes: true, show_video_icon: true, border_radius: '8px', gap: '8px', num_posts: 9, link_behavior: 'instagram', theme: 'light' },
  },
  {
    id: 'ig-masonry',
    name: 'Masonry Pro',
    widgetType: 'instagram_feed',
    category: 'social',
    description: 'Pinterest-style masonry layout for visual variety.',
    isPro: true,
    accent: '#e4405f',
    bg: '#fdf2f8',
    tags: ['Masonry', 'Pro'],
    config: { layout: 'masonry', columns: 3, show_caption: false, show_likes: true, border_radius: '4px', gap: '4px', num_posts: 12, link_behavior: 'lightbox', theme: 'light' },
  },
  {
    id: 'ig-dark',
    name: 'Dark Grid',
    widgetType: 'instagram_feed',
    category: 'social',
    description: 'Dark-themed photo grid for dark-background sites.',
    isPro: true,
    accent: '#e4405f',
    bg: '#0f172a',
    tags: ['Dark Mode', 'Grid'],
    config: { layout: 'grid', columns: 3, show_caption: false, show_likes: true, border_radius: '8px', gap: '8px', num_posts: 9, link_behavior: 'lightbox', theme: 'dark' },
  },
  {
    id: 'ig-carousel',
    name: 'Scroll Strip',
    widgetType: 'instagram_feed',
    category: 'social',
    description: 'Horizontally scrolling Instagram photo strip.',
    isPro: false,
    accent: '#e4405f',
    bg: '#f9fafb',
    tags: ['Carousel', 'Scrollable'],
    badge: 'new',
    config: { layout: 'carousel', columns: 4, show_caption: false, show_likes: false, border_radius: '12px', gap: '12px', num_posts: 12, link_behavior: 'instagram', theme: 'light' },
  },

  // ── TikTok Feed ───────────────────────────────────────────────────────────
  {
    id: 'tt-grid',
    name: 'Video Grid',
    widgetType: 'tiktok_feed',
    category: 'social',
    description: '3-column TikTok video grid with view counts.',
    isPro: false,
    accent: '#69C9D0',
    bg: '#f0fdff',
    tags: ['Grid', '3 Columns'],
    config: { layout: 'grid', columns: 3, show_duration: true, show_view_count: true, show_caption: true, border_radius: '8px', gap: '8px', num_videos: 9, autoplay_on_hover: false, theme: 'light' },
  },
  {
    id: 'tt-dark',
    name: 'Dark Grid',
    widgetType: 'tiktok_feed',
    category: 'social',
    description: 'Sleek dark TikTok feed matching TikTok\'s own app.',
    isPro: true,
    accent: '#69C9D0',
    bg: '#010101',
    tags: ['Dark Mode', 'Grid'],
    badge: 'new',
    config: { layout: 'grid', columns: 3, show_duration: true, show_view_count: true, show_caption: false, border_radius: '8px', gap: '8px', num_videos: 9, autoplay_on_hover: false, theme: 'dark' },
  },
  {
    id: 'tt-list',
    name: 'List View',
    widgetType: 'tiktok_feed',
    category: 'social',
    description: 'Vertical list of TikTok videos with full captions.',
    isPro: false,
    accent: '#EE1D52',
    bg: '#fef2f2',
    tags: ['List View', 'Captions'],
    config: { layout: 'list', show_duration: true, show_view_count: true, show_caption: true, show_like_count: true, border_radius: '10px', gap: '12px', num_videos: 6, theme: 'light' },
  },

  // ── FAQ ────────────────────────────────────────────────────────────────────
  {
    id: 'faq-light',
    name: 'Clean Light',
    widgetType: 'faq_accordion',
    category: 'tools',
    description: 'Minimal white accordion for product and service FAQs.',
    isPro: false,
    accent: '#6366f1',
    bg: '#eef2ff',
    tags: ['Accordion', 'Light'],
    badge: 'popular',
    config: { questions: [], allow_multiple: false, open_first: true, theme: 'light', accent_color: '#6366f1', border_radius: 8, show_icon: true },
  },
  {
    id: 'faq-dark',
    name: 'Dark FAQ',
    widgetType: 'faq_accordion',
    category: 'tools',
    description: 'Dark-themed accordion for dark websites.',
    isPro: true,
    accent: '#8b5cf6',
    bg: '#1e1b4b',
    tags: ['Dark Mode', 'Accordion'],
    config: { questions: [], allow_multiple: false, open_first: true, theme: 'dark', accent_color: '#8b5cf6', border_radius: 10, show_icon: true },
  },
  {
    id: 'faq-orange',
    name: 'Help Center',
    widgetType: 'faq_accordion',
    category: 'tools',
    description: 'Orange accented accordion for help center pages.',
    isPro: false,
    accent: '#f97316',
    bg: '#fff7ed',
    tags: ['Multi-open', 'Titled'],
    config: { questions: [], allow_multiple: true, open_first: true, theme: 'light', accent_color: '#f97316', border_radius: 6, show_icon: true, title: 'Frequently Asked Questions' },
  },
  {
    id: 'faq-teal',
    name: 'Teal Modern',
    widgetType: 'faq_accordion',
    category: 'tools',
    description: 'Teal modern accordion, great for SaaS and tech brands.',
    isPro: false,
    accent: '#06b6d4',
    bg: '#ecfeff',
    tags: ['Accordion', 'Modern'],
    badge: 'new',
    config: { questions: [], allow_multiple: false, open_first: true, theme: 'light', accent_color: '#06b6d4', border_radius: 12, show_icon: true },
  },
  {
    id: 'faq-compact',
    name: 'Compact Style',
    widgetType: 'faq_accordion',
    category: 'tools',
    description: 'Ultra-compact accordion with minimal spacing.',
    isPro: true,
    accent: '#10b981',
    bg: '#f0fdf4',
    tags: ['Compact', 'Multi-open'],
    config: { questions: [], allow_multiple: true, open_first: false, theme: 'light', accent_color: '#10b981', border_radius: 4, show_icon: true },
  },

  // ── Number Counter ────────────────────────────────────────────────────────
  {
    id: 'nc-stats',
    name: 'Stats Banner',
    widgetType: 'number_counter',
    category: 'tools',
    description: 'White cards with big numbers for key business metrics.',
    isPro: false,
    accent: '#6366f1',
    bg: '#eef2ff',
    tags: ['Animated', '3 Columns'],
    badge: 'popular',
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
    tags: ['Dark Mode', 'Animated'],
    config: { stats: [], animate: true, theme: 'dark', accent_color: '#06b6d4', columns: 3 },
  },
  {
    id: 'nc-teal',
    name: 'Teal Counters',
    widgetType: 'number_counter',
    category: 'tools',
    description: 'Teal-accented stat cards for SaaS and tech websites.',
    isPro: false,
    accent: '#06b6d4',
    bg: '#ecfeff',
    tags: ['4 Columns', 'Animated'],
    config: { stats: [], animate: true, theme: 'light', accent_color: '#06b6d4', columns: 4 },
  },
  {
    id: 'nc-gradient',
    name: 'Gradient Bold',
    widgetType: 'number_counter',
    category: 'tools',
    description: 'High-impact gradient number display.',
    isPro: true,
    accent: '#8b5cf6',
    bg: '#f5f3ff',
    tags: ['Bold', 'Animated'],
    badge: 'new',
    config: { stats: [], animate: true, theme: 'light', accent_color: '#8b5cf6', columns: 3, title: 'By The Numbers' },
  },

  // ── Google Maps ───────────────────────────────────────────────────────────
  {
    id: 'gm-standard',
    name: 'Location Map',
    widgetType: 'google_maps',
    category: 'tools',
    description: 'Clean embedded map with rounded corners.',
    isPro: false,
    accent: '#10b981',
    bg: '#f0fdf4',
    tags: ['Rounded'],
    config: { embed_url: '', height: 400, border_radius: 12, title: 'Find Us' },
  },
  {
    id: 'gm-tall',
    name: 'Tall Map',
    widgetType: 'google_maps',
    category: 'tools',
    description: 'Taller map embed for sidebar placement.',
    isPro: false,
    accent: '#4285f4',
    bg: '#eff6ff',
    tags: ['Tall', 'Sidebar'],
    config: { embed_url: '', height: 550, border_radius: 8 },
  },
  {
    id: 'gm-fullwidth',
    name: 'Full Width',
    widgetType: 'google_maps',
    category: 'tools',
    description: 'No-radius full-width map for section backgrounds.',
    isPro: false,
    accent: '#ea4335',
    bg: '#fef2f2',
    tags: ['Full Width', 'No Radius'],
    config: { embed_url: '', height: 350, border_radius: 0 },
  },
]

// ── Meta ───────────────────────────────────────────────────────────────────
const TYPE_META: Record<string, { label: string; color: string }> = {
  whatsapp:         { label: 'WhatsApp',      color: '#25D366' },
  testimonials:     { label: 'Testimonials',  color: '#f59e0b' },
  youtube_feed:     { label: 'YouTube Feed',  color: '#ff0000' },
  google_reviews:   { label: 'Reviews',       color: '#4285f4' },
  countdown_timer:  { label: 'Countdown',     color: '#8b5cf6' },
  announcement_bar: { label: 'Announcement',  color: '#6366f1' },
  contact_form:     { label: 'Contact Form',  color: '#10b981' },
  social_follow:    { label: 'Social Follow', color: '#ec4899' },
  instagram_feed:   { label: 'Instagram',     color: '#e4405f' },
  tiktok_feed:      { label: 'TikTok',        color: '#2d2d2d' },
  faq_accordion:    { label: 'FAQ',           color: '#f97316' },
  number_counter:   { label: 'Stats Counter', color: '#06b6d4' },
  google_maps:      { label: 'Google Maps',   color: '#10b981' },
}

const CATEGORIES = [
  { key: 'all',       label: 'All Templates' },
  { key: 'social',    label: 'Social' },
  { key: 'reviews',   label: 'Reviews' },
  { key: 'ecommerce', label: 'E-Commerce' },
  { key: 'forms',     label: 'Forms' },
  { key: 'chat',      label: 'Chat' },
  { key: 'tools',     label: 'Tools' },
]

// ── WhatsApp icon SVG path ────────────────────────────────────────────────
const WA_PATH = 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a6.37 6.37 0 0 0-.57-.01c-.198 0-.52.074-.792.372C7.092 9.675 6 10.845 6 12.312c0 1.466 1.065 2.88 1.213 3.078.149.199 2.096 3.2 5.077 4.487.709.306 1.262.49 1.694.626.712.226 1.36.194 1.872.118.57-.085 1.758-.72 2.005-1.413.248-.694.248-1.29.173-1.413-.074-.124-.272-.198-.57-.347z M12 0C5.373 0 0 5.373 0 12c0 2.104.549 4.082 1.512 5.797L0 24l6.335-1.493A11.958 11.958 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.935 9.935 0 0 1-5.11-1.404l-.366-.217-3.79.904.935-3.671-.24-.378A9.929 9.929 0 0 1 2 12c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10z'

// ── Thumbnail previews ────────────────────────────────────────────────────
function MiniPreview({ template }: { template: Template }) {
  const { widgetType, accent: a, bg, isPro } = template
  const isDark = bg.startsWith('#0') || bg.startsWith('#1') || bg.startsWith('#01') || ['#0f172a','#0f0f0f','#111827','#1e1b4b','#030712','#010101','#0c1222'].includes(bg)
  const textColor  = isDark ? '#f1f5f9' : '#1f2937'
  const mutedColor = isDark ? '#94a3b8' : '#6b7280'
  const cardBg     = isDark ? '#1e293b' : '#ffffff'
  const borderColor = isDark ? '#334155' : '#e5e7eb'

  // ── WhatsApp ───────────────────────────────────────────────────────────
  if (widgetType === 'whatsapp') {
    const isLeft = (template.config.position as string) === 'bottom-left'
    return (
      <div className="h-40 relative rounded-t-xl overflow-hidden" style={{ background: bg }}>
        {/* Mock page content */}
        <div className="absolute inset-0 p-4">
          <div className="h-2 rounded-full mb-2.5" style={{ background: `${textColor}18`, width: '72%' }} />
          <div className="h-1.5 rounded-full mb-2" style={{ background: `${textColor}10`, width: '55%' }} />
          <div className="h-1.5 rounded-full mb-2" style={{ background: `${textColor}08`, width: '65%' }} />
          <div className="h-1.5 rounded-full" style={{ background: `${textColor}06`, width: '45%' }} />
          <div className="mt-3 p-2 rounded-lg" style={{ background: `${textColor}06`, height: 40 }} />
        </div>
        {/* Button + tooltip */}
        <div className={`absolute bottom-3 ${isLeft ? 'left-3' : 'right-3'} flex flex-col ${isLeft ? 'items-start' : 'items-end'} gap-2`}>
          {template.config.tooltip_text && (
            <div className="bg-gray-900 text-white px-2.5 py-1.5 rounded-lg text-[9px] font-medium shadow-lg whitespace-nowrap">
              {template.config.tooltip_text as string}
            </div>
          )}
          <div className="w-11 h-11 rounded-full shadow-xl flex items-center justify-center relative" style={{ background: a }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d={WA_PATH} /></svg>
            {template.config.pulse_animation && (
              <div className="absolute inset-0 rounded-full opacity-40 animate-ping" style={{ background: a }} />
            )}
          </div>
        </div>
      </div>
    )
  }

  // ── Testimonials ──────────────────────────────────────────────────────
  if (widgetType === 'testimonials') {
    const isGrid = template.config.layout === 'grid'
    return (
      <div className="h-40 rounded-t-xl overflow-hidden p-3" style={{ background: bg }}>
        {isGrid ? (
          <div className="grid grid-cols-2 gap-1.5 h-full">
            {[0,1].map(i => (
              <div key={i} className="rounded-lg p-2.5 flex flex-col" style={{ background: cardBg, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
                <div className="flex gap-0.5 mb-1.5">
                  {[1,2,3,4,5].map(s => <div key={s} className="w-1.5 h-1.5 rounded-sm" style={{ background: '#f59e0b' }} />)}
                </div>
                <div className="h-1 rounded-full mb-1" style={{ background: `${mutedColor}40`, width: '95%' }} />
                <div className="h-1 rounded-full mb-1" style={{ background: `${mutedColor}28`, width: '80%' }} />
                <div className="h-1 rounded-full mb-2" style={{ background: `${mutedColor}20`, width: '60%' }} />
                <div className="flex items-center gap-1 mt-auto">
                  <div className="w-4 h-4 rounded-full flex items-center justify-center text-[7px] font-bold text-white flex-shrink-0" style={{ background: a }}>{i === 0 ? 'A' : 'M'}</div>
                  <div className="h-1 rounded-full" style={{ background: `${textColor}30`, width: '55%' }} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl p-3 h-full flex flex-col" style={{ background: cardBg, boxShadow: '0 2px 8px rgba(0,0,0,0.10)' }}>
            <div className="text-3xl leading-none mb-1.5" style={{ color: `${a}40` }}>"</div>
            <div className="flex gap-0.5 mb-2">
              {[1,2,3,4,5].map(s => <div key={s} className="w-2 h-2 rounded-sm" style={{ background: '#f59e0b' }} />)}
            </div>
            <div className="h-1.5 rounded-full mb-1" style={{ background: `${mutedColor}35`, width: '98%' }} />
            <div className="h-1.5 rounded-full mb-1" style={{ background: `${mutedColor}28`, width: '85%' }} />
            <div className="h-1.5 rounded-full mb-3" style={{ background: `${mutedColor}18`, width: '70%' }} />
            <div className="flex items-center gap-2 mt-auto">
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0" style={{ background: a }}>A</div>
              <div>
                <div className="h-1.5 rounded-full mb-1" style={{ background: `${textColor}35`, width: 52 }} />
                <div className="h-1 rounded-full" style={{ background: `${mutedColor}30`, width: 40 }} />
              </div>
              {template.config.show_arrows !== false && (
                <div className="ml-auto flex gap-1">
                  {['←','→'].map(arr => (
                    <div key={arr} className="w-5 h-5 rounded-full border flex items-center justify-center text-[9px] font-bold" style={{ borderColor, color: mutedColor, background: cardBg }}>{arr}</div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    )
  }

  // ── YouTube Feed ──────────────────────────────────────────────────────
  if (widgetType === 'youtube_feed') {
    const isList = template.config.layout === 'list'
    const isCarousel = template.config.layout === 'carousel'
    return (
      <div className="h-40 rounded-t-xl overflow-hidden p-2.5" style={{ background: bg }}>
        {/* Channel header */}
        {template.config.header_style !== 'none' && (
          <div className="flex items-center gap-2 mb-2 px-1">
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0" style={{ background: a }}>YT</div>
            <div className="h-1.5 rounded-full flex-1" style={{ background: `${textColor}30`, maxWidth: 60 }} />
            <div className="ml-auto px-2 py-0.5 rounded-full text-[8px] font-bold text-white" style={{ background: a }}>Subscribe</div>
          </div>
        )}
        {isList ? (
          <div className="space-y-1">
            {[0,1,2].map(i => (
              <div key={i} className="flex gap-1.5 rounded-md overflow-hidden" style={{ background: cardBg }}>
                <div className="w-14 h-8 flex-shrink-0 relative flex items-center justify-center" style={{ background: YT_GRADIENTS[i * 3] }}>
                  <div className="w-4 h-4 rounded-full bg-black/40 flex items-center justify-center">
                    <div className="w-0 h-0 border-t-[3px] border-b-[3px] border-l-[5px] border-t-transparent border-b-transparent border-l-white ml-0.5" />
                  </div>
                </div>
                <div className="flex-1 py-1 min-w-0">
                  <div className="h-1.5 rounded-full mb-0.5" style={{ background: `${textColor}30`, width: '85%' }} />
                  <div className="h-1 rounded-full" style={{ background: `${mutedColor}25`, width: '55%' }} />
                </div>
              </div>
            ))}
          </div>
        ) : isCarousel ? (
          <div className="flex gap-1.5 overflow-hidden">
            {[0,1,2,3].map(i => (
              <div key={i} className="flex-shrink-0 w-20 rounded-lg overflow-hidden" style={{ background: cardBg }}>
                <div className="relative h-11 flex items-center justify-center" style={{ background: YT_GRADIENTS[i] }}>
                  <div className="w-5 h-5 rounded-full bg-black/50 flex items-center justify-center">
                    <div className="w-0 h-0 border-t-[4px] border-b-[4px] border-l-[7px] border-t-transparent border-b-transparent border-l-white ml-0.5" />
                  </div>
                </div>
                <div className="px-1.5 py-1">
                  <div className="h-1.5 rounded-full" style={{ background: `${textColor}25`, width: '90%' }} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-1">
            {[0,1,2,3,4,5].map(i => (
              <div key={i} className="rounded-md overflow-hidden" style={{ background: cardBg }}>
                <div className="relative flex items-center justify-center" style={{ paddingTop: '56.25%', background: YT_GRADIENTS[i] }}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-black/50 flex items-center justify-center">
                      <div className="w-0 h-0 border-t-[3px] border-b-[3px] border-l-[5px] border-t-transparent border-b-transparent border-l-white ml-0.5" />
                    </div>
                  </div>
                </div>
                {template.config.show_title !== false && (
                  <div className="px-1 py-1">
                    <div className="h-1.5 rounded-full" style={{ background: `${textColor}22`, width: '90%' }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  // ── Google Reviews ────────────────────────────────────────────────────
  if (widgetType === 'google_reviews') {
    return (
      <div className="h-40 rounded-t-xl overflow-hidden p-2.5" style={{ background: bg }}>
        {/* Business header */}
        <div className="flex items-center gap-2 p-2 rounded-lg mb-2" style={{ background: cardBg, boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
          <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm font-black text-white flex-shrink-0" style={{ background: a }}>G</div>
          <div className="flex-1 min-w-0">
            <div className="h-1.5 rounded-full mb-1" style={{ background: `${textColor}30`, width: 70 }} />
            <div className="flex items-center gap-1">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(s => <div key={s} className="w-1.5 h-1.5 rounded-sm" style={{ background: '#f59e0b' }} />)}
              </div>
              <div className="h-1 rounded-full" style={{ background: `${mutedColor}40`, width: 28 }} />
            </div>
          </div>
          {template.config.write_review_link && (
            <div className="px-1.5 py-0.5 rounded text-[8px] font-bold text-white flex-shrink-0" style={{ background: a }}>Write</div>
          )}
        </div>
        {/* Review cards */}
        {[0,1].map(i => (
          <div key={i} className="flex items-start gap-1.5 p-2 rounded-lg mb-1" style={{ background: cardBg, boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold text-white flex-shrink-0" style={{ background: i === 0 ? a : `${a}80` }}>{i === 0 ? 'S' : 'J'}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1 mb-0.5">
                <div className="flex gap-0.5">{[1,2,3,4,5].map(s => <div key={s} className="w-1 h-1 rounded-sm" style={{ background: '#f59e0b' }} />)}</div>
              </div>
              <div className="h-1 rounded-full mb-0.5" style={{ background: `${mutedColor}35`, width: `${85 - i * 12}%` }} />
              <div className="h-1 rounded-full" style={{ background: `${mutedColor}20`, width: `${65 - i * 8}%` }} />
            </div>
          </div>
        ))}
      </div>
    )
  }

  // ── Countdown Timer ───────────────────────────────────────────────────
  if (widgetType === 'countdown_timer') {
    const isMinimal = template.config.style === 'minimal'
    return (
      <div className="h-40 rounded-t-xl overflow-hidden flex flex-col items-center justify-center px-4" style={{ background: bg }}>
        {template.config.title && (
          <div className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: mutedColor }}>{template.config.title as string}</div>
        )}
        {isMinimal ? (
          <div className="flex items-baseline gap-1">
            {['07', '23', '45', '12'].map((v, i) => (
              <span key={i} className="flex items-baseline gap-1">
                <span className="text-3xl font-black font-mono" style={{ color: a }}>{v}</span>
                {i < 3 && <span className="text-xl font-bold" style={{ color: `${a}60` }}>:</span>}
              </span>
            ))}
          </div>
        ) : (
          <div className="flex gap-1.5">
            {[{v:'07',l:'Days'},{v:'23',l:'Hrs'},{v:'45',l:'Min'},{v:'12',l:'Sec'}].map(({ v, l }) => (
              <div key={l} className="flex flex-col items-center">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center font-black text-lg font-mono shadow-sm" style={{ background: isDark ? '#ffffff15' : cardBg, color: a, border: `1px solid ${borderColor}` }}>{v}</div>
                <div className="text-[8px] font-semibold mt-1 uppercase tracking-wide" style={{ color: mutedColor }}>{l}</div>
              </div>
            ))}
          </div>
        )}
        {template.config.show_labels !== false && isMinimal && (
          <div className="flex gap-4 mt-2">
            {['Days','Hours','Mins','Secs'].map(l => (
              <div key={l} className="text-[8px] font-semibold uppercase tracking-wide" style={{ color: mutedColor }}>{l}</div>
            ))}
          </div>
        )}
      </div>
    )
  }

  // ── Announcement Bar ──────────────────────────────────────────────────
  if (widgetType === 'announcement_bar') {
    const isBottom = template.config.position === 'bottom'
    const barStyle = template.config.style === 'gradient'
      ? { background: `linear-gradient(135deg, ${a}, ${a}cc)` }
      : { background: a }
    const bar = (
      <div className="px-4 py-2.5 flex items-center justify-between gap-2" style={barStyle}>
        <span className="text-[10px] font-semibold text-white truncate">
          {template.config.show_emoji && template.config.emoji ? `${template.config.emoji} ` : ''}
          {template.config.message as string || 'Special offer — Limited time only!'}
        </span>
        {template.config.link_text && <span className="text-[9px] font-bold text-white underline whitespace-nowrap">{template.config.link_text as string} →</span>}
        {template.config.show_close_button && <span className="text-white text-xs opacity-70 ml-1">✕</span>}
      </div>
    )
    const content = (
      <div className="flex-1 p-3 space-y-1.5">
        {[1,2,3].map(i => <div key={i} className="h-1.5 rounded-full" style={{ background: `${textColor}10`, width: `${90 - i * 14}%` }} />)}
        <div className="mt-2 rounded-lg h-8" style={{ background: `${textColor}06` }} />
      </div>
    )
    return (
      <div className="h-40 rounded-t-xl overflow-hidden flex flex-col" style={{ background: isDark ? '#f8fafc' : bg }}>
        {isBottom ? <>{content}{bar}</> : <>{bar}{content}</>}
      </div>
    )
  }

  // ── Contact Form ──────────────────────────────────────────────────────
  if (widgetType === 'contact_form') {
    const fields = template.config.fields as Record<string, boolean> || { name: true, email: true, message: true }
    const visibleFields = Object.entries(fields).filter(([,v]) => v)
    const isPopup = template.config.display_mode === 'popup'
    const radius = Math.min((template.config.border_radius as number || 8), 12) + 'px'
    return (
      <div className="h-40 rounded-t-xl overflow-hidden p-3" style={{ background: bg }}>
        {isPopup ? (
          <div className="h-full flex items-end justify-start relative">
            <div className="rounded-xl p-2.5 shadow-lg w-full absolute bottom-0" style={{ background: cardBg }}>
              <div className="h-2 rounded-full mb-2 w-24" style={{ background: `${textColor}25` }} />
              <div className="space-y-1 mb-2">
                {[0,1].map(i => <div key={i} className="h-5 rounded border" style={{ borderColor: `${a}30`, background: isDark ? '#111827' : '#f9fafb' }} />)}
              </div>
              <div className="h-4 rounded-lg" style={{ background: a, width: '100%' }} />
            </div>
            <div className="absolute top-2 right-2 px-3 py-1.5 rounded-xl text-[9px] font-bold text-white shadow-md" style={{ background: a }}>✉ Contact Us</div>
          </div>
        ) : (
          <div className="rounded-xl p-2.5 shadow-md h-full flex flex-col" style={{ background: cardBg }}>
            <div className="h-2 rounded-full mb-0.5 w-20" style={{ background: `${textColor}30` }} />
            <div className="h-1.5 rounded-full mb-2 w-32" style={{ background: `${mutedColor}30` }} />
            <div className="space-y-1 flex-1">
              {visibleFields.slice(0, 3).map(([k]) => (
                <div key={k} className="h-5 rounded border" style={{ borderRadius: radius, borderColor: `${a}25`, background: isDark ? '#111827' : '#f9fafb' }}>
                  <div className="h-full rounded px-2 flex items-center">
                    <div className="h-1 rounded-full" style={{ background: `${mutedColor}30`, width: `${k === 'message' ? 30 : 55}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="h-5 rounded-lg mt-1.5" style={{ background: a }} />
          </div>
        )}
      </div>
    )
  }

  // ── Social Follow ─────────────────────────────────────────────────────
  if (widgetType === 'social_follow') {
    const SOCIALS = [
      { color: '#1877f2', letter: 'f' },
      { color: '#e4405f', letter: 'IG' },
      { color: '#1da1f2', letter: '𝕏' },
      { color: '#ff0000', letter: 'YT' },
      { color: '#0a66c2', letter: 'in' },
    ]
    const isGrid = template.config.layout === 'grid'
    const isFilled = template.config.style === 'filled'
    const isOutline = template.config.style === 'outline'
    const showLabels = template.config.show_labels
    return (
      <div className="h-40 rounded-t-xl overflow-hidden flex items-center justify-center px-4" style={{ background: bg }}>
        <div className={`flex ${isGrid ? 'flex-wrap justify-center gap-2' : 'gap-2'}`}>
          {SOCIALS.map((s) => (
            <div key={s.letter} className="flex flex-col items-center gap-1">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-[10px] font-black shadow-sm"
                style={{
                  background: isFilled ? s.color : isOutline ? 'transparent' : 'transparent',
                  border: isOutline ? `2px solid ${s.color}` : 'none',
                  color: isFilled ? 'white' : s.color,
                }}
              >
                {s.letter}
              </div>
              {showLabels && (
                <div className="text-[7px] font-medium" style={{ color: mutedColor }}>{s.letter}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  // ── Instagram Feed ────────────────────────────────────────────────────
  if (widgetType === 'instagram_feed') {
    const isMasonry = template.config.layout === 'masonry'
    const isCarousel = template.config.layout === 'carousel'
    const rad = (template.config.border_radius as string) === 'round' ? '50%' : (template.config.border_radius as string) || '8px'
    return (
      <div className="h-40 rounded-t-xl overflow-hidden p-2" style={{ background: bg }}>
        {isCarousel ? (
          <div className="flex gap-1.5 h-full">
            {IG_GRADIENTS.slice(0, 5).map((g, i) => (
              <div key={i} className="flex-shrink-0 w-20 h-full" style={{ background: g, borderRadius: rad }} />
            ))}
          </div>
        ) : isMasonry ? (
          <div className="grid grid-cols-3 gap-1 h-full">
            {IG_GRADIENTS.slice(0, 9).map((g, i) => (
              <div key={i} className="rounded overflow-hidden" style={{ background: g, height: i % 3 === 1 ? 52 : 44, borderRadius: rad }} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-1 h-full">
            {IG_GRADIENTS.slice(0, 9).map((g, i) => (
              <div key={i} className="relative flex items-center justify-center" style={{ background: g, borderRadius: rad, aspectRatio: '1' }}>
                {i === 0 && (
                  <div className="absolute inset-0 rounded flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity" style={{ background: 'rgba(0,0,0,0.4)', borderRadius: rad }}>
                    <div className="text-white text-[8px] font-bold">♥ 1.2K</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  // ── TikTok Feed ───────────────────────────────────────────────────────
  if (widgetType === 'tiktok_feed') {
    const isList = template.config.layout === 'list'
    const DURATIONS = ['0:45','1:23','0:58','2:01','1:15','0:37']
    return (
      <div className="h-40 rounded-t-xl overflow-hidden p-2" style={{ background: bg }}>
        {isList ? (
          <div className="space-y-1.5">
            {[0,1,2].map(i => (
              <div key={i} className="flex gap-2 rounded-lg overflow-hidden" style={{ background: cardBg }}>
                <div className="w-12 flex-shrink-0 relative flex items-center justify-center" style={{ background: YT_GRADIENTS[i * 2], aspectRatio: '9/16', maxHeight: 36 }}>
                  <div className="absolute bottom-0.5 right-0.5 bg-black/70 text-white px-0.5 rounded text-[6px] font-mono">{DURATIONS[i]}</div>
                </div>
                <div className="flex-1 py-1 min-w-0">
                  <div className="h-1.5 rounded-full mb-0.5" style={{ background: `${textColor}28`, width: '80%' }} />
                  <div className="h-1 rounded-full" style={{ background: `${mutedColor}20`, width: '55%' }} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-1 h-full">
            {YT_GRADIENTS.slice(0, 6).map((g, i) => (
              <div key={i} className="relative rounded-lg overflow-hidden flex items-center justify-center" style={{ background: g, aspectRatio: '9/16' }}>
                <div className="absolute bottom-1 right-1 bg-black/70 text-white px-0.5 rounded text-[6px] font-mono">{DURATIONS[i]}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  // ── FAQ ───────────────────────────────────────────────────────────────
  if (widgetType === 'faq_accordion') {
    return (
      <div className="h-40 rounded-t-xl overflow-hidden p-3" style={{ background: bg }}>
        {template.config.title && (
          <div className="h-2 rounded-full mb-2.5 w-36" style={{ background: `${textColor}30` }} />
        )}
        <div className="space-y-1">
          {[
            { q: 'How do I get started?', open: true },
            { q: 'Do I need coding skills?', open: false },
            { q: 'Can I use on multiple sites?', open: false },
          ].map((item, i) => (
            <div key={i} className="rounded-lg overflow-hidden border" style={{ background: cardBg, borderColor }}>
              <div className="flex items-center justify-between px-2.5 py-1.5">
                <div className="h-1.5 rounded-full flex-1 mr-2" style={{ background: `${textColor}25`, width: `${70 - i*10}%` }} />
                <div className="w-3.5 h-3.5 rounded-sm flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ color: a }}>{item.open ? '−' : '+'}</div>
              </div>
              {item.open && (
                <div className="px-2.5 pb-1.5">
                  <div className="h-1 rounded-full mb-1" style={{ background: `${mutedColor}28`, width: '90%' }} />
                  <div className="h-1 rounded-full" style={{ background: `${mutedColor}18`, width: '68%' }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  // ── Number Counter ────────────────────────────────────────────────────
  if (widgetType === 'number_counter') {
    const cols = Math.min(template.config.columns as number || 3, 4)
    const STATS = [
      { val: '10K+', lbl: 'Customers' },
      { val: '98%', lbl: 'Satisfaction' },
      { val: '50+', lbl: 'Countries' },
      { val: '24/7', lbl: 'Support' },
    ].slice(0, cols)
    return (
      <div className="h-40 rounded-t-xl overflow-hidden flex flex-col items-center justify-center p-3" style={{ background: bg }}>
        {template.config.title && (
          <div className="h-2 rounded-full mb-3 w-28" style={{ background: `${textColor}25` }} />
        )}
        <div className={`grid gap-2 w-full`} style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
          {STATS.map(({ val, lbl }) => (
            <div key={lbl} className="rounded-xl p-2 text-center shadow-sm" style={{ background: cardBg, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <div className="text-base font-black leading-tight" style={{ color: a }}>{val}</div>
              <div className="text-[8px] font-medium mt-0.5 uppercase tracking-wide" style={{ color: mutedColor }}>{lbl}</div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // ── Google Maps ───────────────────────────────────────────────────────
  if (widgetType === 'google_maps') {
    const rad = `${template.config.border_radius ?? 12}px`
    return (
      <div className="h-40 rounded-t-xl overflow-hidden relative" style={{ background: '#e8f4f8' }}>
        {/* Street grid */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 160" preserveAspectRatio="xMidYMid slice">
          <rect width="200" height="160" fill="#e8f4f8" />
          {/* Blocks */}
          {[0,1,2,3].map(row => [0,1,2,3,4].map(col => (
            <rect key={`${row}-${col}`} x={col * 42 + 8} y={row * 38 + 6} width={28} height={26} fill="#d4e6f1" rx="2" />
          )))}
          {/* Streets */}
          <line x1="0" y1="44" x2="200" y2="44" stroke="#c8dde8" strokeWidth="3" />
          <line x1="0" y1="82" x2="200" y2="82" stroke="#c8dde8" strokeWidth="3" />
          <line x1="0" y1="120" x2="200" y2="120" stroke="#c8dde8" strokeWidth="3" />
          <line x1="42" y1="0" x2="42" y2="160" stroke="#c8dde8" strokeWidth="3" />
          <line x1="84" y1="0" x2="84" y2="160" stroke="#c8dde8" strokeWidth="3" />
          <line x1="126" y1="0" x2="126" y2="160" stroke="#c8dde8" strokeWidth="3" />
          <line x1="168" y1="0" x2="168" y2="160" stroke="#c8dde8" strokeWidth="3" />
        </svg>
        {/* Pin */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg width="32" height="40" viewBox="0 0 24 30" fill="none">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 8.5 12 18 12 18s12-9.5 12-18c0-6.63-5.37-12-12-12z" fill={a} />
            <circle cx="12" cy="12" r="5" fill="white" />
          </svg>
        </div>
        {/* Radius overlay */}
        <div className="absolute inset-0" style={{ borderRadius: rad }} />
      </div>
    )
  }

  // ── Fallback ──────────────────────────────────────────────────────────
  return (
    <div className="h-40 rounded-t-xl overflow-hidden flex items-center justify-center" style={{ background: bg }}>
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black text-white shadow-lg" style={{ background: a }}>
        {(TYPE_META[widgetType]?.label?.[0] ?? '?')}
      </div>
    </div>
  )
}

// ── Main page ──────────────────────────────────────────────────────────────
export default function TemplatesPage() {
  const router  = useRouter()
  const [activeCategory, setActiveCategory] = useState('all')
  const [creating, setCreating] = useState<string | null>(null)
  const [error, setError]       = useState<string | null>(null)
  const [created, setCreated]   = useState<string | null>(null)

  const filtered = TEMPLATES.filter(
    t => activeCategory === 'all' || t.category === activeCategory
  )

  async function useTemplate(template: Template) {
    if (creating) return
    setCreating(template.id)
    setError(null)

    try {
      const res = await fetch('/api/widgets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: template.name + ' Widget',
          type: template.widgetType,
          config: template.config,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        if (data.code === 'PLAN_LIMIT_REACHED') throw new Error('Widget limit reached. Upgrade your plan.')
        throw new Error(data.error ?? 'Failed to create widget')
      }

      const { widget } = await res.json()
      setCreated(template.id)
      setTimeout(() => router.push(`/dashboard/widgets/${widget.id}`), 350)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setCreating(null)
    }
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            Templates
            <span className="text-xs font-semibold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">{TEMPLATES.length}</span>
          </h1>
          <p className="text-gray-500 text-sm mt-1">Ready-made designs — click to create &amp; customise instantly</p>
        </div>
        <div className="flex items-center gap-2 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl px-4 py-2.5">
          <Lock size={13} className="text-amber-500" />
          <div>
            <p className="text-xs font-bold text-amber-800 leading-none">Pro templates</p>
            <p className="text-[11px] text-amber-600 mt-0.5">Upgrade to unlock all designs</p>
          </div>
        </div>
      </div>

      {/* Category filter */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {CATEGORIES.map(cat => {
          const count = cat.key === 'all' ? TEMPLATES.length : TEMPLATES.filter(t => t.category === cat.key).length
          return (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={[
                'px-4 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5',
                activeCategory === cat.key
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900',
              ].join(' ')}
            >
              {cat.label}
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${activeCategory === cat.key ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`}>{count}</span>
            </button>
          )
        })}
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700 flex items-center gap-2">
          <span className="text-red-400">⚠</span> {error}
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map(template => {
          const meta = TYPE_META[template.widgetType]
          const color = meta?.color ?? '#6366f1'
          const isCreating = creating === template.id
          const isDone = created === template.id

          return (
            <div
              key={template.id}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl hover:border-indigo-200 hover:-translate-y-0.5 transition-all duration-200 flex flex-col group cursor-pointer"
              onClick={() => !creating && !isDone && useTemplate(template)}
            >
              {/* Thumbnail */}
              <div className="relative">
                <MiniPreview template={template} />

                {/* Top-left: widget type badge */}
                <div className="absolute top-2 left-2">
                  <span
                    className="text-[9px] font-bold px-2 py-0.5 rounded-full backdrop-blur-sm"
                    style={{ background: `${color}25`, color, border: `1px solid ${color}30` }}
                  >
                    {meta?.label}
                  </span>
                </div>

                {/* Top-right: Pro/Free badge */}
                <div className="absolute top-2 right-2">
                  {template.isPro ? (
                    <span className="flex items-center gap-0.5 text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-white shadow-sm">
                      <Zap size={8} /> Pro
                    </span>
                  ) : (
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-500 text-white shadow-sm">Free</span>
                  )}
                </div>

                {/* Bottom badge (new/popular/trending) */}
                {template.badge && (
                  <div className="absolute bottom-2 left-2">
                    {template.badge === 'popular' && (
                      <span className="flex items-center gap-0.5 text-[9px] font-bold px-2 py-0.5 rounded-full bg-indigo-600 text-white shadow-sm">
                        <TrendingUp size={7} /> Popular
                      </span>
                    )}
                    {template.badge === 'new' && (
                      <span className="flex items-center gap-0.5 text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-500 text-white shadow-sm">
                        <Sparkles size={7} /> New
                      </span>
                    )}
                    {template.badge === 'trending' && (
                      <span className="flex items-center gap-0.5 text-[9px] font-bold px-2 py-0.5 rounded-full bg-orange-500 text-white shadow-sm">
                        🔥 Trending
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Card body */}
              <div className="p-3.5 flex flex-col gap-2 flex-1">
                <div>
                  <h3 className="font-bold text-gray-900 text-sm leading-tight">{template.name}</h3>
                  <p className="text-gray-500 text-xs mt-0.5 leading-relaxed line-clamp-1">{template.description}</p>
                </div>

                {/* Feature tags */}
                {template.tags && template.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {template.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">{tag}</span>
                    ))}
                  </div>
                )}

                {/* CTA button */}
                <button
                  type="button"
                  onClick={e => { e.stopPropagation(); if (!creating && !isDone) useTemplate(template) }}
                  disabled={!!creating || isDone}
                  className={[
                    'inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg transition-all duration-150 w-full mt-auto',
                    isDone
                      ? 'bg-emerald-500 text-white shadow-sm'
                      : isCreating
                      ? 'bg-indigo-400 text-white cursor-wait'
                      : template.isPro
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 shadow-sm'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm',
                  ].join(' ')}
                >
                  {isDone ? (
                    <><Check size={12} /> Created!</>
                  ) : isCreating ? (
                    <span className="flex items-center gap-1.5"><span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />Creating…</span>
                  ) : template.isPro ? (
                    <><Zap size={11} /> Use Template</>
                  ) : (
                    'Use Template →'
                  )}
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <p className="text-4xl mb-3">🎨</p>
          <p className="text-lg font-semibold">No templates in this category yet</p>
          <p className="text-sm mt-1">More templates coming soon!</p>
        </div>
      )}
    </div>
  )
}

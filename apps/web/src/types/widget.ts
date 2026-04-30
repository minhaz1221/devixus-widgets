export type WidgetType =
  | 'whatsapp'
  | 'testimonials'
  | 'google_reviews'
  | 'countdown'
  | 'contact_form'
  | 'social_follow'
  | 'youtube_feed'

export interface Widget {
  id: string
  user_id: string
  name: string
  type: WidgetType
  config: Record<string, unknown>
  is_active: boolean
  show_branding: boolean
  install_count: number
  created_at: string
  updated_at: string
}

export interface WhatsAppConfig {
  phone_number: string
  welcome_message: string
  button_color: string
  position: 'bottom-right' | 'bottom-left'
  show_on_mobile: boolean
  show_on_desktop: boolean
}

export interface TestimonialsConfig {
  testimonials: Array<{
    author: string
    role: string
    content: string
    rating: number
    avatar_url?: string
  }>
  autoplay: boolean
  autoplay_speed: number
  show_rating: boolean
  theme: 'light' | 'dark'
}

export interface YouTubeFeedConfig {
  channel_id: string
  channel_url: string
  max_results: number
  layout: 'grid' | 'list' | 'carousel'
  columns: 2 | 3 | 4
  show_title: boolean
  show_description: boolean
  show_views: boolean
  show_date: boolean
  theme: 'light' | 'dark'
  accent_color: string
}

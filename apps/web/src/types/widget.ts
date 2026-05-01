export type WidgetType =
  | 'whatsapp'
  | 'testimonials'
  | 'google_reviews'
  | 'countdown'
  | 'contact_form'
  | 'social_follow'
  | 'youtube_feed'
  | 'countdown_timer'
  | 'announcement_bar'

export interface Widget {
  id: string
  user_id: string
  name: string
  type: WidgetType
  config: Record<string, unknown>
  is_active: boolean
  show_branding: boolean
  install_count: number
  monthly_views: number
  views_reset_at: string
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

export interface CountdownTimerConfig {
  target_date: string
  target_time: string
  timezone: string
  title: string
  expired_message: string
  redirect_url: string
  style: 'flip' | 'minimal' | 'blocks'
  theme: 'light' | 'dark' | 'custom'
  bg_color: string
  text_color: string
  accent_color: string
  show_days: boolean
  show_hours: boolean
  show_minutes: boolean
  show_seconds: boolean
  show_labels: boolean
}

export interface AnnouncementBarConfig {
  message: string
  link_text: string
  link_url: string
  position: 'top' | 'bottom'
  bg_color: string
  text_color: string
  link_color: string
  show_close_button: boolean
  show_emoji: boolean
  emoji: string
  style: 'solid' | 'gradient' | 'striped'
  is_sticky: boolean
}

export interface GoogleReviewsConfig {
  place_id: string
  place_name: string
  place_address: string
  layout: 'grid' | 'list' | 'carousel' | 'badge'
  min_rating: 1 | 2 | 3 | 4 | 5
  max_reviews: number
  show_header: boolean
  show_overall_rating: boolean
  show_review_date: boolean
  show_reviewer_photo: boolean
  theme: 'light' | 'dark'
  accent_color: string
  write_review_link: boolean
}

export interface ContactFormConfig {
  title: string
  subtitle: string
  recipient_email: string
  button_text: string
  button_color: string
  success_message: string
  display_mode: 'popup' | 'inline'
  trigger_text: string
  trigger_style: 'button' | 'tab'
  fields: {
    name: boolean
    email: boolean
    phone: boolean
    subject: boolean
    message: boolean
  }
  required_fields: {
    name: boolean
    email: boolean
    phone: boolean
    subject: boolean
    message: boolean
  }
  theme: 'light' | 'dark'
  border_radius: number
  accent_color: string
}

export interface SocialFollowConfig {
  networks: {
    facebook?: string
    instagram?: string
    twitter?: string
    tiktok?: string
    youtube?: string
    linkedin?: string
    pinterest?: string
    whatsapp?: string
  }
  layout: 'horizontal' | 'vertical' | 'grid'
  style: 'filled' | 'outline' | 'minimal'
  size: 'small' | 'medium' | 'large'
  show_labels: boolean
  label_type: 'network_name' | 'follow_us' | 'custom'
  custom_label: string
  theme: 'light' | 'dark'
  border_radius: number
  animation: 'none' | 'hover_grow' | 'hover_bounce'
}

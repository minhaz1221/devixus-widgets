export interface UseCase {
  title: string
  desc: string
}

export interface WidgetStats {
  installs: string
  rating: string
  reviews: number
}

export interface Widget {
  slug: string
  name: string
  tagline: string
  description: string
  icon: string
  brandColor: string
  bgColor: string
  category: string
  available: boolean
  badge?: string
  features: string[]
  useCases: UseCase[]
  stats: WidgetStats
}

export const widgets: Widget[] = [
  {
    slug: 'whatsapp-chat',
    name: 'WhatsApp Chat',
    tagline: 'Let visitors message you instantly on WhatsApp',
    description: 'Add a floating WhatsApp button to your website. Visitors click it and land directly in a WhatsApp chat with you. Zero friction, instant connection.',
    icon: 'whatsapp',
    brandColor: '#25D366',
    bgColor: '#f0fdf4',
    category: 'social',
    available: true,
    features: [
      'Custom welcome message',
      'Agent name & avatar',
      'Show/hide on mobile',
      'Delay before showing',
      'Button position control',
      'Online status badge',
      'Multiple phone numbers',
      'Click analytics',
    ],
    useCases: [
      { title: 'Customer Support', desc: 'Let customers reach you instantly instead of waiting for email replies.' },
      { title: 'Sales Conversion', desc: 'Capture leads the moment they show buying intent.' },
      { title: 'Service Bookings', desc: 'Let visitors book appointments directly via WhatsApp.' },
    ],
    stats: { installs: '1,200+', rating: '4.9', reviews: 48 },
  },
  {
    slug: 'testimonials',
    name: 'Testimonials',
    tagline: 'Show social proof that converts visitors into customers',
    description: 'Display beautiful customer testimonials in a slider, grid, or masonry layout. Fully customizable to match your brand.',
    icon: 'star',
    brandColor: '#f59e0b',
    bgColor: '#fffbeb',
    category: 'social',
    available: true,
    features: [
      'Slider, Grid & Masonry layouts',
      'Star ratings display',
      'Avatar & company logo',
      'Auto-play carousel',
      'Custom colors & fonts',
      'Mobile responsive',
      'Drag to reorder',
      'Rich text support',
    ],
    useCases: [
      { title: 'Build Trust', desc: 'Show real reviews to reduce buyer hesitation on product pages.' },
      { title: 'Agency Portfolios', desc: 'Display client feedback to win new business.' },
      { title: 'SaaS Landing Pages', desc: 'Social proof near your CTA increases conversion rates.' },
    ],
    stats: { installs: '890+', rating: '4.8', reviews: 36 },
  },
  {
    slug: 'youtube-feed',
    name: 'YouTube Feed',
    tagline: 'Embed your YouTube channel directly on your website',
    description: 'Display your latest YouTube videos in a beautiful grid or carousel. Auto-updates whenever you post. Drive more views and subscribers.',
    icon: 'youtube',
    brandColor: '#FF0000',
    bgColor: '#fff1f2',
    category: 'social',
    available: true,
    features: [
      'Grid, List & Carousel layouts',
      'Auto-updates on new uploads',
      'Video lightbox player',
      'Channel header display',
      'View & duration badges',
      'Custom column count',
      'Light & dark themes',
      'No API key required',
    ],
    useCases: [
      { title: 'Content Creators', desc: 'Keep your website fresh with your latest YouTube content automatically.' },
      { title: 'Businesses', desc: 'Showcase product demos and tutorials right on your site.' },
      { title: 'Educators', desc: 'Embed course previews and lesson snippets for new visitors.' },
    ],
    stats: { installs: '650+', rating: '4.8', reviews: 29 },
  },
  {
    slug: 'google-reviews',
    name: 'Google Reviews',
    tagline: 'Display your Google star ratings and build instant trust',
    description: 'Pull your Google Business reviews automatically and display them beautifully. Filter by star rating and update without touching your site.',
    icon: 'google',
    brandColor: '#4285F4',
    bgColor: '#eff6ff',
    category: 'reviews',
    available: true,
    features: [
      'Auto-sync from Google',
      'Filter by star rating',
      'Sort by newest or highest',
      'Reviewer avatar & date',
      'Grid, List & Carousel',
      'Google branding badge',
      'Minimum rating filter',
      'Responsive design',
    ],
    useCases: [
      { title: 'Local Businesses', desc: 'Turn your 5-star Google rating into your best sales tool.' },
      { title: 'Restaurants', desc: 'Show glowing food reviews right on your menu page.' },
      { title: 'Service Providers', desc: 'Let happy customers do the selling for you.' },
    ],
    stats: { installs: '780+', rating: '4.9', reviews: 41 },
  },
  {
    slug: 'countdown-timer',
    name: 'Countdown Timer',
    tagline: 'Create urgency and boost conversions with countdowns',
    description: 'Add a live countdown timer to any page. Perfect for flash sales, product launches, event registrations, and limited-time offers.',
    icon: 'clock',
    brandColor: '#6366f1',
    bgColor: '#eef2ff',
    category: 'tools',
    available: true,
    features: [
      'Deadline & recurring modes',
      'Timezone support',
      'Custom labels',
      'On-expire: hide/redirect',
      'Circular & block styles',
      'Custom digit colors',
      'Days/hours/minutes/seconds',
      'Mobile responsive',
    ],
    useCases: [
      { title: 'Flash Sales', desc: 'A ticking clock drives impulse purchases like nothing else.' },
      { title: 'Product Launches', desc: 'Build anticipation before your big launch day.' },
      { title: 'Event Registration', desc: 'Show how much time is left to register for your event.' },
    ],
    stats: { installs: '540+', rating: '4.7', reviews: 22 },
  },
  {
    slug: 'announcement-bar',
    name: 'Announcement Bar',
    tagline: 'Grab attention with a sticky top bar on every page',
    description: 'Add a sticky announcement bar to your website. Perfect for promotions, shipping notices, cookie banners, and important updates.',
    icon: 'megaphone',
    brandColor: '#f59e0b',
    bgColor: '#fffbeb',
    category: 'tools',
    available: true,
    features: [
      'Top or bottom position',
      'CTA button support',
      'Close button toggle',
      'Re-show after X days',
      'Custom bg & text colors',
      'Emoji & rich text',
      'Mobile responsive',
      'Scroll trigger option',
    ],
    useCases: [
      { title: 'Promotions', desc: 'Highlight discount codes and seasonal sales at the top of every page.' },
      { title: 'Shipping Updates', desc: 'Inform customers of delays or free shipping thresholds.' },
      { title: 'New Features', desc: 'Announce product updates to all your visitors instantly.' },
    ],
    stats: { installs: '430+', rating: '4.8', reviews: 18 },
  },
  {
    slug: 'contact-form',
    name: 'Contact Form',
    tagline: 'A beautiful contact form that actually gets filled out',
    description: 'Add a clean, conversion-optimized contact form to any page. Responses go straight to your email. No backend setup required.',
    icon: 'mail',
    brandColor: '#3b82f6',
    bgColor: '#eff6ff',
    category: 'forms',
    available: true,
    features: [
      'Drag-to-reorder fields',
      'Required field control',
      'Email notifications',
      'Success animation',
      'reCAPTCHA support',
      'Custom submit text',
      'Floating label style',
      'GDPR checkbox option',
    ],
    useCases: [
      { title: 'Lead Generation', desc: 'Capture qualified leads directly from your landing page.' },
      { title: 'Client Inquiries', desc: 'Let potential clients reach you without exposing your email.' },
      { title: 'Support Requests', desc: 'Give visitors a clear path to get help.' },
    ],
    stats: { installs: '920+', rating: '4.9', reviews: 53 },
  },
  {
    slug: 'social-follow',
    name: 'Social Follow',
    tagline: 'Grow your social following from your website',
    description: 'Display all your social media profiles in one clean widget. Visitors follow you on their preferred platform without leaving your site.',
    icon: 'share',
    brandColor: '#8b5cf6',
    bgColor: '#f5f3ff',
    category: 'social',
    available: true,
    features: [
      '8+ social platforms',
      'Follower count display',
      'Horizontal & vertical layouts',
      'Icon, icon+name, icon+count styles',
      'Custom button colors',
      'Pill & square shapes',
      'Hover animations',
      'Mobile responsive',
    ],
    useCases: [
      { title: 'Content Creators', desc: 'Convert website visitors into social followers across all platforms.' },
      { title: 'Brands', desc: 'Strengthen your social presence from every page of your site.' },
      { title: 'Agencies', desc: 'Add social proof and grow client social audiences.' },
    ],
    stats: { installs: '360+', rating: '4.7', reviews: 15 },
  },
  {
    slug: 'instagram-feed',
    name: 'Instagram Feed',
    tagline: 'Embed your Instagram posts beautifully on your website',
    description: 'Display your latest Instagram photos and reels in a grid, carousel, or masonry layout. Auto-updates when you post.',
    icon: 'instagram',
    brandColor: '#E1306C',
    bgColor: '#fdf2f8',
    category: 'social',
    available: true,
    badge: 'Coming Soon',
    features: [
      'Grid, Carousel & Masonry',
      'Auto-updates on new posts',
      'Lightbox viewer',
      'Like & comment counts',
      'Caption toggle',
      'Video play icon',
      '2/3/4 column layouts',
      'Light & dark themes',
    ],
    useCases: [
      { title: 'E-commerce', desc: 'Show UGC product photos from Instagram to drive purchases.' },
      { title: 'Photographers', desc: 'Keep your portfolio fresh with your latest Instagram work.' },
      { title: 'Restaurants', desc: 'Display food photos that make visitors hungry to visit.' },
    ],
    stats: { installs: '—', rating: '—', reviews: 0 },
  },
  {
    slug: 'tiktok-feed',
    name: 'TikTok Feed',
    tagline: 'Embed your TikTok videos on your website',
    description: 'Display your TikTok videos in a grid, carousel, or list layout. Show view counts, duration badges, and drive traffic back to TikTok.',
    icon: 'tiktok',
    brandColor: '#000000',
    bgColor: '#f9fafb',
    category: 'social',
    available: true,
    badge: 'Coming Soon',
    features: [
      'Grid, Carousel & List',
      'Portrait 9:16 thumbnails',
      'View count formatting (125K)',
      'Duration badges',
      'Like count display',
      'Autoplay on hover',
      'Light & dark themes',
      'Mobile responsive',
    ],
    useCases: [
      { title: 'Creators', desc: 'Drive website visitors to your TikTok and grow your following.' },
      { title: 'Brands', desc: 'Showcase viral TikTok content as social proof on your site.' },
      { title: 'Agencies', desc: 'Embed client TikTok feeds on their websites automatically.' },
    ],
    stats: { installs: '—', rating: '—', reviews: 0 },
  },
]

export const categories = ['All', 'Social', 'Tools', 'Forms', 'Reviews']

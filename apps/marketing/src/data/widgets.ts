export interface WidgetInfo {
  id: string
  slug: string
  name: string
  description: string
  longDescription: string
  category: string
  color: string
  bgColor: string
  features: string[]
  useCases: string[]
  available: boolean
}

export const widgets: WidgetInfo[] = [
  {
    id: 'whatsapp',
    slug: 'whatsapp-chat-button',
    name: 'WhatsApp Chat',
    description: 'Add a floating WhatsApp button to your website. Let visitors message you instantly.',
    longDescription: 'The WhatsApp Chat widget adds a beautiful floating button to your website that opens a WhatsApp conversation when clicked. Fully customizable colors, position, and welcome message.',
    category: 'Communication',
    color: '#25D366',
    bgColor: '#dcfce7',
    features: [
      'Floating button — bottom left or right',
      'Custom welcome message',
      'Custom button color',
      'Show/hide on mobile or desktop',
      'Shadow DOM isolated — zero CSS conflicts',
      'Loads in under 100ms',
    ],
    useCases: [
      'E-commerce stores for customer support',
      'Service businesses for quick inquiries',
      'Restaurants for table reservations',
      'Freelancers for client contact',
    ],
    available: true,
  },
  {
    id: 'testimonials',
    slug: 'testimonials-slider',
    name: 'Testimonials Slider',
    description: 'Display customer reviews in a beautiful scrollable slider. Build trust instantly.',
    longDescription: 'Showcase your best customer reviews with a sleek, responsive testimonials slider. Supports star ratings, author photos, and light/dark themes.',
    category: 'Social Proof',
    color: '#3b82f6',
    bgColor: '#dbeafe',
    features: [
      'Horizontal scroll slider',
      'Star ratings display',
      'Author name, role, and avatar',
      'Light and dark theme',
      'Add unlimited testimonials',
      'Auto-scroll support',
    ],
    useCases: [
      'SaaS products to show customer love',
      'Agencies to display client results',
      'Coaches and consultants for credibility',
      'E-commerce for product reviews',
    ],
    available: true,
  },
  {
    id: 'google_reviews',
    slug: 'google-reviews',
    name: 'Google Reviews',
    description: 'Embed your Google Business reviews directly on your website automatically.',
    longDescription: 'Pull your Google Business reviews and display them beautifully on your website. Updates automatically when new reviews come in.',
    category: 'Social Proof',
    color: '#f59e0b',
    bgColor: '#fef3c7',
    features: [
      'Auto-sync with Google Business',
      'Filter by star rating',
      'Grid and carousel layouts',
      'Show overall rating badge',
      'Respond to reviews link',
      'Updates automatically',
    ],
    useCases: [
      'Local businesses to build trust',
      'Restaurants to show ratings',
      'Service providers for credibility',
      'Retail stores to drive foot traffic',
    ],
    available: false,
  },
  {
    id: 'countdown_timer',
    slug: 'countdown-timer',
    name: 'Countdown Timer',
    description: 'Create urgency with a beautiful countdown timer for sales, launches, and events.',
    longDescription: 'Drive conversions with a countdown timer widget. Perfect for flash sales, product launches, webinars, and limited time offers. Three display styles: blocks, flip, and minimal.',
    category: 'Marketing',
    color: '#8b5cf6',
    bgColor: '#ede9fe',
    features: [
      'Days, hours, minutes, seconds',
      'Custom end date and time',
      'Blocks, flip, and minimal styles',
      'Custom colors and accent',
      'Redirect on completion',
      'Expired message support',
    ],
    useCases: [
      'Flash sales and limited offers',
      'Product launch countdowns',
      'Webinar and event registration',
      'Holiday sale promotions',
    ],
    available: true,
  },
  {
    id: 'contact_form',
    slug: 'contact-form',
    name: 'Contact Form',
    description: 'A beautiful popup contact form that sends emails directly to your inbox.',
    longDescription: 'Replace your boring contact page with a sleek popup form. Submissions go straight to your email with zero configuration.',
    category: 'Communication',
    color: '#f97316',
    bgColor: '#ffedd5',
    features: [
      'Popup or inline display',
      'Email notifications',
      'Custom fields support',
      'Spam protection built-in',
      'Thank you message',
      'Mobile responsive',
    ],
    useCases: [
      'Business websites for inquiries',
      'Portfolios for client contact',
      'Landing pages for lead capture',
      'Support pages for help requests',
    ],
    available: false,
  },
  {
    id: 'social_follow',
    slug: 'social-follow-buttons',
    name: 'Social Follow',
    description: 'Grow your social media following with a stylish social follow buttons widget.',
    longDescription: 'Add beautiful social media follow buttons for Instagram, Facebook, Twitter, TikTok, YouTube and more. One widget, all your profiles.',
    category: 'Social Media',
    color: '#ec4899',
    bgColor: '#fce7f3',
    features: [
      'Instagram, Facebook, Twitter/X',
      'TikTok, YouTube, LinkedIn',
      'Horizontal or vertical layout',
      'Icon only or with labels',
      'Custom colors',
      'Follower count display',
    ],
    useCases: [
      'Blogs to grow social following',
      'Influencer websites',
      'Brand websites',
      'Personal portfolios',
    ],
    available: false,
  },
  {
    id: 'announcement_bar',
    slug: 'announcement-bar',
    name: 'Announcement Bar',
    description: 'A sticky top or bottom bar for promotions, announcements, and special offers.',
    longDescription: 'Grab visitor attention instantly with a fully customizable announcement bar. Supports solid, gradient, and striped styles with an optional close button and CTA link.',
    category: 'Marketing',
    color: '#f97316',
    bgColor: '#ffedd5',
    features: [
      'Sticky top or bottom position',
      'Solid, gradient, and striped styles',
      'Custom emoji support',
      'Optional CTA link',
      'Dismissible close button',
      'Full color customization',
    ],
    useCases: [
      'Flash sale announcements',
      'Free shipping promotions',
      'New product launches',
      'Holiday campaign banners',
    ],
    available: true,
  },
]

export const categories = [
  'All',
  'Communication',
  'Social Proof',
  'Marketing',
  'Social Media',
]

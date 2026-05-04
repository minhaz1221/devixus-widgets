import Link from 'next/link'
import { Check } from 'lucide-react'

const WEB_APP = 'https://devixus-widgets-web.vercel.app'

function WhatsAppMiniIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function YouTubeMiniIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#FF0000" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

function GoogleMiniIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  )
}

const WIDGET_CARDS = [
  { name: 'WhatsApp Chat', icon: <WhatsAppMiniIcon />, bg: '#f0fdf4', dot: '#22c55e' },
  { name: 'YouTube Feed',  icon: <YouTubeMiniIcon />,  bg: '#fff1f2', dot: '#ef4444' },
  { name: 'Google Reviews',icon: <GoogleMiniIcon />,  bg: '#fefce8', dot: '#22c55e' },
]

const STATS = [
  { value: '10', label: 'Widget types' },
  { value: '5K+', label: 'Active installs' },
  { value: 'Free', label: 'Forever' },
]

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-24 px-6 text-center">
      {/* Soft bg gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{ background: 'linear-gradient(180deg, #eef2ff 0%, #ffffff 60%)' }}
      />
      {/* Glow blob */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] -z-10 rounded-full opacity-30 blur-3xl"
        style={{ background: 'radial-gradient(ellipse, #a5b4fc 0%, transparent 70%)' }}
      />

      <div className="max-w-4xl mx-auto">
        {/* Trust badge */}
        <div className="inline-flex items-center gap-2 border border-indigo-200 bg-indigo-50 text-indigo-600 text-sm font-medium rounded-full px-4 py-1.5 mb-5 reveal">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true">
            <path d="M5 0L6.12 3.38L9.76 3.09L7.07 5.34L8.09 8.91L5 6.8L1.91 8.91L2.93 5.34L.24 3.09L3.88 3.38L5 0Z" />
          </svg>
          Trusted by 5,000+ websites worldwide
        </div>

        {/* Social proof row */}
        <div className="flex items-center justify-center gap-3 mb-8 reveal">
          {/* Avatar stack */}
          <div className="flex -space-x-2">
            {['#6366f1','#8b5cf6','#ec4899','#f59e0b','#10b981'].map((color, i) => (
              <div
                key={i}
                className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-white text-[10px] font-bold shrink-0"
                style={{ background: color, zIndex: 5 - i }}
              >
                {['M','S','A','R','J'][i]}
              </div>
            ))}
          </div>
          {/* Stars */}
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} width="12" height="12" viewBox="0 0 10 10" fill="#f59e0b" aria-hidden="true">
                <path d="M5 0L6.12 3.38L9.76 3.09L7.07 5.34L8.09 8.91L5 6.8L1.91 8.91L2.93 5.34L.24 3.09L3.88 3.38L5 0Z" />
              </svg>
            ))}
            <span className="text-xs text-gray-500 ml-1 font-medium">4.9/5 from 200+ users</span>
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight reveal reveal-delay-1">
          Add beautiful widgets<br />
          to any website —{' '}
          <span className="text-indigo-500">no code needed</span>
        </h1>

        {/* Sub */}
        <p className="mt-6 text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed reveal reveal-delay-2">
          WhatsApp buttons, review carousels, countdown timers, YouTube feeds and more.
          Customize, copy one line of code, done.
        </p>

        {/* CTA row */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center reveal reveal-delay-3">
          <a
            href={`${WEB_APP}/signup`}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-indigo-600 text-white font-semibold text-base rounded-full hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-indigo-200 hover:shadow-xl"
          >
            Start for free
          </a>
          <Link
            href="/widgets"
            className="inline-flex items-center justify-center gap-1 text-gray-600 hover:text-gray-900 font-medium text-base transition-colors underline underline-offset-4 decoration-gray-300 hover:decoration-gray-500"
          >
            See all widgets →
          </Link>
        </div>

        {/* Trust pills */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-5 text-sm text-gray-400 reveal reveal-delay-4">
          {['Free plan available', 'No credit card required', 'Works on any website'].map(b => (
            <span key={b} className="flex items-center gap-1.5">
              <Check size={13} className="text-green-500" strokeWidth={2.5} />
              {b}
            </span>
          ))}
        </div>

        {/* Browser mockup */}
        <div className="relative mt-16 reveal reveal-delay-3">
          {/* glow behind */}
          <div
            aria-hidden="true"
            className="absolute -inset-6 -z-10 rounded-3xl blur-2xl opacity-50"
            style={{ background: 'radial-gradient(ellipse, #c7d2fe 0%, transparent 70%)' }}
          />
          <div className="max-w-2xl mx-auto rounded-2xl overflow-hidden border border-gray-200 shadow-2xl bg-white">
            {/* Browser chrome */}
            <div className="bg-gray-50 px-4 py-3 flex items-center gap-2 border-b border-gray-100">
              <div className="w-3 h-3 rounded-full bg-red-400/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-400/70" />
              <div className="w-3 h-3 rounded-full bg-green-400/70" />
              <div className="ml-3 flex-1 bg-white rounded-md text-xs text-gray-400 px-3 py-1.5 text-left border border-gray-200/80 font-mono">
                yourwebsite.com
              </div>
            </div>

            {/* Browser content */}
            <div className="p-6 bg-white">
              {/* Fake page skeleton */}
              <div className="space-y-2 mb-6">
                <div className="h-3 bg-gray-100 rounded-full w-3/4" />
                <div className="h-3 bg-gray-100 rounded-full w-1/2" />
                <div className="h-3 bg-gray-100 rounded-full w-2/3" />
              </div>

              {/* Widget cards */}
              <div className="grid grid-cols-3 gap-3">
                {WIDGET_CARDS.map(card => (
                  <div
                    key={card.name}
                    className="rounded-xl border border-gray-100 p-3.5 flex flex-col gap-2"
                    style={{ background: card.bg }}
                  >
                    <div className="flex items-center justify-between">
                      {card.icon}
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: card.dot }} />
                        Active
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-gray-700 leading-tight">{card.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-14 flex items-center justify-center gap-10 reveal reveal-delay-4">
          {STATS.map((s, i) => (
            <div key={s.label} className="flex items-center gap-10">
              <div className="text-center">
                <div className="text-2xl font-extrabold text-gray-900">{s.value}</div>
                <div className="text-xs text-gray-400 mt-0.5 uppercase tracking-wide">{s.label}</div>
              </div>
              {i < STATS.length - 1 && <div className="w-px h-8 bg-gray-200" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

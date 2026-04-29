import Link from 'next/link'
import { ArrowRight, Check, Zap, MousePointerClick, Code2 } from 'lucide-react'
import { widgets } from '@/data/widgets'

const WEB_APP = 'https://devixus-widgets-web.vercel.app'

const HOW_IT_WORKS = [
  { icon: MousePointerClick, title: 'Pick a widget', body: 'Browse our marketplace and choose the widget that fits your site.' },
  { icon: Zap, title: 'Customize it', body: 'Use our visual editor to set colors, text, and behavior. Live preview included.' },
  { icon: Code2, title: 'Paste one line of code', body: 'Copy the snippet and paste it into your website. Done.' },
]

const PLANS = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for trying out widgets.',
    features: ['1 widget', 'Unlimited installs', 'All widget types', 'Devixus branding'],
    cta: 'Get started',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$9',
    period: 'per month',
    description: 'For freelancers and small businesses.',
    features: ['5 widgets', 'Unlimited installs', 'Remove branding', 'Priority support'],
    cta: 'Start free trial',
    highlighted: true,
  },
  {
    name: 'Agency',
    price: '$29',
    period: 'per month',
    description: 'For agencies managing multiple clients.',
    features: ['Unlimited widgets', 'Unlimited installs', 'Remove branding', 'White-label ready'],
    cta: 'Start free trial',
    highlighted: false,
  },
]

export default function HomePage() {
  const previewWidgets = widgets.slice(0, 3)

  return (
    <div className="min-h-screen bg-white">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="pt-20 pb-24 px-6 text-center bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 leading-tight">
            Embed beautiful widgets<br />
            <span className="text-blue-600">on any website</span>
          </h1>
          <p className="mt-6 text-xl text-gray-500 max-w-2xl mx-auto">
            No code required. Add WhatsApp chat, testimonials, and more in 60 seconds.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`${WEB_APP}/signup`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white font-bold text-base rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
            >
              Get started free <ArrowRight size={18} />
            </a>
            <Link
              href="/widgets"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-gray-200 text-gray-700 font-semibold text-base rounded-xl hover:bg-gray-50 transition-colors"
            >
              Browse widgets
            </Link>
          </div>

          {/* Trust badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
            {['Free plan available', 'No credit card required', 'Works on any website'].map(b => (
              <span key={b} className="flex items-center gap-1.5">
                <Check size={14} className="text-green-500" /> {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">Up and running in minutes</h2>
            <p className="mt-3 text-gray-500">Three steps. No developer needed.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={step.title} className="text-center">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <step.icon size={24} className="text-blue-600" />
                </div>
                <div className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">Step {i + 1}</div>
                <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WIDGET PREVIEW ────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900">Popular widgets</h2>
              <p className="mt-2 text-gray-500">Start free, upgrade when you grow.</p>
            </div>
            <Link href="/widgets" className="text-sm font-semibold text-blue-600 hover:underline flex items-center gap-1">
              See all widgets <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {previewWidgets.map(widget => (
              <Link
                key={widget.id}
                href={`/widgets/${widget.slug}`}
                className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-md transition-shadow group"
              >
                <div
                  className="w-10 h-10 rounded-xl mb-3 flex items-center justify-center"
                  style={{ backgroundColor: widget.bgColor }}
                >
                  <span className="text-lg font-black" style={{ color: widget.color }}>
                    {widget.name[0]}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                  {widget.name}
                </h3>
                <p className="text-sm text-gray-500">{widget.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ───────────────────────────────────────────────────────── */}
      <section id="pricing" className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">Simple, transparent pricing</h2>
            <p className="mt-3 text-gray-500">Start free. Upgrade as you grow.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {PLANS.map(plan => (
              <div
                key={plan.name}
                className={[
                  'rounded-2xl border p-6 flex flex-col',
                  plan.highlighted
                    ? 'border-blue-500 ring-2 ring-blue-500 shadow-xl'
                    : 'border-gray-200',
                ].join(' ')}
              >
                {plan.highlighted && (
                  <div className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Most popular</div>
                )}
                <h3 className="font-bold text-gray-900 text-lg">{plan.name}</h3>
                <div className="mt-2 mb-1">
                  <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                  <span className="text-gray-500 text-sm ml-1">/{plan.period}</span>
                </div>
                <p className="text-sm text-gray-500 mb-6">{plan.description}</p>
                <ul className="space-y-2 flex-1 mb-6">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                      <Check size={14} className="text-green-500 shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={`${WEB_APP}/signup`}
                  className={[
                    'block text-center py-3 rounded-xl font-semibold text-sm transition-colors',
                    plan.highlighted
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200',
                  ].join(' ')}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────────── */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="font-bold text-white text-lg">Devixus <span className="text-blue-400">Widgets</span></p>
            <p className="text-sm mt-1">Embed beautiful widgets on any website.</p>
          </div>
          <nav className="flex flex-wrap gap-6 text-sm">
            <Link href="/widgets" className="hover:text-white transition-colors">Widgets</Link>
            <Link href="/#pricing" className="hover:text-white transition-colors">Pricing</Link>
            <a href={`${WEB_APP}/dashboard`} className="hover:text-white transition-colors">Dashboard</a>
          </nav>
        </div>
        <div className="max-w-5xl mx-auto mt-8 pt-6 border-t border-gray-800 text-xs text-gray-600">
          © 2025 Devixus. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

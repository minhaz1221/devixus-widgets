'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight, Check, Layers, Settings, Code,
  MessageCircle, Star, ChevronDown,
} from 'lucide-react'

const WEB_APP = 'https://devixus-widgets-web.vercel.app'

const STATS = [
  { value: '2', label: 'Widget Types' },
  { value: '1-Line', label: 'Install' },
  { value: '60 Sec', label: 'Setup' },
  { value: 'Free', label: 'Forever Plan' },
]

const HOW_IT_WORKS = [
  {
    icon: Layers,
    title: 'Pick a widget',
    body: 'Browse our library of widgets. WhatsApp, testimonials, reviews, and more.',
  },
  {
    icon: Settings,
    title: 'Customize it',
    body: 'Use our visual editor to customize colors, text, and behavior. See changes in real time.',
  },
  {
    icon: Code,
    title: 'Paste one line of code',
    body: 'Copy your embed code and paste it into any website. Works with WordPress, Shopify, Wix — anything.',
  },
]

const WIDGETS = [
  {
    name: 'WhatsApp Chat Button',
    description: 'Let visitors message you instantly on WhatsApp. Increase leads and conversions.',
    features: ['Custom welcome message', 'Mobile & desktop optimized', 'Appears on all pages'],
    color: '#25D366',
    bgColor: '#dcfce7',
    Icon: MessageCircle,
  },
  {
    name: 'Testimonials Slider',
    description: 'Show social proof with a beautiful rotating testimonials slider.',
    features: ['Auto-rotating carousel', 'Star ratings', 'Custom styling'],
    color: '#f59e0b',
    bgColor: '#fef3c7',
    Icon: Star,
  },
]

const PLANS = [
  {
    name: 'Free',
    price: '$0',
    period: '/mo',
    badge: null,
    features: ['1 widget', 'Devixus branding', 'All widget types', 'Unlimited installs'],
    cta: 'Get started free',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$9',
    period: '/mo',
    badge: 'MOST POPULAR',
    features: ['5 widgets', 'No branding', 'All widget types', 'Full analytics', 'Priority support'],
    cta: 'Start Pro',
    highlighted: true,
  },
  {
    name: 'Agency',
    price: '$29',
    period: '/mo',
    badge: null,
    features: ['Unlimited widgets', 'No branding', 'White-label', 'All features', 'Priority support'],
    cta: 'Start Agency',
    highlighted: false,
  },
]

const FAQS = [
  {
    q: 'Does it work on WordPress?',
    a: 'Yes — paste the script tag into any HTML/text widget, or use our WordPress plugin (coming soon).',
  },
  {
    q: 'Do I need coding skills?',
    a: 'No. You customize your widget in our visual editor and we give you one line of code to paste.',
  },
  {
    q: 'What happens when I reach my widget limit?',
    a: "You'll see an upgrade prompt. Your existing widgets keep working — you just can't create new ones until you upgrade.",
  },
  {
    q: 'Can I remove the "Powered by Devixus" branding?',
    a: 'Yes — upgrade to Pro ($9/mo) or Agency ($29/mo) to remove branding completely.',
  },
  {
    q: 'How do I cancel my subscription?',
    a: 'Cancel anytime from your billing dashboard. No questions asked.',
  },
]

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-white">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="pt-20 pb-24 px-6 text-center bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 leading-tight">
            The most affordable widget<br />
            <span className="text-[#ff6914]">platform for any website</span>
          </h1>
          <p className="mt-6 text-xl text-gray-500 max-w-2xl mx-auto">
            Add WhatsApp chat, testimonials, reviews and more to your website in 60 seconds.
            No code required.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`${WEB_APP}/signup`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#ff6914] text-white font-bold text-base rounded-xl hover:bg-orange-600 transition-colors shadow-lg shadow-orange-200"
            >
              Get started free <ArrowRight size={18} />
            </a>
            <Link
              href="/widgets"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-gray-200 text-gray-700 font-semibold text-base rounded-xl hover:bg-gray-50 transition-colors"
            >
              See all widgets
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

          {/* Browser mockup */}
          <div className="mt-16 max-w-xl mx-auto rounded-xl overflow-hidden shadow-2xl border border-gray-200">
            <div className="bg-gray-100 px-4 py-2.5 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <div className="ml-3 flex-1 bg-white rounded text-xs text-gray-400 px-3 py-1 text-left">
                yourwebsite.com
              </div>
            </div>
            <div className="bg-white h-52 relative">
              <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <div className="w-20 h-2.5 bg-gray-200 rounded mx-auto" />
                  <div className="w-28 h-2.5 bg-gray-200 rounded mx-auto" />
                  <div className="w-16 h-2.5 bg-gray-200 rounded mx-auto" />
                  <div className="mt-4 w-24 h-6 bg-gray-200 rounded mx-auto" />
                </div>
              </div>
              <div className="absolute bottom-4 right-4 w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg cursor-pointer">
                <MessageCircle size={22} className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF BAR ──────────────────────────────────────────────── */}
      <section className="py-12 px-6 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-400 text-sm uppercase tracking-widest font-semibold mb-8">
            Trusted by website owners worldwide
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {STATS.map(s => (
              <div key={s.label}>
                <div className="text-3xl font-extrabold text-white">{s.value}</div>
                <div className="text-gray-400 text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">Up and running in 60 seconds</h2>
            <p className="mt-3 text-gray-500">Three steps. No developer needed.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={step.title} className="text-center">
                <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <step.icon size={24} className="text-[#ff6914]" />
                </div>
                <div className="text-xs font-bold text-[#ff6914] uppercase tracking-widest mb-2">
                  Step {i + 1}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WIDGET SHOWCASE ───────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">Powerful widgets, zero effort</h2>
            <p className="mt-3 text-gray-500">Start free, upgrade as you grow.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {WIDGETS.map(w => (
              <div key={w.name} className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: w.bgColor }}
                >
                  <w.Icon size={22} style={{ color: w.color }} />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{w.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{w.description}</p>
                <ul className="space-y-1.5 flex-1 mb-6">
                  {w.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                      <Check size={13} className="text-green-500 shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={`${WEB_APP}/signup`}
                  className="block text-center py-2.5 rounded-xl font-semibold text-sm bg-gray-900 text-white hover:bg-gray-700 transition-colors"
                >
                  Add to website free →
                </a>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/widgets"
              className="text-sm font-semibold text-[#ff6914] hover:underline inline-flex items-center gap-1"
            >
              See all widgets <ArrowRight size={14} />
            </Link>
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
                  'rounded-2xl border p-6 flex flex-col relative',
                  plan.highlighted
                    ? 'border-[#ff6914] ring-2 ring-[#ff6914] shadow-xl'
                    : 'border-gray-200',
                ].join(' ')}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#ff6914] text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                    {plan.badge}
                  </div>
                )}
                <h3 className="font-bold text-gray-900 text-lg">{plan.name}</h3>
                <div className="mt-2 mb-6">
                  <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                  <span className="text-gray-500 text-sm ml-1">{plan.period}</span>
                </div>
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
                      ? 'bg-[#ff6914] text-white hover:bg-orange-600'
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

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">Frequently asked questions</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-6 py-4 flex items-center justify-between font-semibold text-gray-900"
                >
                  {faq.q}
                  <ChevronDown
                    size={16}
                    className={`text-gray-400 transition-transform shrink-0 ml-4 ${openFaq === i ? 'rotate-180' : ''}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4 text-sm text-gray-600 leading-relaxed">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#ff6914]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Ready to add widgets to your website?
          </h2>
          <p className="mt-4 text-orange-100 text-lg">
            Join hundreds of website owners using Devixus Widgets. Free plan available.
          </p>
          <a
            href={`${WEB_APP}/signup`}
            className="mt-8 inline-flex items-center justify-center gap-2 px-10 py-4 bg-white text-[#ff6914] font-bold text-lg rounded-xl hover:bg-orange-50 transition-colors shadow-lg"
          >
            Get started free — it&apos;s free forever
          </a>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────────── */}
      <footer className="bg-gray-900 text-gray-400 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 mb-12">
            <div className="sm:col-span-1">
              <p className="font-bold text-white text-lg">
                Devixus <span className="text-[#ff6914]">Widgets</span>
              </p>
              <p className="text-sm mt-2 leading-relaxed">
                Beautiful widgets for any website. No code required.
              </p>
            </div>
            <div>
              <p className="font-semibold text-white text-sm mb-3">Product</p>
              <ul className="space-y-2 text-sm">
                <li><Link href="/widgets" className="hover:text-white transition-colors">Widgets</Link></li>
                <li><Link href="/#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li>
                  <a href={`${WEB_APP}/dashboard`} className="hover:text-white transition-colors">
                    Dashboard
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-white text-sm mb-3">Company</p>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-white text-sm mb-3">Legal</p>
              <ul className="space-y-2 text-sm">
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-800 text-xs text-gray-600 text-center">
            © 2025 Devixus. All rights reserved. Made with ♥ in Bangladesh
          </div>
        </div>
      </footer>
    </div>
  )
}

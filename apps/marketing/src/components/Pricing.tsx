'use client'

import { useState } from 'react'
import { Check, X, Minus } from 'lucide-react'

const WEB_APP = 'https://devixus-widgets-web.vercel.app'

const PLANS = [
  {
    name: 'Free',
    monthly: 0,
    annual: 0,
    badge: null,
    highlighted: false,
    features: [
      '2 widgets',
      '200 views / month per widget',
      'All widget types',
      'Unlimited installs',
      'Devixus branding',
      'Basic support',
    ],
    cta: 'Get started free',
    ctaStyle: 'border border-indigo-200 text-indigo-600 hover:bg-indigo-50',
  },
  {
    name: 'Pro',
    monthly: 9,
    annual: 7,
    badge: 'Most Popular',
    highlighted: true,
    features: [
      '10 widgets',
      'Unlimited views',
      'Remove branding',
      'Custom CSS',
      'Priority support',
      'Full analytics',
    ],
    cta: 'Start Pro',
    ctaStyle: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg hover:shadow-indigo-200',
  },
  {
    name: 'Agency',
    monthly: 29,
    annual: 23,
    badge: null,
    highlighted: false,
    features: [
      'Unlimited widgets',
      'Unlimited views',
      'White-label branding',
      'Custom "Powered by" text',
      'Remove branding',
      'Dedicated support',
    ],
    cta: 'Start Agency',
    ctaStyle: 'border border-gray-200 text-gray-700 hover:bg-gray-50',
  },
]

type CellVal = true | false | string
const COMPARISON: { feature: string; free: CellVal; pro: CellVal; agency: CellVal }[] = [
  { feature: 'Widgets',           free: '2',          pro: '10',         agency: 'Unlimited' },
  { feature: 'Views / month',     free: '200 / widget', pro: 'Unlimited', agency: 'Unlimited' },
  { feature: 'All widget types',  free: true,          pro: true,         agency: true },
  { feature: 'Remove branding',   free: false,         pro: true,         agency: true },
  { feature: 'Custom CSS',        free: false,         pro: true,         agency: true },
  { feature: 'White-label',       free: false,         pro: false,        agency: true },
  { feature: 'Custom "Powered by"',free: false,        pro: false,        agency: true },
  { feature: 'Full analytics',    free: false,         pro: true,         agency: true },
  { feature: 'Priority support',  free: false,         pro: true,         agency: true },
  { feature: 'Dedicated support', free: false,         pro: false,        agency: true },
  { feature: 'Elfsight price',    free: '$0',          pro: '$20 / mo',   agency: '$80 / mo' },
  { feature: 'Devixus price',     free: '$0',          pro: '$9 / mo',    agency: '$29 / mo' },
]

const ELFSIGHT_COMPARISON: { label: string; elfsight: string; devixus: string }[] = [
  { label: 'Starting price',         elfsight: '$9 / mo (5 apps)',  devixus: '$9 / mo (10 widgets)' },
  { label: 'View limits',            elfsight: '200 views per app', devixus: 'Unlimited on Pro' },
  { label: 'White-label',            elfsight: '$80 / mo',          devixus: '$29 / mo' },
  { label: 'Custom CSS',             elfsight: 'Pro+ only ($20)',   devixus: 'Pro ($9)' },
  { label: 'Per-app confusion',      elfsight: 'Yes — confusing',   devixus: 'No — simple widgets' },
  { label: 'Embed method',           elfsight: 'Per-widget JS',     devixus: 'Single unified script' },
]

const FAQS = [
  {
    q: 'What counts as a "view"?',
    a: 'A view is counted each time your widget loads on a page. Reloads by the same visitor within 10 seconds are not counted again.',
  },
  {
    q: 'Can I switch plans anytime?',
    a: 'Yes. You can upgrade or downgrade at any time. Upgrades take effect immediately; downgrades apply at the end of your billing period.',
  },
  {
    q: 'What happens when I hit the free view limit?',
    a: 'Your widget displays a subtle upgrade prompt overlay. Visitors can still dismiss it and see your widget. Upgrading to Pro removes all limits immediately.',
  },
  {
    q: 'Do you offer refunds?',
    a: 'Yes — 14-day money-back guarantee, no questions asked. Contact support@devixus.com.',
  },
  {
    q: 'What is white-label?',
    a: 'On the Agency plan, you can replace "Powered by Devixus" with your own agency name, or remove branding entirely. Perfect for selling widgets under your own brand.',
  },
  {
    q: 'Can I use Devixus on Shopify, WordPress, or Webflow?',
    a: 'Yes — works on any platform that lets you add a <script> tag: Shopify, WordPress, Webflow, Wix, Squarespace, Framer, and plain HTML.',
  },
]

function Cell({ val }: { val: CellVal }) {
  if (val === true)  return <Check size={16} className="text-green-500 mx-auto" strokeWidth={2.5} />
  if (val === false) return <X     size={15} className="text-gray-300 mx-auto" strokeWidth={2} />
  if (val === '-')   return <Minus size={15} className="text-gray-300 mx-auto" />
  return <span className="text-sm text-gray-700 font-medium">{val}</span>
}

export function Pricing() {
  const [annual, setAnnual] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <section id="pricing" className="py-24 px-6 bg-white">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12 reveal">
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Simple, honest pricing
          </h2>
          <p className="mt-4 text-lg text-gray-500">Start free. Upgrade when you&apos;re ready. No per-widget confusion.</p>

          {/* Billing toggle */}
          <div className="mt-8 inline-flex items-center gap-3 bg-gray-100 rounded-full p-1">
            <button
              onClick={() => setAnnual(false)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${!annual ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${annual ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Annual
              <span className="text-xs font-bold text-green-600 bg-green-100 px-1.5 py-0.5 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Plan cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANS.map((plan, i) => (
            <div
              key={plan.name}
              className={[
                'reveal reveal-delay-' + (i + 1),
                'relative rounded-2xl border p-7 flex flex-col',
                plan.highlighted
                  ? 'border-indigo-400 border-2 shadow-xl shadow-indigo-50'
                  : 'border-gray-200',
              ].join(' ')}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-bold px-3.5 py-1 rounded-full whitespace-nowrap">
                  {plan.badge}
                </div>
              )}

              <h3 className="font-bold text-gray-900 text-lg">{plan.name}</h3>

              <div className="mt-4 mb-7 flex items-end gap-1">
                <span className="text-5xl font-extrabold text-gray-900">
                  ${annual ? plan.annual : plan.monthly}
                </span>
                <span className="text-gray-400 text-sm mb-1.5">/mo</span>
                {annual && plan.monthly > 0 && (
                  <span className="text-xs text-gray-400 mb-1.5 ml-1 line-through">
                    ${plan.monthly}
                  </span>
                )}
              </div>

              <ul className="space-y-2.5 flex-1 mb-7">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-gray-700">
                    <Check size={15} className="text-green-500 shrink-0 mt-0.5" strokeWidth={2.5} />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href={`${WEB_APP}/signup`}
                className={`block text-center py-3 rounded-full font-semibold text-sm transition-all ${plan.ctaStyle}`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        <p className="text-center mt-8 text-sm text-gray-400 reveal">
          All plans include: SSL, CDN delivery, 99.9% uptime, GDPR compliant · 14-day money-back guarantee
        </p>

        {/* vs Elfsight comparison */}
        <div className="mt-20 reveal">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">
            Devixus vs Elfsight
          </h3>
          <p className="text-gray-500 text-center text-sm mb-8">We&apos;re cheaper, simpler, and built for agencies.</p>

          <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-left font-semibold text-gray-600">Feature</th>
                  <th className="px-6 py-4 text-center font-semibold text-gray-500">Elfsight</th>
                  <th className="px-6 py-4 text-center font-semibold text-indigo-600 bg-indigo-50/60">Devixus</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {ELFSIGHT_COMPARISON.map(row => (
                  <tr key={row.label} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-3.5 font-medium text-gray-700">{row.label}</td>
                    <td className="px-6 py-3.5 text-center text-gray-500">{row.elfsight}</td>
                    <td className="px-6 py-3.5 text-center font-semibold text-indigo-700 bg-indigo-50/40">{row.devixus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Full feature table */}
        <div className="mt-16 reveal">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Full feature comparison</h3>
          <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-left font-semibold text-gray-600">Feature</th>
                  <th className="px-6 py-4 text-center font-semibold text-gray-500">Free</th>
                  <th className="px-6 py-4 text-center font-semibold text-indigo-600 bg-indigo-50/60">Pro $9/mo</th>
                  <th className="px-6 py-4 text-center font-semibold text-purple-600">Agency $29/mo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {COMPARISON.map(row => (
                  <tr key={row.feature} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-3.5 font-medium text-gray-700">{row.feature}</td>
                    <td className="px-6 py-3.5 text-center"><Cell val={row.free} /></td>
                    <td className="px-6 py-3.5 text-center bg-indigo-50/30"><Cell val={row.pro} /></td>
                    <td className="px-6 py-3.5 text-center"><Cell val={row.agency} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-20 reveal">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Frequently asked questions</h3>
          <div className="max-w-2xl mx-auto space-y-2">
            {FAQS.map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
                >
                  {faq.q}
                  <span className={`ml-4 shrink-0 text-gray-400 transition-transform ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

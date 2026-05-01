'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'

const WEB_APP = 'https://devixus-widgets-web.vercel.app'

const PLANS = [
  {
    name: 'Free',
    monthly: 0,
    annual: 0,
    badge: null,
    highlighted: false,
    features: [
      '1 widget',
      '200 views / month',
      'All widget types',
      'Unlimited installs',
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
      '10,000 views / month',
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
      '100,000 views / month',
      'White-label',
      'API access',
      'Remove branding',
      'Dedicated support',
    ],
    cta: 'Start Agency',
    ctaStyle: 'border border-gray-200 text-gray-700 hover:bg-gray-50',
  },
]

export function Pricing() {
  const [annual, setAnnual] = useState(false)

  return (
    <section id="pricing" className="py-24 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 reveal">
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Simple, honest pricing
          </h2>
          <p className="mt-4 text-lg text-gray-500">Start free. Upgrade when you&apos;re ready.</p>

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
          All plans include: SSL, CDN delivery, 99.9% uptime, GDPR compliant
        </p>
      </div>
    </section>
  )
}

'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import { UpgradeButton } from './UpgradeButton'

interface Plan {
  name: string
  priceMonthly: string
  price: number
  features: readonly string[]
}

interface Props {
  plans: Record<string, Plan>
  planOrder: readonly string[]
  currentPlanName: string
}

const ANNUAL_PRICES: Record<string, { display: string; note: string }> = {
  free: { display: '$0', note: 'forever free' },
  pro: { display: '$86', note: '/year — save $22' },
  agency: { display: '$278', note: '/year — save $70' },
}

const FAQ = [
  {
    q: 'Can I cancel anytime?',
    a: 'Yes. You can cancel your subscription at any time from the Lemon Squeezy customer portal. Your plan remains active until the end of the billing period.',
  },
  {
    q: 'What happens to my widgets if I downgrade?',
    a: 'Your widgets stay active until the plan period ends. After downgrading, excess widgets will be deactivated (you keep the data and config). You can reactivate them by upgrading again.',
  },
  {
    q: 'Do you offer refunds?',
    a: 'We offer a 7-day money-back guarantee on all paid plans. Contact us within 7 days of your purchase and we\'ll issue a full refund, no questions asked.',
  },
]

export function PricingSection({ plans, planOrder, currentPlanName }: Props) {
  const [annual, setAnnual] = useState(false)

  return (
    <div className="space-y-8">
      {/* Toggle */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-semibold text-gray-900">Choose a plan</h2>
          <div className="flex items-center gap-3">
            <span className={`text-sm ${!annual ? 'text-gray-900 font-medium' : 'text-gray-400'}`}>Monthly</span>
            <button
              type="button"
              onClick={() => setAnnual(a => !a)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${annual ? 'bg-blue-600' : 'bg-gray-200'}`}
            >
              <span className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${annual ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
            <span className={`text-sm flex items-center gap-1 ${annual ? 'text-gray-900 font-medium' : 'text-gray-400'}`}>
              Annual
              <span className="text-xs font-semibold text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full">-20%</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {planOrder.map(planKey => {
            const plan = plans[planKey]
            const isCurrent = currentPlanName === planKey
            const isHighlighted = planKey === 'pro'
            const annualData = ANNUAL_PRICES[planKey]

            return (
              <div
                key={planKey}
                className={[
                  'rounded-2xl border p-6 flex flex-col relative',
                  isHighlighted && !isCurrent
                    ? 'border-blue-400 ring-2 ring-blue-400 shadow-lg'
                    : isCurrent
                    ? 'border-green-400 ring-2 ring-green-400'
                    : 'border-gray-200',
                ].join(' ')}
              >
                {isHighlighted && !isCurrent && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold text-white bg-blue-600 px-3 py-1 rounded-full uppercase tracking-widest">
                    Most Popular
                  </span>
                )}

                <div className="flex items-center justify-between mb-1">
                  {isCurrent && (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                      <Check size={10} /> Active
                    </span>
                  )}
                  {!isCurrent && <span />}
                </div>

                <h3 className="font-bold text-gray-900 text-lg mt-2">{plan.name}</h3>
                <div className="mt-1 mb-1">
                  {annual && plan.price > 0 ? (
                    <>
                      <span className="text-3xl font-extrabold text-gray-900">{annualData?.display ?? plan.priceMonthly}</span>
                      <span className="text-gray-500 text-sm ml-1">{annualData?.note}</span>
                    </>
                  ) : (
                    <>
                      <span className="text-3xl font-extrabold text-gray-900">{plan.priceMonthly}</span>
                      {plan.price > 0 && <span className="text-gray-500 text-sm ml-1">/month</span>}
                    </>
                  )}
                </div>
                {annual && plan.price > 0 && (
                  <p className="text-xs text-gray-400 mb-3">
                    vs {plan.priceMonthly}/mo billed monthly
                  </p>
                )}

                <ul className="space-y-2 flex-1 mb-6 mt-3">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                      <Check size={14} className="text-green-500 shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>

                {isCurrent ? (
                  <button disabled className="w-full py-2.5 rounded-xl text-sm font-semibold bg-gray-100 text-gray-400 cursor-not-allowed">
                    Current plan
                  </button>
                ) : planKey === 'free' ? (
                  <button disabled className="w-full py-2.5 rounded-xl text-sm font-semibold bg-gray-100 text-gray-500 cursor-not-allowed">
                    Downgrade
                  </button>
                ) : (
                  <UpgradeButton
                    plan={planKey}
                    label={`Upgrade to ${plan.name}`}
                    className={isHighlighted ? 'bg-blue-600 text-white hover:bg-blue-700 w-full' : 'bg-gray-900 text-white hover:bg-gray-800 w-full'}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-5">
          {FAQ.map(item => (
            <div key={item.q}>
              <p className="font-medium text-gray-800 text-sm mb-1">{item.q}</p>
              <p className="text-sm text-gray-500 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-gray-400 text-center flex items-center justify-center gap-1.5">
        Payments securely processed by
        <span className="font-semibold text-gray-600">🍋 Lemon Squeezy</span>
        · Cancel anytime
      </p>
    </div>
  )
}

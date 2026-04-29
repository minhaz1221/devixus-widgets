import { redirect } from 'next/navigation'
import { Check, Zap } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { getUserPlan } from '@/lib/plan-limits'
import { PLANS } from '@/lib/plans'
import { UpgradeButton } from './_components/UpgradeButton'

const PLAN_ORDER = ['free', 'pro', 'agency'] as const

export default async function BillingPage({
  searchParams,
}: {
  searchParams: { success?: string; cancelled?: string }
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const currentPlan = await getUserPlan(user.id)
  const currentPlanName: string = currentPlan?.name ?? 'free'

  // Widget usage
  const { count: widgetCount } = await supabase
    .from('widgets')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)
    .eq('is_active', true)

  const used = widgetCount ?? 0
  const limit = currentPlan?.widget_limit ?? 1
  const usagePct = limit === -1 ? 0 : Math.min(100, Math.round((used / limit) * 100))

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Success / cancelled toasts */}
      {searchParams.success && (
        <div className="flex items-center gap-3 bg-green-50 border border-green-200 text-green-800 rounded-xl px-5 py-4 text-sm font-medium">
          <Zap size={16} className="text-green-600 shrink-0" />
          Your plan has been upgraded successfully! Changes may take a moment to reflect.
        </div>
      )}
      {searchParams.cancelled && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-xl px-5 py-4 text-sm font-medium">
          Checkout was cancelled. Your plan was not changed.
        </div>
      )}

      <div>
        <h1 className="text-2xl font-bold text-gray-900">Billing</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your subscription and plan.</p>
      </div>

      {/* Widget usage */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="font-semibold text-gray-900 mb-4">Widget usage</h2>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">
            {used} of {limit === -1 ? 'unlimited' : limit} active widgets used
          </span>
          {limit !== -1 && (
            <span className="text-xs font-semibold text-gray-500">{usagePct}%</span>
          )}
        </div>
        {limit !== -1 && (
          <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                usagePct >= 100 ? 'bg-red-500' : usagePct >= 80 ? 'bg-yellow-500' : 'bg-blue-500'
              }`}
              style={{ width: `${usagePct}%` }}
            />
          </div>
        )}
        {usagePct >= 100 && (
          <p className="mt-2 text-xs text-red-600 font-medium">
            Limit reached — upgrade to create more widgets.
          </p>
        )}
      </div>

      {/* Plan cards */}
      <div>
        <h2 className="font-semibold text-gray-900 mb-4">Choose a plan</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {PLAN_ORDER.map(planKey => {
            const plan = PLANS[planKey]
            const isCurrent = currentPlanName === planKey
            const isHighlighted = planKey === 'pro'

            return (
              <div
                key={planKey}
                className={[
                  'rounded-2xl border p-6 flex flex-col',
                  isHighlighted && !isCurrent
                    ? 'border-blue-400 ring-2 ring-blue-400 shadow-lg'
                    : isCurrent
                    ? 'border-green-400 ring-2 ring-green-400'
                    : 'border-gray-200',
                ].join(' ')}
              >
                {/* Badges */}
                <div className="flex items-center justify-between mb-1">
                  {isHighlighted && !isCurrent && (
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                      Most popular
                    </span>
                  )}
                  {isCurrent && (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                      <Check size={10} /> Current plan
                    </span>
                  )}
                  {!isHighlighted && !isCurrent && <span />}
                </div>

                <h3 className="font-bold text-gray-900 text-lg mt-2">{plan.name}</h3>
                <div className="mt-1 mb-4">
                  <span className="text-3xl font-extrabold text-gray-900">{plan.priceMonthly}</span>
                  {plan.price > 0 && (
                    <span className="text-gray-500 text-sm ml-1">/month</span>
                  )}
                </div>

                <ul className="space-y-2 flex-1 mb-6">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                      <Check size={14} className="text-green-500 shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                {isCurrent ? (
                  <button
                    disabled
                    className="w-full py-2.5 rounded-xl text-sm font-semibold bg-gray-100 text-gray-400 cursor-not-allowed"
                  >
                    Current plan
                  </button>
                ) : planKey === 'free' ? (
                  <button
                    disabled
                    className="w-full py-2.5 rounded-xl text-sm font-semibold bg-gray-100 text-gray-500 cursor-not-allowed"
                  >
                    Downgrade
                  </button>
                ) : (
                  <UpgradeButton
                    plan={planKey}
                    label={`Upgrade to ${plan.name}`}
                    className={
                      isHighlighted
                        ? 'bg-blue-600 text-white hover:bg-blue-700 w-full'
                        : 'bg-gray-900 text-white hover:bg-gray-800 w-full'
                    }
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Billing info note */}
      <p className="text-xs text-gray-400 text-center">
        Payments are securely processed by Lemon Squeezy.
        Cancel anytime from your Lemon Squeezy customer portal.
      </p>
    </div>
  )
}

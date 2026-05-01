import { redirect } from 'next/navigation'
import { Zap } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { getUserPlan } from '@/lib/plan-limits'
import { PLANS } from '@/lib/plans'
import { PricingSection } from './_components/PricingSection'

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
  const currentPlanName: string = (currentPlan?.name ?? 'free').toLowerCase()

  const { count: widgetCount } = await supabase
    .from('widgets')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)
    .eq('is_active', true)

  const used = widgetCount ?? 0
  const limit = currentPlan?.widget_limit ?? 1
  const usagePct = limit === -1 ? 0 : Math.min(100, Math.round((used / limit) * 100))

  const plansData = Object.fromEntries(
    PLAN_ORDER.map(key => [key, {
      name: PLANS[key].name,
      priceMonthly: PLANS[key].priceMonthly,
      price: PLANS[key].price,
      features: PLANS[key].features,
    }])
  )

  return (
    <div className="max-w-4xl mx-auto space-y-8">
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

      <PricingSection
        plans={plansData}
        planOrder={PLAN_ORDER}
        currentPlanName={currentPlanName}
      />
    </div>
  )
}

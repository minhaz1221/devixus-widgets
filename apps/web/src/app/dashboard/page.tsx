import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getUserPlan } from '@/lib/plan-limits'
import { Plus, Layers, Download, Zap, Eye, BarChart2, CreditCard, CheckCircle2, Circle } from 'lucide-react'

const TYPE_ICONS: Record<string, string> = {
  whatsapp: '💬',
  testimonials: '⭐',
  google_reviews: '🏢',
  countdown_timer: '⏱',
  countdown: '⏱',
  contact_form: '✉',
  social_follow: '📱',
  youtube_feed: '▶',
  announcement_bar: '📢',
}

const TYPE_COLORS: Record<string, string> = {
  whatsapp: 'bg-green-100 text-green-700',
  testimonials: 'bg-blue-100 text-blue-700',
  google_reviews: 'bg-yellow-100 text-yellow-700',
  countdown_timer: 'bg-purple-100 text-purple-700',
  countdown: 'bg-purple-100 text-purple-700',
  contact_form: 'bg-orange-100 text-orange-700',
  social_follow: 'bg-pink-100 text-pink-700',
  youtube_feed: 'bg-red-100 text-red-700',
  announcement_bar: 'bg-orange-100 text-orange-700',
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: widgets } = await supabase
    .from('widgets')
    .select('id, name, type, is_active, install_count, monthly_views, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  const plan = await getUserPlan(user.id)

  const allWidgets = widgets ?? []
  const totalInstalls = allWidgets.reduce((sum, w) => sum + (w.install_count ?? 0), 0)
  const totalMonthlyViews = allWidgets.reduce((sum, w) => sum + (w.monthly_views ?? 0), 0)
  const activeCount = allWidgets.filter(w => w.is_active).length
  const recent = allWidgets.slice(0, 5)

  const monthlyViewLimit: number = plan?.monthly_view_limit ?? 200
  const widgetsAtLimit = monthlyViewLimit !== -1
    ? allWidgets.filter(w => (w.monthly_views ?? 0) >= monthlyViewLimit)
    : []

  const displayName = user.user_metadata?.full_name ?? user.email?.split('@')[0] ?? 'there'

  const showChecklist = allWidgets.length < 2
  const hasWidget = allWidgets.length > 0
  const hasInstall = totalInstalls > 0

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Heading */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {displayName} 👋</h1>
          <p className="text-gray-500 mt-1 text-sm">Here&apos;s what&apos;s happening with your widgets.</p>
        </div>
        <Link
          href="/dashboard/widgets"
          className="inline-flex items-center gap-2 px-4 py-2 text-white text-sm font-semibold rounded-lg transition-colors"
          style={{ background: '#ff6914' }}
        >
          <Plus size={16} /> New Widget
        </Link>
      </div>

      {/* Limit warning */}
      {widgetsAtLimit.length > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-xl px-5 py-4 flex items-center justify-between gap-4">
          <p className="text-sm text-orange-800">
            <span className="font-semibold">{widgetsAtLimit.length} widget{widgetsAtLimit.length > 1 ? 's have' : ' has'} reached</span> the monthly view limit and is no longer showing.
          </p>
          <Link href="/dashboard/billing" className="text-sm font-semibold text-orange-700 hover:underline whitespace-nowrap">
            Upgrade plan →
          </Link>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Widgets', value: allWidgets.length, icon: Layers, accent: '#3b82f6' },
          { label: 'Total Installs', value: totalInstalls, icon: Download, accent: '#10b981' },
          { label: 'Active Widgets', value: activeCount, icon: Zap, accent: '#8b5cf6' },
          { label: 'Views this month', value: totalMonthlyViews.toLocaleString(), icon: Eye, accent: '#ff6914' },
        ].map(stat => (
          <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4">
            <div className="rounded-lg p-2.5" style={{ background: `${stat.accent}18` }}>
              <stat.icon size={20} style={{ color: stat.accent }} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent widgets */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Recent Widgets</h2>
            {allWidgets.length > 0 && (
              <Link href="/dashboard/widgets" className="text-sm text-blue-600 hover:underline">View all</Link>
            )}
          </div>

          {allWidgets.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center text-3xl"
                style={{ background: '#ff691418' }}>
                🧩
              </div>
              <h3 className="font-semibold text-gray-700">No widgets yet</h3>
              <p className="text-gray-400 text-sm mt-1 mb-4">Create your first widget and embed it on your website.</p>
              <Link
                href="/dashboard/widgets"
                className="inline-flex items-center gap-2 px-4 py-2 text-white text-sm font-semibold rounded-lg transition-colors"
                style={{ background: '#ff6914' }}
              >
                <Plus size={15} /> Create your first widget
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {recent.map(widget => (
                <li key={widget.id} className="px-6 py-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-lg shrink-0">{TYPE_ICONS[widget.type] ?? '🔧'}</span>
                    <div className="min-w-0">
                      <p className="font-medium text-gray-900 text-sm truncate">{widget.name}</p>
                      <p className="text-xs text-gray-400">{widget.type.replace(/_/g, ' ')}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <span className={`w-2 h-2 rounded-full ${widget.is_active ? 'bg-green-500' : 'bg-gray-300'}`} />
                    <span className="text-xs text-gray-400">{widget.install_count} installs</span>
                    <Link
                      href={`/dashboard/widgets/${widget.id}`}
                      className="text-xs font-medium text-blue-600 hover:underline"
                    >
                      Configure
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Quick actions */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="font-semibold text-gray-900 mb-3">Quick Actions</h2>
            <div className="space-y-2">
              <Link
                href="/dashboard/widgets"
                className="flex items-center gap-2 w-full px-3 py-2 text-white text-sm font-medium rounded-lg transition-opacity hover:opacity-90"
                style={{ background: '#ff6914' }}
              >
                <Plus size={15} /> Create new widget
              </Link>
              <Link
                href="/dashboard/analytics"
                className="flex items-center gap-2 w-full px-3 py-2 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                <BarChart2 size={15} /> View analytics
              </Link>
              <Link
                href="/dashboard/billing"
                className="flex items-center gap-2 w-full px-3 py-2 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                <CreditCard size={15} /> Manage billing
              </Link>
            </div>
          </div>

          {/* Getting started checklist */}
          {showChecklist && (
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h2 className="font-semibold text-gray-900 mb-3">Getting Started</h2>
              <ul className="space-y-2.5">
                {[
                  { label: 'Create your account', done: true },
                  { label: 'Create your first widget', done: hasWidget },
                  { label: 'Add widget to your website', done: hasInstall },
                  { label: 'Upgrade to Pro for more widgets', done: (plan?.name ?? 'free').toLowerCase() !== 'free' },
                ].map(item => (
                  <li key={item.label} className="flex items-center gap-2.5">
                    {item.done
                      ? <CheckCircle2 size={16} className="text-green-500 shrink-0" />
                      : <Circle size={16} className="text-gray-300 shrink-0" />}
                    <span className={`text-sm ${item.done ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                      {item.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

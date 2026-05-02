import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getUserPlan } from '@/lib/plan-limits'
import {
  Plus, Layers, Download, Zap, Eye, BarChart2, CreditCard,
  CheckCircle2, Circle, MessageCircle, Star, Play, Globe,
  Timer, Megaphone, Mail, Share2, Camera, Music, Settings2,
  ArrowRight, TrendingUp, AlertCircle,
} from 'lucide-react'

// Widget type metadata — lucide icons + brand colors
const TYPE_META: Record<string, { icon: React.ElementType; color: string; label: string }> = {
  whatsapp:         { icon: MessageCircle, color: '#25D366', label: 'WhatsApp Chat' },
  testimonials:     { icon: Star,          color: '#f59e0b', label: 'Testimonials' },
  youtube_feed:     { icon: Play,          color: '#ff0000', label: 'YouTube Feed' },
  google_reviews:   { icon: Globe,         color: '#4285f4', label: 'Google Reviews' },
  countdown_timer:  { icon: Timer,         color: '#8b5cf6', label: 'Countdown Timer' },
  countdown:        { icon: Timer,         color: '#8b5cf6', label: 'Countdown Timer' },
  announcement_bar: { icon: Megaphone,     color: '#6366f1', label: 'Announcement Bar' },
  contact_form:     { icon: Mail,          color: '#10b981', label: 'Contact Form' },
  social_follow:    { icon: Share2,        color: '#ec4899', label: 'Social Follow' },
  instagram_feed:   { icon: Camera,        color: '#e4405f', label: 'Instagram Feed' },
  tiktok_feed:      { icon: Music,         color: '#2d2d2d', label: 'TikTok Feed' },
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

  const STATS = [
    { label: 'Total Widgets',     value: allWidgets.length,                   icon: Layers,   color: '#6366f1' },
    { label: 'Total Installs',    value: totalInstalls,                        icon: Download, color: '#10b981' },
    { label: 'Active Widgets',    value: activeCount,                          icon: Zap,      color: '#8b5cf6' },
    { label: 'Views this month',  value: totalMonthlyViews.toLocaleString(),   icon: Eye,      color: '#f59e0b' },
  ]

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Heading */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {displayName}</h1>
          <p className="text-gray-500 mt-1 text-sm">Here&apos;s what&apos;s happening with your widgets.</p>
        </div>
        <Link
          href="/dashboard/widgets?new=1"
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <Plus size={15} strokeWidth={2.5} /> New Widget
        </Link>
      </div>

      {/* Limit warning */}
      {widgetsAtLimit.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AlertCircle size={16} className="text-amber-600 shrink-0" />
            <p className="text-sm text-amber-800">
              <span className="font-semibold">{widgetsAtLimit.length} widget{widgetsAtLimit.length > 1 ? 's have' : ' has'} reached</span> the monthly view limit and {widgetsAtLimit.length > 1 ? 'are' : 'is'} no longer showing.
            </p>
          </div>
          <Link href="/dashboard/billing" className="text-sm font-semibold text-amber-700 hover:underline whitespace-nowrap flex items-center gap-1">
            Upgrade <ArrowRight size={13} />
          </Link>
        </div>
      )}

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {STATS.map(stat => (
          <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4">
            <div className="rounded-xl p-2.5 shrink-0" style={{ background: `${stat.color}18` }}>
              <stat.icon size={20} style={{ color: stat.color }} />
            </div>
            <div className="min-w-0">
              <p className="text-2xl font-bold text-gray-900 leading-none">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1 leading-tight">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent widgets */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Recent Widgets</h2>
            {allWidgets.length > 0 && (
              <Link href="/dashboard/widgets" className="text-xs font-medium text-indigo-600 hover:underline flex items-center gap-1">
                View all <ArrowRight size={12} />
              </Link>
            )}
          </div>

          {allWidgets.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 mx-auto mb-4 flex items-center justify-center">
                <Layers size={24} className="text-indigo-400" />
              </div>
              <h3 className="font-semibold text-gray-700">No widgets yet</h3>
              <p className="text-gray-400 text-sm mt-1 mb-5">Create your first widget and embed it on your website.</p>
              <Link
                href="/dashboard/widgets?new=1"
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Plus size={14} /> Create your first widget
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {recent.map(widget => {
                const meta = TYPE_META[widget.type] ?? { icon: Layers, color: '#6b7280', label: widget.type }
                const Icon = meta.icon
                return (
                  <li key={widget.id} className="px-6 py-3.5 flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${meta.color}15` }}>
                        <Icon size={16} style={{ color: meta.color }} />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-gray-900 text-sm truncate">{widget.name}</p>
                        <p className="text-xs text-gray-400">{meta.label}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <span className={`w-1.5 h-1.5 rounded-full ${widget.is_active ? 'bg-green-500' : 'bg-gray-300'}`} />
                      <span className="text-xs text-gray-400 hidden sm:block">{widget.install_count} installs</span>
                      <Link
                        href={`/dashboard/widgets/${widget.id}`}
                        className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-0.5"
                      >
                        Configure <ArrowRight size={11} />
                      </Link>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Quick actions */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="font-semibold text-gray-900 mb-3 text-sm">Quick Actions</h2>
            <div className="space-y-2">
              <Link
                href="/dashboard/widgets?new=1"
                className="flex items-center gap-2 w-full px-3 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Plus size={14} /> Create new widget
              </Link>
              <Link
                href="/dashboard/analytics"
                className="flex items-center gap-2 w-full px-3 py-2.5 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                <TrendingUp size={14} /> View analytics
              </Link>
              <Link
                href="/dashboard/billing"
                className="flex items-center gap-2 w-full px-3 py-2.5 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                <CreditCard size={14} /> Manage billing
              </Link>
            </div>
          </div>

          {/* Getting started checklist */}
          {showChecklist && (
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h2 className="font-semibold text-gray-900 mb-3 text-sm">Getting Started</h2>
              <ul className="space-y-3">
                {[
                  { label: 'Create your account',            done: true },
                  { label: 'Create your first widget',       done: hasWidget },
                  { label: 'Add widget to your website',     done: hasInstall },
                  { label: 'Upgrade for unlimited views',    done: (plan?.name ?? 'free').toLowerCase() !== 'free' },
                ].map(item => (
                  <li key={item.label} className="flex items-start gap-2.5">
                    {item.done
                      ? <CheckCircle2 size={15} className="text-green-500 shrink-0 mt-0.5" />
                      : <Circle      size={15} className="text-gray-300 shrink-0 mt-0.5" />}
                    <span className={`text-sm leading-tight ${item.done ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                      {item.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Analytics preview */}
          {allWidgets.length > 0 && (
            <Link
              href="/dashboard/analytics"
              className="block bg-white rounded-xl border border-gray-200 p-5 hover:border-indigo-200 hover:bg-indigo-50/30 transition-colors group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-900">Analytics</span>
                <BarChart2 size={16} className="text-gray-400 group-hover:text-indigo-500 transition-colors" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{totalMonthlyViews.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-0.5">views this month</p>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

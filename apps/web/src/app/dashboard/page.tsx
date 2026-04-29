import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Plus, Layers, Download, Zap } from 'lucide-react'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: widgets } = await supabase
    .from('widgets')
    .select('id, name, type, is_active, install_count, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  const allWidgets = widgets ?? []
  const totalInstalls = allWidgets.reduce((sum, w) => sum + (w.install_count ?? 0), 0)
  const activeCount = allWidgets.filter(w => w.is_active).length
  const recent = allWidgets.slice(0, 3)

  const displayName = user.user_metadata?.full_name ?? user.email

  const typeColors: Record<string, string> = {
    whatsapp: 'bg-green-100 text-green-700',
    testimonials: 'bg-blue-100 text-blue-700',
    google_reviews: 'bg-yellow-100 text-yellow-700',
    countdown: 'bg-purple-100 text-purple-700',
    contact_form: 'bg-orange-100 text-orange-700',
    social_follow: 'bg-pink-100 text-pink-700',
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Heading */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {displayName}</h1>
          <p className="text-gray-500 mt-1 text-sm">Here&apos;s what&apos;s happening with your widgets.</p>
        </div>
        <Link
          href="/dashboard/widgets"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} /> New Widget
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Widgets', value: allWidgets.length, icon: Layers, color: 'text-blue-600' },
          { label: 'Total Installs', value: totalInstalls, icon: Download, color: 'text-green-600' },
          { label: 'Active Widgets', value: activeCount, icon: Zap, color: 'text-purple-600' },
        ].map(stat => (
          <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4">
            <div className={`${stat.color} bg-gray-50 rounded-lg p-2.5`}>
              <stat.icon size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent widgets or empty state */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">Recent Widgets</h2>
          {allWidgets.length > 0 && (
            <Link href="/dashboard/widgets" className="text-sm text-blue-600 hover:underline">View all</Link>
          )}
        </div>

        {allWidgets.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <Layers size={40} className="mx-auto text-gray-300 mb-3" />
            <h3 className="font-semibold text-gray-700">No widgets yet</h3>
            <p className="text-gray-400 text-sm mt-1 mb-4">Create your first widget and embed it on your website.</p>
            <Link
              href="/dashboard/widgets"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus size={15} /> Create your first widget
            </Link>
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {recent.map(widget => (
              <li key={widget.id} className="px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${typeColors[widget.type] ?? 'bg-gray-100 text-gray-600'}`}>
                    {widget.type.replace('_', ' ')}
                  </span>
                  <span className="font-medium text-gray-900">{widget.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-400">{widget.install_count} installs</span>
                  <Link
                    href={`/dashboard/widgets/${widget.id}`}
                    className="text-sm text-blue-600 hover:underline font-medium"
                  >
                    Configure
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

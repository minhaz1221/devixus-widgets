import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { getUserPlan } from '@/lib/plan-limits'
import { Sidebar } from './_components/Sidebar'
import { PageTitle } from './_components/PageTitle'
import { GettingStarted } from './_components/GettingStarted'
import { Bell, Plus } from 'lucide-react'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const plan = await getUserPlan(user.id)
  const planName = plan?.name ?? 'Free'

  // All secondary queries are optional — failures degrade gracefully
  const [profileResult, widgetTypesResult] = await Promise.all([
    supabase.from('profiles').select('avatar_url, full_name').eq('id', user.id).single(),
    supabase.from('widgets').select('type').eq('user_id', user.id),
  ])

  const profile = profileResult.data
  const avatarUrl: string | null =
    profile?.avatar_url ?? (user.user_metadata?.avatar_url as string | undefined) ?? null
  const displayName = profile?.full_name ?? user.user_metadata?.full_name ?? user.email ?? ''
  const initials = displayName
    .split(/[\s@]/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s: string) => s[0].toUpperCase())
    .join('')

  const widgetTypes = [...new Set((widgetTypesResult.data ?? []).map(w => w.type))]

  // Progress steps — compute cheaply, skip expensive queries
  const hasWidgets = widgetTypes.length > 0
  const isPro      = planName.toLowerCase() !== 'free'

  // Check installs + views only if user has widgets (lazy, wrapped in try/catch)
  let hasInstall = false
  let hasViews   = false
  if (hasWidgets) {
    try {
      const widgetIds = (widgetTypesResult.data ?? []).slice(0, 50).map((_: { type: string }, i: number) => i)
      // Use a simple count query on the user's own widgets for views
      const { data: viewsData } = await supabase
        .from('widgets')
        .select('id')
        .eq('user_id', user.id)
        .gte('monthly_views', 10)
        .limit(1)
      hasViews = (viewsData ?? []).length > 0

      // For installs, check widget_installs via user's widget IDs
      const { data: userWidgets } = await supabase
        .from('widgets')
        .select('id')
        .eq('user_id', user.id)
        .limit(50)
      const ids = (userWidgets ?? []).map((w: { id: string }) => w.id)
      if (ids.length > 0) {
        const { data: installData } = await supabase
          .from('widget_installs')
          .select('widget_id')
          .in('widget_id', ids)
          .limit(1)
        hasInstall = (installData ?? []).length > 0
      }
      void widgetIds // suppress unused warning
    } catch {
      // Non-critical — progress just won't show installs/views steps as done
    }
  }

  const planBadgeCls =
    planName.toLowerCase() === 'pro'    ? 'bg-indigo-600 text-white' :
    planName.toLowerCase() === 'agency' ? 'bg-purple-600 text-white' :
    'bg-gray-100 text-gray-600'

  const progressSteps = [
    { label: 'Create your account',      done: true,        href: null },
    { label: 'Create your first widget', done: hasWidgets,  href: '/dashboard/widgets?new=1' },
    { label: 'Install on your website',  done: hasInstall,  href: '/dashboard/widgets' },
    { label: 'Get your first 10 views',  done: hasViews,    href: '/dashboard/analytics' },
    { label: 'Upgrade to Pro',           done: isPro,       href: '/dashboard/billing' },
  ]
  const completedCount = progressSteps.filter(s => s.done).length
  const allDone = completedCount === progressSteps.length

  async function signOut() {
    'use server'
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/login')
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar widgetTypes={widgetTypes} />

      <div className="flex flex-col flex-1 min-w-0">
        <header className="bg-white border-b border-gray-200 pl-14 pr-6 lg:px-6 h-14 flex items-center gap-4 shrink-0">
          <div className="flex-1 min-w-0">
            <PageTitle />
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/dashboard/widgets?new=1"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
            >
              <Plus size={13} strokeWidth={2.5} />
              Create Widget
            </Link>

            {!allDone && (
              <GettingStarted steps={progressSteps} completedCount={completedCount} />
            )}

            <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell size={15} />
            </button>

            <div className="flex items-center gap-2 pl-1 border-l border-gray-200 ml-1">
              <div className="w-7 h-7 rounded-full overflow-hidden bg-indigo-600 flex items-center justify-center text-[11px] font-bold text-white shrink-0">
                {avatarUrl
                  ? <img src={avatarUrl} alt="" className="w-full h-full object-cover" />
                  : initials || '?'
                }
              </div>
              <div className="hidden sm:block">
                <p className="text-xs font-medium text-gray-800 leading-none">
                  {displayName.split('@')[0] || 'User'}
                </p>
                <span className={`text-[10px] font-semibold px-1.5 py-px rounded-full ${planBadgeCls}`}>
                  {planName}
                </span>
              </div>
            </div>

            <form action={signOut}>
              <button type="submit" className="text-xs text-gray-400 hover:text-gray-700 font-medium transition-colors px-1">
                Sign out
              </button>
            </form>
          </div>
        </header>

        <main className="flex-1 p-6 page-animate">
          {children}
        </main>
      </div>
    </div>
  )
}

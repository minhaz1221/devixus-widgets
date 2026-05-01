import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getUserPlan } from '@/lib/plan-limits'
import { Sidebar } from './_components/Sidebar'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const plan = await getUserPlan(user.id)
  const planName = plan?.name ?? 'Free'

  const displayName = user.user_metadata?.full_name ?? user.email ?? ''
  const initials = displayName
    .split(/[\s@]/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s: string) => s[0].toUpperCase())
    .join('')

  const planBadgeCls =
    planName.toLowerCase() === 'pro'    ? 'bg-indigo-600 text-white' :
    planName.toLowerCase() === 'agency' ? 'bg-purple-600 text-white' :
    'bg-gray-100 text-gray-600'

  async function signOut() {
    'use server'
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/login')
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex flex-col flex-1 min-w-0">
        {/* Top header */}
        <header className="bg-white border-b border-gray-200 px-6 h-14 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-gray-800 hidden sm:block">
              {displayName || user.email}
            </span>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${planBadgeCls}`}>
              {planName}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 bg-indigo-600"
            >
              {initials || '?'}
            </div>
            <form action={signOut}>
              <button
                type="submit"
                className="text-sm text-gray-500 hover:text-gray-800 font-medium transition-colors"
              >
                Sign out
              </button>
            </form>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 page-animate">
          {children}
        </main>
      </div>
    </div>
  )
}

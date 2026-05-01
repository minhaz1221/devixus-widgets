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
        <header className="bg-white border-b border-gray-200 px-6 h-14 flex items-center justify-end gap-4 shrink-0">
          <span className="text-sm text-gray-500 truncate hidden sm:block">{user.email}</span>
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{ background: planName.toLowerCase() === 'pro' ? '#ff6914' : planName.toLowerCase() === 'agency' ? '#7c3aed' : '#f3f4f6', color: planName.toLowerCase() === 'free' ? '#6b7280' : 'white' }}
          >
            {planName}
          </span>
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
            style={{ background: '#ff6914' }}
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
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

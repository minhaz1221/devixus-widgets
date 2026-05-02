'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { LayoutDashboard, Layers, BarChart2, Settings, CreditCard, Zap, ArrowUpRight } from 'lucide-react'

const NAV = [
  { label: 'Overview',   href: '/dashboard',            icon: LayoutDashboard },
  { label: 'Widgets',    href: '/dashboard/widgets',    icon: Layers },
  { label: 'Analytics',  href: '/dashboard/analytics',  icon: BarChart2 },
  { label: 'Settings',   href: '/dashboard/settings',   icon: Settings },
  { label: 'Billing',    href: '/dashboard/billing',    icon: CreditCard },
]

const PLAN_BADGE: Record<string, { label: string; cls: string }> = {
  free:   { label: 'Free',   cls: 'bg-gray-100 text-gray-600' },
  pro:    { label: 'Pro',    cls: 'bg-indigo-600 text-white' },
  agency: { label: 'Agency', cls: 'bg-purple-600 text-white' },
}

export function Sidebar() {
  const pathname = usePathname()
  const [planName, setPlanName] = useState<string>('free')
  const [userInfo, setUserInfo] = useState<{ name: string; avatar: string } | null>(null)

  useEffect(() => {
    fetch('/api/plan')
      .then(r => r.json())
      .then(d => setPlanName(d.plan?.name?.toLowerCase() ?? 'free'))
      .catch(() => {})
    fetch('/api/user/profile')
      .then(r => r.json())
      .then(d => setUserInfo({
        name:   d.profile?.full_name || d.profile?.email?.split('@')[0] || 'User',
        avatar: d.profile?.avatar_url || '',
      }))
      .catch(() => {})
  }, [])

  const badge = PLAN_BADGE[planName] ?? PLAN_BADGE.free
  const isPro = planName !== 'free'

  return (
    <aside
      className="flex flex-col w-60 min-h-screen shrink-0 border-r border-gray-200"
      style={{ background: 'linear-gradient(180deg, #f8faff 0%, #ffffff 60%)' }}
    >
      {/* Logo */}
      <div className="px-5 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center shadow-sm">
            <Zap size={15} className="text-white" strokeWidth={2.5} />
          </div>
          <div className="leading-none">
            <span className="font-bold text-[15px] tracking-tight text-gray-900">Devixus</span>
            <span className="font-semibold text-[15px] tracking-tight text-indigo-600 ml-1">Widgets</span>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {NAV.map(({ label, href, icon: Icon }) => {
          const active = pathname === href || (href !== '/dashboard' && pathname.startsWith(href))
          return (
            <Link
              key={href}
              href={href}
              className={[
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all relative',
                active
                  ? 'text-indigo-700 bg-indigo-50'
                  : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900',
              ].join(' ')}
            >
              {active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-indigo-600" />
              )}
              <Icon size={16} className={active ? 'text-indigo-600' : 'text-gray-400'} />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Upgrade card (Free plan only) */}
      {!isPro && (
        <div className="mx-3 mb-3 rounded-xl p-4 space-y-2.5" style={{ background: 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)' }}>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-indigo-600 flex items-center justify-center">
              <Zap size={12} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="text-xs font-semibold text-indigo-900">Unlock Pro features</span>
          </div>
          <p className="text-[11px] text-indigo-700 leading-relaxed">
            Unlimited views, remove branding, priority support.
          </p>
          <Link
            href="/dashboard/billing"
            className="flex items-center justify-center gap-1 w-full text-xs font-semibold py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Upgrade to Pro <ArrowUpRight size={11} />
          </Link>
        </div>
      )}

      {/* Bottom: user + plan */}
      <div className="px-4 py-3 border-t border-gray-100 flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-full overflow-hidden bg-indigo-600 flex items-center justify-center text-[11px] font-bold text-white shrink-0">
          {userInfo?.avatar
            ? <img src={userInfo.avatar} alt="" className="w-full h-full object-cover" />
            : <span>{userInfo?.name?.[0]?.toUpperCase() ?? '?'}</span>
          }
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-gray-800 truncate leading-none mb-0.5">
            {userInfo?.name ?? ''}
          </p>
          <span className={`text-[10px] font-semibold px-1.5 py-px rounded-full ${badge.cls}`}>
            {badge.label}
          </span>
        </div>
      </div>
    </aside>
  )
}

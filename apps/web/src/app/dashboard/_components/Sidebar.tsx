'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { LayoutDashboard, Layers, BarChart2, Settings, CreditCard, Zap } from 'lucide-react'

const nav = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'My Widgets', href: '/dashboard/widgets', icon: Layers },
  { label: 'Analytics', href: '/dashboard/analytics', icon: BarChart2 },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings },
  { label: 'Billing', href: '/dashboard/billing', icon: CreditCard },
]

const PLAN_BADGE: Record<string, { label: string; cls: string }> = {
  free:   { label: 'Free',   cls: 'bg-gray-100 text-gray-600' },
  pro:    { label: 'Pro',    cls: 'bg-indigo-600 text-white' },
  agency: { label: 'Agency', cls: 'bg-purple-600 text-white' },
}

export function Sidebar() {
  const pathname = usePathname()
  const [planName, setPlanName] = useState<string>('free')

  useEffect(() => {
    fetch('/api/plan')
      .then(r => r.json())
      .then(d => setPlanName(d.plan?.name?.toLowerCase() ?? 'free'))
      .catch(() => {})
  }, [])

  const badge = PLAN_BADGE[planName] ?? PLAN_BADGE.free

  return (
    <aside
      className="flex flex-col w-60 min-h-screen shrink-0 border-r border-gray-200"
      style={{ background: 'linear-gradient(180deg, #f9fafb 0%, #ffffff 100%)' }}
    >
      {/* Logo */}
      <div className="px-6 py-5 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
            <Zap size={14} className="text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight text-gray-900">Devixus</span>
          <span className="font-bold text-lg tracking-tight text-indigo-600">Widgets</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {nav.map(({ label, href, icon: Icon }) => {
          const active = pathname === href || (href !== '/dashboard' && pathname.startsWith(href))
          return (
            <Link
              key={href}
              href={href}
              className={[
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all relative',
                active
                  ? 'text-indigo-700 bg-indigo-50'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
              ].join(' ')}
            >
              {active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-indigo-600" />
              )}
              <Icon size={17} className={active ? 'text-indigo-600' : 'text-gray-400'} />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="px-4 py-4 border-t border-gray-100 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400">Current plan</span>
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${badge.cls}`}>
            {badge.label}
          </span>
        </div>
        <Link
          href="/dashboard/billing"
          className="block w-full text-center text-xs py-2 rounded-lg font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
        >
          Upgrade plan
        </Link>
        <p className="text-xs text-gray-400 text-center">Devixus Widgets v1.0</p>
      </div>
    </aside>
  )
}

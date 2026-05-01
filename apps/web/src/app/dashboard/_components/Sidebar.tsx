'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { LayoutDashboard, Layers, BarChart2, Settings, CreditCard } from 'lucide-react'

const nav = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'My Widgets', href: '/dashboard/widgets', icon: Layers },
  { label: 'Analytics', href: '/dashboard/analytics', icon: BarChart2 },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings },
  { label: 'Billing', href: '/dashboard/billing', icon: CreditCard },
]

const PLAN_BADGE: Record<string, { label: string; cls: string }> = {
  free: { label: 'Free', cls: 'bg-slate-700 text-slate-300' },
  pro: { label: 'Pro', cls: 'bg-orange-500 text-white' },
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
    <aside className="flex flex-col w-60 min-h-screen bg-slate-900 text-white shrink-0">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-slate-800">
        <span className="font-bold text-lg tracking-tight text-white">Devixus</span>
        <span className="font-bold text-lg tracking-tight" style={{ color: '#ff6914' }}> Widgets</span>
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
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors relative',
                active
                  ? 'text-white bg-slate-800'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white',
              ].join(' ')}
            >
              {active && (
                <span
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full"
                  style={{ background: '#ff6914' }}
                />
              )}
              <Icon size={17} />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Bottom — plan badge + version */}
      <div className="px-4 py-4 border-t border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500">Current plan</span>
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${badge.cls}`}>
            {badge.label}
          </span>
        </div>
        <Link
          href="/dashboard/billing"
          className="block w-full text-center text-xs py-1.5 rounded-lg font-medium transition-colors"
          style={{ background: '#ff6914', color: 'white' }}
        >
          Upgrade plan
        </Link>
        <p className="text-xs text-slate-600 text-center">Devixus Widgets v1.0</p>
      </div>
    </aside>
  )
}

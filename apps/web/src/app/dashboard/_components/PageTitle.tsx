'use client'

import { usePathname } from 'next/navigation'

const TITLES: Record<string, string> = {
  '/dashboard':            'Overview',
  '/dashboard/widgets':    'My Widgets',
  '/dashboard/analytics':  'Analytics',
  '/dashboard/settings':   'Settings',
  '/dashboard/billing':    'Billing',
}

export function PageTitle() {
  const pathname = usePathname()
  const title =
    TITLES[pathname] ??
    (pathname.match(/\/dashboard\/widgets\/.+/) ? 'Configure Widget' : 'Dashboard')
  return <span className="text-sm font-semibold text-gray-900">{title}</span>
}

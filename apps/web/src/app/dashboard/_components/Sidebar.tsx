'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  LayoutDashboard, BarChart2, Settings, CreditCard, Zap, ArrowUpRight,
  X, Menu, MessageCircle, Star, Play, Globe, Timer, Megaphone, Mail,
  Share2, Camera, Music, BookOpen, LayoutGrid, Plus, ChevronDown, ChevronRight,
  HelpCircle, Hash, MapPin,
  type LucideIcon,
} from 'lucide-react'

const BOTTOM_NAV = [
  { label: 'Overview',  href: '/dashboard',           icon: LayoutDashboard },
  { label: 'Analytics', href: '/dashboard/analytics', icon: BarChart2 },
  { label: 'Catalog',   href: '/dashboard/catalog',   icon: LayoutGrid },
  { label: 'Templates', href: '/dashboard/templates', icon: BookOpen },
  { label: 'Settings',  href: '/dashboard/settings',  icon: Settings },
  { label: 'Billing',   href: '/dashboard/billing',   icon: CreditCard },
]

const PLAN_BADGE: Record<string, { label: string; cls: string }> = {
  free:   { label: 'Free',   cls: 'bg-gray-100 text-gray-600' },
  pro:    { label: 'Pro',    cls: 'bg-indigo-600 text-white' },
  agency: { label: 'Agency', cls: 'bg-purple-600 text-white' },
}

const TYPE_ICONS: Record<string, { Icon: LucideIcon; color: string; label: string }> = {
  whatsapp:         { Icon: MessageCircle, color: '#25D366', label: 'WhatsApp Chat' },
  testimonials:     { Icon: Star,          color: '#f59e0b', label: 'Testimonials' },
  youtube_feed:     { Icon: Play,          color: '#ff0000', label: 'YouTube Feed' },
  google_reviews:   { Icon: Globe,         color: '#4285f4', label: 'Google Reviews' },
  countdown_timer:  { Icon: Timer,         color: '#8b5cf6', label: 'Countdown Timer' },
  announcement_bar: { Icon: Megaphone,     color: '#6366f1', label: 'Announcement Bar' },
  contact_form:     { Icon: Mail,          color: '#10b981', label: 'Contact Form' },
  social_follow:    { Icon: Share2,        color: '#ec4899', label: 'Social Follow' },
  instagram_feed:   { Icon: Camera,        color: '#e4405f', label: 'Instagram Feed' },
  tiktok_feed:      { Icon: Music,         color: '#2d2d2d', label: 'TikTok Feed' },
  faq_accordion:    { Icon: HelpCircle,    color: '#f97316', label: 'FAQ' },
  number_counter:   { Icon: Hash,          color: '#06b6d4', label: 'Number Counter' },
  google_maps:      { Icon: MapPin,        color: '#10b981', label: 'Google Maps' },
}

interface SidebarContentProps {
  onClose?: () => void
  widgetTypes?: string[]
}

function SidebarContent({ onClose, widgetTypes = [] }: SidebarContentProps) {
  const pathname = usePathname()
  const [planName, setPlanName] = useState<string>('free')
  const [userInfo, setUserInfo] = useState<{ name: string; avatar: string } | null>(null)
  const [appsOpen, setAppsOpen] = useState(true)

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

  function isActive(href: string) {
    return pathname === href || (href !== '/dashboard' && pathname.startsWith(href))
  }

  return (
    <aside
      className="flex flex-col w-60 min-h-screen shrink-0 border-r border-gray-200"
      style={{ background: 'linear-gradient(180deg, #f8faff 0%, #ffffff 60%)' }}
    >
      {/* Logo */}
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center shadow-sm">
            <Zap size={15} className="text-white" strokeWidth={2.5} />
          </div>
          <div className="leading-none">
            <span className="font-bold text-[15px] tracking-tight text-gray-900">Devixus</span>
            <span className="font-semibold text-[15px] tracking-tight text-indigo-600 ml-1">Widgets</span>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="lg:hidden p-1 text-gray-400 hover:text-gray-600">
            <X size={18} />
          </button>
        )}
      </div>

      <nav className="flex-1 px-3 py-3 overflow-y-auto">

        {/* My Apps section */}
        <div className="mb-2">
          <button
            type="button"
            onClick={() => setAppsOpen(o => !o)}
            className="w-full flex items-center justify-between px-2 py-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-widest hover:text-gray-600 transition-colors"
          >
            <span>My Apps</span>
            {appsOpen ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
          </button>

          {appsOpen && (
            <div className="space-y-0.5 mt-1">
              {widgetTypes.length === 0 ? (
                <p className="px-3 py-2 text-[11px] text-gray-400">No widgets yet.</p>
              ) : (
                widgetTypes.map(type => {
                  const meta = TYPE_ICONS[type]
                  if (!meta) return null
                  const href = `/dashboard/apps/${type}`
                  const active = pathname.startsWith(href)
                  return (
                    <Link
                      key={type}
                      href={href}
                      onClick={onClose}
                      className={[
                        'flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all relative',
                        active ? 'text-indigo-700 bg-indigo-50' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900',
                      ].join(' ')}
                    >
                      {active && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-indigo-600" />}
                      <div className="w-5 h-5 rounded-md flex items-center justify-center shrink-0" style={{ background: `${meta.color}20` }}>
                        <meta.Icon size={12} style={{ color: meta.color }} />
                      </div>
                      <span className="truncate text-xs">{meta.label}</span>
                    </Link>
                  )
                })
              )}

              {/* Add widget link */}
              <Link
                href="/dashboard/widgets?new=1"
                onClick={onClose}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
              >
                <div className="w-5 h-5 rounded-md border-2 border-dashed border-gray-300 flex items-center justify-center shrink-0">
                  <Plus size={10} />
                </div>
                Add Widget
              </Link>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100 my-2" />

        {/* Main nav items */}
        <div className="space-y-0.5">
          {BOTTOM_NAV.map(({ label, href, icon: Icon }) => {
            const active = isActive(href)
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={[
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all relative',
                  active ? 'text-indigo-700 bg-indigo-50' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900',
                ].join(' ')}
              >
                {active && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-indigo-600" />}
                <Icon size={16} className={active ? 'text-indigo-600' : 'text-gray-400'} />
                {label}
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Upgrade card (Free plan only) */}
      {!isPro && (
        <div className="mx-3 mb-3 rounded-xl p-4 space-y-2.5" style={{ background: 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)' }}>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-indigo-600 flex items-center justify-center">
              <Zap size={12} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="text-xs font-semibold text-indigo-900">Unlock Pro</span>
          </div>
          <p className="text-[11px] text-indigo-700 leading-relaxed">Unlimited views, custom CSS, priority support.</p>
          <Link
            href="/dashboard/billing"
            onClick={onClose}
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
          <p className="text-xs font-medium text-gray-800 truncate leading-none mb-0.5">{userInfo?.name ?? ''}</p>
          <span className={`text-[10px] font-semibold px-1.5 py-px rounded-full ${badge.cls}`}>{badge.label}</span>
        </div>
      </div>
    </aside>
  )
}

export interface SidebarProps {
  widgetTypes?: string[]
}

export function Sidebar({ widgetTypes = [] }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => { setMobileOpen(false) }, [pathname])

  return (
    <>
      <button
        className="lg:hidden fixed top-3.5 left-4 z-50 w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        onClick={() => setMobileOpen(true)}
        aria-label="Open menu"
      >
        <Menu size={18} />
      </button>

      <div className="hidden lg:flex">
        <SidebarContent widgetTypes={widgetTypes} />
      </div>

      {mobileOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={() => setMobileOpen(false)} />
          <div className="fixed inset-y-0 left-0 z-50 flex lg:hidden">
            <SidebarContent widgetTypes={widgetTypes} onClose={() => setMobileOpen(false)} />
          </div>
        </>
      )}
    </>
  )
}

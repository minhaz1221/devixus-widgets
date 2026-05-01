'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

const WEB_APP = 'https://devixus-widgets-web.vercel.app'

function LogoIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect width="28" height="28" rx="8" fill="#6366f1" />
      <path d="M8 8h7a6 6 0 010 12H8V8z" fill="white" />
    </svg>
  )
}

const NAV_LINKS = [
  { label: 'Widgets', href: '/widgets' },
  { label: 'Pricing', href: '/#pricing' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className={[
        'sticky top-0 z-50 transition-all duration-200',
        scrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm'
          : 'bg-white/80 backdrop-blur-md border-b border-transparent',
      ].join(' ')}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <LogoIcon />
          <span className="font-bold text-base text-gray-900 tracking-tight">
            Devixus <span className="font-normal text-gray-400">Widgets</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-indigo-500 after:transition-all hover:after:w-full"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={`${WEB_APP}/login`}
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            Sign in
          </a>
          <a
            href={`${WEB_APP}/signup`}
            className="px-5 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-full hover:bg-indigo-700 transition-colors shadow-sm hover:shadow-indigo-200 hover:shadow-md"
          >
            Get started free
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle navigation menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white px-6 py-5 space-y-1">
          {NAV_LINKS.map(l => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-gray-100 mt-3 space-y-2">
            <a
              href={`${WEB_APP}/login`}
              className="block px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Sign in
            </a>
            <a
              href={`${WEB_APP}/signup`}
              className="block w-full text-center px-4 py-3 bg-indigo-600 text-white text-sm font-semibold rounded-full hover:bg-indigo-700 transition-colors"
            >
              Get started free
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

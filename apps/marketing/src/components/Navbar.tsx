'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

const WEB_APP = 'https://devixus-widgets-web.vercel.app'

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
      className={`sticky top-0 z-50 bg-white transition-shadow ${
        scrolled ? 'shadow-sm' : ''
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-bold text-lg text-gray-900 tracking-tight">
          Devixus <span className="text-blue-600">Widgets</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/widgets" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            Widgets
          </Link>
          <Link href="/#pricing" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            Pricing
          </Link>
          <a
            href={`${WEB_APP}/login`}
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            Sign in
          </a>
          <a
            href={`${WEB_APP}/signup`}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Get started free
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-gray-600 hover:text-gray-900"
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white px-6 py-4 space-y-3">
          <Link href="/widgets" onClick={() => setOpen(false)} className="block text-sm font-medium text-gray-700 py-2">
            Widgets
          </Link>
          <Link href="/#pricing" onClick={() => setOpen(false)} className="block text-sm font-medium text-gray-700 py-2">
            Pricing
          </Link>
          <a href={`${WEB_APP}/login`} className="block text-sm font-medium text-gray-700 py-2">
            Sign in
          </a>
          <a
            href={`${WEB_APP}/signup`}
            className="block w-full text-center px-4 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Get started free
          </a>
        </div>
      )}
    </header>
  )
}

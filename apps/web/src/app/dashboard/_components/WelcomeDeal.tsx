'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X, Zap } from 'lucide-react'

const SESSION_KEY = 'devixus_deal_dismissed'

function useCountdown() {
  const [timeLeft, setTimeLeft] = useState('')

  useEffect(() => {
    function calc() {
      const now = new Date()
      // Resets at midnight UTC
      const midnight = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1))
      const diff = midnight.getTime() - Date.now()
      const h = Math.floor(diff / 3_600_000)
      const m = Math.floor((diff % 3_600_000) / 60_000)
      const s = Math.floor((diff % 60_000) / 1_000)
      return `${String(h).padStart(2, '0')}h ${String(m).padStart(2, '0')}m ${String(s).padStart(2, '0')}s`
    }

    setTimeLeft(calc())
    const interval = setInterval(() => setTimeLeft(calc()), 1000)
    return () => clearInterval(interval)
  }, [])

  return timeLeft
}

export function WelcomeDeal() {
  const [visible, setVisible] = useState(false)
  const countdown = useCountdown()

  useEffect(() => {
    // Only show if not dismissed this session
    const dismissed = sessionStorage.getItem(SESSION_KEY)
    if (!dismissed) {
      // Small delay so it doesn't flash on first paint
      const t = setTimeout(() => setVisible(true), 1500)
      return () => clearTimeout(t)
    }
  }, [])

  function dismiss() {
    sessionStorage.setItem(SESSION_KEY, '1')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      className="fixed bottom-6 left-6 z-50 w-72 rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-300"
      style={{ background: 'linear-gradient(135deg, #059669 0%, #10b981 50%, #34d399 100%)' }}
    >
      <button
        onClick={dismiss}
        className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
        aria-label="Dismiss"
      >
        <X size={12} strokeWidth={2.5} />
      </button>

      <div className="p-5 pr-10">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
            <Zap size={14} className="text-white" strokeWidth={2.5} />
          </div>
          <span className="text-white font-bold text-sm">Welcome Deal</span>
        </div>

        <p className="text-white/90 text-sm leading-relaxed mb-3">
          Enjoy <span className="font-bold text-white">33% OFF</span> any annual subscription.
          Catch the offer before it&#39;s gone!
        </p>

        <div className="bg-white/20 rounded-xl px-3 py-2 mb-4 text-center">
          <p className="text-white/70 text-[10px] font-semibold uppercase tracking-wider mb-0.5">Offer expires in</p>
          <p className="text-white font-mono font-bold text-lg leading-none">{countdown}</p>
        </div>

        <Link
          href="/dashboard/billing?deal=33off"
          onClick={dismiss}
          className="flex items-center justify-center w-full py-2.5 bg-white text-green-700 text-sm font-bold rounded-xl hover:bg-green-50 transition-colors shadow-sm"
        >
          Grab Deal →
        </Link>

        <p className="text-white/60 text-[10px] text-center mt-2">
          No credit card required to start
        </p>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'

interface Props {
  plan: string
  label?: string
  className?: string
}

export function UpgradeButton({ plan, label = 'Upgrade', className = '' }: Props) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleClick() {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/billing/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      })

      const data = await res.json()

      if (!res.ok || !data.url) {
        throw new Error(data.error ?? 'Failed to create checkout')
      }

      window.location.href = data.url
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handleClick}
        disabled={loading}
        className={`inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
      >
        {loading && <Loader2 size={14} className="animate-spin" />}
        {loading ? 'Redirecting…' : label}
      </button>
      {error && <p className="text-xs text-red-600 text-center">{error}</p>}
    </div>
  )
}

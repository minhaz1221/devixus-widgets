'use client'

import { useState } from 'react'

interface Props {
  widgetName: string
  color: string
}

export function WaitlistForm({ widgetName, color }: Props) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="rounded-xl bg-white border border-gray-200 px-5 py-4 text-center">
        <p className="font-semibold text-gray-900 text-sm">You&apos;re on the list!</p>
        <p className="text-gray-500 text-xs mt-1">
          We&apos;ll email you when {widgetName} launches.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="email"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="flex-1 px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
      />
      <button
        type="submit"
        className="px-5 py-3 text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity whitespace-nowrap"
        style={{ backgroundColor: color }}
      >
        Notify me
      </button>
    </form>
  )
}

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check } from 'lucide-react'

interface Step {
  label: string
  done: boolean
  href: string | null
}

interface GettingStartedProps {
  steps: Step[]
  completedCount: number
}

// SVG circle: r=10, circumference ≈ 62.8
const CIRC = 62.8

export function GettingStarted({ steps, completedCount }: GettingStartedProps) {
  const [open, setOpen] = useState(false)
  const pct = completedCount / steps.length
  const strokeDash = CIRC - pct * CIRC

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label="Getting started progress"
      >
        {/* Circular progress ring */}
        <svg width="24" height="24" viewBox="0 0 24 24" className="-rotate-90">
          <circle cx="12" cy="12" r="10" fill="none" stroke="#e5e7eb" strokeWidth="2.5" />
          <circle
            cx="12" cy="12" r="10"
            fill="none"
            stroke="#6366f1"
            strokeWidth="2.5"
            strokeDasharray={CIRC}
            strokeDashoffset={strokeDash}
            strokeLinecap="round"
            className="transition-all duration-500"
          />
        </svg>
        <span className="text-xs font-semibold text-gray-600 hidden sm:block">
          {completedCount}/{steps.length}
        </span>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl border border-gray-200 shadow-xl z-40 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="font-semibold text-gray-900 text-sm">Getting Started</p>
              <p className="text-[11px] text-gray-500 mt-0.5">{completedCount} of {steps.length} steps completed</p>
              {/* Progress bar */}
              <div className="h-1.5 bg-gray-100 rounded-full mt-2 overflow-hidden">
                <div
                  className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                  style={{ width: `${(completedCount / steps.length) * 100}%` }}
                />
              </div>
            </div>

            <ul className="py-2">
              {steps.map((step, i) => {
                const content = (
                  <div className={`flex items-center gap-3 px-4 py-2.5 transition-colors ${step.href && !step.done ? 'hover:bg-gray-50 cursor-pointer' : ''}`}>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${step.done ? 'bg-green-500' : 'border-2 border-gray-200'}`}>
                      {step.done
                        ? <Check size={11} className="text-white" strokeWidth={3} />
                        : <span className="text-[10px] font-bold text-gray-400">{i + 1}</span>
                      }
                    </div>
                    <span className={`text-sm ${step.done ? 'text-gray-400 line-through' : 'text-gray-700 font-medium'}`}>
                      {step.label}
                    </span>
                    {!step.done && step.href && (
                      <span className="ml-auto text-[10px] text-indigo-500 font-semibold shrink-0">Go →</span>
                    )}
                  </div>
                )

                return (
                  <li key={i}>
                    {step.href && !step.done
                      ? <Link href={step.href} onClick={() => setOpen(false)}>{content}</Link>
                      : content
                    }
                  </li>
                )
              })}
            </ul>
          </div>
        </>
      )}
    </div>
  )
}

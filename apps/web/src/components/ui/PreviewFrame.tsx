'use client'

import React, { useState } from 'react'
import { Monitor, Smartphone } from 'lucide-react'

interface Props {
  children: React.ReactNode
  device?: 'desktop' | 'mobile'
  bg?: string
}

const BG_OPTIONS = [
  { label: 'White', value: '#ffffff' },
  { label: 'Gray', value: '#f3f4f6' },
  { label: 'Dark', value: '#1f2937' },
]

export function PreviewFrame({ children }: Props) {
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop')
  const [bg, setBg] = useState('#f3f4f6')

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col">
      {/* Toolbar */}
      <div className="px-4 py-2.5 border-b border-gray-100 flex items-center justify-between gap-3">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Preview</span>
        <div className="flex items-center gap-2">
          {/* Background picker */}
          <div className="flex items-center gap-1 border border-gray-200 rounded-lg p-0.5">
            {BG_OPTIONS.map(b => (
              <button
                key={b.value}
                type="button"
                onClick={() => setBg(b.value)}
                title={b.label}
                className={[
                  'w-5 h-5 rounded transition-all border',
                  bg === b.value ? 'ring-2 ring-indigo-500 ring-offset-1 scale-90' : 'hover:scale-90',
                ].join(' ')}
                style={{ background: b.value, borderColor: b.value === '#ffffff' ? '#e5e7eb' : b.value }}
              />
            ))}
          </div>
          {/* Device toggle */}
          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => setDevice('desktop')}
              className={[
                'p-1.5 transition-colors',
                device === 'desktop' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-400 hover:text-gray-600',
              ].join(' ')}
            >
              <Monitor size={14} />
            </button>
            <button
              type="button"
              onClick={() => setDevice('mobile')}
              className={[
                'p-1.5 transition-colors',
                device === 'mobile' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-400 hover:text-gray-600',
              ].join(' ')}
            >
              <Smartphone size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Preview area */}
      <div
        className="flex-1 flex items-center justify-center p-6 transition-colors"
        style={{ background: bg, minHeight: 300 }}
      >
        <div
          className="transition-all duration-300 w-full"
          style={{ maxWidth: device === 'mobile' ? 375 : '100%' }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

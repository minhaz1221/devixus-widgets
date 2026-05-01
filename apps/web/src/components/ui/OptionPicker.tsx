'use client'

import React from 'react'

interface Option {
  value: string
  label: string
  icon?: React.ReactNode
}

interface Props {
  label: string
  options: Option[]
  value: string
  onChange: (v: string) => void
  columns?: 2 | 3 | 4
}

const COLS: Record<number, string> = {
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
}

export function OptionPicker({ label, options, value, onChange, columns = 3 }: Props) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className={`grid ${COLS[columns] ?? 'grid-cols-3'} gap-2`}>
        {options.map(opt => {
          const selected = value === opt.value
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={[
                'flex flex-col items-center gap-1.5 px-3 py-2.5 rounded-lg border-2 text-xs font-medium transition-all',
                selected
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50',
              ].join(' ')}
            >
              {opt.icon && <span className="text-base">{opt.icon}</span>}
              {opt.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

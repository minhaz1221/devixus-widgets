'use client'

const DEFAULT_PRESETS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#3b82f6', '#8b5cf6', '#ec4899', '#1f2937']

interface Props {
  label: string
  value: string
  onChange: (v: string) => void
  presets?: string[]
}

export function ColorPicker({ label, value, onChange, presets = DEFAULT_PRESETS }: Props) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="flex items-center gap-3 mb-2">
        <div className="relative">
          <input
            type="color"
            value={value}
            onChange={e => onChange(e.target.value)}
            className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer p-0.5 block"
          />
        </div>
        <input
          type="text"
          value={value}
          onChange={e => {
            const v = e.target.value
            if (/^#[0-9a-fA-F]{0,6}$/.test(v)) onChange(v)
          }}
          className="w-28 px-2 py-1.5 border border-gray-200 rounded-lg text-sm font-mono text-gray-600"
        />
      </div>
      <div className="flex gap-1.5 flex-wrap">
        {presets.map(p => (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            title={p}
            className={[
              'w-6 h-6 rounded-full border-2 transition-transform hover:scale-110',
              value.toLowerCase() === p.toLowerCase()
                ? 'border-gray-800 scale-110'
                : 'border-white shadow-sm',
            ].join(' ')}
            style={{ background: p }}
          />
        ))}
      </div>
    </div>
  )
}

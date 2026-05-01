'use client'

interface Props {
  label: string
  description?: string
  checked: boolean
  onChange: (v: boolean) => void
  size?: 'sm' | 'md'
}

export function ToggleSwitch({ label, description, checked, onChange, size = 'md' }: Props) {
  const trackW = size === 'sm' ? 'w-9' : 'w-11'
  const trackH = size === 'sm' ? 'h-5' : 'h-6'
  const thumbSz = size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4'
  const onX = size === 'sm' ? 'translate-x-[18px]' : 'translate-x-6'

  return (
    <label className="flex items-center justify-between gap-4 cursor-pointer group">
      <div>
        <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
          {label}
        </span>
        {description && (
          <p className="text-xs text-gray-400 mt-0.5">{description}</p>
        )}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={[
          'toggle-track relative inline-flex items-center rounded-full shrink-0',
          trackW, trackH,
          checked ? 'bg-indigo-600' : 'bg-gray-200',
        ].join(' ')}
      >
        <span
          className={[
            'toggle-thumb inline-block rounded-full bg-white shadow',
            thumbSz,
            checked ? onX : 'translate-x-1',
          ].join(' ')}
        />
      </button>
    </label>
  )
}

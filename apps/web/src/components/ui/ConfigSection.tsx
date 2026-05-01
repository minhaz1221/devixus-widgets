import React from 'react'

interface Props {
  title: string
  description?: string
  children: React.ReactNode
  icon?: React.ReactNode
}

export function ConfigSection({ title, description, children, icon }: Props) {
  return (
    <div className="border-b border-gray-100 last:border-0 pb-5 last:pb-0 mb-5 last:mb-0">
      <div className="flex items-center gap-2 mb-3">
        {icon && <span className="text-gray-400">{icon}</span>}
        <div>
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
            {title}
          </h4>
          {description && (
            <p className="text-xs text-gray-400 mt-0.5">{description}</p>
          )}
        </div>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  )
}

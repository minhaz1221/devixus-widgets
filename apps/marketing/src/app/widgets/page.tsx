'use client'

import { useState } from 'react'
import Link from 'next/link'
import { widgets, categories } from '@/data/widgets'
import { WidgetIcon } from '@/components/WidgetIcon'

const CATEGORY_COLORS: Record<string, string> = {
  social: '#6366f1',
  tools: '#f59e0b',
  forms: '#3b82f6',
  reviews: '#22c55e',
}

export default function WidgetsPage() {
  const [active, setActive] = useState('All')

  const filtered = active === 'All'
    ? widgets
    : widgets.filter(w => w.category === active.toLowerCase())

  return (
    <div className="min-h-screen bg-white">

      {/* Header */}
      <section className="pt-16 pb-10 px-6 text-center bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-indigo-500 mb-3">Widget Library</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight">
            All Widgets
          </h1>
          <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
            10 powerful widgets, free to start. Customize and embed on any website in under 2 minutes.
          </p>
        </div>
      </section>

      {/* Category filter */}
      <div className="sticky top-16 z-10 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-3 flex gap-2 overflow-x-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={[
                'shrink-0 px-5 py-2 rounded-full text-sm font-semibold transition-colors',
                active === cat
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
              ].join(' ')}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Widget grid */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <p className="text-sm text-gray-400 mb-8">
          {filtered.length} widget{filtered.length !== 1 ? 's' : ''}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(widget => (
            <Link
              key={widget.slug}
              href={`/widgets/${widget.slug}`}
              className="group relative rounded-2xl border border-gray-100 p-6 bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col"
            >
              {/* Coming Soon badge */}
              {widget.badge && (
                <span className="absolute top-4 right-4 text-xs font-semibold bg-gray-100 text-gray-500 px-2.5 py-0.5 rounded-full">
                  {widget.badge}
                </span>
              )}

              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-105"
                style={{ backgroundColor: widget.bgColor }}
              >
                <WidgetIcon icon={widget.icon} size={30} />
              </div>

              {/* Category tag */}
              <span
                className="text-xs font-bold uppercase tracking-widest mb-2"
                style={{ color: CATEGORY_COLORS[widget.category] ?? '#6366f1' }}
              >
                {widget.category}
              </span>

              {/* Name + tagline */}
              <h3 className="font-bold text-gray-900 text-base">{widget.name}</h3>
              <p className="text-sm text-gray-500 mt-1 leading-relaxed flex-1">{widget.tagline}</p>

              {/* Features preview */}
              <ul className="mt-4 space-y-1.5">
                {widget.features.slice(0, 3).map(f => (
                  <li key={f} className="flex items-center gap-2 text-xs text-gray-600">
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: widget.brandColor }}
                    />
                    {f}
                  </li>
                ))}
              </ul>

              {/* Stats */}
              {widget.stats.reviews > 0 && (
                <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                  <span>{widget.stats.installs} installs</span>
                  <span>★ {widget.stats.rating} ({widget.stats.reviews})</span>
                </div>
              )}

              {/* CTA */}
              <div className="mt-4">
                {widget.badge ? (
                  <span className="inline-flex w-full items-center justify-center py-2.5 rounded-xl text-sm font-semibold text-gray-500 bg-gray-50">
                    Learn more
                  </span>
                ) : (
                  <span
                    className="inline-flex w-full items-center justify-center py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity group-hover:opacity-90"
                    style={{ backgroundColor: widget.brandColor }}
                  >
                    View widget →
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  )
}

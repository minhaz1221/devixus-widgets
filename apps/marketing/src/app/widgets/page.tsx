'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle2, Clock, ArrowRight } from 'lucide-react'
import { widgets, categories } from '@/data/widgets'

export default function MarketplacePage() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? widgets
    : widgets.filter(w => w.category === activeCategory)

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-b from-gray-50 to-white pt-16 pb-12 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
            Powerful widgets for<br />
            <span className="text-blue-600">any website</span>
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            Browse our library of free and pro widgets. Embed in 60 seconds, no code required.
          </p>
        </div>
      </section>

      {/* Category filter */}
      <div className="sticky top-16 z-10 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-3 flex gap-2 overflow-x-auto scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={[
                'shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors',
                activeCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
              ].join(' ')}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Widget grid */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <p className="text-sm text-gray-400 mb-6">{filtered.length} widget{filtered.length !== 1 ? 's' : ''}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(widget => (
            <div
              key={widget.id}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col"
            >
              {/* Colored header */}
              <div
                className="h-24 flex items-center justify-center"
                style={{ backgroundColor: widget.bgColor }}
              >
                <span
                  className="text-2xl font-extrabold tracking-tight"
                  style={{ color: widget.color }}
                >
                  {widget.name.split(' ')[0]}
                </span>
              </div>

              <div className="p-5 flex flex-col flex-1 gap-4">
                {/* Name + badge */}
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-gray-900">{widget.name}</h3>
                  {widget.available ? (
                    <span className="shrink-0 inline-flex items-center gap-1 text-xs font-medium text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                      <CheckCircle2 size={11} /> Available
                    </span>
                  ) : (
                    <span className="shrink-0 inline-flex items-center gap-1 text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                      <Clock size={11} /> Coming soon
                    </span>
                  )}
                </div>

                <p className="text-sm text-gray-500 leading-relaxed">{widget.description}</p>

                {/* Top 3 features */}
                <ul className="space-y-1 flex-1">
                  {widget.features.slice(0, 3).map(f => (
                    <li key={f} className="flex items-center gap-2 text-xs text-gray-600">
                      <span className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: widget.color }} />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                {widget.available ? (
                  <Link
                    href={`/widgets/${widget.slug}`}
                    className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-colors"
                    style={{ backgroundColor: widget.color }}
                  >
                    Add to website <ArrowRight size={14} />
                  </Link>
                ) : (
                  <Link
                    href={`/widgets/${widget.slug}`}
                    className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    Get notified <ArrowRight size={14} />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

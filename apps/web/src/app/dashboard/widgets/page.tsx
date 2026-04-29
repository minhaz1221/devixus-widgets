'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, Settings2, Trash2, Zap, ZapOff } from 'lucide-react'
import { NewWidgetModal } from './_components/NewWidgetModal'
import type { Widget } from '@/types/widget'

const TYPE_COLORS: Record<string, string> = {
  whatsapp: 'bg-green-100 text-green-700',
  testimonials: 'bg-blue-100 text-blue-700',
  google_reviews: 'bg-yellow-100 text-yellow-700',
  countdown: 'bg-purple-100 text-purple-700',
  contact_form: 'bg-orange-100 text-orange-700',
  social_follow: 'bg-pink-100 text-pink-700',
}

export default function WidgetsPage() {
  const [widgets, setWidgets] = useState<Widget[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [togglingId, setTogglingId] = useState<string | null>(null)

  async function loadWidgets() {
    const res = await fetch('/api/widgets')
    if (res.ok) {
      const data = await res.json()
      setWidgets(data.widgets ?? [])
    }
    setLoading(false)
  }

  useEffect(() => { loadWidgets() }, [])

  async function handleToggle(widget: Widget) {
    setTogglingId(widget.id)
    // Optimistic update
    setWidgets(prev => prev.map(w => w.id === widget.id ? { ...w, is_active: !w.is_active } : w))
    await fetch(`/api/widgets/${widget.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_active: !widget.is_active }),
    })
    setTogglingId(null)
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this widget? This cannot be undone.')) return
    setDeletingId(id)
    await fetch(`/api/widgets/${id}`, { method: 'DELETE' })
    setWidgets(prev => prev.filter(w => w.id !== id))
    setDeletingId(null)
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Widgets</h1>
          <p className="text-gray-500 text-sm mt-1">Manage and configure your embedded widgets.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} /> New Widget
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 animate-pulse h-40" />
          ))}
        </div>
      ) : widgets.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 py-20 text-center">
          <p className="text-gray-400 text-sm mb-4">You haven&apos;t created any widgets yet.</p>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={15} /> Create your first widget
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {widgets.map(widget => (
            <div key={widget.id} className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-1.5">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full w-fit ${TYPE_COLORS[widget.type] ?? 'bg-gray-100 text-gray-600'}`}>
                    {widget.type.replace(/_/g, ' ')}
                  </span>
                  <h3 className="font-semibold text-gray-900 text-sm leading-tight">{widget.name}</h3>
                </div>
                {/* Active toggle */}
                <button
                  onClick={() => handleToggle(widget)}
                  disabled={togglingId === widget.id}
                  title={widget.is_active ? 'Deactivate' : 'Activate'}
                  className={`p-1.5 rounded-lg transition-colors ${widget.is_active ? 'text-green-600 hover:bg-green-50' : 'text-gray-300 hover:bg-gray-100'}`}
                >
                  {widget.is_active ? <Zap size={16} /> : <ZapOff size={16} />}
                </button>
              </div>

              <div className="text-xs text-gray-400">
                {widget.install_count} install{widget.install_count !== 1 ? 's' : ''}
                {' · '}
                <span className={widget.is_active ? 'text-green-600' : 'text-gray-400'}>
                  {widget.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>

              <div className="flex gap-2 mt-auto">
                <Link
                  href={`/dashboard/widgets/${widget.id}`}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 border border-gray-200 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Settings2 size={13} /> Configure
                </Link>
                <button
                  onClick={() => handleDelete(widget.id)}
                  disabled={deletingId === widget.id}
                  className="px-3 py-2 border border-red-100 text-red-500 text-xs font-medium rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && <NewWidgetModal onClose={() => setShowModal(false)} />}
    </div>
  )
}

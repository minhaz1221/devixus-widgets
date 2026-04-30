'use client'

import { useEffect, useState, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { Copy, Check, Star, Trash2, Plus } from 'lucide-react'
import type { Widget, WhatsAppConfig, TestimonialsConfig, YouTubeFeedConfig, CountdownTimerConfig, AnnouncementBarConfig } from '@/types/widget'

// ── Embed code ─────────────────────────────────────────────────────────────
const EMBED_ORIGIN = 'https://devixus-widgets-web.vercel.app'

function EmbedCode({ widgetId }: { widgetId: string }) {
  const [copied, setCopied] = useState(false)
  const code = `<script\n  src="${EMBED_ORIGIN}/widget.js"\n  data-widget-id="${widgetId}">\n</script>`

  async function copy() {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">Embed Code</h3>
        <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
          ● Live
        </span>
      </div>
      <pre className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-xs text-gray-700 overflow-x-auto whitespace-pre">
        {code}
      </pre>
      <button
        onClick={copy}
        className="inline-flex items-center gap-2 px-3 py-2 border border-gray-200 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 transition-colors w-full justify-center"
      >
        {copied ? <><Check size={14} className="text-green-600" /> Copied!</> : <><Copy size={14} /> Copy to clipboard</>}
      </button>
    </div>
  )
}

// ── Toggle helper ──────────────────────────────────────────────────────────
function Toggle({
  checked,
  onChange,
}: {
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        checked ? 'bg-blue-600' : 'bg-gray-200'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  )
}

// ── WhatsApp form ──────────────────────────────────────────────────────────
function WhatsAppForm({
  config,
  onChange,
}: {
  config: Partial<WhatsAppConfig>
  onChange: (c: Partial<WhatsAppConfig>) => void
}) {
  const set = (key: keyof WhatsAppConfig, val: unknown) =>
    onChange({ ...config, [key]: val })

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number <span className="text-gray-400 font-normal">(with country code, e.g. 19175550100)</span>
        </label>
        <input
          type="tel"
          value={config.phone_number ?? ''}
          onChange={e => set('phone_number', e.target.value)}
          placeholder="19175550100"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Welcome Message</label>
        <textarea
          value={config.welcome_message ?? ''}
          onChange={e => set('welcome_message', e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Button Color</label>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={config.button_color ?? '#25D366'}
            onChange={e => set('button_color', e.target.value)}
            className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer p-0.5"
          />
          <span className="text-sm text-gray-500">{config.button_color ?? '#25D366'}</span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
        <div className="flex gap-3">
          {(['bottom-right', 'bottom-left'] as const).map(pos => (
            <label key={pos} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="position"
                value={pos}
                checked={(config.position ?? 'bottom-right') === pos}
                onChange={() => set('position', pos)}
                className="text-blue-600"
              />
              <span className="text-sm text-gray-700 capitalize">{pos.replace('-', ' ')}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {([
          ['show_on_mobile', 'Show on mobile'] as const,
          ['show_on_desktop', 'Show on desktop'] as const,
        ]).map(([key, label]) => (
          <label key={key} className="flex items-center justify-between cursor-pointer">
            <span className="text-sm text-gray-700">{label}</span>
            <Toggle
              checked={!!(config[key] ?? true)}
              onChange={v => set(key, v)}
            />
          </label>
        ))}
      </div>
    </div>
  )
}

// ── Testimonials form ──────────────────────────────────────────────────────
type Testimonial = TestimonialsConfig['testimonials'][0]

function StarPicker({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(n => (
        <button key={n} type="button" onClick={() => onChange(n)}>
          <Star
            size={18}
            className={n <= value ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
          />
        </button>
      ))}
    </div>
  )
}

const BLANK_TESTIMONIAL: Testimonial = { author: '', role: '', content: '', rating: 5 }

function TestimonialsForm({
  config,
  onChange,
}: {
  config: Partial<TestimonialsConfig>
  onChange: (c: Partial<TestimonialsConfig>) => void
}) {
  const [draft, setDraft] = useState<Testimonial>({ ...BLANK_TESTIMONIAL })
  const [adding, setAdding] = useState(false)

  const testimonials = config.testimonials ?? []
  const set = (key: keyof TestimonialsConfig, val: unknown) => onChange({ ...config, [key]: val })

  function addTestimonial() {
    if (!draft.author || !draft.content) return
    onChange({ ...config, testimonials: [...testimonials, { ...draft }] })
    setDraft({ ...BLANK_TESTIMONIAL })
    setAdding(false)
  }

  function removeTestimonial(i: number) {
    onChange({ ...config, testimonials: testimonials.filter((_, idx) => idx !== i) })
  }

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
        <div className="flex gap-3">
          {(['light', 'dark'] as const).map(t => (
            <label key={t} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="theme"
                checked={(config.theme ?? 'light') === t}
                onChange={() => set('theme', t)}
              />
              <span className="text-sm text-gray-700 capitalize">{t}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {([
          ['show_rating', 'Show star ratings'] as const,
          ['autoplay', 'Autoplay'] as const,
        ]).map(([key, label]) => (
          <label key={key} className="flex items-center justify-between cursor-pointer">
            <span className="text-sm text-gray-700">{label}</span>
            <Toggle
              checked={!!(config[key] ?? true)}
              onChange={v => set(key, v)}
            />
          </label>
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-700">Testimonials ({testimonials.length})</label>
          <button
            type="button"
            onClick={() => setAdding(a => !a)}
            className="inline-flex items-center gap-1 text-xs text-blue-600 font-medium hover:underline"
          >
            <Plus size={13} /> Add
          </button>
        </div>

        {adding && (
          <div className="border border-blue-200 bg-blue-50 rounded-xl p-4 space-y-3 mb-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Author name *</label>
                <input
                  value={draft.author}
                  onChange={e => setDraft(d => ({ ...d, author: e.target.value }))}
                  placeholder="Jane Smith"
                  className="w-full px-2 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Role / Company</label>
                <input
                  value={draft.role}
                  onChange={e => setDraft(d => ({ ...d, role: e.target.value }))}
                  placeholder="CEO at Acme"
                  className="w-full px-2 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Review *</label>
              <textarea
                value={draft.content}
                onChange={e => setDraft(d => ({ ...d, content: e.target.value }))}
                rows={2}
                placeholder="Amazing product! Highly recommend."
                className="w-full px-2 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Avatar URL (optional)</label>
              <input
                value={draft.avatar_url ?? ''}
                onChange={e => setDraft(d => ({ ...d, avatar_url: e.target.value }))}
                placeholder="https://example.com/avatar.jpg"
                className="w-full px-2 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Rating</label>
                <StarPicker value={draft.rating} onChange={r => setDraft(d => ({ ...d, rating: r }))} />
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => { setAdding(false); setDraft({ ...BLANK_TESTIMONIAL }) }}
                  className="px-3 py-1.5 text-xs font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={addTestimonial}
                  disabled={!draft.author || !draft.content}
                  className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}

        {testimonials.length === 0 && !adding && (
          <p className="text-xs text-gray-400 py-2">No testimonials yet. Click Add to get started.</p>
        )}
        <ul className="space-y-2">
          {testimonials.map((t, i) => (
            <li key={i} className="flex items-start justify-between gap-2 bg-gray-50 rounded-lg px-3 py-2">
              <div className="min-w-0">
                <p className="text-xs font-semibold text-gray-800 truncate">{t.author}</p>
                <p className="text-xs text-gray-500 truncate">{t.content}</p>
              </div>
              <button
                type="button"
                onClick={() => removeTestimonial(i)}
                className="shrink-0 text-gray-400 hover:text-red-500 transition-colors mt-0.5"
              >
                <Trash2 size={13} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

// ── YouTube Feed form ──────────────────────────────────────────────────────
function YouTubeFeedForm({
  config,
  onChange,
}: {
  config: Partial<YouTubeFeedConfig>
  onChange: (c: Partial<YouTubeFeedConfig>) => void
}) {
  const [channelUrl, setChannelUrl] = useState(config.channel_url ?? '')
  const [channelName, setChannelName] = useState('')
  const [fetching, setFetching] = useState(false)
  const [fetchError, setFetchError] = useState<string | null>(null)

  const set = (key: keyof YouTubeFeedConfig, val: unknown) =>
    onChange({ ...config, [key]: val })

  async function fetchChannel() {
    if (!channelUrl.trim()) return
    setFetching(true)
    setFetchError(null)
    try {
      const res = await fetch(
        `/api/youtube/resolve?url=${encodeURIComponent(channelUrl.trim())}`
      )
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Failed to resolve channel')
      onChange({ ...config, channel_id: data.channel_id, channel_url: channelUrl.trim() })
      setChannelName(data.channel_name)
    } catch (err) {
      setFetchError(err instanceof Error ? err.message : 'Failed to resolve channel')
    } finally {
      setFetching(false)
    }
  }

  return (
    <div className="space-y-5">

      {/* Channel URL */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          YouTube Channel URL
        </label>
        <div className="flex gap-2">
          <input
            value={channelUrl}
            onChange={e => setChannelUrl(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && fetchChannel()}
            placeholder="https://youtube.com/@channelname"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={fetchChannel}
            disabled={!channelUrl.trim() || fetching}
            className="px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 whitespace-nowrap"
          >
            {fetching ? '…' : 'Fetch'}
          </button>
        </div>
        {config.channel_id && (
          <p className="text-xs text-green-600 mt-1.5 flex items-center gap-1">
            <Check size={12} /> {channelName || config.channel_id}
          </p>
        )}
        {fetchError && (
          <p className="text-xs text-red-600 mt-1.5">{fetchError}</p>
        )}
      </div>

      {/* Layout */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Layout</label>
        <div className="flex gap-4">
          {(['grid', 'list', 'carousel'] as const).map(l => (
            <label key={l} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="yt-layout"
                checked={(config.layout ?? 'grid') === l}
                onChange={() => set('layout', l)}
              />
              <span className="text-sm text-gray-700 capitalize">{l}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Columns — only for grid */}
      {(config.layout ?? 'grid') === 'grid' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Columns</label>
          <div className="flex gap-4">
            {([2, 3, 4] as const).map(c => (
              <label key={c} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="yt-columns"
                  checked={(config.columns ?? 3) === c}
                  onChange={() => set('columns', c)}
                />
                <span className="text-sm text-gray-700">{c}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Max Videos */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Max Videos</label>
        <select
          value={config.max_results ?? 6}
          onChange={e => set('max_results', parseInt(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {[3, 6, 9, 12].map(n => (
            <option key={n} value={n}>{n} videos</option>
          ))}
        </select>
      </div>

      {/* Theme */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
        <div className="flex gap-4">
          {(['light', 'dark'] as const).map(t => (
            <label key={t} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="yt-theme"
                checked={(config.theme ?? 'light') === t}
                onChange={() => set('theme', t)}
              />
              <span className="text-sm text-gray-700 capitalize">{t}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Accent color */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Accent Color</label>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={config.accent_color ?? '#ff0000'}
            onChange={e => set('accent_color', e.target.value)}
            className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer p-0.5"
          />
          <span className="text-sm text-gray-500">{config.accent_color ?? '#ff0000'}</span>
        </div>
      </div>

      {/* Toggles */}
      <div className="flex flex-col gap-3">
        {([
          ['show_title', 'Show video title'] as const,
          ['show_date', 'Show publish date'] as const,
        ]).map(([key, label]) => (
          <label key={key} className="flex items-center justify-between cursor-pointer">
            <span className="text-sm text-gray-700">{label}</span>
            <Toggle
              checked={!!(config[key] ?? true)}
              onChange={v => set(key, v)}
            />
          </label>
        ))}
      </div>
    </div>
  )
}

// ── Countdown Timer form ───────────────────────────────────────────────────
function CountdownTimerForm({
  config,
  onChange,
}: {
  config: Partial<CountdownTimerConfig>
  onChange: (c: Partial<CountdownTimerConfig>) => void
}) {
  const set = (key: keyof CountdownTimerConfig, val: unknown) =>
    onChange({ ...config, [key]: val })

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          value={config.title ?? ''}
          onChange={e => set('title', e.target.value)}
          placeholder="Sale ends in"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Target Date</label>
          <input
            type="date"
            value={config.target_date ?? ''}
            onChange={e => set('target_date', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Target Time</label>
          <input
            type="time"
            value={config.target_time ?? ''}
            onChange={e => set('target_time', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Expired Message</label>
        <input
          type="text"
          value={config.expired_message ?? ''}
          onChange={e => set('expired_message', e.target.value)}
          placeholder="This offer has ended"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Redirect URL <span className="text-gray-400 font-normal">(optional, on expiry)</span>
        </label>
        <input
          type="url"
          value={config.redirect_url ?? ''}
          onChange={e => set('redirect_url', e.target.value)}
          placeholder="https://example.com"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Style</label>
        <div className="flex gap-4">
          {(['blocks', 'minimal', 'flip'] as const).map(s => (
            <label key={s} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="ct-style"
                checked={(config.style ?? 'blocks') === s}
                onChange={() => set('style', s)}
              />
              <span className="text-sm text-gray-700 capitalize">{s}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
        <div className="flex gap-4">
          {(['light', 'dark'] as const).map(t => (
            <label key={t} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="ct-theme"
                checked={(config.theme ?? 'light') === t}
                onChange={() => set('theme', t)}
              />
              <span className="text-sm text-gray-700 capitalize">{t}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {([
          ['accent_color', 'Accent Color', '#8b5cf6'] as const,
          ['bg_color', 'Background', '#ffffff'] as const,
          ['text_color', 'Text Color', '#1a1a1a'] as const,
        ]).map(([key, label, fallback]) => (
          <div key={key}>
            <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={(config[key as keyof CountdownTimerConfig] as string) ?? fallback}
                onChange={e => set(key as keyof CountdownTimerConfig, e.target.value)}
                className="w-9 h-9 rounded-lg border border-gray-200 cursor-pointer p-0.5"
              />
              <span className="text-xs text-gray-400">{(config[key as keyof CountdownTimerConfig] as string) ?? fallback}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {([
          ['show_days', 'Show days'] as const,
          ['show_hours', 'Show hours'] as const,
          ['show_minutes', 'Show minutes'] as const,
          ['show_seconds', 'Show seconds'] as const,
          ['show_labels', 'Show labels'] as const,
        ]).map(([key, label]) => (
          <label key={key} className="flex items-center justify-between cursor-pointer">
            <span className="text-sm text-gray-700">{label}</span>
            <Toggle
              checked={!!(config[key] ?? true)}
              onChange={v => set(key, v)}
            />
          </label>
        ))}
      </div>
    </div>
  )
}

// ── Announcement Bar form ──────────────────────────────────────────────────
function AnnouncementBarForm({
  config,
  onChange,
}: {
  config: Partial<AnnouncementBarConfig>
  onChange: (c: Partial<AnnouncementBarConfig>) => void
}) {
  const set = (key: keyof AnnouncementBarConfig, val: unknown) =>
    onChange({ ...config, [key]: val })

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
        <input
          type="text"
          value={config.message ?? ''}
          onChange={e => set('message', e.target.value)}
          placeholder="🎉 Special offer — Limited time only!"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Link Text <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <input
            type="text"
            value={config.link_text ?? ''}
            onChange={e => set('link_text', e.target.value)}
            placeholder="Shop now"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Link URL <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <input
            type="url"
            value={config.link_url ?? ''}
            onChange={e => set('link_url', e.target.value)}
            placeholder="https://example.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
        <div className="flex gap-4">
          {(['top', 'bottom'] as const).map(p => (
            <label key={p} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="ab-position"
                checked={(config.position ?? 'top') === p}
                onChange={() => set('position', p)}
              />
              <span className="text-sm text-gray-700 capitalize">{p}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Style</label>
        <div className="flex gap-4">
          {(['solid', 'gradient', 'striped'] as const).map(s => (
            <label key={s} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="ab-style"
                checked={(config.style ?? 'solid') === s}
                onChange={() => set('style', s)}
              />
              <span className="text-sm text-gray-700 capitalize">{s}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {([
          ['bg_color', 'Background', '#ff6914'] as const,
          ['text_color', 'Text Color', '#ffffff'] as const,
          ['link_color', 'Link Color', '#ffffff'] as const,
        ]).map(([key, label, fallback]) => (
          <div key={key}>
            <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={(config[key as keyof AnnouncementBarConfig] as string) ?? fallback}
                onChange={e => set(key as keyof AnnouncementBarConfig, e.target.value)}
                className="w-9 h-9 rounded-lg border border-gray-200 cursor-pointer p-0.5"
              />
              <span className="text-xs text-gray-400">{(config[key as keyof AnnouncementBarConfig] as string) ?? fallback}</span>
            </div>
          </div>
        ))}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Emoji</label>
        <input
          type="text"
          value={config.emoji ?? ''}
          onChange={e => set('emoji', e.target.value)}
          placeholder="🎉"
          maxLength={4}
          className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col gap-3">
        {([
          ['show_emoji', 'Show emoji'] as const,
          ['show_close_button', 'Show close button'] as const,
          ['is_sticky', 'Sticky (fixed position)'] as const,
        ]).map(([key, label]) => (
          <label key={key} className="flex items-center justify-between cursor-pointer">
            <span className="text-sm text-gray-700">{label}</span>
            <Toggle
              checked={!!(config[key] ?? true)}
              onChange={v => set(key, v)}
            />
          </label>
        ))}
      </div>
    </div>
  )
}

// ── Main configurator page ─────────────────────────────────────────────────
export default function ConfiguratorPage() {
  const { id } = useParams<{ id: string }>()
  const [widget, setWidget] = useState<Widget | null>(null)
  const [config, setConfig] = useState<Record<string, unknown>>({})
  const [name, setName] = useState('')
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null)
  const [previewKey, setPreviewKey] = useState(0)

  const showToast = (msg: string, ok: boolean) => {
    setToast({ msg, ok })
    setTimeout(() => setToast(null), 3000)
  }

  const load = useCallback(async () => {
    const res = await fetch(`/api/widgets/${id}`)
    if (!res.ok) return
    const { widget } = await res.json()
    setWidget(widget)
    setConfig(widget.config ?? {})
    setName(widget.name ?? '')
  }, [id])

  useEffect(() => { load() }, [load])

  async function handleSave() {
    setSaving(true)
    const res = await fetch(`/api/widgets/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, config }),
    })
    setSaving(false)
    if (res.ok) {
      showToast('Saved successfully', true)
      setPreviewKey(k => k + 1)
    } else {
      const data = await res.json()
      showToast(data.error ?? 'Save failed', false)
    }
  }

  if (!widget) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-400 text-sm">Loading widget…</div>
      </div>
    )
  }

  return (
    <div className="flex gap-6 h-[calc(100vh-8rem)] max-w-7xl mx-auto">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl text-sm font-medium shadow-lg ${
          toast.ok ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
        }`}>
          {toast.msg}
        </div>
      )}

      {/* LEFT — Settings panel */}
      <div className="w-[400px] shrink-0 flex flex-col gap-4 overflow-y-auto">
        {/* Name */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <label className="block text-sm font-medium text-gray-700 mb-1">Widget Name</label>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Type-specific form */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 flex-1">
          <h3 className="font-semibold text-gray-900 mb-4 capitalize">
            {widget.type.replace(/_/g, ' ')} Settings
          </h3>
          {widget.type === 'whatsapp' && (
            <WhatsAppForm
              config={config as Partial<WhatsAppConfig>}
              onChange={c => setConfig(c as Record<string, unknown>)}
            />
          )}
          {widget.type === 'testimonials' && (
            <TestimonialsForm
              config={config as Partial<TestimonialsConfig>}
              onChange={c => setConfig(c as Record<string, unknown>)}
            />
          )}
          {widget.type === 'youtube_feed' && (
            <YouTubeFeedForm
              config={config as Partial<YouTubeFeedConfig>}
              onChange={c => setConfig(c as Record<string, unknown>)}
            />
          )}
          {widget.type === 'countdown_timer' && (
            <CountdownTimerForm
              config={config as Partial<CountdownTimerConfig>}
              onChange={c => setConfig(c as Record<string, unknown>)}
            />
          )}
          {widget.type === 'announcement_bar' && (
            <AnnouncementBarForm
              config={config as Partial<AnnouncementBarConfig>}
              onChange={c => setConfig(c as Record<string, unknown>)}
            />
          )}
        </div>

        {/* Save */}
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full py-3 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-60"
        >
          {saving ? 'Saving…' : 'Save changes'}
        </button>
      </div>

      {/* RIGHT — Preview + embed */}
      <div className="flex-1 flex flex-col gap-4 min-w-0 overflow-y-auto">
        <EmbedCode widgetId={id} />

        <div className="bg-white rounded-xl border border-gray-200 flex-1 flex flex-col overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 text-sm">Preview</h3>
            <button
              onClick={() => setPreviewKey(k => k + 1)}
              className="text-xs text-blue-600 hover:underline"
            >
              Refresh
            </button>
          </div>
          <iframe
            key={previewKey}
            src={`/widget-preview/${id}`}
            className="flex-1 w-full border-0"
            title="Widget preview"
          />
        </div>
      </div>
    </div>
  )
}

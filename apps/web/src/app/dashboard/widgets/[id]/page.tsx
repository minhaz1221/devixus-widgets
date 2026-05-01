'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { useParams } from 'next/navigation'
import { Copy, Check, Star, Trash2, Plus } from 'lucide-react'
import type { Widget, WhatsAppConfig, TestimonialsConfig, YouTubeFeedConfig, CountdownTimerConfig, AnnouncementBarConfig, GoogleReviewsConfig, ContactFormConfig, SocialFollowConfig } from '@/types/widget'

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

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tooltip Text <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <input
          type="text"
          value={config.tooltip_text ?? ''}
          onChange={e => set('tooltip_text', e.target.value)}
          placeholder="Chat with us!"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Button Size</label>
        <div className="flex gap-4">
          {([
            ['small', 'Small (44px)'],
            ['medium', 'Medium (56px)'],
            ['large', 'Large (68px)'],
          ] as const).map(([val, label]) => (
            <label key={val} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="wa-size"
                checked={(config.button_size ?? 'medium') === val}
                onChange={() => set('button_size', val)}
              />
              <span className="text-sm text-gray-700">{label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Open in</label>
        <div className="flex gap-4">
          {([
            ['new_tab', 'New tab'],
            ['same_tab', 'Same tab'],
          ] as const).map(([val, label]) => (
            <label key={val} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="wa-target"
                checked={(config.open_in ?? 'new_tab') === val}
                onChange={() => set('open_in', val)}
              />
              <span className="text-sm text-gray-700">{label}</span>
            </label>
          ))}
        </div>
      </div>

      <label className="flex items-center justify-between cursor-pointer">
        <span className="text-sm text-gray-700">Pulse animation</span>
        <Toggle
          checked={!!config.pulse_animation}
          onChange={v => set('pulse_animation', v)}
        />
      </label>
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
        <label className="block text-sm font-medium text-gray-700 mb-2">Layout</label>
        <div className="flex gap-4">
          {(['slider', 'grid'] as const).map(l => (
            <label key={l} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="t-layout"
                checked={(config.layout ?? 'slider') === l}
                onChange={() => set('layout', l)}
              />
              <span className="text-sm text-gray-700 capitalize">{l}</span>
            </label>
          ))}
        </div>
      </div>

      {config.layout === 'grid' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Columns</label>
          <div className="flex gap-4">
            {([1, 2, 3] as const).map(c => (
              <label key={c} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="t-cols"
                  checked={(config.columns ?? 2) === c}
                  onChange={() => set('columns', c)}
                />
                <span className="text-sm text-gray-700">{c}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Card Shadow</label>
        <div className="flex gap-3 flex-wrap">
          {(['none', 'small', 'medium', 'large'] as const).map(s => (
            <label key={s} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="t-shadow"
                checked={(config.card_shadow ?? 'none') === s}
                onChange={() => set('card_shadow', s)}
              />
              <span className="text-sm text-gray-700 capitalize">{s}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Avatar Shape</label>
        <div className="flex gap-4">
          {(['circle', 'square', 'rounded'] as const).map(s => (
            <label key={s} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="t-avatar"
                checked={(config.avatar_shape ?? 'circle') === s}
                onChange={() => set('avatar_shape', s)}
              />
              <span className="text-sm text-gray-700 capitalize">{s}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {([
          ['show_arrows', 'Show navigation arrows'],
          ['show_dots', 'Show dots indicator'],
          ['show_quote_icon', 'Show quote icon'],
        ] as const).map(([key, label]) => (
          <label key={key} className="flex items-center justify-between cursor-pointer">
            <span className="text-sm text-gray-700">{label}</span>
            <Toggle
              checked={!!(config[key] ?? (key === 'show_arrows'))}
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

      {/* Header style */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Header Style</label>
        <div className="flex gap-4">
          {(['full', 'compact', 'none'] as const).map(h => (
            <label key={h} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="yt-header"
                checked={(config.header_style ?? 'full') === h}
                onChange={() => set('header_style', h)}
              />
              <span className="text-sm text-gray-700 capitalize">{h}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Subscribe button color */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Subscribe Button Color</label>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={config.subscribe_button_color ?? '#ff0000'}
            onChange={e => set('subscribe_button_color', e.target.value)}
            className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer p-0.5"
          />
          <span className="text-sm text-gray-500">{config.subscribe_button_color ?? '#ff0000'}</span>
        </div>
      </div>

      {/* Toggles */}
      <div className="flex flex-col gap-3">
        {([
          ['show_title', 'Show video title'] as const,
          ['show_date', 'Show publish date'] as const,
          ['show_subscriber_count', 'Show subscriber count'] as const,
          ['show_view_count', 'Show video view count'] as const,
        ]).map(([key, label]) => (
          <label key={key} className="flex items-center justify-between cursor-pointer">
            <span className="text-sm text-gray-700">{label}</span>
            <Toggle
              checked={!!(config[key] ?? (key === 'show_title' || key === 'show_date' || key === 'show_subscriber_count'))}
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

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Font Family</label>
        <div className="flex gap-4">
          {([
            ['system', 'System'],
            ['mono', 'Monospace'],
            ['serif', 'Serif'],
          ] as const).map(([val, label]) => (
            <label key={val} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="ct-font"
                checked={(config.font_family ?? 'system') === val}
                onChange={() => set('font_family', val)}
              />
              <span className="text-sm text-gray-700">{label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Separator Style</label>
        <div className="flex gap-4 flex-wrap">
          {(['colon', 'slash', 'dot', 'none'] as const).map(s => (
            <label key={s} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="ct-sep"
                checked={(config.separator_style ?? 'colon') === s}
                onChange={() => set('separator_style', s)}
              />
              <span className="text-sm text-gray-700 capitalize">{s}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">When Timer Expires</label>
        <div className="flex gap-3 flex-wrap">
          {([
            ['nothing', 'Do nothing'],
            ['message', 'Show message'],
            ['redirect', 'Redirect'],
            ['hide', 'Hide widget'],
          ] as const).map(([val, label]) => (
            <label key={val} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="ct-expire"
                checked={(config.expire_action ?? 'message') === val}
                onChange={() => set('expire_action', val)}
              />
              <span className="text-sm text-gray-700">{label}</span>
            </label>
          ))}
        </div>
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

// ── Google Reviews form ────────────────────────────────────────────────────
interface PlaceResult {
  place_id: string
  name: string
  address: string
  rating: number
  total_ratings: number
}

function GoogleReviewsForm({
  config,
  onChange,
}: {
  config: Partial<GoogleReviewsConfig>
  onChange: (c: Partial<GoogleReviewsConfig>) => void
}) {
  const [query, setQuery] = useState('')
  const [searching, setSearching] = useState(false)
  const [results, setResults] = useState<PlaceResult[]>([])
  const [searchError, setSearchError] = useState<string | null>(null)

  const set = (key: keyof GoogleReviewsConfig, val: unknown) =>
    onChange({ ...config, [key]: val })

  async function handleSearch() {
    if (!query.trim()) return
    setSearching(true)
    setSearchError(null)
    setResults([])
    try {
      const res = await fetch(
        `/api/google-reviews/search?query=${encodeURIComponent(query.trim())}`
      )
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Search failed')
      setResults(data.results ?? [])
      if ((data.results ?? []).length === 0) setSearchError('No businesses found. Try a more specific name + city.')
    } catch (err) {
      setSearchError(err instanceof Error ? err.message : 'Search failed')
    } finally {
      setSearching(false)
    }
  }

  function selectPlace(place: PlaceResult) {
    console.log('Selected place:', place.place_id, place.name)
    onChange({
      ...config,
      place_id: place.place_id,
      place_name: place.name,
      place_address: place.address,
    })
    setResults([])
    setQuery('')
  }

  return (
    <div className="space-y-5">
      {/* Business search */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Business Name
        </label>
        <div className="flex gap-2">
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
            placeholder="e.g. Acme Coffee Shop, New York"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={handleSearch}
            disabled={!query.trim() || searching}
            className="px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 whitespace-nowrap"
          >
            {searching ? '…' : 'Search'}
          </button>
        </div>

        {config.place_id && (
          <p className="text-xs text-green-600 mt-1.5 flex items-center gap-1">
            <Check size={12} /> {config.place_name || config.place_id}
            {config.place_address && (
              <span className="text-gray-400 ml-1">— {config.place_address}</span>
            )}
          </p>
        )}
        {searchError && (
          <p className="text-xs text-red-600 mt-1.5">{searchError}</p>
        )}

        {results.length > 0 && (
          <ul className="mt-2 border border-gray-200 rounded-lg overflow-hidden divide-y divide-gray-100 shadow-sm">
            {results.map(r => (
              <li key={r.place_id}>
                <button
                  type="button"
                  onClick={() => selectPlace(r)}
                  className="w-full text-left px-3 py-2.5 hover:bg-blue-50 transition-colors"
                >
                  <p className="text-sm font-medium text-gray-800">{r.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{r.address}</p>
                  {r.rating > 0 && (
                    <p className="text-xs text-yellow-600 mt-0.5">
                      {'★'.repeat(Math.round(r.rating))} {r.rating} · {r.total_ratings} reviews
                    </p>
                  )}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Layout */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Layout</label>
        <div className="flex gap-3 flex-wrap">
          {(['grid', 'list', 'carousel'] as const).map(l => (
            <label key={l} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="gr-layout"
                checked={(config.layout ?? 'grid') === l}
                onChange={() => set('layout', l)}
              />
              <span className="text-sm text-gray-700 capitalize">{l}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Min rating */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Minimum Rating
        </label>
        <select
          value={config.min_rating ?? 1}
          onChange={e => set('min_rating', parseInt(e.target.value) as 1 | 2 | 3 | 4 | 5)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {[1, 2, 3, 4, 5].map(n => (
            <option key={n} value={n}>{n}+ stars</option>
          ))}
        </select>
      </div>

      {/* Max reviews */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Max Reviews</label>
        <select
          value={config.max_reviews ?? 6}
          onChange={e => set('max_reviews', parseInt(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {[3, 6, 9, 12].map(n => (
            <option key={n} value={n}>{n} reviews</option>
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
                name="gr-theme"
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
            value={config.accent_color ?? '#4285f4'}
            onChange={e => set('accent_color', e.target.value)}
            className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer p-0.5"
          />
          <span className="text-sm text-gray-500">{config.accent_color ?? '#4285f4'}</span>
        </div>
      </div>

      {/* Toggles */}
      <div className="flex flex-col gap-3">
        {([
          ['show_header', 'Show header (business name + rating)'] as const,
          ['show_overall_rating', 'Show overall rating score'] as const,
          ['show_review_date', 'Show review date'] as const,
          ['show_reviewer_photo', 'Show reviewer photo'] as const,
          ['write_review_link', 'Show "Write a review" link'] as const,
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

// ── Contact Form form ──────────────────────────────────────────────────────
function ContactFormForm({
  config,
  onChange,
}: {
  config: Partial<ContactFormConfig>
  onChange: (c: Partial<ContactFormConfig>) => void
}) {
  const set = (key: keyof ContactFormConfig, val: unknown) =>
    onChange({ ...config, [key]: val })

  const fields = config.fields ?? { name: true, email: true, phone: false, subject: false, message: true }
  const required = config.required_fields ?? { name: true, email: true, phone: false, subject: false, message: true }

  function setField(key: keyof typeof fields, val: boolean) {
    onChange({ ...config, fields: { ...fields, [key]: val } })
  }
  function setRequired(key: keyof typeof required, val: boolean) {
    onChange({ ...config, required_fields: { ...required, [key]: val } })
  }

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          value={config.title ?? ''}
          onChange={e => set('title', e.target.value)}
          placeholder="Contact Us"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
        <input
          type="text"
          value={config.subtitle ?? ''}
          onChange={e => set('subtitle', e.target.value)}
          placeholder="Send us a message..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Recipient Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          value={config.recipient_email ?? ''}
          onChange={e => set('recipient_email', e.target.value)}
          placeholder="you@example.com"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-xs text-gray-400 mt-1">Form submissions will be sent to this address.</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
        <input
          type="text"
          value={config.button_text ?? ''}
          onChange={e => set('button_text', e.target.value)}
          placeholder="Send Message"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Success Message</label>
        <input
          type="text"
          value={config.success_message ?? ''}
          onChange={e => set('success_message', e.target.value)}
          placeholder="Thank you! We'll be in touch soon."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Display Mode</label>
        <div className="flex gap-4">
          {(['inline', 'popup'] as const).map(m => (
            <label key={m} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="cf-display"
                checked={(config.display_mode ?? 'inline') === m}
                onChange={() => set('display_mode', m)}
              />
              <span className="text-sm text-gray-700 capitalize">{m}</span>
            </label>
          ))}
        </div>
      </div>

      {config.display_mode === 'popup' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Trigger Button Text</label>
          <input
            type="text"
            value={config.trigger_text ?? ''}
            onChange={e => set('trigger_text', e.target.value)}
            placeholder="✉ Contact Us"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Fields to Show</label>
        <div className="space-y-2">
          {(['name', 'email', 'phone', 'subject', 'message'] as const).map(f => (
            <div key={f} className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={!!fields[f]}
                  onChange={e => setField(f, e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm text-gray-700 capitalize">{f}</span>
              </label>
              {fields[f] && (
                <label className="flex items-center gap-1 text-xs text-gray-500 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={!!required[f]}
                    onChange={e => setRequired(f, e.target.checked)}
                    className="rounded"
                  />
                  Required
                </label>
              )}
            </div>
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
                name="cf-theme"
                checked={(config.theme ?? 'light') === t}
                onChange={() => set('theme', t)}
              />
              <span className="text-sm text-gray-700 capitalize">{t}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Accent Color</label>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={config.accent_color ?? '#ff6914'}
            onChange={e => set('accent_color', e.target.value)}
            className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer p-0.5"
          />
          <span className="text-sm text-gray-500">{config.accent_color ?? '#ff6914'}</span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Border Radius: {config.border_radius ?? 8}px
        </label>
        <input
          type="range"
          min={0}
          max={20}
          value={config.border_radius ?? 8}
          onChange={e => set('border_radius', parseInt(e.target.value))}
          className="w-full"
        />
      </div>
    </div>
  )
}

// ── Social Follow form ─────────────────────────────────────────────────────
const SOCIAL_NETWORKS = [
  { key: 'facebook', label: 'Facebook', placeholder: 'https://facebook.com/yourpage' },
  { key: 'instagram', label: 'Instagram', placeholder: 'https://instagram.com/yourhandle' },
  { key: 'twitter', label: 'Twitter / X', placeholder: 'https://x.com/yourhandle' },
  { key: 'tiktok', label: 'TikTok', placeholder: 'https://tiktok.com/@yourhandle' },
  { key: 'youtube', label: 'YouTube', placeholder: 'https://youtube.com/@yourchannel' },
  { key: 'linkedin', label: 'LinkedIn', placeholder: 'https://linkedin.com/company/yours' },
  { key: 'pinterest', label: 'Pinterest', placeholder: 'https://pinterest.com/yourprofile' },
  { key: 'whatsapp', label: 'WhatsApp', placeholder: '+1234567890' },
] as const

function SocialFollowForm({
  config,
  onChange,
}: {
  config: Partial<SocialFollowConfig>
  onChange: (c: Partial<SocialFollowConfig>) => void
}) {
  const set = (key: keyof SocialFollowConfig, val: unknown) =>
    onChange({ ...config, [key]: val })

  const networks = config.networks ?? {}

  function setNetwork(key: string, val: string) {
    onChange({ ...config, networks: { ...networks, [key]: val } })
  }

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Network URLs</label>
        <div className="space-y-3">
          {SOCIAL_NETWORKS.map(({ key, label, placeholder }) => (
            <div key={key}>
              <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
              <input
                type="text"
                value={(networks as Record<string, string>)[key] ?? ''}
                onChange={e => setNetwork(key, e.target.value)}
                placeholder={placeholder}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Layout</label>
        <div className="flex gap-4 flex-wrap">
          {(['horizontal', 'vertical', 'grid'] as const).map(l => (
            <label key={l} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="sf-layout"
                checked={(config.layout ?? 'horizontal') === l}
                onChange={() => set('layout', l)}
              />
              <span className="text-sm text-gray-700 capitalize">{l}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Style</label>
        <div className="flex gap-4 flex-wrap">
          {(['filled', 'outline', 'minimal'] as const).map(s => (
            <label key={s} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="sf-style"
                checked={(config.style ?? 'filled') === s}
                onChange={() => set('style', s)}
              />
              <span className="text-sm text-gray-700 capitalize">{s}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
        <div className="flex gap-4">
          {(['small', 'medium', 'large'] as const).map(s => (
            <label key={s} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="sf-size"
                checked={(config.size ?? 'medium') === s}
                onChange={() => set('size', s)}
              />
              <span className="text-sm text-gray-700 capitalize">{s}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Label Type</label>
        <div className="flex gap-4 flex-wrap">
          {(['network_name', 'follow_us', 'custom'] as const).map(l => (
            <label key={l} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="sf-label-type"
                checked={(config.label_type ?? 'network_name') === l}
                onChange={() => set('label_type', l)}
              />
              <span className="text-sm text-gray-700 capitalize">{l.replace('_', ' ')}</span>
            </label>
          ))}
        </div>
      </div>

      {config.label_type === 'custom' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Custom Label</label>
          <input
            type="text"
            value={config.custom_label ?? ''}
            onChange={e => set('custom_label', e.target.value)}
            placeholder="Follow us"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Animation</label>
        <div className="flex gap-4 flex-wrap">
          {(['none', 'hover_grow', 'hover_bounce'] as const).map(a => (
            <label key={a} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="sf-anim"
                checked={(config.animation ?? 'hover_grow') === a}
                onChange={() => set('animation', a)}
              />
              <span className="text-sm text-gray-700 capitalize">{a.replace('_', ' ')}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Border Radius: {config.border_radius ?? 50}px
        </label>
        <input
          type="range"
          min={0}
          max={50}
          value={config.border_radius ?? 50}
          onChange={e => set('border_radius', parseInt(e.target.value))}
          className="w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
        <div className="flex gap-4">
          {(['light', 'dark'] as const).map(t => (
            <label key={t} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="sf-theme"
                checked={(config.theme ?? 'light') === t}
                onChange={() => set('theme', t)}
              />
              <span className="text-sm text-gray-700 capitalize">{t}</span>
            </label>
          ))}
        </div>
      </div>

      <label className="flex items-center justify-between cursor-pointer">
        <span className="text-sm text-gray-700">Show labels</span>
        <Toggle
          checked={config.show_labels !== false}
          onChange={v => set('show_labels', v)}
        />
      </label>
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
  const [autoPreview, setAutoPreview] = useState(false)
  const [previewSaving, setPreviewSaving] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const configRef = useRef(config)
  const nameRef = useRef(name)

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

  useEffect(() => { configRef.current = config }, [config])
  useEffect(() => { nameRef.current = name }, [name])

  async function saveAndRefresh(silent = false) {
    setPreviewSaving(true)
    const res = await fetch(`/api/widgets/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: nameRef.current, config: configRef.current }),
    })
    setPreviewSaving(false)
    if (res.ok) {
      if (!silent) showToast('Saved successfully', true)
      setPreviewKey(k => k + 1)
    } else if (!silent) {
      const data = await res.json()
      showToast(data.error ?? 'Save failed', false)
    }
  }

  function handleConfigChange(newConfig: Record<string, unknown>) {
    setConfig(newConfig)
    if (autoPreview) {
      if (debounceRef.current) clearTimeout(debounceRef.current)
      debounceRef.current = setTimeout(() => saveAndRefresh(true), 2000)
    }
  }

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
              onChange={c => handleConfigChange(c as Record<string, unknown>)}
            />
          )}
          {widget.type === 'testimonials' && (
            <TestimonialsForm
              config={config as Partial<TestimonialsConfig>}
              onChange={c => handleConfigChange(c as Record<string, unknown>)}
            />
          )}
          {widget.type === 'youtube_feed' && (
            <YouTubeFeedForm
              config={config as Partial<YouTubeFeedConfig>}
              onChange={c => handleConfigChange(c as Record<string, unknown>)}
            />
          )}
          {widget.type === 'countdown_timer' && (
            <CountdownTimerForm
              config={config as Partial<CountdownTimerConfig>}
              onChange={c => handleConfigChange(c as Record<string, unknown>)}
            />
          )}
          {widget.type === 'announcement_bar' && (
            <AnnouncementBarForm
              config={config as Partial<AnnouncementBarConfig>}
              onChange={c => handleConfigChange(c as Record<string, unknown>)}
            />
          )}
          {widget.type === 'google_reviews' && (
            <GoogleReviewsForm
              config={config as Partial<GoogleReviewsConfig>}
              onChange={c => handleConfigChange(c as Record<string, unknown>)}
            />
          )}
          {widget.type === 'contact_form' && (
            <ContactFormForm
              config={config as Partial<ContactFormConfig>}
              onChange={c => handleConfigChange(c as Record<string, unknown>)}
            />
          )}
          {widget.type === 'social_follow' && (
            <SocialFollowForm
              config={config as Partial<SocialFollowConfig>}
              onChange={c => handleConfigChange(c as Record<string, unknown>)}
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

        <div className="bg-white rounded-xl border border-gray-200 flex flex-col overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between gap-4">
            <h3 className="font-semibold text-gray-900 text-sm">Preview</h3>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-1.5 cursor-pointer text-xs text-gray-500">
                <button
                  type="button"
                  onClick={() => setAutoPreview(a => !a)}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${autoPreview ? 'bg-blue-600' : 'bg-gray-200'}`}
                >
                  <span className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow transition-transform ${autoPreview ? 'translate-x-[18px]' : 'translate-x-1'}`} />
                </button>
                Auto-preview
              </label>
              <button
                onClick={() => saveAndRefresh()}
                disabled={previewSaving}
                className="text-xs font-medium text-blue-600 hover:underline disabled:opacity-50"
              >
                {previewSaving ? 'Saving…' : 'Refresh preview'}
              </button>
            </div>
          </div>
          <iframe
            key={previewKey}
            src={`/widget-preview/${id}`}
            style={{ width: '100%', height: 500, border: 'none', background: '#f5f5f5' }}
            title="Widget preview"
          />
        </div>
      </div>
    </div>
  )
}

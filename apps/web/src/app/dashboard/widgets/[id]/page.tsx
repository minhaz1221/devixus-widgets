'use client'

import { useEffect, useState, useCallback, useMemo, useRef } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Copy, Check, Star, Trash2, Plus, Monitor, Smartphone, AlertTriangle, Lock, Code2 } from 'lucide-react'
import { generatePreviewHTML } from '@/lib/preview-renderer'
import type {
  Widget,
  WhatsAppConfig,
  TestimonialsConfig,
  YouTubeFeedConfig,
  CountdownTimerConfig,
  AnnouncementBarConfig,
  GoogleReviewsConfig,
  ContactFormConfig,
  SocialFollowConfig,
  InstagramFeedConfig,
  TikTokFeedConfig,
} from '@/types/widget'
import { ConfigSection } from '@/components/ui/ConfigSection'
import { ToggleSwitch } from '@/components/ui/ToggleSwitch'
import { ColorPicker } from '@/components/ui/ColorPicker'
import { RangeSlider } from '@/components/ui/RangeSlider'
import { OptionPicker } from '@/components/ui/OptionPicker'

const EMBED_ORIGIN = 'https://devixus-widgets-web.vercel.app'

// ── Shared input styles ────────────────────────────────────────────────────
const INPUT = 'w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-400'
const BTN_PRIMARY = 'px-3 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50 whitespace-nowrap transition-colors'

// ── Embed Code ─────────────────────────────────────────────────────────────
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
        <h3 className="font-semibold text-gray-900 text-sm">Embed Code</h3>
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

// ── Legacy Toggle (used inside old radio groups) ───────────────────────────
function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full toggle-track shrink-0 ${checked ? 'bg-indigo-600' : 'bg-gray-200'}`}
    >
      <span className={`toggle-thumb inline-block h-4 w-4 rounded-full bg-white shadow ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  )
}

// ── Radio group helper ─────────────────────────────────────────────────────
function RadioGroup<T extends string>({
  name, value, onChange, options,
}: {
  name: string
  value: T
  onChange: (v: T) => void
  options: { value: T; label: string }[]
}) {
  return (
    <div className="flex gap-4 flex-wrap">
      {options.map(o => (
        <label key={o.value} className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name={name}
            checked={value === o.value}
            onChange={() => onChange(o.value)}
            className="accent-indigo-600"
          />
          <span className="text-sm text-gray-700">{o.label}</span>
        </label>
      ))}
    </div>
  )
}

// ── WhatsApp form ──────────────────────────────────────────────────────────
function WhatsAppForm({ config, onChange }: { config: Partial<WhatsAppConfig>; onChange: (c: Partial<WhatsAppConfig>) => void }) {
  const set = (key: keyof WhatsAppConfig, val: unknown) => onChange({ ...config, [key]: val })

  return (
    <div className="space-y-6">
      <ConfigSection title="Account">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Phone Number <span className="text-gray-400 font-normal text-xs">(with country code)</span>
          </label>
          <input type="tel" value={config.phone_number ?? ''} onChange={e => set('phone_number', e.target.value)} placeholder="19175550100" className={INPUT} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Welcome Message</label>
          <textarea value={config.welcome_message ?? ''} onChange={e => set('welcome_message', e.target.value)} rows={3} className={`${INPUT} resize-none`} />
        </div>
      </ConfigSection>

      <ConfigSection title="Button">
        <ColorPicker label="Button Color" value={config.button_color ?? '#25D366'} onChange={v => set('button_color', v)} presets={['#25D366', '#128C7E', '#6366f1', '#8b5cf6', '#ef4444', '#3b82f6']} />
        <OptionPicker
          label="Position"
          value={config.position ?? 'bottom-right'}
          onChange={v => set('position', v)}
          columns={2}
          options={[
            { value: 'bottom-right', label: 'Bottom Right' },
            { value: 'bottom-left',  label: 'Bottom Left' },
          ]}
        />
        <OptionPicker
          label="Button Size"
          value={config.button_size ?? 'medium'}
          onChange={v => set('button_size', v)}
          columns={3}
          options={[
            { value: 'small',  label: 'Small' },
            { value: 'medium', label: 'Medium' },
            { value: 'large',  label: 'Large' },
          ]}
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Tooltip Text <span className="text-xs font-normal text-gray-400">(optional)</span></label>
          <input type="text" value={config.tooltip_text ?? ''} onChange={e => set('tooltip_text', e.target.value)} placeholder="Chat with us!" className={INPUT} />
        </div>
      </ConfigSection>

      <ConfigSection title="Behavior">
        <ToggleSwitch label="Show on mobile"  checked={config.show_on_mobile  !== false} onChange={v => set('show_on_mobile', v)} />
        <ToggleSwitch label="Show on desktop" checked={config.show_on_desktop !== false} onChange={v => set('show_on_desktop', v)} />
        <ToggleSwitch label="Pulse animation" checked={!!config.pulse_animation} onChange={v => set('pulse_animation', v)} />
        <OptionPicker
          label="Open in"
          value={config.open_in ?? 'new_tab'}
          onChange={v => set('open_in', v)}
          columns={2}
          options={[
            { value: 'new_tab',  label: 'New tab' },
            { value: 'same_tab', label: 'Same tab' },
          ]}
        />
      </ConfigSection>
    </div>
  )
}

// ── Testimonials form ──────────────────────────────────────────────────────
type Testimonial = TestimonialsConfig['testimonials'][0]
const BLANK_TESTIMONIAL: Testimonial = { author: '', role: '', content: '', rating: 5 }

function StarPicker({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(n => (
        <button key={n} type="button" onClick={() => onChange(n)}>
          <Star size={18} className={n <= value ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} />
        </button>
      ))}
    </div>
  )
}

function TestimonialsForm({ config, onChange }: { config: Partial<TestimonialsConfig>; onChange: (c: Partial<TestimonialsConfig>) => void }) {
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

  return (
    <div className="space-y-6">
      <ConfigSection title="Content">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Testimonials ({testimonials.length})</span>
            <button type="button" onClick={() => setAdding(a => !a)} className="inline-flex items-center gap-1 text-xs text-indigo-600 font-semibold hover:underline">
              <Plus size={13} /> Add
            </button>
          </div>
          {adding && (
            <div className="border border-indigo-200 bg-indigo-50 rounded-xl p-4 space-y-3 mb-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Author *</label>
                  <input value={draft.author} onChange={e => setDraft(d => ({ ...d, author: e.target.value }))} placeholder="Jane Smith" className={INPUT} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Role / Company</label>
                  <input value={draft.role} onChange={e => setDraft(d => ({ ...d, role: e.target.value }))} placeholder="CEO at Acme" className={INPUT} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Review *</label>
                <textarea value={draft.content} onChange={e => setDraft(d => ({ ...d, content: e.target.value }))} rows={2} placeholder="Amazing product!" className={`${INPUT} resize-none`} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Avatar URL (optional)</label>
                <input value={draft.avatar_url ?? ''} onChange={e => setDraft(d => ({ ...d, avatar_url: e.target.value }))} placeholder="https://example.com/avatar.jpg" className={INPUT} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Rating</label>
                  <StarPicker value={draft.rating} onChange={r => setDraft(d => ({ ...d, rating: r }))} />
                </div>
                <div className="flex gap-2">
                  <button type="button" onClick={() => { setAdding(false); setDraft({ ...BLANK_TESTIMONIAL }) }} className="px-3 py-1.5 text-xs font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50">Cancel</button>
                  <button type="button" onClick={addTestimonial} disabled={!draft.author || !draft.content} className="px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50">Add</button>
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
                <button type="button" onClick={() => onChange({ ...config, testimonials: testimonials.filter((_, idx) => idx !== i) })} className="shrink-0 text-gray-400 hover:text-red-500 transition-colors">
                  <Trash2 size={13} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </ConfigSection>

      <ConfigSection title="Layout">
        <OptionPicker label="Display Mode" value={config.layout ?? 'slider'} onChange={v => set('layout', v)} columns={2} options={[{ value: 'slider', label: 'Slider' }, { value: 'grid', label: 'Grid' }]} />
        {config.layout === 'grid' && (
          <OptionPicker label="Columns" value={String(config.columns ?? 2)} onChange={v => set('columns', Number(v))} columns={3} options={[{ value: '1', label: '1 Col' }, { value: '2', label: '2 Cols' }, { value: '3', label: '3 Cols' }]} />
        )}
      </ConfigSection>

      <ConfigSection title="Card Design">
        <OptionPicker label="Theme" value={config.theme ?? 'light'} onChange={v => set('theme', v)} columns={2} options={[{ value: 'light', label: 'Light' }, { value: 'dark', label: 'Dark' }]} />
        <OptionPicker label="Avatar Shape" value={config.avatar_shape ?? 'circle'} onChange={v => set('avatar_shape', v)} columns={3} options={[{ value: 'circle', label: 'Circle' }, { value: 'square', label: 'Square' }, { value: 'rounded', label: 'Rounded' }]} />
        <OptionPicker label="Card Shadow" value={config.card_shadow ?? 'none'} onChange={v => set('card_shadow', v)} columns={4} options={[{ value: 'none', label: 'None' }, { value: 'small', label: 'Small' }, { value: 'medium', label: 'Medium' }, { value: 'large', label: 'Large' }]} />
        <ToggleSwitch label="Show ratings" checked={config.show_rating !== false} onChange={v => set('show_rating', v)} />
        <ToggleSwitch label="Autoplay" checked={config.autoplay !== false} onChange={v => set('autoplay', v)} />
        <ToggleSwitch label="Show arrows" checked={config.show_arrows !== false} onChange={v => set('show_arrows', v)} />
        <ToggleSwitch label="Show dots" checked={!!config.show_dots} onChange={v => set('show_dots', v)} />
        <ToggleSwitch label="Show quote icon" checked={!!config.show_quote_icon} onChange={v => set('show_quote_icon', v)} />
      </ConfigSection>
    </div>
  )
}

// ── YouTube Feed form ──────────────────────────────────────────────────────
function YouTubeFeedForm({ config, onChange }: { config: Partial<YouTubeFeedConfig>; onChange: (c: Partial<YouTubeFeedConfig>) => void }) {
  const [channelUrl, setChannelUrl] = useState(config.channel_url ?? '')
  const [channelName, setChannelName] = useState('')
  const [fetching, setFetching] = useState(false)
  const [fetchError, setFetchError] = useState<string | null>(null)
  const set = (key: keyof YouTubeFeedConfig, val: unknown) => onChange({ ...config, [key]: val })

  async function fetchChannel() {
    if (!channelUrl.trim()) return
    setFetching(true); setFetchError(null)
    try {
      const res = await fetch(`/api/youtube/resolve?url=${encodeURIComponent(channelUrl.trim())}`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Failed to resolve channel')
      onChange({ ...config, channel_id: data.channel_id, channel_url: channelUrl.trim() })
      setChannelName(data.channel_name)
    } catch (err) {
      setFetchError(err instanceof Error ? err.message : 'Failed to resolve channel')
    } finally { setFetching(false) }
  }

  return (
    <div className="space-y-6">
      <ConfigSection title="Channel">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">YouTube Channel URL</label>
          <div className="flex gap-2">
            <input value={channelUrl} onChange={e => setChannelUrl(e.target.value)} onKeyDown={e => e.key === 'Enter' && fetchChannel()} placeholder="https://youtube.com/@channelname" className={`${INPUT} flex-1`} />
            <button type="button" onClick={fetchChannel} disabled={!channelUrl.trim() || fetching} className={BTN_PRIMARY}>{fetching ? '…' : 'Fetch'}</button>
          </div>
          {config.channel_id && <p className="text-xs text-green-600 mt-1.5 flex items-center gap-1"><Check size={12} /> {channelName || config.channel_id}</p>}
          {fetchError && <p className="text-xs text-red-600 mt-1.5">{fetchError}</p>}
        </div>
        {!config.channel_id && (
          <div className="flex items-center gap-2 px-3 py-2.5 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-700 font-medium">
            <AlertTriangle size={13} className="shrink-0 text-amber-500" />
            Using sample data — enter your YouTube channel URL above to see live videos
          </div>
        )}
        <ToggleSwitch label="Show channel header" checked={config.header_style !== 'none'} onChange={v => set('header_style', v ? 'full' : 'none')} />
      </ConfigSection>

      <ConfigSection title="Layout">
        <OptionPicker label="Display Mode" value={config.layout ?? 'grid'} onChange={v => set('layout', v)} columns={3} options={[{ value: 'grid', label: 'Grid' }, { value: 'list', label: 'List' }, { value: 'carousel', label: 'Carousel' }]} />
        {(config.layout ?? 'grid') === 'grid' && (
          <OptionPicker label="Columns" value={String(config.columns ?? 3)} onChange={v => set('columns', Number(v))} columns={3} options={[{ value: '2', label: '2' }, { value: '3', label: '3' }, { value: '4', label: '4' }]} />
        )}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Max Videos</label>
          <select value={config.max_results ?? 6} onChange={e => set('max_results', parseInt(e.target.value))} className={INPUT}>
            {[3, 6, 9, 12].map(n => <option key={n} value={n}>{n} videos</option>)}
          </select>
        </div>
      </ConfigSection>

      <ConfigSection title="Card Options">
        <ToggleSwitch label="Show title"           checked={config.show_title !== false}             onChange={v => set('show_title', v)} />
        <ToggleSwitch label="Show publish date"    checked={config.show_date !== false}              onChange={v => set('show_date', v)} />
        <ToggleSwitch label="Show view count"      checked={!!config.show_view_count}                onChange={v => set('show_view_count', v)} />
        <ToggleSwitch label="Show subscriber count" checked={config.show_subscriber_count !== false} onChange={v => set('show_subscriber_count', v)} />
      </ConfigSection>

      <ConfigSection title="Colors &amp; Theme">
        <OptionPicker label="Theme" value={config.theme ?? 'light'} onChange={v => set('theme', v)} columns={2} options={[{ value: 'light', label: 'Light' }, { value: 'dark', label: 'Dark' }]} />
        <ColorPicker label="Accent Color" value={config.accent_color ?? '#ff0000'} onChange={v => set('accent_color', v)} presets={['#ff0000', '#6366f1', '#10b981', '#f59e0b', '#ec4899', '#3b82f6']} />
        <ColorPicker label="Subscribe Button" value={config.subscribe_button_color ?? '#ff0000'} onChange={v => set('subscribe_button_color', v)} presets={['#ff0000', '#6366f1', '#10b981', '#f59e0b', '#ec4899', '#3b82f6']} />
      </ConfigSection>
    </div>
  )
}

// ── Countdown Timer form ───────────────────────────────────────────────────
function CountdownTimerForm({ config, onChange }: { config: Partial<CountdownTimerConfig>; onChange: (c: Partial<CountdownTimerConfig>) => void }) {
  const set = (key: keyof CountdownTimerConfig, val: unknown) => onChange({ ...config, [key]: val })

  return (
    <div className="space-y-6">
      <ConfigSection title="Target">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Title</label>
          <input type="text" value={config.title ?? ''} onChange={e => set('title', e.target.value)} placeholder="Sale ends in" className={INPUT} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Target Date</label>
            <input type="date" value={config.target_date ?? ''} onChange={e => set('target_date', e.target.value)} className={INPUT} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Target Time</label>
            <input type="time" value={config.target_time ?? ''} onChange={e => set('target_time', e.target.value)} className={INPUT} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Timezone</label>
          <select value={config.timezone ?? 'UTC'} onChange={e => set('timezone', e.target.value)} className={INPUT}>
            {['UTC', 'America/New_York', 'America/Los_Angeles', 'Europe/London', 'Europe/Paris', 'Asia/Tokyo', 'Australia/Sydney'].map(tz => (
              <option key={tz} value={tz}>{tz}</option>
            ))}
          </select>
        </div>
      </ConfigSection>

      <ConfigSection title="Layout">
        <OptionPicker label="Style" value={config.style ?? 'blocks'} onChange={v => set('style', v)} columns={3} options={[{ value: 'blocks', label: 'Blocks' }, { value: 'minimal', label: 'Minimal' }, { value: 'flip', label: 'Flip' }]} />
        <OptionPicker label="Theme" value={config.theme ?? 'light'} onChange={v => set('theme', v)} columns={2} options={[{ value: 'light', label: 'Light' }, { value: 'dark', label: 'Dark' }]} />
      </ConfigSection>

      <ConfigSection title="Labels">
        <ToggleSwitch label="Show days"    checked={config.show_days    !== false} onChange={v => set('show_days', v)} />
        <ToggleSwitch label="Show hours"   checked={config.show_hours   !== false} onChange={v => set('show_hours', v)} />
        <ToggleSwitch label="Show minutes" checked={config.show_minutes !== false} onChange={v => set('show_minutes', v)} />
        <ToggleSwitch label="Show seconds" checked={config.show_seconds !== false} onChange={v => set('show_seconds', v)} />
        <ToggleSwitch label="Show labels"  checked={config.show_labels  !== false} onChange={v => set('show_labels', v)} />
      </ConfigSection>

      <ConfigSection title="Design">
        <ColorPicker label="Accent Color" value={config.accent_color ?? '#8b5cf6'} onChange={v => set('accent_color', v)} />
        <ColorPicker label="Background"   value={config.bg_color    ?? '#ffffff'} onChange={v => set('bg_color', v)} />
        <ColorPicker label="Text Color"   value={config.text_color  ?? '#1a1a1a'} onChange={v => set('text_color', v)} />
        <OptionPicker label="Font Family" value={config.font_family ?? 'system'} onChange={v => set('font_family', v)} columns={3} options={[{ value: 'system', label: 'System' }, { value: 'mono', label: 'Mono' }, { value: 'serif', label: 'Serif' }]} />
        <OptionPicker label="Separator" value={config.separator_style ?? 'colon'} onChange={v => set('separator_style', v)} columns={4} options={[{ value: 'colon', label: ':' }, { value: 'slash', label: '/' }, { value: 'dot', label: '·' }, { value: 'none', label: 'None' }]} />
      </ConfigSection>

      <ConfigSection title="Actions">
        <OptionPicker label="When timer expires" value={config.expire_action ?? 'message'} onChange={v => set('expire_action', v)} columns={2} options={[{ value: 'nothing', label: 'Do nothing' }, { value: 'message', label: 'Show message' }, { value: 'redirect', label: 'Redirect' }, { value: 'hide', label: 'Hide widget' }]} />
        {config.expire_action === 'message' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Expired Message</label>
            <input type="text" value={config.expired_message ?? ''} onChange={e => set('expired_message', e.target.value)} placeholder="This offer has ended" className={INPUT} />
          </div>
        )}
        {config.expire_action === 'redirect' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Redirect URL</label>
            <input type="url" value={config.redirect_url ?? ''} onChange={e => set('redirect_url', e.target.value)} placeholder="https://example.com" className={INPUT} />
          </div>
        )}
      </ConfigSection>
    </div>
  )
}

// ── Announcement Bar form ──────────────────────────────────────────────────
function AnnouncementBarForm({ config, onChange }: { config: Partial<AnnouncementBarConfig>; onChange: (c: Partial<AnnouncementBarConfig>) => void }) {
  const set = (key: keyof AnnouncementBarConfig, val: unknown) => onChange({ ...config, [key]: val })

  return (
    <div className="space-y-6">
      <ConfigSection title="Content">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
          <input type="text" value={config.message ?? ''} onChange={e => set('message', e.target.value)} placeholder="🎉 Special offer — Limited time only!" className={INPUT} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Link Text</label>
            <input type="text" value={config.link_text ?? ''} onChange={e => set('link_text', e.target.value)} placeholder="Shop now" className={INPUT} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Link URL</label>
            <input type="url" value={config.link_url ?? ''} onChange={e => set('link_url', e.target.value)} placeholder="https://example.com" className={INPUT} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Emoji</label>
          <input type="text" value={config.emoji ?? ''} onChange={e => set('emoji', e.target.value)} placeholder="🎉" maxLength={4} className={`${INPUT} w-20`} />
        </div>
      </ConfigSection>

      <ConfigSection title="Style">
        <OptionPicker label="Position" value={config.position ?? 'top'} onChange={v => set('position', v)} columns={2} options={[{ value: 'top', label: 'Top' }, { value: 'bottom', label: 'Bottom' }]} />
        <OptionPicker label="Style" value={config.style ?? 'solid'} onChange={v => set('style', v)} columns={3} options={[{ value: 'solid', label: 'Solid' }, { value: 'gradient', label: 'Gradient' }, { value: 'striped', label: 'Striped' }]} />
        <ColorPicker label="Background Color" value={config.bg_color   ?? '#6366f1'} onChange={v => set('bg_color', v)} />
        <ColorPicker label="Text Color"       value={config.text_color ?? '#ffffff'} onChange={v => set('text_color', v)} />
        <ColorPicker label="Link Color"       value={config.link_color ?? '#ffffff'} onChange={v => set('link_color', v)} />
      </ConfigSection>

      <ConfigSection title="Behavior">
        <ToggleSwitch label="Show emoji"         checked={config.show_emoji         !== false} onChange={v => set('show_emoji', v)} />
        <ToggleSwitch label="Show close button"  checked={config.show_close_button  !== false} onChange={v => set('show_close_button', v)} />
        <ToggleSwitch label="Sticky (fixed position)" checked={config.is_sticky !== false} onChange={v => set('is_sticky', v)} />
      </ConfigSection>
    </div>
  )
}

// ── Google Reviews form ────────────────────────────────────────────────────
interface PlaceResult { place_id: string; name: string; address: string; rating: number; total_ratings: number }

function GoogleReviewsForm({ config, onChange }: { config: Partial<GoogleReviewsConfig>; onChange: (c: Partial<GoogleReviewsConfig>) => void }) {
  const [query, setQuery] = useState('')
  const [searching, setSearching] = useState(false)
  const [results, setResults] = useState<PlaceResult[]>([])
  const [searchError, setSearchError] = useState<string | null>(null)
  const set = (key: keyof GoogleReviewsConfig, val: unknown) => onChange({ ...config, [key]: val })

  async function handleSearch() {
    if (!query.trim()) return
    setSearching(true); setSearchError(null); setResults([])
    try {
      const res = await fetch(`/api/google-reviews/search?query=${encodeURIComponent(query.trim())}`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Search failed')
      setResults(data.results ?? [])
      if ((data.results ?? []).length === 0) setSearchError('No businesses found.')
    } catch (err) {
      setSearchError(err instanceof Error ? err.message : 'Search failed')
    } finally { setSearching(false) }
  }

  function selectPlace(place: PlaceResult) {
    onChange({ ...config, place_id: place.place_id, place_name: place.name, place_address: place.address })
    setResults([]); setQuery('')
  }

  return (
    <div className="space-y-6">
      <ConfigSection title="Business">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Business Name</label>
          <div className="flex gap-2">
            <input value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSearch()} placeholder="e.g. Acme Coffee Shop, New York" className={`${INPUT} flex-1`} />
            <button type="button" onClick={handleSearch} disabled={!query.trim() || searching} className={BTN_PRIMARY}>{searching ? '…' : 'Search'}</button>
          </div>
          {config.place_id && <p className="text-xs text-green-600 mt-1.5 flex items-center gap-1"><Check size={12} /> {config.place_name || config.place_id}{config.place_address && <span className="text-gray-400 ml-1">— {config.place_address}</span>}</p>}
          {searchError && <p className="text-xs text-red-600 mt-1.5">{searchError}</p>}
          {results.length > 0 && (
            <ul className="mt-2 border border-gray-200 rounded-lg overflow-hidden divide-y divide-gray-100 shadow-sm">
              {results.map(r => (
                <li key={r.place_id}>
                  <button type="button" onClick={() => selectPlace(r)} className="w-full text-left px-3 py-2.5 hover:bg-indigo-50 transition-colors">
                    <p className="text-sm font-medium text-gray-800">{r.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{r.address}</p>
                    {r.rating > 0 && <p className="text-xs text-yellow-600 mt-0.5">{'★'.repeat(Math.round(r.rating))} {r.rating} · {r.total_ratings} reviews</p>}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </ConfigSection>

      <ConfigSection title="Display">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Minimum Rating</label>
          <select value={config.min_rating ?? 1} onChange={e => set('min_rating', parseInt(e.target.value) as 1|2|3|4|5)} className={INPUT}>
            {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}+ stars</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Max Reviews</label>
          <select value={config.max_reviews ?? 6} onChange={e => set('max_reviews', parseInt(e.target.value))} className={INPUT}>
            {[3,6,9,12].map(n => <option key={n} value={n}>{n} reviews</option>)}
          </select>
        </div>
        <OptionPicker label="Layout" value={config.layout ?? 'grid'} onChange={v => set('layout', v)} columns={3} options={[{ value: 'grid', label: 'Grid' }, { value: 'list', label: 'List' }, { value: 'carousel', label: 'Carousel' }]} />
        <OptionPicker label="Theme" value={config.theme ?? 'light'} onChange={v => set('theme', v)} columns={2} options={[{ value: 'light', label: 'Light' }, { value: 'dark', label: 'Dark' }]} />
        <ColorPicker label="Accent Color" value={config.accent_color ?? '#4285f4'} onChange={v => set('accent_color', v)} />
      </ConfigSection>

      <ConfigSection title="Card">
        <ToggleSwitch label="Show header"          checked={config.show_header         !== false} onChange={v => set('show_header', v)} />
        <ToggleSwitch label="Show overall rating"  checked={config.show_overall_rating !== false} onChange={v => set('show_overall_rating', v)} />
        <ToggleSwitch label="Show review date"     checked={config.show_review_date    !== false} onChange={v => set('show_review_date', v)} />
        <ToggleSwitch label="Show reviewer photo"  checked={config.show_reviewer_photo !== false} onChange={v => set('show_reviewer_photo', v)} />
        <ToggleSwitch label={'Show "Write a review" link'} checked={config.write_review_link !== false} onChange={v => set('write_review_link', v)} />
      </ConfigSection>
    </div>
  )
}

// ── Contact Form form ──────────────────────────────────────────────────────
function ContactFormForm({ config, onChange }: { config: Partial<ContactFormConfig>; onChange: (c: Partial<ContactFormConfig>) => void }) {
  const set = (key: keyof ContactFormConfig, val: unknown) => onChange({ ...config, [key]: val })
  const fields   = config.fields          ?? { name: true, email: true, phone: false, subject: false, message: true }
  const required = config.required_fields ?? { name: true, email: true, phone: false, subject: false, message: true }

  return (
    <div className="space-y-6">
      <ConfigSection title="Content">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Form Title</label>
          <input type="text" value={config.title ?? ''} onChange={e => set('title', e.target.value)} placeholder="Contact Us" className={INPUT} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Subtitle</label>
          <input type="text" value={config.subtitle ?? ''} onChange={e => set('subtitle', e.target.value)} placeholder="Send us a message..." className={INPUT} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Recipient Email <span className="text-red-500">*</span></label>
          <input type="email" value={config.recipient_email ?? ''} onChange={e => set('recipient_email', e.target.value)} placeholder="you@example.com" className={INPUT} />
          <p className="text-xs text-gray-400 mt-1">Form submissions sent to this address.</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Button Text</label>
          <input type="text" value={config.button_text ?? ''} onChange={e => set('button_text', e.target.value)} placeholder="Send Message" className={INPUT} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Success Message</label>
          <input type="text" value={config.success_message ?? ''} onChange={e => set('success_message', e.target.value)} placeholder="Thank you!" className={INPUT} />
        </div>
      </ConfigSection>

      <ConfigSection title="Fields">
        <div className="space-y-2">
          {(['name', 'email', 'phone', 'subject', 'message'] as const).map(f => (
            <div key={f} className="flex items-center justify-between py-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={!!fields[f]} onChange={e => onChange({ ...config, fields: { ...fields, [f]: e.target.checked } })} className="rounded accent-indigo-600" />
                <span className="text-sm text-gray-700 capitalize">{f}</span>
              </label>
              {fields[f] && (
                <label className="flex items-center gap-1 text-xs text-gray-500 cursor-pointer">
                  <input type="checkbox" checked={!!required[f]} onChange={e => onChange({ ...config, required_fields: { ...required, [f]: e.target.checked } })} className="rounded accent-indigo-600" />
                  Required
                </label>
              )}
            </div>
          ))}
        </div>
      </ConfigSection>

      <ConfigSection title="Design">
        <OptionPicker label="Display Mode" value={config.display_mode ?? 'inline'} onChange={v => set('display_mode', v)} columns={2} options={[{ value: 'inline', label: 'Inline' }, { value: 'popup', label: 'Popup' }]} />
        {config.display_mode === 'popup' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Trigger Button Text</label>
            <input type="text" value={config.trigger_text ?? ''} onChange={e => set('trigger_text', e.target.value)} placeholder="✉ Contact Us" className={INPUT} />
          </div>
        )}
        <OptionPicker label="Theme" value={config.theme ?? 'light'} onChange={v => set('theme', v)} columns={2} options={[{ value: 'light', label: 'Light' }, { value: 'dark', label: 'Dark' }]} />
        <ColorPicker label="Accent Color" value={config.accent_color ?? '#6366f1'} onChange={v => set('accent_color', v)} />
        <RangeSlider label="Border Radius" value={config.border_radius ?? 8} onChange={v => set('border_radius', v)} min={0} max={20} unit="px" />
      </ConfigSection>
    </div>
  )
}

// ── Social Follow form ─────────────────────────────────────────────────────
const SOCIAL_NETWORKS = [
  { key: 'facebook',  label: 'Facebook',   placeholder: 'https://facebook.com/yourpage' },
  { key: 'instagram', label: 'Instagram',  placeholder: 'https://instagram.com/yourhandle' },
  { key: 'twitter',   label: 'Twitter / X',placeholder: 'https://x.com/yourhandle' },
  { key: 'tiktok',    label: 'TikTok',     placeholder: 'https://tiktok.com/@yourhandle' },
  { key: 'youtube',   label: 'YouTube',    placeholder: 'https://youtube.com/@yourchannel' },
  { key: 'linkedin',  label: 'LinkedIn',   placeholder: 'https://linkedin.com/company/yours' },
  { key: 'pinterest', label: 'Pinterest',  placeholder: 'https://pinterest.com/yourprofile' },
  { key: 'whatsapp',  label: 'WhatsApp',   placeholder: '+1234567890' },
] as const

function SocialFollowForm({ config, onChange }: { config: Partial<SocialFollowConfig>; onChange: (c: Partial<SocialFollowConfig>) => void }) {
  const set = (key: keyof SocialFollowConfig, val: unknown) => onChange({ ...config, [key]: val })
  const networks = config.networks ?? {}

  return (
    <div className="space-y-6">
      <ConfigSection title="Platforms">
        <div className="space-y-3">
          {SOCIAL_NETWORKS.map(({ key, label, placeholder }) => (
            <div key={key}>
              <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
              <input type="text" value={(networks as Record<string, string>)[key] ?? ''} onChange={e => onChange({ ...config, networks: { ...networks, [key]: e.target.value } })} placeholder={placeholder} className={INPUT} />
            </div>
          ))}
        </div>
      </ConfigSection>

      <ConfigSection title="Layout">
        <OptionPicker label="Layout" value={config.layout ?? 'horizontal'} onChange={v => set('layout', v)} columns={3} options={[{ value: 'horizontal', label: 'Horizontal' }, { value: 'vertical', label: 'Vertical' }, { value: 'grid', label: 'Grid' }]} />
        <OptionPicker label="Style" value={config.style ?? 'filled'} onChange={v => set('style', v)} columns={3} options={[{ value: 'filled', label: 'Filled' }, { value: 'outline', label: 'Outline' }, { value: 'minimal', label: 'Minimal' }]} />
        <OptionPicker label="Size" value={config.size ?? 'medium'} onChange={v => set('size', v)} columns={3} options={[{ value: 'small', label: 'Small' }, { value: 'medium', label: 'Medium' }, { value: 'large', label: 'Large' }]} />
        <OptionPicker label="Label Type" value={config.label_type ?? 'network_name'} onChange={v => set('label_type', v)} columns={3} options={[{ value: 'network_name', label: 'Network' }, { value: 'follow_us', label: 'Follow Us' }, { value: 'custom', label: 'Custom' }]} />
        {config.label_type === 'custom' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Custom Label</label>
            <input type="text" value={config.custom_label ?? ''} onChange={e => set('custom_label', e.target.value)} placeholder="Follow us" className={INPUT} />
          </div>
        )}
      </ConfigSection>

      <ConfigSection title="Design">
        <OptionPicker label="Theme" value={config.theme ?? 'light'} onChange={v => set('theme', v)} columns={2} options={[{ value: 'light', label: 'Light' }, { value: 'dark', label: 'Dark' }]} />
        <OptionPicker label="Animation" value={config.animation ?? 'hover_grow'} onChange={v => set('animation', v)} columns={3} options={[{ value: 'none', label: 'None' }, { value: 'hover_grow', label: 'Grow' }, { value: 'hover_bounce', label: 'Bounce' }]} />
        <RangeSlider label="Border Radius" value={config.border_radius ?? 50} onChange={v => set('border_radius', v)} min={0} max={50} unit="px" />
        <ToggleSwitch label="Show labels" checked={config.show_labels !== false} onChange={v => set('show_labels', v)} />
      </ConfigSection>
    </div>
  )
}

// ── Instagram Feed form ────────────────────────────────────────────────────
function InstagramFeedForm({ config, onChange }: { config: Partial<InstagramFeedConfig>; onChange: (c: Partial<InstagramFeedConfig>) => void }) {
  const set = (key: keyof InstagramFeedConfig, val: unknown) => onChange({ ...config, [key]: val })

  return (
    <div className="space-y-6">
      <ConfigSection title="Account">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Instagram Username</label>
          <input type="text" value={config.username ?? ''} onChange={e => set('username', e.target.value)} placeholder="@yourusername" className={INPUT} />
        </div>
      </ConfigSection>

      <ConfigSection title="Layout">
        <OptionPicker label="Display Mode" value={config.layout ?? 'grid'} onChange={v => set('layout', v)} columns={3} options={[{ value: 'grid', label: 'Grid' }, { value: 'carousel', label: 'Carousel' }, { value: 'masonry', label: 'Masonry' }]} />
        <OptionPicker label="Columns" value={String(config.columns ?? 3)} onChange={v => set('columns', Number(v))} columns={3} options={[{ value: '2', label: '2' }, { value: '3', label: '3' }, { value: '4', label: '4' }]} />
        <OptionPicker label="Posts" value={String(config.num_posts ?? 9)} onChange={v => set('num_posts', Number(v))} columns={4} options={[{ value: '6', label: '6' }, { value: '9', label: '9' }, { value: '12', label: '12' }, { value: '15', label: '15' }]} />
        <OptionPicker label="Gap" value={config.gap ?? '8px'} onChange={v => set('gap', v)} columns={4} options={[{ value: '4px', label: '4px' }, { value: '8px', label: '8px' }, { value: '12px', label: '12px' }, { value: '16px', label: '16px' }]} />
        <OptionPicker label="Border Radius" value={config.border_radius ?? '8px'} onChange={v => set('border_radius', v)} columns={4} options={[{ value: '0px', label: 'None' }, { value: '8px', label: 'SM' }, { value: '16px', label: 'MD' }, { value: 'round', label: 'Full' }]} />
      </ConfigSection>

      <ConfigSection title="Display">
        <ToggleSwitch label="Show caption"         checked={!!config.show_caption}           onChange={v => set('show_caption', v)} />
        <ToggleSwitch label="Show likes count"     checked={config.show_likes      !== false} onChange={v => set('show_likes', v)} />
        <ToggleSwitch label="Show video play icon" checked={config.show_video_icon !== false} onChange={v => set('show_video_icon', v)} />
        <OptionPicker label="Link Behavior" value={config.link_behavior ?? 'instagram'} onChange={v => set('link_behavior', v)} columns={3} options={[{ value: 'instagram', label: 'Instagram' }, { value: 'lightbox', label: 'Lightbox' }, { value: 'none', label: 'None' }]} />
        <OptionPicker label="Theme" value={config.theme ?? 'light'} onChange={v => set('theme', v)} columns={3} options={[{ value: 'light', label: 'Light' }, { value: 'dark', label: 'Dark' }, { value: 'auto', label: 'Auto' }]} />
      </ConfigSection>
    </div>
  )
}

// ── TikTok Feed form ───────────────────────────────────────────────────────
function TikTokFeedForm({ config, onChange }: { config: Partial<TikTokFeedConfig>; onChange: (c: Partial<TikTokFeedConfig>) => void }) {
  const set = (key: keyof TikTokFeedConfig, val: unknown) => onChange({ ...config, [key]: val })

  return (
    <div className="space-y-6">
      <ConfigSection title="Account">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">TikTok Username</label>
          <input type="text" value={config.username ?? ''} onChange={e => set('username', e.target.value)} placeholder="@yourusername" className={INPUT} />
        </div>
      </ConfigSection>

      <ConfigSection title="Layout">
        <OptionPicker label="Display Mode" value={config.layout ?? 'grid'} onChange={v => set('layout', v)} columns={3} options={[{ value: 'grid', label: 'Grid' }, { value: 'carousel', label: 'Carousel' }, { value: 'list', label: 'List' }]} />
        {(config.layout ?? 'grid') !== 'list' && (
          <OptionPicker label="Columns" value={String(config.columns ?? 3)} onChange={v => set('columns', Number(v))} columns={3} options={[{ value: '2', label: '2' }, { value: '3', label: '3' }, { value: '4', label: '4' }]} />
        )}
        <OptionPicker label="Videos" value={String(config.num_videos ?? 9)} onChange={v => set('num_videos', Number(v))} columns={3} options={[{ value: '6', label: '6' }, { value: '9', label: '9' }, { value: '12', label: '12' }]} />
        <OptionPicker label="Gap" value={config.gap ?? '8px'} onChange={v => set('gap', v)} columns={4} options={[{ value: '4px', label: '4px' }, { value: '8px', label: '8px' }, { value: '12px', label: '12px' }, { value: '16px', label: '16px' }]} />
        <OptionPicker label="Border Radius" value={config.border_radius ?? '8px'} onChange={v => set('border_radius', v)} columns={4} options={[{ value: '0px', label: 'None' }, { value: '8px', label: 'SM' }, { value: '16px', label: 'MD' }, { value: 'round', label: 'Full' }]} />
      </ConfigSection>

      <ConfigSection title="Display">
        <ToggleSwitch label="Show duration"      checked={config.show_duration    !== false} onChange={v => set('show_duration', v)} />
        <ToggleSwitch label="Show view count"    checked={config.show_view_count  !== false} onChange={v => set('show_view_count', v)} />
        <ToggleSwitch label="Show like count"    checked={config.show_like_count  !== false} onChange={v => set('show_like_count', v)} />
        <ToggleSwitch label="Show caption"       checked={!!config.show_caption}             onChange={v => set('show_caption', v)} />
        <ToggleSwitch label="Autoplay on hover"  checked={!!config.autoplay_on_hover}        onChange={v => set('autoplay_on_hover', v)} />
        <OptionPicker label="Theme" value={config.theme ?? 'light'} onChange={v => set('theme', v)} columns={3} options={[{ value: 'light', label: 'Light' }, { value: 'dark', label: 'Dark' }, { value: 'auto', label: 'Auto' }]} />
      </ConfigSection>
    </div>
  )
}

type ConfigTab = 'settings' | 'css'

// ── Widget templates ───────────────────────────────────────────────────────
const WIDGET_TEMPLATES: Record<string, { name: string; config: Record<string, unknown> }[]> = {
  testimonials: [
    { name: 'Minimal', config: { layout: 'grid', columns: 2, theme: 'light', card_shadow: 'none', show_quote_icon: false, avatar_shape: 'circle' } },
    { name: 'Cards',   config: { layout: 'grid', columns: 3, theme: 'light', card_shadow: 'medium', show_quote_icon: true, avatar_shape: 'rounded' } },
    { name: 'Dark Slider', config: { layout: 'slider', theme: 'dark', card_shadow: 'large', show_quote_icon: true, show_arrows: true, show_dots: true, avatar_shape: 'circle' } },
  ],
  youtube_feed: [
    { name: 'Classic Grid', config: { layout: 'grid', columns: 3, theme: 'light', header_style: 'full', show_title: true, show_date: true } },
    { name: 'Dark List',    config: { layout: 'list',  columns: 1, theme: 'dark',  header_style: 'full', show_title: true, show_date: true } },
    { name: 'Carousel',     config: { layout: 'carousel', columns: 3, theme: 'light', header_style: 'none', show_title: true, show_date: false } },
  ],
  google_reviews: [
    { name: 'Clean Grid',    config: { layout: 'grid',     theme: 'light', show_header: true,  show_overall_rating: true,  min_rating: 4 } },
    { name: 'Dark Cards',    config: { layout: 'grid',     theme: 'dark',  show_header: true,  show_overall_rating: true,  min_rating: 4 } },
    { name: 'Carousel',      config: { layout: 'carousel', theme: 'light', show_header: false, show_overall_rating: false, min_rating: 5 } },
  ],
  countdown_timer: [
    { name: 'Product Launch', config: { style: 'blocks', theme: 'light', title: 'Product launches in', accent_color: '#6366f1' } },
    { name: 'Sale Ends',      config: { style: 'flip',   theme: 'dark',  title: 'Sale ends in',       accent_color: '#ef4444' } },
    { name: 'Event',          config: { style: 'minimal', theme: 'light', title: 'Event starts in',   accent_color: '#10b981' } },
  ],
  contact_form: [
    { name: 'Simple',   config: { theme: 'light', display_mode: 'inline', accent_color: '#6366f1', border_radius: 8,  fields: { name: true, email: true, phone: false, subject: false, message: true } } },
    { name: 'Full',     config: { theme: 'light', display_mode: 'inline', accent_color: '#10b981', border_radius: 12, fields: { name: true, email: true, phone: true, subject: true, message: true } } },
    { name: 'Dark Popup', config: { theme: 'dark', display_mode: 'popup', accent_color: '#8b5cf6', border_radius: 16, trigger_text: '✉ Get in touch', fields: { name: true, email: true, phone: false, subject: false, message: true } } },
  ],
  whatsapp: [
    { name: 'Classic',  config: { button_color: '#25D366', button_size: 'medium', position: 'bottom-right', pulse_animation: false } },
    { name: 'Pulsing',  config: { button_color: '#25D366', button_size: 'large',  position: 'bottom-right', pulse_animation: true,  tooltip_text: 'Chat with us!' } },
    { name: 'Indigo',   config: { button_color: '#6366f1', button_size: 'medium', position: 'bottom-right', pulse_animation: false, tooltip_text: 'Need help?' } },
  ],
  announcement_bar: [
    { name: 'Sale',    config: { style: 'solid',    bg_color: '#ef4444', text_color: '#ffffff', position: 'top', is_sticky: true, show_close_button: true } },
    { name: 'Info',    config: { style: 'gradient', bg_color: '#6366f1', text_color: '#ffffff', position: 'top', is_sticky: true, show_close_button: true } },
    { name: 'Subtle',  config: { style: 'solid',    bg_color: '#1e293b', text_color: '#94a3b8', position: 'top', is_sticky: false, show_close_button: false } },
  ],
  social_follow: [
    { name: 'Filled',   config: { style: 'filled',  layout: 'horizontal', size: 'medium', show_labels: true,  animation: 'hover_grow',   border_radius: 8 } },
    { name: 'Outline',  config: { style: 'outline', layout: 'horizontal', size: 'medium', show_labels: true,  animation: 'hover_bounce',  border_radius: 50 } },
    { name: 'Icons Only', config: { style: 'filled', layout: 'horizontal', size: 'large',  show_labels: false, animation: 'hover_grow',   border_radius: 50 } },
  ],
  instagram_feed: [
    { name: 'Square Grid',  config: { layout: 'grid',     columns: 3, gap: '8px',  border_radius: '0px',  show_likes: false } },
    { name: 'Rounded Cards', config: { layout: 'grid',    columns: 3, gap: '12px', border_radius: '16px', show_likes: true } },
    { name: 'Masonry',       config: { layout: 'masonry', columns: 3, gap: '8px',  border_radius: '8px',  show_likes: true, show_caption: true } },
  ],
  tiktok_feed: [
    { name: 'Grid',     config: { layout: 'grid',     columns: 3, gap: '8px',  border_radius: '8px',  show_duration: true, show_view_count: true } },
    { name: 'Carousel', config: { layout: 'carousel', columns: 3, gap: '12px', border_radius: '16px', show_duration: true, show_view_count: true } },
    { name: 'List',     config: { layout: 'list',     columns: 1, gap: '8px',  border_radius: '8px',  show_duration: true, show_caption: true } },
  ],
}

// ── Main configurator page ─────────────────────────────────────────────────
export default function ConfiguratorPage() {
  const { id } = useParams<{ id: string }>()
  const [widget, setWidget] = useState<Widget | null>(null)
  const [config, setConfig] = useState<Record<string, unknown>>({})
  const [name, setName] = useState('')
  const [saving, setSaving] = useState(false)
  const [autoSaveStatus, setAutoSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null)
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop')
  const [previewBg, setPreviewBg] = useState('#f3f4f6')
  const [configTab, setConfigTab] = useState<ConfigTab>('settings')
  const [planName, setPlanName] = useState<string>('free')
  const configRef  = useRef<Record<string, unknown>>({})
  const nameRef    = useRef<string>('')
  const widgetRef  = useRef<Widget | null>(null)
  const autoSaveRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const showToast = (msg: string, ok: boolean) => {
    setToast({ msg, ok })
    setTimeout(() => setToast(null), 3000)
  }

  const load = useCallback(async () => {
    const res = await fetch(`/api/widgets/${id}`)
    if (!res.ok) return
    const { widget } = await res.json()
    widgetRef.current = widget
    configRef.current = widget.config ?? {}
    nameRef.current   = widget.name ?? ''
    setWidget(widget)
    setConfig(widget.config ?? {})
    setName(widget.name ?? '')
  }, [id])

  useEffect(() => { load() }, [load])

  useEffect(() => {
    fetch('/api/plan').then(r => r.json()).then(d => setPlanName(d.plan?.name?.toLowerCase() ?? 'free')).catch(() => {})
  }, [])

  const previewHtml = useMemo(
    () => widget ? generatePreviewHTML(widget.type, config) : '',
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [widget?.type, JSON.stringify(config)]
  )

  function scheduleAutoSave() {
    if (autoSaveRef.current) clearTimeout(autoSaveRef.current)
    setAutoSaveStatus('idle')
    autoSaveRef.current = setTimeout(async () => {
      setAutoSaveStatus('saving')
      try {
        const res = await fetch(`/api/widgets/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: nameRef.current, config: configRef.current }),
        })
        setAutoSaveStatus(res.ok ? 'saved' : 'error')
        setTimeout(() => setAutoSaveStatus('idle'), 2500)
      } catch {
        setAutoSaveStatus('error')
        setTimeout(() => setAutoSaveStatus('idle'), 2500)
      }
    }, 2000)
  }

  function handleConfigChange(newConfig: Record<string, unknown>) {
    configRef.current = newConfig
    setConfig(newConfig)
    scheduleAutoSave()
  }

  function handleNameChange(newName: string) {
    nameRef.current = newName
    setName(newName)
    scheduleAutoSave()
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
    } else {
      const data = await res.json()
      showToast(data.error ?? 'Save failed', false)
    }
  }

  if (!widget) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse text-gray-400 text-sm">Loading widget…</div>
      </div>
    )
  }

  const BG_OPTS = [{ v: '#ffffff', label: 'White' }, { v: '#f3f4f6', label: 'Gray' }, { v: '#1f2937', label: 'Dark' }]

  return (
    <div className="flex gap-6 h-[calc(100vh-8rem)] max-w-7xl mx-auto">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl text-sm font-medium shadow-lg modal-animate ${toast.ok ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
          {toast.msg}
        </div>
      )}

      {/* LEFT — Settings panel (420px, scrollable) */}
      <div className="w-[420px] shrink-0 flex flex-col bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Panel header */}
        <div className="px-5 py-4 border-b border-gray-100 shrink-0 space-y-3">
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">Widget Name</label>
            <input
              value={name}
              onChange={e => handleNameChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-800 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-400"
            />
          </div>
          {/* Templates */}
          {WIDGET_TEMPLATES[widget.type] && (
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1.5">Templates</p>
              <div className="flex gap-1.5 flex-wrap">
                {WIDGET_TEMPLATES[widget.type].map(t => (
                  <button
                    key={t.name}
                    type="button"
                    onClick={() => {
                      const merged = { ...config, ...t.config }
                      handleConfigChange(merged)
                    }}
                    className="px-2.5 py-1 text-xs font-medium border border-gray-200 rounded-lg hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-700 transition-colors text-gray-600"
                  >
                    {t.name}
                  </button>
                ))}
              </div>
            </div>
          )}
          {/* Tab switcher */}
          <div className="flex border border-gray-200 rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => setConfigTab('settings')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold transition-colors ${configTab === 'settings' ? 'bg-indigo-600 text-white' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              Settings
            </button>
            <button
              type="button"
              onClick={() => setConfigTab('css')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold transition-colors ${configTab === 'css' ? 'bg-indigo-600 text-white' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <Code2 size={11} /> CSS
              {planName === 'free' && <Lock size={10} className="opacity-60" />}
            </button>
          </div>
        </div>

        {/* Scrollable form */}
        <div className="flex-1 overflow-y-auto px-5 py-5">
          {configTab === 'settings' && (
            <>
              {widget.type === 'whatsapp'         && <WhatsAppForm      config={config as Partial<WhatsAppConfig>}      onChange={c => handleConfigChange(c as Record<string, unknown>)} />}
              {widget.type === 'testimonials'     && <TestimonialsForm  config={config as Partial<TestimonialsConfig>}  onChange={c => handleConfigChange(c as Record<string, unknown>)} />}
              {widget.type === 'youtube_feed'     && <YouTubeFeedForm   config={config as Partial<YouTubeFeedConfig>}   onChange={c => handleConfigChange(c as Record<string, unknown>)} />}
              {widget.type === 'countdown_timer'  && <CountdownTimerForm config={config as Partial<CountdownTimerConfig>} onChange={c => handleConfigChange(c as Record<string, unknown>)} />}
              {widget.type === 'announcement_bar' && <AnnouncementBarForm config={config as Partial<AnnouncementBarConfig>} onChange={c => handleConfigChange(c as Record<string, unknown>)} />}
              {widget.type === 'google_reviews'   && <GoogleReviewsForm  config={config as Partial<GoogleReviewsConfig>}  onChange={c => handleConfigChange(c as Record<string, unknown>)} />}
              {widget.type === 'contact_form'     && <ContactFormForm    config={config as Partial<ContactFormConfig>}    onChange={c => handleConfigChange(c as Record<string, unknown>)} />}
              {widget.type === 'social_follow'    && <SocialFollowForm   config={config as Partial<SocialFollowConfig>}   onChange={c => handleConfigChange(c as Record<string, unknown>)} />}
              {widget.type === 'instagram_feed'   && <InstagramFeedForm  config={config as Partial<InstagramFeedConfig>}  onChange={c => handleConfigChange(c as Record<string, unknown>)} />}
              {widget.type === 'tiktok_feed'      && <TikTokFeedForm     config={config as Partial<TikTokFeedConfig>}     onChange={c => handleConfigChange(c as Record<string, unknown>)} />}
            </>
          )}
          {configTab === 'css' && (
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500 leading-relaxed mb-3">
                  Add custom CSS that gets injected into your widget embed. Useful for fine-tuned styling beyond the visual settings.
                </p>
                {planName === 'free' ? (
                  <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-4 text-center space-y-2">
                    <Lock size={20} className="text-indigo-400 mx-auto" />
                    <p className="text-sm font-semibold text-indigo-800">Custom CSS requires Pro or Agency</p>
                    <p className="text-xs text-indigo-600">Upgrade to inject custom styles into any widget.</p>
                    <Link
                      href="/dashboard/billing"
                      className="inline-flex items-center gap-1 px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700 transition-colors mt-1"
                    >
                      Upgrade to Pro →
                    </Link>
                  </div>
                ) : (
                  <textarea
                    value={(config.custom_css as string) ?? ''}
                    onChange={e => handleConfigChange({ ...config, custom_css: e.target.value })}
                    placeholder={`/* Target elements inside your widget */\n.yt-card { border-radius: 16px; }\n.gr-card { box-shadow: 0 4px 20px rgba(0,0,0,0.1); }`}
                    rows={16}
                    className="w-full px-3 py-3 border border-gray-200 rounded-lg text-xs font-mono bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-400 resize-none leading-relaxed"
                  />
                )}
              </div>
            </div>
          )}
        </div>

        {/* Sticky save button */}
        <div className="px-5 py-4 border-t border-gray-100 shrink-0 space-y-2">
          {autoSaveStatus !== 'idle' && (
            <p className={`text-xs text-center font-medium ${
              autoSaveStatus === 'saving' ? 'text-gray-400' :
              autoSaveStatus === 'saved'  ? 'text-green-600' : 'text-red-500'
            }`}>
              {autoSaveStatus === 'saving' ? 'Auto-saving…' :
               autoSaveStatus === 'saved'  ? '✓ Auto-saved' : 'Auto-save failed'}
            </p>
          )}
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-60"
          >
            {saving ? 'Saving…' : 'Save changes'}
          </button>
        </div>
      </div>

      {/* RIGHT — Preview + embed */}
      <div className="flex-1 flex flex-col gap-4 min-w-0 overflow-y-auto">
        <EmbedCode widgetId={id} />

        <div className="bg-white rounded-xl border border-gray-200 flex flex-col overflow-hidden flex-1">
          {/* Preview toolbar */}
          <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between gap-4 shrink-0">
            <h3 className="font-semibold text-gray-900 text-sm">Live Preview</h3>
            <div className="flex items-center gap-3">
              {/* Background picker */}
              <div className="flex items-center gap-1 border border-gray-200 rounded-lg p-0.5">
                {BG_OPTS.map(b => (
                  <button key={b.v} type="button" onClick={() => setPreviewBg(b.v)} title={b.label}
                    className={`w-5 h-5 rounded transition-all border ${previewBg === b.v ? 'ring-2 ring-indigo-500 ring-offset-1 scale-90' : 'hover:scale-90'}`}
                    style={{ background: b.v, borderColor: b.v === '#ffffff' ? '#e5e7eb' : b.v }}
                  />
                ))}
              </div>
              {/* Device toggle */}
              <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                <button type="button" onClick={() => setPreviewDevice('desktop')} className={`p-1.5 transition-colors ${previewDevice === 'desktop' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}><Monitor size={14} /></button>
                <button type="button" onClick={() => setPreviewDevice('mobile')}  className={`p-1.5 transition-colors ${previewDevice === 'mobile'  ? 'bg-indigo-50 text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}><Smartphone size={14} /></button>
              </div>
            </div>
          </div>

          {/* Preview iframe — inline srcDoc, always live */}
          <div className="flex-1 flex" style={{ background: previewBg, transition: 'background 200ms' }}>
            <div
              className="flex-1 flex transition-all duration-300"
              style={{ maxWidth: previewDevice === 'mobile' ? 375 : '100%', margin: '0 auto' }}
            >
              <iframe
                srcDoc={previewHtml}
                sandbox="allow-scripts"
                style={{ width: '100%', minHeight: 400, border: 'none', background: 'transparent' }}
                title="Widget preview"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

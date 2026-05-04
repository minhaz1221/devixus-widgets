'use client'

import { useEffect, useState, useCallback, useMemo, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Database, Type, LayoutGrid, CreditCard, Palette, Settings as SettingsIcon,
  ArrowLeft, X, Check, Copy, Plus, Trash2, Star, Monitor, Smartphone, Tablet,
  Lock, MessageCircle, Play, Globe, Timer, Megaphone, Mail, Share2,
  Camera, Music, AlertTriangle, ChevronDown, ExternalLink,
  HelpCircle, Hash, MapPin,
} from 'lucide-react'
import { generatePreviewHTML } from '@/lib/preview-renderer'
import type {
  Widget, WhatsAppConfig, TestimonialsConfig, YouTubeFeedConfig,
  CountdownTimerConfig, AnnouncementBarConfig, GoogleReviewsConfig,
  ContactFormConfig, SocialFollowConfig, InstagramFeedConfig, TikTokFeedConfig,
  FAQConfig, NumberCounterConfig,
} from '@/types/widget'
import { ConfigSection } from '@/components/ui/ConfigSection'
import { ToggleSwitch } from '@/components/ui/ToggleSwitch'
import { ColorPicker } from '@/components/ui/ColorPicker'
import { RangeSlider } from '@/components/ui/RangeSlider'
import { OptionPicker } from '@/components/ui/OptionPicker'

const EMBED_ORIGIN = 'https://devixus-widgets-web.vercel.app'
const INPUT = 'w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-400 outline-none'
const BTN = 'px-3 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50 whitespace-nowrap transition-colors'

// ── Type + panel definitions ───────────────────────────────────────────────
type PanelId = 'content' | 'header' | 'layout' | 'card' | 'style' | 'settings'
type Device  = 'desktop' | 'tablet' | 'mobile'

const PANELS: { id: PanelId; Icon: React.ElementType; label: string }[] = [
  { id: 'content',  Icon: Database,     label: 'Content'  },
  { id: 'header',   Icon: Type,         label: 'Header'   },
  { id: 'layout',   Icon: LayoutGrid,   label: 'Layout'   },
  { id: 'card',     Icon: CreditCard,   label: 'Card'     },
  { id: 'style',    Icon: Palette,      label: 'Style'    },
  { id: 'settings', Icon: SettingsIcon, label: 'Settings' },
]

const TYPE_META: Record<string, { label: string; Icon: React.ElementType; color: string }> = {
  whatsapp:         { label: 'WhatsApp Chat',    Icon: MessageCircle, color: '#25D366' },
  testimonials:     { label: 'Testimonials',      Icon: Star,          color: '#f59e0b' },
  youtube_feed:     { label: 'YouTube Feed',      Icon: Play,          color: '#ff0000' },
  google_reviews:   { label: 'Google Reviews',    Icon: Globe,         color: '#4285f4' },
  countdown_timer:  { label: 'Countdown Timer',   Icon: Timer,         color: '#8b5cf6' },
  announcement_bar: { label: 'Announcement Bar',  Icon: Megaphone,     color: '#6366f1' },
  contact_form:     { label: 'Contact Form',      Icon: Mail,          color: '#10b981' },
  social_follow:    { label: 'Social Follow',     Icon: Share2,        color: '#ec4899' },
  instagram_feed:   { label: 'Instagram Feed',    Icon: Camera,        color: '#e4405f' },
  tiktok_feed:      { label: 'TikTok Feed',       Icon: Music,         color: '#2d2d2d' },
  faq_accordion:    { label: 'FAQ',               Icon: HelpCircle,    color: '#f97316' },
  number_counter:   { label: 'Number Counter',    Icon: Hash,          color: '#06b6d4' },
  google_maps:      { label: 'Google Maps',       Icon: MapPin,        color: '#10b981' },
}

// ── Small UI helpers ───────────────────────────────────────────────────────
function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button type="button" role="switch" aria-checked={checked} onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full shrink-0 transition-colors ${checked ? 'bg-indigo-600' : 'bg-gray-200'}`}>
      <span className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  )
}

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

// ── Content panel sub-components (each uses hooks safely) ─────────────────
function WhatsAppContent({ config, onChange }: { config: Record<string, unknown>; onChange: (c: Record<string, unknown>) => void }) {
  const c = config as Partial<WhatsAppConfig>
  const set = (k: string, v: unknown) => onChange({ ...config, [k]: v })
  return (
    <ConfigSection title="Account">
      <label className="block text-xs font-medium text-gray-600 mb-1">Phone Number <span className="text-gray-400">(with country code)</span></label>
      <input type="tel" value={c.phone_number ?? ''} onChange={e => set('phone_number', e.target.value)} placeholder="19175550100" className={INPUT} />
      <label className="block text-xs font-medium text-gray-600 mt-3 mb-1">Welcome Message</label>
      <textarea value={c.welcome_message ?? ''} onChange={e => set('welcome_message', e.target.value)} rows={3} className={`${INPUT} resize-none`} placeholder="Hi! How can I help you?" />
    </ConfigSection>
  )
}

function YouTubeContent({ config, onChange }: { config: Record<string, unknown>; onChange: (c: Record<string, unknown>) => void }) {
  const c = config as Partial<YouTubeFeedConfig>
  const set = (k: string, v: unknown) => onChange({ ...config, [k]: v })
  const [url, setUrl] = useState(c.channel_url ?? '')
  const [channelName, setChannelName] = useState('')
  const [fetching, setFetching] = useState(false)
  const [fetchError, setFetchError] = useState<string | null>(null)

  async function fetchChannel() {
    if (!url.trim()) return
    setFetching(true); setFetchError(null)
    try {
      const res = await fetch(`/api/youtube/resolve?url=${encodeURIComponent(url.trim())}`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Failed')
      onChange({ ...config, channel_id: data.channel_id, channel_url: url.trim() })
      setChannelName(data.channel_name)
    } catch (err) { setFetchError(err instanceof Error ? err.message : 'Failed') }
    finally { setFetching(false) }
  }

  return (
    <ConfigSection title="YouTube Channel">
      <label className="block text-xs font-medium text-gray-600 mb-1">Channel URL or Handle</label>
      <div className="flex gap-2">
        <input value={url} onChange={e => setUrl(e.target.value)} onKeyDown={e => e.key === 'Enter' && fetchChannel()} placeholder="https://youtube.com/@channel" className={`${INPUT} flex-1`} />
        <button type="button" onClick={fetchChannel} disabled={!url.trim() || fetching} className={BTN}>{fetching ? '…' : 'Fetch'}</button>
      </div>
      {c.channel_id && <p className="text-xs text-green-600 mt-1 flex items-center gap-1"><Check size={12} /> {channelName || c.channel_id}</p>}
      {fetchError && <p className="text-xs text-red-500 mt-1">{fetchError}</p>}
      {!c.channel_id && (
        <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-700 mt-2">
          <AlertTriangle size={13} className="shrink-0 text-amber-500" />
          Using sample data until a channel is connected
        </div>
      )}
      <label className="block text-xs font-medium text-gray-600 mt-3 mb-1">Videos to show</label>
      <select value={c.max_results ?? 6} onChange={e => set('max_results', parseInt(e.target.value))} className={INPUT}>
        {[3, 6, 9, 12].map(n => <option key={n} value={n}>{n} videos</option>)}
      </select>
    </ConfigSection>
  )
}

interface PlaceResult { place_id: string; name: string; address: string; rating: number; total_ratings: number }

function GoogleReviewsContent({ config, onChange }: { config: Record<string, unknown>; onChange: (c: Record<string, unknown>) => void }) {
  const c = config as Partial<GoogleReviewsConfig>
  const [query, setQuery] = useState('')
  const [searching, setSearching] = useState(false)
  const [results, setResults] = useState<PlaceResult[]>([])
  const [searchError, setSearchError] = useState<string | null>(null)

  async function handleSearch() {
    if (!query.trim()) return
    setSearching(true); setSearchError(null); setResults([])
    try {
      const res = await fetch(`/api/google-reviews/search?query=${encodeURIComponent(query.trim())}`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Search failed')
      setResults(data.results ?? [])
      if ((data.results ?? []).length === 0) setSearchError('No businesses found.')
    } catch (err) { setSearchError(err instanceof Error ? err.message : 'Search failed') }
    finally { setSearching(false) }
  }

  function selectPlace(place: PlaceResult) {
    onChange({ ...config, place_id: place.place_id, place_name: place.name, place_address: place.address })
    setResults([]); setQuery('')
  }

  return (
    <ConfigSection title="Google Business">
      <label className="block text-xs font-medium text-gray-600 mb-1">Search for your business</label>
      <div className="flex gap-2">
        <input value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSearch()} placeholder="Business name, city" className={`${INPUT} flex-1`} />
        <button type="button" onClick={handleSearch} disabled={!query.trim() || searching} className={BTN}>{searching ? '…' : 'Search'}</button>
      </div>
      {c.place_id && <p className="text-xs text-green-600 mt-1 flex items-center gap-1"><Check size={12} /> {c.place_name || c.place_id}</p>}
      {searchError && <p className="text-xs text-red-500 mt-1">{searchError}</p>}
      {results.length > 0 && (
        <ul className="mt-2 border border-gray-200 rounded-lg overflow-hidden divide-y divide-gray-100">
          {results.map(r => (
            <li key={r.place_id}>
              <button type="button" onClick={() => selectPlace(r)} className="w-full text-left px-3 py-2 hover:bg-indigo-50 transition-colors">
                <p className="text-xs font-medium text-gray-800">{r.name}</p>
                <p className="text-[11px] text-gray-500 mt-0.5">{r.address}</p>
                {r.rating > 0 && <p className="text-[11px] text-yellow-600">{'★'.repeat(Math.round(r.rating))} {r.rating} · {r.total_ratings} reviews</p>}
              </button>
            </li>
          ))}
        </ul>
      )}
    </ConfigSection>
  )
}

type Testimonial = TestimonialsConfig['testimonials'][0]
const BLANK_T: Testimonial = { author: '', role: '', content: '', rating: 5 }

function TestimonialsContent({ config, onChange }: { config: Record<string, unknown>; onChange: (c: Record<string, unknown>) => void }) {
  const c = config as Partial<TestimonialsConfig>
  const testimonials = c.testimonials ?? []
  const [draft, setDraft] = useState<Testimonial>({ ...BLANK_T })
  const [adding, setAdding] = useState(false)

  function add() {
    if (!draft.author || !draft.content) return
    onChange({ ...config, testimonials: [...testimonials, { ...draft }] })
    setDraft({ ...BLANK_T }); setAdding(false)
  }

  return (
    <ConfigSection title={`Testimonials (${testimonials.length})`}>
      <button type="button" onClick={() => setAdding(a => !a)} className="inline-flex items-center gap-1 text-xs text-indigo-600 font-semibold hover:underline mb-2">
        <Plus size={12} /> Add testimonial
      </button>
      {adding && (
        <div className="border border-indigo-200 bg-indigo-50 rounded-xl p-3 space-y-2 mb-3">
          <div className="grid grid-cols-2 gap-2">
            <div><label className="block text-[11px] font-medium text-gray-500 mb-1">Author *</label><input value={draft.author} onChange={e => setDraft(d => ({ ...d, author: e.target.value }))} placeholder="Jane Smith" className={INPUT} /></div>
            <div><label className="block text-[11px] font-medium text-gray-500 mb-1">Role</label><input value={draft.role} onChange={e => setDraft(d => ({ ...d, role: e.target.value }))} placeholder="CEO" className={INPUT} /></div>
          </div>
          <textarea value={draft.content} onChange={e => setDraft(d => ({ ...d, content: e.target.value }))} rows={2} placeholder="Review text *" className={`${INPUT} resize-none`} />
          <input value={draft.avatar_url ?? ''} onChange={e => setDraft(d => ({ ...d, avatar_url: e.target.value }))} placeholder="Avatar URL (optional)" className={INPUT} />
          <div className="flex items-center justify-between">
            <StarPicker value={draft.rating} onChange={r => setDraft(d => ({ ...d, rating: r }))} />
            <div className="flex gap-2">
              <button type="button" onClick={() => { setAdding(false); setDraft({ ...BLANK_T }) }} className="px-2.5 py-1 text-xs border border-gray-200 rounded-lg hover:bg-gray-50">Cancel</button>
              <button type="button" onClick={add} disabled={!draft.author || !draft.content} className="px-2.5 py-1 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50">Add</button>
            </div>
          </div>
        </div>
      )}
      {testimonials.length === 0 && !adding && <p className="text-xs text-gray-400">No testimonials yet.</p>}
      <ul className="space-y-2">
        {testimonials.map((t, i) => (
          <li key={i} className="flex items-start justify-between gap-2 bg-gray-50 rounded-lg px-3 py-2">
            <div className="min-w-0">
              <p className="text-xs font-semibold text-gray-800 truncate">{t.author}</p>
              <p className="text-[11px] text-gray-500 truncate">{t.content}</p>
            </div>
            <button type="button" onClick={() => onChange({ ...config, testimonials: testimonials.filter((_, idx) => idx !== i) })} className="shrink-0 text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={13} /></button>
          </li>
        ))}
      </ul>
    </ConfigSection>
  )
}

// ── FAQ sub-component ─────────────────────────────────────────────────────
interface FAQItem { q: string; a: string }
const BLANK_FAQ: FAQItem = { q: '', a: '' }

function FAQContent({ config, onChange }: { config: Record<string, unknown>; onChange: (c: Record<string, unknown>) => void }) {
  const c = config as Partial<FAQConfig>
  const questions = (c.questions as FAQItem[]) ?? []
  const [draft, setDraft] = useState<FAQItem>({ ...BLANK_FAQ })
  const [adding, setAdding] = useState(false)

  function add() {
    if (!draft.q || !draft.a) return
    onChange({ ...config, questions: [...questions, { ...draft }] })
    setDraft({ ...BLANK_FAQ }); setAdding(false)
  }

  return (
    <ConfigSection title={`Questions (${questions.length})`}>
      <button type="button" onClick={() => setAdding(a => !a)} className="inline-flex items-center gap-1 text-xs text-indigo-600 font-semibold hover:underline mb-2">
        <Plus size={12} /> Add question
      </button>
      {adding && (
        <div className="border border-indigo-200 bg-indigo-50 rounded-xl p-3 space-y-2 mb-3">
          <div>
            <label className="block text-[11px] font-medium text-gray-500 mb-1">Question *</label>
            <input value={draft.q} onChange={e => setDraft(d => ({ ...d, q: e.target.value }))} placeholder="How does it work?" className={INPUT} />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-gray-500 mb-1">Answer *</label>
            <textarea value={draft.a} onChange={e => setDraft(d => ({ ...d, a: e.target.value }))} rows={3} placeholder="Type your answer here..." className={`${INPUT} resize-none`} />
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => { setAdding(false); setDraft({ ...BLANK_FAQ }) }} className="px-2.5 py-1 text-xs border border-gray-200 rounded-lg hover:bg-gray-50">Cancel</button>
            <button type="button" onClick={add} disabled={!draft.q || !draft.a} className="px-2.5 py-1 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50">Add</button>
          </div>
        </div>
      )}
      {questions.length === 0 && !adding && <p className="text-xs text-gray-400">No questions yet.</p>}
      <ul className="space-y-2">
        {questions.map((item, i) => (
          <li key={i} className="flex items-start justify-between gap-2 bg-gray-50 rounded-lg px-3 py-2">
            <div className="min-w-0">
              <p className="text-xs font-semibold text-gray-800 truncate">{item.q}</p>
              <p className="text-[11px] text-gray-500 line-clamp-1">{item.a}</p>
            </div>
            <button type="button" onClick={() => onChange({ ...config, questions: questions.filter((_, idx) => idx !== i) })} className="shrink-0 text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={13} /></button>
          </li>
        ))}
      </ul>
    </ConfigSection>
  )
}

// ── Number Counter sub-component ───────────────────────────────────────────
interface StatItem { value: string; label: string; prefix?: string; suffix?: string }
const BLANK_STAT: StatItem = { value: '', label: '', prefix: '', suffix: '' }

function NumberCounterContent({ config, onChange }: { config: Record<string, unknown>; onChange: (c: Record<string, unknown>) => void }) {
  const c = config as Partial<NumberCounterConfig>
  const stats = (c.stats as StatItem[]) ?? []
  const [draft, setDraft] = useState<StatItem>({ ...BLANK_STAT })
  const [adding, setAdding] = useState(false)

  function add() {
    if (!draft.value || !draft.label) return
    onChange({ ...config, stats: [...stats, { ...draft }] })
    setDraft({ ...BLANK_STAT }); setAdding(false)
  }

  return (
    <ConfigSection title={`Stats (${stats.length})`}>
      <button type="button" onClick={() => setAdding(a => !a)} className="inline-flex items-center gap-1 text-xs text-indigo-600 font-semibold hover:underline mb-2">
        <Plus size={12} /> Add stat
      </button>
      {adding && (
        <div className="border border-indigo-200 bg-indigo-50 rounded-xl p-3 space-y-2 mb-3">
          <div className="grid grid-cols-2 gap-2">
            <div><label className="block text-[11px] font-medium text-gray-500 mb-1">Value *</label><input value={draft.value} onChange={e => setDraft(d => ({ ...d, value: e.target.value }))} placeholder="10,000" className={INPUT} /></div>
            <div><label className="block text-[11px] font-medium text-gray-500 mb-1">Label *</label><input value={draft.label} onChange={e => setDraft(d => ({ ...d, label: e.target.value }))} placeholder="Happy Customers" className={INPUT} /></div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div><label className="block text-[11px] font-medium text-gray-500 mb-1">Prefix</label><input value={draft.prefix ?? ''} onChange={e => setDraft(d => ({ ...d, prefix: e.target.value }))} placeholder="$" className={INPUT} /></div>
            <div><label className="block text-[11px] font-medium text-gray-500 mb-1">Suffix</label><input value={draft.suffix ?? ''} onChange={e => setDraft(d => ({ ...d, suffix: e.target.value }))} placeholder="+" className={INPUT} /></div>
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => { setAdding(false); setDraft({ ...BLANK_STAT }) }} className="px-2.5 py-1 text-xs border border-gray-200 rounded-lg hover:bg-gray-50">Cancel</button>
            <button type="button" onClick={add} disabled={!draft.value || !draft.label} className="px-2.5 py-1 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50">Add</button>
          </div>
        </div>
      )}
      {stats.length === 0 && !adding && <p className="text-xs text-gray-400">No stats yet.</p>}
      <ul className="space-y-2">
        {stats.map((s, i) => (
          <li key={i} className="flex items-start justify-between gap-2 bg-gray-50 rounded-lg px-3 py-2">
            <div className="min-w-0">
              <p className="text-xs font-semibold text-gray-800">{s.prefix}{s.value}{s.suffix}</p>
              <p className="text-[11px] text-gray-500">{s.label}</p>
            </div>
            <button type="button" onClick={() => onChange({ ...config, stats: stats.filter((_, idx) => idx !== i) })} className="shrink-0 text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={13} /></button>
          </li>
        ))}
      </ul>
    </ConfigSection>
  )
}

// ── Panel: Content (dispatcher) ────────────────────────────────────────────
function ContentPanel({ type, config, onChange }: { type: string; config: Record<string, unknown>; onChange: (c: Record<string, unknown>) => void }) {
  const set = (k: string, v: unknown) => onChange({ ...config, [k]: v })

  if (type === 'whatsapp')       return <WhatsAppContent       config={config} onChange={onChange} />
  if (type === 'youtube_feed')   return <YouTubeContent        config={config} onChange={onChange} />
  if (type === 'google_reviews') return <GoogleReviewsContent  config={config} onChange={onChange} />
  if (type === 'testimonials')   return <TestimonialsContent   config={config} onChange={onChange} />

  if (type === 'countdown_timer') {
    const c = config as Partial<CountdownTimerConfig>
    return (
      <ConfigSection title="Countdown Target">
        <label className="block text-xs font-medium text-gray-600 mb-1">Title</label>
        <input type="text" value={c.title ?? ''} onChange={e => set('title', e.target.value)} placeholder="Sale ends in" className={INPUT} />
        <div className="grid grid-cols-2 gap-2 mt-3">
          <div><label className="block text-xs font-medium text-gray-600 mb-1">Date</label><input type="date" value={c.target_date ?? ''} onChange={e => set('target_date', e.target.value)} className={INPUT} /></div>
          <div><label className="block text-xs font-medium text-gray-600 mb-1">Time</label><input type="time" value={c.target_time ?? ''} onChange={e => set('target_time', e.target.value)} className={INPUT} /></div>
        </div>
        <label className="block text-xs font-medium text-gray-600 mt-3 mb-1">Timezone</label>
        <select value={c.timezone ?? 'UTC'} onChange={e => set('timezone', e.target.value)} className={INPUT}>
          {['UTC', 'America/New_York', 'America/Los_Angeles', 'Europe/London', 'Europe/Paris', 'Asia/Tokyo', 'Asia/Kolkata', 'Australia/Sydney'].map(tz => <option key={tz} value={tz}>{tz}</option>)}
        </select>
      </ConfigSection>
    )
  }

  if (type === 'announcement_bar') {
    const c = config as Partial<AnnouncementBarConfig>
    return (
      <ConfigSection title="Bar Content">
        <label className="block text-xs font-medium text-gray-600 mb-1">Message</label>
        <input type="text" value={c.message ?? ''} onChange={e => set('message', e.target.value)} placeholder="🎉 Special offer — Limited time!" className={INPUT} />
        <div className="grid grid-cols-2 gap-2 mt-3">
          <div><label className="block text-xs font-medium text-gray-600 mb-1">Link Text</label><input type="text" value={c.link_text ?? ''} onChange={e => set('link_text', e.target.value)} placeholder="Shop now" className={INPUT} /></div>
          <div><label className="block text-xs font-medium text-gray-600 mb-1">Link URL</label><input type="url" value={c.link_url ?? ''} onChange={e => set('link_url', e.target.value)} placeholder="https://..." className={INPUT} /></div>
        </div>
        <label className="block text-xs font-medium text-gray-600 mt-3 mb-1">Emoji <span className="text-gray-400">(optional)</span></label>
        <input type="text" value={c.emoji ?? ''} onChange={e => set('emoji', e.target.value)} placeholder="🎉" maxLength={4} className={`${INPUT} w-20`} />
      </ConfigSection>
    )
  }

  if (type === 'contact_form') {
    const c = config as Partial<ContactFormConfig>
    return (
      <ConfigSection title="Form Destination">
        <label className="block text-xs font-medium text-gray-600 mb-1">Recipient Email <span className="text-red-400">*</span></label>
        <input type="email" value={c.recipient_email ?? ''} onChange={e => set('recipient_email', e.target.value)} placeholder="you@example.com" className={INPUT} />
        <p className="text-[11px] text-gray-400 mt-1">Submissions will be sent here.</p>
        <label className="block text-xs font-medium text-gray-600 mt-3 mb-1">Button Text</label>
        <input type="text" value={c.button_text ?? ''} onChange={e => set('button_text', e.target.value)} placeholder="Send Message" className={INPUT} />
        <label className="block text-xs font-medium text-gray-600 mt-3 mb-1">Success Message</label>
        <input type="text" value={c.success_message ?? ''} onChange={e => set('success_message', e.target.value)} placeholder="Thank you! We'll be in touch." className={INPUT} />
      </ConfigSection>
    )
  }

  if (type === 'social_follow') {
    const c = config as Partial<SocialFollowConfig>
    const networks = c.networks ?? {}
    const NETS = [
      { key: 'facebook', label: 'Facebook', placeholder: 'https://facebook.com/yourpage' },
      { key: 'instagram', label: 'Instagram', placeholder: 'https://instagram.com/yourhandle' },
      { key: 'twitter', label: 'Twitter / X', placeholder: 'https://x.com/yourhandle' },
      { key: 'tiktok', label: 'TikTok', placeholder: 'https://tiktok.com/@yourhandle' },
      { key: 'youtube', label: 'YouTube', placeholder: 'https://youtube.com/@channel' },
      { key: 'linkedin', label: 'LinkedIn', placeholder: 'https://linkedin.com/company/...' },
      { key: 'pinterest', label: 'Pinterest', placeholder: 'https://pinterest.com/...' },
      { key: 'whatsapp', label: 'WhatsApp', placeholder: '+12345678900' },
    ] as const
    return (
      <ConfigSection title="Social Profiles">
        <div className="space-y-2.5">
          {NETS.map(({ key, label, placeholder }) => (
            <div key={key}>
              <label className="block text-[11px] font-medium text-gray-500 mb-1">{label}</label>
              <input type="text" value={(networks as Record<string, string>)[key] ?? ''} onChange={e => onChange({ ...config, networks: { ...networks, [key]: e.target.value } })} placeholder={placeholder} className={INPUT} />
            </div>
          ))}
        </div>
      </ConfigSection>
    )
  }

  if (type === 'instagram_feed') {
    const c = config as Partial<InstagramFeedConfig>
    return (
      <ConfigSection title="Instagram Account">
        <label className="block text-xs font-medium text-gray-600 mb-1">Username</label>
        <input type="text" value={c.username ?? ''} onChange={e => set('username', e.target.value)} placeholder="@yourusername" className={INPUT} />
        <p className="text-[11px] text-gray-400 mt-1">Enter your Instagram handle to connect your feed.</p>
      </ConfigSection>
    )
  }

  if (type === 'tiktok_feed') {
    const c = config as Partial<TikTokFeedConfig>
    return (
      <ConfigSection title="TikTok Account">
        <label className="block text-xs font-medium text-gray-600 mb-1">Username</label>
        <input type="text" value={c.username ?? ''} onChange={e => set('username', e.target.value)} placeholder="@yourusername" className={INPUT} />
        <p className="text-[11px] text-gray-400 mt-1">Enter your TikTok handle to connect your feed.</p>
      </ConfigSection>
    )
  }

  if (type === 'faq_accordion') return <FAQContent config={config} onChange={onChange} />
  if (type === 'number_counter') return <NumberCounterContent config={config} onChange={onChange} />

  if (type === 'google_maps') {
    return (
      <ConfigSection title="Map Source">
        <label className="block text-xs font-medium text-gray-600 mb-1">Google Maps Embed URL</label>
        <p className="text-[11px] text-gray-400 mb-2">Go to Google Maps → Share → Embed a map → copy the src URL</p>
        <textarea
          value={(config.embed_url as string) ?? ''}
          onChange={e => set('embed_url', e.target.value)}
          rows={4}
          placeholder="https://www.google.com/maps/embed?pb=..."
          className={`${INPUT} resize-none font-mono text-[11px]`}
        />
        <label className="block text-xs font-medium text-gray-600 mt-3 mb-1">Map Height</label>
        <select value={(config.height as number) ?? 400} onChange={e => set('height', parseInt(e.target.value))} className={INPUT}>
          {[300, 400, 450, 500, 600].map(n => <option key={n} value={n}>{n}px</option>)}
        </select>
        <label className="block text-xs font-medium text-gray-600 mt-3 mb-1">Optional Title</label>
        <input type="text" value={(config.title as string) ?? ''} onChange={e => set('title', e.target.value)} placeholder="Find Us Here" className={INPUT} />
      </ConfigSection>
    )
  }

  return <p className="text-xs text-gray-400 py-4">No content settings for this widget type.</p>
}

// ── Panel: Header ──────────────────────────────────────────────────────────
function HeaderPanel({ type, config, onChange }: { type: string; config: Record<string, unknown>; onChange: (c: Record<string, unknown>) => void }) {
  const set = (k: string, v: unknown) => onChange({ ...config, [k]: v })

  if (type === 'youtube_feed') {
    const c = config as Partial<YouTubeFeedConfig>
    return (
      <ConfigSection title="Channel Header">
        <ToggleSwitch label="Show channel header" checked={c.header_style !== 'none'} onChange={v => set('header_style', v ? 'full' : 'none')} />
        <ToggleSwitch label="Show subscriber count" checked={c.show_subscriber_count !== false} onChange={v => set('show_subscriber_count', v)} />
      </ConfigSection>
    )
  }

  if (type === 'google_reviews') {
    const c = config as Partial<GoogleReviewsConfig>
    return (
      <ConfigSection title="Widget Header">
        <ToggleSwitch label="Show header" checked={c.show_header !== false} onChange={v => set('show_header', v)} />
        <ToggleSwitch label="Show overall rating" checked={c.show_overall_rating !== false} onChange={v => set('show_overall_rating', v)} />
        <ToggleSwitch label={'Show "Write a review" link'} checked={c.write_review_link !== false} onChange={v => set('write_review_link', v)} />
      </ConfigSection>
    )
  }

  if (type === 'contact_form') {
    const c = config as Partial<ContactFormConfig>
    return (
      <ConfigSection title="Form Header">
        <label className="block text-xs font-medium text-gray-600 mb-1">Title</label>
        <input type="text" value={c.title ?? ''} onChange={e => set('title', e.target.value)} placeholder="Contact Us" className={INPUT} />
        <label className="block text-xs font-medium text-gray-600 mt-3 mb-1">Subtitle</label>
        <input type="text" value={c.subtitle ?? ''} onChange={e => set('subtitle', e.target.value)} placeholder="Send us a message and we'll get back to you." className={INPUT} />
      </ConfigSection>
    )
  }

  if (type === 'countdown_timer') {
    const c = config as Partial<CountdownTimerConfig>
    return (
      <ConfigSection title="Timer Units">
        <ToggleSwitch label="Show days"    checked={c.show_days    !== false} onChange={v => set('show_days', v)} />
        <ToggleSwitch label="Show hours"   checked={c.show_hours   !== false} onChange={v => set('show_hours', v)} />
        <ToggleSwitch label="Show minutes" checked={c.show_minutes !== false} onChange={v => set('show_minutes', v)} />
        <ToggleSwitch label="Show seconds" checked={c.show_seconds !== false} onChange={v => set('show_seconds', v)} />
        <ToggleSwitch label="Show labels"  checked={c.show_labels  !== false} onChange={v => set('show_labels', v)} />
      </ConfigSection>
    )
  }

  if (type === 'faq_accordion' || type === 'number_counter') {
    const sectionTitle = type === 'faq_accordion' ? 'FAQ Section Header' : 'Section Header'
    return (
      <ConfigSection title={sectionTitle}>
        <label className="block text-xs font-medium text-gray-600 mb-1">Title</label>
        <input type="text" value={(config.title as string) ?? ''} onChange={e => set('title', e.target.value)} placeholder={type === 'faq_accordion' ? 'Frequently Asked Questions' : 'Our Numbers'} className={INPUT} />
        <label className="block text-xs font-medium text-gray-600 mt-3 mb-1">Description</label>
        <input type="text" value={(config.description as string) ?? ''} onChange={e => set('description', e.target.value)} placeholder="Optional subtitle text" className={INPUT} />
      </ConfigSection>
    )
  }

  return <p className="text-xs text-gray-400 py-4">No header settings for this widget type.</p>
}

// ── Panel: Layout ──────────────────────────────────────────────────────────
function LayoutPanel({ type, config, onChange }: { type: string; config: Record<string, unknown>; onChange: (c: Record<string, unknown>) => void }) {
  const set = (k: string, v: unknown) => onChange({ ...config, [k]: v })

  if (type === 'whatsapp') {
    const c = config as Partial<WhatsAppConfig>
    return (
      <ConfigSection title="Position">
        <OptionPicker label="Button Position" value={c.position ?? 'bottom-right'} onChange={v => set('position', v)} columns={2} options={[{ value: 'bottom-right', label: 'Bottom Right' }, { value: 'bottom-left', label: 'Bottom Left' }]} />
      </ConfigSection>
    )
  }

  if (type === 'youtube_feed') {
    const c = config as Partial<YouTubeFeedConfig>
    return (
      <ConfigSection title="Feed Layout">
        <OptionPicker label="Display Mode" value={c.layout ?? 'grid'} onChange={v => set('layout', v)} columns={3} options={[{ value: 'grid', label: 'Grid' }, { value: 'list', label: 'List' }, { value: 'carousel', label: 'Carousel' }]} />
        {(c.layout ?? 'grid') === 'grid' && (
          <OptionPicker label="Columns" value={String(c.columns ?? 3)} onChange={v => set('columns', Number(v))} columns={3} options={[{ value: '2', label: '2' }, { value: '3', label: '3' }, { value: '4', label: '4' }]} />
        )}
      </ConfigSection>
    )
  }

  if (type === 'google_reviews') {
    const c = config as Partial<GoogleReviewsConfig>
    return (
      <div className="space-y-4">
        <ConfigSection title="Display">
          <OptionPicker label="Layout" value={c.layout ?? 'grid'} onChange={v => set('layout', v)} columns={3} options={[{ value: 'grid', label: 'Grid' }, { value: 'list', label: 'List' }, { value: 'carousel', label: 'Carousel' }]} />
          <label className="block text-xs font-medium text-gray-600 mt-3 mb-1">Max Reviews</label>
          <select value={c.max_reviews ?? 6} onChange={e => set('max_reviews', parseInt(e.target.value))} className={INPUT}>
            {[3, 6, 9, 12].map(n => <option key={n} value={n}>{n} reviews</option>)}
          </select>
          <label className="block text-xs font-medium text-gray-600 mt-3 mb-1">Minimum Rating</label>
          <select value={c.min_rating ?? 1} onChange={e => set('min_rating', parseInt(e.target.value))} className={INPUT}>
            {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}+ stars</option>)}
          </select>
        </ConfigSection>
      </div>
    )
  }

  if (type === 'testimonials') {
    const c = config as Partial<TestimonialsConfig>
    return (
      <ConfigSection title="Display">
        <OptionPicker label="Mode" value={c.layout ?? 'slider'} onChange={v => set('layout', v)} columns={2} options={[{ value: 'slider', label: 'Slider' }, { value: 'grid', label: 'Grid' }]} />
        {c.layout === 'grid' && <OptionPicker label="Columns" value={String(c.columns ?? 2)} onChange={v => set('columns', Number(v))} columns={3} options={[{ value: '1', label: '1' }, { value: '2', label: '2' }, { value: '3', label: '3' }]} />}
      </ConfigSection>
    )
  }

  if (type === 'countdown_timer') {
    const c = config as Partial<CountdownTimerConfig>
    return (
      <ConfigSection title="Style">
        <OptionPicker label="Display Style" value={c.style ?? 'blocks'} onChange={v => set('style', v)} columns={3} options={[{ value: 'blocks', label: 'Blocks' }, { value: 'minimal', label: 'Minimal' }, { value: 'flip', label: 'Flip' }]} />
      </ConfigSection>
    )
  }

  if (type === 'announcement_bar') {
    const c = config as Partial<AnnouncementBarConfig>
    return (
      <ConfigSection title="Position">
        <OptionPicker label="Bar Position" value={c.position ?? 'top'} onChange={v => set('position', v)} columns={2} options={[{ value: 'top', label: 'Top' }, { value: 'bottom', label: 'Bottom' }]} />
      </ConfigSection>
    )
  }

  if (type === 'contact_form') {
    const c = config as Partial<ContactFormConfig>
    return (
      <ConfigSection title="Display Mode">
        <OptionPicker label="Mode" value={c.display_mode ?? 'inline'} onChange={v => set('display_mode', v)} columns={2} options={[{ value: 'inline', label: 'Inline' }, { value: 'popup', label: 'Popup' }]} />
        {c.display_mode === 'popup' && (
          <>
            <label className="block text-xs font-medium text-gray-600 mt-3 mb-1">Trigger Button Text</label>
            <input type="text" value={c.trigger_text ?? ''} onChange={e => set('trigger_text', e.target.value)} placeholder="✉ Contact Us" className={INPUT} />
          </>
        )}
      </ConfigSection>
    )
  }

  if (type === 'social_follow') {
    const c = config as Partial<SocialFollowConfig>
    return (
      <ConfigSection title="Layout">
        <OptionPicker label="Arrangement" value={c.layout ?? 'horizontal'} onChange={v => set('layout', v)} columns={3} options={[{ value: 'horizontal', label: 'Horizontal' }, { value: 'vertical', label: 'Vertical' }, { value: 'grid', label: 'Grid' }]} />
        <OptionPicker label="Size" value={c.size ?? 'medium'} onChange={v => set('size', v)} columns={3} options={[{ value: 'small', label: 'Small' }, { value: 'medium', label: 'Medium' }, { value: 'large', label: 'Large' }]} />
      </ConfigSection>
    )
  }

  if (type === 'instagram_feed') {
    const c = config as Partial<InstagramFeedConfig>
    return (
      <ConfigSection title="Feed Layout">
        <OptionPicker label="Display Mode" value={c.layout ?? 'grid'} onChange={v => set('layout', v)} columns={3} options={[{ value: 'grid', label: 'Grid' }, { value: 'carousel', label: 'Carousel' }, { value: 'masonry', label: 'Masonry' }]} />
        <OptionPicker label="Columns" value={String(c.columns ?? 3)} onChange={v => set('columns', Number(v))} columns={3} options={[{ value: '2', label: '2' }, { value: '3', label: '3' }, { value: '4', label: '4' }]} />
        <OptionPicker label="Posts" value={String(c.num_posts ?? 9)} onChange={v => set('num_posts', Number(v))} columns={4} options={[{ value: '6', label: '6' }, { value: '9', label: '9' }, { value: '12', label: '12' }, { value: '15', label: '15' }]} />
        <OptionPicker label="Gap" value={c.gap ?? '8px'} onChange={v => set('gap', v)} columns={4} options={[{ value: '4px', label: '4px' }, { value: '8px', label: '8px' }, { value: '12px', label: '12px' }, { value: '16px', label: '16px' }]} />
        <OptionPicker label="Radius" value={c.border_radius ?? '8px'} onChange={v => set('border_radius', v)} columns={4} options={[{ value: '0px', label: 'None' }, { value: '8px', label: 'SM' }, { value: '16px', label: 'MD' }, { value: 'round', label: 'Full' }]} />
      </ConfigSection>
    )
  }

  if (type === 'tiktok_feed') {
    const c = config as Partial<TikTokFeedConfig>
    return (
      <ConfigSection title="Feed Layout">
        <OptionPicker label="Display Mode" value={c.layout ?? 'grid'} onChange={v => set('layout', v)} columns={3} options={[{ value: 'grid', label: 'Grid' }, { value: 'carousel', label: 'Carousel' }, { value: 'list', label: 'List' }]} />
        {(c.layout ?? 'grid') !== 'list' && <OptionPicker label="Columns" value={String(c.columns ?? 3)} onChange={v => set('columns', Number(v))} columns={3} options={[{ value: '2', label: '2' }, { value: '3', label: '3' }, { value: '4', label: '4' }]} />}
        <OptionPicker label="Videos" value={String(c.num_videos ?? 9)} onChange={v => set('num_videos', Number(v))} columns={3} options={[{ value: '6', label: '6' }, { value: '9', label: '9' }, { value: '12', label: '12' }]} />
        <OptionPicker label="Gap" value={c.gap ?? '8px'} onChange={v => set('gap', v)} columns={4} options={[{ value: '4px', label: '4px' }, { value: '8px', label: '8px' }, { value: '12px', label: '12px' }, { value: '16px', label: '16px' }]} />
        <OptionPicker label="Radius" value={c.border_radius ?? '8px'} onChange={v => set('border_radius', v)} columns={4} options={[{ value: '0px', label: 'None' }, { value: '8px', label: 'SM' }, { value: '16px', label: 'MD' }, { value: 'round', label: 'Full' }]} />
      </ConfigSection>
    )
  }

  if (type === 'number_counter') {
    return (
      <ConfigSection title="Layout">
        <OptionPicker label="Columns" value={String((config.columns as number) ?? 3)} onChange={v => set('columns', Number(v))} columns={3} options={[{ value: '2', label: '2' }, { value: '3', label: '3' }, { value: '4', label: '4' }]} />
        <ToggleSwitch label="Animate on scroll" checked={(config.animate as boolean) !== false} onChange={v => set('animate', v)} />
      </ConfigSection>
    )
  }

  if (type === 'faq_accordion') {
    return (
      <ConfigSection title="Behavior">
        <ToggleSwitch label="Allow multiple open" checked={!!(config.allow_multiple as boolean)} onChange={v => set('allow_multiple', v)} />
        <ToggleSwitch label="Open first item by default" checked={(config.open_first as boolean) !== false} onChange={v => set('open_first', v)} />
      </ConfigSection>
    )
  }

  return <p className="text-xs text-gray-400 py-4">No layout settings for this widget type.</p>
}

// ── Panel: Card ────────────────────────────────────────────────────────────
function CardPanel({ type, config, onChange }: { type: string; config: Record<string, unknown>; onChange: (c: Record<string, unknown>) => void }) {
  const set = (k: string, v: unknown) => onChange({ ...config, [k]: v })

  if (type === 'whatsapp') {
    const c = config as Partial<WhatsAppConfig>
    return (
      <ConfigSection title="Button">
        <OptionPicker label="Button Size" value={c.button_size ?? 'medium'} onChange={v => set('button_size', v)} columns={3} options={[{ value: 'small', label: 'Small' }, { value: 'medium', label: 'Medium' }, { value: 'large', label: 'Large' }]} />
        <label className="block text-xs font-medium text-gray-600 mt-3 mb-1">Tooltip Text</label>
        <input type="text" value={c.tooltip_text ?? ''} onChange={e => set('tooltip_text', e.target.value)} placeholder="Chat with us!" className={INPUT} />
        <ToggleSwitch label="Pulse animation" checked={!!c.pulse_animation} onChange={v => set('pulse_animation', v)} />
      </ConfigSection>
    )
  }

  if (type === 'youtube_feed') {
    const c = config as Partial<YouTubeFeedConfig>
    return (
      <ConfigSection title="Video Cards">
        <ToggleSwitch label="Show title"        checked={c.show_title         !== false} onChange={v => set('show_title', v)} />
        <ToggleSwitch label="Show publish date" checked={c.show_date          !== false} onChange={v => set('show_date', v)} />
        <ToggleSwitch label="Show view count"   checked={!!c.show_view_count}            onChange={v => set('show_view_count', v)} />
      </ConfigSection>
    )
  }

  if (type === 'google_reviews') {
    const c = config as Partial<GoogleReviewsConfig>
    return (
      <ConfigSection title="Review Cards">
        <ToggleSwitch label="Show review date"    checked={c.show_review_date    !== false} onChange={v => set('show_review_date', v)} />
        <ToggleSwitch label="Show reviewer photo" checked={c.show_reviewer_photo !== false} onChange={v => set('show_reviewer_photo', v)} />
      </ConfigSection>
    )
  }

  if (type === 'testimonials') {
    const c = config as Partial<TestimonialsConfig>
    return (
      <div className="space-y-4">
        <ConfigSection title="Card Style">
          <OptionPicker label="Avatar Shape" value={c.avatar_shape ?? 'circle'} onChange={v => set('avatar_shape', v)} columns={3} options={[{ value: 'circle', label: 'Circle' }, { value: 'square', label: 'Square' }, { value: 'rounded', label: 'Rounded' }]} />
          <OptionPicker label="Card Shadow" value={c.card_shadow ?? 'none'} onChange={v => set('card_shadow', v)} columns={4} options={[{ value: 'none', label: 'None' }, { value: 'small', label: 'SM' }, { value: 'medium', label: 'MD' }, { value: 'large', label: 'LG' }]} />
        </ConfigSection>
        <ConfigSection title="Elements">
          <ToggleSwitch label="Show ratings"    checked={c.show_rating   !== false} onChange={v => set('show_rating', v)} />
          <ToggleSwitch label="Show quote icon" checked={!!c.show_quote_icon}       onChange={v => set('show_quote_icon', v)} />
        </ConfigSection>
      </div>
    )
  }

  if (type === 'countdown_timer') {
    const c = config as Partial<CountdownTimerConfig>
    return (
      <div className="space-y-4">
        <ConfigSection title="On Expiry">
          <OptionPicker label="When timer ends" value={c.expire_action ?? 'message'} onChange={v => set('expire_action', v)} columns={2} options={[{ value: 'nothing', label: 'Nothing' }, { value: 'message', label: 'Message' }, { value: 'redirect', label: 'Redirect' }, { value: 'hide', label: 'Hide' }]} />
          {c.expire_action === 'message' && (
            <>
              <label className="block text-xs font-medium text-gray-600 mt-3 mb-1">Expired Message</label>
              <input type="text" value={c.expired_message ?? ''} onChange={e => set('expired_message', e.target.value)} placeholder="This offer has ended" className={INPUT} />
            </>
          )}
          {c.expire_action === 'redirect' && (
            <>
              <label className="block text-xs font-medium text-gray-600 mt-3 mb-1">Redirect URL</label>
              <input type="url" value={c.redirect_url ?? ''} onChange={e => set('redirect_url', e.target.value)} placeholder="https://example.com" className={INPUT} />
            </>
          )}
        </ConfigSection>
      </div>
    )
  }

  if (type === 'announcement_bar') {
    const c = config as Partial<AnnouncementBarConfig>
    return (
      <ConfigSection title="Bar Options">
        <ToggleSwitch label="Show emoji"          checked={c.show_emoji        !== false} onChange={v => set('show_emoji', v)} />
        <ToggleSwitch label="Show close button"   checked={c.show_close_button !== false} onChange={v => set('show_close_button', v)} />
        <ToggleSwitch label="Sticky (fixed position)" checked={c.is_sticky    !== false} onChange={v => set('is_sticky', v)} />
      </ConfigSection>
    )
  }

  if (type === 'contact_form') {
    const c = config as Partial<ContactFormConfig>
    const fields   = c.fields          ?? { name: true, email: true, phone: false, subject: false, message: true }
    const required = c.required_fields ?? { name: true, email: true, phone: false, subject: false, message: true }
    return (
      <ConfigSection title="Form Fields">
        <div className="space-y-2">
          {(['name', 'email', 'phone', 'subject', 'message'] as const).map(f => (
            <div key={f} className="flex items-center justify-between py-0.5">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={!!fields[f]} onChange={e => onChange({ ...config, fields: { ...fields, [f]: e.target.checked } })} className="rounded accent-indigo-600" />
                <span className="text-sm text-gray-700 capitalize">{f}</span>
              </label>
              {fields[f] && (
                <label className="flex items-center gap-1.5 text-xs text-gray-500 cursor-pointer">
                  <input type="checkbox" checked={!!required[f]} onChange={e => onChange({ ...config, required_fields: { ...required, [f]: e.target.checked } })} className="rounded accent-indigo-600" />
                  Required
                </label>
              )}
            </div>
          ))}
        </div>
      </ConfigSection>
    )
  }

  if (type === 'social_follow') {
    const c = config as Partial<SocialFollowConfig>
    return (
      <ConfigSection title="Label">
        <OptionPicker label="Label Type" value={c.label_type ?? 'network_name'} onChange={v => set('label_type', v)} columns={3} options={[{ value: 'network_name', label: 'Network' }, { value: 'follow_us', label: 'Follow Us' }, { value: 'custom', label: 'Custom' }]} />
        {c.label_type === 'custom' && (
          <>
            <label className="block text-xs font-medium text-gray-600 mt-3 mb-1">Custom Label</label>
            <input type="text" value={c.custom_label ?? ''} onChange={e => set('custom_label', e.target.value)} placeholder="Follow us" className={INPUT} />
          </>
        )}
        <ToggleSwitch label="Show labels" checked={c.show_labels !== false} onChange={v => set('show_labels', v)} />
      </ConfigSection>
    )
  }

  if (type === 'instagram_feed') {
    const c = config as Partial<InstagramFeedConfig>
    return (
      <ConfigSection title="Post Display">
        <ToggleSwitch label="Show caption"         checked={!!c.show_caption}           onChange={v => set('show_caption', v)} />
        <ToggleSwitch label="Show likes count"     checked={c.show_likes      !== false} onChange={v => set('show_likes', v)} />
        <ToggleSwitch label="Show video play icon" checked={c.show_video_icon !== false} onChange={v => set('show_video_icon', v)} />
        <OptionPicker label="Link To" value={c.link_behavior ?? 'instagram'} onChange={v => set('link_behavior', v)} columns={3} options={[{ value: 'instagram', label: 'Instagram' }, { value: 'lightbox', label: 'Lightbox' }, { value: 'none', label: 'None' }]} />
      </ConfigSection>
    )
  }

  if (type === 'tiktok_feed') {
    const c = config as Partial<TikTokFeedConfig>
    return (
      <ConfigSection title="Video Display">
        <ToggleSwitch label="Show duration"     checked={c.show_duration   !== false} onChange={v => set('show_duration', v)} />
        <ToggleSwitch label="Show view count"   checked={c.show_view_count !== false} onChange={v => set('show_view_count', v)} />
        <ToggleSwitch label="Show like count"   checked={c.show_like_count !== false} onChange={v => set('show_like_count', v)} />
        <ToggleSwitch label="Show caption"      checked={!!c.show_caption}            onChange={v => set('show_caption', v)} />
        <ToggleSwitch label="Autoplay on hover" checked={!!c.autoplay_on_hover}       onChange={v => set('autoplay_on_hover', v)} />
      </ConfigSection>
    )
  }

  return <p className="text-xs text-gray-400 py-4">No card settings for this widget type.</p>
}

// ── Panel: Style ───────────────────────────────────────────────────────────
function StylePanel({ type, config, onChange }: { type: string; config: Record<string, unknown>; onChange: (c: Record<string, unknown>) => void }) {
  const set = (k: string, v: unknown) => onChange({ ...config, [k]: v })

  if (type === 'whatsapp') {
    const c = config as Partial<WhatsAppConfig>
    return (
      <ConfigSection title="Colors">
        <ColorPicker label="Button Color" value={c.button_color ?? '#25D366'} onChange={v => set('button_color', v)} presets={['#25D366', '#128C7E', '#6366f1', '#8b5cf6', '#ef4444', '#3b82f6']} />
      </ConfigSection>
    )
  }

  if (type === 'youtube_feed') {
    const c = config as Partial<YouTubeFeedConfig>
    return (
      <ConfigSection title="Theme & Colors">
        <OptionPicker label="Theme" value={c.theme ?? 'light'} onChange={v => set('theme', v)} columns={2} options={[{ value: 'light', label: 'Light' }, { value: 'dark', label: 'Dark' }]} />
        <ColorPicker label="Accent Color" value={c.accent_color ?? '#ff0000'} onChange={v => set('accent_color', v)} presets={['#ff0000', '#6366f1', '#10b981', '#f59e0b', '#ec4899', '#3b82f6']} />
        <ColorPicker label="Subscribe Button" value={c.subscribe_button_color ?? '#ff0000'} onChange={v => set('subscribe_button_color', v)} presets={['#ff0000', '#6366f1', '#10b981', '#f59e0b', '#ec4899', '#3b82f6']} />
      </ConfigSection>
    )
  }

  if (type === 'google_reviews') {
    const c = config as Partial<GoogleReviewsConfig>
    return (
      <ConfigSection title="Theme & Colors">
        <OptionPicker label="Theme" value={c.theme ?? 'light'} onChange={v => set('theme', v)} columns={2} options={[{ value: 'light', label: 'Light' }, { value: 'dark', label: 'Dark' }]} />
        <ColorPicker label="Accent Color" value={c.accent_color ?? '#4285f4'} onChange={v => set('accent_color', v)} />
      </ConfigSection>
    )
  }

  if (type === 'testimonials') {
    const c = config as Partial<TestimonialsConfig>
    return (
      <div className="space-y-4">
        <ConfigSection title="Theme">
          <OptionPicker label="Theme" value={c.theme ?? 'light'} onChange={v => set('theme', v)} columns={2} options={[{ value: 'light', label: 'Light' }, { value: 'dark', label: 'Dark' }]} />
        </ConfigSection>
        <ConfigSection title="Slider Controls">
          <ToggleSwitch label="Autoplay"    checked={c.autoplay    !== false} onChange={v => set('autoplay', v)} />
          <ToggleSwitch label="Show arrows" checked={c.show_arrows !== false} onChange={v => set('show_arrows', v)} />
          <ToggleSwitch label="Show dots"   checked={!!c.show_dots}           onChange={v => set('show_dots', v)} />
        </ConfigSection>
      </div>
    )
  }

  if (type === 'countdown_timer') {
    const c = config as Partial<CountdownTimerConfig>
    return (
      <div className="space-y-4">
        <ConfigSection title="Theme">
          <OptionPicker label="Theme" value={c.theme ?? 'light'} onChange={v => set('theme', v)} columns={2} options={[{ value: 'light', label: 'Light' }, { value: 'dark', label: 'Dark' }]} />
        </ConfigSection>
        <ConfigSection title="Colors">
          <ColorPicker label="Accent Color" value={c.accent_color ?? '#8b5cf6'} onChange={v => set('accent_color', v)} />
          <ColorPicker label="Background"   value={c.bg_color    ?? '#ffffff'} onChange={v => set('bg_color', v)} />
          <ColorPicker label="Text Color"   value={c.text_color  ?? '#1a1a1a'} onChange={v => set('text_color', v)} />
        </ConfigSection>
        <ConfigSection title="Typography">
          <OptionPicker label="Font" value={c.font_family ?? 'system'} onChange={v => set('font_family', v)} columns={3} options={[{ value: 'system', label: 'System' }, { value: 'mono', label: 'Mono' }, { value: 'serif', label: 'Serif' }]} />
          <OptionPicker label="Separator" value={c.separator_style ?? 'colon'} onChange={v => set('separator_style', v)} columns={4} options={[{ value: 'colon', label: ':' }, { value: 'slash', label: '/' }, { value: 'dot', label: '·' }, { value: 'none', label: 'None' }]} />
        </ConfigSection>
      </div>
    )
  }

  if (type === 'announcement_bar') {
    const c = config as Partial<AnnouncementBarConfig>
    return (
      <ConfigSection title="Colors & Style">
        <OptionPicker label="Bar Style" value={c.style ?? 'solid'} onChange={v => set('style', v)} columns={3} options={[{ value: 'solid', label: 'Solid' }, { value: 'gradient', label: 'Gradient' }, { value: 'striped', label: 'Striped' }]} />
        <ColorPicker label="Background" value={c.bg_color   ?? '#6366f1'} onChange={v => set('bg_color', v)} />
        <ColorPicker label="Text"       value={c.text_color ?? '#ffffff'} onChange={v => set('text_color', v)} />
        <ColorPicker label="Link"       value={c.link_color ?? '#ffffff'} onChange={v => set('link_color', v)} />
      </ConfigSection>
    )
  }

  if (type === 'contact_form') {
    const c = config as Partial<ContactFormConfig>
    return (
      <ConfigSection title="Design">
        <OptionPicker label="Theme" value={c.theme ?? 'light'} onChange={v => set('theme', v)} columns={2} options={[{ value: 'light', label: 'Light' }, { value: 'dark', label: 'Dark' }]} />
        <ColorPicker label="Accent Color" value={c.accent_color ?? '#6366f1'} onChange={v => set('accent_color', v)} />
        <RangeSlider label="Border Radius" value={c.border_radius ?? 8} onChange={v => set('border_radius', v)} min={0} max={20} unit="px" />
      </ConfigSection>
    )
  }

  if (type === 'social_follow') {
    const c = config as Partial<SocialFollowConfig>
    return (
      <ConfigSection title="Design">
        <OptionPicker label="Theme" value={c.theme ?? 'light'} onChange={v => set('theme', v)} columns={2} options={[{ value: 'light', label: 'Light' }, { value: 'dark', label: 'Dark' }]} />
        <OptionPicker label="Style" value={c.style ?? 'filled'} onChange={v => set('style', v)} columns={3} options={[{ value: 'filled', label: 'Filled' }, { value: 'outline', label: 'Outline' }, { value: 'minimal', label: 'Minimal' }]} />
        <OptionPicker label="Animation" value={c.animation ?? 'hover_grow'} onChange={v => set('animation', v)} columns={3} options={[{ value: 'none', label: 'None' }, { value: 'hover_grow', label: 'Grow' }, { value: 'hover_bounce', label: 'Bounce' }]} />
        <RangeSlider label="Border Radius" value={c.border_radius ?? 50} onChange={v => set('border_radius', v)} min={0} max={50} unit="px" />
      </ConfigSection>
    )
  }

  if (type === 'instagram_feed') {
    const c = config as Partial<InstagramFeedConfig>
    return (
      <ConfigSection title="Theme">
        <OptionPicker label="Theme" value={c.theme ?? 'light'} onChange={v => set('theme', v)} columns={3} options={[{ value: 'light', label: 'Light' }, { value: 'dark', label: 'Dark' }, { value: 'auto', label: 'Auto' }]} />
      </ConfigSection>
    )
  }

  if (type === 'tiktok_feed') {
    const c = config as Partial<TikTokFeedConfig>
    return (
      <ConfigSection title="Theme">
        <OptionPicker label="Theme" value={c.theme ?? 'light'} onChange={v => set('theme', v)} columns={3} options={[{ value: 'light', label: 'Light' }, { value: 'dark', label: 'Dark' }, { value: 'auto', label: 'Auto' }]} />
      </ConfigSection>
    )
  }

  if (type === 'faq_accordion') {
    return (
      <ConfigSection title="Design">
        <OptionPicker label="Theme" value={(config.theme as string) ?? 'light'} onChange={v => set('theme', v)} columns={2} options={[{ value: 'light', label: 'Light' }, { value: 'dark', label: 'Dark' }]} />
        <ColorPicker label="Accent Color" value={(config.accent_color as string) ?? '#6366f1'} onChange={v => set('accent_color', v)} presets={['#6366f1', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#3b82f6']} />
        <RangeSlider label="Border Radius" value={(config.border_radius as number) ?? 8} onChange={v => set('border_radius', v)} min={0} max={20} unit="px" />
      </ConfigSection>
    )
  }

  if (type === 'number_counter') {
    return (
      <ConfigSection title="Design">
        <OptionPicker label="Theme" value={(config.theme as string) ?? 'light'} onChange={v => set('theme', v)} columns={2} options={[{ value: 'light', label: 'Light' }, { value: 'dark', label: 'Dark' }]} />
        <ColorPicker label="Number Color" value={(config.accent_color as string) ?? '#6366f1'} onChange={v => set('accent_color', v)} presets={['#6366f1', '#8b5cf6', '#10b981', '#f59e0b', '#06b6d4', '#3b82f6']} />
      </ConfigSection>
    )
  }

  if (type === 'google_maps') {
    return (
      <ConfigSection title="Map Style">
        <RangeSlider label="Border Radius" value={(config.border_radius as number) ?? 12} onChange={v => set('border_radius', v)} min={0} max={24} unit="px" />
      </ConfigSection>
    )
  }

  return <p className="text-xs text-gray-400 py-4">No style settings for this widget type.</p>
}

// ── Panel: Settings ────────────────────────────────────────────────────────
function SettingsPanel({ type, config, onChange, planName }: { type: string; config: Record<string, unknown>; onChange: (c: Record<string, unknown>) => void; planName: string }) {
  const set = (k: string, v: unknown) => onChange({ ...config, [k]: v })
  const isFree = planName === 'free'

  return (
    <div className="space-y-4">
      {type === 'whatsapp' && (() => {
        const c = config as Partial<WhatsAppConfig>
        return (
          <ConfigSection title="Visibility">
            <ToggleSwitch label="Show on mobile"  checked={c.show_on_mobile  !== false} onChange={v => set('show_on_mobile', v)} />
            <ToggleSwitch label="Show on desktop" checked={c.show_on_desktop !== false} onChange={v => set('show_on_desktop', v)} />
            <OptionPicker label="Open in" value={c.open_in ?? 'new_tab'} onChange={v => set('open_in', v)} columns={2} options={[{ value: 'new_tab', label: 'New tab' }, { value: 'same_tab', label: 'Same tab' }]} />
          </ConfigSection>
        )
      })()}

      <ConfigSection title="Custom CSS">
        {isFree ? (
          <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-4 text-center space-y-2">
            <Lock size={18} className="text-indigo-400 mx-auto" />
            <p className="text-xs font-semibold text-indigo-800">Pro feature</p>
            <p className="text-[11px] text-indigo-600">Upgrade to inject custom CSS into your widget embed.</p>
            <Link href="/dashboard/billing" className="inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700 transition-colors">Upgrade to Pro →</Link>
          </div>
        ) : (
          <textarea
            value={(config.custom_css as string) ?? ''}
            onChange={e => set('custom_css', e.target.value)}
            placeholder={`.widget-card { border-radius: 16px; }\n.widget-title { font-size: 18px; }`}
            rows={10}
            className="w-full px-3 py-3 border border-gray-200 rounded-lg text-xs font-mono bg-gray-50 focus:ring-2 focus:ring-indigo-500 outline-none resize-none leading-relaxed"
          />
        )}
      </ConfigSection>
    </div>
  )
}

// ── Install Modal ──────────────────────────────────────────────────────────
type Platform = 'wordpress' | 'shopify' | 'wix' | 'webflow' | 'squarespace' | 'html' | 'other'

const INSTALL_PLATFORMS: { id: Platform; label: string }[] = [
  { id: 'wordpress',   label: 'WordPress' },
  { id: 'shopify',     label: 'Shopify' },
  { id: 'wix',         label: 'Wix' },
  { id: 'webflow',     label: 'Webflow' },
  { id: 'squarespace', label: 'Squarespace' },
  { id: 'html',        label: 'HTML' },
  { id: 'other',       label: 'Other' },
]

const INSTALL_STEPS: Record<Platform, string[]> = {
  wordpress:   ['Log in to your WordPress admin panel.', 'Go to Appearance → Theme Editor, or use a Custom HTML block in the Gutenberg editor.', 'Paste the embed code where you want the widget to appear.', 'Click Save / Publish.'],
  shopify:     ['Log in to your Shopify admin.', 'Go to Online Store → Themes → Edit code.', 'Open theme.liquid and paste the code just before the closing </body> tag.', 'Click Save.'],
  wix:         ['Open your Wix editor.', 'Click + Add → Embed → HTML Code.', 'Paste the embed code into the HTML editor.', 'Click Apply and publish your site.'],
  webflow:     ['Open the Webflow Designer.', 'Add an Embed element from the Add panel (shortcut: E).', 'Paste the code into the embed editor.', 'Click Save & Close, then Publish.'],
  squarespace: ['Open the Squarespace page editor.', 'Add a Code Block where you want the widget.', 'Paste the embed code.', 'Click Apply and Save.'],
  html:        ['Open your HTML file in a text editor.', 'Paste the code anywhere inside the <body> tag, where you want the widget to appear.', 'Save and upload your file.'],
  other:       ['Open your site builder or CMS.', 'Find an option to add custom HTML or a script tag.', 'Paste the embed code in the <body> section of your page.', 'Save and publish.'],
}

function InstallModal({ widgetId, widgetName, onClose }: { widgetId: string; widgetName: string; onClose: () => void }) {
  const [platform, setPlatform] = useState<Platform>('html')
  const [copied, setCopied] = useState(false)
  const code = `<script\n  src="${EMBED_ORIGIN}/widget.js"\n  data-widget-id="${widgetId}">\n</script>`

  async function copy() {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="font-bold text-gray-900">Install Widget</h2>
            <p className="text-xs text-gray-500 mt-0.5">{widgetName} — choose your platform</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"><X size={16} /></button>
        </div>

        {/* Platform tabs */}
        <div className="px-6 pt-4">
          <div className="flex flex-wrap gap-1.5">
            {INSTALL_PLATFORMS.map(p => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPlatform(p.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${platform === p.id ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div className="px-6 py-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Steps</p>
          <ol className="space-y-3">
            {INSTALL_STEPS[platform].map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5">{i + 1}</span>
                <span className="text-sm text-gray-700 leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Embed code */}
        <div className="px-6 pb-6">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Embed Code</p>
          <pre className="bg-gray-900 text-green-400 text-xs font-mono px-4 py-3 rounded-xl overflow-x-auto leading-relaxed">{code}</pre>
          <button onClick={copy} className={`mt-3 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-colors ${copied ? 'bg-green-600 text-white' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}>
            {copied ? <><Check size={15} /> Copied!</> : <><Copy size={15} /> Copy embed code</>}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Main Configurator Page ─────────────────────────────────────────────────
export default function ConfiguratorPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [widget, setWidget]           = useState<Widget | null>(null)
  const [config, setConfig]           = useState<Record<string, unknown>>({})
  const [name, setName]               = useState('')
  const [activePanel, setActivePanel] = useState<PanelId | null>('content')
  const [device, setDevice]           = useState<Device>('desktop')
  const [saveStatus, setSaveStatus]   = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [publishing, setPublishing]   = useState(false)
  const [showInstall, setShowInstall] = useState(false)
  const [planName, setPlanName]       = useState('free')
  const [nameEditing, setNameEditing] = useState(false)

  const configRef    = useRef<Record<string, unknown>>({})
  const nameRef      = useRef('')
  const autoSaveRef  = useRef<ReturnType<typeof setTimeout> | null>(null)
  const iframeRef    = useRef<HTMLIFrameElement>(null)

  const load = useCallback(async () => {
    const res = await fetch(`/api/widgets/${id}`)
    if (!res.ok) return
    const { widget } = await res.json()
    configRef.current = widget.config ?? {}
    nameRef.current   = widget.name ?? ''
    setWidget(widget)
    setConfig(widget.config ?? {})
    setName(widget.name ?? '')
  }, [id])

  useEffect(() => {
    load()
    fetch('/api/plan').then(r => r.json()).then(d => setPlanName(d.plan?.name?.toLowerCase() ?? 'free')).catch(() => {})
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [load])

  const previewHtml = useMemo(
    () => widget ? generatePreviewHTML(widget.type, config) : '',
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [widget?.type, JSON.stringify(config)]
  )

  // Force iframe reload via direct IDL property — React's srcDoc prop uses setAttribute
  // which doesn't trigger a reload in all browsers
  useEffect(() => {
    if (iframeRef.current) iframeRef.current.srcdoc = previewHtml
  }, [previewHtml])

  function scheduleAutoSave() {
    if (autoSaveRef.current) clearTimeout(autoSaveRef.current)
    setSaveStatus('idle')
    autoSaveRef.current = setTimeout(async () => {
      setSaveStatus('saving')
      try {
        const res = await fetch(`/api/widgets/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: nameRef.current, config: configRef.current }),
        })
        setSaveStatus(res.ok ? 'saved' : 'error')
        setTimeout(() => setSaveStatus('idle'), 2500)
      } catch {
        setSaveStatus('error')
        setTimeout(() => setSaveStatus('idle'), 2500)
      }
    }, 1500)
  }

  function handleConfigChange(newConfig: Record<string, unknown>) {
    configRef.current = newConfig
    setConfig(newConfig)
    scheduleAutoSave()
  }

  function handleNameChange(val: string) {
    nameRef.current = val
    setName(val)
    scheduleAutoSave()
  }

  async function handlePublish() {
    setPublishing(true)
    await fetch(`/api/widgets/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: nameRef.current, config: configRef.current, is_active: true }),
    })
    setPublishing(false)
    setShowInstall(true)
  }

  if (!widget) {
    return (
      <div className="fixed inset-0 z-50 bg-white flex items-center justify-center">
        <div className="animate-pulse text-gray-400 text-sm">Loading widget…</div>
      </div>
    )
  }

  const meta = TYPE_META[widget.type] ?? { label: widget.type, Icon: SettingsIcon, color: '#6366f1' }
  const DEVICE_WIDTHS: Record<Device, string | undefined> = { desktop: undefined, tablet: '768px', mobile: '390px' }
  const panelOpen = activePanel !== null

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white overflow-hidden">

      {/* ── Top bar ── */}
      <div className="h-14 shrink-0 flex items-center gap-3 px-4 border-b border-gray-200 bg-white">
        <Link href="/dashboard/widgets" className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors shrink-0">
          <ArrowLeft size={16} />
        </Link>

        {/* Widget type icon */}
        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${meta.color}20` }}>
          <meta.Icon size={16} style={{ color: meta.color }} />
        </div>

        {/* Widget name — inline editable */}
        <div className="flex-1 min-w-0">
          {nameEditing ? (
            <input
              autoFocus
              value={name}
              onChange={e => handleNameChange(e.target.value)}
              onBlur={() => setNameEditing(false)}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === 'Escape') setNameEditing(false) }}
              className="text-sm font-semibold text-gray-900 bg-transparent border-b-2 border-indigo-500 outline-none w-full max-w-xs"
            />
          ) : (
            <button type="button" onClick={() => setNameEditing(true)} className="text-sm font-semibold text-gray-900 hover:text-indigo-600 transition-colors truncate max-w-xs block text-left">
              {name || 'Untitled Widget'}
            </button>
          )}
        </div>

        {/* Auto-save indicator */}
        <div className="flex items-center gap-1.5 shrink-0">
          {saveStatus === 'saving' && (
            <span className="flex items-center gap-1 text-[11px] text-gray-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              Saving…
            </span>
          )}
          {saveStatus === 'saved' && (
            <span className="flex items-center gap-1 text-[11px] text-green-600 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              Saved
            </span>
          )}
          {saveStatus === 'error' && (
            <span className="flex items-center gap-1 text-[11px] text-red-500 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              Error
            </span>
          )}
        </div>

        {/* View plans link */}
        <Link href="/dashboard/billing" className="hidden sm:flex items-center gap-1 text-xs text-gray-400 hover:text-indigo-600 transition-colors font-medium shrink-0">
          <ExternalLink size={12} /> View Plans
        </Link>

        {/* Publish button */}
        <button
          type="button"
          onClick={handlePublish}
          disabled={publishing}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white text-sm font-bold rounded-lg hover:bg-emerald-600 transition-colors disabled:opacity-60 shrink-0 shadow-sm"
        >
          {publishing ? 'Publishing…' : 'Publish'}
        </button>

        {/* Close */}
        <button
          type="button"
          onClick={() => router.push('/dashboard/widgets')}
          className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors shrink-0"
        >
          <X size={16} />
        </button>
      </div>

      {/* ── Body ── */}
      <div className="flex flex-1 min-h-0">

        {/* Icon sidebar — 60px, dark */}
        <div className="w-[60px] shrink-0 flex flex-col items-center py-3 gap-1" style={{ background: '#1a1a2e' }}>
          {PANELS.map(({ id: panelId, Icon, label }) => {
            const active = activePanel === panelId
            return (
              <div key={panelId} className="relative group w-full flex justify-center">
                <button
                  type="button"
                  onClick={() => setActivePanel(active ? null : panelId)}
                  className={`w-10 h-10 flex items-center justify-center rounded-xl transition-colors ${active ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:bg-white/10 hover:text-white'}`}
                  aria-label={label}
                >
                  <Icon size={18} />
                </button>
                {/* Tooltip */}
                <div className="absolute left-[54px] top-1/2 -translate-y-1/2 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-gray-900 text-white text-xs font-medium px-2.5 py-1.5 rounded-lg whitespace-nowrap shadow-lg">
                    {label}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Sliding panel — 280px */}
        <div
          className="flex flex-col bg-white border-r border-gray-200 overflow-hidden transition-all duration-200 ease-in-out shrink-0"
          style={{ width: panelOpen ? 280 : 0 }}
        >
          {panelOpen && activePanel && (
            <>
              <div className="px-4 py-3 border-b border-gray-100 shrink-0">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  {PANELS.find(p => p.id === activePanel)?.label}
                </p>
              </div>
              <div className="flex-1 overflow-y-auto px-4 py-4">
                {activePanel === 'content'  && <ContentPanel  type={widget.type} config={config} onChange={handleConfigChange} />}
                {activePanel === 'header'   && <HeaderPanel   type={widget.type} config={config} onChange={handleConfigChange} />}
                {activePanel === 'layout'   && <LayoutPanel   type={widget.type} config={config} onChange={handleConfigChange} />}
                {activePanel === 'card'     && <CardPanel     type={widget.type} config={config} onChange={handleConfigChange} />}
                {activePanel === 'style'    && <StylePanel    type={widget.type} config={config} onChange={handleConfigChange} />}
                {activePanel === 'settings' && <SettingsPanel type={widget.type} config={config} onChange={handleConfigChange} planName={planName} />}
              </div>
            </>
          )}
        </div>

        {/* Preview area — full remaining space */}
        <div className="flex-1 relative flex flex-col min-w-0" style={{ background: '#f0f4ff' }}>

          {/* Device toggle — floating top-right */}
          <div className="absolute top-4 right-4 z-10 flex items-center gap-1 bg-white rounded-xl border border-gray-200 p-1 shadow-sm">
            {([
              { id: 'desktop' as Device, Icon: Monitor },
              { id: 'tablet'  as Device, Icon: Tablet },
              { id: 'mobile'  as Device, Icon: Smartphone },
            ] as const).map(({ id: d, Icon }) => (
              <button
                key={d}
                type="button"
                onClick={() => setDevice(d)}
                className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${device === d ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-gray-700 hover:bg-gray-100'}`}
              >
                <Icon size={14} />
              </button>
            ))}
          </div>

          {/* Iframe preview */}
          <div className="flex-1 flex items-start justify-center overflow-auto p-8 pt-16">
            <div
              className="transition-all duration-300 bg-white shadow-xl rounded-xl overflow-hidden"
              style={{ width: DEVICE_WIDTHS[device] ?? '100%', minHeight: 480 }}
            >
              <iframe
                ref={iframeRef}
                srcDoc={previewHtml}
                sandbox="allow-scripts allow-same-origin"
                style={{ width: '100%', minHeight: 480, border: 'none', background: 'transparent', display: 'block' }}
                title="Widget preview"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Install modal */}
      {showInstall && <InstallModal widgetId={id} widgetName={name} onClose={() => setShowInstall(false)} />}
    </div>
  )
}

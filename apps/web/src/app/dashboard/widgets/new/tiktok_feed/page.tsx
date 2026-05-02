'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Check } from 'lucide-react'
import Link from 'next/link'

interface TikTokVideo {
  id: string
  thumbnail: string
  caption: string
  views: number
  likes: number
  comments: number
  shares: number
  duration: string
  timestamp: string
}

interface TikTokProfile {
  username: string
  display_name: string
  avatar: string
  followers: number
  following: number
  likes: number
  bio: string
  videos: TikTokVideo[]
}

interface Config {
  username: string
  layout: 'grid' | 'carousel' | 'list'
  columns: 2 | 3 | 4
  show_duration: boolean
  show_view_count: boolean
  show_caption: boolean
  show_like_count: boolean
  border_radius: '0px' | '8px' | '16px' | 'round'
  gap: '4px' | '8px' | '12px' | '16px'
  num_videos: 6 | 9 | 12
  autoplay_on_hover: boolean
  theme: 'light' | 'dark' | 'auto'
}

const DEFAULT_CONFIG: Config = {
  username: '',
  layout: 'grid',
  columns: 3,
  show_duration: true,
  show_view_count: true,
  show_caption: false,
  show_like_count: true,
  border_radius: '8px',
  gap: '8px',
  num_videos: 9,
  autoplay_on_hover: false,
  theme: 'light',
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${checked ? 'bg-blue-600' : 'bg-gray-200'}`}
    >
      <span className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  )
}

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return String(n)
}

function TikTokPreview({ profile, config }: { profile: TikTokProfile | null; config: Config }) {
  if (!profile) {
    return (
      <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center min-h-[320px]">
        <div className="text-center px-6">
          <div className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center mx-auto mb-3">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.94a8.16 8.16 0 0 0 4.77 1.52V7.03a4.85 4.85 0 0 1-1-.34z"/></svg>
            </div>
          <p className="text-sm text-gray-500 font-medium">Enter a username and click &quot;Fetch Profile&quot;</p>
          <p className="text-xs text-gray-400 mt-1">Mock data will load instantly</p>
        </div>
      </div>
    )
  }

  const darkMode = config.theme === 'dark'
  const bg = darkMode ? '#1a1a1a' : '#ffffff'
  const textColor = darkMode ? '#ffffff' : '#0f0f0f'
  const subtextColor = darkMode ? '#aaaaaa' : '#666666'
  const cardBg = darkMode ? '#2a2a2a' : '#f9f9f9'
  const borderColor = darkMode ? '#333333' : '#eeeeee'
  const borderRadius = config.border_radius === 'round' ? '50%' : config.border_radius

  const videos = profile.videos.slice(0, config.num_videos)

  const renderGridCard = (video: TikTokVideo) => (
    <div
      key={video.id}
      className="group"
      style={{ borderRadius, overflow: 'hidden', background: cardBg, transition: 'transform 0.2s' }}
    >
      <div style={{ position: 'relative', paddingTop: '177.78%', overflow: 'hidden', background: '#000' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={video.thumbnail}
          alt=""
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          className="group-hover:scale-105 transition-transform duration-300"
        />
        {/* Play icon */}
        <div style={{
          position: 'absolute', bottom: 6, left: 6,
          background: 'rgba(0,0,0,0.5)', color: 'white',
          width: 22, height: 22, borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 9,
        }}>▶</div>
        {/* Duration */}
        {config.show_duration && (
          <div style={{
            position: 'absolute', bottom: 6, right: 6,
            background: 'rgba(0,0,0,0.7)', color: 'white',
            fontSize: 10, padding: '2px 5px', borderRadius: 3, fontWeight: 600,
          }}>{video.duration}</div>
        )}
        {/* View count */}
        {config.show_view_count && (
          <div style={{
            position: 'absolute', bottom: config.show_duration ? 30 : 6, right: 6,
            background: 'rgba(0,0,0,0.6)', color: 'white',
            fontSize: 10, padding: '2px 5px', borderRadius: 3,
          }}>{formatNumber(video.views)} views</div>
        )}
      </div>
      {config.show_like_count && (
        <div style={{ padding: '5px 8px', fontSize: 11, color: subtextColor }}>
          ♥ {formatNumber(video.likes)}
        </div>
      )}
      {config.show_caption && (
        <p style={{ fontSize: 11, color: subtextColor, padding: '0 8px 6px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {video.caption}
        </p>
      )}
    </div>
  )

  const renderListItem = (video: TikTokVideo) => (
    <div key={video.id} style={{ display: 'flex', gap: 12, padding: 10, background: cardBg, borderRadius, alignItems: 'flex-start' }}>
      <div style={{ position: 'relative', flexShrink: 0, width: 64 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={video.thumbnail}
          alt=""
          style={{ width: 64, height: 114, objectFit: 'cover', borderRadius: 6, display: 'block' }}
        />
        {config.show_duration && (
          <div style={{
            position: 'absolute', bottom: 3, right: 3,
            background: 'rgba(0,0,0,0.7)', color: 'white',
            fontSize: 9, padding: '1px 4px', borderRadius: 2, fontWeight: 600,
          }}>{video.duration}</div>
        )}
      </div>
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
        {config.show_caption && (
          <p style={{ fontSize: 12, color: textColor, lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {video.caption}
          </p>
        )}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {config.show_view_count && <span style={{ fontSize: 11, color: subtextColor }}>{formatNumber(video.views)} views</span>}
          {config.show_like_count && <span style={{ fontSize: 11, color: subtextColor }}>♥ {formatNumber(video.likes)}</span>}
        </div>
      </div>
    </div>
  )

  return (
    <div style={{ background: bg, borderRadius: 12, overflow: 'hidden', border: `1px solid ${borderColor}` }}>
      {/* Profile header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderBottom: `1px solid ${borderColor}` }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={profile.avatar} alt="" style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover' }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: textColor }}>{profile.display_name}</div>
          <div style={{ fontSize: 12, color: subtextColor }}>@{profile.username}</div>
        </div>
        <div style={{ display: 'flex', gap: 16, flexShrink: 0 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: textColor }}>{formatNumber(profile.followers)}</div>
            <div style={{ fontSize: 10, color: subtextColor }}>Followers</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: textColor }}>{formatNumber(profile.likes)}</div>
            <div style={{ fontSize: 10, color: subtextColor }}>Likes</div>
          </div>
        </div>
      </div>

      {/* Videos */}
      <div style={{ padding: 12 }}>
        {config.layout === 'grid' && (
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${config.columns}, 1fr)`, gap: config.gap }}>
            {videos.map(renderGridCard)}
          </div>
        )}
        {config.layout === 'carousel' && (
          <div style={{ display: 'flex', gap: config.gap, overflowX: 'auto', scrollbarWidth: 'none' }}>
            {videos.map(v => (
              <div key={v.id} style={{ flex: `0 0 ${Math.floor(260 / config.columns)}px` }}>
                {renderGridCard(v)}
              </div>
            ))}
          </div>
        )}
        {config.layout === 'list' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: config.gap }}>
            {videos.map(renderListItem)}
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', padding: '8px 16px', borderTop: `1px solid ${borderColor}` }}>
        <span style={{ fontSize: 10, color: subtextColor, opacity: 0.7 }}>Powered by Devixus Widgets</span>
      </div>
    </div>
  )
}

export default function NewTikTokFeedPage() {
  const router = useRouter()
  const [config, setConfig] = useState<Config>(DEFAULT_CONFIG)
  const [username, setUsername] = useState('')
  const [profile, setProfile] = useState<TikTokProfile | null>(null)
  const [fetching, setFetching] = useState(false)
  const [fetchError, setFetchError] = useState<string | null>(null)
  const [creating, setCreating] = useState(false)
  const [createError, setCreateError] = useState<string | null>(null)

  function set<K extends keyof Config>(key: K, val: Config[K]) {
    setConfig(c => ({ ...c, [key]: val }))
  }

  async function fetchProfile() {
    if (!username.trim()) return
    setFetching(true)
    setFetchError(null)
    try {
      const res = await fetch(`/api/widgets/tiktok?username=${encodeURIComponent(username.trim())}`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Failed to fetch profile')
      setProfile(data)
      set('username', username.trim())
    } catch (err) {
      setFetchError(err instanceof Error ? err.message : 'Failed to fetch profile')
    } finally {
      setFetching(false)
    }
  }

  async function handleCreate() {
    setCreating(true)
    setCreateError(null)
    try {
      const widgetName = `TikTok Feed${config.username ? ` — @${config.username}` : ''}`
      const res = await fetch('/api/widgets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: widgetName, type: 'tiktok_feed', config }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Failed to create widget')
      router.push(`/dashboard/widgets/${data.widget.id}`)
    } catch (err) {
      setCreateError(err instanceof Error ? err.message : 'Failed to create widget')
      setCreating(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link href="/dashboard/widgets" className="text-gray-400 hover:text-gray-600 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: '#010101' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.94a8.16 8.16 0 0 0 4.77 1.52V7.03a4.85 4.85 0 0 1-1-.34z"/></svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">TikTok Feed</h1>
            <p className="text-sm text-gray-500">Embed your TikTok videos on any website</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-6 items-start">
        {/* Left — Form */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-5">

            {/* Username + Fetch */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">TikTok Username</label>
              <div className="flex gap-2">
                <input
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && fetchProfile()}
                  placeholder="@yourusername"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={fetchProfile}
                  disabled={!username.trim() || fetching}
                  className="px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 whitespace-nowrap"
                >
                  {fetching ? '…' : 'Fetch Profile'}
                </button>
              </div>
              {profile && (
                <p className="text-xs text-green-600 mt-1.5 flex items-center gap-1">
                  <Check size={12} /> @{profile.username} loaded ({profile.videos.length} videos)
                </p>
              )}
              {fetchError && <p className="text-xs text-red-600 mt-1.5">{fetchError}</p>}
            </div>

            {/* Layout */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Layout</label>
              <div className="flex gap-4">
                {(['grid', 'carousel', 'list'] as const).map(l => (
                  <label key={l} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="tt-layout" checked={config.layout === l} onChange={() => set('layout', l)} />
                    <span className="text-sm text-gray-700 capitalize">{l}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Columns (grid/carousel only) */}
            {config.layout !== 'list' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Columns</label>
                <div className="flex gap-4">
                  {([2, 3, 4] as const).map(c => (
                    <label key={c} className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="tt-cols" checked={config.columns === c} onChange={() => set('columns', c)} />
                      <span className="text-sm text-gray-700">{c}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Toggles */}
            <div className="flex flex-col gap-3">
              {([
                ['show_duration', 'Show video duration'] as const,
                ['show_view_count', 'Show view count'] as const,
                ['show_caption', 'Show caption'] as const,
                ['show_like_count', 'Show like count'] as const,
                ['autoplay_on_hover', 'Autoplay on hover'] as const,
              ]).map(([key, label]) => (
                <label key={key} className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm text-gray-700">{label}</span>
                  <Toggle checked={!!config[key]} onChange={v => set(key, v)} />
                </label>
              ))}
            </div>

            {/* Border radius */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Border Radius</label>
              <div className="flex gap-3 flex-wrap">
                {(['0px', '8px', '16px', 'round'] as const).map(r => (
                  <label key={r} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="tt-radius" checked={config.border_radius === r} onChange={() => set('border_radius', r)} />
                    <span className="text-sm text-gray-700">{r}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Gap */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gap</label>
              <div className="flex gap-3 flex-wrap">
                {(['4px', '8px', '12px', '16px'] as const).map(g => (
                  <label key={g} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="tt-gap" checked={config.gap === g} onChange={() => set('gap', g)} />
                    <span className="text-sm text-gray-700">{g}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Number of videos */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Number of Videos</label>
              <div className="flex gap-4">
                {([6, 9, 12] as const).map(n => (
                  <label key={n} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="tt-num" checked={config.num_videos === n} onChange={() => set('num_videos', n)} />
                    <span className="text-sm text-gray-700">{n}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Theme */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
              <div className="flex gap-4">
                {(['light', 'dark', 'auto'] as const).map(t => (
                  <label key={t} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="tt-theme" checked={config.theme === t} onChange={() => set('theme', t)} />
                    <span className="text-sm text-gray-700 capitalize">{t}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Create button */}
          <button
            onClick={handleCreate}
            disabled={creating}
            className="w-full py-3 text-white text-sm font-semibold rounded-xl transition-opacity hover:opacity-90 disabled:opacity-60"
            style={{ background: '#010101' }}
          >
            {creating ? 'Creating widget…' : 'Create TikTok Feed Widget'}
          </button>
          {createError && (
            <p className="text-sm text-red-600 text-center bg-red-50 rounded-lg p-3">{createError}</p>
          )}
        </div>

        {/* Right — Live Preview */}
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-700 text-sm">Live Preview</h3>
          <TikTokPreview profile={profile} config={config} />
        </div>
      </div>
    </div>
  )
}

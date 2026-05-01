'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Check } from 'lucide-react'
import Link from 'next/link'

interface InstagramPost {
  id: string
  type: 'image' | 'video'
  thumbnail: string
  caption: string
  likes: number
  comments: number
  timestamp: string
}

interface InstagramProfile {
  username: string
  full_name: string
  profile_picture: string
  followers: number
  following: number
  bio: string
  posts: InstagramPost[]
}

interface Config {
  username: string
  layout: 'grid' | 'carousel' | 'masonry'
  columns: 2 | 3 | 4
  show_caption: boolean
  show_likes: boolean
  show_video_icon: boolean
  border_radius: '0px' | '8px' | '16px' | 'round'
  gap: '4px' | '8px' | '12px' | '16px'
  num_posts: 6 | 9 | 12 | 15
  link_behavior: 'instagram' | 'lightbox' | 'none'
  theme: 'light' | 'dark' | 'auto'
}

const DEFAULT_CONFIG: Config = {
  username: '',
  layout: 'grid',
  columns: 3,
  show_caption: false,
  show_likes: true,
  show_video_icon: true,
  border_radius: '8px',
  gap: '8px',
  num_posts: 9,
  link_behavior: 'instagram',
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

function InstagramPreview({ profile, config }: { profile: InstagramProfile | null; config: Config }) {
  if (!profile) {
    return (
      <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center min-h-[320px]">
        <div className="text-center px-6">
          <div className="text-5xl mb-3">📸</div>
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
  const borderColor = darkMode ? '#333333' : '#eeeeee'
  const borderRadius = config.border_radius === 'round' ? '50%' : config.border_radius

  const posts = profile.posts.slice(0, config.num_posts)

  const renderPostCard = (post: InstagramPost) => (
    <div key={post.id} className="relative group" style={{ position: 'relative' }}>
      <div style={{ position: 'relative', paddingTop: '100%', overflow: 'hidden', borderRadius }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.thumbnail}
          alt=""
          style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            objectFit: 'cover', transition: 'transform 0.3s ease',
          }}
          className="group-hover:scale-105"
        />
        {post.type === 'video' && config.show_video_icon && (
          <div style={{
            position: 'absolute', top: 8, right: 8,
            background: 'rgba(0,0,0,0.6)', color: 'white',
            width: 22, height: 22, borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 9,
          }}>▶</div>
        )}
        {config.show_likes && (
          <div
            className="opacity-0 group-hover:opacity-100 transition-opacity"
            style={{
              position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: 12, borderRadius, color: 'white', fontSize: 12, fontWeight: 600,
            }}
          >
            <span>♥ {formatNumber(post.likes)}</span>
            <span>💬 {post.comments}</span>
          </div>
        )}
      </div>
      {config.show_caption && (
        <p style={{
          fontSize: 11, color: subtextColor, padding: '4px 2px',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>
          {post.caption}
        </p>
      )}
    </div>
  )

  return (
    <div style={{ background: bg, borderRadius: 12, overflow: 'hidden', border: `1px solid ${borderColor}` }}>
      {/* Profile header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderBottom: `1px solid ${borderColor}` }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={profile.profile_picture} alt="" style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover' }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: textColor }}>@{profile.username}</div>
          <div style={{ fontSize: 12, color: subtextColor, marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{profile.bio}</div>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: textColor }}>{formatNumber(profile.followers)}</div>
          <div style={{ fontSize: 11, color: subtextColor }}>followers</div>
        </div>
      </div>

      {/* Posts */}
      <div style={{ padding: 12 }}>
        {config.layout === 'grid' && (
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${config.columns}, 1fr)`, gap: config.gap }}>
            {posts.map(renderPostCard)}
          </div>
        )}
        {config.layout === 'carousel' && (
          <div style={{ display: 'flex', gap: config.gap, overflowX: 'auto', scrollbarWidth: 'none' }}>
            {posts.map(post => (
              <div key={post.id} style={{ flex: `0 0 ${Math.floor(260 / config.columns)}px` }}>
                {renderPostCard(post)}
              </div>
            ))}
          </div>
        )}
        {config.layout === 'masonry' && (
          <div style={{ columnCount: config.columns, columnGap: config.gap }}>
            {posts.map(post => (
              <div key={post.id} style={{ breakInside: 'avoid', marginBottom: config.gap }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.thumbnail}
                  alt=""
                  style={{ width: '100%', display: 'block', borderRadius }}
                />
                {config.show_caption && (
                  <p style={{ fontSize: 11, color: subtextColor, padding: '4px 2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {post.caption}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', padding: '8px 16px', borderTop: `1px solid ${borderColor}` }}>
        <span style={{ fontSize: 10, color: subtextColor, opacity: 0.7 }}>📸 Powered by Devixus Widgets</span>
      </div>
    </div>
  )
}

export default function NewInstagramFeedPage() {
  const router = useRouter()
  const [config, setConfig] = useState<Config>(DEFAULT_CONFIG)
  const [username, setUsername] = useState('')
  const [profile, setProfile] = useState<InstagramProfile | null>(null)
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
      const res = await fetch(`/api/widgets/instagram?username=${encodeURIComponent(username.trim())}`)
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
      const widgetName = `Instagram Feed${config.username ? ` — @${config.username}` : ''}`
      const res = await fetch('/api/widgets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: widgetName, type: 'instagram_feed', config }),
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
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
            style={{ background: 'linear-gradient(135deg, #833AB4, #FD1D1D, #FCAF45)' }}
          >
            📸
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Instagram Feed</h1>
            <p className="text-sm text-gray-500">Display your Instagram posts on any website</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-6 items-start">
        {/* Left — Form */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-5">

            {/* Username + Fetch */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Instagram Username</label>
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
                  <Check size={12} /> @{profile.username} loaded ({profile.posts.length} posts)
                </p>
              )}
              {fetchError && <p className="text-xs text-red-600 mt-1.5">{fetchError}</p>}
            </div>

            {/* Layout */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Layout</label>
              <div className="flex gap-4">
                {(['grid', 'carousel', 'masonry'] as const).map(l => (
                  <label key={l} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="ig-layout" checked={config.layout === l} onChange={() => set('layout', l)} />
                    <span className="text-sm text-gray-700 capitalize">{l}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Columns */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Columns</label>
              <div className="flex gap-4">
                {([2, 3, 4] as const).map(c => (
                  <label key={c} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="ig-cols" checked={config.columns === c} onChange={() => set('columns', c)} />
                    <span className="text-sm text-gray-700">{c}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Toggles */}
            <div className="flex flex-col gap-3">
              {([
                ['show_caption', 'Show caption'] as const,
                ['show_likes', 'Show likes count'] as const,
                ['show_video_icon', 'Show video play icon'] as const,
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
                    <input type="radio" name="ig-radius" checked={config.border_radius === r} onChange={() => set('border_radius', r)} />
                    <span className="text-sm text-gray-700">{r}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Gap */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gap Between Posts</label>
              <div className="flex gap-3 flex-wrap">
                {(['4px', '8px', '12px', '16px'] as const).map(g => (
                  <label key={g} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="ig-gap" checked={config.gap === g} onChange={() => set('gap', g)} />
                    <span className="text-sm text-gray-700">{g}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Number of posts */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Number of Posts</label>
              <div className="flex gap-4">
                {([6, 9, 12, 15] as const).map(n => (
                  <label key={n} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="ig-num" checked={config.num_posts === n} onChange={() => set('num_posts', n)} />
                    <span className="text-sm text-gray-700">{n}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Link behavior */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Link Behavior</label>
              <div className="flex gap-3 flex-wrap">
                {([
                  ['instagram', 'Open on Instagram'] as const,
                  ['lightbox', 'Lightbox'] as const,
                  ['none', 'None'] as const,
                ]).map(([val, label]) => (
                  <label key={val} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="ig-link" checked={config.link_behavior === val} onChange={() => set('link_behavior', val)} />
                    <span className="text-sm text-gray-700">{label}</span>
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
                    <input type="radio" name="ig-theme" checked={config.theme === t} onChange={() => set('theme', t)} />
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
            style={{ background: 'linear-gradient(135deg, #833AB4, #FD1D1D, #FCAF45)' }}
          >
            {creating ? 'Creating widget…' : 'Create Instagram Feed Widget'}
          </button>
          {createError && (
            <p className="text-sm text-red-600 text-center bg-red-50 rounded-lg p-3">{createError}</p>
          )}
        </div>

        {/* Right — Live Preview */}
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-700 text-sm">Live Preview</h3>
          <InstagramPreview profile={profile} config={config} />
        </div>
      </div>
    </div>
  )
}

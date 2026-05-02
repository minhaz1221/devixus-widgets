'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { User, Bell, Code2, AlertTriangle, Check, Download, Camera, Loader2 } from 'lucide-react'
import { ToggleSwitch } from '@/components/ui/ToggleSwitch'
import { createClient } from '@/lib/supabase/client'

type Tab = 'profile' | 'notifications' | 'embed' | 'danger'

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: 'profile',       label: 'Profile',        icon: <User size={15} /> },
  { id: 'notifications', label: 'Notifications',  icon: <Bell size={15} /> },
  { id: 'embed',         label: 'Embed',          icon: <Code2 size={15} /> },
  { id: 'danger',        label: 'Danger Zone',    icon: <AlertTriangle size={15} /> },
]

// ── Profile tab ─────────────────────────────────────────────────────────────
function ProfileTab() {
  const [loading, setLoading]   = useState(true)
  const [userId, setUserId]     = useState('')
  const [name, setName]         = useState('')
  const [company, setCompany]   = useState('')
  const [website, setWebsite]   = useState('')
  const [bio, setBio]           = useState('')
  const [email, setEmail]       = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving]     = useState(false)
  const [toast, setToast]       = useState<{ type: 'success' | 'error'; msg: string } | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetch('/api/user/profile')
      .then(r => r.json())
      .then(d => {
        setUserId(d.user_id ?? '')
        setName(d.profile?.full_name ?? '')
        setCompany(d.profile?.company ?? '')
        setWebsite(d.profile?.website ?? '')
        setBio(d.profile?.bio ?? '')
        setEmail(d.profile?.email ?? '')
        setAvatarUrl(d.profile?.avatar_url ?? '')
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  function showToast(type: 'success' | 'error', msg: string) {
    setToast({ type, msg })
    setTimeout(() => setToast(null), 3000)
  }

  async function handleSave() {
    setSaving(true)
    try {
      const res = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ full_name: name, company, website, bio }),
      })
      if (res.ok) {
        showToast('success', 'Profile saved!')
      } else {
        const d = await res.json()
        showToast('error', d.error ?? 'Failed to save')
      }
    } catch {
      showToast('error', 'Network error')
    } finally {
      setSaving(false)
    }
  }

  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file || !userId) return
    setUploading(true)
    try {
      const supabase = createClient()
      const ext = file.name.split('.').pop() ?? 'jpg'
      const path = `${userId}/avatar.${ext}`
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(path, file, { upsert: true })
      if (uploadError) throw uploadError
      const { data } = supabase.storage.from('avatars').getPublicUrl(path)
      const url = data.publicUrl
      const res = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ avatar_url: url }),
      })
      if (res.ok) {
        setAvatarUrl(url)
        showToast('success', 'Avatar updated!')
      } else {
        showToast('error', 'Failed to save avatar URL')
      }
    } catch (err: unknown) {
      showToast('error', (err as Error).message ?? 'Upload failed')
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  const initials = name
    ? name.split(' ').slice(0, 2).map(s => s[0]?.toUpperCase() ?? '').join('')
    : email ? email[0]?.toUpperCase() ?? '?' : '?'

  if (loading) {
    return (
      <div className="h-40 flex items-center justify-center">
        <Loader2 size={20} className="text-gray-300 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-lg">
      {/* Toast */}
      {toast && (
        <div className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium ${
          toast.type === 'success'
            ? 'bg-green-50 text-green-700 border border-green-200'
            : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {toast.type === 'success' ? <Check size={14} /> : <AlertTriangle size={14} />}
          {toast.msg}
        </div>
      )}

      {/* Avatar */}
      <div className="flex items-center gap-5">
        <div className="relative shrink-0">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-indigo-100 flex items-center justify-center">
            {avatarUrl
              ? <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
              : <span className="text-indigo-600 font-bold text-2xl">{initials}</span>
            }
          </div>
          <button
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center shadow-md hover:bg-indigo-700 transition-colors disabled:opacity-60"
          >
            {uploading
              ? <Loader2 size={13} className="text-white animate-spin" />
              : <Camera size={13} className="text-white" />
            }
          </button>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700">Profile photo</p>
          <p className="text-xs text-gray-400 mt-0.5">Click the camera icon to upload a new photo</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Full name</label>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Your name"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Company</label>
          <input
            value={company}
            onChange={e => setCompany(e.target.value)}
            placeholder="Acme Inc."
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Website</label>
        <input
          value={website}
          onChange={e => setWebsite(e.target.value)}
          placeholder="https://yoursite.com"
          type="url"
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Bio</label>
        <textarea
          value={bio}
          onChange={e => setBio(e.target.value)}
          placeholder="Tell us a bit about yourself…"
          rows={3}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
        <input
          disabled
          value={email || '—'}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 text-gray-400"
        />
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 disabled:opacity-60 transition-colors"
      >
        {saving ? <><Loader2 size={15} className="animate-spin" /> Saving…</> : 'Save profile'}
      </button>
    </div>
  )
}

// ── Notifications tab ────────────────────────────────────────────────────────
function NotificationsTab() {
  const [prefs, setPrefs] = useState({
    views_limit:    true,
    monthly_report: true,
    product_updates: true,
    billing:        true,
  })

  function toggle(key: keyof typeof prefs) {
    setPrefs(p => ({ ...p, [key]: !p[key] }))
  }

  const items: { key: keyof typeof prefs; label: string; desc: string }[] = [
    { key: 'views_limit',    label: 'View limit alerts',    desc: 'Email me when widget views exceed 80% of my plan limit' },
    { key: 'monthly_report', label: 'Monthly usage reports', desc: 'Receive a summary of widget performance every month' },
    { key: 'product_updates',label: 'Product updates & tips', desc: 'Get notified about new features and best practices' },
    { key: 'billing',        label: 'Billing receipts',     desc: 'Send receipts and billing notifications to my email' },
  ]

  return (
    <div className="max-w-lg space-y-1 divide-y divide-gray-100">
      {items.map(({ key, label, desc }) => (
        <div key={key} className="py-4 first:pt-0 last:pb-0">
          <ToggleSwitch
            label={label}
            description={desc}
            checked={prefs[key]}
            onChange={() => toggle(key)}
          />
        </div>
      ))}
    </div>
  )
}

// ── Embed tab ────────────────────────────────────────────────────────────────
function EmbedTab() {
  const [embedType, setEmbedType]   = useState<'script' | 'iframe'>('script')
  const [lazyLoad, setLazyLoad]     = useState(true)
  const [loadDelay, setLoadDelay]   = useState('0')

  return (
    <div className="max-w-lg space-y-6">
      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Default embed type</h4>
        <div className="flex gap-3">
          {(['script', 'iframe'] as const).map(t => (
            <label key={t} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="embed-type"
                checked={embedType === t}
                onChange={() => setEmbedType(t)}
                className="text-indigo-600"
              />
              <span className="text-sm text-gray-700 capitalize">
                {t === 'script' ? 'Script tag (recommended)' : 'iFrame embed'}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Widget load delay</h4>
        <div className="flex gap-3">
          {(['0', '1', '2', '3'] as const).map(d => (
            <label key={d} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="load-delay"
                checked={loadDelay === d}
                onChange={() => setLoadDelay(d)}
              />
              <span className="text-sm text-gray-700">{d}s</span>
            </label>
          ))}
        </div>
      </div>

      <ToggleSwitch
        label="Lazy load widgets"
        description="Only load widgets when they scroll into view. Improves page speed."
        checked={lazyLoad}
        onChange={setLazyLoad}
      />

      <div>
        <div className="flex items-center justify-between mb-2">
          <div>
            <h4 className="text-sm font-semibold text-gray-700">Custom CSS injection</h4>
            <p className="text-xs text-gray-400 mt-0.5">Available on Pro and Agency plans</p>
          </div>
          <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">Pro</span>
        </div>
        <div className="relative">
          <textarea
            disabled
            rows={4}
            placeholder="/* Your custom CSS here */"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono bg-gray-50 text-gray-400 resize-none cursor-not-allowed"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-white/70 rounded-lg">
            <Link href="/dashboard/billing" className="text-xs font-semibold text-indigo-600 hover:underline">
              Upgrade to unlock →
            </Link>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-semibold text-gray-700">Powered by Devixus badge</h4>
          <span className="text-xs text-gray-400">Always on for Free plan</span>
        </div>
        <ToggleSwitch
          label="Show branding badge"
          description="Displays a small 'Powered by Devixus' link on your widgets"
          checked={true}
          onChange={() => {}}
        />
      </div>

      <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors">
        Save embed settings
      </button>
    </div>
  )
}

// ── Danger Zone tab ──────────────────────────────────────────────────────────
function DangerZoneTab() {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteInput, setDeleteInput] = useState('')

  return (
    <div className="max-w-lg space-y-4">
      <div className="border-2 border-red-200 rounded-xl p-5 space-y-5">
        <h3 className="text-sm font-bold text-red-700 uppercase tracking-wide">Danger Zone</h3>

        {/* Export */}
        <div className="flex items-center justify-between py-3 border-b border-red-100">
          <div>
            <p className="text-sm font-semibold text-gray-800">Export data</p>
            <p className="text-xs text-gray-500 mt-0.5">Download all your widget configs as JSON</p>
          </div>
          <button className="inline-flex items-center gap-1.5 px-4 py-2 border border-gray-300 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <Download size={14} /> Export
          </button>
        </div>

        {/* Reset all */}
        <div className="flex items-center justify-between py-3 border-b border-red-100">
          <div>
            <p className="text-sm font-semibold text-gray-800">Reset all widgets</p>
            <p className="text-xs text-gray-500 mt-0.5">Resets all widget configs to defaults</p>
          </div>
          <button className="px-4 py-2 border border-red-200 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors">
            Reset all
          </button>
        </div>

        {/* Delete account */}
        <div className="flex items-center justify-between py-3">
          <div>
            <p className="text-sm font-semibold text-gray-800">Delete account</p>
            <p className="text-xs text-gray-500 mt-0.5">Permanently delete your account and all data</p>
          </div>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors"
          >
            Delete account
          </button>
        </div>
      </div>

      {/* Delete confirmation modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => { setShowDeleteModal(false); setDeleteInput('') }} />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 modal-animate">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Delete account?</h3>
            <p className="text-sm text-gray-600 mb-4">
              This will permanently delete your account, all widgets, and all data. This action cannot be undone.
            </p>
            <p className="text-sm font-medium text-gray-700 mb-2">
              Type <span className="font-bold font-mono text-red-600">DELETE</span> to confirm:
            </p>
            <input
              value={deleteInput}
              onChange={e => setDeleteInput(e.target.value)}
              placeholder="DELETE"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm mb-4 font-mono"
            />
            <div className="flex gap-3">
              <button
                onClick={() => { setShowDeleteModal(false); setDeleteInput('') }}
                className="flex-1 px-4 py-2 border border-gray-200 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                disabled={deleteInput !== 'DELETE'}
                className="flex-1 px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Delete forever
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Main page ────────────────────────────────────────────────────────────────
export default function SettingsPage() {
  const [tab, setTab] = useState<Tab>('profile')

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your account and preferences.</p>
      </div>

      {/* Tab bar */}
      <div className="flex border-b border-gray-200 gap-1">
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={[
              'flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors',
              tab === t.id
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700',
            ].join(' ')}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        {tab === 'profile'       && <ProfileTab />}
        {tab === 'notifications' && <NotificationsTab />}
        {tab === 'embed'         && <EmbedTab />}
        {tab === 'danger'        && <DangerZoneTab />}
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { X, Copy, Check } from 'lucide-react'

const EMBED_ORIGIN = 'https://devixus-widgets-web.vercel.app'

type Platform = 'html' | 'wordpress' | 'shopify' | 'wix' | 'webflow' | 'squarespace' | 'other'

const PLATFORMS: { id: Platform; label: string }[] = [
  { id: 'html',        label: 'HTML' },
  { id: 'wordpress',   label: 'WordPress' },
  { id: 'shopify',     label: 'Shopify' },
  { id: 'wix',         label: 'Wix' },
  { id: 'webflow',     label: 'Webflow' },
  { id: 'squarespace', label: 'Squarespace' },
  { id: 'other',       label: 'Other' },
]

const STEPS: Record<Platform, string[]> = {
  html:        ['Open your HTML file in a text editor.', 'Paste the code inside the <body> tag where you want the widget to appear.', 'Save and upload your file.'],
  wordpress:   ['Log in to your WordPress admin panel.', 'Go to Appearance → Theme Editor, or use a Custom HTML block in the Gutenberg editor.', 'Paste the embed code where you want the widget to appear.', 'Click Save / Publish.'],
  shopify:     ['Log in to your Shopify admin.', 'Go to Online Store → Themes → Edit code.', 'Open theme.liquid and paste the code just before the closing </body> tag.', 'Click Save.'],
  wix:         ['Open your Wix editor.', 'Click + Add → Embed → HTML Code.', 'Paste the embed code into the HTML editor.', 'Click Apply and publish your site.'],
  webflow:     ['Open the Webflow Designer.', 'Add an Embed element from the Add panel (shortcut: E).', 'Paste the code into the embed editor.', 'Click Save & Close, then Publish.'],
  squarespace: ['Open the Squarespace page editor.', 'Add a Code Block where you want the widget.', 'Paste the embed code.', 'Click Apply and Save.'],
  other:       ['Open your site builder or CMS.', 'Find an option to add custom HTML or a script tag.', 'Paste the embed code in the <body> section of your page.', 'Save and publish.'],
}

interface Props {
  widgetId: string
  widgetName: string
  onClose: () => void
}

export function InstallModal({ widgetId, widgetName, onClose }: Props) {
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
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Platform tabs */}
        <div className="px-6 pt-4">
          <div className="flex flex-wrap gap-1.5">
            {PLATFORMS.map(p => (
              <button
                key={p.id}
                onClick={() => setPlatform(p.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  platform === p.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
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
            {STEPS[platform].map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="text-sm text-gray-700 leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Embed code */}
        <div className="px-6 pb-6">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Embed Code</p>
          <pre className="bg-gray-900 text-green-400 text-xs font-mono px-4 py-3 rounded-xl overflow-x-auto leading-relaxed">
            {code}
          </pre>
          <button
            onClick={copy}
            className={`mt-3 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              copied ? 'bg-green-600 text-white' : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            {copied ? <><Check size={15} /> Copied!</> : <><Copy size={15} /> Copy embed code</>}
          </button>
        </div>
      </div>
    </div>
  )
}

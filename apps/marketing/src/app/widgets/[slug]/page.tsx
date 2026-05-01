import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Check, Code2, LayoutGrid, Sliders } from 'lucide-react'
import { widgets } from '@/data/widgets'
import { WidgetIcon } from '@/components/WidgetIcon'

const WEB_APP = 'https://devixus-widgets-web.vercel.app'

export async function generateStaticParams() {
  return widgets.map(w => ({ slug: w.slug }))
}

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const widget = widgets.find(w => w.slug === params.slug)
  if (!widget) return { title: 'Not Found' }
  return {
    title: `${widget.name} Widget — Devixus Widgets`,
    description: widget.description,
  }
}

const CATEGORY_LABELS: Record<string, string> = {
  social: 'Social',
  tools: 'Tools',
  forms: 'Forms',
  reviews: 'Reviews',
}

function CheckPill({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-1.5 bg-white rounded-full shadow-md px-3 py-1.5 text-xs font-medium text-gray-700 whitespace-nowrap">
      <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="20 6 9 17 4 12" />
      </svg>
      {children}
    </div>
  )
}

export default function WidgetPage({ params }: { params: { slug: string } }) {
  const widget = widgets.find(w => w.slug === params.slug)
  if (!widget) notFound()

  const isComingSoon = widget.badge === 'Coming Soon'
  const related = widgets.filter(w => w.slug !== widget.slug).slice(0, 3)

  const embedCode = `<script\n  src="https://widgets.devixus.com/widget.js"\n  data-widget-id="your-widget-id">\n</script>`

  return (
    <div className="min-h-screen bg-white">

      {/* ── Section 1: Hero ─────────────────────────────── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">

          {/* Left: text */}
          <div>
            <span
              className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-5"
              style={{ color: widget.brandColor, backgroundColor: widget.bgColor }}
            >
              {CATEGORY_LABELS[widget.category] ?? widget.category}
            </span>

            <h1 className="text-4xl font-bold text-gray-900 leading-tight">
              {widget.name}
            </h1>
            <p className="mt-3 text-xl text-gray-500">{widget.tagline}</p>
            <p className="mt-4 text-gray-600 leading-relaxed">{widget.description}</p>

            {/* Stats row */}
            {widget.stats.reviews > 0 && (
              <div className="mt-6 flex items-center gap-6">
                <div>
                  <p className="text-2xl font-bold text-gray-900">{widget.stats.installs}</p>
                  <p className="text-xs text-gray-400 mt-0.5">Installs</p>
                </div>
                <div className="w-px h-10 bg-gray-200" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{widget.stats.rating}</p>
                  <p className="text-xs text-gray-400 mt-0.5">Avg rating</p>
                </div>
                <div className="w-px h-10 bg-gray-200" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{widget.stats.reviews}</p>
                  <p className="text-xs text-gray-400 mt-0.5">Reviews</p>
                </div>
              </div>
            )}

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-3">
              {isComingSoon ? (
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gray-100 text-gray-500 font-semibold text-sm">
                  Coming Soon — Join the waitlist below
                </div>
              ) : (
                <>
                  <a
                    href={`${WEB_APP}/signup`}
                    className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-white font-semibold text-sm shadow-md hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: widget.brandColor }}
                  >
                    Try it free →
                  </a>
                  <a
                    href="#demo"
                    className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors"
                  >
                    See live demo ↓
                  </a>
                </>
              )}
            </div>
          </div>

          {/* Right: icon + floating pills */}
          <div className="relative flex items-center justify-center" style={{ minHeight: '380px' }}>
            {/* Glow bg */}
            <div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{ background: `radial-gradient(ellipse at 50% 50%, ${widget.brandColor}1a 0%, transparent 70%)` }}
            />

            {/* Large icon card */}
            <div
              className="relative z-10 w-32 h-32 rounded-3xl flex items-center justify-center shadow-xl"
              style={{ backgroundColor: widget.bgColor }}
            >
              <WidgetIcon icon={widget.icon} size={60} />
            </div>

            {/* Feature pills — hidden on mobile, shown md+ */}
            <div className="hidden md:block absolute" style={{ top: '10%', left: '2%' }}>
              <CheckPill>{widget.features[0]}</CheckPill>
            </div>
            <div className="hidden md:block absolute" style={{ top: '10%', right: '2%' }}>
              <CheckPill>{widget.features[1]}</CheckPill>
            </div>
            <div className="hidden md:block absolute" style={{ bottom: '18%', left: '4%' }}>
              <CheckPill>{widget.features[4]}</CheckPill>
            </div>
            <div className="hidden md:block absolute" style={{ bottom: '18%', right: '4%' }}>
              <CheckPill>{widget.features[5]}</CheckPill>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 2: Features ─────────────────────────── */}
      <section id="demo" className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Everything you need
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {widget.features.map(f => (
              <div
                key={f}
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-100"
              >
                <Check size={18} className="mb-3" style={{ color: widget.brandColor }} />
                <p className="text-sm font-medium text-gray-700 leading-snug">{f}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 3: Use Cases ────────────────────────── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Perfect for...
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {widget.useCases.map((uc, i) => (
              <div
                key={uc.title}
                className="rounded-2xl border border-gray-100 p-8"
              >
                <p className="text-6xl font-black text-gray-100 leading-none select-none">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="font-semibold text-gray-900 mt-2">{uc.title}</h3>
                <p className="text-gray-500 mt-2 text-sm leading-relaxed">{uc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 4: How to Install ───────────────────── */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Add to your website in 2 minutes
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: <LayoutGrid size={24} strokeWidth={1.5} style={{ color: widget.brandColor }} />,
                step: '1',
                title: 'Create your widget',
                body: 'Configure in our dashboard. Choose colors, layout, and content.',
              },
              {
                icon: <Sliders size={24} strokeWidth={1.5} style={{ color: widget.brandColor }} />,
                step: '2',
                title: 'Copy the code',
                body: 'One script tag. Under 30KB. No dependencies.',
              },
              {
                icon: <Code2 size={24} strokeWidth={1.5} style={{ color: widget.brandColor }} />,
                step: '3',
                title: 'Paste anywhere',
                body: 'Works on every platform — WordPress, Webflow, Shopify, and more.',
              },
            ].map(s => (
              <div key={s.step} className="flex gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: widget.bgColor }}
                >
                  {s.icon}
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Step {s.step}</p>
                  <h3 className="font-semibold text-gray-900">{s.title}</h3>
                  <p className="text-sm text-gray-500 mt-1 leading-relaxed">{s.body}</p>
                </div>
              </div>
            ))}
          </div>

          <pre className="bg-gray-900 text-green-400 rounded-2xl px-6 py-5 text-sm overflow-x-auto">
            {embedCode}
          </pre>
          <p className="mt-3 text-center text-sm text-gray-500">
            Paste before the{' '}
            <code className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-700 text-xs">&lt;/body&gt;</code>
            {' '}tag of any website.
          </p>
        </div>
      </section>

      {/* ── Section 5: CTA ──────────────────────────────── */}
      <section
        className="py-16 px-6 text-center"
        style={{ backgroundColor: isComingSoon ? '#6366f1' : widget.brandColor }}
      >
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
            {isComingSoon
              ? `${widget.name} is coming soon`
              : `Start using ${widget.name} for free`}
          </h2>
          <p className="mt-4 text-white/80 text-lg">
            {isComingSoon
              ? 'Be the first to know when it launches.'
              : 'No credit card. Setup in 2 minutes.'}
          </p>
          {isComingSoon ? (
            <p className="mt-6 text-white/70 text-sm">Join the waitlist and we&apos;ll email you on launch day.</p>
          ) : (
            <a
              href={`${WEB_APP}/signup`}
              className="mt-8 inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white font-semibold text-base rounded-full hover:bg-gray-50 transition-colors shadow-xl"
              style={{ color: isComingSoon ? '#6366f1' : widget.brandColor }}
            >
              Get started free →
            </a>
          )}
        </div>
      </section>

      {/* ── Section 6: Related Widgets ──────────────────── */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {related.map(w => (
              <Link
                key={w.slug}
                href={`/widgets/${w.slug}`}
                className="group rounded-2xl border border-gray-100 p-6 bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-200 block"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: w.bgColor }}
                >
                  <WidgetIcon icon={w.icon} size={26} />
                </div>
                <h3 className="font-semibold text-gray-900">{w.name}</h3>
                <p className="text-sm text-gray-500 mt-1 leading-relaxed line-clamp-2">{w.tagline}</p>
                <span className="mt-3 inline-flex items-center text-sm font-semibold text-indigo-600 group-hover:text-indigo-800 transition-colors">
                  Learn more →
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/widgets"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors"
            >
              ← View all widgets
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}

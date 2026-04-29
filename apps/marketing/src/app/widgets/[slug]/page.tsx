import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Check, ArrowRight, Code2 } from 'lucide-react'
import { widgets } from '@/data/widgets'
import { WaitlistForm } from './_components/WaitlistForm'

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

const STEPS = [
  { n: '1', title: 'Sign up free', body: 'Create your account — no credit card required.' },
  { n: '2', title: 'Customize your widget', body: 'Use our visual configurator to set colors, text, and layout.' },
  { n: '3', title: 'Paste one line of code', body: 'Copy the embed snippet and paste it into your website\'s HTML.' },
]

export default function WidgetPage({ params }: { params: { slug: string } }) {
  const widget = widgets.find(w => w.slug === params.slug)
  if (!widget) notFound()

  const embedCode = `<script\n  src="${WEB_APP}/widget.js"\n  data-widget-id="YOUR_WIDGET_ID">\n</script>`

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section
        className="py-20 px-6"
        style={{ backgroundColor: widget.bgColor }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <span
            className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4"
            style={{ color: widget.color, backgroundColor: 'white' }}
          >
            {widget.category}
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            {widget.name} Widget
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            {widget.longDescription}
          </p>

          {widget.available ? (
            <a
              href={`${WEB_APP}/signup`}
              className="inline-flex items-center gap-2 px-8 py-4 text-white font-bold text-base rounded-xl shadow-lg hover:opacity-90 transition-opacity"
              style={{ backgroundColor: widget.color }}
            >
              Add to your website free <ArrowRight size={18} />
            </a>
          ) : (
            <div className="max-w-sm mx-auto">
              <p className="text-sm text-gray-500 mb-3">This widget is coming soon. Join the waitlist:</p>
              <WaitlistForm widgetName={widget.name} color={widget.color} />
            </div>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Everything included</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {widget.features.map(f => (
              <div key={f} className="flex items-start gap-3 p-4 rounded-xl bg-gray-50">
                <Check size={18} className="shrink-0 mt-0.5" style={{ color: widget.color }} />
                <span className="text-sm text-gray-700">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="py-16 px-6" style={{ backgroundColor: widget.bgColor }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Who uses it</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {widget.useCases.map(uc => (
              <div
                key={uc}
                className="bg-white rounded-xl p-5 border-l-4 text-sm text-gray-700 font-medium shadow-sm"
                style={{ borderColor: widget.color }}
              >
                {uc}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-10 text-center">How it works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {STEPS.map(step => (
              <div key={step.n} className="text-center">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4"
                  style={{ backgroundColor: widget.color }}
                >
                  {step.n}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Code preview */}
      {widget.available && (
        <section className="py-16 px-6 bg-gray-900">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 text-gray-400 text-sm mb-4">
              <Code2 size={16} /> One line of code
            </div>
            <pre className="bg-gray-800 rounded-2xl px-6 py-5 text-left text-sm text-green-400 overflow-x-auto">
              {embedCode}
            </pre>
            <p className="mt-4 text-gray-500 text-sm">
              Paste this before the <code className="text-gray-300">&lt;/body&gt;</code> tag of any website.
            </p>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="py-20 px-6 text-center" style={{ backgroundColor: widget.bgColor }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
            Ready to add {widget.name} to your website?
          </h2>
          <p className="text-gray-500 mb-8">Free plan available. No credit card required.</p>
          {widget.available ? (
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`${WEB_APP}/signup`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white font-bold rounded-xl hover:opacity-90 transition-opacity"
                style={{ backgroundColor: widget.color }}
              >
                Get started free <ArrowRight size={16} />
              </a>
              <Link
                href="/widgets"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-gray-700 font-semibold bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Browse all widgets
              </Link>
            </div>
          ) : (
            <div className="max-w-sm mx-auto">
              <WaitlistForm widgetName={widget.name} color={widget.color} />
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

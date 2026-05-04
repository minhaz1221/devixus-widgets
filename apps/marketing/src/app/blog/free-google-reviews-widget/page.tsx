import type { Metadata } from 'next'
import Link from 'next/link'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'How to Add a Google Reviews Widget to Your Website for Free — Devixus Widgets',
  description: 'Display your Google star rating and customer reviews on your website automatically. Build trust, boost conversions. Works on WordPress, Shopify, Webflow, Wix, and any HTML site.',
  keywords: 'google reviews widget free, embed google reviews website, google reviews wordpress, display google reviews shopify, google rating widget, free google reviews widget',
  openGraph: {
    title: 'How to Add a Google Reviews Widget to Your Website for Free',
    description: 'Display your Google star rating and customer reviews on your website automatically.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Google Reviews Widget — Add to Any Website',
  },
}

const WEB_APP = 'https://devixus-widgets-web.vercel.app'

export default function BlogPost() {
  return (
    <>
      <main className="max-w-2xl mx-auto px-6 py-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-10">
          <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-gray-600 transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-gray-600 truncate">Free Google Reviews Widget</span>
        </nav>

        <div className="flex items-center gap-3 mb-5">
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-600">Tutorial</span>
          <span className="text-xs text-gray-400">April 15, 2025</span>
          <span className="text-xs text-gray-400">·</span>
          <span className="text-xs text-gray-400">4 min read</span>
        </div>

        <h1 className="text-4xl font-extrabold text-gray-900 leading-tight mb-6">
          How to Add a Google Reviews Widget to Your Website for Free
        </h1>

        <p className="text-xl text-gray-500 leading-relaxed mb-10 border-b border-gray-100 pb-10">
          92% of consumers read online reviews before buying. Displaying your Google star rating directly on your website — without asking visitors to leave — is one of the highest-ROI trust signals you can add. Here's how to do it free.
        </p>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why show Google Reviews on your website?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { stat: '92%', label: 'of consumers read reviews before buying' },
                { stat: '31%', label: 'more spending with businesses that have excellent reviews' },
                { stat: '72%', label: 'say positive reviews make them trust a business more' },
                { stat: '3.3★', label: 'minimum rating consumers require before engaging' },
              ].map(item => (
                <div key={item.label} className="bg-gray-50 border border-gray-100 rounded-xl p-4">
                  <div className="text-2xl font-extrabold text-indigo-600 mb-1">{item.stat}</div>
                  <div className="text-xs text-gray-500 leading-snug">{item.label}</div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What you'll need</h2>
            <ul className="space-y-2">
              {[
                'A Google Business Profile (free — at business.google.com)',
                'At least a few Google reviews on your profile',
                'A Devixus Widgets account (free)',
              ].map(item => (
                <li key={item} className="flex items-center gap-2 text-sm">
                  <span className="w-4 h-4 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 text-[10px] font-bold">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Step 1 — Sign up for Devixus Widgets</h2>
            <p>
              Create a free account at{' '}
              <a href={`${WEB_APP}/signup`} className="text-indigo-600 underline hover:text-indigo-800" target="_blank" rel="noopener noreferrer">
                devixus-widgets-web.vercel.app/signup
              </a>
              . The free plan gives you 2 widgets with no view limits and no credit card required.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Step 2 — Create a Google Reviews widget</h2>
            <p className="mb-4">
              In your dashboard, click <strong>"New Widget"</strong> → <strong>"Google Reviews"</strong>. Search for your business by name — we'll look it up using the Google Places API automatically.
            </p>
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 space-y-3">
              <p className="font-semibold text-gray-800 text-sm">What you can customize:</p>
              <ul className="space-y-1.5 text-sm">
                {[
                  'Number of reviews to display (1–10)',
                  'Minimum star rating to show (e.g. only 4★ and above)',
                  'Layout: carousel or grid',
                  'Show/hide reviewer photos',
                  'Light / dark / auto theme',
                  'Custom accent color',
                ].map(o => (
                  <li key={o} className="flex items-center gap-2 text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Step 3 — Get the embed code</h2>
            <p className="mb-4">
              Click <strong>"Get embed code"</strong> to copy your unique script tag. It looks like this:
            </p>
            <div className="bg-gray-900 rounded-xl p-4 overflow-x-auto">
              <code className="text-green-400 text-sm font-mono whitespace-nowrap">
                {'<script src="https://devixus.com/widget.js" data-widget-id="YOUR_ID" async></script>'}
              </code>
            </div>
            <p className="mt-3 text-sm text-gray-500">
              One tag. That's all. Paste it where you want the reviews to appear.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Step 4 — Add it to your website</h2>
            <p className="mb-3">Platform-specific instructions:</p>
            <div className="space-y-3">
              {[
                { platform: 'WordPress', instruction: 'Gutenberg → Custom HTML block, or paste in your footer.php before </body>' },
                { platform: 'Shopify', instruction: 'Online Store → Themes → Edit code → paste in theme.liquid before </body>' },
                { platform: 'Webflow', instruction: 'Add an Embed element from the Add panel, paste the script' },
                { platform: 'Wix', instruction: 'Add → Embed → HTML Code, paste the script' },
                { platform: 'Squarespace', instruction: 'Edit a page → Add Block → Code, paste the script' },
                { platform: 'Any HTML', instruction: 'Paste anywhere in <body>' },
              ].map(({ platform, instruction }) => (
                <div key={platform} className="flex gap-3 text-sm">
                  <span className="font-semibold text-gray-800 min-w-[110px] shrink-0">{platform}:</span>
                  <span className="text-gray-600">{instruction}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Do reviews update automatically?</h2>
            <p>
              Yes. The widget fetches fresh data from Google each time it loads, so new reviews appear on your site automatically — no need to update anything. Reviews are cached briefly for performance, so a brand new review may take up to an hour to appear.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Where to place the widget for maximum impact</h2>
            <ul className="space-y-2">
              {[
                { place: 'Homepage', reason: 'Visitors see it immediately — builds trust before they explore' },
                { place: 'Pricing page', reason: 'Hesitant buyers need social proof right before they decide' },
                { place: 'Contact / About page', reason: 'People researching your business want validation' },
                { place: 'Product / service pages', reason: 'Category-specific trust signals near the decision point' },
              ].map(item => (
                <li key={item.place} className="flex gap-3 text-sm">
                  <span className="font-semibold text-gray-800 min-w-[100px] shrink-0">{item.place}:</span>
                  <span className="text-gray-600">{item.reason}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Does it affect page speed?</h2>
            <p>
              No. The script loads asynchronously and renders in an isolated Shadow DOM. It does not block your page from loading and cannot conflict with your existing CSS or JavaScript.
            </p>
          </section>

          {/* CTA */}
          <div className="mt-12 bg-indigo-50 border border-indigo-100 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Add your Google Reviews widget now</h3>
            <p className="text-gray-500 text-sm mb-6">Free forever. No credit card. No view limits. 2-minute setup.</p>
            <a
              href={`${WEB_APP}/signup`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition-colors text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              Create free account →
            </a>
          </div>
        </div>

        {/* Related posts */}
        <div className="mt-16 pt-10 border-t border-gray-100">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-5">Related articles</p>
          <div className="space-y-3">
            <Link href="/blog/how-to-embed-youtube-feed-on-website" className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition-colors text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-300 shrink-0" />
              How to Embed a YouTube Feed on Your Website (Free, No Code)
            </Link>
            <Link href="/blog/elfsight-alternative" className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition-colors text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-300 shrink-0" />
              Best Elfsight Alternative in 2025 — Free &amp; No View Limits
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

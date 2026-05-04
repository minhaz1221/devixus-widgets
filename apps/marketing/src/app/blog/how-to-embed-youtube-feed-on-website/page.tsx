import type { Metadata } from 'next'
import Link from 'next/link'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'How to Embed a YouTube Feed on Your Website (Free, No Code) — Devixus Widgets',
  description: 'Show your latest YouTube videos on any website in under 2 minutes. Works on WordPress, Shopify, Webflow, Wix, Squarespace, and any HTML site. No API keys required.',
  keywords: 'embed youtube feed website, youtube widget free, show youtube videos website, youtube feed widget wordpress, youtube embed no code',
  openGraph: {
    title: 'How to Embed a YouTube Feed on Your Website (Free, No Code)',
    description: 'Show your latest YouTube videos on any website in under 2 minutes. No API keys, no coding, no monthly fees.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Embed a YouTube Feed on Your Website — Free',
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
          <span className="text-gray-600 truncate">Embed YouTube Feed</span>
        </nav>

        {/* Meta */}
        <div className="flex items-center gap-3 mb-5">
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-600">Tutorial</span>
          <span className="text-xs text-gray-400">April 28, 2025</span>
          <span className="text-xs text-gray-400">·</span>
          <span className="text-xs text-gray-400">4 min read</span>
        </div>

        <h1 className="text-4xl font-extrabold text-gray-900 leading-tight mb-6">
          How to Embed a YouTube Feed on Your Website (Free, No Code)
        </h1>

        <p className="text-xl text-gray-500 leading-relaxed mb-10 border-b border-gray-100 pb-10">
          Keeping visitors on your site longer is easier when they can watch your videos right there — no tab switching required. Here's how to show your latest YouTube uploads on any website in under 2 minutes, completely free.
        </p>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why embed your YouTube feed?</h2>
            <ul className="space-y-2 list-none">
              {[
                'Keep visitors on your site longer (lower bounce rate)',
                'Build credibility — video content signals active, growing brand',
                'Automatically stays fresh as you publish new videos',
                'Works on WordPress, Shopify, Webflow, Wix, Squarespace, raw HTML — any platform',
              ].map(item => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 w-4 h-4 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 text-[10px] font-bold">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Step 1 — Create a free Devixus account</h2>
            <p className="mb-4">
              Go to{' '}
              <a href={`${WEB_APP}/signup`} className="text-indigo-600 underline hover:text-indigo-800" target="_blank" rel="noopener noreferrer">
                devixus-widgets-web.vercel.app/signup
              </a>{' '}
              and create a free account. No credit card required. The free plan lets you create up to 2 widgets with unlimited customization.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Step 2 — Create a YouTube Feed widget</h2>
            <p className="mb-4">
              From your dashboard, click <strong>"New Widget"</strong>, then choose <strong>"YouTube Feed"</strong>. You'll see a live preview panel on the right that updates as you configure.
            </p>
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 space-y-3">
              <p className="font-semibold text-gray-800 text-sm">Configuration options:</p>
              <ul className="space-y-1.5 text-sm">
                {[
                  'Channel handle or URL (e.g. @ChannelName or youtube.com/c/...)',
                  'Number of videos to show (3, 6, 9, or 12)',
                  'Layout: grid or list',
                  'Light / dark / auto theme',
                  'Accent color to match your brand',
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Step 3 — Copy the embed code</h2>
            <p className="mb-4">
              Once you're happy with the preview, click <strong>"Get embed code"</strong>. You'll get a single{' '}
              <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">&lt;script&gt;</code> tag — that's it.
            </p>
            <div className="bg-gray-900 rounded-xl p-4 overflow-x-auto">
              <code className="text-green-400 text-sm font-mono whitespace-nowrap">
                {'<script src="https://devixus.com/widget.js" data-widget-id="YOUR_ID" async></script>'}
              </code>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Step 4 — Paste it on your site</h2>
            <p className="mb-2">Paste the script tag wherever you want the feed to appear:</p>
            <div className="space-y-3">
              {[
                { platform: 'WordPress', instruction: 'Use a Custom HTML block in Gutenberg or paste into your theme\'s footer.php / functions.php' },
                { platform: 'Shopify', instruction: 'Theme editor → Add section → Custom liquid, then paste' },
                { platform: 'Webflow', instruction: 'Embed element from the components panel, then paste the code' },
                { platform: 'Wix', instruction: 'Add → Embed → HTML iFrame, then paste' },
                { platform: 'Squarespace', instruction: 'Code block in any page section, then paste' },
                { platform: 'Raw HTML', instruction: 'Paste anywhere in your HTML file body' },
              ].map(({ platform, instruction }) => (
                <div key={platform} className="flex gap-3">
                  <span className="font-semibold text-gray-800 text-sm min-w-[110px] shrink-0">{platform}:</span>
                  <span className="text-sm text-gray-600">{instruction}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Does it slow down my site?</h2>
            <p>
              No. The script loads asynchronously (the <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">async</code> attribute means it doesn't block page rendering). The widget renders in a Shadow DOM so it can't affect your existing styles. Typical load time is under 200ms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Is it really free?</h2>
            <p>
              Yes. The free plan includes up to 2 widgets with full functionality. There are no view limits on the free plan — unlike some competitors that cap you at 200 views/month. If you need more than 2 widgets, the Pro plan is $7/month (unlimited widgets, priority support).
            </p>
          </section>

          {/* CTA */}
          <div className="mt-12 bg-indigo-50 border border-indigo-100 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to add your YouTube feed?</h3>
            <p className="text-gray-500 text-sm mb-6">Takes 2 minutes. No credit card required.</p>
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
            <Link href="/blog/free-google-reviews-widget" className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition-colors text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-300 shrink-0" />
              How to Add a Google Reviews Widget to Your Website for Free
            </Link>
            <Link href="/blog/elfsight-alternative" className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition-colors text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-300 shrink-0" />
              Best Elfsight Alternative in 2025
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

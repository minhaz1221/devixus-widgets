import type { Metadata } from 'next'
import Link from 'next/link'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Best Elfsight Alternative in 2025 — Free & No View Limits — Devixus Widgets',
  description: 'Comparing Devixus Widgets vs Elfsight: pricing, widget types, view limits, white-label. Get the same features for free — or 10× cheaper on paid plans.',
  keywords: 'elfsight alternative, free elfsight alternative, elfsight replacement, website widgets free, elfsight vs devixus, elfsight too expensive',
  openGraph: {
    title: 'Best Elfsight Alternative in 2025 — Free & No View Limits',
    description: 'Tired of Elfsight\'s $9/month minimum and view limits? Here\'s a free alternative with more widgets.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Elfsight Alternative 2025 — Free Website Widgets',
  },
}

const WEB_APP = 'https://devixus-widgets-web.vercel.app'

const COMPARE_ROWS = [
  { feature: 'Free plan', devixus: 'Yes — 2 widgets', elfsight: 'Yes — 200 views/month' },
  { feature: 'Paid plan starts at', devixus: '$7 / month', elfsight: '$9 / month' },
  { feature: 'View limits on paid', devixus: 'None', elfsight: '5,000 – 150,000 views' },
  { feature: 'Widget types', devixus: '10 (growing)', elfsight: '90+' },
  { feature: 'White-label (remove branding)', devixus: 'Agency plan', elfsight: 'Pro+ ($19/mo)' },
  { feature: 'Custom CSS', devixus: 'Pro plan', elfsight: 'Pro plan' },
  { feature: 'Analytics per widget', devixus: 'Yes (free)', elfsight: 'Yes (paid)' },
  { feature: '1-line install', devixus: 'Yes', elfsight: 'Yes' },
  { feature: 'Shadow DOM isolation', devixus: 'Yes', elfsight: 'Yes' },
]

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
          <span className="text-gray-600 truncate">Elfsight Alternative</span>
        </nav>

        <div className="flex items-center gap-3 mb-5">
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-600">Comparison</span>
          <span className="text-xs text-gray-400">April 22, 2025</span>
          <span className="text-xs text-gray-400">·</span>
          <span className="text-xs text-gray-400">5 min read</span>
        </div>

        <h1 className="text-4xl font-extrabold text-gray-900 leading-tight mb-6">
          Best Elfsight Alternative in 2025 — Free &amp; No Per-View Limits
        </h1>

        <p className="text-xl text-gray-500 leading-relaxed mb-10 border-b border-gray-100 pb-10">
          Elfsight is a popular widget platform, but many users are frustrated by strict view limits on paid plans and a free tier that cuts off at just 200 views per month. Here's a direct comparison with Devixus Widgets — a free alternative that's growing fast.
        </p>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">The core problem with Elfsight pricing</h2>
            <p className="mb-4">
              Elfsight's free plan gives you 200 views per month per widget. That sounds fine until you realize most real websites hit that in a few days. Then you're locked out until the month resets — or you upgrade to a paid plan starting at $9/month.
            </p>
            <p className="mb-4">
              Even on paid plans, Elfsight caps views. The Basic plan ($9/month) allows only 5,000 views/month. For any site with real traffic, you'll need the Pro plan at $19/month or higher.
            </p>
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-sm text-amber-800">
              <strong>Elfsight Basic plan:</strong> $9/month for 5,000 views/month across all widgets. Exceed that and widgets stop displaying until the next cycle.
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Head-to-head comparison</h2>
            <div className="overflow-hidden border border-gray-200 rounded-xl">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">Feature</th>
                    <th className="text-left px-4 py-3 font-semibold text-indigo-700">Devixus Widgets</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-500">Elfsight</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {COMPARE_ROWS.map(row => (
                    <tr key={row.feature} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-gray-600">{row.feature}</td>
                      <td className="px-4 py-3 font-medium text-indigo-700">{row.devixus}</td>
                      <td className="px-4 py-3 text-gray-500">{row.elfsight}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Where Elfsight wins</h2>
            <p className="mb-3">
              In all fairness, Elfsight has been around longer and offers 90+ widget types vs Devixus's 10. If you need a very specific widget (Instagram stories, Yelp reviews, Trustpilot integration, etc.), Elfsight likely has it.
            </p>
            <p>
              Elfsight is the right choice if widget variety is your top priority and you're fine with paying $19+/month.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Where Devixus Widgets wins</h2>
            <ul className="space-y-3">
              {[
                { title: 'No view limits', body: 'On all paid plans, views are unlimited. Your widgets always show up — no matter how much traffic you get.' },
                { title: 'Genuinely free tier', body: 'The free plan gives you 2 fully functional widgets with no view cap. Great for personal sites or testing.' },
                { title: '70% cheaper', body: 'Pro plan is $7/month vs Elfsight\'s $9 Basic (which has view limits) or $19 Pro. Unlimited views on Devixus Pro vs capped on Elfsight Basic.' },
                { title: 'Analytics included free', body: 'Per-widget analytics (views, installs, domain breakdown) is available on all plans including free.' },
              ].map(item => (
                <li key={item.title} className="flex gap-3">
                  <span className="mt-1 w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 text-[10px] font-bold">✓</span>
                  <div>
                    <span className="font-semibold text-gray-800">{item.title} — </span>
                    <span className="text-gray-600">{item.body}</span>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What widgets does Devixus have?</h2>
            <div className="grid grid-cols-2 gap-2">
              {[
                'WhatsApp Chat Button',
                'YouTube Feed',
                'Google Reviews',
                'Testimonials Slider',
                'Countdown Timer',
                'Contact Form',
                'Announcement Bar',
                'Social Follow Bar',
                'Instagram Feed',
                'TikTok Feed',
              ].map(w => (
                <div key={w} className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                  {w}
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-gray-500">
              These 10 cover the most commonly used widget types — the ones that actually move the needle for conversions and engagement on most websites.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Migration from Elfsight</h2>
            <p className="mb-3">
              Migrating is straightforward since both use a 1-line script tag embed. The process:
            </p>
            <ol className="space-y-2 list-none counter-none">
              {[
                'Create the equivalent widget on Devixus and configure it to match your Elfsight setup',
                'Copy the new embed script tag',
                'Replace the Elfsight script tag on your site with the Devixus one',
                'Test, cancel Elfsight',
              ].map((step, i) => (
                <li key={step} className="flex gap-3 text-sm">
                  <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 text-xs font-bold">{i + 1}</span>
                  <span className="text-gray-600 mt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </section>

          {/* CTA */}
          <div className="mt-12 bg-indigo-50 border border-indigo-100 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Try Devixus Widgets free</h3>
            <p className="text-gray-500 text-sm mb-6">2 widgets free forever. No credit card required. No view limits.</p>
            <a
              href={`${WEB_APP}/signup`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition-colors text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              Start for free →
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
            <Link href="/blog/free-google-reviews-widget" className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition-colors text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-300 shrink-0" />
              How to Add a Google Reviews Widget to Your Website for Free
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

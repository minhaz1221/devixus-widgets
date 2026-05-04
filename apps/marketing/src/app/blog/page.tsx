import type { Metadata } from 'next'
import Link from 'next/link'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Blog — Devixus Widgets',
  description: 'Tips, guides, and tutorials on adding widgets to your website. Learn how to embed YouTube feeds, Google Reviews, WhatsApp buttons, and more for free.',
  openGraph: {
    title: 'Blog — Devixus Widgets',
    description: 'Tips, guides, and tutorials on adding widgets to your website.',
  },
}

const POSTS = [
  {
    slug: 'how-to-embed-youtube-feed-on-website',
    title: 'How to Embed a YouTube Feed on Your Website (Free, No Code)',
    excerpt: 'Show your latest YouTube videos on any website in under 2 minutes. No API keys, no coding, no monthly fees.',
    date: '2025-04-28',
    readTime: '4 min read',
    tag: 'Tutorial',
  },
  {
    slug: 'elfsight-alternative',
    title: 'Best Elfsight Alternative in 2025 — Free & No Per-View Limits',
    excerpt: 'Tired of Elfsight\'s $9/month minimum and view limits? Here\'s a free alternative that gives you more widgets for less money.',
    date: '2025-04-22',
    readTime: '5 min read',
    tag: 'Comparison',
  },
  {
    slug: 'free-google-reviews-widget',
    title: 'How to Add a Google Reviews Widget to Your Website for Free',
    excerpt: 'Display your Google star rating and customer reviews on your website automatically. Builds trust and boosts conversions.',
    date: '2025-04-15',
    readTime: '4 min read',
    tag: 'Tutorial',
  },
]

const TAG_COLORS: Record<string, string> = {
  Tutorial: 'bg-indigo-50 text-indigo-600',
  Comparison: 'bg-amber-50 text-amber-600',
}

export default function BlogPage() {
  return (
    <>
      <main className="max-w-3xl mx-auto px-6 py-20">
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Blog</h1>
          <p className="text-gray-500 text-lg">Guides and tutorials for adding widgets to your website.</p>
        </div>

        <div className="space-y-8">
          {POSTS.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
              <article className="border border-gray-100 rounded-2xl p-6 hover:border-indigo-200 hover:shadow-sm transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${TAG_COLORS[post.tag] ?? 'bg-gray-100 text-gray-500'}`}>
                    {post.tag}
                  </span>
                  <span className="text-xs text-gray-400">{post.date}</span>
                  <span className="text-xs text-gray-400">·</span>
                  <span className="text-xs text-gray-400">{post.readTime}</span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors mb-2 leading-snug">
                  {post.title}
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed">{post.excerpt}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-indigo-600 group-hover:gap-2 transition-all">
                  Read article →
                </span>
              </article>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}

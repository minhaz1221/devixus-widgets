import Image from 'next/image'

const TESTIMONIALS = [
  {
    stars: 5,
    quote: 'Set up the WhatsApp widget in under 2 minutes. Our customer response rate went up 40%.',
    name: 'Sarah K.',
    role: 'E-commerce store owner',
    avatar: 'https://i.pravatar.cc/48?img=1',
  },
  {
    stars: 5,
    quote: "Finally a widget platform that doesn't slow down my site. The embed script is tiny and fast.",
    name: 'Mark T.',
    role: 'Web developer',
    avatar: 'https://i.pravatar.cc/48?img=3',
  },
  {
    stars: 5,
    quote: 'The YouTube Feed widget converted more visitors to subscribers than our sidebar banner ever did.',
    name: 'Priya M.',
    role: 'Content creator',
    avatar: 'https://i.pravatar.cc/48?img=5',
  },
]

function StarRow({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 mb-4" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill="#FBBF24" aria-hidden="true">
          <path d="M8 1l1.97 4.43 4.88.63-3.53 3.24.83 4.7L8 11.77 3.85 14 4.68 9.3 1.15 6.06l4.88-.63L8 1z" />
        </svg>
      ))}
    </div>
  )
}

export function Testimonials() {
  return (
    <section className="py-24 px-6 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14 reveal">
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Loved by website owners
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Join thousands of sites already using Devixus Widgets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              className={`reveal reveal-delay-${i + 1} bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow`}
            >
              <StarRow count={t.stars} />
              <p className="text-gray-700 text-sm leading-relaxed mb-6">&quot;{t.quote}&quot;</p>
              <div className="flex items-center gap-3">
                <Image
                  src={t.avatar}
                  alt={t.name}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

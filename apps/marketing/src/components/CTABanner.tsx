const WEB_APP = 'https://devixus-widgets-web.vercel.app'

export function CTABanner() {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background: 'radial-gradient(ellipse at 30% 50%, #4f46e5 0%, #6366f1 50%, #7c3aed 100%)',
        }}
      />

      {/* Floating decorative blobs */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-72 h-72 -z-10 rounded-full opacity-20 blur-3xl"
        style={{ background: '#a5b4fc' }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-72 h-72 -z-10 rounded-full opacity-20 blur-3xl"
        style={{ background: '#c4b5fd' }}
      />

      <div className="max-w-2xl mx-auto text-center reveal">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight">
          Start adding widgets today
        </h2>
        <p className="mt-5 text-lg text-indigo-200">
          Free forever. No credit card. Setup in 2 minutes.
        </p>
        <a
          href={`${WEB_APP}/signup`}
          className="mt-8 inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-indigo-600 font-semibold text-base rounded-full hover:bg-indigo-50 transition-colors shadow-xl"
        >
          Create your first widget →
        </a>
      </div>
    </section>
  )
}

import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-xl">
        <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
          Devixus Widgets
        </h1>
        <p className="mt-4 text-xl text-gray-500">
          The most affordable widget platform for your website.
        </p>
        <div className="mt-8 flex gap-3 justify-center">
          <Link
            href="/signup"
            className="rounded-lg bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition-colors"
          >
            Get started free
          </Link>
          <Link
            href="/login"
            className="rounded-lg border border-gray-300 px-6 py-3 text-gray-700 font-semibold hover:bg-gray-100 transition-colors"
          >
            Sign in
          </Link>
        </div>
      </div>
    </main>
  )
}

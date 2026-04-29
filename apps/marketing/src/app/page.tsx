export default function MarketingHome() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white">
      <div className="text-center max-w-3xl px-6">
        <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
          Embed beautiful widgets
          <br />
          <span className="text-blue-600">on any website</span>
        </h1>
        <p className="mt-6 text-xl text-gray-500">
          Add stunning, customizable widgets to your website in minutes.
          No code required.
        </p>
        <div className="mt-10 flex gap-4 justify-center">
          <a
            href="#"
            className="rounded-lg bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition-colors"
          >
            Get started free
          </a>
          <a
            href="#"
            className="rounded-lg border border-gray-300 px-6 py-3 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
          >
            See widgets
          </a>
        </div>
      </div>
    </main>
  );
}

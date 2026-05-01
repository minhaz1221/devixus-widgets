import { LayoutGrid, Sliders, Code2 } from 'lucide-react'

const STEPS = [
  {
    icon: LayoutGrid,
    title: 'Choose a widget',
    body: 'Pick from 9 ready-made widgets. No design skills needed.',
    step: '01',
  },
  {
    icon: Sliders,
    title: 'Customize it',
    body: 'Use our live configurator to match your brand colors, layout, and style.',
    step: '02',
  },
  {
    icon: Code2,
    title: 'Paste one line',
    body: 'Copy a single script tag. Paste it anywhere on your website. Done.',
    step: '03',
  },
]

export function HowItWorks() {
  return (
    <section className="py-24 px-6 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 reveal">
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Up and running in 3 steps
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            No developer needed. Average setup time: 2 minutes.
          </p>
        </div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Connector line (desktop only) */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute top-9 left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] h-px border-t border-dashed border-indigo-200"
          />

          {STEPS.map((step, i) => (
            <div
              key={step.title}
              className={`reveal reveal-delay-${i + 1} flex flex-col items-center text-center`}
            >
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-white border border-indigo-100 shadow-sm flex items-center justify-center mb-5 z-10 relative">
                  <step.icon size={24} strokeWidth={1.5} className="text-indigo-600" />
                </div>
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold z-20">
                  {i + 1}
                </span>
              </div>
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-2">
                Step {step.step}
              </span>
              <h3 className="font-bold text-gray-900 text-lg mb-2">{step.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed max-w-xs">{step.body}</p>
            </div>
          ))}
        </div>

        {/* Code block */}
        <div className="mt-14 max-w-xl mx-auto reveal reveal-delay-4">
          <div className="bg-gray-900 rounded-xl p-5 font-mono text-sm overflow-x-auto">
            <p className="text-gray-500 mb-2 text-xs">{/* Paste anywhere on your site */}</p>
            <p className="text-gray-500 text-xs mb-1">{'<!-- Paste anywhere on your site -->'}</p>
            <p>
              <span className="text-indigo-400">{'<script'}</span>
              <span className="text-green-400"> src</span>
              <span className="text-gray-300">{'='}</span>
              <span className="text-amber-300">{'"https://widgets.devixus.com/widget.js"'}</span>
            </p>
            <p>
              <span className="text-green-400">{'  data-widget-id'}</span>
              <span className="text-gray-300">{'='}</span>
              <span className="text-amber-300">{'"your-widget-id"'}</span>
              <span className="text-indigo-400">{'></script>'}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

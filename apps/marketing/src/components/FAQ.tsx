'use client'

import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'

const FAQS = [
  {
    q: 'Is Devixus Widgets really free?',
    a: 'Yes. The free plan includes 1 widget and 200 views per month. No credit card required to get started.',
  },
  {
    q: 'Will the widgets slow down my website?',
    a: 'No. Our embed script loads asynchronously and is under 30 KB gzipped. It will not affect your Core Web Vitals or page speed score.',
  },
  {
    q: 'Which website platforms are supported?',
    a: 'All of them — WordPress, Shopify, Wix, Webflow, Squarespace, Framer, plain HTML, and anything else that lets you add a script tag.',
  },
  {
    q: 'Can I remove the "Powered by Devixus" branding?',
    a: 'Yes. Upgrade to Pro ($9/mo) or Agency ($29/mo) to remove all Devixus branding from your widgets.',
  },
  {
    q: 'What happens if I exceed my view limit?',
    a: 'Visitors will see a subtle upgrade prompt instead of the widget. Your site will not break, and your other widgets keep working normally.',
  },
  {
    q: 'Do I need to code anything?',
    a: 'Just paste one script tag — that is it. You customize everything in our visual editor, and we generate the code for you.',
  },
]

export function FAQ() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-14 reveal">
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Frequently asked questions
          </h2>
        </div>

        <Accordion.Root type="single" collapsible className="space-y-0 reveal">
          {FAQS.map((faq, i) => (
            <Accordion.Item
              key={i}
              value={`item-${i}`}
              className="border-b border-gray-100 last:border-0"
            >
              <Accordion.Trigger className="w-full flex items-center justify-between py-5 text-left gap-4 group">
                <span className="font-semibold text-gray-900 text-base">{faq.q}</span>
                <ChevronDown
                  size={18}
                  className="text-gray-400 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180"
                  strokeWidth={2}
                />
              </Accordion.Trigger>
              <Accordion.Content className="accordion-content overflow-hidden">
                <p className="text-sm text-gray-600 leading-relaxed pb-5">{faq.a}</p>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  )
}

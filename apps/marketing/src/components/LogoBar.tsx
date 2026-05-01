function PlatformLogo({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <div
      className="flex items-center gap-2 px-5 py-2.5 grayscale opacity-40 hover:opacity-80 hover:grayscale-0 transition-all duration-300 shrink-0"
      title={name}
    >
      {children}
      <span className="text-sm font-semibold text-gray-600">{name}</span>
    </div>
  )
}

/* Inline SVG brand logos — simplified but recognizable */
const LOGOS = [
  {
    name: 'WordPress',
    svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="#21759B" aria-hidden="true">
        <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 1.542c2.401 0 4.597.876 6.293 2.316L3.858 18.293A8.432 8.432 0 013.542 12c0-4.665 3.793-8.458 8.458-8.458zm0 16.916a8.412 8.412 0 01-5.105-1.722l7.082-7.082.906 2.483-2.883 7.321zm1.016.022l2.566-6.521 3.527 3.527A8.416 8.416 0 0113.016 20.48zm4.625-2.525l-4.28-4.28 1.172-2.974 4.018 2.197a8.39 8.39 0 01-.91 5.057z" />
      </svg>
    ),
  },
  {
    name: 'Shopify',
    svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="#96BF48" aria-hidden="true">
        <path d="M15.337 23.979l7.216-1.561s-2.585-17.47-2.604-17.594c-.018-.123-.123-.203-.226-.203s-2.059-.141-2.059-.141-.914-.905-1.026-1.016v-.001c-.01-.009-.019-.016-.03-.022L15.337 23.979zm-2.16-22.074c-.01.003-.02.007-.027.011C13.044 1.715 12.53 1.5 11.946 1.5c-1.115 0-2.207.838-3.101 2.277-.628 1.003-1.104 2.263-1.239 3.237l-2.81.87s-.831-16.7-.856-16.988L15.337 23.979l-2.16-22.074z" />
      </svg>
    ),
  },
  {
    name: 'Webflow',
    svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="#4353FF" aria-hidden="true">
        <path d="M17.805 8.13s-2.322 7.3-2.473 7.8c-.045-.434-.976-7.8-.976-7.8H11.16s-2.329 7.3-2.479 7.8c-.048-.434-.978-7.8-.978-7.8H4.615L7.24 19.87h3.3l2.462-7.205 2.462 7.205h3.297l2.623-11.74h-3.579z" />
      </svg>
    ),
  },
  {
    name: 'Wix',
    svg: (
      <svg width="24" height="14" viewBox="0 0 90 34" fill="#FAAD4D" aria-hidden="true">
        <path d="M26.56 0c-2.21.63-3.51 2.31-4.41 4.44L15.54 20.5 9.7 4.44C8.8 2.31 7.5.63 5.29 0L0 27.02c2.62.05 4.64-.7 5.9-2.47l2.95-12.9 5.93 16.55c1.7.26 3.28-.07 4.47-1.32l6.18-15.23 2.96 12.9c1.26 1.77 3.28 2.52 5.9 2.47L26.56 0z" />
        <path d="M38.58.06c-2.35 0-4.26 1.9-4.26 4.26v22.7h8.52V4.32c0-2.36-1.9-4.26-4.26-4.26zm12.37 0L40.37 27.02h8.22l10.58-26.96H50.95zM62.37.06L72.95 27.02h8.22L70.59.06H62.37z" />
        <path d="M76.5.06c-2.35 0-4.26 1.9-4.26 4.26v22.7H80.76V4.32C80.76 1.96 78.86.06 76.5.06z" />
      </svg>
    ),
  },
  {
    name: 'Squarespace',
    svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="#000" aria-hidden="true">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.563 8.438L8.438 17.563a.75.75 0 01-1.06-1.061l9.124-9.124a.75.75 0 011.061 1.06zM6.437 13.937a2.25 2.25 0 010-3.182l3.875-3.875a2.25 2.25 0 013.182 0l.53.53-7.057 7.058-.53-.531zm10.313 0l-3.875 3.876a2.25 2.25 0 01-3.182 0l-.53-.531 7.058-7.058.529.53a2.25 2.25 0 010 3.183z" />
      </svg>
    ),
  },
  {
    name: 'Framer',
    svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="#0055FF" aria-hidden="true">
        <path d="M4 0h16v8h-8zm0 8h8l8 8H4zm0 8h8v8z" />
      </svg>
    ),
  },
  {
    name: 'HTML',
    svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="#E34F26" aria-hidden="true">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z" />
      </svg>
    ),
  },
  {
    name: 'Elementor',
    svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="#92003B" aria-hidden="true">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-1.39 16.958H8.04V7.042h2.57v9.916zm5.35 0h-2.57V7.042h2.57v9.916z" />
      </svg>
    ),
  },
]

import React from 'react'

export function LogoBar() {
  return (
    <section className="py-12 px-6 border-y border-gray-100 overflow-hidden">
      <p className="text-center text-xs font-semibold uppercase tracking-widest text-gray-400 mb-8 reveal">
        Embed on any platform
      </p>

      {/* Marquee container */}
      <div className="relative">
        <div className="flex overflow-hidden">
          <div className="marquee-track flex">
            {/* Double the logos for seamless loop */}
            {[...LOGOS, ...LOGOS].map((logo, i) => (
              <PlatformLogo key={`${logo.name}-${i}`} name={logo.name}>
                {logo.svg}
              </PlatformLogo>
            ))}
          </div>
        </div>

        {/* Fade edges */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-24 pointer-events-none"
          style={{ background: 'linear-gradient(to right, white, transparent)' }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-0 w-24 pointer-events-none"
          style={{ background: 'linear-gradient(to left, white, transparent)' }}
        />
      </div>
    </section>
  )
}

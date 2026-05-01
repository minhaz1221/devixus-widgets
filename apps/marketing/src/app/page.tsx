'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'
import { Hero } from '@/components/Hero'
import { LogoBar } from '@/components/LogoBar'
import { WidgetGrid } from '@/components/WidgetGrid'
import { HowItWorks } from '@/components/HowItWorks'
import { Pricing } from '@/components/Pricing'
import { Testimonials } from '@/components/Testimonials'
import { FAQ } from '@/components/FAQ'
import { CTABanner } from '@/components/CTABanner'
import { Footer } from '@/components/Footer'

export default function HomePage() {
  useScrollReveal()

  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <LogoBar />
      <WidgetGrid />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTABanner />
      <Footer />
    </main>
  )
}

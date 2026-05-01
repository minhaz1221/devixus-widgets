import type { Metadata } from 'next'
import { Navbar } from '@/components/Navbar'
import './globals.css'

export const metadata: Metadata = {
  title: 'Devixus Widgets — Free Website Widgets for Any Website',
  description: 'Add WhatsApp chat buttons, testimonials sliders, Google reviews, countdown timers and more to your website in 60 seconds. Free plan available. No code required.',
  keywords: 'website widgets, whatsapp chat button, testimonials widget, free website widgets, embed widgets, no code widgets',
  openGraph: {
    title: 'Devixus Widgets — Free Website Widgets',
    description: 'Add beautiful widgets to any website in 60 seconds.',
    url: 'https://devixus-widgets-marketing.vercel.app',
    siteName: 'Devixus Widgets',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Devixus Widgets — Free Website Widgets',
    description: 'Add beautiful widgets to any website in 60 seconds.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}

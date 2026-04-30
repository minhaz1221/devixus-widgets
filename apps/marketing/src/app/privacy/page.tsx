import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — Devixus Widgets',
  description: 'Privacy Policy for Devixus Widgets.',
}

const SECTIONS = [
  {
    title: '1. Who We Are',
    body: `Devixus ("we", "us", "our") operates the Devixus Widgets platform at devixus-widgets-marketing.vercel.app. We are committed to protecting your personal data and respecting your privacy.

Contact: minhaz12219991@gmail.com`,
  },
  {
    title: '2. Data We Collect',
    body: `We collect the following categories of personal data:

Account data
• Email address (required to create an account)
• Name (optional, provided during signup)
• Password (stored as a secure hash — we never see your plain-text password)

Usage data
• Widget configurations you create (names, settings, colors)
• Number of widget installs and page views (aggregated analytics)
• Dashboard activity (pages visited, features used)
• IP address and browser/device information (collected by our hosting provider)

Billing data
• Subscription plan and billing status
• We do not store payment card details — all payment processing is handled by Lemon Squeezy

Communications
• Emails you send to our support address`,
  },
  {
    title: '3. How We Use Your Data',
    body: `We use your personal data to:

• Create and manage your account
• Deliver the Devixus Widgets service
• Process subscription payments via Lemon Squeezy
• Send transactional emails (welcome email on signup, upgrade confirmation)
• Provide customer support when you contact us
• Detect and prevent fraud or abuse
• Analyse aggregate usage to improve the Service
• Comply with legal obligations

We do not sell your personal data to third parties. We do not use your data for advertising.`,
  },
  {
    title: '4. Legal Basis for Processing (GDPR)',
    body: `If you are located in the European Economic Area (EEA), we process your personal data under the following legal bases:

• Contract — processing necessary to provide the Service you signed up for
• Legitimate interests — improving the Service, detecting abuse, sending transactional emails
• Legal obligation — complying with applicable laws and regulations
• Consent — where we explicitly ask for your consent (e.g., marketing emails, if ever introduced)

You may withdraw consent at any time where processing is based on consent.`,
  },
  {
    title: '5. Third-Party Services',
    body: `We share data with the following trusted third parties only as necessary to deliver the Service:

Supabase — database and authentication provider. Stores your account data securely.
Website: supabase.com | Privacy: supabase.com/privacy

Lemon Squeezy — payment processing and subscription management. Receives billing-related data.
Website: lemonsqueezy.com | Privacy: lemonsqueezy.com/privacy

Vercel — hosting and infrastructure provider. Processes server requests and logs.
Website: vercel.com | Privacy: vercel.com/legal/privacy-policy

Resend — transactional email delivery. Receives your email address to deliver system emails.
Website: resend.com | Privacy: resend.com/privacy

All third parties are contractually bound to protect your data and use it only for the purposes we specify.`,
  },
  {
    title: '6. Cookies',
    body: `Devixus Widgets uses cookies and similar technologies to:

• Maintain your login session (authentication cookie — strictly necessary)
• Remember your preferences
• Measure aggregate usage via anonymous analytics

We do not use advertising cookies or third-party tracking cookies.

You can control cookies through your browser settings. Disabling strictly necessary cookies will prevent you from staying logged in.`,
  },
  {
    title: '7. Data Retention',
    body: `We retain your personal data for as long as your account is active or as needed to provide the Service.

If you delete your account, we will delete or anonymise your personal data within 30 days, except where we are required to retain it by law (e.g., financial records for tax purposes, typically 7 years).

Aggregated, anonymous analytics data may be retained indefinitely as it cannot be used to identify you.`,
  },
  {
    title: '8. Your Rights',
    body: `Depending on your location, you may have the following rights regarding your personal data:

• Access — request a copy of the personal data we hold about you
• Rectification — correct inaccurate or incomplete data
• Erasure — request deletion of your data ("right to be forgotten")
• Restriction — request that we limit how we process your data
• Portability — receive your data in a structured, machine-readable format
• Objection — object to processing based on legitimate interests

To exercise any of these rights, contact us at minhaz12219991@gmail.com. We will respond within 30 days.

If you are in the EEA, you also have the right to lodge a complaint with your local data protection authority.`,
  },
  {
    title: '9. Data Security',
    body: `We take the security of your data seriously. We implement appropriate technical and organisational measures including:

• Encrypted data storage and transmission (HTTPS/TLS)
• Passwords stored using strong one-way hashing (handled by Supabase)
• Access controls limiting who can access production data
• Regular security reviews

No method of transmission or storage is 100% secure. If you believe your account has been compromised, contact us immediately.`,
  },
  {
    title: '10. Children\'s Privacy',
    body: `The Service is not directed to children under 16. We do not knowingly collect personal data from anyone under 16. If we become aware that a child under 16 has provided us with personal data, we will delete it promptly.`,
  },
  {
    title: '11. Changes to This Policy',
    body: `We may update this Privacy Policy from time to time. We will notify you of significant changes by updating the "Last updated" date at the top of this page. Continued use of the Service after changes constitutes acceptance of the updated policy.`,
  },
  {
    title: '12. Contact Us',
    body: `If you have any questions about this Privacy Policy or how we handle your data, please contact:\n\nminhaz12219991@gmail.com`,
  },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900">Privacy Policy</h1>
          <p className="mt-3 text-gray-500">Last updated: April 2026</p>
          <p className="mt-4 text-gray-600 leading-relaxed">
            This Privacy Policy explains how Devixus collects, uses, and protects your personal
            data when you use Devixus Widgets. We are committed to transparency and your privacy rights.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-10">
          {SECTIONS.map((section) => (
            <div key={section.title}>
              <h2 className="text-xl font-bold text-gray-900 mb-3">{section.title}</h2>
              <div className="text-gray-600 leading-relaxed whitespace-pre-line">
                {section.body}
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="mt-16 pt-8 border-t border-gray-200 text-sm text-gray-400 text-center">
          © 2025 Devixus. All rights reserved.
        </div>
      </div>
    </div>
  )
}

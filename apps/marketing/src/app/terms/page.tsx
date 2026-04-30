import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service — Devixus Widgets',
  description: 'Terms of Service for Devixus Widgets.',
}

const SECTIONS = [
  {
    title: '1. Acceptance of Terms',
    body: `By accessing or using Devixus Widgets ("the Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, do not use the Service.

These Terms apply to all visitors, users, and others who access or use the Service. We may update these Terms at any time. Continued use of the Service after changes constitutes acceptance of the updated Terms.`,
  },
  {
    title: '2. Description of Service',
    body: `Devixus Widgets is a SaaS platform that allows website owners to embed customizable widgets — including WhatsApp chat buttons, testimonial sliders, and more — on their websites via a script tag.

The Service includes:
• A web dashboard for creating and managing widgets
• An embed script that renders widgets on third-party websites
• Analytics and reporting features (on paid plans)
• Billing and subscription management`,
  },
  {
    title: '3. User Accounts',
    body: `To use the Service, you must create an account. You agree to:

• Provide accurate and complete registration information
• Maintain the security of your password and account
• Promptly notify us of any unauthorized use of your account
• Be responsible for all activity that occurs under your account

You must be at least 16 years old to use the Service. By creating an account, you represent that you meet this requirement.`,
  },
  {
    title: '4. Subscription Plans',
    body: `Devixus Widgets offers the following plans:

Free Plan — No charge. Limited to 1 widget with Devixus branding.

Pro Plan — $9/month. Up to 5 widgets, no branding, full analytics, priority support.

Agency Plan — $29/month. Unlimited widgets, no branding, white-label option, priority support.

Billing is processed through Lemon Squeezy. Subscriptions renew automatically unless cancelled. You may cancel at any time from your billing dashboard, effective at the end of the current billing period. No refunds are issued for partial months unless required by law.

We reserve the right to change pricing with 30 days' notice.`,
  },
  {
    title: '5. Acceptable Use',
    body: `You agree not to use the Service to:

• Violate any applicable laws or regulations
• Infringe the intellectual property rights of others
• Transmit spam, malware, or harmful code
• Collect personal data without appropriate consent
• Circumvent plan limits or access restrictions
• Engage in any activity that disrupts or interferes with the Service
• Resell or sublicense the Service without our written permission

We reserve the right to suspend or terminate accounts that violate this policy.`,
  },
  {
    title: '6. Intellectual Property',
    body: `The Service, including its code, design, logos, and content, is owned by Devixus and protected by applicable intellectual property laws.

You retain ownership of any content you create using the Service (widget configurations, text, images). By using the Service, you grant Devixus a limited licence to host and deliver your widget configurations as necessary to provide the Service.

The "Powered by Devixus" attribution on Free plan widgets must not be removed or altered. Removing branding requires a paid plan.`,
  },
  {
    title: '7. Disclaimers',
    body: `THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.

We do not warrant that the Service will be uninterrupted, error-free, or free of viruses. We do not guarantee that the Service will meet your specific requirements.`,
  },
  {
    title: '8. Limitation of Liability',
    body: `TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, DEVIXUS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, OR GOODWILL, ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE SERVICE.

Our total liability to you for any claim arising out of or relating to these Terms or the Service shall not exceed the total amount you paid to Devixus in the twelve months preceding the claim.`,
  },
  {
    title: '9. Termination',
    body: `You may terminate your account at any time by cancelling your subscription and deleting your account from the dashboard.

We may suspend or terminate your access to the Service at our discretion if you violate these Terms, engage in fraudulent activity, or if we discontinue the Service. Upon termination, your right to use the Service ceases immediately. We may retain certain data as required by law or for legitimate business purposes.`,
  },
  {
    title: '10. Governing Law',
    body: `These Terms are governed by and construed in accordance with applicable law. Any disputes arising from these Terms or the Service shall be resolved through good-faith negotiation. If negotiation fails, disputes shall be submitted to binding arbitration or the courts of competent jurisdiction.`,
  },
  {
    title: '11. Contact Us',
    body: `If you have any questions about these Terms, please contact us at:\n\nminhaz12219991@gmail.com`,
  },
]

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900">Terms of Service</h1>
          <p className="mt-3 text-gray-500">Last updated: April 2026</p>
          <p className="mt-4 text-gray-600 leading-relaxed">
            These Terms of Service govern your use of Devixus Widgets, operated by Devixus
            ({' '}
            <span className="font-medium">devixus-widgets-marketing.vercel.app</span>
            {' '}). Please read them carefully.
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

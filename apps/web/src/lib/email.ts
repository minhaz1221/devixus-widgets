import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendWelcomeEmail(email: string, name?: string) {
  try {
    await resend.emails.send({
      from: 'Devixus Widgets <hello@devixus.com>',
      to: email,
      subject: 'Welcome to Devixus Widgets! 🎉',
      html: `
        <!DOCTYPE html>
        <html>
        <body style="font-family: -apple-system, sans-serif;
          max-width: 600px; margin: 0 auto; padding: 40px 20px;
          color: #1a1a1a;">
          <div style="background: #ff6914; padding: 24px;
            border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">
              Devixus Widgets
            </h1>
          </div>
          <div style="background: #f9f9f9; padding: 32px;
            border-radius: 0 0 12px 12px; border: 1px solid #eee;">
            <h2>Welcome${name ? `, ${name}` : ''}! 👋</h2>
            <p style="color: #555; line-height: 1.6;">
              Your account is ready. Here's how to get started:
            </p>
            <ol style="color: #555; line-height: 2;">
              <li>Go to your dashboard</li>
              <li>Click "New Widget"</li>
              <li>Choose WhatsApp or Testimonials</li>
              <li>Customize and copy your embed code</li>
              <li>Paste it into your website</li>
            </ol>
            <div style="text-align: center; margin: 32px 0;">
              <a href="https://devixus-widgets-web.vercel.app/dashboard"
                style="background: #ff6914; color: white;
                padding: 14px 28px; border-radius: 8px;
                text-decoration: none; font-weight: 600;
                display: inline-block;">
                Go to Dashboard →
              </a>
            </div>
            <p style="color: #999; font-size: 13px; text-align: center;">
              Questions? Reply to this email anytime.
            </p>
          </div>
        </body>
        </html>
      `,
    })
  } catch (error) {
    console.error('Failed to send welcome email:', error)
    // Never throw — email failure should not break signup
  }
}

export async function sendUpgradeEmail(
  email: string,
  plan: string,
  name?: string
) {
  try {
    await resend.emails.send({
      from: 'Devixus Widgets <hello@devixus.com>',
      to: email,
      subject: `You're now on the ${plan} plan! 🚀`,
      html: `
        <!DOCTYPE html>
        <html>
        <body style="font-family: -apple-system, sans-serif;
          max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          <div style="background: #ff6914; padding: 24px;
            border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0;">Devixus Widgets</h1>
          </div>
          <div style="background: #f9f9f9; padding: 32px;
            border-radius: 0 0 12px 12px; border: 1px solid #eee;">
            <h2>You're on ${plan}! 🎉</h2>
            <p style="color: #555; line-height: 1.6;">
              Thank you for upgrading${name ? `, ${name}` : ''}.
              Your new features are active immediately:
            </p>
            <ul style="color: #555; line-height: 2;">
              ${plan === 'Pro' ? `
                <li>✅ Up to 5 widgets</li>
                <li>✅ Devixus branding removed</li>
                <li>✅ Full analytics</li>
                <li>✅ Priority support</li>
              ` : `
                <li>✅ Unlimited widgets</li>
                <li>✅ Devixus branding removed</li>
                <li>✅ White-label option</li>
                <li>✅ Priority support</li>
              `}
            </ul>
            <div style="text-align: center; margin: 32px 0;">
              <a href="https://devixus-widgets-web.vercel.app/dashboard"
                style="background: #ff6914; color: white;
                padding: 14px 28px; border-radius: 8px;
                text-decoration: none; font-weight: 600;
                display: inline-block;">
                Go to Dashboard →
              </a>
            </div>
          </div>
        </body>
        </html>
      `,
    })
  } catch (error) {
    console.error('Failed to send upgrade email:', error)
  }
}

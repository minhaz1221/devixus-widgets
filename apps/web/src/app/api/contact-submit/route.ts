import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      widget_id,
      name,
      email,
      phone,
      subject,
      message,
      recipient_email,
    } = body

    if (!widget_id || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const supabase = createAdminClient()
    const { data: widget } = await supabase
      .from('widgets')
      .select('id, config, is_active, user_id')
      .eq('id', widget_id)
      .single()

    if (!widget || !widget.is_active) {
      return NextResponse.json(
        { error: 'Widget not found' },
        { status: 404 }
      )
    }

    const config = widget.config as Record<string, unknown>
    const to = recipient_email || (config.recipient_email as string) || ''

    if (!to) {
      return NextResponse.json(
        { error: 'No recipient email configured' },
        { status: 400 }
      )
    }

    await resend.emails.send({
      from: 'Devixus Widgets <forms@devixus.com>',
      to: to,
      replyTo: email || undefined,
      subject: subject || `New contact form submission from ${name || 'Anonymous'}`,
      html: `
        <!DOCTYPE html>
        <html>
        <body style="font-family: -apple-system, sans-serif;
          max-width: 600px; margin: 0 auto;
          padding: 40px 20px; color: #1a1a1a;">
          <div style="background: #6366f1; padding: 20px 24px;
            border-radius: 12px 12px 0 0;">
            <h2 style="color: white; margin: 0; font-size: 18px;">
              New Contact Form Submission
            </h2>
          </div>
          <div style="background: #f9f9f9; padding: 24px;
            border-radius: 0 0 12px 12px;
            border: 1px solid #eee; border-top: none;">
            ${name ? `
              <div style="margin-bottom: 16px;">
                <strong>Name:</strong><br/>
                <span style="color: #555;">${name}</span>
              </div>` : ''}
            ${email ? `
              <div style="margin-bottom: 16px;">
                <strong>Email:</strong><br/>
                <a href="mailto:${email}"
                   style="color: #6366f1;">
                  ${email}
                </a>
              </div>` : ''}
            ${phone ? `
              <div style="margin-bottom: 16px;">
                <strong>Phone:</strong><br/>
                <span style="color: #555;">${phone}</span>
              </div>` : ''}
            ${subject ? `
              <div style="margin-bottom: 16px;">
                <strong>Subject:</strong><br/>
                <span style="color: #555;">${subject}</span>
              </div>` : ''}
            <div style="margin-bottom: 16px;">
              <strong>Message:</strong><br/>
              <div style="background: white; padding: 12px;
                border-radius: 8px; margin-top: 8px;
                border: 1px solid #eee; color: #555;
                line-height: 1.6; white-space: pre-wrap;">
                ${message}
              </div>
            </div>
            <div style="margin-top: 24px; padding-top: 16px;
              border-top: 1px solid #eee; font-size: 12px;
              color: #999; text-align: center;">
              Sent via Devixus Widgets contact form
            </div>
          </div>
        </body>
        </html>
      `,
    })

    return NextResponse.json(
      { success: true },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}

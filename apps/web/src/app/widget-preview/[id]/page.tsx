import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Widget Preview' }

// Allow this page to be embedded in iframes
export async function generateStaticParams() {
  return []
}

export default function WidgetPreviewPage({ params }: { params: { id: string } }) {
  const { id } = params
  const scriptSrc = process.env.NEXT_PUBLIC_APP_URL
    ? `${process.env.NEXT_PUBLIC_APP_URL}/widget.js`
    : '/widget.js'

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`
          * { margin: 0; padding: 0; box-sizing: border-box; }
          html, body { height: 100%; width: 100%; background: #f8fafc; }
          .hint {
            position: absolute;
            bottom: 90px;
            right: 24px;
            font-family: sans-serif;
            font-size: 11px;
            color: #94a3b8;
          }
        `}</style>
      </head>
      <body>
        <span className="hint">Preview</span>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src={scriptSrc} data-widget-id={id} />
      </body>
    </html>
  )
}

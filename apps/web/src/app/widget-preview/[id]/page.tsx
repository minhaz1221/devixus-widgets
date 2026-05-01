export default function WidgetPreviewPage({ params }: { params: { id: string } }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Widget Preview</title>
        <style>{`
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: #f5f5f5;
            min-height: 400px;
          }
          .preview-banner {
            background: #1a1a2e;
            color: #666;
            font-size: 11px;
            text-align: center;
            padding: 6px;
            letter-spacing: .08em;
            font-weight: 500;
          }
          .mock-site {
            padding: 24px;
            max-width: 860px;
            margin: 0 auto;
          }
          .mock-header {
            height: 48px;
            background: white;
            border-radius: 8px;
            margin-bottom: 16px;
            display: flex;
            align-items: center;
            padding: 0 16px;
            gap: 8px;
            box-shadow: 0 1px 3px rgba(0,0,0,.06);
          }
          .mock-dot {
            width: 10px; height: 10px;
            border-radius: 50%;
          }
          .mock-logo {
            width: 80px; height: 10px;
            background: #e5e7eb;
            border-radius: 4px;
            margin-left: 6px;
          }
          .mock-nav {
            width: 200px; height: 10px;
            background: #f3f4f6;
            border-radius: 4px;
            margin-left: auto;
          }
          .mock-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
            margin-bottom: 16px;
          }
          .mock-card {
            background: white;
            border-radius: 8px;
            height: 100px;
            box-shadow: 0 1px 3px rgba(0,0,0,.06);
          }
          .mock-wide {
            background: white;
            border-radius: 8px;
            height: 60px;
            box-shadow: 0 1px 3px rgba(0,0,0,.06);
          }
          .widget-mount { margin-top: 20px; }
        `}</style>
      </head>
      <body>
        <div className="preview-banner">PREVIEW MODE</div>
        <div className="mock-site">
          <div className="mock-header">
            <div className="mock-dot" style={{ background: '#ef4444' }} />
            <div className="mock-dot" style={{ background: '#f59e0b' }} />
            <div className="mock-dot" style={{ background: '#10b981' }} />
            <div className="mock-logo" />
            <div className="mock-nav" />
          </div>
          <div className="mock-content">
            <div className="mock-card" />
            <div className="mock-card" />
          </div>
          <div className="mock-wide" />
          <div className="widget-mount">
            {/* eslint-disable-next-line @next/next/no-sync-scripts */}
            <script src="/widget.js" data-widget-id={params.id} />
          </div>
        </div>
      </body>
    </html>
  )
}

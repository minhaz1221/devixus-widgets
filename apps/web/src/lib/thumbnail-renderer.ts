/**
 * Generates a compact HTML snapshot for use as a widget card thumbnail.
 * Wraps generatePreviewHTML with CSS overrides that scale the content
 * to fit a 280×180 card preview (no pointer events, reduced padding).
 *
 * Supabase migration (run once in SQL editor):
 *   ALTER TABLE widgets ADD COLUMN IF NOT EXISTS thumbnail_html TEXT;
 *   ALTER TABLE widgets ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active'
 *     CHECK (status IN ('active', 'paused', 'draft'));
 */

import { generatePreviewHTML } from './preview-renderer'

export function generateThumbnailHTML(
  widgetType: string,
  config: Record<string, unknown>,
  realData?: Record<string, unknown> | null,
): string {
  const inner = generatePreviewHTML(widgetType, config, realData)
  // Inject a style override into the <head> that scales & clips the content
  return inner.replace(
    '</head>',
    `<style>
      html, body { overflow: hidden !important; pointer-events: none !important; user-select: none !important; }
      body { transform-origin: top left; transform: scale(0.55); width: 182%; padding: 8px !important; }
    </style>
  </head>`,
  )
}

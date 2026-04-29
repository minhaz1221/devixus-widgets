(function() {
  'use strict'

  const API_BASE = 'https://devixus-widgets-web.vercel.app'
  const BRANDING_URL = 'https://devixus-widgets-marketing.vercel.app'

  // Find the current script tag to read widget ID
  function getCurrentScript(): HTMLScriptElement | null {
    if (document.currentScript) {
      return document.currentScript as HTMLScriptElement
    }
    // Fallback for older browsers
    const scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1] as HTMLScriptElement
  }

  // Fetch widget config from our API
  async function fetchWidgetConfig(widgetId: string) {
    const response = await fetch(`${API_BASE}/api/widget/${widgetId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!response.ok) {
      throw new Error(`Widget not found: ${widgetId}`)
    }

    return response.json()
  }

  // Create isolated shadow DOM container
  function createContainer(targetEl: Element): ShadowRoot {
    const host = document.createElement('div')
    host.setAttribute('data-devixus-widget', 'true')
    host.style.cssText = 'all: initial; display: block;'
    targetEl.appendChild(host)
    return host.attachShadow({ mode: 'open' })
  }

  // Render WhatsApp widget
  function renderWhatsApp(shadow: ShadowRoot, config: Record<string, unknown>, showBranding: boolean) {
    const phone = (config.phone_number as string) || ''
    const message = encodeURIComponent((config.welcome_message as string) || 'Hello!')
    const color = (config.button_color as string) || '#25D366'
    const position = (config.position as string) || 'bottom-right'

    const positionStyle = position === 'bottom-right'
      ? 'bottom: 24px; right: 24px;'
      : 'bottom: 24px; left: 24px;'
    const alignItems = position === 'bottom-right' ? 'flex-end' : 'flex-start'

    shadow.innerHTML = `
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .wa-btn {
          position: fixed;
          ${positionStyle}
          z-index: 9999;
          display: flex;
          flex-direction: column;
          align-items: ${alignItems};
          gap: 6px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        .wa-bubble {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: ${color};
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          text-decoration: none;
        }
        .wa-bubble:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(0,0,0,0.3);
        }
        .wa-bubble svg {
          width: 30px;
          height: 30px;
          fill: white;
        }
        .wa-branding {
          font-size: 9px;
          color: #999;
          text-decoration: none;
          opacity: 0.7;
        }
        .wa-branding:hover { opacity: 1; }
      </style>
      <div class="wa-btn">
        <a class="wa-bubble"
           href="https://wa.me/${phone}?text=${message}"
           target="_blank"
           rel="noopener noreferrer"
           aria-label="Chat on WhatsApp">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>
        ${showBranding ? `<a class="wa-branding" href="${BRANDING_URL}" target="_blank" rel="noopener noreferrer">Powered by Devixus</a>` : ''}
      </div>
    `
  }

  // Render Testimonials widget
  function renderTestimonials(shadow: ShadowRoot, config: Record<string, unknown>, showBranding: boolean) {
    const testimonials = (config.testimonials as Array<Record<string, unknown>>) || []
    const theme = (config.theme as string) || 'light'
    const showRating = config.show_rating !== false

    const bg = theme === 'dark' ? '#1a1a1a' : '#ffffff'
    const text = theme === 'dark' ? '#ffffff' : '#1a1a1a'
    const subtext = theme === 'dark' ? '#aaaaaa' : '#666666'
    const cardBg = theme === 'dark' ? '#2a2a2a' : '#f9f9f9'

    const cards = testimonials.map((t) => {
      const rating = (t.rating as number) || 5
      const stars = showRating
        ? `<div class="stars">${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}</div>`
        : ''
      const avatar = t.avatar_url
        ? `<img src="${t.avatar_url as string}" class="avatar" alt="${t.author as string}" />`
        : ''
      return `
        <div class="card">
          ${stars}
          <p class="content">"${t.content as string}"</p>
          <div class="author-row">
            ${avatar}
            <div>
              <div class="author">${t.author as string}</div>
              <div class="role">${(t.role as string) || ''}</div>
            </div>
          </div>
        </div>
      `
    }).join('')

    shadow.innerHTML = `
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .wrap {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: ${bg};
          padding: 24px 16px;
          overflow: hidden;
        }
        .track {
          display: flex;
          gap: 16px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scrollbar-width: none;
          -ms-overflow-style: none;
          padding-bottom: 8px;
        }
        .track::-webkit-scrollbar { display: none; }
        .card {
          flex: 0 0 280px;
          scroll-snap-align: start;
          background: ${cardBg};
          border-radius: 12px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .stars { color: #f59e0b; font-size: 16px; letter-spacing: 2px; }
        .content {
          color: ${text};
          font-size: 14px;
          line-height: 1.6;
          flex: 1;
        }
        .author-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          object-fit: cover;
        }
        .author {
          color: ${text};
          font-size: 13px;
          font-weight: 600;
        }
        .role {
          color: ${subtext};
          font-size: 12px;
        }
        .branding {
          text-align: center;
          margin-top: 12px;
          font-size: 10px;
        }
        .branding a {
          color: ${subtext};
          text-decoration: none;
          opacity: 0.6;
        }
        .branding a:hover { opacity: 1; }
      </style>
      <div class="wrap">
        <div class="track">${cards}</div>
        ${showBranding ? `<div class="branding"><a href="${BRANDING_URL}" target="_blank" rel="noopener noreferrer">Powered by Devixus Widgets</a></div>` : ''}
      </div>
    `
  }

  // Fire-and-forget load beacon
  function trackLoad(widgetId: string, apiBase: string) {
    try {
      const domain = window.location.hostname
      const payload = JSON.stringify({
        widget_id: widgetId,
        domain: domain,
        event_type: 'load',
      })
      if (navigator.sendBeacon) {
        navigator.sendBeacon(
          `${apiBase}/api/track`,
          new Blob([payload], { type: 'application/json' })
        )
      } else {
        fetch(`${apiBase}/api/track`, {
          method: 'POST',
          body: payload,
          headers: { 'Content-Type': 'application/json' },
          keepalive: true,
        }).catch(() => {})
      }
    } catch {
      // Never throw — tracking must never break the widget
    }
  }

  // Main render router
  function renderWidget(shadow: ShadowRoot, widget: { type: string; config: Record<string, unknown>; show_branding: boolean }) {
    switch (widget.type) {
      case 'whatsapp':
        renderWhatsApp(shadow, widget.config, widget.show_branding)
        break
      case 'testimonials':
        renderTestimonials(shadow, widget.config, widget.show_branding)
        break
      default:
        console.warn(`[Devixus] Unknown widget type: ${widget.type}`)
    }
  }

  // Bootstrap — entry point
  async function init() {
    const script = getCurrentScript()
    if (!script) return

    const widgetId = script.getAttribute('data-widget-id')
    if (!widgetId) {
      console.warn('[Devixus] Missing data-widget-id attribute on script tag')
      return
    }

    const mountSelector = script.getAttribute('data-mount') || null

    try {
      const widget = await fetchWidgetConfig(widgetId)
      const targetEl = mountSelector
        ? document.querySelector(mountSelector) || document.body
        : document.body

      const shadow = createContainer(targetEl)
      renderWidget(shadow, widget)
      trackLoad(widgetId, API_BASE)
    } catch (err) {
      console.warn('[Devixus] Widget failed to load:', err)
    }
  }

  // Run after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }
})()

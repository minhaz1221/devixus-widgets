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
    const sizeMap: Record<string, number> = { small: 44, medium: 56, large: 68 }
    const bubbleSize = sizeMap[(config.button_size as string) || 'medium'] || 56
    const iconSize = Math.round(bubbleSize * 0.54)
    const pulse = !!config.pulse_animation
    const target = (config.open_in as string) === 'same_tab' ? '_self' : '_blank'
    const tooltipText = (config.tooltip_text as string) || ''

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
        .wa-bubble-wrap { position: relative; display: inline-flex; }
        .wa-bubble {
          width: ${bubbleSize}px;
          height: ${bubbleSize}px;
          border-radius: 50%;
          background: ${color};
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          text-decoration: none;
          position: relative;
        }
        .wa-bubble:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(0,0,0,0.3);
        }
        .wa-bubble svg {
          width: ${iconSize}px;
          height: ${iconSize}px;
          fill: white;
        }
        ${pulse ? `
        @keyframes wa-pulse {
          0% { transform: scale(.85); opacity: 0; }
          50% { opacity: .4; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        .wa-bubble::before {
          content: '';
          position: absolute;
          border-radius: 50%;
          background: ${color};
          width: 100%; height: 100%;
          animation: wa-pulse 2s ease infinite;
          z-index: -1;
        }` : ''}
        ${tooltipText ? `
        .wa-tooltip {
          position: absolute;
          bottom: calc(100% + 8px);
          ${position === 'bottom-right' ? 'right: 0;' : 'left: 0;'}
          background: white;
          color: #1a1a1a;
          font-size: 13px;
          font-weight: 500;
          padding: 7px 12px;
          border-radius: 8px;
          white-space: nowrap;
          box-shadow: 0 4px 16px rgba(0,0,0,0.12);
          animation: wa-tooltip-in .2s ease;
        }
        @keyframes wa-tooltip-in {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }` : ''}
        .wa-branding {
          font-size: 9px;
          color: #999;
          text-decoration: none;
          opacity: 0.7;
        }
        .wa-branding:hover { opacity: 1; }
      </style>
      <div class="wa-btn">
        <div class="wa-bubble-wrap">
          ${tooltipText ? `<div class="wa-tooltip">${tooltipText}</div>` : ''}
          <a class="wa-bubble"
             href="https://wa.me/${phone}?text=${message}"
             target="${target}"
             rel="noopener noreferrer"
             aria-label="Chat on WhatsApp">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </a>
        </div>
        ${showBranding ? `<a class="wa-branding" href="${BRANDING_URL}" target="_blank" rel="noopener noreferrer">Powered by Devixus</a>` : ''}
      </div>
    `
  }

  // Render Testimonials widget
  function renderTestimonials(shadow: ShadowRoot, config: Record<string, unknown>, showBranding: boolean) {
    const testimonials = (config.testimonials as Array<Record<string, unknown>>) || []
    const theme = (config.theme as string) || 'light'
    const showRating = config.show_rating !== false
    const layout = (config.layout as string) || 'slider'
    const columns = (config.columns as number) || 2
    const showArrows = config.show_arrows !== false
    const showDots = !!config.show_dots
    const showQuote = !!config.show_quote_icon
    const avatarShape = (config.avatar_shape as string) || 'circle'
    const shadowLevel = (config.card_shadow as string) || 'none'

    const bg = theme === 'dark' ? '#1a1a1a' : '#ffffff'
    const text = theme === 'dark' ? '#ffffff' : '#1a1a1a'
    const subtext = theme === 'dark' ? '#aaaaaa' : '#666666'
    const cardBg = theme === 'dark' ? '#2a2a2a' : '#f9f9f9'

    const shadowMap: Record<string, string> = {
      none: 'none',
      small: '0 1px 4px rgba(0,0,0,.08)',
      medium: '0 4px 16px rgba(0,0,0,.1)',
      large: '0 8px 32px rgba(0,0,0,.14)',
    }
    const cardShadow = shadowMap[shadowLevel] || 'none'

    const avatarRadius = avatarShape === 'circle' ? '50%'
      : avatarShape === 'square' ? '4px' : '8px'

    const cards = testimonials.map((t) => {
      const rating = (t.rating as number) || 5
      const stars = showRating
        ? `<div class="stars">${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}</div>`
        : ''
      const avatarEl = t.avatar_url
        ? `<img src="${t.avatar_url as string}" class="avatar" alt="${t.author as string}" />`
        : `<div class="avatar-placeholder">${(t.author as string).charAt(0).toUpperCase()}</div>`
      return `
        <div class="card">
          ${showQuote ? '<div class="quote-icon">"</div>' : ''}
          ${stars}
          <p class="content">${t.content as string}</p>
          <div class="author-row">
            ${avatarEl}
            <div>
              <div class="author">${t.author as string}</div>
              <div class="role">${(t.role as string) || ''}</div>
            </div>
          </div>
        </div>
      `
    }).join('')

    const isGrid = layout === 'grid'
    const trackStyle = isGrid
      ? `display: grid; grid-template-columns: repeat(${columns}, 1fr); gap: 16px;`
      : `display: flex; gap: 16px; overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: none; -ms-overflow-style: none; padding-bottom: 8px;`

    shadow.innerHTML = `
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .wrap {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: ${bg};
          padding: 24px 16px;
          overflow: hidden;
          position: relative;
        }
        .track { ${trackStyle} }
        .track::-webkit-scrollbar { display: none; }
        .card {
          ${isGrid ? '' : 'flex: 0 0 280px; scroll-snap-align: start;'}
          background: ${cardBg};
          border-radius: 12px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          box-shadow: ${cardShadow};
        }
        .quote-icon {
          font-size: 48px;
          line-height: 1;
          color: #e5e7eb;
          font-family: Georgia, serif;
          margin-bottom: -8px;
        }
        .stars { color: #f59e0b; font-size: 16px; letter-spacing: 2px; }
        .content { color: ${text}; font-size: 14px; line-height: 1.6; flex: 1; }
        .author-row { display: flex; align-items: center; gap: 10px; }
        .avatar {
          width: 36px; height: 36px;
          border-radius: ${avatarRadius};
          object-fit: cover; flex-shrink: 0;
        }
        .avatar-placeholder {
          width: 36px; height: 36px;
          border-radius: ${avatarRadius};
          background: #ff6914;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 600;
          flex-shrink: 0;
        }
        .author { color: ${text}; font-size: 13px; font-weight: 600; }
        .role { color: ${subtext}; font-size: 12px; }
        ${!isGrid && showArrows ? `
        .arrows {
          display: flex;
          gap: 8px;
          justify-content: center;
          margin-top: 12px;
        }
        .arrow-btn {
          width: 32px; height: 32px;
          border-radius: 50%;
          border: 1px solid #e5e7eb;
          background: ${bg};
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          color: ${text};
          transition: background .2s;
        }
        .arrow-btn:hover { background: ${cardBg}; }` : ''}
        ${showDots ? `
        .dots {
          display: flex;
          gap: 6px;
          justify-content: center;
          margin-top: 12px;
        }
        .dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #e5e7eb;
          cursor: pointer;
          transition: background .2s;
        }
        .dot.active { background: #ff6914; }` : ''}
        .branding { text-align: center; margin-top: 12px; font-size: 10px; }
        .branding a { color: ${subtext}; text-decoration: none; opacity: 0.6; }
        .branding a:hover { opacity: 1; }
      </style>
      <div class="wrap">
        <div class="track" id="t-track">${cards}</div>
        ${!isGrid && showArrows ? `
        <div class="arrows">
          <button class="arrow-btn" id="t-prev">←</button>
          <button class="arrow-btn" id="t-next">→</button>
        </div>` : ''}
        ${showDots && testimonials.length > 0 ? `
        <div class="dots" id="t-dots">
          ${testimonials.map((_, i) => `<div class="dot${i === 0 ? ' active' : ''}" data-i="${i}"></div>`).join('')}
        </div>` : ''}
        ${showBranding ? `<div class="branding"><a href="${BRANDING_URL}" target="_blank" rel="noopener noreferrer">Powered by Devixus Widgets</a></div>` : ''}
      </div>
    `

    if (!isGrid) {
      const track = shadow.getElementById('t-track')
      const dotsContainer = showDots ? shadow.getElementById('t-dots') : null
      let currentIdx = 0

      function scrollTo(idx: number) {
        if (!track) return
        const cards = track.children
        if (!cards[idx]) return
        currentIdx = idx
        ;(cards[idx] as HTMLElement).scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' })
        if (dotsContainer) {
          dotsContainer.querySelectorAll('.dot').forEach((d, i) => {
            d.classList.toggle('active', i === currentIdx)
          })
        }
      }

      if (showArrows) {
        shadow.getElementById('t-prev')?.addEventListener('click', () => {
          scrollTo(Math.max(0, currentIdx - 1))
        })
        shadow.getElementById('t-next')?.addEventListener('click', () => {
          scrollTo(Math.min(testimonials.length - 1, currentIdx + 1))
        })
      }

      if (dotsContainer) {
        dotsContainer.querySelectorAll('.dot').forEach(dot => {
          dot.addEventListener('click', () => {
            scrollTo(parseInt((dot as HTMLElement).dataset.i ?? '0'))
          })
        })
      }
    }
  }

  // Render YouTube Feed widget
  function renderYouTubeFeed(
    shadow: ShadowRoot,
    config: Record<string, unknown>,
    showBranding: boolean,
    apiBase: string
  ) {
    const theme = (config.theme as string) || 'light'
    const bg = theme === 'dark' ? '#0f0f0f' : '#ffffff'
    const text = theme === 'dark' ? '#ffffff' : '#0f0f0f'
    const subtext = theme === 'dark' ? '#aaaaaa' : '#606060'
    const cardBg = theme === 'dark' ? '#1a1a1a' : '#f9f9f9'
    const accent = (config.accent_color as string) || '#ff0000'
    const columns = (config.columns as number) || 3
    const layout = (config.layout as string) || 'grid'
    const subscribeColor = (config.subscribe_button_color as string) || accent
    const headerStyle = (config.header_style as string) || 'full'
    const showSubscriberCount = config.show_subscriber_count !== false

    shadow.innerHTML = `
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .yt-wrap {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: ${bg};
          padding: 20px;
          color: ${text};
        }
        .yt-loading {
          text-align: center;
          padding: 40px;
          color: ${subtext};
          font-size: 14px;
        }
      </style>
      <div class="yt-wrap">
        <div class="yt-loading">Loading videos...</div>
      </div>
    `

    const channelId = config.channel_id as string
    const maxResults = (config.max_results as number) || 6
    const apiUrl = `${apiBase}/api/youtube?channel_id=${channelId}&max_results=${maxResults}`

    fetch(apiUrl)
      .then(r => r.json())
      .then(data => {
        if (!data.videos || data.videos.length === 0) {
          shadow.innerHTML = `
            <div style="padding:20px;text-align:center;
              color:${subtext};font-family:sans-serif;">
              No videos found
            </div>`
          return
        }

        const channel = data.channel
        const videos = data.videos

        const videoCards = videos.map((v: Record<string, string>) => `
          <a class="yt-card"
             href="${v.url}"
             target="_blank"
             rel="noopener noreferrer">
            <div class="yt-thumb">
              <img src="${v.thumbnail}"
                   alt="${v.title}"
                   loading="lazy" />
              <div class="yt-play">▶</div>
            </div>
            ${config.show_title !== false
              ? `<div class="yt-title">${v.title}</div>`
              : ''}
            ${config.show_date !== false
              ? `<div class="yt-meta">${new Date(v.published_at).toLocaleDateString()}</div>`
              : ''}
          </a>
        `).join('')

        const gridStyle = layout === 'grid'
          ? `grid-template-columns: repeat(${columns}, 1fr);`
          : layout === 'list'
          ? 'grid-template-columns: 1fr;'
          : 'grid-auto-flow: column; grid-auto-columns: 280px;'

        shadow.innerHTML = `
          <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            .yt-wrap {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              background: ${bg};
              padding: 20px;
              color: ${text};
            }
            .yt-header {
              display: flex;
              align-items: center;
              gap: 12px;
              margin-bottom: 20px;
              padding-bottom: 16px;
              border-bottom: 1px solid ${theme === 'dark' ? '#333' : '#eee'};
            }
            .yt-avatar {
              width: 48px;
              height: 48px;
              border-radius: 50%;
              object-fit: cover;
            }
            .yt-channel-name {
              font-size: 16px;
              font-weight: 600;
              color: ${text};
            }
            .yt-subs {
              font-size: 12px;
              color: ${subtext};
              margin-top: 2px;
            }
            .yt-subscribe {
              margin-left: auto;
              background: ${subscribeColor};
              color: white;
              border: none;
              padding: 8px 16px;
              border-radius: 20px;
              font-size: 13px;
              font-weight: 500;
              cursor: pointer;
              text-decoration: none;
              display: inline-block;
            }
            .yt-grid {
              display: grid;
              ${gridStyle}
              gap: 16px;
              ${layout === 'carousel'
                ? 'overflow-x: auto; scrollbar-width: none;'
                : ''}
            }
            .yt-grid::-webkit-scrollbar { display: none; }
            .yt-card {
              text-decoration: none;
              color: ${text};
              display: block;
              border-radius: 8px;
              overflow: hidden;
              background: ${cardBg};
              transition: transform 0.2s ease;
            }
            .yt-card:hover { transform: translateY(-2px); }
            .yt-thumb {
              position: relative;
              padding-top: 56.25%;
              overflow: hidden;
              background: #000;
            }
            .yt-thumb img {
              position: absolute;
              top: 0; left: 0;
              width: 100%; height: 100%;
              object-fit: cover;
            }
            .yt-play {
              position: absolute;
              top: 50%; left: 50%;
              transform: translate(-50%, -50%);
              background: rgba(0,0,0,0.7);
              color: white;
              width: 44px; height: 44px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 16px;
              opacity: 0;
              transition: opacity 0.2s;
            }
            .yt-card:hover .yt-play { opacity: 1; }
            .yt-title {
              font-size: 13px;
              font-weight: 500;
              padding: 10px 12px 4px;
              line-height: 1.4;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }
            .yt-meta {
              font-size: 11px;
              color: ${subtext};
              padding: 0 12px 10px;
            }
            .yt-branding {
              text-align: center;
              margin-top: 16px;
              font-size: 10px;
            }
            .yt-branding a {
              color: ${subtext};
              text-decoration: none;
              opacity: 0.6;
            }
          </style>
          <div class="yt-wrap">
            ${channel && headerStyle !== 'none' ? `
            <div class="yt-header">
              ${headerStyle === 'full' && channel.avatar
                ? `<img src="${channel.avatar}"
                         class="yt-avatar"
                         alt="${channel.name}" />`
                : ''}
              <div>
                <div class="yt-channel-name">${channel.name}</div>
                ${showSubscriberCount && channel.subscriber_count
                  ? `<div class="yt-subs">${channel.subscriber_count} subscribers</div>`
                  : ''}
              </div>
              <a href="https://youtube.com/channel/${channelId}"
                 class="yt-subscribe"
                 target="_blank"
                 rel="noopener noreferrer">
                Subscribe
              </a>
            </div>` : ''}
            <div class="yt-grid">${videoCards}</div>
            ${showBranding ? `
              <div class="yt-branding">
                <a href="${apiBase}"
                   target="_blank"
                   rel="noopener noreferrer">
                  Powered by Devixus Widgets
                </a>
              </div>` : ''}
          </div>
        `
      })
      .catch(() => {
        const loadingEl = shadow.querySelector('.yt-loading')
        if (loadingEl) loadingEl.textContent = 'Failed to load videos'
      })
  }

  // Render Google Reviews widget
  function renderGoogleReviews(
    shadow: ShadowRoot,
    config: any,
    showBranding: boolean,
    apiBase: string
  ) {
    const theme = config.theme || 'light'
    const bg = theme === 'dark' ? '#1a1a1a' : '#ffffff'
    const text = theme === 'dark' ? '#ffffff' : '#1a1a1a'
    const subtext = theme === 'dark' ? '#aaaaaa' : '#666666'
    const cardBg = theme === 'dark' ? '#2a2a2a' : '#f9f9f9'
    const accent = config.accent_color || '#4285f4'
    const layout = config.layout || 'grid'

    shadow.innerHTML = `
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .gr-wrap {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: ${bg};
          padding: 20px;
          color: ${text};
        }
        .gr-loading {
          text-align: center;
          padding: 40px;
          color: ${subtext};
          font-size: 14px;
        }
      </style>
      <div class="gr-wrap">
        <div class="gr-loading">Loading reviews...</div>
      </div>
    `

    if (!config.place_id) {
      const wrap = shadow.querySelector('.gr-wrap')
      if (wrap) {
        wrap.innerHTML = `<div class="gr-loading" style="color:${subtext}">No business configured</div>`
      }
      return
    }

    const maxReviews = config.max_reviews || 6
    const minRating = config.min_rating || 1
    const apiUrl =
      `${apiBase}/api/google-reviews?` +
      `place_id=${encodeURIComponent(config.place_id)}&` +
      `max_reviews=${maxReviews}&` +
      `min_rating=${minRating}`

    fetch(apiUrl)
      .then(r => r.json())
      .then(data => {
        if (!data.reviews || data.reviews.length === 0) {
          shadow.innerHTML = `
            <div style="padding:20px;text-align:center;
              color:${subtext};font-family:sans-serif;background:${bg};">
              No reviews found
            </div>`
          return
        }

        const place = data.place
        const reviews = data.reviews

        function renderStars(rating: number) {
          return Array.from({ length: 5 }, (_, i) =>
            `<span style="color:${i < rating ? '#fbbc04' : '#dadce0'}">★</span>`
          ).join('')
        }

        const reviewCards = reviews.map((r: any) => `
          <div class="gr-card">
            <div class="gr-card-header">
              ${config.show_reviewer_photo !== false && r.author_photo
                ? `<img src="${r.author_photo}" class="gr-avatar" alt="${r.author_name}" />`
                : `<div class="gr-avatar-placeholder">${r.author_name.charAt(0).toUpperCase()}</div>`
              }
              <div class="gr-author-info">
                <div class="gr-author">${r.author_name}</div>
                ${config.show_review_date !== false
                  ? `<div class="gr-date">${r.relative_time}</div>`
                  : ''}
              </div>
            </div>
            <div class="gr-stars">${renderStars(r.rating)}</div>
            ${r.text ? `<p class="gr-text">${r.text}</p>` : ''}
          </div>
        `).join('')

        const gridStyle = layout === 'grid'
          ? 'grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));'
          : layout === 'carousel'
          ? 'grid-auto-flow: column; grid-auto-columns: 300px; overflow-x: auto;'
          : 'grid-template-columns: 1fr;'

        shadow.innerHTML = `
          <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            .gr-wrap {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              background: ${bg};
              padding: 20px;
              color: ${text};
            }
            .gr-header {
              display: flex;
              align-items: flex-start;
              justify-content: space-between;
              margin-bottom: 20px;
              padding-bottom: 16px;
              border-bottom: 1px solid ${theme === 'dark' ? '#333' : '#eee'};
              flex-wrap: wrap;
              gap: 12px;
            }
            .gr-place-name {
              font-size: 18px;
              font-weight: 600;
              color: ${text};
              margin-bottom: 4px;
            }
            .gr-place-address { font-size: 12px; color: ${subtext}; }
            .gr-overall {
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 4px;
            }
            .gr-overall-score {
              font-size: 36px;
              font-weight: 700;
              color: ${text};
              line-height: 1;
            }
            .gr-overall-stars { font-size: 18px; }
            .gr-overall-count { font-size: 11px; color: ${subtext}; }
            .gr-write-link {
              display: inline-block;
              margin-top: 8px;
              font-size: 12px;
              color: ${accent};
              text-decoration: none;
            }
            .gr-google-badge {
              display: flex;
              align-items: center;
              gap: 6px;
              margin-top: 4px;
            }
            .gr-google-logo { font-size: 12px; font-weight: 700; color: ${accent}; }
            .gr-grid {
              display: grid;
              ${gridStyle}
              gap: 16px;
              scrollbar-width: none;
            }
            .gr-grid::-webkit-scrollbar { display: none; }
            .gr-card {
              background: ${cardBg};
              border-radius: 12px;
              padding: 16px;
              display: flex;
              flex-direction: column;
              gap: 10px;
            }
            .gr-card-header { display: flex; align-items: center; gap: 10px; }
            .gr-avatar {
              width: 40px; height: 40px;
              border-radius: 50%;
              object-fit: cover;
              flex-shrink: 0;
            }
            .gr-avatar-placeholder {
              width: 40px; height: 40px;
              border-radius: 50%;
              background: ${accent};
              color: white;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 16px;
              font-weight: 600;
              flex-shrink: 0;
            }
            .gr-author { font-size: 14px; font-weight: 500; color: ${text}; }
            .gr-date { font-size: 11px; color: ${subtext}; margin-top: 1px; }
            .gr-stars { font-size: 15px; letter-spacing: 1px; }
            .gr-text {
              font-size: 13px;
              color: ${subtext};
              line-height: 1.6;
              display: -webkit-box;
              -webkit-line-clamp: 4;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }
            .gr-branding { text-align: center; margin-top: 16px; font-size: 10px; }
            .gr-branding a { color: ${subtext}; text-decoration: none; opacity: 0.6; }
          </style>
          <div class="gr-wrap">
            ${config.show_header !== false && place ? `
            <div class="gr-header">
              <div>
                <div class="gr-place-name">${place.name}</div>
                <div class="gr-place-address">${place.address || ''}</div>
                ${config.write_review_link && place.google_url ? `
                  <a href="${place.google_url}"
                     class="gr-write-link"
                     target="_blank"
                     rel="noopener noreferrer">Write a review ↗</a>` : ''}
              </div>
              ${config.show_overall_rating !== false ? `
              <div class="gr-overall">
                <div class="gr-overall-score">${place.overall_rating}</div>
                <div class="gr-overall-stars">${renderStars(Math.round(place.overall_rating))}</div>
                <div class="gr-overall-count">${place.total_reviews} reviews</div>
                <div class="gr-google-badge">
                  <span class="gr-google-logo">G</span>
                  <span style="font-size:11px;color:${subtext}">Google Reviews</span>
                </div>
              </div>` : ''}
            </div>` : ''}
            <div class="gr-grid">${reviewCards}</div>
            ${showBranding ? `
              <div class="gr-branding">
                <a href="${apiBase}" target="_blank" rel="noopener noreferrer">
                  Powered by Devixus Widgets
                </a>
              </div>` : ''}
          </div>
        `
      })
      .catch(() => {
        const loadingEl = shadow.querySelector('.gr-loading')
        if (loadingEl) loadingEl.textContent = 'Failed to load reviews'
      })
  }

  // Render Countdown Timer widget
  function renderCountdownTimer(
    shadow: ShadowRoot,
    config: any,
    showBranding: boolean,
    apiBase: string
  ) {
    const theme = config.theme || 'light'
    const bgColor = config.bg_color ||
      (theme === 'dark' ? '#1a1a2e' : '#ffffff')
    const textColor = config.text_color ||
      (theme === 'dark' ? '#ffffff' : '#1a1a1a')
    const accentColor = config.accent_color || '#ff6914'
    const title = config.title || 'Offer ends in'
    const style = config.style || 'blocks'
    const fontFamily = config.font_family === 'mono'
      ? "'Courier New', monospace"
      : config.font_family === 'serif'
      ? "Georgia, 'Times New Roman', serif"
      : "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    const sepMap: Record<string, string> = { colon: ':', slash: '/', dot: '·', none: '' }
    const sepChar = sepMap[config.separator_style || 'colon'] ?? ':'
    const expireAction = config.expire_action || 'message'

    function getTimeLeft() {
      const target = new Date(
        config.target_date + 'T' + (config.target_time || '00:00')
      ).getTime()
      const now = Date.now()
      const diff = target - now

      if (diff <= 0) return null

      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      }
    }

    function pad(n: number) {
      return String(n).padStart(2, '0')
    }

    function render() {
      const time = getTimeLeft()

      if (!time) {
        if (expireAction === 'hide') {
          shadow.innerHTML = ''
          return
        }
        const msg = config.expired_message || 'This offer has ended'
        if (expireAction === 'redirect' && config.redirect_url) {
          window.location.href = config.redirect_url
        }
        if (expireAction === 'nothing') return
        shadow.innerHTML = `
          <style>
            .ct-wrap {
              font-family: ${fontFamily};
              background: ${bgColor};
              padding: 24px;
              text-align: center;
              color: ${textColor};
              border-radius: 8px;
            }
            .ct-expired { font-size: 18px; font-weight: 500; }
          </style>
          <div class="ct-wrap">
            <div class="ct-expired">${msg}</div>
          </div>
        `
        return
      }

      const units = []
      if (config.show_days !== false)
        units.push({ value: pad(time.days), label: 'Days' })
      if (config.show_hours !== false)
        units.push({ value: pad(time.hours), label: 'Hours' })
      if (config.show_minutes !== false)
        units.push({ value: pad(time.minutes), label: 'Minutes' })
      if (config.show_seconds !== false)
        units.push({ value: pad(time.seconds), label: 'Seconds' })

      const blockStyle = style === 'blocks' ? `
        .ct-unit {
          background: ${accentColor};
          border-radius: 8px;
          padding: 16px 20px;
          min-width: 72px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .ct-value {
          font-size: 36px;
          font-weight: 700;
          color: white;
          line-height: 1;
          font-variant-numeric: tabular-nums;
        }
        .ct-label {
          font-size: 11px;
          color: rgba(255,255,255,0.8);
          margin-top: 4px;
          text-transform: uppercase;
          letter-spacing: .05em;
        }
      ` : style === 'flip' ? `
        .ct-unit {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }
        .ct-value {
          font-size: 48px;
          font-weight: 800;
          color: ${accentColor};
          line-height: 1;
          font-variant-numeric: tabular-nums;
          background: ${bgColor};
          border: 2px solid ${accentColor};
          border-radius: 8px;
          padding: 8px 16px;
          min-width: 80px;
          text-align: center;
        }
        .ct-label {
          font-size: 11px;
          color: ${textColor};
          opacity: 0.6;
          text-transform: uppercase;
          letter-spacing: .05em;
        }
      ` : `
        .ct-unit {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }
        .ct-value {
          font-size: 42px;
          font-weight: 700;
          color: ${accentColor};
          line-height: 1;
          font-variant-numeric: tabular-nums;
        }
        .ct-label {
          font-size: 11px;
          color: ${textColor};
          opacity: 0.6;
          text-transform: uppercase;
          letter-spacing: .05em;
        }
      `

      const unitsHtml = units.map(u => `
        <div class="ct-unit">
          <div class="ct-value">${u.value}</div>
          ${config.show_labels !== false ? `<div class="ct-label">${u.label}</div>` : ''}
        </div>
      `).join(style === 'minimal' ? `<div class="ct-sep">${sepChar}</div>` : '')

      shadow.innerHTML = `
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          .ct-wrap {
            font-family: ${fontFamily};
            background: ${bgColor};
            padding: 24px 20px;
            border-radius: 8px;
            text-align: center;
            color: ${textColor};
          }
          .ct-title {
            font-size: 16px;
            font-weight: 500;
            margin-bottom: 16px;
            color: ${textColor};
          }
          .ct-units {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            flex-wrap: wrap;
          }
          ${blockStyle}
          .ct-sep {
            font-size: 36px;
            font-weight: 700;
            color: ${accentColor};
            margin-bottom: 16px;
          }
          .ct-branding {
            margin-top: 16px;
            font-size: 10px;
          }
          .ct-branding a {
            color: ${textColor};
            opacity: 0.4;
            text-decoration: none;
          }
        </style>
        <div class="ct-wrap">
          ${title ? `<div class="ct-title">${title}</div>` : ''}
          <div class="ct-units">${unitsHtml}</div>
          ${showBranding ? `
            <div class="ct-branding">
              <a href="${apiBase}" target="_blank" rel="noopener noreferrer">
                Powered by Devixus Widgets
              </a>
            </div>` : ''}
        </div>
      `
    }

    render()

    const interval = setInterval(() => {
      const time = getTimeLeft()
      if (!time) {
        clearInterval(interval)
        render()
        return
      }
      const values = shadow.querySelectorAll('.ct-value')
      const units2 = []
      if (config.show_days !== false) units2.push(pad(time.days))
      if (config.show_hours !== false) units2.push(pad(time.hours))
      if (config.show_minutes !== false) units2.push(pad(time.minutes))
      if (config.show_seconds !== false) units2.push(pad(time.seconds))
      values.forEach((el, i) => {
        if (units2[i]) el.textContent = units2[i]
      })
    }, 1000)
  }

  // Render Announcement Bar widget
  function renderAnnouncementBar(
    shadow: ShadowRoot,
    config: any,
    showBranding: boolean,
    apiBase: string
  ) {
    const message = config.message || '🎉 Welcome to our website!'
    const bgColor = config.bg_color || '#ff6914'
    const textColor = config.text_color || '#ffffff'
    const linkColor = config.link_color || '#ffffff'
    const position = config.position || 'top'
    const isSticky = config.is_sticky !== false
    const showClose = config.show_close_button !== false
    const emoji = config.show_emoji ? (config.emoji || '🎉') : ''
    const style = config.style || 'solid'

    let background = bgColor
    if (style === 'gradient') {
      background = `linear-gradient(135deg, ${bgColor}, ${bgColor}dd)`
    } else if (style === 'striped') {
      background = `repeating-linear-gradient(
        45deg,
        ${bgColor},
        ${bgColor} 10px,
        ${bgColor}ee 10px,
        ${bgColor}ee 20px
      )`
    }

    const positionStyle = isSticky
      ? `position: fixed; ${position}: 0; left: 0; right: 0; z-index: 999999;`
      : `position: relative;`

    shadow.innerHTML = `
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .ab-bar {
          ${positionStyle}
          background: ${background};
          color: ${textColor};
          padding: 10px 16px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          font-size: 14px;
          line-height: 1.4;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          min-height: 44px;
        }
        .ab-content {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .ab-message { color: ${textColor}; font-weight: 500; }
        .ab-link {
          color: ${linkColor};
          text-decoration: underline;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
        }
        .ab-link:hover { opacity: 0.85; }
        .ab-close {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: ${textColor};
          cursor: pointer;
          font-size: 18px;
          opacity: 0.7;
          padding: 4px;
          line-height: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 50%;
        }
        .ab-close:hover { opacity: 1; background: rgba(0,0,0,0.1); }
        .ab-branding {
          position: absolute;
          right: ${showClose ? '44px' : '12px'};
          top: 50%;
          transform: translateY(-50%);
          font-size: 9px;
        }
        .ab-branding a { color: ${textColor}; opacity: 0.4; text-decoration: none; }
      </style>
      <div class="ab-bar" id="ab-bar">
        <div class="ab-content">
          ${emoji ? `<span>${emoji}</span>` : ''}
          <span class="ab-message">${message}</span>
          ${config.link_text && config.link_url ? `
            <a class="ab-link"
               href="${config.link_url}"
               target="_blank"
               rel="noopener noreferrer">
              ${config.link_text} →
            </a>
          ` : ''}
        </div>
        ${showBranding ? `
          <div class="ab-branding">
            <a href="${apiBase}" target="_blank" rel="noopener noreferrer">Devixus</a>
          </div>` : ''}
        ${showClose ? `
          <button class="ab-close" id="ab-close" aria-label="Close">✕</button>
        ` : ''}
      </div>
    `

    if (showClose) {
      const closeBtn = shadow.getElementById('ab-close')
      const bar = shadow.getElementById('ab-bar')
      if (closeBtn && bar) {
        closeBtn.addEventListener('click', () => {
          bar.style.display = 'none'
        })
      }
    }
  }

  // Render upgrade overlay when monthly view limit is reached
  function renderUpgradeOverlay(
    shadow: ShadowRoot,
    widget: any,
    apiBase: string
  ) {
    const upgradeUrl = `${apiBase}/dashboard/billing`

    shadow.innerHTML = `
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .dv-overlay {
          font-family: -apple-system, BlinkMacSystemFont,
            'Segoe UI', sans-serif;
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          min-height: 120px;
          background: #f8f9fa;
          border: 2px dashed #dee2e6;
        }
        .dv-blur {
          filter: blur(6px);
          pointer-events: none;
          user-select: none;
          opacity: 0.4;
          padding: 20px;
          background: #f0f0f0;
          min-height: 120px;
          color: #ccc;
          font-size: 14px;
          line-height: 2;
          word-break: break-all;
        }
        .dv-message {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: white;
          border-radius: 12px;
          padding: 20px 24px;
          text-align: center;
          box-shadow: 0 4px 24px rgba(0,0,0,0.12);
          width: 90%;
          max-width: 320px;
          z-index: 10;
        }
        .dv-icon {
          font-size: 28px;
          margin-bottom: 8px;
        }
        .dv-title {
          font-size: 15px;
          font-weight: 600;
          color: #1a1a1a;
          margin-bottom: 6px;
        }
        .dv-subtitle {
          font-size: 12px;
          color: #666;
          margin-bottom: 16px;
          line-height: 1.5;
        }
        .dv-btn {
          display: inline-block;
          background: #ff6914;
          color: white;
          padding: 10px 20px;
          border-radius: 8px;
          text-decoration: none;
          font-size: 13px;
          font-weight: 600;
          transition: opacity 0.2s;
        }
        .dv-btn:hover { opacity: 0.9; }
        .dv-powered {
          margin-top: 10px;
          font-size: 10px;
          color: #999;
        }
        .dv-powered a {
          color: #999;
          text-decoration: none;
        }
      </style>
      <div class="dv-overlay">
        <div class="dv-blur">
          ████████████████████████████████
          ████████████████████████████████
          ██████████████████████
          ████████████████████████████████
        </div>
        <div class="dv-message">
          <div class="dv-icon">⚡</div>
          <div class="dv-title">
            Monthly view limit reached
          </div>
          <div class="dv-subtitle">
            This widget has used all its free views
            for this month. Upgrade to keep it running.
          </div>
          <a href="${upgradeUrl}"
             target="_blank"
             class="dv-btn">
            Upgrade plan →
          </a>
          <div class="dv-powered">
            <a href="${apiBase}" target="_blank">
              Powered by Devixus Widgets
            </a>
          </div>
        </div>
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

  // Render Contact Form widget
  function renderContactForm(
    shadow: ShadowRoot,
    config: any,
    showBranding: boolean,
    apiBase: string,
    widgetId: string
  ) {
    const theme = config.theme || 'light'
    const bg = theme === 'dark' ? '#1a1a1a' : '#ffffff'
    const text = theme === 'dark' ? '#ffffff' : '#1a1a1a'
    const subtext = theme === 'dark' ? '#aaaaaa' : '#666666'
    const inputBg = theme === 'dark' ? '#2a2a2a' : '#f9f9f9'
    const borderColor = theme === 'dark' ? '#333' : '#e5e7eb'
    const accent = config.accent_color || '#ff6914'
    const radius = config.border_radius || 8
    const isPopup = config.display_mode === 'popup'
    const title = config.title || 'Contact Us'
    const subtitle = config.subtitle || "Send us a message and we'll get back to you."
    const btnText = config.button_text || 'Send Message'
    const successMsg = config.success_message || "Thank you! We'll be in touch soon."

    const fields = config.fields || {
      name: true, email: true, phone: false,
      subject: false, message: true
    }
    const required = config.required_fields || {
      name: true, email: true, message: true
    }

    function buildForm(containerId: string) {
      return `
        <div class="cf-form-wrap" id="${containerId}">
          <div class="cf-header">
            <h3 class="cf-title">${title}</h3>
            ${subtitle ? `<p class="cf-subtitle">${subtitle}</p>` : ''}
          </div>
          <form class="cf-form" id="cf-form-${widgetId}">
            ${fields.name ? `
              <div class="cf-field">
                <label class="cf-label">
                  Name${required.name ? ' <span class="cf-req">*</span>' : ''}
                </label>
                <input type="text" name="name" class="cf-input"
                       placeholder="Your name"
                       ${required.name ? 'required' : ''} />
              </div>` : ''}
            ${fields.email ? `
              <div class="cf-field">
                <label class="cf-label">
                  Email${required.email ? ' <span class="cf-req">*</span>' : ''}
                </label>
                <input type="email" name="email" class="cf-input"
                       placeholder="your@email.com"
                       ${required.email ? 'required' : ''} />
              </div>` : ''}
            ${fields.phone ? `
              <div class="cf-field">
                <label class="cf-label">
                  Phone${required.phone ? ' <span class="cf-req">*</span>' : ''}
                </label>
                <input type="tel" name="phone" class="cf-input"
                       placeholder="+1 234 567 8900"
                       ${required.phone ? 'required' : ''} />
              </div>` : ''}
            ${fields.subject ? `
              <div class="cf-field">
                <label class="cf-label">Subject</label>
                <input type="text" name="subject" class="cf-input"
                       placeholder="What is this about?" />
              </div>` : ''}
            ${fields.message ? `
              <div class="cf-field">
                <label class="cf-label">
                  Message${required.message ? ' <span class="cf-req">*</span>' : ''}
                </label>
                <textarea name="message" class="cf-textarea"
                          placeholder="Your message..." rows="4"
                          ${required.message ? 'required' : ''}></textarea>
              </div>` : ''}
            <div class="cf-field" id="cf-error-${widgetId}" style="display:none">
              <p class="cf-error-msg"></p>
            </div>
            <button type="submit" class="cf-btn">${btnText}</button>
          </form>
          <div class="cf-success" id="cf-success-${widgetId}" style="display:none">
            <div class="cf-success-icon">✓</div>
            <p class="cf-success-msg">${successMsg}</p>
          </div>
          ${showBranding ? `
            <div class="cf-branding">
              <a href="${apiBase}" target="_blank" rel="noopener noreferrer">
                Powered by Devixus Widgets
              </a>
            </div>` : ''}
        </div>
      `
    }

    const formHtml = isPopup ? `
      <div>
        <button class="cf-trigger" id="cf-trigger">
          ${config.trigger_text || '✉ Contact Us'}
        </button>
        <div class="cf-popup-overlay" id="cf-popup" style="display:none">
          <div class="cf-popup-box">
            <button class="cf-popup-close" id="cf-popup-close">✕</button>
            ${buildForm('cf-popup-form')}
          </div>
        </div>
      </div>
    ` : buildForm('cf-inline-form')

    shadow.innerHTML = `
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .cf-trigger {
          background: ${accent};
          color: white;
          border: none;
          padding: 12px 20px;
          border-radius: ${radius}px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          font-family: -apple-system, sans-serif;
          transition: opacity .2s;
        }
        .cf-trigger:hover { opacity: .9; }
        .cf-popup-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          z-index: 999999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
        }
        .cf-popup-box {
          background: ${bg};
          border-radius: ${radius + 4}px;
          padding: 28px;
          width: 100%;
          max-width: 480px;
          position: relative;
          max-height: 90vh;
          overflow-y: auto;
        }
        .cf-popup-close {
          position: absolute;
          top: 12px;
          right: 12px;
          background: none;
          border: none;
          font-size: 18px;
          cursor: pointer;
          color: ${subtext};
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }
        .cf-popup-close:hover { background: ${inputBg}; }
        .cf-form-wrap {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: ${bg};
          padding: ${isPopup ? '0' : '24px'};
          border-radius: ${radius}px;
          color: ${text};
        }
        .cf-header { margin-bottom: 20px; }
        .cf-title {
          font-size: 20px;
          font-weight: 600;
          color: ${text};
          margin-bottom: 6px;
        }
        .cf-subtitle {
          font-size: 13px;
          color: ${subtext};
          line-height: 1.5;
        }
        .cf-form { display: flex; flex-direction: column; gap: 14px; }
        .cf-field { display: flex; flex-direction: column; gap: 5px; }
        .cf-label { font-size: 13px; font-weight: 500; color: ${text}; }
        .cf-req { color: #ef4444; }
        .cf-input, .cf-textarea {
          background: ${inputBg};
          border: 1px solid ${borderColor};
          border-radius: ${radius - 2}px;
          padding: 10px 12px;
          font-size: 14px;
          color: ${text};
          font-family: inherit;
          outline: none;
          transition: border-color .2s;
          width: 100%;
        }
        .cf-input:focus, .cf-textarea:focus { border-color: ${accent}; }
        .cf-textarea { resize: vertical; }
        .cf-btn {
          background: ${accent};
          color: white;
          border: none;
          padding: 12px 20px;
          border-radius: ${radius - 2}px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          font-family: inherit;
          transition: opacity .2s;
          margin-top: 4px;
        }
        .cf-btn:hover { opacity: .9; }
        .cf-btn:disabled { opacity: .6; cursor: not-allowed; }
        .cf-error-msg {
          font-size: 12px;
          color: #ef4444;
          padding: 8px 12px;
          background: #fee2e2;
          border-radius: 6px;
        }
        .cf-success { text-align: center; padding: 32px 16px; }
        .cf-success-icon {
          width: 48px;
          height: 48px;
          background: #dcfce7;
          color: #16a34a;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          font-weight: 700;
          margin: 0 auto 12px;
        }
        .cf-success-msg {
          font-size: 15px;
          color: ${text};
          font-family: -apple-system, sans-serif;
        }
        .cf-branding { text-align: center; margin-top: 16px; font-size: 10px; }
        .cf-branding a { color: ${subtext}; text-decoration: none; opacity: 0.6; }
      </style>
      ${formHtml}
    `

    if (isPopup) {
      const trigger = shadow.getElementById('cf-trigger')
      const popup = shadow.getElementById('cf-popup')
      const closeBtn = shadow.getElementById('cf-popup-close')
      trigger?.addEventListener('click', () => {
        if (popup) popup.style.display = 'flex'
      })
      closeBtn?.addEventListener('click', () => {
        if (popup) popup.style.display = 'none'
      })
      popup?.addEventListener('click', (e) => {
        if (e.target === popup) popup.style.display = 'none'
      })
    }

    const form = shadow.getElementById(`cf-form-${widgetId}`) as HTMLFormElement
    const successEl = shadow.getElementById(`cf-success-${widgetId}`)
    const errorEl = shadow.getElementById(`cf-error-${widgetId}`)

    form?.addEventListener('submit', async (e) => {
      e.preventDefault()
      const btn = form.querySelector('.cf-btn') as HTMLButtonElement
      if (btn) { btn.disabled = true; btn.textContent = 'Sending...' }

      const data = new FormData(form)
      try {
        const res = await fetch(`${apiBase}/api/contact-submit`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            widget_id: widgetId,
            name: data.get('name'),
            email: data.get('email'),
            phone: data.get('phone'),
            subject: data.get('subject'),
            message: data.get('message'),
          }),
        })
        if (res.ok) {
          form.style.display = 'none'
          if (successEl) successEl.style.display = 'block'
        } else {
          throw new Error('Failed')
        }
      } catch {
        if (btn) { btn.disabled = false; btn.textContent = btnText }
        const errEl = errorEl?.querySelector('.cf-error-msg')
        if (errEl) errEl.textContent = 'Failed to send. Please try again.'
        if (errorEl) errorEl.style.display = 'block'
      }
    })
  }

  // Render Social Follow widget
  function renderSocialFollow(
    shadow: ShadowRoot,
    config: any,
    showBranding: boolean,
    apiBase: string
  ) {
    const theme = config.theme || 'light'
    const style = config.style || 'filled'
    const size = config.size || 'medium'
    const layout = config.layout || 'horizontal'
    const showLabels = config.show_labels !== false
    const animation = config.animation || 'hover_grow'
    const radius = config.border_radius ?? 50

    const sizeMap: Record<string, { btn: string; icon: string; font: string }> = {
      small: { btn: '36px', icon: '18px', font: '12px' },
      medium: { btn: '44px', icon: '22px', font: '13px' },
      large: { btn: '56px', icon: '28px', font: '14px' },
    }
    const s = sizeMap[size] || sizeMap.medium

    const networks = config.networks || {}

    const networkConfig: Record<string, { label: string; color: string; icon: string }> = {
      facebook: { label: 'Facebook', color: '#1877F2', icon: 'f' },
      instagram: { label: 'Instagram', color: '#E4405F', icon: '📷' },
      twitter: { label: 'Twitter / X', color: '#000000', icon: 'X' },
      tiktok: { label: 'TikTok', color: '#000000', icon: '♪' },
      youtube: { label: 'YouTube', color: '#FF0000', icon: '▶' },
      linkedin: { label: 'LinkedIn', color: '#0A66C2', icon: 'in' },
      pinterest: { label: 'Pinterest', color: '#E60023', icon: 'P' },
      whatsapp: { label: 'WhatsApp', color: '#25D366', icon: '💬' },
    }

    const buttons = Object.entries(networks)
      .filter(([, url]) => url)
      .map(([network, url]) => {
        const nc = networkConfig[network]
        if (!nc) return ''
        const btnStyle = style === 'filled'
          ? `background: ${nc.color}; color: white; border: none;`
          : style === 'outline'
          ? `background: transparent; color: ${nc.color}; border: 2px solid ${nc.color};`
          : `background: transparent; color: ${nc.color}; border: none;`
        const label = config.label_type === 'follow_us'
          ? 'Follow us'
          : config.label_type === 'custom'
          ? (config.custom_label || nc.label)
          : nc.label
        return `
          <a href="${url}"
             target="_blank"
             rel="noopener noreferrer"
             class="sf-btn sf-${network}"
             aria-label="${nc.label}"
             style="${btnStyle}">
            <span class="sf-icon">${nc.icon}</span>
            ${showLabels ? `<span class="sf-label">${label}</span>` : ''}
          </a>
        `
      }).join('')

    const layoutStyle = layout === 'horizontal'
      ? 'flex-direction: row; flex-wrap: wrap;'
      : layout === 'vertical'
      ? 'flex-direction: column;'
      : 'display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));'

    const animStyle = animation === 'hover_grow'
      ? '.sf-btn:hover { transform: scale(1.08); }'
      : animation === 'hover_bounce'
      ? `.sf-btn:hover { animation: sfbounce .3s ease; }
         @keyframes sfbounce {
           0%,100% { transform: translateY(0); }
           50% { transform: translateY(-4px); }
         }`
      : ''

    shadow.innerHTML = `
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .sf-wrap {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: transparent;
          padding: 12px;
          display: flex;
          ${layoutStyle}
          gap: 10px;
          align-items: center;
        }
        .sf-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          height: ${s.btn};
          padding: 0 ${showLabels ? '14px' : '0'};
          ${!showLabels ? `width: ${s.btn};` : ''}
          justify-content: center;
          border-radius: ${radius}px;
          text-decoration: none;
          font-size: ${s.font};
          font-weight: 600;
          cursor: pointer;
          transition: transform .2s, opacity .2s;
          white-space: nowrap;
        }
        .sf-btn:hover { opacity: .9; }
        .sf-icon { font-size: ${s.icon}; line-height: 1; font-style: normal; }
        .sf-label { font-size: ${s.font}; }
        ${animStyle}
        .sf-branding { width: 100%; text-align: center; margin-top: 8px; font-size: 10px; }
        .sf-branding a { color: #999; text-decoration: none; opacity: 0.6; }
      </style>
      <div class="sf-wrap">
        ${buttons}
        ${showBranding ? `
          <div class="sf-branding">
            <a href="${apiBase}" target="_blank" rel="noopener noreferrer">
              Powered by Devixus Widgets
            </a>
          </div>` : ''}
      </div>
    `
  }

  // Main render router
  function renderWidget(shadow: ShadowRoot, widget: { type: string; config: Record<string, unknown>; show_branding: boolean }, widgetId: string) {
    switch (widget.type) {
      case 'whatsapp':
        renderWhatsApp(shadow, widget.config, widget.show_branding)
        break
      case 'testimonials':
        renderTestimonials(shadow, widget.config, widget.show_branding)
        break
      case 'youtube_feed':
        renderYouTubeFeed(shadow, widget.config, widget.show_branding, API_BASE)
        break
      case 'google_reviews':
        renderGoogleReviews(shadow, widget.config, widget.show_branding, API_BASE)
        break
      case 'countdown_timer':
        renderCountdownTimer(shadow, widget.config, widget.show_branding, API_BASE)
        break
      case 'announcement_bar':
        renderAnnouncementBar(shadow, widget.config, widget.show_branding, API_BASE)
        break
      case 'contact_form':
        renderContactForm(shadow, widget.config, widget.show_branding, API_BASE, widgetId)
        break
      case 'social_follow':
        renderSocialFollow(shadow, widget.config, widget.show_branding, API_BASE)
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

      if (widget.limit_reached) {
        const shadow = createContainer(targetEl)
        renderUpgradeOverlay(shadow, widget, API_BASE)
        return
      }

      const shadow = createContainer(targetEl)
      renderWidget(shadow, widget, widgetId)
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

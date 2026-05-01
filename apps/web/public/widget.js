"use strict";(()=>{(function(){"use strict";let _="https://devixus-widgets-web.vercel.app",C="https://devixus-widgets-marketing.vercel.app";function B(){if(document.currentScript)return document.currentScript;let t=document.getElementsByTagName("script");return t[t.length-1]}async function F(t){let e=await fetch(`${_}/api/widget/${t}`,{method:"GET",headers:{"Content-Type":"application/json"}});if(!e.ok)throw new Error(`Widget not found: ${t}`);return e.json()}function L(t){let e=document.createElement("div");return e.setAttribute("data-devixus-widget","true"),e.style.cssText="all: initial; display: block;",t.appendChild(e),e.attachShadow({mode:"open"})}function H(t,e,p){let d=e.phone_number||"",r=encodeURIComponent(e.welcome_message||"Hello!"),s=e.button_color||"#25D366",i=e.position||"bottom-right",n=i==="bottom-right"?"bottom: 24px; right: 24px;":"bottom: 24px; left: 24px;",b=i==="bottom-right"?"flex-end":"flex-start";t.innerHTML=`
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .wa-btn {
          position: fixed;
          ${n}
          z-index: 9999;
          display: flex;
          flex-direction: column;
          align-items: ${b};
          gap: 6px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        .wa-bubble {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: ${s};
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
           href="https://wa.me/${d}?text=${r}"
           target="_blank"
           rel="noopener noreferrer"
           aria-label="Chat on WhatsApp">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>
        ${p?`<a class="wa-branding" href="${C}" target="_blank" rel="noopener noreferrer">Powered by Devixus</a>`:""}
      </div>
    `}function U(t,e,p){let d=e.testimonials||[],r=e.theme||"light",s=e.show_rating!==!1,i=r==="dark"?"#1a1a1a":"#ffffff",n=r==="dark"?"#ffffff":"#1a1a1a",b=r==="dark"?"#aaaaaa":"#666666",x=r==="dark"?"#2a2a2a":"#f9f9f9",m=d.map(l=>{let f=l.rating||5,h=s?`<div class="stars">${"\u2605".repeat(f)}${"\u2606".repeat(5-f)}</div>`:"",o=l.avatar_url?`<img src="${l.avatar_url}" class="avatar" alt="${l.author}" />`:"";return`
        <div class="card">
          ${h}
          <p class="content">"${l.content}"</p>
          <div class="author-row">
            ${o}
            <div>
              <div class="author">${l.author}</div>
              <div class="role">${l.role||""}</div>
            </div>
          </div>
        </div>
      `}).join("");t.innerHTML=`
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .wrap {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: ${i};
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
          background: ${x};
          border-radius: 12px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .stars { color: #f59e0b; font-size: 16px; letter-spacing: 2px; }
        .content {
          color: ${n};
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
          color: ${n};
          font-size: 13px;
          font-weight: 600;
        }
        .role {
          color: ${b};
          font-size: 12px;
        }
        .branding {
          text-align: center;
          margin-top: 12px;
          font-size: 10px;
        }
        .branding a {
          color: ${b};
          text-decoration: none;
          opacity: 0.6;
        }
        .branding a:hover { opacity: 1; }
      </style>
      <div class="wrap">
        <div class="track">${m}</div>
        ${p?`<div class="branding"><a href="${C}" target="_blank" rel="noopener noreferrer">Powered by Devixus Widgets</a></div>`:""}
      </div>
    `}function D(t,e,p,d){let r=e.theme||"light",s=r==="dark"?"#0f0f0f":"#ffffff",i=r==="dark"?"#ffffff":"#0f0f0f",n=r==="dark"?"#aaaaaa":"#606060",b=r==="dark"?"#1a1a1a":"#f9f9f9",x=e.accent_color||"#ff0000",m=e.columns||3,l=e.layout||"grid";t.innerHTML=`
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .yt-wrap {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: ${s};
          padding: 20px;
          color: ${i};
        }
        .yt-loading {
          text-align: center;
          padding: 40px;
          color: ${n};
          font-size: 14px;
        }
      </style>
      <div class="yt-wrap">
        <div class="yt-loading">Loading videos...</div>
      </div>
    `;let f=e.channel_id,h=e.max_results||6,o=`${d}/api/youtube?channel_id=${f}&max_results=${h}`;fetch(o).then(a=>a.json()).then(a=>{if(!a.videos||a.videos.length===0){t.innerHTML=`
            <div style="padding:20px;text-align:center;
              color:${n};font-family:sans-serif;">
              No videos found
            </div>`;return}let c=a.channel,u=a.videos.map(g=>`
          <a class="yt-card"
             href="${g.url}"
             target="_blank"
             rel="noopener noreferrer">
            <div class="yt-thumb">
              <img src="${g.thumbnail}"
                   alt="${g.title}"
                   loading="lazy" />
              <div class="yt-play">\u25B6</div>
            </div>
            ${e.show_title!==!1?`<div class="yt-title">${g.title}</div>`:""}
            ${e.show_date!==!1?`<div class="yt-meta">${new Date(g.published_at).toLocaleDateString()}</div>`:""}
          </a>
        `).join(""),v=l==="grid"?`grid-template-columns: repeat(${m}, 1fr);`:l==="list"?"grid-template-columns: 1fr;":"grid-auto-flow: column; grid-auto-columns: 280px;";t.innerHTML=`
          <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            .yt-wrap {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              background: ${s};
              padding: 20px;
              color: ${i};
            }
            .yt-header {
              display: flex;
              align-items: center;
              gap: 12px;
              margin-bottom: 20px;
              padding-bottom: 16px;
              border-bottom: 1px solid ${r==="dark"?"#333":"#eee"};
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
              color: ${i};
            }
            .yt-subs {
              font-size: 12px;
              color: ${n};
              margin-top: 2px;
            }
            .yt-subscribe {
              margin-left: auto;
              background: ${x};
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
              ${v}
              gap: 16px;
              ${l==="carousel"?"overflow-x: auto; scrollbar-width: none;":""}
            }
            .yt-grid::-webkit-scrollbar { display: none; }
            .yt-card {
              text-decoration: none;
              color: ${i};
              display: block;
              border-radius: 8px;
              overflow: hidden;
              background: ${b};
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
              color: ${n};
              padding: 0 12px 10px;
            }
            .yt-branding {
              text-align: center;
              margin-top: 16px;
              font-size: 10px;
            }
            .yt-branding a {
              color: ${n};
              text-decoration: none;
              opacity: 0.6;
            }
          </style>
          <div class="yt-wrap">
            ${c?`
            <div class="yt-header">
              ${c.avatar?`<img src="${c.avatar}"
                         class="yt-avatar"
                         alt="${c.name}" />`:""}
              <div>
                <div class="yt-channel-name">${c.name}</div>
                ${c.subscriber_count?`<div class="yt-subs">${c.subscriber_count} subscribers</div>`:""}
              </div>
              <a href="https://youtube.com/channel/${f}"
                 class="yt-subscribe"
                 target="_blank"
                 rel="noopener noreferrer">
                Subscribe
              </a>
            </div>`:""}
            <div class="yt-grid">${u}</div>
            ${p?`
              <div class="yt-branding">
                <a href="${d}"
                   target="_blank"
                   rel="noopener noreferrer">
                  Powered by Devixus Widgets
                </a>
              </div>`:""}
          </div>
        `}).catch(()=>{let a=t.querySelector(".yt-loading");a&&(a.textContent="Failed to load videos")})}function I(t,e,p,d){let r=e.theme||"light",s=r==="dark"?"#1a1a1a":"#ffffff",i=r==="dark"?"#ffffff":"#1a1a1a",n=r==="dark"?"#aaaaaa":"#666666",b=r==="dark"?"#2a2a2a":"#f9f9f9",x=e.accent_color||"#4285f4",m=e.layout||"grid";if(t.innerHTML=`
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .gr-wrap {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: ${s};
          padding: 20px;
          color: ${i};
        }
        .gr-loading {
          text-align: center;
          padding: 40px;
          color: ${n};
          font-size: 14px;
        }
      </style>
      <div class="gr-wrap">
        <div class="gr-loading">Loading reviews...</div>
      </div>
    `,!e.place_id){let o=t.querySelector(".gr-wrap");o&&(o.innerHTML=`<div class="gr-loading" style="color:${n}">No business configured</div>`);return}let l=e.max_reviews||6,f=e.min_rating||1,h=`${d}/api/google-reviews?place_id=${encodeURIComponent(e.place_id)}&max_reviews=${l}&min_rating=${f}`;fetch(h).then(o=>o.json()).then(o=>{if(!o.reviews||o.reviews.length===0){t.innerHTML=`
            <div style="padding:20px;text-align:center;
              color:${n};font-family:sans-serif;background:${s};">
              No reviews found
            </div>`;return}let a=o.place,c=o.reviews;function w(g){return Array.from({length:5},($,k)=>`<span style="color:${k<g?"#fbbc04":"#dadce0"}">\u2605</span>`).join("")}let u=c.map(g=>`
          <div class="gr-card">
            <div class="gr-card-header">
              ${e.show_reviewer_photo!==!1&&g.author_photo?`<img src="${g.author_photo}" class="gr-avatar" alt="${g.author_name}" />`:`<div class="gr-avatar-placeholder">${g.author_name.charAt(0).toUpperCase()}</div>`}
              <div class="gr-author-info">
                <div class="gr-author">${g.author_name}</div>
                ${e.show_review_date!==!1?`<div class="gr-date">${g.relative_time}</div>`:""}
              </div>
            </div>
            <div class="gr-stars">${w(g.rating)}</div>
            ${g.text?`<p class="gr-text">${g.text}</p>`:""}
          </div>
        `).join(""),v=m==="grid"?"grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));":m==="carousel"?"grid-auto-flow: column; grid-auto-columns: 300px; overflow-x: auto;":"grid-template-columns: 1fr;";t.innerHTML=`
          <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            .gr-wrap {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              background: ${s};
              padding: 20px;
              color: ${i};
            }
            .gr-header {
              display: flex;
              align-items: flex-start;
              justify-content: space-between;
              margin-bottom: 20px;
              padding-bottom: 16px;
              border-bottom: 1px solid ${r==="dark"?"#333":"#eee"};
              flex-wrap: wrap;
              gap: 12px;
            }
            .gr-place-name {
              font-size: 18px;
              font-weight: 600;
              color: ${i};
              margin-bottom: 4px;
            }
            .gr-place-address { font-size: 12px; color: ${n}; }
            .gr-overall {
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 4px;
            }
            .gr-overall-score {
              font-size: 36px;
              font-weight: 700;
              color: ${i};
              line-height: 1;
            }
            .gr-overall-stars { font-size: 18px; }
            .gr-overall-count { font-size: 11px; color: ${n}; }
            .gr-write-link {
              display: inline-block;
              margin-top: 8px;
              font-size: 12px;
              color: ${x};
              text-decoration: none;
            }
            .gr-google-badge {
              display: flex;
              align-items: center;
              gap: 6px;
              margin-top: 4px;
            }
            .gr-google-logo { font-size: 12px; font-weight: 700; color: ${x}; }
            .gr-grid {
              display: grid;
              ${v}
              gap: 16px;
              scrollbar-width: none;
            }
            .gr-grid::-webkit-scrollbar { display: none; }
            .gr-card {
              background: ${b};
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
              background: ${x};
              color: white;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 16px;
              font-weight: 600;
              flex-shrink: 0;
            }
            .gr-author { font-size: 14px; font-weight: 500; color: ${i}; }
            .gr-date { font-size: 11px; color: ${n}; margin-top: 1px; }
            .gr-stars { font-size: 15px; letter-spacing: 1px; }
            .gr-text {
              font-size: 13px;
              color: ${n};
              line-height: 1.6;
              display: -webkit-box;
              -webkit-line-clamp: 4;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }
            .gr-branding { text-align: center; margin-top: 16px; font-size: 10px; }
            .gr-branding a { color: ${n}; text-decoration: none; opacity: 0.6; }
          </style>
          <div class="gr-wrap">
            ${e.show_header!==!1&&a?`
            <div class="gr-header">
              <div>
                <div class="gr-place-name">${a.name}</div>
                <div class="gr-place-address">${a.address||""}</div>
                ${e.write_review_link&&a.google_url?`
                  <a href="${a.google_url}"
                     class="gr-write-link"
                     target="_blank"
                     rel="noopener noreferrer">Write a review \u2197</a>`:""}
              </div>
              ${e.show_overall_rating!==!1?`
              <div class="gr-overall">
                <div class="gr-overall-score">${a.overall_rating}</div>
                <div class="gr-overall-stars">${w(Math.round(a.overall_rating))}</div>
                <div class="gr-overall-count">${a.total_reviews} reviews</div>
                <div class="gr-google-badge">
                  <span class="gr-google-logo">G</span>
                  <span style="font-size:11px;color:${n}">Google Reviews</span>
                </div>
              </div>`:""}
            </div>`:""}
            <div class="gr-grid">${u}</div>
            ${p?`
              <div class="gr-branding">
                <a href="${d}" target="_blank" rel="noopener noreferrer">
                  Powered by Devixus Widgets
                </a>
              </div>`:""}
          </div>
        `}).catch(()=>{let o=t.querySelector(".gr-loading");o&&(o.textContent="Failed to load reviews")})}function q(t,e,p,d){let r=e.theme||"light",s=e.bg_color||(r==="dark"?"#1a1a2e":"#ffffff"),i=e.text_color||(r==="dark"?"#ffffff":"#1a1a1a"),n=e.accent_color||"#ff6914",b=e.title||"Offer ends in",x=e.style||"blocks";function m(){let o=new Date(e.target_date+"T"+(e.target_time||"00:00")).getTime(),a=Date.now(),c=o-a;return c<=0?null:{days:Math.floor(c/(1e3*60*60*24)),hours:Math.floor(c%(1e3*60*60*24)/(1e3*60*60)),minutes:Math.floor(c%(1e3*60*60)/(1e3*60)),seconds:Math.floor(c%(1e3*60)/1e3)}}function l(o){return String(o).padStart(2,"0")}function f(){let o=m();if(!o){let u=e.expired_message||"This offer has ended";e.redirect_url&&(window.location.href=e.redirect_url),t.innerHTML=`
          <style>
            .ct-wrap {
              font-family: -apple-system, sans-serif;
              background: ${s};
              padding: 24px;
              text-align: center;
              color: ${i};
              border-radius: 8px;
            }
            .ct-expired { font-size: 18px; font-weight: 500; }
          </style>
          <div class="ct-wrap">
            <div class="ct-expired">${u}</div>
          </div>
        `;return}let a=[];e.show_days!==!1&&a.push({value:l(o.days),label:"Days"}),e.show_hours!==!1&&a.push({value:l(o.hours),label:"Hours"}),e.show_minutes!==!1&&a.push({value:l(o.minutes),label:"Minutes"}),e.show_seconds!==!1&&a.push({value:l(o.seconds),label:"Seconds"});let c=x==="blocks"?`
        .ct-unit {
          background: ${n};
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
      `:x==="flip"?`
        .ct-unit {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }
        .ct-value {
          font-size: 48px;
          font-weight: 800;
          color: ${n};
          line-height: 1;
          font-variant-numeric: tabular-nums;
          background: ${s};
          border: 2px solid ${n};
          border-radius: 8px;
          padding: 8px 16px;
          min-width: 80px;
          text-align: center;
        }
        .ct-label {
          font-size: 11px;
          color: ${i};
          opacity: 0.6;
          text-transform: uppercase;
          letter-spacing: .05em;
        }
      `:`
        .ct-unit {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }
        .ct-value {
          font-size: 42px;
          font-weight: 700;
          color: ${n};
          line-height: 1;
          font-variant-numeric: tabular-nums;
        }
        .ct-label {
          font-size: 11px;
          color: ${i};
          opacity: 0.6;
          text-transform: uppercase;
          letter-spacing: .05em;
        }
      `,w=a.map(u=>`
        <div class="ct-unit">
          <div class="ct-value">${u.value}</div>
          ${e.show_labels!==!1?`<div class="ct-label">${u.label}</div>`:""}
        </div>
      `).join(x==="minimal"?'<div class="ct-sep">:</div>':"");t.innerHTML=`
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          .ct-wrap {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: ${s};
            padding: 24px 20px;
            border-radius: 8px;
            text-align: center;
            color: ${i};
          }
          .ct-title {
            font-size: 16px;
            font-weight: 500;
            margin-bottom: 16px;
            color: ${i};
          }
          .ct-units {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            flex-wrap: wrap;
          }
          ${c}
          .ct-sep {
            font-size: 36px;
            font-weight: 700;
            color: ${n};
            margin-bottom: 16px;
          }
          .ct-branding {
            margin-top: 16px;
            font-size: 10px;
          }
          .ct-branding a {
            color: ${i};
            opacity: 0.4;
            text-decoration: none;
          }
        </style>
        <div class="ct-wrap">
          ${b?`<div class="ct-title">${b}</div>`:""}
          <div class="ct-units">${w}</div>
          ${p?`
            <div class="ct-branding">
              <a href="${d}" target="_blank" rel="noopener noreferrer">
                Powered by Devixus Widgets
              </a>
            </div>`:""}
        </div>
      `}f();let h=setInterval(()=>{let o=m();if(!o){clearInterval(h),f();return}let a=t.querySelectorAll(".ct-value"),c=[];e.show_days!==!1&&c.push(l(o.days)),e.show_hours!==!1&&c.push(l(o.hours)),e.show_minutes!==!1&&c.push(l(o.minutes)),e.show_seconds!==!1&&c.push(l(o.seconds)),a.forEach((w,u)=>{c[u]&&(w.textContent=c[u])})},1e3)}function W(t,e,p,d){let r=e.message||"\u{1F389} Welcome to our website!",s=e.bg_color||"#ff6914",i=e.text_color||"#ffffff",n=e.link_color||"#ffffff",b=e.position||"top",x=e.is_sticky!==!1,m=e.show_close_button!==!1,l=e.show_emoji?e.emoji||"\u{1F389}":"",f=e.style||"solid",h=s;f==="gradient"?h=`linear-gradient(135deg, ${s}, ${s}dd)`:f==="striped"&&(h=`repeating-linear-gradient(
        45deg,
        ${s},
        ${s} 10px,
        ${s}ee 10px,
        ${s}ee 20px
      )`);let o=x?`position: fixed; ${b}: 0; left: 0; right: 0; z-index: 999999;`:"position: relative;";if(t.innerHTML=`
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .ab-bar {
          ${o}
          background: ${h};
          color: ${i};
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
        .ab-message { color: ${i}; font-weight: 500; }
        .ab-link {
          color: ${n};
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
          color: ${i};
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
          right: ${m?"44px":"12px"};
          top: 50%;
          transform: translateY(-50%);
          font-size: 9px;
        }
        .ab-branding a { color: ${i}; opacity: 0.4; text-decoration: none; }
      </style>
      <div class="ab-bar" id="ab-bar">
        <div class="ab-content">
          ${l?`<span>${l}</span>`:""}
          <span class="ab-message">${r}</span>
          ${e.link_text&&e.link_url?`
            <a class="ab-link"
               href="${e.link_url}"
               target="_blank"
               rel="noopener noreferrer">
              ${e.link_text} \u2192
            </a>
          `:""}
        </div>
        ${p?`
          <div class="ab-branding">
            <a href="${d}" target="_blank" rel="noopener noreferrer">Devixus</a>
          </div>`:""}
        ${m?`
          <button class="ab-close" id="ab-close" aria-label="Close">\u2715</button>
        `:""}
      </div>
    `,m){let a=t.getElementById("ab-close"),c=t.getElementById("ab-bar");a&&c&&a.addEventListener("click",()=>{c.style.display="none"})}}function A(t,e,p){let d=`${p}/dashboard/billing`;t.innerHTML=`
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
          \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588
          \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588
          \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588
          \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588
        </div>
        <div class="dv-message">
          <div class="dv-icon">\u26A1</div>
          <div class="dv-title">
            Monthly view limit reached
          </div>
          <div class="dv-subtitle">
            This widget has used all its free views
            for this month. Upgrade to keep it running.
          </div>
          <a href="${d}"
             target="_blank"
             class="dv-btn">
            Upgrade plan \u2192
          </a>
          <div class="dv-powered">
            <a href="${p}" target="_blank">
              Powered by Devixus Widgets
            </a>
          </div>
        </div>
      </div>
    `}function P(t,e){try{let p=window.location.hostname,d=JSON.stringify({widget_id:t,domain:p,event_type:"load"});navigator.sendBeacon?navigator.sendBeacon(`${e}/api/track`,new Blob([d],{type:"application/json"})):fetch(`${e}/api/track`,{method:"POST",body:d,headers:{"Content-Type":"application/json"},keepalive:!0}).catch(()=>{})}catch(p){}}function N(t,e,p,d,r){let s=e.theme||"light",i=s==="dark"?"#1a1a1a":"#ffffff",n=s==="dark"?"#ffffff":"#1a1a1a",b=s==="dark"?"#aaaaaa":"#666666",x=s==="dark"?"#2a2a2a":"#f9f9f9",m=s==="dark"?"#333":"#e5e7eb",l=e.accent_color||"#ff6914",f=e.border_radius||8,h=e.display_mode==="popup",o=e.title||"Contact Us",a=e.subtitle||"Send us a message and we'll get back to you.",c=e.button_text||"Send Message",w=e.success_message||"Thank you! We'll be in touch soon.",u=e.fields||{name:!0,email:!0,phone:!1,subject:!1,message:!0},v=e.required_fields||{name:!0,email:!0,message:!0};function g(S){return`
        <div class="cf-form-wrap" id="${S}">
          <div class="cf-header">
            <h3 class="cf-title">${o}</h3>
            ${a?`<p class="cf-subtitle">${a}</p>`:""}
          </div>
          <form class="cf-form" id="cf-form-${r}">
            ${u.name?`
              <div class="cf-field">
                <label class="cf-label">
                  Name${v.name?' <span class="cf-req">*</span>':""}
                </label>
                <input type="text" name="name" class="cf-input"
                       placeholder="Your name"
                       ${v.name?"required":""} />
              </div>`:""}
            ${u.email?`
              <div class="cf-field">
                <label class="cf-label">
                  Email${v.email?' <span class="cf-req">*</span>':""}
                </label>
                <input type="email" name="email" class="cf-input"
                       placeholder="your@email.com"
                       ${v.email?"required":""} />
              </div>`:""}
            ${u.phone?`
              <div class="cf-field">
                <label class="cf-label">
                  Phone${v.phone?' <span class="cf-req">*</span>':""}
                </label>
                <input type="tel" name="phone" class="cf-input"
                       placeholder="+1 234 567 8900"
                       ${v.phone?"required":""} />
              </div>`:""}
            ${u.subject?`
              <div class="cf-field">
                <label class="cf-label">Subject</label>
                <input type="text" name="subject" class="cf-input"
                       placeholder="What is this about?" />
              </div>`:""}
            ${u.message?`
              <div class="cf-field">
                <label class="cf-label">
                  Message${v.message?' <span class="cf-req">*</span>':""}
                </label>
                <textarea name="message" class="cf-textarea"
                          placeholder="Your message..." rows="4"
                          ${v.message?"required":""}></textarea>
              </div>`:""}
            <div class="cf-field" id="cf-error-${r}" style="display:none">
              <p class="cf-error-msg"></p>
            </div>
            <button type="submit" class="cf-btn">${c}</button>
          </form>
          <div class="cf-success" id="cf-success-${r}" style="display:none">
            <div class="cf-success-icon">\u2713</div>
            <p class="cf-success-msg">${w}</p>
          </div>
          ${p?`
            <div class="cf-branding">
              <a href="${d}" target="_blank" rel="noopener noreferrer">
                Powered by Devixus Widgets
              </a>
            </div>`:""}
        </div>
      `}let $=h?`
      <div>
        <button class="cf-trigger" id="cf-trigger">
          ${e.trigger_text||"\u2709 Contact Us"}
        </button>
        <div class="cf-popup-overlay" id="cf-popup" style="display:none">
          <div class="cf-popup-box">
            <button class="cf-popup-close" id="cf-popup-close">\u2715</button>
            ${g("cf-popup-form")}
          </div>
        </div>
      </div>
    `:g("cf-inline-form");if(t.innerHTML=`
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .cf-trigger {
          background: ${l};
          color: white;
          border: none;
          padding: 12px 20px;
          border-radius: ${f}px;
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
          background: ${i};
          border-radius: ${f+4}px;
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
          color: ${b};
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }
        .cf-popup-close:hover { background: ${x}; }
        .cf-form-wrap {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: ${i};
          padding: ${h?"0":"24px"};
          border-radius: ${f}px;
          color: ${n};
        }
        .cf-header { margin-bottom: 20px; }
        .cf-title {
          font-size: 20px;
          font-weight: 600;
          color: ${n};
          margin-bottom: 6px;
        }
        .cf-subtitle {
          font-size: 13px;
          color: ${b};
          line-height: 1.5;
        }
        .cf-form { display: flex; flex-direction: column; gap: 14px; }
        .cf-field { display: flex; flex-direction: column; gap: 5px; }
        .cf-label { font-size: 13px; font-weight: 500; color: ${n}; }
        .cf-req { color: #ef4444; }
        .cf-input, .cf-textarea {
          background: ${x};
          border: 1px solid ${m};
          border-radius: ${f-2}px;
          padding: 10px 12px;
          font-size: 14px;
          color: ${n};
          font-family: inherit;
          outline: none;
          transition: border-color .2s;
          width: 100%;
        }
        .cf-input:focus, .cf-textarea:focus { border-color: ${l}; }
        .cf-textarea { resize: vertical; }
        .cf-btn {
          background: ${l};
          color: white;
          border: none;
          padding: 12px 20px;
          border-radius: ${f-2}px;
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
          color: ${n};
          font-family: -apple-system, sans-serif;
        }
        .cf-branding { text-align: center; margin-top: 16px; font-size: 10px; }
        .cf-branding a { color: ${b}; text-decoration: none; opacity: 0.6; }
      </style>
      ${$}
    `,h){let S=t.getElementById("cf-trigger"),y=t.getElementById("cf-popup"),z=t.getElementById("cf-popup-close");S==null||S.addEventListener("click",()=>{y&&(y.style.display="flex")}),z==null||z.addEventListener("click",()=>{y&&(y.style.display="none")}),y==null||y.addEventListener("click",j=>{j.target===y&&(y.style.display="none")})}let k=t.getElementById(`cf-form-${r}`),T=t.getElementById(`cf-success-${r}`),M=t.getElementById(`cf-error-${r}`);k==null||k.addEventListener("submit",async S=>{S.preventDefault();let y=k.querySelector(".cf-btn");y&&(y.disabled=!0,y.textContent="Sending...");let z=new FormData(k);try{if((await fetch(`${d}/api/contact-submit`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({widget_id:r,name:z.get("name"),email:z.get("email"),phone:z.get("phone"),subject:z.get("subject"),message:z.get("message")})})).ok)k.style.display="none",T&&(T.style.display="block");else throw new Error("Failed")}catch(j){y&&(y.disabled=!1,y.textContent=c);let R=M==null?void 0:M.querySelector(".cf-error-msg");R&&(R.textContent="Failed to send. Please try again."),M&&(M.style.display="block")}})}function Y(t,e,p,d){var u;let r=e.theme||"light",s=e.style||"filled",i=e.size||"medium",n=e.layout||"horizontal",b=e.show_labels!==!1,x=e.animation||"hover_grow",m=(u=e.border_radius)!=null?u:50,l={small:{btn:"36px",icon:"18px",font:"12px"},medium:{btn:"44px",icon:"22px",font:"13px"},large:{btn:"56px",icon:"28px",font:"14px"}},f=l[i]||l.medium,h=e.networks||{},o={facebook:{label:"Facebook",color:"#1877F2",icon:"f"},instagram:{label:"Instagram",color:"#E4405F",icon:"\u{1F4F7}"},twitter:{label:"Twitter / X",color:"#000000",icon:"X"},tiktok:{label:"TikTok",color:"#000000",icon:"\u266A"},youtube:{label:"YouTube",color:"#FF0000",icon:"\u25B6"},linkedin:{label:"LinkedIn",color:"#0A66C2",icon:"in"},pinterest:{label:"Pinterest",color:"#E60023",icon:"P"},whatsapp:{label:"WhatsApp",color:"#25D366",icon:"\u{1F4AC}"}},a=Object.entries(h).filter(([,v])=>v).map(([v,g])=>{let $=o[v];if(!$)return"";let k=s==="filled"?`background: ${$.color}; color: white; border: none;`:s==="outline"?`background: transparent; color: ${$.color}; border: 2px solid ${$.color};`:`background: transparent; color: ${$.color}; border: none;`,T=e.label_type==="follow_us"?"Follow us":e.label_type==="custom"&&e.custom_label||$.label;return`
          <a href="${g}"
             target="_blank"
             rel="noopener noreferrer"
             class="sf-btn sf-${v}"
             aria-label="${$.label}"
             style="${k}">
            <span class="sf-icon">${$.icon}</span>
            ${b?`<span class="sf-label">${T}</span>`:""}
          </a>
        `}).join(""),c=n==="horizontal"?"flex-direction: row; flex-wrap: wrap;":n==="vertical"?"flex-direction: column;":"display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));",w=x==="hover_grow"?".sf-btn:hover { transform: scale(1.08); }":x==="hover_bounce"?`.sf-btn:hover { animation: sfbounce .3s ease; }
         @keyframes sfbounce {
           0%,100% { transform: translateY(0); }
           50% { transform: translateY(-4px); }
         }`:"";t.innerHTML=`
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .sf-wrap {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: transparent;
          padding: 12px;
          display: flex;
          ${c}
          gap: 10px;
          align-items: center;
        }
        .sf-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          height: ${f.btn};
          padding: 0 ${b?"14px":"0"};
          ${b?"":`width: ${f.btn};`}
          justify-content: center;
          border-radius: ${m}px;
          text-decoration: none;
          font-size: ${f.font};
          font-weight: 600;
          cursor: pointer;
          transition: transform .2s, opacity .2s;
          white-space: nowrap;
        }
        .sf-btn:hover { opacity: .9; }
        .sf-icon { font-size: ${f.icon}; line-height: 1; font-style: normal; }
        .sf-label { font-size: ${f.font}; }
        ${w}
        .sf-branding { width: 100%; text-align: center; margin-top: 8px; font-size: 10px; }
        .sf-branding a { color: #999; text-decoration: none; opacity: 0.6; }
      </style>
      <div class="sf-wrap">
        ${a}
        ${p?`
          <div class="sf-branding">
            <a href="${d}" target="_blank" rel="noopener noreferrer">
              Powered by Devixus Widgets
            </a>
          </div>`:""}
      </div>
    `}function O(t,e,p){switch(e.type){case"whatsapp":H(t,e.config,e.show_branding);break;case"testimonials":U(t,e.config,e.show_branding);break;case"youtube_feed":D(t,e.config,e.show_branding,_);break;case"google_reviews":I(t,e.config,e.show_branding,_);break;case"countdown_timer":q(t,e.config,e.show_branding,_);break;case"announcement_bar":W(t,e.config,e.show_branding,_);break;case"contact_form":N(t,e.config,e.show_branding,_,p);break;case"social_follow":Y(t,e.config,e.show_branding,_);break;default:console.warn(`[Devixus] Unknown widget type: ${e.type}`)}}async function E(){let t=B();if(!t)return;let e=t.getAttribute("data-widget-id");if(!e){console.warn("[Devixus] Missing data-widget-id attribute on script tag");return}let p=t.getAttribute("data-mount")||null;try{let d=await F(e),r=p&&document.querySelector(p)||document.body;if(d.limit_reached){let i=L(r);A(i,d,_);return}let s=L(r);O(s,d,e),P(e,_)}catch(d){console.warn("[Devixus] Widget failed to load:",d)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",E):E()})();})();

"use strict";(()=>{(function(){"use strict";let M="https://devixus-widgets-web.vercel.app",C="https://devixus-widgets-marketing.vercel.app";function I(){if(document.currentScript)return document.currentScript;let t=document.getElementsByTagName("script");return t[t.length-1]}async function F(t){let e=await fetch(`${M}/api/widget/${t}`,{method:"GET",headers:{"Content-Type":"application/json"}});if(!e.ok)throw new Error(`Widget not found: ${t}`);return e.json()}function R(t){let e=document.createElement("div");return e.setAttribute("data-devixus-widget","true"),e.style.cssText="all: initial; display: block;",t.appendChild(e),e.attachShadow({mode:"open"})}function H(t,e,g){let l=e.phone_number||"",a=encodeURIComponent(e.welcome_message||"Hello!"),i=e.button_color||"#25D366",n=e.position||"bottom-right",x={small:44,medium:56,large:68}[e.button_size||"medium"]||56,m=Math.round(x*.54),w=!!e.pulse_animation,v=e.open_in==="same_tab"?"_self":"_blank",b=e.tooltip_text||"",h=n==="bottom-right"?"bottom: 24px; right: 24px;":"bottom: 24px; left: 24px;",d=n==="bottom-right"?"flex-end":"flex-start";t.innerHTML=`
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .wa-btn {
          position: fixed;
          ${h}
          z-index: 9999;
          display: flex;
          flex-direction: column;
          align-items: ${d};
          gap: 6px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        .wa-bubble-wrap { position: relative; display: inline-flex; }
        .wa-bubble {
          width: ${x}px;
          height: ${x}px;
          border-radius: 50%;
          background: ${i};
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
          width: ${m}px;
          height: ${m}px;
          fill: white;
        }
        ${w?`
        @keyframes wa-pulse {
          0% { transform: scale(.85); opacity: 0; }
          50% { opacity: .4; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        .wa-bubble::before {
          content: '';
          position: absolute;
          border-radius: 50%;
          background: ${i};
          width: 100%; height: 100%;
          animation: wa-pulse 2s ease infinite;
          z-index: -1;
        }`:""}
        ${b?`
        .wa-tooltip {
          position: absolute;
          bottom: calc(100% + 8px);
          ${n==="bottom-right"?"right: 0;":"left: 0;"}
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
        }`:""}
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
          ${b?`<div class="wa-tooltip">${b}</div>`:""}
          <a class="wa-bubble"
             href="https://wa.me/${l}?text=${a}"
             target="${v}"
             rel="noopener noreferrer"
             aria-label="Chat on WhatsApp">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </a>
        </div>
        ${g?`<a class="wa-branding" href="${C}" target="_blank" rel="noopener noreferrer">Powered by Devixus</a>`:""}
      </div>
    `}function U(t,e,g){var y,j;let l=e.testimonials||[],a=e.theme||"light",i=e.show_rating!==!1,n=e.layout||"slider",r=e.columns||2,x=e.show_arrows!==!1,m=!!e.show_dots,w=!!e.show_quote_icon,v=e.avatar_shape||"circle",b=e.card_shadow||"none",h=a==="dark"?"#1a1a1a":"#ffffff",d=a==="dark"?"#ffffff":"#1a1a1a",c=a==="dark"?"#aaaaaa":"#666666",_=a==="dark"?"#2a2a2a":"#f9f9f9",u={none:"none",small:"0 1px 4px rgba(0,0,0,.08)",medium:"0 4px 16px rgba(0,0,0,.1)",large:"0 8px 32px rgba(0,0,0,.14)"}[b]||"none",o=v==="circle"?"50%":v==="square"?"4px":"8px",p=l.map($=>{let f=$.rating||5,z=i?`<div class="stars">${"\u2605".repeat(f)}${"\u2606".repeat(5-f)}</div>`:"",T=$.avatar_url?`<img src="${$.avatar_url}" class="avatar" alt="${$.author}" />`:`<div class="avatar-placeholder">${$.author.charAt(0).toUpperCase()}</div>`;return`
        <div class="card">
          ${w?'<div class="quote-icon">"</div>':""}
          ${z}
          <p class="content">${$.content}</p>
          <div class="author-row">
            ${T}
            <div>
              <div class="author">${$.author}</div>
              <div class="role">${$.role||""}</div>
            </div>
          </div>
        </div>
      `}).join(""),s=n==="grid",k=s?`display: grid; grid-template-columns: repeat(${r}, 1fr); gap: 16px;`:"display: flex; gap: 16px; overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: none; -ms-overflow-style: none; padding-bottom: 8px;";if(t.innerHTML=`
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .wrap {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: ${h};
          padding: 24px 16px;
          overflow: hidden;
          position: relative;
        }
        .track { ${k} }
        .track::-webkit-scrollbar { display: none; }
        .card {
          ${s?"":"flex: 0 0 280px; scroll-snap-align: start;"}
          background: ${_};
          border-radius: 12px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          box-shadow: ${u};
        }
        .quote-icon {
          font-size: 48px;
          line-height: 1;
          color: #e5e7eb;
          font-family: Georgia, serif;
          margin-bottom: -8px;
        }
        .stars { color: #f59e0b; font-size: 16px; letter-spacing: 2px; }
        .content { color: ${d}; font-size: 14px; line-height: 1.6; flex: 1; }
        .author-row { display: flex; align-items: center; gap: 10px; }
        .avatar {
          width: 36px; height: 36px;
          border-radius: ${o};
          object-fit: cover; flex-shrink: 0;
        }
        .avatar-placeholder {
          width: 36px; height: 36px;
          border-radius: ${o};
          background: #ff6914;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 600;
          flex-shrink: 0;
        }
        .author { color: ${d}; font-size: 13px; font-weight: 600; }
        .role { color: ${c}; font-size: 12px; }
        ${!s&&x?`
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
          background: ${h};
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          color: ${d};
          transition: background .2s;
        }
        .arrow-btn:hover { background: ${_}; }`:""}
        ${m?`
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
        .dot.active { background: #ff6914; }`:""}
        .branding { text-align: center; margin-top: 12px; font-size: 10px; }
        .branding a { color: ${c}; text-decoration: none; opacity: 0.6; }
        .branding a:hover { opacity: 1; }
      </style>
      <div class="wrap">
        <div class="track" id="t-track">${p}</div>
        ${!s&&x?`
        <div class="arrows">
          <button class="arrow-btn" id="t-prev">\u2190</button>
          <button class="arrow-btn" id="t-next">\u2192</button>
        </div>`:""}
        ${m&&l.length>0?`
        <div class="dots" id="t-dots">
          ${l.map(($,f)=>`<div class="dot${f===0?" active":""}" data-i="${f}"></div>`).join("")}
        </div>`:""}
        ${g?`<div class="branding"><a href="${C}" target="_blank" rel="noopener noreferrer">Powered by Devixus Widgets</a></div>`:""}
      </div>
    `,!s){let T=function(E){if(!$)return;let L=$.children;L[E]&&(z=E,L[E].scrollIntoView({behavior:"smooth",inline:"start",block:"nearest"}),f&&f.querySelectorAll(".dot").forEach((J,X)=>{J.classList.toggle("active",X===z)}))},$=t.getElementById("t-track"),f=m?t.getElementById("t-dots"):null,z=0;x&&((y=t.getElementById("t-prev"))==null||y.addEventListener("click",()=>{T(Math.max(0,z-1))}),(j=t.getElementById("t-next"))==null||j.addEventListener("click",()=>{T(Math.min(l.length-1,z+1))})),f&&f.querySelectorAll(".dot").forEach(E=>{E.addEventListener("click",()=>{var L;T(parseInt((L=E.dataset.i)!=null?L:"0"))})})}}function q(t,e,g,l){let a=e.theme||"light",i=a==="dark"?"#0f0f0f":"#ffffff",n=a==="dark"?"#ffffff":"#0f0f0f",r=a==="dark"?"#aaaaaa":"#606060",x=a==="dark"?"#1a1a1a":"#f9f9f9",m=e.accent_color||"#ff0000",w=e.columns||3,v=e.layout||"grid",b=e.subscribe_button_color||m,h=e.header_style||"full",d=e.show_subscriber_count!==!1;t.innerHTML=`
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .yt-wrap {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: ${i};
          padding: 20px;
          color: ${n};
        }
        .yt-loading {
          text-align: center;
          padding: 40px;
          color: ${r};
          font-size: 14px;
        }
      </style>
      <div class="yt-wrap">
        <div class="yt-loading">Loading videos...</div>
      </div>
    `;let c=e.channel_id,_=e.max_results||6,S=`${l}/api/youtube?channel_id=${c}&max_results=${_}`;fetch(S).then(u=>u.json()).then(u=>{if(!u.videos||u.videos.length===0){t.innerHTML=`
            <div style="padding:20px;text-align:center;
              color:${r};font-family:sans-serif;">
              No videos found
            </div>`;return}let o=u.channel,s=u.videos.map(y=>`
          <a class="yt-card"
             href="${y.url}"
             target="_blank"
             rel="noopener noreferrer">
            <div class="yt-thumb">
              <img src="${y.thumbnail}"
                   alt="${y.title}"
                   loading="lazy" />
              <div class="yt-play">\u25B6</div>
            </div>
            ${e.show_title!==!1?`<div class="yt-title">${y.title}</div>`:""}
            ${e.show_date!==!1?`<div class="yt-meta">${new Date(y.published_at).toLocaleDateString()}</div>`:""}
          </a>
        `).join(""),k=v==="grid"?`grid-template-columns: repeat(${w}, 1fr);`:v==="list"?"grid-template-columns: 1fr;":"grid-auto-flow: column; grid-auto-columns: 280px;";t.innerHTML=`
          <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            .yt-wrap {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              background: ${i};
              padding: 20px;
              color: ${n};
            }
            .yt-header {
              display: flex;
              align-items: center;
              gap: 12px;
              margin-bottom: 20px;
              padding-bottom: 16px;
              border-bottom: 1px solid ${a==="dark"?"#333":"#eee"};
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
              color: ${n};
            }
            .yt-subs {
              font-size: 12px;
              color: ${r};
              margin-top: 2px;
            }
            .yt-subscribe {
              margin-left: auto;
              background: ${b};
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
              ${k}
              gap: 16px;
              ${v==="carousel"?"overflow-x: auto; scrollbar-width: none;":""}
            }
            .yt-grid::-webkit-scrollbar { display: none; }
            .yt-card {
              text-decoration: none;
              color: ${n};
              display: block;
              border-radius: 8px;
              overflow: hidden;
              background: ${x};
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
              color: ${r};
              padding: 0 12px 10px;
            }
            .yt-branding {
              text-align: center;
              margin-top: 16px;
              font-size: 10px;
            }
            .yt-branding a {
              color: ${r};
              text-decoration: none;
              opacity: 0.6;
            }
          </style>
          <div class="yt-wrap">
            ${o&&h!=="none"?`
            <div class="yt-header">
              ${h==="full"&&o.avatar?`<img src="${o.avatar}"
                         class="yt-avatar"
                         alt="${o.name}" />`:""}
              <div>
                <div class="yt-channel-name">${o.name}</div>
                ${d&&o.subscriber_count?`<div class="yt-subs">${o.subscriber_count} subscribers</div>`:""}
              </div>
              <a href="https://youtube.com/channel/${c}"
                 class="yt-subscribe"
                 target="_blank"
                 rel="noopener noreferrer">
                Subscribe
              </a>
            </div>`:""}
            <div class="yt-grid">${s}</div>
            ${g?`
              <div class="yt-branding">
                <a href="${l}"
                   target="_blank"
                   rel="noopener noreferrer">
                  Powered by Devixus Widgets
                </a>
              </div>`:""}
          </div>
        `}).catch(()=>{let u=t.querySelector(".yt-loading");u&&(u.textContent="Failed to load videos")})}function D(t,e,g,l){let a=e.theme||"light",i=a==="dark"?"#1a1a1a":"#ffffff",n=a==="dark"?"#ffffff":"#1a1a1a",r=a==="dark"?"#aaaaaa":"#666666",x=a==="dark"?"#2a2a2a":"#f9f9f9",m=e.accent_color||"#4285f4",w=e.layout||"grid";if(t.innerHTML=`
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .gr-wrap {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: ${i};
          padding: 20px;
          color: ${n};
        }
        .gr-loading {
          text-align: center;
          padding: 40px;
          color: ${r};
          font-size: 14px;
        }
      </style>
      <div class="gr-wrap">
        <div class="gr-loading">Loading reviews...</div>
      </div>
    `,!e.place_id){let d=t.querySelector(".gr-wrap");d&&(d.innerHTML=`<div class="gr-loading" style="color:${r}">No business configured</div>`);return}let v=e.max_reviews||6,b=e.min_rating||1,h=`${l}/api/google-reviews?place_id=${encodeURIComponent(e.place_id)}&max_reviews=${v}&min_rating=${b}`;fetch(h).then(d=>d.json()).then(d=>{if(!d.reviews||d.reviews.length===0){t.innerHTML=`
            <div style="padding:20px;text-align:center;
              color:${r};font-family:sans-serif;background:${i};">
              No reviews found
            </div>`;return}let c=d.place,_=d.reviews;function S(p){return Array.from({length:5},(s,k)=>`<span style="color:${k<p?"#fbbc04":"#dadce0"}">\u2605</span>`).join("")}let u=_.map(p=>`
          <div class="gr-card">
            <div class="gr-card-header">
              ${e.show_reviewer_photo!==!1&&p.author_photo?`<img src="${p.author_photo}" class="gr-avatar" alt="${p.author_name}" />`:`<div class="gr-avatar-placeholder">${p.author_name.charAt(0).toUpperCase()}</div>`}
              <div class="gr-author-info">
                <div class="gr-author">${p.author_name}</div>
                ${e.show_review_date!==!1?`<div class="gr-date">${p.relative_time}</div>`:""}
              </div>
            </div>
            <div class="gr-stars">${S(p.rating)}</div>
            ${p.text?`<p class="gr-text">${p.text}</p>`:""}
          </div>
        `).join(""),o=w==="grid"?"grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));":w==="carousel"?"grid-auto-flow: column; grid-auto-columns: 300px; overflow-x: auto;":"grid-template-columns: 1fr;";t.innerHTML=`
          <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            .gr-wrap {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              background: ${i};
              padding: 20px;
              color: ${n};
            }
            .gr-header {
              display: flex;
              align-items: flex-start;
              justify-content: space-between;
              margin-bottom: 20px;
              padding-bottom: 16px;
              border-bottom: 1px solid ${a==="dark"?"#333":"#eee"};
              flex-wrap: wrap;
              gap: 12px;
            }
            .gr-place-name {
              font-size: 18px;
              font-weight: 600;
              color: ${n};
              margin-bottom: 4px;
            }
            .gr-place-address { font-size: 12px; color: ${r}; }
            .gr-overall {
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 4px;
            }
            .gr-overall-score {
              font-size: 36px;
              font-weight: 700;
              color: ${n};
              line-height: 1;
            }
            .gr-overall-stars { font-size: 18px; }
            .gr-overall-count { font-size: 11px; color: ${r}; }
            .gr-write-link {
              display: inline-block;
              margin-top: 8px;
              font-size: 12px;
              color: ${m};
              text-decoration: none;
            }
            .gr-google-badge {
              display: flex;
              align-items: center;
              gap: 6px;
              margin-top: 4px;
            }
            .gr-google-logo { font-size: 12px; font-weight: 700; color: ${m}; }
            .gr-grid {
              display: grid;
              ${o}
              gap: 16px;
              scrollbar-width: none;
            }
            .gr-grid::-webkit-scrollbar { display: none; }
            .gr-card {
              background: ${x};
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
              background: ${m};
              color: white;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 16px;
              font-weight: 600;
              flex-shrink: 0;
            }
            .gr-author { font-size: 14px; font-weight: 500; color: ${n}; }
            .gr-date { font-size: 11px; color: ${r}; margin-top: 1px; }
            .gr-stars { font-size: 15px; letter-spacing: 1px; }
            .gr-text {
              font-size: 13px;
              color: ${r};
              line-height: 1.6;
              display: -webkit-box;
              -webkit-line-clamp: 4;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }
            .gr-branding { text-align: center; margin-top: 16px; font-size: 10px; }
            .gr-branding a { color: ${r}; text-decoration: none; opacity: 0.6; }
          </style>
          <div class="gr-wrap">
            ${e.show_header!==!1&&c?`
            <div class="gr-header">
              <div>
                <div class="gr-place-name">${c.name}</div>
                <div class="gr-place-address">${c.address||""}</div>
                ${e.write_review_link&&c.google_url?`
                  <a href="${c.google_url}"
                     class="gr-write-link"
                     target="_blank"
                     rel="noopener noreferrer">Write a review \u2197</a>`:""}
              </div>
              ${e.show_overall_rating!==!1?`
              <div class="gr-overall">
                <div class="gr-overall-score">${c.overall_rating}</div>
                <div class="gr-overall-stars">${S(Math.round(c.overall_rating))}</div>
                <div class="gr-overall-count">${c.total_reviews} reviews</div>
                <div class="gr-google-badge">
                  <span class="gr-google-logo">G</span>
                  <span style="font-size:11px;color:${r}">Google Reviews</span>
                </div>
              </div>`:""}
            </div>`:""}
            <div class="gr-grid">${u}</div>
            ${g?`
              <div class="gr-branding">
                <a href="${l}" target="_blank" rel="noopener noreferrer">
                  Powered by Devixus Widgets
                </a>
              </div>`:""}
          </div>
        `}).catch(()=>{let d=t.querySelector(".gr-loading");d&&(d.textContent="Failed to load reviews")})}function A(t,e,g,l){var u;let a=e.theme||"light",i=e.bg_color||(a==="dark"?"#1a1a2e":"#ffffff"),n=e.text_color||(a==="dark"?"#ffffff":"#1a1a1a"),r=e.accent_color||"#ff6914",x=e.title||"Offer ends in",m=e.style||"blocks",w=e.font_family==="mono"?"'Courier New', monospace":e.font_family==="serif"?"Georgia, 'Times New Roman', serif":"-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",b=(u={colon:":",slash:"/",dot:"\xB7",none:""}[e.separator_style||"colon"])!=null?u:":",h=e.expire_action||"message";function d(){let o=new Date(e.target_date+"T"+(e.target_time||"00:00")).getTime(),p=Date.now(),s=o-p;return s<=0?null:{days:Math.floor(s/(1e3*60*60*24)),hours:Math.floor(s%(1e3*60*60*24)/(1e3*60*60)),minutes:Math.floor(s%(1e3*60*60)/(1e3*60)),seconds:Math.floor(s%(1e3*60)/1e3)}}function c(o){return String(o).padStart(2,"0")}function _(){let o=d();if(!o){if(h==="hide"){t.innerHTML="";return}let y=e.expired_message||"This offer has ended";if(h==="redirect"&&e.redirect_url&&(window.location.href=e.redirect_url),h==="nothing")return;t.innerHTML=`
          <style>
            .ct-wrap {
              font-family: ${w};
              background: ${i};
              padding: 24px;
              text-align: center;
              color: ${n};
              border-radius: 8px;
            }
            .ct-expired { font-size: 18px; font-weight: 500; }
          </style>
          <div class="ct-wrap">
            <div class="ct-expired">${y}</div>
          </div>
        `;return}let p=[];e.show_days!==!1&&p.push({value:c(o.days),label:"Days"}),e.show_hours!==!1&&p.push({value:c(o.hours),label:"Hours"}),e.show_minutes!==!1&&p.push({value:c(o.minutes),label:"Minutes"}),e.show_seconds!==!1&&p.push({value:c(o.seconds),label:"Seconds"});let s=m==="blocks"?`
        .ct-unit {
          background: ${r};
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
      `:m==="flip"?`
        .ct-unit {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }
        .ct-value {
          font-size: 48px;
          font-weight: 800;
          color: ${r};
          line-height: 1;
          font-variant-numeric: tabular-nums;
          background: ${i};
          border: 2px solid ${r};
          border-radius: 8px;
          padding: 8px 16px;
          min-width: 80px;
          text-align: center;
        }
        .ct-label {
          font-size: 11px;
          color: ${n};
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
          color: ${r};
          line-height: 1;
          font-variant-numeric: tabular-nums;
        }
        .ct-label {
          font-size: 11px;
          color: ${n};
          opacity: 0.6;
          text-transform: uppercase;
          letter-spacing: .05em;
        }
      `,k=p.map(y=>`
        <div class="ct-unit">
          <div class="ct-value">${y.value}</div>
          ${e.show_labels!==!1?`<div class="ct-label">${y.label}</div>`:""}
        </div>
      `).join(m==="minimal"?`<div class="ct-sep">${b}</div>`:"");t.innerHTML=`
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          .ct-wrap {
            font-family: ${w};
            background: ${i};
            padding: 24px 20px;
            border-radius: 8px;
            text-align: center;
            color: ${n};
          }
          .ct-title {
            font-size: 16px;
            font-weight: 500;
            margin-bottom: 16px;
            color: ${n};
          }
          .ct-units {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            flex-wrap: wrap;
          }
          ${s}
          .ct-sep {
            font-size: 36px;
            font-weight: 700;
            color: ${r};
            margin-bottom: 16px;
          }
          .ct-branding {
            margin-top: 16px;
            font-size: 10px;
          }
          .ct-branding a {
            color: ${n};
            opacity: 0.4;
            text-decoration: none;
          }
        </style>
        <div class="ct-wrap">
          ${x?`<div class="ct-title">${x}</div>`:""}
          <div class="ct-units">${k}</div>
          ${g?`
            <div class="ct-branding">
              <a href="${l}" target="_blank" rel="noopener noreferrer">
                Powered by Devixus Widgets
              </a>
            </div>`:""}
        </div>
      `}_();let S=setInterval(()=>{let o=d();if(!o){clearInterval(S),_();return}let p=t.querySelectorAll(".ct-value"),s=[];e.show_days!==!1&&s.push(c(o.days)),e.show_hours!==!1&&s.push(c(o.hours)),e.show_minutes!==!1&&s.push(c(o.minutes)),e.show_seconds!==!1&&s.push(c(o.seconds)),p.forEach((k,y)=>{s[y]&&(k.textContent=s[y])})},1e3)}function W(t,e,g,l){let a=e.message||"\u{1F389} Welcome to our website!",i=e.bg_color||"#ff6914",n=e.text_color||"#ffffff",r=e.link_color||"#ffffff",x=e.position||"top",m=e.is_sticky!==!1,w=e.show_close_button!==!1,v=e.show_emoji?e.emoji||"\u{1F389}":"",b=e.style||"solid",h=i;b==="gradient"?h=`linear-gradient(135deg, ${i}, ${i}dd)`:b==="striped"&&(h=`repeating-linear-gradient(
        45deg,
        ${i},
        ${i} 10px,
        ${i}ee 10px,
        ${i}ee 20px
      )`);let d=m?`position: fixed; ${x}: 0; left: 0; right: 0; z-index: 999999;`:"position: relative;";if(t.innerHTML=`
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .ab-bar {
          ${d}
          background: ${h};
          color: ${n};
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
        .ab-message { color: ${n}; font-weight: 500; }
        .ab-link {
          color: ${r};
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
          color: ${n};
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
          right: ${w?"44px":"12px"};
          top: 50%;
          transform: translateY(-50%);
          font-size: 9px;
        }
        .ab-branding a { color: ${n}; opacity: 0.4; text-decoration: none; }
      </style>
      <div class="ab-bar" id="ab-bar">
        <div class="ab-content">
          ${v?`<span>${v}</span>`:""}
          <span class="ab-message">${a}</span>
          ${e.link_text&&e.link_url?`
            <a class="ab-link"
               href="${e.link_url}"
               target="_blank"
               rel="noopener noreferrer">
              ${e.link_text} \u2192
            </a>
          `:""}
        </div>
        ${g?`
          <div class="ab-branding">
            <a href="${l}" target="_blank" rel="noopener noreferrer">Devixus</a>
          </div>`:""}
        ${w?`
          <button class="ab-close" id="ab-close" aria-label="Close">\u2715</button>
        `:""}
      </div>
    `,w){let c=t.getElementById("ab-close"),_=t.getElementById("ab-bar");c&&_&&c.addEventListener("click",()=>{_.style.display="none"})}}function P(t,e,g){let l=`${g}/dashboard/billing`;t.innerHTML=`
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
          <a href="${l}"
             target="_blank"
             class="dv-btn">
            Upgrade plan \u2192
          </a>
          <div class="dv-powered">
            <a href="${g}" target="_blank">
              Powered by Devixus Widgets
            </a>
          </div>
        </div>
      </div>
    `}function N(t,e){try{let g=window.location.hostname,l=JSON.stringify({widget_id:t,domain:g,event_type:"load"});navigator.sendBeacon?navigator.sendBeacon(`${e}/api/track`,new Blob([l],{type:"application/json"})):fetch(`${e}/api/track`,{method:"POST",body:l,headers:{"Content-Type":"application/json"},keepalive:!0}).catch(()=>{})}catch(g){}}function Y(t,e,g,l,a){let i=e.theme||"light",n=i==="dark"?"#1a1a1a":"#ffffff",r=i==="dark"?"#ffffff":"#1a1a1a",x=i==="dark"?"#aaaaaa":"#666666",m=i==="dark"?"#2a2a2a":"#f9f9f9",w=i==="dark"?"#333":"#e5e7eb",v=e.accent_color||"#ff6914",b=e.border_radius||8,h=e.display_mode==="popup",d=e.title||"Contact Us",c=e.subtitle||"Send us a message and we'll get back to you.",_=e.button_text||"Send Message",S=e.success_message||"Thank you! We'll be in touch soon.",u=e.fields||{name:!0,email:!0,phone:!1,subject:!1,message:!0},o=e.required_fields||{name:!0,email:!0,message:!0};function p($){return`
        <div class="cf-form-wrap" id="${$}">
          <div class="cf-header">
            <h3 class="cf-title">${d}</h3>
            ${c?`<p class="cf-subtitle">${c}</p>`:""}
          </div>
          <form class="cf-form" id="cf-form-${a}">
            ${u.name?`
              <div class="cf-field">
                <label class="cf-label">
                  Name${o.name?' <span class="cf-req">*</span>':""}
                </label>
                <input type="text" name="name" class="cf-input"
                       placeholder="Your name"
                       ${o.name?"required":""} />
              </div>`:""}
            ${u.email?`
              <div class="cf-field">
                <label class="cf-label">
                  Email${o.email?' <span class="cf-req">*</span>':""}
                </label>
                <input type="email" name="email" class="cf-input"
                       placeholder="your@email.com"
                       ${o.email?"required":""} />
              </div>`:""}
            ${u.phone?`
              <div class="cf-field">
                <label class="cf-label">
                  Phone${o.phone?' <span class="cf-req">*</span>':""}
                </label>
                <input type="tel" name="phone" class="cf-input"
                       placeholder="+1 234 567 8900"
                       ${o.phone?"required":""} />
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
                  Message${o.message?' <span class="cf-req">*</span>':""}
                </label>
                <textarea name="message" class="cf-textarea"
                          placeholder="Your message..." rows="4"
                          ${o.message?"required":""}></textarea>
              </div>`:""}
            <div class="cf-field" id="cf-error-${a}" style="display:none">
              <p class="cf-error-msg"></p>
            </div>
            <button type="submit" class="cf-btn">${_}</button>
          </form>
          <div class="cf-success" id="cf-success-${a}" style="display:none">
            <div class="cf-success-icon">\u2713</div>
            <p class="cf-success-msg">${S}</p>
          </div>
          ${g?`
            <div class="cf-branding">
              <a href="${l}" target="_blank" rel="noopener noreferrer">
                Powered by Devixus Widgets
              </a>
            </div>`:""}
        </div>
      `}let s=h?`
      <div>
        <button class="cf-trigger" id="cf-trigger">
          ${e.trigger_text||"\u2709 Contact Us"}
        </button>
        <div class="cf-popup-overlay" id="cf-popup" style="display:none">
          <div class="cf-popup-box">
            <button class="cf-popup-close" id="cf-popup-close">\u2715</button>
            ${p("cf-popup-form")}
          </div>
        </div>
      </div>
    `:p("cf-inline-form");if(t.innerHTML=`
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .cf-trigger {
          background: ${v};
          color: white;
          border: none;
          padding: 12px 20px;
          border-radius: ${b}px;
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
          background: ${n};
          border-radius: ${b+4}px;
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
          color: ${x};
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }
        .cf-popup-close:hover { background: ${m}; }
        .cf-form-wrap {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: ${n};
          padding: ${h?"0":"24px"};
          border-radius: ${b}px;
          color: ${r};
        }
        .cf-header { margin-bottom: 20px; }
        .cf-title {
          font-size: 20px;
          font-weight: 600;
          color: ${r};
          margin-bottom: 6px;
        }
        .cf-subtitle {
          font-size: 13px;
          color: ${x};
          line-height: 1.5;
        }
        .cf-form { display: flex; flex-direction: column; gap: 14px; }
        .cf-field { display: flex; flex-direction: column; gap: 5px; }
        .cf-label { font-size: 13px; font-weight: 500; color: ${r}; }
        .cf-req { color: #ef4444; }
        .cf-input, .cf-textarea {
          background: ${m};
          border: 1px solid ${w};
          border-radius: ${b-2}px;
          padding: 10px 12px;
          font-size: 14px;
          color: ${r};
          font-family: inherit;
          outline: none;
          transition: border-color .2s;
          width: 100%;
        }
        .cf-input:focus, .cf-textarea:focus { border-color: ${v}; }
        .cf-textarea { resize: vertical; }
        .cf-btn {
          background: ${v};
          color: white;
          border: none;
          padding: 12px 20px;
          border-radius: ${b-2}px;
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
          color: ${r};
          font-family: -apple-system, sans-serif;
        }
        .cf-branding { text-align: center; margin-top: 16px; font-size: 10px; }
        .cf-branding a { color: ${x}; text-decoration: none; opacity: 0.6; }
      </style>
      ${s}
    `,h){let $=t.getElementById("cf-trigger"),f=t.getElementById("cf-popup"),z=t.getElementById("cf-popup-close");$==null||$.addEventListener("click",()=>{f&&(f.style.display="flex")}),z==null||z.addEventListener("click",()=>{f&&(f.style.display="none")}),f==null||f.addEventListener("click",T=>{T.target===f&&(f.style.display="none")})}let k=t.getElementById(`cf-form-${a}`),y=t.getElementById(`cf-success-${a}`),j=t.getElementById(`cf-error-${a}`);k==null||k.addEventListener("submit",async $=>{$.preventDefault();let f=k.querySelector(".cf-btn");f&&(f.disabled=!0,f.textContent="Sending...");let z=new FormData(k);try{if((await fetch(`${l}/api/contact-submit`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({widget_id:a,name:z.get("name"),email:z.get("email"),phone:z.get("phone"),subject:z.get("subject"),message:z.get("message")})})).ok)k.style.display="none",y&&(y.style.display="block");else throw new Error("Failed")}catch(T){f&&(f.disabled=!1,f.textContent=_);let E=j==null?void 0:j.querySelector(".cf-error-msg");E&&(E.textContent="Failed to send. Please try again."),j&&(j.style.display="block")}})}function G(t,e,g,l){var u;let a=e.theme||"light",i=e.style||"filled",n=e.size||"medium",r=e.layout||"horizontal",x=e.show_labels!==!1,m=e.animation||"hover_grow",w=(u=e.border_radius)!=null?u:50,v={small:{btn:"36px",icon:"18px",font:"12px"},medium:{btn:"44px",icon:"22px",font:"13px"},large:{btn:"56px",icon:"28px",font:"14px"}},b=v[n]||v.medium,h=e.networks||{},d={facebook:{label:"Facebook",color:"#1877F2",icon:"f"},instagram:{label:"Instagram",color:"#E4405F",icon:"\u{1F4F7}"},twitter:{label:"Twitter / X",color:"#000000",icon:"X"},tiktok:{label:"TikTok",color:"#000000",icon:"\u266A"},youtube:{label:"YouTube",color:"#FF0000",icon:"\u25B6"},linkedin:{label:"LinkedIn",color:"#0A66C2",icon:"in"},pinterest:{label:"Pinterest",color:"#E60023",icon:"P"},whatsapp:{label:"WhatsApp",color:"#25D366",icon:"\u{1F4AC}"}},c=Object.entries(h).filter(([,o])=>o).map(([o,p])=>{let s=d[o];if(!s)return"";let k=i==="filled"?`background: ${s.color}; color: white; border: none;`:i==="outline"?`background: transparent; color: ${s.color}; border: 2px solid ${s.color};`:`background: transparent; color: ${s.color}; border: none;`,y=e.label_type==="follow_us"?"Follow us":e.label_type==="custom"&&e.custom_label||s.label;return`
          <a href="${p}"
             target="_blank"
             rel="noopener noreferrer"
             class="sf-btn sf-${o}"
             aria-label="${s.label}"
             style="${k}">
            <span class="sf-icon">${s.icon}</span>
            ${x?`<span class="sf-label">${y}</span>`:""}
          </a>
        `}).join(""),_=r==="horizontal"?"flex-direction: row; flex-wrap: wrap;":r==="vertical"?"flex-direction: column;":"display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));",S=m==="hover_grow"?".sf-btn:hover { transform: scale(1.08); }":m==="hover_bounce"?`.sf-btn:hover { animation: sfbounce .3s ease; }
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
          ${_}
          gap: 10px;
          align-items: center;
        }
        .sf-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          height: ${b.btn};
          padding: 0 ${x?"14px":"0"};
          ${x?"":`width: ${b.btn};`}
          justify-content: center;
          border-radius: ${w}px;
          text-decoration: none;
          font-size: ${b.font};
          font-weight: 600;
          cursor: pointer;
          transition: transform .2s, opacity .2s;
          white-space: nowrap;
        }
        .sf-btn:hover { opacity: .9; }
        .sf-icon { font-size: ${b.icon}; line-height: 1; font-style: normal; }
        .sf-label { font-size: ${b.font}; }
        ${S}
        .sf-branding { width: 100%; text-align: center; margin-top: 8px; font-size: 10px; }
        .sf-branding a { color: #999; text-decoration: none; opacity: 0.6; }
      </style>
      <div class="sf-wrap">
        ${c}
        ${g?`
          <div class="sf-branding">
            <a href="${l}" target="_blank" rel="noopener noreferrer">
              Powered by Devixus Widgets
            </a>
          </div>`:""}
      </div>
    `}function O(t,e,g){switch(e.type){case"whatsapp":H(t,e.config,e.show_branding);break;case"testimonials":U(t,e.config,e.show_branding);break;case"youtube_feed":q(t,e.config,e.show_branding,M);break;case"google_reviews":D(t,e.config,e.show_branding,M);break;case"countdown_timer":A(t,e.config,e.show_branding,M);break;case"announcement_bar":W(t,e.config,e.show_branding,M);break;case"contact_form":Y(t,e.config,e.show_branding,M,g);break;case"social_follow":G(t,e.config,e.show_branding,M);break;default:console.warn(`[Devixus] Unknown widget type: ${e.type}`)}}async function B(){let t=I();if(!t)return;let e=t.getAttribute("data-widget-id");if(!e){console.warn("[Devixus] Missing data-widget-id attribute on script tag");return}let g=t.getAttribute("data-mount")||null;try{let l=await F(e),a=g&&document.querySelector(g)||document.body;if(l.limit_reached){let n=R(a);P(n,l,M);return}let i=R(a);O(i,l,e),N(e,M)}catch(l){console.warn("[Devixus] Widget failed to load:",l)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",B):B()})();})();

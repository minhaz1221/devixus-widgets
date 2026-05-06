"use strict";(()=>{(function(){"use strict";let I=document.currentScript||(()=>{let t=document.getElementsByTagName("script");return t[t.length-1]||null})(),T=(()=>{try{let t=I==null?void 0:I.src;if(t)return new URL(t).origin}catch(t){}return"https://devixus-widgets-web.vercel.app"})(),R="https://devixus-widgets-marketing.vercel.app",U={bg:"#0f172a",card:"#1e293b",text:"#f1f5f9",border:"#334155",muted:"#94a3b8"},q={bg:"#ffffff",card:"#f9fafb",text:"#1a1a1a",border:"#e5e7eb",muted:"#6b7280"};function D(t){var e;return t==="auto"?(e=window.matchMedia)!=null&&e.call(window,"(prefers-color-scheme: dark)").matches?"dark":"light":t==="dark"?"dark":"light"}function E(t){return D(t)==="dark"?U:q}async function A(t){let e=await fetch(`${T}/api/widget/${t}`,{method:"GET",headers:{"Content-Type":"application/json"}});if(!e.ok)throw new Error(`Widget not found: ${t}`);return e.json()}function B(t){let e=document.createElement("div");return e.setAttribute("data-devixus-widget","true"),e.style.cssText="all: initial; display: block;",t.appendChild(e),e.attachShadow({mode:"open"})}function P(t,e,b){let r=e.phone_number||"",p=encodeURIComponent(e.welcome_message||"Hello!"),i=e.button_color||"#25D366",l=e.position||"bottom-right",a={small:44,medium:56,large:68}[e.button_size||"medium"]||56,y=Math.round(a*.54),m=!!e.pulse_animation,$=e.open_in==="same_tab"?"_self":"_blank",f=e.tooltip_text||"",v=l==="bottom-right"?"bottom: 24px; right: 24px;":"bottom: 24px; left: 24px;",w=l==="bottom-right"?"flex-end":"flex-start";t.innerHTML=`
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .wa-btn {
          position: fixed;
          ${v}
          z-index: 9999;
          display: flex;
          flex-direction: column;
          align-items: ${w};
          gap: 6px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        .wa-bubble-wrap { position: relative; display: inline-flex; }
        .wa-bubble {
          width: ${a}px;
          height: ${a}px;
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
          width: ${y}px;
          height: ${y}px;
          fill: white;
        }
        ${m?`
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
        ${f?`
        .wa-tooltip {
          position: absolute;
          bottom: calc(100% + 8px);
          ${l==="bottom-right"?"right: 0;":"left: 0;"}
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
          ${f?`<div class="wa-tooltip">${f}</div>`:""}
          <a class="wa-bubble"
             href="https://wa.me/${r}?text=${p}"
             target="${$}"
             rel="noopener noreferrer"
             aria-label="Chat on WhatsApp">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </a>
        </div>
        ${b?`<a class="wa-branding" href="${R}" target="_blank" rel="noopener noreferrer">Powered by Devixus</a>`:""}
      </div>
    `}function W(t,e,b){var _,L;let r=e.testimonials||[],p=e.theme||"light",i=e.show_rating!==!1,l=e.layout||"slider",s=e.columns||2,a=e.show_arrows!==!1,y=!!e.show_dots,m=!!e.show_quote_icon,$=e.avatar_shape||"circle",f=e.card_shadow||"none",v=E(p),w=v.bg,g=v.text,d=v.muted,z=v.card,u={none:"none",small:"0 1px 4px rgba(0,0,0,.08)",medium:"0 4px 16px rgba(0,0,0,.1)",large:"0 8px 32px rgba(0,0,0,.14)"}[f]||"none",o=$==="circle"?"50%":$==="square"?"4px":"8px",n=r.map(x=>{let c=x.rating||5,S=i?`<div class="stars">${"\u2605".repeat(c)}${"\u2606".repeat(5-c)}</div>`:"",j=x.avatar_url?`<img src="${x.avatar_url}" class="avatar" alt="${x.author}" />`:`<div class="avatar-placeholder">${x.author.charAt(0).toUpperCase()}</div>`;return`
        <div class="card">
          ${m?'<div class="quote-icon">"</div>':""}
          ${S}
          <p class="content">${x.content}</p>
          <div class="author-row">
            ${j}
            <div>
              <div class="author">${x.author}</div>
              <div class="role">${x.role||""}</div>
            </div>
          </div>
        </div>
      `}).join(""),h=l==="grid",k=h?`display: grid; grid-template-columns: repeat(${s}, 1fr); gap: 16px;`:"display: flex; gap: 16px; overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: none; -ms-overflow-style: none; padding-bottom: 8px;";if(t.innerHTML=`
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .wrap {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: ${w};
          padding: 24px 16px;
          overflow: hidden;
          position: relative;
        }
        .track { ${k} }
        .track::-webkit-scrollbar { display: none; }
        .card {
          ${h?"":"flex: 0 0 280px; scroll-snap-align: start;"}
          background: ${z};
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
        .content { color: ${g}; font-size: 14px; line-height: 1.6; flex: 1; }
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
        .author { color: ${g}; font-size: 13px; font-weight: 600; }
        .role { color: ${d}; font-size: 12px; }
        ${!h&&a?`
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
          background: ${w};
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          color: ${g};
          transition: background .2s;
        }
        .arrow-btn:hover { background: ${z}; }`:""}
        ${y?`
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
        .branding a { color: ${d}; text-decoration: none; opacity: 0.6; }
        .branding a:hover { opacity: 1; }
      </style>
      <div class="wrap">
        <div class="track" id="t-track">${n}</div>
        ${!h&&a?`
        <div class="arrows">
          <button class="arrow-btn" id="t-prev">\u2190</button>
          <button class="arrow-btn" id="t-next">\u2192</button>
        </div>`:""}
        ${y&&r.length>0?`
        <div class="dots" id="t-dots">
          ${r.map((x,c)=>`<div class="dot${c===0?" active":""}" data-i="${c}"></div>`).join("")}
        </div>`:""}
        ${b?`<div class="branding"><a href="${R}" target="_blank" rel="noopener noreferrer">Powered by Devixus Widgets</a></div>`:""}
      </div>
    `,!h){let j=function(C){if(!x)return;let F=x.children;F[C]&&(S=C,F[C].scrollIntoView({behavior:"smooth",inline:"start",block:"nearest"}),c&&c.querySelectorAll(".dot").forEach((ne,ae)=>{ne.classList.toggle("active",ae===S)}))},x=t.getElementById("t-track"),c=y?t.getElementById("t-dots"):null,S=0;a&&((_=t.getElementById("t-prev"))==null||_.addEventListener("click",()=>{j(Math.max(0,S-1))}),(L=t.getElementById("t-next"))==null||L.addEventListener("click",()=>{j(Math.min(r.length-1,S+1))})),c&&c.querySelectorAll(".dot").forEach(C=>{C.addEventListener("click",()=>{var F;j(parseInt((F=C.dataset.i)!=null?F:"0"))})})}}function N(t,e,b,r){let p=e.theme||"light",i=E(p),l=i.bg,s=i.text,a=i.muted,y=i.card,m=e.accent_color||"#ff0000",$=e.columns||3,f=e.layout||"grid",v=e.subscribe_button_color||m,w=e.header_style||"full",g=e.show_subscriber_count!==!1;t.innerHTML=`
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .yt-wrap {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: ${l};
          padding: 20px;
          color: ${s};
        }
        .yt-loading {
          text-align: center;
          padding: 40px;
          color: ${a};
          font-size: 14px;
        }
      </style>
      <div class="yt-wrap">
        <div class="yt-loading">Loading videos...</div>
      </div>
    `;let d=e.channel_id,z=e.max_results||6,M=`${r}/api/youtube?channel_id=${d}&max_results=${z}`;fetch(M).then(u=>u.json()).then(u=>{if(!u.videos||u.videos.length===0){t.innerHTML=`
            <div style="padding:20px;text-align:center;
              color:${a};font-family:sans-serif;">
              No videos found
            </div>`;return}let o=u.channel,h=u.videos.map(_=>`
          <a class="yt-card"
             href="${_.url}"
             target="_blank"
             rel="noopener noreferrer">
            <div class="yt-thumb">
              <img src="${_.thumbnail}"
                   alt="${_.title}"
                   loading="lazy" />
              <div class="yt-play">\u25B6</div>
            </div>
            ${e.show_title!==!1?`<div class="yt-title">${_.title}</div>`:""}
            ${e.show_date!==!1?`<div class="yt-meta">${new Date(_.published_at).toLocaleDateString()}</div>`:""}
          </a>
        `).join(""),k=f==="grid"?`grid-template-columns: repeat(${$}, 1fr);`:f==="list"?"grid-template-columns: 1fr;":"grid-auto-flow: column; grid-auto-columns: 280px;";t.innerHTML=`
          <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            .yt-wrap {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              background: ${l};
              padding: 20px;
              color: ${s};
            }
            .yt-header {
              display: flex;
              align-items: center;
              gap: 12px;
              margin-bottom: 20px;
              padding-bottom: 16px;
              border-bottom: 1px solid ${p==="dark"?"#333":"#eee"};
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
              color: ${s};
            }
            .yt-subs {
              font-size: 12px;
              color: ${a};
              margin-top: 2px;
            }
            .yt-subscribe {
              margin-left: auto;
              background: ${v};
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
              ${f==="carousel"?"overflow-x: auto; scrollbar-width: none;":""}
            }
            .yt-grid::-webkit-scrollbar { display: none; }
            .yt-card {
              text-decoration: none;
              color: ${s};
              display: block;
              border-radius: 8px;
              overflow: hidden;
              background: ${y};
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
              color: ${a};
              padding: 0 12px 10px;
            }
            .yt-branding {
              text-align: center;
              margin-top: 16px;
              font-size: 10px;
            }
            .yt-branding a {
              color: ${a};
              text-decoration: none;
              opacity: 0.6;
            }
          </style>
          <div class="yt-wrap">
            ${o&&w!=="none"?`
            <div class="yt-header">
              ${w==="full"&&o.avatar?`<img src="${o.avatar}"
                         class="yt-avatar"
                         alt="${o.name}" />`:""}
              <div>
                <div class="yt-channel-name">${o.name}</div>
                ${g&&o.subscriber_count?`<div class="yt-subs">${o.subscriber_count} subscribers</div>`:""}
              </div>
              <a href="https://youtube.com/channel/${d}"
                 class="yt-subscribe"
                 target="_blank"
                 rel="noopener noreferrer">
                Subscribe
              </a>
            </div>`:""}
            <div class="yt-grid">${h}</div>
            ${b?`
              <div class="yt-branding">
                <a href="${r}"
                   target="_blank"
                   rel="noopener noreferrer">
                  Powered by Devixus Widgets
                </a>
              </div>`:""}
          </div>
        `}).catch(()=>{let u=t.querySelector(".yt-loading");u&&(u.textContent="Failed to load videos")})}function O(t,e,b,r){let p=e.theme||"light",i=E(p),l=i.bg,s=i.text,a=i.muted,y=i.card,m=e.accent_color||"#4285f4",$=e.layout||"grid";if(t.innerHTML=`
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .gr-wrap {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: ${l};
          padding: 20px;
          color: ${s};
        }
        .gr-loading {
          text-align: center;
          padding: 40px;
          color: ${a};
          font-size: 14px;
        }
      </style>
      <div class="gr-wrap">
        <div class="gr-loading">Loading reviews...</div>
      </div>
    `,!e.place_id){let g=t.querySelector(".gr-wrap");g&&(g.innerHTML=`<div class="gr-loading" style="color:${a}">No business configured</div>`);return}let f=e.max_reviews||6,v=e.min_rating||1,w=`${r}/api/google-reviews?place_id=${encodeURIComponent(e.place_id)}&max_reviews=${f}&min_rating=${v}`;fetch(w).then(g=>g.json()).then(g=>{if(!g.reviews||g.reviews.length===0){t.innerHTML=`
            <div style="padding:20px;text-align:center;
              color:${a};font-family:sans-serif;background:${l};">
              No reviews found
            </div>`;return}let d=g.place,z=g.reviews;function M(n){return Array.from({length:5},(h,k)=>`<span style="color:${k<n?"#fbbc04":"#dadce0"}">\u2605</span>`).join("")}let u=z.map(n=>`
          <div class="gr-card">
            <div class="gr-card-header">
              ${e.show_reviewer_photo!==!1&&n.author_photo?`<img src="${n.author_photo}" class="gr-avatar" alt="${n.author_name}" />`:`<div class="gr-avatar-placeholder">${n.author_name.charAt(0).toUpperCase()}</div>`}
              <div class="gr-author-info">
                <div class="gr-author">${n.author_name}</div>
                ${e.show_review_date!==!1?`<div class="gr-date">${n.relative_time}</div>`:""}
              </div>
            </div>
            <div class="gr-stars">${M(n.rating)}</div>
            ${n.text?`<p class="gr-text">${n.text}</p>`:""}
          </div>
        `).join(""),o=$==="grid"?"grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));":$==="carousel"?"grid-auto-flow: column; grid-auto-columns: 300px; overflow-x: auto;":"grid-template-columns: 1fr;";t.innerHTML=`
          <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            .gr-wrap {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              background: ${l};
              padding: 20px;
              color: ${s};
            }
            .gr-header {
              display: flex;
              align-items: flex-start;
              justify-content: space-between;
              margin-bottom: 20px;
              padding-bottom: 16px;
              border-bottom: 1px solid ${p==="dark"?"#333":"#eee"};
              flex-wrap: wrap;
              gap: 12px;
            }
            .gr-place-name {
              font-size: 18px;
              font-weight: 600;
              color: ${s};
              margin-bottom: 4px;
            }
            .gr-place-address { font-size: 12px; color: ${a}; }
            .gr-overall {
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 4px;
            }
            .gr-overall-score {
              font-size: 36px;
              font-weight: 700;
              color: ${s};
              line-height: 1;
            }
            .gr-overall-stars { font-size: 18px; }
            .gr-overall-count { font-size: 11px; color: ${a}; }
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
              background: ${y};
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
            .gr-author { font-size: 14px; font-weight: 500; color: ${s}; }
            .gr-date { font-size: 11px; color: ${a}; margin-top: 1px; }
            .gr-stars { font-size: 15px; letter-spacing: 1px; }
            .gr-text {
              font-size: 13px;
              color: ${a};
              line-height: 1.6;
              display: -webkit-box;
              -webkit-line-clamp: 4;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }
            .gr-branding { text-align: center; margin-top: 16px; font-size: 10px; }
            .gr-branding a { color: ${a}; text-decoration: none; opacity: 0.6; }
          </style>
          <div class="gr-wrap">
            ${e.show_header!==!1&&d?`
            <div class="gr-header">
              <div>
                <div class="gr-place-name">${d.name}</div>
                <div class="gr-place-address">${d.address||""}</div>
                ${e.write_review_link&&d.google_url?`
                  <a href="${d.google_url}"
                     class="gr-write-link"
                     target="_blank"
                     rel="noopener noreferrer">Write a review \u2197</a>`:""}
              </div>
              ${e.show_overall_rating!==!1?`
              <div class="gr-overall">
                <div class="gr-overall-score">${d.overall_rating}</div>
                <div class="gr-overall-stars">${M(Math.round(d.overall_rating))}</div>
                <div class="gr-overall-count">${d.total_reviews} reviews</div>
                <div class="gr-google-badge">
                  <span class="gr-google-logo">G</span>
                  <span style="font-size:11px;color:${a}">Google Reviews</span>
                </div>
              </div>`:""}
            </div>`:""}
            <div class="gr-grid">${u}</div>
            ${b?`
              <div class="gr-branding">
                <a href="${r}" target="_blank" rel="noopener noreferrer">
                  Powered by Devixus Widgets
                </a>
              </div>`:""}
          </div>
        `}).catch(()=>{let g=t.querySelector(".gr-loading");g&&(g.textContent="Failed to load reviews")})}function Y(t,e,b,r){var u;let p=e.theme||"light",i=E(p),l=e.bg_color||i.bg,s=e.text_color||i.text,a=e.accent_color||"#ff6914",y=e.title||"Offer ends in",m=e.style||"blocks",$=e.font_family==="mono"?"'Courier New', monospace":e.font_family==="serif"?"Georgia, 'Times New Roman', serif":"-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",v=(u={colon:":",slash:"/",dot:"\xB7",none:""}[e.separator_style||"colon"])!=null?u:":",w=e.expire_action||"message";function g(){let o=new Date(e.target_date+"T"+(e.target_time||"00:00")).getTime(),n=Date.now(),h=o-n;return h<=0?null:{days:Math.floor(h/(1e3*60*60*24)),hours:Math.floor(h%(1e3*60*60*24)/(1e3*60*60)),minutes:Math.floor(h%(1e3*60*60)/(1e3*60)),seconds:Math.floor(h%(1e3*60)/1e3)}}function d(o){return String(o).padStart(2,"0")}function z(){let o=g();if(!o){if(w==="hide"){t.innerHTML="";return}let _=e.expired_message||"This offer has ended";if(w==="redirect"&&e.redirect_url&&(window.location.href=e.redirect_url),w==="nothing")return;t.innerHTML=`
          <style>
            .ct-wrap {
              font-family: ${$};
              background: ${l};
              padding: 24px;
              text-align: center;
              color: ${s};
              border-radius: 8px;
            }
            .ct-expired { font-size: 18px; font-weight: 500; }
          </style>
          <div class="ct-wrap">
            <div class="ct-expired">${_}</div>
          </div>
        `;return}let n=[];e.show_days!==!1&&n.push({value:d(o.days),label:"Days"}),e.show_hours!==!1&&n.push({value:d(o.hours),label:"Hours"}),e.show_minutes!==!1&&n.push({value:d(o.minutes),label:"Minutes"}),e.show_seconds!==!1&&n.push({value:d(o.seconds),label:"Seconds"});let h=m==="blocks"?`
        .ct-unit {
          background: ${a};
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
          color: ${a};
          line-height: 1;
          font-variant-numeric: tabular-nums;
          background: ${l};
          border: 2px solid ${a};
          border-radius: 8px;
          padding: 8px 16px;
          min-width: 80px;
          text-align: center;
        }
        .ct-label {
          font-size: 11px;
          color: ${s};
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
          color: ${a};
          line-height: 1;
          font-variant-numeric: tabular-nums;
        }
        .ct-label {
          font-size: 11px;
          color: ${s};
          opacity: 0.6;
          text-transform: uppercase;
          letter-spacing: .05em;
        }
      `,k=n.map(_=>`
        <div class="ct-unit">
          <div class="ct-value">${_.value}</div>
          ${e.show_labels!==!1?`<div class="ct-label">${_.label}</div>`:""}
        </div>
      `).join(m==="minimal"?`<div class="ct-sep">${v}</div>`:"");t.innerHTML=`
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          .ct-wrap {
            font-family: ${$};
            background: ${l};
            padding: 24px 20px;
            border-radius: 8px;
            text-align: center;
            color: ${s};
          }
          .ct-title {
            font-size: 16px;
            font-weight: 500;
            margin-bottom: 16px;
            color: ${s};
          }
          .ct-units {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            flex-wrap: wrap;
          }
          ${h}
          .ct-sep {
            font-size: 36px;
            font-weight: 700;
            color: ${a};
            margin-bottom: 16px;
          }
          .ct-branding {
            margin-top: 16px;
            font-size: 10px;
          }
          .ct-branding a {
            color: ${s};
            opacity: 0.4;
            text-decoration: none;
          }
        </style>
        <div class="ct-wrap">
          ${y?`<div class="ct-title">${y}</div>`:""}
          <div class="ct-units">${k}</div>
          ${b?`
            <div class="ct-branding">
              <a href="${r}" target="_blank" rel="noopener noreferrer">
                Powered by Devixus Widgets
              </a>
            </div>`:""}
        </div>
      `}z();let M=setInterval(()=>{let o=g();if(!o){clearInterval(M),z();return}let n=t.querySelectorAll(".ct-value"),h=[];e.show_days!==!1&&h.push(d(o.days)),e.show_hours!==!1&&h.push(d(o.hours)),e.show_minutes!==!1&&h.push(d(o.minutes)),e.show_seconds!==!1&&h.push(d(o.seconds)),n.forEach((k,_)=>{h[_]&&(k.textContent=h[_])})},1e3)}function G(t,e,b,r){let p=e.message||"\u{1F389} Welcome to our website!",i=e.bg_color||"#ff6914",l=e.text_color||"#ffffff",s=e.link_color||"#ffffff",a=e.position||"top",y=e.is_sticky!==!1,m=e.show_close_button!==!1,$=e.show_emoji?e.emoji||"\u{1F389}":"",f=e.style||"solid",v=i;f==="gradient"?v=`linear-gradient(135deg, ${i}, ${i}dd)`:f==="striped"&&(v=`repeating-linear-gradient(
        45deg,
        ${i},
        ${i} 10px,
        ${i}ee 10px,
        ${i}ee 20px
      )`);let w=y?`position: fixed; ${a}: 0; left: 0; right: 0; z-index: 999999;`:"position: relative;";if(t.innerHTML=`
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .ab-bar {
          ${w}
          background: ${v};
          color: ${l};
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
        .ab-message { color: ${l}; font-weight: 500; }
        .ab-link {
          color: ${s};
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
          color: ${l};
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
        .ab-branding a { color: ${l}; opacity: 0.4; text-decoration: none; }
      </style>
      <div class="ab-bar" id="ab-bar">
        <div class="ab-content">
          ${$?`<span>${$}</span>`:""}
          <span class="ab-message">${p}</span>
          ${e.link_text&&e.link_url?`
            <a class="ab-link"
               href="${e.link_url}"
               target="_blank"
               rel="noopener noreferrer">
              ${e.link_text} \u2192
            </a>
          `:""}
        </div>
        ${b?`
          <div class="ab-branding">
            <a href="${r}" target="_blank" rel="noopener noreferrer">Devixus</a>
          </div>`:""}
        ${m?`
          <button class="ab-close" id="ab-close" aria-label="Close">\u2715</button>
        `:""}
      </div>
    `,m){let g=t.getElementById("ab-close"),d=t.getElementById("ab-bar");g&&d&&g.addEventListener("click",()=>{d.style.display="none"})}}function V(t,e,b){let r=`${b}/dashboard/billing`;t.innerHTML=`
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
          <a href="${r}"
             target="_blank"
             class="dv-btn">
            Upgrade plan \u2192
          </a>
          <div class="dv-powered">
            <a href="${b}" target="_blank">
              Powered by Devixus Widgets
            </a>
          </div>
        </div>
      </div>
    `}function K(t,e){try{let b=window.location.hostname,r=JSON.stringify({widget_id:t,domain:b,event_type:"load"});navigator.sendBeacon?navigator.sendBeacon(`${e}/api/track`,new Blob([r],{type:"application/json"})):fetch(`${e}/api/track`,{method:"POST",body:r,headers:{"Content-Type":"application/json"},keepalive:!0}).catch(()=>{})}catch(b){}}function J(t,e,b,r,p){let i=e.theme||"light",l=E(i),s=l.bg,a=l.text,y=l.muted,m=l.card,$=l.border,f=e.accent_color||"#6366f1",v=e.border_radius||8,w=e.display_mode==="popup",g=e.title||"Contact Us",d=e.subtitle||"Send us a message and we'll get back to you.",z=e.button_text||"Send Message",M=e.success_message||"Thank you! We'll be in touch soon.",u=e.fields||{name:!0,email:!0,phone:!1,subject:!1,message:!0},o=e.required_fields||{name:!0,email:!0,message:!0};function n(x){return`
        <div class="cf-form-wrap" id="${x}">
          <div class="cf-header">
            <h3 class="cf-title">${g}</h3>
            ${d?`<p class="cf-subtitle">${d}</p>`:""}
          </div>
          <form class="cf-form" id="cf-form-${p}">
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
            <div class="cf-field" id="cf-error-${p}" style="display:none">
              <p class="cf-error-msg"></p>
            </div>
            <button type="submit" class="cf-btn">${z}</button>
          </form>
          <div class="cf-success" id="cf-success-${p}" style="display:none">
            <div class="cf-success-icon">\u2713</div>
            <p class="cf-success-msg">${M}</p>
          </div>
          ${b?`
            <div class="cf-branding">
              <a href="${r}" target="_blank" rel="noopener noreferrer">
                Powered by Devixus Widgets
              </a>
            </div>`:""}
        </div>
      `}let h=w?`
      <div>
        <button class="cf-trigger" id="cf-trigger">
          ${e.trigger_text||"\u2709 Contact Us"}
        </button>
        <div class="cf-popup-overlay" id="cf-popup" style="display:none">
          <div class="cf-popup-box">
            <button class="cf-popup-close" id="cf-popup-close">\u2715</button>
            ${n("cf-popup-form")}
          </div>
        </div>
      </div>
    `:n("cf-inline-form");if(t.innerHTML=`
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .cf-trigger {
          background: ${f};
          color: white;
          border: none;
          padding: 12px 20px;
          border-radius: ${v}px;
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
          background: ${s};
          border-radius: ${v+4}px;
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
          color: ${y};
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
          background: ${s};
          padding: ${w?"0":"24px"};
          border-radius: ${v}px;
          color: ${a};
        }
        .cf-header { margin-bottom: 20px; }
        .cf-title {
          font-size: 20px;
          font-weight: 600;
          color: ${a};
          margin-bottom: 6px;
        }
        .cf-subtitle {
          font-size: 13px;
          color: ${y};
          line-height: 1.5;
        }
        .cf-form { display: flex; flex-direction: column; gap: 14px; }
        .cf-field { display: flex; flex-direction: column; gap: 5px; }
        .cf-label { font-size: 13px; font-weight: 500; color: ${a}; }
        .cf-req { color: #ef4444; }
        .cf-input, .cf-textarea {
          background: ${m};
          border: 1px solid ${$};
          border-radius: ${v-2}px;
          padding: 10px 12px;
          font-size: 14px;
          color: ${a};
          font-family: inherit;
          outline: none;
          transition: border-color .2s;
          width: 100%;
        }
        .cf-input:focus, .cf-textarea:focus { border-color: ${f}; }
        .cf-textarea { resize: vertical; }
        .cf-btn {
          background: ${f};
          color: white;
          border: none;
          padding: 12px 20px;
          border-radius: ${v-2}px;
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
          color: ${a};
          font-family: -apple-system, sans-serif;
        }
        .cf-branding { text-align: center; margin-top: 16px; font-size: 10px; }
        .cf-branding a { color: ${y}; text-decoration: none; opacity: 0.6; }
      </style>
      ${h}
    `,w){let x=t.getElementById("cf-trigger"),c=t.getElementById("cf-popup"),S=t.getElementById("cf-popup-close");x==null||x.addEventListener("click",()=>{c&&(c.style.display="flex")}),S==null||S.addEventListener("click",()=>{c&&(c.style.display="none")}),c==null||c.addEventListener("click",j=>{j.target===c&&(c.style.display="none")})}let k=t.getElementById(`cf-form-${p}`),_=t.getElementById(`cf-success-${p}`),L=t.getElementById(`cf-error-${p}`);k==null||k.addEventListener("submit",async x=>{x.preventDefault();let c=k.querySelector(".cf-btn");c&&(c.disabled=!0,c.textContent="Sending...");let S=new FormData(k);try{if((await fetch(`${r}/api/contact-submit`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({widget_id:p,name:S.get("name"),email:S.get("email"),phone:S.get("phone"),subject:S.get("subject"),message:S.get("message")})})).ok)k.style.display="none",_&&(_.style.display="block");else throw new Error("Failed")}catch(j){c&&(c.disabled=!1,c.textContent=z);let C=L==null?void 0:L.querySelector(".cf-error-msg");C&&(C.textContent="Failed to send. Please try again."),L&&(L.style.display="block")}})}function X(t,e,b,r){var M;let p=e.theme||"light",i=e.style||"filled",l=e.size||"medium",s=e.layout||"horizontal",a=e.show_labels!==!1,y=e.animation||"hover_grow",m=(M=e.border_radius)!=null?M:50,$={small:{btn:"36px",icon:"18px",font:"12px"},medium:{btn:"44px",icon:"22px",font:"13px"},large:{btn:"56px",icon:"28px",font:"14px"}},f=$[l]||$.medium,v=e.networks||{},w={facebook:{label:"Facebook",color:"#1877F2",icon:"f"},instagram:{label:"Instagram",color:"#E4405F",icon:"\u{1F4F7}"},twitter:{label:"Twitter / X",color:"#000000",icon:"X"},tiktok:{label:"TikTok",color:"#000000",icon:"\u266A"},youtube:{label:"YouTube",color:"#FF0000",icon:"\u25B6"},linkedin:{label:"LinkedIn",color:"#0A66C2",icon:"in"},pinterest:{label:"Pinterest",color:"#E60023",icon:"P"},whatsapp:{label:"WhatsApp",color:"#25D366",icon:"\u{1F4AC}"}},g=Object.entries(v).filter(([,u])=>u).map(([u,o])=>{let n=w[u];if(!n)return"";let h=i==="filled"?`background: ${n.color}; color: white; border: none;`:i==="outline"?`background: transparent; color: ${n.color}; border: 2px solid ${n.color};`:`background: transparent; color: ${n.color}; border: none;`,k=e.label_type==="follow_us"?"Follow us":e.label_type==="custom"&&e.custom_label||n.label;return`
          <a href="${o}"
             target="_blank"
             rel="noopener noreferrer"
             class="sf-btn sf-${u}"
             aria-label="${n.label}"
             style="${h}">
            <span class="sf-icon">${n.icon}</span>
            ${a?`<span class="sf-label">${k}</span>`:""}
          </a>
        `}).join(""),d=s==="horizontal"?"flex-direction: row; flex-wrap: wrap;":s==="vertical"?"flex-direction: column;":"display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));",z=y==="hover_grow"?".sf-btn:hover { transform: scale(1.08); }":y==="hover_bounce"?`.sf-btn:hover { animation: sfbounce .3s ease; }
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
          ${d}
          gap: 10px;
          align-items: center;
        }
        .sf-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          height: ${f.btn};
          padding: 0 ${a?"14px":"0"};
          ${a?"":`width: ${f.btn};`}
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
        ${z}
        .sf-branding { width: 100%; text-align: center; margin-top: 8px; font-size: 10px; }
        .sf-branding a { color: #999; text-decoration: none; opacity: 0.6; }
      </style>
      <div class="sf-wrap">
        ${g}
        ${b?`
          <div class="sf-branding">
            <a href="${r}" target="_blank" rel="noopener noreferrer">
              Powered by Devixus Widgets
            </a>
          </div>`:""}
      </div>
    `}function Q(t,e,b,r){let p=e.theme||"light",i=E(p),l=i.bg,s=i.text,a=i.muted,y=e.columns||3,m=e.layout||"grid",$=e.border_radius==="round"?"50%":e.border_radius||"8px",f=e.gap||"8px",v=e.num_posts||9,w=e.show_likes!==!1,g=!!e.show_caption,d=e.show_video_icon!==!1,z=e.link_behavior||"instagram",M=e.username||"";if(t.innerHTML=`
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .ig-wrap {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: ${l};
          padding: 20px;
          color: ${s};
        }
        .ig-loading { text-align: center; padding: 40px; color: ${a}; font-size: 14px; }
      </style>
      <div class="ig-wrap"><div class="ig-loading">Loading Instagram posts...</div></div>
    `,!M){let o=t.querySelector(".ig-wrap");o&&(o.innerHTML=`<div class="ig-loading" style="color:${a}">No Instagram username configured</div>`);return}function u(o){return o>=1e6?`${(o/1e6).toFixed(1)}M`:o>=1e3?`${(o/1e3).toFixed(1)}K`:String(o)}fetch(`${r}/api/widgets/instagram?username=${encodeURIComponent(M)}`).then(o=>o.json()).then(o=>{if(!o||!o.posts)return;let h=o.posts.slice(0,v).map(c=>{let S=z==="instagram"?`https://www.instagram.com/${M}/`:"#";return`
            <div class="ig-post" style="cursor:${z==="none"?"default":"pointer"}" data-href="${S}" data-behavior="${z}">
              <div class="ig-thumb-wrap">
                <img src="${c.thumbnail}" alt="" class="ig-thumb" loading="lazy" />
                ${c.type==="video"&&d?'<div class="ig-video-icon">\u25B6</div>':""}
                ${w?`
                  <div class="ig-overlay">
                    <span class="ig-stat">\u2665 ${u(c.likes)}</span>
                    <span class="ig-stat">\u{1F4AC} ${c.comments}</span>
                  </div>`:""}
              </div>
              ${g?`<p class="ig-caption">${c.caption}</p>`:""}
            </div>
          `}).join(""),k=m==="grid"?`display: grid; grid-template-columns: repeat(${y}, 1fr); gap: ${f};`:m==="carousel"?`display: flex; gap: ${f}; overflow-x: auto; scrollbar-width: none;`:`column-count: ${y}; column-gap: ${f};`,_=m==="masonry"?`break-inside: avoid; margin-bottom: ${f};`:m==="carousel"?`flex: 0 0 ${Math.floor(280/y)}px;`:"",L=m!=="masonry"?"padding-top: 100%;":"",x=m!=="masonry"?"position: absolute; top: 0; left: 0; width: 100%; height: 100%;":"width: 100%; display: block;";t.innerHTML=`
          <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            .ig-wrap {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              background: ${l};
              padding: 20px;
            }
            .ig-header {
              display: flex;
              align-items: center;
              gap: 12px;
              padding-bottom: 16px;
              margin-bottom: 16px;
              border-bottom: 1px solid ${p==="dark"?"#333":"#eee"};
            }
            .ig-avatar { width: 48px; height: 48px; border-radius: 50%; object-fit: cover; }
            .ig-name { font-size: 15px; font-weight: 600; color: ${s}; }
            .ig-bio { font-size: 12px; color: ${a}; margin-top: 2px; }
            .ig-followers { margin-left: auto; text-align: right; }
            .ig-followers-num { font-size: 14px; font-weight: 700; color: ${s}; }
            .ig-followers-label { font-size: 11px; color: ${a}; }
            .ig-grid { ${k} }
            .ig-grid::-webkit-scrollbar { display: none; }
            .ig-post { ${_} position: relative; }
            .ig-thumb-wrap {
              position: relative;
              overflow: hidden;
              border-radius: ${$};
              ${L}
              background: #eee;
            }
            .ig-thumb {
              ${x}
              object-fit: cover;
              transition: transform 0.3s ease;
            }
            .ig-post:hover .ig-thumb { transform: scale(1.05); }
            .ig-video-icon {
              position: absolute;
              top: 8px; right: 8px;
              background: rgba(0,0,0,0.6);
              color: white;
              width: 22px; height: 22px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 9px;
            }
            .ig-overlay {
              position: absolute;
              inset: 0;
              background: rgba(0,0,0,0.5);
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 16px;
              opacity: 0;
              transition: opacity 0.2s;
              border-radius: ${$};
            }
            .ig-post:hover .ig-overlay { opacity: 1; }
            .ig-stat { color: white; font-size: 13px; font-weight: 600; }
            .ig-caption {
              font-size: 11px;
              color: ${a};
              padding: 5px 3px 2px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .ig-footer { text-align: center; margin-top: 16px; font-size: 10px; }
            .ig-footer a { color: ${a}; text-decoration: none; opacity: 0.6; }
          </style>
          <div class="ig-wrap">
            <div class="ig-header">
              <img src="${o.profile_picture}" alt="@${o.username}" class="ig-avatar" />
              <div>
                <div class="ig-name">@${o.username}</div>
                <div class="ig-bio">${o.bio||""}</div>
              </div>
              <div class="ig-followers">
                <div class="ig-followers-num">${u(o.followers)}</div>
                <div class="ig-followers-label">followers</div>
              </div>
            </div>
            <div class="ig-grid">${h}</div>
            ${b?`
              <div class="ig-footer">
                <a href="${r}" target="_blank" rel="noopener noreferrer">\u{1F4F8} Powered by Devixus Widgets</a>
              </div>`:""}
          </div>
        `,z!=="none"&&t.querySelectorAll(".ig-post").forEach(c=>{let S=c.dataset.href;S&&S!=="#"&&c.addEventListener("click",()=>{window.open(S,"_blank","noopener noreferrer")})})}).catch(()=>{let o=t.querySelector(".ig-loading");o&&(o.textContent="Failed to load Instagram posts")})}function Z(t,e,b,r){let p=e.theme||"light",i=E(p),l=i.bg,s=i.text,a=i.muted,y=i.card,m=e.columns||3,$=e.layout||"grid",f=e.border_radius==="round"?"50%":e.border_radius||"8px",v=e.gap||"8px",w=e.num_videos||9,g=e.show_duration!==!1,d=e.show_view_count!==!1,z=!!e.show_caption,M=e.show_like_count!==!1,u=e.username||"";if(t.innerHTML=`
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .tt-wrap {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: ${l};
          padding: 20px;
        }
        .tt-loading { text-align: center; padding: 40px; color: ${a}; font-size: 14px; }
      </style>
      <div class="tt-wrap"><div class="tt-loading">Loading TikTok videos...</div></div>
    `,!u){let n=t.querySelector(".tt-wrap");n&&(n.innerHTML='<div class="tt-loading">No TikTok username configured</div>');return}function o(n){return n>=1e6?`${(n/1e6).toFixed(1)}M`:n>=1e3?`${(n/1e3).toFixed(1)}K`:String(n)}fetch(`${r}/api/widgets/tiktok?username=${encodeURIComponent(u)}`).then(n=>n.json()).then(n=>{if(!n||!n.videos)return;let h=n.videos.slice(0,w),k=`https://www.tiktok.com/@${u}`,_=h.map(x=>{if($==="list")return`
              <a class="tt-list-item" href="${k}" target="_blank" rel="noopener noreferrer">
                <div class="tt-list-thumb">
                  <img src="${x.thumbnail}" alt="" class="tt-list-img" loading="lazy" />
                  ${g?`<div class="tt-duration">${x.duration}</div>`:""}
                </div>
                <div class="tt-list-info">
                  ${z?`<p class="tt-list-caption">${x.caption}</p>`:""}
                  <div class="tt-list-stats">
                    ${d?`<span class="tt-stat">\u{1F441} ${o(x.views)}</span>`:""}
                    ${M?`<span class="tt-stat">\u2665 ${o(x.likes)}</span>`:""}
                  </div>
                </div>
              </a>
            `;let c=g?"36px":"6px";return`
            <a class="tt-card" href="${k}" target="_blank" rel="noopener noreferrer">
              <div class="tt-thumb-wrap">
                <img src="${x.thumbnail}" alt="" class="tt-thumb" loading="lazy" />
                <div class="tt-play-icon">\u25B6</div>
                ${g?`<div class="tt-duration">${x.duration}</div>`:""}
                ${d?`<div class="tt-views" style="bottom:${c}">\u{1F441} ${o(x.views)}</div>`:""}
              </div>
              ${M?`<div class="tt-card-footer"><span class="tt-likes">\u2665 ${o(x.likes)}</span></div>`:""}
              ${z?`<p class="tt-caption">${x.caption}</p>`:""}
            </a>
          `}).join(""),L=$==="grid"?`display: grid; grid-template-columns: repeat(${m}, 1fr); gap: ${v};`:$==="carousel"?`display: flex; gap: ${v}; overflow-x: auto; scrollbar-width: none;`:`display: flex; flex-direction: column; gap: ${v};`;t.innerHTML=`
          <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            .tt-wrap {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              background: ${l};
              padding: 20px;
            }
            .tt-header {
              display: flex;
              align-items: center;
              gap: 12px;
              padding-bottom: 16px;
              margin-bottom: 16px;
              border-bottom: 1px solid ${p==="dark"?"#333":"#eee"};
            }
            .tt-avatar { width: 48px; height: 48px; border-radius: 50%; object-fit: cover; }
            .tt-display-name { font-size: 15px; font-weight: 600; color: ${s}; }
            .tt-handle { font-size: 12px; color: ${a}; margin-top: 2px; }
            .tt-header-stats { margin-left: auto; display: flex; gap: 20px; }
            .tt-hstat { text-align: center; }
            .tt-hstat-num { font-size: 14px; font-weight: 700; color: ${s}; }
            .tt-hstat-label { font-size: 11px; color: ${a}; }
            .tt-grid { ${L} }
            .tt-grid::-webkit-scrollbar { display: none; }
            .tt-card {
              text-decoration: none;
              color: ${s};
              display: block;
              border-radius: ${f};
              overflow: hidden;
              background: ${y};
              transition: transform 0.2s;
              ${$==="carousel"?`flex: 0 0 ${Math.floor(280/m)}px;`:""}
            }
            .tt-card:hover { transform: scale(1.02); }
            .tt-thumb-wrap {
              position: relative;
              padding-top: 177.78%;
              overflow: hidden;
              background: #000;
            }
            .tt-thumb {
              position: absolute;
              top: 0; left: 0;
              width: 100%; height: 100%;
              object-fit: cover;
            }
            .tt-play-icon {
              position: absolute;
              bottom: 6px; left: 6px;
              background: rgba(0,0,0,0.5);
              color: white;
              width: 22px; height: 22px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 9px;
            }
            .tt-duration {
              position: absolute;
              bottom: 6px; right: 6px;
              background: rgba(0,0,0,0.7);
              color: white;
              font-size: 10px;
              padding: 2px 5px;
              border-radius: 3px;
              font-weight: 600;
            }
            .tt-views {
              position: absolute;
              right: 6px;
              background: rgba(0,0,0,0.6);
              color: white;
              font-size: 10px;
              padding: 2px 5px;
              border-radius: 3px;
            }
            .tt-card-footer { padding: 5px 8px; }
            .tt-likes { font-size: 11px; color: ${a}; }
            .tt-caption {
              font-size: 11px;
              color: ${a};
              padding: 0 8px 7px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .tt-list-item {
              display: flex;
              gap: 12px;
              text-decoration: none;
              color: ${s};
              padding: 10px;
              border-radius: ${f};
              background: ${y};
              transition: opacity 0.2s;
              align-items: flex-start;
            }
            .tt-list-item:hover { opacity: 0.85; }
            .tt-list-thumb { position: relative; flex-shrink: 0; }
            .tt-list-img {
              width: 64px; height: 114px;
              object-fit: cover;
              border-radius: 6px;
              display: block;
            }
            .tt-list-info {
              flex: 1;
              min-width: 0;
              display: flex;
              flex-direction: column;
              justify-content: center;
              gap: 6px;
            }
            .tt-list-caption {
              font-size: 13px;
              color: ${s};
              line-height: 1.4;
              display: -webkit-box;
              -webkit-line-clamp: 3;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }
            .tt-list-stats { display: flex; gap: 12px; flex-wrap: wrap; }
            .tt-stat { font-size: 11px; color: ${a}; }
            .tt-footer { text-align: center; margin-top: 16px; font-size: 10px; }
            .tt-footer a { color: ${a}; text-decoration: none; opacity: 0.6; }
          </style>
          <div class="tt-wrap">
            <div class="tt-header">
              <img src="${n.avatar}" alt="@${n.username}" class="tt-avatar" />
              <div>
                <div class="tt-display-name">${n.display_name}</div>
                <div class="tt-handle">@${n.username}</div>
              </div>
              <div class="tt-header-stats">
                <div class="tt-hstat">
                  <div class="tt-hstat-num">${o(n.followers)}</div>
                  <div class="tt-hstat-label">Followers</div>
                </div>
                <div class="tt-hstat">
                  <div class="tt-hstat-num">${o(n.likes)}</div>
                  <div class="tt-hstat-label">Likes</div>
                </div>
              </div>
            </div>
            <div class="tt-grid">${_}</div>
            ${b?`
              <div class="tt-footer">
                <a href="${r}" target="_blank" rel="noopener noreferrer">Powered by Devixus Widgets</a>
              </div>`:""}
          </div>
        `}).catch(()=>{let n=t.querySelector(".tt-loading");n&&(n.textContent="Failed to load TikTok videos")})}function ee(t,e,b){switch(e.type){case"whatsapp":P(t,e.config,e.show_branding);break;case"testimonials":W(t,e.config,e.show_branding);break;case"youtube_feed":N(t,e.config,e.show_branding,T);break;case"google_reviews":O(t,e.config,e.show_branding,T);break;case"countdown_timer":Y(t,e.config,e.show_branding,T);break;case"announcement_bar":G(t,e.config,e.show_branding,T);break;case"contact_form":J(t,e.config,e.show_branding,T,b);break;case"social_follow":X(t,e.config,e.show_branding,T);break;case"instagram_feed":Q(t,e.config,e.show_branding,T);break;case"tiktok_feed":Z(t,e.config,e.show_branding,T);break;default:console.warn(`[Devixus] Unknown widget type: ${e.type}`)}}function te(t){var r,p;let e=document.createElement("div");e.style.cssText=['position:relative;z-index:9999;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;',"background:#0f172a;color:#f1f5f9;display:flex;align-items:center;gap:12px;","padding:8px 14px;font-size:12px;border-radius:8px 8px 0 0;"].join("");let b=`${T}/dashboard/widgets/${t}`;return e.innerHTML=`
      <span style="color:#64748b;font-size:11px;white-space:nowrap;">Panel only seen by widget owner</span>
      <a href="${b}" target="_blank" rel="noopener noreferrer"
         style="display:inline-flex;align-items:center;gap:5px;background:#3b82f6;color:white;text-decoration:none;
                padding:4px 10px;border-radius:6px;font-size:11px;font-weight:600;white-space:nowrap;
                transition:background 0.15s;">
        \u270F Edit widget
      </a>
    `,(r=e.querySelector("a"))==null||r.addEventListener("mouseenter",i=>{i.currentTarget.style.background="#2563eb"}),(p=e.querySelector("a"))==null||p.addEventListener("mouseleave",i=>{i.currentTarget.style.background="#3b82f6"}),e}async function oe(t){try{let e=await fetch(`${T}/api/widgets/${t}/owner-check`,{credentials:"include",signal:AbortSignal.timeout(3e3)});return e.ok?(await e.json()).isOwner===!0:!1}catch(e){return!1}}async function H(){var b;if(!I)return;let t=I.getAttribute("data-widget-id");if(!t){console.warn("[Devixus] Missing data-widget-id attribute on script tag");return}let e=I.getAttribute("data-mount")||null;try{let r=await A(t),p=e&&document.querySelector(e)||document.body;if(r.limit_reached){let s=B(p);V(s,r,T);return}let[i]=await Promise.all([oe(t),Promise.resolve()]),l=B(p);if(i){let s=te(t);l.host.before(s)}if(ee(l,r,t),(b=r.config)!=null&&b.custom_css){let s=document.createElement("style");s.textContent=r.config.custom_css,setTimeout(()=>l.appendChild(s),100)}K(t,T)}catch(r){console.warn("[Devixus] Widget failed to load:",r)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",H):H()})();})();

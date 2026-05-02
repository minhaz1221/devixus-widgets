"use strict";(()=>{(function(){"use strict";let C=document.currentScript||(()=>{let t=document.getElementsByTagName("script");return t[t.length-1]||null})(),T=(()=>{try{let t=C==null?void 0:C.src;if(t)return new URL(t).origin}catch(t){}return"https://devixus-widgets-web.vercel.app"})(),F="https://devixus-widgets-marketing.vercel.app";async function B(t){let e=await fetch(`${T}/api/widget/${t}`,{method:"GET",headers:{"Content-Type":"application/json"}});if(!e.ok)throw new Error(`Widget not found: ${t}`);return e.json()}function I(t){let e=document.createElement("div");return e.setAttribute("data-devixus-widget","true"),e.style.cssText="all: initial; display: block;",t.appendChild(e),e.attachShadow({mode:"open"})}function H(t,e,u){let p=e.phone_number||"",i=encodeURIComponent(e.welcome_message||"Hello!"),r=e.button_color||"#25D366",s=e.position||"bottom-right",h={small:44,medium:56,large:68}[e.button_size||"medium"]||56,f=Math.round(h*.54),y=!!e.pulse_animation,v=e.open_in==="same_tab"?"_self":"_blank",x=e.tooltip_text||"",$=s==="bottom-right"?"bottom: 24px; right: 24px;":"bottom: 24px; left: 24px;",g=s==="bottom-right"?"flex-end":"flex-start";t.innerHTML=`
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .wa-btn {
          position: fixed;
          ${$}
          z-index: 9999;
          display: flex;
          flex-direction: column;
          align-items: ${g};
          gap: 6px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        .wa-bubble-wrap { position: relative; display: inline-flex; }
        .wa-bubble {
          width: ${h}px;
          height: ${h}px;
          border-radius: 50%;
          background: ${r};
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
          width: ${f}px;
          height: ${f}px;
          fill: white;
        }
        ${y?`
        @keyframes wa-pulse {
          0% { transform: scale(.85); opacity: 0; }
          50% { opacity: .4; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        .wa-bubble::before {
          content: '';
          position: absolute;
          border-radius: 50%;
          background: ${r};
          width: 100%; height: 100%;
          animation: wa-pulse 2s ease infinite;
          z-index: -1;
        }`:""}
        ${x?`
        .wa-tooltip {
          position: absolute;
          bottom: calc(100% + 8px);
          ${s==="bottom-right"?"right: 0;":"left: 0;"}
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
          ${x?`<div class="wa-tooltip">${x}</div>`:""}
          <a class="wa-bubble"
             href="https://wa.me/${p}?text=${i}"
             target="${v}"
             rel="noopener noreferrer"
             aria-label="Chat on WhatsApp">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </a>
        </div>
        ${u?`<a class="wa-branding" href="${F}" target="_blank" rel="noopener noreferrer">Powered by Devixus</a>`:""}
      </div>
    `}function U(t,e,u){var k,M;let p=e.testimonials||[],i=e.theme||"light",r=e.show_rating!==!1,s=e.layout||"slider",n=e.columns||2,h=e.show_arrows!==!1,f=!!e.show_dots,y=!!e.show_quote_icon,v=e.avatar_shape||"circle",x=e.card_shadow||"none",$=i==="dark"?"#1a1a1a":"#ffffff",g=i==="dark"?"#ffffff":"#1a1a1a",d=i==="dark"?"#aaaaaa":"#666666",w=i==="dark"?"#2a2a2a":"#f9f9f9",m={none:"none",small:"0 1px 4px rgba(0,0,0,.08)",medium:"0 4px 16px rgba(0,0,0,.1)",large:"0 8px 32px rgba(0,0,0,.14)"}[x]||"none",o=v==="circle"?"50%":v==="square"?"4px":"8px",a=p.map(b=>{let c=b.rating||5,z=r?`<div class="stars">${"\u2605".repeat(c)}${"\u2606".repeat(5-c)}</div>`:"",L=b.avatar_url?`<img src="${b.avatar_url}" class="avatar" alt="${b.author}" />`:`<div class="avatar-placeholder">${b.author.charAt(0).toUpperCase()}</div>`;return`
        <div class="card">
          ${y?'<div class="quote-icon">"</div>':""}
          ${z}
          <p class="content">${b.content}</p>
          <div class="author-row">
            ${L}
            <div>
              <div class="author">${b.author}</div>
              <div class="role">${b.role||""}</div>
            </div>
          </div>
        </div>
      `}).join(""),l=s==="grid",_=l?`display: grid; grid-template-columns: repeat(${n}, 1fr); gap: 16px;`:"display: flex; gap: 16px; overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: none; -ms-overflow-style: none; padding-bottom: 8px;";if(t.innerHTML=`
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .wrap {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: ${$};
          padding: 24px 16px;
          overflow: hidden;
          position: relative;
        }
        .track { ${_} }
        .track::-webkit-scrollbar { display: none; }
        .card {
          ${l?"":"flex: 0 0 280px; scroll-snap-align: start;"}
          background: ${w};
          border-radius: 12px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          box-shadow: ${m};
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
        ${!l&&h?`
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
          background: ${$};
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          color: ${g};
          transition: background .2s;
        }
        .arrow-btn:hover { background: ${w}; }`:""}
        ${f?`
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
        <div class="track" id="t-track">${a}</div>
        ${!l&&h?`
        <div class="arrows">
          <button class="arrow-btn" id="t-prev">\u2190</button>
          <button class="arrow-btn" id="t-next">\u2192</button>
        </div>`:""}
        ${f&&p.length>0?`
        <div class="dots" id="t-dots">
          ${p.map((b,c)=>`<div class="dot${c===0?" active":""}" data-i="${c}"></div>`).join("")}
        </div>`:""}
        ${u?`<div class="branding"><a href="${F}" target="_blank" rel="noopener noreferrer">Powered by Devixus Widgets</a></div>`:""}
      </div>
    `,!l){let L=function(j){if(!b)return;let E=b.children;E[j]&&(z=j,E[j].scrollIntoView({behavior:"smooth",inline:"start",block:"nearest"}),c&&c.querySelectorAll(".dot").forEach((K,X)=>{K.classList.toggle("active",X===z)}))},b=t.getElementById("t-track"),c=f?t.getElementById("t-dots"):null,z=0;h&&((k=t.getElementById("t-prev"))==null||k.addEventListener("click",()=>{L(Math.max(0,z-1))}),(M=t.getElementById("t-next"))==null||M.addEventListener("click",()=>{L(Math.min(p.length-1,z+1))})),c&&c.querySelectorAll(".dot").forEach(j=>{j.addEventListener("click",()=>{var E;L(parseInt((E=j.dataset.i)!=null?E:"0"))})})}}function q(t,e,u,p){let i=e.theme||"light",r=i==="dark"?"#0f0f0f":"#ffffff",s=i==="dark"?"#ffffff":"#0f0f0f",n=i==="dark"?"#aaaaaa":"#606060",h=i==="dark"?"#1a1a1a":"#f9f9f9",f=e.accent_color||"#ff0000",y=e.columns||3,v=e.layout||"grid",x=e.subscribe_button_color||f,$=e.header_style||"full",g=e.show_subscriber_count!==!1;t.innerHTML=`
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .yt-wrap {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: ${r};
          padding: 20px;
          color: ${s};
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
    `;let d=e.channel_id,w=e.max_results||6,S=`${p}/api/youtube?channel_id=${d}&max_results=${w}`;fetch(S).then(m=>m.json()).then(m=>{if(!m.videos||m.videos.length===0){t.innerHTML=`
            <div style="padding:20px;text-align:center;
              color:${n};font-family:sans-serif;">
              No videos found
            </div>`;return}let o=m.channel,l=m.videos.map(k=>`
          <a class="yt-card"
             href="${k.url}"
             target="_blank"
             rel="noopener noreferrer">
            <div class="yt-thumb">
              <img src="${k.thumbnail}"
                   alt="${k.title}"
                   loading="lazy" />
              <div class="yt-play">\u25B6</div>
            </div>
            ${e.show_title!==!1?`<div class="yt-title">${k.title}</div>`:""}
            ${e.show_date!==!1?`<div class="yt-meta">${new Date(k.published_at).toLocaleDateString()}</div>`:""}
          </a>
        `).join(""),_=v==="grid"?`grid-template-columns: repeat(${y}, 1fr);`:v==="list"?"grid-template-columns: 1fr;":"grid-auto-flow: column; grid-auto-columns: 280px;";t.innerHTML=`
          <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            .yt-wrap {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              background: ${r};
              padding: 20px;
              color: ${s};
            }
            .yt-header {
              display: flex;
              align-items: center;
              gap: 12px;
              margin-bottom: 20px;
              padding-bottom: 16px;
              border-bottom: 1px solid ${i==="dark"?"#333":"#eee"};
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
              ${_}
              gap: 16px;
              ${v==="carousel"?"overflow-x: auto; scrollbar-width: none;":""}
            }
            .yt-grid::-webkit-scrollbar { display: none; }
            .yt-card {
              text-decoration: none;
              color: ${s};
              display: block;
              border-radius: 8px;
              overflow: hidden;
              background: ${h};
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
            ${o&&$!=="none"?`
            <div class="yt-header">
              ${$==="full"&&o.avatar?`<img src="${o.avatar}"
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
            <div class="yt-grid">${l}</div>
            ${u?`
              <div class="yt-branding">
                <a href="${p}"
                   target="_blank"
                   rel="noopener noreferrer">
                  Powered by Devixus Widgets
                </a>
              </div>`:""}
          </div>
        `}).catch(()=>{let m=t.querySelector(".yt-loading");m&&(m.textContent="Failed to load videos")})}function D(t,e,u,p){let i=e.theme||"light",r=i==="dark"?"#1a1a1a":"#ffffff",s=i==="dark"?"#ffffff":"#1a1a1a",n=i==="dark"?"#aaaaaa":"#666666",h=i==="dark"?"#2a2a2a":"#f9f9f9",f=e.accent_color||"#4285f4",y=e.layout||"grid";if(t.innerHTML=`
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .gr-wrap {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: ${r};
          padding: 20px;
          color: ${s};
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
    `,!e.place_id){let g=t.querySelector(".gr-wrap");g&&(g.innerHTML=`<div class="gr-loading" style="color:${n}">No business configured</div>`);return}let v=e.max_reviews||6,x=e.min_rating||1,$=`${p}/api/google-reviews?place_id=${encodeURIComponent(e.place_id)}&max_reviews=${v}&min_rating=${x}`;fetch($).then(g=>g.json()).then(g=>{if(!g.reviews||g.reviews.length===0){t.innerHTML=`
            <div style="padding:20px;text-align:center;
              color:${n};font-family:sans-serif;background:${r};">
              No reviews found
            </div>`;return}let d=g.place,w=g.reviews;function S(a){return Array.from({length:5},(l,_)=>`<span style="color:${_<a?"#fbbc04":"#dadce0"}">\u2605</span>`).join("")}let m=w.map(a=>`
          <div class="gr-card">
            <div class="gr-card-header">
              ${e.show_reviewer_photo!==!1&&a.author_photo?`<img src="${a.author_photo}" class="gr-avatar" alt="${a.author_name}" />`:`<div class="gr-avatar-placeholder">${a.author_name.charAt(0).toUpperCase()}</div>`}
              <div class="gr-author-info">
                <div class="gr-author">${a.author_name}</div>
                ${e.show_review_date!==!1?`<div class="gr-date">${a.relative_time}</div>`:""}
              </div>
            </div>
            <div class="gr-stars">${S(a.rating)}</div>
            ${a.text?`<p class="gr-text">${a.text}</p>`:""}
          </div>
        `).join(""),o=y==="grid"?"grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));":y==="carousel"?"grid-auto-flow: column; grid-auto-columns: 300px; overflow-x: auto;":"grid-template-columns: 1fr;";t.innerHTML=`
          <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            .gr-wrap {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              background: ${r};
              padding: 20px;
              color: ${s};
            }
            .gr-header {
              display: flex;
              align-items: flex-start;
              justify-content: space-between;
              margin-bottom: 20px;
              padding-bottom: 16px;
              border-bottom: 1px solid ${i==="dark"?"#333":"#eee"};
              flex-wrap: wrap;
              gap: 12px;
            }
            .gr-place-name {
              font-size: 18px;
              font-weight: 600;
              color: ${s};
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
              color: ${s};
              line-height: 1;
            }
            .gr-overall-stars { font-size: 18px; }
            .gr-overall-count { font-size: 11px; color: ${n}; }
            .gr-write-link {
              display: inline-block;
              margin-top: 8px;
              font-size: 12px;
              color: ${f};
              text-decoration: none;
            }
            .gr-google-badge {
              display: flex;
              align-items: center;
              gap: 6px;
              margin-top: 4px;
            }
            .gr-google-logo { font-size: 12px; font-weight: 700; color: ${f}; }
            .gr-grid {
              display: grid;
              ${o}
              gap: 16px;
              scrollbar-width: none;
            }
            .gr-grid::-webkit-scrollbar { display: none; }
            .gr-card {
              background: ${h};
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
              background: ${f};
              color: white;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 16px;
              font-weight: 600;
              flex-shrink: 0;
            }
            .gr-author { font-size: 14px; font-weight: 500; color: ${s}; }
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
                <div class="gr-overall-stars">${S(Math.round(d.overall_rating))}</div>
                <div class="gr-overall-count">${d.total_reviews} reviews</div>
                <div class="gr-google-badge">
                  <span class="gr-google-logo">G</span>
                  <span style="font-size:11px;color:${n}">Google Reviews</span>
                </div>
              </div>`:""}
            </div>`:""}
            <div class="gr-grid">${m}</div>
            ${u?`
              <div class="gr-branding">
                <a href="${p}" target="_blank" rel="noopener noreferrer">
                  Powered by Devixus Widgets
                </a>
              </div>`:""}
          </div>
        `}).catch(()=>{let g=t.querySelector(".gr-loading");g&&(g.textContent="Failed to load reviews")})}function A(t,e,u,p){var m;let i=e.theme||"light",r=e.bg_color||(i==="dark"?"#1a1a2e":"#ffffff"),s=e.text_color||(i==="dark"?"#ffffff":"#1a1a1a"),n=e.accent_color||"#ff6914",h=e.title||"Offer ends in",f=e.style||"blocks",y=e.font_family==="mono"?"'Courier New', monospace":e.font_family==="serif"?"Georgia, 'Times New Roman', serif":"-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",x=(m={colon:":",slash:"/",dot:"\xB7",none:""}[e.separator_style||"colon"])!=null?m:":",$=e.expire_action||"message";function g(){let o=new Date(e.target_date+"T"+(e.target_time||"00:00")).getTime(),a=Date.now(),l=o-a;return l<=0?null:{days:Math.floor(l/(1e3*60*60*24)),hours:Math.floor(l%(1e3*60*60*24)/(1e3*60*60)),minutes:Math.floor(l%(1e3*60*60)/(1e3*60)),seconds:Math.floor(l%(1e3*60)/1e3)}}function d(o){return String(o).padStart(2,"0")}function w(){let o=g();if(!o){if($==="hide"){t.innerHTML="";return}let k=e.expired_message||"This offer has ended";if($==="redirect"&&e.redirect_url&&(window.location.href=e.redirect_url),$==="nothing")return;t.innerHTML=`
          <style>
            .ct-wrap {
              font-family: ${y};
              background: ${r};
              padding: 24px;
              text-align: center;
              color: ${s};
              border-radius: 8px;
            }
            .ct-expired { font-size: 18px; font-weight: 500; }
          </style>
          <div class="ct-wrap">
            <div class="ct-expired">${k}</div>
          </div>
        `;return}let a=[];e.show_days!==!1&&a.push({value:d(o.days),label:"Days"}),e.show_hours!==!1&&a.push({value:d(o.hours),label:"Hours"}),e.show_minutes!==!1&&a.push({value:d(o.minutes),label:"Minutes"}),e.show_seconds!==!1&&a.push({value:d(o.seconds),label:"Seconds"});let l=f==="blocks"?`
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
      `:f==="flip"?`
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
          background: ${r};
          border: 2px solid ${n};
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
          color: ${n};
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
      `,_=a.map(k=>`
        <div class="ct-unit">
          <div class="ct-value">${k.value}</div>
          ${e.show_labels!==!1?`<div class="ct-label">${k.label}</div>`:""}
        </div>
      `).join(f==="minimal"?`<div class="ct-sep">${x}</div>`:"");t.innerHTML=`
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          .ct-wrap {
            font-family: ${y};
            background: ${r};
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
          ${l}
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
            color: ${s};
            opacity: 0.4;
            text-decoration: none;
          }
        </style>
        <div class="ct-wrap">
          ${h?`<div class="ct-title">${h}</div>`:""}
          <div class="ct-units">${_}</div>
          ${u?`
            <div class="ct-branding">
              <a href="${p}" target="_blank" rel="noopener noreferrer">
                Powered by Devixus Widgets
              </a>
            </div>`:""}
        </div>
      `}w();let S=setInterval(()=>{let o=g();if(!o){clearInterval(S),w();return}let a=t.querySelectorAll(".ct-value"),l=[];e.show_days!==!1&&l.push(d(o.days)),e.show_hours!==!1&&l.push(d(o.hours)),e.show_minutes!==!1&&l.push(d(o.minutes)),e.show_seconds!==!1&&l.push(d(o.seconds)),a.forEach((_,k)=>{l[k]&&(_.textContent=l[k])})},1e3)}function P(t,e,u,p){let i=e.message||"\u{1F389} Welcome to our website!",r=e.bg_color||"#ff6914",s=e.text_color||"#ffffff",n=e.link_color||"#ffffff",h=e.position||"top",f=e.is_sticky!==!1,y=e.show_close_button!==!1,v=e.show_emoji?e.emoji||"\u{1F389}":"",x=e.style||"solid",$=r;x==="gradient"?$=`linear-gradient(135deg, ${r}, ${r}dd)`:x==="striped"&&($=`repeating-linear-gradient(
        45deg,
        ${r},
        ${r} 10px,
        ${r}ee 10px,
        ${r}ee 20px
      )`);let g=f?`position: fixed; ${h}: 0; left: 0; right: 0; z-index: 999999;`:"position: relative;";if(t.innerHTML=`
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .ab-bar {
          ${g}
          background: ${$};
          color: ${s};
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
        .ab-message { color: ${s}; font-weight: 500; }
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
          color: ${s};
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
          right: ${y?"44px":"12px"};
          top: 50%;
          transform: translateY(-50%);
          font-size: 9px;
        }
        .ab-branding a { color: ${s}; opacity: 0.4; text-decoration: none; }
      </style>
      <div class="ab-bar" id="ab-bar">
        <div class="ab-content">
          ${v?`<span>${v}</span>`:""}
          <span class="ab-message">${i}</span>
          ${e.link_text&&e.link_url?`
            <a class="ab-link"
               href="${e.link_url}"
               target="_blank"
               rel="noopener noreferrer">
              ${e.link_text} \u2192
            </a>
          `:""}
        </div>
        ${u?`
          <div class="ab-branding">
            <a href="${p}" target="_blank" rel="noopener noreferrer">Devixus</a>
          </div>`:""}
        ${y?`
          <button class="ab-close" id="ab-close" aria-label="Close">\u2715</button>
        `:""}
      </div>
    `,y){let d=t.getElementById("ab-close"),w=t.getElementById("ab-bar");d&&w&&d.addEventListener("click",()=>{w.style.display="none"})}}function W(t,e,u){let p=`${u}/dashboard/billing`;t.innerHTML=`
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
          <a href="${p}"
             target="_blank"
             class="dv-btn">
            Upgrade plan \u2192
          </a>
          <div class="dv-powered">
            <a href="${u}" target="_blank">
              Powered by Devixus Widgets
            </a>
          </div>
        </div>
      </div>
    `}function N(t,e){try{let u=window.location.hostname,p=JSON.stringify({widget_id:t,domain:u,event_type:"load"});navigator.sendBeacon?navigator.sendBeacon(`${e}/api/track`,new Blob([p],{type:"application/json"})):fetch(`${e}/api/track`,{method:"POST",body:p,headers:{"Content-Type":"application/json"},keepalive:!0}).catch(()=>{})}catch(u){}}function Y(t,e,u,p,i){let r=e.theme||"light",s=r==="dark"?"#1a1a1a":"#ffffff",n=r==="dark"?"#ffffff":"#1a1a1a",h=r==="dark"?"#aaaaaa":"#666666",f=r==="dark"?"#2a2a2a":"#f9f9f9",y=r==="dark"?"#333":"#e5e7eb",v=e.accent_color||"#ff6914",x=e.border_radius||8,$=e.display_mode==="popup",g=e.title||"Contact Us",d=e.subtitle||"Send us a message and we'll get back to you.",w=e.button_text||"Send Message",S=e.success_message||"Thank you! We'll be in touch soon.",m=e.fields||{name:!0,email:!0,phone:!1,subject:!1,message:!0},o=e.required_fields||{name:!0,email:!0,message:!0};function a(b){return`
        <div class="cf-form-wrap" id="${b}">
          <div class="cf-header">
            <h3 class="cf-title">${g}</h3>
            ${d?`<p class="cf-subtitle">${d}</p>`:""}
          </div>
          <form class="cf-form" id="cf-form-${i}">
            ${m.name?`
              <div class="cf-field">
                <label class="cf-label">
                  Name${o.name?' <span class="cf-req">*</span>':""}
                </label>
                <input type="text" name="name" class="cf-input"
                       placeholder="Your name"
                       ${o.name?"required":""} />
              </div>`:""}
            ${m.email?`
              <div class="cf-field">
                <label class="cf-label">
                  Email${o.email?' <span class="cf-req">*</span>':""}
                </label>
                <input type="email" name="email" class="cf-input"
                       placeholder="your@email.com"
                       ${o.email?"required":""} />
              </div>`:""}
            ${m.phone?`
              <div class="cf-field">
                <label class="cf-label">
                  Phone${o.phone?' <span class="cf-req">*</span>':""}
                </label>
                <input type="tel" name="phone" class="cf-input"
                       placeholder="+1 234 567 8900"
                       ${o.phone?"required":""} />
              </div>`:""}
            ${m.subject?`
              <div class="cf-field">
                <label class="cf-label">Subject</label>
                <input type="text" name="subject" class="cf-input"
                       placeholder="What is this about?" />
              </div>`:""}
            ${m.message?`
              <div class="cf-field">
                <label class="cf-label">
                  Message${o.message?' <span class="cf-req">*</span>':""}
                </label>
                <textarea name="message" class="cf-textarea"
                          placeholder="Your message..." rows="4"
                          ${o.message?"required":""}></textarea>
              </div>`:""}
            <div class="cf-field" id="cf-error-${i}" style="display:none">
              <p class="cf-error-msg"></p>
            </div>
            <button type="submit" class="cf-btn">${w}</button>
          </form>
          <div class="cf-success" id="cf-success-${i}" style="display:none">
            <div class="cf-success-icon">\u2713</div>
            <p class="cf-success-msg">${S}</p>
          </div>
          ${u?`
            <div class="cf-branding">
              <a href="${p}" target="_blank" rel="noopener noreferrer">
                Powered by Devixus Widgets
              </a>
            </div>`:""}
        </div>
      `}let l=$?`
      <div>
        <button class="cf-trigger" id="cf-trigger">
          ${e.trigger_text||"\u2709 Contact Us"}
        </button>
        <div class="cf-popup-overlay" id="cf-popup" style="display:none">
          <div class="cf-popup-box">
            <button class="cf-popup-close" id="cf-popup-close">\u2715</button>
            ${a("cf-popup-form")}
          </div>
        </div>
      </div>
    `:a("cf-inline-form");if(t.innerHTML=`
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .cf-trigger {
          background: ${v};
          color: white;
          border: none;
          padding: 12px 20px;
          border-radius: ${x}px;
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
          border-radius: ${x+4}px;
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
          color: ${h};
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }
        .cf-popup-close:hover { background: ${f}; }
        .cf-form-wrap {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: ${s};
          padding: ${$?"0":"24px"};
          border-radius: ${x}px;
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
          color: ${h};
          line-height: 1.5;
        }
        .cf-form { display: flex; flex-direction: column; gap: 14px; }
        .cf-field { display: flex; flex-direction: column; gap: 5px; }
        .cf-label { font-size: 13px; font-weight: 500; color: ${n}; }
        .cf-req { color: #ef4444; }
        .cf-input, .cf-textarea {
          background: ${f};
          border: 1px solid ${y};
          border-radius: ${x-2}px;
          padding: 10px 12px;
          font-size: 14px;
          color: ${n};
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
          border-radius: ${x-2}px;
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
        .cf-branding a { color: ${h}; text-decoration: none; opacity: 0.6; }
      </style>
      ${l}
    `,$){let b=t.getElementById("cf-trigger"),c=t.getElementById("cf-popup"),z=t.getElementById("cf-popup-close");b==null||b.addEventListener("click",()=>{c&&(c.style.display="flex")}),z==null||z.addEventListener("click",()=>{c&&(c.style.display="none")}),c==null||c.addEventListener("click",L=>{L.target===c&&(c.style.display="none")})}let _=t.getElementById(`cf-form-${i}`),k=t.getElementById(`cf-success-${i}`),M=t.getElementById(`cf-error-${i}`);_==null||_.addEventListener("submit",async b=>{b.preventDefault();let c=_.querySelector(".cf-btn");c&&(c.disabled=!0,c.textContent="Sending...");let z=new FormData(_);try{if((await fetch(`${p}/api/contact-submit`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({widget_id:i,name:z.get("name"),email:z.get("email"),phone:z.get("phone"),subject:z.get("subject"),message:z.get("message")})})).ok)_.style.display="none",k&&(k.style.display="block");else throw new Error("Failed")}catch(L){c&&(c.disabled=!1,c.textContent=w);let j=M==null?void 0:M.querySelector(".cf-error-msg");j&&(j.textContent="Failed to send. Please try again."),M&&(M.style.display="block")}})}function G(t,e,u,p){var m;let i=e.theme||"light",r=e.style||"filled",s=e.size||"medium",n=e.layout||"horizontal",h=e.show_labels!==!1,f=e.animation||"hover_grow",y=(m=e.border_radius)!=null?m:50,v={small:{btn:"36px",icon:"18px",font:"12px"},medium:{btn:"44px",icon:"22px",font:"13px"},large:{btn:"56px",icon:"28px",font:"14px"}},x=v[s]||v.medium,$=e.networks||{},g={facebook:{label:"Facebook",color:"#1877F2",icon:"f"},instagram:{label:"Instagram",color:"#E4405F",icon:"\u{1F4F7}"},twitter:{label:"Twitter / X",color:"#000000",icon:"X"},tiktok:{label:"TikTok",color:"#000000",icon:"\u266A"},youtube:{label:"YouTube",color:"#FF0000",icon:"\u25B6"},linkedin:{label:"LinkedIn",color:"#0A66C2",icon:"in"},pinterest:{label:"Pinterest",color:"#E60023",icon:"P"},whatsapp:{label:"WhatsApp",color:"#25D366",icon:"\u{1F4AC}"}},d=Object.entries($).filter(([,o])=>o).map(([o,a])=>{let l=g[o];if(!l)return"";let _=r==="filled"?`background: ${l.color}; color: white; border: none;`:r==="outline"?`background: transparent; color: ${l.color}; border: 2px solid ${l.color};`:`background: transparent; color: ${l.color}; border: none;`,k=e.label_type==="follow_us"?"Follow us":e.label_type==="custom"&&e.custom_label||l.label;return`
          <a href="${a}"
             target="_blank"
             rel="noopener noreferrer"
             class="sf-btn sf-${o}"
             aria-label="${l.label}"
             style="${_}">
            <span class="sf-icon">${l.icon}</span>
            ${h?`<span class="sf-label">${k}</span>`:""}
          </a>
        `}).join(""),w=n==="horizontal"?"flex-direction: row; flex-wrap: wrap;":n==="vertical"?"flex-direction: column;":"display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));",S=f==="hover_grow"?".sf-btn:hover { transform: scale(1.08); }":f==="hover_bounce"?`.sf-btn:hover { animation: sfbounce .3s ease; }
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
          ${w}
          gap: 10px;
          align-items: center;
        }
        .sf-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          height: ${x.btn};
          padding: 0 ${h?"14px":"0"};
          ${h?"":`width: ${x.btn};`}
          justify-content: center;
          border-radius: ${y}px;
          text-decoration: none;
          font-size: ${x.font};
          font-weight: 600;
          cursor: pointer;
          transition: transform .2s, opacity .2s;
          white-space: nowrap;
        }
        .sf-btn:hover { opacity: .9; }
        .sf-icon { font-size: ${x.icon}; line-height: 1; font-style: normal; }
        .sf-label { font-size: ${x.font}; }
        ${S}
        .sf-branding { width: 100%; text-align: center; margin-top: 8px; font-size: 10px; }
        .sf-branding a { color: #999; text-decoration: none; opacity: 0.6; }
      </style>
      <div class="sf-wrap">
        ${d}
        ${u?`
          <div class="sf-branding">
            <a href="${p}" target="_blank" rel="noopener noreferrer">
              Powered by Devixus Widgets
            </a>
          </div>`:""}
      </div>
    `}function O(t,e,u,p){let i=e.theme||"light",r=i==="dark"?"#1a1a1a":"#ffffff",s=i==="dark"?"#ffffff":"#0f0f0f",n=i==="dark"?"#aaaaaa":"#666666",h=e.columns||3,f=e.layout||"grid",y=e.border_radius==="round"?"50%":e.border_radius||"8px",v=e.gap||"8px",x=e.num_posts||9,$=e.show_likes!==!1,g=!!e.show_caption,d=e.show_video_icon!==!1,w=e.link_behavior||"instagram",S=e.username||"";if(t.innerHTML=`
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .ig-wrap {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: ${r};
          padding: 20px;
          color: ${s};
        }
        .ig-loading { text-align: center; padding: 40px; color: ${n}; font-size: 14px; }
      </style>
      <div class="ig-wrap"><div class="ig-loading">Loading Instagram posts...</div></div>
    `,!S){let o=t.querySelector(".ig-wrap");o&&(o.innerHTML=`<div class="ig-loading" style="color:${n}">No Instagram username configured</div>`);return}function m(o){return o>=1e6?`${(o/1e6).toFixed(1)}M`:o>=1e3?`${(o/1e3).toFixed(1)}K`:String(o)}fetch(`${p}/api/widgets/instagram?username=${encodeURIComponent(S)}`).then(o=>o.json()).then(o=>{if(!o||!o.posts)return;let l=o.posts.slice(0,x).map(c=>{let z=w==="instagram"?`https://www.instagram.com/${S}/`:"#";return`
            <div class="ig-post" style="cursor:${w==="none"?"default":"pointer"}" data-href="${z}" data-behavior="${w}">
              <div class="ig-thumb-wrap">
                <img src="${c.thumbnail}" alt="" class="ig-thumb" loading="lazy" />
                ${c.type==="video"&&d?'<div class="ig-video-icon">\u25B6</div>':""}
                ${$?`
                  <div class="ig-overlay">
                    <span class="ig-stat">\u2665 ${m(c.likes)}</span>
                    <span class="ig-stat">\u{1F4AC} ${c.comments}</span>
                  </div>`:""}
              </div>
              ${g?`<p class="ig-caption">${c.caption}</p>`:""}
            </div>
          `}).join(""),_=f==="grid"?`display: grid; grid-template-columns: repeat(${h}, 1fr); gap: ${v};`:f==="carousel"?`display: flex; gap: ${v}; overflow-x: auto; scrollbar-width: none;`:`column-count: ${h}; column-gap: ${v};`,k=f==="masonry"?`break-inside: avoid; margin-bottom: ${v};`:f==="carousel"?`flex: 0 0 ${Math.floor(280/h)}px;`:"",M=f!=="masonry"?"padding-top: 100%;":"",b=f!=="masonry"?"position: absolute; top: 0; left: 0; width: 100%; height: 100%;":"width: 100%; display: block;";t.innerHTML=`
          <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            .ig-wrap {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              background: ${r};
              padding: 20px;
            }
            .ig-header {
              display: flex;
              align-items: center;
              gap: 12px;
              padding-bottom: 16px;
              margin-bottom: 16px;
              border-bottom: 1px solid ${i==="dark"?"#333":"#eee"};
            }
            .ig-avatar { width: 48px; height: 48px; border-radius: 50%; object-fit: cover; }
            .ig-name { font-size: 15px; font-weight: 600; color: ${s}; }
            .ig-bio { font-size: 12px; color: ${n}; margin-top: 2px; }
            .ig-followers { margin-left: auto; text-align: right; }
            .ig-followers-num { font-size: 14px; font-weight: 700; color: ${s}; }
            .ig-followers-label { font-size: 11px; color: ${n}; }
            .ig-grid { ${_} }
            .ig-grid::-webkit-scrollbar { display: none; }
            .ig-post { ${k} position: relative; }
            .ig-thumb-wrap {
              position: relative;
              overflow: hidden;
              border-radius: ${y};
              ${M}
              background: #eee;
            }
            .ig-thumb {
              ${b}
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
              border-radius: ${y};
            }
            .ig-post:hover .ig-overlay { opacity: 1; }
            .ig-stat { color: white; font-size: 13px; font-weight: 600; }
            .ig-caption {
              font-size: 11px;
              color: ${n};
              padding: 5px 3px 2px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .ig-footer { text-align: center; margin-top: 16px; font-size: 10px; }
            .ig-footer a { color: ${n}; text-decoration: none; opacity: 0.6; }
          </style>
          <div class="ig-wrap">
            <div class="ig-header">
              <img src="${o.profile_picture}" alt="@${o.username}" class="ig-avatar" />
              <div>
                <div class="ig-name">@${o.username}</div>
                <div class="ig-bio">${o.bio||""}</div>
              </div>
              <div class="ig-followers">
                <div class="ig-followers-num">${m(o.followers)}</div>
                <div class="ig-followers-label">followers</div>
              </div>
            </div>
            <div class="ig-grid">${l}</div>
            ${u?`
              <div class="ig-footer">
                <a href="${p}" target="_blank" rel="noopener noreferrer">\u{1F4F8} Powered by Devixus Widgets</a>
              </div>`:""}
          </div>
        `,w!=="none"&&t.querySelectorAll(".ig-post").forEach(c=>{let z=c.dataset.href;z&&z!=="#"&&c.addEventListener("click",()=>{window.open(z,"_blank","noopener noreferrer")})})}).catch(()=>{let o=t.querySelector(".ig-loading");o&&(o.textContent="Failed to load Instagram posts")})}function V(t,e,u,p){let i=e.theme||"light",r=i==="dark"?"#1a1a1a":"#ffffff",s=i==="dark"?"#ffffff":"#0f0f0f",n=i==="dark"?"#aaaaaa":"#666666",h=i==="dark"?"#2a2a2a":"#f9f9f9",f=e.columns||3,y=e.layout||"grid",v=e.border_radius==="round"?"50%":e.border_radius||"8px",x=e.gap||"8px",$=e.num_videos||9,g=e.show_duration!==!1,d=e.show_view_count!==!1,w=!!e.show_caption,S=e.show_like_count!==!1,m=e.username||"";if(t.innerHTML=`
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .tt-wrap {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: ${r};
          padding: 20px;
        }
        .tt-loading { text-align: center; padding: 40px; color: ${n}; font-size: 14px; }
      </style>
      <div class="tt-wrap"><div class="tt-loading">Loading TikTok videos...</div></div>
    `,!m){let a=t.querySelector(".tt-wrap");a&&(a.innerHTML='<div class="tt-loading">No TikTok username configured</div>');return}function o(a){return a>=1e6?`${(a/1e6).toFixed(1)}M`:a>=1e3?`${(a/1e3).toFixed(1)}K`:String(a)}fetch(`${p}/api/widgets/tiktok?username=${encodeURIComponent(m)}`).then(a=>a.json()).then(a=>{if(!a||!a.videos)return;let l=a.videos.slice(0,$),_=`https://www.tiktok.com/@${m}`,k=l.map(b=>{if(y==="list")return`
              <a class="tt-list-item" href="${_}" target="_blank" rel="noopener noreferrer">
                <div class="tt-list-thumb">
                  <img src="${b.thumbnail}" alt="" class="tt-list-img" loading="lazy" />
                  ${g?`<div class="tt-duration">${b.duration}</div>`:""}
                </div>
                <div class="tt-list-info">
                  ${w?`<p class="tt-list-caption">${b.caption}</p>`:""}
                  <div class="tt-list-stats">
                    ${d?`<span class="tt-stat">\u{1F441} ${o(b.views)}</span>`:""}
                    ${S?`<span class="tt-stat">\u2665 ${o(b.likes)}</span>`:""}
                  </div>
                </div>
              </a>
            `;let c=g?"36px":"6px";return`
            <a class="tt-card" href="${_}" target="_blank" rel="noopener noreferrer">
              <div class="tt-thumb-wrap">
                <img src="${b.thumbnail}" alt="" class="tt-thumb" loading="lazy" />
                <div class="tt-play-icon">\u25B6</div>
                ${g?`<div class="tt-duration">${b.duration}</div>`:""}
                ${d?`<div class="tt-views" style="bottom:${c}">\u{1F441} ${o(b.views)}</div>`:""}
              </div>
              ${S?`<div class="tt-card-footer"><span class="tt-likes">\u2665 ${o(b.likes)}</span></div>`:""}
              ${w?`<p class="tt-caption">${b.caption}</p>`:""}
            </a>
          `}).join(""),M=y==="grid"?`display: grid; grid-template-columns: repeat(${f}, 1fr); gap: ${x};`:y==="carousel"?`display: flex; gap: ${x}; overflow-x: auto; scrollbar-width: none;`:`display: flex; flex-direction: column; gap: ${x};`;t.innerHTML=`
          <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            .tt-wrap {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              background: ${r};
              padding: 20px;
            }
            .tt-header {
              display: flex;
              align-items: center;
              gap: 12px;
              padding-bottom: 16px;
              margin-bottom: 16px;
              border-bottom: 1px solid ${i==="dark"?"#333":"#eee"};
            }
            .tt-avatar { width: 48px; height: 48px; border-radius: 50%; object-fit: cover; }
            .tt-display-name { font-size: 15px; font-weight: 600; color: ${s}; }
            .tt-handle { font-size: 12px; color: ${n}; margin-top: 2px; }
            .tt-header-stats { margin-left: auto; display: flex; gap: 20px; }
            .tt-hstat { text-align: center; }
            .tt-hstat-num { font-size: 14px; font-weight: 700; color: ${s}; }
            .tt-hstat-label { font-size: 11px; color: ${n}; }
            .tt-grid { ${M} }
            .tt-grid::-webkit-scrollbar { display: none; }
            .tt-card {
              text-decoration: none;
              color: ${s};
              display: block;
              border-radius: ${v};
              overflow: hidden;
              background: ${h};
              transition: transform 0.2s;
              ${y==="carousel"?`flex: 0 0 ${Math.floor(280/f)}px;`:""}
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
            .tt-likes { font-size: 11px; color: ${n}; }
            .tt-caption {
              font-size: 11px;
              color: ${n};
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
              border-radius: ${v};
              background: ${h};
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
            .tt-stat { font-size: 11px; color: ${n}; }
            .tt-footer { text-align: center; margin-top: 16px; font-size: 10px; }
            .tt-footer a { color: ${n}; text-decoration: none; opacity: 0.6; }
          </style>
          <div class="tt-wrap">
            <div class="tt-header">
              <img src="${a.avatar}" alt="@${a.username}" class="tt-avatar" />
              <div>
                <div class="tt-display-name">${a.display_name}</div>
                <div class="tt-handle">@${a.username}</div>
              </div>
              <div class="tt-header-stats">
                <div class="tt-hstat">
                  <div class="tt-hstat-num">${o(a.followers)}</div>
                  <div class="tt-hstat-label">Followers</div>
                </div>
                <div class="tt-hstat">
                  <div class="tt-hstat-num">${o(a.likes)}</div>
                  <div class="tt-hstat-label">Likes</div>
                </div>
              </div>
            </div>
            <div class="tt-grid">${k}</div>
            ${u?`
              <div class="tt-footer">
                <a href="${p}" target="_blank" rel="noopener noreferrer">Powered by Devixus Widgets</a>
              </div>`:""}
          </div>
        `}).catch(()=>{let a=t.querySelector(".tt-loading");a&&(a.textContent="Failed to load TikTok videos")})}function J(t,e,u){switch(e.type){case"whatsapp":H(t,e.config,e.show_branding);break;case"testimonials":U(t,e.config,e.show_branding);break;case"youtube_feed":q(t,e.config,e.show_branding,T);break;case"google_reviews":D(t,e.config,e.show_branding,T);break;case"countdown_timer":A(t,e.config,e.show_branding,T);break;case"announcement_bar":P(t,e.config,e.show_branding,T);break;case"contact_form":Y(t,e.config,e.show_branding,T,u);break;case"social_follow":G(t,e.config,e.show_branding,T);break;case"instagram_feed":O(t,e.config,e.show_branding,T);break;case"tiktok_feed":V(t,e.config,e.show_branding,T);break;default:console.warn(`[Devixus] Unknown widget type: ${e.type}`)}}async function R(){if(!C)return;let t=C.getAttribute("data-widget-id");if(!t){console.warn("[Devixus] Missing data-widget-id attribute on script tag");return}let e=C.getAttribute("data-mount")||null;try{let u=await B(t),p=e&&document.querySelector(e)||document.body;if(u.limit_reached){let r=I(p);W(r,u,T);return}let i=I(p);J(i,u,t),N(t,T)}catch(u){console.warn("[Devixus] Widget failed to load:",u)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",R):R()})();})();

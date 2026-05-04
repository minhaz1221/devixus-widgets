"use strict";(()=>{(function(){"use strict";let I=document.currentScript||(()=>{let e=document.getElementsByTagName("script");return e[e.length-1]||null})(),C=(()=>{try{let e=I==null?void 0:I.src;if(e)return new URL(e).origin}catch(e){}return"https://devixus-widgets-web.vercel.app"})(),F="https://devixus-widgets-marketing.vercel.app",U={bg:"#0f172a",card:"#1e293b",text:"#f1f5f9",border:"#334155",muted:"#94a3b8"},q={bg:"#ffffff",card:"#f9fafb",text:"#1a1a1a",border:"#e5e7eb",muted:"#6b7280"};function D(e){var t;return e==="auto"?(t=window.matchMedia)!=null&&t.call(window,"(prefers-color-scheme: dark)").matches?"dark":"light":e==="dark"?"dark":"light"}function E(e){return D(e)==="dark"?U:q}async function A(e){let t=await fetch(`${C}/api/widget/${e}`,{method:"GET",headers:{"Content-Type":"application/json"}});if(!t.ok)throw new Error(`Widget not found: ${e}`);return t.json()}function B(e){let t=document.createElement("div");return t.setAttribute("data-devixus-widget","true"),t.style.cssText="all: initial; display: block;",e.appendChild(t),t.attachShadow({mode:"open"})}function P(e,t,h){let s=t.phone_number||"",x=encodeURIComponent(t.welcome_message||"Hello!"),i=t.button_color||"#25D366",r=t.position||"bottom-right",a={small:44,medium:56,large:68}[t.button_size||"medium"]||56,y=Math.round(a*.54),f=!!t.pulse_animation,$=t.open_in==="same_tab"?"_self":"_blank",u=t.tooltip_text||"",v=r==="bottom-right"?"bottom: 24px; right: 24px;":"bottom: 24px; left: 24px;",w=r==="bottom-right"?"flex-end":"flex-start";e.innerHTML=`
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
        ${f?`
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
        ${u?`
        .wa-tooltip {
          position: absolute;
          bottom: calc(100% + 8px);
          ${r==="bottom-right"?"right: 0;":"left: 0;"}
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
          ${u?`<div class="wa-tooltip">${u}</div>`:""}
          <a class="wa-bubble"
             href="https://wa.me/${s}?text=${x}"
             target="${$}"
             rel="noopener noreferrer"
             aria-label="Chat on WhatsApp">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </a>
        </div>
        ${h?`<a class="wa-branding" href="${F}" target="_blank" rel="noopener noreferrer">Powered by Devixus</a>`:""}
      </div>
    `}function W(e,t,h){var _,T;let s=t.testimonials||[],x=t.theme||"light",i=t.show_rating!==!1,r=t.layout||"slider",l=t.columns||2,a=t.show_arrows!==!1,y=!!t.show_dots,f=!!t.show_quote_icon,$=t.avatar_shape||"circle",u=t.card_shadow||"none",v=E(x),w=v.bg,p=v.text,d=v.muted,z=v.card,g={none:"none",small:"0 1px 4px rgba(0,0,0,.08)",medium:"0 4px 16px rgba(0,0,0,.1)",large:"0 8px 32px rgba(0,0,0,.14)"}[u]||"none",o=$==="circle"?"50%":$==="square"?"4px":"8px",n=s.map(b=>{let c=b.rating||5,S=i?`<div class="stars">${"\u2605".repeat(c)}${"\u2606".repeat(5-c)}</div>`:"",L=b.avatar_url?`<img src="${b.avatar_url}" class="avatar" alt="${b.author}" />`:`<div class="avatar-placeholder">${b.author.charAt(0).toUpperCase()}</div>`;return`
        <div class="card">
          ${f?'<div class="quote-icon">"</div>':""}
          ${S}
          <p class="content">${b.content}</p>
          <div class="author-row">
            ${L}
            <div>
              <div class="author">${b.author}</div>
              <div class="role">${b.role||""}</div>
            </div>
          </div>
        </div>
      `}).join(""),m=r==="grid",k=m?`display: grid; grid-template-columns: repeat(${l}, 1fr); gap: 16px;`:"display: flex; gap: 16px; overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: none; -ms-overflow-style: none; padding-bottom: 8px;";if(e.innerHTML=`
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
          ${m?"":"flex: 0 0 280px; scroll-snap-align: start;"}
          background: ${z};
          border-radius: 12px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          box-shadow: ${g};
        }
        .quote-icon {
          font-size: 48px;
          line-height: 1;
          color: #e5e7eb;
          font-family: Georgia, serif;
          margin-bottom: -8px;
        }
        .stars { color: #f59e0b; font-size: 16px; letter-spacing: 2px; }
        .content { color: ${p}; font-size: 14px; line-height: 1.6; flex: 1; }
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
        .author { color: ${p}; font-size: 13px; font-weight: 600; }
        .role { color: ${d}; font-size: 12px; }
        ${!m&&a?`
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
          color: ${p};
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
        ${!m&&a?`
        <div class="arrows">
          <button class="arrow-btn" id="t-prev">\u2190</button>
          <button class="arrow-btn" id="t-next">\u2192</button>
        </div>`:""}
        ${y&&s.length>0?`
        <div class="dots" id="t-dots">
          ${s.map((b,c)=>`<div class="dot${c===0?" active":""}" data-i="${c}"></div>`).join("")}
        </div>`:""}
        ${h?`<div class="branding"><a href="${F}" target="_blank" rel="noopener noreferrer">Powered by Devixus Widgets</a></div>`:""}
      </div>
    `,!m){let L=function(j){if(!b)return;let R=b.children;R[j]&&(S=j,R[j].scrollIntoView({behavior:"smooth",inline:"start",block:"nearest"}),c&&c.querySelectorAll(".dot").forEach((et,ot)=>{et.classList.toggle("active",ot===S)}))},b=e.getElementById("t-track"),c=y?e.getElementById("t-dots"):null,S=0;a&&((_=e.getElementById("t-prev"))==null||_.addEventListener("click",()=>{L(Math.max(0,S-1))}),(T=e.getElementById("t-next"))==null||T.addEventListener("click",()=>{L(Math.min(s.length-1,S+1))})),c&&c.querySelectorAll(".dot").forEach(j=>{j.addEventListener("click",()=>{var R;L(parseInt((R=j.dataset.i)!=null?R:"0"))})})}}function N(e,t,h,s){let x=t.theme||"light",i=E(x),r=i.bg,l=i.text,a=i.muted,y=i.card,f=t.accent_color||"#ff0000",$=t.columns||3,u=t.layout||"grid",v=t.subscribe_button_color||f,w=t.header_style||"full",p=t.show_subscriber_count!==!1;e.innerHTML=`
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .yt-wrap {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: ${r};
          padding: 20px;
          color: ${l};
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
    `;let d=t.channel_id,z=t.max_results||6,M=`${s}/api/youtube?channel_id=${d}&max_results=${z}`;fetch(M).then(g=>g.json()).then(g=>{if(!g.videos||g.videos.length===0){e.innerHTML=`
            <div style="padding:20px;text-align:center;
              color:${a};font-family:sans-serif;">
              No videos found
            </div>`;return}let o=g.channel,m=g.videos.map(_=>`
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
            ${t.show_title!==!1?`<div class="yt-title">${_.title}</div>`:""}
            ${t.show_date!==!1?`<div class="yt-meta">${new Date(_.published_at).toLocaleDateString()}</div>`:""}
          </a>
        `).join(""),k=u==="grid"?`grid-template-columns: repeat(${$}, 1fr);`:u==="list"?"grid-template-columns: 1fr;":"grid-auto-flow: column; grid-auto-columns: 280px;";e.innerHTML=`
          <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            .yt-wrap {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              background: ${r};
              padding: 20px;
              color: ${l};
            }
            .yt-header {
              display: flex;
              align-items: center;
              gap: 12px;
              margin-bottom: 20px;
              padding-bottom: 16px;
              border-bottom: 1px solid ${x==="dark"?"#333":"#eee"};
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
              color: ${l};
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
              ${u==="carousel"?"overflow-x: auto; scrollbar-width: none;":""}
            }
            .yt-grid::-webkit-scrollbar { display: none; }
            .yt-card {
              text-decoration: none;
              color: ${l};
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
                ${p&&o.subscriber_count?`<div class="yt-subs">${o.subscriber_count} subscribers</div>`:""}
              </div>
              <a href="https://youtube.com/channel/${d}"
                 class="yt-subscribe"
                 target="_blank"
                 rel="noopener noreferrer">
                Subscribe
              </a>
            </div>`:""}
            <div class="yt-grid">${m}</div>
            ${h?`
              <div class="yt-branding">
                <a href="${s}"
                   target="_blank"
                   rel="noopener noreferrer">
                  Powered by Devixus Widgets
                </a>
              </div>`:""}
          </div>
        `}).catch(()=>{let g=e.querySelector(".yt-loading");g&&(g.textContent="Failed to load videos")})}function Y(e,t,h,s){let x=t.theme||"light",i=E(x),r=i.bg,l=i.text,a=i.muted,y=i.card,f=t.accent_color||"#4285f4",$=t.layout||"grid";if(e.innerHTML=`
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .gr-wrap {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: ${r};
          padding: 20px;
          color: ${l};
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
    `,!t.place_id){let p=e.querySelector(".gr-wrap");p&&(p.innerHTML=`<div class="gr-loading" style="color:${a}">No business configured</div>`);return}let u=t.max_reviews||6,v=t.min_rating||1,w=`${s}/api/google-reviews?place_id=${encodeURIComponent(t.place_id)}&max_reviews=${u}&min_rating=${v}`;fetch(w).then(p=>p.json()).then(p=>{if(!p.reviews||p.reviews.length===0){e.innerHTML=`
            <div style="padding:20px;text-align:center;
              color:${a};font-family:sans-serif;background:${r};">
              No reviews found
            </div>`;return}let d=p.place,z=p.reviews;function M(n){return Array.from({length:5},(m,k)=>`<span style="color:${k<n?"#fbbc04":"#dadce0"}">\u2605</span>`).join("")}let g=z.map(n=>`
          <div class="gr-card">
            <div class="gr-card-header">
              ${t.show_reviewer_photo!==!1&&n.author_photo?`<img src="${n.author_photo}" class="gr-avatar" alt="${n.author_name}" />`:`<div class="gr-avatar-placeholder">${n.author_name.charAt(0).toUpperCase()}</div>`}
              <div class="gr-author-info">
                <div class="gr-author">${n.author_name}</div>
                ${t.show_review_date!==!1?`<div class="gr-date">${n.relative_time}</div>`:""}
              </div>
            </div>
            <div class="gr-stars">${M(n.rating)}</div>
            ${n.text?`<p class="gr-text">${n.text}</p>`:""}
          </div>
        `).join(""),o=$==="grid"?"grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));":$==="carousel"?"grid-auto-flow: column; grid-auto-columns: 300px; overflow-x: auto;":"grid-template-columns: 1fr;";e.innerHTML=`
          <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            .gr-wrap {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              background: ${r};
              padding: 20px;
              color: ${l};
            }
            .gr-header {
              display: flex;
              align-items: flex-start;
              justify-content: space-between;
              margin-bottom: 20px;
              padding-bottom: 16px;
              border-bottom: 1px solid ${x==="dark"?"#333":"#eee"};
              flex-wrap: wrap;
              gap: 12px;
            }
            .gr-place-name {
              font-size: 18px;
              font-weight: 600;
              color: ${l};
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
              color: ${l};
              line-height: 1;
            }
            .gr-overall-stars { font-size: 18px; }
            .gr-overall-count { font-size: 11px; color: ${a}; }
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
              background: ${f};
              color: white;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 16px;
              font-weight: 600;
              flex-shrink: 0;
            }
            .gr-author { font-size: 14px; font-weight: 500; color: ${l}; }
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
            ${t.show_header!==!1&&d?`
            <div class="gr-header">
              <div>
                <div class="gr-place-name">${d.name}</div>
                <div class="gr-place-address">${d.address||""}</div>
                ${t.write_review_link&&d.google_url?`
                  <a href="${d.google_url}"
                     class="gr-write-link"
                     target="_blank"
                     rel="noopener noreferrer">Write a review \u2197</a>`:""}
              </div>
              ${t.show_overall_rating!==!1?`
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
            <div class="gr-grid">${g}</div>
            ${h?`
              <div class="gr-branding">
                <a href="${s}" target="_blank" rel="noopener noreferrer">
                  Powered by Devixus Widgets
                </a>
              </div>`:""}
          </div>
        `}).catch(()=>{let p=e.querySelector(".gr-loading");p&&(p.textContent="Failed to load reviews")})}function G(e,t,h,s){var g;let x=t.theme||"light",i=E(x),r=t.bg_color||i.bg,l=t.text_color||i.text,a=t.accent_color||"#ff6914",y=t.title||"Offer ends in",f=t.style||"blocks",$=t.font_family==="mono"?"'Courier New', monospace":t.font_family==="serif"?"Georgia, 'Times New Roman', serif":"-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",v=(g={colon:":",slash:"/",dot:"\xB7",none:""}[t.separator_style||"colon"])!=null?g:":",w=t.expire_action||"message";function p(){let o=new Date(t.target_date+"T"+(t.target_time||"00:00")).getTime(),n=Date.now(),m=o-n;return m<=0?null:{days:Math.floor(m/(1e3*60*60*24)),hours:Math.floor(m%(1e3*60*60*24)/(1e3*60*60)),minutes:Math.floor(m%(1e3*60*60)/(1e3*60)),seconds:Math.floor(m%(1e3*60)/1e3)}}function d(o){return String(o).padStart(2,"0")}function z(){let o=p();if(!o){if(w==="hide"){e.innerHTML="";return}let _=t.expired_message||"This offer has ended";if(w==="redirect"&&t.redirect_url&&(window.location.href=t.redirect_url),w==="nothing")return;e.innerHTML=`
          <style>
            .ct-wrap {
              font-family: ${$};
              background: ${r};
              padding: 24px;
              text-align: center;
              color: ${l};
              border-radius: 8px;
            }
            .ct-expired { font-size: 18px; font-weight: 500; }
          </style>
          <div class="ct-wrap">
            <div class="ct-expired">${_}</div>
          </div>
        `;return}let n=[];t.show_days!==!1&&n.push({value:d(o.days),label:"Days"}),t.show_hours!==!1&&n.push({value:d(o.hours),label:"Hours"}),t.show_minutes!==!1&&n.push({value:d(o.minutes),label:"Minutes"}),t.show_seconds!==!1&&n.push({value:d(o.seconds),label:"Seconds"});let m=f==="blocks"?`
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
          color: ${a};
          line-height: 1;
          font-variant-numeric: tabular-nums;
          background: ${r};
          border: 2px solid ${a};
          border-radius: 8px;
          padding: 8px 16px;
          min-width: 80px;
          text-align: center;
        }
        .ct-label {
          font-size: 11px;
          color: ${l};
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
          color: ${l};
          opacity: 0.6;
          text-transform: uppercase;
          letter-spacing: .05em;
        }
      `,k=n.map(_=>`
        <div class="ct-unit">
          <div class="ct-value">${_.value}</div>
          ${t.show_labels!==!1?`<div class="ct-label">${_.label}</div>`:""}
        </div>
      `).join(f==="minimal"?`<div class="ct-sep">${v}</div>`:"");e.innerHTML=`
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          .ct-wrap {
            font-family: ${$};
            background: ${r};
            padding: 24px 20px;
            border-radius: 8px;
            text-align: center;
            color: ${l};
          }
          .ct-title {
            font-size: 16px;
            font-weight: 500;
            margin-bottom: 16px;
            color: ${l};
          }
          .ct-units {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            flex-wrap: wrap;
          }
          ${m}
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
            color: ${l};
            opacity: 0.4;
            text-decoration: none;
          }
        </style>
        <div class="ct-wrap">
          ${y?`<div class="ct-title">${y}</div>`:""}
          <div class="ct-units">${k}</div>
          ${h?`
            <div class="ct-branding">
              <a href="${s}" target="_blank" rel="noopener noreferrer">
                Powered by Devixus Widgets
              </a>
            </div>`:""}
        </div>
      `}z();let M=setInterval(()=>{let o=p();if(!o){clearInterval(M),z();return}let n=e.querySelectorAll(".ct-value"),m=[];t.show_days!==!1&&m.push(d(o.days)),t.show_hours!==!1&&m.push(d(o.hours)),t.show_minutes!==!1&&m.push(d(o.minutes)),t.show_seconds!==!1&&m.push(d(o.seconds)),n.forEach((k,_)=>{m[_]&&(k.textContent=m[_])})},1e3)}function O(e,t,h,s){let x=t.message||"\u{1F389} Welcome to our website!",i=t.bg_color||"#ff6914",r=t.text_color||"#ffffff",l=t.link_color||"#ffffff",a=t.position||"top",y=t.is_sticky!==!1,f=t.show_close_button!==!1,$=t.show_emoji?t.emoji||"\u{1F389}":"",u=t.style||"solid",v=i;u==="gradient"?v=`linear-gradient(135deg, ${i}, ${i}dd)`:u==="striped"&&(v=`repeating-linear-gradient(
        45deg,
        ${i},
        ${i} 10px,
        ${i}ee 10px,
        ${i}ee 20px
      )`);let w=y?`position: fixed; ${a}: 0; left: 0; right: 0; z-index: 999999;`:"position: relative;";if(e.innerHTML=`
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .ab-bar {
          ${w}
          background: ${v};
          color: ${r};
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
        .ab-message { color: ${r}; font-weight: 500; }
        .ab-link {
          color: ${l};
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
          color: ${r};
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
          right: ${f?"44px":"12px"};
          top: 50%;
          transform: translateY(-50%);
          font-size: 9px;
        }
        .ab-branding a { color: ${r}; opacity: 0.4; text-decoration: none; }
      </style>
      <div class="ab-bar" id="ab-bar">
        <div class="ab-content">
          ${$?`<span>${$}</span>`:""}
          <span class="ab-message">${x}</span>
          ${t.link_text&&t.link_url?`
            <a class="ab-link"
               href="${t.link_url}"
               target="_blank"
               rel="noopener noreferrer">
              ${t.link_text} \u2192
            </a>
          `:""}
        </div>
        ${h?`
          <div class="ab-branding">
            <a href="${s}" target="_blank" rel="noopener noreferrer">Devixus</a>
          </div>`:""}
        ${f?`
          <button class="ab-close" id="ab-close" aria-label="Close">\u2715</button>
        `:""}
      </div>
    `,f){let p=e.getElementById("ab-close"),d=e.getElementById("ab-bar");p&&d&&p.addEventListener("click",()=>{d.style.display="none"})}}function V(e,t,h){let s=`${h}/dashboard/billing`;e.innerHTML=`
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
          <a href="${s}"
             target="_blank"
             class="dv-btn">
            Upgrade plan \u2192
          </a>
          <div class="dv-powered">
            <a href="${h}" target="_blank">
              Powered by Devixus Widgets
            </a>
          </div>
        </div>
      </div>
    `}function K(e,t){try{let h=window.location.hostname,s=JSON.stringify({widget_id:e,domain:h,event_type:"load"});navigator.sendBeacon?navigator.sendBeacon(`${t}/api/track`,new Blob([s],{type:"application/json"})):fetch(`${t}/api/track`,{method:"POST",body:s,headers:{"Content-Type":"application/json"},keepalive:!0}).catch(()=>{})}catch(h){}}function J(e,t,h,s,x){let i=t.theme||"light",r=E(i),l=r.bg,a=r.text,y=r.muted,f=r.card,$=r.border,u=t.accent_color||"#6366f1",v=t.border_radius||8,w=t.display_mode==="popup",p=t.title||"Contact Us",d=t.subtitle||"Send us a message and we'll get back to you.",z=t.button_text||"Send Message",M=t.success_message||"Thank you! We'll be in touch soon.",g=t.fields||{name:!0,email:!0,phone:!1,subject:!1,message:!0},o=t.required_fields||{name:!0,email:!0,message:!0};function n(b){return`
        <div class="cf-form-wrap" id="${b}">
          <div class="cf-header">
            <h3 class="cf-title">${p}</h3>
            ${d?`<p class="cf-subtitle">${d}</p>`:""}
          </div>
          <form class="cf-form" id="cf-form-${x}">
            ${g.name?`
              <div class="cf-field">
                <label class="cf-label">
                  Name${o.name?' <span class="cf-req">*</span>':""}
                </label>
                <input type="text" name="name" class="cf-input"
                       placeholder="Your name"
                       ${o.name?"required":""} />
              </div>`:""}
            ${g.email?`
              <div class="cf-field">
                <label class="cf-label">
                  Email${o.email?' <span class="cf-req">*</span>':""}
                </label>
                <input type="email" name="email" class="cf-input"
                       placeholder="your@email.com"
                       ${o.email?"required":""} />
              </div>`:""}
            ${g.phone?`
              <div class="cf-field">
                <label class="cf-label">
                  Phone${o.phone?' <span class="cf-req">*</span>':""}
                </label>
                <input type="tel" name="phone" class="cf-input"
                       placeholder="+1 234 567 8900"
                       ${o.phone?"required":""} />
              </div>`:""}
            ${g.subject?`
              <div class="cf-field">
                <label class="cf-label">Subject</label>
                <input type="text" name="subject" class="cf-input"
                       placeholder="What is this about?" />
              </div>`:""}
            ${g.message?`
              <div class="cf-field">
                <label class="cf-label">
                  Message${o.message?' <span class="cf-req">*</span>':""}
                </label>
                <textarea name="message" class="cf-textarea"
                          placeholder="Your message..." rows="4"
                          ${o.message?"required":""}></textarea>
              </div>`:""}
            <div class="cf-field" id="cf-error-${x}" style="display:none">
              <p class="cf-error-msg"></p>
            </div>
            <button type="submit" class="cf-btn">${z}</button>
          </form>
          <div class="cf-success" id="cf-success-${x}" style="display:none">
            <div class="cf-success-icon">\u2713</div>
            <p class="cf-success-msg">${M}</p>
          </div>
          ${h?`
            <div class="cf-branding">
              <a href="${s}" target="_blank" rel="noopener noreferrer">
                Powered by Devixus Widgets
              </a>
            </div>`:""}
        </div>
      `}let m=w?`
      <div>
        <button class="cf-trigger" id="cf-trigger">
          ${t.trigger_text||"\u2709 Contact Us"}
        </button>
        <div class="cf-popup-overlay" id="cf-popup" style="display:none">
          <div class="cf-popup-box">
            <button class="cf-popup-close" id="cf-popup-close">\u2715</button>
            ${n("cf-popup-form")}
          </div>
        </div>
      </div>
    `:n("cf-inline-form");if(e.innerHTML=`
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .cf-trigger {
          background: ${u};
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
          background: ${l};
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
        .cf-popup-close:hover { background: ${f}; }
        .cf-form-wrap {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: ${l};
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
          background: ${f};
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
        .cf-input:focus, .cf-textarea:focus { border-color: ${u}; }
        .cf-textarea { resize: vertical; }
        .cf-btn {
          background: ${u};
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
      ${m}
    `,w){let b=e.getElementById("cf-trigger"),c=e.getElementById("cf-popup"),S=e.getElementById("cf-popup-close");b==null||b.addEventListener("click",()=>{c&&(c.style.display="flex")}),S==null||S.addEventListener("click",()=>{c&&(c.style.display="none")}),c==null||c.addEventListener("click",L=>{L.target===c&&(c.style.display="none")})}let k=e.getElementById(`cf-form-${x}`),_=e.getElementById(`cf-success-${x}`),T=e.getElementById(`cf-error-${x}`);k==null||k.addEventListener("submit",async b=>{b.preventDefault();let c=k.querySelector(".cf-btn");c&&(c.disabled=!0,c.textContent="Sending...");let S=new FormData(k);try{if((await fetch(`${s}/api/contact-submit`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({widget_id:x,name:S.get("name"),email:S.get("email"),phone:S.get("phone"),subject:S.get("subject"),message:S.get("message")})})).ok)k.style.display="none",_&&(_.style.display="block");else throw new Error("Failed")}catch(L){c&&(c.disabled=!1,c.textContent=z);let j=T==null?void 0:T.querySelector(".cf-error-msg");j&&(j.textContent="Failed to send. Please try again."),T&&(T.style.display="block")}})}function X(e,t,h,s){var M;let x=t.theme||"light",i=t.style||"filled",r=t.size||"medium",l=t.layout||"horizontal",a=t.show_labels!==!1,y=t.animation||"hover_grow",f=(M=t.border_radius)!=null?M:50,$={small:{btn:"36px",icon:"18px",font:"12px"},medium:{btn:"44px",icon:"22px",font:"13px"},large:{btn:"56px",icon:"28px",font:"14px"}},u=$[r]||$.medium,v=t.networks||{},w={facebook:{label:"Facebook",color:"#1877F2",icon:"f"},instagram:{label:"Instagram",color:"#E4405F",icon:"\u{1F4F7}"},twitter:{label:"Twitter / X",color:"#000000",icon:"X"},tiktok:{label:"TikTok",color:"#000000",icon:"\u266A"},youtube:{label:"YouTube",color:"#FF0000",icon:"\u25B6"},linkedin:{label:"LinkedIn",color:"#0A66C2",icon:"in"},pinterest:{label:"Pinterest",color:"#E60023",icon:"P"},whatsapp:{label:"WhatsApp",color:"#25D366",icon:"\u{1F4AC}"}},p=Object.entries(v).filter(([,g])=>g).map(([g,o])=>{let n=w[g];if(!n)return"";let m=i==="filled"?`background: ${n.color}; color: white; border: none;`:i==="outline"?`background: transparent; color: ${n.color}; border: 2px solid ${n.color};`:`background: transparent; color: ${n.color}; border: none;`,k=t.label_type==="follow_us"?"Follow us":t.label_type==="custom"&&t.custom_label||n.label;return`
          <a href="${o}"
             target="_blank"
             rel="noopener noreferrer"
             class="sf-btn sf-${g}"
             aria-label="${n.label}"
             style="${m}">
            <span class="sf-icon">${n.icon}</span>
            ${a?`<span class="sf-label">${k}</span>`:""}
          </a>
        `}).join(""),d=l==="horizontal"?"flex-direction: row; flex-wrap: wrap;":l==="vertical"?"flex-direction: column;":"display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));",z=y==="hover_grow"?".sf-btn:hover { transform: scale(1.08); }":y==="hover_bounce"?`.sf-btn:hover { animation: sfbounce .3s ease; }
         @keyframes sfbounce {
           0%,100% { transform: translateY(0); }
           50% { transform: translateY(-4px); }
         }`:"";e.innerHTML=`
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
          height: ${u.btn};
          padding: 0 ${a?"14px":"0"};
          ${a?"":`width: ${u.btn};`}
          justify-content: center;
          border-radius: ${f}px;
          text-decoration: none;
          font-size: ${u.font};
          font-weight: 600;
          cursor: pointer;
          transition: transform .2s, opacity .2s;
          white-space: nowrap;
        }
        .sf-btn:hover { opacity: .9; }
        .sf-icon { font-size: ${u.icon}; line-height: 1; font-style: normal; }
        .sf-label { font-size: ${u.font}; }
        ${z}
        .sf-branding { width: 100%; text-align: center; margin-top: 8px; font-size: 10px; }
        .sf-branding a { color: #999; text-decoration: none; opacity: 0.6; }
      </style>
      <div class="sf-wrap">
        ${p}
        ${h?`
          <div class="sf-branding">
            <a href="${s}" target="_blank" rel="noopener noreferrer">
              Powered by Devixus Widgets
            </a>
          </div>`:""}
      </div>
    `}function Q(e,t,h,s){let x=t.theme||"light",i=E(x),r=i.bg,l=i.text,a=i.muted,y=t.columns||3,f=t.layout||"grid",$=t.border_radius==="round"?"50%":t.border_radius||"8px",u=t.gap||"8px",v=t.num_posts||9,w=t.show_likes!==!1,p=!!t.show_caption,d=t.show_video_icon!==!1,z=t.link_behavior||"instagram",M=t.username||"";if(e.innerHTML=`
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .ig-wrap {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: ${r};
          padding: 20px;
          color: ${l};
        }
        .ig-loading { text-align: center; padding: 40px; color: ${a}; font-size: 14px; }
      </style>
      <div class="ig-wrap"><div class="ig-loading">Loading Instagram posts...</div></div>
    `,!M){let o=e.querySelector(".ig-wrap");o&&(o.innerHTML=`<div class="ig-loading" style="color:${a}">No Instagram username configured</div>`);return}function g(o){return o>=1e6?`${(o/1e6).toFixed(1)}M`:o>=1e3?`${(o/1e3).toFixed(1)}K`:String(o)}fetch(`${s}/api/widgets/instagram?username=${encodeURIComponent(M)}`).then(o=>o.json()).then(o=>{if(!o||!o.posts)return;let m=o.posts.slice(0,v).map(c=>{let S=z==="instagram"?`https://www.instagram.com/${M}/`:"#";return`
            <div class="ig-post" style="cursor:${z==="none"?"default":"pointer"}" data-href="${S}" data-behavior="${z}">
              <div class="ig-thumb-wrap">
                <img src="${c.thumbnail}" alt="" class="ig-thumb" loading="lazy" />
                ${c.type==="video"&&d?'<div class="ig-video-icon">\u25B6</div>':""}
                ${w?`
                  <div class="ig-overlay">
                    <span class="ig-stat">\u2665 ${g(c.likes)}</span>
                    <span class="ig-stat">\u{1F4AC} ${c.comments}</span>
                  </div>`:""}
              </div>
              ${p?`<p class="ig-caption">${c.caption}</p>`:""}
            </div>
          `}).join(""),k=f==="grid"?`display: grid; grid-template-columns: repeat(${y}, 1fr); gap: ${u};`:f==="carousel"?`display: flex; gap: ${u}; overflow-x: auto; scrollbar-width: none;`:`column-count: ${y}; column-gap: ${u};`,_=f==="masonry"?`break-inside: avoid; margin-bottom: ${u};`:f==="carousel"?`flex: 0 0 ${Math.floor(280/y)}px;`:"",T=f!=="masonry"?"padding-top: 100%;":"",b=f!=="masonry"?"position: absolute; top: 0; left: 0; width: 100%; height: 100%;":"width: 100%; display: block;";e.innerHTML=`
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
              border-bottom: 1px solid ${x==="dark"?"#333":"#eee"};
            }
            .ig-avatar { width: 48px; height: 48px; border-radius: 50%; object-fit: cover; }
            .ig-name { font-size: 15px; font-weight: 600; color: ${l}; }
            .ig-bio { font-size: 12px; color: ${a}; margin-top: 2px; }
            .ig-followers { margin-left: auto; text-align: right; }
            .ig-followers-num { font-size: 14px; font-weight: 700; color: ${l}; }
            .ig-followers-label { font-size: 11px; color: ${a}; }
            .ig-grid { ${k} }
            .ig-grid::-webkit-scrollbar { display: none; }
            .ig-post { ${_} position: relative; }
            .ig-thumb-wrap {
              position: relative;
              overflow: hidden;
              border-radius: ${$};
              ${T}
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
                <div class="ig-followers-num">${g(o.followers)}</div>
                <div class="ig-followers-label">followers</div>
              </div>
            </div>
            <div class="ig-grid">${m}</div>
            ${h?`
              <div class="ig-footer">
                <a href="${s}" target="_blank" rel="noopener noreferrer">\u{1F4F8} Powered by Devixus Widgets</a>
              </div>`:""}
          </div>
        `,z!=="none"&&e.querySelectorAll(".ig-post").forEach(c=>{let S=c.dataset.href;S&&S!=="#"&&c.addEventListener("click",()=>{window.open(S,"_blank","noopener noreferrer")})})}).catch(()=>{let o=e.querySelector(".ig-loading");o&&(o.textContent="Failed to load Instagram posts")})}function Z(e,t,h,s){let x=t.theme||"light",i=E(x),r=i.bg,l=i.text,a=i.muted,y=i.card,f=t.columns||3,$=t.layout||"grid",u=t.border_radius==="round"?"50%":t.border_radius||"8px",v=t.gap||"8px",w=t.num_videos||9,p=t.show_duration!==!1,d=t.show_view_count!==!1,z=!!t.show_caption,M=t.show_like_count!==!1,g=t.username||"";if(e.innerHTML=`
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .tt-wrap {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: ${r};
          padding: 20px;
        }
        .tt-loading { text-align: center; padding: 40px; color: ${a}; font-size: 14px; }
      </style>
      <div class="tt-wrap"><div class="tt-loading">Loading TikTok videos...</div></div>
    `,!g){let n=e.querySelector(".tt-wrap");n&&(n.innerHTML='<div class="tt-loading">No TikTok username configured</div>');return}function o(n){return n>=1e6?`${(n/1e6).toFixed(1)}M`:n>=1e3?`${(n/1e3).toFixed(1)}K`:String(n)}fetch(`${s}/api/widgets/tiktok?username=${encodeURIComponent(g)}`).then(n=>n.json()).then(n=>{if(!n||!n.videos)return;let m=n.videos.slice(0,w),k=`https://www.tiktok.com/@${g}`,_=m.map(b=>{if($==="list")return`
              <a class="tt-list-item" href="${k}" target="_blank" rel="noopener noreferrer">
                <div class="tt-list-thumb">
                  <img src="${b.thumbnail}" alt="" class="tt-list-img" loading="lazy" />
                  ${p?`<div class="tt-duration">${b.duration}</div>`:""}
                </div>
                <div class="tt-list-info">
                  ${z?`<p class="tt-list-caption">${b.caption}</p>`:""}
                  <div class="tt-list-stats">
                    ${d?`<span class="tt-stat">\u{1F441} ${o(b.views)}</span>`:""}
                    ${M?`<span class="tt-stat">\u2665 ${o(b.likes)}</span>`:""}
                  </div>
                </div>
              </a>
            `;let c=p?"36px":"6px";return`
            <a class="tt-card" href="${k}" target="_blank" rel="noopener noreferrer">
              <div class="tt-thumb-wrap">
                <img src="${b.thumbnail}" alt="" class="tt-thumb" loading="lazy" />
                <div class="tt-play-icon">\u25B6</div>
                ${p?`<div class="tt-duration">${b.duration}</div>`:""}
                ${d?`<div class="tt-views" style="bottom:${c}">\u{1F441} ${o(b.views)}</div>`:""}
              </div>
              ${M?`<div class="tt-card-footer"><span class="tt-likes">\u2665 ${o(b.likes)}</span></div>`:""}
              ${z?`<p class="tt-caption">${b.caption}</p>`:""}
            </a>
          `}).join(""),T=$==="grid"?`display: grid; grid-template-columns: repeat(${f}, 1fr); gap: ${v};`:$==="carousel"?`display: flex; gap: ${v}; overflow-x: auto; scrollbar-width: none;`:`display: flex; flex-direction: column; gap: ${v};`;e.innerHTML=`
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
              border-bottom: 1px solid ${x==="dark"?"#333":"#eee"};
            }
            .tt-avatar { width: 48px; height: 48px; border-radius: 50%; object-fit: cover; }
            .tt-display-name { font-size: 15px; font-weight: 600; color: ${l}; }
            .tt-handle { font-size: 12px; color: ${a}; margin-top: 2px; }
            .tt-header-stats { margin-left: auto; display: flex; gap: 20px; }
            .tt-hstat { text-align: center; }
            .tt-hstat-num { font-size: 14px; font-weight: 700; color: ${l}; }
            .tt-hstat-label { font-size: 11px; color: ${a}; }
            .tt-grid { ${T} }
            .tt-grid::-webkit-scrollbar { display: none; }
            .tt-card {
              text-decoration: none;
              color: ${l};
              display: block;
              border-radius: ${u};
              overflow: hidden;
              background: ${y};
              transition: transform 0.2s;
              ${$==="carousel"?`flex: 0 0 ${Math.floor(280/f)}px;`:""}
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
              color: ${l};
              padding: 10px;
              border-radius: ${u};
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
              color: ${l};
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
            ${h?`
              <div class="tt-footer">
                <a href="${s}" target="_blank" rel="noopener noreferrer">Powered by Devixus Widgets</a>
              </div>`:""}
          </div>
        `}).catch(()=>{let n=e.querySelector(".tt-loading");n&&(n.textContent="Failed to load TikTok videos")})}function tt(e,t,h){switch(t.type){case"whatsapp":P(e,t.config,t.show_branding);break;case"testimonials":W(e,t.config,t.show_branding);break;case"youtube_feed":N(e,t.config,t.show_branding,C);break;case"google_reviews":Y(e,t.config,t.show_branding,C);break;case"countdown_timer":G(e,t.config,t.show_branding,C);break;case"announcement_bar":O(e,t.config,t.show_branding,C);break;case"contact_form":J(e,t.config,t.show_branding,C,h);break;case"social_follow":X(e,t.config,t.show_branding,C);break;case"instagram_feed":Q(e,t.config,t.show_branding,C);break;case"tiktok_feed":Z(e,t.config,t.show_branding,C);break;default:console.warn(`[Devixus] Unknown widget type: ${t.type}`)}}async function H(){var h;if(!I)return;let e=I.getAttribute("data-widget-id");if(!e){console.warn("[Devixus] Missing data-widget-id attribute on script tag");return}let t=I.getAttribute("data-mount")||null;try{let s=await A(e),x=t&&document.querySelector(t)||document.body;if(s.limit_reached){let r=B(x);V(r,s,C);return}let i=B(x);if(tt(i,s,e),(h=s.config)!=null&&h.custom_css){let r=document.createElement("style");r.textContent=s.config.custom_css,setTimeout(()=>i.appendChild(r),100)}K(e,C)}catch(s){console.warn("[Devixus] Widget failed to load:",s)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",H):H()})();})();

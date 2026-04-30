"use strict";(()=>{(function(){"use strict";let f="https://devixus-widgets-web.vercel.app",m="https://devixus-widgets-marketing.vercel.app";function w(){if(document.currentScript)return document.currentScript;let e=document.getElementsByTagName("script");return e[e.length-1]}async function $(e){let t=await fetch(`${f}/api/widget/${e}`,{method:"GET",headers:{"Content-Type":"application/json"}});if(!t.ok)throw new Error(`Widget not found: ${e}`);return t.json()}function k(e){let t=document.createElement("div");return t.setAttribute("data-devixus-widget","true"),t.style.cssText="all: initial; display: block;",e.appendChild(t),t.attachShadow({mode:"open"})}function S(e,t,o){let a=t.phone_number||"",n=encodeURIComponent(t.welcome_message||"Hello!"),l=t.button_color||"#25D366",s=t.position||"bottom-right",i=s==="bottom-right"?"bottom: 24px; right: 24px;":"bottom: 24px; left: 24px;",p=s==="bottom-right"?"flex-end":"flex-start";e.innerHTML=`
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .wa-btn {
          position: fixed;
          ${i}
          z-index: 9999;
          display: flex;
          flex-direction: column;
          align-items: ${p};
          gap: 6px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        .wa-bubble {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: ${l};
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
           href="https://wa.me/${a}?text=${n}"
           target="_blank"
           rel="noopener noreferrer"
           aria-label="Chat on WhatsApp">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>
        ${o?`<a class="wa-branding" href="${m}" target="_blank" rel="noopener noreferrer">Powered by Devixus</a>`:""}
      </div>
    `}function _(e,t,o){let a=t.testimonials||[],n=t.theme||"light",l=t.show_rating!==!1,s=n==="dark"?"#1a1a1a":"#ffffff",i=n==="dark"?"#ffffff":"#1a1a1a",p=n==="dark"?"#aaaaaa":"#666666",u=n==="dark"?"#2a2a2a":"#f9f9f9",x=a.map(r=>{let g=r.rating||5,h=l?`<div class="stars">${"\u2605".repeat(g)}${"\u2606".repeat(5-g)}</div>`:"",y=r.avatar_url?`<img src="${r.avatar_url}" class="avatar" alt="${r.author}" />`:"";return`
        <div class="card">
          ${h}
          <p class="content">"${r.content}"</p>
          <div class="author-row">
            ${y}
            <div>
              <div class="author">${r.author}</div>
              <div class="role">${r.role||""}</div>
            </div>
          </div>
        </div>
      `}).join("");e.innerHTML=`
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .wrap {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: ${s};
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
          background: ${u};
          border-radius: 12px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .stars { color: #f59e0b; font-size: 16px; letter-spacing: 2px; }
        .content {
          color: ${i};
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
          color: ${i};
          font-size: 13px;
          font-weight: 600;
        }
        .role {
          color: ${p};
          font-size: 12px;
        }
        .branding {
          text-align: center;
          margin-top: 12px;
          font-size: 10px;
        }
        .branding a {
          color: ${p};
          text-decoration: none;
          opacity: 0.6;
        }
        .branding a:hover { opacity: 1; }
      </style>
      <div class="wrap">
        <div class="track">${x}</div>
        ${o?`<div class="branding"><a href="${m}" target="_blank" rel="noopener noreferrer">Powered by Devixus Widgets</a></div>`:""}
      </div>
    `}function z(e,t,o,a){let n=t.theme||"light",l=n==="dark"?"#0f0f0f":"#ffffff",s=n==="dark"?"#ffffff":"#0f0f0f",i=n==="dark"?"#aaaaaa":"#606060",p=n==="dark"?"#1a1a1a":"#f9f9f9",u=t.accent_color||"#ff0000",x=t.columns||3,r=t.layout||"grid";e.innerHTML=`
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
          color: ${i};
          font-size: 14px;
        }
      </style>
      <div class="yt-wrap">
        <div class="yt-loading">Loading videos...</div>
      </div>
    `;let g=t.channel_id,h=t.max_results||6,y=`${a}/api/youtube?channel_id=${g}&max_results=${h}`;fetch(y).then(d=>d.json()).then(d=>{if(!d.videos||d.videos.length===0){e.innerHTML=`
            <div style="padding:20px;text-align:center;
              color:${i};font-family:sans-serif;">
              No videos found
            </div>`;return}let c=d.channel,L=d.videos.map(b=>`
          <a class="yt-card"
             href="${b.url}"
             target="_blank"
             rel="noopener noreferrer">
            <div class="yt-thumb">
              <img src="${b.thumbnail}"
                   alt="${b.title}"
                   loading="lazy" />
              <div class="yt-play">\u25B6</div>
            </div>
            ${t.show_title!==!1?`<div class="yt-title">${b.title}</div>`:""}
            ${t.show_date!==!1?`<div class="yt-meta">${new Date(b.published_at).toLocaleDateString()}</div>`:""}
          </a>
        `).join(""),M=r==="grid"?`grid-template-columns: repeat(${x}, 1fr);`:r==="list"?"grid-template-columns: 1fr;":"grid-auto-flow: column; grid-auto-columns: 280px;";e.innerHTML=`
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
              border-bottom: 1px solid ${n==="dark"?"#333":"#eee"};
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
              color: ${i};
              margin-top: 2px;
            }
            .yt-subscribe {
              margin-left: auto;
              background: ${u};
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
              ${M}
              gap: 16px;
              ${r==="carousel"?"overflow-x: auto; scrollbar-width: none;":""}
            }
            .yt-grid::-webkit-scrollbar { display: none; }
            .yt-card {
              text-decoration: none;
              color: ${s};
              display: block;
              border-radius: 8px;
              overflow: hidden;
              background: ${p};
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
              color: ${i};
              padding: 0 12px 10px;
            }
            .yt-branding {
              text-align: center;
              margin-top: 16px;
              font-size: 10px;
            }
            .yt-branding a {
              color: ${i};
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
              <a href="https://youtube.com/channel/${g}"
                 class="yt-subscribe"
                 target="_blank"
                 rel="noopener noreferrer">
                Subscribe
              </a>
            </div>`:""}
            <div class="yt-grid">${L}</div>
            ${o?`
              <div class="yt-branding">
                <a href="${a}"
                   target="_blank"
                   rel="noopener noreferrer">
                  Powered by Devixus Widgets
                </a>
              </div>`:""}
          </div>
        `}).catch(()=>{let d=e.querySelector(".yt-loading");d&&(d.textContent="Failed to load videos")})}function R(e,t){try{let o=window.location.hostname,a=JSON.stringify({widget_id:e,domain:o,event_type:"load"});navigator.sendBeacon?navigator.sendBeacon(`${t}/api/track`,new Blob([a],{type:"application/json"})):fetch(`${t}/api/track`,{method:"POST",body:a,headers:{"Content-Type":"application/json"},keepalive:!0}).catch(()=>{})}catch(o){}}function T(e,t){switch(t.type){case"whatsapp":S(e,t.config,t.show_branding);break;case"testimonials":_(e,t.config,t.show_branding);break;case"youtube_feed":z(e,t.config,t.show_branding,f);break;default:console.warn(`[Devixus] Unknown widget type: ${t.type}`)}}async function v(){let e=w();if(!e)return;let t=e.getAttribute("data-widget-id");if(!t){console.warn("[Devixus] Missing data-widget-id attribute on script tag");return}let o=e.getAttribute("data-mount")||null;try{let a=await $(t),n=o&&document.querySelector(o)||document.body,l=k(n);T(l,a),R(t,f)}catch(a){console.warn("[Devixus] Widget failed to load:",a)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",v):v()})();})();

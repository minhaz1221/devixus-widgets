"use strict";(()=>{(function(){"use strict";let h="https://devixus-widgets-web.vercel.app",w="https://devixus-widgets-marketing.vercel.app";function k(){if(document.currentScript)return document.currentScript;let e=document.getElementsByTagName("script");return e[e.length-1]}async function _(e){let t=await fetch(`${h}/api/widget/${e}`,{method:"GET",headers:{"Content-Type":"application/json"}});if(!t.ok)throw new Error(`Widget not found: ${e}`);return t.json()}function S(e){let t=document.createElement("div");return t.setAttribute("data-devixus-widget","true"),t.style.cssText="all: initial; display: block;",e.appendChild(t),t.attachShadow({mode:"open"})}function z(e,t,p){let d=t.phone_number||"",l=encodeURIComponent(t.welcome_message||"Hello!"),s=t.button_color||"#25D366",r=t.position||"bottom-right",c=r==="bottom-right"?"bottom: 24px; right: 24px;":"bottom: 24px; left: 24px;",f=r==="bottom-right"?"flex-end":"flex-start";e.innerHTML=`
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .wa-btn {
          position: fixed;
          ${c}
          z-index: 9999;
          display: flex;
          flex-direction: column;
          align-items: ${f};
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
           href="https://wa.me/${d}?text=${l}"
           target="_blank"
           rel="noopener noreferrer"
           aria-label="Chat on WhatsApp">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>
        ${p?`<a class="wa-branding" href="${w}" target="_blank" rel="noopener noreferrer">Powered by Devixus</a>`:""}
      </div>
    `}function M(e,t,p){let d=t.testimonials||[],l=t.theme||"light",s=t.show_rating!==!1,r=l==="dark"?"#1a1a1a":"#ffffff",c=l==="dark"?"#ffffff":"#1a1a1a",f=l==="dark"?"#aaaaaa":"#666666",b=l==="dark"?"#2a2a2a":"#f9f9f9",u=d.map(a=>{let g=a.rating||5,x=s?`<div class="stars">${"\u2605".repeat(g)}${"\u2606".repeat(5-g)}</div>`:"",i=a.avatar_url?`<img src="${a.avatar_url}" class="avatar" alt="${a.author}" />`:"";return`
        <div class="card">
          ${x}
          <p class="content">"${a.content}"</p>
          <div class="author-row">
            ${i}
            <div>
              <div class="author">${a.author}</div>
              <div class="role">${a.role||""}</div>
            </div>
          </div>
        </div>
      `}).join("");e.innerHTML=`
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .wrap {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: ${r};
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
          background: ${b};
          border-radius: 12px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .stars { color: #f59e0b; font-size: 16px; letter-spacing: 2px; }
        .content {
          color: ${c};
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
          color: ${c};
          font-size: 13px;
          font-weight: 600;
        }
        .role {
          color: ${f};
          font-size: 12px;
        }
        .branding {
          text-align: center;
          margin-top: 12px;
          font-size: 10px;
        }
        .branding a {
          color: ${f};
          text-decoration: none;
          opacity: 0.6;
        }
        .branding a:hover { opacity: 1; }
      </style>
      <div class="wrap">
        <div class="track">${u}</div>
        ${p?`<div class="branding"><a href="${w}" target="_blank" rel="noopener noreferrer">Powered by Devixus Widgets</a></div>`:""}
      </div>
    `}function T(e,t,p,d){let l=t.theme||"light",s=l==="dark"?"#0f0f0f":"#ffffff",r=l==="dark"?"#ffffff":"#0f0f0f",c=l==="dark"?"#aaaaaa":"#606060",f=l==="dark"?"#1a1a1a":"#f9f9f9",b=t.accent_color||"#ff0000",u=t.columns||3,a=t.layout||"grid";e.innerHTML=`
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .yt-wrap {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: ${s};
          padding: 20px;
          color: ${r};
        }
        .yt-loading {
          text-align: center;
          padding: 40px;
          color: ${c};
          font-size: 14px;
        }
      </style>
      <div class="yt-wrap">
        <div class="yt-loading">Loading videos...</div>
      </div>
    `;let g=t.channel_id,x=t.max_results||6,i=`${d}/api/youtube?channel_id=${g}&max_results=${x}`;fetch(i).then(o=>o.json()).then(o=>{if(!o.videos||o.videos.length===0){e.innerHTML=`
            <div style="padding:20px;text-align:center;
              color:${c};font-family:sans-serif;">
              No videos found
            </div>`;return}let n=o.channel,m=o.videos.map(y=>`
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
            ${t.show_title!==!1?`<div class="yt-title">${y.title}</div>`:""}
            ${t.show_date!==!1?`<div class="yt-meta">${new Date(y.published_at).toLocaleDateString()}</div>`:""}
          </a>
        `).join(""),B=a==="grid"?`grid-template-columns: repeat(${u}, 1fr);`:a==="list"?"grid-template-columns: 1fr;":"grid-auto-flow: column; grid-auto-columns: 280px;";e.innerHTML=`
          <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            .yt-wrap {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              background: ${s};
              padding: 20px;
              color: ${r};
            }
            .yt-header {
              display: flex;
              align-items: center;
              gap: 12px;
              margin-bottom: 20px;
              padding-bottom: 16px;
              border-bottom: 1px solid ${l==="dark"?"#333":"#eee"};
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
              color: ${r};
            }
            .yt-subs {
              font-size: 12px;
              color: ${c};
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
              ${B}
              gap: 16px;
              ${a==="carousel"?"overflow-x: auto; scrollbar-width: none;":""}
            }
            .yt-grid::-webkit-scrollbar { display: none; }
            .yt-card {
              text-decoration: none;
              color: ${r};
              display: block;
              border-radius: 8px;
              overflow: hidden;
              background: ${f};
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
              color: ${c};
              padding: 0 12px 10px;
            }
            .yt-branding {
              text-align: center;
              margin-top: 16px;
              font-size: 10px;
            }
            .yt-branding a {
              color: ${c};
              text-decoration: none;
              opacity: 0.6;
            }
          </style>
          <div class="yt-wrap">
            ${n?`
            <div class="yt-header">
              ${n.avatar?`<img src="${n.avatar}"
                         class="yt-avatar"
                         alt="${n.name}" />`:""}
              <div>
                <div class="yt-channel-name">${n.name}</div>
                ${n.subscriber_count?`<div class="yt-subs">${n.subscriber_count} subscribers</div>`:""}
              </div>
              <a href="https://youtube.com/channel/${g}"
                 class="yt-subscribe"
                 target="_blank"
                 rel="noopener noreferrer">
                Subscribe
              </a>
            </div>`:""}
            <div class="yt-grid">${m}</div>
            ${p?`
              <div class="yt-branding">
                <a href="${d}"
                   target="_blank"
                   rel="noopener noreferrer">
                  Powered by Devixus Widgets
                </a>
              </div>`:""}
          </div>
        `}).catch(()=>{let o=e.querySelector(".yt-loading");o&&(o.textContent="Failed to load videos")})}function C(e,t,p,d){let l=t.theme||"light",s=t.bg_color||(l==="dark"?"#1a1a2e":"#ffffff"),r=t.text_color||(l==="dark"?"#ffffff":"#1a1a1a"),c=t.accent_color||"#ff6914",f=t.title||"Offer ends in",b=t.style||"blocks";function u(){let i=new Date(t.target_date+"T"+(t.target_time||"00:00")).getTime(),o=Date.now(),n=i-o;return n<=0?null:{days:Math.floor(n/(1e3*60*60*24)),hours:Math.floor(n%(1e3*60*60*24)/(1e3*60*60)),minutes:Math.floor(n%(1e3*60*60)/(1e3*60)),seconds:Math.floor(n%(1e3*60)/1e3)}}function a(i){return String(i).padStart(2,"0")}function g(){let i=u();if(!i){let m=t.expired_message||"This offer has ended";t.redirect_url&&(window.location.href=t.redirect_url),e.innerHTML=`
          <style>
            .ct-wrap {
              font-family: -apple-system, sans-serif;
              background: ${s};
              padding: 24px;
              text-align: center;
              color: ${r};
              border-radius: 8px;
            }
            .ct-expired { font-size: 18px; font-weight: 500; }
          </style>
          <div class="ct-wrap">
            <div class="ct-expired">${m}</div>
          </div>
        `;return}let o=[];t.show_days!==!1&&o.push({value:a(i.days),label:"Days"}),t.show_hours!==!1&&o.push({value:a(i.hours),label:"Hours"}),t.show_minutes!==!1&&o.push({value:a(i.minutes),label:"Minutes"}),t.show_seconds!==!1&&o.push({value:a(i.seconds),label:"Seconds"});let n=b==="blocks"?`
        .ct-unit {
          background: ${c};
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
      `:b==="flip"?`
        .ct-unit {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }
        .ct-value {
          font-size: 48px;
          font-weight: 800;
          color: ${c};
          line-height: 1;
          font-variant-numeric: tabular-nums;
          background: ${s};
          border: 2px solid ${c};
          border-radius: 8px;
          padding: 8px 16px;
          min-width: 80px;
          text-align: center;
        }
        .ct-label {
          font-size: 11px;
          color: ${r};
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
          color: ${c};
          line-height: 1;
          font-variant-numeric: tabular-nums;
        }
        .ct-label {
          font-size: 11px;
          color: ${r};
          opacity: 0.6;
          text-transform: uppercase;
          letter-spacing: .05em;
        }
      `,v=o.map(m=>`
        <div class="ct-unit">
          <div class="ct-value">${m.value}</div>
          ${t.show_labels!==!1?`<div class="ct-label">${m.label}</div>`:""}
        </div>
      `).join(b==="minimal"?'<div class="ct-sep">:</div>':"");e.innerHTML=`
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          .ct-wrap {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: ${s};
            padding: 24px 20px;
            border-radius: 8px;
            text-align: center;
            color: ${r};
          }
          .ct-title {
            font-size: 16px;
            font-weight: 500;
            margin-bottom: 16px;
            color: ${r};
          }
          .ct-units {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            flex-wrap: wrap;
          }
          ${n}
          .ct-sep {
            font-size: 36px;
            font-weight: 700;
            color: ${c};
            margin-bottom: 16px;
          }
          .ct-branding {
            margin-top: 16px;
            font-size: 10px;
          }
          .ct-branding a {
            color: ${r};
            opacity: 0.4;
            text-decoration: none;
          }
        </style>
        <div class="ct-wrap">
          ${f?`<div class="ct-title">${f}</div>`:""}
          <div class="ct-units">${v}</div>
          ${p?`
            <div class="ct-branding">
              <a href="${d}" target="_blank" rel="noopener noreferrer">
                Powered by Devixus Widgets
              </a>
            </div>`:""}
        </div>
      `}g();let x=setInterval(()=>{let i=u();if(!i){clearInterval(x),g();return}let o=e.querySelectorAll(".ct-value"),n=[];t.show_days!==!1&&n.push(a(i.days)),t.show_hours!==!1&&n.push(a(i.hours)),t.show_minutes!==!1&&n.push(a(i.minutes)),t.show_seconds!==!1&&n.push(a(i.seconds)),o.forEach((v,m)=>{n[m]&&(v.textContent=n[m])})},1e3)}function j(e,t,p,d){let l=t.message||"\u{1F389} Welcome to our website!",s=t.bg_color||"#ff6914",r=t.text_color||"#ffffff",c=t.link_color||"#ffffff",f=t.position||"top",b=t.is_sticky!==!1,u=t.show_close_button!==!1,a=t.show_emoji?t.emoji||"\u{1F389}":"",g=t.style||"solid",x=s;g==="gradient"?x=`linear-gradient(135deg, ${s}, ${s}dd)`:g==="striped"&&(x=`repeating-linear-gradient(
        45deg,
        ${s},
        ${s} 10px,
        ${s}ee 10px,
        ${s}ee 20px
      )`);let i=b?`position: fixed; ${f}: 0; left: 0; right: 0; z-index: 999999;`:"position: relative;";if(e.innerHTML=`
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .ab-bar {
          ${i}
          background: ${x};
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
          color: ${c};
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
          right: ${u?"44px":"12px"};
          top: 50%;
          transform: translateY(-50%);
          font-size: 9px;
        }
        .ab-branding a { color: ${r}; opacity: 0.4; text-decoration: none; }
      </style>
      <div class="ab-bar" id="ab-bar">
        <div class="ab-content">
          ${a?`<span>${a}</span>`:""}
          <span class="ab-message">${l}</span>
          ${t.link_text&&t.link_url?`
            <a class="ab-link"
               href="${t.link_url}"
               target="_blank"
               rel="noopener noreferrer">
              ${t.link_text} \u2192
            </a>
          `:""}
        </div>
        ${p?`
          <div class="ab-branding">
            <a href="${d}" target="_blank" rel="noopener noreferrer">Devixus</a>
          </div>`:""}
        ${u?`
          <button class="ab-close" id="ab-close" aria-label="Close">\u2715</button>
        `:""}
      </div>
    `,u){let o=e.getElementById("ab-close"),n=e.getElementById("ab-bar");o&&n&&o.addEventListener("click",()=>{n.style.display="none"})}}function L(e,t){try{let p=window.location.hostname,d=JSON.stringify({widget_id:e,domain:p,event_type:"load"});navigator.sendBeacon?navigator.sendBeacon(`${t}/api/track`,new Blob([d],{type:"application/json"})):fetch(`${t}/api/track`,{method:"POST",body:d,headers:{"Content-Type":"application/json"},keepalive:!0}).catch(()=>{})}catch(p){}}function R(e,t){switch(t.type){case"whatsapp":z(e,t.config,t.show_branding);break;case"testimonials":M(e,t.config,t.show_branding);break;case"youtube_feed":T(e,t.config,t.show_branding,h);break;case"countdown_timer":C(e,t.config,t.show_branding,h);break;case"announcement_bar":j(e,t.config,t.show_branding,h);break;default:console.warn(`[Devixus] Unknown widget type: ${t.type}`)}}async function $(){let e=k();if(!e)return;let t=e.getAttribute("data-widget-id");if(!t){console.warn("[Devixus] Missing data-widget-id attribute on script tag");return}let p=e.getAttribute("data-mount")||null;try{let d=await _(t),l=p&&document.querySelector(p)||document.body,s=S(l);R(s,d),L(t,h)}catch(d){console.warn("[Devixus] Widget failed to load:",d)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",$):$()})();})();

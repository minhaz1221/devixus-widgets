"use strict";(()=>{(function(){"use strict";let l="https://devixus-widgets-web.vercel.app",p="https://devixus-widgets-marketing.vercel.app";function b(){if(document.currentScript)return document.currentScript;let e=document.getElementsByTagName("script");return e[e.length-1]}async function f(e){let t=await fetch(`${l}/api/widget/${e}`,{method:"GET",headers:{"Content-Type":"application/json"}});if(!t.ok)throw new Error(`Widget not found: ${e}`);return t.json()}function h(e){let t=document.createElement("div");return t.setAttribute("data-devixus-widget","true"),t.style.cssText="all: initial; display: block;",e.appendChild(t),t.attachShadow({mode:"open"})}function x(e,t,a){let n=t.phone_number||"",o=encodeURIComponent(t.welcome_message||"Hello!"),s=t.button_color||"#25D366",i=t.position||"bottom-right",c=i==="bottom-right"?"bottom: 24px; right: 24px;":"bottom: 24px; left: 24px;",d=i==="bottom-right"?"flex-end":"flex-start";e.innerHTML=`
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .wa-btn {
          position: fixed;
          ${c}
          z-index: 9999;
          display: flex;
          flex-direction: column;
          align-items: ${d};
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
           href="https://wa.me/${n}?text=${o}"
           target="_blank"
           rel="noopener noreferrer"
           aria-label="Chat on WhatsApp">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>
        ${a?`<a class="wa-branding" href="${p}" target="_blank" rel="noopener noreferrer">Powered by Devixus</a>`:""}
      </div>
    `}function m(e,t,a){let n=t.testimonials||[],o=t.theme||"light",s=t.show_rating!==!1,i=o==="dark"?"#1a1a1a":"#ffffff",c=o==="dark"?"#ffffff":"#1a1a1a",d=o==="dark"?"#aaaaaa":"#666666",y=o==="dark"?"#2a2a2a":"#f9f9f9",$=n.map(r=>{let u=r.rating||5,k=s?`<div class="stars">${"\u2605".repeat(u)}${"\u2606".repeat(5-u)}</div>`:"",S=r.avatar_url?`<img src="${r.avatar_url}" class="avatar" alt="${r.author}" />`:"";return`
        <div class="card">
          ${k}
          <p class="content">"${r.content}"</p>
          <div class="author-row">
            ${S}
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
          background: ${y};
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
          color: ${d};
          font-size: 12px;
        }
        .branding {
          text-align: center;
          margin-top: 12px;
          font-size: 10px;
        }
        .branding a {
          color: ${d};
          text-decoration: none;
          opacity: 0.6;
        }
        .branding a:hover { opacity: 1; }
      </style>
      <div class="wrap">
        <div class="track">${$}</div>
        ${a?`<div class="branding"><a href="${p}" target="_blank" rel="noopener noreferrer">Powered by Devixus Widgets</a></div>`:""}
      </div>
    `}function w(e,t){try{let a=window.location.hostname,n=JSON.stringify({widget_id:e,domain:a,event_type:"load"});navigator.sendBeacon?navigator.sendBeacon(`${t}/api/track`,new Blob([n],{type:"application/json"})):fetch(`${t}/api/track`,{method:"POST",body:n,headers:{"Content-Type":"application/json"},keepalive:!0}).catch(()=>{})}catch(a){}}function v(e,t){switch(t.type){case"whatsapp":x(e,t.config,t.show_branding);break;case"testimonials":m(e,t.config,t.show_branding);break;default:console.warn(`[Devixus] Unknown widget type: ${t.type}`)}}async function g(){let e=b();if(!e)return;let t=e.getAttribute("data-widget-id");if(!t){console.warn("[Devixus] Missing data-widget-id attribute on script tag");return}let a=e.getAttribute("data-mount")||null;try{let n=await f(t),o=a&&document.querySelector(a)||document.body,s=h(o);v(s,n),w(t,l)}catch(n){console.warn("[Devixus] Widget failed to load:",n)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",g):g()})();})();

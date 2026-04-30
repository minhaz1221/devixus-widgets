"use strict";(()=>{(function(){"use strict";let m="https://devixus-widgets-web.vercel.app",$="https://devixus-widgets-marketing.vercel.app";function z(){if(document.currentScript)return document.currentScript;let t=document.getElementsByTagName("script");return t[t.length-1]}async function S(t){let e=await fetch(`${m}/api/widget/${t}`,{method:"GET",headers:{"Content-Type":"application/json"}});if(!e.ok)throw new Error(`Widget not found: ${t}`);return e.json()}function k(t){let e=document.createElement("div");return e.setAttribute("data-devixus-widget","true"),e.style.cssText="all: initial; display: block;",t.appendChild(e),e.attachShadow({mode:"open"})}function M(t,e,p){let d=e.phone_number||"",s=encodeURIComponent(e.welcome_message||"Hello!"),c=e.button_color||"#25D366",n=e.position||"bottom-right",r=n==="bottom-right"?"bottom: 24px; right: 24px;":"bottom: 24px; left: 24px;",f=n==="bottom-right"?"flex-end":"flex-start";t.innerHTML=`
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .wa-btn {
          position: fixed;
          ${r}
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
          background: ${c};
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
           href="https://wa.me/${d}?text=${s}"
           target="_blank"
           rel="noopener noreferrer"
           aria-label="Chat on WhatsApp">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>
        ${p?`<a class="wa-branding" href="${$}" target="_blank" rel="noopener noreferrer">Powered by Devixus</a>`:""}
      </div>
    `}function T(t,e,p){let d=e.testimonials||[],s=e.theme||"light",c=e.show_rating!==!1,n=s==="dark"?"#1a1a1a":"#ffffff",r=s==="dark"?"#ffffff":"#1a1a1a",f=s==="dark"?"#aaaaaa":"#666666",x=s==="dark"?"#2a2a2a":"#f9f9f9",b=d.map(l=>{let u=l.rating||5,v=c?`<div class="stars">${"\u2605".repeat(u)}${"\u2606".repeat(5-u)}</div>`:"",a=l.avatar_url?`<img src="${l.avatar_url}" class="avatar" alt="${l.author}" />`:"";return`
        <div class="card">
          ${v}
          <p class="content">"${l.content}"</p>
          <div class="author-row">
            ${a}
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
          background: ${n};
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
          color: ${r};
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
          color: ${r};
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
        <div class="track">${b}</div>
        ${p?`<div class="branding"><a href="${$}" target="_blank" rel="noopener noreferrer">Powered by Devixus Widgets</a></div>`:""}
      </div>
    `}function j(t,e,p,d){let s=e.theme||"light",c=s==="dark"?"#0f0f0f":"#ffffff",n=s==="dark"?"#ffffff":"#0f0f0f",r=s==="dark"?"#aaaaaa":"#606060",f=s==="dark"?"#1a1a1a":"#f9f9f9",x=e.accent_color||"#ff0000",b=e.columns||3,l=e.layout||"grid";t.innerHTML=`
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .yt-wrap {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: ${c};
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
    `;let u=e.channel_id,v=e.max_results||6,a=`${d}/api/youtube?channel_id=${u}&max_results=${v}`;fetch(a).then(o=>o.json()).then(o=>{if(!o.videos||o.videos.length===0){t.innerHTML=`
            <div style="padding:20px;text-align:center;
              color:${r};font-family:sans-serif;">
              No videos found
            </div>`;return}let i=o.channel,h=o.videos.map(g=>`
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
        `).join(""),w=l==="grid"?`grid-template-columns: repeat(${b}, 1fr);`:l==="list"?"grid-template-columns: 1fr;":"grid-auto-flow: column; grid-auto-columns: 280px;";t.innerHTML=`
          <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            .yt-wrap {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              background: ${c};
              padding: 20px;
              color: ${n};
            }
            .yt-header {
              display: flex;
              align-items: center;
              gap: 12px;
              margin-bottom: 20px;
              padding-bottom: 16px;
              border-bottom: 1px solid ${s==="dark"?"#333":"#eee"};
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
              ${w}
              gap: 16px;
              ${l==="carousel"?"overflow-x: auto; scrollbar-width: none;":""}
            }
            .yt-grid::-webkit-scrollbar { display: none; }
            .yt-card {
              text-decoration: none;
              color: ${n};
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
            ${i?`
            <div class="yt-header">
              ${i.avatar?`<img src="${i.avatar}"
                         class="yt-avatar"
                         alt="${i.name}" />`:""}
              <div>
                <div class="yt-channel-name">${i.name}</div>
                ${i.subscriber_count?`<div class="yt-subs">${i.subscriber_count} subscribers</div>`:""}
              </div>
              <a href="https://youtube.com/channel/${u}"
                 class="yt-subscribe"
                 target="_blank"
                 rel="noopener noreferrer">
                Subscribe
              </a>
            </div>`:""}
            <div class="yt-grid">${h}</div>
            ${p?`
              <div class="yt-branding">
                <a href="${d}"
                   target="_blank"
                   rel="noopener noreferrer">
                  Powered by Devixus Widgets
                </a>
              </div>`:""}
          </div>
        `}).catch(()=>{let o=t.querySelector(".yt-loading");o&&(o.textContent="Failed to load videos")})}function C(t,e,p,d){let s=e.theme||"light",c=s==="dark"?"#1a1a1a":"#ffffff",n=s==="dark"?"#ffffff":"#1a1a1a",r=s==="dark"?"#aaaaaa":"#666666",f=s==="dark"?"#2a2a2a":"#f9f9f9",x=e.accent_color||"#4285f4",b=e.layout||"grid";if(t.innerHTML=`
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .gr-wrap {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: ${c};
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
    `,!e.place_id){let a=t.querySelector(".gr-wrap");a&&(a.innerHTML=`<div class="gr-loading" style="color:${r}">No business configured</div>`);return}let l=e.max_reviews||6,u=e.min_rating||1,v=`${d}/api/google-reviews?place_id=${encodeURIComponent(e.place_id)}&max_reviews=${l}&min_rating=${u}`;fetch(v).then(a=>a.json()).then(a=>{if(!a.reviews||a.reviews.length===0){t.innerHTML=`
            <div style="padding:20px;text-align:center;
              color:${r};font-family:sans-serif;background:${c};">
              No reviews found
            </div>`;return}let o=a.place,i=a.reviews;function y(g){return Array.from({length:5},(D,I)=>`<span style="color:${I<g?"#fbbc04":"#dadce0"}">\u2605</span>`).join("")}let h=i.map(g=>`
          <div class="gr-card">
            <div class="gr-card-header">
              ${e.show_reviewer_photo!==!1&&g.author_photo?`<img src="${g.author_photo}" class="gr-avatar" alt="${g.author_name}" />`:`<div class="gr-avatar-placeholder">${g.author_name.charAt(0).toUpperCase()}</div>`}
              <div class="gr-author-info">
                <div class="gr-author">${g.author_name}</div>
                ${e.show_review_date!==!1?`<div class="gr-date">${g.relative_time}</div>`:""}
              </div>
            </div>
            <div class="gr-stars">${y(g.rating)}</div>
            ${g.text?`<p class="gr-text">${g.text}</p>`:""}
          </div>
        `).join(""),w=b==="grid"?"grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));":b==="carousel"?"grid-auto-flow: column; grid-auto-columns: 300px; overflow-x: auto;":"grid-template-columns: 1fr;";t.innerHTML=`
          <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            .gr-wrap {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              background: ${c};
              padding: 20px;
              color: ${n};
            }
            .gr-header {
              display: flex;
              align-items: flex-start;
              justify-content: space-between;
              margin-bottom: 20px;
              padding-bottom: 16px;
              border-bottom: 1px solid ${s==="dark"?"#333":"#eee"};
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
              ${w}
              gap: 16px;
              scrollbar-width: none;
            }
            .gr-grid::-webkit-scrollbar { display: none; }
            .gr-card {
              background: ${f};
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
            ${e.show_header!==!1&&o?`
            <div class="gr-header">
              <div>
                <div class="gr-place-name">${o.name}</div>
                <div class="gr-place-address">${o.address||""}</div>
                ${e.write_review_link&&o.google_url?`
                  <a href="${o.google_url}"
                     class="gr-write-link"
                     target="_blank"
                     rel="noopener noreferrer">Write a review \u2197</a>`:""}
              </div>
              ${e.show_overall_rating!==!1?`
              <div class="gr-overall">
                <div class="gr-overall-score">${o.overall_rating}</div>
                <div class="gr-overall-stars">${y(Math.round(o.overall_rating))}</div>
                <div class="gr-overall-count">${o.total_reviews} reviews</div>
                <div class="gr-google-badge">
                  <span class="gr-google-logo">G</span>
                  <span style="font-size:11px;color:${r}">Google Reviews</span>
                </div>
              </div>`:""}
            </div>`:""}
            <div class="gr-grid">${h}</div>
            ${p?`
              <div class="gr-branding">
                <a href="${d}" target="_blank" rel="noopener noreferrer">
                  Powered by Devixus Widgets
                </a>
              </div>`:""}
          </div>
        `}).catch(()=>{let a=t.querySelector(".gr-loading");a&&(a.textContent="Failed to load reviews")})}function L(t,e,p,d){let s=e.theme||"light",c=e.bg_color||(s==="dark"?"#1a1a2e":"#ffffff"),n=e.text_color||(s==="dark"?"#ffffff":"#1a1a1a"),r=e.accent_color||"#ff6914",f=e.title||"Offer ends in",x=e.style||"blocks";function b(){let a=new Date(e.target_date+"T"+(e.target_time||"00:00")).getTime(),o=Date.now(),i=a-o;return i<=0?null:{days:Math.floor(i/(1e3*60*60*24)),hours:Math.floor(i%(1e3*60*60*24)/(1e3*60*60)),minutes:Math.floor(i%(1e3*60*60)/(1e3*60)),seconds:Math.floor(i%(1e3*60)/1e3)}}function l(a){return String(a).padStart(2,"0")}function u(){let a=b();if(!a){let h=e.expired_message||"This offer has ended";e.redirect_url&&(window.location.href=e.redirect_url),t.innerHTML=`
          <style>
            .ct-wrap {
              font-family: -apple-system, sans-serif;
              background: ${c};
              padding: 24px;
              text-align: center;
              color: ${n};
              border-radius: 8px;
            }
            .ct-expired { font-size: 18px; font-weight: 500; }
          </style>
          <div class="ct-wrap">
            <div class="ct-expired">${h}</div>
          </div>
        `;return}let o=[];e.show_days!==!1&&o.push({value:l(a.days),label:"Days"}),e.show_hours!==!1&&o.push({value:l(a.hours),label:"Hours"}),e.show_minutes!==!1&&o.push({value:l(a.minutes),label:"Minutes"}),e.show_seconds!==!1&&o.push({value:l(a.seconds),label:"Seconds"});let i=x==="blocks"?`
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
          color: ${r};
          line-height: 1;
          font-variant-numeric: tabular-nums;
          background: ${c};
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
      `,y=o.map(h=>`
        <div class="ct-unit">
          <div class="ct-value">${h.value}</div>
          ${e.show_labels!==!1?`<div class="ct-label">${h.label}</div>`:""}
        </div>
      `).join(x==="minimal"?'<div class="ct-sep">:</div>':"");t.innerHTML=`
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          .ct-wrap {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: ${c};
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
          ${i}
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
          ${f?`<div class="ct-title">${f}</div>`:""}
          <div class="ct-units">${y}</div>
          ${p?`
            <div class="ct-branding">
              <a href="${d}" target="_blank" rel="noopener noreferrer">
                Powered by Devixus Widgets
              </a>
            </div>`:""}
        </div>
      `}u();let v=setInterval(()=>{let a=b();if(!a){clearInterval(v),u();return}let o=t.querySelectorAll(".ct-value"),i=[];e.show_days!==!1&&i.push(l(a.days)),e.show_hours!==!1&&i.push(l(a.hours)),e.show_minutes!==!1&&i.push(l(a.minutes)),e.show_seconds!==!1&&i.push(l(a.seconds)),o.forEach((y,h)=>{i[h]&&(y.textContent=i[h])})},1e3)}function R(t,e,p,d){let s=e.message||"\u{1F389} Welcome to our website!",c=e.bg_color||"#ff6914",n=e.text_color||"#ffffff",r=e.link_color||"#ffffff",f=e.position||"top",x=e.is_sticky!==!1,b=e.show_close_button!==!1,l=e.show_emoji?e.emoji||"\u{1F389}":"",u=e.style||"solid",v=c;u==="gradient"?v=`linear-gradient(135deg, ${c}, ${c}dd)`:u==="striped"&&(v=`repeating-linear-gradient(
        45deg,
        ${c},
        ${c} 10px,
        ${c}ee 10px,
        ${c}ee 20px
      )`);let a=x?`position: fixed; ${f}: 0; left: 0; right: 0; z-index: 999999;`:"position: relative;";if(t.innerHTML=`
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .ab-bar {
          ${a}
          background: ${v};
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
          right: ${b?"44px":"12px"};
          top: 50%;
          transform: translateY(-50%);
          font-size: 9px;
        }
        .ab-branding a { color: ${n}; opacity: 0.4; text-decoration: none; }
      </style>
      <div class="ab-bar" id="ab-bar">
        <div class="ab-content">
          ${l?`<span>${l}</span>`:""}
          <span class="ab-message">${s}</span>
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
        ${b?`
          <button class="ab-close" id="ab-close" aria-label="Close">\u2715</button>
        `:""}
      </div>
    `,b){let o=t.getElementById("ab-close"),i=t.getElementById("ab-bar");o&&i&&o.addEventListener("click",()=>{i.style.display="none"})}}function U(t,e,p){let d=`${p}/dashboard/billing`;t.innerHTML=`
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
    `}function B(t,e){try{let p=window.location.hostname,d=JSON.stringify({widget_id:t,domain:p,event_type:"load"});navigator.sendBeacon?navigator.sendBeacon(`${e}/api/track`,new Blob([d],{type:"application/json"})):fetch(`${e}/api/track`,{method:"POST",body:d,headers:{"Content-Type":"application/json"},keepalive:!0}).catch(()=>{})}catch(p){}}function H(t,e){switch(e.type){case"whatsapp":M(t,e.config,e.show_branding);break;case"testimonials":T(t,e.config,e.show_branding);break;case"youtube_feed":j(t,e.config,e.show_branding,m);break;case"google_reviews":C(t,e.config,e.show_branding,m);break;case"countdown_timer":L(t,e.config,e.show_branding,m);break;case"announcement_bar":R(t,e.config,e.show_branding,m);break;default:console.warn(`[Devixus] Unknown widget type: ${e.type}`)}}async function _(){let t=z();if(!t)return;let e=t.getAttribute("data-widget-id");if(!e){console.warn("[Devixus] Missing data-widget-id attribute on script tag");return}let p=t.getAttribute("data-mount")||null;try{let d=await S(e),s=p&&document.querySelector(p)||document.body;if(d.limit_reached){let n=k(s);U(n,d,m);return}let c=k(s);H(c,d),B(e,m)}catch(d){console.warn("[Devixus] Widget failed to load:",d)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",_):_()})();})();

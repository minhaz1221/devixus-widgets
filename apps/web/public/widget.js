"use strict";(()=>{(function(){"use strict";let y="https://devixus-widgets-web.vercel.app",$="https://devixus-widgets-marketing.vercel.app";function _(){if(document.currentScript)return document.currentScript;let t=document.getElementsByTagName("script");return t[t.length-1]}async function z(t){let e=await fetch(`${y}/api/widget/${t}`,{method:"GET",headers:{"Content-Type":"application/json"}});if(!e.ok)throw new Error(`Widget not found: ${t}`);return e.json()}function S(t){let e=document.createElement("div");return e.setAttribute("data-devixus-widget","true"),e.style.cssText="all: initial; display: block;",t.appendChild(e),e.attachShadow({mode:"open"})}function M(t,e,p){let c=e.phone_number||"",s=encodeURIComponent(e.welcome_message||"Hello!"),d=e.button_color||"#25D366",r=e.position||"bottom-right",o=r==="bottom-right"?"bottom: 24px; right: 24px;":"bottom: 24px; left: 24px;",f=r==="bottom-right"?"flex-end":"flex-start";t.innerHTML=`
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .wa-btn {
          position: fixed;
          ${o}
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
          background: ${d};
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
           href="https://wa.me/${c}?text=${s}"
           target="_blank"
           rel="noopener noreferrer"
           aria-label="Chat on WhatsApp">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>
        ${p?`<a class="wa-branding" href="${$}" target="_blank" rel="noopener noreferrer">Powered by Devixus</a>`:""}
      </div>
    `}function T(t,e,p){let c=e.testimonials||[],s=e.theme||"light",d=e.show_rating!==!1,r=s==="dark"?"#1a1a1a":"#ffffff",o=s==="dark"?"#ffffff":"#1a1a1a",f=s==="dark"?"#aaaaaa":"#666666",u=s==="dark"?"#2a2a2a":"#f9f9f9",x=c.map(l=>{let b=l.rating||5,m=d?`<div class="stars">${"\u2605".repeat(b)}${"\u2606".repeat(5-b)}</div>`:"",a=l.avatar_url?`<img src="${l.avatar_url}" class="avatar" alt="${l.author}" />`:"";return`
        <div class="card">
          ${m}
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
          background: ${u};
          border-radius: 12px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .stars { color: #f59e0b; font-size: 16px; letter-spacing: 2px; }
        .content {
          color: ${o};
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
          color: ${o};
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
        <div class="track">${x}</div>
        ${p?`<div class="branding"><a href="${$}" target="_blank" rel="noopener noreferrer">Powered by Devixus Widgets</a></div>`:""}
      </div>
    `}function j(t,e,p,c){let s=e.theme||"light",d=s==="dark"?"#0f0f0f":"#ffffff",r=s==="dark"?"#ffffff":"#0f0f0f",o=s==="dark"?"#aaaaaa":"#606060",f=s==="dark"?"#1a1a1a":"#f9f9f9",u=e.accent_color||"#ff0000",x=e.columns||3,l=e.layout||"grid";t.innerHTML=`
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .yt-wrap {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: ${d};
          padding: 20px;
          color: ${r};
        }
        .yt-loading {
          text-align: center;
          padding: 40px;
          color: ${o};
          font-size: 14px;
        }
      </style>
      <div class="yt-wrap">
        <div class="yt-loading">Loading videos...</div>
      </div>
    `;let b=e.channel_id,m=e.max_results||6,a=`${c}/api/youtube?channel_id=${b}&max_results=${m}`;fetch(a).then(n=>n.json()).then(n=>{if(!n.videos||n.videos.length===0){t.innerHTML=`
            <div style="padding:20px;text-align:center;
              color:${o};font-family:sans-serif;">
              No videos found
            </div>`;return}let i=n.channel,h=n.videos.map(g=>`
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
        `).join(""),w=l==="grid"?`grid-template-columns: repeat(${x}, 1fr);`:l==="list"?"grid-template-columns: 1fr;":"grid-auto-flow: column; grid-auto-columns: 280px;";t.innerHTML=`
          <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            .yt-wrap {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              background: ${d};
              padding: 20px;
              color: ${r};
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
              color: ${r};
            }
            .yt-subs {
              font-size: 12px;
              color: ${o};
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
              ${w}
              gap: 16px;
              ${l==="carousel"?"overflow-x: auto; scrollbar-width: none;":""}
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
              color: ${o};
              padding: 0 12px 10px;
            }
            .yt-branding {
              text-align: center;
              margin-top: 16px;
              font-size: 10px;
            }
            .yt-branding a {
              color: ${o};
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
              <a href="https://youtube.com/channel/${b}"
                 class="yt-subscribe"
                 target="_blank"
                 rel="noopener noreferrer">
                Subscribe
              </a>
            </div>`:""}
            <div class="yt-grid">${h}</div>
            ${p?`
              <div class="yt-branding">
                <a href="${c}"
                   target="_blank"
                   rel="noopener noreferrer">
                  Powered by Devixus Widgets
                </a>
              </div>`:""}
          </div>
        `}).catch(()=>{let n=t.querySelector(".yt-loading");n&&(n.textContent="Failed to load videos")})}function C(t,e,p,c){let s=e.theme||"light",d=s==="dark"?"#1a1a1a":"#ffffff",r=s==="dark"?"#ffffff":"#1a1a1a",o=s==="dark"?"#aaaaaa":"#666666",f=s==="dark"?"#2a2a2a":"#f9f9f9",u=e.accent_color||"#4285f4",x=e.layout||"grid";if(t.innerHTML=`
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .gr-wrap {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: ${d};
          padding: 20px;
          color: ${r};
        }
        .gr-loading {
          text-align: center;
          padding: 40px;
          color: ${o};
          font-size: 14px;
        }
      </style>
      <div class="gr-wrap">
        <div class="gr-loading">Loading reviews...</div>
      </div>
    `,!e.place_id){let a=t.querySelector(".gr-wrap");a&&(a.innerHTML=`<div class="gr-loading" style="color:${o}">No business configured</div>`);return}let l=e.max_reviews||6,b=e.min_rating||1,m=`${c}/api/google-reviews?place_id=${encodeURIComponent(e.place_id)}&max_reviews=${l}&min_rating=${b}`;fetch(m).then(a=>a.json()).then(a=>{if(!a.reviews||a.reviews.length===0){t.innerHTML=`
            <div style="padding:20px;text-align:center;
              color:${o};font-family:sans-serif;background:${d};">
              No reviews found
            </div>`;return}let n=a.place,i=a.reviews;function v(g){return Array.from({length:5},(D,I)=>`<span style="color:${I<g?"#fbbc04":"#dadce0"}">\u2605</span>`).join("")}let h=i.map(g=>`
          <div class="gr-card">
            <div class="gr-card-header">
              ${e.show_reviewer_photo!==!1&&g.author_photo?`<img src="${g.author_photo}" class="gr-avatar" alt="${g.author_name}" />`:`<div class="gr-avatar-placeholder">${g.author_name.charAt(0).toUpperCase()}</div>`}
              <div class="gr-author-info">
                <div class="gr-author">${g.author_name}</div>
                ${e.show_review_date!==!1?`<div class="gr-date">${g.relative_time}</div>`:""}
              </div>
            </div>
            <div class="gr-stars">${v(g.rating)}</div>
            ${g.text?`<p class="gr-text">${g.text}</p>`:""}
          </div>
        `).join(""),w=x==="grid"?"grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));":x==="carousel"?"grid-auto-flow: column; grid-auto-columns: 300px; overflow-x: auto;":"grid-template-columns: 1fr;";t.innerHTML=`
          <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            .gr-wrap {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              background: ${d};
              padding: 20px;
              color: ${r};
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
              color: ${r};
              margin-bottom: 4px;
            }
            .gr-place-address { font-size: 12px; color: ${o}; }
            .gr-overall {
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 4px;
            }
            .gr-overall-score {
              font-size: 36px;
              font-weight: 700;
              color: ${r};
              line-height: 1;
            }
            .gr-overall-stars { font-size: 18px; }
            .gr-overall-count { font-size: 11px; color: ${o}; }
            .gr-write-link {
              display: inline-block;
              margin-top: 8px;
              font-size: 12px;
              color: ${u};
              text-decoration: none;
            }
            .gr-google-badge {
              display: flex;
              align-items: center;
              gap: 6px;
              margin-top: 4px;
            }
            .gr-google-logo { font-size: 12px; font-weight: 700; color: ${u}; }
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
              background: ${u};
              color: white;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 16px;
              font-weight: 600;
              flex-shrink: 0;
            }
            .gr-author { font-size: 14px; font-weight: 500; color: ${r}; }
            .gr-date { font-size: 11px; color: ${o}; margin-top: 1px; }
            .gr-stars { font-size: 15px; letter-spacing: 1px; }
            .gr-text {
              font-size: 13px;
              color: ${o};
              line-height: 1.6;
              display: -webkit-box;
              -webkit-line-clamp: 4;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }
            .gr-branding { text-align: center; margin-top: 16px; font-size: 10px; }
            .gr-branding a { color: ${o}; text-decoration: none; opacity: 0.6; }
          </style>
          <div class="gr-wrap">
            ${e.show_header!==!1&&n?`
            <div class="gr-header">
              <div>
                <div class="gr-place-name">${n.name}</div>
                <div class="gr-place-address">${n.address||""}</div>
                ${e.write_review_link&&n.google_url?`
                  <a href="${n.google_url}"
                     class="gr-write-link"
                     target="_blank"
                     rel="noopener noreferrer">Write a review \u2197</a>`:""}
              </div>
              ${e.show_overall_rating!==!1?`
              <div class="gr-overall">
                <div class="gr-overall-score">${n.overall_rating}</div>
                <div class="gr-overall-stars">${v(Math.round(n.overall_rating))}</div>
                <div class="gr-overall-count">${n.total_reviews} reviews</div>
                <div class="gr-google-badge">
                  <span class="gr-google-logo">G</span>
                  <span style="font-size:11px;color:${o}">Google Reviews</span>
                </div>
              </div>`:""}
            </div>`:""}
            <div class="gr-grid">${h}</div>
            ${p?`
              <div class="gr-branding">
                <a href="${c}" target="_blank" rel="noopener noreferrer">
                  Powered by Devixus Widgets
                </a>
              </div>`:""}
          </div>
        `}).catch(()=>{let a=t.querySelector(".gr-loading");a&&(a.textContent="Failed to load reviews")})}function L(t,e,p,c){let s=e.theme||"light",d=e.bg_color||(s==="dark"?"#1a1a2e":"#ffffff"),r=e.text_color||(s==="dark"?"#ffffff":"#1a1a1a"),o=e.accent_color||"#ff6914",f=e.title||"Offer ends in",u=e.style||"blocks";function x(){let a=new Date(e.target_date+"T"+(e.target_time||"00:00")).getTime(),n=Date.now(),i=a-n;return i<=0?null:{days:Math.floor(i/(1e3*60*60*24)),hours:Math.floor(i%(1e3*60*60*24)/(1e3*60*60)),minutes:Math.floor(i%(1e3*60*60)/(1e3*60)),seconds:Math.floor(i%(1e3*60)/1e3)}}function l(a){return String(a).padStart(2,"0")}function b(){let a=x();if(!a){let h=e.expired_message||"This offer has ended";e.redirect_url&&(window.location.href=e.redirect_url),t.innerHTML=`
          <style>
            .ct-wrap {
              font-family: -apple-system, sans-serif;
              background: ${d};
              padding: 24px;
              text-align: center;
              color: ${r};
              border-radius: 8px;
            }
            .ct-expired { font-size: 18px; font-weight: 500; }
          </style>
          <div class="ct-wrap">
            <div class="ct-expired">${h}</div>
          </div>
        `;return}let n=[];e.show_days!==!1&&n.push({value:l(a.days),label:"Days"}),e.show_hours!==!1&&n.push({value:l(a.hours),label:"Hours"}),e.show_minutes!==!1&&n.push({value:l(a.minutes),label:"Minutes"}),e.show_seconds!==!1&&n.push({value:l(a.seconds),label:"Seconds"});let i=u==="blocks"?`
        .ct-unit {
          background: ${o};
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
      `:u==="flip"?`
        .ct-unit {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }
        .ct-value {
          font-size: 48px;
          font-weight: 800;
          color: ${o};
          line-height: 1;
          font-variant-numeric: tabular-nums;
          background: ${d};
          border: 2px solid ${o};
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
          color: ${o};
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
      `,v=n.map(h=>`
        <div class="ct-unit">
          <div class="ct-value">${h.value}</div>
          ${e.show_labels!==!1?`<div class="ct-label">${h.label}</div>`:""}
        </div>
      `).join(u==="minimal"?'<div class="ct-sep">:</div>':"");t.innerHTML=`
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          .ct-wrap {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: ${d};
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
          ${i}
          .ct-sep {
            font-size: 36px;
            font-weight: 700;
            color: ${o};
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
              <a href="${c}" target="_blank" rel="noopener noreferrer">
                Powered by Devixus Widgets
              </a>
            </div>`:""}
        </div>
      `}b();let m=setInterval(()=>{let a=x();if(!a){clearInterval(m),b();return}let n=t.querySelectorAll(".ct-value"),i=[];e.show_days!==!1&&i.push(l(a.days)),e.show_hours!==!1&&i.push(l(a.hours)),e.show_minutes!==!1&&i.push(l(a.minutes)),e.show_seconds!==!1&&i.push(l(a.seconds)),n.forEach((v,h)=>{i[h]&&(v.textContent=i[h])})},1e3)}function R(t,e,p,c){let s=e.message||"\u{1F389} Welcome to our website!",d=e.bg_color||"#ff6914",r=e.text_color||"#ffffff",o=e.link_color||"#ffffff",f=e.position||"top",u=e.is_sticky!==!1,x=e.show_close_button!==!1,l=e.show_emoji?e.emoji||"\u{1F389}":"",b=e.style||"solid",m=d;b==="gradient"?m=`linear-gradient(135deg, ${d}, ${d}dd)`:b==="striped"&&(m=`repeating-linear-gradient(
        45deg,
        ${d},
        ${d} 10px,
        ${d}ee 10px,
        ${d}ee 20px
      )`);let a=u?`position: fixed; ${f}: 0; left: 0; right: 0; z-index: 999999;`:"position: relative;";if(t.innerHTML=`
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .ab-bar {
          ${a}
          background: ${m};
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
          color: ${o};
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
          right: ${x?"44px":"12px"};
          top: 50%;
          transform: translateY(-50%);
          font-size: 9px;
        }
        .ab-branding a { color: ${r}; opacity: 0.4; text-decoration: none; }
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
            <a href="${c}" target="_blank" rel="noopener noreferrer">Devixus</a>
          </div>`:""}
        ${x?`
          <button class="ab-close" id="ab-close" aria-label="Close">\u2715</button>
        `:""}
      </div>
    `,x){let n=t.getElementById("ab-close"),i=t.getElementById("ab-bar");n&&i&&n.addEventListener("click",()=>{i.style.display="none"})}}function B(t,e){try{let p=window.location.hostname,c=JSON.stringify({widget_id:t,domain:p,event_type:"load"});navigator.sendBeacon?navigator.sendBeacon(`${e}/api/track`,new Blob([c],{type:"application/json"})):fetch(`${e}/api/track`,{method:"POST",body:c,headers:{"Content-Type":"application/json"},keepalive:!0}).catch(()=>{})}catch(p){}}function H(t,e){switch(e.type){case"whatsapp":M(t,e.config,e.show_branding);break;case"testimonials":T(t,e.config,e.show_branding);break;case"youtube_feed":j(t,e.config,e.show_branding,y);break;case"google_reviews":C(t,e.config,e.show_branding,y);break;case"countdown_timer":L(t,e.config,e.show_branding,y);break;case"announcement_bar":R(t,e.config,e.show_branding,y);break;default:console.warn(`[Devixus] Unknown widget type: ${e.type}`)}}async function k(){let t=_();if(!t)return;let e=t.getAttribute("data-widget-id");if(!e){console.warn("[Devixus] Missing data-widget-id attribute on script tag");return}let p=t.getAttribute("data-mount")||null;try{let c=await z(e),s=p&&document.querySelector(p)||document.body,d=S(s);H(d,c),B(e,y)}catch(c){console.warn("[Devixus] Widget failed to load:",c)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",k):k()})();})();

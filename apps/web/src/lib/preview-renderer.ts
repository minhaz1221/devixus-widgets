/**
 * @param realData  Optional live API data fetched after user connects a channel/place.
 *                  When provided, overrides the built-in mock data so the preview shows
 *                  real thumbnails, channel names, reviews, etc.
 */
export function generatePreviewHTML(
  widgetType: string,
  config: Record<string, unknown>,
  realData?: Record<string, unknown> | null,
): string {
  const mock = getMockData(widgetType)
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; min-height: 100vh; }
img { display: block; }
</style>
</head>
<body>
<div id="root"></div>
<script>
(function() {
var C = ${JSON.stringify(config)};
var M = ${JSON.stringify(mock)};
var R = ${JSON.stringify(realData ?? null)};
var root = document.getElementById('root');
function stars(n) {
  var s = '';
  for (var i = 1; i <= 5; i++) s += '<span style="color:' + (i <= n ? '#f59e0b' : '#e5e7eb') + ';font-size:14px;">&#9733;</span>';
  return s;
}
function el(tag, style, html, attrs) {
  var a = attrs ? Object.keys(attrs).map(function(k){ return k + '="' + attrs[k] + '"'; }).join(' ') : '';
  return '<' + tag + (style ? ' style="' + style + '"' : '') + (a ? ' ' + a : '') + '>' + (html || '') + '</' + tag + '>';
}
try {
${getRenderer(widgetType)}
} catch(e) {
  root.innerHTML = '<div style="padding:40px;text-align:center;color:#94a3b8;font-size:13px;"><div style="font-size:32px;margin-bottom:8px;">&#128260;</div>Preview rendering...</div>';
}
})();
</script>
</body>
</html>`
}

function getMockData(widgetType: string): Record<string, unknown> {
  const colors = ['#FF6B6B','#4ECDC4','#45B7D1','#96CEB4','#FFEAA7','#DDA0DD','#98D8C8','#F7DC6F','#BB8FCE']
  const all: Record<string, unknown> = {
    faq_accordion: {
      questions: [
        { q: 'How do I get started?', a: 'Simply sign up for a free account, choose a widget type, configure it visually, and copy the embed code to your website.' },
        { q: 'Do I need coding skills?', a: 'Not at all! Our drag-and-drop editor makes it easy for anyone to create and customize widgets without any coding knowledge.' },
        { q: 'Can I use this on multiple websites?', a: 'Yes! You can embed your widgets on as many websites as you like. Each widget tracks installs separately.' },
        { q: 'What happens if I exceed my view limit?', a: 'On the free plan, widgets are paused when the monthly view limit is reached. Upgrading to Pro gives you unlimited views.' },
        { q: 'Is there a free plan?', a: 'Yes! Our free plan lets you create widgets with up to 200 monthly views — perfect for getting started.' },
      ]
    },
    number_counter: {
      stats: [
        { value: '10,000', label: 'Happy Customers', suffix: '+' },
        { value: '98', label: 'Satisfaction Rate', suffix: '%' },
        { value: '50', label: 'Countries Served', suffix: '+' },
        { value: '24/7', label: 'Customer Support' },
      ]
    },
    youtube_feed: {
      channel: { name: 'MrBeast', subscribers: '247M' },
      videos: [
        { title: 'I Spent 50 Hours In Solitary Confinement', views: '247M', duration: '22:14', color: colors[0] },
        { title: 'Building The Worlds Largest Lego Tower', views: '18M', duration: '18:43', color: colors[1] },
        { title: 'Surviving 24 Hours On A Deserted Island', views: '45M', duration: '31:07', color: colors[2] },
        { title: '$1 vs $1,000,000 Hotel Room!', views: '92M', duration: '14:22', color: colors[3] },
        { title: 'I Gave My 100,000,000th Subscriber An Island', views: '134M', duration: '25:51', color: colors[4] },
        { title: 'Would You Swim With Sharks For $100,000?', views: '67M', duration: '19:38', color: colors[5] },
        { title: 'I Built Willy Wonkas Chocolate Factory', views: '89M', duration: '28:14', color: colors[6] },
        { title: 'Last To Leave Circle Wins $500,000', views: '156M', duration: '22:59', color: colors[7] },
        { title: 'Extreme $100,000 Game of Tag', views: '23M', duration: '16:47', color: colors[8] },
      ]
    },
    google_reviews: {
      business: { name: 'Acme Coffee Shop', rating: 4.7, total: 284 },
      reviews: [
        { author: 'Sarah M.', rating: 5, text: 'Absolutely amazing coffee and the staff are incredibly friendly. This is my go-to spot every morning!', time: '2 days ago', avatar: 'SM' },
        { author: 'James K.', rating: 5, text: 'Best espresso in town, hands down. The atmosphere is cozy and perfect for working.', time: '1 week ago', avatar: 'JK' },
        { author: 'Emily R.', rating: 4, text: 'Great place! Love the seasonal drinks. Gets a bit busy on weekends but worth the wait.', time: '2 weeks ago', avatar: 'ER' },
        { author: 'David L.', rating: 5, text: 'Consistent quality every single time. The baristas really know their craft here.', time: '3 weeks ago', avatar: 'DL' },
        { author: 'Anna P.', rating: 4, text: 'Lovely cozy spot with excellent coffee. The pastries are fresh and delicious too.', time: '1 month ago', avatar: 'AP' },
      ]
    },
    testimonials: {
      items: [
        { name: 'Alex Johnson', role: 'CEO at TechCorp', text: 'This product completely transformed how our team works. We saw a 40% increase in productivity within the first month.', rating: 5, avatar: 'AJ' },
        { name: 'Maria Garcia', role: 'Marketing Director at GrowthCo', text: 'Absolutely incredible results. Our conversion rate doubled after implementing this solution.', rating: 5, avatar: 'MG' },
        { name: 'Tom Williams', role: 'Founder at StartupXYZ', text: 'Best investment we made this year. The ROI has been phenomenal and support is top notch.', rating: 5, avatar: 'TW' },
        { name: 'Lisa Chen', role: 'Product Manager at InnovateCo', text: 'Seamless integration and outstanding features. Our customers love the new experience.', rating: 4, avatar: 'LC' },
      ]
    },
    instagram_feed: {
      posts: ['a','b','c','d','e','f','g','h','i'].map(function(seed, i) {
        return {
          color:     colors[i],
          thumbnail: 'https://picsum.photos/seed/ig_preview_' + seed + '/400/400',
          likes:     [1204,893,2341,567,1876,3201,445,987,1543][i],
          comments:  [43,21,87,12,65,102,8,34,56][i],
        }
      })
    },
    tiktok_feed: {
      videos: ['a','b','c','d','e','f','g','h','i'].map(function(seed, i) {
        return {
          color:           colors[i],
          cover_image_url: 'https://picsum.photos/seed/tt_preview_' + seed + '/360/640',
          views:  ['1.2M','456K','2.1M','89K','567K','1.8M','345K','678K','901K'][i],
          likes:  ['45K','12K','98K','3K','21K','67K','15K','28K','41K'][i],
          duration: ['0:45','1:23','0:58','2:01','1:15','0:37','1:42','0:53','1:08'][i],
        }
      })
    },
  }
  return (all[widgetType] as Record<string, unknown>) ?? {}
}

function getRenderer(widgetType: string): string {
  switch (widgetType) {
    case 'youtube_feed':     return youtubeRenderer()
    case 'google_reviews':   return googleReviewsRenderer()
    case 'testimonials':     return testimonialsRenderer()
    case 'whatsapp':         return whatsappRenderer()
    case 'countdown_timer':
    case 'countdown':        return countdownRenderer()
    case 'announcement_bar': return announcementBarRenderer()
    case 'contact_form':     return contactFormRenderer()
    case 'social_follow':    return socialFollowRenderer()
    case 'instagram_feed':   return instagramRenderer()
    case 'tiktok_feed':      return tiktokRenderer()
    case 'faq_accordion':    return faqRenderer()
    case 'number_counter':   return numberCounterRenderer()
    case 'google_maps':      return googleMapsRenderer()
    default:
      return `root.innerHTML='<div style="padding:40px;text-align:center;color:#94a3b8;font-size:13px;">Widget preview</div>';`
  }
}

function youtubeRenderer(): string {
  return `
var isDark = C.theme === 'dark';
var bg = isDark ? '#0f172a' : '#f8faff';
var cardBg = isDark ? '#1e293b' : '#ffffff';
var text = isDark ? '#f1f5f9' : '#1f2937';
var sub = isDark ? '#94a3b8' : '#6b7280';
var accent = C.accent_color || '#ff0000';
var cols = C.columns || 3;
var maxV = C.max_results || 6;
var layout = C.layout || 'grid';
// R = real API data when channel is connected; M = mock fallback
var channel = (R && R.channel) || M.channel;
var rawVideos = (R && R.videos) || M.videos || [];
var videos = rawVideos.slice(0, maxV);
var hasReal = !!(R && R.videos);
document.body.style.background = bg;
document.body.style.padding = '16px';
var html = '';
if (C.header_style !== 'none') {
  html += '<div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;padding:14px 16px;background:' + cardBg + ';border-radius:12px;box-shadow:0 1px 4px rgba(0,0,0,0.06);">';
  if (hasReal && channel && channel.avatar) {
    html += '<img src="' + channel.avatar + '" width="44" height="44" style="border-radius:50%;flex-shrink:0;object-fit:cover;" loading="lazy">';
  } else {
    html += '<div style="width:44px;height:44px;border-radius:50%;background:' + accent + ';display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:700;color:#fff;flex-shrink:0;">' + (channel && channel.name ? channel.name[0] : 'C') + '</div>';
  }
  html += '<div><div style="font-weight:700;font-size:14px;color:' + text + ';">' + (channel ? channel.name : 'Channel') + '</div>';
  if (C.show_subscriber_count !== false) {
    var subs = channel ? (channel.subscriber_count || channel.subscribers || '') : '';
    if (subs) html += '<div style="font-size:11px;color:' + sub + ';">' + subs + ' subscribers</div>';
  }
  html += '</div>';
  html += '<button style="margin-left:auto;background:' + accent + ';color:#fff;border:none;padding:8px 14px;border-radius:6px;font-size:12px;font-weight:600;cursor:pointer;">Subscribe</button>';
  html += '</div>';
}
function thumbBlock(v, w, h2) {
  if (hasReal && v.thumbnail) {
    var hStyle = h2 ? 'height:' + h2 + 'px;' : 'height:100%;position:absolute;top:0;left:0;';
    return '<img src="' + v.thumbnail + '" width="' + (w||'100%') + '" style="width:100%;' + hStyle + 'object-fit:cover;display:block;" loading="lazy">';
  }
  var hStyle2 = h2 ? 'height:' + h2 + 'px;' : 'position:absolute;inset:0;';
  return '<div style="width:100%;' + hStyle2 + 'background:' + (v.color || '#6366f1') + ';"></div>';
}
if (layout === 'list') {
  html += '<div style="display:flex;flex-direction:column;gap:10px;">';
  videos.forEach(function(v) {
    html += '<div style="display:flex;gap:12px;background:' + cardBg + ';border-radius:10px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.07);">';
    html += '<div style="position:relative;width:140px;flex-shrink:0;overflow:hidden;">';
    html += thumbBlock(v, 140, 80);
    html += '<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none;"><div style="width:28px;height:28px;background:rgba(0,0,0,0.55);border-radius:50%;display:flex;align-items:center;justify-content:center;"><div style="width:0;height:0;border-top:6px solid transparent;border-bottom:6px solid transparent;border-left:10px solid #fff;margin-left:2px;"></div></div></div>';
    html += '</div>';
    html += '<div style="padding:10px;flex:1;min-width:0;">';
    if (C.show_title !== false) html += '<p style="font-size:13px;font-weight:600;color:' + text + ';line-height:1.4;margin-bottom:4px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">' + (v.title || '') + '</p>';
    if (C.show_date !== false && v.published_at) html += '<p style="font-size:10px;color:' + sub + ';">' + new Date(v.published_at).toLocaleDateString() + '</p>';
    html += '</div></div>';
  });
  html += '</div>';
} else {
  html += '<div style="display:grid;grid-template-columns:repeat(' + cols + ',1fr);gap:10px;">';
  videos.forEach(function(v) {
    html += '<div style="background:' + cardBg + ';border-radius:10px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.07);">';
    html += '<div style="position:relative;padding-top:56.25%;overflow:hidden;">';
    html += thumbBlock(v, 0, 0);
    html += '<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none;"><div style="width:32px;height:32px;background:rgba(0,0,0,0.55);border-radius:50%;display:flex;align-items:center;justify-content:center;"><div style="width:0;height:0;border-top:7px solid transparent;border-bottom:7px solid transparent;border-left:12px solid #fff;margin-left:3px;"></div></div></div>';
    html += '</div>';
    if (C.show_title !== false) {
      html += '<div style="padding:8px;">';
      html += '<p style="font-size:11px;font-weight:600;color:' + text + ';line-height:1.4;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">' + (v.title || '') + '</p>';
      if (C.show_date !== false && v.published_at) html += '<p style="font-size:10px;color:' + sub + ';margin-top:3px;">' + new Date(v.published_at).toLocaleDateString() + '</p>';
      html += '</div>';
    }
    html += '</div>';
  });
  html += '</div>';
}
root.innerHTML = html;
`
}

function googleReviewsRenderer(): string {
  return `
var isDark = C.theme === 'dark';
var bg = isDark ? '#0f172a' : '#f8faff';
var cardBg = isDark ? '#1e293b' : '#ffffff';
var text = isDark ? '#f1f5f9' : '#1f2937';
var sub = isDark ? '#94a3b8' : '#6b7280';
var accent = C.accent_color || '#4285f4';
var layout = C.layout || 'grid';
var maxRev = C.max_reviews || 5;
// R = real API data when business is connected; M = mock fallback
var business = (R && R.business) || M.business;
var allReviews = (R && R.reviews) || M.reviews || [];
var reviews = allReviews.slice(0, maxRev);
document.body.style.background = bg;
document.body.style.padding = '16px';
var html = '';
if (C.show_header !== false && business) {
  var ratingStr = (business.rating || 0).toFixed(1);
  html += '<div style="background:' + cardBg + ';border-radius:12px;padding:16px;margin-bottom:14px;box-shadow:0 1px 4px rgba(0,0,0,0.06);display:flex;align-items:center;gap:14px;">';
  html += '<div style="width:48px;height:48px;border-radius:10px;background:' + accent + '20;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;">G</div>';
  html += '<div style="flex:1;min-width:0;">';
  html += '<div style="font-weight:700;font-size:15px;color:' + text + ';white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + (business.name || 'Your Business') + '</div>';
  if (C.show_overall_rating !== false) {
    html += '<div style="display:flex;align-items:center;gap:6px;margin-top:4px;">';
    html += '<span style="font-size:16px;font-weight:700;color:' + text + ';">' + ratingStr + '</span>';
    html += '<span>' + stars(Math.round(business.rating || 0)) + '</span>';
    html += '<span style="font-size:12px;color:' + sub + ';">' + (business.total || 0) + ' reviews</span>';
    html += '</div>';
  }
  html += '</div>';
  if (C.write_review_link !== false) {
    html += '<a style="background:' + accent + ';color:#fff;text-decoration:none;padding:8px 14px;border-radius:8px;font-size:12px;font-weight:600;white-space:nowrap;flex-shrink:0;">Write a review</a>';
  }
  html += '</div>';
}
if (layout === 'list') {
  html += '<div style="display:flex;flex-direction:column;gap:10px;">';
} else {
  var cols = layout === 'carousel' ? 1 : 2;
  html += '<div style="display:grid;grid-template-columns:repeat(' + cols + ',1fr);gap:10px;">';
}
reviews.forEach(function(r) {
  html += '<div style="background:' + cardBg + ';border-radius:10px;padding:14px;box-shadow:0 1px 3px rgba(0,0,0,0.06);">';
  html += '<div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">';
  var reviewerName = r.author_name || r.author || r.name || '';
  var reviewerPhoto = r.author_photo || r.photo_url || '';
  var initials2 = r.avatar || (reviewerName ? reviewerName.slice(0,2).toUpperCase() : '?');
  if (C.show_reviewer_photo !== false) {
    if (reviewerPhoto) {
      html += '<img src="' + reviewerPhoto + '" width="36" height="36" style="border-radius:50%;flex-shrink:0;object-fit:cover;" loading="lazy">';
    } else {
      html += '<div style="width:36px;height:36px;border-radius:50%;background:' + accent + ';display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:#fff;flex-shrink:0;">' + initials2 + '</div>';
    }
  }
  html += '<div style="flex:1;min-width:0;"><div style="font-weight:600;font-size:13px;color:' + text + ';white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + reviewerName + '</div>';
  html += '<div style="display:flex;align-items:center;gap:4px;">' + stars(r.rating || 5);
  if (C.show_review_date !== false) html += '<span style="font-size:10px;color:' + sub + ';margin-left:4px;">' + (r.relative_time || r.time || '') + '</span>';
  html += '</div></div></div>';
  html += '<p style="font-size:12px;color:' + sub + ';line-height:1.5;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;">' + (r.text || r.review_text || '') + '</p>';
  html += '</div>';
});
html += '</div>';
root.innerHTML = html;
`
}

function testimonialsRenderer(): string {
  return `
var isDark = C.theme === 'dark';
var bg = isDark ? '#0f172a' : '#f8faff';
var cardBg = isDark ? '#1e293b' : '#ffffff';
var text = isDark ? '#f1f5f9' : '#1f2937';
var sub = isDark ? '#94a3b8' : '#6b7280';
var layout = C.layout || 'slider';
var cols = C.columns || 2;
var showRating = C.show_rating !== false;
var showQuote = C.show_quote_icon;
var shadow = { none: 'none', small: '0 1px 3px rgba(0,0,0,0.08)', medium: '0 4px 12px rgba(0,0,0,0.1)', large: '0 8px 24px rgba(0,0,0,0.12)' }[C.card_shadow || 'small'] || '0 1px 3px rgba(0,0,0,0.08)';
var items = (C.testimonials && C.testimonials.length ? C.testimonials : M.items) || [];
var avatarRadius = { circle: '50%', square: '4px', rounded: '12px' }[C.avatar_shape || 'circle'] || '50%';
document.body.style.background = bg;
document.body.style.padding = '16px';
var html = '';
if (layout === 'slider' || layout === 'carousel') {
  var item = items[0];
  if (!item) { root.innerHTML = '<div style="padding:24px;text-align:center;color:' + sub + ';">Add testimonials to preview</div>'; return; }
  html += '<div style="background:' + cardBg + ';border-radius:12px;padding:24px;box-shadow:' + shadow + ';position:relative;">';
  if (showQuote) html += '<div style="font-size:48px;color:#e5e7eb;line-height:1;margin-bottom:8px;">&ldquo;</div>';
  if (showRating) html += '<div style="margin-bottom:10px;">' + stars(item.rating || 5) + '</div>';
  html += '<p style="font-size:14px;color:' + sub + ';line-height:1.7;margin-bottom:16px;font-style:italic;">&ldquo;' + item.content + '&rdquo;</p>';
  html += '<div style="display:flex;align-items:center;gap:10px;">';
  html += '<div style="width:40px;height:40px;border-radius:' + avatarRadius + ';background:#6366f1;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;color:#fff;flex-shrink:0;">' + (item.author ? item.author[0] : 'A') + '</div>';
  html += '<div><div style="font-weight:600;font-size:13px;color:' + text + ';">' + item.author + '</div><div style="font-size:11px;color:' + sub + ';">' + (item.role || '') + '</div></div>';
  html += '</div>';
  if (C.show_arrows !== false && items.length > 1) {
    html += '<div style="display:flex;justify-content:center;gap:8px;margin-top:16px;">';
    html += '<button style="width:32px;height:32px;border-radius:50%;border:1px solid #e5e7eb;background:#fff;cursor:pointer;font-size:14px;">&#8592;</button>';
    html += '<button style="width:32px;height:32px;border-radius:50%;border:1px solid #e5e7eb;background:#fff;cursor:pointer;font-size:14px;">&#8594;</button>';
    html += '</div>';
  }
  html += '</div>';
} else {
  html += '<div style="display:grid;grid-template-columns:repeat(' + cols + ',1fr);gap:12px;">';
  items.slice(0, 4).forEach(function(item) {
    html += '<div style="background:' + cardBg + ';border-radius:10px;padding:16px;box-shadow:' + shadow + ';">';
    if (showQuote) html += '<div style="font-size:28px;color:#e5e7eb;line-height:1;margin-bottom:6px;">&ldquo;</div>';
    if (showRating) html += '<div style="margin-bottom:8px;">' + stars(item.rating || 5) + '</div>';
    html += '<p style="font-size:12px;color:' + sub + ';line-height:1.6;margin-bottom:12px;">&ldquo;' + item.content + '&rdquo;</p>';
    html += '<div style="display:flex;align-items:center;gap:8px;">';
    html += '<div style="width:32px;height:32px;border-radius:' + avatarRadius + ';background:#6366f1;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:12px;color:#fff;flex-shrink:0;">' + (item.author ? item.author[0] : 'A') + '</div>';
    html += '<div><div style="font-weight:600;font-size:12px;color:' + text + ';">' + item.author + '</div><div style="font-size:10px;color:' + sub + ';">' + (item.role || '') + '</div></div>';
    html += '</div></div>';
  });
  html += '</div>';
}
root.innerHTML = html;
`
}

function whatsappRenderer(): string {
  return `
var btnColor = C.button_color || '#25D366';
var pos = C.position || 'bottom-right';
var size = { small: 48, medium: 56, large: 64 }[C.button_size || 'medium'] || 56;
var tooltip = C.tooltip_text || 'Chat with us!';
var pulse = C.pulse_animation;
var isRight = pos !== 'bottom-left';
document.body.style.minHeight = '300px';
document.body.style.background = '#f8faff';
document.body.style.position = 'relative';
var html = '<div style="padding:24px;color:#6b7280;font-size:13px;text-align:center;">';
html += '<div style="font-size:13px;color:#94a3b8;margin-bottom:8px;">WhatsApp button preview</div>';
html += '<div style="font-size:12px;color:#c7d2fe;">The button floats at the ' + pos.replace('-', ' ') + ' of your page.</div>';
html += '</div>';
html += '<div style="position:fixed;bottom:20px;' + (isRight ? 'right:20px;' : 'left:20px;') + 'z-index:9999;">';
if (tooltip) {
  html += '<div style="position:absolute;bottom:calc(100% + 8px);' + (isRight ? 'right:0;' : 'left:0;') + 'background:#1f2937;color:#fff;font-size:12px;padding:6px 10px;border-radius:8px;white-space:nowrap;pointer-events:none;">' + tooltip + '</div>';
}
html += '<div style="width:' + size + 'px;height:' + size + 'px;border-radius:50%;background:' + btnColor + ';display:flex;align-items:center;justify-content:center;box-shadow:0 4px 16px rgba(0,0,0,0.2);cursor:pointer;' + (pulse ? 'animation:pulse 2s infinite;' : '') + '">';
html += '<svg width="' + Math.round(size*0.5) + '" height="' + Math.round(size*0.5) + '" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.558 4.112 1.534 5.836L0 24l6.338-1.512A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.86 0-3.61-.504-5.113-1.382l-.367-.217-3.763.898.93-3.67-.24-.38A9.943 9.943 0 012 12c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10z" fill-rule="evenodd" clip-rule="evenodd"/></svg>';
html += '</div></div>';
if (pulse) document.head.insertAdjacentHTML('beforeend','<style>@keyframes pulse{0%,100%{box-shadow:0 4px 16px rgba(0,0,0,0.2),0 0 0 0 ' + btnColor + '80}50%{box-shadow:0 4px 16px rgba(0,0,0,0.2),0 0 0 12px transparent}}</style>');
root.innerHTML = html;
`
}

function countdownRenderer(): string {
  return `
var isDark = C.theme === 'dark';
var accentColor = C.accent_color || '#8b5cf6';
var bgColor = C.bg_color || (isDark ? '#1e293b' : '#ffffff');
var textColor = C.text_color || (isDark ? '#f1f5f9' : '#1f2937');
var subColor = isDark ? '#94a3b8' : '#6b7280';
var style = C.style || 'blocks';
var title = C.title || 'Sale ends in';
var targetDate = C.target_date ? new Date(C.target_date + (C.target_time ? 'T' + C.target_time : 'T23:59:59')) : new Date(Date.now() + 7 * 86400000);
var sep = { colon: ':', slash: '/', dot: '·', none: '' }[C.separator_style || 'colon'] || ':';
document.body.style.background = isDark ? '#0f172a' : '#f8faff';
document.body.style.padding = '24px';
document.body.style.display = 'flex';
document.body.style.justifyContent = 'center';
document.body.style.alignItems = 'center';
document.body.style.minHeight = '200px';
function update() {
  var now = Date.now();
  var diff = Math.max(0, targetDate - now);
  var d = Math.floor(diff / 86400000);
  var h = Math.floor((diff % 86400000) / 3600000);
  var m = Math.floor((diff % 3600000) / 60000);
  var s = Math.floor((diff % 60000) / 1000);
  var showD = C.show_days !== false;
  var showH = C.show_hours !== false;
  var showM = C.show_minutes !== false;
  var showS = C.show_seconds !== false;
  var showL = C.show_labels !== false;
  var units = [];
  if (showD) units.push({ val: String(d).padStart(2,'0'), label: 'Days' });
  if (showH) units.push({ val: String(h).padStart(2,'0'), label: 'Hours' });
  if (showM) units.push({ val: String(m).padStart(2,'0'), label: 'Mins' });
  if (showS) units.push({ val: String(s).padStart(2,'0'), label: 'Secs' });
  var html = '<div style="text-align:center;width:100%;">';
  if (title) html += '<div style="font-size:14px;font-weight:600;color:' + subColor + ';margin-bottom:16px;text-transform:uppercase;letter-spacing:0.08em;">' + title + '</div>';
  if (style === 'minimal') {
    html += '<div style="display:flex;align-items:center;justify-content:center;gap:4px;font-size:40px;font-weight:700;color:' + textColor + ';font-family:monospace;">';
    units.forEach(function(u, i) {
      html += '<span>' + u.val + '</span>';
      if (i < units.length - 1 && sep) html += '<span style="color:' + accentColor + ';opacity:0.7;">' + sep + '</span>';
    });
    html += '</div>';
    if (showL) {
      html += '<div style="display:flex;align-items:center;justify-content:center;gap:16px;margin-top:8px;">';
      var sepWidth = sep ? 16 : 0;
      units.forEach(function(u, i) {
        var extra = i < units.length - 1 ? sepWidth : 0;
        html += '<span style="font-size:10px;color:' + subColor + ';width:calc(40px + ' + extra + 'px);text-align:center;">' + u.label + '</span>';
      });
      html += '</div>';
    }
  } else {
    html += '<div style="display:flex;align-items:center;justify-content:center;gap:8px;">';
    units.forEach(function(u, i) {
      html += '<div style="background:' + bgColor + ';border-radius:12px;padding:12px 16px;min-width:64px;box-shadow:0 2px 8px rgba(0,0,0,0.08);border:1px solid ' + (isDark ? '#2d3748' : '#e5e7eb') + ';">';
      html += '<div style="font-size:32px;font-weight:700;color:' + accentColor + ';line-height:1;font-family:monospace;">' + u.val + '</div>';
      if (showL) html += '<div style="font-size:10px;font-weight:500;color:' + subColor + ';margin-top:4px;text-transform:uppercase;letter-spacing:0.06em;">' + u.label + '</div>';
      html += '</div>';
      if (i < units.length - 1 && sep) html += '<span style="font-size:24px;font-weight:700;color:' + accentColor + ';opacity:0.5;margin-bottom:' + (showL ? '16px' : '0') + ';">' + sep + '</span>';
    });
    html += '</div>';
  }
  html += '</div>';
  root.innerHTML = html;
}
update();
setInterval(update, 1000);
`
}

function announcementBarRenderer(): string {
  return `
var bgColor = C.bg_color || '#6366f1';
var textColor = C.text_color || '#ffffff';
var linkColor = C.link_color || '#ffffff';
var message = C.message || 'Special offer — Limited time only!';
var linkText = C.link_text || 'Shop now';
var emojiChar = C.show_emoji !== false && C.emoji ? C.emoji + ' ' : '';
var position = C.position || 'top';
var showClose = C.show_close_button !== false;
var gradStyle = C.style === 'gradient' ? 'background:linear-gradient(135deg,' + bgColor + ' 0%,' + bgColor + 'dd 100%)' : 'background:' + bgColor;
document.body.style.background = '#f8faff';
document.body.style.minHeight = '200px';
document.body.style.padding = '0';
var barHtml = '<div id="ann-bar" style="' + gradStyle + ';color:' + textColor + ';padding:10px 16px;display:flex;align-items:center;justify-content:center;gap:12px;font-size:13px;font-weight:500;position:relative;">';
barHtml += '<span>' + emojiChar + message + '</span>';
if (linkText) barHtml += '<a style="color:' + linkColor + ';font-weight:700;text-decoration:underline;cursor:pointer;white-space:nowrap;">' + linkText + ' →</a>';
if (showClose) barHtml += '<button onclick="document.getElementById(\'ann-bar\').style.display=\'none\'" style="position:absolute;right:12px;background:none;border:none;color:' + textColor + ';font-size:18px;cursor:pointer;opacity:0.7;line-height:1;">&#215;</button>';
barHtml += '</div>';
var content = '<div style="padding:24px;text-align:center;color:#94a3b8;font-size:13px;flex:1;display:flex;align-items:center;justify-content:center;"><div><div style="font-size:40px;margin-bottom:8px;">&#128196;</div><div>Your website content appears here</div></div></div>';
if (position === 'bottom') {
  document.body.style.display = 'flex';
  document.body.style.flexDirection = 'column';
  document.body.style.minHeight = '250px';
  root.innerHTML = content + barHtml;
} else {
  root.innerHTML = barHtml + content;
}
`
}

function contactFormRenderer(): string {
  return `
var isDark = C.theme === 'dark';
var bg = isDark ? '#0f172a' : '#f8faff';
var cardBg = isDark ? '#1e293b' : '#ffffff';
var text = isDark ? '#f1f5f9' : '#1f2937';
var sub = isDark ? '#94a3b8' : '#6b7280';
var accent = C.accent_color || '#6366f1';
var radius = (C.border_radius || 8) + 'px';
var formTitle = C.title || 'Contact Us';
var subtitle = C.subtitle || 'Send us a message and we\'ll get back to you.';
var btnText = C.button_text || 'Send Message';
var fields = C.fields || { name: true, email: true, phone: false, subject: false, message: true };
var required = C.required_fields || {};
document.body.style.background = bg;
document.body.style.padding = '16px';
var inputStyle = 'width:100%;padding:9px 12px;border:1px solid ' + (isDark ? '#374151' : '#e5e7eb') + ';border-radius:' + radius + ';font-size:13px;background:' + (isDark ? '#111827' : '#f9fafb') + ';color:' + text + ';font-family:inherit;';
var labelStyle = 'display:block;font-size:12px;font-weight:600;color:' + sub + ';margin-bottom:4px;';
var html = '<div style="background:' + cardBg + ';border-radius:' + Math.max(parseInt(radius)+4, 12) + 'px;padding:24px;max-width:480px;margin:0 auto;box-shadow:0 2px 12px rgba(0,0,0,0.06);">';
html += '<h3 style="font-size:18px;font-weight:700;color:' + text + ';margin-bottom:4px;">' + formTitle + '</h3>';
html += '<p style="font-size:13px;color:' + sub + ';margin-bottom:20px;">' + subtitle + '</p>';
var fieldDefs = [
  { key: 'name', label: 'Full Name', type: 'text', placeholder: 'Your name' },
  { key: 'email', label: 'Email Address', type: 'email', placeholder: 'your@email.com' },
  { key: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+1 (555) 000-0000' },
  { key: 'subject', label: 'Subject', type: 'text', placeholder: 'How can we help?' },
];
var nameEmail = fieldDefs.filter(function(f){ return fields[f.key]; });
if (nameEmail.length === 2 && fields.name && fields.email && !fields.phone && !fields.subject) {
  html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px;">';
  nameEmail.forEach(function(f) {
    html += '<div><label style="' + labelStyle + '">' + f.label + (required[f.key] ? ' *' : '') + '</label><input type="' + f.type + '" placeholder="' + f.placeholder + '" style="' + inputStyle + '"/></div>';
  });
  html += '</div>';
} else {
  fieldDefs.forEach(function(f) {
    if (!fields[f.key]) return;
    html += '<div style="margin-bottom:12px;"><label style="' + labelStyle + '">' + f.label + (required[f.key] ? ' *' : '') + '</label><input type="' + f.type + '" placeholder="' + f.placeholder + '" style="' + inputStyle + '"/></div>';
  });
}
if (fields.message !== false) {
  html += '<div style="margin-bottom:16px;"><label style="' + labelStyle + '">Message' + (required.message ? ' *' : '') + '</label><textarea rows="4" placeholder="Your message..." style="' + inputStyle + 'resize:vertical;"></textarea></div>';
}
html += '<button style="width:100%;padding:11px;background:' + accent + ';color:#fff;border:none;border-radius:' + radius + ';font-size:14px;font-weight:600;cursor:pointer;font-family:inherit;">' + btnText + '</button>';
html += '</div>';
root.innerHTML = html;
`
}

function socialFollowRenderer(): string {
  return `
var isDark = C.theme === 'dark';
var bg = isDark ? '#0f172a' : '#f8faff';
var text = isDark ? '#f1f5f9' : '#1f2937';
var layout = C.layout || 'horizontal';
var style = C.style || 'filled';
var size = { small: 36, medium: 44, large: 52 }[C.size || 'medium'] || 44;
var showLabels = C.show_labels !== false;
var labelType = C.label_type || 'network_name';
var radius = C.border_radius !== undefined ? C.border_radius : 50;
var networks = C.networks || {};
document.body.style.background = bg;
document.body.style.padding = '24px';
document.body.style.display = 'flex';
document.body.style.justifyContent = 'center';
document.body.style.alignItems = 'center';
document.body.style.minHeight = '150px';
var PLATFORMS = [
  { key: 'facebook',  label: 'Facebook',   color: '#1877f2', svg: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>' },
  { key: 'instagram', label: 'Instagram',  color: '#e4405f', svg: '<rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>' },
  { key: 'twitter',   label: 'Twitter/X',  color: '#1da1f2', svg: '<path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>' },
  { key: 'tiktok',    label: 'TikTok',     color: '#2d2d2d', svg: '<path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.94a8.16 8.16 0 0 0 4.77 1.52V7.03a4.85 4.85 0 0 1-1-.34z"/>' },
  { key: 'youtube',   label: 'YouTube',    color: '#ff0000', svg: '<path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>' },
  { key: 'linkedin',  label: 'LinkedIn',   color: '#0a66c2', svg: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>' },
];
var active = PLATFORMS.filter(function(p){ return networks[p.key] || true; }).slice(0, 6);
var btnStyle = function(color) {
  if (style === 'filled') return 'background:' + color + ';color:#fff;border:none;';
  if (style === 'outline') return 'background:transparent;color:' + color + ';border:2px solid ' + color + ';';
  return 'background:' + color + '15;color:' + color + ';border:none;';
};
var flexDir = layout === 'vertical' ? 'column' : 'row';
var wrap = layout === 'grid' ? 'flex-wrap:wrap;justify-content:center;' : '';
var html = '<div style="display:flex;flex-direction:' + flexDir + ';gap:10px;align-items:center;' + wrap + '">';
active.forEach(function(p) {
  html += '<button style="' + btnStyle(p.color) + 'display:flex;align-items:center;gap:' + (showLabels ? '7px' : '0') + ';padding:' + (showLabels ? '0 14px' : '0') + ';height:' + size + 'px;' + (showLabels ? '' : 'width:' + size + 'px;') + 'border-radius:' + radius + 'px;cursor:pointer;font-size:13px;font-weight:600;font-family:inherit;transition:opacity 0.15s;">';
  html += '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + p.svg + '</svg>';
  if (showLabels) {
    var lbl = labelType === 'follow_us' ? 'Follow us' : labelType === 'custom' ? (C.custom_label || 'Follow') : p.label;
    html += '<span>' + lbl + '</span>';
  }
  html += '</button>';
});
html += '</div>';
root.innerHTML = html;
`
}

function instagramRenderer(): string {
  return `
var isDark = C.theme === 'dark';
var bg = isDark ? '#0f172a' : '#f8faff';
var cols = C.columns || 3;
var numPosts = C.num_posts || 9;
var gap = parseInt(C.gap || '8') || 8;
var borderRadius = C.border_radius === 'round' ? '50%' : (C.border_radius || '8px');
var showLikes = C.show_likes !== false;
// Use R.posts if available (real or rich mock), else fall back to M.posts
var sourcePosts = (R && R.posts && R.posts.length) ? R.posts : M.posts || [];
var posts = sourcePosts.slice(0, numPosts);
document.body.style.background = bg;
document.body.style.padding = '16px';
var html = '<div style="display:grid;grid-template-columns:repeat(' + cols + ',1fr);gap:' + gap + 'px;">';
posts.forEach(function(p) {
  var thumbUrl = p.thumbnail || '';
  html += '<div style="position:relative;padding-top:100%;background:' + (p.color || '#e4405f') + ';border-radius:' + borderRadius + ';overflow:hidden;cursor:pointer;">';
  if (thumbUrl) {
    html += '<img src="' + thumbUrl + '" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;" loading="lazy" onerror="this.style.display=\'none\'">';
  }
  if (showLikes) {
    html += '<div style="position:absolute;inset:0;background:rgba(0,0,0,0);display:flex;align-items:center;justify-content:center;transition:background 0.2s;" onmouseover="this.style.background=\'rgba(0,0,0,0.4)\'" onmouseout="this.style.background=\'rgba(0,0,0,0)\'">';
    html += '<div style="text-align:center;color:#fff;opacity:0;transition:opacity 0.2s;" onmouseover="this.style.opacity=1" onmouseout="this.style.opacity=0">';
    html += '<div style="font-size:12px;font-weight:700;">&#9829; ' + (p.likes || 0).toLocaleString() + '</div>';
    html += '</div></div>';
  }
  html += '</div>';
});
html += '</div>';
root.innerHTML = html;
`
}

function tiktokRenderer(): string {
  return `
var isDark = C.theme === 'dark';
var bg = isDark ? '#0f172a' : '#f8faff';
var cols = C.columns || 3;
var numVids = C.num_videos || 9;
var gap = parseInt(C.gap || '8') || 8;
var borderRadius = C.border_radius === 'round' ? '50%' : (C.border_radius || '8px');
var showDuration = C.show_duration !== false;
var showViews = C.show_view_count !== false;
// R = real API data (connected account); M = mock fallback
var sourceVids = (R && R.videos && R.videos.length) ? R.videos : M.videos || [];
var videos = sourceVids.slice(0, numVids);
var hasReal = !!(R && R.videos && R.videos.length);
document.body.style.background = bg;
document.body.style.padding = '16px';
var html = '';
// Profile header (when connected account data available)
if (hasReal && R.display_name) {
  var avatarHtml = R.avatar
    ? '<img src="' + R.avatar + '" width="40" height="40" style="border-radius:50%;object-fit:cover;flex-shrink:0;" loading="lazy">'
    : '<div style="width:40px;height:40px;border-radius:50%;background:#2d2d2d;display:flex;align-items:center;justify-content:center;color:#fff;font-size:16px;font-weight:700;flex-shrink:0;">' + String(R.display_name).charAt(0).toUpperCase() + '</div>';
  html += '<div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;padding:10px 12px;background:#1a1a2e;border-radius:12px;">';
  html += avatarHtml;
  html += '<div><div style="font-weight:700;font-size:13px;color:#f1f5f9;">@' + R.display_name + '</div>';
  if (R.follower_count) html += '<div style="font-size:11px;color:#94a3b8;">' + R.follower_count + ' followers</div>';
  html += '</div></div>';
}
html += '<div style="display:grid;grid-template-columns:repeat(' + cols + ',1fr);gap:' + gap + 'px;">';
videos.forEach(function(v) {
  var coverUrl = v.cover_image_url || '';
  html += '<div style="position:relative;padding-top:177%;background:' + (v.color || '#1a1a2e') + ';border-radius:' + borderRadius + ';overflow:hidden;cursor:pointer;">';
  if (coverUrl) {
    html += '<img src="' + coverUrl + '" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;" loading="lazy" onerror="this.style.display=\'none\'">';
  }
  html += '<div style="position:absolute;inset:0;background:linear-gradient(transparent 40%,rgba(0,0,0,0.6) 100%);pointer-events:none;">';
  if (showDuration && v.duration) html += '<div style="position:absolute;top:6px;right:6px;background:rgba(0,0,0,0.65);color:#fff;font-size:9px;padding:2px 5px;border-radius:4px;font-weight:600;">' + v.duration + '</div>';
  if (showViews && v.views) html += '<div style="position:absolute;bottom:6px;left:6px;font-size:10px;font-weight:700;color:#fff;">&#128065; ' + v.views + '</div>';
  html += '<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;"><div style="width:28px;height:28px;background:rgba(255,255,255,0.2);border-radius:50%;display:flex;align-items:center;justify-content:center;"><div style="width:0;height:0;border-top:6px solid transparent;border-bottom:6px solid transparent;border-left:10px solid #fff;margin-left:3px;"></div></div></div>';
  html += '</div></div>';
});
html += '</div>';
root.innerHTML = html;
`
}

function faqRenderer(): string {
  return `
var isDark = C.theme === 'dark';
var bg = isDark ? '#0f172a' : '#f8faff';
var cardBg = isDark ? '#1e293b' : '#ffffff';
var text = isDark ? '#f1f5f9' : '#1f2937';
var sub = isDark ? '#94a3b8' : '#6b7280';
var accent = C.accent_color || '#6366f1';
var radius = (C.border_radius !== undefined ? C.border_radius : 8) + 'px';
var questions = (C.questions && C.questions.length ? C.questions : M.questions) || [];
var title = C.title || '';
document.body.style.background = bg;
document.body.style.padding = '16px';
var html = '';
if (title) html += '<h3 style="font-size:17px;font-weight:700;color:' + text + ';margin-bottom:14px;">' + title + '</h3>';
html += '<div style="display:flex;flex-direction:column;gap:2px;">';
questions.forEach(function(item, i) {
  var isOpen = i === 0 && C.open_first !== false;
  var id = 'faq-' + i;
  html += '<div style="background:' + cardBg + ';border-radius:' + radius + ';border:1px solid ' + (isDark ? '#2d3748' : '#e5e7eb') + ';overflow:hidden;margin-bottom:2px;">';
  html += '<button onclick="var el=document.getElementById(\'' + id + '\');var open=el.style.display!==\'none\';el.style.display=open?\'none\':\'block\';this.querySelector(\'.ico\').textContent=open?\'+\':\'-\';" style="width:100%;display:flex;align-items:center;justify-content:space-between;padding:14px 16px;background:transparent;border:none;cursor:pointer;text-align:left;font-size:13px;font-weight:600;color:' + text + ';font-family:inherit;">';
  html += '<span>' + item.q + '</span><span class="ico" style="font-size:20px;color:' + accent + ';flex-shrink:0;margin-left:12px;">' + (isOpen ? '−' : '+') + '</span></button>';
  html += '<div id="' + id + '" style="display:' + (isOpen ? 'block' : 'none') + ';padding:0 16px 14px;font-size:13px;color:' + sub + ';line-height:1.6;border-top:1px solid ' + (isDark ? '#2d3748' : '#f3f4f6') + ';">' + item.a + '</div>';
  html += '</div>';
});
html += '</div>';
root.innerHTML = html;
`
}

function numberCounterRenderer(): string {
  return `
var isDark = C.theme === 'dark';
var bg = isDark ? '#0f172a' : '#f8faff';
var cardBg = isDark ? '#1e293b' : '#ffffff';
var text = isDark ? '#f1f5f9' : '#1f2937';
var sub = isDark ? '#94a3b8' : '#6b7280';
var accent = C.accent_color || '#6366f1';
var cols = C.columns || 3;
var stats = (C.stats && C.stats.length ? C.stats : M.stats) || [];
var title = C.title || '';
document.body.style.background = bg;
document.body.style.padding = '24px';
var html = '';
if (title) html += '<h3 style="font-size:17px;font-weight:700;color:' + text + ';margin-bottom:20px;text-align:center;">' + title + '</h3>';
var gridCols = Math.min(cols, stats.length || 1);
html += '<div style="display:grid;grid-template-columns:repeat(' + gridCols + ',1fr);gap:16px;">';
stats.forEach(function(s) {
  html += '<div style="background:' + cardBg + ';border-radius:12px;padding:20px;text-align:center;box-shadow:0 2px 8px rgba(0,0,0,0.06);">';
  html += '<div style="font-size:32px;font-weight:800;color:' + accent + ';line-height:1.1;margin-bottom:6px;">' + (s.prefix || '') + s.value + (s.suffix || '') + '</div>';
  html += '<div style="font-size:12px;font-weight:500;color:' + sub + ';text-transform:uppercase;letter-spacing:0.04em;">' + s.label + '</div>';
  html += '</div>';
});
if (stats.length === 0) html += '<div style="padding:40px;text-align:center;color:' + sub + ';font-size:13px;">Add stats to preview</div>';
html += '</div>';
root.innerHTML = html;
`
}

function googleMapsRenderer(): string {
  return `
var embedUrl = C.embed_url || '';
var height = (C.height || 400) + 'px';
var radius = (C.border_radius !== undefined ? C.border_radius : 12) + 'px';
var title = C.title || '';
document.body.style.background = '#f8faff';
document.body.style.padding = '16px';
var html = '';
if (title) html += '<h3 style="font-size:15px;font-weight:700;color:#1f2937;margin-bottom:10px;">' + title + '</h3>';
if (embedUrl) {
  html += '<div style="border-radius:' + radius + ';overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,0.08);">';
  html += '<iframe src="' + embedUrl + '" width="100%" height="' + height + '" style="border:0;display:block;" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>';
  html += '</div>';
} else {
  html += '<div style="border-radius:' + radius + ';overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,0.08);height:' + height + ';background:#e8f0fe;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;">';
  html += '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#4285f4"/><circle cx="12" cy="9" r="2.5" fill="white"/></svg>';
  html += '<div style="text-align:center;"><div style="font-size:14px;font-weight:600;color:#1f2937;">Add your embed URL</div><div style="font-size:12px;color:#6b7280;margin-top:4px;">Google Maps → Share → Embed a map → copy src</div></div>';
  html += '</div>';
}
root.innerHTML = html;
`
}

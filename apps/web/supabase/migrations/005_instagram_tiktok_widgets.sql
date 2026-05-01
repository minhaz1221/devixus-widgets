ALTER TABLE widgets
DROP CONSTRAINT IF EXISTS widgets_type_check;

ALTER TABLE widgets
ADD CONSTRAINT widgets_type_check
CHECK (type IN (
  'whatsapp',
  'testimonials',
  'google_reviews',
  'countdown_timer',
  'announcement_bar',
  'contact_form',
  'social_follow',
  'youtube_feed',
  'instagram_feed',
  'tiktok_feed'
));

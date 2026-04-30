ALTER TABLE widgets
DROP CONSTRAINT IF EXISTS widgets_type_check;

ALTER TABLE widgets
ADD CONSTRAINT widgets_type_check
CHECK (type IN (
  'whatsapp', 'testimonials', 'google_reviews',
  'countdown', 'contact_form', 'social_follow',
  'youtube_feed', 'countdown_timer',
  'announcement_bar'
));

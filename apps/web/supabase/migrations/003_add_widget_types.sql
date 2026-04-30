-- Add youtube_feed to widget type constraint
-- Run this in the Supabase SQL Editor

ALTER TABLE widgets
DROP CONSTRAINT IF EXISTS widgets_type_check;

ALTER TABLE widgets
ADD CONSTRAINT widgets_type_check
CHECK (type IN (
  'whatsapp',
  'testimonials',
  'google_reviews',
  'countdown',
  'contact_form',
  'social_follow',
  'youtube_feed'
));

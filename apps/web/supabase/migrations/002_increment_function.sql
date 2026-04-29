-- Function to safely increment install_count
-- Run this in Supabase SQL Editor after deploying milestone 3.2
CREATE OR REPLACE FUNCTION increment_install_count(p_widget_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE widgets
  SET install_count = install_count + 1
  WHERE id = p_widget_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

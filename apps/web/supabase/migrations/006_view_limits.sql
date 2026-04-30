-- Add monthly view tracking to widgets table
ALTER TABLE widgets
ADD COLUMN IF NOT EXISTS monthly_views integer NOT NULL DEFAULT 0;
ALTER TABLE widgets
ADD COLUMN IF NOT EXISTS views_reset_at timestamptz
  NOT NULL DEFAULT date_trunc('month', now());

-- Add view limits to plans table
ALTER TABLE plans
ADD COLUMN IF NOT EXISTS monthly_view_limit integer
  NOT NULL DEFAULT 200;

-- Update existing plans with view limits
UPDATE plans SET monthly_view_limit = 200
  WHERE name = 'free';
UPDATE plans SET monthly_view_limit = 50000
  WHERE name = 'pro';
UPDATE plans SET monthly_view_limit = -1
  WHERE name = 'agency';

-- Function to reset monthly views on 1st of month
CREATE OR REPLACE FUNCTION reset_monthly_views()
RETURNS void AS $$
BEGIN
  UPDATE widgets
  SET monthly_views = 0,
      views_reset_at = date_trunc('month', now())
  WHERE views_reset_at < date_trunc('month', now());
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to increment view count and check limit
CREATE OR REPLACE FUNCTION increment_widget_views(
  p_widget_id uuid
)
RETURNS jsonb AS $$
DECLARE
  v_widget widgets%ROWTYPE;
  v_plan plans%ROWTYPE;
  v_limit integer;
  v_new_count integer;
BEGIN
  -- Reset if new month
  UPDATE widgets
  SET monthly_views = 0,
      views_reset_at = date_trunc('month', now())
  WHERE id = p_widget_id
    AND views_reset_at < date_trunc('month', now());

  -- Get widget
  SELECT * INTO v_widget
  FROM widgets WHERE id = p_widget_id;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('error', 'Widget not found');
  END IF;

  -- Get user plan
  SELECT p.* INTO v_plan
  FROM plans p
  JOIN subscriptions s ON s.plan_id = p.id
  WHERE s.user_id = v_widget.user_id
    AND s.status = 'active'
  ORDER BY p.price_monthly DESC
  LIMIT 1;

  -- Default to free plan if no subscription
  IF NOT FOUND THEN
    SELECT * INTO v_plan FROM plans WHERE name = 'free';
  END IF;

  v_limit := v_plan.monthly_view_limit;

  -- Check if limit reached (-1 = unlimited)
  IF v_limit != -1 AND v_widget.monthly_views >= v_limit THEN
    RETURN jsonb_build_object(
      'limit_reached', true,
      'monthly_views', v_widget.monthly_views,
      'monthly_view_limit', v_limit,
      'plan', v_plan.name
    );
  END IF;

  -- Increment view count
  UPDATE widgets
  SET monthly_views = monthly_views + 1,
      install_count = install_count + 1
  WHERE id = p_widget_id
  RETURNING monthly_views INTO v_new_count;

  RETURN jsonb_build_object(
    'limit_reached', false,
    'monthly_views', v_new_count,
    'monthly_view_limit', v_limit,
    'plan', v_plan.name
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

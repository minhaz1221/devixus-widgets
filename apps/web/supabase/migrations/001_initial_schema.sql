-- =============================================================================
-- Devixus Widgets — Initial Database Schema
-- Migration: 001_initial_schema.sql
-- =============================================================================


-- =============================================================================
-- UTILITY FUNCTIONS
-- =============================================================================

-- Auto-update updated_at column on any UPDATE
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- =============================================================================
-- TABLE: profiles
-- Extends Supabase auth.users — one row per authenticated user
-- =============================================================================

CREATE TABLE profiles (
  id          uuid        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email       text        NOT NULL,
  full_name   text,
  avatar_url  text,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);

-- Trigger: keep updated_at current
CREATE TRIGGER trg_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Trigger: auto-create a profile row when a user signs up via Supabase Auth
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trg_on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();


-- =============================================================================
-- TABLE: plans
-- Billing plans (free / pro / agency)
-- =============================================================================

CREATE TABLE plans (
  id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  name            text        NOT NULL,
  price_monthly   integer     NOT NULL, -- in cents (e.g. 900 = $9.00)
  widget_limit    integer     NOT NULL, -- -1 = unlimited
  remove_branding boolean     NOT NULL DEFAULT false,
  stripe_price_id text,
  created_at      timestamptz NOT NULL DEFAULT now()
);


-- =============================================================================
-- TABLE: subscriptions
-- One active subscription per user
-- =============================================================================

CREATE TABLE subscriptions (
  id                     uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                uuid        NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  plan_id                uuid        NOT NULL REFERENCES plans(id),
  stripe_customer_id     text,
  stripe_subscription_id text,
  status                 text        NOT NULL DEFAULT 'active'
                           CHECK (status IN ('active', 'cancelled', 'past_due', 'trialing')),
  current_period_end     timestamptz,
  created_at             timestamptz NOT NULL DEFAULT now(),
  updated_at             timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);

-- Trigger: keep updated_at current
CREATE TRIGGER trg_subscriptions_updated_at
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();


-- =============================================================================
-- TABLE: widgets
-- Widget instances created by users
-- =============================================================================

CREATE TABLE widgets (
  id            uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       uuid        NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name          text        NOT NULL,
  type          text        NOT NULL
                  CHECK (type IN (
                    'whatsapp', 'testimonials', 'google_reviews',
                    'countdown', 'contact_form', 'social_follow'
                  )),
  config        jsonb       NOT NULL DEFAULT '{}',
  is_active     boolean     NOT NULL DEFAULT true,
  show_branding boolean     NOT NULL DEFAULT true,
  install_count integer     NOT NULL DEFAULT 0,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_widgets_user_id ON widgets(user_id);

-- Trigger: keep updated_at current
CREATE TRIGGER trg_widgets_updated_at
  BEFORE UPDATE ON widgets
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();


-- =============================================================================
-- TABLE: widget_installs
-- Tracks every unique domain a widget has been installed on
-- =============================================================================

CREATE TABLE widget_installs (
  id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  widget_id  uuid        NOT NULL REFERENCES widgets(id) ON DELETE CASCADE,
  domain     text        NOT NULL,
  first_seen timestamptz NOT NULL DEFAULT now(),
  last_seen  timestamptz NOT NULL DEFAULT now(),

  UNIQUE (widget_id, domain)
);


-- =============================================================================
-- TABLE: events
-- Lightweight analytics — one row per widget load (or future event types)
-- =============================================================================

CREATE TABLE events (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  widget_id   uuid        NOT NULL REFERENCES widgets(id) ON DELETE CASCADE,
  domain      text,
  event_type  text        NOT NULL DEFAULT 'load',
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_events_widget_id  ON events(widget_id);
CREATE INDEX idx_events_created_at ON events(created_at);


-- =============================================================================
-- ROW LEVEL SECURITY
-- =============================================================================

ALTER TABLE profiles       ENABLE ROW LEVEL SECURITY;
ALTER TABLE plans          ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions  ENABLE ROW LEVEL SECURITY;
ALTER TABLE widgets        ENABLE ROW LEVEL SECURITY;
ALTER TABLE widget_installs ENABLE ROW LEVEL SECURITY;
ALTER TABLE events         ENABLE ROW LEVEL SECURITY;

-- profiles: users manage only their own row
CREATE POLICY "profiles: select own"  ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles: insert own"  ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles: update own"  ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "profiles: delete own"  ON profiles FOR DELETE USING (auth.uid() = id);

-- plans: public read-only (anyone can see available plans)
CREATE POLICY "plans: public read"    ON plans    FOR SELECT USING (true);

-- subscriptions: users see/manage only their own
CREATE POLICY "subscriptions: select own" ON subscriptions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "subscriptions: insert own" ON subscriptions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "subscriptions: update own" ON subscriptions FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "subscriptions: delete own" ON subscriptions FOR DELETE USING (auth.uid() = user_id);

-- widgets: users see/manage only their own
CREATE POLICY "widgets: select own"   ON widgets  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "widgets: insert own"   ON widgets  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "widgets: update own"   ON widgets  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "widgets: delete own"   ON widgets  FOR DELETE USING (auth.uid() = user_id);

-- widget_installs: owner of the widget controls installs
CREATE POLICY "widget_installs: select own" ON widget_installs FOR SELECT
  USING (EXISTS (SELECT 1 FROM widgets WHERE widgets.id = widget_id AND widgets.user_id = auth.uid()));
CREATE POLICY "widget_installs: insert own" ON widget_installs FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM widgets WHERE widgets.id = widget_id AND widgets.user_id = auth.uid()));
CREATE POLICY "widget_installs: update own" ON widget_installs FOR UPDATE
  USING (EXISTS (SELECT 1 FROM widgets WHERE widgets.id = widget_id AND widgets.user_id = auth.uid()));
CREATE POLICY "widget_installs: delete own" ON widget_installs FOR DELETE
  USING (EXISTS (SELECT 1 FROM widgets WHERE widgets.id = widget_id AND widgets.user_id = auth.uid()));

-- events: owner of the widget sees their events
CREATE POLICY "events: select own"    ON events   FOR SELECT
  USING (EXISTS (SELECT 1 FROM widgets WHERE widgets.id = widget_id AND widgets.user_id = auth.uid()));
CREATE POLICY "events: insert own"    ON events   FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM widgets WHERE widgets.id = widget_id AND widgets.user_id = auth.uid()));


-- =============================================================================
-- SEED: plans
-- =============================================================================

INSERT INTO plans (name, price_monthly, widget_limit, remove_branding, stripe_price_id) VALUES
  ('free',   0,    1,  false, null),
  ('pro',    900,  5,  true,  null),
  ('agency', 2900, -1, true,  null);

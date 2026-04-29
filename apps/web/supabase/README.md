# Supabase — Database Setup

## Applying the migration

1. Go to your [Supabase dashboard](https://supabase.com/dashboard) and open your project.
2. In the left sidebar, click **SQL Editor**.
3. Click **New query**.
4. Open `migrations/001_initial_schema.sql`, copy the entire contents, and paste into the editor.
5. Click **Run** (or press `Ctrl+Enter`).
6. Verify success — you should see no errors in the output panel.

## Verifying the schema

After running, open the **Table Editor** in the sidebar and confirm all 6 tables exist:

| Table | Description |
|---|---|
| `profiles` | One row per auth user (auto-created on signup) |
| `plans` | Billing plans — free / pro / agency |
| `subscriptions` | User ↔ plan link, Stripe info |
| `widgets` | Widget instances with JSON config |
| `widget_installs` | Unique domains each widget is installed on |
| `events` | Analytics — widget load events |

Also verify the `plans` table has 3 seed rows (free, pro, agency).

## Environment variables

Copy `apps/web/.env.example` to `apps/web/.env.local` and fill in:

```
SUPABASE_URL=https://<your-project-ref>.supabase.co
SUPABASE_ANON_KEY=<your-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
```

These values are in your Supabase dashboard under **Project Settings → API**.

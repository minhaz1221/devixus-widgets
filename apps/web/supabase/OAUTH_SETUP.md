# Google OAuth Setup

## Enable Google provider in Supabase

1. Go to [Supabase Dashboard](https://supabase.com/dashboard) → your project
2. In the sidebar: **Authentication → Providers → Google**
3. Toggle **Enable Google provider** on
4. Add the authorized redirect URLs:
   - Production: `https://knfwdistjizwcbcioqtd.supabase.co/auth/v1/callback`
   - Local dev: `http://localhost:3000/auth/callback`
5. Copy the **Client ID** and **Client Secret** from your Google Cloud Console OAuth app and paste them in.
6. Click **Save**.

## Google Cloud Console (if you haven't set up the OAuth app yet)

1. Go to https://console.cloud.google.com → APIs & Services → Credentials
2. Create an **OAuth 2.0 Client ID** (Web application)
3. Add to **Authorized redirect URIs**:
   - `https://knfwdistjizwcbcioqtd.supabase.co/auth/v1/callback`
4. Copy the Client ID and Secret back into Supabase (step 5 above)

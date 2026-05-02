-- Add extended profile fields to profiles table
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS company TEXT,
  ADD COLUMN IF NOT EXISTS website TEXT,
  ADD COLUMN IF NOT EXISTS bio     TEXT;

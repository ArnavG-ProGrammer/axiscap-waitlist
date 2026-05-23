-- AXISCAP Waitlist Table
-- Run this in Supabase SQL Editor (https://supabase.com/dashboard → SQL Editor)
-- If the table already exists, use the ALTER statements at the bottom instead.

CREATE TABLE IF NOT EXISTS waitlist (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  position BIGINT GENERATED ALWAYS AS IDENTITY,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL,
  interest_area TEXT NOT NULL,
  referral_source TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Index for fast duplicate checks
CREATE UNIQUE INDEX IF NOT EXISTS waitlist_email_idx ON waitlist (email);

-- Index for sorting by signup order
CREATE INDEX IF NOT EXISTS waitlist_position_idx ON waitlist (position);

-- Row Level Security
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Allow inserts from anon key (public signups)
CREATE POLICY "Allow public inserts" ON waitlist
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow reads from anon key (for duplicate check and position query)
CREATE POLICY "Allow public reads" ON waitlist
  FOR SELECT
  TO anon
  USING (true);

-- ============================================================
-- IF THE TABLE ALREADY EXISTS and is missing columns, run these:
-- ============================================================
-- ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT now() NOT NULL;
-- ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS referral_source TEXT;
-- ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS role TEXT;
-- ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS interest_area TEXT;
-- ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS full_name TEXT;

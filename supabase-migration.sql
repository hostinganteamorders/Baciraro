-- Baciraro Supabase Migration
-- Run this in Supabase SQL Editor

-- 1. users (from SQLite)
CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. products (from SQLite)
CREATE TABLE IF NOT EXISTS products (
  id BIGSERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  story TEXT DEFAULT '',
  materials JSONB DEFAULT '[]',
  total_plastic_kg REAL DEFAULT 0,
  image_url TEXT DEFAULT '',
  gallery JSONB DEFAULT '[]',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. compost_buckets (from SQLite)
CREATE TABLE IF NOT EXISTS compost_buckets (
  id BIGSERIAL PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  start_date DATE NOT NULL,
  estimated_harvest DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'fermenting',
  type TEXT NOT NULL DEFAULT 'both',
  material TEXT DEFAULT '',
  notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. waste_stats (from SQLite)
CREATE TABLE IF NOT EXISTS waste_stats (
  id BIGSERIAL PRIMARY KEY,
  organic_kg REAL DEFAULT 0,
  inorganic_kg REAL DEFAULT 0,
  products_count INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. team_members (from leadership/page.tsx)
CREATE TABLE IF NOT EXISTS team_members (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  title TEXT DEFAULT '',
  subtitle TEXT DEFAULT '',
  division TEXT NOT NULL,
  division_label TEXT DEFAULT '',
  photo_url TEXT DEFAULT '',
  initials TEXT DEFAULT '',
  linkedin TEXT DEFAULT '',
  instagram TEXT DEFAULT '',
  email TEXT DEFAULT '',
  bio JSONB DEFAULT '[]',
  sort_order INTEGER DEFAULT 0,
  is_division_head BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. track_record_activities (from track-record-data.ts)
CREATE TABLE IF NOT EXISTS track_record_activities (
  id TEXT PRIMARY KEY,
  year INTEGER NOT NULL,
  title TEXT NOT NULL,
  location TEXT DEFAULT '',
  role TEXT DEFAULT '',
  era TEXT DEFAULT '',
  categories JSONB DEFAULT '[]',
  capabilities JSONB DEFAULT '[]',
  narrative TEXT DEFAULT '',
  highlights JSONB DEFAULT '[]',
  photos JSONB DEFAULT '[]',
  featured BOOLEAN DEFAULT FALSE,
  before_after JSONB DEFAULT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. site_content (from site-sections-data.ts)
CREATE TABLE IF NOT EXISTS site_content (
  id BIGSERIAL PRIMARY KEY,
  section_key TEXT UNIQUE NOT NULL,
  content JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. qr_codes (QR claim & review system)
CREATE TABLE IF NOT EXISTS qr_codes (
  id BIGSERIAL PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  product_slug TEXT NOT NULL,
  buyer_name TEXT DEFAULT '',
  buyer_phone TEXT DEFAULT '',
  review_text TEXT DEFAULT '',
  review_rating INTEGER DEFAULT 0,
  claimed_at TIMESTAMPTZ,
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. customers (auth & points)
CREATE TABLE IF NOT EXISTS customers (
  id BIGSERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  phone TEXT DEFAULT '',
  photo_url TEXT DEFAULT '',
  total_points INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. points_transactions (points ledger)
CREATE TABLE IF NOT EXISTS points_transactions (
  id BIGSERIAL PRIMARY KEY,
  customer_id BIGINT NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  qr_code_id BIGINT REFERENCES qr_codes(id),
  points INTEGER NOT NULL DEFAULT 10,
  description TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. Add customer_id to qr_codes
ALTER TABLE qr_codes ADD COLUMN IF NOT EXISTS customer_id BIGINT REFERENCES customers(id);

-- 12. Add points_per_scan to products (configurable by admin)
ALTER TABLE products ADD COLUMN IF NOT EXISTS points_per_scan INTEGER DEFAULT 10;

-- 12b. Add artists to products (creator/artisan credit, JSON array of { name, role, bio, photo_url })
ALTER TABLE products ADD COLUMN IF NOT EXISTS artists JSONB DEFAULT '[]';

-- 13. storage bucket for product images
-- Run this separately in Supabase Storage -> Create bucket "product-images" (public)

-- 14. storage bucket for customer photos
-- Run this separately in Supabase Storage -> Create bucket "customer-photos" (public)

-- 15. rewards (points store catalog)
CREATE TABLE IF NOT EXISTS rewards (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  cost_points INTEGER NOT NULL DEFAULT 100,
  image_url TEXT DEFAULT '',
  stock INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 16. redemptions (points store history)
CREATE TABLE IF NOT EXISTS redemptions (
  id BIGSERIAL PRIMARY KEY,
  customer_id BIGINT NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  reward_id BIGINT NOT NULL REFERENCES rewards(id),
  cost_points INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

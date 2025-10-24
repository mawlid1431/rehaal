# Database Migration Guide

## Quick Start (5 minutes)

### Step 1: Update Database Schema
1. Open your Supabase project: https://xnkfbsfgsjpssjtsiiac.supabase.co
2. Go to **SQL Editor** (left sidebar)
3. Click **New Query**
4. Copy the entire content from `supabase-schema-updated.sql`
5. Paste and click **Run** (or press Ctrl+Enter)
6. Wait for "Success. No rows returned" message

### Step 2: Setup Storage for Images
1. Go to **Storage** (left sidebar)
2. Click **New Bucket**
3. Enter name: `images`
4. Toggle **Public bucket** to ON
5. Click **Create bucket**

### Step 3: Test Your Admin Panel
1. Start your development server: `npm run dev`
2. Navigate to `/admin` in your browser
3. Test each section:
   - Dashboard: Should show statistics
   - Trips: Try adding a new trip
   - Bookings: View existing bookings
   - Gallery: Upload an image
   - Testimonials: Add a testimonial
   - Services: Add a service

## What Changed?

### Before (Old Schema)
```sql
-- Trips had text fields
CREATE TABLE trips (
  dates TEXT,
  price TEXT,
  image TEXT
);

-- Testimonials had no foreign key
CREATE TABLE testimonials (
  name TEXT,
  trip TEXT
);
```

### After (New Schema)
```sql
-- Trips have proper types
CREATE TABLE trips (
  start_date DATE,
  end_date DATE,
  price DECIMAL(10, 2),
  image_url TEXT,
  available_slots INTEGER,
  is_active BOOLEAN
);

-- Testimonials linked to trips
CREATE TABLE testimonials (
  customer_name TEXT,
  trip_id UUID REFERENCES trips(id)
);
```

## Troubleshooting

### Error: "relation already exists"
**Solution:** Your tables already exist. You have two options:

**Option A: Drop and recreate (DELETES ALL DATA)**
```sql
DROP TABLE IF EXISTS testimonials CASCADE;
DROP TABLE IF EXISTS bookings CASCADE;
DROP TABLE IF EXISTS gallery CASCADE;
DROP TABLE IF EXISTS services CASCADE;
DROP TABLE IF EXISTS trips CASCADE;

-- Then run the new schema
```

**Option B: Alter existing tables (KEEPS DATA)**
```sql
-- For trips table
ALTER TABLE trips 
  ADD COLUMN IF NOT EXISTS start_date DATE,
  ADD COLUMN IF NOT EXISTS end_date DATE,
  ADD COLUMN IF NOT EXISTS available_slots INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

ALTER TABLE trips 
  RENAME COLUMN image TO image_url;

ALTER TABLE trips 
  ALTER COLUMN price TYPE DECIMAL(10, 2) USING price::numeric;

-- For gallery table
ALTER TABLE gallery 
  RENAME COLUMN url TO image_url;

ALTER TABLE gallery 
  ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'general';

-- For testimonials table
ALTER TABLE testimonials 
  RENAME COLUMN name TO customer_name;

ALTER TABLE testimonials 
  ADD COLUMN IF NOT EXISTS trip_id UUID REFERENCES trips(id);

ALTER TABLE testimonials 
  ALTER COLUMN date TYPE DATE USING date::date;

-- For services table
ALTER TABLE services 
  RENAME COLUMN title TO name;
```

### Error: "permission denied"
**Solution:** Make sure you're using the correct Supabase credentials in `.env`

### Error: "bucket not found"
**Solution:** Create the `images` bucket in Supabase Storage (see Step 2 above)

### Admin panel shows "Loading..." forever
**Possible causes:**
1. Database tables not created yet
2. Wrong Supabase URL or API key in `.env`
3. RLS policies blocking access

**Solution:** Check browser console for errors and verify:
- Tables exist in Supabase
- `.env` file has correct credentials
- RLS policies allow public read access

## Data Migration (Optional)

If you have existing data in the old schema format, here's how to migrate:

### Migrate Trips Data
```sql
-- Update dates format (if needed)
UPDATE trips 
SET start_date = dates::date 
WHERE start_date IS NULL;

-- Update price format
UPDATE trips 
SET price = REPLACE(REPLACE(price, '$', ''), ',', '')::numeric 
WHERE price IS NOT NULL;

-- Update image URLs
UPDATE trips 
SET image_url = image 
WHERE image_url IS NULL;
```

### Migrate Testimonials Data
```sql
-- Link testimonials to trips by matching trip names
UPDATE testimonials t
SET trip_id = (
  SELECT id FROM trips 
  WHERE title ILIKE '%' || t.trip || '%' 
  LIMIT 1
)
WHERE trip_id IS NULL;
```

## Verification Checklist

After migration, verify:
- [ ] All 5 tables exist (trips, bookings, gallery, testimonials, services)
- [ ] Storage bucket `images` exists and is public
- [ ] Admin dashboard shows statistics
- [ ] Can create new trips
- [ ] Can upload images
- [ ] Can create testimonials
- [ ] Can create services
- [ ] Can view bookings

## Need Help?

Check these files for more information:
- `database/README.md` - Database setup instructions
- `DATABASE_CONNECTION_FIXES.md` - Technical details of fixes
- `.env` - Your Supabase credentials

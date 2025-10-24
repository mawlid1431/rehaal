# Database Schema Fix Guide

## Issues Found

Your database schema doesn't match what the frontend expects. This is causing:
1. **Services not appearing** - Database has `title` field but frontend expects `name`
2. **Trip details not showing** - Database has `dates`, `price` (TEXT), `image` but frontend expects `start_date`, `end_date`, `price` (DECIMAL), `image_url`
3. **Gallery images not showing** - Database has `url` but frontend expects `image_url`
4. **401 Unauthorized errors** - RLS policies are blocking admin operations

## Solution

You need to update your Supabase database schema AND fix the RLS policies.

## Steps to Fix

### QUICK FIX (If you just need to fix the 401 error)

1. Go to your Supabase dashboard
2. Navigate to SQL Editor
3. Copy the entire content from `fix-rls-policies.sql`
4. Run it in the SQL Editor
5. Try adding a trip/service/gallery item from admin panel

### Option 1: Fresh Database (Recommended if you have no important data)

1. Go to your Supabase dashboard
2. Navigate to SQL Editor  
3. **First, drop all existing tables:**
   ```sql
   DROP TABLE IF EXISTS bookings CASCADE;
   DROP TABLE IF EXISTS testimonials CASCADE;
   DROP TABLE IF EXISTS gallery CASCADE;
   DROP TABLE IF EXISTS services CASCADE;
   DROP TABLE IF EXISTS trips CASCADE;
   ```
4. Copy the entire content from `supabase-schema-updated.sql`
5. Run it in the SQL Editor

### Option 2: Migrate Existing Data

If you have existing data you want to keep, run these migration queries:

```sql
-- 1. Fix TRIPS table
ALTER TABLE trips 
  RENAME COLUMN dates TO dates_old;

ALTER TABLE trips 
  ADD COLUMN start_date DATE,
  ADD COLUMN end_date DATE,
  ADD COLUMN is_active BOOLEAN DEFAULT true,
  ADD COLUMN available_slots INTEGER DEFAULT 0;

ALTER TABLE trips 
  RENAME COLUMN image TO image_url;

-- Convert price from TEXT to DECIMAL
ALTER TABLE trips 
  ADD COLUMN price_new DECIMAL(10, 2);

-- Update price_new with numeric values (adjust as needed)
UPDATE trips 
SET price_new = 17000 
WHERE price_new IS NULL;

ALTER TABLE trips 
  DROP COLUMN price;

ALTER TABLE trips 
  RENAME COLUMN price_new TO price;

-- 2. Fix SERVICES table
ALTER TABLE services 
  RENAME COLUMN title TO name;

-- 3. Fix GALLERY table
ALTER TABLE gallery 
  RENAME COLUMN url TO image_url;

ALTER TABLE gallery 
  ADD COLUMN category TEXT DEFAULT 'general';

-- 4. Fix TESTIMONIALS table (if needed)
ALTER TABLE testimonials 
  ADD COLUMN trip_id UUID REFERENCES trips(id) ON DELETE SET NULL;

ALTER TABLE testimonials 
  RENAME COLUMN name TO customer_name;

-- Convert date from TEXT to DATE
ALTER TABLE testimonials 
  ADD COLUMN date_new DATE;

UPDATE testimonials 
SET date_new = CURRENT_DATE 
WHERE date_new IS NULL;

ALTER TABLE testimonials 
  DROP COLUMN date;

ALTER TABLE testimonials 
  RENAME COLUMN date_new TO date;

ALTER TABLE testimonials 
  DROP COLUMN trip;
```

## After Migration

1. **Test the admin panel** - Add a new service, trip, and gallery image
2. **Check the frontend** - Navigate to Services, Trips, and Gallery pages
3. **Verify trip details** - Click on a trip to see its detail page

## Frontend Changes Made

I've already updated these files to work with the correct schema:
- `components/pages/ServicesPage.tsx` - Now fetches services from database
- `components/pages/TripsPage.tsx` - Already fetching from database correctly
- `components/pages/TripDetailPage.tsx` - Fixed to use correct field names
- `components/pages/GalleryPage.tsx` - Fixed to use `image_url` instead of `url`

## Verification Checklist

After running the migration:
- [ ] Services added from admin appear on Services page
- [ ] Trips added from admin appear on Trips page
- [ ] Trip detail page shows all information correctly
- [ ] Gallery images added from admin appear on Gallery page
- [ ] Gallery lightbox shows images correctly

## Need Help?

If you encounter any errors during migration, check:
1. Your Supabase connection is working (check `.env` file)
2. You have the correct permissions in Supabase
3. The RLS policies are set up correctly (they're in the schema file)

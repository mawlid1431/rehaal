# Quick Fix for 401 Unauthorized Error

## The Problem

When you try to add trips, services, or gallery items from the admin panel, you get:
```
401 (Unauthorized)
new row violates row-level security policy for table "trips"
```

This happens because Supabase's Row Level Security (RLS) is blocking your requests.

## The Solution (2 minutes)

### Step 1: Open Supabase SQL Editor

1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Select your project
3. Click on "SQL Editor" in the left sidebar

### Step 2: Run the Fix

Copy and paste this entire SQL code into the editor and click "Run":

```sql
-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Allow authenticated full access on trips" ON trips;
DROP POLICY IF EXISTS "Allow authenticated full access on bookings" ON bookings;
DROP POLICY IF EXISTS "Allow authenticated full access on gallery" ON gallery;
DROP POLICY IF EXISTS "Allow authenticated full access on testimonials" ON testimonials;
DROP POLICY IF EXISTS "Allow authenticated full access on services" ON services;

-- TRIPS - Allow public access
CREATE POLICY "Allow public insert on trips" ON trips FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on trips" ON trips FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on trips" ON trips FOR DELETE USING (true);

-- GALLERY - Allow public access
CREATE POLICY "Allow public insert on gallery" ON gallery FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on gallery" ON gallery FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on gallery" ON gallery FOR DELETE USING (true);

-- TESTIMONIALS - Allow public access
CREATE POLICY "Allow public insert on testimonials" ON testimonials FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on testimonials" ON testimonials FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on testimonials" ON testimonials FOR DELETE USING (true);

-- SERVICES - Allow public access
CREATE POLICY "Allow public insert on services" ON services FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on services" ON services FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on services" ON services FOR DELETE USING (true);

-- BOOKINGS - Allow public access
CREATE POLICY "Allow public update on bookings" ON bookings FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on bookings" ON bookings FOR DELETE USING (true);
```

### Step 3: Test

1. Go back to your admin panel
2. Try adding a new trip, service, or gallery item
3. It should work now! ✅

## Important Note

⚠️ **This allows anyone to modify your data!** This is fine for development/testing, but for production you should implement proper authentication.

## What This Does

- Removes the policies that require authentication
- Adds new policies that allow anyone to create, update, and delete data
- Keeps RLS enabled (which is good practice)

## Next Steps

Once everything is working, you should:
1. Implement proper authentication in your admin panel
2. Update RLS policies to check for authenticated users
3. Protect your admin routes

But for now, this will get you up and running!

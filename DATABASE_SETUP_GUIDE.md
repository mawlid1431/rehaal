# Database Setup Guide

## The Problem
You're getting 404 errors because the tables don't exist in Supabase yet.

## Solution: Run the SQL Script

### Method 1: Run Complete Script (Recommended)

1. **Open Supabase Dashboard**
   - Go to: https://supabase.com/dashboard
   - Select your project

2. **Open SQL Editor**
   - Click "SQL Editor" in the left sidebar
   - Click "New query"

3. **Copy and Paste**
   - Open the file: `setup-database-step-by-step.sql`
   - Copy ALL the content (Ctrl+A, Ctrl+C)
   - Paste into Supabase SQL Editor

4. **Run the Script**
   - Click "Run" button (or press Ctrl+Enter)
   - Wait for it to complete (should take 5-10 seconds)

5. **Check Results**
   - Scroll down to see the verification results
   - You should see:
     - 5 tables created (trips, bookings, gallery, testimonials, services)
     - Sample data inserted (3 trips, 4 services, 3 gallery items)
     - RLS enabled on all tables
     - Policies created

### Method 2: Run Section by Section (If Method 1 Fails)

If you get errors, run each STEP separately:

1. Copy STEP 1 only → Run
2. Copy STEP 2 only → Run
3. Continue through STEP 18

This helps identify which step is causing issues.

## After Running the Script

### 1. Verify Tables in Supabase
- Go to "Table Editor" in Supabase
- You should see 5 tables:
  - trips (with 3 sample trips)
  - bookings (empty)
  - gallery (with 3 images)
  - testimonials (empty)
  - services (with 4 services)

### 2. Refresh Your App
- Go back to your app in the browser
- Press Ctrl+Shift+R (hard refresh)
- The 404 errors should be gone
- You should see the sample trips and services

### 3. Test the App
- Homepage should load with trips and services
- Admin panel should show the trips
- Booking form should work

## Common Issues

### Issue 1: "Permission denied" errors
**Solution:** Make sure you're logged into Supabase with the correct account

### Issue 2: "Already exists" errors
**Solution:** The script includes DROP TABLE commands, but if you still get errors:
```sql
-- Run this first to clean everything
DROP TABLE IF EXISTS bookings CASCADE;
DROP TABLE IF EXISTS testimonials CASCADE;
DROP TABLE IF EXISTS gallery CASCADE;
DROP TABLE IF EXISTS services CASCADE;
DROP TABLE IF EXISTS trips CASCADE;
```

### Issue 3: Still getting 404 errors after running script
**Solution:**
1. Check if tables exist in Table Editor
2. Check if RLS policies exist (Settings → Policies)
3. Try restarting your dev server:
   - Stop the server (Ctrl+C)
   - Run `npm run dev` again
4. Clear browser cache and hard refresh (Ctrl+Shift+R)

### Issue 4: "Could not find the table in schema cache"
**Solution:** 
1. Wait 30 seconds after running the script
2. Refresh your browser
3. If still not working, go to Supabase Dashboard → Settings → API
4. Click "Restart API" button

## Verify Everything is Working

Run this query in Supabase SQL Editor to check:

```sql
-- Should return 5 tables
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- Should show data counts
SELECT 'trips' as table_name, COUNT(*) FROM trips
UNION ALL SELECT 'services', COUNT(*) FROM services
UNION ALL SELECT 'gallery', COUNT(*) FROM gallery;
```

Expected results:
- trips: 3 rows
- services: 4 rows
- gallery: 3 rows
- bookings: 0 rows
- testimonials: 0 rows

## Need Help?

If you're still having issues:
1. Check the browser console for specific error messages
2. Check Supabase logs (Dashboard → Logs)
3. Verify your `.env` file has correct Supabase credentials:
   ```
   VITE_SUPABASE_URL=https://xnkfbsfgsjpssjtsiiac.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

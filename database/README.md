# Database Setup

This folder contains all SQL files for your Supabase database.

## Files

### `supabase-schema-updated.sql` ⭐ **USE THIS ONE**
The updated database schema with 5 tables (matches admin panel):
- **Trips** - Travel packages with dates, pricing, and availability
- **Bookings** - Customer bookings with status tracking
- **Gallery** - Image gallery with categories
- **Testimonials** - Customer reviews linked to trips
- **Services** - Services offered with icons

### `supabase-schema-final.sql` (Old version)
Previous schema - can be deleted

### `supabase-schema.sql` (Old version)
Previous schema - can be deleted

### `supabase-sample-data.sql` (Optional)
Sample data for testing

## How to Setup

1. Go to your Supabase project: https://xnkfbsfgsjpssjtsiiac.supabase.co
2. Click **SQL Editor** in the sidebar
3. Click **New Query**
4. Copy all content from `supabase-schema-updated.sql`
5. Paste and click **Run**

Done! Your database is ready.

## Storage Setup (for images)

1. Go to **Storage** in Supabase
2. Click **New Bucket**
3. Name: `images`
4. Make it **Public**
5. Click **Create**

## Admin Panel Connection

All admin components are now connected to Supabase:
- ✅ Dashboard - Shows real-time statistics
- ✅ Trips Manager - Full CRUD operations
- ✅ Bookings Manager - Status management & Excel export
- ✅ Gallery Manager - Image upload & categorization
- ✅ Testimonials Manager - Linked to trips
- ✅ Services Manager - Icon-based services

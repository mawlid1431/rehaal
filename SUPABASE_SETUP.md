# Supabase Database Setup Guide

## Step 1: Access Supabase SQL Editor

1. Go to your Supabase project: https://xnkfbsfgsjpssjtsiiac.supabase.co
2. Click on the **SQL Editor** in the left sidebar
3. Click **New Query**

## Step 2: Run the Schema SQL

1. Open the file `supabase-schema.sql` in this project
2. Copy all the contents
3. Paste into the Supabase SQL Editor
4. Click **Run** or press `Ctrl+Enter`

This will create:
- ✅ **trips** table (for managing travel packages)
- ✅ **gallery** table (for photo gallery)
- ✅ **testimonials** table (for customer reviews)
- ✅ **services** table (for services offered)
- ✅ **bookings** table (for customer bookings)
- ✅ Indexes for better performance
- ✅ Auto-update triggers for `updated_at` fields
- ✅ Row Level Security (RLS) policies

## Step 3: (Optional) Add Sample Data

1. Open the file `supabase-sample-data.sql`
2. Copy all the contents
3. Paste into a new query in Supabase SQL Editor
4. Click **Run**

This adds sample data for testing your admin panel.

## Step 4: Create Storage Bucket for Images

1. Go to **Storage** in the left sidebar
2. Click **New Bucket**
3. Name it: `images`
4. Make it **Public**
5. Click **Create Bucket**

## Database Structure

### Trips Table
- Title, Destination, Start/End Date, Duration, Price
- Image URL, Description
- Admin can: Create, Read, Update, Delete

### Gallery Table
- Title, Image URL, Description
- Admin can: Create, Read, Update, Delete

### Testimonials Table
- Customer Name, Rating (1-5), Trip Reference
- Date, Comment
- Admin can: Create, Read, Update, Delete

### Services Table
- Icon name, Title, Description
- Admin can: Create, Read, Update, Delete

### Bookings Table
- Trip Reference, Customer Details (Name, Email, Phone)
- Number of People, Booking Date, Special Requests
- Status (pending/confirmed/cancelled), Total Price
- Admin can: Read, Delete, Update Status
- Public can: Create (via booking form)

## Security

- **Public users** can:
  - View all trips, gallery, testimonials, services
  - Create bookings
  
- **Authenticated users (Admin)** can:
  - Full CRUD on trips, gallery, testimonials, services
  - View and delete bookings
  - Update booking status

## Using the API in Your Code

```typescript
import { tripsApi, galleryApi, testimonialsApi, servicesApi, bookingsApi } from './lib/api'

// Get all trips
const trips = await tripsApi.getAll()

// Create a new trip
const newTrip = await tripsApi.create({
  title: 'Amazing Adventure',
  destination: 'Paris',
  start_date: '2025-06-01',
  end_date: '2025-06-07',
  duration: 7,
  price: 1299.99,
  image_url: 'https://example.com/image.jpg',
  description: 'An amazing trip to Paris'
})

// Update a trip
await tripsApi.update(tripId, { price: 1199.99 })

// Delete a trip
await tripsApi.delete(tripId)

// Similar methods available for gallery, testimonials, services, and bookings
```

## Image Upload

You can upload images to Supabase Storage:

```typescript
import { uploadImage } from './lib/api'

const file = event.target.files[0]
const imageUrl = await uploadImage(file, 'images')
// Use imageUrl in your trip/gallery creation
```

## Next Steps

1. Run the SQL scripts in Supabase
2. Create the storage bucket
3. Build your admin panel UI
4. Use the provided API functions to interact with the database

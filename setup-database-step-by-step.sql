-- ============================================
-- STEP-BY-STEP DATABASE SETUP
-- Run each section separately in Supabase SQL Editor
-- ============================================

-- ============================================
-- STEP 1: Enable UUID Extension
-- ============================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- STEP 2: Drop Existing Tables (if any)
-- ============================================
DROP TABLE IF EXISTS bookings CASCADE;
DROP TABLE IF EXISTS testimonials CASCADE;
DROP TABLE IF EXISTS gallery CASCADE;
DROP TABLE IF EXISTS services CASCADE;
DROP TABLE IF EXISTS trips CASCADE;

-- Drop existing function if it exists
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;

-- ============================================
-- STEP 3: Create Trips Table
-- ============================================
CREATE TABLE trips (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  destination TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  duration TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  image_url TEXT,
  description TEXT,
  available_slots INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  category TEXT DEFAULT 'upcoming' CHECK (category IN ('upcoming', 'past')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- STEP 4: Create Bookings Table
-- ============================================
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trip_id UUID REFERENCES trips(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  number_of_people INTEGER NOT NULL DEFAULT 1,
  booking_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  special_requests TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  total_price DECIMAL(10, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- STEP 5: Create Gallery Table
-- ============================================
CREATE TABLE gallery (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  image_url TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT DEFAULT 'general',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- STEP 6: Create Testimonials Table
-- ============================================
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trip_id UUID REFERENCES trips(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- STEP 7: Create Services Table
-- ============================================
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  icon TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- STEP 8: Create Indexes
-- ============================================
CREATE INDEX idx_trips_title ON trips(title);
CREATE INDEX idx_trips_active ON trips(is_active);
CREATE INDEX idx_trips_category ON trips(category);
CREATE INDEX idx_bookings_trip_id ON bookings(trip_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_testimonials_trip_id ON testimonials(trip_id);
CREATE INDEX idx_gallery_category ON gallery(category);

-- ============================================
-- STEP 9: Create Update Timestamp Function
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- STEP 10: Create Triggers
-- ============================================
CREATE TRIGGER update_trips_updated_at 
  BEFORE UPDATE ON trips
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at 
  BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_gallery_updated_at 
  BEFORE UPDATE ON gallery
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_testimonials_updated_at 
  BEFORE UPDATE ON testimonials
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at 
  BEFORE UPDATE ON services
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- STEP 11: Enable RLS on All Tables
-- ============================================
ALTER TABLE trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- ============================================
-- STEP 12: Create RLS Policies for TRIPS
-- ============================================
CREATE POLICY "trips_select_policy" ON trips FOR SELECT USING (true);
CREATE POLICY "trips_insert_policy" ON trips FOR INSERT WITH CHECK (true);
CREATE POLICY "trips_update_policy" ON trips FOR UPDATE USING (true);
CREATE POLICY "trips_delete_policy" ON trips FOR DELETE USING (true);

-- ============================================
-- STEP 13: Create RLS Policies for BOOKINGS
-- ============================================
CREATE POLICY "bookings_select_policy" ON bookings FOR SELECT USING (true);
CREATE POLICY "bookings_insert_policy" ON bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "bookings_update_policy" ON bookings FOR UPDATE USING (true);
CREATE POLICY "bookings_delete_policy" ON bookings FOR DELETE USING (true);

-- ============================================
-- STEP 14: Create RLS Policies for GALLERY
-- ============================================
CREATE POLICY "gallery_select_policy" ON gallery FOR SELECT USING (true);
CREATE POLICY "gallery_insert_policy" ON gallery FOR INSERT WITH CHECK (true);
CREATE POLICY "gallery_update_policy" ON gallery FOR UPDATE USING (true);
CREATE POLICY "gallery_delete_policy" ON gallery FOR DELETE USING (true);

-- ============================================
-- STEP 15: Create RLS Policies for TESTIMONIALS
-- ============================================
CREATE POLICY "testimonials_select_policy" ON testimonials FOR SELECT USING (true);
CREATE POLICY "testimonials_insert_policy" ON testimonials FOR INSERT WITH CHECK (true);
CREATE POLICY "testimonials_update_policy" ON testimonials FOR UPDATE USING (true);
CREATE POLICY "testimonials_delete_policy" ON testimonials FOR DELETE USING (true);

-- ============================================
-- STEP 16: Create RLS Policies for SERVICES
-- ============================================
CREATE POLICY "services_select_policy" ON services FOR SELECT USING (true);
CREATE POLICY "services_insert_policy" ON services FOR INSERT WITH CHECK (true);
CREATE POLICY "services_update_policy" ON services FOR UPDATE USING (true);
CREATE POLICY "services_delete_policy" ON services FOR DELETE USING (true);

-- ============================================
-- STEP 17: Insert Sample Data
-- ============================================

-- Sample Trips
INSERT INTO trips (title, destination, start_date, end_date, duration, price, image_url, description, available_slots, is_active, category) VALUES
('Paris Adventure', 'Paris, France', '2025-06-15', '2025-06-22', '7 days', 1299.00, 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34', 'Experience the magic of Paris with guided tours of the Eiffel Tower, Louvre Museum, and more.', 20, true, 'upcoming'),
('Tokyo Discovery', 'Tokyo, Japan', '2025-07-10', '2025-07-20', '10 days', 2499.00, 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf', 'Explore the vibrant culture of Tokyo, from ancient temples to modern technology.', 15, true, 'upcoming'),
('Bali Retreat', 'Bali, Indonesia', '2025-08-05', '2025-08-12', '7 days', 1599.00, 'https://images.unsplash.com/photo-1537996194471-e657df975ab4', 'Relax on beautiful beaches and discover Bali''s rich cultural heritage.', 25, true, 'upcoming');

-- Sample Services
INSERT INTO services (icon, name, description) VALUES
('Plane', 'Flight Booking', 'We handle all your flight arrangements with the best airlines and competitive prices.'),
('Hotel', 'Accommodation', 'Carefully selected hotels and resorts that match your comfort and budget needs.'),
('MapPin', 'Guided Tours', 'Expert local guides to show you the best attractions and hidden gems.'),
('Shield', 'Travel Insurance', 'Comprehensive travel insurance coverage for peace of mind during your journey.');

-- Sample Gallery
INSERT INTO gallery (title, image_url, description, category) VALUES
('Eiffel Tower at Sunset', 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f', 'Beautiful view of the Eiffel Tower during golden hour', 'destinations'),
('Tokyo Street', 'https://images.unsplash.com/photo-1542051841857-5f90071e7989', 'Vibrant streets of Tokyo at night', 'destinations'),
('Bali Beach', 'https://images.unsplash.com/photo-1559827260-dc66d52bef19', 'Pristine beaches of Bali', 'destinations');

-- ============================================
-- STEP 18: Verify Everything
-- ============================================

-- Check tables exist
SELECT 'Tables Created:' as status;
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- Check row counts
SELECT 'Data Inserted:' as status;
SELECT 'trips' as table_name, COUNT(*) as row_count FROM trips
UNION ALL
SELECT 'bookings', COUNT(*) FROM bookings
UNION ALL
SELECT 'gallery', COUNT(*) FROM gallery
UNION ALL
SELECT 'testimonials', COUNT(*) FROM testimonials
UNION ALL
SELECT 'services', COUNT(*) FROM services;

-- Check RLS is enabled
SELECT 'RLS Status:' as status;
SELECT tablename, rowsecurity FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY tablename;

-- Check policies exist
SELECT 'Policies Created:' as status;
SELECT tablename, COUNT(*) as policy_count 
FROM pg_policies 
WHERE schemaname = 'public'
GROUP BY tablename
ORDER BY tablename;

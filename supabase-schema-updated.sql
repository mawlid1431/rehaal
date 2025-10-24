-- ============================================
-- SUPABASE DATABASE SCHEMA - UPDATED
-- Tables: Trips, Bookings, Gallery, Testimonials, Services
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. TRIPS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS trips (
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
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 2. BOOKINGS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trip_id UUID REFERENCES trips(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  number_of_people INTEGER NOT NULL DEFAULT 1,
  booking_date DATE NOT NULL,
  special_requests TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  total_price DECIMAL(10, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 3. GALLERY TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS gallery (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  image_url TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT DEFAULT 'general',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 4. TESTIMONIALS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS testimonials (
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
-- 5. SERVICES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  icon TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- INDEXES FOR BETTER PERFORMANCE
-- ============================================
CREATE INDEX IF NOT EXISTS idx_trips_title ON trips(title);
CREATE INDEX IF NOT EXISTS idx_trips_active ON trips(is_active);
CREATE INDEX IF NOT EXISTS idx_bookings_trip_id ON bookings(trip_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(booking_date);
CREATE INDEX IF NOT EXISTS idx_testimonials_trip_id ON testimonials(trip_id);
CREATE INDEX IF NOT EXISTS idx_testimonials_rating ON testimonials(rating);
CREATE INDEX IF NOT EXISTS idx_gallery_category ON gallery(category);

-- ============================================
-- AUTO-UPDATE TIMESTAMP TRIGGER
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply triggers to all tables
CREATE TRIGGER update_trips_updated_at BEFORE UPDATE ON trips
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_gallery_updated_at BEFORE UPDATE ON gallery
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================
ALTER TABLE trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- ============================================
-- PUBLIC ACCESS POLICIES (FOR DEVELOPMENT)
-- WARNING: These allow anyone to modify data!
-- For production, implement proper authentication
-- ============================================

-- TRIPS - Public access for all operations
CREATE POLICY "Allow public read on trips" ON trips 
  FOR SELECT USING (true);
CREATE POLICY "Allow public insert on trips" ON trips 
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on trips" ON trips 
  FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on trips" ON trips 
  FOR DELETE USING (true);

-- GALLERY - Public access for all operations
CREATE POLICY "Allow public read on gallery" ON gallery 
  FOR SELECT USING (true);
CREATE POLICY "Allow public insert on gallery" ON gallery 
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on gallery" ON gallery 
  FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on gallery" ON gallery 
  FOR DELETE USING (true);

-- TESTIMONIALS - Public access for all operations
CREATE POLICY "Allow public read on testimonials" ON testimonials 
  FOR SELECT USING (true);
CREATE POLICY "Allow public insert on testimonials" ON testimonials 
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on testimonials" ON testimonials 
  FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on testimonials" ON testimonials 
  FOR DELETE USING (true);

-- SERVICES - Public access for all operations
CREATE POLICY "Allow public read on services" ON services 
  FOR SELECT USING (true);
CREATE POLICY "Allow public insert on services" ON services 
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on services" ON services 
  FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on services" ON services 
  FOR DELETE USING (true);

-- BOOKINGS - Public access for all operations
CREATE POLICY "Allow public read on bookings" ON bookings 
  FOR SELECT USING (true);
CREATE POLICY "Allow public insert on bookings" ON bookings 
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on bookings" ON bookings 
  FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on bookings" ON bookings 
  FOR DELETE USING (true);

-- ============================================
-- FIX RLS POLICIES FOR ADMIN PANEL
-- Run this in your Supabase SQL Editor
-- ============================================

-- Option 1: DISABLE RLS (Quick fix for development - NOT SECURE)
-- Uncomment these lines if you want to completely disable RLS:
-- ALTER TABLE trips DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE bookings DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE gallery DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE testimonials DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE services DISABLE ROW LEVEL SECURITY;

-- Option 2: ALLOW PUBLIC ACCESS (Better for development)
-- This keeps RLS enabled but allows anyone to modify data

-- First, drop existing restrictive policies
DROP POLICY IF EXISTS "Allow authenticated full access on trips" ON trips;
DROP POLICY IF EXISTS "Allow authenticated full access on bookings" ON bookings;
DROP POLICY IF EXISTS "Allow authenticated full access on gallery" ON gallery;
DROP POLICY IF EXISTS "Allow authenticated full access on testimonials" ON testimonials;
DROP POLICY IF EXISTS "Allow authenticated full access on services" ON services;

-- Create new policies that allow public access for INSERT, UPDATE, DELETE
-- TRIPS
CREATE POLICY "Allow public insert on trips" ON trips
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update on trips" ON trips
  FOR UPDATE USING (true);

CREATE POLICY "Allow public delete on trips" ON trips
  FOR DELETE USING (true);

-- GALLERY
CREATE POLICY "Allow public insert on gallery" ON gallery
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update on gallery" ON gallery
  FOR UPDATE USING (true);

CREATE POLICY "Allow public delete on gallery" ON gallery
  FOR DELETE USING (true);

-- TESTIMONIALS
CREATE POLICY "Allow public insert on testimonials" ON testimonials
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update on testimonials" ON testimonials
  FOR UPDATE USING (true);

CREATE POLICY "Allow public delete on testimonials" ON testimonials
  FOR DELETE USING (true);

-- SERVICES
CREATE POLICY "Allow public insert on services" ON services
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update on services" ON services
  FOR UPDATE USING (true);

CREATE POLICY "Allow public delete on services" ON services
  FOR DELETE USING (true);

-- BOOKINGS (already has public insert, add update/delete)
CREATE POLICY "Allow public update on bookings" ON bookings
  FOR UPDATE USING (true);

CREATE POLICY "Allow public delete on bookings" ON bookings
  FOR DELETE USING (true);

-- ============================================
-- IMPORTANT SECURITY NOTE
-- ============================================
-- These policies allow ANYONE to modify your data!
-- This is fine for development/testing, but for PRODUCTION you should:
-- 1. Set up Supabase Authentication
-- 2. Protect your admin routes with authentication
-- 3. Use proper RLS policies that check auth.uid()
-- ============================================

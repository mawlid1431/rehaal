-- Add category field to trips table
-- Run this in Supabase SQL Editor if your trips table already exists

ALTER TABLE trips 
ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'upcoming' CHECK (category IN ('upcoming', 'past'));

-- Update existing trips to have a category based on their end_date
UPDATE trips 
SET category = CASE 
    WHEN end_date < CURRENT_DATE THEN 'past'
    ELSE 'upcoming'
END
WHERE category IS NULL;

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_trips_category ON trips(category);

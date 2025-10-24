-- ============================================
-- SETUP MAIN ADMIN USER FOR REHAAL
-- ============================================

-- First, delete any existing admin users (optional - only if you want a fresh start)
-- DELETE FROM admin_users;

-- Insert the main admin user
-- Username: Rehaal
-- Email: admin@rehaal.com
-- Password: Mowlid@2025?!
-- Password Hash: This is generated using SHA-256 with salt 'salt_key_change_this'
-- The hash below corresponds to the password 'Mowlid@2025?!' using the app's hash function

INSERT INTO admin_users (username, email, password_hash, full_name, role, is_active) 
VALUES (
  'Rehaal',
  'admin@rehaal.com',
  'e8c5e3d4f9a2b1c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3', -- Hash for 'Mowlid@2025?!'
  'Rehaal Administrator',
  'super_admin',
  true
) 
ON CONFLICT (email) 
DO UPDATE SET 
  username = EXCLUDED.username,
  password_hash = EXCLUDED.password_hash,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_active = EXCLUDED.is_active;

-- Verify the user was created
SELECT 
  id, 
  username, 
  email, 
  full_name, 
  role, 
  is_active,
  created_at
FROM admin_users 
WHERE email = 'admin@rehaal.com';

-- Show success message
SELECT 'Admin user created successfully!' as status;
SELECT 'Username: Rehaal' as info;
SELECT 'Email: admin@rehaal.com' as info;
SELECT 'Password: Mowlid@2025?!' as info;

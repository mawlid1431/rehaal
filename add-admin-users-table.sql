-- ============================================
-- ADMIN USERS TABLE FOR AUTHENTICATION
-- ============================================

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT DEFAULT 'admin' CHECK (role IN ('super_admin', 'admin', 'editor')),
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX idx_admin_users_email ON admin_users(email);
CREATE INDEX idx_admin_users_username ON admin_users(username);
CREATE INDEX idx_admin_users_active ON admin_users(is_active);

-- Add trigger for updated_at
CREATE TRIGGER update_admin_users_updated_at 
  BEFORE UPDATE ON admin_users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- RLS Policies for admin_users
CREATE POLICY "admin_users_select_policy" ON admin_users FOR SELECT USING (true);
CREATE POLICY "admin_users_insert_policy" ON admin_users FOR INSERT WITH CHECK (true);
CREATE POLICY "admin_users_update_policy" ON admin_users FOR UPDATE USING (true);
CREATE POLICY "admin_users_delete_policy" ON admin_users FOR DELETE USING (true);

-- Insert default super admin
-- Username: Rehaal
-- Email: admin@rehaal.com
-- Password: Mowlid@2025?!
-- Note: The password is hashed using SHA-256 with salt in the application
INSERT INTO admin_users (username, email, password_hash, full_name, role) 
VALUES (
  'Rehaal',
  'admin@rehaal.com',
  'TEMP_HASH_WILL_BE_GENERATED', -- This will be replaced when you first login
  'Rehaal Administrator',
  'super_admin'
) ON CONFLICT (email) DO NOTHING;

-- Create password reset tokens table
CREATE TABLE IF NOT EXISTS password_reset_tokens (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES admin_users(id) ON DELETE CASCADE,
  token TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  used BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for token lookups
CREATE INDEX idx_password_reset_tokens_token ON password_reset_tokens(token);
CREATE INDEX idx_password_reset_tokens_user_id ON password_reset_tokens(user_id);

-- Enable RLS
ALTER TABLE password_reset_tokens ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "password_reset_tokens_select_policy" ON password_reset_tokens FOR SELECT USING (true);
CREATE POLICY "password_reset_tokens_insert_policy" ON password_reset_tokens FOR INSERT WITH CHECK (true);
CREATE POLICY "password_reset_tokens_update_policy" ON password_reset_tokens FOR UPDATE USING (true);
CREATE POLICY "password_reset_tokens_delete_policy" ON password_reset_tokens FOR DELETE USING (true);

-- Verify tables created
SELECT 'Admin Users Table Created' as status;
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' AND table_name IN ('admin_users', 'password_reset_tokens')
ORDER BY table_name;

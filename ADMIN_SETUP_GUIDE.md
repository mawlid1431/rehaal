# Admin Authentication Setup Guide

## Overview
Your admin panel now has a complete authentication system with user management.

## Admin Credentials

**Main Admin Account:**
- **Username:** Rehaal
- **Email:** admin@rehaal.com
- **Password:** Mowlid@2025?!
- **Role:** Super Admin (full access)

## Setup Steps

### Step 1: Create Admin Users Table

1. Open Supabase Dashboard → SQL Editor
2. Run the SQL file: `add-admin-users-table.sql`
3. This creates:
   - `admin_users` table
   - `password_reset_tokens` table
   - Necessary indexes and policies

### Step 2: Generate Password Hash

**Option A: Use the HTML Tool (Recommended)**
1. Open `generate-password-hash.html` in your browser
2. The hash will be automatically generated
3. Click "Copy SQL Query"
4. Go to Supabase SQL Editor
5. Paste and run the query

**Option B: Manual Setup**
1. Open `generate-password-hash.html` in browser
2. Copy the generated hash
3. Run this SQL in Supabase:

```sql
INSERT INTO admin_users (username, email, password_hash, full_name, role, is_active) 
VALUES (
  'Rehaal',
  'admin@rehaal.com',
  'YOUR_GENERATED_HASH_HERE',
  'Rehaal Administrator',
  'super_admin',
  true
) 
ON CONFLICT (email) 
DO UPDATE SET password_hash = EXCLUDED.password_hash;
```

### Step 3: Test Login

1. Go to your app: `http://localhost:5173/admin` (or your port)
2. You should see the login page
3. Enter:
   - Email: admin@rehaal.com
   - Password: Mowlid@2025?!
4. Click "Sign In"

## Features

### 🔐 Authentication
- ✅ Secure login with email and password
- ✅ Password hashing (SHA-256 with salt)
- ✅ Session management with localStorage
- ✅ Auto-redirect to login if not authenticated
- ✅ Logout functionality

### 👥 User Management
- ✅ Add new admin users
- ✅ Edit existing users
- ✅ Delete users (except yourself)
- ✅ Activate/deactivate users
- ✅ Role-based permissions:
  - **Super Admin:** Full access including user management
  - **Admin:** Full access except user management
  - **Editor:** Can edit content only

### 🔑 Password Reset
- ✅ Forgot password link
- ✅ Password reset token system
- ✅ Email notification (demo mode)

## User Roles Explained

### Super Admin
- Full system access
- Can manage all users
- Can change user roles
- Can delete any user (except themselves)

### Admin
- Can manage trips, bookings, gallery, testimonials, services
- Cannot access user management
- Cannot change roles

### Editor
- Can edit content
- Limited access to sensitive operations

## Security Features

1. **Password Hashing:** All passwords are hashed using SHA-256
2. **Session Tokens:** Secure token-based authentication
3. **Role-Based Access:** Different permission levels
4. **Active Status:** Ability to deactivate users without deleting
5. **Last Login Tracking:** Monitor user activity

## Database Schema

### admin_users Table
```sql
- id (UUID, Primary Key)
- username (TEXT, Unique)
- email (TEXT, Unique)
- password_hash (TEXT)
- full_name (TEXT)
- role (TEXT: super_admin, admin, editor)
- is_active (BOOLEAN)
- last_login (TIMESTAMP)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### password_reset_tokens Table
```sql
- id (UUID, Primary Key)
- user_id (UUID, Foreign Key)
- token (TEXT, Unique)
- expires_at (TIMESTAMP)
- used (BOOLEAN)
- created_at (TIMESTAMP)
```

## Troubleshooting

### Issue: Can't login with credentials
**Solution:**
1. Open `generate-password-hash.html` in browser
2. Copy the generated hash
3. Run this SQL in Supabase:
```sql
UPDATE admin_users 
SET password_hash = 'YOUR_HASH_HERE'
WHERE email = 'admin@rehaal.com';
```

### Issue: "Invalid email or password"
**Solution:**
1. Check if user exists in database:
```sql
SELECT * FROM admin_users WHERE email = 'admin@rehaal.com';
```
2. If not found, run the insert query from Step 2
3. Make sure the password hash matches

### Issue: User is inactive
**Solution:**
```sql
UPDATE admin_users 
SET is_active = true
WHERE email = 'admin@rehaal.com';
```

### Issue: Login page doesn't show
**Solution:**
1. Clear browser cache and localStorage
2. Hard refresh (Ctrl+Shift+R)
3. Check browser console for errors

## Adding More Users

### Via Admin Panel (After Login)
1. Login as Super Admin
2. Go to "Users" section
3. Click "Add User"
4. Fill in the form:
   - Full Name
   - Username
   - Email
   - Password (min 6 characters)
   - Role
   - Active status
5. Click "Create User"

### Via SQL (Direct Database)
```sql
-- Generate hash first using generate-password-hash.html
INSERT INTO admin_users (username, email, password_hash, full_name, role) 
VALUES (
  'john_doe',
  'john@rehaal.com',
  'GENERATED_HASH_HERE',
  'John Doe',
  'admin'
);
```

## Changing Password

### For Yourself (After Login)
1. Go to Users section
2. Click Edit on your user
3. Enter new password
4. Click Update

### For Other Users (Super Admin Only)
1. Go to Users section
2. Click Edit on the user
3. Enter new password
4. Click Update

### Via SQL
```sql
-- Generate new hash first
UPDATE admin_users 
SET password_hash = 'NEW_HASH_HERE'
WHERE email = 'user@email.com';
```

## Production Recommendations

For production deployment, consider:

1. **Use bcrypt:** Replace SHA-256 with bcrypt for better security
   ```bash
   npm install bcryptjs
   ```

2. **Environment Variables:** Store salt keys in .env
   ```
   VITE_PASSWORD_SALT=your_secret_salt_here
   ```

3. **HTTPS Only:** Always use HTTPS in production

4. **Session Expiry:** Implement token expiration

5. **Rate Limiting:** Add login attempt limits

6. **2FA:** Consider adding two-factor authentication

7. **Audit Logs:** Track all admin actions

## Files Created

- `lib/auth.ts` - Authentication utilities
- `components/admin/LoginPage.tsx` - Login interface
- `components/admin/UsersManager.tsx` - User management
- `add-admin-users-table.sql` - Database schema
- `setup-admin-user.sql` - Admin user setup
- `generate-password-hash.html` - Password hash generator
- `ADMIN_SETUP_GUIDE.md` - This guide

## Support

If you encounter any issues:
1. Check browser console for errors
2. Check Supabase logs
3. Verify database tables exist
4. Ensure RLS policies are correct
5. Clear browser cache and localStorage

## Next Steps

1. ✅ Run the SQL scripts in Supabase
2. ✅ Generate and set the password hash
3. ✅ Test login with admin credentials
4. ✅ Add additional users as needed
5. ✅ Configure roles and permissions
6. ✅ Set up password reset email (if needed)

Your admin panel is now secure and ready to use! 🎉

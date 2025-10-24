# 📚 Rehaal Travel Website - Complete Documentation

## 👨‍💻 Developer Information

**Built by:** Mowlid Mohamoud Haibe

**Connect with me:**
- 💼 LinkedIn: [Mowlid Mohamoud Haibe](https://www.linkedin.com/in/mowlid-mohamoud-haibe-8b7b6a189/)
- 🐙 GitHub: [@mawlid1431](https://github.com/mawlid1431)
- 🌐 Portfolio: [malitos.vercel.app](https://malitos.vercel.app/)

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Installation & Setup](#installation--setup)
5. [Running the Application](#running-the-application)
6. [Frontend Features](#frontend-features)
7. [Admin Panel](#admin-panel)
8. [Database Setup](#database-setup)
9. [Authentication System](#authentication-system)
10. [Deployment](#deployment)
11. [Troubleshooting](#troubleshooting)

---

## 🎯 Project Overview

**Rehaal Travel** is a full-stack travel agency website specializing in Umrah and Hajj packages. The website features a modern, responsive design with a complete admin panel for managing trips, bookings, gallery, testimonials, and services.

### Key Features:
- ✅ Multi-language support (English, Danish, Arabic)
- ✅ Dark/Light mode
- ✅ Responsive design for all devices
- ✅ Complete admin panel with authentication
- ✅ Real-time booking system
- ✅ Image gallery management
- ✅ Testimonials system
- ✅ Contact form
- ✅ WhatsApp integration

---

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling framework
- **Framer Motion** - Animations
- **Lucide React** - Icons

### Backend & Database
- **Supabase** - Backend as a Service
  - PostgreSQL database
  - Authentication
  - Real-time subscriptions
  - Storage for images
  - Row Level Security (RLS)

### State Management & Utilities
- **React Context API** - Global state
- **Sonner** - Toast notifications
- **React Hook Form** - Form handling
- **Date-fns** - Date utilities

### Deployment
- **Vercel** - Frontend hosting
- **Supabase Cloud** - Backend hosting

---

## 📁 Project Structure

```
rehaal-travel/
├── components/              # React components
│   ├── admin/              # Admin panel components
│   │   ├── AdminLayout.tsx
│   │   ├── Dashboard.tsx
│   │   ├── TripsManager.tsx
│   │   ├── BookingsManager.tsx
│   │   ├── GalleryManager.tsx
│   │   ├── TestimonialsManager.tsx
│   │   ├── ServicesManager.tsx
│   │   ├── SettingsManager.tsx
│   │   ├── LoginPage.tsx
│   │   └── UsersManager.tsx
│   ├── pages/              # Page components
│   │   ├── HomePage.tsx
│   │   ├── AboutPage.tsx
│   │   ├── ServicesPage.tsx
│   │   ├── TripsPage.tsx
│   │   ├── TripDetailPage.tsx
│   │   ├── BookingPage.tsx
│   │   ├── GalleryPage.tsx
│   │   ├── TestimonialsPage.tsx
│   │   ├── ContactPage.tsx
│   │   └── AdminPage.tsx
│   ├── ui/                 # Reusable UI components
│   ├── figma/              # Design system components
│   ├── Navigation.tsx      # Main navigation
│   ├── Footer.tsx          # Footer component
│   ├── HeroSection.tsx     # Hero slider
│   ├── TripCard.tsx        # Trip card component
│   └── TestimonialCard.tsx # Testimonial card
├── lib/                    # Utilities and configurations
│   ├── api.ts             # API functions
│   ├── auth.ts            # Authentication utilities
│   ├── contexts.tsx       # React contexts
│   ├── data.ts            # Static data
│   ├── supabase.ts        # Supabase client
│   └── types.ts           # TypeScript types
├── Public/                 # Static assets
│   └── Assents/
│       ├── Logos/         # Logo files
│       └── main/          # Main images
├── styles/                 # Global styles
│   └── globals.css        # Global CSS
├── documantion/           # Documentation files
├── database/              # Database schemas
├── .env                   # Environment variables
├── package.json           # Dependencies
├── tailwind.config.ts     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite configuration
└── vercel.json            # Vercel deployment config
```

---

## 🚀 Installation & Setup

### Prerequisites

Before you begin, ensure you have:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Git**
- **Supabase account** (free tier works)

### Step 1: Clone the Repository

```bash
git clone https://github.com/mawlid1431/rehaal-travel.git
cd rehaal-travel
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages including:
- React and React DOM
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Supabase client
- And all other dependencies

### Step 3: Environment Variables

Create a `.env` file in the root directory:

```bash
# Copy the example file
cp .env.example .env
```

Add your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
VITE_SUPABASE_JWT_SECRET=your_supabase_jwt_secret
```

**Where to find these:**
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Settings** → **API**
4. Copy the values

### Step 4: Database Setup

Run the database schema in Supabase:

1. Open Supabase Dashboard → **SQL Editor**
2. Run `supabase-schema-complete.sql`
3. This creates all tables:
   - trips
   - bookings
   - gallery
   - testimonials
   - services

### Step 5: Create Admin User

In Supabase Dashboard:
1. Go to **Authentication** → **Users**
2. Click **"Add user"**
3. Fill in:
   - Email: `admin@rehaal.com`
   - Password: `your_secure_password`
   - ✅ Check "Auto Confirm User"
4. Click **"Create User"**

---

## 🏃 Running the Application

### Development Mode

```bash
npm run dev
```

This starts the development server at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

This serves the production build locally for testing.

### Linting

```bash
npm run lint
```

---

## 🎨 Frontend Features

### 1. Homepage

**Location:** `components/pages/HomePage.tsx`

**Features:**
- Hero slider with 3 rotating backgrounds
- About section with service cards
- Featured trips preview
- Statistics section
- Testimonials preview
- Motivational CTA section

**Images Used:**
- Hero: `BG1.jpg`, `BG-2.jpg`, `BG-3.jpg`
- CTA: `BG_below.jpg`

### 2. About Page

**Location:** `components/pages/AboutPage.tsx`

**Features:**
- Company story
- Vision & Mission
- Core values
- Team information

**Images Used:**
- Hero: `about_1.jpg`
- Content: `about-2.jpg`

### 3. Services Page

**Location:** `components/pages/ServicesPage.tsx`

**Features:**
- Complete service listing
- Service cards with icons
- CTA section

**Images Used:**
- Hero: `Sercive_1.jpg`
- CTA: `Service_2.jpg`

### 4. Trips Page

**Location:** `components/pages/TripsPage.tsx`

**Features:**
- Trip filtering (All, Upcoming, Past)
- Trip cards with details
- Book now functionality
- Responsive grid layout

### 5. Trip Detail Page

**Location:** `components/pages/TripDetailPage.tsx`

**Features:**
- Full trip information
- Pricing details
- Included services
- Booking button

### 6. Booking Page

**Location:** `components/pages/BookingPage.tsx`

**Features:**
- Complete booking form
- Personal information
- Travel details
- Emergency contact
- Special requests
- Form validation
- Supabase integration

### 7. Gallery Page

**Location:** `components/pages/GalleryPage.tsx`

**Features:**
- Image grid
- Category filtering
- Lightbox view
- Responsive layout

### 8. Testimonials Page

**Location:** `components/pages/TestimonialsPage.tsx`

**Features:**
- Customer reviews
- Star ratings
- Trip association
- Responsive cards

### 9. Contact Page

**Location:** `components/pages/ContactPage.tsx`

**Features:**
- Contact form
- Company information
- Social media links
- Map integration (optional)

### Multi-Language Support

**Location:** `lib/contexts.tsx`

**Supported Languages:**
- 🇬🇧 English
- 🇩🇰 Danish (Dansk)
- 🇸🇦 Arabic (العربية)

**How it works:**
```tsx
const { t, language, setLanguage } = useLanguage();

// Use in components
<h1>{t('heroTitle')}</h1>
```

### Dark/Light Mode

**Location:** `lib/contexts.tsx`

**How it works:**
```tsx
const { isDarkMode, toggleDarkMode } = useDarkMode();

// Toggle in navigation
<button onClick={toggleDarkMode}>
  {isDarkMode ? <Sun /> : <Moon />}
</button>
```

**Features:**
- Persists in localStorage
- Smooth transitions
- Adaptive logo (changes based on mode)
- System preference detection

---

## 🔐 Admin Panel

### Accessing Admin Panel

**URL:** `http://localhost:5173/admin`

### Login System

**Location:** `components/admin/LoginPage.tsx`

**Features:**
- Email/password authentication
- Show/hide password
- Remember me
- Forgot password
- Supabase Auth integration

**Default Credentials:**
- Email: `admin@rehaal.com`
- Password: (set during user creation)

### Admin Layout

**Location:** `components/admin/AdminLayout.tsx`

**Features:**
- Responsive sidebar navigation
- Dark/light mode toggle
- User profile display
- Logout functionality
- Mobile menu

### Dashboard

**Location:** `components/admin/Dashboard.tsx`

**Features:**
- Statistics overview
- Total trips
- Total bookings
- Active users
- Recent activity
- Quick actions

### Trips Manager

**Location:** `components/admin/TripsManager.tsx`

**Features:**
- View all trips
- Add new trip
- Edit existing trip
- Delete trip
- Upload images
- Set pricing
- Manage availability
- Category (Upcoming/Past)
- Active/Inactive status

**4-Column Responsive Grid:**
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3 columns
- Large: 4 columns

### Bookings Manager

**Location:** `components/admin/BookingsManager.tsx`

**Features:**
- View all bookings
- Search bookings
- Filter by status
- Update booking status (Pending/Confirmed/Cancelled)
- View booking details
- Delete bookings
- Export to Excel

**Booking Statuses:**
- 🟡 Pending - New booking
- 🟢 Confirmed - Approved
- 🔴 Cancelled - Rejected

### Gallery Manager

**Location:** `components/admin/GalleryManager.tsx`

**Features:**
- Upload images
- Edit image details
- Delete images
- Category management
- Image preview
- Responsive grid

### Testimonials Manager

**Location:** `components/admin/TestimonialsManager.tsx`

**Features:**
- Add testimonials
- Edit testimonials
- Delete testimonials
- Star ratings (1-5)
- Link to trips
- Customer information

### Services Manager

**Location:** `components/admin/ServicesManager.tsx`

**Features:**
- Add services
- Edit services
- Delete services
- Icon selection (24 icons available)
- Service descriptions

### Settings Manager

**Location:** `components/admin/SettingsManager.tsx`

**Features:**
- View profile information
- Change password
- Password requirements:
  - Minimum 6 characters
  - Must match confirmation
  - Different from current password
- Current password verification
- Auto-logout after password change

**Tabs:**
1. **Profile** - View email, name, role
2. **Change Password** - Update password securely

---

## 🗄️ Database Setup

### Supabase Configuration

**File:** `lib/supabase.ts`

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

### Database Tables

#### 1. Trips Table

```sql
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
  category TEXT DEFAULT 'upcoming',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 2. Bookings Table

```sql
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trip_id UUID REFERENCES trips(id),
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  number_of_people INTEGER NOT NULL,
  booking_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  special_requests TEXT,
  status TEXT DEFAULT 'pending',
  total_price DECIMAL(10, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 3. Gallery Table

```sql
CREATE TABLE gallery (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  image_url TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT DEFAULT 'general',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 4. Testimonials Table

```sql
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trip_id UUID REFERENCES trips(id),
  customer_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 5. Services Table

```sql
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  icon TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Row Level Security (RLS)

All tables have RLS enabled with public access policies for development.

**For Production:** Update policies to restrict access based on authentication.

---

## 🔒 Authentication System

### Supabase Auth

**File:** `lib/auth.ts`

**Features:**
- Email/password authentication
- Session management
- Password reset
- User metadata
- Role-based permissions

### User Roles

1. **Super Admin**
   - Full system access
   - Can manage users
   - Can change settings

2. **Admin**
   - Can manage content
   - Cannot manage users

3. **Editor**
   - Can edit content
   - Limited access

### Creating Admin Users

**Method 1: Supabase Dashboard**
1. Go to Authentication → Users
2. Click "Add user"
3. Enter email and password
4. Check "Auto Confirm User"
5. Add metadata:
```json
{
  "full_name": "Admin Name",
  "role": "super_admin"
}
```

**Method 2: SQL**
```sql
-- Users are created in Supabase Auth
-- Not directly in database
```

### Password Requirements

- Minimum 6 characters
- Must be different from current password
- Confirmation must match

### Session Management

- Sessions stored in localStorage
- Auto-logout on password change
- Remember me functionality
- Secure token handling

---

## 🚀 Deployment

### Vercel Deployment

**File:** `vercel.json`

**Steps:**

1. **Push to GitHub**
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Import to Vercel**
- Go to [vercel.com](https://vercel.com)
- Click "Add New Project"
- Import your GitHub repository

3. **Configure Environment Variables**
Add in Vercel Dashboard:
```
VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_key
VITE_SUPABASE_SERVICE_ROLE_KEY=your_service_key
VITE_SUPABASE_JWT_SECRET=your_jwt_secret
```

4. **Deploy**
- Click "Deploy"
- Wait 2-3 minutes
- Your site is live!

### Custom Domain

1. Go to Vercel Dashboard → Settings → Domains
2. Add your domain
3. Update DNS records
4. Wait for SSL certificate

### Supabase Configuration

Update redirect URLs in Supabase:
1. Go to Authentication → URL Configuration
2. Add your Vercel URL
3. Add redirect URLs:
   - `https://your-domain.vercel.app/**`
   - `https://your-domain.vercel.app/admin/**`

---

## 🐛 Troubleshooting

### Common Issues

#### 1. "Cannot find module" errors
```bash
# Solution: Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

#### 2. Supabase connection errors
```bash
# Check .env file
# Verify credentials in Supabase Dashboard
# Ensure RLS policies are correct
```

#### 3. Build fails
```bash
# Check for TypeScript errors
npm run lint

# Fix and rebuild
npm run build
```

#### 4. Images not loading
```bash
# Check image paths
# Ensure images are in Public/Assents/
# Verify file names match exactly
```

#### 5. Admin login not working
```bash
# Verify user exists in Supabase Auth
# Check user is confirmed
# Verify password is correct
# Check browser console for errors
```

### Getting Help

- Check documentation files in `documantion/` folder
- Review Supabase logs
- Check browser console
- Verify environment variables

---

## 📝 Additional Notes

### Code Style

- TypeScript for type safety
- Functional components with hooks
- Tailwind CSS for styling
- Framer Motion for animations
- Clean, readable code structure

### Performance

- Lazy loading images
- Code splitting
- Optimized builds
- CDN delivery via Vercel
- Cached assets

### Security

- Environment variables for secrets
- Supabase RLS policies
- HTTPS only
- Secure authentication
- Input validation

### Maintenance

- Regular dependency updates
- Database backups
- Monitor error logs
- Performance monitoring
- Security patches

---

## 📞 Contact Developer

**Mowlid Mohamoud Haibe**

- 💼 LinkedIn: [linkedin.com/in/mowlid-mohamoud-haibe-8b7b6a189](https://www.linkedin.com/in/mowlid-mohamoud-haibe-8b7b6a189/)
- 🐙 GitHub: [github.com/mawlid1431](https://github.com/mawlid1431)
- 🌐 Portfolio: [malitos.vercel.app](https://malitos.vercel.app/)

---

## 📄 License

This project is proprietary software developed for Rehaal Travel.

---

## 🎉 Conclusion

This documentation covers everything needed to understand, set up, and maintain the Rehaal Travel website. For specific questions or issues, refer to the individual documentation files in the `documantion/` folder or contact the developer.

**Happy Coding! 🚀**

---

*Last Updated: December 2024*
*Version: 1.0.0*
*Built with ❤️ by Mowlid Mohamoud Haibe*

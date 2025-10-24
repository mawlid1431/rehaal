# Rehaal Travel Website

A modern travel booking website built with React, TypeScript, and Supabase.

## 📁 Project Structure

```
Rehaal/
├── components/          # React components
│   ├── admin/          # Admin dashboard components
│   ├── figma/          # Figma design components
│   ├── pages/          # Page components
│   └── ui/             # UI components (shadcn/ui)
├── database/           # SQL files for Supabase
├── lib/                # Utilities and helpers
│   ├── api.ts         # API functions
│   ├── data.ts        # Static data
│   ├── supabase.ts    # Supabase client
│   └── types.ts       # TypeScript types
├── src/                # Source files
├── styles/             # CSS styles
└── .env                # Environment variables (DO NOT COMMIT)
```

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment Variables
Create a `.env` file with your Supabase credentials:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### 3. Setup Database
See `database/README.md` for instructions.

### 4. Run Development Server
```bash
npm run dev
```

### 5. Build for Production
```bash
npm run build
```

## 🔑 Admin Access

Access the admin dashboard at: `/admin`

## 📦 Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **Forms**: React Hook Form
- **Icons**: Lucide React
- **Date Handling**: date-fns

## 🗂️ Database Tables

1. **Trips** - Travel packages with destinations, dates, prices
2. **Bookings** - Customer bookings with status management
3. **Gallery** - Image gallery for the website
4. **Testimonials** - Customer reviews and ratings
5. **Services** - Services offered by the company

## 📝 Features

### Public Website
- Browse travel packages
- View gallery
- Read testimonials
- Book trips
- Contact form

### Admin Dashboard
- Manage trips (CRUD)
- View and manage bookings
- Manage gallery images
- Manage testimonials
- Manage services
- Export bookings to Excel
- Real-time data from Supabase

## 🔒 Security

- Row Level Security (RLS) enabled
- Public can only read and create bookings
- Admin requires authentication
- Environment variables for sensitive data

## 📄 License

Private project - All rights reserved

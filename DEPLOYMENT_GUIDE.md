# 🚀 Vercel Deployment Guide for Rehaal Travel Website

## Prerequisites

- ✅ GitHub account
- ✅ Vercel account (sign up at https://vercel.com)
- ✅ Supabase project set up
- ✅ All code committed to GitHub

## Step 1: Prepare Your Repository

### 1.1 Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Prepare for Vercel deployment"

# Add remote (replace with your repo URL)
git remote add origin https://github.com/yourusername/rehaal-travel.git

# Push to GitHub
git push -u origin main
```

### 1.2 Verify Files

Make sure these files exist:
- ✅ `vercel.json` - Vercel configuration
- ✅ `.env.example` - Environment variables template
- ✅ `.gitignore` - Protects sensitive files
- ✅ `package.json` - Dependencies and scripts

## Step 2: Deploy to Vercel

### 2.1 Import Project

1. Go to https://vercel.com/dashboard
2. Click **"Add New..."** → **"Project"**
3. Click **"Import Git Repository"**
4. Select your GitHub repository
5. Click **"Import"**

### 2.2 Configure Project

**Framework Preset:** Vite (should auto-detect)

**Build Settings:**
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

### 2.3 Add Environment Variables

Click **"Environment Variables"** and add these:

```
VITE_SUPABASE_URL=https://xnkfbsfgsjpssjtsiiac.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhua2Zic2Znc2pwc3NqdHNpaWFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyODczNjAsImV4cCI6MjA3Njg2MzM2MH0.QDusyFD5nmdsVn_d3WtDyqQqbeQ6NnOC1BonascUzrA
VITE_SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhua2Zic2Znc2pwc3NqdHNpaWFjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTI4NzM2MCwiZXhwIjoyMDc2ODYzMzYwfQ.lzwcnWeoyPeEV_VVWLACvIrHni1IJAg28IspC60wmhU
VITE_SUPABASE_JWT_SECRET=IYnZ047RtzSKZgrfQRwwW0AvYklXO/ZcfL+sZn9AwG48PfdKWedONy9KU8GLiIwPd2E5Ypk1r9Or34CCh+ZFWw==
```

**Important:** 
- Add these for **Production**, **Preview**, and **Development** environments
- Click **"Add"** after each variable

### 2.4 Deploy

1. Click **"Deploy"**
2. Wait 2-3 minutes for build to complete
3. Your site will be live at: `https://your-project-name.vercel.app`

## Step 3: Configure Custom Domain (Optional)

### 3.1 Add Domain

1. Go to your project in Vercel
2. Click **"Settings"** → **"Domains"**
3. Enter your domain (e.g., `rehaal.com`)
4. Click **"Add"**

### 3.2 Update DNS

Add these records to your domain provider:

**For root domain (rehaal.com):**
```
Type: A
Name: @
Value: 76.76.21.21
```

**For www subdomain:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 3.3 Wait for DNS Propagation

- Usually takes 5-60 minutes
- Vercel will auto-issue SSL certificate

## Step 4: Configure Supabase for Production

### 4.1 Update Supabase URL Redirects

1. Go to Supabase Dashboard
2. Navigate to **Authentication** → **URL Configuration**
3. Add your Vercel URL to:
   - **Site URL:** `https://your-project-name.vercel.app`
   - **Redirect URLs:** 
     - `https://your-project-name.vercel.app/**`
     - `https://your-project-name.vercel.app/admin/**`

### 4.2 Update CORS Settings

1. Go to **Settings** → **API**
2. Add your Vercel URL to allowed origins

## Step 5: Create Admin User

### 5.1 In Supabase Dashboard

1. Go to **Authentication** → **Users**
2. Click **"Add user"**
3. Fill in:
   - Email: `admin@rehaal.com`
   - Password: `Mowlid@2025?!`
   - ✅ Check "Auto Confirm User"
4. Click **"Create User"**

### 5.2 Add User Metadata

1. Click on the user
2. Edit **Raw User Meta Data**
3. Add:
```json
{
  "full_name": "Rehaal Administrator",
  "role": "super_admin"
}
```
4. Save

## Step 6: Test Your Deployment

### 6.1 Test Frontend

Visit: `https://your-project-name.vercel.app`

Check:
- ✅ Homepage loads
- ✅ Navigation works
- ✅ Trips page shows data
- ✅ Booking form works
- ✅ Gallery loads
- ✅ Contact form works

### 6.2 Test Admin Panel

Visit: `https://your-project-name.vercel.app/admin`

Check:
- ✅ Login page appears
- ✅ Can login with credentials
- ✅ Dashboard loads
- ✅ Can manage trips
- ✅ Can view bookings
- ✅ Settings page works
- ✅ Can change password

## Step 7: Continuous Deployment

### Automatic Deployments

Every time you push to GitHub:
- **main branch** → Production deployment
- **other branches** → Preview deployment

### Manual Deployment

```bash
# Make changes
git add .
git commit -m "Your changes"
git push

# Vercel automatically deploys!
```

## Troubleshooting

### Build Fails

**Check:**
1. All dependencies in `package.json`
2. Environment variables are set
3. Build logs in Vercel dashboard

**Fix:**
```bash
# Test build locally
npm run build

# If it works locally, check Vercel logs
```

### 404 Errors on Routes

**Solution:** Already configured in `vercel.json`
- All routes redirect to `index.html`
- Client-side routing works

### Environment Variables Not Working

**Check:**
1. Variables start with `VITE_`
2. Added to all environments (Production, Preview, Development)
3. Redeploy after adding variables

**Fix:**
```bash
# In Vercel Dashboard
Settings → Environment Variables → Add missing variables → Redeploy
```

### Supabase Connection Issues

**Check:**
1. Supabase URL is correct
2. Anon key is correct
3. Supabase project is active
4. CORS settings allow your domain

**Fix:**
- Update Supabase redirect URLs
- Check API settings in Supabase

### Admin Login Not Working

**Check:**
1. User exists in Supabase Auth
2. User is confirmed (not pending)
3. Password is correct
4. Supabase Auth is enabled

**Fix:**
- Create user in Supabase Dashboard
- Check "Auto Confirm User"
- Reset password if needed

## Performance Optimization

### Already Configured

✅ **Static Asset Caching** - 1 year cache for assets
✅ **Gzip Compression** - Automatic by Vercel
✅ **CDN** - Global edge network
✅ **Image Optimization** - Use Vercel Image Optimization

### Recommended

1. **Enable Analytics**
   - Vercel Dashboard → Analytics → Enable

2. **Add Speed Insights**
   ```bash
   npm install @vercel/speed-insights
   ```

3. **Monitor Performance**
   - Check Vercel Analytics
   - Use Lighthouse in Chrome DevTools

## Security Checklist

✅ Environment variables not in code
✅ `.env` in `.gitignore`
✅ HTTPS enabled (automatic)
✅ Supabase RLS policies active
✅ Admin authentication required
✅ CORS configured properly

## Maintenance

### Update Dependencies

```bash
npm update
npm audit fix
git commit -am "Update dependencies"
git push
```

### Monitor Logs

- Vercel Dashboard → Your Project → Logs
- Check for errors and warnings

### Backup Database

- Supabase Dashboard → Database → Backups
- Enable automatic backups

## Support

### Vercel Support
- Documentation: https://vercel.com/docs
- Community: https://github.com/vercel/vercel/discussions

### Supabase Support
- Documentation: https://supabase.com/docs
- Community: https://github.com/supabase/supabase/discussions

## Your Deployment URLs

After deployment, you'll have:

- **Production:** `https://your-project-name.vercel.app`
- **Admin Panel:** `https://your-project-name.vercel.app/admin`
- **Preview (branches):** `https://your-project-name-git-branch.vercel.app`

## Next Steps

1. ✅ Push code to GitHub
2. ✅ Import to Vercel
3. ✅ Add environment variables
4. ✅ Deploy
5. ✅ Configure Supabase
6. ✅ Create admin user
7. ✅ Test everything
8. ✅ Add custom domain (optional)
9. ✅ Monitor and maintain

---

## Quick Deploy Checklist

- [ ] Code pushed to GitHub
- [ ] Vercel project created
- [ ] Environment variables added
- [ ] First deployment successful
- [ ] Supabase URLs updated
- [ ] Admin user created
- [ ] Frontend tested
- [ ] Admin panel tested
- [ ] Custom domain added (optional)
- [ ] SSL certificate active

**Congratulations! Your website is now live! 🎉**

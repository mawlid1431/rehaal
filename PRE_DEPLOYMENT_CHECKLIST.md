# ✅ Pre-Deployment Checklist

## Before You Deploy

### 1. Code Quality
- [ ] All features working locally
- [ ] No console errors in browser
- [ ] All pages load correctly
- [ ] Forms submit successfully
- [ ] Images load properly
- [ ] Dark mode works
- [ ] Mobile responsive

### 2. Environment Setup
- [ ] `.env` file exists with all variables
- [ ] `.env.example` created (without sensitive data)
- [ ] `.gitignore` includes `.env`
- [ ] Supabase project is active
- [ ] Database tables created
- [ ] Sample data added (optional)

### 3. Supabase Configuration
- [ ] All tables created
- [ ] RLS policies enabled
- [ ] Admin user created in Auth
- [ ] User metadata added
- [ ] Storage buckets configured (if using)
- [ ] API keys copied to `.env`

### 4. Git Repository
- [ ] GitHub repository created
- [ ] All code committed
- [ ] `.gitignore` working (no `.env` in repo)
- [ ] README.md updated
- [ ] Repository is public or accessible to Vercel

### 5. Build Test
```bash
# Run these commands to test
npm install          # Install dependencies
npm run build        # Test build
npm run preview      # Test production build locally
```

- [ ] `npm install` succeeds
- [ ] `npm run build` succeeds
- [ ] `npm run preview` works
- [ ] No build errors or warnings

### 6. Admin Panel
- [ ] Login page works
- [ ] Can login with test credentials
- [ ] Dashboard loads
- [ ] Can add/edit/delete trips
- [ ] Can view bookings
- [ ] Settings page works
- [ ] Password change works
- [ ] Logout works

### 7. Frontend
- [ ] Homepage loads
- [ ] Navigation works
- [ ] Trips page shows data
- [ ] Trip details page works
- [ ] Booking form submits
- [ ] Gallery loads images
- [ ] Testimonials display
- [ ] Contact form works
- [ ] About page loads
- [ ] Services page loads

### 8. Performance
- [ ] Images optimized
- [ ] No large files in repo
- [ ] Lazy loading implemented
- [ ] Code splitting working
- [ ] Fast page load times

### 9. Security
- [ ] No API keys in code
- [ ] Environment variables used
- [ ] Admin routes protected
- [ ] Supabase RLS enabled
- [ ] CORS configured
- [ ] No sensitive data exposed

### 10. Documentation
- [ ] README.md complete
- [ ] DEPLOYMENT_GUIDE.md reviewed
- [ ] Environment variables documented
- [ ] Setup instructions clear

## Deployment Files Created

✅ `vercel.json` - Vercel configuration
✅ `.env.example` - Environment template
✅ `DEPLOYMENT_GUIDE.md` - Detailed deployment instructions
✅ `deploy.sh` - Quick deploy script (Mac/Linux)
✅ `deploy.bat` - Quick deploy script (Windows)
✅ `PRE_DEPLOYMENT_CHECKLIST.md` - This file

## Quick Deploy Commands

### Option 1: Use Deploy Script (Windows)
```bash
deploy.bat
```

### Option 2: Use Deploy Script (Mac/Linux)
```bash
chmod +x deploy.sh
./deploy.sh
```

### Option 3: Manual Deploy
```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

Then go to Vercel Dashboard and import your repository.

## After Deployment

### Immediate Checks
- [ ] Site is live and accessible
- [ ] All pages load
- [ ] No 404 errors
- [ ] Images display
- [ ] Forms work
- [ ] Admin login works

### Configuration
- [ ] Environment variables added in Vercel
- [ ] Supabase redirect URLs updated
- [ ] Custom domain added (optional)
- [ ] SSL certificate active

### Testing
- [ ] Test on mobile device
- [ ] Test on different browsers
- [ ] Test admin panel
- [ ] Test booking flow
- [ ] Test contact form

### Monitoring
- [ ] Enable Vercel Analytics
- [ ] Check deployment logs
- [ ] Monitor error rates
- [ ] Set up alerts

## Common Issues

### Build Fails
**Solution:** Check build logs in Vercel, ensure all dependencies are in `package.json`

### Environment Variables Not Working
**Solution:** Make sure they start with `VITE_` and are added to all environments

### 404 on Routes
**Solution:** Already fixed in `vercel.json` with rewrites

### Supabase Connection Error
**Solution:** Update redirect URLs in Supabase Auth settings

### Admin Can't Login
**Solution:** Create user in Supabase Auth Dashboard, check "Auto Confirm User"

## Support Resources

- **Vercel Docs:** https://vercel.com/docs
- **Supabase Docs:** https://supabase.com/docs
- **Vite Docs:** https://vitejs.dev/guide/
- **React Docs:** https://react.dev/

## Ready to Deploy?

If all checkboxes are checked, you're ready to deploy! 🚀

Follow the instructions in `DEPLOYMENT_GUIDE.md` for step-by-step deployment.

Good luck! 🎉

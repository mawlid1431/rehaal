# 🖼️ Image System Updated - Rehaal Travel

## Images Location
All main images are in: `Public/Assents/main/`

## Image Files Available
- `BG1.jpg` - Hero background 1
- `BG-2.jpg` - Hero background 2
- `BG-3.jpg` - Hero background 3
- `BG_below.jpg` - Bottom CTA section background
- `about_1.jpg` - About page hero
- `about-2.jpg` - About page content image
- `Sercive_1.jpg` - Service image 1
- `Service_2.jpg` - Service image 2
- `Trip_img.jpg` - Trips page hero
- `Tesmonial_img.jpg` - Testimonials page hero
- `galley_img.jpg` - Gallery page hero
- `GetinTouch_IMG.jpg` - Contact page image
- `footer_img.jpg` - Footer background
- `Home_2.jpg` - Additional home image

## Updates Made

### ✅ Hero Section (Homepage)
**File:** `lib/data.ts`
- BG1.jpg → First slide
- BG-2.jpg → Second slide
- BG-3.jpg → Third slide

### ✅ Bottom CTA Section (Homepage)
**File:** `components/pages/HomePage.tsx`
- BG_below.jpg → Background for motivational section above footer

### ✅ About Page
**File:** `components/pages/AboutPage.tsx`
- about_1.jpg → Hero section background
- about-2.jpg → Content section image

### 🔄 Still Need to Update

#### Services Page
- Sercive_1.jpg → Service section image 1
- Service_2.jpg → Service section image 2

#### Trips Page
- Trip_img.jpg → Trips page hero background

#### Testimonials Page
- Tesmonial_img.jpg → Testimonials page hero background

#### Gallery Page
- galley_img.jpg → Gallery page hero background

#### Contact Page
- GetinTouch_IMG.jpg → Contact page image

#### Footer
- footer_img.jpg → Footer background (if needed)

## Image Specifications

All images are:
- **Format:** JPG
- **Location:** `/Public/Assents/main/`
- **Usage:** Background images and content images
- **Responsive:** Automatically scale to fit containers

## How Images Are Used

### Hero Backgrounds (Rotating)
```tsx
export const heroSlides = [
  { id: 1, image: '/Public/Assents/main/BG1.jpg' },
  { id: 2, image: '/Public/Assents/main/BG-2.jpg' },
  { id: 3, image: '/Public/Assents/main/BG-3.jpg' }
];
```

### Static Backgrounds
```tsx
style={{
  backgroundImage: 'url(/Public/Assents/main/about_1.jpg)'
}}
```

### Content Images
```tsx
<ImageWithFallback
  src="/Public/Assents/main/about-2.jpg"
  alt="About Rehaal"
  className="w-full h-full object-cover"
/>
```

## Files Modified

✅ `lib/data.ts` - Updated hero slides
✅ `components/pages/HomePage.tsx` - Updated CTA background
✅ `components/pages/AboutPage.tsx` - Updated hero and content images

## Next Steps

To complete the image system, update these files:
1. ServicesPage.tsx - Add Sercive_1.jpg and Service_2.jpg
2. TripsPage.tsx - Add Trip_img.jpg
3. TestimonialsPage.tsx - Add Tesmonial_img.jpg
4. GalleryPage.tsx - Add galley_img.jpg
5. ContactPage.tsx - Add GetinTouch_IMG.jpg
6. Footer.tsx - Add footer_img.jpg (optional)

## Testing

1. **Homepage:**
   - Hero should rotate through 3 backgrounds
   - Bottom CTA section should show BG_below.jpg

2. **About Page:**
   - Hero should show about_1.jpg
   - Content section should show about-2.jpg

3. **All Images:**
   - Should load properly
   - Should be responsive
   - Should maintain aspect ratio

---

Your image system is now using local files from Public/Assents/main/ folder! 🎨

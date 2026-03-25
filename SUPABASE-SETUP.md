# Supabase Setup Checklist

Complete these steps in your Supabase dashboard (https://supabase.com/dashboard):

## 1. Authentication Providers
- [ ] Go to Authentication → Providers
- [ ] Enable Email provider (already enabled by default)
- [ ] Optional: Enable Google OAuth for social login
- [ ] Optional: Enable Apple OAuth for social login

## 2. Auth Settings
- [ ] Go to Authentication → Settings
- [ ] Set Site URL to your production domain (e.g., https://officialvirtualvisit.com)
- [ ] Add redirect URLs:
  - https://officialvirtualvisit.com/api/auth/callback
  - https://ovv-dev.vercel.app/api/auth/callback
  - http://localhost:3333/api/auth/callback (for local dev)

## 3. Email Templates
- [ ] Go to Authentication → Email Templates
- [ ] Customize the "Confirm Signup" email with OVV branding
- [ ] Customize the "Reset Password" email with OVV branding

## 4. Database
- [ ] Go to Settings → Database
- [ ] Copy the "Connection string (pooled)" → set as DATABASE_URL in Vercel env vars
- [ ] Copy the "Direct connection string" → set as DIRECT_URL in Vercel env vars

## 5. API Keys
- [ ] Go to Settings → API
- [ ] Copy the "Project URL" → set as NEXT_PUBLIC_SUPABASE_URL in Vercel env vars
- [ ] Copy the "anon public" key → set as NEXT_PUBLIC_SUPABASE_ANON_KEY in Vercel env vars

## 6. Row Level Security (Optional but Recommended)
- [ ] Enable RLS on all tables
- [ ] Add policies for authenticated access patterns
- [ ] Note: The app uses Prisma for data access, so RLS is a defense-in-depth layer

## 7. Storage (for future file uploads)
- [ ] Create a "panoramas" bucket for 360° images
- [ ] Create a "jerseys" bucket for jersey assets
- [ ] Create a "logos" bucket for school logos
- [ ] Set appropriate access policies (public read, authenticated write)

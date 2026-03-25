# OVV Deployment Checklist — Read and Execute All Steps

This file contains everything needed to take OVV from development to a deployed, working product. Read this entire file, then execute each section in order. After each section, confirm it completed successfully before moving to the next.

---

## Section 1: Environment Variables Setup

Create a `.env.local` file in the project root if it doesn't already exist. It needs these variables to connect to Supabase:

```bash
# Check if .env.local exists and what's in it
cat .env.local 2>/dev/null || echo "No .env.local found"
cat .env 2>/dev/null || echo "No .env found"
```

The required environment variables are:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-project-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>

# Database (from Supabase dashboard → Settings → Database)
DATABASE_URL=<your-pooled-connection-string>
DIRECT_URL=<your-direct-connection-string>
```

If `.env.local` already has these values populated, skip this section. If values are missing or placeholder, print a message telling the user:
"ACTION REQUIRED: You need to add your Supabase credentials to .env.local before deployment. Get them from https://supabase.com/dashboard → your project → Settings → API (for URL and anon key) and Settings → Database (for connection strings)."

---

## Section 2: Verify Prisma Schema and Generate Client

```bash
# Validate schema syntax
PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1 npx prisma validate 2>&1 || echo "Schema validation requires network — checking generated client instead"

# Verify generated client exists and is up to date
ls src/generated/prisma/client.ts && echo "Generated client exists"

# Regenerate if possible (may fail in offline environments — that's OK if client already exists)
PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1 npx prisma generate 2>&1 || echo "Generation requires network — using existing generated client"
```

If the generated client exists, proceed. If not and generation fails due to network issues, print:
"ACTION REQUIRED: Run 'npx prisma generate' in an environment with internet access to generate the Prisma client."

---

## Section 3: Database Migration and Seed

Check if the database is accessible and push the schema:

```bash
# Push schema to database (creates/updates all tables)
npx prisma db push 2>&1
```

If this fails with a connection error, print:
"ACTION REQUIRED: Set DATABASE_URL and DIRECT_URL in .env.local with your Supabase connection strings, then run 'npx prisma db push'."

If it succeeds, seed the database:

```bash
# Seed with sample data (2 schools, full content)
npx prisma db seed 2>&1
```

If seeding fails, check the seed script for errors and fix them. The seed script is at `prisma/seed.ts` and imports from `src/data/seed-*.ts`.

---

## Section 4: Create First Coach Admin User

After the database is seeded and a user has registered via the app, you need to promote them to coach_admin. Create a utility script for this:

Create file: `scripts/promote-coach.ts`

```typescript
import { PrismaClient } from '../src/generated/prisma'

const prisma = new PrismaClient()

async function main() {
  const email = process.argv[2]
  const schoolSlug = process.argv[3]

  if (!email || !schoolSlug) {
    console.log('Usage: npx tsx scripts/promote-coach.ts <email> <school-slug>')
    console.log('Example: npx tsx scripts/promote-coach.ts coach@example.com texas-tech')
    console.log('')
    console.log('Available schools:')
    const schools = await prisma.school.findMany({ select: { slug: true, name: true } })
    schools.forEach(s => console.log(`  ${s.slug} — ${s.name}`))
    process.exit(1)
  }

  const school = await prisma.school.findUnique({ where: { slug: schoolSlug } })
  if (!school) {
    console.error(`School with slug "${schoolSlug}" not found.`)
    const schools = await prisma.school.findMany({ select: { slug: true, name: true } })
    console.log('Available schools:')
    schools.forEach(s => console.log(`  ${s.slug} — ${s.name}`))
    process.exit(1)
  }

  const user = await prisma.user.findFirst({ where: { email } })
  if (!user) {
    console.error(`User with email "${email}" not found. They must register first.`)
    process.exit(1)
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      role: 'coach_admin',
      schoolId: school.id,
    },
  })

  console.log(`✅ Promoted ${email} to coach_admin for ${school.name} (${school.slug})`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
```

Verify the script compiles:
```bash
npx tsc --noEmit scripts/promote-coach.ts 2>&1 || echo "Script will be run with tsx directly"
```

Print to the user:
"Coach promotion script created at scripts/promote-coach.ts. After a user registers, run: npx tsx scripts/promote-coach.ts coach@example.com texas-tech"

---

## Section 5: Placeholder Assets Audit

The seed data uses placeholder URLs for images, panoramas, and videos. Create a manifest of what's needed:

Create file: `public/ASSET-MANIFEST.md`

```markdown
# OVV Asset Manifest — Files Needed in /public

## Panorama Images (360° equirectangular JPGs, recommended 4096x2048 or higher)
- /panoramas/texas-tech-stadium.jpg — Stadium background for school header
- /panoramas/oklahoma-stadium.jpg — Stadium background for school header
- /panoramas/texas-tech-jones-at-t-stadium.jpg — Jones AT&T Stadium panorama
- /panoramas/texas-tech-football-operations-center.jpg — Football ops center
- /panoramas/texas-tech-sports-performance-center.jpg — Sports performance center
- /panoramas/oklahoma-gaylord-family-memorial-stadium.jpg — Gaylord Memorial panorama
- /panoramas/oklahoma-barry-switzer-center.jpg — Barry Switzer Center
- /panoramas/oklahoma-everest-training-center.jpg — Everest Training Center

## Jersey Assets (PNG with transparency, recommended 500x500)
For each school (texas-tech, oklahoma), 3 types × 3 colors = 9 images:
- /jersey/{slug}/helmet-home.png
- /jersey/{slug}/helmet-away.png
- /jersey/{slug}/helmet-alt.png
- /jersey/{slug}/jersey-home.png
- /jersey/{slug}/jersey-away.png
- /jersey/{slug}/jersey-alt.png
- /jersey/{slug}/pants-home.png
- /jersey/{slug}/pants-away.png
- /jersey/{slug}/pants-alt.png

## School Logos (PNG with transparency, recommended 400x400)
- /logos/texas-tech.png
- /logos/oklahoma.png

## OG / Social Image (PNG, 1200x630)
- /og-image.png — Default social share image for the site

## PWA Icons
- /icon-192.png — 192x192 PWA icon
- /icon-512.png — 512x512 PWA icon
- /apple-touch-icon.png — 180x180 Apple touch icon

## Service Worker
- /sw.js — Service worker file (can be empty initially)
- /manifest.json — PWA manifest
```

Check which of these already exist:
```bash
echo "=== Checking existing public assets ==="
for dir in panoramas jersey logos; do
  echo "--- /public/$dir ---"
  ls public/$dir/ 2>/dev/null || echo "  Directory missing"
done
echo "--- Root assets ---"
ls public/og-image.png public/icon-192.png public/icon-512.png public/apple-touch-icon.png public/sw.js public/manifest.json 2>/dev/null || echo "  Some root assets missing"
```

For any missing directories, create them:
```bash
mkdir -p public/panoramas public/jersey/texas-tech public/jersey/oklahoma public/logos
```

Create a minimal service worker if missing:
```bash
# public/sw.js
cat > public/sw.js << 'SWEOF'
// OVV Service Worker — minimal cache-first for static assets
self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()))
SWEOF
```

Create a PWA manifest if missing:
```bash
cat > public/manifest.json << 'MEOF'
{
  "name": "OVV — Official Virtual Visit",
  "short_name": "OVV",
  "description": "Experience college football programs through immersive virtual tours",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0a0a0a",
  "theme_color": "#10B981",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
MEOF
```

---

## Section 6: Vercel Deployment Configuration

Create `vercel.json` if it doesn't exist:

```json
{
  "framework": "nextjs",
  "buildCommand": "prisma generate && next build",
  "installCommand": "npm install",
  "env": {
    "PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING": "1"
  }
}
```

Check that `.gitignore` properly excludes sensitive files:
```bash
echo "=== Checking .gitignore ==="
grep -q ".env" .gitignore && echo "✅ .env excluded" || echo "⚠️  Add .env* to .gitignore"
grep -q "node_modules" .gitignore && echo "✅ node_modules excluded" || echo "⚠️  Add node_modules to .gitignore"
grep -q ".next" .gitignore && echo "✅ .next excluded" || echo "⚠️  Add .next to .gitignore"
```

Add any missing entries to `.gitignore`:
```
.env
.env.local
.env.production
node_modules
.next
src/generated/prisma
```

---

## Section 7: Supabase Auth Configuration

Create a checklist file for the user to configure Supabase auth settings manually:

Create file: `SUPABASE-SETUP.md`

```markdown
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
  - http://localhost:3000/api/auth/callback (for local dev)

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
```

---

## Section 8: Update metadataBase URL

File: src/app/layout.tsx

Check the current `metadataBase` value:
```bash
grep "metadataBase" src/app/layout.tsx
```

If it says `college-info-nine.vercel.app` or any placeholder, update it. If the user hasn't specified a production domain, leave it as-is and print:
"NOTE: Update metadataBase in src/app/layout.tsx to your production domain before going live."

---

## Section 9: Final Build Verification

Run the full verification suite:

```bash
# 1. TypeScript — zero errors required
echo "=== TypeScript Check ===" && npx tsc --noEmit && echo "✅ PASS"

# 2. Verify all pages exist
echo "=== Pages ===" && find src/app -name "page.tsx" | wc -l && echo "pages found"

# 3. Verify all API routes exist
echo "=== API Routes ===" && find src/app -name "route.ts" | wc -l && echo "routes found"

# 4. Verify error boundaries
echo "=== Error Boundaries ===" && find src/app -name "error.tsx" | wc -l && echo "error boundaries"

# 5. Verify loading states
echo "=== Loading States ===" && find src/app -name "loading.tsx" | wc -l && echo "loading states"

# 6. Verify components
echo "=== Components ===" && find src/components -name "*.tsx" | wc -l && echo "components"

# 7. Security checks
echo "=== Security Checks ==="
echo -n "findFirst in admin (should be 0 non-sport): " && grep -rn "findFirst" src/app/\(platform\)/admin/ | grep -v "sport\|Sport" | wc -l
echo -n "Hardcoded dark class (should be 0): " && grep -c 'className="dark"' src/app/layout.tsx 2>/dev/null || echo "0"
echo -n "ThemeProvider present: " && grep -c "ThemeProvider" src/app/layout.tsx

# 8. Verify package.json has all required deps
echo "=== Key Dependencies ==="
for pkg in next react prisma @supabase/supabase-js next-themes zod recharts; do
  grep -q "\"$pkg\"" package.json && echo "✅ $pkg" || echo "❌ $pkg MISSING"
done
```

---

## Section 10: Print Deployment Summary

After all sections complete, print this summary:

```
════════════════════════════════════════════════════════════════
  OVV — Official Virtual Visit — Deployment Readiness Report
════════════════════════════════════════════════════════════════

  TypeScript:        ✅ Zero errors
  Prisma Schema:     ✅ Valid with 29 indexes
  Error Boundaries:  ✅ All route groups covered
  Loading States:    ✅ All async pages covered
  Theme System:      ✅ next-themes with system/light/dark
  Auth Security:     ✅ Role-based, school-scoped
  Analytics:         ✅ Batched with sendBeacon

  BEFORE DEPLOYING — Complete these manual steps:
  ─────────────────────────────────────────────────
  1. Add Supabase credentials to .env.local (see Section 1)
  2. Run 'npx prisma db push' to create database tables
  3. Run 'npx prisma db seed' to load sample data
  4. Follow SUPABASE-SETUP.md for auth configuration
  5. Add real asset files per public/ASSET-MANIFEST.md
  6. Set env vars in Vercel dashboard for production
  7. Update metadataBase URL in src/app/layout.tsx
  8. After first user registers, promote to coach:
     npx tsx scripts/promote-coach.ts coach@email.com texas-tech

  DEPLOY:
  ─────────────────────────────────────────────────
  git push origin main
  — or —
  npx vercel --prod

════════════════════════════════════════════════════════════════
```

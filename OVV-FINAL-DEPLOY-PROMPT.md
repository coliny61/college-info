# OVV — Final Deployment Files

Read this file and create all 4 missing files, then run the verification at the end.

---

## 1. Create vercel.json

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

## 2. Create scripts/promote-coach.ts

This is a CLI utility to promote a registered user to coach_admin for a specific school. Create the `scripts/` directory first.

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

## 3. Create SUPABASE-SETUP.md

```markdown
# Supabase Setup Checklist

Complete these steps in your Supabase dashboard (https://supabase.com/dashboard):

## 1. Authentication Providers
- [ ] Go to Authentication → Providers
- [ ] Enable Email provider (enabled by default)
- [ ] Optional: Enable Google OAuth for social login
- [ ] Optional: Enable Apple OAuth for social login

## 2. Auth Settings
- [ ] Go to Authentication → Settings
- [ ] Set Site URL to your production domain (e.g., https://officialvirtualvisit.com)
- [ ] Add redirect URLs:
  - https://your-domain.com/api/auth/callback
  - http://localhost:3000/api/auth/callback (for local dev)

## 3. Email Templates
- [ ] Go to Authentication → Email Templates
- [ ] Customize the "Confirm Signup" email with OVV branding
- [ ] Customize the "Reset Password" email with OVV branding

## 4. Database Connection Strings
- [ ] Go to Settings → Database
- [ ] Copy "Connection string (pooled)" → set as DATABASE_URL
- [ ] Copy "Direct connection string" → set as DIRECT_URL

## 5. API Keys
- [ ] Go to Settings → API
- [ ] Copy "Project URL" → set as NEXT_PUBLIC_SUPABASE_URL
- [ ] Copy "anon public" key → set as NEXT_PUBLIC_SUPABASE_ANON_KEY

## 6. Vercel Environment Variables
Set these in Vercel dashboard → Settings → Environment Variables:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- DATABASE_URL
- DIRECT_URL
- PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1

## 7. After First Deploy
1. Register a user account at your-domain.com/register
2. Promote them to coach: `npx tsx scripts/promote-coach.ts coach@email.com texas-tech`
3. Log in as that user — they'll see the coach admin dashboard
```

## 4. Create public/ASSET-MANIFEST.md

```markdown
# OVV Asset Manifest

## Current Assets (already in /public)

### Panoramas (360° equirectangular JPGs)
- /panoramas/texas-tech-stadium.jpg
- /panoramas/texas-tech-locker-room.jpg
- /panoramas/texas-tech-practice.jpg
- /panoramas/texas-tech-weight-room.jpg
- /panoramas/oklahoma-stadium.jpg
- /panoramas/oklahoma-locker-room.jpg
- /panoramas/oklahoma-practice.jpg
- /panoramas/oklahoma-weight-room.jpg

### Jersey Assets (PNGs in /jersey/{slug}/)
- /jersey/texas-tech/ (9 files: helmet/jersey/pants × home/away/alt)
- /jersey/oklahoma/ (9 files: helmet/jersey/pants × home/away/alt)

### School Logos
- /logos/texas-tech.svg
- /logos/oklahoma.svg

### PWA Icons
- /icon-192.png
- /icon-512.png
- /apple-touch-icon.png

### PWA Files
- /manifest.json
- /sw.js

## Missing — Needed Before Launch
- /og-image.png (1200×630 social share image for the site)
- Real 360° panorama photos (current ones are generated placeholders ~37-69KB each)
- Real jersey asset PNGs with transparency (current ones are placeholders)
- Real school logos in higher resolution

## To Add a New School
1. Add school data to prisma seed files in src/data/
2. Create panorama images: /panoramas/{slug}-{facility}.jpg
3. Create jersey images: /jersey/{slug}/helmet-home.png (and all 9 combos)
4. Create school logo: /logos/{slug}.svg or .png
5. Run prisma db seed to populate the database
```

## 5. Create public/og-image.png placeholder

Generate a simple OG image so social shares don't break:

```bash
# Create a simple SVG and convert it, or use a canvas script
cat > /tmp/og-image.svg << 'EOF'
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#0a0a0a"/>
  <text x="600" y="280" text-anchor="middle" font-family="sans-serif" font-size="72" font-weight="bold" fill="#10B981">OVV</text>
  <text x="600" y="360" text-anchor="middle" font-family="sans-serif" font-size="28" fill="#888888">Official Virtual Visit</text>
  <text x="600" y="420" text-anchor="middle" font-family="sans-serif" font-size="20" fill="#555555">Experience college football programs through immersive virtual tours</text>
</svg>
EOF

# If ImageMagick or sharp is available, convert to PNG. Otherwise just copy as SVG reference.
if command -v convert &> /dev/null; then
  convert /tmp/og-image.svg public/og-image.png
elif command -v npx &> /dev/null; then
  # Use sharp via a quick node script
  node -e "
    const sharp = require('sharp');
    const fs = require('fs');
    const svg = fs.readFileSync('/tmp/og-image.svg');
    sharp(svg).png().toFile('public/og-image.png').then(() => console.log('✅ og-image.png created'));
  " 2>/dev/null || echo "Could not auto-generate og-image.png — create a 1200x630 PNG manually"
fi
```

If neither method works, just note that og-image.png needs to be created manually as a 1200×630 PNG.

---

## 6. Verification

Run these checks:

```bash
echo "=== Deployment Files ==="
ls -la vercel.json scripts/promote-coach.ts SUPABASE-SETUP.md public/ASSET-MANIFEST.md public/manifest.json public/sw.js

echo ""
echo "=== TypeScript ==="
npx tsc --noEmit && echo "✅ Zero errors"

echo ""
echo "=== Final Inventory ==="
echo "Pages: $(find src/app -name 'page.tsx' | wc -l)"
echo "API Routes: $(find src/app -name 'route.ts' | wc -l)"
echo "Components: $(find src/components -name '*.tsx' | wc -l)"
echo "Error Boundaries: $(find src/app -name 'error.tsx' | wc -l)"
echo "Loading States: $(find src/app -name 'loading.tsx' | wc -l)"
echo "Server Actions: $(grep -c '^export async function' src/app/\(platform\)/admin/actions.ts)"

echo ""
echo "════════════════════════════════════════════════════════════"
echo "  OVV is ready for deployment."
echo ""
echo "  Next steps:"
echo "  1. Add Supabase credentials to .env.local"
echo "  2. npx prisma db push"
echo "  3. npx prisma db seed"
echo "  4. Follow SUPABASE-SETUP.md"
echo "  5. Replace placeholder assets with real photos"
echo "  6. git push origin main (or npx vercel --prod)"
echo "  7. Register → npx tsx scripts/promote-coach.ts email school-slug"
echo "════════════════════════════════════════════════════════════"
```

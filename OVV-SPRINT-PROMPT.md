# OVV All-Sports Pivot — Single Claude Code Prompt

**CRITICAL:** Read `CLAUDE.md`, `OVV-PRODUCT-SPEC.md`, and `prisma/schema.prisma` before starting.

This prompt transforms OVV from football-only to an all-sports platform, replaces test schools with UMHB and Texas A&M Corpus Christi, and adds Influxor-powered Brand Deals. Execute each sprint sequentially. **After each sprint, run the TEST GATE. Do NOT proceed to the next sprint until every test gate check passes. If a check fails, debug and fix it before moving on.**

---

## SPRINT 1: Schema Migration

### 1A. Update `prisma/schema.prisma`

**Add fields to `Sport` model:**
```prisma
  gender            String?           // "men" | "women" | "coed"
  season            String?           // "fall" | "winter" | "spring"
  division          String?           // "NCAA D1" | "NCAA D3" | "NAIA" etc.
  playStyle         String?  @db.Text // Generic style description for any sport
  programDescription String? @db.Text // General program overview
```
Add reverse relations to `Sport`:
```prisma
  rosterPlayers  RosterPlayer[]
  notableAlumni  NotableAlumni[]
```

**Add `sportId` to `RosterPlayer`:**
```prisma
  sportId    String?
  sport      Sport?  @relation(fields: [sportId], references: [id], onDelete: SetNull)
```
Add `@@index([sportId])` to RosterPlayer.

**Update `NotableAlumni`:**
- Add `sportId String?` and `sport Sport? @relation(fields: [sportId], references: [id], onDelete: SetNull)` and `@@index([sportId])`
- Rename `nflTeam` to `proTeam` (can be NFL, MLB, NBA, etc.)

**Add to `NilProgram`:**
```prisma
  primarySportSpend  Int?
  primarySportName   String?
```

**Add new models — Brand Partnerships:**
```prisma
// ─── Brand Partnerships (Influxor) ──────────────────────────────────────────

model BrandPartner {
  id          String   @id @default(uuid())
  name        String
  slug        String   @unique
  logoUrl     String?
  websiteUrl  String?
  category    String
  description String?  @db.Text
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  deals       SchoolBrandDeal[]
  @@map("brand_partners")
}

model SchoolBrandDeal {
  id             String       @id @default(uuid())
  schoolId       String
  school         School       @relation(fields: [schoolId], references: [id], onDelete: Cascade)
  brandPartnerId String
  brandPartner   BrandPartner @relation(fields: [brandPartnerId], references: [id], onDelete: Cascade)
  dealText       String
  promoCode      String?
  promoUrl       String?
  isActive       Boolean      @default(true)
  isFeatured     Boolean      @default(false)
  sortOrder      Int          @default(0)
  createdAt      DateTime     @default(now())
  updatedAt      DateTime     @updatedAt
  @@unique([schoolId, brandPartnerId])
  @@index([schoolId])
  @@index([brandPartnerId])
  @@map("school_brand_deals")
}
```

**Add to `School` model relations:**
```prisma
  brandDeals     SchoolBrandDeal[]
```

### 1B. Run migration

```bash
npx prisma db push
npx prisma generate
```

### 🚦 TEST GATE — SPRINT 1
```bash
npx prisma validate
npx tsc --noEmit
```
**Both must pass with zero errors.** If `tsc` fails, fix every TypeScript error caused by the `nflTeam` → `proTeam` rename or new fields before proceeding. Grep the entire codebase for `nflTeam` and update every reference to `proTeam`:
```bash
grep -r "nflTeam" src/
```
Fix all matches. Re-run both commands until clean.

---

## SPRINT 2: Seed Data — Schools & Athletics

### 2A. Replace `src/data/seed-schools.ts`

Delete Texas Tech and Oklahoma. Replace with:

```typescript
export const seedSchools = [
  {
    id: 'umhb-crusaders-001',
    slug: 'umhb',
    name: 'University of Mary Hardin-Baylor',
    shortName: 'UMHB',
    mascot: 'Crusaders',
    conference: 'American Southwest Conference',
    city: 'Belton',
    state: 'TX',
    colorPrimary: '#492F92',
    colorSecondary: '#FEC324',
    colorAccent: '#FFFFFF',
    logoUrl: '/images/schools/umhb/logo.svg',
    heroImageUrl: '/images/schools/umhb/hero.jpg',
    description: `The University of Mary Hardin-Baylor, located in Belton, Texas, is a private Baptist university with a 180-year legacy of academic excellence and championship athletics. Home to the Crusaders, UMHB competes in NCAA Division III as a member of the American Southwest Conference. The football program is one of the most dominant in all of college football — at any level — with two D3 national championships (2018, 2021) and the highest winning percentage of any team in the entire NCAA across all three divisions. Beyond football, the Crusaders field 16 varsity sports and consistently compete for conference titles in basketball, baseball, softball, soccer, volleyball, tennis, and golf. With approximately 3,800 students on a 340-acre campus just 60 miles north of Austin, UMHB offers a tight-knit, Christ-centered community where student-athletes thrive both on the field and in the classroom.`,
    stadiumCapacity: 7671,
    traditions: `Crusader Stadium opened in 2013 and seats 7,671 fans with a home-side grandstand, student union seating, and end zone berms. The Cru Walk pregame tradition brings the entire team through a tunnel of fans before every home game. The bell tower rings after every Crusader victory, and the student section "Purple Rage" is one of the most energetic in D3 football.`,
    gameDayDescription: `Game day in Belton, Texas is an all-day event. Tailgating starts early around Crusader Stadium with BBQ, live music, and Cru merchandise. The team gathers for a chapel service before the Cru Walk, marching from the Cummins Field House through cheering fans into the stadium. The Purple Rage student section brings relentless energy, and the marching band fills halftime with school fight songs. After a win, the bell tower rings across campus.`,
    welcomeVideoUrl: null,
    defaultWelcomeMsg: 'Welcome to the home of the Crusaders! Explore our championship tradition and discover what makes UMHB special.',
    scorecardId: null,
  },
  {
    id: 'tamucc-islanders-001',
    slug: 'tamucc',
    name: 'Texas A&M University-Corpus Christi',
    shortName: 'TAMUCC',
    mascot: 'Islanders',
    conference: 'Southland Conference',
    city: 'Corpus Christi',
    state: 'TX',
    colorPrimary: '#0067C5',
    colorSecondary: '#007F3E',
    colorAccent: '#9EA2A4',
    logoUrl: '/images/schools/tamucc/logo.svg',
    heroImageUrl: '/images/schools/tamucc/hero.jpg',
    description: `Texas A&M University-Corpus Christi — "The Island University" — sits on Ward Island overlooking Corpus Christi Bay on the Texas Gulf Coast. As a public research university competing in NCAA Division I as a member of the Southland Conference, TAMUCC fields 14 varsity sports and has built a rapidly rising athletic program. The men's basketball team has captured back-to-back conference tournament championships and NCAA Tournament appearances, while the women's tennis program made the NCAA Championships four consecutive years (2021–2024) — a feat accomplished by only 34 Division I schools. With approximately 11,000 students, TAMUCC is renowned for its marine biology program, nursing school, and stunning island campus. There is no football program — Islanders athletics is powered by basketball, baseball, volleyball, tennis, track & field, soccer, softball, cross country, beach volleyball, and golf.`,
    stadiumCapacity: null,
    traditions: `The Islander Tip-Off tradition opens every basketball season with a beach party rally at the campus bayfront. Izzy the Islander, the blue wave mascot, leads fans in the "Island Stomp" chant during home games at the Hilliard Center Arena. The beach volleyball team plays matches on the island's own sand courts with Corpus Christi Bay as the backdrop — one of the most unique settings in college athletics.`,
    gameDayDescription: `Game day at TAMUCC revolves around the Hilliard Center Arena for basketball and Chapman Field for baseball. The island campus creates a unique atmosphere — fans drive across the JFK Causeway bridge to reach campus, with bay views on both sides. The student section "Izzy's Army" brings island-themed energy with teal and blue body paint, inflatable palm trees, and coordinated chants. Postgame, students and fans head to the campus bayfront for sunset hangouts.`,
    welcomeVideoUrl: null,
    defaultWelcomeMsg: 'Welcome to The Island University! Explore Islanders athletics and discover what makes TAMUCC a destination program.',
    scorecardId: null,
  },
];
```

### 2B. Replace `src/data/seed-athletics.ts`

Complete rewrite. UMHB gets 8 sports: Football, Men's Basketball, Women's Basketball, Baseball, Softball, Men's Soccer, Women's Soccer, Volleyball. TAMUCC gets 11 sports: Men's Basketball, Women's Basketball, Baseball, Softball, Volleyball, Women's Soccer, Women's Tennis, Men's Tennis, Beach Volleyball, Track & Field, Women's Golf. **TAMUCC has NO football.**

Use the full sport data from `OVV-ALL-SPORTS-PIVOT.md` section B2 — it contains the complete `seedSports` array with all 19 sport entries, including IDs, play styles, schemes, records, coaches, and program descriptions. Copy it exactly.

Also generate coaching staff entries for each sport. Each sport needs at least a head coach in the `Coach` model. Football gets 8+ coaches (HC, OC, DC, position coaches). Basketball gets 4 (HC + 3 assistants). Other sports get 2-3 coaches each.

Generate facility entries: UMHB gets Crusader Stadium, Mayborn Campus Center, Red Murff Field, Dee Dillon Field, Cummins Field House. TAMUCC gets Hilliard Center Arena, Chapman Field, Tennis Complex, Beach Volleyball Courts, Athletics Performance Center.

### 2C. Replace `src/data/seed-roster.ts`

Generate rosters for EACH sport at each school using `sportId` to link players to their sport:
- UMHB Football: 50+ players with Texas high school towns (Belton, Temple, Killeen, Waco, Austin, Round Rock, Georgetown, Copperas Cove, etc.)
- Basketball (both schools): 15 players each
- Baseball/Softball: 20 players each
- Soccer/Volleyball/Tennis: 12-15 players each
- Other sports: 10-12 players each

Total: at least 200 roster entries across both schools. Use realistic heights/weights per sport. Mark starters with `isStarter: true`.

### 2D. Replace academics seed files

Delete `src/data/seed-academics-ttu.ts` and `src/data/seed-academics-ou.ts`.

Create `src/data/seed-academics-umhb.ts`:
- Enrollment: 3800, Admission rate: 0.74, SAT avg: 1120, ACT avg: 23
- Tuition: $32,430 (private — same in-state/out-of-state)
- Graduation rate: 0.56, Athlete grad rate: 0.72, Student-faculty ratio: 17
- Colleges: School of Nursing, School of Education, College of Business, College of Sciences, College of Humanities, College of Visual & Performing Arts
- 4-6 majors per college with degree pathways and career outcomes

Create `src/data/seed-academics-tamucc.ts`:
- Enrollment: 11266, Admission rate: 0.91, SAT avg: 1080, ACT avg: 22
- Tuition in-state: $10,542, out-of-state: $22,050
- Graduation rate: 0.43, Athlete grad rate: 0.65, Student-faculty ratio: 19
- Colleges: College of Science & Engineering, College of Nursing & Health Sciences, College of Business, College of Liberal Arts, College of Education & Human Development
- Include Marine Biology as a signature major under Science & Engineering
- 4-6 majors per college with degree pathways and career outcomes

Update `src/data/seed-academics.ts` to import from the new files instead of the old ones.

### 2E. Replace remaining seed files

**`src/data/seed-alumni.ts`:** Replace with UMHB and TAMUCC alumni. Use `proTeam` (not `nflTeam`). Add `sportId`. UMHB alumni: focus on D3 All-Americans, national championship MVPs, coaches who went on to coaching careers. TAMUCC alumni: basketball players, baseball draft picks, tennis standouts. For D3 alumni who weren't drafted, set `draftRound: 0, draftPick: 0`.

**`src/data/seed-nil.ts`:** UMHB gets a modest D3 NIL program (local businesses, social media, ~$50K total budget). TAMUCC gets a D1 Southland-level NIL program (~$300K total budget, focused on basketball). Set `primarySportSpend` and `primarySportName: 'Basketball'` for TAMUCC.

**`src/data/seed-videos.ts`:** Replace with UMHB videos (football coach intro, football highlights, basketball highlights, campus tour) and TAMUCC videos (basketball coach intro, basketball highlights, volleyball highlights, beach volleyball showcase, campus tour). Use placeholder YouTube embed URLs.

**`src/data/seed-jerseys.ts`:** UMHB: purple/gold/white jersey assets. TAMUCC: blue/green/silver jersey assets. Use placeholder image URLs at `/images/schools/{slug}/jerseys/`.

**`src/data/seed-nil-visibility.ts`:** Update school IDs to match new school IDs.

### 2F. Create `src/data/seed-brand-deals.ts`

New file with Influxor brand partners and school-specific deals:

```typescript
export const seedBrandPartners = [
  { id: 'bp-marucci', slug: 'marucci', name: 'Marucci', category: 'apparel', logoUrl: '/images/brands/marucci.svg', websiteUrl: 'https://maruccisports.com', description: 'Premium baseball and softball equipment trusted by elite athletes at every level.' },
  { id: 'bp-deoblock', slug: 'deoblock', name: 'DeoBlock', category: 'wellness', logoUrl: '/images/brands/deoblock.svg', websiteUrl: 'https://deoblock.com', description: 'Natural deodorant and body care products designed for active lifestyles.' },
  { id: 'bp-fanspark', slug: 'fanspark', name: 'FanSpark', category: 'tech', logoUrl: '/images/brands/fanspark.svg', websiteUrl: 'https://fanspark.com', description: 'Fan engagement platform connecting athletes with their audiences.' },
  { id: 'bp-goat-coats', slug: 'goat-coats', name: 'GOAT Coats', category: 'apparel', logoUrl: '/images/brands/goat-coats.svg', websiteUrl: 'https://goatcoats.com', description: 'Premium athletic outerwear for the greatest of all time.' },
  { id: 'bp-cellev8', slug: 'cellev8', name: 'Cellev8', category: 'nutrition', logoUrl: '/images/brands/cellev8.svg', websiteUrl: 'https://cellev8.com', description: 'Cellular-level hydration and recovery supplements for peak performance.' },
  { id: 'bp-hny-plus', slug: 'hny-plus', name: 'HNY+', category: 'nutrition', logoUrl: '/images/brands/hny-plus.svg', websiteUrl: 'https://hnyplus.com', description: 'Honey-based performance nutrition and natural energy products.' },
  { id: 'bp-revomadic', slug: 'revomadic', name: 'Revomadic', category: 'lifestyle', logoUrl: '/images/brands/revomadic.svg', websiteUrl: 'https://revomadic.com', description: 'Modern lifestyle brand for athletes who live on the move.' },
  { id: 'bp-dive-coastal', slug: 'dive-coastal-cuisine', name: 'Dive Coastal Cuisine', category: 'food', logoUrl: '/images/brands/dive-coastal.svg', websiteUrl: 'https://divecoastalcuisine.com', description: 'Fresh coastal cuisine and meal options for athletes.' },
  { id: 'bp-chopshop', slug: 'original-chopshop', name: 'Original ChopShop', category: 'food', logoUrl: '/images/brands/chopshop.svg', websiteUrl: 'https://originalchopshop.com', description: 'Fast-casual restaurant serving protein bowls, juices, and healthy meals designed for active lifestyles.' },
];

export const seedSchoolBrandDeals = [
  // UMHB
  { schoolId: 'umhb-crusaders-001', brandPartnerId: 'bp-marucci', dealText: 'CUSTOMIZED PRICING VIA LINK', promoUrl: 'https://maruccisports.com/umhb', isActive: true, isFeatured: true, sortOrder: 1 },
  { schoolId: 'umhb-crusaders-001', brandPartnerId: 'bp-deoblock', dealText: '20% OFF ALL PRODUCTS FOR ALL ATHLETES', promoCode: 'UMHB20', isActive: true, isFeatured: false, sortOrder: 2 },
  { schoolId: 'umhb-crusaders-001', brandPartnerId: 'bp-fanspark', dealText: 'BETA ACCESS', isActive: true, isFeatured: false, sortOrder: 3 },
  { schoolId: 'umhb-crusaders-001', brandPartnerId: 'bp-goat-coats', dealText: 'ENJOY 20% OFF YOUR FIRST GOAT COAT PURCHASE!', promoCode: 'CRU20', isActive: true, isFeatured: true, sortOrder: 4 },
  { schoolId: 'umhb-crusaders-001', brandPartnerId: 'bp-cellev8', dealText: 'EXCLUSIVE ATHLETE PRICING', isActive: true, isFeatured: false, sortOrder: 5 },
  { schoolId: 'umhb-crusaders-001', brandPartnerId: 'bp-hny-plus', dealText: '20% OFF STANDARD FOR ANY ATHLETE', promoCode: 'CRU20', isActive: true, isFeatured: false, sortOrder: 6 },
  { schoolId: 'umhb-crusaders-001', brandPartnerId: 'bp-revomadic', dealText: '15% OFF TO ALL ATHLETES', promoCode: 'CRU15', isActive: true, isFeatured: false, sortOrder: 7 },
  { schoolId: 'umhb-crusaders-001', brandPartnerId: 'bp-dive-coastal', dealText: '25% OFF', promoCode: 'CRU25', isActive: true, isFeatured: false, sortOrder: 8 },
  { schoolId: 'umhb-crusaders-001', brandPartnerId: 'bp-chopshop', dealText: '5% OFF, MUST BE A REGISTERED LOYALTY GUEST', isActive: true, isFeatured: false, sortOrder: 9 },
  // TAMUCC
  { schoolId: 'tamucc-islanders-001', brandPartnerId: 'bp-marucci', dealText: 'CUSTOMIZED PRICING VIA LINK', promoUrl: 'https://maruccisports.com/tamucc', isActive: true, isFeatured: true, sortOrder: 1 },
  { schoolId: 'tamucc-islanders-001', brandPartnerId: 'bp-deoblock', dealText: '20% OFF ALL PRODUCTS FOR ALL ATHLETES', promoCode: 'ISLAND20', isActive: true, isFeatured: false, sortOrder: 2 },
  { schoolId: 'tamucc-islanders-001', brandPartnerId: 'bp-fanspark', dealText: 'BETA ACCESS', isActive: true, isFeatured: false, sortOrder: 3 },
  { schoolId: 'tamucc-islanders-001', brandPartnerId: 'bp-goat-coats', dealText: 'ENJOY 20% OFF YOUR FIRST GOAT COAT PURCHASE!', promoCode: 'ISLAND20', isActive: true, isFeatured: true, sortOrder: 4 },
  { schoolId: 'tamucc-islanders-001', brandPartnerId: 'bp-cellev8', dealText: 'EXCLUSIVE ATHLETE PRICING', isActive: true, isFeatured: false, sortOrder: 5 },
  { schoolId: 'tamucc-islanders-001', brandPartnerId: 'bp-hny-plus', dealText: '20% OFF STANDARD FOR ANY ATHLETE', promoCode: 'ISLAND20', isActive: true, isFeatured: false, sortOrder: 6 },
  { schoolId: 'tamucc-islanders-001', brandPartnerId: 'bp-revomadic', dealText: '15% OFF TO ALL ATHLETES', promoCode: 'ISLAND15', isActive: true, isFeatured: false, sortOrder: 7 },
  { schoolId: 'tamucc-islanders-001', brandPartnerId: 'bp-dive-coastal', dealText: '25% OFF', promoCode: 'ISLAND25', isActive: true, isFeatured: true, sortOrder: 8 },
  { schoolId: 'tamucc-islanders-001', brandPartnerId: 'bp-chopshop', dealText: '5% OFF, MUST BE A REGISTERED LOYALTY GUEST', isActive: true, isFeatured: false, sortOrder: 9 },
];
```

### 2G. Update `prisma/seed.ts`

Update the main seed file:
1. Import from new seed data files (seed-academics-umhb.ts, seed-academics-tamucc.ts, seed-brand-deals.ts)
2. Update old imports (remove ttu/ou references)
3. Delete all existing data before seeding in correct FK order
4. Seed in order: schools → academics → sports → coaches → facilities → roster players (with sportId) → alumni (with sportId, proTeam) → NIL → NIL visibility → videos → jerseys → brand partners → school brand deals
5. Create placeholder directories:
```bash
mkdir -p public/images/schools/umhb public/images/schools/tamucc public/images/brands
```

### 🚦 TEST GATE — SPRINT 2
```bash
npx prisma validate
npx tsc --noEmit
npx prisma db push
npx prisma db seed
```
**All four must pass.** The seed must complete without any foreign key violations, unique constraint violations, or missing field errors. If the seed fails:
1. Read the full error message
2. Check that all referenced IDs exist (schoolId, sportId, brandPartnerId)
3. Check that the seed order respects foreign key dependencies
4. Fix and re-run until `db seed` completes with zero errors

After seeding, verify data exists:
```bash
npx prisma studio
```
Or run a quick query script to confirm both schools, all 19 sports, brand partners, and deals seeded correctly.

---

## SPRINT 3: Athletics Section Refactor

### 3A. Rewrite `src/components/school/athletics-tab.tsx`

The current component assumes a single football sport. Rewrite it to support ALL sports at a school.

**New behavior:**
1. Accept `sports: Sport[]` (with nested coaches, facilities relations included)
2. Accept `selectedSportId: string | null` and `onSportChange: (sportId: string) => void`
3. Render a **sport selector** at the top — horizontal scrollable pill tabs showing all available sports
4. When a sport is selected, display:
   - Sport header bar: name, conference, record, ranking, division badge
   - Scheme/Style section: use `offensiveScheme`/`defensiveScheme` for football/basketball; use `playStyle` for everything else; use `programDescription` as a general overview
   - Coaching Staff: head coach card (from Coach model) with career record, championships, awards; assistant coaches in expandable list
   - Player Development: strength & conditioning + nutrition programs (only if the sport has them — hide if null)
   - Recent Achievements: display `recentBowlGames` array (renamed to "Recent Achievements" in the UI, NOT "Bowl Games")
   - Game Day section: only render if `school.stadiumCapacity` or `school.gameDayDescription` exists (TAMUCC has no stadium)

**Sport selector pill UI:**
- Horizontal scrollable row with `overflow-x: auto` and `-webkit-overflow-scrolling: touch`
- Active pill: `background: var(--school-primary)`, white text
- Inactive pill: subtle background (`bg-white/10` dark, `bg-gray-100` light), standard text
- Each pill shows full sport name ("Men's Basketball", "Women's Soccer", etc.)

### 3B. Create `src/components/school/school-page-client.tsx`

Create a client wrapper component that manages sport selection state. The school detail page (server component) fetches data, then this client wrapper handles interactivity:

```typescript
'use client';
import { useState } from 'react';

interface SchoolPageClientProps {
  school: SchoolWithAllRelations;
  children?: React.ReactNode;
}

export function SchoolPageClient({ school }: SchoolPageClientProps) {
  const [selectedSportId, setSelectedSportId] = useState<string | null>(
    school.sports[0]?.id ?? null
  );

  // Render all sections, passing selectedSportId to Athletics, Roster, Alumni
  // ...
}
```

This keeps the server component page.tsx for data fetching while the client wrapper manages sport selection state shared between Athletics, Roster, and Alumni sections.

### 3C. Update `src/components/school/roster-section.tsx`

Accept `sportId` prop and filter roster by selected sport:
1. Only show players where `player.sportId === sportId`
2. Adjust columns per sport:
   - Football/Basketball: Number, Name, Position, Height, Weight, Year
   - Baseball/Softball: Number, Name, Position, Height, Weight, Year, Hometown
   - Soccer/Volleyball/Tennis/Other: Number, Name, Position, Year, Hometown
3. Sort: starters first, then by number
4. If no players match the selected sport, show "No roster available for this sport"

### 3D. Update `src/components/school/alumni-tab.tsx`

1. Accept optional `sportId` prop — if provided, filter alumni to that sport
2. Rename "NFL Team" → "Pro Team" everywhere in the component
3. Handle D3 alumni: if `draftRound === 0 && draftPick === 0`, show achievement badges ("All-American", "National Champion") instead of draft info
4. Show sport name badge next to each alum if the school has alumni across multiple sports

### 3E. Update `src/app/(platform)/recruit/school/[slug]/page.tsx`

1. Update the Prisma query to include `brandDeals` with `brandPartner` relation, and `sports` with `rosterPlayers`
2. Change `id="football"` → `id="athletics"` on the Athletics section wrapper div
3. Add `id="deals"` wrapper div for the Brand Deals section (positioned between NIL and Roster)
4. Import and render the `SchoolPageClient` wrapper, passing all fetched data
5. Conditionally render "Stadium Capacity" and "Game Day Experience" only if the school has those values (TAMUCC has `stadiumCapacity: null`)

### 3F. Update `src/components/school/section-navigator.tsx`

Replace the sections array:
```typescript
import { Map, Trophy, GraduationCap, DollarSign, Tag, Users, Award, Shirt, Play } from 'lucide-react';

const sections = [
  { id: 'tour', label: 'Tour', icon: Map },
  { id: 'athletics', label: 'Athletics', icon: Trophy },
  { id: 'academics', label: 'Academics', icon: GraduationCap },
  { id: 'nil', label: 'NIL', icon: DollarSign },
  { id: 'deals', label: 'Deals', icon: Tag },
  { id: 'roster', label: 'Roster', icon: Users },
  { id: 'alumni', label: 'Alumni', icon: Award },
  { id: 'jersey', label: 'Jersey', icon: Shirt },
  { id: 'video', label: 'Video', icon: Play },
];
```

### 🚦 TEST GATE — SPRINT 3
```bash
npx tsc --noEmit
```
Must pass with zero errors. Then verify manually:
1. Grep for any remaining `"football"` section ID references: `grep -r '"football"' src/components/ src/app/` — should only appear in sport names, NOT as section IDs
2. Grep for `nflTeam`: `grep -r 'nflTeam' src/` — must return zero matches
3. Grep for `"Bowl Games"` in UI strings: `grep -r "Bowl Games" src/components/` — should return zero (replaced with "Recent Achievements")
4. Verify the section navigator has exactly 9 sections by reading the file
5. Verify the school detail page has `id="athletics"` and `id="deals"` sections

Fix every issue found before proceeding.

---

## SPRINT 4: Brand Deals Section

### 4A. Create `src/components/school/deals-section.tsx`

New component for Influxor-powered brand partnership deals:

**Props:**
```typescript
interface DealsSectionProps {
  deals: (SchoolBrandDeal & { brandPartner: BrandPartner })[];
}
```

**Layout:**
1. Section header: "Athlete Deals & Discounts" with a subtle "Powered by Influxor" text badge (small, muted)
2. Responsive card grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4`
3. Each deal card:
   - Brand logo image (or a placeholder `<Package />` lucide icon if no logo loaded)
   - Brand name in bold
   - Deal text in school primary color (`text-[var(--school-primary)]`), bold, uppercase — matching Influxor's UI style
   - Category pill badge: small rounded pill showing "Apparel", "Nutrition", "Wellness", "Tech", "Food", or "Lifestyle"
   - If `promoUrl` exists: "Redeem" link button. If not: "Coming Soon" disabled button.
4. Featured deals (`isFeatured: true`): highlighted border using `border-[var(--school-primary)]`
5. Card styling: dark background `bg-gray-900 dark:bg-gray-900` with white text — this section uses the dark aesthetic regardless of theme to match the immersive feel
6. Empty state: if no deals, show "Brand partnerships coming soon" with Influxor badge

**Analytics integration:**
- Import and use the analytics tracker
- On section viewport entry: track `{ section: 'deals', action: 'view' }`
- On deal card click or redeem button click: track `{ section: 'deals', action: 'click_deal', metadata: { brandId: deal.brandPartnerId, brandName: deal.brandPartner.name } }`

### 4B. Wire deals into the school detail page

In the school page client wrapper, render `<DealsSection>` inside the `id="deals"` wrapper div, passing the school's brand deals data. The deals data should already be included in the Prisma query from Sprint 3E.

### 🚦 TEST GATE — SPRINT 4
```bash
npx tsc --noEmit
```
Must pass with zero errors. Then verify:
1. Read `src/components/school/deals-section.tsx` — confirm it exports a valid React component
2. Confirm the school detail page imports and renders DealsSection
3. Grep for `deals-section` or `DealsSection` in the school page to confirm it's wired in
4. Confirm analytics tracking calls exist in the deals component

---

## SPRINT 5: Onboarding + Documentation + Polish

### 5A. Update `src/components/recruit/onboarding-wizard.tsx`

Replace the Sport field to offer ALL sports:
```typescript
const sportOptions = [
  'Football', "Men's Basketball", "Women's Basketball",
  'Baseball', 'Softball', "Men's Soccer", "Women's Soccer",
  'Volleyball', "Men's Tennis", "Women's Tennis",
  'Track & Field', 'Cross Country', 'Golf',
  'Beach Volleyball', 'Swimming & Diving', 'Wrestling',
  'Lacrosse', 'Field Hockey', 'Other',
];
```
The sport selector should be a dropdown/select component, not a free text input.

### 5B. Update `src/data/sports.ts`

If this file has a sports type definition or constant array, update it to include all sports listed above.

### 5C. Update `CLAUDE.md`

- Change "college football" to "college athletics" throughout
- Update Project Overview to say "all sports" platform
- Update test schools from Texas Tech/Oklahoma to UMHB and TAMUCC
- Add Brand Deals feature description and Influxor integration note
- Add `BrandPartner` and `SchoolBrandDeal` to the data model list
- Note that TAMUCC has no football program

### 5D. Update `OVV-PRODUCT-SPEC.md`

- Section 1.1 Mission: "all sports" not "college football"
- Section 1.2 Core Value Propositions: generalize from football to athletics
- Section 3.4 School Detail Page: Add "Deals" section between NIL and Roster
- Add a new section documenting the Brand Partnership feature
- Update data model section with new/modified models (BrandPartner, SchoolBrandDeal, Sport updates, RosterPlayer.sportId, NotableAlumni.sportId + proTeam)
- Update seed school references

### 5E. UI label cleanup

Search and replace across the entire codebase:
1. `grep -r "Bowl Games" src/` → Replace with "Recent Achievements" in display text
2. `grep -r "NFL Team" src/` → Replace with "Pro Team" in display text
3. `grep -r "nflTeam" src/` → Must be zero (already handled in Sprint 1, but double check)
4. `grep -r "Stadium Capacity" src/` → Ensure it's conditionally rendered (only if value exists)
5. Any hardcoded "Football" as a section label (not as a sport name) should be "Athletics"

### 5F. Dark mode check

Verify all new components support dark/light mode:
1. `deals-section.tsx` — uses dark aesthetic by design, but should still be readable in light mode
2. `athletics-tab.tsx` — sport selector pills should work in both themes
3. `school-page-client.tsx` — no theme-breaking styles

### 🚦 TEST GATE — SPRINT 5
```bash
npx tsc --noEmit
```
Must pass. Then run comprehensive checks:
```bash
# No remaining references to old schools
grep -ri "texas tech" src/
grep -ri "oklahoma" src/ --include="*.ts" --include="*.tsx"
# Should return zero matches (except possibly in git history comments)

# No remaining nflTeam references
grep -r "nflTeam" src/
# Must return zero

# Verify sport options in onboarding
grep -A 20 "sportOptions" src/components/recruit/onboarding-wizard.tsx

# Verify section navigator has 9 sections
grep -c "id:" src/components/school/section-navigator.tsx
```

Fix any issues found.

---

## SPRINT 6: Final Integration Test & Build

### 6A. Full type check
```bash
npx tsc --noEmit
```

### 6B. Reset and re-seed database
```bash
npx prisma db push --force-reset
npx prisma db seed
```

### 6C. Build test
```bash
npx next build
```
If the build fails, read every error, fix them, and re-run until the build succeeds with zero errors.

### 6D. Start dev server and smoke test
```bash
npm run dev
```
Verify these routes work without errors:
- `/` — Landing page loads
- `/recruit/school/umhb` — UMHB page loads with purple/gold branding, 8 sports in Athletics selector, 9 brand deal cards, Roster filters by sport
- `/recruit/school/tamucc` — TAMUCC page loads with blue/green branding, 11 sports in Athletics selector (NO football), 9 brand deal cards, no Stadium Capacity section
- Section navigator shows 9 items: Tour, Athletics, Academics, NIL, Deals, Roster, Alumni, Jersey, Video
- Clicking sport pills in Athletics section changes the displayed sport data and the roster below it
- Brand Deals section shows all 9 Influxor partner cards with deal text

### 🚦 FINAL TEST GATE
Run ALL of these. Every single one must pass:
```bash
npx prisma validate          # Schema valid
npx tsc --noEmit             # Zero TS errors
npx next build               # Build succeeds
grep -r "nflTeam" src/       # Zero matches
grep -r "texas-tech\|ttu" src/data/  # Zero matches (old school data gone)
grep -r "oklahoma\|sooners" src/data/ # Zero matches (old school data gone)
```

If ANY check fails, debug and fix before declaring done. The app must be fully functional with the two new schools, all-sports support, and Influxor brand deals rendering correctly on both school pages.

---

## FILE SUMMARY

**CREATE (new files):**
- `src/data/seed-academics-umhb.ts`
- `src/data/seed-academics-tamucc.ts`
- `src/data/seed-brand-deals.ts`
- `src/components/school/deals-section.tsx`
- `src/components/school/school-page-client.tsx`
- `public/images/schools/umhb/` (directory)
- `public/images/schools/tamucc/` (directory)
- `public/images/brands/` (directory)

**MODIFY (existing files):**
- `prisma/schema.prisma`
- `prisma/seed.ts`
- `src/data/seed-schools.ts`
- `src/data/seed-athletics.ts`
- `src/data/seed-roster.ts`
- `src/data/seed-alumni.ts`
- `src/data/seed-nil.ts`
- `src/data/seed-nil-visibility.ts`
- `src/data/seed-videos.ts`
- `src/data/seed-jerseys.ts`
- `src/data/seed-academics.ts`
- `src/components/school/athletics-tab.tsx`
- `src/components/school/roster-section.tsx`
- `src/components/school/alumni-tab.tsx`
- `src/components/school/section-navigator.tsx`
- `src/app/(platform)/recruit/school/[slug]/page.tsx`
- `src/components/recruit/onboarding-wizard.tsx`
- `CLAUDE.md`
- `OVV-PRODUCT-SPEC.md`

**DELETE:**
- `src/data/seed-academics-ttu.ts`
- `src/data/seed-academics-ou.ts`

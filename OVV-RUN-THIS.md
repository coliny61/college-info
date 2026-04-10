# OVV All-Sports Pivot — Execute This Entire Prompt

Read `CLAUDE.md`, `OVV-PRODUCT-SPEC.md`, `OVV-ALL-SPORTS-PIVOT.md`, and `prisma/schema.prisma` before starting. `OVV-ALL-SPORTS-PIVOT.md` contains the complete seed data arrays — use them verbatim.

This prompt transforms OVV from football-only to ALL SPORTS, replaces test schools with UMHB and Texas A&M Corpus Christi, and adds Influxor-powered Brand Deals. Work through 6 sprints sequentially. After each sprint, run its TEST GATE — do NOT proceed until every check passes. If a check fails, debug and fix it before moving on.

---

## SPRINT 1 — SCHEMA MIGRATION

Update `prisma/schema.prisma`:

1. Add to `Sport` model: `gender String?`, `season String?`, `division String?`, `playStyle String? @db.Text`, `programDescription String? @db.Text`. Add reverse relations: `rosterPlayers RosterPlayer[]` and `notableAlumni NotableAlumni[]`.

2. Add to `RosterPlayer`: `sportId String?`, `sport Sport? @relation(fields: [sportId], references: [id], onDelete: SetNull)`, `@@index([sportId])`.

3. Update `NotableAlumni`: add `sportId String?` with Sport relation and `@@index([sportId])`. Rename `nflTeam` to `proTeam`.

4. Add to `NilProgram`: `primarySportSpend Int?`, `primarySportName String?`.

5. Add two new models:

```prisma
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

6. Add `brandDeals SchoolBrandDeal[]` to the `School` model relations.

7. Run: `npx prisma db push && npx prisma generate`

8. Grep the entire `src/` directory for `nflTeam` and replace every occurrence with `proTeam`. Fix all TypeScript errors.

**TEST GATE 1:** Run `npx prisma validate && npx tsc --noEmit`. Both must pass with zero errors. Do not proceed until clean.

---

## SPRINT 2 — SEED DATA REWRITE

Read `OVV-ALL-SPORTS-PIVOT.md` — it contains the complete seed data arrays. Use them.

1. Replace `src/data/seed-schools.ts` with the two new schools from OVV-ALL-SPORTS-PIVOT.md section B1: UMHB (id: `umhb-crusaders-001`, slug: `umhb`, colors: `#492F92`/`#FEC324`/`#FFFFFF`, Belton TX, ASC, D3, stadiumCapacity: 7671) and TAMUCC (id: `tamucc-islanders-001`, slug: `tamucc`, colors: `#0067C5`/`#007F3E`/`#9EA2A4`, Corpus Christi TX, Southland, D1, stadiumCapacity: null). Delete ALL Texas Tech and Oklahoma data.

2. Replace `src/data/seed-athletics.ts` with the complete 19-sport `seedSports` array from OVV-ALL-SPORTS-PIVOT.md section B2. UMHB gets 8 sports (Football, Men's Basketball, Women's Basketball, Baseball, Softball, Men's Soccer, Women's Soccer, Volleyball). TAMUCC gets 11 sports (Men's Basketball, Women's Basketball, Baseball, Softball, Volleyball, Women's Soccer, Women's Tennis, Men's Tennis, Beach Volleyball, Track & Field, Women's Golf). **TAMUCC has NO football.** Also generate coaching staff (Coach model entries) for each sport: football gets 8+ coaches, basketball 4, others 2-3. Generate facilities: UMHB gets Crusader Stadium, Mayborn Campus Center, Red Murff Field, Dee Dillon Field, Cummins Field House. TAMUCC gets Hilliard Center Arena, Chapman Field, Tennis Complex, Beach Volleyball Courts, Athletics Performance Center.

3. Replace `src/data/seed-roster.ts` with per-sport rosters using `sportId`. UMHB football: 50+ players with central Texas hometowns (Belton, Temple, Killeen, Waco, Austin, Round Rock, Georgetown, Copperas Cove). Basketball: 15 per team. Baseball/softball: 20 each. Soccer/volleyball/tennis: 12-15 each. Total 200+ entries. Mark starters. Use realistic heights/weights per sport.

4. Delete `src/data/seed-academics-ttu.ts` and `src/data/seed-academics-ou.ts`. Create `src/data/seed-academics-umhb.ts` (enrollment: 3800, admission: 0.74, SAT: 1120, ACT: 23, tuition: $32,430 both, grad rate: 0.56, athlete grad: 0.72, ratio: 17, colleges: Nursing, Education, Business, Sciences, Humanities, Visual & Performing Arts, 4-6 majors each with pathways and career outcomes). Create `src/data/seed-academics-tamucc.ts` (enrollment: 11266, admission: 0.91, SAT: 1080, ACT: 22, in-state: $10,542, out-of-state: $22,050, grad rate: 0.43, athlete grad: 0.65, ratio: 19, colleges: Science & Engineering, Nursing & Health Sciences, Business, Liberal Arts, Education & Human Development, include Marine Biology as signature major, 4-6 majors each). Update `src/data/seed-academics.ts` imports.

5. Replace `src/data/seed-alumni.ts` with UMHB (D3 All-Americans, national championship MVPs, coaching careers — set draftRound/draftPick to 0 for undrafted) and TAMUCC (basketball, baseball draft picks, tennis standouts) alumni. Use `proTeam` not `nflTeam`. Include `sportId`.

6. Replace `src/data/seed-nil.ts`. UMHB: modest D3 NIL (~$50K budget, local businesses). TAMUCC: D1 Southland level (~$300K, basketball-focused). Set `primarySportSpend` and `primarySportName: 'Basketball'` for TAMUCC.

7. Replace `src/data/seed-videos.ts` with UMHB (football coach intro, football highlights, basketball highlights, campus day-in-life) and TAMUCC (basketball coach intro, basketball highlights, volleyball highlights, beach volleyball showcase, campus tour) using placeholder YouTube URLs.

8. Replace `src/data/seed-jerseys.ts`: UMHB purple/gold/white, TAMUCC blue/green/silver. Placeholder URLs at `/images/schools/{slug}/jerseys/`.

9. Update `src/data/seed-nil-visibility.ts` with new school IDs.

10. Create `src/data/seed-brand-deals.ts` with the 9 Influxor brand partners and 18 school deals (9 per school) from OVV-ALL-SPORTS-PIVOT.md section B8. Copy the `seedBrandPartners` and `seedSchoolBrandDeals` arrays verbatim.

11. Update `prisma/seed.ts`: import new files, delete old ttu/ou imports, seed in order (schools → academics → sports → coaches → facilities → roster with sportId → alumni with sportId/proTeam → NIL → NIL visibility → videos → jerseys → brand partners → school brand deals). Delete all existing data first in correct FK order.

12. Create placeholder directories: `mkdir -p public/images/schools/umhb public/images/schools/tamucc public/images/brands`

**TEST GATE 2:** Run `npx prisma validate && npx tsc --noEmit && npx prisma db push && npx prisma db seed`. All four must pass. Seed must complete with zero FK violations or missing field errors. If seed fails, read the error, fix the data, and re-run until clean.

---

## SPRINT 3 — ATHLETICS SECTION REFACTOR

1. Rewrite `src/components/school/athletics-tab.tsx` to support ALL sports. Accept `sports: Sport[]`, `selectedSportId: string | null`, `onSportChange: (id: string) => void`. Render a horizontal scrollable pill selector at the top (active pill: `bg-[var(--school-primary)]` white text, inactive: subtle background). Below the selector, show the selected sport's data: header (name, conference, record, ranking, division), scheme/style section (use `offensiveScheme`/`defensiveScheme` for football/basketball, `playStyle` for everything else, `programDescription` as overview), coaching staff from Coach model, player development (strength/nutrition if not null), recent achievements (rename from "Bowl Games" to "Recent Achievements"), game day (only if school has stadiumCapacity or gameDayDescription). Default sport: first alphabetically.

2. Create `src/components/school/school-page-client.tsx` — a `'use client'` wrapper that manages `selectedSportId` state via `useState`. The server page fetches data, this client wrapper passes `selectedSportId` + `setSelectedSportId` to Athletics, Roster, and Alumni sections.

3. Update `src/components/school/roster-section.tsx`: accept `sportId` prop, filter players by `sportId`. Adjust columns: football/basketball show number, position, height, weight, year. Baseball/softball add hometown. Soccer/volleyball/tennis show number, position, year, hometown. Sort starters first. Show "No roster available" if empty.

4. Update `src/components/school/alumni-tab.tsx`: accept optional `sportId` filter. Rename "NFL Team" → "Pro Team" in all display text. If `draftRound === 0 && draftPick === 0`, show achievement badges instead of draft info. Show sport name badge per alum.

5. Update `src/app/(platform)/recruit/school/[slug]/page.tsx`: update Prisma query to include `brandDeals` with `brandPartner`, and `sports` with nested `rosterPlayers`. Change `id="football"` → `id="athletics"`. Add `id="deals"` div between NIL and Roster. Import and use `SchoolPageClient` wrapper. Conditionally render stadium/game day sections only if values exist.

6. Update `src/components/school/section-navigator.tsx` — replace sections array:
```
Tour (Map), Athletics (Trophy), Academics (GraduationCap), NIL (DollarSign), Deals (Tag), Roster (Users), Alumni (Award), Jersey (Shirt), Video (Play)
```
Import `Tag` from lucide-react. Total: 9 sections.

**TEST GATE 3:** Run `npx tsc --noEmit` — zero errors. Then: `grep -r '"football"' src/components/ src/app/` must only show sport names not section IDs. `grep -r 'nflTeam' src/` must return zero. `grep -r "Bowl Games" src/components/` must return zero. Section navigator must have exactly 9 entries. Fix all issues.

---

## SPRINT 4 — BRAND DEALS SECTION

1. Create `src/components/school/deals-section.tsx`. Props: `deals: (SchoolBrandDeal & { brandPartner: BrandPartner })[]`. Layout: "Athlete Deals & Discounts" header with subtle "Powered by Influxor" badge. Responsive grid (3 col desktop, 2 tablet, 1 mobile). Each card: brand logo (or Package icon placeholder), brand name bold, deal text in `text-[var(--school-primary)]` bold uppercase, category pill badge, "Redeem" link button if `promoUrl` exists else "Coming Soon" disabled. Featured deals get `border-[var(--school-primary)]`. Dark card backgrounds (`bg-gray-900`). Empty state: "Brand partnerships coming soon." Analytics: track `section: 'deals', action: 'view'` on viewport entry, `action: 'click_deal'` with `metadata: { brandId, brandName }` on click.

2. Wire `<DealsSection>` into the school page client wrapper inside the `id="deals"` div, passing brand deals data.

**TEST GATE 4:** Run `npx tsc --noEmit` — zero errors. Verify `deals-section.tsx` exists and is imported in the school page. Verify analytics tracking calls exist in the component.

---

## SPRINT 5 — ONBOARDING + DOCS + POLISH

1. Update `src/components/recruit/onboarding-wizard.tsx` sport field to a dropdown with all sports: Football, Men's Basketball, Women's Basketball, Baseball, Softball, Men's Soccer, Women's Soccer, Volleyball, Men's Tennis, Women's Tennis, Track & Field, Cross Country, Golf, Beach Volleyball, Swimming & Diving, Wrestling, Lacrosse, Field Hockey, Other.

2. Update `src/data/sports.ts` if it has a sports constant — include all sports above.

3. Update `CLAUDE.md`: change "college football" → "college athletics" throughout, update test schools to UMHB and TAMUCC, add Brand Deals + Influxor notes, add BrandPartner/SchoolBrandDeal to data model list, note TAMUCC has no football.

4. Update `OVV-PRODUCT-SPEC.md`: Mission → all sports, add Deals section to school detail page sections, add Brand Partnership feature section, update data models, update school references.

5. Final label sweep — search and fix: `grep -r "Bowl Games" src/` → "Recent Achievements". `grep -r "NFL Team" src/` → "Pro Team". `grep -r "Stadium Capacity" src/` → ensure conditionally rendered. Any hardcoded "Football" as section label → "Athletics".

6. Dark mode: verify deals-section.tsx, athletics-tab.tsx, school-page-client.tsx all work in dark/light themes.

**TEST GATE 5:** Run `npx tsc --noEmit`. Then: `grep -ri "texas tech" src/` → zero. `grep -ri "oklahoma" src/data/` → zero. `grep -r "nflTeam" src/` → zero. `grep -A 20 "sportOptions" src/components/recruit/onboarding-wizard.tsx` must show full sport list. Fix all issues.

---

## SPRINT 6 — FINAL BUILD & SMOKE TEST

1. `npx tsc --noEmit` — zero errors
2. `npx prisma db push --force-reset && npx prisma db seed` — clean reset and seed
3. `npx next build` — must succeed. If it fails, fix every error and rebuild until clean.
4. `npm run dev` — start dev server and verify:
   - `/recruit/school/umhb` loads with purple/gold branding, 8 sports in Athletics pill selector, 9 brand deal cards, roster filters by sport, section nav has 9 items
   - `/recruit/school/tamucc` loads with blue/green branding, 11 sports (NO football), 9 brand deal cards, no stadium section, section nav has 9 items
   - Clicking sport pills changes displayed sport + roster below
   - Deals section shows all 9 Influxor cards with discount text in school colors

**FINAL TEST GATE:** ALL must pass:
```bash
npx prisma validate
npx tsc --noEmit
npx next build
grep -r "nflTeam" src/
grep -r "texas-tech\|ttu" src/data/
grep -r "oklahoma\|sooners" src/data/
```
Zero errors, zero stale references. The app must be fully functional with both schools, all-sports support, and Influxor brand deals on every school page.

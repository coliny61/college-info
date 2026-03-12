# Sprint 9: Real Data — NIL, Alumni, Coaching, Academics + Per-Tab Analytics

## Context

The platform needs real, compelling data that recruits actually care about when evaluating schools. Currently seed data is approximate. This sprint adds 3 new data dimensions (NIL budgets, notable alumni/NFL draft, coaching history) with accurate real-world data, corrects academic stats, and adds per-tab duration tracking so coaches can see exactly which sections each recruit explores.

---

## Phase 1: Schema + Migration

### New Models

**`NilProgram`** (one per school)
- `collectiveName`, `totalBudget`, `footballSpend`, `allSportsSpend`, `founded`, `description` (text), `notableDeals` (Json)
- Relation: School 1→1 NilProgram

**`NotableAlumni`** (many per school)
- `name`, `position`, `draftYear`, `draftRound`, `draftPick`, `nflTeam`, `careerHighlights` (text), `isFirstRound`, `isActive`
- Relation: School 1→many NotableAlumni

### Expanded Models

**`Coach`** — add optional fields for head coaches:
- `careerRecord` (String?), `championships` (String[]), `previousRoles` (String[]), `awards` (String[]), `playersInNfl` (Int?)

**`SchoolAcademics`** — add recruit-relevant fields:
- `studentToFacultyRatio` (Float?), `averageClassSize` (Int?), `ranking` (Int?), `athleteGraduationRate` (Float?)

### Files
- `prisma/schema.prisma` — Add NilProgram, NotableAlumni models; extend Coach, SchoolAcademics; add relations to School
- Apply SQL directly via pg Pool (same pattern as Sprint 8)
- Run `npx prisma generate`

---

## Phase 2: Seed Real Data

### `src/data/seed-nil.ts` (NEW)

| School | Collective | Total Budget | Football | All-Sports |
|--------|-----------|-------------|----------|------------|
| Texas Tech | The Matador Club | $28M | $20M | $8M |
| USC | House of Victory | $20.5M | $14M | $6.5M |
| Baylor | GXG (Green & Gold) | $4.2M | $2.8M | $1.4M |
| Oklahoma | 1Oklahoma | $9.7M | $7M | $2.7M |

Each includes: collective description, founding year, 2 notable deals.

### `src/data/seed-alumni.ts` (NEW)

6 notable alumni per school (24 total), focusing on NFL draft picks:

**Texas Tech**: Patrick Mahomes (R1 #10, 2017), Michael Crabtree (R1 #10, 2009), Tyree Wilson (R1 #7, 2023), Wes Welker (UDFA), Zach Thomas (R5 #154, 1996), Jordyn Brooks (R1 #27, 2020)

**USC**: Caleb Williams (R1 #1, 2024), Carson Palmer (R1 #1, 2003), Troy Polamalu (R1 #16, 2003), Ronnie Lott (R1 #8, 1981), Clay Matthews III (R1 #26, 2009), Sam Darnold (R1 #3, 2018)

**Baylor**: Robert Griffin III (R1 #2, 2012), Xavien Howard (R2 #38, 2016), Corey Coleman (R1 #15, 2016), Jalen Pitre (R2 #37, 2022), Mike Singletary (R2 #38, 1981), Thomas Everett (R4 #99, 1987)

**Oklahoma**: Baker Mayfield (R1 #1, 2018), Kyler Murray (R1 #1, 2019), Adrian Peterson (R1 #7, 2007), Sam Bradford (R1 #1, 2010), Lee Roy Selmon (R1 #1, 1976), CeeDee Lamb (R1 #17, 2020)

### `src/data/seed-athletics.ts` (MODIFY)

Add coaching history to existing head coaches:
- Joey McGuire (TTU): 36-18, 2025 Big 12 Championship
- Lincoln Riley (USC): 78-22, 4x Big 12 Championships, mentored 3 Heisman winners
- Dave Aranda (Baylor): 45-31, 2021 Big 12 Championship, Sugar Bowl
- Brent Venables (OU): 22-17, 3 national championships as DC

### `src/data/seed-academics.ts` (MODIFY)

Correct academic stats with real NCES/institutional data:

| School | Enrollment | Admit | SAT | ACT | In-State | Out-State | Grad | Earnings | Retention | S:F | Rank |
|--------|-----------|-------|-----|-----|----------|-----------|------|----------|-----------|-----|------|
| Texas Tech | 40,773 | 73% | 1180 | 25 | $11,852 | $24,157 | 67% | $52K | 85% | 21:1 | 187 |
| USC | 49,500 | 12% | 1480 | 34 | $66,640 | $66,640 | 92% | $81K | 97% | 9:1 | 28 |
| Baylor | 20,824 | 67% | 1270 | 29 | $54,298 | $54,298 | 78% | $58K | 90% | 15:1 | 93 |
| Oklahoma | 32,217 | 73% | 1240 | 27 | $12,063 | $29,163 | 71% | $53K | 88% | 18:1 | 127 |

### `prisma/seed.ts` (MODIFY)
- Add `prisma.notableAlumni.deleteMany()`, `prisma.nilProgram.deleteMany()` to cleanup
- Call `seedNil()` and `seedAlumni()` after existing seed functions

---

## Phase 3: New UI Components

### `src/components/school/tab-tracker.tsx` (NEW)
Thin client wrapper that calls `useTrackDuration(section, schoolId)` around any tab content — avoids converting server components to client components.

### `src/components/school/nil-tab.tsx` (NEW)
Client component with `useTrackDuration('nil', schoolId)`:
- 3 budget stat cards: Total ($28M), Football ($20M), All-Sports ($8M) — scoreboard typography
- Collective info card: name, founded year, description
- Notable deals section: athlete cards with sport badges

### `src/components/school/alumni-tab.tsx` (NEW)
Client component with `useTrackDuration('alumni', schoolId)`:
- Summary stats: total draft picks, first-rounders, #1 overall picks
- Alumni grid: cards with name, position badge, draft info, NFL team, career highlights, active/retired badge

---

## Phase 4: Modified UI Components

### `src/components/school/school-tabs.tsx`
- Add NIL and Alumni tabs (7 total: Overview, Academics, Athletics, NIL, Alumni, Tour, Jersey Room)
- Add `onValueChange` handler tracking tab switches: `trackEvent('school:<slug>', 'tab_switch', schoolId, { tab })`
- Wrap each `TabsContent` in `<TabTracker section="..." schoolId={school.id}>`
- Pass `schoolId`, `nilProgram`, `notableAlumni` to respective tab components

### `src/components/school/athletics-tab.tsx`
- Expand coach card for head coaches (those with `careerRecord`): career record badge, championships with trophy icons, previous roles, awards
- Position coaches keep existing compact card format
- Update TypeScript interface to include new Coach fields

### `src/components/school/academics-tab.tsx`
- Add new stat cards: US News Ranking, Student-Faculty Ratio, Athlete Grad Rate
- Update interface for new optional fields

### `src/components/school/overview-tab.tsx`
- Add NIL Budget and Alumni in NFL stat cards to the overview stats grid (expand from 4 to 6 cards)
- Accept `nilBudget` and `alumniCount` props

### `src/app/(platform)/recruit/school/[slug]/page.tsx`
- Expand Prisma include: `nilProgram: true`, `notableAlumni: { orderBy: { draftYear: 'desc' } }`
- Pass new data through `SchoolTabs` to child components

---

## Files Summary

### New (4 files)
| File | Purpose |
|------|---------|
| `src/data/seed-nil.ts` | NIL collective data for 4 schools |
| `src/data/seed-alumni.ts` | Notable alumni + NFL draft data (24 players) |
| `src/components/school/nil-tab.tsx` | NIL tab with budget stats + deals |
| `src/components/school/alumni-tab.tsx` | Alumni tab with draft results grid |

### Modified (9 files)
| File | Changes |
|------|---------|
| `prisma/schema.prisma` | Add NilProgram, NotableAlumni; extend Coach, SchoolAcademics |
| `prisma/seed.ts` | Add cleanup + call new seed functions |
| `src/data/seed-athletics.ts` | Add coaching history to head coaches |
| `src/data/seed-academics.ts` | Correct with real data + new fields |
| `src/components/school/school-tabs.tsx` | Add NIL + Alumni tabs, TabTracker wrappers, tab-switch tracking |
| `src/components/school/athletics-tab.tsx` | Enhanced head coach cards with career history |
| `src/components/school/academics-tab.tsx` | New stat cards (ranking, S:F ratio, athlete grad rate) |
| `src/components/school/overview-tab.tsx` | Add NIL budget + alumni count to overview stats |
| `src/app/(platform)/recruit/school/[slug]/page.tsx` | Expand Prisma include for new relations |

### Not modified (TabTracker approach)
Instead of a separate `tab-tracker.tsx` file, use an inline client wrapper in `school-tabs.tsx` since it's already a client component — just add `useTrackDuration` calls per active tab using `onValueChange` state.

---

## Verification

1. SQL migration applies cleanly via pg Pool
2. `npx prisma generate` succeeds
3. `npx tsx prisma/seed.ts` seeds all new data without errors
4. `npm run build` — 0 errors
5. School detail page shows 7 tabs, all render correct data
6. NIL tab shows budget breakdown + notable deals
7. Alumni tab shows draft picks sorted by year
8. Athletics tab shows expanded coaching history for head coaches
9. Academics tab shows real data with ranking + S:F ratio
10. Tab switches and duration tracked in analytics events (verify via DB or dashboard)

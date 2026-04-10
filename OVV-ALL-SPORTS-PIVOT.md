# OVV All-Sports Pivot + Brand Deals — Claude Code Implementation Prompt

**READ FIRST:** `CLAUDE.md`, `OVV-PRODUCT-SPEC.md`, `prisma/schema.prisma`

This prompt implements a major platform pivot: OVV goes from football-only to ALL SPORTS, swaps test schools to UMHB and Texas A&M Corpus Christi, and adds a new Influxor-powered Brand Deals section. Execute every section in order. Do NOT skip any section.

---

## PHASE A: Schema Changes

### A1. Update the Sport model for all-sports support

**File:** `prisma/schema.prisma`

The `Sport` model currently has football-specific fields. Make these changes:

1. Add new fields to `Sport`:
```prisma
  gender          String?           // "men" | "women" | "coed"
  season          String?           // "fall" | "winter" | "spring"
  division        String?           // "NCAA D1" | "NCAA D3" | "NAIA" etc.
  playStyle       String?  @db.Text // Generic style description for any sport
  programDescription String? @db.Text // General program overview
```

2. Rename is NOT needed — `offensiveScheme`, `defensiveScheme`, `offenseDescription`, `defenseDescription` still work for football/basketball. For other sports, use `playStyle` and `programDescription`. Keep the existing fields nullable (they already are).

3. Add `sportId` to `RosterPlayer` so rosters are per-sport:
```prisma
model RosterPlayer {
  id         String  @id @default(uuid())
  schoolId   String
  school     School  @relation(fields: [schoolId], references: [id], onDelete: Cascade)
  sportId    String?
  sport      Sport?  @relation(fields: [sportId], references: [id], onDelete: SetNull)
  name       String
  number     Int
  position   String
  height     String
  weight     Int
  year       String
  hometown   String
  state      String
  highSchool String?
  imageUrl   String?
  isStarter  Boolean @default(false)

  @@index([schoolId])
  @@index([sportId])
  @@map("roster_players")
}
```

4. Add the reverse relation on `Sport`:
```prisma
model Sport {
  // ... existing fields ...
  rosterPlayers RosterPlayer[]
  // ... existing relations (coaches, facilities) ...
}
```

5. Update `NotableAlumni` to also link to a sport:
```prisma
model NotableAlumni {
  id               String  @id @default(uuid())
  schoolId         String
  school           School  @relation(fields: [schoolId], references: [id], onDelete: Cascade)
  sportId          String?
  sport            Sport?  @relation(fields: [sportId], references: [id], onDelete: SetNull)
  name             String
  position         String
  draftYear        Int
  draftRound       Int
  draftPick        Int
  proTeam          String          // renamed from nflTeam — could be NFL, MLB, NBA, etc.
  careerHighlights String  @db.Text
  isFirstRound     Boolean @default(false)
  isActive         Boolean @default(true)

  @@index([schoolId])
  @@index([sportId])
  @@map("notable_alumni")
}
```

Add the reverse relation `notableAlumni NotableAlumni[]` on `Sport`.

6. Rename `NilProgram.footballSpend` to a more generic approach — actually keep it as-is since NIL budgets do often break down by football. But add:
```prisma
  primarySportSpend  Int?     // For non-football schools, their top sport's spend
  primarySportName   String?  // e.g. "Basketball" for TAMUCC
```

### A2. Add Brand Partnership models

**File:** `prisma/schema.prisma`

Add these two new models after the NilFieldVisibility model:

```prisma
// ─── Brand Partnerships (Influxor) ──────────────────────────────────────────

model BrandPartner {
  id          String   @id @default(uuid())
  name        String
  slug        String   @unique
  logoUrl     String?
  websiteUrl  String?
  category    String                    // "apparel" | "nutrition" | "wellness" | "tech" | "food" | "lifestyle"
  description String?  @db.Text
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  deals SchoolBrandDeal[]

  @@map("brand_partners")
}

model SchoolBrandDeal {
  id             String   @id @default(uuid())
  schoolId       String
  school         School   @relation(fields: [schoolId], references: [id], onDelete: Cascade)
  brandPartnerId String
  brandPartner   BrandPartner @relation(fields: [brandPartnerId], references: [id], onDelete: Cascade)
  dealText       String                 // "20% OFF ALL PRODUCTS FOR ALL ATHLETES"
  promoCode      String?
  promoUrl       String?               // deep link to redeem
  isActive       Boolean  @default(true)
  isFeatured     Boolean  @default(false)
  sortOrder      Int      @default(0)
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt

  @@unique([schoolId, brandPartnerId])
  @@index([schoolId])
  @@index([brandPartnerId])
  @@map("school_brand_deals")
}
```

Add these reverse relations to the `School` model:
```prisma
  brandDeals     SchoolBrandDeal[]
```

### A3. Run migration

```bash
npx prisma migrate dev --name all-sports-pivot-and-brand-deals
npx prisma generate
```

If migrate fails due to the `nflTeam` → `proTeam` rename, use `prisma db push` instead for dev:
```bash
npx prisma db push
npx prisma generate
```

---

## PHASE B: Seed Data — Complete Rewrite

Replace ALL seed data files. Delete every reference to Texas Tech and Oklahoma. The two test schools are now:

### B1. Replace `src/data/seed-schools.ts`

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
    logoUrl: '/images/schools/umhb/logo.png',
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
    logoUrl: '/images/schools/tamucc/logo.png',
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

### B2. Replace `src/data/seed-athletics.ts`

This file contains ALL sports, coaches, and facilities for both schools. This is the largest seed file.

```typescript
// ============================================================================
// UMHB CRUSADERS — SPORTS
// ============================================================================

export const seedSports = [
  // ── UMHB Sports ──────────────────────────────────────────────────────────
  {
    id: 'umhb-football',
    schoolId: 'umhb-crusaders-001',
    name: 'Football',
    gender: 'men',
    season: 'fall',
    division: 'NCAA D3',
    conference: 'American Southwest Conference',
    headCoach: 'Larry Harmon',
    record: '11-2 (2024)',
    ranking: null,
    offensiveScheme: 'Spread RPO',
    defensiveScheme: '4-2-5 Multiple',
    offenseDescription: 'The Crusader offense operates a spread RPO system that stretches defenses horizontally with quick receivers and a mobile quarterback, then punishes overcommitment with a physical downhill run game. The scheme emphasizes tempo, pre-snap reads, and explosive plays.',
    defenseDescription: 'UMHB runs a 4-2-5 multiple defense built on speed and versatility. With five defensive backs, the Crusaders can match up against any offensive formation while bringing pressure from multiple angles. The defense is aggressive, turnover-focused, and ranks among the best in D3 year after year.',
    strengthProgram: 'The Cummins Field House houses a 12,000 sq ft weight room with Olympic platforms, power racks, and sport-specific training stations. The strength program emphasizes explosive power development, injury prevention, and position-specific conditioning. Year-round programming includes offseason max-effort phases, preseason sport-specific conditioning, and in-season maintenance protocols.',
    nutritionProgram: 'Student-athletes have access to a sports nutrition program that includes meal planning, pre/post-workout fueling strategies, and education on performance nutrition. The campus dining facilities offer athlete-specific meal options, and the training staff provides hydration and recovery protocols.',
    playStyle: null,
    programDescription: null,
    recentBowlGames: ['2024 NCAA D3 Quarterfinals', '2023 NCAA D3 Semifinals', '2021 NCAA D3 National Champions (Stagg Bowl)', '2018 NCAA D3 National Champions'],
    conferenceStanding: '1st in ASC West Division',
  },
  {
    id: 'umhb-mens-basketball',
    schoolId: 'umhb-crusaders-001',
    name: 'Men\'s Basketball',
    gender: 'men',
    season: 'winter',
    division: 'NCAA D3',
    conference: 'American Southwest Conference',
    headCoach: 'Tim Hager',
    record: '20-8 (2024-25)',
    ranking: null,
    offensiveScheme: 'Motion Offense',
    defensiveScheme: 'Man-to-Man',
    offenseDescription: 'The Crusaders run a motion-based offense that emphasizes ball movement, spacing, and unselfish play. Players are expected to read the defense and make decisions in real time, creating open looks through screens and cuts.',
    defenseDescription: 'UMHB plays primarily man-to-man defense with an emphasis on contesting every shot, controlling the boards, and forcing turnovers in the half court.',
    strengthProgram: null,
    nutritionProgram: null,
    playStyle: 'Up-tempo, disciplined, fundamentals-first basketball with an emphasis on transition scoring and defensive intensity.',
    programDescription: 'UMHB men\'s basketball competes in the ASC and has built a tradition of competitive seasons under Tim Hager. The program plays home games at the Mayborn Campus Center.',
    recentBowlGames: [],
    conferenceStanding: null,
  },
  {
    id: 'umhb-womens-basketball',
    schoolId: 'umhb-crusaders-001',
    name: 'Women\'s Basketball',
    gender: 'women',
    season: 'winter',
    division: 'NCAA D3',
    conference: 'American Southwest Conference',
    headCoach: 'Mark Morefield',
    record: '18-10 (2024-25)',
    ranking: null,
    offensiveScheme: null,
    defensiveScheme: null,
    offenseDescription: null,
    defenseDescription: null,
    strengthProgram: null,
    nutritionProgram: null,
    playStyle: 'Team-oriented, half-court offense with strong post play and perimeter shooting. Defensively, the Crusaders switch between man and zone depending on matchups.',
    programDescription: 'UMHB women\'s basketball has a long tradition of success in the American Southwest Conference, consistently fielding competitive teams.',
    recentBowlGames: [],
    conferenceStanding: null,
  },
  {
    id: 'umhb-baseball',
    schoolId: 'umhb-crusaders-001',
    name: 'Baseball',
    gender: 'men',
    season: 'spring',
    division: 'NCAA D3',
    conference: 'American Southwest Conference',
    headCoach: 'David Lemons',
    record: '32-14 (2024)',
    ranking: null,
    offensiveScheme: null,
    defensiveScheme: null,
    offenseDescription: null,
    defenseDescription: null,
    strengthProgram: null,
    nutritionProgram: null,
    playStyle: 'Aggressive at the plate with a focus on situational hitting, baserunning, and manufacturing runs. Pitching staff emphasizes command and pitch sequencing over pure velocity.',
    programDescription: 'UMHB baseball plays at Red Murff Field at the Cru Sports Plex. The program has a strong track record in ASC play and has produced multiple all-conference selections.',
    recentBowlGames: [],
    conferenceStanding: null,
  },
  {
    id: 'umhb-softball',
    schoolId: 'umhb-crusaders-001',
    name: 'Softball',
    gender: 'women',
    season: 'spring',
    division: 'NCAA D3',
    conference: 'American Southwest Conference',
    headCoach: 'Kendra McBride',
    record: '28-16 (2024)',
    ranking: null,
    offensiveScheme: null,
    defensiveScheme: null,
    offenseDescription: null,
    defenseDescription: null,
    strengthProgram: null,
    nutritionProgram: null,
    playStyle: 'Small-ball approach with bunting, slapping, and speed on the basepaths. The pitching circle features a deep staff that keeps opposing lineups off-balance with spin and movement.',
    programDescription: 'UMHB softball competes at Dee Dillon Field, a 400-seat facility with a natural grass playing surface. The program has been a consistent contender in the ASC.',
    recentBowlGames: [],
    conferenceStanding: null,
  },
  {
    id: 'umhb-mens-soccer',
    schoolId: 'umhb-crusaders-001',
    name: 'Men\'s Soccer',
    gender: 'men',
    season: 'fall',
    division: 'NCAA D3',
    conference: 'American Southwest Conference',
    headCoach: 'David Bankston',
    record: '12-6-2 (2024)',
    ranking: null,
    offensiveScheme: null,
    defensiveScheme: null,
    offenseDescription: null,
    defenseDescription: null,
    strengthProgram: null,
    nutritionProgram: null,
    playStyle: 'Possession-based system that builds out of the back with quick combinations through the midfield. Pressing defense to win the ball high up the pitch.',
    programDescription: 'UMHB men\'s soccer is a growing program in the ASC, developing a competitive culture with strong local and international recruiting.',
    recentBowlGames: [],
    conferenceStanding: null,
  },
  {
    id: 'umhb-womens-soccer',
    schoolId: 'umhb-crusaders-001',
    name: 'Women\'s Soccer',
    gender: 'women',
    season: 'fall',
    division: 'NCAA D3',
    conference: 'American Southwest Conference',
    headCoach: 'Brad Bankston',
    record: '14-5-1 (2024)',
    ranking: null,
    offensiveScheme: null,
    defensiveScheme: null,
    offenseDescription: null,
    defenseDescription: null,
    strengthProgram: null,
    nutritionProgram: null,
    playStyle: 'Technical, possession-oriented system with an emphasis on wing play and crossing. Defensive shape is organized and compact.',
    programDescription: 'UMHB women\'s soccer has established itself as one of the top programs in the ASC, regularly advancing in conference tournament play.',
    recentBowlGames: [],
    conferenceStanding: null,
  },
  {
    id: 'umhb-volleyball',
    schoolId: 'umhb-crusaders-001',
    name: 'Volleyball',
    gender: 'women',
    season: 'fall',
    division: 'NCAA D3',
    conference: 'American Southwest Conference',
    headCoach: 'Stephanie Goodson',
    record: '22-9 (2024)',
    ranking: null,
    offensiveScheme: null,
    defensiveScheme: null,
    offenseDescription: null,
    defenseDescription: null,
    strengthProgram: null,
    nutritionProgram: null,
    playStyle: 'Fast-tempo 5-1 system with aggressive serving and a balanced attack through the middle and pins. Defense prioritizes controlled digs and quick transition offense.',
    programDescription: 'UMHB volleyball plays at the Mayborn Campus Center. The program is a perennial ASC contender with a strong tradition of developing all-conference players.',
    recentBowlGames: [],
    conferenceStanding: null,
  },

  // ── TAMUCC Sports ────────────────────────────────────────────────────────
  {
    id: 'tamucc-mens-basketball',
    schoolId: 'tamucc-islanders-001',
    name: 'Men\'s Basketball',
    gender: 'men',
    season: 'winter',
    division: 'NCAA D1',
    conference: 'Southland Conference',
    headCoach: 'Steve Lutz',
    record: '23-10 (2024-25)',
    ranking: null,
    offensiveScheme: 'Ball Screen Motion',
    defensiveScheme: 'Switching Man-to-Man',
    offenseDescription: 'The Islanders run a ball screen-heavy motion offense that generates open threes and drives to the rim. The system is predicated on guard play, pick-and-roll reads, and floor spacing.',
    defenseDescription: 'TAMUCC plays a switching man-to-man defense that emphasizes versatility — guards and forwards must be able to guard multiple positions. The scheme generates turnovers by trapping ball screens and rotating aggressively.',
    strengthProgram: 'The Islanders strength program is housed in the TAMUCC Athletics Performance Center and focuses on explosive power, agility, and injury prevention for basketball-specific movement patterns.',
    nutritionProgram: 'D1 student-athletes have access to a dedicated sports nutritionist, pre/post-game meal programs, and fueling stations at practice facilities.',
    playStyle: null,
    programDescription: 'The Islanders men\'s basketball program has emerged as one of the top mid-major programs in Texas, with back-to-back Southland Conference tournament championships and consecutive NCAA Tournament appearances. The program plays home games at the Hilliard Center Arena.',
    recentBowlGames: ['2025 NCAA Tournament (First Round)', '2024 NCAA Tournament (First Round Win vs SE Missouri State)', '2024 Southland Conference Tournament Champions', '2023 Southland Conference Tournament Champions'],
    conferenceStanding: '1st in Southland Conference',
  },
  {
    id: 'tamucc-womens-basketball',
    schoolId: 'tamucc-islanders-001',
    name: 'Women\'s Basketball',
    gender: 'women',
    season: 'winter',
    division: 'NCAA D1',
    conference: 'Southland Conference',
    headCoach: 'Royce Chadwick',
    record: '20-12 (2024-25)',
    ranking: null,
    offensiveScheme: null,
    defensiveScheme: null,
    offenseDescription: null,
    defenseDescription: null,
    strengthProgram: null,
    nutritionProgram: null,
    playStyle: 'Guard-oriented offense with quick ball movement and a focus on transition scoring. Defensively, the Islanders use a combination of zone and man-to-man based on opponent tendencies.',
    programDescription: 'TAMUCC women\'s basketball made history with their first-ever Southland Conference Championship in 2023, defeating Lamar to earn the program\'s first NCAA Tournament appearance. The team plays at the Hilliard Center Arena.',
    recentBowlGames: ['2023 NCAA Tournament (First Round)', '2023 Southland Conference Champions'],
    conferenceStanding: null,
  },
  {
    id: 'tamucc-baseball',
    schoolId: 'tamucc-islanders-001',
    name: 'Baseball',
    gender: 'men',
    season: 'spring',
    division: 'NCAA D1',
    conference: 'Southland Conference',
    headCoach: 'Scott Malone',
    record: '28-25 (2024)',
    ranking: null,
    offensiveScheme: null,
    defensiveScheme: null,
    offenseDescription: null,
    defenseDescription: null,
    strengthProgram: null,
    nutritionProgram: null,
    playStyle: 'Power-hitting lineup built around driving the ball to all fields. Pitching staff emphasizes velocity and a deep bullpen for high-leverage situations.',
    programDescription: 'TAMUCC baseball competes at Chapman Field and occasionally plays marquee games at Whataburger Field in downtown Corpus Christi. The program has produced multiple MLB draft picks and is a competitive force in the Southland Conference.',
    recentBowlGames: [],
    conferenceStanding: null,
  },
  {
    id: 'tamucc-softball',
    schoolId: 'tamucc-islanders-001',
    name: 'Softball',
    gender: 'women',
    season: 'spring',
    division: 'NCAA D1',
    conference: 'Southland Conference',
    headCoach: 'Carrie Leclair',
    record: '25-28 (2024)',
    ranking: null,
    offensiveScheme: null,
    defensiveScheme: null,
    offenseDescription: null,
    defenseDescription: null,
    strengthProgram: null,
    nutritionProgram: null,
    playStyle: 'Balanced approach at the plate with a mix of power and speed. The pitching circle features arms that rely on movement and location.',
    programDescription: 'TAMUCC softball competes at Chapman Field, sharing the complex with the baseball program. The team is building towards conference title contention.',
    recentBowlGames: [],
    conferenceStanding: null,
  },
  {
    id: 'tamucc-volleyball',
    schoolId: 'tamucc-islanders-001',
    name: 'Volleyball',
    gender: 'women',
    season: 'fall',
    division: 'NCAA D1',
    conference: 'Southland Conference',
    headCoach: 'Ryan Wingo',
    record: '24-8 (2024)',
    ranking: null,
    offensiveScheme: null,
    defensiveScheme: null,
    offenseDescription: null,
    defenseDescription: null,
    strengthProgram: null,
    nutritionProgram: null,
    playStyle: 'High-tempo 5-1 system built around a dominant outside attack and disruptive serving. The defense is anchored by elite libero play and disciplined blocking schemes.',
    programDescription: 'TAMUCC volleyball is one of the most decorated programs in the Southland Conference with five NCAA Tournament appearances and eight conference tournament titles. The team plays home matches at the Hilliard Center Arena.',
    recentBowlGames: ['2024 Southland Conference Tournament Champions', '2024 NCAA Tournament (First Round)'],
    conferenceStanding: '1st in Southland Conference',
  },
  {
    id: 'tamucc-womens-soccer',
    schoolId: 'tamucc-islanders-001',
    name: 'Women\'s Soccer',
    gender: 'women',
    season: 'fall',
    division: 'NCAA D1',
    conference: 'Southland Conference',
    headCoach: 'Nathan Thackeray',
    record: '10-7-3 (2024)',
    ranking: null,
    offensiveScheme: null,
    defensiveScheme: null,
    offenseDescription: null,
    defenseDescription: null,
    strengthProgram: null,
    nutritionProgram: null,
    playStyle: 'Possession-based buildup with an emphasis on technical skill and combination play. The team presses aggressively in the opponent\'s half to force turnovers.',
    programDescription: 'TAMUCC women\'s soccer plays on the island campus with views of Corpus Christi Bay — one of the most scenic settings in college soccer. The program recruits both domestically and internationally.',
    recentBowlGames: [],
    conferenceStanding: null,
  },
  {
    id: 'tamucc-womens-tennis',
    schoolId: 'tamucc-islanders-001',
    name: 'Women\'s Tennis',
    gender: 'women',
    season: 'spring',
    division: 'NCAA D1',
    conference: 'Southland Conference',
    headCoach: 'Steve Moore',
    record: '18-5 (2024)',
    ranking: null,
    offensiveScheme: null,
    defensiveScheme: null,
    offenseDescription: null,
    defenseDescription: null,
    strengthProgram: null,
    nutritionProgram: null,
    playStyle: 'Aggressive baseline play with strong international recruiting producing powerful groundstroke-based games and excellent doubles chemistry.',
    programDescription: 'TAMUCC women\'s tennis is one of the most dominant programs in the Southland Conference and made the NCAA Championships four consecutive years (2021-2024) — a feat accomplished by only 34 Division I schools in the country. The team is the winningest program in Southland Conference history.',
    recentBowlGames: ['2024 NCAA Championships', '2023 NCAA Championships', '2022 NCAA Championships', '2021 NCAA Championships'],
    conferenceStanding: '1st in Southland Conference',
  },
  {
    id: 'tamucc-mens-tennis',
    schoolId: 'tamucc-islanders-001',
    name: 'Men\'s Tennis',
    gender: 'men',
    season: 'spring',
    division: 'NCAA D1',
    conference: 'Southland Conference',
    headCoach: 'Steve Moore',
    record: '15-8 (2024)',
    ranking: null,
    offensiveScheme: null,
    defensiveScheme: null,
    offenseDescription: null,
    defenseDescription: null,
    strengthProgram: null,
    nutritionProgram: null,
    playStyle: 'Serve-and-volley specialists combined with baseline counterpunchers create a diverse lineup that adapts to any opponent.',
    programDescription: 'TAMUCC men\'s tennis is the winningest program in Southland Conference history alongside the women\'s team, and made the 2023 NCAA Championships.',
    recentBowlGames: ['2023 NCAA Championships'],
    conferenceStanding: null,
  },
  {
    id: 'tamucc-beach-volleyball',
    schoolId: 'tamucc-islanders-001',
    name: 'Beach Volleyball',
    gender: 'women',
    season: 'spring',
    division: 'NCAA D1',
    conference: 'Southland Conference',
    headCoach: 'Ryan Wingo',
    record: '14-10 (2024)',
    ranking: null,
    offensiveScheme: null,
    defensiveScheme: null,
    offenseDescription: null,
    defenseDescription: null,
    strengthProgram: null,
    nutritionProgram: null,
    playStyle: 'Athletic, scrappy pairs that rely on defense and ball control. The island location gives the team a true home-sand advantage.',
    programDescription: 'TAMUCC beach volleyball plays home matches on the island\'s sand courts with Corpus Christi Bay as the backdrop — one of the most unique settings in all of college athletics.',
    recentBowlGames: [],
    conferenceStanding: null,
  },
  {
    id: 'tamucc-track-field',
    schoolId: 'tamucc-islanders-001',
    name: 'Track & Field',
    gender: 'coed',
    season: 'spring',
    division: 'NCAA D1',
    conference: 'Southland Conference',
    headCoach: 'Josh Harrison',
    record: null,
    ranking: null,
    offensiveScheme: null,
    defensiveScheme: null,
    offenseDescription: null,
    defenseDescription: null,
    strengthProgram: null,
    nutritionProgram: null,
    playStyle: null,
    programDescription: 'TAMUCC track & field competes in both indoor and outdoor seasons. The women\'s cross country team has won seven of nine conference titles — the most by any Texas university.',
    recentBowlGames: [],
    conferenceStanding: null,
  },
  {
    id: 'tamucc-womens-golf',
    schoolId: 'tamucc-islanders-001',
    name: 'Women\'s Golf',
    gender: 'women',
    season: 'spring',
    division: 'NCAA D1',
    conference: 'Southland Conference',
    headCoach: 'Kirk Edwards',
    record: null,
    ranking: null,
    offensiveScheme: null,
    defensiveScheme: null,
    offenseDescription: null,
    defenseDescription: null,
    strengthProgram: null,
    nutritionProgram: null,
    playStyle: null,
    programDescription: 'TAMUCC women\'s golf benefits from year-round practice weather on the Texas Gulf Coast and competes in the Southland Conference.',
    recentBowlGames: [],
    conferenceStanding: null,
  },
];
```

### B3. Replace `src/data/seed-roster.ts`

Create rosters for EACH sport at each school. Include at least 15 players per major sport (football gets a full ~50+). Use `sportId` field to link each player to their sport.

For football (UMHB), create a full D3 roster with real-style Texas high school towns as hometowns. For basketball (both schools), create 15-player rosters. For other sports, create 12-15 player rosters.

Example structure:
```typescript
export const seedRosterPlayers = [
  // UMHB Football
  { schoolId: 'umhb-crusaders-001', sportId: 'umhb-football', name: 'Jaxon Williams', number: 7, position: 'QB', height: '6-2', weight: 205, year: 'SR', hometown: 'Belton', state: 'TX', highSchool: 'Belton High School', isStarter: true },
  { schoolId: 'umhb-crusaders-001', sportId: 'umhb-football', name: 'Marcus Thompson', number: 22, position: 'RB', height: '5-10', weight: 195, year: 'JR', hometown: 'Temple', state: 'TX', highSchool: 'Temple High School', isStarter: true },
  // ... continue with full roster (50+ football, 15 basketball, 12-15 per other sport)

  // TAMUCC Men's Basketball (NO football — this is the primary sport)
  { schoolId: 'tamucc-islanders-001', sportId: 'tamucc-mens-basketball', name: 'Trevian Tennyson', number: 1, position: 'PG', height: '6-1', weight: 180, year: 'SR', hometown: 'Houston', state: 'TX', highSchool: 'Westbury Christian', isStarter: true },
  // ... continue for all TAMUCC sports
];
```

Generate realistic rosters — use Texas high school names, realistic heights/weights for each sport, and a mix of FR/SO/JR/SR class years. Starters should be marked. Make at least 200 total roster entries across both schools.

### B4. Replace `src/data/seed-academics-ttu.ts` → `src/data/seed-academics-umhb.ts`

Create UMHB academics data:
- Enrollment: 3,800
- Admission rate: 0.74 (74%)
- SAT avg: 1120, ACT avg: 23
- Tuition in-state: $32,430, out-of-state: $32,430 (private — same rate)
- Graduation rate: 0.56
- Athlete graduation rate: 0.72
- Student-to-faculty ratio: 17
- Colleges: Nursing, Education, Business, Sciences, Humanities, etc.
- Majors per college: 4-6 realistic majors with degree pathways and career outcomes

### B5. Replace `src/data/seed-academics-ou.ts` → `src/data/seed-academics-tamucc.ts`

Create TAMUCC academics data:
- Enrollment: 11,266
- Admission rate: 0.91 (91%)
- SAT avg: 1080, ACT avg: 22
- Tuition in-state: $10,542, out-of-state: $22,050
- Graduation rate: 0.43
- Athlete graduation rate: 0.65
- Student-to-faculty ratio: 19
- Colleges: Science & Engineering, Nursing, Business, Liberal Arts, Education
- Notable program: Marine Biology (nationally recognized)
- Majors per college: 4-6 realistic majors with degree pathways and career outcomes

### B6. Replace `src/data/seed-alumni.ts`

For UMHB, create notable alumni across sports (not just NFL — D3 rarely produces pro athletes, so focus on coaching careers, All-Americans, national championship MVPs). Adjust the `NotableAlumni` model usage:
- Use `proTeam` instead of `nflTeam`
- Use `sportId` to link to the relevant sport
- For D3, "draft" fields can be 0 since they aren't drafted — use them for All-American years instead, or set draftRound/draftPick to 0

For TAMUCC, create notable alumni across basketball, baseball, tennis, volleyball. Include any athletes who went pro or had notable careers.

### B7. Replace `src/data/seed-nil.ts`

UMHB NIL: D3 schools have limited NIL activity. Create a modest NIL program reflecting the D3 reality — local business partnerships, social media deals, smaller collective.

TAMUCC NIL: D1 school with growing NIL. Create a realistic Southland Conference level NIL program — moderate budget, collective focused on basketball and volleyball.

Set `primarySportSpend` and `primarySportName` for TAMUCC (basketball).

### B8. Create `src/data/seed-brand-deals.ts`

New file with Influxor brand partner and deal data:

```typescript
export const seedBrandPartners = [
  { id: 'bp-marucci', slug: 'marucci', name: 'Marucci', category: 'apparel', logoUrl: '/images/brands/marucci.png', websiteUrl: 'https://maruccisports.com', description: 'Premium baseball and softball equipment trusted by elite athletes at every level.' },
  { id: 'bp-deoblock', slug: 'deoblock', name: 'DeoBlock', category: 'wellness', logoUrl: '/images/brands/deoblock.png', websiteUrl: 'https://deoblock.com', description: 'Natural deodorant and body care products designed for active lifestyles.' },
  { id: 'bp-fanspark', slug: 'fanspark', name: 'FanSpark', category: 'tech', logoUrl: '/images/brands/fanspark.png', websiteUrl: 'https://fanspark.com', description: 'Fan engagement platform connecting athletes with their audiences.' },
  { id: 'bp-goat-coats', slug: 'goat-coats', name: 'GOAT Coats', category: 'apparel', logoUrl: '/images/brands/goat-coats.png', websiteUrl: 'https://goatcoats.com', description: 'Premium athletic outerwear for the greatest of all time.' },
  { id: 'bp-cellev8', slug: 'cellev8', name: 'Cellev8', category: 'nutrition', logoUrl: '/images/brands/cellev8.png', websiteUrl: 'https://cellev8.com', description: 'Cellular-level hydration and recovery supplements for peak performance.' },
  { id: 'bp-hny-plus', slug: 'hny-plus', name: 'HNY+', category: 'nutrition', logoUrl: '/images/brands/hny-plus.png', websiteUrl: 'https://hnyplus.com', description: 'Honey-based performance nutrition and natural energy products.' },
  { id: 'bp-revomadic', slug: 'revomadic', name: 'Revomadic', category: 'lifestyle', logoUrl: '/images/brands/revomadic.png', websiteUrl: 'https://revomadic.com', description: 'Modern lifestyle brand for athletes who live on the move.' },
  { id: 'bp-dive-coastal', slug: 'dive-coastal-cuisine', name: 'Dive Coastal Cuisine', category: 'food', logoUrl: '/images/brands/dive-coastal.png', websiteUrl: 'https://divecoastalcuisine.com', description: 'Fresh coastal cuisine and meal options for athletes.' },
  { id: 'bp-chopshop', slug: 'original-chopshop', name: 'Original ChopShop', category: 'food', logoUrl: '/images/brands/chopshop.png', websiteUrl: 'https://originalchopshop.com', description: 'Fast-casual restaurant serving protein bowls, juices, and healthy meals designed for active lifestyles.' },
];

export const seedSchoolBrandDeals = [
  // UMHB deals (all 9 brands)
  { schoolId: 'umhb-crusaders-001', brandPartnerId: 'bp-marucci', dealText: 'CUSTOMIZED PRICING VIA LINK', promoUrl: 'https://maruccisports.com/umhb', isActive: true, isFeatured: true, sortOrder: 1 },
  { schoolId: 'umhb-crusaders-001', brandPartnerId: 'bp-deoblock', dealText: '20% OFF ALL PRODUCTS FOR ALL ATHLETES', promoCode: 'UMHB20', isActive: true, isFeatured: false, sortOrder: 2 },
  { schoolId: 'umhb-crusaders-001', brandPartnerId: 'bp-fanspark', dealText: 'BETA ACCESS', isActive: true, isFeatured: false, sortOrder: 3 },
  { schoolId: 'umhb-crusaders-001', brandPartnerId: 'bp-goat-coats', dealText: 'ENJOY 20% OFF YOUR FIRST GOAT COAT PURCHASE!', promoCode: 'CRU20', isActive: true, isFeatured: true, sortOrder: 4 },
  { schoolId: 'umhb-crusaders-001', brandPartnerId: 'bp-cellev8', dealText: 'EXCLUSIVE ATHLETE PRICING', isActive: true, isFeatured: false, sortOrder: 5 },
  { schoolId: 'umhb-crusaders-001', brandPartnerId: 'bp-hny-plus', dealText: '20% OFF STANDARD FOR ANY ATHLETE', promoCode: 'CRU20', isActive: true, isFeatured: false, sortOrder: 6 },
  { schoolId: 'umhb-crusaders-001', brandPartnerId: 'bp-revomadic', dealText: '15% OFF TO ALL ATHLETES', promoCode: 'CRU15', isActive: true, isFeatured: false, sortOrder: 7 },
  { schoolId: 'umhb-crusaders-001', brandPartnerId: 'bp-dive-coastal', dealText: '25% OFF', promoCode: 'CRU25', isActive: true, isFeatured: false, sortOrder: 8 },
  { schoolId: 'umhb-crusaders-001', brandPartnerId: 'bp-chopshop', dealText: '5% OFF, MUST BE A REGISTERED LOYALTY GUEST', isActive: true, isFeatured: false, sortOrder: 9 },

  // TAMUCC deals (all 9 brands)
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

### B9. Update `src/data/seed-videos.ts`

Replace Texas Tech/Oklahoma videos with UMHB and TAMUCC videos. Use placeholder YouTube URLs. Include:
- UMHB: Football coach intro, football highlights, basketball highlights, campus day-in-life
- TAMUCC: Basketball coach intro, basketball highlights, volleyball highlights, campus day-in-life, beach volleyball showcase

### B10. Update `src/data/seed-jerseys.ts`

Replace with UMHB (purple/gold/white jerseys) and TAMUCC (blue/green/silver jerseys) assets. Use placeholder image URLs in `/images/schools/{slug}/jerseys/`.

### B11. Update `prisma/seed.ts`

Update the main seed file to:
1. Import from the new/renamed seed data files
2. Delete all existing data before seeding (in correct order to respect foreign keys)
3. Seed in this order: schools → academics → sports → coaches → facilities → roster players → alumni → NIL → NIL visibility → videos → jerseys → brand partners → school brand deals
4. Use the new `sportId` fields when seeding roster players and alumni
5. Seed brand partners and school brand deals

Run the seed:
```bash
npx prisma db seed
```

---

## PHASE C: Athletics Section Refactor

### C1. Rewrite `src/components/school/athletics-tab.tsx`

The current component assumes a single football sport. Rewrite it to support ANY sport at the school.

**New behavior:**
1. Accept `sports: Sport[]` (with coaches, rosterPlayers, facilities included)
2. Accept `defaultSportId?: string` (from the recruit's profile sport, if it matches a sport at this school)
3. Render a **sport selector** at the top — horizontal pill tabs showing all available sports
4. When a sport is selected, show that sport's data below:
   - Sport header (name, conference, record, ranking, division)
   - Play style / scheme section (use `offensiveScheme`/`defensiveScheme` for football/basketball, `playStyle` for everything else)
   - Coaching staff (head coach + assistants from Coach model)
   - Program description
   - Player development (strength & nutrition — if available for that sport)
   - Recent achievements (`recentBowlGames` — renamed conceptually to "Recent Achievements" in the UI)
5. School colors drive all accent colors via CSS custom properties (already in place)
6. Default selected sport: if `defaultSportId` is provided and exists at this school, select it. Otherwise select the first sport alphabetically.

**Sport selector UI:**
- Horizontal scrollable row of pill buttons
- Each pill shows sport name + gender indicator if needed (e.g., "Men's Basketball", "Women's Soccer")
- Active pill uses `var(--school-primary)` background with white text
- Inactive pills use subtle background with regular text
- On mobile, the row scrolls horizontally with overflow

### C2. Update roster section

**File:** `src/components/school/roster-section.tsx`

Update the roster component to:
1. Accept a `sportId` filter
2. Only show players for the currently selected sport
3. Adjust column display per sport type:
   - Football/basketball: show number, position, height, weight, year
   - Baseball/softball: show number, position, height, weight, year, hometown
   - Soccer/volleyball/tennis: show number, position, year, hometown
4. The roster section should react to the sport selected in the Athletics tab above it. Pass the selected sport down from the school detail page via state or context.

### C3. Update alumni section

**File:** `src/components/school/alumni-tab.tsx`

Update to:
1. Accept `sportId` filter (optional — if provided, filter alumni by sport)
2. Rename "NFL Team" display to "Pro Team" to support any league
3. Handle D3 alumni who weren't drafted — show "All-American" or "National Champion" badges instead of draft info
4. Show sport name next to each alum if multiple sports have alumni

### C4. Update the school detail page

**File:** `src/app/(platform)/recruit/school/[slug]/page.tsx`

1. Add state management for selected sport:
```typescript
'use client' // This page needs to become a client component, OR create a wrapper client component

const [selectedSportId, setSelectedSportId] = useState<string | null>(null);
```

2. Pass `selectedSportId` and `setSelectedSportId` to the Athletics tab
3. Pass `selectedSportId` to the Roster section so it filters by sport
4. Pass `selectedSportId` to the Alumni section for sport filtering
5. Fetch the recruit's profile sport to determine `defaultSportId`
6. Add the new "Deals" section (see Phase D)

**Important:** If converting the page to a client component is too disruptive, instead create a `SchoolPageClient` wrapper component that manages the sport selection state and wraps the existing sections. The data fetching stays in the server component page.tsx, and the client wrapper handles interactivity.

### C5. Rename UI labels

Throughout the codebase, rename:
- "Football" section label → "Athletics" in the section navigator
- "NFL Team" → "Pro Team" in alumni displays
- "Bowl Games" → "Recent Achievements" in athletics display
- "Stadium Capacity" → keep it but only show if `school.stadiumCapacity` exists (TAMUCC has none)
- "Game Day Experience" → keep but only render if `school.gameDayDescription` exists

---

## PHASE D: Brand Deals Section

### D1. Create `src/components/school/deals-section.tsx`

New component that displays brand partnership deals powered by Influxor.

**Props:**
```typescript
interface DealsSectionProps {
  deals: (SchoolBrandDeal & { brandPartner: BrandPartner })[];
  schoolColors: { primary: string; secondary: string; accent: string };
}
```

**Layout:**
1. Section header: "Athlete Deals & Discounts" with a small "Powered by Influxor" badge (subtle, bottom-right of header)
2. Responsive card grid: 3 columns desktop, 2 tablet, 1 mobile
3. Each deal card shows:
   - Brand logo (or placeholder icon if no logo)
   - Brand name
   - Deal text in school's primary color (bold, uppercase like Influxor's UI)
   - Category badge (small pill: "Apparel", "Nutrition", etc.)
   - "Redeem" button (links to `promoUrl` if available, otherwise disabled with "Coming Soon" text)
4. Featured deals (`isFeatured: true`) get a subtle highlighted border using `var(--school-primary)`
5. Cards have a dark background with light text (matching OVV's immersive dark aesthetic per school page)
6. If no deals exist for this school, show a "Coming Soon" empty state with Influxor branding

**Analytics tracking:**
- Track `section: 'deals'`, `action: 'view'` when the section enters viewport
- Track `section: 'deals'`, `action: 'click_deal'`, `metadata: { brandId, brandName }` when a recruit clicks a deal card or redeem button

### D2. Add API route for brand deals

**File:** `src/app/api/schools/[slug]/deals/route.ts`

GET endpoint that returns brand deals for a school:
```typescript
export async function GET(req: Request, { params }: { params: { slug: string } }) {
  const school = await prisma.school.findUnique({
    where: { slug: params.slug },
    select: {
      id: true,
      brandDeals: {
        where: { isActive: true },
        orderBy: { sortOrder: 'asc' },
        include: { brandPartner: true },
      },
    },
  });
  if (!school) return NextResponse.json({ error: 'School not found' }, { status: 404 });
  return NextResponse.json(school.brandDeals);
}
```

Or, if the school detail page already fetches all data in a server component, just include `brandDeals` in the existing school query and pass them to the deals section component. Prefer server-side data fetching.

---

## PHASE E: Section Navigator Update

### E1. Update `src/components/school/section-navigator.tsx`

Change the sections array:
```typescript
const sections = [
  { id: 'tour', label: 'Tour', icon: Map },
  { id: 'athletics', label: 'Athletics', icon: Trophy },    // was "football"
  { id: 'academics', label: 'Academics', icon: GraduationCap },
  { id: 'nil', label: 'NIL', icon: DollarSign },
  { id: 'deals', label: 'Deals', icon: Tag },               // NEW — add Tag import from lucide-react
  { id: 'roster', label: 'Roster', icon: Users },
  { id: 'alumni', label: 'Alumni', icon: Award },
  { id: 'jersey', label: 'Jersey', icon: Shirt },
  { id: 'video', label: 'Video', icon: Play },
];
```

### E2. Update section IDs on the school detail page

In the school detail page, update the section wrapper `id` attributes:
- `id="football"` → `id="athletics"`
- Add `id="deals"` wrapper around the new DealsSection component

---

## PHASE F: Product Spec & Documentation Updates

### F1. Update `CLAUDE.md`

Replace all references to "football" as the sole sport. Update:
- Project Overview: "all sports" not "college football"
- Test schools: UMHB and TAMUCC (not Texas Tech and Oklahoma)
- Note the Brand Deals feature and Influxor integration
- Add `BrandPartner` and `SchoolBrandDeal` to the data model list

### F2. Update `OVV-PRODUCT-SPEC.md`

- Section 1.1 Mission: Update to all-sports
- Section 3.4: Add Deals section to the school detail page sections list
- Add new section documenting Brand Partnership feature
- Update data model section with new/modified models
- Update seed school references

### F3. Update onboarding

**File:** `src/components/recruit/onboarding-wizard.tsx`

The Sport field in onboarding should offer a dropdown with ALL sports, not just "Football":
```typescript
const sportOptions = [
  'Football', 'Men\'s Basketball', 'Women\'s Basketball',
  'Baseball', 'Softball', 'Men\'s Soccer', 'Women\'s Soccer',
  'Volleyball', 'Men\'s Tennis', 'Women\'s Tennis',
  'Track & Field', 'Cross Country', 'Golf',
  'Beach Volleyball', 'Swimming & Diving', 'Wrestling',
  'Lacrosse', 'Field Hockey', 'Other',
];
```

---

## PHASE G: Verification

After completing all phases, verify:

1. **Schema:** Run `npx prisma validate` — no errors
2. **Types:** Run `npx tsc --noEmit` — no TypeScript errors
3. **Seed:** Run `npx prisma db seed` — all data seeds successfully
4. **School pages:** Both `/recruit/school/umhb` and `/recruit/school/tamucc` render with correct branding colors
5. **Athletics section:** Sport selector shows all sports for each school. TAMUCC has NO football tab. UMHB has football + other sports.
6. **Roster:** Filters by selected sport. Shows appropriate columns per sport type.
7. **Brand Deals:** Shows 9 brand partner cards with deal text for both schools
8. **Section Navigator:** Shows 9 sections including "Athletics" (not "Football") and "Deals"
9. **Dark mode:** All new components support dark/light mode via next-themes
10. **Analytics:** Deal clicks are tracked. Sport selection changes are tracked.
11. **Mobile:** Sport selector scrolls horizontally. Deal cards stack to 1 column. Section navigator shows all 9 icons.

---

## FILE CHECKLIST

Files to CREATE:
- [ ] `src/data/seed-academics-umhb.ts`
- [ ] `src/data/seed-academics-tamucc.ts`
- [ ] `src/data/seed-brand-deals.ts`
- [ ] `src/components/school/deals-section.tsx`
- [ ] `src/app/api/schools/[slug]/deals/route.ts` (optional if using server component data)
- [ ] `public/images/schools/umhb/` directory (placeholder logos)
- [ ] `public/images/schools/tamucc/` directory (placeholder logos)
- [ ] `public/images/brands/` directory (placeholder brand logos)

Files to MODIFY:
- [ ] `prisma/schema.prisma` — Sport, RosterPlayer, NotableAlumni, NilProgram, School (add brandDeals relation), new BrandPartner + SchoolBrandDeal models
- [ ] `src/data/seed-schools.ts` — Replace Texas Tech/OU with UMHB/TAMUCC
- [ ] `src/data/seed-athletics.ts` — Complete rewrite for all sports at both schools
- [ ] `src/data/seed-roster.ts` — Complete rewrite with sportId per player
- [ ] `src/data/seed-alumni.ts` — Replace with UMHB/TAMUCC alumni, add sportId
- [ ] `src/data/seed-nil.ts` — Replace with UMHB/TAMUCC NIL programs
- [ ] `src/data/seed-videos.ts` — Replace with UMHB/TAMUCC videos
- [ ] `src/data/seed-jerseys.ts` — Replace with UMHB/TAMUCC jersey assets
- [ ] `prisma/seed.ts` — Update imports and seed order, add brand deals seeding
- [ ] `src/components/school/athletics-tab.tsx` — Multi-sport refactor with sport selector
- [ ] `src/components/school/roster-section.tsx` — Sport-filtered roster
- [ ] `src/components/school/alumni-tab.tsx` — Multi-sport alumni, proTeam rename
- [ ] `src/components/school/section-navigator.tsx` — Add Deals, rename Football → Athletics
- [ ] `src/app/(platform)/recruit/school/[slug]/page.tsx` — Sport selection state, Deals section, section ID updates
- [ ] `src/components/recruit/onboarding-wizard.tsx` — All-sports dropdown
- [ ] `CLAUDE.md` — Update project description
- [ ] `OVV-PRODUCT-SPEC.md` — Update spec for all-sports + brand deals

Files to DELETE (or fully replace):
- [ ] `src/data/seed-academics-ttu.ts` → replaced by `seed-academics-umhb.ts`
- [ ] `src/data/seed-academics-ou.ts` → replaced by `seed-academics-tamucc.ts`

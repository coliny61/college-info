# OVV (Official Virtual Visit) — Product Specification

**Version:** 2.0
**Date:** March 23, 2026
**Status:** Target State — Implementation Ready

---

## 1. Product Overview

### 1.1 Mission
OVV replicates the official college visit experience virtually for ALL college sports. High school seniors, transfers, and their families can explore any athletic program at the collegiate level through immersive 360° content, detailed program profiles, and interactive features. For coaches, OVV provides deep behavioral analytics on recruit engagement so they can personalize the real in-person official visit. Test schools: UMHB (D3, 8 sports) and TAMUCC (D1, 11 sports, no football).

### 1.2 Core Value Propositions
- **For Recruits:** Explore any college football program from home — 360° tours, coaching staff intel, NIL details, academics, day-in-the-life content — like being on campus without the plane ticket.
- **For Coaches:** See exactly what each recruit cares about. AI-generated insights tell coaches how to personalize the real visit ("This recruit spent 8 min on NIL and explored business majors — highlight Spears Business School").
- **For Schools:** A premium digital recruiting tool that differentiates their program, extends reach to recruits nationwide, and provides data-driven insights for recruiting strategy.

### 1.3 Tech Stack
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Database:** PostgreSQL via Supabase
- **ORM:** Prisma 7
- **Auth:** Supabase Auth
- **Styling:** Tailwind CSS 4 + shadcn/ui
- **360° Viewer:** Three.js / Photo Sphere Viewer (equirectangular projection)
- **Charts:** Recharts
- **Deployment:** Vercel
- **Mobile (future):** React Native

---

## 2. User Roles & Access Model

### 2.1 Roles

| Role | Description | Access |
|------|-------------|--------|
| `recruit` | High school senior or transfer portal player exploring programs | Browse schools, view all content, build jerseys, manage favorites, complete profile |
| `coach_admin` | Coaching staff or athletic department personnel at a subscribing school | Manage school content, view analytics dashboard, CRM features, recruit search, invite links |

### 2.2 Access Model
- **Recruits:** Open signup (email + password via Supabase Auth). Can also enter via coach-generated invite links.
- **Coaches:** Account created during school onboarding. Tied to a specific `School` record.
- **No free tier for schools** — every school pays. Recruits are always free.

### 2.3 Invite Link System
- Coaches generate unique invite links from their dashboard.
- Each link has: unique code, optional expiration date, usage counter.
- When a recruit signs up via invite link, the system records which school/coach invited them.
- Invited recruits get a **personalized welcome experience** (see Section 4.3).

---

## 3. Recruit Experience

### 3.1 Signup & Onboarding Flow

#### 3.1.1 Standard Signup (No Invite)
```
Landing Page → "Get Started" CTA → Signup Form → Onboarding Wizard → Dashboard
```

**Signup Form Fields:**
- Email (required)
- Password (required)
- Display Name (required)

**Onboarding Wizard — Single Page with Sections:**

Required fields (must complete to proceed):
- Sport (default: Football)
- Graduation Year

Optional fields (with profile completeness bar):
- Position
- Height / Weight
- GPA
- SAT Score / ACT Score
- High School name
- City / State
- Bio (text area)
- Highlights URL (video link)

**Profile Completeness Bar:**
- Displayed prominently on the recruit dashboard and profile page.
- Shows percentage complete with encouraging copy:
  - 0-25%: "Complete your profile so coaches can find you"
  - 26-50%: "You're getting there — add your stats"
  - 51-75%: "Almost done — coaches love seeing highlights"
  - 76-99%: "Just a few more details!"
  - 100%: "Profile complete — you're ready"
- Completeness calculation: each field has a weight. Sport + grad year = 15%, position = 10%, height/weight = 10%, GPA = 10%, test scores = 10%, high school/location = 10%, bio = 15%, highlights = 20%. Total = 100%.

#### 3.1.2 Transfer Portal Signup
Same flow as standard, but with additional profile fields:
- **Current/Previous School** (text)
- **College Stats** (text area — rushing yards, passing TDs, etc.)
- **Eligibility Remaining** (dropdown: 1 year, 2 years, 3 years, 4 years)
- **Transfer Reason** (optional text — "seeking more playing time", "coaching change", etc.)
- **Recruit Type** toggle: "High School" or "Transfer" — selected during onboarding, determines which extra fields appear.

#### 3.1.3 Invite Link Signup
```
Invite URL → Signup Form (pre-tagged with school) → Onboarding Wizard → Personalized Welcome Screen → School Page
```

The invite code is captured from the URL and stored. After onboarding, instead of going to the dashboard, the recruit sees the **Personalized Welcome Screen** for the inviting school.

### 3.2 Recruit Dashboard

The main hub after login. Contains:

1. **Profile Summary Card** — Name, position, grad year, school, profile completeness bar. Link to edit profile.
2. **Recently Viewed Schools** — Horizontal scroll of school cards the recruit has visited recently (stored client-side + synced to analytics).
3. **Favorited Schools** — Quick access to bookmarked schools.
4. **Browse Schools CTA** — Prominent button/link to the school browsing page.

### 3.3 School Browsing Page

**Layout:** Grid of school cards.

**Each School Card Shows:**
- School logo
- School name + mascot
- Conference
- City, State
- Primary color accent stripe
- Quick stats: Head coach name, record, NIL budget range

**Filters (Basic):**
- Conference (multi-select dropdown)
- State (multi-select dropdown)
- Division (FBS, FCS, D2, D3)

**Sorting:**
- Alphabetical (default)
- Recently added
- Conference

**Search:** Text search by school name.

### 3.4 School Detail Page — Immersive Scroll Experience

When a recruit opens a school page, the **entire page adopts the school's branding** — primary color, secondary color, accent color applied to backgrounds, headers, buttons, highlights, and borders.

**Layout:** Not tabs — a single immersive scrollable page with distinct sections. Each section has a clear entry point and visual separation. The recruit can also use a **sticky floating navigation** to jump between sections.

**Sticky Section Navigator:**
- Fixed to the side or bottom of the screen.
- Shows icons/labels for each section: Tour, Football, Academics, NIL, Roster, Alumni, Jersey Room.
- Highlights the current section based on scroll position.
- Clicking jumps to that section with smooth scroll.

#### 3.4.1 School Header (Top of Page)
- School logo (large)
- School name + mascot
- Conference badge
- City, State
- Favorite button (heart icon — toggle)
- School's primary color as background gradient

#### 3.4.2 Section: Virtual Tour (360°)
**The immersive centerpiece of OVV.**

**Content:**
- 360° spherical panoramas (equirectangular photos) of football-focused facilities
- 360° video walkthroughs where available
- Hotspot-based navigation between adjacent locations

**Required POIs (every school must have):**
- Stadium (exterior + interior)
- Locker room
- Weight room / Performance center
- Practice facility

**Recommended Additional POIs:**
- Film room
- Training / Sports medicine room
- Players' lounge
- Nutrition center / Dining
- Academic center for athletes
- Recruiting lounge

**Navigation within Tour:**
1. **In-panorama hotspot arrows** — Clickable arrows/door icons within the 360° view that transition to adjacent locations (e.g., walking from locker room → weight room).
2. **Thumbnail strip** — Horizontal strip along the bottom showing all POI thumbnails. Click any to jump directly.
3. **Mini campus map overlay** — Small interactive map in the corner with pins for each POI. Click a pin to teleport there. Can expand to full screen.

**360° Viewer Requirements:**
- True spherical/equirectangular projection (NOT the current 2D drag-pan).
- Mouse/touch drag to look around in all directions.
- Scroll/pinch to zoom.
- Autorotate option (slow pan when idle).
- Fullscreen mode.
- Hotspot rendering: pins with labels that face the camera.
- Transition animations between panoramas (fade or fly-through).
- Mobile: gyroscope support for look-around on phone.

**360° Video:**
- Plays within the same spherical viewer.
- Standard video controls (play, pause, scrub).
- Spatial audio if available.

#### 3.4.3 Section: Football Program

**Coaching Staff:**
- Head coach card (large): photo, name, title, career record, years at school, championships, awards, NFL players developed.
- Coaching staff grid: each assistant coach with photo, name, title, bio, years at school, career highlights, previous roles.
- **Key stat emphasis:** NFL player production count, win/loss record, championship appearances/wins, coaching tree (notable coaches they trained under or coached with).

**Scheme & Philosophy:**
- Offensive scheme name + description (e.g., "Air Raid — a pass-heavy spread offense that...")
- Defensive scheme name + description (e.g., "4-2-5 — an aggressive, blitz-heavy defense that...")
- Visual diagrams or descriptions of how recruits fit into the system.

**Player Development:**
- Strength & conditioning program overview.
- Nutrition program details.
- Sports science / recovery technology.
- Walk-on to starter stories (if available).
- Player testimonials.

**Game Day Experience:**
- Stadium capacity, atmosphere description.
- Traditions.
- Fan engagement.

**Performance Stats:**
- Current season record.
- Conference standing / ranking.
- Recent bowl game appearances.
- Historical highlights.

#### 3.4.4 Section: Academics

**Lead with Athlete-Specific Stats (top of section):**
- Athlete graduation rate (GSR)
- Academic support services description
- Tutoring hours available
- Study hall requirements
- Academic center for athletes (link to 360° tour POI if available)
- Student-to-faculty ratio

**School-Wide Academic Stats:**
- Total enrollment
- Overall admission rate
- Average SAT / ACT
- Tuition (in-state / out-of-state)
- Overall graduation rate
- Median earnings post-graduation
- Retention rate
- National ranking (if applicable)

**Colleges & Majors (Drill-Down):**
- List of colleges within the university (e.g., Spears School of Business, College of Engineering).
- Each college: name, description, total students, image.
- Within each college: list of majors.
- Each major: name, degree type, description.
- **Degree Pathway:** Year-by-year course plan (Year 1 → Year 4) with key courses and descriptions.
- **Career Outcomes:** Job titles, median salary, growth rate, description for each major.

#### 3.4.5 Section: NIL (Name, Image, Likeness)

**Displayed Information (school controls visibility of each field):**
- Collective name
- Year founded
- Total NIL budget
- Football-specific allocation
- All-sports allocation
- Average deal size (derived or entered)
- Notable deals (JSON — list of deal examples with description and approximate value)
- Description of the collective and how it operates
- How recruits can get involved

**School Control Panel (Coach Admin):**
Each field has a visibility toggle: Public / Invite-Only / Hidden.
- **Public:** All recruits can see.
- **Invite-Only:** Only recruits who received an invite from this school can see.
- **Hidden:** Not displayed at all.

#### 3.4.6 Section: Roster

**Full Team Roster:**
- Sortable/filterable table or card grid.
- Each player: name, number, position, height, weight, year, hometown/state, high school, photo.
- Starter badge for starters.
- Filter by position group (QB, RB, WR, OL, DL, LB, DB, Special Teams).

#### 3.4.7 Section: Notable Alumni

**NFL Draft History / Pro Alumni:**
- Cards sorted by draft year (most recent first).
- Each: name, position, draft year, draft round/pick, NFL team, career highlights.
- Badge for first-round picks.
- Active vs. retired indicator.

#### 3.4.8 Section: Jersey Room

**Interactive Jersey Builder:**
- Visual canvas showing: helmet, jersey, pants — each independently selectable.
- **Asset Selector:** For each piece (helmet, jersey, pants), a strip of color options using the school's actual uniform assets.
- Real-time preview updates as pieces are selected.
- **Save Combo:** Saves the selection to the recruit's profile (linked to user + school).
- **Share Feature:**
  - Download as image (PNG) — composited jersey combo with school branding.
  - Share buttons: Twitter/X, Instagram.
  - Unique shareable URL with rich Open Graph meta tags (preview image of the jersey combo, school name, OVV branding).
- **Coach Notification:** When a recruit saves a jersey combo, this registers as a high-interest analytics event visible to the coach.

#### 3.4.9 Section: Video & Media

**Content Types:**
1. **Coach Intro Videos** — Head coach and position coaches record welcome/introduction videos. Embedded video player within the coaching staff section.
2. **Highlight Reels / Hype Videos** — Program highlight packages, game day atmosphere, big plays. Featured video player.
3. **Day-in-the-Life Content** — Current players sharing their daily routine: workouts, classes, meals, facilities, game day prep. Video gallery format.

**Video Player:**
- Embedded player (YouTube/Vimeo embed or self-hosted).
- Autoplay off, controls visible.
- Tracks view duration via analytics.

### 3.5 Favorites

- Simple bookmark list.
- Toggle favorite from the school header (heart icon).
- Accessible from the recruit dashboard.
- Shows school card for each favorited school.
- Can remove favorites.
- No comparison or notes feature (keep it simple).

### 3.6 Recruit Profile Page

**Editable Profile:**
- All fields from onboarding, editable at any time.
- Profile completeness bar.
- Transfer-specific fields if recruit type is "Transfer".
- Profile photo upload.
- **Visibility:** Full profile is visible to any coach who searches for recruits on the platform.

---

## 4. Coach Admin Experience

### 4.1 Coach Dashboard (Home)

**Overview Cards:**
- Total invited recruits
- Recruits who visited (completed at least one page view)
- Total engagement time across all recruits
- Top engaged recruit (highest engagement score)

**Recent Activity Feed:**
- "John Doe viewed your NIL page for 4 minutes" (timestamped)
- "Jane Smith saved a jersey combo" (timestamped)
- "3 new recruits visited your profile this week"

### 4.2 Analytics Dashboard

**The core product value for coaches.**

#### 4.2.1 Recruit Engagement Table
Sortable table showing all invited recruits:

| Column | Description |
|--------|-------------|
| Recruit Name | Links to recruit detail panel |
| Position | From recruit profile |
| Grad Year | From recruit profile |
| State | From recruit profile |
| Total Time | Total seconds/minutes spent on this school's pages |
| Sections Viewed | Icons or badges for which sections they visited |
| Engagement Score | 0-100 calculated score (see below) |
| Last Visit | Timestamp of most recent visit |
| Jersey Saved? | Yes/No badge |
| Favorited? | Yes/No badge |

#### 4.2.2 Engagement Score Calculation
Weighted score (0-100) based on:
- **Time spent** (30% weight): Total duration across all sections, normalized against average.
- **Section diversity** (20% weight): How many different sections they explored (tour, football, academics, NIL, roster, alumni, jersey).
- **Depth of engagement** (20% weight): Did they drill into sub-content (specific majors, specific coach bios, specific 360° POIs)?
- **High-intent actions** (30% weight): Favorited the school (+15), saved a jersey combo (+15), viewed NIL page for >2 min (+10), returned for a second session (+10).

Score tiers:
- 0-25: Low interest
- 26-50: Moderate interest
- 51-75: High interest
- 76-100: Very high interest (hot lead)

#### 4.2.3 AI-Generated Insights
For each recruit with engagement score >= 26 (Moderate interest or above), generate a natural-language insight:

**Format:**
> "[Recruit Name] spent [X minutes] on your program, focusing primarily on [top 2 sections]. They [specific notable actions]. **Suggestion:** [personalized recommendation for the in-person visit]."

**Examples:**
> "Marcus Johnson spent 12 minutes on your program, focusing primarily on NIL (5 min) and Academics (4 min). He explored 3 business majors and viewed your NIL collective details. **Suggestion:** During his in-person visit, connect him with your NIL collective leadership and arrange a Spears Business School tour."

> "Aiden Williams spent 8 minutes, almost entirely in the Football section (6 min). He read every coach bio and spent 2 minutes on your defensive scheme breakdown. He also saved a jersey combo. **Suggestion:** He's deeply interested in your coaching staff and scheme fit — have his position coach lead his visit and walk him through film."

**Implementation:** Server-side generation using structured analytics data. Can be pre-computed nightly or on-demand when coach views dashboard.

#### 4.2.4 Recruit Detail Panel
Clicking a recruit name opens a side panel or detail page:
- Recruit profile summary (name, position, year, school, GPA, highlights link)
- **Section-by-section time breakdown** (bar chart)
- **Specific content engaged:** which 360° POIs they visited, which majors they explored, which coach bios they read
- **Session timeline:** chronological list of events with timestamps and durations
- **AI insight** (same as dashboard, but more detailed)
- **CRM fields** (see 4.4)

### 4.3 Personalized Welcome Screen (Invite Flow)

When a coach invites a recruit and that recruit signs up, they see:

**Welcome Screen Layout:**
1. School logo + colors (full school branding)
2. "Welcome to [School Name] [Mascot]" headline
3. Coach photo + name + title
4. Optional: Embedded welcome video from the coach (uploaded by coach admin)
5. Personal text message from the coach (editable per invite or a default)
6. "Start Your Visit" CTA button → navigates to the school detail page

**Coach Admin Controls for Welcome:**
- Upload a welcome video (MP4, max 2 min)
- Write a default welcome message
- Optionally customize the message per invite link

### 4.4 Recruit CRM

**Per-recruit features (for invited recruits):**
- **Tags:** Coach can add custom tags (e.g., "Top Target", "2027 Class", "DE Prospect", "High Academic").
- **Notes:** Free-text notes field. Timestamped. Multiple notes per recruit.
- **Lists:** Create named lists (e.g., "Top 2027 Targets", "Official Visit Invites", "Verbal Commits"). Add/remove recruits from lists.
- **Status tracking:** Invited → Viewed → Engaged → Contacted → Visited (in-person) → Offered → Committed. Manual status update by coach.

### 4.5 Recruit Search

**Search the entire recruit database** (not just invited recruits).

**Filters:**
- Position (multi-select)
- Graduation Year (multi-select)
- State (multi-select)
- Height range (min-max)
- Weight range (min-max)

**Results Show:**
- Recruit name
- Position, grad year, height/weight
- High school, city, state
- GPA (if provided)
- Highlights URL link
- "Send Invite" button — generates an invite link and optionally emails it

**Note:** Coaches can see the full profile of any recruit who has signed up. There are no privacy gates on the recruit profile for coaches.

### 4.6 Program Manager

**Content management for the school profile:**
- Edit school description, colors, logo, hero image
- Manage facilities (add/edit/remove POIs, upload 360° photos/videos, manage hotspots)
- Manage coaching staff (add/edit/remove coach bios, upload photos)
- Manage roster (add/edit/remove players, mark starters)
- Manage NIL info (edit collective details, toggle field visibility)
- Manage notable alumni
- Manage video content (upload coach intro videos, add highlight reel URLs, add day-in-the-life content)
- Manage jersey assets (upload helmet/jersey/pants images per color variant)
- Manage academic content (edit school-wide stats; colleges/majors/pathways managed separately or via data entry)
- Set welcome video + default welcome message for invite links

### 4.7 Invite Link Management

- Generate new invite links (with optional expiration).
- View all active invite links: code, created date, expiration, usage count.
- Deactivate / delete links.
- Bulk generate links (for recruiting events, camps, etc.).

---

## 5. Analytics Tracking System

### 5.1 Event Types

Every tracked event has: `userId`, `schoolId`, `sessionId`, `section`, `action`, `metadata` (JSON), `duration` (ms), `createdAt`.

| Section | Action | Metadata | Duration Tracked? |
|---------|--------|----------|-------------------|
| `tour` | `view_panorama` | `{ facilityId, facilityName }` | Yes (time in panorama) |
| `tour` | `click_hotspot` | `{ hotspotId, label }` | No |
| `tour` | `navigate_poi` | `{ fromFacilityId, toFacilityId }` | No |
| `tour` | `view_video_360` | `{ facilityId, videoUrl }` | Yes |
| `football` | `view_section` | `{}` | Yes |
| `football` | `view_coach_bio` | `{ coachId, coachName }` | Yes |
| `football` | `view_scheme` | `{ schemeType: 'offense' \| 'defense' }` | Yes |
| `football` | `view_roster` | `{}` | Yes |
| `academics` | `view_section` | `{}` | Yes |
| `academics` | `view_college` | `{ collegeId, collegeName }` | Yes |
| `academics` | `view_major` | `{ majorId, majorName }` | Yes |
| `academics` | `view_career_outcome` | `{ outcomeId, title }` | No |
| `nil` | `view_section` | `{}` | Yes |
| `nil` | `view_deal` | `{ dealIndex }` | No |
| `alumni` | `view_section` | `{}` | Yes |
| `alumni` | `view_alumni_detail` | `{ alumniId, name }` | No |
| `jersey` | `view_section` | `{}` | Yes |
| `jersey` | `select_piece` | `{ pieceType: 'helmet' \| 'jersey' \| 'pants', assetId }` | No |
| `jersey` | `save_combo` | `{ helmetId, jerseyId, pantsId }` | No |
| `jersey` | `share_combo` | `{ platform: 'twitter' \| 'instagram' \| 'download' \| 'link' }` | No |
| `video` | `view_coach_video` | `{ coachId, coachName }` | Yes |
| `video` | `view_highlight` | `{ videoTitle }` | Yes |
| `video` | `view_day_in_life` | `{ playerName }` | Yes |
| `school` | `page_view` | `{}` | Yes (total time on school page) |
| `school` | `favorite` | `{}` | No |
| `school` | `unfavorite` | `{}` | No |
| `welcome` | `view_welcome` | `{ inviteCode }` | Yes |
| `welcome` | `play_welcome_video` | `{ inviteCode }` | Yes |

### 5.2 Client-Side Tracking Implementation

**Batch Tracker (existing, enhanced):**
- Queue events client-side.
- Flush every 30 seconds OR when queue hits 50 events.
- Flush on `beforeunload` via `navigator.sendBeacon` (more reliable than fetch for page close).
- Generate session ID per browser session.

**Duration Tracking:**
- For sections: start timer when section enters viewport (Intersection Observer), stop when it leaves.
- For specific content (panoramas, coach bios, videos): start timer on open/focus, stop on close/blur.
- For videos: use video player events (play, pause, ended) to calculate actual watch time.
- Send duration events periodically (every 10 seconds while active) as heartbeat pings, not just on exit.

### 5.3 Analytics API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/analytics/track` | Batch insert analytics events | Recruit (authenticated) |
| GET | `/api/analytics/dashboard` | Aggregated analytics for a school | Coach (school-scoped) |
| GET | `/api/analytics/recruit/[userId]` | Detail analytics for a specific recruit at a school | Coach (school-scoped) |
| GET | `/api/analytics/insights/[userId]` | AI-generated insight for a recruit | Coach (school-scoped) |
| GET | `/api/analytics/export` | CSV export of all analytics | Coach (school-scoped) |
| GET | `/api/analytics/engagement-scores` | All recruit engagement scores for a school | Coach (school-scoped) |

---

## 6. Pricing Tiers

### 6.1 Tier Structure

**No free tier for schools. Recruits are always free.**

| Feature | Starter | Pro | Elite |
|---------|---------|-----|-------|
| **Monthly Price** | $99/mo | $249/mo | Custom |
| **Setup Fee** | $0 | $2,500 | Custom |
| **360° POIs** | Up to 5 | Unlimited | Unlimited |
| **360° Video** | No | Yes | Yes |
| **Content Sections** | Basic (Overview, Football, Academics) | All sections | All sections + custom |
| **Jersey Builder** | No | Yes | Yes |
| **Video Content** | Coach intros only | All video types | All + custom production |
| **Analytics** | Basic view counts + time per section | Full behavioral tracking + engagement scoring | Full + AI insights |
| **AI Insights** | No | No | Yes |
| **Recruit CRM** | View-only (see who visited) | Tags + Notes | Tags + Notes + Lists + Status tracking |
| **Recruit Search** | No | Basic filters | Advanced filters |
| **Welcome Video** | No | Yes | Yes + custom production |
| **NIL Visibility Controls** | Public only | Public + Invite-Only | Full control |
| **Invite Links** | Up to 50 | Up to 500 | Unlimited |
| **Support** | Email | Priority email | Dedicated account manager |
| **Branding** | School colors applied | Full branding | Full + custom design touches |

### 6.2 Upsell Triggers
- Starter → Pro: "Unlock the jersey builder, full analytics, and video content to stand out in recruiting."
- Pro → Elite: "Get AI-generated insights and advanced CRM tools to maximize every recruit interaction."

---

## 7. Design System

### 7.1 School Theming
When a recruit views a school page, the **entire content area** adopts the school's brand:
- `colorPrimary` → Backgrounds, primary buttons, section headers, progress bars.
- `colorSecondary` → Secondary buttons, hover states, accent borders.
- `colorAccent` → Highlights, badges, small accents.
- OVV global chrome (top nav, bottom nav) stays consistent in OVV brand colors, but uses subtle school color accents.

**Implementation:** CSS custom properties set dynamically via `style` attribute on the school page wrapper:
```css
--school-primary: #841617;   /* e.g., Texas Tech Red */
--school-secondary: #000000;
--school-accent: #FFFFFF;
```

All school-page components reference these variables.

### 7.2 Dark / Light Mode
- Follows system preference by default (`next-themes` with `attribute="class"` and `defaultTheme="system"`).
- User can toggle manually.
- School colors must work in both light and dark contexts — ensure sufficient contrast.

### 7.3 Typography & Spacing
- Font: Geist (already configured via `next/font`).
- Consistent spacing scale via Tailwind.
- Headings: bold, large, clear hierarchy.
- Body: readable, comfortable line height.

### 7.4 Responsive Design
- Mobile-first approach.
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px).
- 360° viewer: full-width on mobile, can go fullscreen.
- School page sections stack vertically on mobile.
- Sticky section navigator moves to bottom of screen on mobile.

---

## 8. Data Model Changes Needed

### 8.1 Schema Additions (vs. current state)

**User model — add:**
```prisma
recruitType    String?   // "high_school" | "transfer"
```

**RecruitProfile model — add:**
```prisma
currentSchool      String?
collegeStats       String?   @db.Text
eligibilityYears   Int?
transferReason     String?   @db.Text
profilePhotoUrl    String?
profileCompleteness Float?  @default(0)
```

**School model — add:**
```prisma
stadiumCapacity     Int?
traditions          String?  @db.Text
gameDayDescription  String?  @db.Text
```

**Sport model — add:**
```prisma
strengthProgram     String?  @db.Text
nutritionProgram    String?  @db.Text
recentBowlGames    String[]
conferenceStanding  String?
```

**Coach model — add:**
```prisma
videoUrl            String?   // Coach intro video
coachingTree        String[]  // Notable coaches they trained under
```

**Facility model — add:**
```prisma
panoramaType     String?   // "photo" | "video"
videoUrl         String?   // For 360° video facilities
sortOrder        Int       @default(0)
isRequired       Boolean   @default(false)  // Required POI flag
```

**New model: SchoolVideo**
```prisma
model SchoolVideo {
  id          String @id @default(uuid())
  schoolId    String
  school      School @relation(fields: [schoolId], references: [id], onDelete: Cascade)
  type        String // "coach_intro" | "highlight" | "day_in_life"
  title       String
  description String? @db.Text
  videoUrl    String
  thumbnailUrl String?
  coachId     String? // If type is coach_intro
  playerName  String? // If type is day_in_life
  sortOrder   Int     @default(0)
  createdAt   DateTime @default(now())

  @@map("school_videos")
}
```

**New model: RecruitNote (CRM)**
```prisma
model RecruitNote {
  id         String   @id @default(uuid())
  coachId    String
  coach      User     @relation("CoachNotes", fields: [coachId], references: [id], onDelete: Cascade)
  recruitId  String
  recruit    User     @relation("RecruitNotes", fields: [recruitId], references: [id], onDelete: Cascade)
  schoolId   String
  school     School   @relation(fields: [schoolId], references: [id], onDelete: Cascade)
  content    String   @db.Text
  createdAt  DateTime @default(now())

  @@map("recruit_notes")
}
```

**New model: RecruitTag**
```prisma
model RecruitTag {
  id         String @id @default(uuid())
  schoolId   String
  school     School @relation(fields: [schoolId], references: [id], onDelete: Cascade)
  recruitId  String
  recruit    User   @relation(fields: [recruitId], references: [id], onDelete: Cascade)
  tag        String
  createdAt  DateTime @default(now())

  @@unique([schoolId, recruitId, tag])
  @@map("recruit_tags")
}
```

**New model: RecruitList**
```prisma
model RecruitList {
  id        String   @id @default(uuid())
  schoolId  String
  school    School   @relation(fields: [schoolId], references: [id], onDelete: Cascade)
  name      String
  createdBy String
  creator   User     @relation(fields: [createdBy], references: [id])
  createdAt DateTime @default(now())

  members RecruitListMember[]

  @@map("recruit_lists")
}

model RecruitListMember {
  id        String      @id @default(uuid())
  listId    String
  list      RecruitList @relation(fields: [listId], references: [id], onDelete: Cascade)
  recruitId String
  recruit   User        @relation(fields: [recruitId], references: [id], onDelete: Cascade)
  addedAt   DateTime    @default(now())

  @@unique([listId, recruitId])
  @@map("recruit_list_members")
}
```

**New model: RecruitStatus**
```prisma
model RecruitStatus {
  id        String   @id @default(uuid())
  schoolId  String
  school    School   @relation(fields: [schoolId], references: [id], onDelete: Cascade)
  recruitId String
  recruit   User     @relation(fields: [recruitId], references: [id], onDelete: Cascade)
  status    String   // "invited" | "viewed" | "engaged" | "contacted" | "visited" | "offered" | "committed"
  updatedAt DateTime @updatedAt
  createdAt DateTime @default(now())

  @@unique([schoolId, recruitId])
  @@map("recruit_statuses")
}
```

**NilProgram model — add:**
```prisma
averageDealSize    Int?
howToGetInvolved   String?  @db.Text
```

**NilProgram field visibility — new model:**
```prisma
model NilFieldVisibility {
  id        String @id @default(uuid())
  schoolId  String @unique
  school    School @relation(fields: [schoolId], references: [id], onDelete: Cascade)

  totalBudget     String @default("public")    // "public" | "invite_only" | "hidden"
  footballSpend   String @default("public")
  allSportsSpend  String @default("hidden")
  averageDealSize String @default("invite_only")
  notableDeals    String @default("invite_only")

  @@map("nil_field_visibility")
}
```

**InviteLink model — add:**
```prisma
welcomeMessage  String?  @db.Text
welcomeVideoUrl String?
```

**School model — add relation:**
```prisma
welcomeVideoUrl     String?   // Default welcome video
defaultWelcomeMsg   String?   @db.Text  // Default welcome message
```

### 8.2 Indexes to Add
```prisma
// On AnalyticsEvent — add for dashboard queries:
@@index([schoolId, userId, section])
@@index([schoolId, createdAt])

// On RecruitProfile — for search:
@@index([sport, graduationYear, state])
@@index([position])
```

---

## 9. API Routes Needed

### 9.1 Auth
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/auth/callback` | Supabase auth callback (exists) |
| POST | `/api/auth/sync-user` | Sync Supabase user to Prisma User (exists) |
| GET | `/api/auth/me` | Get current user + profile |

### 9.2 Recruit
| Method | Route | Description |
|--------|-------|-------------|
| PUT | `/api/recruit/profile` | Update recruit profile |
| GET | `/api/recruit/profile` | Get own profile |
| GET | `/api/recruit/favorites` | Get favorited schools |
| POST | `/api/recruit/favorites/[schoolId]` | Add favorite |
| DELETE | `/api/recruit/favorites/[schoolId]` | Remove favorite |
| GET | `/api/recruit/recently-viewed` | Get recently viewed schools |

### 9.3 Schools
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/schools` | List schools with filters |
| GET | `/api/schools/[slug]` | Get full school detail |
| GET | `/api/schools/[slug]/tour` | Get all facilities + hotspots for tour |
| GET | `/api/schools/[slug]/videos` | Get all videos for school |

### 9.4 Jersey
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/schools/[slug]/jersey-assets` | Get jersey assets for school |
| POST | `/api/jersey/save` | Save jersey combo |
| GET | `/api/jersey/share/[id]` | Get shareable jersey combo (public, for OG tags) |

### 9.5 Coach Admin
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/admin/dashboard` | Dashboard overview stats |
| GET | `/api/admin/recruits` | List recruited/invited users with engagement |
| GET | `/api/admin/recruits/[userId]` | Recruit detail with analytics |
| GET | `/api/admin/recruits/search` | Search all recruits on platform |
| POST | `/api/admin/recruits/[userId]/notes` | Add note to recruit |
| POST | `/api/admin/recruits/[userId]/tags` | Add tag to recruit |
| DELETE | `/api/admin/recruits/[userId]/tags/[tag]` | Remove tag |
| PUT | `/api/admin/recruits/[userId]/status` | Update recruit status |
| GET | `/api/admin/lists` | Get all recruit lists |
| POST | `/api/admin/lists` | Create a list |
| POST | `/api/admin/lists/[listId]/members` | Add recruit to list |
| DELETE | `/api/admin/lists/[listId]/members/[userId]` | Remove from list |
| GET | `/api/admin/invites` | List invite links |
| POST | `/api/admin/invites` | Generate invite link |
| DELETE | `/api/admin/invites/[id]` | Deactivate invite |
| PUT | `/api/admin/program` | Update school profile |
| PUT | `/api/admin/nil-visibility` | Update NIL field visibility |
| POST | `/api/admin/facilities` | Add facility |
| PUT | `/api/admin/facilities/[id]` | Update facility |
| POST | `/api/admin/videos` | Add video |
| DELETE | `/api/admin/videos/[id]` | Remove video |

### 9.6 Analytics
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/analytics/track` | Batch insert events (exists, enhance) |
| GET | `/api/analytics/dashboard` | Aggregated dashboard data |
| GET | `/api/analytics/recruit/[userId]` | Per-recruit analytics detail |
| GET | `/api/analytics/insights/[userId]` | AI-generated insight |
| GET | `/api/analytics/export` | CSV export (exists) |
| GET | `/api/analytics/engagement-scores` | All engagement scores |

### 9.7 Invites (Public)
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/invite/[code]` | Validate invite code, return school info |

---

## 10. Page Routes

| Route | Layout Group | Description | Auth Required |
|-------|-------------|-------------|---------------|
| `/` | (marketing) | Landing page | No |
| `/about` | (marketing) | About OVV | No |
| `/privacy` | (marketing) | Privacy policy | No |
| `/terms` | (marketing) | Terms of service | No |
| `/schools/[slug]` | (marketing) | Public school preview (limited) | No |
| `/login` | (auth) | Login page | No |
| `/register` | (auth) | Register page | No |
| `/invite/[code]` | (auth) | Invite landing → register | No |
| `/recruit` | (platform) | Recruit dashboard | Recruit |
| `/recruit/schools` | (platform) | Browse all schools | Recruit |
| `/recruit/school/[slug]` | (platform) | Full school immersive experience | Recruit |
| `/recruit/school/[slug]/jersey` | (platform) | Jersey builder | Recruit |
| `/recruit/school/[slug]/college/[collegeSlug]` | (platform) | College detail (academics drill-down) | Recruit |
| `/recruit/favorites` | (platform) | Favorites list | Recruit |
| `/recruit/profile` | (platform) | Edit profile | Recruit |
| `/recruit/welcome/[code]` | (platform) | Personalized welcome screen | Recruit |
| `/admin` | (platform) | Coach dashboard | Coach |
| `/admin/analytics` | (platform) | Analytics dashboard | Coach |
| `/admin/analytics/recruit/[userId]` | (platform) | Recruit detail analytics | Coach |
| `/admin/recruits` | (platform) | CRM - recruit list | Coach |
| `/admin/recruits/search` | (platform) | Search all recruits | Coach |
| `/admin/lists` | (platform) | Recruit lists | Coach |
| `/admin/invites` | (platform) | Invite link management | Coach |
| `/admin/program` | (platform) | Program manager | Coach |
| `/admin/program/facilities` | (platform) | Manage facilities/POIs | Coach |
| `/admin/program/videos` | (platform) | Manage videos | Coach |
| `/admin/program/nil` | (platform) | Manage NIL info + visibility | Coach |
| `/admin/program/roster` | (platform) | Manage roster | Coach |

---

## 11. Social Sharing (Jersey Builder)

### 11.1 Share Flow
1. Recruit builds a jersey combo and clicks "Share."
2. System generates a composite image (server-side or canvas-based):
   - Shows helmet + jersey + pants together.
   - School logo in corner.
   - OVV branding (small watermark).
   - Recruit's name + number (optional).
3. **Download:** Direct PNG download.
4. **Share buttons:** Twitter/X (pre-filled tweet with image + link), Instagram (download prompt with copy-pasteable caption).
5. **Shareable URL:** `ovv.com/jersey/[uniqueId]` — renders an OG-tagged page with the jersey combo image.

### 11.2 Open Graph Tags for Shared URL
```html
<meta property="og:title" content="My Jersey Combo — Oklahoma Sooners" />
<meta property="og:description" content="Built on OVV — Official Virtual Visit" />
<meta property="og:image" content="https://ovv.com/api/jersey/og/[uniqueId].png" />
<meta property="og:url" content="https://ovv.com/jersey/[uniqueId]" />
<meta name="twitter:card" content="summary_large_image" />
```

---

## 12. Middleware & Security

### 12.1 Route Protection
- `/recruit/*` — requires authenticated user with role `recruit`.
- `/admin/*` — requires authenticated user with role `coach_admin`.
- `/api/admin/*` — requires coach_admin role + school ownership validation.
- `/api/recruit/*` — requires recruit role.
- `/api/analytics/track` — requires any authenticated user.
- Public routes: `/`, `/about`, `/privacy`, `/terms`, `/schools/*`, `/login`, `/register`, `/invite/*`, `/api/invite/*`, `/jersey/[uniqueId]`.

### 12.2 Rate Limiting
- Analytics track endpoint: 100 requests/min per user.
- Auth endpoints: 10 requests/min per IP.
- General API: 60 requests/min per user.

### 12.3 Data Validation
- All inputs validated with Zod schemas.
- File uploads: validate type (images: PNG/JPG/WebP; video: MP4; panoramas: JPG equirectangular).
- Max file sizes: images 10MB, videos 500MB, panoramas 50MB.

---

## 13. Launch Plan

### 13.1 Pilot Phase (1-3 Schools)
1. Hand-pick 1-3 football programs with existing relationships.
2. Full content creation: 360° photography, roster data entry, coach bios, academic info.
3. Invite a small cohort of recruits (20-50 per school) to test.
4. Iterate on feedback from both coaches and recruits.

### 13.2 MVP Feature Scope (Pilot)
- Recruit signup + onboarding (full profile, completeness bar)
- School detail page (immersive scroll with all sections)
- 360° photo panoramas (true spherical viewer) with hotspot navigation + thumbnail strip + mini-map
- Football section (coaching bios, scheme breakdowns, roster)
- Academics section (athlete stats, college/major drill-down)
- NIL section (with visibility controls)
- Jersey builder (save + share + download)
- Analytics tracking (all events)
- Coach dashboard (engagement table + scores)
- Invite link system + personalized welcome (branded card + video)
- Recruit CRM (tags, notes)
- Basic school filters

### 13.3 Post-Pilot Additions
- AI-generated insights
- Recruit lists + status tracking
- Recruit search
- 360° video support
- Day-in-the-life video content
- Advanced analytics (session timeline, specific content drill-down)
- Native mobile app

---

## 14. Edge Cases & Clarifications

### 14.1 Invite System
- A recruit CAN use multiple invite links from different schools. Each creates a separate association.
- A recruit CANNOT use the same invite code twice. Second use shows "Already redeemed."
- "Was invited by this school" is determined by: the recruit signed up via an InviteLink where `schoolId` matches the current school. Checked via a join between the user's signup invite code and the InviteLink table.
- `expiresAt` on InviteLink is already in the existing schema. Validation: if `expiresAt` is set and in the past, reject the invite.

### 14.2 Engagement Score Edge Cases
- If a school doesn't have all 7 sections (e.g., no tour yet), the section diversity score is calculated against the number of AVAILABLE sections, not 7.
- Score of exactly 26 = "Moderate interest" tier, AI insights ARE generated.
- Score of 0 = recruit was invited but never visited. Show "Not yet visited" instead of a score.
- Engagement score is computed on-demand when coach loads dashboard, with a 5-minute cache. No nightly batch job needed for MVP.

### 14.3 Jersey Builder
- Jersey image compositing: use client-side HTML Canvas API for MVP (avoids server-side image processing complexity). Generate canvas → `toDataURL()` → downloadable PNG.
- For the OG share URL, use a server-side API route that renders the jersey combo into an image using `@vercel/og` or similar.
- A recruit can save multiple jersey combos per school (not just one). Each save is a new JerseySelection record.

### 14.4 File Uploads
- Welcome video: max 2 minutes, max 500MB, MP4 only. Validate duration client-side before upload.
- Panorama images: must be 2:1 aspect ratio (equirectangular). Validate aspect ratio client-side.
- All uploads go to Supabase Storage with public URLs for serving.

### 14.5 NIL Visibility Determination
- "Invite-only" fields check: does an InviteLink record exist where `schoolId` = current school AND the InviteLink was used by the current user (tracked via a join table or metadata on the user)?
- For MVP: store `invitedSchoolIds` as an array on the user record or use the InviteLink usedBy association.

### 14.6 Performance Targets
- School detail page: < 3 seconds to interactive on 4G.
- First panorama: < 5 seconds to render.
- Analytics batch insert (50 events): < 500ms.
- Dashboard load (500 recruits, 50K events): < 2 seconds with pre-computed scores.

---

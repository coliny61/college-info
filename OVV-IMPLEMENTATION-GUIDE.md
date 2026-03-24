# OVV — Claude Code Implementation Guide

**Purpose:** This document is the instruction set for Claude Code. It breaks OVV into implementation phases with specific tasks, file paths, and references to the product spec and test cases.

**Reference Documents (read these first):**
- `OVV-PRODUCT-SPEC.md` — Full product specification with every feature detailed
- `OVV-ARCHITECTURE.mermaid` — System architecture diagram
- `OVV-USER-FLOWS.mermaid` — User flow diagrams
- `OVV-TEST-CASES.md` — 150+ test cases covering every feature

---

## How to Use This Guide

Each phase is self-contained and ordered by dependency. Complete each phase before moving to the next. Within each phase, tasks are ordered. After implementing each task, verify it against the test cases listed.

**Existing codebase context:**
- Next.js 16 App Router project at root
- Prisma schema at `prisma/schema.prisma`
- Supabase auth already configured (`src/lib/supabase/`)
- Existing components in `src/components/`
- Existing pages in `src/app/`
- shadcn/ui components in `src/components/ui/`
- Analytics tracker at `src/lib/analytics-tracker.ts`

---

## Phase 1: Schema & Data Model Updates

**Goal:** Update the Prisma schema to support all features defined in the product spec.

### Task 1.1: Update Existing Models
**File:** `prisma/schema.prisma`
**Reference:** Product Spec Section 8.1

Add fields to existing models:
- `User`: add `recruitType String?`
- `RecruitProfile`: add `currentSchool`, `collegeStats`, `eligibilityYears`, `transferReason`, `profilePhotoUrl`, `profileCompleteness`
- `School`: add `stadiumCapacity`, `traditions`, `gameDayDescription`, `welcomeVideoUrl`, `defaultWelcomeMsg`
- `Sport`: add `strengthProgram`, `nutritionProgram`, `recentBowlGames`, `conferenceStanding`
- `Coach`: add `videoUrl`, `coachingTree`
- `Facility`: add `panoramaType`, `videoUrl`, `sortOrder`, `isRequired`
- `NilProgram`: add `averageDealSize`, `howToGetInvolved`
- `InviteLink`: add `welcomeMessage`, `welcomeVideoUrl`

### Task 1.2: Create New Models
**File:** `prisma/schema.prisma`

Add these new models (see Product Spec Section 8.1 for full definitions):
- `SchoolVideo` — video content for schools (coach intros, highlights, day-in-life)
- `RecruitNote` — CRM notes from coaches about recruits
- `RecruitTag` — CRM tags on recruits
- `RecruitList` + `RecruitListMember` — named recruit lists
- `RecruitStatus` — pipeline status tracking (invited → committed)
- `NilFieldVisibility` — per-field visibility controls for NIL data

Don't forget to add the reverse relations on `User` and `School` models.

### Task 1.3: Add Indexes
**File:** `prisma/schema.prisma`

Add indexes per Product Spec Section 8.2:
- `AnalyticsEvent`: `@@index([schoolId, userId, section])`, `@@index([schoolId, createdAt])`
- `RecruitProfile`: `@@index([sport, graduationYear, state])`, `@@index([position])`

### Task 1.4: Generate Migration & Client
**Commands:**
```bash
npx prisma migrate dev --name add-full-product-spec-models
npx prisma generate
```

**Verify:** Test cases TC-2.4 (transfer fields exist), TC-10.1-10.4 (NIL visibility model exists).

---

## Phase 2: Authentication & Onboarding

**Goal:** Implement the full signup, login, and onboarding flows.

### Task 2.1: Update Auth Sync
**File:** `src/app/api/auth/sync-user/route.ts`

Ensure user sync creates the correct role. Add support for `recruitType` field.

### Task 2.2: Onboarding Wizard
**File:** `src/components/recruit/onboarding-wizard.tsx` (update existing)

Implement per Product Spec Section 3.1:
- Required fields: sport + graduation year only
- All other fields optional
- Transfer toggle: when "Transfer" selected, show additional fields (currentSchool, collegeStats, eligibilityYears, transferReason)
- Profile completeness bar with weighted calculation (see spec for weights)
- Completeness messaging based on percentage tier
- Zod validation for required fields

**Test Cases:** TC-2.1 through TC-2.5

### Task 2.3: Profile Page
**File:** `src/app/(platform)/recruit/profile/page.tsx` + `profile-form.tsx` (update existing)

- Make all fields editable
- Show completeness bar
- Add profile photo upload
- Add transfer-specific fields
- Recalculate completeness on save

**Test Cases:** TC-14.1 through TC-14.4

### Task 2.4: Route Protection Middleware
**File:** `src/middleware.ts` (update existing)

Ensure:
- `/recruit/*` requires `recruit` role
- `/admin/*` requires `coach_admin` role
- Public routes are accessible without auth
- Redirect logic: unauthenticated → `/login`, wrong role → appropriate dashboard

**Test Cases:** TC-1.5 through TC-1.7

---

## Phase 3: Invite System & Welcome Screen

**Goal:** Full invite link flow with personalized welcome.

### Task 3.1: Invite API Routes
**Files:**
- `src/app/api/admin/invites/route.ts` — GET (list), POST (create)
- `src/app/api/admin/invites/[id]/route.ts` — DELETE (deactivate)
- `src/app/api/invite/[code]/route.ts` — GET (validate, public)

### Task 3.2: Invite Management UI (Coach)
**File:** `src/app/(platform)/admin/invites/page.tsx` (new or update existing)

- List active invite links with code, created date, expiration, usage count
- Generate new link button (with optional expiration)
- Deactivate button
- Bulk generate option
- Copy link to clipboard

**Test Cases:** TC-3.1, TC-3.6, TC-3.7

### Task 3.3: Invite Landing Page
**File:** `src/app/(auth)/invite/[code]/page.tsx` (update existing)

- Validate invite code via API
- If valid: show school branding + "You've been invited by [School Name]" + signup/login form
- If expired: show error with option to register normally
- If invalid: show error
- After auth: store invite association, increment usedCount

**Test Cases:** TC-3.2 through TC-3.5

### Task 3.4: Personalized Welcome Screen
**File:** `src/app/(platform)/recruit/welcome/[code]/page.tsx` (new)

- Full school branding (colors, logo)
- Coach photo + name + title
- Embedded welcome video (if uploaded)
- Welcome message text
- "Start Your Visit" CTA → navigates to school detail page
- Track analytics: `welcome.view_welcome`, `welcome.play_welcome_video`

**Test Cases:** TC-4.1 through TC-4.5

---

## Phase 4: School Detail Page — Immersive Scroll

**Goal:** Transform the current tab-based school page into an immersive scroll experience with full school branding.

### Task 4.1: School Branding System
**File:** `src/app/(platform)/recruit/school/[slug]/page.tsx` (refactor)

- Set CSS custom properties on page wrapper: `--school-primary`, `--school-secondary`, `--school-accent`
- All child components reference these variables
- Ensure branding works in both light and dark mode

**Test Cases:** TC-6.1, TC-6.7

### Task 4.2: Replace Tabs with Immersive Scroll
**File:** `src/app/(platform)/recruit/school/[slug]/page.tsx` (refactor)

- Remove `SchoolTabs` component usage
- Render all sections sequentially on one scrollable page
- Each section has a clear visual separator and section heading
- Sections: Tour, Football, Academics, NIL, Roster, Alumni, Jersey Room, Video & Media

### Task 4.3: Sticky Section Navigator
**File:** `src/components/school/section-navigator.tsx` (new)

- Fixed sidebar on desktop, fixed bottom bar on mobile
- Icons + labels for each section
- Highlights current section based on scroll position (Intersection Observer)
- Click to smooth-scroll to section
- Uses school accent color for active state

**Test Cases:** TC-6.2 through TC-6.4

### Task 4.4: School Header
**File:** `src/components/school/school-header.tsx` (update)

- School logo (large)
- Name + mascot
- Conference badge
- City, state
- Favorite button (heart toggle)
- Gradient background using school primary color

**Test Cases:** TC-6.5

---

## Phase 5: 360° Virtual Tour

**Goal:** Replace the current 2D panorama viewer with a true 360° spherical experience.

### Task 5.1: Install 360° Library
**Command:** `npm install @photo-sphere-viewer/core @photo-sphere-viewer/markers-plugin`

Or if using Three.js directly, the existing setup may work. Evaluate which gives best results.

### Task 5.2: Spherical Panorama Viewer
**File:** `src/components/school/panorama-viewer.tsx` (rewrite)

- True equirectangular projection (full 360° look-around)
- Mouse drag / touch drag to look around
- Scroll / pinch to zoom
- Fullscreen mode
- Autorotate when idle (stop on interaction)
- Hotspot rendering: pins with labels that face the camera
- Hotspot click: show info popup OR navigate to linked facility
- Mobile: gyroscope support

**Test Cases:** TC-7.1, TC-7.6, TC-7.9, TC-7.10, TC-7.11

### Task 5.3: Hotspot Navigation Between POIs
**File:** `src/components/school/panorama-viewer.tsx`

- Navigation hotspots (arrows/doors) that trigger transition to linked facility
- Smooth transition animation (fade or fly-through)
- Update active POI state

**Test Cases:** TC-7.2

### Task 5.4: Thumbnail Strip
**File:** `src/components/school/tour-thumbnail-strip.tsx` (new)

- Horizontal scrollable strip of POI thumbnails
- Click to navigate to that POI
- Active POI highlighted
- Shows POI name below thumbnail

**Test Cases:** TC-7.3

### Task 5.5: Mini Campus Map
**File:** `src/components/school/tour-campus-map.tsx` (new)

- Small map overlay in corner of tour section
- Pins for each POI at approximate positions
- Click pin to navigate
- Active POI pin highlighted
- Expand to full-screen overlay

**Test Cases:** TC-7.4, TC-7.5

### Task 5.6: 360° Video Support
**File:** `src/components/school/panorama-viewer.tsx`

- Detect `panoramaType === "video"` on facility
- Load video instead of photo in spherical viewer
- Standard video controls (play, pause, scrub)
- Duration tracking

**Test Cases:** TC-7.8

### Task 5.7: Tour Duration Tracking
**File:** `src/components/school/tour-tab.tsx` (update)

- Track time spent in each panorama
- Track hotspot clicks
- Track POI navigation
- Use the analytics tracker

**Test Cases:** TC-7.7

### Task 5.8: No Tour Fallback
- If school has no facilities with panoramaUrl, show placeholder message

**Test Cases:** TC-7.12

---

## Phase 6: Content Sections

**Goal:** Build out all content sections for the school detail page.

### Task 6.1: Football Section
**File:** `src/components/school/athletics-tab.tsx` (refactor into scroll section)

- Head coach large card with all stats (career record, championships, NFL players, awards)
- Assistant coaches grid (expandable bios)
- Offensive + defensive scheme breakdowns
- Player development info (S&C, nutrition)
- Game day experience
- Performance stats (record, ranking, bowl games)
- All interactions tracked via analytics

**Test Cases:** TC-8.1 through TC-8.9

### Task 6.2: Academics Section
**File:** `src/components/school/academics-tab.tsx` (refactor into scroll section)

- Athlete-specific stats FIRST (graduation rate, support services, tutoring)
- School-wide academic stats
- College drill-down with major detail + degree pathways + career outcomes
- Analytics tracking for section, college, and major views

**Test Cases:** TC-9.1 through TC-9.5

### Task 6.3: NIL Section
**File:** `src/components/school/nil-tab.tsx` (refactor into scroll section)

- Render fields based on visibility settings (public/invite-only/hidden)
- Check if current user was invited by this school to determine invite-only visibility
- Duration tracking

**Test Cases:** TC-10.1 through TC-10.6

### Task 6.4: Roster Section
**File:** `src/components/school/roster-section.tsx` (new or refactor)

- Sortable table/grid
- Position filter
- Starter badges

**Test Cases:** TC-8.7, TC-8.8

### Task 6.5: Alumni Section
**File:** `src/components/school/alumni-tab.tsx` (refactor into scroll section)

- Cards sorted by draft year desc
- First-round badges
- Active/retired indicator

### Task 6.6: Video & Media Section
**File:** `src/components/school/video-section.tsx` (new)

- Coach intro videos (linked to coaching staff)
- Highlight reels
- Day-in-the-life player content
- Video gallery layout
- Duration tracking per video

**Test Cases:** TC-12.1 through TC-12.5

---

## Phase 7: Jersey Builder

**Goal:** Interactive jersey customization with save, share, and coach notifications.

### Task 7.1: Jersey Canvas / Preview
**File:** `src/components/jersey/jersey-canvas.tsx` (update)

- Composite preview: helmet + jersey + pants
- Real-time update on selection change
- Clean visual with school branding

### Task 7.2: Asset Selector
**File:** `src/components/jersey/asset-selector.tsx` (update)

- Horizontal strip of options per piece type
- Thumbnail preview per option
- Active selection highlighted

### Task 7.3: Save Functionality
**File:** `src/components/jersey/jersey-builder.tsx` (update)

- Save button creates JerseySelection record
- Toast notification on save
- Analytics event: `jersey.save_combo`

**Test Cases:** TC-11.1 through TC-11.3

### Task 7.4: Share — Image Generation
**File:** `src/app/api/jersey/share/route.ts` (new) or client-side canvas

- Composite helmet + jersey + pants into single PNG
- Add school logo + OVV branding
- Return downloadable image

**Test Cases:** TC-11.5

### Task 7.5: Share — Social & URL
**Files:**
- `src/app/api/jersey/share/[id]/route.ts` (new) — public endpoint for OG tags
- `src/app/jersey/[id]/page.tsx` (new) — public shareable page with OG meta tags
- Share buttons in jersey builder component

Generate unique shareable URL. Set OG tags (title, description, image). Share buttons for Twitter/X, Instagram, download, copy link.

**Test Cases:** TC-11.6 through TC-11.8

### Task 7.6: Coach Notification of Jersey Save
- Jersey save events visible in coach analytics dashboard activity feed
- Contributes to engagement score (+15 for high-intent action)

**Test Cases:** TC-11.4

---

## Phase 8: Analytics System Enhancement

**Goal:** Upgrade analytics to support all event types, engagement scoring, and AI insights.

### Task 8.1: Enhanced Client Tracker
**File:** `src/lib/analytics-tracker.ts` (update)

- Add `navigator.sendBeacon` for `beforeunload` (more reliable than fetch)
- Add heartbeat duration pings every 10 seconds for active sections
- Add Intersection Observer integration for section duration tracking

**Test Cases:** TC-19.1 through TC-19.8

### Task 8.2: Analytics Hook
**File:** `src/hooks/use-analytics.ts` (update)

- Hook for components to easily track events
- `useTrackSection(section)` — auto-tracks duration while component is visible
- `useTrackEvent(section, action, metadata)` — one-off event tracking
- `useTrackVideo(section, videoRef)` — tracks video play/pause/duration

### Task 8.3: Analytics Track API Enhancement
**File:** `src/app/api/analytics/track/route.ts` (update)

- Validate batch of events with Zod
- Insert all events in a single DB transaction
- Rate limit: 100 requests/min per user

### Task 8.4: Engagement Score Calculator
**File:** `src/lib/engagement-score.ts` (new)

Implement scoring per Product Spec Section 4.2.2:
- Time (30%), Section diversity (20%), Depth (20%), High-intent actions (30%)
- Returns 0-100 score + tier label
- Can be computed on-demand or cached

### Task 8.5: AI Insight Generator
**File:** `src/lib/ai-insights.ts` (new)

- Takes recruit analytics data for a school
- Generates natural-language insight with suggestion
- Format: "[Name] spent [X] on your program, focusing on [sections]. [Notable actions]. Suggestion: [recommendation]."
- Implementation: Template-based with data interpolation (no external AI API needed for MVP; can upgrade to LLM later)

**Test Cases:** TC-15.5

### Task 8.6: Dashboard API Routes
**Files:**
- `src/app/api/analytics/dashboard/route.ts` (new)
- `src/app/api/analytics/recruit/[userId]/route.ts` (new)
- `src/app/api/analytics/insights/[userId]/route.ts` (new)
- `src/app/api/analytics/engagement-scores/route.ts` (new)

All scoped to the coach's school.

### Task 8.7: Analytics Dashboard UI
**File:** `src/app/(platform)/admin/analytics/analytics-dashboard.tsx` (update)

- Overview cards (total recruits, visitors, engagement time, top recruit)
- Activity feed
- Engagement table (sortable, with all columns from spec)
- Recruit detail panel (side panel or modal)
- Section time breakdown chart (Recharts bar chart)
- Specific content list
- Session timeline
- AI insight display
- CSV export button

**Test Cases:** TC-15.1 through TC-15.8

---

## Phase 9: Coach CRM

**Goal:** Tags, notes, lists, and status tracking for recruits.

### Task 9.1: CRM API Routes
**Files:**
- `src/app/api/admin/recruits/[userId]/notes/route.ts` — POST
- `src/app/api/admin/recruits/[userId]/tags/route.ts` — POST, DELETE
- `src/app/api/admin/recruits/[userId]/status/route.ts` — PUT
- `src/app/api/admin/lists/route.ts` — GET, POST
- `src/app/api/admin/lists/[listId]/members/route.ts` — POST, DELETE

### Task 9.2: CRM UI in Recruit Detail Panel
**File:** `src/components/admin/recruit-detail-panel.tsx` (update)

- Tag input (type + enter to add, x to remove)
- Notes section (text input + submit, chronological list)
- Status dropdown (invited → committed pipeline)
- "Add to List" dropdown
- All persisted via API calls

**Test Cases:** TC-16.1 through TC-16.9

### Task 9.3: Recruit Lists Page
**File:** `src/app/(platform)/admin/lists/page.tsx` (new)

- List of named recruit lists
- Click to see members
- Create new list
- Remove members

**Test Cases:** TC-16.5, TC-16.6

---

## Phase 10: Recruit Search (Coach)

**Goal:** Coaches can search all recruits on the platform.

### Task 10.1: Search API
**File:** `src/app/api/admin/recruits/search/route.ts` (new)

- Query params: position, graduationYear, state, heightMin, heightMax, weightMin, weightMax
- Returns recruit profiles matching filters
- Paginated results

### Task 10.2: Search UI
**File:** `src/app/(platform)/admin/recruits/search/page.tsx` (new)

- Filter sidebar/top bar
- Results grid/table with recruit cards
- "Send Invite" button per recruit
- Click recruit to see full profile

**Test Cases:** TC-17.1 through TC-17.6

---

## Phase 11: Program Manager (Coach)

**Goal:** Full content management for schools.

### Task 11.1: Program Manager Routes & UI
**Files:**
- `src/app/(platform)/admin/program/page.tsx` (update) — main settings
- `src/app/(platform)/admin/program/facilities/page.tsx` (new) — manage POIs
- `src/app/(platform)/admin/program/videos/page.tsx` (new) — manage videos
- `src/app/(platform)/admin/program/nil/page.tsx` (new) — NIL + visibility
- `src/app/(platform)/admin/program/roster/page.tsx` (new) — manage roster

### Task 11.2: Facility Management
- Add/edit/remove facilities
- Upload 360° photos
- Set panorama type (photo/video)
- Manage hotspots (position, label, linked facility)
- Set sort order
- Mark required POIs

**Test Cases:** TC-18.3, TC-18.4

### Task 11.3: Video Management
- Add videos (type, title, description, URL, thumbnail)
- Reorder
- Delete

**Test Cases:** TC-18.7

### Task 11.4: NIL Management
- Edit all NIL fields
- Toggle visibility per field (public/invite-only/hidden)

**Test Cases:** TC-18.8

### Task 11.5: Roster Management
- Add/edit/remove players
- Toggle starter status
- Bulk import (CSV) if time allows

**Test Cases:** TC-18.5, TC-18.6

### Task 11.6: Welcome Configuration
- Upload welcome video
- Set default welcome message
- Preview welcome screen

**Test Cases:** TC-18.9, TC-18.10

---

## Phase 12: Landing Page & Marketing

**Goal:** Dual-audience landing page that sells to both recruits and coaches.

### Task 12.1: Landing Page Redesign
**File:** `src/app/page.tsx` (update)

- Hero section: compelling headline + video/animation
- Recruit value prop section: "Explore any program from home"
- Coach value prop section: "See what your recruits care about"
- Featured school preview (with limited interactivity)
- Pricing table (3 tiers, no free)
- CTAs: "I'm a Recruit" → `/register`, "I'm a Coach" → contact/demo
- Social proof / testimonials (placeholder for now)

**Test Cases:** TC-24.1 through TC-24.4

---

## Phase 13: Responsive & Dark Mode Polish

### Task 13.1: Mobile Responsive Pass
- Test all pages at 375px, 768px, 1024px, 1280px
- Fix any overflow, truncation, or layout issues
- Ensure 360° viewer works on touch devices
- Sticky nav → bottom bar on mobile

**Test Cases:** TC-20.1 through TC-20.5

### Task 13.2: Dark Mode Polish
- Verify school colors work in both modes
- Check contrast ratios (WCAG AA)
- Ensure no hard-coded colors that break in dark mode

**Test Cases:** TC-21.1 through TC-21.4

---

## Phase 14: Error Handling & Edge Cases

### Task 14.1: Error Boundaries
- School not found (404)
- API errors (error boundaries with retry)
- Unauthorized access (redirect)
- Analytics failures (silent re-queue)

**Test Cases:** TC-22.1 through TC-22.5

### Task 14.2: Loading States
- Skeleton loaders for school pages
- Loading spinners for API calls
- Optimistic UI for favorites, tags, notes

---

## Phase 15: Performance & Optimization

### Task 15.1: Pre-compute Engagement Scores
- Nightly job or on-demand with caching
- Store computed scores to avoid recalculating on every dashboard load

### Task 15.2: Panorama Preloading
- Preload adjacent panorama images when viewing a POI
- Use Next.js Image optimization where applicable

### Task 15.3: Database Query Optimization
- Ensure all dashboard queries use indexes
- Use Prisma `select` to limit returned fields
- Paginate long lists

**Test Cases:** TC-23.1 through TC-23.4

---

## Seed Data Updates

**File:** `prisma/seed.ts` and `src/data/seed-*.ts`

Update seed data to include:
- All new model fields
- SchoolVideo entries
- NilFieldVisibility entries
- Sample facilities with `panoramaType`, `isRequired`, `sortOrder`
- Sample coach videos
- At least 2 complete schools (Texas Tech + OU) with full data

---

## Implementation Order Summary

1. **Schema & Migration** (foundation for everything)
2. **Auth & Onboarding** (users need to exist before anything works)
3. **Invite System & Welcome** (key differentiator, coach-side entry point)
4. **School Page Immersive Scroll** (core recruit experience structure)
5. **360° Tour** (centerpiece feature)
6. **Content Sections** (football, academics, NIL, roster, alumni, video)
7. **Jersey Builder** (engagement + sharing)
8. **Analytics Enhancement** (core coach value)
9. **Coach CRM** (tags, notes, lists, status)
10. **Recruit Search** (coach tool)
11. **Program Manager** (coach content management)
12. **Landing Page** (marketing)
13. **Responsive & Dark Mode** (polish)
14. **Error Handling** (robustness)
15. **Performance** (optimization)

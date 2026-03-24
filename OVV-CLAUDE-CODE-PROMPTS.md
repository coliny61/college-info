# OVV — Claude Code Prompts

Copy-paste each prompt into Claude Code one phase at a time. Wait for each phase to complete before starting the next. Each prompt tells Claude Code exactly what to do and which docs to reference.

---

## PHASE 1: Schema & Data Model Updates

```
Read OVV-PRODUCT-SPEC.md Section 8 (Data Model Changes Needed) and OVV-IMPLEMENTATION-GUIDE.md Phase 1.

Update prisma/schema.prisma with ALL the changes specified:

1. Add new fields to existing models:
   - User: add recruitType String?
   - RecruitProfile: add currentSchool, collegeStats, eligibilityYears, transferReason, profilePhotoUrl, profileCompleteness
   - School: add stadiumCapacity, traditions, gameDayDescription, welcomeVideoUrl, defaultWelcomeMsg
   - Sport: add strengthProgram, nutritionProgram, recentBowlGames String[], conferenceStanding
   - Coach: add videoUrl, coachingTree String[]
   - Facility: add panoramaType, videoUrl, sortOrder Int @default(0), isRequired Boolean @default(false)
   - NilProgram: add averageDealSize Int?, howToGetInvolved String? @db.Text
   - InviteLink: add welcomeMessage String? @db.Text, welcomeVideoUrl String?
   - School: add welcomeVideoUrl String?, defaultWelcomeMsg String? @db.Text

2. Create ALL new models exactly as specified in the spec:
   - SchoolVideo
   - RecruitNote (with dual User relations: CoachNotes and RecruitNotes)
   - RecruitTag
   - RecruitList + RecruitListMember
   - RecruitStatus
   - NilFieldVisibility

3. Add all reverse relations on User and School models for the new models.

4. Add indexes:
   - AnalyticsEvent: @@index([schoolId, userId, section]), @@index([schoolId, createdAt])
   - RecruitProfile: @@index([sport, graduationYear, state]), @@index([position])

5. Run: npx prisma generate

Do NOT run migrate yet — just update the schema and generate the client. Verify the schema is valid by running prisma generate successfully.
```

---

## PHASE 2: Authentication & Onboarding

```
Read OVV-PRODUCT-SPEC.md Sections 3.1 (Signup & Onboarding) and OVV-IMPLEMENTATION-GUIDE.md Phase 2. Also read OVV-TEST-CASES.md TC-1 and TC-2 for expected behavior.

Implement the following:

1. UPDATE src/middleware.ts:
   - /recruit/* requires authenticated user with role "recruit"
   - /admin/* requires authenticated user with role "coach_admin"
   - Unauthenticated users → redirect to /login
   - Wrong role → redirect to appropriate dashboard
   - Public routes: /, /about, /privacy, /terms, /schools/*, /login, /register, /invite/*, /jersey/*

2. REWRITE src/components/recruit/onboarding-wizard.tsx:
   - Single-page wizard with sections
   - Required fields: sport (default Football) + graduation year ONLY
   - Optional fields: position, height, weight, GPA, SAT, ACT, high school, city, state, bio, highlights URL
   - Recruit type toggle: "High School" or "Transfer" — when Transfer selected, show additional fields: currentSchool, collegeStats, eligibilityYears (dropdown 1-4), transferReason
   - Profile completeness bar with weighted calculation: sport+grad year = 15%, position = 10%, height/weight = 10%, GPA = 10%, test scores = 10%, high school/location = 10%, bio = 15%, highlights = 20%
   - Completeness messaging per tier: 0-25% "Complete your profile so coaches can find you", 26-50% "You're getting there", 51-75% "Almost done", 76-99% "Just a few more details!", 100% "Profile complete"
   - Zod validation for required fields
   - On submit: save RecruitProfile via server action, calculate and store profileCompleteness

3. UPDATE src/app/(platform)/recruit/profile/profile-form.tsx:
   - Make all fields editable
   - Show completeness bar (same component as onboarding)
   - Add transfer fields when recruit type is Transfer
   - Recalculate completeness on save

4. UPDATE src/app/(platform)/recruit/profile/page.tsx to show the updated form.

Verify against test cases TC-1.1 through TC-1.8 and TC-2.1 through TC-2.5.
```

---

## PHASE 3: Invite System & Welcome Screen

```
Read OVV-PRODUCT-SPEC.md Sections 2.3, 3.1.3, and 4.3 (Invite System & Welcome). Read OVV-IMPLEMENTATION-GUIDE.md Phase 3. Read OVV-TEST-CASES.md TC-3 and TC-4.

Implement:

1. API ROUTES:
   - src/app/api/invite/[code]/route.ts (GET) — Public. Validate invite code exists, not expired. Return school info (name, logo, colors, coach name/photo) or error.
   - src/app/api/admin/invites/route.ts (GET) — List all invites for coach's school. (POST) — Generate new invite with optional expiresAt, welcomeMessage, welcomeVideoUrl.
   - src/app/api/admin/invites/[id]/route.ts (DELETE) — Deactivate invite.

2. UPDATE src/app/(auth)/invite/[code]/page.tsx:
   - Call GET /api/invite/[code] to validate
   - If valid: show school branding (colors, logo) + "You've been invited by [School Name]" + signup form
   - If expired: error message "This invite link has expired" + link to normal register
   - If invalid: error "Invalid invite link" + link to normal register
   - After signup: store invite code association on user, increment usedCount
   - Redirect to /recruit/welcome/[code] instead of dashboard

3. CREATE src/app/(platform)/recruit/welcome/[code]/page.tsx:
   - Full school branding (colors, logo as background/header)
   - Coach photo + name + title
   - Welcome video (if welcomeVideoUrl exists on invite or school default) — embedded player
   - Welcome message text (from invite or school default)
   - "Start Your Visit" CTA → navigates to /recruit/school/[slug]
   - Track analytics: welcome.view_welcome, welcome.play_welcome_video

4. UPDATE src/app/(platform)/admin page or CREATE src/app/(platform)/admin/invites/page.tsx:
   - List active invite links: code, created date, expiration, used count
   - Generate new link button (with optional expiration date picker)
   - Copy link to clipboard button
   - Deactivate button
   - Bulk generate (quantity input + shared expiration)

Verify against TC-3.1 through TC-3.7 and TC-4.1 through TC-4.5.
```

---

## PHASE 4: Immersive School Page

```
Read OVV-PRODUCT-SPEC.md Sections 3.4 (School Detail Page) and 7.1 (School Theming). Read OVV-IMPLEMENTATION-GUIDE.md Phase 4. Read OVV-TEST-CASES.md TC-6.

This is a major refactor of the school detail page from tabs to immersive scroll.

1. REFACTOR src/app/(platform)/recruit/school/[slug]/page.tsx:
   - Remove the SchoolTabs component
   - Set CSS custom properties on the page wrapper div: --school-primary, --school-secondary, --school-accent from the school's DB values
   - Render ALL sections sequentially in one scrollable page with clear visual separators between sections
   - Sections in order: Header → Tour → Football → Academics → NIL → Roster → Alumni → Jersey Room → Video & Media
   - Each section has an id attribute for scroll navigation (id="tour", id="football", etc.)

2. CREATE src/components/school/section-navigator.tsx:
   - Fixed sidebar on desktop (right side), fixed bottom bar on mobile
   - Icons + labels for sections: Tour, Football, Academics, NIL, Roster, Alumni, Jersey, Video
   - Uses Intersection Observer to highlight current section based on scroll position
   - Click scrolls smoothly to that section
   - Active state uses --school-accent color
   - Collapses/expands on mobile

3. UPDATE src/components/school/school-header.tsx:
   - Large school logo
   - Name + mascot
   - Conference badge
   - City, State
   - Favorite heart toggle
   - Background gradient using --school-primary
   - Ensure it works in both light and dark mode

4. All existing tab components (overview-tab, academics-tab, athletics-tab, campus-tab, nil-tab, alumni-tab, tour-tab) should be converted to section components that render inline rather than as tab panels. They no longer need to be conditionally rendered.

5. Track analytics: school.page_view on page load.

Verify against TC-6.1 through TC-6.7.
```

---

## PHASE 5: 360° Virtual Tour

```
Read OVV-PRODUCT-SPEC.md Section 3.4.2 (Virtual Tour). Read OVV-IMPLEMENTATION-GUIDE.md Phase 5. Read OVV-TEST-CASES.md TC-7.

This replaces the current 2D panorama viewer with a true 360° experience.

1. Install: npm install @photo-sphere-viewer/core @photo-sphere-viewer/markers-plugin @photo-sphere-viewer/virtual-tour-plugin

2. REWRITE src/components/school/panorama-viewer.tsx:
   - Use Photo Sphere Viewer for true equirectangular 360° projection
   - Mouse/touch drag to look around in all directions
   - Scroll/pinch to zoom
   - Fullscreen button
   - Autorotate when idle (slow pan, stops on user interaction)
   - Render hotspots as markers (pins with labels) using the markers plugin
   - Hotspot click: if linkedFacilityId exists → navigate to that facility's panorama. Otherwise show info popup (label + description).
   - Transition animation between panoramas (fade)
   - Mobile: enable gyroscope if available

3. CREATE src/components/school/tour-thumbnail-strip.tsx:
   - Horizontal scrollable strip of facility thumbnails below the panorama
   - Show facility name under each thumbnail
   - Active facility highlighted with --school-primary color
   - Click to navigate panorama to that facility

4. CREATE src/components/school/tour-campus-map.tsx:
   - Small map overlay in corner of the tour section
   - Pins for each facility at positions (use facility's x/y coordinates or approximate layout)
   - Active pin highlighted
   - Click pin to navigate to that facility
   - Expand button to go full-screen overlay

5. UPDATE the tour section to compose all three components together: panorama viewer + thumbnail strip + campus map.

6. Add analytics tracking: tour.view_panorama (with duration), tour.click_hotspot, tour.navigate_poi.

7. If school has no facilities with panoramaUrl, show placeholder: "360° tour coming soon for [School Name]" with school-branded styling.

Verify against TC-7.1 through TC-7.12.
```

---

## PHASE 6: Content Sections

```
Read OVV-PRODUCT-SPEC.md Sections 3.4.3 through 3.4.9 (all content sections). Read OVV-IMPLEMENTATION-GUIDE.md Phase 6. Read OVV-TEST-CASES.md TC-8, TC-9, TC-10, TC-12.

Refactor all existing tab components into scroll sections and add missing content.

1. FOOTBALL SECTION (refactor src/components/school/athletics-tab.tsx → inline section):
   - Head coach LARGE card: photo, name, title, career record, years, championships, awards, NFL players developed, coaching tree
   - Assistant coaches grid: photo, name, title, bio (truncated, click to expand), years, career highlights, previous roles
   - Offensive scheme: name + description paragraph
   - Defensive scheme: name + description paragraph
   - Player Development: S&C program overview, nutrition program, sports medicine info
   - Game Day: stadium capacity, traditions, atmosphere description
   - Performance: current record, conference standing, ranking, recent bowl games
   - Analytics: track football.view_section, football.view_coach_bio (with duration + coachId), football.view_scheme

2. ACADEMICS SECTION (refactor src/components/school/academics-tab.tsx):
   - TOP: Athlete-specific stats FIRST — athlete graduation rate, academic support, tutoring hours, study hall requirements, student-to-faculty ratio
   - School-wide stats: enrollment, admission rate, SAT/ACT avg, tuition, graduation rate, median earnings, retention, ranking
   - Colleges list with expandable drill-down → majors → degree pathways → career outcomes
   - Analytics: track academics.view_section, academics.view_college, academics.view_major

3. NIL SECTION (refactor src/components/school/nil-tab.tsx):
   - Check NilFieldVisibility for each field (public/invite_only/hidden)
   - For invite_only: check if current user has an InviteLink association for this school
   - Show visible fields: collective name, founded, total budget, football spend, average deal size, notable deals, description, how to get involved
   - Analytics: track nil.view_section with duration

4. ROSTER SECTION (create new or refactor):
   - Full roster table/card grid
   - Filter by position group
   - Starter badge
   - Sortable columns

5. ALUMNI SECTION (refactor src/components/school/alumni-tab.tsx):
   - Cards sorted by draft year desc
   - First-round pick badge
   - Active/retired indicator

6. VIDEO & MEDIA SECTION (CREATE src/components/school/video-section.tsx):
   - Query SchoolVideo records for this school
   - Organize by type: Coach Intros, Highlights, Day-in-the-Life
   - Embedded video player for each (YouTube/Vimeo embeds or HTML5 video)
   - Analytics: track video.view_coach_video, video.view_highlight, video.view_day_in_life with duration

Verify against TC-8.1-8.9, TC-9.1-9.5, TC-10.1-10.6, TC-12.1-12.5.
```

---

## PHASE 7: Jersey Builder

```
Read OVV-PRODUCT-SPEC.md Sections 3.4.8 (Jersey Room) and 11 (Social Sharing). Read OVV-IMPLEMENTATION-GUIDE.md Phase 7. Read OVV-TEST-CASES.md TC-11.

Enhance the existing jersey builder with save, share, and coach notifications.

1. UPDATE src/components/jersey/jersey-builder.tsx, jersey-canvas.tsx, asset-selector.tsx:
   - Visual canvas showing helmet + jersey + pants composited together
   - Asset selector: horizontal strip of color options per piece (helmet, jersey, pants)
   - Real-time preview updates on selection change
   - School branding applied (--school-primary colors)

2. SAVE FUNCTIONALITY:
   - "Save" button creates JerseySelection record (userId, schoolId, helmetId, jerseyId, pantsId)
   - Toast notification: "Jersey combo saved!"
   - Analytics event: jersey.save_combo with {helmetId, jerseyId, pantsId}

3. SHARE — IMAGE GENERATION:
   - Use HTML Canvas API to composite the three pieces into a single PNG
   - Add school logo in corner + small "Built on OVV" watermark
   - "Download" button: trigger canvas.toDataURL() → download as PNG

4. SHARE — SOCIAL + URL:
   - CREATE src/app/jersey/[id]/page.tsx — public shareable page
   - Set OG meta tags: og:title "My Jersey Combo — [School Name]", og:image (generated image), og:url
   - For OG image: CREATE src/app/api/jersey/og/[id]/route.ts that returns a generated image (use @vercel/og or canvas)
   - Share buttons: Twitter/X (pre-filled tweet + URL), Instagram (download prompt), Copy Link
   - Analytics: jersey.share_combo with {platform}

5. COACH NOTIFICATION: Jersey save events are already tracked via analytics. Ensure they appear in the coach dashboard activity feed and contribute +15 to engagement score.

6. FALLBACK: If school has no jersey assets, show "Jersey builder coming soon for [School Name]"

Verify against TC-11.1 through TC-11.9.
```

---

## PHASE 8: Analytics Enhancement

```
Read OVV-PRODUCT-SPEC.md Sections 4.2 (Analytics Dashboard) and 5 (Analytics Tracking System). Read OVV-IMPLEMENTATION-GUIDE.md Phase 8. Read OVV-TEST-CASES.md TC-15 and TC-19.

This is the core coach value prop. Enhance the entire analytics system.

1. UPDATE src/lib/analytics-tracker.ts:
   - Use navigator.sendBeacon on beforeunload (not fetch)
   - Add heartbeat: while a section is in view, send a duration ping every 10 seconds
   - Session ID generation remains the same

2. UPDATE src/hooks/use-analytics.ts:
   - useTrackSection(section, schoolId): uses Intersection Observer, starts timer when section enters viewport, sends duration events every 10s, stops when leaving
   - useTrackEvent(section, action, metadata): fire-and-forget event tracking
   - useTrackVideo(videoRef, section, metadata): hooks into video play/pause/ended for watch time

3. CREATE src/lib/engagement-score.ts:
   - Function: calculateEngagementScore(userId, schoolId) → { score: number, tier: string }
   - Weights: Time 30%, Section diversity 20%, Depth 20%, Intent 30%
   - Intent scoring: favorite = +15, jersey save = +15, NIL view >2min = +10, return session = +10
   - Tiers: 0-25 Low, 26-50 Moderate, 51-75 High, 76-100 Very High
   - If school has fewer than 7 sections, diversity normalizes against available sections
   - Score 0 with no events = "Not yet visited"
   - Cache result for 5 minutes

4. CREATE src/lib/ai-insights.ts:
   - Function: generateInsight(userId, schoolId) → string
   - Template-based: analyze top sections by time, notable actions, generate natural language
   - Format: "[Name] spent [X] on your program, focusing on [sections]. [Actions]. Suggestion: [recommendation]."
   - Only generate for score >= 26

5. CREATE API ROUTES:
   - src/app/api/analytics/dashboard/route.ts (GET) — returns: totalInvited, totalVisited, totalEngagementTime, topRecruit, recentActivity[]. Scoped to coach's schoolId.
   - src/app/api/analytics/recruit/[userId]/route.ts (GET) — returns: sectionBreakdown[], specificContent[], sessionTimeline[], engagementScore, insight
   - src/app/api/analytics/engagement-scores/route.ts (GET) — returns all recruit scores for a school
   - src/app/api/analytics/insights/[userId]/route.ts (GET) — returns AI insight text
   - UPDATE src/app/api/analytics/track/route.ts — add Zod validation, rate limiting (100/min)

6. UPDATE src/app/(platform)/admin/analytics/analytics-dashboard.tsx:
   - Overview cards: total invited, visited, engagement time, top recruit
   - Recent activity feed (timestamped events)
   - Engagement table: sortable by name, position, grad year, state, total time, sections viewed, engagement score, last visit, jersey saved, favorited
   - Click recruit → side panel with: section time bar chart (Recharts), specific content list, session timeline, AI insight, CRM quick-actions (tag, note, status)
   - CSV export button

Verify against TC-15.1-15.8 and TC-19.1-19.8.
```

---

## PHASE 9: Coach CRM

```
Read OVV-PRODUCT-SPEC.md Section 4.4 (Recruit CRM). Read OVV-IMPLEMENTATION-GUIDE.md Phase 9. Read OVV-TEST-CASES.md TC-16.

1. CREATE API ROUTES:
   - src/app/api/admin/recruits/[userId]/notes/route.ts — POST: add note (coachId, recruitId, schoolId, content)
   - src/app/api/admin/recruits/[userId]/tags/route.ts — POST: add tag. DELETE with tag param: remove tag.
   - src/app/api/admin/recruits/[userId]/status/route.ts — PUT: update status (invited/viewed/engaged/contacted/visited/offered/committed)
   - src/app/api/admin/lists/route.ts — GET: all lists for school. POST: create list.
   - src/app/api/admin/lists/[listId]/members/route.ts — POST: add recruit. DELETE: remove recruit.

2. UPDATE src/components/admin/recruit-detail-panel.tsx:
   - Tags: input field, type + enter to add, x to remove, displayed as colored badges
   - Notes: text area + submit, list of notes in reverse chronological order, each with timestamp
   - Status: dropdown with pipeline stages, visual indicator (color-coded)
   - "Add to List" dropdown showing existing lists
   - All actions call APIs and update UI optimistically

3. CREATE src/app/(platform)/admin/lists/page.tsx:
   - List of recruit lists with member count
   - Click to expand and see members
   - Create new list button
   - Remove members

4. ADD FILTERING to the engagement table:
   - Filter by tag
   - Filter by status
   - Filter by position, grad year

Verify against TC-16.1 through TC-16.9.
```

---

## PHASE 10: Recruit Search

```
Read OVV-PRODUCT-SPEC.md Section 4.5 (Recruit Search). Read OVV-IMPLEMENTATION-GUIDE.md Phase 10. Read OVV-TEST-CASES.md TC-17.

1. CREATE src/app/api/admin/recruits/search/route.ts (GET):
   - Query params: position, graduationYear, state, heightMin, heightMax, weightMin, weightMax
   - Queries RecruitProfile + User tables
   - Returns paginated results (20 per page)
   - Returns: name, position, gradYear, height, weight, highSchool, city, state, gpa, highlightsUrl

2. CREATE src/app/(platform)/admin/recruits/search/page.tsx:
   - Filter bar: position multi-select, grad year multi-select, state multi-select, height range, weight range
   - Results: card grid or table showing recruit info
   - "Send Invite" button per recruit — generates invite link for coach's school
   - Click recruit to see full profile in a panel/modal

Verify against TC-17.1 through TC-17.6.
```

---

## PHASE 11: Program Manager

```
Read OVV-PRODUCT-SPEC.md Section 4.6 (Program Manager). Read OVV-IMPLEMENTATION-GUIDE.md Phase 11. Read OVV-TEST-CASES.md TC-18.

Build the coach's content management interface.

1. UPDATE src/app/(platform)/admin/program/page.tsx:
   - Edit school description, logo, hero image, colors
   - Upload welcome video (max 2 min, MP4)
   - Set default welcome message

2. CREATE src/app/(platform)/admin/program/facilities/page.tsx:
   - List facilities with sort order, required badge
   - Add new facility: name, type, description, panorama photo upload, panoramaType, videoUrl, isRequired, sortOrder
   - Edit existing facilities
   - Manage hotspots per facility: set x/y position, label, description, linkedFacilityId

3. CREATE src/app/(platform)/admin/program/videos/page.tsx:
   - List videos by type
   - Add: type (coach_intro/highlight/day_in_life), title, description, videoUrl, thumbnailUrl, coachId/playerName
   - Reorder, delete

4. CREATE src/app/(platform)/admin/program/nil/page.tsx:
   - Edit all NilProgram fields
   - Toggle NilFieldVisibility per field (public/invite_only/hidden)

5. CREATE src/app/(platform)/admin/program/roster/page.tsx:
   - List players, sortable
   - Add/edit/remove players
   - Toggle starter status

6. CREATE necessary API routes for all CRUD operations above under /api/admin/.

Verify against TC-18.1 through TC-18.10.
```

---

## PHASE 12: Landing Page

```
Read OVV-PRODUCT-SPEC.md Section 6 (Pricing) and OVV-TEST-CASES.md TC-24.

UPDATE src/app/page.tsx — Complete redesign of the landing page:

1. Hero section with compelling headline and CTA
2. Recruit value prop: "Explore any program from home" with feature highlights (360° tours, jersey builder, program intel)
3. Coach value prop: "See what your recruits care about" with analytics preview mockup
4. Featured school preview section (pulls a real school from DB)
5. Pricing table with 3 tiers (Starter $99/mo, Pro $249/mo, Elite Custom) — feature comparison grid per spec Section 6.1
6. Dual CTAs: "I'm a Recruit" → /register, "I'm a Coach" → /register?role=coach or contact form
7. Footer with links to /about, /privacy, /terms
8. Fully responsive, dark mode compatible
9. Use school colors from a featured school for visual flair

Verify against TC-24.1 through TC-24.4.
```

---

## PHASE 13: Responsive & Dark Mode

```
Read OVV-PRODUCT-SPEC.md Section 7 (Design System). Read OVV-TEST-CASES.md TC-20 and TC-21.

Do a complete responsive and dark mode polish pass:

1. Test every page at 375px (mobile), 768px (tablet), 1024px (laptop), 1280px (desktop)
2. Fix: overflow, truncation, layout breaks, touch targets too small
3. 360° viewer: full-width on mobile, touch controls work
4. Sticky section navigator: side on desktop → bottom on mobile
5. Jersey builder: asset selector scrolls horizontally on mobile
6. Coach dashboard: tables scroll horizontally, cards stack
7. Dark mode: verify ALL school colors work on dark backgrounds with sufficient contrast (WCAG AA)
8. Verify system preference detection works (next-themes defaultTheme="system")
9. Add manual theme toggle in navigation

Verify against TC-20.1-20.5 and TC-21.1-21.4.
```

---

## PHASE 14: Error Handling

```
Read OVV-TEST-CASES.md TC-22.

1. School not found → custom 404 page at src/app/(platform)/recruit/school/[slug]/not-found.tsx with "School not found" + link to browse
2. API errors → error boundaries with retry button (src/app/(platform)/recruit/error.tsx, admin/error.tsx)
3. Analytics failures → silent re-queue in analytics-tracker.ts (already partially done, verify)
4. Unauthorized API access → return 401 with clear message
5. Coach accessing wrong school data → return 403
6. Add skeleton loaders for: school page sections, dashboard, recruit list
7. Add optimistic UI for: favorites toggle, tag add/remove, note submission
```

---

## PHASE 15: Performance

```
Read OVV-PRODUCT-SPEC.md Section 14.6 (Performance Targets) and OVV-TEST-CASES.md TC-23.

1. Engagement score caching: compute on-demand, cache for 5 minutes (use a simple in-memory Map with TTL or store lastComputed timestamp in DB)
2. Panorama preloading: when viewing a POI, preload images for all hotspot-linked facilities in the background
3. Database: ensure all queries use Prisma select to limit returned fields. Verify indexes exist.
4. Paginate: recruit search results (20/page), analytics events, roster
5. Next.js optimizations: use dynamic imports for heavy components (panorama viewer, jersey canvas, recharts)
6. Image optimization: use Next.js Image component for all images, WebP format where possible

Targets: school page <3s, first panorama <5s, analytics batch <500ms, dashboard <2s.
```

---

## SEED DATA UPDATE (Run after Phase 1)

```
Read OVV-PRODUCT-SPEC.md Section 8 for all new models and fields.

Update prisma/seed.ts and src/data/seed-*.ts to include:
- All new fields on existing models (School, Sport, Coach, Facility, NilProgram, InviteLink)
- SchoolVideo entries (at least 2 coach intros, 1 highlight reel, 1 day-in-life per school)
- NilFieldVisibility entries (one per school, with realistic defaults)
- Facility updates: add panoramaType, sortOrder, isRequired flags
- Coach updates: add videoUrl, coachingTree
- Ensure at least 2 fully complete schools (Texas Tech + OU) with all data populated

Run the seed: npx prisma db seed
```

---

## Tips for Using These Prompts

1. **One phase at a time.** Don't paste multiple phases at once.
2. **If Claude Code asks questions,** refer it to the spec docs. Say: "Check OVV-PRODUCT-SPEC.md Section X for details."
3. **After each phase,** test manually in the browser before moving to the next.
4. **If something breaks,** tell Claude Code: "This broke [what]. Check OVV-TEST-CASES.md TC-X.X for expected behavior and fix it."
5. **The CLAUDE.md file** means Claude Code will automatically read it at the start of every session, so it always has context.
6. **For schema changes,** after Phase 1, run the actual migration when you're ready: `npx prisma migrate dev --name full-product-spec`

# OVV Bug Report — Phases 1–6 Audit
**Date:** March 25, 2026
**Audited by:** Cowork session (parallel to Phase 7 Claude Code run)
**TypeScript compilation:** PASS (zero errors via `tsc --noEmit`)

---

## P0 — Fix Before Proceeding

### BUG-001: FavoriteButton receives slug instead of schoolId
- **File:** `src/components/school/school-header.tsx` (line ~93)
- **Issue:** `<FavoriteButton schoolId={slug} ...>` passes the URL slug (e.g. "texas-tech") but `toggleFavorite()` expects a UUID school ID. Will cause a database constraint violation.
- **Fix:** Pass `school.id` instead of `slug`.

### BUG-002: Admin invites DELETE has weak authorization
- **File:** `src/app/api/admin/invites/[id]/route.ts` (lines 27-30)
- **Issue:** The condition `if (dbUser?.schoolId && dbUser.schoolId !== invite.schoolId)` falls through when `dbUser.schoolId` is null/undefined, allowing any user without a school to delete any invite.
- **Fix:** Change to `if (!dbUser?.schoolId || dbUser.schoolId !== invite.schoolId)`.

### BUG-003: Analytics export missing school-scoped auth
- **File:** `src/app/api/analytics/export/route.ts` (lines 29-40)
- **Issue:** Any authenticated user can export analytics for ANY school by passing a `schoolId` param. No verification that the coach owns that school.
- **Fix:** Look up the coach's `schoolId` from their user record and verify it matches.

### BUG-004: Admin actions don't verify coach_admin role
- **File:** `src/app/(platform)/admin/actions.ts`
- **Issue:** `getAdminSchool()` checks auth but never verifies `dbUser.role === 'coach_admin'`. It also falls back to `prisma.school.findFirst()` if the user has no school — meaning any authenticated user could manage a random school.
- **Fix:** Add `if (!dbUser || dbUser.role !== 'coach_admin') throw new Error('Not authorized')` and remove the `findFirst()` fallback.

---

## P1 — Fix Soon (Error Handling & Validation)

### BUG-005: Admin invites POST has no Zod validation
- **File:** `src/app/api/admin/invites/route.ts` (lines 44-59)
- **Issue:** Uses `request.json().catch(() => ({}))` with type casting instead of Zod. Invalid data silently accepted.
- **Fix:** Add Zod schema for `expiresAt`, `welcomeMessage`, `welcomeVideoUrl`, `quantity`.

### BUG-006: Admin invites GET/POST/DELETE missing try/catch
- **Files:** `src/app/api/admin/invites/route.ts`, `src/app/api/admin/invites/[id]/route.ts`
- **Issue:** No error handling. Prisma failures will return unhandled 500s.
- **Fix:** Wrap in try/catch, return proper error JSON.

### BUG-007: Auth sync-user has unsafe email non-null assertion
- **File:** `src/app/api/auth/sync-user/route.ts` (line ~39)
- **Issue:** `email: user.email!` — crashes if email is null.
- **Fix:** Use `user.email ?? ''` or return 400.

### BUG-008: Analytics tracker uses fetch instead of sendBeacon on unload
- **File:** `src/lib/analytics-tracker.ts` (lines 22-25)
- **Issue:** `beforeunload` handler calls `flush()` with regular fetch, which may not complete during page close. Spec requires `navigator.sendBeacon`.
- **Fix:** Use `navigator.sendBeacon('/api/analytics/track', blob)` in the beforeunload handler.

### BUG-009: Invite expiration date not validated as future
- **File:** `src/app/api/admin/invites/route.ts` (line ~72)
- **Issue:** Coaches can create invites with past expiration dates.
- **Fix:** Validate `new Date(expiresAt) > new Date()`.

### BUG-010: No error.tsx boundary for school detail page
- **File:** Missing: `src/app/(platform)/recruit/school/[slug]/error.tsx`
- **Issue:** If any component (especially PanoramaViewer) throws, the entire page crashes with no graceful fallback.
- **Fix:** Create error boundary component.

---

## P2 — Schema Issues

### BUG-011: SchoolVideo.coachId has no Prisma relation
- **File:** `prisma/schema.prisma` (SchoolVideo model)
- **Issue:** `coachId` field exists but no `@relation` to Coach. Can't navigate from video to coach; no referential integrity.
- **Fix:** Add `coach Coach? @relation(fields: [coachId], references: [id])` and back-reference on Coach.

### BUG-012: Hotspot.linkedFacilityId has no Prisma relation
- **File:** `prisma/schema.prisma` (Hotspot model)
- **Issue:** `linkedFacilityId` field exists but no `@relation` to Facility. Orphaned field.
- **Fix:** Add `linkedFacility Facility? @relation("HotspotLinks", fields: [linkedFacilityId], references: [id])`.

### BUG-013: Missing onDelete handlers on critical relations
- **Files:** `prisma/schema.prisma`
- **Issue:** `InviteLink.creator`, `RecruitList.creator`, and `Facility.sport` relations have no `onDelete` clause. Deleting a User or Sport will cause constraint violations.
- **Fix:** Add `onDelete: Cascade` or `onDelete: SetNull` as appropriate.

### BUG-014: Missing indexes on 18+ foreign key columns
- **File:** `prisma/schema.prisma`
- **Issue:** Most foreign key columns (schoolId, sportId, collegeId, recruitId, coachId, etc.) lack `@@index`. This will cause slow queries as data grows.
- **Fix:** Add `@@index([schoolId])` (and similar) to Sport, Coach, Facility, Hotspot, JerseyAsset, JerseySelection, SchoolVideo, RecruitNote, RecruitList, RosterPlayer, NotableAlumni, College, Major, DegreePathway, CareerOutcome.

---

## P3 — Accessibility & Security

### BUG-015: Video iframe missing title attribute
- **File:** `src/components/school/video-section.tsx` (lines 67-72)
- **Issue:** WCAG 2.1 violation — screen readers can't identify the iframe content.
- **Fix:** Add `title={video.title || "Video"}`.

### BUG-016: Video iframe missing sandbox attribute
- **File:** `src/components/school/video-section.tsx` (line 67)
- **Issue:** No `sandbox` attribute on third-party content iframe — potential XSS.
- **Fix:** Add appropriate `sandbox` attribute.

### BUG-017: Section navigator missing aria-labels
- **File:** `src/components/school/section-navigator.tsx`
- **Issue:** Navigation buttons lack `aria-label` for screen readers.
- **Fix:** Add `aria-label={`Navigate to ${label} section`}`.

---

## P4 — Missing Features (Expected by Spec, Not Yet Built)

### MISSING-001: 31 API routes documented in spec not implemented
The following route groups are missing (many are Phase 8+ items, but some should exist already):
- `GET /api/auth/me`
- `GET/PUT /api/recruit/profile`
- `GET/POST/DELETE /api/recruit/favorites/[schoolId]`
- `GET /api/schools`, `GET /api/schools/[slug]`
- `GET /api/schools/[slug]/tour`, `/videos`, `/jersey-assets`
- `POST /api/jersey/save`, `GET /api/jersey/share/[id]`
- `GET /api/analytics/dashboard`, `/recruit/[userId]`, `/insights/[userId]`, `/engagement-scores`
- All admin recruit management routes
- All admin list management routes
- All admin program management routes

**Note:** Many of these are Phase 8+ work. The routes needed for Phases 1-6 functionality (school browsing, tour, content sections) appear to work via Server Actions instead.

### MISSING-002: No page-level analytics tracking on school detail
- **File:** `src/app/(platform)/recruit/school/[slug]/page.tsx`
- **Issue:** No top-level page view event is tracked. Only child components track section-specific events.

### MISSING-003: No video playback analytics tracking
- **File:** `src/components/school/video-section.tsx`
- **Issue:** Videos render but play/pause/completion events aren't tracked.

---

## P5 — Seed Data Gaps

### SEED-001: No test users seeded
- Users (recruit and coach_admin) are not created by seed script. Auth-dependent features can't be tested.

### SEED-002: No CRM test data
- RecruitNote, RecruitTag, RecruitList, RecruitListMember, RecruitStatus all empty. Phase 9 testing blocked.

### SEED-003: No analytics test data
- AnalyticsEvent table empty. Coach analytics dashboard will show nothing.

### SEED-004: Placeholder asset URLs
- Jersey images, videos, and panorama URLs use placeholder paths that won't load. Expected for dev, but worth noting.

---

## Summary

| Priority | Count | Category |
|----------|-------|----------|
| P0 (Blocker) | 4 | Security, auth bypass, data corruption |
| P1 (High) | 6 | Error handling, validation, UX crashes |
| P2 (Medium) | 4 | Schema integrity, performance |
| P3 (Low) | 3 | Accessibility, security hardening |
| P4 (Feature) | 3 | Missing routes and tracking |
| P5 (Data) | 4 | Seed data for testing |

**Recommendation:** Fix all P0 bugs before continuing Phase 7. P1 items should be addressed in the current sprint. P2-P3 can be batched into Phase 14 (Error Handling & Edge Cases). P4 routes will naturally be built in their respective phases.

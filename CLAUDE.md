# OVV (Official Virtual Visit)

## Project Overview
OVV is a virtual college visit platform focused on college football recruiting. It lets high school and transfer portal recruits explore football programs through immersive 360° tours, detailed program profiles, and interactive features. For coaches, it provides deep behavioral analytics and AI-generated insights so they can personalize real in-person official visits.

## Critical Documentation — READ BEFORE ANY WORK
Before implementing ANY feature, read the relevant sections of these documents:

1. **`OVV-PRODUCT-SPEC.md`** — Complete product specification (features, flows, data models, API routes, pricing)
2. **`OVV-ARCHITECTURE.mermaid`** — System architecture diagram
3. **`OVV-USER-FLOWS.mermaid`** — User flow diagrams (signup, invite, visit, analytics)
4. **`OVV-TEST-CASES.md`** — 150+ test cases organized by feature area (TC-1 through TC-24)
5. **`OVV-IMPLEMENTATION-GUIDE.md`** — 15-phase implementation plan with file paths and task ordering

## Implementation Phases (in order)
1. Schema & Data Model Updates
2. Authentication & Onboarding
3. Invite System & Welcome Screen
4. School Detail Page — Immersive Scroll
5. 360° Virtual Tour
6. Content Sections (Football, Academics, NIL, Roster, Alumni, Video)
7. Jersey Builder (Save + Share + Coach Notification)
8. Analytics System Enhancement
9. Coach CRM (Tags, Notes, Lists, Status)
10. Recruit Search (Coach)
11. Program Manager (Coach Content Management)
12. Landing Page & Marketing
13. Responsive & Dark Mode Polish
14. Error Handling & Edge Cases
15. Performance & Optimization

## Tech Stack
- **Framework:** Next.js 16 (App Router) with TypeScript
- **Database:** PostgreSQL via Supabase
- **ORM:** Prisma 7 (schema at `prisma/schema.prisma`, generated client at `src/generated/prisma`)
- **Auth:** Supabase Auth (`src/lib/supabase/`)
- **UI:** Tailwind CSS 4 + shadcn/ui (`src/components/ui/`)
- **360° Viewer:** Photo Sphere Viewer or Three.js (equirectangular projection)
- **Charts:** Recharts
- **Validation:** Zod
- **Deployment:** Vercel

## Key Architecture Decisions
- **Two user roles only:** `recruit` and `coach_admin` (enum `UserRole` in Prisma)
- **No free tier for schools.** Recruits are always free. Three paid tiers: Starter, Pro, Elite.
- **School branding:** Each school page fully adopts the school's `colorPrimary`, `colorSecondary`, `colorAccent` via CSS custom properties.
- **Immersive scroll** (NOT tabs): School detail page is one continuous scrollable page with a sticky section navigator.
- **Analytics batching:** Client-side queue, flush every 30s or at 50 events, `navigator.sendBeacon` on page close.
- **Engagement scoring:** Weighted 0-100 score (Time 30%, Diversity 20%, Depth 20%, Intent 30%).
- **AI insights:** Template-based text generation from analytics data (no external AI API for MVP).
- **Jersey sharing:** Client-side Canvas API for image compositing, `@vercel/og` for OG share images.
- **Dark/Light mode:** System preference default via `next-themes`.

## File Structure Conventions
- **Pages:** `src/app/(marketing)/`, `src/app/(auth)/`, `src/app/(platform)/recruit/`, `src/app/(platform)/admin/`
- **API routes:** `src/app/api/`
- **Components:** `src/components/` (organized by feature: `school/`, `recruit/`, `admin/`, `jersey/`, `layout/`, `ui/`)
- **Hooks:** `src/hooks/`
- **Lib/utils:** `src/lib/`
- **Seed data:** `src/data/`
- **Types:** `src/types/`

## Database Commands
```bash
# Generate Prisma client after schema changes
npx prisma generate

# Create migration
npx prisma migrate dev --name <migration-name>

# Push schema (skip migration for quick iteration)
npx prisma db push

# Seed database
npx prisma db seed
```

## Coding Standards
- Use TypeScript strict mode
- Validate all API inputs with Zod
- Use server components by default, `'use client'` only when needed
- Use Prisma `select` to limit returned fields on large queries
- Handle errors with try/catch and return proper HTTP status codes
- Use `src/lib/supabase/server.ts` for server-side auth checks
- Use `src/lib/supabase/client.ts` for client-side auth
- All analytics events go through `src/lib/analytics-tracker.ts`
- School-scoped coach APIs must verify `user.schoolId === requestedSchoolId`

## Testing Against Spec
After implementing each feature, verify it against the test cases in `OVV-TEST-CASES.md`. Test case IDs are referenced in the Implementation Guide for each task.

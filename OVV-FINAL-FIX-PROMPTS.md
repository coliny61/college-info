# OVV Final Fix Prompts — Full 15-Phase Audit

Run these prompts in Claude Code **in order**. Wait for each to complete before pasting the next.

---

## Prompt 1: CRITICAL — Auth & School Scoping (Must Fix First)

```
We have critical auth and school-scoping bugs across the entire codebase. Fix ALL of the following. Read each file before editing.

**1. Remove coach self-registration from public register page:**
File: src/app/(auth)/register/page.tsx
The ROLE_OPTIONS array lets anyone register as coach_admin. This is a security hole — coaches should only be created via admin invite flows.
- Remove the coach_admin option from ROLE_OPTIONS entirely
- Hardcode role to 'recruit' in the signUp call
- Remove the role selection UI (the card grid)
- Keep the registration form simple: display name, email, password, submit

**2. Fix ALL admin pages that fall back to prisma.school.findFirst():**
This pattern lets any user without a schoolId see the first school's data. Fix every occurrence:

File: src/app/(platform)/admin/page.tsx
Replace the school lookup logic with:
```typescript
const dbUser = await prisma.user.findUnique({
  where: { id: user.id },
  select: { schoolId: true, role: true },
}).catch(() => null)

if (!dbUser || dbUser.role !== 'coach_admin' || !dbUser.schoolId) {
  redirect('/login?error=no_school_assigned')
}

const school = await prisma.school.findUnique({
  where: { id: dbUser.schoolId },
  include: { ... } // keep existing includes
})

if (!school) {
  redirect('/login?error=school_not_found')
}
```

File: src/app/(platform)/admin/analytics/page.tsx
Same fix — replace `prisma.school.findFirst()` with school-scoped query using the authenticated coach's schoolId. Add auth check at the top.

Search the entire src/app/(platform)/admin/ directory for any other occurrences of `findFirst()` and fix them all the same way.

**3. Fix recruit search to be school-scoped:**
File: src/app/api/admin/recruits/search/route.ts
The search endpoint returns ALL recruits in the system regardless of school. Add schoolId to the query:
- Fetch the coach's schoolId from their user record
- Filter results to only show recruits who have analytics events for that school, OR who were invited by that school
- Add `dbUser.schoolId` to the select query and use it in the where clause

**4. Fix CRM routes — notes, tags, status all need school-scoping:**
These routes verify coach_admin role but don't verify the recruit belongs to the coach's school:
- src/app/api/admin/recruits/[userId]/notes/route.ts
- src/app/api/admin/recruits/[userId]/tags/route.ts
- src/app/api/admin/recruits/[userId]/status/route.ts

For each: after verifying the coach, add a check that the operation includes the coach's schoolId. For notes, tags, and status — the schoolId is already a field in the schema. Make sure the CREATE operations set schoolId to the coach's schoolId, and READ operations filter by it.

**5. Fix middleware to use database role instead of user_metadata:**
File: src/lib/supabase/middleware.ts
Currently reads role from `user.user_metadata?.role` which is client-modifiable.
After getting the Supabase user, do a lightweight fetch to check the database role:
```typescript
// After getting supabase user, verify role from database
const roleRes = await fetch(`${request.nextUrl.origin}/api/auth/sync-user`, {
  method: 'POST',
  headers: { cookie: request.headers.get('cookie') || '' },
}).catch(() => null)
```
Actually, this is tricky in middleware. A simpler approach: keep the metadata check in middleware for initial routing, but ensure ALL server components and API routes verify role from the database (which most already do after the fixes above). Add a comment explaining this tradeoff.

After all fixes, run `npx tsc --noEmit` to verify zero errors.
```

---

## Prompt 2: CRITICAL — Analytics Pipeline Fixes

```
Fix these analytics system bugs. Read each file before editing.

**1. Analytics dashboard page — school scoping (if not already fixed in Prompt 1):**
File: src/app/(platform)/admin/analytics/page.tsx
Ensure the page:
- Gets the authenticated user
- Verifies role === 'coach_admin' and has a schoolId
- Queries analytics ONLY for that schoolId
- Redirects to /login if not authorized

**2. Analytics track route — validate schoolId in event payload:**
File: src/app/api/analytics/track/route.ts
When receiving analytics events, verify that the schoolId in the event matches a real school. Don't let clients send arbitrary schoolIds.
Add validation after parsing the events array:
```typescript
// Validate all schoolIds in the batch exist
const schoolIds = [...new Set(events.map(e => e.schoolId).filter(Boolean))]
if (schoolIds.length > 0) {
  const validSchools = await prisma.school.findMany({
    where: { id: { in: schoolIds } },
    select: { id: true },
  })
  const validIds = new Set(validSchools.map(s => s.id))
  // Filter out events with invalid schoolIds
  events = events.filter(e => !e.schoolId || validIds.has(e.schoolId))
}
```

**3. Engagement score duration units — standardize to milliseconds:**
File: src/lib/engagement-score.ts
Add a comment clarifying that duration is in milliseconds (matching the analytics tracker which uses ms).
File: src/lib/analytics-tracker.ts
Verify the tracker sends duration in milliseconds. If sections track time with Date.now() diffs, the units are already ms. Add a comment confirming this.

**4. Add try/catch to ALL analytics API routes that are missing it:**
- src/app/api/analytics/recruit/[userId]/route.ts
- src/app/api/analytics/insights/[userId]/route.ts
- src/app/api/analytics/engagement-scores/route.ts
- src/app/api/analytics/dashboard/route.ts

Wrap each handler in try/catch returning { error: 'Internal server error' } with status 500.

**5. Validate the 'days' param in analytics export:**
File: src/app/api/analytics/export/route.ts
After parsing `days`, clamp it:
```typescript
const days = Math.min(Math.max(parseInt(searchParams.get('days') ?? '30'), 1), 365)
```

After all fixes, run `npx tsc --noEmit` to verify zero errors.
```

---

## Prompt 3: HIGH — Jersey Builder Completeness

```
Fix these jersey builder issues. Read each file before editing.

**1. Validate jersey asset ownership before saving:**
File: src/app/(platform)/recruit/actions.ts — find the saveJerseyCombo function
Add validation that the helmetId, jerseyId, and pantsId all belong to the specified schoolId:
```typescript
const assets = await prisma.jerseyAsset.findMany({
  where: {
    id: { in: [helmetId, jerseyId, pantsId] },
    schoolId,
  },
  select: { id: true },
})
if (assets.length !== 3) {
  return { error: 'Invalid jersey assets' }
}
```
Also wrap the entire function in try/catch.

**2. Add canvas image load timeout:**
File: src/components/jersey/jersey-canvas.tsx
In the loadImage function, add a timeout:
```typescript
function loadImage(src: string, timeoutMs = 10000): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const timer = setTimeout(() => {
      img.src = ''
      reject(new Error(`Image load timeout: ${src}`))
    }, timeoutMs)
    img.onload = () => { clearTimeout(timer); resolve(img) }
    img.onerror = () => { clearTimeout(timer); reject(new Error(`Failed to load: ${src}`)) }
    img.crossOrigin = 'anonymous'
    img.src = src
  })
}
```

**3. Create OG image route for jersey sharing:**
Create a new file: src/app/jersey/[id]/opengraph-image.tsx
```tsx
import { ImageResponse } from 'next/og'
import { prisma } from '@/lib/prisma'

export const runtime = 'edge'
export const alt = 'Jersey Selection'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({ params }: { params: { id: string } }) {
  const selection = await prisma.jerseySelection.findUnique({
    where: { id: params.id },
    include: {
      school: { select: { name: true, colorPrimary: true, colorSecondary: true, mascot: true } },
    },
  }).catch(() => null)

  if (!selection || !selection.school) {
    return new ImageResponse(
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', background: '#111', color: '#fff', fontSize: 48 }}>
        OVV Jersey Builder
      </div>,
      { ...size }
    )
  }

  return new ImageResponse(
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      width: '100%', height: '100%',
      background: `linear-gradient(135deg, ${selection.school.colorPrimary}, ${selection.school.colorSecondary})`,
      color: '#fff', fontFamily: 'sans-serif',
    }}>
      <div style={{ fontSize: 64, fontWeight: 'bold' }}>{selection.school.name}</div>
      <div style={{ fontSize: 32, opacity: 0.8, marginTop: 16 }}>{selection.school.mascot} — Custom Jersey</div>
      <div style={{ fontSize: 24, opacity: 0.6, marginTop: 32 }}>Built on OVV</div>
    </div>,
    { ...size }
  )
}
```

Note: If Prisma doesn't work in edge runtime, change to `export const runtime = 'nodejs'` and use `ImageResponse` from `next/og`.

After all fixes, run `npx tsc --noEmit` to verify zero errors.
```

---

## Prompt 4: HIGH — Dark Mode & Theme Toggle

```
Dark mode is currently hardcoded to dark in the root layout. Implement proper theme switching.

**1. Install next-themes:**
Run: npm install next-themes

**2. Create theme provider:**
Create src/components/theme-provider.tsx:
```tsx
'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ReactNode } from 'react'

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  )
}
```

**3. Create theme toggle component:**
Create src/components/theme-toggle.tsx:
```tsx
'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Sun, Moon, Monitor } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return <Button variant="ghost" size="icon" className="h-8 w-8" disabled><Monitor className="h-4 w-4" /></Button>

  const next = theme === 'dark' ? 'light' : theme === 'light' ? 'system' : 'dark'
  const Icon = theme === 'dark' ? Moon : theme === 'light' ? Sun : Monitor

  return (
    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setTheme(next)} aria-label={`Switch to ${next} theme`}>
      <Icon className="h-4 w-4" />
    </Button>
  )
}
```

**4. Update root layout:**
File: src/app/layout.tsx
- Remove the hardcoded `className="dark"` from the <html> tag (just use `suppressHydrationWarning`)
- Import ThemeProvider and wrap the body content:
```tsx
import { ThemeProvider } from '@/components/theme-provider'

// In the html tag:
<html lang="en" suppressHydrationWarning>
  <body>
    <ThemeProvider>
      {children}
    </ThemeProvider>
  </body>
</html>
```

**5. Add ThemeToggle to platform topbar:**
File: src/components/layout/platform-topbar.tsx
Import and add `<ThemeToggle />` next to the user menu / settings area.

**6. Add ThemeToggle to marketing nav:**
File: src/components/layout/marketing-nav.tsx
Add the toggle in the nav actions area.

After all changes, run `npx tsc --noEmit` to verify zero errors.
```

---

## Prompt 5: HIGH — Admin Program Manager CRUD UI

```
The admin program manager pages are currently read-only. Add edit/delete functionality to each.

**1. Facilities page — add edit and delete:**
File: src/app/(platform)/admin/program/facilities/page.tsx
Add to each facility row:
- An "Edit" button that opens an inline form (or dialog) with: name, type, description, sortOrder, isRequired toggle, panoramaUrl input
- A "Delete" button with confirmation dialog
- Wire these to the existing `createFacility` and `deleteFacility` actions in admin/actions.ts
- Add a new `updateFacility` server action in admin/actions.ts if it doesn't exist

**2. Videos page — add create, edit, delete:**
File: src/app/(platform)/admin/program/videos/page.tsx
Add:
- "Add Video" button that opens a form with: title, type (coach_intro/highlight/day_in_life), videoUrl, thumbnailUrl, description, playerName, sortOrder
- Edit and Delete buttons on each video row
- Create server actions in admin/actions.ts: createVideo, updateVideo, deleteVideo

**3. Roster page — add create and delete:**
File: src/app/(platform)/admin/program/roster/page.tsx
Add:
- "Add Player" button with form: name, number, position, height, weight, year, hometown, state, highSchool, isStarter
- Delete button on each player row
- Create server actions: createRosterPlayer, deleteRosterPlayer

**4. NIL page — add visibility toggles:**
File: src/app/(platform)/admin/program/nil/page.tsx
For each visibility field (totalBudget, footballSpend, allSportsSpend, averageDealSize, notableDeals):
- Replace the read-only badge with a <select> dropdown with options: public, invite_only, hidden
- On change, call a new server action: updateNilVisibility

**5. Add missing server actions to admin/actions.ts:**
Add these if they don't exist:
- updateFacility(facilityId: string, formData: FormData)
- createVideo(formData: FormData)
- updateVideo(videoId: string, formData: FormData)
- deleteVideo(videoId: string)
- createRosterPlayer(formData: FormData)
- deleteRosterPlayer(playerId: string)
- updateNilVisibility(formData: FormData)

Each action must:
- Call getAdminSchool() for auth
- Validate input with Zod
- Revalidate both admin and recruit paths

After all changes, run `npx tsc --noEmit` to verify zero errors.
```

---

## Prompt 6: MEDIUM — Error Boundaries & Loading States

```
Add missing error boundaries and loading states across the app.

**1. Create loading.tsx files for these routes:**
- src/app/(platform)/admin/program/loading.tsx
- src/app/(platform)/admin/program/facilities/loading.tsx
- src/app/(platform)/admin/program/videos/loading.tsx
- src/app/(platform)/admin/program/roster/loading.tsx
- src/app/(platform)/admin/program/nil/loading.tsx

Each should show a skeleton with the Skeleton component:
```tsx
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-48" />
      <div className="space-y-3">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    </div>
  )
}
```

**2. Create error.tsx for admin subroutes that don't have one:**
- src/app/(platform)/admin/analytics/error.tsx
- src/app/(platform)/admin/program/error.tsx

Use the same pattern as src/app/(platform)/admin/error.tsx (import and render ErrorPage component).

**3. Ensure the invite page handles concurrent use:**
File: src/app/(auth)/invite/[code]/page.tsx
Before the signUp call, re-validate the invite hasn't expired or been fully used:
```typescript
// Re-check invite validity before signup
const recheckRes = await fetch(`/api/invite/${code}`)
const recheck = await recheckRes.json()
if (recheck.status !== 'valid') {
  setError('This invite is no longer valid. Please request a new one.')
  return
}
```

After all changes, run `npx tsc --noEmit` to verify zero errors.
```

---

## Prompt 7: MEDIUM — Revalidation & Missing Cache Busting

```
Server actions need to revalidate all affected paths when content changes.

File: src/app/(platform)/admin/actions.ts

**1. Fix revalidation in existing actions:**
Every action that modifies school data should revalidate BOTH admin and recruit pages:

For updateSchoolProfile:
```typescript
revalidatePath('/admin/program')
revalidatePath('/recruit')
revalidatePath(`/recruit/school/${school.slug}`)
revalidatePath(`/schools/${school.slug}`)
```

For createFacility / deleteFacility:
```typescript
revalidatePath('/admin/program/facilities')
revalidatePath('/admin/program')
revalidatePath(`/recruit/school/${school.slug}`)
```

For createCoach / deleteCoach:
```typescript
revalidatePath('/admin/program')
revalidatePath(`/recruit/school/${school.slug}`)
```

For generateInviteLink / deleteInviteLink:
```typescript
revalidatePath('/admin')
revalidatePath('/admin/invites')
```

**2. Apply the same pattern to any new actions created in Prompt 5** (videos, roster, NIL visibility).

After all changes, run `npx tsc --noEmit` to verify zero errors.
```

---

## Prompt 8: LOW — Polish & Production Readiness

```
Final production readiness fixes.

**1. Add og:image to root layout metadata:**
File: src/app/layout.tsx
In the metadata export, add:
```typescript
openGraph: {
  title: 'OVV — Official Virtual Visit',
  description: 'Experience college football programs through immersive virtual tours',
  images: [{ url: '/og-image.png', width: 1200, height: 630 }],
},
twitter: {
  card: 'summary_large_image',
  title: 'OVV — Official Virtual Visit',
  description: 'Experience college football programs through immersive virtual tours',
  images: ['/og-image.png'],
},
```

**2. Remove any remaining console.log statements meant for debugging:**
Search the entire src/ directory for console.log calls. Keep ones in catch blocks (error logging) but remove any that are purely debug output like `console.log('data:', data)`.

**3. Add section navigator aria-labels:**
File: src/components/school/section-navigator.tsx
On each navigation button, add `aria-label={`Navigate to ${label} section`}`.

**4. Add max queue size to analytics tracker:**
File: src/lib/analytics-tracker.ts
In the track() method, add a guard:
```typescript
track(event: Omit<AnalyticsEvent, 'sessionId'>) {
  if (this.queue.length >= 1000) {
    console.warn('Analytics queue full, dropping event')
    return
  }
  this.queue.push({ ...event, sessionId: this.sessionId })
  if (this.queue.length >= BATCH_SIZE) {
    this.flush()
  }
}
```

**5. Fix the N+1 filter in analytics page:**
File: src/app/(platform)/admin/analytics/page.tsx (or analytics-dashboard.tsx)
If there's a loop that filters events per user like:
```typescript
for (const [userId, recruit] of recruitMap.entries()) {
  const userEvents = events.filter((e) => e.userId === userId)
```
Replace with a pre-grouped map:
```typescript
const eventsByUser = new Map<string, typeof events>()
for (const event of events) {
  const arr = eventsByUser.get(event.userId) ?? []
  arr.push(event)
  eventsByUser.set(event.userId, arr)
}
// Then use: const userEvents = eventsByUser.get(userId) ?? []
```

After all changes, run `npx tsc --noEmit` one final time to confirm zero errors.
```

---

## Prompt 9: Verification — Final Check

```
Run these verification checks and report results:

1. `npx tsc --noEmit` — must be zero errors

2. Search for remaining security issues:
   - `grep -r "findFirst" src/app/(platform)/admin/` — should return zero matches (all replaced with school-scoped queries)
   - `grep -r "coach_admin" src/app/(auth)/register/` — should return zero matches (coach self-registration removed)
   - `grep -rn "as any" src/app/` — list all remaining unsafe type casts

3. Search for missing error handling:
   - Find all API route.ts files and check each has try/catch: `find src/app/api -name "route.ts" -exec grep -L "try {" {} \;`

4. Verify dark mode:
   - Confirm next-themes is in package.json
   - Confirm ThemeProvider wraps the app in layout.tsx
   - Confirm no hardcoded `className="dark"` on <html>

5. Verify loading states:
   - `find src/app -name "loading.tsx" | sort` — list all loading files

6. Count total components and routes:
   - `find src/app -name "page.tsx" | wc -l`
   - `find src/app -name "route.ts" | wc -l`
   - `find src/components -name "*.tsx" | wc -l`

Report all findings.
```

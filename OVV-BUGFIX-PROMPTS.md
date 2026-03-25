# OVV Bugfix Prompts for Claude Code

Copy and paste each prompt below into Claude Code, one at a time. Wait for each to complete before running the next. **Run these BEFORE continuing Phase 7.**

---

## Prompt 1: P0 Security & Auth Fixes (Critical)

```
Fix these 4 critical security/auth bugs. Read each file first, then apply the fix precisely.

**Bug 1 — FavoriteButton gets slug instead of school ID:**
File: src/components/school/school-header.tsx
Line 93 currently passes `schoolId={slug}` but toggleFavorite() expects a UUID.
- Add `id` to the destructured props (it's already in the interface but not destructured)
- Change line 93 from `<FavoriteButton schoolId={slug}` to `<FavoriteButton schoolId={id}`

**Bug 2 — Admin invites DELETE has auth bypass:**
File: src/app/api/admin/invites/[id]/route.ts
Line 28 says `if (dbUser?.schoolId && dbUser.schoolId !== invite.schoolId)` — this falls through when schoolId is null, letting anyone without a school delete any invite.
- Also add role check. Change lines 22-30 to:
```typescript
const dbUser = await prisma.user.findUnique({
  where: { id: user.id },
  select: { schoolId: true, role: true },
})

if (!dbUser || dbUser.role !== 'coach_admin' || !dbUser.schoolId || dbUser.schoolId !== invite.schoolId) {
  return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
}
```

**Bug 3 — Analytics export missing school-scoped auth:**
File: src/app/api/analytics/export/route.ts
After the rate limit check (line 27), before accessing searchParams, add school-scoped authorization:
```typescript
// Verify coach owns the requested school
const dbUser = await prisma.user.findUnique({
  where: { id: user.id },
  select: { schoolId: true, role: true },
})
if (!dbUser || dbUser.role !== 'coach_admin' || !dbUser.schoolId) {
  return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
}

const { searchParams } = new URL(request.url)
const schoolId = searchParams.get('schoolId') || dbUser.schoolId

// Coaches can only export their own school's data
if (schoolId !== dbUser.schoolId) {
  return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
}
```

**Bug 4 — Admin server actions skip role verification:**
File: src/app/(platform)/admin/actions.ts
The `getAdminSchool()` function (lines 11-27) never checks `role === 'coach_admin'` and falls back to `prisma.school.findFirst()` which lets any user manage a random school.
Fix `getAdminSchool()` to:
```typescript
async function getAdminSchool() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    include: { school: true },
  })

  if (!dbUser || dbUser.role !== 'coach_admin') throw new Error('Not authorized')
  if (!dbUser.school) throw new Error('No school assigned')

  return { user, school: dbUser.school }
}
```

After all 4 fixes, run `npx tsc --noEmit` to verify zero type errors.
```

---

## Prompt 2: P1 Error Handling & Validation Fixes

```
Fix these 6 error handling and validation bugs:

**Bug 5 — Admin invites POST needs Zod validation:**
File: src/app/api/admin/invites/route.ts
Add Zod import at top: `import { z } from 'zod'`
Replace lines 48-59 (the body parsing and type cast) with:
```typescript
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const schema = z.object({
    expiresAt: z.string().datetime().optional(),
    welcomeMessage: z.string().max(1000).optional(),
    welcomeVideoUrl: z.string().url().optional(),
    quantity: z.number().int().min(1).max(100).default(1),
  })

  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 })
  }

  const { expiresAt, welcomeMessage, welcomeVideoUrl, quantity } = parsed.data
```
Then update the `count` variable on the next line to just use `quantity` directly (it's already clamped by Zod).

**Bug 6 — Admin invites routes need try/catch:**
File: src/app/api/admin/invites/route.ts — wrap the GET handler body in try/catch returning 500 on error.
File: src/app/api/admin/invites/[id]/route.ts — wrap the DELETE handler body in try/catch returning 500 on error.

**Bug 7 — Auth sync-user unsafe email assertion:**
File: src/app/api/auth/sync-user/route.ts line 39
Change `email: user.email!,` to `email: user.email ?? '',`
Also wrap the entire handler body in try/catch with a 500 error response.

**Bug 8 — Invite expiration not validated as future date:**
File: src/app/api/admin/invites/route.ts
After the Zod validation, before the loop that creates invites, add:
```typescript
  if (expiresAt) {
    const expDate = new Date(expiresAt)
    if (expDate <= new Date()) {
      return NextResponse.json({ error: 'Expiration date must be in the future' }, { status: 400 })
    }
  }
```

**Bug 9 — Video iframe missing title and sandbox attributes:**
File: src/components/school/video-section.tsx lines 67-72
Change the iframe to:
```tsx
<iframe
  src={video.videoUrl}
  title={video.title || 'Video'}
  className="absolute inset-0 h-full w-full"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
/>
```

**Bug 10 — Missing error.tsx boundary for school detail page:**
Create a new file at src/app/(platform)/recruit/school/[slug]/error.tsx:
```tsx
'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function SchoolError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('School page error:', error)
  }, [error])

  return (
    <div className="mx-auto flex max-w-md flex-col items-center justify-center py-32 text-center">
      <h2 className="font-display text-lg font-semibold uppercase tracking-wide">
        Something went wrong
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        We couldn&apos;t load this school page. Please try again.
      </p>
      <Button onClick={reset} className="mt-6" variant="outline">
        Try Again
      </Button>
    </div>
  )
}
```

After all fixes, run `npx tsc --noEmit` to verify zero type errors.
```

---

## Prompt 3: P2 Schema Fixes (Relations & Indexes)

```
Fix the Prisma schema at prisma/schema.prisma with these changes. Read the file first to understand current state.

**Fix 1 — Add SchoolVideo → Coach relation:**
In the SchoolVideo model, change the bare `coachId` field to a proper relation:
```prisma
  coachId      String?
  coach        Coach?   @relation(fields: [coachId], references: [id], onDelete: SetNull)
```
Then in the Coach model, add the back-reference:
```prisma
  videos       SchoolVideo[]
```

**Fix 2 — Add Hotspot → Facility relation for linkedFacilityId:**
In the Hotspot model, change the bare `linkedFacilityId` field to a proper relation:
```prisma
  linkedFacilityId String?
  linkedFacility   Facility? @relation("HotspotLinks", fields: [linkedFacilityId], references: [id], onDelete: SetNull)
```
Then in the Facility model, add the back-reference:
```prisma
  linkedHotspots   Hotspot[] @relation("HotspotLinks")
```

**Fix 3 — Add onDelete handlers:**
- InviteLink: change `creator User @relation(fields: [createdBy], references: [id])` to add `onDelete: Cascade`
- RecruitList: change `creator User @relation(fields: [createdBy], references: [id])` to add `onDelete: Cascade`
- Facility: change `sport Sport? @relation(fields: [sportId], references: [id])` to add `onDelete: SetNull`

**Fix 4 — Add missing indexes on foreign keys:**
Add @@index declarations to these models (add them right before the closing brace of each model):
- Sport: `@@index([schoolId])`
- Coach: `@@index([sportId])`
- College: `@@index([schoolId])`
- Major: `@@index([collegeId])`
- DegreePathway: `@@index([majorId])`
- CareerOutcome: `@@index([majorId])`
- RosterPlayer: `@@index([schoolId])`
- NotableAlumni: `@@index([schoolId])`
- Facility: `@@index([schoolId])` and `@@index([sportId])`
- Hotspot: `@@index([facilityId])`
- JerseyAsset: `@@index([schoolId])`
- JerseySelection: `@@index([schoolId])` and `@@index([userId])`
- SchoolVideo: `@@index([schoolId])`
- RecruitNote: `@@index([recruitId])` and `@@index([schoolId])` and `@@index([coachId])`
- RecruitList: `@@index([schoolId])`
- RecruitListMember: `@@index([listId])` and `@@index([recruitId])`

After making all schema changes, run `npx tsc --noEmit` to verify TypeScript still compiles. Do NOT run prisma migrate or prisma db push (we'll do that separately).
```

---

## Prompt 4: Verification

```
Run `npx tsc --noEmit` and confirm zero TypeScript errors after all the bugfixes. If there are errors, fix them.

Then do a quick grep to confirm the fixes took effect:
1. grep for "schoolId={slug}" in src/components/school/ — should return zero matches (Bug 1 fixed)
2. grep for "findFirst" in src/app/(platform)/admin/actions.ts — should return zero matches (Bug 4 fixed)
3. grep for "email!" in src/app/api/auth/ — should return zero matches (Bug 7 fixed)
4. grep for "as {" in src/app/api/admin/invites/route.ts — should return zero matches (Bug 5 Zod fix)

Report what you find.
```

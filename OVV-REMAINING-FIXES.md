# OVV — Remaining Fixes for Production Readiness

Read this entire file first, then work through each section top to bottom. After EACH section, run `npx tsc --noEmit` to verify zero TypeScript errors before proceeding.

---

## Section 1: Dark Mode — Theme Toggle (Currently Hardcoded)

`next-themes` is already installed but not wired up. The root layout has `className="dark"` hardcoded with no toggle.

### 1A. Create src/components/theme-provider.tsx

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

### 1B. Create src/components/theme-toggle.tsx

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

### 1C. Update src/app/layout.tsx

- Remove `className="dark"` from the `<html>` tag. Keep `lang="en"` and add `suppressHydrationWarning`.
- Import `ThemeProvider` from `@/components/theme-provider`.
- Wrap `{children}` and `<Toaster />` inside `<ThemeProvider>`:

```tsx
<html lang="en" suppressHydrationWarning>
  <body className={`${geistSans.variable} ${geistMono.variable} ${oswald.variable} antialiased`}>
    <ThemeProvider>
      {children}
      <Toaster />
    </ThemeProvider>
    <script dangerouslySetInnerHTML={{ __html: `if ('serviceWorker' in navigator) { navigator.serviceWorker.register('/sw.js').catch(() => {}) }` }} />
  </body>
</html>
```

### 1D. Add ThemeToggle to platform topbar

File: src/components/layout/platform-topbar.tsx — import and render `<ThemeToggle />` next to the user actions / settings area in the topbar.

### 1E. Add ThemeToggle to marketing nav

File: src/components/layout/marketing-nav.tsx — import and render `<ThemeToggle />` next to the CTA buttons / nav actions.

Run `npx tsc --noEmit` to verify.

---

## Section 2: Admin Program Manager — Add CRUD Functionality

The facilities, videos, roster, and NIL pages are currently read-only. They need create/edit/delete UI.

### 2A. Add server actions to src/app/(platform)/admin/actions.ts

Add these new exported server actions after the existing ones. Each must call `getAdminSchool()` for auth, validate with Zod, and revalidate both admin and recruit paths:

```typescript
import { z } from 'zod'

// --- Video CRUD ---
export async function createVideo(formData: FormData): Promise<ActionResult> {
  const { school } = await getAdminSchool()
  const schema = z.object({
    title: z.string().min(1).max(200),
    type: z.enum(['coach_intro', 'highlight', 'day_in_life']),
    videoUrl: z.string().url(),
    thumbnailUrl: z.string().url().optional(),
    description: z.string().max(500).optional(),
    playerName: z.string().max(100).optional(),
    sortOrder: z.coerce.number().int().min(0).default(0),
  })
  const parsed = schema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) return { error: parsed.error.issues[0].message }

  await prisma.schoolVideo.create({ data: { schoolId: school.id, ...parsed.data } })
  revalidatePath('/admin/program/videos')
  revalidatePath(`/recruit/school/${school.slug}`)
  return { success: true }
}

export async function deleteVideo(videoId: string): Promise<ActionResult> {
  const { school } = await getAdminSchool()
  const video = await prisma.schoolVideo.findUnique({ where: { id: videoId }, select: { schoolId: true } })
  if (!video || video.schoolId !== school.id) return { error: 'Not found' }
  await prisma.schoolVideo.delete({ where: { id: videoId } })
  revalidatePath('/admin/program/videos')
  revalidatePath(`/recruit/school/${school.slug}`)
  return { success: true }
}

// --- Roster CRUD ---
export async function createRosterPlayer(formData: FormData): Promise<ActionResult> {
  const { school } = await getAdminSchool()
  const schema = z.object({
    name: z.string().min(1).max(100),
    number: z.coerce.number().int().min(0).max(99),
    position: z.string().min(1).max(20),
    height: z.string().min(1),
    weight: z.string().min(1),
    year: z.string().min(1),
    hometown: z.string().min(1),
    state: z.string().min(1).max(2),
    highSchool: z.string().optional(),
    isStarter: z.coerce.boolean().default(false),
  })
  const parsed = schema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) return { error: parsed.error.issues[0].message }

  await prisma.rosterPlayer.create({ data: { schoolId: school.id, ...parsed.data } })
  revalidatePath('/admin/program/roster')
  revalidatePath(`/recruit/school/${school.slug}`)
  return { success: true }
}

export async function deleteRosterPlayer(playerId: string): Promise<ActionResult> {
  const { school } = await getAdminSchool()
  const player = await prisma.rosterPlayer.findUnique({ where: { id: playerId }, select: { schoolId: true } })
  if (!player || player.schoolId !== school.id) return { error: 'Not found' }
  await prisma.rosterPlayer.delete({ where: { id: playerId } })
  revalidatePath('/admin/program/roster')
  revalidatePath(`/recruit/school/${school.slug}`)
  return { success: true }
}

// --- NIL Visibility ---
export async function updateNilVisibility(formData: FormData): Promise<ActionResult> {
  const { school } = await getAdminSchool()
  const schema = z.object({
    totalBudget: z.enum(['public', 'invite_only', 'hidden']),
    footballSpend: z.enum(['public', 'invite_only', 'hidden']),
    allSportsSpend: z.enum(['public', 'invite_only', 'hidden']),
    averageDealSize: z.enum(['public', 'invite_only', 'hidden']),
    notableDeals: z.enum(['public', 'invite_only', 'hidden']),
  })
  const parsed = schema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) return { error: parsed.error.issues[0].message }

  await prisma.nilFieldVisibility.upsert({
    where: { schoolId: school.id },
    update: parsed.data,
    create: { schoolId: school.id, ...parsed.data },
  })
  revalidatePath('/admin/program/nil')
  revalidatePath(`/recruit/school/${school.slug}`)
  return { success: true }
}

// --- Facility Update ---
export async function updateFacility(facilityId: string, formData: FormData): Promise<ActionResult> {
  const { school } = await getAdminSchool()
  const facility = await prisma.facility.findUnique({ where: { id: facilityId }, select: { schoolId: true } })
  if (!facility || facility.schoolId !== school.id) return { error: 'Not found' }

  const schema = z.object({
    name: z.string().min(1).max(200).optional(),
    type: z.string().min(1).optional(),
    description: z.string().max(1000).optional(),
    panoramaUrl: z.string().url().optional(),
    sortOrder: z.coerce.number().int().min(0).optional(),
    isRequired: z.coerce.boolean().optional(),
  })
  const parsed = schema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) return { error: parsed.error.issues[0].message }

  await prisma.facility.update({ where: { id: facilityId }, data: parsed.data })
  revalidatePath('/admin/program/facilities')
  revalidatePath(`/recruit/school/${school.slug}`)
  return { success: true }
}
```

Make sure the `z` import from `zod` is at the top of the file if not already there.

### 2B. Rebuild src/app/(platform)/admin/program/facilities/page.tsx

Convert to a client/server split. The server component fetches data; a client child component handles the form interactions. Add:
- An "Add Facility" button that opens a form (use a dialog or expandable section) calling `createFacility`
- Each facility card gets "Edit" and "Delete" buttons
- Delete button calls `deleteFacility` with a confirm dialog
- Edit opens an inline form calling `updateFacility`

### 2C. Rebuild src/app/(platform)/admin/program/videos/page.tsx

Same pattern:
- "Add Video" button → form with title, type dropdown (coach_intro/highlight/day_in_life), videoUrl, thumbnailUrl, description, playerName, sortOrder
- Each video row gets a "Delete" button calling `deleteVideo`

### 2D. Rebuild src/app/(platform)/admin/program/roster/page.tsx

Same pattern:
- "Add Player" button → form with name, number, position, height, weight, year, hometown, state, highSchool, isStarter checkbox
- Each player row gets a "Delete" button calling `deleteRosterPlayer`

### 2E. Rebuild src/app/(platform)/admin/program/nil/page.tsx

For each visibility field (totalBudget, footballSpend, allSportsSpend, averageDealSize, notableDeals):
- Replace the read-only badge with a `<select>` dropdown with options: `public`, `invite_only`, `hidden`
- Wrap all 5 selects in a single `<form>` with a "Save" button that calls `updateNilVisibility`

Run `npx tsc --noEmit` to verify.

---

## Section 3: Missing Error Boundaries & Loading States

### 3A. Create error boundaries for admin subroutes:

Create src/app/(platform)/admin/analytics/error.tsx:
```tsx
'use client'
import { ErrorPage } from '@/components/error-page'
export default function AnalyticsError({ error, reset }: { error: Error; reset: () => void }) {
  return <ErrorPage error={error} reset={reset} />
}
```

Create src/app/(platform)/admin/program/error.tsx with the same pattern.

### 3B. Create loading skeletons for admin program subroutes:

Create these files, each with a simple skeleton:
- src/app/(platform)/admin/program/facilities/loading.tsx
- src/app/(platform)/admin/program/videos/loading.tsx
- src/app/(platform)/admin/program/roster/loading.tsx
- src/app/(platform)/admin/program/nil/loading.tsx

Each should be:
```tsx
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <Skeleton className="h-8 w-48" />
        <Skeleton className="mt-2 h-4 w-72" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-24 w-full rounded-xl" />
        <Skeleton className="h-24 w-full rounded-xl" />
        <Skeleton className="h-24 w-full rounded-xl" />
      </div>
    </div>
  )
}
```

Run `npx tsc --noEmit` to verify.

---

## Section 4: Revalidation Paths

Update ALL existing server actions in src/app/(platform)/admin/actions.ts to revalidate recruit-facing pages when content changes:

For `updateSchoolProfile` — add:
```typescript
revalidatePath(`/recruit/school/${school.slug}`)
revalidatePath(`/schools/${school.slug}`)
```

For `createCoach` and `deleteCoach` — add:
```typescript
revalidatePath(`/recruit/school/${school.slug}`)
```

For `createFacility` and `deleteFacility` — add:
```typescript
revalidatePath('/admin/program/facilities')
revalidatePath(`/recruit/school/${school.slug}`)
```

Note: you need the school slug for these paths. The `getAdminSchool()` function already returns `school` which has `school.slug`, so this is available.

Run `npx tsc --noEmit` to verify.

---

## Section 5: Accessibility & Polish

### 5A. Section navigator aria-labels

File: src/components/school/section-navigator.tsx

On BOTH the desktop nav buttons (line ~56) and mobile nav buttons (line ~90), add `aria-label`:

Desktop button:
```tsx
<button
  key={id}
  onClick={() => scrollTo(id)}
  aria-label={`Navigate to ${label} section`}
  className={...}
>
```

Mobile button:
```tsx
<button
  key={id}
  onClick={() => scrollTo(id)}
  aria-label={`Navigate to ${label} section`}
  className={...}
>
```

### 5B. Analytics tracker queue limit

File: src/lib/analytics-tracker.ts

In the `track()` method, add a max queue guard at the top:
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

### 5C. Jersey canvas image load timeout

File: src/components/jersey/jersey-canvas.tsx

Find the image loading function (or create a helper). Wrap image loads in a timeout:
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
Use this helper anywhere images are loaded for the canvas compositor.

Run `npx tsc --noEmit` to verify.

---

## Section 6: Final Verification

Run all of these and report results:

```bash
# 1. TypeScript — must be zero errors
npx tsc --noEmit

# 2. Verify no findFirst fallback in admin pages
grep -rn "findFirst" src/app/\(platform\)/admin/ | grep -v "sport\|Sport"

# 3. Verify theme provider is wired up
grep -n "ThemeProvider" src/app/layout.tsx

# 4. Verify no hardcoded dark class
grep 'className="dark"' src/app/layout.tsx

# 5. Verify error boundaries exist
find src/app -name "error.tsx" | sort

# 6. Verify loading states exist
find src/app -name "loading.tsx" | sort

# 7. Count all pages, routes, and components
echo "Pages:" && find src/app -name "page.tsx" | wc -l
echo "API Routes:" && find src/app -name "route.ts" | wc -l
echo "Components:" && find src/components -name "*.tsx" | wc -l

# 8. Verify aria-labels in section navigator
grep "aria-label" src/components/school/section-navigator.tsx
```

If any check fails, fix it before considering the codebase production-ready.

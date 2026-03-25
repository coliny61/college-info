'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { randomBytes } from 'crypto'
import { z } from 'zod'
import { schoolProfileSchema, coachSchema, facilitySchema } from '@/lib/validations'

export type ActionResult = { success: true } | { error: string }

async function getAdminSchool() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    include: { school: true },
  })

  if (!dbUser || dbUser.role !== 'coach_admin') throw new Error('Not authorized')
  if (!dbUser.school) throw new Error('No school assigned')

  return { user, school: dbUser.school }
}

export async function updateSchoolProfile(formData: FormData): Promise<ActionResult> {
  const { school } = await getAdminSchool()

  const raw = {
    name: (formData.get('name') as string) || undefined,
    description: (formData.get('description') as string) || undefined,
    colorPrimary: (formData.get('colorPrimary') as string) || undefined,
    colorSecondary: (formData.get('colorSecondary') as string) || undefined,
    colorAccent: (formData.get('colorAccent') as string) || undefined,
  }

  const parsed = schoolProfileSchema.safeParse(raw)
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  await prisma.school.update({
    where: { id: school.id },
    data: parsed.data,
  })

  revalidatePath('/admin/program')
  revalidatePath('/recruit')
  revalidatePath(`/recruit/school/${school.slug}`)
  revalidatePath(`/schools/${school.slug}`)
  return { success: true }
}

export async function createCoach(formData: FormData): Promise<ActionResult> {
  const { school } = await getAdminSchool()

  const sport = await prisma.sport.findFirst({ where: { schoolId: school.id } })
  if (!sport) return { error: 'No sport found' }

  const raw = {
    name: formData.get('name') as string,
    title: formData.get('title') as string,
    bio: (formData.get('bio') as string) || '',
    yearsAtSchool: parseInt(formData.get('yearsAtSchool') as string) || 0,
  }

  const parsed = coachSchema.safeParse(raw)
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  await prisma.coach.create({
    data: { sportId: sport.id, ...parsed.data },
  })

  revalidatePath('/admin/program')
  revalidatePath(`/recruit/school/${school.slug}`)
  return { success: true }
}

export async function deleteCoach(coachId: string): Promise<ActionResult> {
  const { school } = await getAdminSchool()
  await prisma.coach.delete({ where: { id: coachId } })
  revalidatePath('/admin/program')
  revalidatePath(`/recruit/school/${school.slug}`)
  return { success: true }
}

export async function createFacility(formData: FormData): Promise<ActionResult> {
  const { school } = await getAdminSchool()

  const raw = {
    name: formData.get('name') as string,
    type: formData.get('type') as string,
    description: (formData.get('description') as string) || '',
  }

  const parsed = facilitySchema.safeParse(raw)
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  await prisma.facility.create({
    data: { schoolId: school.id, ...parsed.data },
  })

  revalidatePath('/admin/program')
  revalidatePath('/admin/program/facilities')
  revalidatePath(`/recruit/school/${school.slug}`)
  return { success: true }
}

export async function deleteFacility(facilityId: string): Promise<ActionResult> {
  const { school } = await getAdminSchool()
  await prisma.facility.delete({ where: { id: facilityId } })
  revalidatePath('/admin/program')
  revalidatePath('/admin/program/facilities')
  revalidatePath(`/recruit/school/${school.slug}`)
  return { success: true }
}

export async function generateInviteLink(opts?: {
  expiresAt?: string
  welcomeMessage?: string
  welcomeVideoUrl?: string
  quantity?: number
}) {
  const { user, school } = await getAdminSchool()
  const count = Math.min(Math.max(1, opts?.quantity ?? 1), 100)
  const defaultExpiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)

  for (let i = 0; i < count; i++) {
    const code = randomBytes(6).toString('hex')
    await prisma.inviteLink.create({
      data: {
        schoolId: school.id,
        createdBy: user.id,
        code,
        expiresAt: opts?.expiresAt ? new Date(opts.expiresAt) : defaultExpiry,
        welcomeMessage: opts?.welcomeMessage || null,
        welcomeVideoUrl: opts?.welcomeVideoUrl || null,
      },
    })
  }

  revalidatePath('/admin')
  return { success: true }
}

export async function deleteInviteLink(inviteId: string): Promise<ActionResult> {
  await prisma.inviteLink.delete({ where: { id: inviteId } })
  revalidatePath('/admin')
  return { success: true }
}

export async function incrementInviteUsedCount(code: string): Promise<ActionResult> {
  const invite = await prisma.inviteLink.findUnique({ where: { code } })
  if (!invite) return { error: 'Invite not found' }

  await prisma.inviteLink.update({
    where: { code },
    data: { usedCount: { increment: 1 } },
  })
  return { success: true }
}

// ─── Video CRUD ──────────────────────────────────────────────────────────────

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

// ─── Roster CRUD ─────────────────────────────────────────────────────────────

export async function createRosterPlayer(formData: FormData): Promise<ActionResult> {
  const { school } = await getAdminSchool()
  const schema = z.object({
    name: z.string().min(1).max(100),
    number: z.coerce.number().int().min(0).max(99),
    position: z.string().min(1).max(20),
    height: z.string().min(1),
    weight: z.coerce.number().int().min(50).max(500),
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

// ─── NIL Visibility ──────────────────────────────────────────────────────────

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

// ─── Facility Update ─────────────────────────────────────────────────────────

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

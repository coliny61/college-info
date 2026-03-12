'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { randomBytes } from 'crypto'
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

  const school = dbUser?.school ?? await prisma.school.findFirst()
  if (!school) throw new Error('No school found')

  return { user, school }
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
  return { success: true }
}

export async function deleteCoach(coachId: string): Promise<ActionResult> {
  await prisma.coach.delete({ where: { id: coachId } })
  revalidatePath('/admin/program')
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
  return { success: true }
}

export async function deleteFacility(facilityId: string): Promise<ActionResult> {
  await prisma.facility.delete({ where: { id: facilityId } })
  revalidatePath('/admin/program')
  return { success: true }
}

export async function generateInviteLink() {
  const { user, school } = await getAdminSchool()

  const code = randomBytes(6).toString('hex')

  const invite = await prisma.inviteLink.create({
    data: {
      schoolId: school.id,
      createdBy: user.id,
      code,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  })

  revalidatePath('/admin')
  return invite.code
}

export async function deleteInviteLink(inviteId: string): Promise<ActionResult> {
  await prisma.inviteLink.delete({ where: { id: inviteId } })
  revalidatePath('/admin')
  return { success: true }
}

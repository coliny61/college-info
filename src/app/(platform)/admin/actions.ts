'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { randomBytes } from 'crypto'

async function getAdminSchool() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  // For now, find the school where the user is an admin
  // In production, this would use the user's schoolId from the users table
  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    include: { school: true },
  })

  // Fallback: get first school for demo purposes
  const school = dbUser?.school ?? await prisma.school.findFirst()
  if (!school) throw new Error('No school found')

  return { user, school }
}

export async function updateSchoolProfile(formData: FormData) {
  const { school } = await getAdminSchool()

  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const colorPrimary = formData.get('colorPrimary') as string
  const colorSecondary = formData.get('colorSecondary') as string
  const colorAccent = formData.get('colorAccent') as string

  await prisma.school.update({
    where: { id: school.id },
    data: {
      ...(name && { name }),
      ...(description && { description }),
      ...(colorPrimary && { colorPrimary }),
      ...(colorSecondary && { colorSecondary }),
      ...(colorAccent && { colorAccent }),
    },
  })

  revalidatePath('/admin/school')
  revalidatePath('/recruit')
}

export async function createCoach(formData: FormData) {
  const { school } = await getAdminSchool()

  const sport = await prisma.sport.findFirst({ where: { schoolId: school.id } })
  if (!sport) throw new Error('No sport found')

  await prisma.coach.create({
    data: {
      sportId: sport.id,
      name: formData.get('name') as string,
      title: formData.get('title') as string,
      bio: formData.get('bio') as string,
      yearsAtSchool: parseInt(formData.get('yearsAtSchool') as string) || 0,
    },
  })

  revalidatePath('/admin/coaches')
}

export async function deleteCoach(coachId: string) {
  await prisma.coach.delete({ where: { id: coachId } })
  revalidatePath('/admin/coaches')
}

export async function createFacility(formData: FormData) {
  const { school } = await getAdminSchool()

  await prisma.facility.create({
    data: {
      schoolId: school.id,
      name: formData.get('name') as string,
      type: formData.get('type') as string,
      description: formData.get('description') as string,
    },
  })

  revalidatePath('/admin/facilities')
}

export async function deleteFacility(facilityId: string) {
  await prisma.facility.delete({ where: { id: facilityId } })
  revalidatePath('/admin/facilities')
}

export async function generateInviteLink() {
  const { user, school } = await getAdminSchool()

  const code = randomBytes(6).toString('hex')

  const invite = await prisma.inviteLink.create({
    data: {
      schoolId: school.id,
      createdBy: user.id,
      code,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    },
  })

  revalidatePath('/admin/invites')
  return invite.code
}

export async function deleteInviteLink(inviteId: string) {
  await prisma.inviteLink.delete({ where: { id: inviteId } })
  revalidatePath('/admin/invites')
}

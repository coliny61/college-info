'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'

export async function toggleFavorite(schoolId: string) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  // Check if already favorited
  const existing = await prisma.favorite.findUnique({
    where: {
      userId_schoolId: {
        userId: user.id,
        schoolId,
      },
    },
  })

  if (existing) {
    await prisma.favorite.delete({
      where: { id: existing.id },
    })
  } else {
    await prisma.favorite.create({
      data: {
        userId: user.id,
        schoolId,
      },
    })
  }

  revalidatePath('/recruit')
  revalidatePath('/recruit/schools')
  revalidatePath('/recruit/favorites')
}

export async function updateProfile(formData: FormData) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  const displayName = formData.get('displayName') as string

  if (displayName) {
    await supabase.auth.updateUser({
      data: { display_name: displayName },
    })
  }

  revalidatePath('/recruit/profile')
  revalidatePath('/recruit')
}

export interface RecruitProfileInput {
  sport?: string | null
  position?: string | null
  height?: string | null
  weight?: number | null
  graduationYear?: number | null
  gpa?: number | null
  satScore?: number | null
  actScore?: number | null
  highSchool?: string | null
  city?: string | null
  state?: string | null
  bio?: string | null
  highlightsUrl?: string | null
}

export async function createRecruitProfile(data: RecruitProfileInput) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  await prisma.recruitProfile.create({
    data: {
      userId: user.id,
      ...data,
    },
  })

  revalidatePath('/recruit')
  revalidatePath('/recruit/profile')
}

export async function updateRecruitProfile(data: RecruitProfileInput) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  await prisma.recruitProfile.update({
    where: { userId: user.id },
    data,
  })

  revalidatePath('/recruit')
  revalidatePath('/recruit/profile')
}

export async function generateFamilyCode() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  // Check if already has a code
  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: { familyCode: true, displayName: true },
  })

  if (dbUser?.familyCode) {
    return dbUser.familyCode
  }

  // Generate code: initials + random 4 chars
  const initials = (dbUser?.displayName ?? 'XX')
    .split(' ')
    .map((n) => n[0]?.toUpperCase() ?? '')
    .join('')
    .slice(0, 2)
    .padEnd(2, 'X')

  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code: string
  let attempts = 0

  do {
    const rand = Array.from({ length: 4 }, () =>
      chars[Math.floor(Math.random() * chars.length)]
    ).join('')
    code = `${initials}-${rand}`
    attempts++

    const existing = await prisma.user.findUnique({
      where: { familyCode: code },
    })
    if (!existing) break
  } while (attempts < 10)

  await prisma.user.update({
    where: { id: user.id },
    data: { familyCode: code },
  })

  revalidatePath('/recruit/profile')
  return code
}

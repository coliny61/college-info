'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import {
  recruitProfileSchema,
  notificationPreferenceSchema,
  calculateProfileCompleteness,
  type RecruitProfileInput,
  type NotificationPreferenceInput,
} from '@/lib/validations'

export type ActionResult = { success: true } | { error: string }

export async function toggleFavorite(schoolId: string): Promise<ActionResult> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { error: 'Not authenticated' }

  const existing = await prisma.favorite.findUnique({
    where: {
      userId_schoolId: {
        userId: user.id,
        schoolId,
      },
    },
  })

  if (existing) {
    await prisma.favorite.delete({ where: { id: existing.id } })
  } else {
    await prisma.favorite.create({
      data: { userId: user.id, schoolId },
    })
  }

  revalidatePath('/recruit')
  revalidatePath('/recruit/schools')
  revalidatePath('/recruit/favorites')
  return { success: true }
}

export async function updateProfile(formData: FormData): Promise<ActionResult> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { error: 'Not authenticated' }

  const displayName = formData.get('displayName') as string
  if (!displayName || displayName.length > 100) {
    return { error: 'Display name must be 1-100 characters' }
  }

  await supabase.auth.updateUser({
    data: { display_name: displayName },
  })

  revalidatePath('/recruit/profile')
  revalidatePath('/recruit')
  return { success: true }
}

export async function createRecruitProfile(data: RecruitProfileInput & { recruitType?: string }): Promise<ActionResult> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { error: 'Not authenticated' }

  const { recruitType, ...profileData } = data
  const parsed = recruitProfileSchema.safeParse(profileData)
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  const profileCompleteness = calculateProfileCompleteness(parsed.data)

  await prisma.recruitProfile.create({
    data: { userId: user.id, ...parsed.data, profileCompleteness },
  })

  // Store recruitType on User record
  if (recruitType) {
    await prisma.user.update({
      where: { id: user.id },
      data: { recruitType },
    })
  }

  revalidatePath('/recruit')
  revalidatePath('/recruit/profile')
  return { success: true }
}

export async function updateRecruitProfile(data: RecruitProfileInput & { recruitType?: string }): Promise<ActionResult> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { error: 'Not authenticated' }

  const { recruitType, ...profileData } = data
  const parsed = recruitProfileSchema.safeParse(profileData)
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  const profileCompleteness = calculateProfileCompleteness(parsed.data)

  await prisma.recruitProfile.update({
    where: { userId: user.id },
    data: { ...parsed.data, profileCompleteness },
  })

  // Update recruitType on User record
  if (recruitType !== undefined) {
    await prisma.user.update({
      where: { id: user.id },
      data: { recruitType },
    })
  }

  revalidatePath('/recruit')
  revalidatePath('/recruit/profile')
  return { success: true }
}

export async function updateNotificationPreferences(data: NotificationPreferenceInput): Promise<ActionResult> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { error: 'Not authenticated' }

  const parsed = notificationPreferenceSchema.safeParse(data)
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  await prisma.notificationPreference.upsert({
    where: { userId: user.id },
    create: { userId: user.id, ...parsed.data },
    update: parsed.data,
  })

  revalidatePath('/recruit/profile')
  return { success: true }
}

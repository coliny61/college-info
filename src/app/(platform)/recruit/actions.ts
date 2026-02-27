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

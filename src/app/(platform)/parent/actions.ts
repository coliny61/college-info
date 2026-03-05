'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'

export async function linkToRecruit(familyCode: string) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Not authenticated' }
  }

  // Find recruit by family code
  const recruit = await prisma.user.findUnique({
    where: { familyCode },
    select: { id: true, displayName: true, role: true },
  })

  if (!recruit || recruit.role !== 'recruit') {
    return { error: 'Invalid family code. Please check and try again.' }
  }

  // Link parent to recruit
  await prisma.user.update({
    where: { id: user.id },
    data: { linkedRecruitId: recruit.id },
  })

  revalidatePath('/parent')
  return { success: true, recruitName: recruit.displayName }
}

import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'

// POST: Create or fetch the Prisma User record for the current Supabase auth user
export async function POST() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const role = user.user_metadata?.role ?? 'recruit'
  const displayName =
    user.user_metadata?.display_name ?? user.email?.split('@')[0] ?? 'User'

  // Upsert: create if not exists, return if exists
  const dbUser = await prisma.user.upsert({
    where: { id: user.id },
    update: {},
    create: {
      id: user.id,
      email: user.email!,
      role,
      displayName,
    },
  })

  // Auto-link parent to recruit via family code
  const familyCode = user.user_metadata?.family_code
  if (familyCode && role === 'parent') {
    const recruit = await prisma.user.findUnique({
      where: { familyCode },
      select: { id: true, role: true },
    })
    if (recruit && recruit.role === 'recruit') {
      await prisma.user.update({
        where: { id: dbUser.id },
        data: { linkedRecruitId: recruit.id },
      })
    }
  }

  return NextResponse.json({ user: dbUser })
}

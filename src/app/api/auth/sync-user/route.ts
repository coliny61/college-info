import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { rateLimit } from '@/lib/rate-limit'

// POST: Create or fetch the Prisma User record for the current Supabase auth user
export async function POST() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  // Rate limit: 10 requests per minute
  const rl = rateLimit(`sync-user:${user.id}`, {
    windowMs: 60_000,
    maxRequests: 10,
  })
  if (!rl.success) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429, headers: { 'Retry-After': '60' } },
    )
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

  return NextResponse.json({ user: dbUser })
}

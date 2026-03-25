import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { randomBytes } from 'crypto'
import { z } from 'zod'

async function getCoachSchool() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: { id: true, schoolId: true, role: true },
  })
  if (!dbUser || dbUser.role !== 'coach_admin') return null

  if (!dbUser.schoolId) return null
  const schoolId = dbUser.schoolId

  return { userId: dbUser.id, schoolId }
}

export async function GET() {
  try {
    const coach = await getCoachSchool()
    if (!coach) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const invites = await prisma.inviteLink.findMany({
      where: { schoolId: coach.schoolId },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        code: true,
        expiresAt: true,
        usedCount: true,
        welcomeMessage: true,
        welcomeVideoUrl: true,
        createdAt: true,
      },
    })

    return NextResponse.json({ invites })
  } catch (err) {
    console.error('GET /api/admin/invites error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const coach = await getCoachSchool()
    if (!coach) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    let body: unknown
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }

    const schema = z.object({
      expiresAt: z.string().datetime().optional(),
      welcomeMessage: z.string().max(1000).optional(),
      welcomeVideoUrl: z.string().url().optional(),
      quantity: z.number().int().min(1).max(100).default(1),
    })

    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 })
    }

    const { expiresAt, welcomeMessage, welcomeVideoUrl, quantity } = parsed.data

    if (expiresAt) {
      const expDate = new Date(expiresAt)
      if (expDate <= new Date()) {
        return NextResponse.json({ error: 'Expiration date must be in the future' }, { status: 400 })
      }
    }

    const defaultExpiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)

    const created = []
    for (let i = 0; i < quantity; i++) {
      const code = randomBytes(6).toString('hex')
      const invite = await prisma.inviteLink.create({
        data: {
          schoolId: coach.schoolId,
          createdBy: coach.userId,
          code,
          expiresAt: expiresAt ? new Date(expiresAt) : defaultExpiry,
          welcomeMessage: welcomeMessage || null,
          welcomeVideoUrl: welcomeVideoUrl || null,
        },
      })
      created.push(invite)
    }

    return NextResponse.json({ invites: created }, { status: 201 })
  } catch (err) {
    console.error('POST /api/admin/invites error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@/generated/prisma/client'
import { rateLimit } from '@/lib/rate-limit'
import { analyticsEventSchema } from '@/lib/validations'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Rate limit: 60 requests per minute
    const rl = rateLimit(`analytics-track:${user.id}`, {
      windowMs: 60_000,
      maxRequests: 60,
    })
    if (!rl.success) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429, headers: { 'Retry-After': '60' } },
      )
    }

    const body = await request.json()
    const rawEvents = Array.isArray(body) ? body : [body]

    if (rawEvents.length === 0) {
      return NextResponse.json({ error: 'No events' }, { status: 400 })
    }

    // Validate each event
    const events = []
    for (const raw of rawEvents) {
      const parsed = analyticsEventSchema.safeParse(raw)
      if (!parsed.success) {
        return NextResponse.json(
          { error: parsed.error.issues[0].message },
          { status: 400 },
        )
      }
      events.push(parsed.data)
    }

    // Bulk insert
    await prisma.analyticsEvent.createMany({
      data: events.map((event) => ({
        userId: user.id,
        schoolId: event.schoolId ?? null,
        sessionId: event.sessionId,
        section: event.section,
        action: event.action,
        metadata: event.metadata
          ? (event.metadata as Prisma.InputJsonValue)
          : Prisma.DbNull,
        duration: event.duration ?? null,
      })),
    })

    return NextResponse.json({ ok: true, count: events.length })
  } catch (error) {
    console.error('Analytics track error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@/generated/prisma/client'

interface AnalyticsEvent {
  schoolId?: string
  sessionId: string
  section: string
  action: string
  metadata?: Record<string, unknown>
  duration?: number
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const events: AnalyticsEvent[] = Array.isArray(body) ? body : [body]

    if (events.length === 0) {
      return NextResponse.json({ error: 'No events' }, { status: 400 })
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

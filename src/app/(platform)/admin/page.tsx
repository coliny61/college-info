import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = { title: 'Coach Dashboard' }
import { prisma } from '@/lib/prisma'
import { Eye, Users, BarChart3, Link2, ArrowRight, Building } from 'lucide-react'
import { InvitesManager } from './invites-manager'

export default async function AdminDashboard() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const displayName =
    user?.user_metadata?.display_name ?? user?.email?.split('@')[0] ?? 'Coach'

  // Get managed school
  let school: any = null
  if (user) {
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { schoolId: true },
    }).catch(() => null)
    if (dbUser?.schoolId) {
      school = await prisma.school.findUnique({ where: { id: dbUser.schoolId } })
    }
  }
  if (!school) {
    school = await prisma.school.findFirst()
  }

  // Get stats
  let totalViews = 0
  let uniqueRecruits = 0
  let activeInvites = 0

  if (school) {
    totalViews = await prisma.analyticsEvent.count({
      where: { schoolId: school.id },
    })

    const recruits = await prisma.analyticsEvent.findMany({
      where: { schoolId: school.id },
      distinct: ['userId'],
      select: { userId: true },
    })
    uniqueRecruits = recruits.length

    activeInvites = await prisma.inviteLink.count({
      where: {
        schoolId: school.id,
        OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
      },
    })
  }

  // Fetch invite links
  const invites = school
    ? await prisma.inviteLink.findMany({
        where: { schoolId: school.id },
        orderBy: { createdAt: 'desc' },
      })
    : []

  const stats = [
    { label: 'Total Views', value: totalViews.toString(), icon: Eye },
    { label: 'Unique Recruits', value: uniqueRecruits.toString(), icon: Users },
    { label: 'Avg. Engagement', value: '—', icon: BarChart3 },
    { label: 'Active Invites', value: activeInvites.toString(), icon: Link2 },
  ]

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 animate-in-up">
        <p className="text-[10px] uppercase tracking-[0.25em] text-emerald mb-2">Coach Dashboard</p>
        <h1 className="text-display text-4xl text-foreground">
          Welcome back, {displayName}
        </h1>
        <p className="mt-2 text-muted-foreground">
          Manage your program and track recruit engagement.
        </p>
      </div>

      {/* Stat strip */}
      <div className="stat-strip flex-wrap gap-y-4 rounded-xl border border-border bg-card/50 py-6 px-4 animate-in-up delay-1">
        {stats.map((stat) => (
          <div key={stat.label} className="min-w-[100px] py-1">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <stat.icon className="h-3.5 w-3.5 text-emerald" />
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {stat.label}
              </p>
            </div>
            <p className="text-scoreboard text-3xl font-bold text-foreground">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Managing school — cinematic banner */}
      {school && (
        <div className="mt-6 relative overflow-hidden rounded-xl animate-in-up delay-2">
          {/* Stadium panorama background */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(/panoramas/${school.slug}-stadium.jpg)`,
            }}
          />
          {/* Color overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${school.colorPrimary}CC, ${school.colorSecondary}99)`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

          {/* Watermark */}
          <div
            className="pointer-events-none absolute -right-4 top-1/2 -translate-y-1/2 select-none text-hero text-8xl opacity-[0.08]"
            style={{ color: school.colorAccent || '#fff' }}
          >
            {school.shortName}
          </div>

          <div className="relative flex items-center justify-between p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
                <Building className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-white/60">Managing</p>
                <p className="font-display text-lg font-bold uppercase tracking-wide text-white">{school.name}</p>
              </div>
            </div>
            <Link href="/admin/program">
              <span className="glass-panel flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-medium uppercase tracking-wider text-white transition-colors hover:bg-white/10">
                Edit Program <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          </div>
        </div>
      )}

      {/* Quick links */}
      <div className="mt-6 grid gap-3 sm:grid-cols-2 animate-in-up delay-3">
        {[
          { label: 'Manage Program', href: '/admin/program', icon: Building },
          { label: 'View Analytics', href: '/admin/analytics', icon: BarChart3 },
        ].map((link) => (
          <Link key={link.href} href={link.href}>
            <div className="group glass-panel flex items-center gap-3 rounded-xl p-4 cursor-pointer transition-all hover:bg-white/[0.04] hover:-translate-y-0.5">
              <link.icon className="h-4 w-4 text-muted-foreground group-hover:text-emerald transition-colors" />
              <span className="font-display text-sm uppercase tracking-wide text-muted-foreground group-hover:text-foreground transition-colors">
                {link.label}
              </span>
              <ArrowRight className="ml-auto h-3 w-3 text-muted-foreground/30 group-hover:text-emerald transition-colors" />
            </div>
          </Link>
        ))}
      </div>

      {/* Invite Links */}
      <div className="mt-8 animate-in-up delay-4">
        <div className="mb-4 flex items-center gap-2">
          <Link2 className="h-4 w-4 text-emerald" />
          <h2 className="text-display text-sm tracking-[0.15em] text-muted-foreground">Invite Links</h2>
        </div>
        <InvitesManager
          invites={invites.map((inv) => ({
            id: inv.id,
            code: inv.code,
            expiresAt: inv.expiresAt,
            usedCount: inv.usedCount,
            createdAt: inv.createdAt,
          }))}
        />
      </div>
    </div>
  )
}

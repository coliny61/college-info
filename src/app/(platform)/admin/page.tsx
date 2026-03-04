import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { Card, CardContent } from '@/components/ui/card'
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
    { label: 'Total Views', value: totalViews.toString(), icon: Eye, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { label: 'Unique Recruits', value: uniqueRecruits.toString(), icon: Users, color: 'text-emerald', bg: 'bg-emerald/10' },
    { label: 'Avg. Engagement', value: '—', icon: BarChart3, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { label: 'Active Invites', value: activeInvites.toString(), icon: Link2, color: 'text-amber-400', bg: 'bg-amber-400/10' },
  ]

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8">
        <span className="text-sm font-medium text-emerald">Coach Dashboard</span>
        <h1 className="mt-1 text-3xl font-black tracking-tight text-foreground">
          Welcome back, {displayName}
        </h1>
        <p className="mt-2 text-muted-foreground">
          Manage your program and track recruit engagement.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="overflow-hidden">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {stat.label}
                </p>
                <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${stat.bg}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </div>
              <p className="mt-3 text-3xl font-black tracking-tight">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Managing school card */}
      {school && (
        <Card className="mt-6 overflow-hidden">
          <div
            className="h-1"
            style={{
              background: `linear-gradient(to right, ${school.colorPrimary}, ${school.colorSecondary})`,
            }}
          />
          <CardContent className="flex items-center justify-between p-6">
            <div className="flex items-center gap-4">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl"
                style={{ backgroundColor: school.colorPrimary + '1A' }}
              >
                <Building className="h-6 w-6" style={{ color: school.colorPrimary }} />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Managing</p>
                <p className="text-lg font-bold text-foreground">{school.name}</p>
              </div>
            </div>
            <Link href="/admin/program">
              <span className="flex items-center gap-1 text-sm font-medium text-emerald hover:underline">
                Edit Program <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          </CardContent>
        </Card>
      )}

      {/* Quick links */}
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {[
          { label: 'Manage Program', href: '/admin/program', icon: Building },
          { label: 'View Analytics', href: '/admin/analytics', icon: BarChart3 },
        ].map((link) => (
          <Link key={link.href} href={link.href}>
            <Card className="group cursor-pointer transition-all hover:border-emerald/30 hover:shadow-lg hover:shadow-emerald/5">
              <CardContent className="flex items-center gap-3 p-4">
                <link.icon className="h-4 w-4 text-muted-foreground group-hover:text-emerald" />
                <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground">
                  {link.label}
                </span>
                <ArrowRight className="ml-auto h-3 w-3 text-muted-foreground/50 group-hover:text-emerald" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Invite Links */}
      <div className="mt-8">
        <div className="mb-4 flex items-center gap-2">
          <Link2 className="h-4 w-4 text-emerald" />
          <h2 className="text-lg font-bold text-foreground">Invite Links</h2>
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

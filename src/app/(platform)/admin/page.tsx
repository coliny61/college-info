import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Eye, Users, BarChart3, Link2 } from 'lucide-react'

export default async function AdminDashboard() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const displayName =
    user?.user_metadata?.display_name ?? user?.email?.split('@')[0] ?? 'Coach'

  // Get first school for demo
  const school = await prisma.school.findFirst()

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

  const stats = [
    { label: 'Total Views', value: totalViews.toString(), icon: Eye },
    { label: 'Unique Recruits', value: uniqueRecruits.toString(), icon: Users },
    { label: 'Avg. Engagement', value: '—', icon: BarChart3 },
    { label: 'Active Invites', value: activeInvites.toString(), icon: Link2 },
  ]

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Welcome back, {displayName}
        </h1>
        <p className="mt-2 text-muted-foreground">
          Manage your program and track recruit engagement.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {school && (
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Managing: {school.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Use the sidebar to manage your school profile, media, facilities,
                coaches, jerseys, and invite links.
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

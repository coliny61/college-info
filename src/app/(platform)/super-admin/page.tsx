import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Building, Users, CreditCard, Shield } from 'lucide-react'

export default async function SuperAdminDashboard() {
  const [schoolCount, userCount, inviteCount] = await Promise.all([
    prisma.school.count(),
    prisma.user.count(),
    prisma.inviteLink.count(),
  ])

  const stats = [
    { label: 'Schools', value: schoolCount.toString(), icon: Building },
    { label: 'Users', value: userCount.toString(), icon: Users },
    { label: 'Invite Links', value: inviteCount.toString(), icon: Shield },
    { label: 'MRR', value: '$0', icon: CreditCard },
  ]

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Platform Overview</h1>
        <p className="mt-2 text-muted-foreground">
          Manage the College Info platform.
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
    </div>
  )
}

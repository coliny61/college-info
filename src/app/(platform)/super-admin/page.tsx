import { prisma } from '@/lib/prisma'
import { Card, CardContent } from '@/components/ui/card'
import { Building, Users, Shield, CreditCard } from 'lucide-react'

export default async function SuperAdminDashboard() {
  const [schoolCount, userCount, inviteCount] = await Promise.all([
    prisma.school.count(),
    prisma.user.count(),
    prisma.inviteLink.count(),
  ])

  const stats = [
    { label: 'Schools', value: schoolCount.toString(), icon: Building, color: 'text-emerald', bg: 'bg-emerald/10' },
    { label: 'Users', value: userCount.toString(), icon: Users, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { label: 'Invite Links', value: inviteCount.toString(), icon: Shield, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { label: 'MRR', value: '$0', icon: CreditCard, color: 'text-amber-400', bg: 'bg-amber-400/10' },
  ]

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8">
        <span className="text-sm font-medium text-emerald">Super Admin</span>
        <h1 className="mt-1 text-3xl font-black tracking-tight text-foreground">
          Platform Overview
        </h1>
        <p className="mt-2 text-muted-foreground">
          Manage the College Info platform.
        </p>
      </div>

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
    </div>
  )
}

import { prisma } from '@/lib/prisma'
import { InvitesManager } from './invites-manager'

export default async function AdminInvitesPage() {
  const school = await prisma.school.findFirst()
  if (!school) return <p className="text-muted-foreground">No school found.</p>

  const invites = await prisma.inviteLink.findMany({
    where: { schoolId: school.id },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Invite Links</h1>
        <p className="mt-2 text-muted-foreground">
          Generate links to invite recruits to explore your program.
        </p>
      </div>

      <InvitesManager invites={invites} />
    </div>
  )
}

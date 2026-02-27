import { prisma } from '@/lib/prisma'
import { CoachesManager } from './coaches-manager'

export default async function AdminCoachesPage() {
  const school = await prisma.school.findFirst()
  if (!school) return <p className="text-muted-foreground">No school found.</p>

  const sport = await prisma.sport.findFirst({
    where: { schoolId: school.id },
    include: { coaches: { orderBy: { name: 'asc' } } },
  })

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Coaches</h1>
        <p className="mt-2 text-muted-foreground">
          Manage your coaching staff roster.
        </p>
      </div>

      <CoachesManager coaches={sport?.coaches ?? []} />
    </div>
  )
}

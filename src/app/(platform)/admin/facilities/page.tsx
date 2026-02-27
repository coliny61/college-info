import { prisma } from '@/lib/prisma'
import { FacilitiesManager } from './facilities-manager'

export default async function AdminFacilitiesPage() {
  const school = await prisma.school.findFirst()
  if (!school) return <p className="text-muted-foreground">No school found.</p>

  const facilities = await prisma.facility.findMany({
    where: { schoolId: school.id },
    include: { hotspots: true },
    orderBy: { name: 'asc' },
  })

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Facilities</h1>
        <p className="mt-2 text-muted-foreground">
          Manage facilities and tour hotspots.
        </p>
      </div>

      <FacilitiesManager facilities={facilities} />
    </div>
  )
}

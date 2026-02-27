import { prisma } from '@/lib/prisma'
import { SchoolEditor } from './school-editor'

export default async function AdminSchoolPage() {
  const school = await prisma.school.findFirst()

  if (!school) {
    return (
      <div className="mx-auto max-w-4xl">
        <p className="text-muted-foreground">No school found.</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">School Profile</h1>
        <p className="mt-2 text-muted-foreground">
          Edit your program&apos;s public-facing profile.
        </p>
      </div>

      <SchoolEditor school={school} />
    </div>
  )
}

import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import type { School } from '@/generated/prisma/client'
import { createClient } from '@/lib/supabase/server'
import { ProgramManager } from './program-manager'

export const metadata: Metadata = { title: 'Manage Program' }

export default async function AdminProgramPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  let school: School | null = null
  if (user) {
    const dbUser = await prisma.user
      .findUnique({
        where: { id: user.id },
        select: { schoolId: true },
      })
      .catch(() => null)
    if (dbUser?.schoolId) {
      school = await prisma.school.findUnique({ where: { id: dbUser.schoolId } })
    }
  }
  if (!school) {
    school = await prisma.school.findFirst()
  }
  if (!school) return <p className="text-muted-foreground">No school found.</p>

  // Fetch all program data in parallel
  const [sport, facilities, jerseyAssets] = await Promise.all([
    prisma.sport.findFirst({
      where: { schoolId: school.id },
      include: { coaches: { orderBy: { name: 'asc' } } },
    }),
    prisma.facility.findMany({
      where: { schoolId: school.id },
      include: { hotspots: { select: { id: true, label: true } } },
      orderBy: { name: 'asc' },
    }),
    prisma.jerseyAsset.findMany({
      where: { schoolId: school.id },
      orderBy: [{ type: 'asc' }, { colorLabel: 'asc' }],
    }),
  ])

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8">
        <span className="text-sm font-medium text-emerald">Program Management</span>
        <h1 className="mt-1 text-3xl font-black tracking-tight text-foreground">
          {school.name}
        </h1>
        <p className="mt-2 text-muted-foreground">
          Manage your school profile, coaching staff, facilities, and jersey assets.
        </p>
      </div>

      <ProgramManager
        school={{
          id: school.id,
          name: school.name,
          description: school.description,
          colorPrimary: school.colorPrimary,
          colorSecondary: school.colorSecondary,
          colorAccent: school.colorAccent,
        }}
        coaches={(sport?.coaches ?? []).map((c) => ({
          id: c.id,
          name: c.name,
          title: c.title,
          bio: c.bio,
          yearsAtSchool: c.yearsAtSchool,
        }))}
        facilities={facilities.map((f) => ({
          id: f.id,
          name: f.name,
          type: f.type,
          description: f.description,
          panoramaUrl: f.panoramaUrl,
          hotspots: f.hotspots,
        }))}
        jerseyAssets={jerseyAssets.map((a) => ({
          id: a.id,
          type: a.type,
          colorLabel: a.colorLabel,
          imageUrl: a.imageUrl,
        }))}
      />
    </div>
  )
}

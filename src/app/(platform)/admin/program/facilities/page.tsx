import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'

export const metadata: Metadata = { title: 'Manage Facilities' }

async function getSchool() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null
  const dbUser = await prisma.user.findUnique({ where: { id: user.id }, select: { schoolId: true } })
  const schoolId = dbUser?.schoolId
  if (!schoolId) return null
  return prisma.school.findUnique({
    where: { id: schoolId },
    include: {
      facilities: { orderBy: { sortOrder: 'asc' }, include: { hotspots: true } },
    },
  })
}

export default async function FacilitiesPage() {
  const school = await getSchool()
  if (!school) notFound()

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 animate-in-up">
        <h1 className="text-display text-3xl text-foreground">Manage Facilities</h1>
        <p className="mt-2 text-muted-foreground">Add and manage 360° tour points of interest for {school.name}.</p>
      </div>

      <div className="space-y-4">
        {school.facilities.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border p-12 text-center">
            <p className="text-muted-foreground">No facilities yet. Add your first point of interest.</p>
          </div>
        ) : (
          school.facilities.map((facility) => (
            <div key={facility.id} className="glass-panel rounded-xl p-5">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-foreground">{facility.name}</h3>
                  <p className="text-[10px] text-muted-foreground capitalize">{facility.type.replace('-', ' ')} &middot; Order: {facility.sortOrder} {facility.isRequired && '&middot; Required'}</p>
                </div>
                <div className="flex gap-2 text-xs text-muted-foreground">
                  {facility.panoramaUrl && <span className="rounded bg-emerald/10 px-2 py-0.5 text-emerald">360°</span>}
                  <span>{facility.hotspots.length} hotspots</span>
                </div>
              </div>
              <p className="mt-2 text-xs text-muted-foreground line-clamp-2">{facility.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

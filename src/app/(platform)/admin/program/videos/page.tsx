import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'

export const metadata: Metadata = { title: 'Manage Videos' }

async function getSchool() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null
  const dbUser = await prisma.user.findUnique({ where: { id: user.id }, select: { schoolId: true } })
  if (!dbUser?.schoolId) return null
  return prisma.school.findUnique({
    where: { id: dbUser.schoolId },
    include: { videos: { orderBy: { sortOrder: 'asc' } } },
  })
}

const TYPE_LABELS: Record<string, string> = {
  coach_intro: 'Coach Introduction',
  highlight: 'Highlight Reel',
  day_in_life: 'Day in the Life',
}

export default async function VideosPage() {
  const school = await getSchool()
  if (!school) notFound()

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 animate-in-up">
        <h1 className="text-display text-3xl text-foreground">Manage Videos</h1>
        <p className="mt-2 text-muted-foreground">Add coach introductions, highlights, and day-in-the-life content.</p>
      </div>

      <div className="space-y-4">
        {school.videos.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border p-12 text-center">
            <p className="text-muted-foreground">No videos yet. Add your first video.</p>
          </div>
        ) : (
          school.videos.map((video) => (
            <div key={video.id} className="glass-panel rounded-xl p-5">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-foreground">{video.title}</h3>
                  <p className="text-[10px] text-muted-foreground">{TYPE_LABELS[video.type] ?? video.type} {video.playerName && `· ${video.playerName}`}</p>
                </div>
                <span className="text-xs text-muted-foreground">#{video.sortOrder}</span>
              </div>
              {video.description && <p className="mt-2 text-xs text-muted-foreground line-clamp-2">{video.description}</p>}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

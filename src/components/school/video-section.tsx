'use client'

import { Play, Film, Users2 } from 'lucide-react'

interface SchoolVideo {
  id: string
  type: string
  title: string
  description: string | null
  videoUrl: string
  thumbnailUrl: string | null
  coachId: string | null
  playerName: string | null
  sortOrder: number
}

interface VideoSectionProps {
  videos: SchoolVideo[]
  colorPrimary: string
}

const TYPE_LABELS: Record<string, { label: string; icon: typeof Play }> = {
  coach_intro: { label: 'Coach Introductions', icon: Users2 },
  highlight: { label: 'Highlights', icon: Film },
  day_in_life: { label: 'Day in the Life', icon: Play },
}

export function VideoSection({ videos, colorPrimary }: VideoSectionProps) {
  if (videos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-muted/50 mb-4">
          <Film className="h-7 w-7 text-muted-foreground" />
        </div>
        <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-foreground">
          Videos Coming Soon
        </h3>
        <p className="mt-1.5 max-w-xs text-xs text-muted-foreground">
          Video content is not yet available for this school.
        </p>
      </div>
    )
  }

  // Group by type
  const grouped: Record<string, SchoolVideo[]> = {}
  for (const video of videos) {
    if (!grouped[video.type]) grouped[video.type] = []
    grouped[video.type].push(video)
  }

  return (
    <div className="space-y-10 animate-in-up">
      {Object.entries(grouped).map(([type, typeVideos]) => {
        const config = TYPE_LABELS[type] ?? { label: type, icon: Play }
        const Icon = config.icon
        return (
          <div key={type}>
            <h4 className="mb-4 flex items-center gap-2 text-display text-xs tracking-[0.15em] text-muted-foreground">
              <Icon className="h-4 w-4" style={{ color: colorPrimary }} />
              {config.label}
            </h4>
            <div className="grid gap-4 sm:grid-cols-2">
              {typeVideos.map((video) => (
                <div key={video.id} className="glass-panel overflow-hidden rounded-xl">
                  <div className="relative aspect-video bg-black">
                    <iframe
                      src={video.videoUrl}
                      className="absolute inset-0 h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <div className="p-4">
                    <h5 className="font-display text-sm font-semibold uppercase tracking-wide text-foreground">
                      {video.title}
                    </h5>
                    {video.playerName && (
                      <p className="mt-0.5 text-[10px] uppercase tracking-wider" style={{ color: colorPrimary }}>
                        Featuring {video.playerName}
                      </p>
                    )}
                    {video.description && (
                      <p className="mt-2 text-xs text-muted-foreground line-clamp-2">
                        {video.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

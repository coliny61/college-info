import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Pencil } from 'lucide-react'

interface ProfileSummaryProps {
  profile: {
    sport?: string | null
    position?: string | null
    height?: string | null
    weight?: number | null
    graduationYear?: number | null
    gpa?: number | null
    highSchool?: string | null
    city?: string | null
    state?: string | null
  }
}

export function ProfileSummaryCard({ profile }: ProfileSummaryProps) {
  const items = [
    profile.sport && { label: profile.sport, highlight: true },
    profile.position && { label: profile.position },
    profile.height && { label: profile.height },
    profile.weight && { label: `${profile.weight} lbs` },
    profile.graduationYear && { label: `Class of ${profile.graduationYear}` },
    profile.gpa && { label: `${profile.gpa} GPA` },
    profile.highSchool && {
      label: `${profile.highSchool}${profile.city ? `, ${profile.city}` : ''}${profile.state ? ` ${profile.state}` : ''}`,
    },
  ].filter(Boolean) as { label: string; highlight?: boolean }[]

  if (items.length === 0) {
    return (
      <Link href="/recruit/profile">
        <Card className="group cursor-pointer border-dashed transition-colors hover:border-emerald/30">
          <CardContent className="flex items-center justify-between p-4">
            <p className="text-sm text-muted-foreground">
              Complete your profile to help coaches find you.
            </p>
            <Pencil className="h-4 w-4 text-muted-foreground group-hover:text-emerald transition-colors" />
          </CardContent>
        </Card>
      </Link>
    )
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="flex items-center justify-between gap-4 p-4">
        <div className="flex flex-wrap items-center gap-2">
          {items.map((item) => (
            <Badge
              key={item.label}
              variant={item.highlight ? 'default' : 'secondary'}
              className={item.highlight ? 'bg-emerald text-white' : ''}
            >
              {item.label}
            </Badge>
          ))}
        </div>
        <Link
          href="/recruit/profile"
          className="shrink-0 rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <Pencil className="h-4 w-4" />
        </Link>
      </CardContent>
    </Card>
  )
}

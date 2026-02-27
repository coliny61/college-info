import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Trophy, Users, Building } from 'lucide-react'

interface AthleticsTabProps {
  sports: Array<{
    id: string
    name: string
    conference: string
    headCoach: string
    record: string | null
    ranking: number | null
    coaches: Array<{
      id: string
      name: string
      title: string
      bio: string
      yearsAtSchool: number
    }>
  }>
  facilities: Array<{
    id: string
    name: string
    type: string
    description: string
    panoramaUrl: string | null
  }>
  colorPrimary: string
}

export function AthleticsTab({
  sports,
  facilities,
  colorPrimary,
}: AthleticsTabProps) {
  return (
    <div className="space-y-6">
      {/* Sports */}
      {sports.map((sport) => (
        <Card key={sport.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Trophy
                    className="h-5 w-5"
                    style={{ color: colorPrimary }}
                  />
                  {sport.name}
                </CardTitle>
                <p className="mt-1 text-sm text-muted-foreground">
                  {sport.conference}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {sport.record && (
                  <Badge variant="outline">{sport.record}</Badge>
                )}
                {sport.ranking && (
                  <Badge
                    style={{
                      backgroundColor: colorPrimary + '1A',
                      color: colorPrimary,
                    }}
                  >
                    #{sport.ranking}
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
              <Users className="h-4 w-4" style={{ color: colorPrimary }} />
              Coaching Staff
            </h4>
            <div className="grid gap-3 sm:grid-cols-2">
              {sport.coaches.map((coach) => (
                <div
                  key={coach.id}
                  className="rounded-lg border border-border p-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-foreground">
                        {coach.name}
                      </p>
                      <p
                        className="text-xs font-medium"
                        style={{ color: colorPrimary }}
                      >
                        {coach.title}
                      </p>
                    </div>
                    <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                      {coach.yearsAtSchool}y
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground line-clamp-3">
                    {coach.bio}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Facilities */}
      {facilities.length > 0 && (
        <div>
          <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-foreground">
            <Building className="h-5 w-5" style={{ color: colorPrimary }} />
            Facilities
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {facilities.map((facility) => (
              <Card key={facility.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-foreground">
                        {facility.name}
                      </p>
                      <span
                        className="mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium capitalize"
                        style={{
                          backgroundColor: colorPrimary + '1A',
                          color: colorPrimary,
                        }}
                      >
                        {facility.type.replace('-', ' ')}
                      </span>
                    </div>
                    {facility.panoramaUrl && (
                      <Badge variant="outline" className="text-xs">
                        360°
                      </Badge>
                    )}
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground line-clamp-2">
                    {facility.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  GraduationCap,
  Users,
  TrendingUp,
  DollarSign,
  Building,
  Trophy,
  Banknote,
} from 'lucide-react'

interface OverviewTabProps {
  description: string
  academics: {
    enrollment: number
    admissionRate: number
    graduationRate: number
    medianEarnings: number
  } | null
  nilBudget: number | null
  alumniCount: number
  facilities: Array<{
    id: string
    name: string
    type: string
    description: string
  }>
  colorPrimary: string
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  color: string
}) {
  return (
    <Card>
      <CardContent className="flex items-center gap-3 p-4">
        <div
          className="rounded-lg p-2"
          style={{ backgroundColor: color + '1A' }}
        >
          <span style={{ color }}>
            <Icon className="h-5 w-5" />
          </span>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-lg font-bold text-foreground">{value}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export function OverviewTab({
  description,
  academics,
  nilBudget,
  alumniCount,
  facilities,
  colorPrimary,
}: OverviewTabProps) {
  return (
    <div className="space-y-6">
      {/* Description */}
      <div>
        <h3 className="mb-2 text-lg font-semibold text-foreground">About</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>

      {/* Stats grid */}
      {academics && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard
            icon={Users}
            label="Enrollment"
            value={academics.enrollment.toLocaleString()}
            color={colorPrimary}
          />
          <StatCard
            icon={GraduationCap}
            label="Admission Rate"
            value={`${(academics.admissionRate * 100).toFixed(0)}%`}
            color={colorPrimary}
          />
          <StatCard
            icon={TrendingUp}
            label="Graduation Rate"
            value={`${(academics.graduationRate * 100).toFixed(0)}%`}
            color={colorPrimary}
          />
          <StatCard
            icon={DollarSign}
            label="Median Earnings"
            value={`$${academics.medianEarnings.toLocaleString()}`}
            color={colorPrimary}
          />
          {nilBudget && (
            <StatCard
              icon={Banknote}
              label="NIL Budget"
              value={nilBudget >= 1000000 ? `$${(nilBudget / 1000000).toFixed(1)}M` : `$${nilBudget.toLocaleString()}`}
              color={colorPrimary}
            />
          )}
          {alumniCount > 0 && (
            <StatCard
              icon={Trophy}
              label="Notable NFL Alumni"
              value={alumniCount.toString()}
              color={colorPrimary}
            />
          )}
        </div>
      )}

      {/* Featured facilities */}
      {facilities.length > 0 && (
        <div>
          <h3 className="mb-3 text-lg font-semibold text-foreground">
            Facilities
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {facilities.slice(0, 4).map((facility) => (
              <Card key={facility.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Building
                      className="h-4 w-4"
                      style={{ color: colorPrimary }}
                    />
                    <CardTitle className="text-sm">{facility.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground line-clamp-2">
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

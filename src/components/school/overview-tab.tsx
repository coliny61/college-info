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

export function OverviewTab({
  description,
  academics,
  nilBudget,
  alumniCount,
  facilities,
  colorPrimary,
}: OverviewTabProps) {
  const stats = academics
    ? [
        { icon: Users, label: 'Enrollment', value: academics.enrollment.toLocaleString() },
        { icon: GraduationCap, label: 'Admission Rate', value: `${(academics.admissionRate * 100).toFixed(0)}%` },
        { icon: TrendingUp, label: 'Graduation Rate', value: `${(academics.graduationRate * 100).toFixed(0)}%` },
        { icon: DollarSign, label: 'Median Earnings', value: `$${academics.medianEarnings.toLocaleString()}` },
        ...(nilBudget
          ? [{ icon: Banknote, label: 'NIL Budget', value: nilBudget >= 1000000 ? `$${(nilBudget / 1000000).toFixed(1)}M` : `$${nilBudget.toLocaleString()}` }]
          : []),
        ...(alumniCount > 0
          ? [{ icon: Trophy, label: 'NFL Alumni', value: alumniCount.toString() }]
          : []),
      ]
    : []

  return (
    <div className="space-y-10 animate-in-up">
      {/* About — editorial style with drop cap */}
      <div>
        <h3 className="text-display mb-4 text-sm tracking-[0.15em] text-muted-foreground">
          About
        </h3>
        <p className="drop-cap text-base leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>

      {/* Stat strip */}
      {stats.length > 0 && (
        <>
          <div className="section-divider" />
          <div className="stat-strip flex-wrap gap-y-6 py-2">
            {stats.map((stat) => (
              <div key={stat.label} className="min-w-[120px] py-2">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <stat.icon className="h-3.5 w-3.5" style={{ color: colorPrimary }} />
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
                <p className="text-scoreboard text-3xl font-bold text-foreground">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
          <div className="section-divider" />
        </>
      )}

      {/* Facilities — glass panels */}
      {facilities.length > 0 && (
        <div>
          <h3 className="text-display mb-4 text-sm tracking-[0.15em] text-muted-foreground">
            Facilities
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {facilities.slice(0, 4).map((facility) => (
              <div key={facility.id} className="glass-panel rounded-xl p-5">
                <div className="flex items-center gap-2">
                  <Building
                    className="h-4 w-4"
                    style={{ color: colorPrimary }}
                  />
                  <h4 className="font-display text-sm font-semibold uppercase tracking-wide text-foreground">
                    {facility.name}
                  </h4>
                </div>
                <span
                  className="mt-2 inline-block rounded-sm px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider capitalize"
                  style={{
                    backgroundColor: colorPrimary + '15',
                    color: colorPrimary,
                  }}
                >
                  {facility.type.replace('-', ' ')}
                </span>
                <p className="mt-2 text-xs text-muted-foreground line-clamp-2">
                  {facility.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

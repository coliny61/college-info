import Link from 'next/link'
import { Building, Shirt, ArrowRight } from 'lucide-react'

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
  schoolSlug?: string
  isPublic?: boolean
}

export function OverviewTab({
  description,
  academics,
  nilBudget,
  alumniCount,
  facilities,
  colorPrimary,
  schoolSlug,
  isPublic = false,
}: OverviewTabProps) {
  const stats = academics
    ? [
        { label: 'Enrollment', value: academics.enrollment.toLocaleString() },
        { label: 'Admission Rate', value: `${(academics.admissionRate * 100).toFixed(0)}%` },
        { label: 'Graduation Rate', value: `${(academics.graduationRate * 100).toFixed(0)}%` },
        { label: 'Median Earnings', value: `$${academics.medianEarnings.toLocaleString()}` },
        ...(nilBudget
          ? [{ label: 'NIL Budget', value: nilBudget >= 1000000 ? `$${(nilBudget / 1000000).toFixed(1)}M` : `$${nilBudget.toLocaleString()}` }]
          : []),
        ...(alumniCount > 0
          ? [{ label: 'NFL Alumni', value: alumniCount.toString() }]
          : []),
      ]
    : []

  return (
    <div className="space-y-10 animate-in-up">
      {/* About */}
      <p className="drop-cap text-base leading-relaxed text-muted-foreground">
        {description}
      </p>

      {/* Stat strip */}
      {stats.length > 0 && (
        <>
          <div className="section-divider" />
          <div className="stat-strip flex-wrap gap-y-6 py-2">
            {stats.map((stat) => (
              <div key={stat.label} className="min-w-[120px] py-2">
                <p className="text-scoreboard text-3xl font-bold text-foreground">
                  {stat.value}
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {stat.label}
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

      {/* Jersey Room CTA */}
      {schoolSlug && (
        <>
          <div className="section-divider" />
          <Link
            href={isPublic ? '/register' : `/recruit/school/${schoolSlug}/jersey`}
            className="group block"
          >
            <div
              className="relative overflow-hidden rounded-xl p-8 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/20"
              style={{
                background: `linear-gradient(135deg, ${colorPrimary}20, ${colorPrimary}08)`,
                border: `1px solid ${colorPrimary}25`,
              }}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  <div
                    className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl"
                    style={{ backgroundColor: colorPrimary + '20' }}
                  >
                    <Shirt className="h-5 w-5 sm:h-6 sm:w-6" style={{ color: colorPrimary }} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display text-base sm:text-lg font-bold uppercase tracking-wide text-foreground">
                      Jersey Room
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground truncate">
                      Mix and match helmets, jerseys, and pants — download your dream uniform
                    </p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 shrink-0 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-foreground" />
              </div>
            </div>
          </Link>
        </>
      )}
    </div>
  )
}

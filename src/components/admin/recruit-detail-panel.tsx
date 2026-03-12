'use client'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Clock, BookOpen, Shirt, Eye, User, Calendar, MessageSquare, Flame, Sparkles } from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

interface RecruitEngagement {
  name: string
  email: string
  sport: string | null
  position: string | null
  graduationYear: number | null
  sections: string[]
  totalDuration: number
  visits: number
  lastActive: string
}

interface VisitInsight {
  topCollege: string | null
  collegeTime: number
  jerseyCombo: string | null
  jerseyViews: number
}

interface RecruitDetailPanelProps {
  open: boolean
  onClose: () => void
  recruit: RecruitEngagement | null
  insight: VisitInsight | null
}

function formatDuration(seconds: number): string {
  if (seconds >= 3600) {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    return `${h}h ${m}m`
  }
  if (seconds >= 60) {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}m ${s}s`
  }
  return `${seconds}s`
}

function prettifySection(section: string): string {
  return section
    .replace(/^tab:/, '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

export function getInterestLevel(recruit: RecruitEngagement): { label: string; color: string; bg: string } {
  // Score based on visits, duration, and sections explored
  const score = recruit.visits * 3 + Math.min(recruit.totalDuration / 30, 10) + recruit.sections.length * 2
  if (score >= 15) return { label: 'Hot', color: 'text-red-400', bg: 'bg-red-400/10' }
  if (score >= 8) return { label: 'Warm', color: 'text-amber-400', bg: 'bg-amber-400/10' }
  return { label: 'Cool', color: 'text-blue-400', bg: 'bg-blue-400/10' }
}

function generateTalkingPoints(recruit: RecruitEngagement, insight: VisitInsight | null): string[] {
  const points: string[] = []
  const firstName = recruit.name.split(' ')[0]

  // Academic interest
  if (insight?.topCollege) {
    const dept = insight.topCollege.replace(/-/g, ' ')
    points.push(`Ask ${firstName} about their interest in ${dept} — they spent ${formatDuration(insight.collegeTime)} exploring it`)
  }

  // Jersey room engagement
  if (insight?.jerseyCombo) {
    points.push(`Mention their favorite uniform combo (${insight.jerseyCombo}) — a great icebreaker`)
  } else if (insight && insight.jerseyViews > 0) {
    points.push(`${firstName} explored the Jersey Room ${insight.jerseyViews} time${insight.jerseyViews > 1 ? 's' : ''} — they care about the look`)
  }

  // Multiple visits = strong interest
  if (recruit.visits >= 3) {
    points.push(`${firstName} has visited ${recruit.visits} times — they're seriously interested. Consider a personal follow-up call`)
  } else if (recruit.visits === 2) {
    points.push(`Second-time visitor — interest is building. Good time for a personal touch`)
  }

  // Position-specific
  if (recruit.position) {
    points.push(`Prepare position-specific selling points for ${recruit.position} — depth chart, scheme fit, development plan`)
  }

  // Sections they explored
  if (recruit.sections.includes('tab:athletics') || recruit.sections.includes('tab:football')) {
    points.push(`They explored the football program — highlight coaching staff expertise and recent player development`)
  }
  if (recruit.sections.includes('tab:nil')) {
    points.push(`NIL is on their mind — be ready to discuss your NIL program specifics and opportunities`)
  }
  if (recruit.sections.includes('tab:campus') || recruit.sections.includes('tab:tour')) {
    points.push(`Campus and facilities interest — consider a personalized tour invitation`)
  }

  // Graduation year
  if (recruit.graduationYear) {
    const now = new Date().getFullYear()
    const yearsOut = recruit.graduationYear - now
    if (yearsOut <= 0) {
      points.push(`${firstName} is graduating now — time-sensitive recruitment window`)
    } else if (yearsOut === 1) {
      points.push(`Class of ${recruit.graduationYear} — prime recruiting window. Prioritize outreach`)
    }
  }

  // Fallback
  if (points.length === 0) {
    points.push(`${firstName} is exploring — send a welcome message and invite them to learn more about your program`)
  }

  return points.slice(0, 5) // Max 5 talking points
}

const chartTooltipStyle = {
  backgroundColor: 'oklch(0.12 0.005 260)',
  border: '1px solid oklch(1 0 0 / 0.08)',
  borderRadius: 8,
  color: '#fff',
}

export function RecruitDetailPanel({ open, onClose, recruit, insight }: RecruitDetailPanelProps) {
  if (!recruit) return null

  const sectionChartData = recruit.sections.map((section) => ({
    section: prettifySection(section),
    time: Math.round(recruit.totalDuration / recruit.sections.length),
  }))

  const interestLevel = getInterestLevel(recruit)
  const talkingPoints = generateTalkingPoints(recruit, insight)

  return (
    <Sheet open={open} onOpenChange={(val) => !val && onClose()}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-display text-sm tracking-[0.15em]">
            Recruit Profile
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Header */}
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald/10">
              <User className="h-6 w-6 text-emerald" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-foreground">{recruit.name}</h3>
                <span className={`inline-flex items-center gap-1 rounded-sm px-2 py-0.5 text-[10px] uppercase tracking-wider font-medium ${interestLevel.bg} ${interestLevel.color}`}>
                  <Flame className="h-2.5 w-2.5" />
                  {interestLevel.label}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{recruit.email}</p>
              <div className="mt-1 flex flex-wrap gap-2">
                {recruit.position && (
                  <span className="rounded-sm bg-emerald/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-emerald">
                    {recruit.position}
                  </span>
                )}
                {recruit.graduationYear && (
                  <span className="rounded-sm bg-white/[0.06] px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                    Class of {recruit.graduationYear}
                  </span>
                )}
                {recruit.sport && (
                  <span className="rounded-sm bg-white/[0.06] px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                    {recruit.sport}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Key metrics */}
          <div className="grid grid-cols-3 gap-3">
            <div className="glass-panel rounded-lg p-3 text-center">
              <Clock className="mx-auto h-4 w-4 text-emerald mb-1" />
              <p className="text-scoreboard text-lg font-bold text-foreground">
                {formatDuration(recruit.totalDuration)}
              </p>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Total Time</p>
            </div>
            <div className="glass-panel rounded-lg p-3 text-center">
              <Eye className="mx-auto h-4 w-4 text-emerald mb-1" />
              <p className="text-scoreboard text-lg font-bold text-foreground">
                {recruit.visits}
              </p>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Visits</p>
            </div>
            <div className="glass-panel rounded-lg p-3 text-center">
              <Calendar className="mx-auto h-4 w-4 text-emerald mb-1" />
              <p className="text-scoreboard text-lg font-bold text-foreground">
                {recruit.sections.length}
              </p>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Sections</p>
            </div>
          </div>

          {/* Talking Points — the key visit-prep feature */}
          <div className="rounded-xl border border-emerald/20 bg-emerald/5 p-4">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-4 w-4 text-emerald" />
              <h4 className="text-display text-xs tracking-[0.15em] text-emerald">
                Visit Prep Talking Points
              </h4>
            </div>
            <ul className="space-y-2.5">
              {talkingPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <MessageSquare className="mt-0.5 h-3 w-3 shrink-0 text-emerald/60" />
                  <p className="text-sm text-foreground leading-relaxed">{point}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Section breakdown chart */}
          {sectionChartData.length > 0 && (
            <div>
              <h4 className="text-display text-xs tracking-[0.15em] text-muted-foreground mb-3">
                Section Engagement
              </h4>
              <div className="glass-panel rounded-xl p-4">
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={sectionChartData} layout="vertical">
                    <XAxis type="number" hide />
                    <YAxis
                      type="category"
                      dataKey="section"
                      width={90}
                      stroke="oklch(1 0 0 / 0.2)"
                      fontSize={10}
                      tickLine={false}
                    />
                    <Tooltip
                      contentStyle={chartTooltipStyle}
                      formatter={(value) => [`${formatDuration(value as number)}`, 'Time']}
                    />
                    <Bar dataKey="time" fill="#10B981" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Academic interest */}
          {insight?.topCollege && (
            <div>
              <h4 className="text-display text-xs tracking-[0.15em] text-muted-foreground mb-3">
                Academic Interest
              </h4>
              <div className="glass-panel rounded-xl p-4 flex items-center gap-3">
                <BookOpen className="h-5 w-5 text-emerald shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground capitalize">
                    {insight.topCollege.replace(/-/g, ' ')}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {insight.collegeTime > 0
                      ? `Spent ${formatDuration(insight.collegeTime)} exploring this department`
                      : 'Most-viewed academic department'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Jersey preferences */}
          {(insight?.jerseyCombo || (insight?.jerseyViews ?? 0) > 0) && (
            <div>
              <h4 className="text-display text-xs tracking-[0.15em] text-muted-foreground mb-3">
                Jersey Room Activity
              </h4>
              <div className="glass-panel rounded-xl p-4 flex items-center gap-3">
                <Shirt className="h-5 w-5 text-amber-400 shrink-0" />
                <div>
                  {insight?.jerseyCombo && (
                    <p className="text-sm font-medium text-foreground">
                      Preferred combo: {insight.jerseyCombo}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    {insight?.jerseyViews ?? 0} jersey room interaction{(insight?.jerseyViews ?? 0) !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

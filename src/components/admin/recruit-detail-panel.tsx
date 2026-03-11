'use client'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Clock, BookOpen, Shirt, Eye, User, Calendar } from 'lucide-react'
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

const chartTooltipStyle = {
  backgroundColor: 'oklch(0.12 0.005 260)',
  border: '1px solid oklch(1 0 0 / 0.08)',
  borderRadius: 8,
  color: '#fff',
}

export function RecruitDetailPanel({ open, onClose, recruit, insight }: RecruitDetailPanelProps) {
  if (!recruit) return null

  // Build section time data from sections array (approximate equal distribution since we don't have per-section durations at this level)
  const sectionChartData = recruit.sections.map((section) => ({
    section: prettifySection(section),
    time: Math.round(recruit.totalDuration / recruit.sections.length),
  }))

  // Generate behavioral summary
  const topSection = recruit.sections[0] ? prettifySection(recruit.sections[0]) : null
  const summaryParts: string[] = []
  summaryParts.push(`${recruit.name} spent ${formatDuration(recruit.totalDuration)} on your program`)
  if (recruit.visits > 1) {
    summaryParts.push(`across ${recruit.visits} visit${recruit.visits > 1 ? 's' : ''}`)
  }
  if (topSection) {
    summaryParts.push(`exploring ${recruit.sections.length} section${recruit.sections.length > 1 ? 's' : ''}`)
  }
  if (insight?.topCollege) {
    summaryParts.push(`with focus on ${insight.topCollege.replace(/-/g, ' ')}`)
  }
  const summary = summaryParts.join(', ') + '.'

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
            <div>
              <h3 className="text-lg font-semibold text-foreground">{recruit.name}</h3>
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

          {/* Summary sentence */}
          <div className="rounded-xl border border-emerald/20 bg-emerald/5 p-4">
            <p className="text-sm text-foreground leading-relaxed">{summary}</p>
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

          {/* Visit prep note */}
          <div className="rounded-xl border border-dashed border-border p-4">
            <h4 className="text-display text-xs tracking-[0.15em] text-muted-foreground mb-2">
              Visit Prep Notes
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {recruit.name} has visited {recruit.visits} time{recruit.visits !== 1 ? 's' : ''} and
              explored {recruit.sections.length} section{recruit.sections.length !== 1 ? 's' : ''}.
              {insight?.topCollege && ` They showed strong interest in ${insight.topCollege.replace(/-/g, ' ')}.`}
              {insight?.jerseyCombo && ` Their preferred jersey combo is ${insight.jerseyCombo}.`}
              {' '}Consider referencing these interests during your next conversation.
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

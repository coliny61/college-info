'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Download, Eye, Users, BookOpen, Shirt } from 'lucide-react'
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { RecruitDetailPanel, getInterestLevel } from '@/components/admin/recruit-detail-panel'
import { Flame } from 'lucide-react'

interface AnalyticsDashboardProps {
  schoolId: string
  viewsData: Array<{ date: string; views: number }>
  engagementData: Array<{
    name: string
    email: string
    sport: string | null
    position: string | null
    graduationYear: number | null
    sections: string[]
    totalDuration: number
    visits: number
    lastActive: string
  }>
  sectionData: Array<{ section: string; count: number }>
  recentActivity: Array<{
    id: string
    name: string
    section: string
    action: string
    createdAt: string
  }>
  totalEvents: number
  uniqueRecruits: number
  visitInsights: Array<{
    name: string
    email: string
    topCollege: string | null
    collegeTime: number
    jerseyCombo: string | null
    jerseyViews: number
  }>
}

const chartTooltipStyle = {
  backgroundColor: 'oklch(0.12 0.005 260)',
  border: '1px solid oklch(1 0 0 / 0.08)',
  borderRadius: 8,
  color: '#fff',
}

export function AnalyticsDashboard({
  schoolId,
  viewsData,
  engagementData,
  sectionData,
  recentActivity,
  totalEvents,
  uniqueRecruits,
  visitInsights,
}: AnalyticsDashboardProps) {
  const [selectedRecruitIdx, setSelectedRecruitIdx] = useState<number | null>(null)

  const selectedRecruit = selectedRecruitIdx !== null ? engagementData[selectedRecruitIdx] : null
  const selectedInsight = selectedRecruit
    ? visitInsights.find((v) => v.email === selectedRecruit.email) ?? null
    : null

  const handleExport = () => {
    window.open(`/api/analytics/export?schoolId=${schoolId}&days=30`, '_blank')
  }

  return (
    <div className="space-y-8">
      {/* Top bar */}
      <div className="flex items-center justify-between animate-in-up">
        <div className="flex items-center gap-8">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Profile Views</p>
            <p className="text-scoreboard text-3xl font-bold text-foreground">{totalEvents}</p>
          </div>
          <div className="h-8 w-px bg-border" />
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Prospects Identified</p>
            <p className="text-scoreboard text-3xl font-bold text-foreground">{uniqueRecruits}</p>
          </div>
        </div>
        <Button size="sm" variant="outline" onClick={handleExport} className="text-[10px] uppercase tracking-wider">
          <Download className="mr-1 h-3 w-3" />
          Export CSV
        </Button>
      </div>

      {/* Views chart — area instead of line */}
      <div className="glass-panel rounded-xl p-6 animate-in-up delay-1">
        <h3 className="text-display text-sm tracking-[0.15em] text-muted-foreground mb-4">
          Prospect Traffic
        </h3>
        {viewsData.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No traffic yet. Data appears as recruits browse your program.
          </p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={viewsData}>
              <defs>
                <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.05)" />
              <XAxis
                dataKey="date"
                tickFormatter={(d) => new Date(d).toLocaleDateString('en', { month: 'short', day: 'numeric' })}
                stroke="oklch(1 0 0 / 0.2)"
                fontSize={11}
                tickLine={false}
              />
              <YAxis stroke="oklch(1 0 0 / 0.2)" fontSize={11} tickLine={false} />
              <Tooltip contentStyle={chartTooltipStyle} />
              <Area
                type="monotone"
                dataKey="views"
                stroke="#10B981"
                strokeWidth={2}
                fill="url(#viewsGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-2 animate-in-up delay-2">
        {/* Section breakdown */}
        <div className="glass-panel rounded-xl p-6">
          <h3 className="text-display text-sm tracking-[0.15em] text-muted-foreground mb-4">
            What They Looked At
          </h3>
          {sectionData.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No data yet.
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={sectionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.05)" />
                <XAxis dataKey="section" stroke="oklch(1 0 0 / 0.2)" fontSize={11} tickLine={false} />
                <YAxis stroke="oklch(1 0 0 / 0.2)" fontSize={11} tickLine={false} />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Bar dataKey="count" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Recent activity */}
        <div className="glass-panel rounded-xl p-6">
          <h3 className="text-display text-sm tracking-[0.15em] text-muted-foreground mb-4">
            Live Feed
          </h3>
          {recentActivity.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No visits yet.
            </p>
          ) : (
            <div className="max-h-[250px] space-y-2 overflow-y-auto">
              {recentActivity.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between rounded-lg bg-white/[0.02] p-3"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {event.name}
                    </p>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      {event.action} &middot; {event.section}
                    </p>
                  </div>
                  <span className="text-scoreboard text-xs text-muted-foreground">
                    {new Date(event.createdAt).toLocaleTimeString('en', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Visit Prep Intel */}
      <div className="glass-panel rounded-xl p-6 animate-in-up delay-3">
        <h3 className="text-display text-sm tracking-[0.15em] text-muted-foreground">Visit Prep Intel</h3>
        <p className="mt-1 text-xs text-muted-foreground">
          What to bring up when they come to campus.
        </p>
        <div className="mt-4">
          {visitInsights.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No data yet. Intel appears as recruits explore academics and the jersey room.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-[10px] uppercase tracking-wider">Recruit</TableHead>
                  <TableHead className="text-[10px] uppercase tracking-wider">Top Department</TableHead>
                  <TableHead className="text-[10px] uppercase tracking-wider">Time</TableHead>
                  <TableHead className="text-[10px] uppercase tracking-wider">Jersey Pref</TableHead>
                  <TableHead className="text-[10px] uppercase tracking-wider">Views</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {visitInsights.map((insight, i) => (
                  <TableRow
                    key={i}
                    className="cursor-pointer hover:bg-emerald/5 transition-colors"
                    onClick={() => {
                      const engIdx = engagementData.findIndex((e) => e.email === insight.email)
                      if (engIdx >= 0) setSelectedRecruitIdx(engIdx)
                    }}
                  >
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground">{insight.name}</p>
                        <p className="text-[10px] text-muted-foreground">{insight.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {insight.topCollege ? (
                        <span className="inline-flex items-center gap-1.5 rounded-sm bg-emerald/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-emerald">
                          <BookOpen className="h-3 w-3" />
                          {insight.topCollege.replace(/-/g, ' ')}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {insight.collegeTime > 0 ? (
                        <span className="text-scoreboard text-sm font-medium">
                          {insight.collegeTime >= 60
                            ? `${Math.floor(insight.collegeTime / 60)}m ${insight.collegeTime % 60}s`
                            : `${insight.collegeTime}s`}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {insight.jerseyCombo ? (
                        <span className="inline-flex items-center gap-1.5 rounded-sm bg-amber-500/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-amber-400">
                          <Shirt className="h-3 w-3" />
                          {insight.jerseyCombo}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-scoreboard">
                      {insight.jerseyViews || '—'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>

      {/* All Prospects */}
      <div className="glass-panel rounded-xl p-6 animate-in-up delay-4">
        <h3 className="text-display text-sm tracking-[0.15em] text-muted-foreground">All Prospects</h3>
        <div className="mt-4">
          {engagementData.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No prospect data yet.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-[10px] uppercase tracking-wider">Name</TableHead>
                  <TableHead className="text-[10px] uppercase tracking-wider">Interest</TableHead>
                  <TableHead className="text-[10px] uppercase tracking-wider">Position</TableHead>
                  <TableHead className="text-[10px] uppercase tracking-wider">Class</TableHead>
                  <TableHead className="text-[10px] uppercase tracking-wider">Sections</TableHead>
                  <TableHead className="text-[10px] uppercase tracking-wider">Duration</TableHead>
                  <TableHead className="text-[10px] uppercase tracking-wider">Visits</TableHead>
                  <TableHead className="text-[10px] uppercase tracking-wider">Last Active</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {engagementData.map((recruit, i) => (
                  <TableRow
                    key={i}
                    className="cursor-pointer hover:bg-emerald/5 transition-colors"
                    onClick={() => setSelectedRecruitIdx(i)}
                  >
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground">{recruit.name}</p>
                        <p className="text-[10px] text-muted-foreground">{recruit.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {(() => {
                        const level = getInterestLevel(recruit)
                        return (
                          <span className={`inline-flex items-center gap-1 rounded-sm px-2 py-0.5 text-[10px] uppercase tracking-wider font-medium ${level.bg} ${level.color}`}>
                            <Flame className="h-2.5 w-2.5" />
                            {level.label}
                          </span>
                        )
                      })()}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-xs">
                      {recruit.position ?? '—'}
                    </TableCell>
                    <TableCell className="text-scoreboard text-xs">
                      {recruit.graduationYear ?? '—'}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {recruit.sections.map((s) => (
                          <span
                            key={s}
                            className="rounded-sm bg-emerald/10 px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-emerald"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-scoreboard text-xs">{recruit.totalDuration}s</TableCell>
                    <TableCell className="text-scoreboard text-xs">{recruit.visits}</TableCell>
                    <TableCell className="text-muted-foreground text-xs">
                      {new Date(recruit.lastActive).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>

      {/* Recruit Detail Panel */}
      <RecruitDetailPanel
        open={selectedRecruitIdx !== null}
        onClose={() => setSelectedRecruitIdx(null)}
        recruit={selectedRecruit}
        insight={selectedInsight}
      />
    </div>
  )
}

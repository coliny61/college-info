'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Download, Eye, Users, Clock, Activity, BookOpen, Shirt } from 'lucide-react'
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
  const handleExport = () => {
    window.open(`/api/analytics/export?schoolId=${schoolId}&days=30`, '_blank')
  }

  return (
    <div className="space-y-8">
      {/* Stat strip */}
      <div className="stat-strip flex-wrap gap-y-4 rounded-xl border border-border bg-card/50 py-6 px-4 animate-in-up">
        {[
          { icon: Eye, label: 'Total Events', value: totalEvents.toString() },
          { icon: Users, label: 'Unique Recruits', value: uniqueRecruits.toString() },
          { icon: Activity, label: 'Sections', value: sectionData.length.toString() },
          { icon: Clock, label: '30 Days', value: null },
        ].map((stat) => (
          <div key={stat.label} className="min-w-[100px] py-1">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <stat.icon className="h-3.5 w-3.5 text-emerald" />
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {stat.label}
              </p>
            </div>
            {stat.value ? (
              <p className="text-scoreboard text-3xl font-bold text-foreground">
                {stat.value}
              </p>
            ) : (
              <div className="flex justify-center">
                <Button size="sm" variant="outline" onClick={handleExport} className="text-[10px] uppercase tracking-wider">
                  <Download className="mr-1 h-3 w-3" />
                  Export CSV
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Views chart — area instead of line */}
      <div className="glass-panel rounded-xl p-6 animate-in-up delay-1">
        <h3 className="text-display text-sm tracking-[0.15em] text-muted-foreground mb-4">
          Views Over Time
        </h3>
        {viewsData.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No analytics data yet. Views will appear as recruits browse your school.
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
            Section Breakdown
          </h3>
          {sectionData.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No section data yet.
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
            Recent Activity
          </h3>
          {recentActivity.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No activity yet.
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

      {/* Visit Insights */}
      <Card className="animate-in-up delay-3">
        <CardHeader>
          <CardTitle className="text-display text-sm tracking-[0.15em] text-muted-foreground">Visit Insights</CardTitle>
          <p className="text-xs text-muted-foreground">
            Use this data to personalize in-person visits for each recruit.
          </p>
        </CardHeader>
        <CardContent>
          {visitInsights.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No visit insight data yet. Insights will appear as recruits explore colleges and the jersey room.
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
                  <TableRow key={i}>
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
        </CardContent>
      </Card>

      {/* Engagement table */}
      <Card className="animate-in-up delay-4">
        <CardHeader>
          <CardTitle className="text-display text-sm tracking-[0.15em] text-muted-foreground">Recruit Engagement</CardTitle>
        </CardHeader>
        <CardContent>
          {engagementData.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No recruit engagement data yet.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-[10px] uppercase tracking-wider">Name</TableHead>
                  <TableHead className="text-[10px] uppercase tracking-wider">Sport</TableHead>
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
                  <TableRow key={i}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground">{recruit.name}</p>
                        <p className="text-[10px] text-muted-foreground">{recruit.email}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-xs">
                      {recruit.sport ?? '—'}
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
        </CardContent>
      </Card>
    </div>
  )
}

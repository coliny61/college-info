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
import { Download, Eye, Users, Clock, Activity } from 'lucide-react'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
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
}

export function AnalyticsDashboard({
  schoolId,
  viewsData,
  engagementData,
  sectionData,
  recentActivity,
  totalEvents,
  uniqueRecruits,
}: AnalyticsDashboardProps) {
  const handleExport = () => {
    window.open(`/api/analytics/export?schoolId=${schoolId}&days=30`, '_blank')
  }

  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <Eye className="h-5 w-5 text-emerald" />
            <div>
              <p className="text-xs text-muted-foreground">Total Events</p>
              <p className="text-xl font-bold">{totalEvents}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <Users className="h-5 w-5 text-emerald" />
            <div>
              <p className="text-xs text-muted-foreground">Unique Recruits</p>
              <p className="text-xl font-bold">{uniqueRecruits}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <Activity className="h-5 w-5 text-emerald" />
            <div>
              <p className="text-xs text-muted-foreground">Sections Tracked</p>
              <p className="text-xl font-bold">{sectionData.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <Clock className="h-5 w-5 text-emerald" />
            <div>
              <p className="text-xs text-muted-foreground">Last 30 Days</p>
              <Button size="sm" variant="outline" onClick={handleExport}>
                <Download className="mr-1 h-3 w-3" />
                CSV
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Views chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Views Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          {viewsData.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No analytics data yet. Views will appear as recruits browse your
              school.
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={viewsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(d) => new Date(d).toLocaleDateString('en', { month: 'short', day: 'numeric' })}
                  stroke="#666"
                  fontSize={12}
                />
                <YAxis stroke="#666" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a1a2e',
                    border: '1px solid #333',
                    borderRadius: 8,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="views"
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Section breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Section Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            {sectionData.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">
                No section data yet.
              </p>
            ) : (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={sectionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="section" stroke="#666" fontSize={12} />
                  <YAxis stroke="#666" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1a1a2e',
                      border: '1px solid #333',
                      borderRadius: 8,
                    }}
                  />
                  <Bar dataKey="count" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Recent activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {recentActivity.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">
                No activity yet.
              </p>
            ) : (
              <div className="max-h-[250px] space-y-2 overflow-y-auto">
                {recentActivity.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between rounded-lg border border-border p-2"
                  >
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {event.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {event.action} &middot; {event.section}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(event.createdAt).toLocaleTimeString('en', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Engagement table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recruit Engagement</CardTitle>
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
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Sections</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Visits</TableHead>
                  <TableHead>Last Active</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {engagementData.map((recruit, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">
                      {recruit.name}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {recruit.email}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {recruit.sections.map((s) => (
                          <span
                            key={s}
                            className="rounded bg-emerald/10 px-1.5 py-0.5 text-xs text-emerald"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{recruit.totalDuration}s</TableCell>
                    <TableCell>{recruit.visits}</TableCell>
                    <TableCell className="text-muted-foreground">
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

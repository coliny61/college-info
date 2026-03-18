'use client'

import { useEffect, useRef, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { OverviewTab } from './overview-tab'
import { AcademicsTab } from './academics-tab'
import { AthleticsTab } from './athletics-tab'
import { CampusTab } from './campus-tab'
import { NilTab } from './nil-tab'
import { AlumniTab } from './alumni-tab'
import { TourTab } from './tour-tab'
import Link from 'next/link'
import { Shirt } from 'lucide-react'
import { useTrackEvent } from '@/hooks/use-analytics'
import { getTracker } from '@/lib/analytics-tracker'

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Full Prisma include shape is deeply nested; typed at each tab component level
interface SchoolTabsProps {
  school: Record<string, any>
  colorPrimary: string
  isPublic?: boolean
}

export function SchoolTabs({ school, colorPrimary, isPublic = false }: SchoolTabsProps) {
  const schoolSlug = school.slug
  const trackEvent = useTrackEvent()
  const [activeTab, setActiveTab] = useState('overview')
  const tabStartTime = useRef(Date.now())

  // Track duration when tab changes or unmount (skip for public pages)
  useEffect(() => {
    if (isPublic) return
    tabStartTime.current = Date.now()

    return () => {
      const duration = Date.now() - tabStartTime.current
      if (duration > 1000) {
        const tracker = getTracker()
        tracker.track({
          section: `tab:${activeTab}`,
          action: 'duration',
          schoolId: school.id,
          duration,
        })
      }
    }
  }, [activeTab, school.id, isPublic])

  function handleTabChange(tab: string) {
    if (!isPublic) {
      // Track duration for previous tab
      const duration = Date.now() - tabStartTime.current
      if (duration > 1000) {
        const tracker = getTracker()
        tracker.track({
          section: `tab:${activeTab}`,
          action: 'duration',
          schoolId: school.id,
          duration,
        })
      }
      trackEvent(`school:${schoolSlug}`, 'tab_switch', school.id, { tab })
    }

    setActiveTab(tab)
    tabStartTime.current = Date.now()
  }

  const tabs = [
    { value: 'overview', label: 'Overview' },
    { value: 'athletics', label: 'Football' },
    { value: 'academics', label: 'Academics' },
    { value: 'campus', label: 'Campus' },
    { value: 'nil', label: 'NIL' },
    { value: 'alumni', label: 'Alumni' },
    { value: 'tour', label: 'Tour' },
  ]

  return (
    <Tabs defaultValue="overview" onValueChange={handleTabChange}>
      <div className="sticky top-16 z-20 -mx-6 border-b border-border bg-background px-6 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0 lg:rounded-none lg:border-none">
        <TabsList className="h-auto w-full justify-start gap-0 overflow-x-auto rounded-none border-b border-border bg-transparent p-0 lg:border-b">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="relative rounded-none border-b-[3px] border-transparent px-4 py-3 font-display text-xs uppercase tracking-[0.15em] text-muted-foreground transition-all data-[state=active]:border-[var(--school-color)] data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-foreground hover:text-foreground"
              style={{
                ['--school-color' as string]: colorPrimary,
              }}
            >
              {tab.label}
            </TabsTrigger>
          ))}
          <TabsTrigger
            value="jersey"
            asChild
            className="relative rounded-none border-b-[3px] border-transparent px-4 py-3 font-display text-xs uppercase tracking-[0.15em] transition-colors hover:text-foreground"
            style={{ color: colorPrimary }}
          >
            <Link href={isPublic ? '/register' : `/recruit/school/${school.slug}/jersey`}>
              <Shirt className="mr-1.5 h-3.5 w-3.5" />
              Jersey Room
            </Link>
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="overview" className="mt-8 data-[state=active]:animate-in-fade">
        <OverviewTab
          description={school.description}
          academics={school.academics}
          nilBudget={school.nilProgram?.totalBudget ?? null}
          alumniCount={school.notableAlumni?.length ?? 0}
          facilities={school.facilities}
          colorPrimary={colorPrimary}
          schoolSlug={schoolSlug}
          isPublic={isPublic}
        />
      </TabsContent>

      <TabsContent value="academics" className="mt-8 data-[state=active]:animate-in-fade">
        <AcademicsTab
          academics={school.academics}
          colleges={school.colleges}
          schoolSlug={schoolSlug}
          colorPrimary={colorPrimary}
          isPublic={isPublic}
        />
      </TabsContent>

      <TabsContent value="athletics" className="mt-8 data-[state=active]:animate-in-fade">
        <AthleticsTab
          sports={school.sports}
          roster={school.rosterPlayers ?? []}
          facilities={school.facilities}
          colorPrimary={colorPrimary}
          schoolSlug={schoolSlug}
          isPublic={isPublic}
        />
      </TabsContent>

      <TabsContent value="campus" className="mt-8 data-[state=active]:animate-in-fade">
        <CampusTab
          description={school.description}
          city={school.city}
          state={school.state}
          enrollment={school.academics?.enrollment ?? null}
          facilities={school.facilities}
          colorPrimary={colorPrimary}
        />
      </TabsContent>

      <TabsContent value="nil" className="mt-8 data-[state=active]:animate-in-fade">
        <NilTab
          nilProgram={school.nilProgram}
          schoolId={school.id}
          colorPrimary={colorPrimary}
        />
      </TabsContent>

      <TabsContent value="alumni" className="mt-8 data-[state=active]:animate-in-fade">
        <AlumniTab
          alumni={school.notableAlumni ?? []}
          schoolId={school.id}
          colorPrimary={colorPrimary}
        />
      </TabsContent>

      <TabsContent value="tour" className="mt-8 data-[state=active]:animate-in-fade">
        <TourTab
          facilities={school.facilities}
          colorPrimary={colorPrimary}
        />
      </TabsContent>
    </Tabs>
  )
}

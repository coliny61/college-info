'use client'

import { useEffect, useRef, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { OverviewTab } from './overview-tab'
import { AcademicsTab } from './academics-tab'
import { AthleticsTab } from './athletics-tab'
import { NilTab } from './nil-tab'
import { AlumniTab } from './alumni-tab'
import { TourTab } from './tour-tab'
import Link from 'next/link'
import { Shirt } from 'lucide-react'
import { useTrackEvent } from '@/hooks/use-analytics'
import { getTracker } from '@/lib/analytics-tracker'

interface SchoolTabsProps {
  school: any
  colorPrimary: string
}

export function SchoolTabs({ school, colorPrimary }: SchoolTabsProps) {
  const schoolSlug = school.slug
  const trackEvent = useTrackEvent()
  const [activeTab, setActiveTab] = useState('overview')
  const tabStartTime = useRef(Date.now())

  // Track duration when tab changes or unmount
  useEffect(() => {
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
  }, [activeTab, school.id])

  function handleTabChange(tab: string) {
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

    setActiveTab(tab)
    tabStartTime.current = Date.now()
    trackEvent(`school:${schoolSlug}`, 'tab_switch', school.id, { tab })
  }

  const tabs = [
    { value: 'overview', label: 'Overview' },
    { value: 'academics', label: 'Academics' },
    { value: 'athletics', label: 'Athletics' },
    { value: 'nil', label: 'NIL' },
    { value: 'alumni', label: 'Alumni' },
    { value: 'tour', label: 'Tour' },
  ]

  return (
    <Tabs defaultValue="overview" onValueChange={handleTabChange}>
      <div className="sticky top-16 z-30 -mx-6 border-b border-border bg-background/80 backdrop-blur-xl px-6 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0 lg:rounded-none lg:border-none lg:bg-transparent lg:backdrop-blur-none">
        <TabsList className="h-auto w-full justify-start gap-0 overflow-x-auto rounded-none border-b border-border bg-transparent p-0 lg:border-b">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="relative rounded-none border-b-[3px] border-transparent px-4 py-3 font-display text-xs uppercase tracking-[0.15em] text-muted-foreground transition-colors data-[state=active]:border-current data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-foreground hover:text-foreground"
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
            className="relative rounded-none border-b-[3px] border-transparent px-4 py-3 font-display text-xs uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <Link href={`/recruit/school/${school.slug}/jersey`}>
              <Shirt className="mr-1 h-3.5 w-3.5" />
              Jersey
            </Link>
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="overview" className="mt-8">
        <OverviewTab
          description={school.description}
          academics={school.academics}
          nilBudget={school.nilProgram?.totalBudget ?? null}
          alumniCount={school.notableAlumni?.length ?? 0}
          facilities={school.facilities}
          colorPrimary={colorPrimary}
        />
      </TabsContent>

      <TabsContent value="academics" className="mt-8">
        <AcademicsTab
          academics={school.academics}
          colleges={school.colleges}
          schoolSlug={schoolSlug}
          colorPrimary={colorPrimary}
        />
      </TabsContent>

      <TabsContent value="athletics" className="mt-8">
        <AthleticsTab
          sports={school.sports}
          facilities={school.facilities}
          colorPrimary={colorPrimary}
        />
      </TabsContent>

      <TabsContent value="nil" className="mt-8">
        <NilTab
          nilProgram={school.nilProgram}
          schoolId={school.id}
          colorPrimary={colorPrimary}
        />
      </TabsContent>

      <TabsContent value="alumni" className="mt-8">
        <AlumniTab
          alumni={school.notableAlumni ?? []}
          schoolId={school.id}
          colorPrimary={colorPrimary}
        />
      </TabsContent>

      <TabsContent value="tour" className="mt-8">
        <TourTab
          facilities={school.facilities}
          colorPrimary={colorPrimary}
        />
      </TabsContent>
    </Tabs>
  )
}

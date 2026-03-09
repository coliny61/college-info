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

  return (
    <Tabs defaultValue="overview" onValueChange={handleTabChange}>
      <TabsList className="w-full justify-start overflow-x-auto">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="academics">Academics</TabsTrigger>
        <TabsTrigger value="athletics">Athletics</TabsTrigger>
        <TabsTrigger value="nil">NIL</TabsTrigger>
        <TabsTrigger value="alumni">Alumni</TabsTrigger>
        <TabsTrigger value="tour">Tour</TabsTrigger>
        <TabsTrigger value="jersey" asChild>
          <Link href={`/recruit/school/${school.slug}/jersey`}>
            <Shirt className="mr-1 h-3.5 w-3.5" />
            Jersey Room
          </Link>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="mt-6">
        <OverviewTab
          description={school.description}
          academics={school.academics}
          nilBudget={school.nilProgram?.totalBudget ?? null}
          alumniCount={school.notableAlumni?.length ?? 0}
          facilities={school.facilities}
          colorPrimary={colorPrimary}
        />
      </TabsContent>

      <TabsContent value="academics" className="mt-6">
        <AcademicsTab
          academics={school.academics}
          colleges={school.colleges}
          schoolSlug={schoolSlug}
          colorPrimary={colorPrimary}
        />
      </TabsContent>

      <TabsContent value="athletics" className="mt-6">
        <AthleticsTab
          sports={school.sports}
          facilities={school.facilities}
          colorPrimary={colorPrimary}
        />
      </TabsContent>

      <TabsContent value="nil" className="mt-6">
        <NilTab
          nilProgram={school.nilProgram}
          schoolId={school.id}
          colorPrimary={colorPrimary}
        />
      </TabsContent>

      <TabsContent value="alumni" className="mt-6">
        <AlumniTab
          alumni={school.notableAlumni ?? []}
          schoolId={school.id}
          colorPrimary={colorPrimary}
        />
      </TabsContent>

      <TabsContent value="tour" className="mt-6">
        <TourTab
          facilities={school.facilities}
          colorPrimary={colorPrimary}
        />
      </TabsContent>
    </Tabs>
  )
}

'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { OverviewTab } from './overview-tab'
import { AcademicsTab } from './academics-tab'
import { AthleticsTab } from './athletics-tab'
import { TourTab } from './tour-tab'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Shirt } from 'lucide-react'

interface SchoolTabsProps {
  school: any
  colorPrimary: string
}

export function SchoolTabs({ school, colorPrimary }: SchoolTabsProps) {
  return (
    <Tabs defaultValue="overview">
      <TabsList className="w-full justify-start">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="academics">Academics</TabsTrigger>
        <TabsTrigger value="athletics">Athletics</TabsTrigger>
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
          facilities={school.facilities}
          colorPrimary={colorPrimary}
        />
      </TabsContent>

      <TabsContent value="academics" className="mt-6">
        <AcademicsTab
          academics={school.academics}
          colleges={school.colleges}
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

      <TabsContent value="tour" className="mt-6">
        <TourTab
          facilities={school.facilities}
          colorPrimary={colorPrimary}
        />
      </TabsContent>
    </Tabs>
  )
}

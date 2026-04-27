'use client'

import { useState } from 'react'
import { AthleticsTab } from './athletics-tab'
import { RosterSection } from './roster-section'
import { AlumniTab } from './alumni-tab'
import { DealsSection } from './deals-section'
import { NilTab } from './nil-tab'

interface SchoolPageClientProps {
  sports: any[]
  rosterPlayers: any[]
  alumni: any[]
  brandDeals: any[]
  nilProgram: any
  stadiumCapacity: number | null
  traditions: string | null
  gameDayDescription: string | null
  colorPrimary: string
  schoolId: string
  schoolSlug: string
}

export function SchoolPageClient({
  sports,
  rosterPlayers,
  alumni,
  brandDeals,
  nilProgram,
  stadiumCapacity,
  traditions,
  gameDayDescription,
  colorPrimary,
  schoolId,
  schoolSlug,
}: SchoolPageClientProps) {
  // Sort sports alphabetically and default to first
  const sortedSports = [...sports].sort((a: any, b: any) => a.name.localeCompare(b.name))
  const [selectedSportId, setSelectedSportId] = useState<string | null>(
    sortedSports[0]?.id || null
  )

  const selectedSportName = sports.find((s: any) => s.id === selectedSportId)?.name || null

  return (
    <>
      {/* ─── Athletics ────────────────────────────────────────── */}
      <section id="athletics" className="mt-16 scroll-mt-20">
        <SectionHeading title="Athletics" />
        <AthleticsTab
          sports={sports}
          selectedSportId={selectedSportId}
          onSportChange={setSelectedSportId}
          stadiumCapacity={stadiumCapacity}
          traditions={traditions}
          gameDayDescription={gameDayDescription}
          colorPrimary={colorPrimary}
          schoolId={schoolId}
          schoolSlug={schoolSlug}
        />
      </section>

      {/* ─── NIL ──────────────────────────────────────────────── */}
      <section id="nil" className="mt-16 scroll-mt-20">
        <SectionHeading title="NIL" />
        <NilTab
          nilProgram={nilProgram}
          brandDeals={brandDeals}
          schoolId={schoolId}
          colorPrimary={colorPrimary}
          selectedSportId={selectedSportId}
        />
      </section>

      {/* ─── Deals ────────────────────────────────────────────── */}
      <section id="deals" className="mt-16 scroll-mt-20">
        <SectionHeading title="Athlete Deals & Discounts" />
        <DealsSection
          deals={brandDeals}
          schoolId={schoolId}
          colorPrimary={colorPrimary}
        />
      </section>

      {/* ─── Roster ───────────────────────────────────────────── */}
      <section id="roster" className="mt-16 scroll-mt-20">
        <SectionHeading title="Roster" />
        <RosterSection
          roster={rosterPlayers}
          schoolId={schoolId}
          colorPrimary={colorPrimary}
          sportId={selectedSportId}
          sportName={selectedSportName}
        />
      </section>

      {/* ─── Alumni ───────────────────────────────────────────── */}
      <section id="alumni" className="mt-16 scroll-mt-20">
        <SectionHeading title="Notable Alumni" />
        <AlumniTab
          alumni={alumni}
          schoolId={schoolId}
          colorPrimary={colorPrimary}
          sportId={selectedSportId}
        />
      </section>
    </>
  )
}

function SectionHeading({ title }: { title: string }) {
  return (
    <div className="mb-6">
      <div className="section-divider mb-6" />
      <h2 className="text-display text-sm tracking-[0.15em] text-muted-foreground">
        {title}
      </h2>
    </div>
  )
}

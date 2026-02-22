import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { DARK_THEME } from '@/theme';
import type { DegreePathway, CareerOutcome } from '@/types';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface DegreePathwayViewProps {
  pathways: DegreePathway[];
  outcomes: CareerOutcome[];
  schoolColor: string;
}

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

const YEAR_LABELS: Record<number, string> = {
  1: 'Freshman',
  2: 'Sophomore',
  3: 'Junior',
  4: 'Senior',
};

/** Formats a number as US currency (e.g., $85,000). */
function formatSalary(amount: number): string {
  return `$${amount.toLocaleString()}`;
}

/** Formats a decimal growth rate as a percentage string (e.g., "+15%"). */
function formatGrowth(rate: number): string {
  const pct = Math.round(rate * 100);
  return pct >= 0 ? `+${pct}%` : `${pct}%`;
}

// -----------------------------------------------------------------------------
// Sub-components
// -----------------------------------------------------------------------------

/** Single year node in the timeline view. */
function YearNode({
  pathway,
  schoolColor,
  isLast,
}: {
  pathway: DegreePathway;
  schoolColor: string;
  isLast: boolean;
}) {
  return (
    <View style={styles.yearRow}>
      {/* Timeline column: dot + line */}
      <View style={styles.timelineColumn}>
        <View style={[styles.dot, { backgroundColor: schoolColor }]} />
        {!isLast && (
          <View style={[styles.line, { backgroundColor: schoolColor }]} />
        )}
      </View>

      {/* Content column */}
      <View style={styles.yearContent}>
        <Text style={styles.yearLabel}>
          Year {pathway.year} — {YEAR_LABELS[pathway.year] ?? `Year ${pathway.year}`}
        </Text>
        <Text style={styles.yearTitle}>{pathway.title}</Text>
        <Text style={styles.yearDescription}>{pathway.description}</Text>

        {/* Courses */}
        <View style={styles.coursesList}>
          {pathway.courses.map((course, idx) => (
            <View key={idx} style={styles.courseChip}>
              <Text style={styles.courseText}>{course}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

/** Career outcome card shown at the bottom of the pathway. */
function OutcomeCard({
  outcome,
  schoolColor,
}: {
  outcome: CareerOutcome;
  schoolColor: string;
}) {
  return (
    <View style={styles.outcomeCard}>
      <Text style={styles.outcomeTitle}>{outcome.title}</Text>
      <Text style={styles.outcomeDescription} numberOfLines={2}>
        {outcome.description}
      </Text>
      <View style={styles.outcomeStats}>
        <View style={styles.outcomeStat}>
          <Text style={[styles.outcomeSalary, { color: schoolColor }]}>
            {formatSalary(outcome.medianSalary)}
          </Text>
          <Text style={styles.outcomeLabel}>Median Salary</Text>
        </View>
        <View style={styles.outcomeStat}>
          <Text
            style={[
              styles.outcomeGrowth,
              {
                color:
                  outcome.growthRate >= 0
                    ? DARK_THEME.success
                    : DARK_THEME.error,
              },
            ]}
          >
            {formatGrowth(outcome.growthRate)}
          </Text>
          <Text style={styles.outcomeLabel}>Job Growth</Text>
        </View>
      </View>
    </View>
  );
}

// -----------------------------------------------------------------------------
// Main Component
// -----------------------------------------------------------------------------

/**
 * Timeline view of a degree pathway showing Year 1-4 with courses and
 * descriptions, followed by career outcome cards. The timeline uses the
 * school's primary color for the vertical line and node dots.
 */
export default function DegreePathwayView({
  pathways,
  outcomes,
  schoolColor,
}: DegreePathwayViewProps) {
  const sortedPathways = [...pathways].sort((a, b) => a.year - b.year);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Section: Degree Timeline */}
      <Text style={[styles.sectionTitle, { color: schoolColor }]}>
        Degree Pathway
      </Text>

      {sortedPathways.map((pathway, index) => (
        <YearNode
          key={pathway.year}
          pathway={pathway}
          schoolColor={schoolColor}
          isLast={index === sortedPathways.length - 1}
        />
      ))}

      {/* Section: Career Outcomes */}
      {outcomes.length > 0 && (
        <>
          <Text style={[styles.sectionTitle, { color: schoolColor, marginTop: 24 }]}>
            Career Outcomes
          </Text>
          {outcomes.map((outcome, index) => (
            <OutcomeCard
              key={index}
              outcome={outcome}
              schoolColor={schoolColor}
            />
          ))}
        </>
      )}
    </ScrollView>
  );
}

// -----------------------------------------------------------------------------
// Styles
// -----------------------------------------------------------------------------

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DARK_THEME.bg900,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },

  // Timeline Year Node
  yearRow: {
    flexDirection: 'row',
    marginBottom: 0,
  },
  timelineColumn: {
    width: 32,
    alignItems: 'center',
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginTop: 4,
  },
  line: {
    width: 3,
    flex: 1,
    marginVertical: 4,
    opacity: 0.5,
  },
  yearContent: {
    flex: 1,
    paddingLeft: 12,
    paddingBottom: 24,
  },
  yearLabel: {
    color: DARK_THEME.bg400,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  yearTitle: {
    color: DARK_THEME.white,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  yearDescription: {
    color: DARK_THEME.bg300,
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 19,
    marginBottom: 10,
  },
  coursesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  courseChip: {
    backgroundColor: DARK_THEME.bg700,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  courseText: {
    color: DARK_THEME.bg200,
    fontSize: 11,
    fontWeight: '500',
  },

  // Career Outcome Card
  outcomeCard: {
    backgroundColor: DARK_THEME.bg800,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  outcomeTitle: {
    color: DARK_THEME.white,
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },
  outcomeDescription: {
    color: DARK_THEME.bg300,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 17,
    marginBottom: 10,
  },
  outcomeStats: {
    flexDirection: 'row',
    gap: 24,
  },
  outcomeStat: {
    alignItems: 'flex-start',
  },
  outcomeSalary: {
    fontSize: 16,
    fontWeight: '800',
  },
  outcomeGrowth: {
    fontSize: 16,
    fontWeight: '800',
  },
  outcomeLabel: {
    color: DARK_THEME.bg400,
    fontSize: 10,
    fontWeight: '500',
    marginTop: 2,
  },
});

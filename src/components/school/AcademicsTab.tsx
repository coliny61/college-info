import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { DARK_THEME } from '@/theme';
import type { School, AcademicData, College, Major } from '@/types';
import CollegeCard from './CollegeCard';
import MajorCard from './MajorCard';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface AcademicsTabProps {
  school: School;
  academicData: AcademicData;
  colleges: College[];
  majors: Major[];
  /** Called when the user taps "View Degree Pathway" on a major. */
  onMajorPress?: (majorId: string) => void;
}

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

/** Formats large numbers with commas (e.g., 42500 -> "42,500"). */
function formatNumber(n: number): string {
  return n.toLocaleString();
}

/** Formats a decimal as a percentage string (e.g., 0.45 -> "45%"). */
function formatPercent(n: number): string {
  return `${Math.round(n * 100)}%`;
}

/** Formats a number as US currency (e.g., 85000 -> "$85,000"). */
function formatCurrency(n: number): string {
  return `$${n.toLocaleString()}`;
}

// -----------------------------------------------------------------------------
// Sub-components
// -----------------------------------------------------------------------------

/** Single stat card used in the Academic Overview grid. */
function StatCard({
  label,
  value,
  schoolColor,
}: {
  label: string;
  value: string;
  schoolColor: string;
}) {
  return (
    <View style={statStyles.card}>
      <Text style={[statStyles.value, { color: schoolColor }]}>{value}</Text>
      <Text style={statStyles.label}>{label}</Text>
    </View>
  );
}

const statStyles = StyleSheet.create({
  card: {
    backgroundColor: DARK_THEME.bg700,
    borderRadius: 12,
    padding: 14,
    width: '48%',
    marginBottom: 10,
  },
  value: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 4,
  },
  label: {
    color: DARK_THEME.bg400,
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
});

/** Tuition comparison showing in-state vs out-of-state. */
function TuitionSection({
  inState,
  outOfState,
  schoolColor,
}: {
  inState: number;
  outOfState: number;
  schoolColor: string;
}) {
  return (
    <View style={tuitionStyles.container}>
      <View style={tuitionStyles.row}>
        <View style={tuitionStyles.item}>
          <Text style={tuitionStyles.label}>In-State</Text>
          <Text style={[tuitionStyles.value, { color: schoolColor }]}>
            {formatCurrency(inState)}
          </Text>
          <Text style={tuitionStyles.period}>per year</Text>
        </View>
        <View style={tuitionStyles.divider} />
        <View style={tuitionStyles.item}>
          <Text style={tuitionStyles.label}>Out-of-State</Text>
          <Text style={[tuitionStyles.value, { color: DARK_THEME.bg200 }]}>
            {formatCurrency(outOfState)}
          </Text>
          <Text style={tuitionStyles.period}>per year</Text>
        </View>
      </View>
    </View>
  );
}

const tuitionStyles = StyleSheet.create({
  container: {
    backgroundColor: DARK_THEME.bg700,
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    flex: 1,
    alignItems: 'center',
  },
  divider: {
    width: 1,
    height: 48,
    backgroundColor: DARK_THEME.bg600,
    marginHorizontal: 12,
  },
  label: {
    color: DARK_THEME.bg400,
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
    marginBottom: 4,
  },
  value: {
    fontSize: 20,
    fontWeight: '800',
  },
  period: {
    color: DARK_THEME.bg500,
    fontSize: 11,
    fontWeight: '400',
    marginTop: 2,
  },
});

// -----------------------------------------------------------------------------
// Main Component
// -----------------------------------------------------------------------------

/**
 * Academics tab content for the school detail screen. Contains four sections:
 * 1) Academic Overview grid of stat cards
 * 2) Tuition comparison (in-state vs out-of-state)
 * 3) Colleges list (tappable to select)
 * 4) Majors for the selected college
 */
export default function AcademicsTab({
  school,
  academicData,
  colleges,
  majors,
  onMajorPress,
}: AcademicsTabProps) {
  const [selectedCollegeId, setSelectedCollegeId] = useState<string | null>(
    null,
  );
  const schoolColor = school.colors.primary;

  /** Majors filtered to the currently-selected college. */
  const filteredMajors = selectedCollegeId
    ? majors.filter((m) => m.collegeId === selectedCollegeId)
    : [];

  const handleCollegePress = useCallback((collegeId: string) => {
    setSelectedCollegeId((prev) => (prev === collegeId ? null : collegeId));
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* ─── Section 1: Academic Overview ─── */}
      <Text style={[styles.sectionHeader, { color: schoolColor }]}>
        Academic Overview
      </Text>
      <View style={styles.statsGrid}>
        <StatCard
          label="Enrollment"
          value={formatNumber(academicData.enrollment)}
          schoolColor={schoolColor}
        />
        <StatCard
          label="Admission Rate"
          value={formatPercent(academicData.admissionRate)}
          schoolColor={schoolColor}
        />
        <StatCard
          label="Avg SAT"
          value={formatNumber(academicData.satAvg)}
          schoolColor={schoolColor}
        />
        <StatCard
          label="Avg ACT"
          value={String(academicData.actAvg)}
          schoolColor={schoolColor}
        />
        <StatCard
          label="Graduation Rate"
          value={formatPercent(academicData.graduationRate)}
          schoolColor={schoolColor}
        />
        <StatCard
          label="Median Earnings"
          value={formatCurrency(academicData.medianEarnings)}
          schoolColor={schoolColor}
        />
      </View>

      {/* ─── Section 2: Tuition ─── */}
      <Text style={[styles.sectionHeader, { color: schoolColor }]}>
        Tuition
      </Text>
      <TuitionSection
        inState={academicData.tuitionInState}
        outOfState={academicData.tuitionOutOfState}
        schoolColor={schoolColor}
      />

      {/* ─── Section 3: Colleges ─── */}
      <Text style={[styles.sectionHeader, { color: schoolColor }]}>
        Colleges
      </Text>
      {colleges.map((college) => (
        <CollegeCard
          key={college.id}
          college={college}
          isSelected={selectedCollegeId === college.id}
          onPress={() => handleCollegePress(college.id)}
          schoolColor={schoolColor}
        />
      ))}

      {/* ─── Section 4: Majors (when a college is selected) ─── */}
      {selectedCollegeId && filteredMajors.length > 0 && (
        <>
          <Text style={[styles.sectionHeader, { color: schoolColor }]}>
            Majors
          </Text>
          {filteredMajors.map((major) => (
            <MajorCard
              key={major.id}
              major={major}
              schoolColor={schoolColor}
              onPress={
                onMajorPress ? () => onMajorPress(major.id) : undefined
              }
            />
          ))}
        </>
      )}

      {selectedCollegeId && filteredMajors.length === 0 && (
        <Text style={styles.emptyText}>
          No majors found for this college.
        </Text>
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
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    marginTop: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  emptyText: {
    color: DARK_THEME.bg400,
    fontSize: 13,
    fontWeight: '400',
    textAlign: 'center',
    marginTop: 16,
  },
});

import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { DARK_THEME } from '@/theme';
import type { School, AcademicData, College, Major } from '@/types';
import { useAcademicData } from '@/hooks/useAcademicData';
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
  /**
   * College Scorecard numeric ID (as a string). When provided the component
   * fetches live academic data from the Scorecard API, falling back to the
   * `academicData` prop on failure.
   */
  scorecardId?: string;
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
// Loading Skeleton
// -----------------------------------------------------------------------------

/** Pulsing placeholder card shown while academic data is being fetched. */
function SkeletonCard() {
  return (
    <View style={skeletonStyles.card}>
      <View style={skeletonStyles.valuePlaceholder} />
      <View style={skeletonStyles.labelPlaceholder} />
    </View>
  );
}

const skeletonStyles = StyleSheet.create({
  card: {
    backgroundColor: DARK_THEME.bg700,
    borderRadius: 12,
    padding: 14,
    width: '48%',
    marginBottom: 10,
    opacity: 0.5,
  },
  valuePlaceholder: {
    backgroundColor: DARK_THEME.bg600,
    borderRadius: 6,
    height: 24,
    width: '60%',
    marginBottom: 8,
  },
  labelPlaceholder: {
    backgroundColor: DARK_THEME.bg600,
    borderRadius: 4,
    height: 12,
    width: '80%',
  },
});

/** Full loading skeleton matching the stat-card grid layout. */
function LoadingSkeleton() {
  return (
    <View style={styles.statsGrid}>
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </View>
  );
}

// -----------------------------------------------------------------------------
// Data Source Indicator
// -----------------------------------------------------------------------------

/** Subtle badge showing whether the data is live or cached/offline. */
function DataSourceBadge({ isLive }: { isLive: boolean }) {
  return (
    <View
      style={[
        badgeStyles.container,
        { backgroundColor: isLive ? '#064E3B' : '#1E293B' },
      ]}
    >
      <View
        style={[
          badgeStyles.dot,
          { backgroundColor: isLive ? '#34D399' : '#94A3B8' },
        ]}
      />
      <Text
        style={[
          badgeStyles.text,
          { color: isLive ? '#6EE7B7' : '#94A3B8' },
        ]}
      >
        {isLive ? 'Live data from College Scorecard' : 'Using cached data'}
      </Text>
    </View>
  );
}

const badgeStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 12,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  text: {
    fontSize: 11,
    fontWeight: '600',
  },
});

// -----------------------------------------------------------------------------
// Error Banner
// -----------------------------------------------------------------------------

/** Small banner displayed when the API call failed, with a retry button. */
function ErrorBanner({
  onRetry,
  schoolColor,
}: {
  onRetry: () => void;
  schoolColor: string;
}) {
  return (
    <View style={errorStyles.container}>
      <View style={errorStyles.textContainer}>
        <Text style={errorStyles.title}>Using offline data</Text>
        <Text style={errorStyles.subtitle}>
          Could not reach College Scorecard API
        </Text>
      </View>
      <TouchableOpacity
        onPress={onRetry}
        style={[errorStyles.retryButton, { backgroundColor: schoolColor }]}
        activeOpacity={0.7}
      >
        <Text style={errorStyles.retryText}>Retry</Text>
      </TouchableOpacity>
    </View>
  );
}

const errorStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1917',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#78350F',
    padding: 12,
    marginBottom: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: '#FBBF24',
    fontSize: 13,
    fontWeight: '700',
  },
  subtitle: {
    color: '#A8A29E',
    fontSize: 11,
    fontWeight: '400',
    marginTop: 2,
  },
  retryButton: {
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginLeft: 12,
  },
  retryText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
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
 *
 * When a `scorecardId` is provided the component fetches live data from the
 * College Scorecard API and falls back to the `academicData` prop on failure.
 */
export default function AcademicsTab({
  school,
  academicData: academicDataProp,
  colleges,
  majors,
  onMajorPress,
  scorecardId,
}: AcademicsTabProps) {
  // ---------------------------------------------------------------------------
  // Live data hook (only active when scorecardId is provided)
  // ---------------------------------------------------------------------------

  const liveResult = scorecardId
    ? // eslint-disable-next-line react-hooks/rules-of-hooks
      useAcademicData(school.id, scorecardId)
    : null;

  const loading = liveResult?.loading ?? false;
  const error = liveResult?.error ?? null;
  const refresh = liveResult?.refresh ?? (() => {});

  // Use live data when available, otherwise fall back to the prop.
  const academicData = liveResult?.academicData ?? academicDataProp;

  // Determine whether the displayed data came from the live API or the prop
  // fallback. If no scorecardId was provided we don't show a badge at all.
  const isLiveData =
    scorecardId != null && liveResult?.academicData != null && error == null;

  // ---------------------------------------------------------------------------
  // Local state
  // ---------------------------------------------------------------------------

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
      {/* ─── Data source indicator ─── */}
      {scorecardId != null && !loading && (
        <DataSourceBadge isLive={isLiveData} />
      )}

      {/* ─── Error banner with retry ─── */}
      {error != null && !loading && (
        <ErrorBanner onRetry={refresh} schoolColor={schoolColor} />
      )}

      {/* ─── Section 1: Academic Overview ─── */}
      <Text style={[styles.sectionHeader, { color: schoolColor }]}>
        Academic Overview
      </Text>

      {loading ? (
        <LoadingSkeleton />
      ) : (
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
      )}

      {/* ─── Section 2: Tuition ─── */}
      <Text style={[styles.sectionHeader, { color: schoolColor }]}>
        Tuition
      </Text>
      {loading ? (
        <View style={skeletonStyles.card}>
          <View style={[skeletonStyles.valuePlaceholder, { width: '100%' }]} />
          <View style={[skeletonStyles.labelPlaceholder, { width: '50%', marginTop: 8 }]} />
        </View>
      ) : (
        <TuitionSection
          inState={academicData.tuitionInState}
          outOfState={academicData.tuitionOutOfState}
          schoolColor={schoolColor}
        />
      )}

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

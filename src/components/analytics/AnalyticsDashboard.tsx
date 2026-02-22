import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { DARK_THEME } from '@/theme';
import { MOCK_ENGAGEMENT_SCORES } from '@/data/mockAnalytics';

import ViewModeToggle from './ViewModeToggle';
import EngagementScoreCard from './EngagementScoreCard';
import TimeBreakdownChart from './TimeBreakdownChart';
import HeatmapChart from './HeatmapChart';
import TrendLineChart from './TrendLineChart';
import JerseyComboStats from './JerseyComboStats';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

type ViewMode = 'recruit' | 'parent' | 'combined';

interface AnalyticsDashboardProps {
  schoolId: string;
  schoolColor: string;
}

// -----------------------------------------------------------------------------
// Mock data generators per view mode
// These simulate filtered data depending on whether we are viewing
// recruit, parent, or combined analytics.
// -----------------------------------------------------------------------------

function getTimeBreakdownData(viewMode: ViewMode, schoolColor: string) {
  const recruitData = [
    { section: 'Athletics', minutes: 42, color: schoolColor },
    { section: 'Tour', minutes: 35, color: adjustColor(schoolColor, 0.8) },
    { section: 'Jersey Builder', minutes: 28, color: adjustColor(schoolColor, 0.65) },
    { section: 'Academics', minutes: 22, color: adjustColor(schoolColor, 0.5) },
    { section: 'Profile', minutes: 8, color: adjustColor(schoolColor, 0.35) },
  ];

  const parentData = [
    { section: 'Academics', minutes: 48, color: schoolColor },
    { section: 'Athletics', minutes: 25, color: adjustColor(schoolColor, 0.8) },
    { section: 'Tour', minutes: 20, color: adjustColor(schoolColor, 0.65) },
    { section: 'Profile', minutes: 12, color: adjustColor(schoolColor, 0.5) },
    { section: 'Jersey Builder', minutes: 5, color: adjustColor(schoolColor, 0.35) },
  ];

  const combinedData = [
    { section: 'Academics', minutes: 70, color: schoolColor },
    { section: 'Athletics', minutes: 67, color: adjustColor(schoolColor, 0.8) },
    { section: 'Tour', minutes: 55, color: adjustColor(schoolColor, 0.65) },
    { section: 'Jersey Builder', minutes: 33, color: adjustColor(schoolColor, 0.5) },
    { section: 'Profile', minutes: 20, color: adjustColor(schoolColor, 0.35) },
  ];

  if (viewMode === 'recruit') return recruitData;
  if (viewMode === 'parent') return parentData;
  return combinedData;
}

function getHeatmapData(viewMode: ViewMode) {
  const sections = ['Academics', 'Athletics', 'Tour', 'Jersey', 'Profile'];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const recruitPatterns: Record<string, number[]> = {
    Academics: [40, 55, 48, 60, 35, 25, 20],
    Athletics: [50, 55, 60, 65, 75, 90, 95],
    Tour:      [35, 50, 72, 80, 60, 55, 45],
    Jersey:    [25, 30, 35, 40, 55, 85, 92],
    Profile:   [45, 42, 50, 48, 44, 38, 35],
  };

  const parentPatterns: Record<string, number[]> = {
    Academics: [75, 82, 78, 85, 65, 40, 35],
    Athletics: [40, 45, 50, 48, 55, 60, 55],
    Tour:      [30, 42, 55, 60, 45, 35, 30],
    Jersey:    [10, 12, 15, 14, 18, 22, 20],
    Profile:   [55, 58, 62, 60, 52, 45, 42],
  };

  const combinedPatterns: Record<string, number[]> = {
    Academics: [58, 68, 63, 72, 50, 32, 28],
    Athletics: [45, 50, 55, 56, 65, 75, 75],
    Tour:      [32, 46, 63, 70, 52, 45, 38],
    Jersey:    [18, 21, 25, 27, 36, 54, 56],
    Profile:   [50, 50, 56, 54, 48, 42, 38],
  };

  const patterns =
    viewMode === 'recruit'
      ? recruitPatterns
      : viewMode === 'parent'
        ? parentPatterns
        : combinedPatterns;

  const data: Array<{ section: string; day: string; value: number }> = [];
  for (const section of sections) {
    for (let i = 0; i < days.length; i++) {
      data.push({ section, day: days[i], value: patterns[section][i] });
    }
  }
  return data;
}

function getTrendData(viewMode: ViewMode) {
  // Generate 14 data points over the last 28 days
  const points: Array<{ date: string; value: number }> = [];
  const baseValues: Record<ViewMode, number[]> = {
    recruit: [35, 42, 38, 55, 52, 60, 58, 65, 70, 68, 75, 80, 78, 85],
    parent:  [28, 32, 30, 38, 42, 40, 45, 48, 50, 52, 55, 58, 62, 65],
    combined: [32, 37, 34, 46, 47, 50, 52, 56, 60, 60, 65, 69, 70, 75],
  };

  const values = baseValues[viewMode];
  for (let i = 0; i < values.length; i++) {
    const d = new Date();
    d.setDate(d.getDate() - (13 - i) * 2);
    points.push({
      date: `${d.getMonth() + 1}/${d.getDate()}`,
      value: values[i],
    });
  }
  return points;
}

function getJerseyComboData(viewMode: ViewMode) {
  const recruitCombos = [
    { combo: 'Home / Home / Home', count: 145, percentage: 34 },
    { combo: 'Alternate / Home / Away', count: 89, percentage: 21 },
    { combo: 'Away / Home / Alternate', count: 72, percentage: 17 },
    { combo: 'Home / Alternate / Home', count: 65, percentage: 15 },
    { combo: 'Home / Away / Home', count: 55, percentage: 13 },
  ];

  const parentCombos = [
    { combo: 'Home / Home / Home', count: 32, percentage: 45 },
    { combo: 'Home / Away / Home', count: 18, percentage: 25 },
    { combo: 'Away / Away / Away', count: 12, percentage: 17 },
    { combo: 'Home / Home / Away', count: 6, percentage: 8 },
    { combo: 'Alternate / Home / Home', count: 4, percentage: 5 },
  ];

  const combinedCombos = [
    { combo: 'Home / Home / Home', count: 177, percentage: 36 },
    { combo: 'Alternate / Home / Away', count: 95, percentage: 19 },
    { combo: 'Home / Away / Home', count: 73, percentage: 15 },
    { combo: 'Away / Home / Alternate', count: 78, percentage: 16 },
    { combo: 'Home / Alternate / Home', count: 69, percentage: 14 },
  ];

  if (viewMode === 'recruit') return recruitCombos;
  if (viewMode === 'parent') return parentCombos;
  return combinedCombos;
}

// Lighten/darken helper
function adjustColor(hex: string, factor: number): string {
  const cleaned = hex.replace('#', '');
  const r = Math.min(255, Math.round(parseInt(cleaned.substring(0, 2), 16) * factor));
  const g = Math.min(255, Math.round(parseInt(cleaned.substring(2, 4), 16) * factor));
  const b = Math.min(255, Math.round(parseInt(cleaned.substring(4, 6), 16) * factor));
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

/**
 * Complete analytics dashboard that composes all analytics sub-components.
 * Provides a ViewModeToggle at the top to switch between recruit, parent,
 * and combined perspectives. All child charts update based on the selected
 * view mode with appropriate mock data.
 */
export default function AnalyticsDashboard({
  schoolId,
  schoolColor,
}: AnalyticsDashboardProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('combined');

  // Look up engagement scores for this school
  const scores = MOCK_ENGAGEMENT_SCORES.find((s) => s.schoolId === schoolId) ?? {
    schoolId,
    recruitScore: 72,
    parentScore: 58,
    combinedScore: 66,
  };

  // Derive a display name from schoolId
  const schoolName = schoolId
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* View Mode Toggle */}
      <ViewModeToggle
        activeMode={viewMode}
        onModeChange={setViewMode}
        schoolColor={schoolColor}
      />

      {/* Engagement Score */}
      <Text style={styles.sectionHeader}>Engagement Score</Text>
      <EngagementScoreCard
        schoolName={schoolName}
        recruitScore={scores.recruitScore}
        parentScore={scores.parentScore}
        combinedScore={scores.combinedScore}
        viewMode={viewMode}
        schoolColor={schoolColor}
      />

      {/* Time Breakdown */}
      <Text style={styles.sectionHeader}>Time Spent by Section</Text>
      <TimeBreakdownChart
        data={getTimeBreakdownData(viewMode, schoolColor)}
        schoolColor={schoolColor}
      />

      {/* Engagement Heatmap */}
      <Text style={styles.sectionHeader}>Engagement Heatmap</Text>
      <HeatmapChart
        data={getHeatmapData(viewMode)}
        schoolColor={schoolColor}
      />

      {/* Trend Over Time */}
      <Text style={styles.sectionHeader}>Engagement Trend (Last 30 Days)</Text>
      <TrendLineChart
        data={getTrendData(viewMode)}
        label={
          viewMode === 'recruit'
            ? 'Recruit Sessions'
            : viewMode === 'parent'
              ? 'Parent Sessions'
              : 'Total Sessions'
        }
        schoolColor={schoolColor}
      />

      {/* Jersey Combos */}
      <Text style={styles.sectionHeader}>Popular Jersey Combos</Text>
      <JerseyComboStats
        data={getJerseyComboData(viewMode)}
        schoolColor={schoolColor}
      />

      {/* Bottom spacer */}
      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
}

// -----------------------------------------------------------------------------
// Styles
// -----------------------------------------------------------------------------

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: DARK_THEME.bg900,
  },
  contentContainer: {
    padding: 16,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '700',
    color: DARK_THEME.bg200,
    marginTop: 24,
    marginBottom: 12,
    letterSpacing: 0.3,
  },
  bottomSpacer: {
    height: 40,
  },
});

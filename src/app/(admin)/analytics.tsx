import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {
  MOCK_ANALYTICS_EVENTS,
  MOCK_ENGAGEMENT_SCORES,
} from '@/data/mockAnalytics';
import { SCHOOLS } from '@/data/schools';

// ---------------------------------------------------------------------------
// View Modes
// ---------------------------------------------------------------------------

const VIEW_MODES = ['Recruit', 'Parent', 'Combined'] as const;
type ViewMode = (typeof VIEW_MODES)[number];

// ---------------------------------------------------------------------------
// Analytics Dashboard Screen
// ---------------------------------------------------------------------------

export default function AnalyticsDashboardScreen() {
  const [viewMode, setViewMode] = useState<ViewMode>('Combined');

  // Compute data based on view mode
  const filteredEvents = useMemo(() => {
    if (viewMode === 'Combined') return MOCK_ANALYTICS_EVENTS;
    const roleFilter = viewMode.toLowerCase();
    return MOCK_ANALYTICS_EVENTS.filter((e) => e.userRole === roleFilter);
  }, [viewMode]);

  // Most viewed sections
  const sectionBreakdown = useMemo(() => {
    const counts: Record<string, number> = {};
    filteredEvents
      .filter((e) => e.action === 'view')
      .forEach((e) => {
        counts[e.section] = (counts[e.section] ?? 0) + 1;
      });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(([section, count]) => ({ section, count }));
  }, [filteredEvents]);

  // Time spent breakdown
  const timeBreakdown = useMemo(() => {
    const durations: Record<string, number> = {};
    filteredEvents
      .filter((e) => e.duration)
      .forEach((e) => {
        durations[e.section] =
          (durations[e.section] ?? 0) + (e.duration ?? 0);
      });
    return Object.entries(durations)
      .sort((a, b) => b[1] - a[1])
      .map(([section, ms]) => ({
        section,
        minutes: Math.round(ms / 60000),
      }));
  }, [filteredEvents]);

  // Engagement scores per school
  const engagementData = useMemo(() => {
    return MOCK_ENGAGEMENT_SCORES.map((score) => {
      const school = SCHOOLS.find((s) => s.id === score.schoolId);
      const displayScore =
        viewMode === 'Recruit'
          ? score.recruitScore
          : viewMode === 'Parent'
            ? score.parentScore
            : score.combinedScore;
      return {
        schoolId: score.schoolId,
        schoolName: school?.name ?? score.schoolId,
        shortName: school?.shortName ?? score.schoolId,
        score: displayScore,
        color: school?.colors.primary ?? '#3B82F6',
      };
    }).sort((a, b) => b.score - a.score);
  }, [viewMode]);

  return (
    <SafeAreaView className="flex-1 bg-[#0F172A]">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ------- Header ------- */}
        <View className="px-4 pt-4 pb-2">
          <Text className="text-white text-2xl font-bold">Analytics</Text>
          <Text className="text-slate-400 text-sm mt-1">
            Engagement and usage insights
          </Text>
        </View>

        {/* ------- View Mode Toggle ------- */}
        <View className="px-4 mb-4">
          <View className="flex-row bg-[#1E293B] rounded-lg p-1">
            {VIEW_MODES.map((mode) => (
              <TouchableOpacity
                key={mode}
                className={`flex-1 py-2 rounded-md items-center ${
                  viewMode === mode ? 'bg-blue-500' : ''
                }`}
                onPress={() => setViewMode(mode)}
              >
                <Text
                  className={`text-sm font-semibold ${
                    viewMode === mode ? 'text-white' : 'text-slate-400'
                  }`}
                >
                  {mode}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ------- Engagement Scores ------- */}
        <View className="px-4 mb-6">
          <Text className="text-slate-300 text-sm font-semibold mb-3 uppercase tracking-wider">
            Engagement Score by School
          </Text>
          {engagementData.map((item) => (
            <View
              key={item.schoolId}
              className="bg-[#1E293B] rounded-xl p-4 mb-2"
            >
              <View className="flex-row items-center justify-between mb-2">
                <View className="flex-row items-center">
                  <View
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: item.color }}
                  />
                  <Text className="text-white font-bold">
                    {item.shortName}
                  </Text>
                </View>
                <Text className="text-white font-bold text-lg">
                  {item.score}
                </Text>
              </View>
              {/* Progress bar */}
              <View className="h-2 bg-[#334155] rounded-full overflow-hidden">
                <View
                  className="h-2 rounded-full"
                  style={{
                    width: `${item.score}%`,
                    backgroundColor: item.color,
                  }}
                />
              </View>
            </View>
          ))}
        </View>

        {/* ------- Most Viewed Sections ------- */}
        <View className="px-4 mb-6">
          <Text className="text-slate-300 text-sm font-semibold mb-3 uppercase tracking-wider">
            Most Viewed Sections
          </Text>
          {sectionBreakdown.map((item) => (
            <View
              key={item.section}
              className="bg-[#1E293B] rounded-xl p-4 mb-2 flex-row items-center justify-between"
            >
              <Text className="text-white font-medium capitalize">
                {item.section}
              </Text>
              <View className="bg-blue-500/20 rounded-full px-3 py-1">
                <Text className="text-blue-400 text-sm font-bold">
                  {item.count} views
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* ------- Time Spent Breakdown ------- */}
        <View className="px-4 mb-6">
          <Text className="text-slate-300 text-sm font-semibold mb-3 uppercase tracking-wider">
            Time Spent Breakdown
          </Text>
          {timeBreakdown.map((item) => (
            <View
              key={item.section}
              className="bg-[#1E293B] rounded-xl p-4 mb-2 flex-row items-center justify-between"
            >
              <Text className="text-white font-medium capitalize">
                {item.section}
              </Text>
              <View className="bg-emerald-500/20 rounded-full px-3 py-1">
                <Text className="text-emerald-400 text-sm font-bold">
                  {item.minutes} min
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* ------- Chart Placeholder ------- */}
        <View className="px-4">
          <View className="bg-[#1E293B] rounded-xl p-6 items-center">
            <Text className="text-slate-500 text-sm">
              Charts powered by Victory Native coming soon
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

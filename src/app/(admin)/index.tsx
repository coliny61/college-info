import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import {
  MOCK_ANALYTICS_EVENTS,
  MOCK_ENGAGEMENT_SCORES,
} from '@/data/mockAnalytics';

// ---------------------------------------------------------------------------
// Mock summary computation
// ---------------------------------------------------------------------------

const totalRecruitViews = MOCK_ANALYTICS_EVENTS.filter(
  (e) => e.userRole === 'recruit' && e.action === 'view',
).length;

const activeSessions = new Set(MOCK_ANALYTICS_EVENTS.map((e) => e.sessionId))
  .size;

const avgEngagement =
  MOCK_ENGAGEMENT_SCORES.reduce((sum, s) => sum + s.combinedScore, 0) /
  MOCK_ENGAGEMENT_SCORES.length;

// Find most viewed section
const sectionCounts: Record<string, number> = {};
MOCK_ANALYTICS_EVENTS.filter((e) => e.action === 'view').forEach((e) => {
  sectionCounts[e.section] = (sectionCounts[e.section] ?? 0) + 1;
});
const topSection = Object.entries(sectionCounts).sort(
  (a, b) => b[1] - a[1],
)[0];

// Recent activity (last 10 events)
const recentActivity = [...MOCK_ANALYTICS_EVENTS]
  .sort(
    (a, b) =>
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  )
  .slice(0, 10);

// ---------------------------------------------------------------------------
// Admin Dashboard Screen
// ---------------------------------------------------------------------------

export default function AdminDashboardScreen() {
  const { user } = useAuth();

  return (
    <SafeAreaView className="flex-1 bg-[#0F172A]">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ------- Welcome Header ------- */}
        <View className="px-4 pt-4 pb-4">
          <Text className="text-slate-400 text-sm">Welcome back,</Text>
          <Text className="text-white text-2xl font-bold mt-1">
            {user?.displayName ?? 'Admin'}
          </Text>
        </View>

        {/* ------- Summary Cards ------- */}
        <View className="px-4 mb-6">
          <View className="flex-row mb-3">
            <SummaryCard
              label="Total Recruit Views"
              value={totalRecruitViews.toString()}
              emoji={'\uD83D\uDC40'}
              className="flex-1 mr-1.5"
            />
            <SummaryCard
              label="Active Sessions"
              value={activeSessions.toString()}
              emoji={'\uD83D\uDCF1'}
              className="flex-1 ml-1.5"
            />
          </View>
          <View className="flex-row">
            <SummaryCard
              label="Avg Engagement"
              value={avgEngagement.toFixed(0)}
              emoji={'\uD83D\uDD25'}
              className="flex-1 mr-1.5"
            />
            <SummaryCard
              label="Top Section"
              value={topSection ? topSection[0] : 'N/A'}
              emoji={'\uD83C\uDFC6'}
              className="flex-1 ml-1.5"
            />
          </View>
        </View>

        {/* ------- Quick Actions ------- */}
        <View className="px-4 mb-6">
          <Text className="text-slate-300 text-sm font-semibold mb-3 uppercase tracking-wider">
            Quick Actions
          </Text>
          <View className="flex-row">
            <TouchableOpacity
              className="flex-1 bg-blue-500/10 border border-blue-500/30 rounded-xl py-4 items-center mr-1.5"
              onPress={() => router.push('/(admin)/analytics')}
              activeOpacity={0.7}
            >
              <Text className="text-2xl mb-1">{'\uD83D\uDCC8'}</Text>
              <Text className="text-blue-400 font-bold text-sm">
                View Analytics
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 bg-emerald-500/10 border border-emerald-500/30 rounded-xl py-4 items-center ml-1.5"
              onPress={() => router.push('/(admin)/content')}
              activeOpacity={0.7}
            >
              <Text className="text-2xl mb-1">{'\uD83D\uDCDD'}</Text>
              <Text className="text-emerald-400 font-bold text-sm">
                Manage Content
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ------- Recent Activity ------- */}
        <View className="px-4">
          <Text className="text-slate-300 text-sm font-semibold mb-3 uppercase tracking-wider">
            Recent Activity
          </Text>
          {recentActivity.map((event) => (
            <View
              key={event.id}
              className="bg-[#1E293B] rounded-xl p-3 mb-2 flex-row items-center"
            >
              <View className="w-8 h-8 rounded-full bg-[#334155] items-center justify-center mr-3">
                <Text className="text-xs">
                  {event.userRole === 'recruit'
                    ? '\uD83C\uDFC8'
                    : event.userRole === 'parent'
                      ? '\uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC66'
                      : '\uD83C\uDFEB'}
                </Text>
              </View>
              <View className="flex-1">
                <Text className="text-white text-sm font-medium">
                  {event.userRole} - {event.action}
                </Text>
                <Text className="text-slate-500 text-xs mt-0.5">
                  {event.section}
                  {event.schoolId ? ` | ${event.schoolId}` : ''}
                </Text>
              </View>
              <Text className="text-slate-600 text-xs">
                {formatTimeAgo(event.timestamp)}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ---------------------------------------------------------------------------
// Summary Card
// ---------------------------------------------------------------------------

function SummaryCard({
  label,
  value,
  emoji,
  className = '',
}: {
  label: string;
  value: string;
  emoji: string;
  className?: string;
}) {
  return (
    <View className={`bg-[#1E293B] rounded-xl p-4 ${className}`}>
      <Text className="text-xl mb-2">{emoji}</Text>
      <Text className="text-white text-xl font-bold">{value}</Text>
      <Text className="text-slate-400 text-xs mt-1">{label}</Text>
    </View>
  );
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatTimeAgo(timestamp: string): string {
  const diff = Date.now() - new Date(timestamp).getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return 'just now';
}

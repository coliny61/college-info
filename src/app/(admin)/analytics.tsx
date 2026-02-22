import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { SCHOOLS } from '@/data/schools';
import { AnalyticsDashboard } from '@/components/analytics';

// ---------------------------------------------------------------------------
// Analytics Dashboard Screen
// ---------------------------------------------------------------------------

export default function AnalyticsDashboardScreen() {
  const { user } = useAuth();

  const schoolId = user?.schoolId ?? 'alabama';
  const school = SCHOOLS.find((s) => s.id === schoolId);
  const schoolColor = school?.colors.primary ?? '#3B82F6';

  return (
    <SafeAreaView className="flex-1 bg-[#0F172A]">
      {/* ------- Header ------- */}
      <View className="px-4 pt-4 pb-2">
        <Text className="text-white text-2xl font-bold">Analytics</Text>
        <Text className="text-slate-400 text-sm mt-1">
          Engagement and usage insights
        </Text>
      </View>

      {/* ------- Analytics Dashboard ------- */}
      <AnalyticsDashboard schoolId={schoolId} schoolColor={schoolColor} />
    </SafeAreaView>
  );
}

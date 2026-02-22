import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useSchoolTheme } from '@/context/SchoolThemeContext';
import { useAnalytics } from '@/context/AnalyticsContext';
import { useAuth } from '@/context/AuthContext';
import { SCHOOLS } from '@/data/schools';
import { ACADEMICS_DATA, COLLEGES, MAJORS } from '@/data/academics';
import { SPORTS, COACHES, FACILITIES } from '@/data/athletics';
import type { School } from '@/types';

// ---------------------------------------------------------------------------
// Tab Definitions
// ---------------------------------------------------------------------------

const TABS = ['Academics', 'Athletics', 'Tour', 'Jersey'] as const;
type TabName = (typeof TABS)[number];

// ---------------------------------------------------------------------------
// School Detail Screen
// ---------------------------------------------------------------------------

export default function SchoolDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { setSchoolTheme, resetTheme, currentTheme } = useSchoolTheme();
  const { trackEvent, trackScreenTime } = useAnalytics();
  const { user, updateProfile } = useAuth();

  const [activeTab, setActiveTab] = useState<TabName>('Academics');

  // Look up school data
  const school = useMemo(
    () => SCHOOLS.find((s) => s.id === id) ?? null,
    [id],
  );

  // Apply school theme on mount, reset on unmount
  useEffect(() => {
    if (id) {
      setSchoolTheme(id);
    }
    return () => {
      resetTheme();
    };
  }, [id, setSchoolTheme, resetTheme]);

  // Track screen time
  useEffect(() => {
    return trackScreenTime('school-profile');
  }, [trackScreenTime]);

  // Track tab changes
  useEffect(() => {
    if (id) {
      trackEvent('school-profile', 'tab_change', {
        schoolId: id,
        tab: activeTab,
      });
    }
  }, [activeTab, id, trackEvent]);

  // Toggle favorite
  const isFavorite = user?.favorites?.includes(id ?? '') ?? false;
  const toggleFavorite = useCallback(async () => {
    if (!user || !id) return;
    const newFavorites = isFavorite
      ? user.favorites.filter((fId) => fId !== id)
      : [...user.favorites, id];
    await updateProfile({ favorites: newFavorites });
    trackEvent('school-profile', isFavorite ? 'unfavorite' : 'favorite', {
      schoolId: id,
    });
  }, [user, id, isFavorite, updateProfile, trackEvent]);

  if (!school) {
    return (
      <SafeAreaView className="flex-1 bg-[#0F172A] items-center justify-center">
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text className="text-slate-400 mt-4">Loading school...</Text>
      </SafeAreaView>
    );
  }

  // Get school-specific data
  const academics = ACADEMICS_DATA[school.id];
  const schoolColleges = COLLEGES.filter((c) => c.schoolId === school.id);
  const schoolSport = SPORTS.find((s) => s.schoolId === school.id);
  const schoolCoaches = schoolSport
    ? COACHES.filter((c) => c.sportId === schoolSport.id)
    : [];
  const schoolFacilities = schoolSport
    ? FACILITIES.filter((f) => f.sportId === schoolSport.id)
    : [];

  return (
    <SafeAreaView className="flex-1 bg-[#0F172A]">
      {/* ------- Header with School Branding ------- */}
      <View
        style={[styles.heroSection, { backgroundColor: currentTheme.primary }]}
      >
        {/* Back button */}
        <TouchableOpacity
          onPress={() => router.back()}
          className="absolute top-4 left-4 z-10"
          accessibilityLabel="Go back"
        >
          <View className="bg-black/30 rounded-full w-10 h-10 items-center justify-center">
            <Text style={{ color: currentTheme.textOnPrimary, fontSize: 20 }}>
              {'\u2190'}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Favorite button */}
        <TouchableOpacity
          onPress={toggleFavorite}
          className="absolute top-4 right-4 z-10"
          accessibilityLabel={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <View className="bg-black/30 rounded-full w-10 h-10 items-center justify-center">
            <Text style={{ fontSize: 18 }}>
              {isFavorite ? '\u2B50' : '\u2606'}
            </Text>
          </View>
        </TouchableOpacity>

        {/* School info */}
        <View className="items-center pt-14 pb-4">
          <Text
            style={[styles.schoolName, { color: currentTheme.textOnPrimary }]}
          >
            {school.name}
          </Text>
          <Text
            style={[styles.mascotText, { color: currentTheme.textOnPrimary, opacity: 0.8 }]}
          >
            {school.mascot}
          </Text>
          <View
            className="mt-2 px-3 py-1 rounded-full"
            style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
          >
            <Text
              style={{ color: currentTheme.textOnPrimary }}
              className="text-xs font-semibold"
            >
              {school.conference}
            </Text>
          </View>
        </View>
      </View>

      {/* ------- Tab Selector ------- */}
      <View className="flex-row bg-[#1E293B] border-b border-[#334155]">
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab}
            className={`flex-1 py-3 items-center ${
              activeTab === tab ? 'border-b-2' : ''
            }`}
            style={
              activeTab === tab
                ? { borderBottomColor: currentTheme.primary }
                : undefined
            }
            onPress={() => setActiveTab(tab)}
          >
            <Text
              className={`text-sm font-semibold ${
                activeTab === tab ? 'text-white' : 'text-slate-500'
              }`}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ------- Tab Content ------- */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 'Academics' && (
          <AcademicsTab
            academics={academics}
            colleges={schoolColleges}
            schoolColors={currentTheme}
          />
        )}
        {activeTab === 'Athletics' && (
          <AthleticsTab
            sport={schoolSport}
            coaches={schoolCoaches}
            facilities={schoolFacilities}
            schoolColors={currentTheme}
          />
        )}
        {activeTab === 'Tour' && (
          <TourTab
            facilities={schoolFacilities}
            schoolColors={currentTheme}
          />
        )}
        {activeTab === 'Jersey' && (
          <JerseyTab school={school} schoolColors={currentTheme} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

// ---------------------------------------------------------------------------
// Academics Tab
// ---------------------------------------------------------------------------

function AcademicsTab({
  academics,
  colleges,
  schoolColors,
}: {
  academics: any;
  colleges: any[];
  schoolColors: any;
}) {
  if (!academics) {
    return (
      <View className="p-4">
        <Text className="text-slate-400">No academic data available.</Text>
      </View>
    );
  }

  return (
    <View className="p-4">
      {/* Key Stats */}
      <Text className="text-white text-lg font-bold mb-3">Key Statistics</Text>
      <View className="flex-row flex-wrap mb-4">
        <StatCard
          label="Enrollment"
          value={academics.enrollment.toLocaleString()}
          color={schoolColors.primary}
        />
        <StatCard
          label="Admission Rate"
          value={`${(academics.admissionRate * 100).toFixed(0)}%`}
          color={schoolColors.primary}
        />
        <StatCard
          label="Graduation Rate"
          value={`${(academics.graduationRate * 100).toFixed(0)}%`}
          color={schoolColors.primary}
        />
        <StatCard
          label="SAT Average"
          value={academics.satAvg.toString()}
          color={schoolColors.primary}
        />
        <StatCard
          label="In-State Tuition"
          value={`$${academics.tuitionInState.toLocaleString()}`}
          color={schoolColors.primary}
        />
        <StatCard
          label="Median Earnings"
          value={`$${academics.medianEarnings.toLocaleString()}`}
          color={schoolColors.primary}
        />
      </View>

      {/* Colleges */}
      <Text className="text-white text-lg font-bold mb-3 mt-2">
        Academic Colleges
      </Text>
      {colleges.map((college) => (
        <View key={college.id} className="bg-[#1E293B] rounded-xl p-4 mb-3">
          <Text className="text-white font-bold text-base">{college.name}</Text>
          <Text className="text-slate-400 text-sm mt-1">
            {college.totalStudents.toLocaleString()} students
          </Text>
          <Text className="text-slate-500 text-xs mt-2" numberOfLines={3}>
            {college.description}
          </Text>
        </View>
      ))}
    </View>
  );
}

// ---------------------------------------------------------------------------
// Athletics Tab
// ---------------------------------------------------------------------------

function AthleticsTab({
  sport,
  coaches,
  facilities,
  schoolColors,
}: {
  sport: any;
  coaches: any[];
  facilities: any[];
  schoolColors: any;
}) {
  if (!sport) {
    return (
      <View className="p-4">
        <Text className="text-slate-400">No athletics data available.</Text>
      </View>
    );
  }

  return (
    <View className="p-4">
      {/* Program Overview */}
      <View className="bg-[#1E293B] rounded-xl p-4 mb-4">
        <Text className="text-white text-lg font-bold">{sport.name}</Text>
        <View className="flex-row mt-2">
          <View className="flex-1">
            <Text className="text-slate-500 text-xs">Record</Text>
            <Text className="text-white font-bold text-base">
              {sport.record}
            </Text>
          </View>
          <View className="flex-1">
            <Text className="text-slate-500 text-xs">Conference</Text>
            <Text className="text-white font-bold text-base">
              {sport.conference}
            </Text>
          </View>
          {sport.ranking && (
            <View className="flex-1">
              <Text className="text-slate-500 text-xs">Ranking</Text>
              <Text className="text-white font-bold text-base">
                #{sport.ranking}
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* Coaches */}
      <Text className="text-white text-lg font-bold mb-3">Coaching Staff</Text>
      {coaches.map((coach) => (
        <View key={coach.id} className="bg-[#1E293B] rounded-xl p-4 mb-3">
          <Text className="text-white font-bold">{coach.name}</Text>
          <Text
            className="text-xs font-semibold mt-1"
            style={{ color: schoolColors.primary }}
          >
            {coach.title}
          </Text>
          <Text className="text-slate-400 text-xs mt-2" numberOfLines={3}>
            {coach.bio}
          </Text>
          <Text className="text-slate-500 text-xs mt-1">
            {coach.yearsAtSchool} year{coach.yearsAtSchool !== 1 ? 's' : ''} at
            school
          </Text>
        </View>
      ))}

      {/* Facilities */}
      <Text className="text-white text-lg font-bold mb-3 mt-2">
        Facilities
      </Text>
      {facilities.map((facility) => (
        <View
          key={facility.id}
          className="bg-[#1E293B] rounded-xl p-4 mb-3"
        >
          <View className="flex-row items-center justify-between">
            <Text className="text-white font-bold flex-1">
              {facility.name}
            </Text>
            <View
              className="px-2 py-0.5 rounded-md"
              style={{ backgroundColor: schoolColors.primary + '30' }}
            >
              <Text
                className="text-xs font-semibold"
                style={{ color: schoolColors.primary }}
              >
                {facility.type}
              </Text>
            </View>
          </View>
          <Text className="text-slate-400 text-xs mt-2" numberOfLines={3}>
            {facility.description}
          </Text>
        </View>
      ))}
    </View>
  );
}

// ---------------------------------------------------------------------------
// Tour Tab
// ---------------------------------------------------------------------------

function TourTab({
  facilities,
  schoolColors,
}: {
  facilities: any[];
  schoolColors: any;
}) {
  const tourFacilities = facilities.filter((f) => f.panoramaUrl);

  if (tourFacilities.length === 0) {
    return (
      <View className="p-4 items-center py-16">
        <Text className="text-4xl mb-4">{'\uD83C\uDFDF\uFE0F'}</Text>
        <Text className="text-white text-lg font-bold">
          360 Tours Coming Soon
        </Text>
        <Text className="text-slate-400 text-sm mt-2 text-center">
          Virtual facility tours will be available here
        </Text>
      </View>
    );
  }

  return (
    <View className="p-4">
      <Text className="text-white text-lg font-bold mb-3">
        Virtual Facility Tours
      </Text>
      <Text className="text-slate-400 text-sm mb-4">
        Explore campus facilities in 360 degrees
      </Text>
      {tourFacilities.map((facility) => (
        <TouchableOpacity
          key={facility.id}
          className="bg-[#1E293B] rounded-xl p-4 mb-3"
          activeOpacity={0.7}
        >
          <View className="flex-row items-center">
            <View
              className="w-12 h-12 rounded-lg items-center justify-center mr-3"
              style={{ backgroundColor: schoolColors.primary + '20' }}
            >
              <Text className="text-lg">{'\uD83C\uDFDF\uFE0F'}</Text>
            </View>
            <View className="flex-1">
              <Text className="text-white font-bold">{facility.name}</Text>
              <Text className="text-slate-400 text-xs mt-1">
                {facility.hotspots.length} interactive points
              </Text>
            </View>
            <Text className="text-slate-500">{'\u203A'}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

// ---------------------------------------------------------------------------
// Jersey Tab
// ---------------------------------------------------------------------------

function JerseyTab({
  school,
  schoolColors,
}: {
  school: School;
  schoolColors: any;
}) {
  return (
    <View className="p-4 items-center py-16">
      <Text className="text-4xl mb-4">{'\uD83D\uDC55'}</Text>
      <Text className="text-white text-lg font-bold">Jersey Builder</Text>
      <Text className="text-slate-400 text-sm mt-2 text-center">
        Customize your {school.mascot} uniform
      </Text>
      <TouchableOpacity
        className="mt-6 px-8 py-3 rounded-lg"
        style={{ backgroundColor: schoolColors.primary }}
        activeOpacity={0.8}
      >
        <Text
          className="font-bold text-base"
          style={{ color: schoolColors.textOnPrimary }}
        >
          Start Building
        </Text>
      </TouchableOpacity>
    </View>
  );
}

// ---------------------------------------------------------------------------
// Stat Card
// ---------------------------------------------------------------------------

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <View className="w-1/3 p-1">
      <View className="bg-[#1E293B] rounded-xl p-3 items-center">
        <Text className="text-white text-lg font-bold">{value}</Text>
        <Text className="text-slate-400 text-xs mt-1 text-center">
          {label}
        </Text>
      </View>
    </View>
  );
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = StyleSheet.create({
  heroSection: {
    paddingBottom: 16,
    position: 'relative',
  },
  schoolName: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
  },
  mascotText: {
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  },
});

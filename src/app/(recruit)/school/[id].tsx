import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Animated,
  type LayoutChangeEvent,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useSchoolTheme } from '@/context/SchoolThemeContext';
import { useAnalytics } from '@/context/AnalyticsContext';
import { useAuth } from '@/context/AuthContext';
import { SCHOOLS } from '@/data/schools';
import { ACADEMICS_DATA, COLLEGES } from '@/data/academics';
import { SPORTS, COACHES, FACILITIES } from '@/data/athletics';
import { TourScreen } from '@/components/tour';
import { JerseyBuilderScreen } from '@/components/jersey';
import { JERSEY_ASSETS } from '@/data/jerseyAssets';
import { useAcademicData } from '@/hooks/useAcademicData';
import type { School, Facility } from '@/types';

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
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);

  // Animated tab underline
  const tabLayouts = useRef<Record<string, { x: number; width: number }>>({}).current;
  const underlineX = useRef(new Animated.Value(0)).current;
  const underlineWidth = useRef(new Animated.Value(0)).current;

  const handleTabLayout = useCallback(
    (tab: string, e: LayoutChangeEvent) => {
      const { x, width } = e.nativeEvent.layout;
      tabLayouts[tab] = { x, width };
      if (tab === activeTab) {
        underlineX.setValue(x);
        underlineWidth.setValue(width);
      }
    },
    [activeTab, tabLayouts, underlineX, underlineWidth],
  );

  useEffect(() => {
    const layout = tabLayouts[activeTab];
    if (layout) {
      Animated.parallel([
        Animated.spring(underlineX, {
          toValue: layout.x,
          useNativeDriver: false,
          tension: 200,
          friction: 25,
        }),
        Animated.spring(underlineWidth, {
          toValue: layout.width,
          useNativeDriver: false,
          tension: 200,
          friction: 25,
        }),
      ]).start();
    }
  }, [activeTab, tabLayouts, underlineX, underlineWidth]);

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

      {/* ------- Tab Selector with Animated Underline ------- */}
      <View className="bg-[#1E293B] border-b border-[#334155]">
        <View style={styles.tabRow}>
          {TABS.map((tab) => (
            <TouchableOpacity
              key={tab}
              className="flex-1 py-3 items-center"
              onPress={() => setActiveTab(tab)}
              onLayout={(e) => handleTabLayout(tab, e)}
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
          <Animated.View
            style={[
              styles.tabUnderline,
              {
                backgroundColor: currentTheme.primary,
                left: underlineX,
                width: underlineWidth,
              },
            ]}
          />
        </View>
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
            scorecardId={school.scorecardId}
          />
        )}
        {activeTab === 'Athletics' && (
          <AthleticsTab
            sport={schoolSport}
            coaches={schoolCoaches}
            facilities={schoolFacilities}
            schoolColors={currentTheme}
            onFacilityPress={(facilityId: string) => {
              const facility = schoolFacilities.find((f) => f.id === facilityId);
              if (facility) {
                setSelectedFacility(facility);
                setActiveTab('Tour');
              }
            }}
          />
        )}
        {activeTab === 'Tour' && (
          selectedFacility ? (
            <TourScreen
              facility={selectedFacility}
              schoolColor={school.colors.primary}
              onBack={() => setSelectedFacility(null)}
              onNavigate={(facilityId) => {
                const f = schoolFacilities.find((fac) => fac.id === facilityId);
                if (f) setSelectedFacility(f);
              }}
              userId={user?.id ?? ''}
            />
          ) : (
            <View className="p-4">
              <Text className="text-white text-lg font-bold mb-3">
                Virtual Facility Tours
              </Text>
              <Text className="text-slate-400 text-sm mb-4">
                Explore campus facilities in 360 degrees
              </Text>
              {schoolFacilities.length === 0 ? (
                <View className="items-center py-16">
                  <Text className="text-white text-lg font-bold">
                    No facilities available
                  </Text>
                </View>
              ) : (
                schoolFacilities.map((facility) => (
                  <TouchableOpacity
                    key={facility.id}
                    className="bg-[#1E293B] rounded-xl p-4 mb-3"
                    activeOpacity={0.7}
                    onPress={() => setSelectedFacility(facility)}
                  >
                    <View className="flex-row items-center">
                      <View
                        className="w-12 h-12 rounded-lg items-center justify-center mr-3"
                        style={{ backgroundColor: currentTheme.primary + '20' }}
                      >
                        <Text className="text-lg">{'\uD83C\uDFDF\uFE0F'}</Text>
                      </View>
                      <View className="flex-1">
                        <Text className="text-white font-bold">{facility.name}</Text>
                        <Text className="text-slate-400 text-xs mt-0.5">
                          {facility.type}
                        </Text>
                        {facility.panoramaUrl ? (
                          <Text className="text-green-400 text-xs mt-1">
                            360 Tour Available
                          </Text>
                        ) : (
                          <Text className="text-slate-500 text-xs mt-1">
                            Tour coming soon
                          </Text>
                        )}
                      </View>
                      <TouchableOpacity
                        className="px-4 py-2 rounded-lg"
                        style={{ backgroundColor: currentTheme.primary }}
                        onPress={() => setSelectedFacility(facility)}
                      >
                        <Text
                          className="text-xs font-bold"
                          style={{ color: currentTheme.textOnPrimary }}
                        >
                          Start Tour
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                ))
              )}
            </View>
          )
        )}
        {activeTab === 'Jersey' && (
          <JerseyBuilderScreen
            school={school}
            jerseyAssets={JERSEY_ASSETS.filter((a) => a.schoolId === school.id)}
            onBack={() => setActiveTab('Athletics')}
            schoolColor={school.colors.primary}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

// ---------------------------------------------------------------------------
// Academics Tab
// ---------------------------------------------------------------------------

function AcademicsTab({
  academics: academicsProp,
  colleges,
  schoolColors,
  scorecardId,
}: {
  academics: any;
  colleges: any[];
  schoolColors: any;
  scorecardId?: string;
}) {
  // When a scorecardId is provided, fetch live data from the API.
  const schoolId = academicsProp?.schoolId ?? '';
  const liveResult = scorecardId
    ? // eslint-disable-next-line react-hooks/rules-of-hooks
      useAcademicData(schoolId, scorecardId)
    : null;

  const loading = liveResult?.loading ?? false;
  const error = liveResult?.error ?? null;
  const refresh = liveResult?.refresh ?? (() => {});
  const academics = liveResult?.academicData ?? academicsProp;
  const isLive = scorecardId != null && liveResult?.academicData != null && error == null;

  if (!academics && !loading) {
    return (
      <View className="p-4">
        <Text className="text-slate-400">No academic data available.</Text>
      </View>
    );
  }

  return (
    <View className="p-4">
      {/* Data source indicator */}
      {scorecardId != null && !loading && (
        <View
          className="flex-row items-center self-start rounded-full px-2.5 py-1 mb-3"
          style={{ backgroundColor: isLive ? '#064E3B' : '#1E293B' }}
        >
          <View
            className="w-1.5 h-1.5 rounded-full mr-1.5"
            style={{ backgroundColor: isLive ? '#34D399' : '#94A3B8' }}
          />
          <Text
            className="text-xs font-semibold"
            style={{ color: isLive ? '#6EE7B7' : '#94A3B8' }}
          >
            {isLive ? 'Live data from College Scorecard' : 'Using cached data'}
          </Text>
        </View>
      )}

      {/* Error banner */}
      {error != null && !loading && (
        <View className="flex-row items-center bg-[#1C1917] rounded-lg border border-[#78350F] p-3 mb-4">
          <View className="flex-1">
            <Text className="text-[#FBBF24] text-sm font-bold">Using offline data</Text>
            <Text className="text-[#A8A29E] text-xs mt-0.5">
              Could not reach College Scorecard API
            </Text>
          </View>
          <TouchableOpacity
            onPress={refresh}
            className="rounded-lg px-3.5 py-1.5 ml-3"
            style={{ backgroundColor: schoolColors.primary }}
          >
            <Text className="text-white text-xs font-bold">Retry</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Key Stats */}
      <Text className="text-white text-lg font-bold mb-3">Key Statistics</Text>

      {loading ? (
        <View className="flex-row flex-wrap mb-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <View key={i} className="w-1/3 p-1">
              <View className="bg-[#1E293B] rounded-xl p-3 items-center opacity-50">
                <View className="bg-[#334155] rounded h-5 w-12 mb-2" />
                <View className="bg-[#334155] rounded h-3 w-16" />
              </View>
            </View>
          ))}
        </View>
      ) : (
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
      )}

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
  onFacilityPress,
}: {
  sport: any;
  coaches: any[];
  facilities: any[];
  schoolColors: any;
  onFacilityPress: (facilityId: string) => void;
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
        <TouchableOpacity
          key={facility.id}
          className="bg-[#1E293B] rounded-xl p-4 mb-3"
          activeOpacity={0.7}
          onPress={() => onFacilityPress(facility.id)}
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
        </TouchableOpacity>
      ))}
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
  tabRow: {
    flexDirection: 'row',
    position: 'relative',
  },
  tabUnderline: {
    position: 'absolute',
    bottom: 0,
    height: 3,
    borderRadius: 1.5,
  },
});

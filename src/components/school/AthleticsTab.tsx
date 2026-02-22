import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { DARK_THEME } from '@/theme';
import type { School, Sport, Coach, Facility } from '@/types';
import CoachCard from './CoachCard';
import FacilityCard from './FacilityCard';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface AthleticsTabProps {
  school: School;
  sport: Sport;
  coaches: Coach[];
  facilities: Facility[];
  /** Called when the user taps a facility (navigates to 360 tour). */
  onFacilityPress: (facilityId: string) => void;
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

/**
 * Athletics tab content for the school detail screen. Contains three sections:
 * 1) Sport overview with record, ranking badge, and conference
 * 2) Coaching staff as a horizontal ScrollView of CoachCards
 * 3) Facilities grid of FacilityCards (tapping opens 360 tour)
 */
export default function AthleticsTab({
  school,
  sport,
  coaches,
  facilities,
  onFacilityPress,
}: AthleticsTabProps) {
  const schoolColor = school.colors.primary;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* ─── Section 1: Sport Overview ─── */}
      <Text style={[styles.sectionHeader, { color: schoolColor }]}>
        {sport.name}
      </Text>

      <View style={styles.overviewCard}>
        {/* Record */}
        <View style={styles.overviewRow}>
          <Text style={styles.overviewLabel}>Record</Text>
          <Text style={styles.overviewValue}>{sport.record}</Text>
        </View>

        {/* Ranking (if ranked) */}
        {sport.ranking != null && (
          <View style={styles.overviewRow}>
            <Text style={styles.overviewLabel}>National Ranking</Text>
            <View style={[styles.rankingBadge, { backgroundColor: schoolColor }]}>
              <Text style={styles.rankingText}>#{sport.ranking}</Text>
            </View>
          </View>
        )}

        {/* Conference */}
        <View style={[styles.overviewRow, styles.noBorder]}>
          <Text style={styles.overviewLabel}>Conference</Text>
          <Text style={styles.overviewValue}>{sport.conference}</Text>
        </View>

        {/* Head Coach */}
        <View style={[styles.overviewRow, styles.noBorder]}>
          <Text style={styles.overviewLabel}>Head Coach</Text>
          <Text style={styles.overviewValue}>{sport.headCoach}</Text>
        </View>
      </View>

      {/* ─── Section 2: Coaching Staff ─── */}
      {coaches.length > 0 && (
        <>
          <Text style={[styles.sectionHeader, { color: schoolColor }]}>
            Coaching Staff
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.coachesRow}
          >
            {coaches.map((coach) => (
              <CoachCard
                key={coach.id}
                coach={coach}
                schoolColor={schoolColor}
              />
            ))}
          </ScrollView>
        </>
      )}

      {/* ─── Section 3: Facilities ─── */}
      {facilities.length > 0 && (
        <>
          <Text style={[styles.sectionHeader, { color: schoolColor }]}>
            Facilities
          </Text>
          <View style={styles.facilitiesGrid}>
            {facilities.map((facility) => (
              <FacilityCard
                key={facility.id}
                facility={facility}
                onPress={() => onFacilityPress(facility.id)}
                schoolColor={schoolColor}
              />
            ))}
          </View>
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

  // Sport Overview
  overviewCard: {
    backgroundColor: DARK_THEME.bg800,
    borderRadius: 12,
    padding: 16,
  },
  overviewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: DARK_THEME.bg600,
  },
  noBorder: {
    borderBottomWidth: 0,
  },
  overviewLabel: {
    color: DARK_THEME.bg400,
    fontSize: 13,
    fontWeight: '500',
  },
  overviewValue: {
    color: DARK_THEME.white,
    fontSize: 15,
    fontWeight: '700',
  },
  rankingBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  rankingText: {
    color: DARK_THEME.white,
    fontSize: 14,
    fontWeight: '800',
  },

  // Coaches
  coachesRow: {
    paddingRight: 16,
  },

  // Facilities
  facilitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

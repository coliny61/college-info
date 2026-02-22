import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DARK_THEME } from '@/theme';
import type { Coach } from '@/types';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface CoachCardProps {
  coach: Coach;
  schoolColor: string;
}

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

/** Extracts up to two initials from a full name. */
function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

/**
 * Card displaying a coaching staff member. Shows an initials circle (as an
 * image placeholder), name, title, and years at the school. Uses the school's
 * primary color for the initials circle accent.
 */
export default function CoachCard({ coach, schoolColor }: CoachCardProps) {
  const initials = getInitials(coach.name);

  return (
    <View style={styles.card}>
      {/* Initials circle */}
      <View style={[styles.initialsCircle, { backgroundColor: schoolColor }]}>
        <Text style={styles.initialsText}>{initials}</Text>
      </View>

      {/* Info */}
      <Text style={styles.name} numberOfLines={1}>
        {coach.name}
      </Text>
      <Text style={styles.title} numberOfLines={2}>
        {coach.title}
      </Text>
      <Text style={styles.years}>
        {coach.yearsAtSchool} {coach.yearsAtSchool === 1 ? 'year' : 'years'}
      </Text>
    </View>
  );
}

// -----------------------------------------------------------------------------
// Styles
// -----------------------------------------------------------------------------

const styles = StyleSheet.create({
  card: {
    backgroundColor: DARK_THEME.bg700,
    borderRadius: 12,
    padding: 14,
    width: 150,
    marginRight: 12,
    alignItems: 'center',
  },
  initialsCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  initialsText: {
    color: DARK_THEME.white,
    fontSize: 20,
    fontWeight: '800',
  },
  name: {
    color: DARK_THEME.white,
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 2,
  },
  title: {
    color: DARK_THEME.bg300,
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 16,
    marginBottom: 6,
  },
  years: {
    color: DARK_THEME.bg400,
    fontSize: 11,
    fontWeight: '500',
  },
});

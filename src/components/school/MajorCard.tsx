import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DARK_THEME } from '@/theme';
import type { Major } from '@/types';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface MajorCardProps {
  major: Major;
  onPress?: () => void;
  schoolColor: string;
}

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

/** Maps degree types to human-readable labels for badges. */
const DEGREE_LABELS: Record<string, string> = {
  BS: 'B.S.',
  BA: 'B.A.',
  MS: 'M.S.',
  PhD: 'Ph.D.',
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

/**
 * Small tappable card showing a major's name, degree type badge (BS/BA/MS/PhD),
 * and a brief description. Tap navigates to the degree pathway view.
 */
export default function MajorCard({
  major,
  onPress,
  schoolColor,
}: MajorCardProps) {
  const Wrapper = onPress ? TouchableOpacity : View;
  const wrapperProps = onPress
    ? {
        onPress,
        activeOpacity: 0.8,
        accessibilityRole: 'button' as const,
        accessibilityLabel: `${major.name} - ${DEGREE_LABELS[major.degreeType] ?? major.degreeType}`,
      }
    : {};

  return (
    <Wrapper style={styles.card} {...wrapperProps}>
      <View style={styles.topRow}>
        <Text style={styles.name} numberOfLines={1}>
          {major.name}
        </Text>
        <View style={[styles.degreeBadge, { backgroundColor: schoolColor }]}>
          <Text style={styles.degreeText}>
            {DEGREE_LABELS[major.degreeType] ?? major.degreeType}
          </Text>
        </View>
      </View>

      <Text style={styles.description} numberOfLines={2}>
        {major.description}
      </Text>

      {onPress && (
        <Text style={[styles.viewPathway, { color: schoolColor }]}>
          View Degree Pathway {'\u203A'}
        </Text>
      )}
    </Wrapper>
  );
}

// -----------------------------------------------------------------------------
// Styles
// -----------------------------------------------------------------------------

const styles = StyleSheet.create({
  card: {
    backgroundColor: DARK_THEME.bg700,
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  name: {
    flex: 1,
    color: DARK_THEME.white,
    fontSize: 14,
    fontWeight: '600',
    marginRight: 8,
  },
  degreeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  degreeText: {
    color: DARK_THEME.white,
    fontSize: 11,
    fontWeight: '700',
  },
  description: {
    color: DARK_THEME.bg300,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 17,
  },
  viewPathway: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 8,
  },
});

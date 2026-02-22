import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DARK_THEME } from '@/theme';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

type ViewMode = 'recruit' | 'parent' | 'combined';

interface ViewModeToggleProps {
  activeMode: ViewMode;
  onModeChange: (mode: ViewMode) => void;
  schoolColor: string;
}

// -----------------------------------------------------------------------------
// Options
// -----------------------------------------------------------------------------

const VIEW_OPTIONS: { key: ViewMode; label: string }[] = [
  { key: 'recruit', label: 'Recruit' },
  { key: 'parent', label: 'Parent' },
  { key: 'combined', label: 'Combined' },
];

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

/**
 * Three-option segmented control for toggling between Recruit, Parent,
 * and Combined analytics views. Active segment gets the school-colored
 * background; inactive segments have transparent backgrounds with muted text.
 */
export default function ViewModeToggle({
  activeMode,
  onModeChange,
  schoolColor,
}: ViewModeToggleProps) {
  return (
    <View style={styles.container}>
      {VIEW_OPTIONS.map((option, index) => {
        const isActive = option.key === activeMode;
        const isFirst = index === 0;
        const isLast = index === VIEW_OPTIONS.length - 1;

        return (
          <TouchableOpacity
            key={option.key}
            onPress={() => onModeChange(option.key)}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityState={{ selected: isActive }}
            accessibilityLabel={`View ${option.label} analytics`}
            style={[
              styles.segment,
              isActive && { backgroundColor: schoolColor },
              isFirst && styles.segmentFirst,
              isLast && styles.segmentLast,
            ]}
          >
            <Text
              style={[
                styles.segmentText,
                isActive
                  ? styles.segmentTextActive
                  : styles.segmentTextInactive,
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

// -----------------------------------------------------------------------------
// Styles
// -----------------------------------------------------------------------------

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: DARK_THEME.bg700,
    borderRadius: 12,
    padding: 3,
  },
  segment: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  segmentFirst: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  segmentLast: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  segmentText: {
    fontSize: 14,
    fontWeight: '600',
  },
  segmentTextActive: {
    color: DARK_THEME.white,
  },
  segmentTextInactive: {
    color: DARK_THEME.bg400,
  },
});

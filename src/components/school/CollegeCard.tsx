import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DARK_THEME } from '@/theme';
import type { College } from '@/types';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface CollegeCardProps {
  college: College;
  isSelected: boolean;
  onPress: () => void;
  schoolColor: string;
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

/**
 * Compact horizontal card for an academic college within a university.
 * Shows the college name, a two-line description, and student count.
 * When selected, displays a school-colored left border and accent tint.
 */
export default function CollegeCard({
  college,
  isSelected,
  onPress,
  schoolColor,
}: CollegeCardProps) {
  return (
    <TouchableOpacity
      style={[
        styles.card,
        isSelected && { borderColor: schoolColor, borderWidth: 2 },
      ]}
      onPress={onPress}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={`${college.name}${isSelected ? ', selected' : ''}`}
      accessibilityState={{ selected: isSelected }}
    >
      {/* Accent left bar when selected */}
      {isSelected && (
        <View style={[styles.accentBar, { backgroundColor: schoolColor }]} />
      )}

      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {college.name}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {college.description}
        </Text>
        <View style={styles.footer}>
          <Text style={styles.studentCount}>
            {college.totalStudents.toLocaleString()} students
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

// -----------------------------------------------------------------------------
// Styles
// -----------------------------------------------------------------------------

const styles = StyleSheet.create({
  card: {
    backgroundColor: DARK_THEME.bg700,
    borderRadius: 12,
    flexDirection: 'row',
    overflow: 'hidden',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: DARK_THEME.bg600,
  },
  accentBar: {
    width: 4,
  },
  content: {
    flex: 1,
    padding: 12,
  },
  name: {
    color: DARK_THEME.white,
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },
  description: {
    color: DARK_THEME.bg300,
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 18,
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  studentCount: {
    color: DARK_THEME.bg400,
    fontSize: 12,
    fontWeight: '500',
  },
});

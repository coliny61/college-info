import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DARK_THEME } from '@/theme';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface StatCardProps {
  label: string;
  value: string | number;
  subtitle?: string;
  icon?: string;
  trend?: 'up' | 'down' | 'neutral';
  schoolColor?: string;
}

// -----------------------------------------------------------------------------
// Trend indicator arrows
// -----------------------------------------------------------------------------

const TREND_ICON: Record<string, string> = {
  up: '\u25B2',   // triangle up
  down: '\u25BC', // triangle down
  neutral: '\u2013', // en dash
};

const TREND_COLOR: Record<string, string> = {
  up: DARK_THEME.success,
  down: DARK_THEME.error,
  neutral: DARK_THEME.bg400,
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

/**
 * Compact statistic card showing a single metric with label, large value,
 * optional trend indicator, and a school-colored left accent border.
 */
export default function StatCard({
  label,
  value,
  subtitle,
  icon,
  trend,
  schoolColor,
}: StatCardProps) {
  const accentColor = schoolColor ?? DARK_THEME.accent;

  return (
    <View style={[styles.card, { borderLeftColor: accentColor }]}>
      {/* Top row: icon + label */}
      <View style={styles.labelRow}>
        {icon ? <Text style={styles.icon}>{icon}</Text> : null}
        <Text style={styles.label}>{label}</Text>
      </View>

      {/* Value row */}
      <View style={styles.valueRow}>
        <Text style={styles.value}>{value}</Text>
        {trend ? (
          <Text style={[styles.trend, { color: TREND_COLOR[trend] }]}>
            {TREND_ICON[trend]}
          </Text>
        ) : null}
      </View>

      {/* Subtitle */}
      {subtitle ? (
        <Text style={styles.subtitle}>{subtitle}</Text>
      ) : null}
    </View>
  );
}

// -----------------------------------------------------------------------------
// Styles
// -----------------------------------------------------------------------------

const styles = StyleSheet.create({
  card: {
    backgroundColor: DARK_THEME.bg800,
    borderRadius: 12,
    padding: 14,
    borderLeftWidth: 4,
    borderLeftColor: DARK_THEME.accent,
    borderWidth: 1,
    borderColor: DARK_THEME.bg700,
    // Shadow (iOS)
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    // Elevation (Android)
    elevation: 3,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  icon: {
    fontSize: 16,
    marginRight: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
    color: DARK_THEME.bg400,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  value: {
    fontSize: 26,
    fontWeight: '700',
    color: DARK_THEME.white,
  },
  trend: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  subtitle: {
    fontSize: 12,
    color: DARK_THEME.bg400,
    marginTop: 4,
  },
});

import React, { useRef, useEffect } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { DARK_THEME } from '@/theme';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface TimeBreakdownItem {
  section: string;
  minutes: number;
  color: string;
}

interface TimeBreakdownChartProps {
  data?: TimeBreakdownItem[];
  schoolColor: string;
}

// -----------------------------------------------------------------------------
// Default mock data generator
// -----------------------------------------------------------------------------

function generateMockTimeData(schoolColor: string): TimeBreakdownItem[] {
  // Generates realistic section time data with school-color-derived palette
  return [
    { section: 'Athletics', minutes: 42, color: schoolColor },
    { section: 'Tour', minutes: 35, color: adjustColorBrightness(schoolColor, 0.8) },
    { section: 'Academics', minutes: 28, color: adjustColorBrightness(schoolColor, 0.6) },
    { section: 'Jersey Builder', minutes: 22, color: adjustColorBrightness(schoolColor, 0.45) },
    { section: 'Profile', minutes: 8, color: adjustColorBrightness(schoolColor, 0.3) },
  ];
}

/**
 * Lighten or darken a hex color. Factor > 1 = lighter, < 1 = darker.
 */
function adjustColorBrightness(hex: string, factor: number): string {
  const cleaned = hex.replace('#', '');
  const r = Math.min(255, Math.round(parseInt(cleaned.substring(0, 2), 16) * factor));
  const g = Math.min(255, Math.round(parseInt(cleaned.substring(2, 4), 16) * factor));
  const b = Math.min(255, Math.round(parseInt(cleaned.substring(4, 6), 16) * factor));
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

// -----------------------------------------------------------------------------
// Animated Bar sub-component
// -----------------------------------------------------------------------------

function AnimatedBar({
  item,
  maxMinutes,
  index,
}: {
  item: TimeBreakdownItem;
  maxMinutes: number;
  index: number;
}) {
  const widthAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: 1,
      duration: 600,
      delay: index * 100,
      useNativeDriver: false,
    }).start();
  }, [widthAnim, index]);

  const barWidthPercent = maxMinutes > 0 ? (item.minutes / maxMinutes) * 100 : 0;

  return (
    <View style={styles.barRow}>
      {/* Section label */}
      <View style={styles.barLabelContainer}>
        <Text style={styles.barLabel} numberOfLines={1}>
          {item.section}
        </Text>
      </View>

      {/* Bar track */}
      <View style={styles.barTrack}>
        <Animated.View
          style={[
            styles.barFill,
            {
              backgroundColor: item.color,
              width: widthAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', `${barWidthPercent}%`],
              }),
            },
          ]}
        />
      </View>

      {/* Time value */}
      <View style={styles.barValueContainer}>
        <Text style={styles.barValue}>{item.minutes}m</Text>
      </View>
    </View>
  );
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

/**
 * Horizontal bar chart showing time spent per section. Bars are sorted by
 * most time spent, with animated width on entrance. Displays total time
 * at the bottom.
 */
export default function TimeBreakdownChart({
  data,
  schoolColor,
}: TimeBreakdownChartProps) {
  const chartData = data ?? generateMockTimeData(schoolColor);

  // Sort descending by minutes
  const sorted = [...chartData].sort((a, b) => b.minutes - a.minutes);
  const maxMinutes = sorted.length > 0 ? sorted[0].minutes : 1;
  const totalMinutes = sorted.reduce((sum, item) => sum + item.minutes, 0);

  return (
    <View style={styles.container}>
      {/* Bars */}
      {sorted.map((item, index) => (
        <AnimatedBar
          key={item.section}
          item={item}
          maxMinutes={maxMinutes}
          index={index}
        />
      ))}

      {/* Total */}
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Total Time</Text>
        <Text style={[styles.totalValue, { color: schoolColor }]}>
          {totalMinutes >= 60
            ? `${Math.floor(totalMinutes / 60)}h ${totalMinutes % 60}m`
            : `${totalMinutes}m`}
        </Text>
      </View>
    </View>
  );
}

// -----------------------------------------------------------------------------
// Styles
// -----------------------------------------------------------------------------

const styles = StyleSheet.create({
  container: {
    backgroundColor: DARK_THEME.bg800,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: DARK_THEME.bg700,
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  barLabelContainer: {
    width: 100,
    paddingRight: 10,
  },
  barLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: DARK_THEME.bg300,
    textAlign: 'right',
  },
  barTrack: {
    flex: 1,
    height: 24,
    backgroundColor: DARK_THEME.bg700,
    borderRadius: 6,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 6,
  },
  barValueContainer: {
    width: 48,
    paddingLeft: 8,
  },
  barValue: {
    fontSize: 13,
    fontWeight: '600',
    color: DARK_THEME.bg200,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: DARK_THEME.bg700,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: DARK_THEME.bg400,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '700',
  },
});

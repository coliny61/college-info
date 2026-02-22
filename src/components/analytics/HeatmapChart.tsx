import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DARK_THEME } from '@/theme';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface HeatmapDataPoint {
  section: string;
  day: string;
  value: number;
}

interface HeatmapChartProps {
  data?: HeatmapDataPoint[];
  schoolColor: string;
}

// -----------------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------------

const SECTIONS = ['Academics', 'Athletics', 'Tour', 'Jersey', 'Profile'];
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// -----------------------------------------------------------------------------
// Default mock data generator
// -----------------------------------------------------------------------------

function generateMockHeatmapData(): HeatmapDataPoint[] {
  const data: HeatmapDataPoint[] = [];
  // Realistic engagement patterns:
  // - Academics: higher weekday engagement
  // - Athletics: higher weekend engagement
  // - Tour: peaks mid-week
  // - Jersey: peaks on weekends
  // - Profile: fairly even
  const patterns: Record<string, number[]> = {
    Academics: [72, 80, 68, 75, 55, 30, 25],
    Athletics: [45, 50, 55, 60, 70, 88, 92],
    Tour:      [40, 55, 78, 82, 65, 50, 45],
    Jersey:    [30, 35, 40, 45, 60, 85, 90],
    Profile:   [50, 48, 52, 55, 50, 42, 40],
  };

  for (const section of SECTIONS) {
    for (let i = 0; i < DAYS.length; i++) {
      data.push({
        section,
        day: DAYS[i],
        value: patterns[section][i],
      });
    }
  }

  return data;
}

// -----------------------------------------------------------------------------
// Helper: convert hex color to rgba with opacity
// -----------------------------------------------------------------------------

function hexToRgba(hex: string, opacity: number): string {
  const cleaned = hex.replace('#', '');
  const r = parseInt(cleaned.substring(0, 2), 16);
  const g = parseInt(cleaned.substring(2, 4), 16);
  const b = parseInt(cleaned.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

/**
 * Grid-based heatmap showing engagement intensity by section (rows) and
 * day of week (columns). Each cell is colored with the school color at
 * an opacity proportional to its value (0 = transparent, 100 = fully opaque).
 */
export default function HeatmapChart({
  data,
  schoolColor,
}: HeatmapChartProps) {
  const heatmapData = data ?? generateMockHeatmapData();

  // Build a lookup for quick access: section -> day -> value
  const lookup: Record<string, Record<string, number>> = {};
  for (const point of heatmapData) {
    if (!lookup[point.section]) lookup[point.section] = {};
    lookup[point.section][point.day] = point.value;
  }

  return (
    <View style={styles.container}>
      {/* Column headers (days) */}
      <View style={styles.headerRow}>
        {/* Empty corner cell for row label alignment */}
        <View style={styles.rowLabel} />
        {DAYS.map((day) => (
          <View key={day} style={styles.columnHeader}>
            <Text style={styles.columnHeaderText}>{day}</Text>
          </View>
        ))}
      </View>

      {/* Data rows */}
      {SECTIONS.map((section) => (
        <View key={section} style={styles.dataRow}>
          {/* Row label */}
          <View style={styles.rowLabel}>
            <Text style={styles.rowLabelText} numberOfLines={1}>
              {section}
            </Text>
          </View>

          {/* Cells */}
          {DAYS.map((day) => {
            const value = lookup[section]?.[day] ?? 0;
            const opacity = Math.max(0.08, value / 100);
            return (
              <View key={`${section}-${day}`} style={styles.cellWrapper}>
                <View
                  style={[
                    styles.cell,
                    { backgroundColor: hexToRgba(schoolColor, opacity) },
                  ]}
                >
                  {value > 0 && (
                    <Text style={styles.cellText}>{value}</Text>
                  )}
                </View>
              </View>
            );
          })}
        </View>
      ))}

      {/* Legend */}
      <View style={styles.legend}>
        <Text style={styles.legendLabel}>Low</Text>
        <View style={styles.legendGradient}>
          {[0.1, 0.25, 0.4, 0.55, 0.7, 0.85, 1.0].map((opacity, i) => (
            <View
              key={i}
              style={[
                styles.legendBlock,
                { backgroundColor: hexToRgba(schoolColor, opacity) },
              ]}
            />
          ))}
        </View>
        <Text style={styles.legendLabel}>High</Text>
      </View>
    </View>
  );
}

// -----------------------------------------------------------------------------
// Styles
// -----------------------------------------------------------------------------

const CELL_SIZE = 36;

const styles = StyleSheet.create({
  container: {
    backgroundColor: DARK_THEME.bg800,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: DARK_THEME.bg700,
  },
  headerRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  columnHeader: {
    width: CELL_SIZE,
    marginHorizontal: 2,
    alignItems: 'center',
  },
  columnHeaderText: {
    fontSize: 10,
    fontWeight: '600',
    color: DARK_THEME.bg400,
    textTransform: 'uppercase',
  },
  dataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  rowLabel: {
    width: 72,
    paddingRight: 8,
  },
  rowLabelText: {
    fontSize: 11,
    fontWeight: '500',
    color: DARK_THEME.bg300,
    textAlign: 'right',
  },
  cellWrapper: {
    marginHorizontal: 2,
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellText: {
    fontSize: 9,
    fontWeight: '600',
    color: DARK_THEME.white,
  },
  legend: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    gap: 6,
  },
  legendLabel: {
    fontSize: 10,
    fontWeight: '500',
    color: DARK_THEME.bg500,
  },
  legendGradient: {
    flexDirection: 'row',
    gap: 2,
  },
  legendBlock: {
    width: 18,
    height: 12,
    borderRadius: 2,
  },
});

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DARK_THEME } from '@/theme';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface JerseyComboData {
  combo: string;
  count: number;
  percentage: number;
}

interface JerseyComboStatsProps {
  data?: JerseyComboData[];
  schoolColor: string;
}

// -----------------------------------------------------------------------------
// Default mock data
// -----------------------------------------------------------------------------

const MOCK_JERSEY_COMBOS: JerseyComboData[] = [
  { combo: 'Home / Home / Home', count: 145, percentage: 34 },
  { combo: 'Home / Away / Home', count: 89, percentage: 21 },
  { combo: 'Alternate / Home / Away', count: 72, percentage: 17 },
  { combo: 'Away / Home / Alternate', count: 65, percentage: 15 },
  { combo: 'Home / Alternate / Home', count: 55, percentage: 13 },
];

// -----------------------------------------------------------------------------
// Helper: convert hex color to rgba
// -----------------------------------------------------------------------------

function hexToRgba(hex: string, opacity: number): string {
  const cleaned = hex.replace('#', '');
  const r = parseInt(cleaned.substring(0, 2), 16);
  const g = parseInt(cleaned.substring(2, 4), 16);
  const b = parseInt(cleaned.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

// -----------------------------------------------------------------------------
// Rank badge
// -----------------------------------------------------------------------------

const RANK_MEDALS = ['\u{1F947}', '\u{1F948}', '\u{1F949}', '4', '5'];

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

/**
 * Displays the top 5 most popular jersey combinations. Each row shows
 * the combination description, usage count, and a progress bar indicating
 * the percentage share.
 */
export default function JerseyComboStats({
  data,
  schoolColor,
}: JerseyComboStatsProps) {
  const comboData = (data ?? MOCK_JERSEY_COMBOS).slice(0, 5);
  const totalCount = comboData.reduce((sum, item) => sum + item.count, 0);

  return (
    <View style={styles.container}>
      {/* Header row */}
      <View style={styles.headerRow}>
        <Text style={styles.headerRank}>#</Text>
        <Text style={styles.headerCombo}>Helmet / Jersey / Pants</Text>
        <Text style={styles.headerCount}>Builds</Text>
        <Text style={styles.headerPct}>%</Text>
      </View>

      {/* Combo rows */}
      {comboData.map((item, index) => (
        <View key={item.combo} style={styles.row}>
          {/* Rank */}
          <View style={styles.rankContainer}>
            <Text style={styles.rankText}>
              {index < 3 ? RANK_MEDALS[index] : RANK_MEDALS[index]}
            </Text>
          </View>

          {/* Combo + progress bar */}
          <View style={styles.comboContainer}>
            <Text style={styles.comboText} numberOfLines={1}>
              {item.combo}
            </Text>
            <View style={styles.progressTrack}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${item.percentage}%`,
                    backgroundColor: hexToRgba(
                      schoolColor,
                      1.0 - index * 0.15,
                    ),
                  },
                ]}
              />
            </View>
          </View>

          {/* Count */}
          <View style={styles.countContainer}>
            <Text style={styles.countText}>{item.count}</Text>
          </View>

          {/* Percentage */}
          <View style={styles.pctContainer}>
            <Text style={[styles.pctText, { color: schoolColor }]}>
              {item.percentage}%
            </Text>
          </View>
        </View>
      ))}

      {/* Total */}
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Total Builds</Text>
        <Text style={[styles.totalValue, { color: schoolColor }]}>
          {totalCount}
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: DARK_THEME.bg700,
  },
  headerRank: {
    width: 28,
    fontSize: 10,
    fontWeight: '600',
    color: DARK_THEME.bg500,
    textTransform: 'uppercase',
  },
  headerCombo: {
    flex: 1,
    fontSize: 10,
    fontWeight: '600',
    color: DARK_THEME.bg500,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  headerCount: {
    width: 50,
    fontSize: 10,
    fontWeight: '600',
    color: DARK_THEME.bg500,
    textTransform: 'uppercase',
    textAlign: 'right',
  },
  headerPct: {
    width: 40,
    fontSize: 10,
    fontWeight: '600',
    color: DARK_THEME.bg500,
    textTransform: 'uppercase',
    textAlign: 'right',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  rankContainer: {
    width: 28,
    alignItems: 'center',
  },
  rankText: {
    fontSize: 16,
  },
  comboContainer: {
    flex: 1,
    marginRight: 8,
  },
  comboText: {
    fontSize: 13,
    fontWeight: '500',
    color: DARK_THEME.bg200,
    marginBottom: 4,
  },
  progressTrack: {
    height: 6,
    backgroundColor: DARK_THEME.bg700,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  countContainer: {
    width: 50,
    alignItems: 'flex-end',
  },
  countText: {
    fontSize: 14,
    fontWeight: '600',
    color: DARK_THEME.bg300,
  },
  pctContainer: {
    width: 40,
    alignItems: 'flex-end',
  },
  pctText: {
    fontSize: 14,
    fontWeight: '700',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: DARK_THEME.bg700,
  },
  totalLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: DARK_THEME.bg400,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '700',
  },
});

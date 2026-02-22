import React, { useRef, useEffect } from 'react';
import { View, Text, Animated, StyleSheet, Dimensions } from 'react-native';
import { DARK_THEME } from '@/theme';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface TrendDataPoint {
  date: string;
  value: number;
}

interface TrendLineChartProps {
  data?: TrendDataPoint[];
  label: string;
  schoolColor: string;
}

// -----------------------------------------------------------------------------
// Default mock data generator
// -----------------------------------------------------------------------------

function generateMockTrendData(): TrendDataPoint[] {
  const points: TrendDataPoint[] = [];
  const baseValue = 50;
  let current = baseValue;

  for (let i = 13; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i * 2);
    // Random walk with upward bias
    current = Math.max(10, Math.min(100, current + (Math.random() - 0.35) * 15));
    points.push({
      date: `${d.getMonth() + 1}/${d.getDate()}`,
      value: Math.round(current),
    });
  }

  return points;
}

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
// Constants
// -----------------------------------------------------------------------------

const CHART_HEIGHT = 160;
const DOT_SIZE = 8;
const CHART_PADDING_LEFT = 32;
const CHART_PADDING_RIGHT = 8;

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

/**
 * Simple trend visualization showing values over time as vertical bars
 * with dots at their peaks, school-colored. Uses Animated for entrance
 * effect on the bars. Includes date labels on the x-axis and value
 * labels on the y-axis.
 */
export default function TrendLineChart({
  data,
  label,
  schoolColor,
}: TrendLineChartProps) {
  const chartData = data ?? generateMockTrendData();
  const screenWidth = Dimensions.get('window').width;
  const chartWidth = screenWidth - 32 - 32 - CHART_PADDING_LEFT - CHART_PADDING_RIGHT;

  // Find min/max for scaling
  const values = chartData.map((d) => d.value);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const valueRange = maxValue - minValue || 1;

  // Entrance animation
  const animatedHeight = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    animatedHeight.setValue(0);
    Animated.timing(animatedHeight, {
      toValue: 1,
      duration: 800,
      useNativeDriver: false,
    }).start();
  }, [animatedHeight]);

  const barSpacing = chartData.length > 0 ? chartWidth / chartData.length : 0;
  const barWidth = Math.max(4, barSpacing * 0.5);

  // Y-axis labels (5 levels)
  const yLabels: number[] = [];
  for (let i = 0; i <= 4; i++) {
    yLabels.push(Math.round(minValue + (valueRange * i) / 4));
  }

  return (
    <View style={styles.container}>
      {/* Chart label */}
      <Text style={styles.label}>{label}</Text>

      <View style={styles.chartArea}>
        {/* Y-axis labels */}
        <View style={styles.yAxis}>
          {[...yLabels].reverse().map((val, i) => (
            <Text key={`y-${i}`} style={styles.yLabel}>
              {val}
            </Text>
          ))}
        </View>

        {/* Chart body */}
        <View style={styles.chartBody}>
          {/* Horizontal grid lines */}
          {[0, 1, 2, 3, 4].map((i) => (
            <View
              key={`grid-${i}`}
              style={[
                styles.gridLine,
                { top: (i / 4) * CHART_HEIGHT },
              ]}
            />
          ))}

          {/* Bars + dots */}
          {chartData.map((point, index) => {
            const normalizedValue = (point.value - minValue) / valueRange;
            const barHeight = normalizedValue * CHART_HEIGHT;
            const xPos = index * barSpacing + (barSpacing - barWidth) / 2;

            return (
              <View
                key={`bar-${index}`}
                style={[
                  styles.barContainer,
                  {
                    left: xPos,
                    bottom: 0,
                    width: barWidth,
                    height: CHART_HEIGHT,
                  },
                ]}
              >
                {/* Bar */}
                <Animated.View
                  style={[
                    styles.bar,
                    {
                      backgroundColor: hexToRgba(schoolColor, 0.6),
                      width: barWidth,
                      height: animatedHeight.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, barHeight],
                      }),
                    },
                  ]}
                />

                {/* Dot at top of bar */}
                <Animated.View
                  style={[
                    styles.dot,
                    {
                      backgroundColor: schoolColor,
                      bottom: animatedHeight.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, barHeight - DOT_SIZE / 2],
                      }),
                      left: (barWidth - DOT_SIZE) / 2,
                    },
                  ]}
                />
              </View>
            );
          })}
        </View>
      </View>

      {/* X-axis date labels (show every other label to avoid crowding) */}
      <View style={[styles.xAxis, { paddingLeft: CHART_PADDING_LEFT }]}>
        {chartData.map((point, index) => {
          const showLabel = index % 2 === 0 || index === chartData.length - 1;
          return (
            <View
              key={`x-${index}`}
              style={[styles.xLabelContainer, { width: barSpacing }]}
            >
              {showLabel && (
                <Text style={styles.xLabel}>{point.date}</Text>
              )}
            </View>
          );
        })}
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
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: DARK_THEME.bg300,
    marginBottom: 16,
  },
  chartArea: {
    flexDirection: 'row',
    height: CHART_HEIGHT,
  },
  yAxis: {
    width: CHART_PADDING_LEFT,
    justifyContent: 'space-between',
    paddingRight: 6,
  },
  yLabel: {
    fontSize: 10,
    fontWeight: '500',
    color: DARK_THEME.bg500,
    textAlign: 'right',
  },
  chartBody: {
    flex: 1,
    height: CHART_HEIGHT,
    position: 'relative',
    overflow: 'hidden',
  },
  gridLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: DARK_THEME.bg700,
  },
  barContainer: {
    position: 'absolute',
    justifyContent: 'flex-end',
  },
  bar: {
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  dot: {
    position: 'absolute',
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    borderWidth: 2,
    borderColor: DARK_THEME.bg800,
  },
  xAxis: {
    flexDirection: 'row',
    marginTop: 8,
  },
  xLabelContainer: {
    alignItems: 'center',
  },
  xLabel: {
    fontSize: 9,
    fontWeight: '500',
    color: DARK_THEME.bg500,
  },
});

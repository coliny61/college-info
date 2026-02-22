import React, { useRef, useEffect } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { DARK_THEME } from '@/theme';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

type ViewMode = 'recruit' | 'parent' | 'combined';

interface EngagementScoreCardProps {
  schoolName: string;
  recruitScore: number;
  parentScore: number;
  combinedScore: number;
  viewMode: ViewMode;
  schoolColor: string;
}

// -----------------------------------------------------------------------------
// View mode labels
// -----------------------------------------------------------------------------

const VIEW_MODE_LABELS: Record<ViewMode, string> = {
  recruit: 'Recruit Engagement',
  parent: 'Parent Engagement',
  combined: 'Combined Engagement',
};

// Mock trend data per view mode
const MOCK_TRENDS: Record<ViewMode, { direction: 'up' | 'down'; value: number }> = {
  recruit: { direction: 'up', value: 12 },
  parent: { direction: 'up', value: 8 },
  combined: { direction: 'up', value: 10 },
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

/**
 * Large circular score indicator with school-colored background at opacity
 * proportional to the engagement score. Displays the active score prominently
 * in the center with a view mode label and trend indicator below.
 */
export default function EngagementScoreCard({
  schoolName,
  recruitScore,
  parentScore,
  combinedScore,
  viewMode,
  schoolColor,
}: EngagementScoreCardProps) {
  const activeScore =
    viewMode === 'recruit'
      ? recruitScore
      : viewMode === 'parent'
        ? parentScore
        : combinedScore;

  const trend = MOCK_TRENDS[viewMode];

  // Animate the score number on mount and viewMode change
  const animatedScale = useRef(new Animated.Value(0.8)).current;
  const animatedOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    animatedScale.setValue(0.8);
    animatedOpacity.setValue(0);
    Animated.parallel([
      Animated.spring(animatedScale, {
        toValue: 1,
        useNativeDriver: true,
        tension: 120,
        friction: 14,
      }),
      Animated.timing(animatedOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, [viewMode, animatedScale, animatedOpacity]);

  // Circle background opacity scales with score (0 = 0.1 opacity, 100 = 0.6 opacity)
  const circleOpacity = 0.1 + (activeScore / 100) * 0.5;

  return (
    <View style={styles.container}>
      {/* School name header */}
      <Text style={styles.schoolName}>{schoolName}</Text>

      {/* Circular score indicator */}
      <Animated.View
        style={[
          styles.scoreCircle,
          {
            transform: [{ scale: animatedScale }],
            opacity: animatedOpacity,
          },
        ]}
      >
        {/* Background circle with school color at dynamic opacity */}
        <View
          style={[
            styles.circleBackground,
            { backgroundColor: schoolColor, opacity: circleOpacity },
          ]}
        />
        {/* Ring border */}
        <View
          style={[
            styles.circleRing,
            { borderColor: schoolColor },
          ]}
        />
        {/* Score number */}
        <Text style={styles.scoreText}>{activeScore}</Text>
        <Text style={styles.scoreLabel}>/ 100</Text>
      </Animated.View>

      {/* View mode label */}
      <Text style={styles.viewModeLabel}>{VIEW_MODE_LABELS[viewMode]}</Text>

      {/* Trend indicator */}
      <View style={styles.trendRow}>
        <Text
          style={[
            styles.trendIcon,
            {
              color:
                trend.direction === 'up'
                  ? DARK_THEME.success
                  : DARK_THEME.error,
            },
          ]}
        >
          {trend.direction === 'up' ? '\u2191' : '\u2193'}
        </Text>
        <Text
          style={[
            styles.trendValue,
            {
              color:
                trend.direction === 'up'
                  ? DARK_THEME.success
                  : DARK_THEME.error,
            },
          ]}
        >
          {trend.value}% vs last week
        </Text>
      </View>

      {/* All three scores at a glance */}
      <View style={styles.breakdownRow}>
        <View style={styles.breakdownItem}>
          <Text style={[styles.breakdownValue, viewMode === 'recruit' && { color: schoolColor }]}>
            {recruitScore}
          </Text>
          <Text style={styles.breakdownLabel}>Recruit</Text>
        </View>
        <View style={[styles.breakdownDivider, { backgroundColor: DARK_THEME.bg700 }]} />
        <View style={styles.breakdownItem}>
          <Text style={[styles.breakdownValue, viewMode === 'parent' && { color: schoolColor }]}>
            {parentScore}
          </Text>
          <Text style={styles.breakdownLabel}>Parent</Text>
        </View>
        <View style={[styles.breakdownDivider, { backgroundColor: DARK_THEME.bg700 }]} />
        <View style={styles.breakdownItem}>
          <Text style={[styles.breakdownValue, viewMode === 'combined' && { color: schoolColor }]}>
            {combinedScore}
          </Text>
          <Text style={styles.breakdownLabel}>Combined</Text>
        </View>
      </View>
    </View>
  );
}

// -----------------------------------------------------------------------------
// Styles
// -----------------------------------------------------------------------------

const CIRCLE_SIZE = 160;

const styles = StyleSheet.create({
  container: {
    backgroundColor: DARK_THEME.bg800,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: DARK_THEME.bg700,
  },
  schoolName: {
    fontSize: 14,
    fontWeight: '600',
    color: DARK_THEME.bg400,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 20,
  },
  scoreCircle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  circleBackground: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: CIRCLE_SIZE / 2,
  },
  circleRing: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: CIRCLE_SIZE / 2,
    borderWidth: 4,
  },
  scoreText: {
    fontSize: 52,
    fontWeight: '800',
    color: DARK_THEME.white,
  },
  scoreLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: DARK_THEME.bg400,
    marginTop: -4,
  },
  viewModeLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: DARK_THEME.bg200,
    marginTop: 16,
  },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  trendIcon: {
    fontSize: 18,
    fontWeight: '700',
    marginRight: 4,
  },
  trendValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  breakdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: DARK_THEME.bg700,
    width: '100%',
    justifyContent: 'center',
  },
  breakdownItem: {
    alignItems: 'center',
    flex: 1,
  },
  breakdownValue: {
    fontSize: 22,
    fontWeight: '700',
    color: DARK_THEME.bg300,
  },
  breakdownLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: DARK_THEME.bg500,
    textTransform: 'uppercase',
    marginTop: 2,
  },
  breakdownDivider: {
    width: 1,
    height: 32,
  },
});

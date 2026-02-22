import React, { useEffect, useRef } from 'react';
import { Animated, type ViewStyle, type DimensionValue } from 'react-native';

// =============================================================================
// Skeleton — Pulsing loading placeholder
// =============================================================================

interface SkeletonProps {
  width: DimensionValue;
  height: number;
  borderRadius?: number;
  style?: ViewStyle;
}

/**
 * Pulsing skeleton placeholder.
 * Opacity oscillates between 0.3 and 0.7 continuously.
 */
export default function Skeleton({
  width,
  height,
  borderRadius = 8,
  style,
}: SkeletonProps) {
  const pulse = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 0.7,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, [pulse]);

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius,
          backgroundColor: '#334155',
          opacity: pulse,
        },
        style,
      ]}
    />
  );
}

// ---------------------------------------------------------------------------
// Preset: SkeletonCard
// ---------------------------------------------------------------------------

interface SkeletonCardProps {
  style?: ViewStyle;
}

/**
 * A card-shaped skeleton placeholder (full width, 100px tall, 12px radius).
 */
export function SkeletonCard({ style }: SkeletonCardProps) {
  return (
    <Skeleton
      width="100%"
      height={100}
      borderRadius={12}
      style={style}
    />
  );
}

// ---------------------------------------------------------------------------
// Preset: SkeletonText
// ---------------------------------------------------------------------------

interface SkeletonTextProps {
  width?: DimensionValue;
  style?: ViewStyle;
}

/**
 * A text-line-shaped skeleton placeholder (default 60% width, 14px tall).
 */
export function SkeletonText({ width = '60%', style }: SkeletonTextProps) {
  return (
    <Skeleton
      width={width}
      height={14}
      borderRadius={4}
      style={style}
    />
  );
}

import React, { useEffect, useRef } from 'react';
import { Animated, type ViewStyle } from 'react-native';

// =============================================================================
// AnimatedEntry — Reusable entrance animation wrapper
// =============================================================================

type Direction = 'up' | 'down' | 'left' | 'right' | 'fade';

interface AnimatedEntryProps {
  children: React.ReactNode;
  /** Delay in ms before animation starts (useful for staggering) */
  delay?: number;
  /** Direction the element slides in from */
  direction?: Direction;
  /** Duration of the animation in ms */
  duration?: number;
  /** Optional additional styles */
  style?: ViewStyle;
}

/** Returns the initial translateX/Y offset for the given direction. */
function getInitialOffset(direction: Direction): { x: number; y: number } {
  switch (direction) {
    case 'up':
      return { x: 0, y: 24 };
    case 'down':
      return { x: 0, y: -24 };
    case 'left':
      return { x: 24, y: 0 };
    case 'right':
      return { x: -24, y: 0 };
    case 'fade':
      return { x: 0, y: 0 };
  }
}

export default function AnimatedEntry({
  children,
  delay = 0,
  direction = 'up',
  duration = 400,
  style,
}: AnimatedEntryProps) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translate = useRef(new Animated.Value(0)).current;

  const offset = getInitialOffset(direction);
  const translateAxis = direction === 'left' || direction === 'right' ? 'x' : 'y';
  const initialTranslate =
    translateAxis === 'x' ? offset.x : offset.y;

  useEffect(() => {
    // Set initial position
    translate.setValue(initialTranslate);

    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration,
          useNativeDriver: true,
        }),
        Animated.timing(translate, {
          toValue: 0,
          duration,
          useNativeDriver: true,
        }),
      ]).start();
    }, delay);

    return () => clearTimeout(timer);
    // Run only on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const transform =
    direction === 'fade'
      ? []
      : translateAxis === 'x'
        ? [{ translateX: translate }]
        : [{ translateY: translate }];

  return (
    <Animated.View style={[{ opacity, transform }, style]}>
      {children}
    </Animated.View>
  );
}

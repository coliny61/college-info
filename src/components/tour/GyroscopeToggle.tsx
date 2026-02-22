// =============================================================================
// GyroscopeToggle - Floating Gyroscope Control Button
// College Visit Platform
// =============================================================================
// A floating action button that toggles gyroscope-based panorama navigation.
// Uses expo-sensors Gyroscope subscription when enabled. Falls back gracefully
// when the device does not support gyroscope input (e.g., simulator or older
// hardware) by displaying an unavailability message.
// =============================================================================

import React, { useEffect, useRef, useCallback, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Platform,
} from 'react-native';
import { Gyroscope } from 'expo-sensors';
import { DARK_THEME } from '@/theme';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface GyroscopeToggleProps {
  /** Whether gyroscope control is currently enabled. */
  enabled: boolean;
  /** Callback to toggle gyroscope state on/off. */
  onToggle: () => void;
  /** School brand color for the active state. */
  schoolColor?: string;
  /** Callback to pass gyroscope data to the panorama viewer. */
  onGyroscopeData?: (data: { x: number; y: number; z: number }) => void;
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

/**
 * Floating button that toggles gyroscope-driven camera control for the
 * panorama viewer. When activated, subscribes to the device gyroscope at
 * 60 Hz and forwards rotation data to the parent via `onGyroscopeData`.
 *
 * Placement: Absolutely positioned in the top-right corner of the panorama
 * viewport. The parent component must have `position: 'relative'` or be the
 * direct container.
 */
export default function GyroscopeToggle({
  enabled,
  onToggle,
  schoolColor = DARK_THEME.accent,
  onGyroscopeData,
}: GyroscopeToggleProps) {
  // ---------------------------------------------------------------------------
  // State
  // ---------------------------------------------------------------------------

  const [available, setAvailable] = useState<boolean | null>(null);
  const [showToast, setShowToast] = useState(false);
  const toastOpacity = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // ---------------------------------------------------------------------------
  // Gyroscope Availability Check
  // ---------------------------------------------------------------------------

  useEffect(() => {
    let mounted = true;

    Gyroscope.isAvailableAsync().then((isAvailable) => {
      if (mounted) {
        setAvailable(isAvailable);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  // ---------------------------------------------------------------------------
  // Gyroscope Subscription
  // ---------------------------------------------------------------------------

  useEffect(() => {
    if (!enabled || !available) return;

    // Set update interval to ~60fps (16ms)
    Gyroscope.setUpdateInterval(16);

    const subscription = Gyroscope.addListener((data) => {
      onGyroscopeData?.(data);
    });

    return () => {
      subscription.remove();
    };
  }, [enabled, available, onGyroscopeData]);

  // ---------------------------------------------------------------------------
  // Pulse Animation (when active)
  // ---------------------------------------------------------------------------

  useEffect(() => {
    if (enabled && available) {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.15,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ]),
      );
      pulse.start();
      return () => pulse.stop();
    } else {
      pulseAnim.setValue(1);
    }
  }, [enabled, available, pulseAnim]);

  // ---------------------------------------------------------------------------
  // Toast Animation
  // ---------------------------------------------------------------------------

  const showUnavailableToast = useCallback(() => {
    setShowToast(true);
    Animated.sequence([
      Animated.timing(toastOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(toastOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => setShowToast(false));
  }, [toastOpacity]);

  // ---------------------------------------------------------------------------
  // Handlers
  // ---------------------------------------------------------------------------

  const handlePress = useCallback(() => {
    if (available === false) {
      showUnavailableToast();
      return;
    }
    onToggle();
  }, [available, onToggle, showUnavailableToast]);

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  // Don't render until availability check completes on native;
  // on web, gyroscope is usually unavailable so render immediately.
  if (available === null && Platform.OS !== 'web') {
    return null;
  }

  const isActive = enabled && available === true;

  return (
    <View style={styles.wrapper}>
      {/* Unavailability Toast */}
      {showToast && (
        <Animated.View style={[styles.toast, { opacity: toastOpacity }]}>
          <Text style={styles.toastText}>Gyroscope not available</Text>
        </Animated.View>
      )}

      {/* Toggle Button */}
      <Animated.View
        style={[
          styles.buttonOuter,
          isActive && { transform: [{ scale: pulseAnim }] },
        ]}
      >
        <TouchableOpacity
          style={[
            styles.button,
            isActive
              ? { backgroundColor: schoolColor }
              : styles.buttonInactive,
            available === false && styles.buttonDisabled,
          ]}
          onPress={handlePress}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel={
            isActive ? 'Disable gyroscope control' : 'Enable gyroscope control'
          }
          accessibilityState={{ selected: isActive }}
        >
          {/* Gyroscope icon — compass-like symbol */}
          <Text
            style={[
              styles.icon,
              isActive && styles.iconActive,
              available === false && styles.iconDisabled,
            ]}
          >
            {'\u29BF'}
          </Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Active label */}
      {isActive && (
        <View style={[styles.activeLabel, { backgroundColor: schoolColor }]}>
          <Text style={styles.activeLabelText}>GYRO</Text>
        </View>
      )}
    </View>
  );
}

// -----------------------------------------------------------------------------
// Styles
// -----------------------------------------------------------------------------

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 12,
    right: 12,
    alignItems: 'center',
    zIndex: 10,
  },
  toast: {
    position: 'absolute',
    top: -40,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    minWidth: 180,
    alignItems: 'center',
  },
  toastText: {
    color: DARK_THEME.warning,
    fontSize: 12,
    fontWeight: '600',
  },
  buttonOuter: {
    borderRadius: 22,
  },
  button: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: DARK_THEME.bg800,
    borderWidth: 1.5,
    borderColor: DARK_THEME.bg600,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  buttonInactive: {
    backgroundColor: DARK_THEME.bg800,
  },
  buttonDisabled: {
    opacity: 0.5,
    borderColor: DARK_THEME.bg700,
  },
  icon: {
    fontSize: 22,
    color: DARK_THEME.bg300,
  },
  iconActive: {
    color: DARK_THEME.white,
  },
  iconDisabled: {
    color: DARK_THEME.bg500,
  },
  activeLabel: {
    marginTop: 4,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  activeLabelText: {
    color: DARK_THEME.white,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});

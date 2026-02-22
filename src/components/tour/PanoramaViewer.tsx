// =============================================================================
// PanoramaViewer - Simulated 360-degree Panorama Viewer
// College Visit Platform
// =============================================================================
// Renders a panoramic image with PanResponder-based panning and pinch-to-zoom.
// This is a prototype implementation using Animated transforms; a full Three.js
// WebView-based viewer will replace it in a future release.
// =============================================================================

import React, { useRef, useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  PanResponder,
  Animated,
  Platform,
} from 'react-native';
import { DARK_THEME } from '@/theme';
import type { Hotspot } from '@/types';

// -----------------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------------

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

/** Sensitivity multiplier for pan gestures. */
const PAN_SENSITIVITY = 0.4;

/** Minimum zoom scale factor. */
const MIN_SCALE = 1.0;

/** Maximum zoom scale factor. */
const MAX_SCALE = 3.0;

/** Default field-of-view equivalent (used to compute initial scale). */
const DEFAULT_FOV = 75;

/** Minimum FOV (maximum zoom-in). */
const MIN_FOV = 30;

/** Maximum FOV (maximum zoom-out). */
const MAX_FOV = 110;

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface PanoramaViewerProps {
  /** URL of the equirectangular panoramic image. */
  panoramaUrl: string;
  /** Interactive hotspots within this panorama. */
  hotspots?: Hotspot[];
  /** Callback when a hotspot is tapped. */
  onHotspotPress?: (hotspot: Hotspot) => void;
  /** School brand color for accent elements. */
  schoolColor?: string;
  /** Whether gyroscope control is active (reserved for future use). */
  showGyroscope?: boolean;
}

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

/**
 * Clamp a value between a minimum and maximum.
 */
function clamp(value: number, min: number, max: number): number {
  'worklet';
  return Math.min(Math.max(value, min), max);
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

/**
 * Simulated 360-degree panorama viewer.
 *
 * Renders the panoramic image at a larger-than-viewport size and allows the
 * user to pan (drag) and pinch-to-zoom to explore the scene. The image wraps
 * horizontally when the user pans past the edges, creating a seamless looping
 * effect.
 *
 * Note: Full 360 powered by Three.js coming in next release.
 */
export default function PanoramaViewer({
  panoramaUrl,
  hotspots = [],
  onHotspotPress,
  schoolColor = DARK_THEME.accent,
  showGyroscope = false,
}: PanoramaViewerProps) {
  // ---------------------------------------------------------------------------
  // State
  // ---------------------------------------------------------------------------

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // ---------------------------------------------------------------------------
  // Animated Values
  // ---------------------------------------------------------------------------

  /** The panoramic image is rendered at 2x screen width to allow panning. */
  const imageWidth = SCREEN_WIDTH * 3;
  const imageHeight = SCREEN_HEIGHT;

  /** Cumulative translation offsets. */
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  /** Current scale factor. */
  const scale = useRef(new Animated.Value(1)).current;

  /** Last committed offsets (for gesture continuation). */
  const lastOffset = useRef({ x: 0, y: 0, scale: 1 });

  /** Distance between two touches at the start of a pinch gesture. */
  const initialPinchDistance = useRef<number | null>(null);

  // ---------------------------------------------------------------------------
  // Pan Responder
  // ---------------------------------------------------------------------------

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,

        onPanResponderGrant: () => {
          // Snapshot current offsets so the next move is relative
          translateX.setOffset(lastOffset.current.x);
          translateY.setOffset(lastOffset.current.y);
          translateX.setValue(0);
          translateY.setValue(0);
          initialPinchDistance.current = null;
        },

        onPanResponderMove: (evt, gestureState) => {
          const touches = evt.nativeEvent.touches;

          // ---- Pinch-to-zoom (two fingers) ----
          if (touches.length >= 2) {
            const dx = touches[1].pageX - touches[0].pageX;
            const dy = touches[1].pageY - touches[0].pageY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (initialPinchDistance.current === null) {
              initialPinchDistance.current = distance;
              return;
            }

            const pinchRatio = distance / initialPinchDistance.current;
            const newScale = clamp(
              lastOffset.current.scale * pinchRatio,
              MIN_SCALE,
              MAX_SCALE,
            );
            scale.setValue(newScale);
            return;
          }

          // ---- Single-finger pan ----
          const dx = gestureState.dx * PAN_SENSITIVITY;
          const dy = gestureState.dy * PAN_SENSITIVITY;
          translateX.setValue(dx);
          translateY.setValue(dy);
        },

        onPanResponderRelease: () => {
          // Flatten offsets into the base value
          translateX.flattenOffset();
          translateY.flattenOffset();

          // Read current values for next gesture cycle
          // @ts-ignore — _value is internal but necessary here
          const currentX = (translateX as any)._value ?? 0;
          // @ts-ignore
          const currentY = (translateY as any)._value ?? 0;
          // @ts-ignore
          const currentScale = (scale as any)._value ?? 1;

          // Clamp vertical so user can't pan too far up or down
          const maxPanY = (imageHeight * currentScale - SCREEN_HEIGHT) / 2;
          const clampedY = clamp(currentY, -maxPanY, maxPanY);

          // Wrap horizontal for seamless looping
          const maxPanX = (imageWidth * currentScale - SCREEN_WIDTH) / 2;
          let clampedX = currentX;
          if (Math.abs(clampedX) > maxPanX) {
            clampedX = clampedX % maxPanX;
          }

          lastOffset.current = {
            x: clampedX,
            y: clampedY,
            scale: currentScale,
          };

          // Animate to clamped position
          Animated.parallel([
            Animated.spring(translateY, {
              toValue: clampedY,
              useNativeDriver: true,
              friction: 7,
            }),
          ]).start();
        },
      }),
    [translateX, translateY, scale, imageWidth, imageHeight],
  );

  // ---------------------------------------------------------------------------
  // Image Load Handlers
  // ---------------------------------------------------------------------------

  const handleLoadEnd = useCallback(() => {
    setLoading(false);
    setError(false);
  }, []);

  const handleLoadError = useCallback(() => {
    setLoading(false);
    setError(true);
  }, []);

  const handleRetry = useCallback(() => {
    setLoading(true);
    setError(false);
  }, []);

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <View style={styles.container}>
      {/* Panoramic Image with Pan/Zoom */}
      <View
        style={styles.viewportClip}
        {...panResponder.panHandlers}
      >
        <Animated.Image
          key={error ? 'retry' : 'panorama'}
          source={{ uri: panoramaUrl }}
          style={[
            styles.panoramaImage,
            {
              width: imageWidth,
              height: imageHeight,
              transform: [
                { translateX },
                { translateY },
                { scale },
              ],
            },
          ]}
          resizeMode="cover"
          onLoadEnd={handleLoadEnd}
          onError={handleLoadError}
        />

        {/* Upgrade Notice */}
        <View style={styles.upgradeNotice}>
          <Text style={styles.upgradeNoticeText}>
            Full 360{'\u00B0'} powered by Three.js coming in next release
          </Text>
        </View>

        {/* Drag Hint */}
        {!loading && !error && (
          <View style={styles.dragHint} pointerEvents="none">
            <Text style={styles.dragHintText}>
              {'\u2194'} Drag to explore {'\u2022'} Pinch to zoom
            </Text>
          </View>
        )}
      </View>

      {/* Loading Overlay */}
      {loading && !error && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={schoolColor} />
          <Text style={styles.loadingText}>Loading panorama...</Text>
        </View>
      )}

      {/* Error State */}
      {error && (
        <View style={styles.errorOverlay}>
          <Text style={styles.errorIcon}>{'\u26A0'}</Text>
          <Text style={styles.errorText}>Failed to load panorama</Text>
          <TouchableOpacity
            style={[styles.retryButton, { backgroundColor: schoolColor }]}
            onPress={handleRetry}
            accessibilityRole="button"
            accessibilityLabel="Retry loading panorama"
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

// -----------------------------------------------------------------------------
// Styles
// -----------------------------------------------------------------------------

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DARK_THEME.bg900,
  },
  viewportClip: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: DARK_THEME.bg900,
  },
  panoramaImage: {
    position: 'absolute',
    top: 0,
    left: -(SCREEN_WIDTH * 3 - SCREEN_WIDTH) / 2,
  },
  upgradeNotice: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  upgradeNoticeText: {
    color: DARK_THEME.bg400,
    fontSize: 10,
    fontWeight: '500',
  },
  dragHint: {
    position: 'absolute',
    bottom: 12,
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  dragHintText: {
    color: DARK_THEME.bg300,
    fontSize: 13,
    fontWeight: '500',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
  },
  loadingText: {
    color: DARK_THEME.bg300,
    fontSize: 14,
    fontWeight: '500',
    marginTop: 12,
  },
  errorOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: DARK_THEME.bg900,
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  errorText: {
    color: DARK_THEME.bg300,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  retryButton: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: DARK_THEME.white,
    fontSize: 14,
    fontWeight: '700',
  },
});

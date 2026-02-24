// =============================================================================
// PanoramaViewer - 360-degree Panorama Viewer with Flat Fallback
// College Visit Platform
// =============================================================================
// Tries the Three.js WebView-based 360 viewer first. If it fails, falls back
// to the Animated.Image pan/zoom viewer.
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
} from 'react-native';
import { DARK_THEME } from '@/theme';
import PanoramaViewer360 from './PanoramaViewer360';
import type { ImageSourcePropType } from 'react-native';
import type { Hotspot } from '@/types';

// -----------------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------------

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const PAN_SENSITIVITY = 0.4;
const MIN_SCALE = 1.0;
const MAX_SCALE = 3.0;

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface PanoramaViewerProps {
  panoramaUrl: string;
  panoramaSource?: ImageSourcePropType;
  hotspots?: Hotspot[];
  onHotspotPress?: (hotspot: Hotspot) => void;
  schoolColor?: string;
  showGyroscope?: boolean;
}

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

function clamp(value: number, min: number, max: number): number {
  'worklet';
  return Math.min(Math.max(value, min), max);
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export default function PanoramaViewer({
  panoramaUrl,
  panoramaSource,
  hotspots = [],
  onHotspotPress,
  schoolColor = DARK_THEME.accent,
  showGyroscope = false,
}: PanoramaViewerProps) {
  const [use360, setUse360] = useState(true);
  const [flatLoading, setFlatLoading] = useState(true);
  const [flatError, setFlatError] = useState(false);

  // ---------------------------------------------------------------------------
  // Try 360 viewer first
  // ---------------------------------------------------------------------------

  if (use360) {
    return (
      <PanoramaViewer360
        panoramaUrl={panoramaUrl}
        panoramaSource={panoramaSource}
        hotspots={hotspots}
        onHotspotPress={onHotspotPress}
        schoolColor={schoolColor}
        onError={() => setUse360(false)}
      />
    );
  }

  // ---------------------------------------------------------------------------
  // Flat fallback (Animated.Image pan/zoom)
  // ---------------------------------------------------------------------------

  return (
    <FlatPanoramaViewer
      panoramaUrl={panoramaUrl}
      panoramaSource={panoramaSource}
      schoolColor={schoolColor}
      loading={flatLoading}
      error={flatError}
      onLoadEnd={() => { setFlatLoading(false); setFlatError(false); }}
      onLoadError={() => { setFlatLoading(false); setFlatError(true); }}
      onRetry={() => { setFlatLoading(true); setFlatError(false); }}
    />
  );
}

// -----------------------------------------------------------------------------
// Flat Panorama Viewer (original Animated.Image)
// -----------------------------------------------------------------------------

function FlatPanoramaViewer({
  panoramaUrl,
  panoramaSource,
  schoolColor,
  loading,
  error,
  onLoadEnd,
  onLoadError,
  onRetry,
}: {
  panoramaUrl: string;
  panoramaSource?: ImageSourcePropType;
  schoolColor: string;
  loading: boolean;
  error: boolean;
  onLoadEnd: () => void;
  onLoadError: () => void;
  onRetry: () => void;
}) {
  const imageWidth = SCREEN_WIDTH * 3;
  const imageHeight = SCREEN_HEIGHT;

  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const lastOffset = useRef({ x: 0, y: 0, scale: 1 });
  const initialPinchDistance = useRef<number | null>(null);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
          translateX.setOffset(lastOffset.current.x);
          translateY.setOffset(lastOffset.current.y);
          translateX.setValue(0);
          translateY.setValue(0);
          initialPinchDistance.current = null;
        },
        onPanResponderMove: (evt, gestureState) => {
          const touches = evt.nativeEvent.touches;
          if (touches.length >= 2) {
            const dx = touches[1].pageX - touches[0].pageX;
            const dy = touches[1].pageY - touches[0].pageY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (initialPinchDistance.current === null) {
              initialPinchDistance.current = distance;
              return;
            }
            const pinchRatio = distance / initialPinchDistance.current;
            const newScale = clamp(lastOffset.current.scale * pinchRatio, MIN_SCALE, MAX_SCALE);
            scale.setValue(newScale);
            return;
          }
          translateX.setValue(gestureState.dx * PAN_SENSITIVITY);
          translateY.setValue(gestureState.dy * PAN_SENSITIVITY);
        },
        onPanResponderRelease: () => {
          translateX.flattenOffset();
          translateY.flattenOffset();
          // @ts-ignore
          const currentX = (translateX as any)._value ?? 0;
          // @ts-ignore
          const currentY = (translateY as any)._value ?? 0;
          // @ts-ignore
          const currentScale = (scale as any)._value ?? 1;
          const maxPanY = (imageHeight * currentScale - SCREEN_HEIGHT) / 2;
          const clampedY = clamp(currentY, -maxPanY, maxPanY);
          const maxPanX = (imageWidth * currentScale - SCREEN_WIDTH) / 2;
          let clampedX = currentX;
          if (Math.abs(clampedX) > maxPanX) clampedX = clampedX % maxPanX;
          lastOffset.current = { x: clampedX, y: clampedY, scale: currentScale };
          Animated.spring(translateY, { toValue: clampedY, useNativeDriver: true, friction: 7 }).start();
        },
      }),
    [translateX, translateY, scale, imageWidth, imageHeight],
  );

  return (
    <View style={styles.container}>
      <View style={styles.viewportClip} {...panResponder.panHandlers}>
        <Animated.Image
          key={error ? 'retry' : 'panorama'}
          source={panoramaSource ?? { uri: panoramaUrl }}
          style={[
            styles.panoramaImage,
            {
              width: imageWidth,
              height: imageHeight,
              transform: [{ translateX }, { translateY }, { scale }],
            },
          ]}
          resizeMode="cover"
          onLoadEnd={onLoadEnd}
          onError={onLoadError}
        />

        {/* Fallback mode badge */}
        <View style={styles.fallbackBadge}>
          <Text style={styles.fallbackBadgeText}>Flat view (fallback)</Text>
        </View>

        {!loading && !error && (
          <View style={styles.dragHint} pointerEvents="none">
            <Text style={styles.dragHintText}>
              {'\u2194'} Drag to explore {'\u2022'} Pinch to zoom
            </Text>
          </View>
        )}
      </View>

      {loading && !error && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={schoolColor} />
          <Text style={styles.loadingText}>Loading panorama...</Text>
        </View>
      )}

      {error && (
        <View style={styles.errorOverlay}>
          <Text style={styles.errorIcon}>{'\u26A0'}</Text>
          <Text style={styles.errorText}>Failed to load panorama</Text>
          <TouchableOpacity
            style={[styles.retryButton, { backgroundColor: schoolColor }]}
            onPress={onRetry}
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
  fallbackBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  fallbackBadgeText: {
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

// =============================================================================
// TourScreen - Full-Screen Virtual Tour Experience
// College Visit Platform
// =============================================================================
// Orchestrates the PanoramaViewer, HotspotOverlay, and GyroscopeToggle into
// a complete 360-degree facility tour screen. Tracks analytics events for
// tour engagement (enter, hotspot taps, duration).
// =============================================================================

import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  Platform,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { DARK_THEME } from '@/theme';
import { createEvent } from '@/services/analytics';
import { getPanoramaImage } from '@/data/panoramaImages';
import type { Facility, Hotspot } from '@/types';
import PanoramaViewer from './PanoramaViewer';
import HotspotOverlay from './HotspotOverlay';
import GyroscopeToggle from './GyroscopeToggle';

// -----------------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------------

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface TourScreenProps {
  /** The facility being viewed in the 360-degree tour. */
  facility: Facility;
  /** School brand color for themed accents. */
  schoolColor?: string;
  /** Callback to navigate back to the previous screen. */
  onBack: () => void;
  /** Callback to navigate to a different facility (via hotspot link). */
  onNavigate: (facilityId: string) => void;
  /** Current user ID for analytics attribution (optional). */
  userId?: string;
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

/**
 * Full-screen tour experience for a single facility.
 *
 * Layout (top to bottom):
 * 1. Header bar — facility name, back button, gyroscope toggle
 * 2. PanoramaViewer — occupies the majority of the viewport
 * 3. HotspotOverlay — horizontal chip bar at the bottom
 *
 * If the facility does not have a `panoramaUrl`, a placeholder is shown
 * with the facility image and a "360 Tour Coming Soon" message.
 */
export default function TourScreen({
  facility,
  schoolColor = DARK_THEME.accent,
  onBack,
  onNavigate,
  userId = 'anonymous',
}: TourScreenProps) {
  // ---------------------------------------------------------------------------
  // State
  // ---------------------------------------------------------------------------

  const [gyroscopeEnabled, setGyroscopeEnabled] = useState(false);

  /** Timestamp (ms) when the tour was entered, used for duration tracking. */
  const enterTimeRef = useRef<number>(Date.now());

  // ---------------------------------------------------------------------------
  // Analytics: Tour Enter & Duration
  // ---------------------------------------------------------------------------

  useEffect(() => {
    enterTimeRef.current = Date.now();

    createEvent(userId, 'recruit', 'facilities', 'tour_enter', {
      facilityId: facility.id,
      facilityName: facility.name,
      facilityType: facility.type,
      hasPanorama: !!facility.panoramaUrl,
    });

    return () => {
      const duration = Date.now() - enterTimeRef.current;
      createEvent(userId, 'recruit', 'facilities', 'tour_duration', {
        facilityId: facility.id,
        facilityName: facility.name,
        durationMs: duration,
      });
    };
  }, [facility.id, facility.name, facility.type, facility.panoramaUrl, userId]);

  // ---------------------------------------------------------------------------
  // Handlers
  // ---------------------------------------------------------------------------

  const handleGyroscopeToggle = useCallback(() => {
    setGyroscopeEnabled((prev) => !prev);
  }, []);

  const handleHotspotPress = useCallback(
    (hotspot: Hotspot) => {
      // Track hotspot tap
      createEvent(userId, 'recruit', 'facilities', 'hotspot_tap', {
        facilityId: facility.id,
        hotspotId: hotspot.id,
        hotspotLabel: hotspot.label,
        hasLink: !!hotspot.linkedFacilityId,
      });

      // Navigate to linked facility if one exists
      if (hotspot.linkedFacilityId) {
        onNavigate(hotspot.linkedFacilityId);
      }
    },
    [facility.id, onNavigate, userId],
  );

  const handleGyroscopeData = useCallback(
    (_data: { x: number; y: number; z: number }) => {
      // Reserved for future implementation — will pipe rotation data into
      // the PanoramaViewer to drive camera movement based on device tilt.
    },
    [],
  );

  // ---------------------------------------------------------------------------
  // Render: No Panorama Placeholder
  // ---------------------------------------------------------------------------

  if (!facility.panoramaUrl) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" />

        {/* Header */}
        <View style={[styles.header, { backgroundColor: schoolColor }]}>
          <TouchableOpacity
            onPress={onBack}
            style={styles.backButton}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Text style={styles.backArrow}>{'\u2190'}</Text>
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle} numberOfLines={1}>
              {facility.name}
            </Text>
            <Text style={styles.headerSubtitle}>Virtual Tour</Text>
          </View>
          <View style={styles.headerRight} />
        </View>

        {/* Placeholder Body */}
        <View style={styles.placeholderContainer}>
          <Image
            source={{ uri: facility.imageUrl }}
            style={styles.placeholderImage}
            resizeMode="cover"
          />
          <View style={styles.placeholderOverlay}>
            <View style={styles.placeholderBadge}>
              <Text style={styles.placeholderIcon}>{'\uD83D\uDD6E'}</Text>
              <Text style={styles.placeholderTitle}>
                360{'\u00B0'} Tour Coming Soon
              </Text>
              <Text style={styles.placeholderDescription}>
                We{'\u2019'}re capturing an immersive 360-degree panoramic tour
                of {facility.name}. Check back soon!
              </Text>
            </View>

            {/* Facility Info */}
            <View style={styles.facilityInfo}>
              <Text style={styles.facilityType}>
                {facility.type.replace(/-/g, ' ').toUpperCase()}
              </Text>
              <Text style={styles.facilityDescription} numberOfLines={3}>
                {facility.description}
              </Text>
            </View>
          </View>

          {/* Back Button at Bottom */}
          <TouchableOpacity
            style={[styles.backBottomButton, { backgroundColor: schoolColor }]}
            onPress={onBack}
            accessibilityRole="button"
            accessibilityLabel="Return to facilities"
          >
            <Text style={styles.backBottomButtonText}>
              {'\u2190'} Back to Facilities
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // ---------------------------------------------------------------------------
  // Render: Full Tour Experience
  // ---------------------------------------------------------------------------

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: schoolColor }]}>
        <TouchableOpacity
          onPress={onBack}
          style={styles.backButton}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Text style={styles.backArrow}>{'\u2190'}</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {facility.name}
          </Text>
          <Text style={styles.headerSubtitle}>
            360{'\u00B0'} Virtual Tour
          </Text>
        </View>
        <View style={styles.headerRight} />
      </View>

      {/* Panorama Viewer */}
      <View style={styles.panoramaContainer}>
        <PanoramaViewer
          panoramaUrl={facility.panoramaUrl}
          panoramaSource={getPanoramaImage(facility.id)}
          hotspots={facility.hotspots}
          onHotspotPress={handleHotspotPress}
          schoolColor={schoolColor}
          showGyroscope={gyroscopeEnabled}
        />

        {/* Gyroscope Toggle - Floating over panorama */}
        <GyroscopeToggle
          enabled={gyroscopeEnabled}
          onToggle={handleGyroscopeToggle}
          schoolColor={schoolColor}
          onGyroscopeData={handleGyroscopeData}
        />
      </View>

      {/* Hotspot Overlay */}
      <HotspotOverlay
        hotspots={facility.hotspots}
        onPress={handleHotspotPress}
        schoolColor={schoolColor}
      />
    </SafeAreaView>
  );
}

// -----------------------------------------------------------------------------
// Styles
// -----------------------------------------------------------------------------

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: DARK_THEME.bg900,
  },

  // -- Header -----------------------------------------------------------------
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 56,
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    fontSize: 24,
    fontWeight: '600',
    color: DARK_THEME.white,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: DARK_THEME.white,
    letterSpacing: 0.3,
  },
  headerSubtitle: {
    fontSize: 12,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 1,
  },
  headerRight: {
    width: 44,
  },

  // -- Panorama Container -----------------------------------------------------
  panoramaContainer: {
    flex: 1,
    position: 'relative',
  },

  // -- Placeholder (No Panorama) ----------------------------------------------
  placeholderContainer: {
    flex: 1,
    backgroundColor: DARK_THEME.bg900,
  },
  placeholderImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH * 0.56,
  },
  placeholderOverlay: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    alignItems: 'center',
  },
  placeholderBadge: {
    alignItems: 'center',
    backgroundColor: DARK_THEME.bg800,
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 20,
    width: '100%',
    borderWidth: 1,
    borderColor: DARK_THEME.bg700,
  },
  placeholderIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  placeholderTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: DARK_THEME.white,
    marginBottom: 8,
    textAlign: 'center',
  },
  placeholderDescription: {
    fontSize: 14,
    fontWeight: '400',
    color: DARK_THEME.bg400,
    textAlign: 'center',
    lineHeight: 20,
  },
  facilityInfo: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  facilityType: {
    fontSize: 11,
    fontWeight: '700',
    color: DARK_THEME.bg500,
    letterSpacing: 1,
    marginBottom: 8,
  },
  facilityDescription: {
    fontSize: 14,
    fontWeight: '400',
    color: DARK_THEME.bg300,
    textAlign: 'center',
    lineHeight: 20,
  },
  backBottomButton: {
    marginHorizontal: 24,
    marginBottom: 24,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  backBottomButtonText: {
    color: DARK_THEME.white,
    fontSize: 16,
    fontWeight: '700',
  },
});

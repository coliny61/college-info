// =============================================================================
// HotspotOverlay - Scrollable Hotspot Chip Bar
// College Visit Platform
// =============================================================================
// Displays a horizontal ScrollView of hotspot chips at the bottom of the
// panorama viewer. Each chip shows the hotspot label and a truncated
// description. Tapping a chip invokes the onPress callback to navigate to
// the linked facility or surface additional information.
// =============================================================================

import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { DARK_THEME } from '@/theme';
import type { Hotspot } from '@/types';

// -----------------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------------

const { width: SCREEN_WIDTH } = Dimensions.get('window');

/** Maximum characters shown in the chip description before truncation. */
const MAX_DESCRIPTION_LENGTH = 50;

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface HotspotOverlayProps {
  /** List of hotspots to render as chips. */
  hotspots: Hotspot[];
  /** Callback invoked when a hotspot chip is tapped. */
  onPress: (hotspot: Hotspot) => void;
  /** School brand color used for the active/selected chip state. */
  schoolColor?: string;
}

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

/**
 * Truncate a string to `maxLength` characters, appending an ellipsis if
 * the original exceeds the limit.
 */
function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '\u2026';
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

/**
 * Horizontal strip of hotspot chips overlaid at the bottom of the panorama
 * viewer. When a chip is tapped, the active state highlights it with the
 * school's brand color and the `onPress` callback fires.
 */
export default function HotspotOverlay({
  hotspots,
  onPress,
  schoolColor = DARK_THEME.accent,
}: HotspotOverlayProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const handlePress = useCallback(
    (hotspot: Hotspot) => {
      setActiveId(hotspot.id);
      onPress(hotspot);
    },
    [onPress],
  );

  if (hotspots.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* Section Label */}
      <View style={styles.labelRow}>
        <View style={[styles.labelDot, { backgroundColor: schoolColor }]} />
        <Text style={styles.labelText}>
          Points of Interest ({hotspots.length})
        </Text>
      </View>

      {/* Scrollable Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        style={styles.scrollView}
      >
        {hotspots.map((hotspot) => {
          const isActive = activeId === hotspot.id;
          const hasLink = !!hotspot.linkedFacilityId;

          return (
            <TouchableOpacity
              key={hotspot.id}
              style={[
                styles.chip,
                isActive && { backgroundColor: schoolColor },
                !isActive && styles.chipInactive,
              ]}
              onPress={() => handlePress(hotspot)}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel={`${hotspot.label}: ${hotspot.description}`}
              accessibilityHint={
                hasLink
                  ? 'Double tap to navigate to linked facility'
                  : 'Double tap to view details'
              }
            >
              {/* Navigation indicator */}
              {hasLink && (
                <Text
                  style={[
                    styles.linkIcon,
                    isActive && styles.linkIconActive,
                  ]}
                >
                  {'\u2192'}
                </Text>
              )}

              <View style={styles.chipTextContainer}>
                <Text
                  style={[
                    styles.chipLabel,
                    isActive && styles.chipLabelActive,
                  ]}
                  numberOfLines={1}
                >
                  {hotspot.label}
                </Text>
                {hotspot.description ? (
                  <Text
                    style={[
                      styles.chipDescription,
                      isActive && styles.chipDescriptionActive,
                    ]}
                    numberOfLines={1}
                  >
                    {truncate(hotspot.description, MAX_DESCRIPTION_LENGTH)}
                  </Text>
                ) : null}
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

// -----------------------------------------------------------------------------
// Styles
// -----------------------------------------------------------------------------

const styles = StyleSheet.create({
  container: {
    backgroundColor: DARK_THEME.bg900,
    paddingTop: 8,
    paddingBottom: 12,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  labelDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  labelText: {
    color: DARK_THEME.bg400,
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  scrollView: {
    flexGrow: 0,
  },
  scrollContent: {
    paddingHorizontal: 12,
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: DARK_THEME.bg800,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    maxWidth: SCREEN_WIDTH * 0.7,
    borderWidth: 1,
    borderColor: DARK_THEME.bg700,
  },
  chipInactive: {
    backgroundColor: DARK_THEME.bg800,
  },
  chipTextContainer: {
    flex: 1,
  },
  chipLabel: {
    color: DARK_THEME.white,
    fontSize: 14,
    fontWeight: '600',
  },
  chipLabelActive: {
    color: DARK_THEME.white,
  },
  chipDescription: {
    color: DARK_THEME.bg400,
    fontSize: 12,
    fontWeight: '400',
    marginTop: 2,
  },
  chipDescriptionActive: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  linkIcon: {
    color: DARK_THEME.bg500,
    fontSize: 16,
    fontWeight: '700',
    marginRight: 8,
  },
  linkIconActive: {
    color: DARK_THEME.white,
  },
});

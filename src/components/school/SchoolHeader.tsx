import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Image } from 'expo-image';
import { DARK_THEME } from '@/theme';
import type { School } from '@/types';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface SchoolHeaderProps {
  school: School;
  onBack: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

// -----------------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------------

const HEADER_HEIGHT = 250;

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

/**
 * Hero header for the school detail screen. Displays the school's hero image
 * with a gradient overlay (school primary color -> transparent), overlaid
 * back and favorite buttons, school name, mascot, and conference badge.
 */
export default function SchoolHeader({
  school,
  onBack,
  isFavorite,
  onToggleFavorite,
}: SchoolHeaderProps) {
  const { primary, secondary } = school.colors;

  return (
    <View style={styles.container}>
      {/* Background image */}
      {school.heroImageUrl ? (
        <Image
          source={{ uri: school.heroImageUrl }}
          style={StyleSheet.absoluteFillObject}
          contentFit="cover"
          placeholder={{ blurhash: 'L6PZfSi_.AyE_3t7t7R**0o#DgR4' }}
          transition={300}
        />
      ) : (
        <View
          style={[
            StyleSheet.absoluteFillObject,
            { backgroundColor: secondary },
          ]}
        />
      )}

      {/* Gradient overlay: simulated with stacked semi-transparent Views */}
      {/* Bottom band: fully opaque school primary */}
      <View
        style={[
          styles.gradientBand,
          { bottom: 0, height: '35%', backgroundColor: primary, opacity: 0.95 },
        ]}
      />
      {/* Middle band: faded school primary */}
      <View
        style={[
          styles.gradientBand,
          { bottom: '35%', height: '25%', backgroundColor: primary, opacity: 0.55 },
        ]}
      />
      {/* Upper band: subtle school primary */}
      <View
        style={[
          styles.gradientBand,
          { bottom: '60%', height: '15%', backgroundColor: primary, opacity: 0.2 },
        ]}
      />

      {/* Top bar: back + favorite */}
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={onBack}
          style={styles.iconButton}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Text style={styles.iconText}>{'\u2190'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onToggleFavorite}
          style={styles.iconButton}
          accessibilityRole="button"
          accessibilityLabel={
            isFavorite ? 'Remove from favorites' : 'Add to favorites'
          }
        >
          <Text style={styles.iconText}>
            {isFavorite ? '\u2764' : '\u2661'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Bottom info: school name, mascot, conference */}
      <View style={styles.bottomInfo}>
        <Text style={styles.schoolName}>{school.name}</Text>
        <Text style={styles.mascot}>{school.mascot}</Text>

        <View
          style={[styles.conferenceBadge, { backgroundColor: primary }]}
        >
          <Text style={styles.conferenceText}>{school.conference}</Text>
        </View>
      </View>
    </View>
  );
}

// -----------------------------------------------------------------------------
// Styles
// -----------------------------------------------------------------------------

const styles = StyleSheet.create({
  container: {
    height: HEADER_HEIGHT,
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  gradientBand: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
  topBar: {
    position: 'absolute',
    top: 48,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    color: DARK_THEME.white,
    fontSize: 22,
  },
  bottomInfo: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
  schoolName: {
    color: DARK_THEME.white,
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 0.3,
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  mascot: {
    color: DARK_THEME.bg200,
    fontSize: 16,
    fontWeight: '500',
    marginTop: 2,
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  conferenceBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 8,
  },
  conferenceText: {
    color: DARK_THEME.white,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});

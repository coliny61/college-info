import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Image } from 'expo-image';
import { DARK_THEME } from '@/theme';
import type { School } from '@/types';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface SchoolCardProps {
  school: School;
  onPress: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

// -----------------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------------

const CARD_WIDTH = (Dimensions.get('window').width - 48) / 2;
const IMAGE_HEIGHT = 120;

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

/**
 * Compact card displaying a school's hero image, name, mascot, conference,
 * and location. Renders in a two-column grid. Shows a favorite heart icon
 * in the top-right corner and the school's primary color as an accent strip
 * at the bottom edge.
 */
export default function SchoolCard({
  school,
  onPress,
  isFavorite = false,
  onToggleFavorite,
}: SchoolCardProps) {
  const primaryColor = school.colors.primary;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.85}
      accessibilityRole="button"
      accessibilityLabel={`View ${school.name}`}
    >
      {/* Hero image or colored placeholder */}
      <View style={styles.imageWrapper}>
        {school.heroImageUrl ? (
          <Image
            source={{ uri: school.heroImageUrl }}
            style={styles.heroImage}
            contentFit="cover"
            placeholder={{ blurhash: 'L6PZfSi_.AyE_3t7t7R**0o#DgR4' }}
            transition={200}
          />
        ) : (
          <View
            style={[styles.heroPlaceholder, { backgroundColor: primaryColor }]}
          >
            <Text style={styles.placeholderText}>{school.shortName}</Text>
          </View>
        )}

        {/* Favorite toggle */}
        {onToggleFavorite && (
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={(e) => {
              e.stopPropagation?.();
              onToggleFavorite();
            }}
            hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
            accessibilityRole="button"
            accessibilityLabel={
              isFavorite
                ? `Remove ${school.name} from favorites`
                : `Add ${school.name} to favorites`
            }
          >
            <Text style={styles.favoriteIcon}>
              {isFavorite ? '\u2B50' : '\u2606'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Card body */}
      <View style={styles.body}>
        <Text style={styles.schoolName} numberOfLines={1}>
          {school.name}
        </Text>

        <Text style={styles.mascot} numberOfLines={1}>
          {school.mascot}
        </Text>

        {/* Conference badge */}
        <View
          style={[styles.conferenceBadge, { backgroundColor: primaryColor }]}
        >
          <Text style={styles.conferenceText} numberOfLines={1}>
            {school.conference}
          </Text>
        </View>

        {/* Location */}
        <Text style={styles.location} numberOfLines={1}>
          {school.city}, {school.state}
        </Text>
      </View>

      {/* School color accent strip */}
      <View style={[styles.accentStrip, { backgroundColor: primaryColor }]} />
    </TouchableOpacity>
  );
}

// -----------------------------------------------------------------------------
// Styles
// -----------------------------------------------------------------------------

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: DARK_THEME.bg800,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  imageWrapper: {
    width: '100%',
    height: IMAGE_HEIGHT,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroPlaceholder: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    color: DARK_THEME.white,
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 1,
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteIcon: {
    fontSize: 18,
  },
  body: {
    padding: 12,
  },
  schoolName: {
    color: DARK_THEME.white,
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 2,
  },
  mascot: {
    color: DARK_THEME.bg400,
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 8,
  },
  conferenceBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 8,
  },
  conferenceText: {
    color: DARK_THEME.white,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  location: {
    color: DARK_THEME.bg300,
    fontSize: 12,
    fontWeight: '400',
  },
  accentStrip: {
    height: 4,
    width: '100%',
  },
});

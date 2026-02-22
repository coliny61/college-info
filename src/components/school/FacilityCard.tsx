import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { DARK_THEME } from '@/theme';
import type { Facility } from '@/types';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface FacilityCardProps {
  facility: Facility;
  onPress: () => void;
  schoolColor: string;
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

/**
 * Compact grid-friendly card for an athletic facility. Shows an image (or
 * colored placeholder), facility name, type badge, and a "View 360 Tour"
 * indicator when a panoramic URL is available.
 */
export default function FacilityCard({
  facility,
  onPress,
  schoolColor,
}: FacilityCardProps) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.85}
      accessibilityRole="button"
      accessibilityLabel={`${facility.name}${facility.panoramaUrl ? ', 360 tour available' : ''}`}
    >
      {/* Image or placeholder */}
      <View style={styles.imageWrapper}>
        {facility.imageUrl ? (
          <Image
            source={{ uri: facility.imageUrl }}
            style={styles.image}
            contentFit="cover"
            placeholder={{ blurhash: 'L6PZfSi_.AyE_3t7t7R**0o#DgR4' }}
            transition={200}
          />
        ) : (
          <View
            style={[styles.imagePlaceholder, { backgroundColor: schoolColor }]}
          >
            <Text style={styles.placeholderIcon}>{'\u{1F3DF}'}</Text>
          </View>
        )}

        {/* 360 indicator */}
        {facility.panoramaUrl && (
          <View style={styles.tourBadge}>
            <Text style={styles.tourBadgeText}>360{'\u00B0'}</Text>
          </View>
        )}
      </View>

      {/* Info */}
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {facility.name}
        </Text>
        <View style={[styles.typeBadge, { backgroundColor: schoolColor }]}>
          <Text style={styles.typeText}>{facility.type}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

// -----------------------------------------------------------------------------
// Styles
// -----------------------------------------------------------------------------

const styles = StyleSheet.create({
  card: {
    backgroundColor: DARK_THEME.bg700,
    borderRadius: 12,
    overflow: 'hidden',
    width: '48%',
    marginBottom: 12,
  },
  imageWrapper: {
    width: '100%',
    height: 100,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderIcon: {
    fontSize: 32,
  },
  tourBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  tourBadgeText: {
    color: DARK_THEME.white,
    fontSize: 10,
    fontWeight: '700',
  },
  info: {
    padding: 10,
  },
  name: {
    color: DARK_THEME.white,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
  },
  typeBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 5,
  },
  typeText: {
    color: DARK_THEME.white,
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
});

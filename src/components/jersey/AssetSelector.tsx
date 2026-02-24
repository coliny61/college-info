// =============================================================================
// AssetSelector
// College Visit Platform - Jersey Builder
// =============================================================================
// Horizontal scrollable row of selectable jersey asset options. Shows AI image
// thumbnails when available, with color circle fallback. The selected item
// shows a school-colored ring border and a checkmark overlay.
// =============================================================================

import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { DARK_THEME } from '@/theme';
import type { JerseyAsset, School } from '@/types';
import { getJerseyImage } from '@/data/jerseyAssetImages';
import { hapticFeedback } from '@/utils';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

interface AssetSelectorProps {
  assets: JerseyAsset[];
  selectedId: string;
  onSelect: (asset: JerseyAsset) => void;
  label: string;
  school: School;
}

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

function resolveAssetColor(colorLabel: string, school: School): string {
  const normalized = colorLabel.toLowerCase();
  if (normalized.includes('home')) return school.colors.primary;
  if (normalized.includes('away')) return '#FFFFFF';
  if (normalized.includes('alternate')) return school.colors.secondary;
  return school.colors.primary;
}

function swatchTextColor(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.55 ? '#000000' : '#FFFFFF';
}

// -----------------------------------------------------------------------------
// Thumbnail — AI image or color circle fallback
// -----------------------------------------------------------------------------

function AssetThumbnail({ asset, school }: { asset: JerseyAsset; school: School }) {
  const source = getJerseyImage(asset.id);
  const [failed, setFailed] = useState(false);

  if (source && !failed) {
    return (
      <Image
        source={source}
        style={styles.thumbnailImage}
        resizeMode="cover"
        onError={() => setFailed(true)}
      />
    );
  }

  // Fallback: color circle
  const color = resolveAssetColor(asset.colorLabel, school);
  return (
    <View
      style={[
        styles.colorFallback,
        {
          backgroundColor: color,
          borderColor: color === '#FFFFFF' ? DARK_THEME.bg600 : 'transparent',
          borderWidth: color === '#FFFFFF' ? 1 : 0,
        },
      ]}
    />
  );
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function AssetSelector({
  assets,
  selectedId,
  onSelect,
  label,
  school,
}: AssetSelectorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionLabel}>{label}</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {assets.map((asset) => {
          const isSelected = asset.id === selectedId;
          const color = resolveAssetColor(asset.colorLabel, school);
          const checkColor = swatchTextColor(color);

          return (
            <TouchableOpacity
              key={asset.id}
              style={styles.option}
              onPress={() => { hapticFeedback.selection(); onSelect(asset); }}
              activeOpacity={0.7}
            >
              {/* Outer ring (visible when selected) */}
              <View
                style={[
                  styles.ring,
                  isSelected && {
                    borderColor: school.colors.primary,
                    borderWidth: 3,
                  },
                ]}
              >
                {/* Thumbnail or color swatch */}
                <View style={styles.swatchContainer}>
                  <AssetThumbnail asset={asset} school={school} />
                  {isSelected && (
                    <View style={styles.checkOverlay}>
                      <Text style={[styles.checkmark, { color: checkColor }]}>
                        {'\u2713'}
                      </Text>
                    </View>
                  )}
                </View>
              </View>

              {/* Label */}
              <Text
                style={[
                  styles.optionLabel,
                  isSelected && { color: DARK_THEME.white, fontWeight: '700' },
                ]}
                numberOfLines={1}
              >
                {asset.colorLabel}
              </Text>
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
    marginBottom: 8,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: DARK_THEME.bg400,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 8,
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 16,
  },
  option: {
    alignItems: 'center',
    width: 72,
  },
  ring: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 3,
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  swatchContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  thumbnailImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  colorFallback: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  checkOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 22,
  },
  checkmark: {
    fontSize: 20,
    fontWeight: '800',
  },
  optionLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: DARK_THEME.bg300,
    textAlign: 'center',
  },
});

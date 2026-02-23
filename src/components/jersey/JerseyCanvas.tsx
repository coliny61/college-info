// =============================================================================
// JerseyCanvas
// College Visit Platform - Jersey Builder
// =============================================================================
// Renders a helmet (top), jersey (middle), and pants (bottom) using
// AI-generated PNG images from the asset registry. Falls back to styled
// colored Views when images are unavailable.
// =============================================================================

import React, { useRef, useImperativeHandle, forwardRef, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import type { ViewStyle, ImageSourcePropType } from 'react-native';
import { DARK_THEME } from '@/theme';
import type { JerseyAsset, School } from '@/types';
import { getJerseyImage } from '@/data/jerseyAssetImages';

// -----------------------------------------------------------------------------
// Props & Ref
// -----------------------------------------------------------------------------

interface JerseyCanvasProps {
  helmet: JerseyAsset;
  jersey: JerseyAsset;
  pants: JerseyAsset;
  school: School;
  style?: ViewStyle;
}

export interface JerseyCanvasRef {
  /** Reference to the root View for screenshot capture. */
  viewRef: View | null;
}

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

function resolveColor(colorLabel: string, school: School): string {
  const normalized = colorLabel.toLowerCase();
  if (normalized.includes('home')) return school.colors.primary;
  if (normalized.includes('away')) return '#FFFFFF';
  if (normalized.includes('alternate')) return school.colors.secondary;
  return school.colors.primary;
}

function accentColor(mainColor: string, school: School): string {
  if (mainColor === '#FFFFFF') return school.colors.primary;
  if (mainColor === school.colors.primary) return school.colors.secondary;
  return school.colors.primary;
}

function contrastText(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.55 ? '#000000' : '#FFFFFF';
}

function lightenColor(hex: string, amount: number): string {
  const r = Math.min(255, parseInt(hex.slice(1, 3), 16) + amount);
  const g = Math.min(255, parseInt(hex.slice(3, 5), 16) + amount);
  const b = Math.min(255, parseInt(hex.slice(5, 7), 16) + amount);
  return `rgb(${r}, ${g}, ${b})`;
}

function darkenColor(hex: string, amount: number): string {
  const r = Math.max(0, parseInt(hex.slice(1, 3), 16) - amount);
  const g = Math.max(0, parseInt(hex.slice(3, 5), 16) - amount);
  const b = Math.max(0, parseInt(hex.slice(5, 7), 16) - amount);
  return `rgb(${r}, ${g}, ${b})`;
}

// -----------------------------------------------------------------------------
// Image Piece — renders AI image or falls back to View
// -----------------------------------------------------------------------------

function ImagePiece({
  assetId,
  width,
  height,
  fallback,
}: {
  assetId: string;
  width: number;
  height: number;
  fallback: React.ReactNode;
}) {
  const source = getJerseyImage(assetId);
  const [failed, setFailed] = useState(false);

  if (!source || failed) {
    return <>{fallback}</>;
  }

  return (
    <Image
      source={source}
      style={{ width, height }}
      resizeMode="contain"
      onError={() => setFailed(true)}
    />
  );
}

// -----------------------------------------------------------------------------
// Fallback Pieces (original View-based rendering)
// -----------------------------------------------------------------------------

function HelmetFallback({ color, accent, textColor, school }: {
  color: string; accent: string; textColor: string; school: School;
}) {
  return (
    <View style={fallbackStyles.helmetWrapper}>
      <View
        style={[
          fallbackStyles.helmetShell,
          {
            backgroundColor: color,
            borderColor: color === '#FFFFFF' ? DARK_THEME.bg600 : darkenColor(color, 40),
          },
        ]}
      >
        <View style={[fallbackStyles.helmetGloss, { backgroundColor: lightenColor(color, 30) }]} />
        <View style={[fallbackStyles.helmetStripe, { backgroundColor: accent }]} />
        <Text style={[fallbackStyles.helmetLogoText, { color: textColor, opacity: 0.25 }]}>
          {school.shortName}
        </Text>
      </View>
      <View style={fallbackStyles.faceMaskContainer}>
        <View style={[fallbackStyles.faceMaskBar, { backgroundColor: DARK_THEME.bg600 }]} />
        <View style={[fallbackStyles.faceMaskBar, fallbackStyles.faceMaskBarLower, { backgroundColor: DARK_THEME.bg600 }]} />
        <View style={[fallbackStyles.faceMaskVertical, { backgroundColor: DARK_THEME.bg600 }]} />
      </View>
    </View>
  );
}

function JerseyFallback({ color, accent, textColor, school }: {
  color: string; accent: string; textColor: string; school: School;
}) {
  return (
    <View style={fallbackStyles.jerseyWrapper}>
      <View
        style={[
          fallbackStyles.jerseyBody,
          {
            backgroundColor: color,
            borderColor: color === '#FFFFFF' ? DARK_THEME.bg600 : darkenColor(color, 30),
          },
        ]}
      >
        <View style={fallbackStyles.collarWrapper}>
          <View style={[fallbackStyles.collar, { backgroundColor: accent }]} />
        </View>
        <View style={[fallbackStyles.shoulderStripeLeft, { backgroundColor: accent, opacity: 0.7 }]} />
        <View style={[fallbackStyles.shoulderStripeRight, { backgroundColor: accent, opacity: 0.7 }]} />
        <View style={[fallbackStyles.stitchLineLeft, { borderColor: accent, opacity: 0.2 }]} />
        <View style={[fallbackStyles.stitchLineRight, { borderColor: accent, opacity: 0.2 }]} />
        <Text style={[fallbackStyles.jerseyNumber, { color: textColor }]}>1</Text>
        <Text
          style={[fallbackStyles.schoolName, { color: textColor, opacity: 0.85 }]}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {school.name.toUpperCase()}
        </Text>
        <View style={[fallbackStyles.hemStripe, { backgroundColor: accent, opacity: 0.5 }]} />
      </View>
      <View
        style={[
          fallbackStyles.sleeveLeft,
          {
            backgroundColor: color,
            borderColor: color === '#FFFFFF' ? DARK_THEME.bg600 : darkenColor(color, 30),
          },
        ]}
      >
        <View style={[fallbackStyles.sleeveStripe, { backgroundColor: accent, opacity: 0.6 }]} />
      </View>
      <View
        style={[
          fallbackStyles.sleeveRight,
          {
            backgroundColor: color,
            borderColor: color === '#FFFFFF' ? DARK_THEME.bg600 : darkenColor(color, 30),
          },
        ]}
      >
        <View style={[fallbackStyles.sleeveStripe, { backgroundColor: accent, opacity: 0.6 }]} />
      </View>
    </View>
  );
}

function PantsFallback({ color, accent }: { color: string; accent: string }) {
  return (
    <View style={fallbackStyles.pantsWrapper}>
      <View
        style={[
          fallbackStyles.waistband,
          { backgroundColor: darkenColor(color === '#FFFFFF' ? '#E5E5E5' : color, 20) },
        ]}
      />
      <View style={fallbackStyles.pantsLegsContainer}>
        <View
          style={[
            fallbackStyles.pantsLeg,
            fallbackStyles.pantsLegLeft,
            {
              backgroundColor: color,
              borderColor: color === '#FFFFFF' ? DARK_THEME.bg600 : darkenColor(color, 30),
            },
          ]}
        >
          <View style={[fallbackStyles.pantsSideStripe, fallbackStyles.pantsSideStripeLeft, { backgroundColor: accent, opacity: 0.5 }]} />
        </View>
        <View
          style={[
            fallbackStyles.pantsLeg,
            fallbackStyles.pantsLegRight,
            {
              backgroundColor: color,
              borderColor: color === '#FFFFFF' ? DARK_THEME.bg600 : darkenColor(color, 30),
            },
          ]}
        >
          <View style={[fallbackStyles.pantsSideStripe, fallbackStyles.pantsSideStripeRight, { backgroundColor: accent, opacity: 0.5 }]} />
        </View>
      </View>
    </View>
  );
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export const JerseyCanvas = forwardRef<JerseyCanvasRef, JerseyCanvasProps>(
  function JerseyCanvas({ helmet, jersey, pants, school, style }, ref) {
    const viewRef = useRef<View>(null);

    useImperativeHandle(ref, () => ({
      get viewRef() {
        return viewRef.current;
      },
    }));

    const helmetColor = resolveColor(helmet.colorLabel, school);
    const jerseyColor = resolveColor(jersey.colorLabel, school);
    const pantsColor = resolveColor(pants.colorLabel, school);

    const helmetAccent = accentColor(helmetColor, school);
    const jerseyAccent = accentColor(jerseyColor, school);
    const pantsAccent = accentColor(pantsColor, school);

    const jerseyTextColor = contrastText(jerseyColor);
    const helmetTextColor = contrastText(helmetColor);

    return (
      <View
        ref={viewRef}
        style={[styles.canvas, style]}
        collapsable={false}
      >
        {/* Helmet */}
        <ImagePiece
          assetId={helmet.id}
          width={IMAGE_WIDTH}
          height={IMAGE_HELMET_HEIGHT}
          fallback={
            <HelmetFallback
              color={helmetColor}
              accent={helmetAccent}
              textColor={helmetTextColor}
              school={school}
            />
          }
        />

        {/* Jersey */}
        <ImagePiece
          assetId={jersey.id}
          width={IMAGE_WIDTH}
          height={IMAGE_JERSEY_HEIGHT}
          fallback={
            <JerseyFallback
              color={jerseyColor}
              accent={jerseyAccent}
              textColor={jerseyTextColor}
              school={school}
            />
          }
        />

        {/* Pants */}
        <ImagePiece
          assetId={pants.id}
          width={IMAGE_WIDTH}
          height={IMAGE_PANTS_HEIGHT}
          fallback={
            <PantsFallback color={pantsColor} accent={pantsAccent} />
          }
        />
      </View>
    );
  },
);

// -----------------------------------------------------------------------------
// Dimensions
// -----------------------------------------------------------------------------

const CANVAS_WIDTH = 200;
const IMAGE_WIDTH = 180;
const IMAGE_HELMET_HEIGHT = 80;
const IMAGE_JERSEY_HEIGHT = 140;
const IMAGE_PANTS_HEIGHT = 120;

// -----------------------------------------------------------------------------
// Styles — Main canvas
// -----------------------------------------------------------------------------

const styles = StyleSheet.create({
  canvas: {
    width: CANVAS_WIDTH,
    alignItems: 'center',
    alignSelf: 'center',
    paddingVertical: 8,
  },
});

// -----------------------------------------------------------------------------
// Fallback Styles (original View-based rendering)
// -----------------------------------------------------------------------------

const fallbackStyles = StyleSheet.create({
  // -- Helmet
  helmetWrapper: {
    width: 80,
    height: 72,
    alignItems: 'center',
    marginBottom: -4,
    zIndex: 3,
  },
  helmetShell: {
    width: 76,
    height: 62,
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderWidth: 2,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 8,
  },
  helmetGloss: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 30,
    height: 38,
    borderTopLeftRadius: 36,
    borderBottomRightRadius: 20,
    opacity: 0.25,
  },
  helmetStripe: {
    position: 'absolute',
    top: 2,
    width: 6,
    height: '85%',
    borderRadius: 3,
  },
  helmetLogoText: {
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 2,
    marginTop: 8,
  },
  faceMaskContainer: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    width: 40,
    height: 18,
  },
  faceMaskBar: {
    position: 'absolute',
    top: 4,
    left: 2,
    right: 2,
    height: 3,
    borderRadius: 1.5,
  },
  faceMaskBarLower: {
    top: 11,
  },
  faceMaskVertical: {
    position: 'absolute',
    top: 2,
    alignSelf: 'center',
    left: 18.5,
    width: 3,
    height: 14,
    borderRadius: 1.5,
  },

  // -- Jersey
  jerseyWrapper: {
    width: CANVAS_WIDTH,
    height: 140,
    alignItems: 'center',
    zIndex: 2,
  },
  jerseyBody: {
    width: 130,
    height: 130,
    borderRadius: 4,
    borderWidth: 1.5,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  collarWrapper: {
    position: 'absolute',
    top: 0,
    width: '100%',
    alignItems: 'center',
  },
  collar: {
    width: 40,
    height: 8,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  shoulderStripeLeft: {
    position: 'absolute',
    top: 6,
    left: 0,
    width: 28,
    height: 5,
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
  },
  shoulderStripeRight: {
    position: 'absolute',
    top: 6,
    right: 0,
    width: 28,
    height: 5,
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
  },
  stitchLineLeft: {
    position: 'absolute',
    left: 12,
    top: 20,
    bottom: 20,
    width: 0,
    borderLeftWidth: 1,
    borderStyle: 'dashed',
  },
  stitchLineRight: {
    position: 'absolute',
    right: 12,
    top: 20,
    bottom: 20,
    width: 0,
    borderLeftWidth: 1,
    borderStyle: 'dashed',
  },
  jerseyNumber: {
    fontSize: 52,
    fontWeight: '900',
    letterSpacing: -2,
    lineHeight: 56,
    textShadowColor: 'rgba(0,0,0,0.15)',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 2,
  },
  schoolName: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 2.5,
    marginTop: 2,
    paddingHorizontal: 8,
    textAlign: 'center',
  },
  hemStripe: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
  },

  // -- Sleeves
  sleeveLeft: {
    position: 'absolute',
    top: 10,
    left: 8,
    width: 30,
    height: 50,
    borderRadius: 4,
    borderWidth: 1.5,
    transform: [{ rotate: '12deg' }],
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  sleeveRight: {
    position: 'absolute',
    top: 10,
    right: 8,
    width: 30,
    height: 50,
    borderRadius: 4,
    borderWidth: 1.5,
    transform: [{ rotate: '-12deg' }],
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  sleeveStripe: {
    position: 'absolute',
    bottom: 6,
    left: 0,
    right: 0,
    height: 4,
  },

  // -- Pants
  pantsWrapper: {
    width: 130,
    marginTop: -6,
    alignItems: 'center',
    zIndex: 1,
  },
  waistband: {
    width: 120,
    height: 8,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    marginBottom: -1,
    zIndex: 2,
  },
  pantsLegsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 4,
    width: 120,
  },
  pantsLeg: {
    width: 52,
    height: 110,
    borderWidth: 1.5,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
  },
  pantsLegLeft: {
    borderTopLeftRadius: 4,
    borderTopRightRadius: 2,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 10,
  },
  pantsLegRight: {
    borderTopLeftRadius: 2,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 6,
  },
  pantsSideStripe: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 5,
  },
  pantsSideStripeLeft: {
    right: 4,
  },
  pantsSideStripeRight: {
    left: 4,
  },
});

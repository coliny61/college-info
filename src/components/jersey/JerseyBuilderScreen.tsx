// =============================================================================
// JerseyBuilderScreen
// College Visit Platform - Jersey Builder
// =============================================================================
// Full-screen jersey customization experience. Recruits mix-and-match helmet,
// jersey, and pants from their school's color options. The canvas takes center
// stage with asset selectors below and share/save actions at the bottom.
//
// Analytics events tracked:
//   jersey_builder_enter  — screen opened
//   asset_change          — helmet/jersey/pants selection changed
//   jersey_share          — combo shared
//   jersey_save           — combo saved to device
// =============================================================================

import React, { useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { DARK_THEME } from '@/theme';
import type { School, JerseyAsset } from '@/types';
import { useJerseyBuilder } from '@/hooks/useJerseyBuilder';
import { createEvent } from '@/services/analytics';

import { JerseyCanvas } from './JerseyCanvas';
import type { JerseyCanvasRef } from './JerseyCanvas';
import { AssetSelector } from './AssetSelector';
import { ShareButton } from './ShareButton';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

interface JerseyBuilderScreenProps {
  school: School;
  jerseyAssets: JerseyAsset[];
  onBack: () => void;
  schoolColor: string;
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function JerseyBuilderScreen({
  school,
  jerseyAssets,
  onBack,
  schoolColor,
}: JerseyBuilderScreenProps) {
  const {
    helmets,
    jerseys,
    pants,
    selectedHelmet,
    selectedJersey,
    selectedPants,
    setSelectedHelmet,
    setSelectedJersey,
    setSelectedPants,
  } = useJerseyBuilder(school.id);

  const canvasRef = useRef<JerseyCanvasRef>(null);

  // Track screen entry
  useEffect(() => {
    createEvent('current-user', 'recruit', 'jersey-builder', 'jersey_builder_enter', {
      schoolId: school.id,
    });
  }, [school.id]);

  // -- Selection handlers with analytics ------------------------------------

  const handleHelmetSelect = useCallback(
    (asset: JerseyAsset) => {
      setSelectedHelmet(asset);
      createEvent('current-user', 'recruit', 'jersey-builder', 'asset_change', {
        schoolId: school.id,
        assetType: 'helmet',
        assetId: asset.id,
        colorLabel: asset.colorLabel,
      });
    },
    [school.id, setSelectedHelmet],
  );

  const handleJerseySelect = useCallback(
    (asset: JerseyAsset) => {
      setSelectedJersey(asset);
      createEvent('current-user', 'recruit', 'jersey-builder', 'asset_change', {
        schoolId: school.id,
        assetType: 'jersey',
        assetId: asset.id,
        colorLabel: asset.colorLabel,
      });
    },
    [school.id, setSelectedJersey],
  );

  const handlePantsSelect = useCallback(
    (asset: JerseyAsset) => {
      setSelectedPants(asset);
      createEvent('current-user', 'recruit', 'jersey-builder', 'asset_change', {
        schoolId: school.id,
        assetType: 'pants',
        assetId: asset.id,
        colorLabel: asset.colorLabel,
      });
    },
    [school.id, setSelectedPants],
  );

  // -- Share / Save handlers ------------------------------------------------

  const handleShare = useCallback(() => {
    createEvent('current-user', 'recruit', 'jersey-builder', 'jersey_share', {
      schoolId: school.id,
      helmet: selectedHelmet?.colorLabel ?? '',
      jersey: selectedJersey?.colorLabel ?? '',
      pants: selectedPants?.colorLabel ?? '',
    });

    // Prototype: show confirmation alert
    // MVP: capture canvas via viewRef → imageExport → share sheet
    Alert.alert(
      'Shared!',
      `${school.name} jersey combo shared successfully.\n\nHelmet: ${selectedHelmet?.colorLabel}\nJersey: ${selectedJersey?.colorLabel}\nPants: ${selectedPants?.colorLabel}`,
    );
  }, [school, selectedHelmet, selectedJersey, selectedPants]);

  const handleSave = useCallback(() => {
    createEvent('current-user', 'recruit', 'jersey-builder', 'jersey_save', {
      schoolId: school.id,
      helmet: selectedHelmet?.colorLabel ?? '',
      jersey: selectedJersey?.colorLabel ?? '',
      pants: selectedPants?.colorLabel ?? '',
    });

    // Prototype: show confirmation alert
    // MVP: capture canvas via viewRef → imageExport → save to gallery
    Alert.alert(
      'Saved!',
      `${school.name} jersey combo saved to your device.`,
    );
  }, [school, selectedHelmet, selectedJersey, selectedPants]);

  // Guard: if no assets are available, show fallback
  if (!selectedHelmet || !selectedJersey || !selectedPants) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.fallback}>
          <Text style={styles.fallbackText}>
            No jersey assets available for {school.name}.
          </Text>
          <TouchableOpacity onPress={onBack} style={styles.fallbackButton}>
            <Text style={styles.fallbackButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />

      {/* ================================================================= */}
      {/* Header                                                            */}
      {/* ================================================================= */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={onBack}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <Text style={styles.backArrow}>{'<'}</Text>
        </TouchableOpacity>

        <View style={styles.headerTitleBlock}>
          <Text style={styles.headerTitle}>Jersey Builder</Text>
          <Text style={[styles.headerSchool, { color: schoolColor }]}>
            {school.name}
          </Text>
        </View>

        {/* Spacer to balance the back button */}
        <View style={styles.headerSpacer} />
      </View>

      {/* ================================================================= */}
      {/* Scrollable Body                                                   */}
      {/* ================================================================= */}
      <ScrollView
        style={styles.body}
        contentContainerStyle={styles.bodyContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Canvas */}
        <View style={styles.canvasContainer}>
          {/* Subtle glow behind the uniform */}
          <View
            style={[
              styles.canvasGlow,
              { backgroundColor: schoolColor, opacity: 0.08 },
            ]}
          />
          <JerseyCanvas
            ref={canvasRef}
            helmet={selectedHelmet}
            jersey={selectedJersey}
            pants={selectedPants}
            school={school}
          />
        </View>

        {/* Divider */}
        <View style={styles.divider}>
          <View style={[styles.dividerLine, { backgroundColor: schoolColor, opacity: 0.3 }]} />
          <Text style={styles.dividerText}>CUSTOMIZE</Text>
          <View style={[styles.dividerLine, { backgroundColor: schoolColor, opacity: 0.3 }]} />
        </View>

        {/* Asset Selectors */}
        <AssetSelector
          assets={helmets}
          selectedId={selectedHelmet.id}
          onSelect={handleHelmetSelect}
          label="Helmet"
          school={school}
        />

        <AssetSelector
          assets={jerseys}
          selectedId={selectedJersey.id}
          onSelect={handleJerseySelect}
          label="Jersey"
          school={school}
        />

        <AssetSelector
          assets={pants}
          selectedId={selectedPants.id}
          onSelect={handlePantsSelect}
          label="Pants"
          school={school}
        />
      </ScrollView>

      {/* ================================================================= */}
      {/* Bottom Actions                                                    */}
      {/* ================================================================= */}
      <View style={styles.bottomBar}>
        <ShareButton
          onShare={handleShare}
          onSave={handleSave}
          schoolColor={schoolColor}
        />
      </View>
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
    borderBottomWidth: 1,
    borderBottomColor: DARK_THEME.bg700,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: DARK_THEME.bg800,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: {
    fontSize: 20,
    fontWeight: '700',
    color: DARK_THEME.white,
    marginLeft: -1,
  },
  headerTitleBlock: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: DARK_THEME.white,
    letterSpacing: 0.5,
  },
  headerSchool: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 2,
    letterSpacing: 0.3,
  },
  headerSpacer: {
    width: 36,
  },

  // -- Body -------------------------------------------------------------------
  body: {
    flex: 1,
  },
  bodyContent: {
    paddingBottom: 20,
  },

  // -- Canvas -----------------------------------------------------------------
  canvasContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
    minHeight: 360,
  },
  canvasGlow: {
    position: 'absolute',
    width: 240,
    height: 340,
    borderRadius: 120,
  },

  // -- Divider ----------------------------------------------------------------
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    fontSize: 11,
    fontWeight: '700',
    color: DARK_THEME.bg500,
    letterSpacing: 2,
    paddingHorizontal: 12,
  },

  // -- Bottom Bar -------------------------------------------------------------
  bottomBar: {
    borderTopWidth: 1,
    borderTopColor: DARK_THEME.bg700,
    backgroundColor: DARK_THEME.bg900,
  },

  // -- Fallback ---------------------------------------------------------------
  fallback: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  fallbackText: {
    fontSize: 16,
    color: DARK_THEME.bg300,
    textAlign: 'center',
    marginBottom: 20,
  },
  fallbackButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: DARK_THEME.bg700,
    borderRadius: 8,
  },
  fallbackButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: DARK_THEME.white,
  },
});

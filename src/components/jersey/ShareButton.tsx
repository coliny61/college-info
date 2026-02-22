// =============================================================================
// ShareButton
// College Visit Platform - Jersey Builder
// =============================================================================
// Two-button row for sharing and saving the jersey combo image.
// Share uses school-colored primary fill; Save uses an outline style.
// =============================================================================

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DARK_THEME } from '@/theme';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

interface ShareButtonProps {
  onShare: () => void;
  onSave: () => void;
  schoolColor: string;
}

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

/**
 * Compute a contrasting text color (black or white) for the given background.
 * Uses the W3C relative luminance formula.
 */
function contrastTextColor(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.55 ? '#000000' : '#FFFFFF';
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function ShareButton({ onShare, onSave, schoolColor }: ShareButtonProps) {
  const textOnSchool = contrastTextColor(schoolColor);

  return (
    <View style={styles.container}>
      {/* Share - primary filled button */}
      <TouchableOpacity
        style={[styles.button, styles.shareButton, { backgroundColor: schoolColor }]}
        onPress={onShare}
        activeOpacity={0.8}
      >
        <Text style={[styles.icon, { color: textOnSchool }]}>{'↗'}</Text>
        <Text style={[styles.label, { color: textOnSchool }]}>Share</Text>
      </TouchableOpacity>

      {/* Save - outline button */}
      <TouchableOpacity
        style={[styles.button, styles.saveButton, { borderColor: schoolColor }]}
        onPress={onSave}
        activeOpacity={0.8}
      >
        <Text style={[styles.icon, { color: schoolColor }]}>{'⬇'}</Text>
        <Text style={[styles.label, { color: schoolColor }]}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

// -----------------------------------------------------------------------------
// Styles
// -----------------------------------------------------------------------------

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  shareButton: {
    // backgroundColor set dynamically
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  saveButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
  },
  icon: {
    fontSize: 18,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});

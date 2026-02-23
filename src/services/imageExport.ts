// =============================================================================
// Image Export Service
// College Visit Platform
// =============================================================================
// Handles exporting, sharing, and saving jersey/uniform builder images.
// Uses react-native-view-shot for View-based capture, expo-sharing for
// the native share sheet, and expo-file-system for saving.
// =============================================================================

import { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import { Paths, File as ExpoFile } from 'expo-file-system';
import { Alert } from 'react-native';
import type { View } from 'react-native';

// -----------------------------------------------------------------------------
// Public API
// -----------------------------------------------------------------------------

/**
 * Capture a screenshot of a React Native View and save to a temporary file.
 * Returns the file URI of the captured PNG.
 */
export async function exportJerseyImage(viewRef: View): Promise<string> {
  const uri = await captureRef(viewRef, {
    format: 'png',
    quality: 1,
  });

  return uri;
}

/**
 * Open the native share sheet with a jersey image.
 */
export async function shareJerseyImage(uri: string): Promise<void> {
  const isAvailable = await Sharing.isAvailableAsync();

  if (!isAvailable) {
    Alert.alert('Sharing Unavailable', 'Sharing is not available on this device.');
    return;
  }

  await Sharing.shareAsync(uri, {
    mimeType: 'image/png',
    dialogTitle: 'Share Your Jersey Design',
    UTI: 'public.png',
  });
}

/**
 * Save a jersey image to the device's documents directory.
 * Returns the saved file URI.
 */
export async function saveToGallery(uri: string): Promise<string> {
  const filename = `jersey_${Date.now()}.png`;
  const source = new ExpoFile(uri);
  const destination = new ExpoFile(Paths.document, filename);

  source.copy(destination);

  Alert.alert('Saved!', 'Jersey design saved to your device.');
  return destination.uri;
}

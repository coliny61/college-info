// =============================================================================
// Image Export Service
// College Visit Platform
// =============================================================================
// Handles exporting, sharing, and saving jersey/uniform builder images.
// For the prototype, uses Alert-based feedback. Will integrate with
// expo-file-system and expo-sharing for real export in MVP.
// =============================================================================

import * as Sharing from 'expo-sharing';
import { Alert } from 'react-native';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

/** Ref handle for a Skia canvas that supports snapshot. */
export interface SkiaCanvasRef {
  makeImageSnapshot: () => { encodeToBase64: () => string } | null;
}

// -----------------------------------------------------------------------------
// Public API
// -----------------------------------------------------------------------------

/**
 * Capture a snapshot of a Skia canvas and write it to a temporary file.
 * Prototype: returns a placeholder URI.
 */
export async function exportJerseyImage(
  skiaRef: SkiaCanvasRef,
): Promise<string> {
  const image = skiaRef.makeImageSnapshot();

  if (!image) {
    throw new Error('Failed to capture Skia canvas snapshot.');
  }

  // Prototype: return a placeholder URI
  // MVP: Use expo-file-system to write base64 to cache
  const filename = `jersey_${Date.now()}.png`;
  const fileUri = `file:///tmp/${filename}`;

  return fileUri;
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
 * Save a jersey image to the device's gallery.
 * Prototype: shows a success alert.
 */
export async function saveToGallery(uri: string): Promise<string> {
  // TODO: Replace with expo-media-library for real gallery save
  // import * as MediaLibrary from 'expo-media-library';
  // const permission = await MediaLibrary.requestPermissionsAsync();
  // if (permission.granted) {
  //   await MediaLibrary.saveToLibraryAsync(uri);
  // }

  Alert.alert('Saved!', 'Jersey design saved successfully.');
  return uri;
}

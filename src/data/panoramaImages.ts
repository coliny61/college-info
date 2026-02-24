import type { ImageSourcePropType } from 'react-native';

/**
 * Static require() map for AI-generated 360 panoramic facility images.
 * Keys match facility IDs from athletics.ts (e.g., "alabama-stadium").
 */
export const PANORAMA_IMAGES: Record<string, ImageSourcePropType> = {
  // Alabama
  'alabama-stadium': require('../../assets/360/alabama-stadium.jpg'),
  'alabama-practice': require('../../assets/360/alabama-practice.jpg'),
  'alabama-weight-room': require('../../assets/360/alabama-weight-room.jpg'),
  'alabama-locker-room': require('../../assets/360/alabama-locker-room.jpg'),

  // Oregon
  'oregon-stadium': require('../../assets/360/oregon-stadium.jpg'),
  'oregon-practice': require('../../assets/360/oregon-practice.jpg'),
  'oregon-weight-room': require('../../assets/360/oregon-weight-room.jpg'),
  'oregon-locker-room': require('../../assets/360/oregon-locker-room.jpg'),

  // Ohio State
  'ohio-state-stadium': require('../../assets/360/ohio-state-stadium.jpg'),
  'ohio-state-practice': require('../../assets/360/ohio-state-practice.jpg'),
  'ohio-state-weight-room': require('../../assets/360/ohio-state-weight-room.jpg'),
  'ohio-state-locker-room': require('../../assets/360/ohio-state-locker-room.jpg'),

  // Texas
  'texas-stadium': require('../../assets/360/texas-stadium.jpg'),
  'texas-practice': require('../../assets/360/texas-practice.jpg'),
  'texas-weight-room': require('../../assets/360/texas-weight-room.jpg'),
  'texas-locker-room': require('../../assets/360/texas-locker-room.jpg'),

  // LSU
  'lsu-stadium': require('../../assets/360/lsu-stadium.jpg'),
  'lsu-practice': require('../../assets/360/lsu-practice.jpg'),
  'lsu-weight-room': require('../../assets/360/lsu-weight-room.jpg'),
  'lsu-locker-room': require('../../assets/360/lsu-locker-room.jpg'),
};

/**
 * Remote URL map for CDN-hosted panoramic images (future use).
 */
export const PANORAMA_IMAGE_URLS: Record<string, string> = {};

/**
 * Look up a panoramic image by facility ID.
 * Tries local require() first, then remote URL fallback.
 */
export function getPanoramaImage(facilityId: string): ImageSourcePropType | undefined {
  const local = PANORAMA_IMAGES[facilityId];
  if (local) return local;

  const remoteUrl = PANORAMA_IMAGE_URLS[facilityId];
  if (remoteUrl) return { uri: remoteUrl };

  return undefined;
}

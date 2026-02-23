import type { ImageSourcePropType } from 'react-native';

/**
 * Static require() map for AI-generated jersey asset images.
 * React Native requires static imports — dynamic paths won't work.
 */
export const JERSEY_IMAGES: Record<string, ImageSourcePropType> = {
  // Alabama
  'alabama-helmet-home': require('../../assets/jersey/alabama/helmet-home.png'),
  'alabama-helmet-away': require('../../assets/jersey/alabama/helmet-away.png'),
  'alabama-helmet-alternate': require('../../assets/jersey/alabama/helmet-alternate.png'),
  'alabama-jersey-home': require('../../assets/jersey/alabama/jersey-home.png'),
  'alabama-jersey-away': require('../../assets/jersey/alabama/jersey-away.png'),
  'alabama-jersey-alternate': require('../../assets/jersey/alabama/jersey-alternate.png'),
  'alabama-pants-home': require('../../assets/jersey/alabama/pants-home.png'),
  'alabama-pants-away': require('../../assets/jersey/alabama/pants-away.png'),
  'alabama-pants-alternate': require('../../assets/jersey/alabama/pants-alternate.png'),

  // Oregon
  'oregon-helmet-home': require('../../assets/jersey/oregon/helmet-home.png'),
  'oregon-helmet-away': require('../../assets/jersey/oregon/helmet-away.png'),
  'oregon-helmet-alternate': require('../../assets/jersey/oregon/helmet-alternate.png'),
  'oregon-jersey-home': require('../../assets/jersey/oregon/jersey-home.png'),
  'oregon-jersey-away': require('../../assets/jersey/oregon/jersey-away.png'),
  'oregon-jersey-alternate': require('../../assets/jersey/oregon/jersey-alternate.png'),
  'oregon-pants-home': require('../../assets/jersey/oregon/pants-home.png'),
  'oregon-pants-away': require('../../assets/jersey/oregon/pants-away.png'),
  'oregon-pants-alternate': require('../../assets/jersey/oregon/pants-alternate.png'),

  // Ohio State
  'ohio-state-helmet-home': require('../../assets/jersey/ohio-state/helmet-home.png'),
  'ohio-state-helmet-away': require('../../assets/jersey/ohio-state/helmet-away.png'),
  'ohio-state-helmet-alternate': require('../../assets/jersey/ohio-state/helmet-alternate.png'),
  'ohio-state-jersey-home': require('../../assets/jersey/ohio-state/jersey-home.png'),
  'ohio-state-jersey-away': require('../../assets/jersey/ohio-state/jersey-away.png'),
  'ohio-state-jersey-alternate': require('../../assets/jersey/ohio-state/jersey-alternate.png'),
  'ohio-state-pants-home': require('../../assets/jersey/ohio-state/pants-home.png'),
  'ohio-state-pants-away': require('../../assets/jersey/ohio-state/pants-away.png'),
  'ohio-state-pants-alternate': require('../../assets/jersey/ohio-state/pants-alternate.png'),

  // Texas
  'texas-helmet-home': require('../../assets/jersey/texas/helmet-home.png'),
  'texas-helmet-away': require('../../assets/jersey/texas/helmet-away.png'),
  'texas-helmet-alternate': require('../../assets/jersey/texas/helmet-alternate.png'),
  'texas-jersey-home': require('../../assets/jersey/texas/jersey-home.png'),
  'texas-jersey-away': require('../../assets/jersey/texas/jersey-away.png'),
  'texas-jersey-alternate': require('../../assets/jersey/texas/jersey-alternate.png'),
  'texas-pants-home': require('../../assets/jersey/texas/pants-home.png'),
  'texas-pants-away': require('../../assets/jersey/texas/pants-away.png'),
  'texas-pants-alternate': require('../../assets/jersey/texas/pants-alternate.png'),

  // LSU
  'lsu-helmet-home': require('../../assets/jersey/lsu/helmet-home.png'),
  'lsu-helmet-away': require('../../assets/jersey/lsu/helmet-away.png'),
  'lsu-helmet-alternate': require('../../assets/jersey/lsu/helmet-alternate.png'),
  'lsu-jersey-home': require('../../assets/jersey/lsu/jersey-home.png'),
  'lsu-jersey-away': require('../../assets/jersey/lsu/jersey-away.png'),
  'lsu-jersey-alternate': require('../../assets/jersey/lsu/jersey-alternate.png'),
  'lsu-pants-home': require('../../assets/jersey/lsu/pants-home.png'),
  'lsu-pants-away': require('../../assets/jersey/lsu/pants-away.png'),
  'lsu-pants-alternate': require('../../assets/jersey/lsu/pants-alternate.png'),
};

/**
 * Look up an AI-generated jersey image by asset ID.
 * Returns undefined if the image isn't found (component should fall back to View rendering).
 */
export function getJerseyImage(assetId: string): ImageSourcePropType | undefined {
  return JERSEY_IMAGES[assetId];
}

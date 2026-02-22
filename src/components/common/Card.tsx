import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  type ViewStyle,
} from 'react-native';
import { DARK_THEME } from '@/theme';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  className?: string;
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

/**
 * Dark themed card container with rounded corners, subtle border,
 * and optional press handler. Wraps children in TouchableOpacity when
 * onPress is provided, otherwise uses a plain View.
 */
export default function Card({ children, onPress, style, className }: CardProps) {
  const combinedStyle: ViewStyle[] = [styles.card, ...(style ? [style] : [])];

  if (onPress) {
    return (
      <TouchableOpacity
        style={combinedStyle}
        onPress={onPress}
        activeOpacity={0.7}
        className={className}
        accessibilityRole="button"
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View style={combinedStyle} className={className}>
      {children}
    </View>
  );
}

// -----------------------------------------------------------------------------
// Styles
// -----------------------------------------------------------------------------

const styles = StyleSheet.create({
  card: {
    backgroundColor: DARK_THEME.bg800,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: DARK_THEME.bg700,
    padding: 16,
    // Shadow (iOS)
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    // Elevation (Android)
    elevation: 4,
  },
});

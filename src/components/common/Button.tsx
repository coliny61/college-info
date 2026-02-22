import React from 'react';
import {
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  View,
} from 'react-native';
import { DARK_THEME } from '@/theme';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  schoolColor?: string;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

// -----------------------------------------------------------------------------
// Size map
// -----------------------------------------------------------------------------

const SIZE_MAP: Record<ButtonSize, { paddingVertical: number; paddingHorizontal: number; fontSize: number }> = {
  sm: { paddingVertical: 8, paddingHorizontal: 14, fontSize: 13 },
  md: { paddingVertical: 12, paddingHorizontal: 20, fontSize: 15 },
  lg: { paddingVertical: 16, paddingHorizontal: 28, fontSize: 17 },
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

/**
 * Multi-variant button supporting school-color branding, loading state,
 * and high-contrast disabled styling per user preference.
 */
export default function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  schoolColor,
  icon,
  fullWidth = false,
}: ButtonProps) {
  const sizeTokens = SIZE_MAP[size];

  // ---- Resolve colors per variant ------------------------------------

  let backgroundColor: string;
  let textColor: string;
  let borderColor: string | undefined;
  let borderWidth = 0;

  if (disabled) {
    // HIGH CONTRAST disabled state per user preference
    backgroundColor = '#94A3B8'; // slate-400
    textColor = '#334155';       // slate-700
    borderColor = undefined;
    borderWidth = 0;
  } else {
    switch (variant) {
      case 'primary':
        backgroundColor = schoolColor ?? DARK_THEME.accent;
        textColor = DARK_THEME.white;
        break;
      case 'secondary':
        backgroundColor = DARK_THEME.bg700;
        textColor = DARK_THEME.bg200;
        break;
      case 'outline':
        backgroundColor = 'transparent';
        textColor = DARK_THEME.bg200;
        borderColor = DARK_THEME.bg500;
        borderWidth = 1.5;
        break;
      case 'ghost':
        backgroundColor = 'transparent';
        textColor = DARK_THEME.bg200;
        break;
      default:
        backgroundColor = DARK_THEME.accent;
        textColor = DARK_THEME.white;
    }
  }

  return (
    <TouchableOpacity
      style={[
        styles.base,
        {
          backgroundColor,
          paddingVertical: sizeTokens.paddingVertical,
          paddingHorizontal: sizeTokens.paddingHorizontal,
          borderColor: borderColor ?? 'transparent',
          borderWidth,
          alignSelf: fullWidth ? 'stretch' : 'auto',
        },
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading }}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={textColor}
        />
      ) : (
        <View style={styles.content}>
          {icon ? <View style={styles.iconWrapper}>{icon}</View> : null}
          <Text
            style={[
              styles.label,
              { color: textColor, fontSize: sizeTokens.fontSize },
            ]}
          >
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

// -----------------------------------------------------------------------------
// Styles
// -----------------------------------------------------------------------------

const styles = StyleSheet.create({
  base: {
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapper: {
    marginRight: 8,
  },
  label: {
    fontWeight: '600',
    textAlign: 'center',
  },
});

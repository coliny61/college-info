import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { DARK_THEME } from '@/theme';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface HeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightAction?: React.ReactNode;
  schoolColors?: {
    primary: string;
    textOnPrimary: string;
  };
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

/**
 * App header with optional back navigation and school-branded background.
 * Falls back to dark slate (#1E293B) when no schoolColors are provided.
 */
export default function Header({
  title,
  subtitle,
  showBack = false,
  onBack,
  rightAction,
  schoolColors,
}: HeaderProps) {
  const bgColor = schoolColors?.primary ?? DARK_THEME.bg800;
  const textColor = schoolColors?.textOnPrimary ?? DARK_THEME.white;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: bgColor }]}>
      <View style={styles.container}>
        {/* Left: Back button or spacer */}
        <View style={styles.leftSlot}>
          {showBack ? (
            <TouchableOpacity
              onPress={onBack}
              style={styles.backButton}
              accessibilityRole="button"
              accessibilityLabel="Go back"
            >
              <Text style={[styles.backArrow, { color: textColor }]}>
                {'\u2190'}
              </Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.spacer} />
          )}
        </View>

        {/* Center: Title & subtitle */}
        <View style={styles.centerSlot}>
          <Text
            style={[styles.title, { color: textColor }]}
            numberOfLines={1}
          >
            {title}
          </Text>
          {subtitle ? (
            <Text
              style={[styles.subtitle, { color: textColor, opacity: 0.75 }]}
              numberOfLines={1}
            >
              {subtitle}
            </Text>
          ) : null}
        </View>

        {/* Right: Custom action or spacer */}
        <View style={styles.rightSlot}>
          {rightAction ?? <View style={styles.spacer} />}
        </View>
      </View>
    </SafeAreaView>
  );
}

// -----------------------------------------------------------------------------
// Styles
// -----------------------------------------------------------------------------

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: DARK_THEME.bg800,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 56,
  },
  leftSlot: {
    width: 44,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  centerSlot: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightSlot: {
    width: 44,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  backButton: {
    padding: 4,
  },
  backArrow: {
    fontSize: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: '400',
    marginTop: 2,
  },
  spacer: {
    width: 44,
  },
});

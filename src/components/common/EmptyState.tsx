import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DARK_THEME } from '@/theme';
import Button from './Button';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface EmptyStateProps {
  title: string;
  message: string;
  icon?: string;
  action?: {
    label: string;
    onPress: () => void;
  };
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

/**
 * Centered empty-state placeholder with large icon, title, descriptive
 * message, and an optional call-to-action button.
 */
export default function EmptyState({
  title,
  message,
  icon,
  action,
}: EmptyStateProps) {
  return (
    <View style={styles.container}>
      {icon ? <Text style={styles.icon}>{icon}</Text> : null}

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>

      {action ? (
        <View style={styles.actionWrapper}>
          <Button
            title={action.label}
            onPress={action.onPress}
            variant="primary"
            size="md"
          />
        </View>
      ) : null}
    </View>
  );
}

// -----------------------------------------------------------------------------
// Styles
// -----------------------------------------------------------------------------

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingVertical: 48,
  },
  icon: {
    fontSize: 56,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: DARK_THEME.white,
    textAlign: 'center',
    marginBottom: 8,
  },
  message: {
    fontSize: 15,
    color: DARK_THEME.bg400,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 4,
  },
  actionWrapper: {
    marginTop: 20,
  },
});

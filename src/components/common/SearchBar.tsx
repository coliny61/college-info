import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import { DARK_THEME } from '@/theme';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onFocus?: () => void;
  onBlur?: () => void;
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

/**
 * Dark themed search input with a magnifying glass icon and clear button.
 * Rounded-full shape, sits on bg700 (#334155) background.
 */
export default function SearchBar({
  value,
  onChangeText,
  placeholder = 'Search...',
  onFocus,
  onBlur,
}: SearchBarProps) {
  return (
    <View style={styles.container}>
      {/* Search icon */}
      <Text style={styles.searchIcon}>{'\uD83D\uDD0D'}</Text>

      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={DARK_THEME.bg400}
        onFocus={onFocus}
        onBlur={onBlur}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
        accessibilityLabel={placeholder}
      />

      {/* Clear button — visible only when there is text */}
      {value.length > 0 ? (
        <TouchableOpacity
          onPress={() => onChangeText('')}
          style={styles.clearButton}
          accessibilityRole="button"
          accessibilityLabel="Clear search"
        >
          <Text style={styles.clearIcon}>{'\u2715'}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

// -----------------------------------------------------------------------------
// Styles
// -----------------------------------------------------------------------------

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: DARK_THEME.bg700,
    borderRadius: 9999,
    paddingHorizontal: 16,
    height: 48,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: DARK_THEME.white,
    paddingVertical: 0,
  },
  clearButton: {
    marginLeft: 8,
    padding: 4,
  },
  clearIcon: {
    fontSize: 14,
    color: DARK_THEME.bg400,
    fontWeight: '600',
  },
});

import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { DARK_THEME } from '@/theme';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface FilterDefinition {
  id: string;
  label: string;
  options: string[];
}

interface FilterPanelProps {
  filters: FilterDefinition[];
  activeFilters: Record<string, string>;
  onFilterChange: (filterId: string, value: string) => void;
  schoolColor?: string;
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

/**
 * Horizontal scrollable row of filter chips. Tapping a chip cycles through
 * the filter's options. Selected chips get the accent (or school) color;
 * unselected chips get the dark surface treatment.
 */
export default function FilterPanel({
  filters,
  activeFilters,
  onFilterChange,
  schoolColor,
}: FilterPanelProps) {
  const accentColor = schoolColor ?? DARK_THEME.accent;

  /**
   * Cycle to the next option for a given filter.
   * If no option is active, select the first. If the last option is active,
   * deselect (remove the filter).
   */
  const handlePress = (filter: FilterDefinition) => {
    const currentValue = activeFilters[filter.id];
    if (!currentValue) {
      // Nothing selected — pick the first option
      onFilterChange(filter.id, filter.options[0]);
      return;
    }
    const currentIndex = filter.options.indexOf(currentValue);
    const nextIndex = currentIndex + 1;
    if (nextIndex >= filter.options.length) {
      // Cycle past end — deselect
      onFilterChange(filter.id, '');
    } else {
      onFilterChange(filter.id, filter.options[nextIndex]);
    }
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {filters.map((filter) => {
        const isActive = Boolean(activeFilters[filter.id]);
        const chipBg = isActive ? accentColor : DARK_THEME.bg700;
        const chipTextColor = isActive ? DARK_THEME.white : DARK_THEME.bg300;

        return (
          <TouchableOpacity
            key={filter.id}
            onPress={() => handlePress(filter)}
            style={[styles.chip, { backgroundColor: chipBg }]}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityState={{ selected: isActive }}
          >
            <Text style={[styles.chipLabel, { color: chipTextColor }]}>
              {isActive ? activeFilters[filter.id] : filter.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

// -----------------------------------------------------------------------------
// Styles
// -----------------------------------------------------------------------------

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 9999,
    marginRight: 8,
  },
  chipLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
});

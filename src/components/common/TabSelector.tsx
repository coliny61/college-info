import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
  StyleSheet,
  type LayoutChangeEvent,
} from 'react-native';
import { DARK_THEME } from '@/theme';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface Tab {
  id: string;
  label: string;
}

interface TabSelectorProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  schoolColor?: string;
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

/**
 * Horizontal tab bar with animated underline indicator.
 * The active tab uses the school color (or default accent blue).
 */
export default function TabSelector({
  tabs,
  activeTab,
  onTabChange,
  schoolColor,
}: TabSelectorProps) {
  const accentColor = schoolColor ?? DARK_THEME.accent;

  // Track each tab's x-offset and width so the underline can animate.
  const tabLayouts = useRef<Record<string, { x: number; width: number }>>({}).current;
  const underlineX = useRef(new Animated.Value(0)).current;
  const underlineWidth = useRef(new Animated.Value(0)).current;

  // Animate underline when the active tab changes.
  useEffect(() => {
    const layout = tabLayouts[activeTab];
    if (layout) {
      Animated.parallel([
        Animated.spring(underlineX, {
          toValue: layout.x,
          useNativeDriver: false,
          tension: 200,
          friction: 25,
        }),
        Animated.spring(underlineWidth, {
          toValue: layout.width,
          useNativeDriver: false,
          tension: 200,
          friction: 25,
        }),
      ]).start();
    }
  }, [activeTab, tabLayouts, underlineX, underlineWidth]);

  const handleLayout = (tabId: string, e: LayoutChangeEvent) => {
    const { x, width } = e.nativeEvent.layout;
    tabLayouts[tabId] = { x, width };
    // Initialize underline position for the initially-active tab.
    if (tabId === activeTab) {
      underlineX.setValue(x);
      underlineWidth.setValue(width);
    }
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.tabRow}>
          {tabs.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <TouchableOpacity
                key={tab.id}
                onPress={() => onTabChange(tab.id)}
                onLayout={(e) => handleLayout(tab.id, e)}
                style={styles.tab}
                activeOpacity={0.7}
                accessibilityRole="tab"
                accessibilityState={{ selected: isActive }}
              >
                <Text
                  style={[
                    styles.tabLabel,
                    { color: isActive ? accentColor : DARK_THEME.bg400 },
                  ]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}

          {/* Animated underline */}
          <Animated.View
            style={[
              styles.underline,
              {
                backgroundColor: accentColor,
                left: underlineX,
                width: underlineWidth,
              },
            ]}
          />
        </View>
      </ScrollView>
    </View>
  );
}

// -----------------------------------------------------------------------------
// Styles
// -----------------------------------------------------------------------------

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: DARK_THEME.bg900,
    borderBottomWidth: 1,
    borderBottomColor: DARK_THEME.bg700,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  tabRow: {
    flexDirection: 'row',
    position: 'relative',
  },
  tab: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginRight: 4,
  },
  tabLabel: {
    fontSize: 15,
    fontWeight: '600',
  },
  underline: {
    position: 'absolute',
    bottom: 0,
    height: 3,
    borderRadius: 1.5,
  },
});

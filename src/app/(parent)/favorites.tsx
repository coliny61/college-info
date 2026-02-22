import React, { useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { SCHOOLS } from '@/data/schools';
import type { School } from '@/types';

// ---------------------------------------------------------------------------
// School Card (Favorite variant)
// ---------------------------------------------------------------------------

function FavoriteSchoolCard({ school }: { school: School }) {
  return (
    <TouchableOpacity
      style={[styles.card, { borderLeftColor: school.colors.primary }]}
      className="bg-[#1E293B] rounded-xl p-4 mb-3 mx-4 border-l-4"
      onPress={() => router.push(`/(parent)/school/${school.id}`)}
      activeOpacity={0.7}
    >
      <View className="flex-row items-center">
        <View
          style={[styles.colorDot, { backgroundColor: school.colors.primary }]}
        />
        <View className="flex-1 ml-3">
          <Text className="text-white text-lg font-bold">{school.name}</Text>
          <Text className="text-slate-400 text-sm mt-0.5">
            {school.mascot} | {school.conference}
          </Text>
          <Text className="text-slate-500 text-xs mt-1">
            {school.city}, {school.state}
          </Text>
        </View>
        <Text className="text-yellow-500 text-xl">{'\u2B50'}</Text>
      </View>
    </TouchableOpacity>
  );
}

// ---------------------------------------------------------------------------
// Parent Favorites Screen
// ---------------------------------------------------------------------------

export default function ParentFavoritesScreen() {
  const { user } = useAuth();

  const favoriteSchools = useMemo(() => {
    if (!user?.favorites?.length) return [];
    return SCHOOLS.filter((s) => user.favorites.includes(s.id));
  }, [user?.favorites]);

  return (
    <SafeAreaView className="flex-1 bg-[#0F172A]">
      {/* ------- Header ------- */}
      <View className="px-4 pt-4 pb-4">
        <Text className="text-white text-2xl font-bold">Favorites</Text>
        <Text className="text-slate-400 text-sm mt-1">
          Schools you and your recruit are interested in
        </Text>
      </View>

      {/* ------- Favorites List ------- */}
      <FlatList
        data={favoriteSchools}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <FavoriteSchoolCard school={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
        ListEmptyComponent={
          <View className="items-center justify-center py-24 px-8">
            <Text className="text-4xl mb-4">{'\u2B50'}</Text>
            <Text className="text-white text-xl font-bold text-center">
              No Favorites Yet
            </Text>
            <Text className="text-slate-400 text-sm text-center mt-2">
              Start exploring schools to add favorites
            </Text>
            <TouchableOpacity
              className="bg-blue-500 rounded-lg px-6 py-3 mt-6"
              onPress={() => router.push('/(parent)')}
              activeOpacity={0.8}
            >
              <Text className="text-white font-bold">Browse Schools</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </SafeAreaView>
  );
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = StyleSheet.create({
  card: {
    borderLeftWidth: 4,
  },
  colorDot: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

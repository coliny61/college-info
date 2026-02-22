import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { router } from 'expo-router';
import { SCHOOLS } from '@/data/schools';
import type { School } from '@/types';

// ---------------------------------------------------------------------------
// Filter Options
// ---------------------------------------------------------------------------

const CONFERENCES = ['All', 'SEC', 'Big Ten', 'Big 12', 'ACC'] as const;
const SORT_OPTIONS = ['Name', 'Ranking'] as const;

// ---------------------------------------------------------------------------
// School Card
// ---------------------------------------------------------------------------

function SchoolCard({ school }: { school: School }) {
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
        <Text className="text-slate-500 text-lg">{'\u203A'}</Text>
      </View>
    </TouchableOpacity>
  );
}

// ---------------------------------------------------------------------------
// Parent Home / Marketplace Screen
// ---------------------------------------------------------------------------

export default function ParentHomeScreen() {
  const [search, setSearch] = useState('');
  const [conference, setConference] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('Name');

  const filteredSchools = useMemo(() => {
    let result = [...SCHOOLS];

    // Filter by search
    if (search.trim()) {
      const query = search.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(query) ||
          s.shortName.toLowerCase().includes(query) ||
          s.mascot.toLowerCase().includes(query),
      );
    }

    // Filter by conference
    if (conference !== 'All') {
      result = result.filter((s) => s.conference === conference);
    }

    // Sort
    if (sortBy === 'Name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [search, conference, sortBy]);

  return (
    <SafeAreaView className="flex-1 bg-[#0F172A]">
      {/* ------- Header ------- */}
      <View className="px-4 pt-4 pb-2">
        <Text className="text-white text-2xl font-bold">Explore Schools</Text>
        <Text className="text-slate-400 text-sm mt-1">
          Review schools with your recruit
        </Text>
      </View>

      {/* ------- Search Bar ------- */}
      <View className="px-4 mb-3">
        <TextInput
          className="bg-[#334155] text-white px-4 py-3 rounded-lg text-base"
          placeholder="Search schools..."
          placeholderTextColor="#64748B"
          value={search}
          onChangeText={setSearch}
          autoCorrect={false}
        />
      </View>

      {/* ------- Conference Filter ------- */}
      <View className="px-4 mb-2">
        <FlatList
          horizontal
          data={CONFERENCES}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              className={`px-4 py-2 rounded-full mr-2 ${
                conference === item
                  ? 'bg-blue-500'
                  : 'bg-[#1E293B] border border-[#334155]'
              }`}
              onPress={() => setConference(item)}
            >
              <Text
                className={`text-sm font-semibold ${
                  conference === item ? 'text-white' : 'text-slate-400'
                }`}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* ------- Sort Toggle ------- */}
      <View className="px-4 mb-3 flex-row items-center">
        <Text className="text-slate-500 text-xs mr-2">Sort:</Text>
        {SORT_OPTIONS.map((option) => (
          <TouchableOpacity
            key={option}
            onPress={() => setSortBy(option)}
            className={`px-3 py-1 rounded-md mr-2 ${
              sortBy === option ? 'bg-[#334155]' : ''
            }`}
          >
            <Text
              className={`text-xs ${
                sortBy === option
                  ? 'text-blue-400 font-semibold'
                  : 'text-slate-500'
              }`}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ------- School List ------- */}
      <FlatList
        data={filteredSchools}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <SchoolCard school={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
        ListEmptyComponent={
          <View className="items-center justify-center py-16">
            <Text className="text-slate-500 text-base">No schools found</Text>
            <Text className="text-slate-600 text-sm mt-1">
              Try a different search or filter
            </Text>
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

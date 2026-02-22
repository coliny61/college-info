import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { SCHOOLS } from '@/data/schools';
import { COLLEGES } from '@/data/academics';
import { SPORTS, FACILITIES } from '@/data/athletics';
import { JERSEY_ASSETS } from '@/data/jerseyAssets';

// ---------------------------------------------------------------------------
// Content Section Data
// ---------------------------------------------------------------------------

interface ContentSection {
  id: string;
  title: string;
  emoji: string;
  itemCount: number;
  items: { id: string; name: string; description: string }[];
}

const CONTENT_SECTIONS: ContentSection[] = [
  {
    id: 'school-info',
    title: 'School Info',
    emoji: '\uD83C\uDFEB',
    itemCount: SCHOOLS.length,
    items: SCHOOLS.map((s) => ({
      id: s.id,
      name: s.name,
      description: `${s.mascot} | ${s.conference} | ${s.city}, ${s.state}`,
    })),
  },
  {
    id: 'academics',
    title: 'Academics',
    emoji: '\uD83C\uDF93',
    itemCount: COLLEGES.length,
    items: COLLEGES.map((c) => ({
      id: c.id,
      name: c.name,
      description: `${c.totalStudents.toLocaleString()} students`,
    })),
  },
  {
    id: 'athletics',
    title: 'Athletics',
    emoji: '\uD83C\uDFC8',
    itemCount: SPORTS.length,
    items: SPORTS.map((s) => ({
      id: s.id,
      name: `${s.name} - ${s.conference}`,
      description: `Record: ${s.record} | Coach: ${s.headCoach}`,
    })),
  },
  {
    id: 'jersey-assets',
    title: 'Jersey Assets',
    emoji: '\uD83D\uDC55',
    itemCount: JERSEY_ASSETS.length,
    items: SCHOOLS.map((s) => ({
      id: `jersey-${s.id}`,
      name: `${s.shortName} Uniforms`,
      description: `Helmet, Jersey, Pants assets`,
    })),
  },
  {
    id: '360-tours',
    title: '360 Tours',
    emoji: '\uD83C\uDFDF\uFE0F',
    itemCount: FACILITIES.filter((f) => f.panoramaUrl).length,
    items: FACILITIES.filter((f) => f.panoramaUrl).map((f) => ({
      id: f.id,
      name: f.name,
      description: `${f.type} | ${f.hotspots.length} hotspots`,
    })),
  },
];

// ---------------------------------------------------------------------------
// Content Management Screen
// ---------------------------------------------------------------------------

export default function ContentManagementScreen() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (sectionId: string) => {
    setExpandedSection((prev) => (prev === sectionId ? null : sectionId));
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0F172A]">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ------- Header ------- */}
        <View className="px-4 pt-4 pb-4">
          <Text className="text-white text-2xl font-bold">
            Content Management
          </Text>
          <Text className="text-slate-400 text-sm mt-1">
            Manage your school's visit experience content
          </Text>
        </View>

        {/* ------- Content Sections ------- */}
        {CONTENT_SECTIONS.map((section) => {
          const isExpanded = expandedSection === section.id;
          return (
            <View key={section.id} className="px-4 mb-3">
              {/* Section Card */}
              <TouchableOpacity
                className="bg-[#1E293B] rounded-xl p-4"
                onPress={() => toggleSection(section.id)}
                activeOpacity={0.7}
              >
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center flex-1">
                    <Text className="text-2xl mr-3">{section.emoji}</Text>
                    <View>
                      <Text className="text-white font-bold text-base">
                        {section.title}
                      </Text>
                      <Text className="text-slate-400 text-xs mt-0.5">
                        {section.itemCount} items
                      </Text>
                    </View>
                  </View>
                  <View className="flex-row items-center">
                    <View className="bg-blue-500/20 rounded-full px-3 py-1 mr-3">
                      <Text className="text-blue-400 text-xs font-semibold">
                        Manage
                      </Text>
                    </View>
                    <Text className="text-slate-500">
                      {isExpanded ? '\u25B2' : '\u25BC'}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>

              {/* Expanded Items List */}
              {isExpanded && (
                <View className="mt-1">
                  {section.items.map((item) => (
                    <View
                      key={item.id}
                      className="bg-[#1E293B]/50 border border-[#334155] rounded-lg p-3 mb-1 ml-4"
                    >
                      <View className="flex-row items-center justify-between">
                        <View className="flex-1">
                          <Text className="text-white text-sm font-medium">
                            {item.name}
                          </Text>
                          <Text className="text-slate-500 text-xs mt-0.5">
                            {item.description}
                          </Text>
                        </View>
                        <View className="bg-[#334155] rounded-md px-2 py-1">
                          <Text className="text-slate-400 text-xs">
                            View
                          </Text>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </View>
          );
        })}

        {/* ------- Prototype Note ------- */}
        <View className="px-4 mt-4">
          <View className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
            <Text className="text-yellow-400 text-sm font-medium">
              Prototype Mode
            </Text>
            <Text className="text-slate-400 text-xs mt-1">
              Content editing is read-only in this prototype. Full CRUD
              operations will be available in the production release.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

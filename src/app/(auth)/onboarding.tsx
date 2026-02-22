import React, { useRef, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ViewToken,
} from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ---------------------------------------------------------------------------
// Onboarding Screen
// ---------------------------------------------------------------------------

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface OnboardingSlide {
  id: string;
  icon: string;
  title: string;
  description: string;
}

const SLIDES: OnboardingSlide[] = [
  {
    id: '1',
    icon: '\uD83C\uDFC8', // Football emoji
    title: 'Your Official Visit, Digitized',
    description:
      'Experience college football programs like never before. Explore academics, athletics, and campus life \u2014 all from your phone.',
  },
  {
    id: '2',
    icon: '\uD83C\uDFDF\uFE0F', // Stadium emoji
    title: 'Immersive 360\u00B0 Campus Tours',
    description:
      'Step inside stadiums, locker rooms, and training facilities with interactive virtual tours.',
  },
  {
    id: '3',
    icon: '\uD83D\uDC55', // T-shirt emoji
    title: 'Build Your Game Day Look',
    description:
      'Mix and match helmets, jerseys, and pants to create your perfect game day uniform for any school.',
  },
];

const STORAGE_KEY = 'college_visit_onboarding_complete';

export default function OnboardingScreen() {
  const flatListRef = useRef<FlatList<OnboardingSlide>>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Track visible slide index
  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index != null) {
        setCurrentIndex(viewableItems[0].index);
      }
    },
    [],
  );

  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  // Complete onboarding and navigate to login
  const completeOnboarding = async () => {
    await AsyncStorage.setItem(STORAGE_KEY, 'true');
    router.replace('/(auth)/login');
  };

  // Advance to next slide or finish
  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      completeOnboarding();
    }
  };

  // Render a single slide
  const renderSlide = ({ item }: { item: OnboardingSlide }) => (
    <View
      style={{ width: SCREEN_WIDTH }}
      className="flex-1 items-center justify-center px-10"
    >
      <Text style={{ fontSize: 80 }} className="mb-8">
        {item.icon}
      </Text>

      <Text className="text-white text-center font-bold mb-4" style={{ fontSize: 28 }}>
        {item.title}
      </Text>

      <Text
        className="text-slate-400 text-center leading-6"
        style={{ fontSize: 16, maxWidth: 320 }}
      >
        {item.description}
      </Text>
    </View>
  );

  return (
    <View className="flex-1 bg-[#0F172A]">
      {/* ------- Skip Button ------- */}
      <View className="absolute top-16 right-6 z-10">
        <TouchableOpacity onPress={completeOnboarding} activeOpacity={0.7}>
          <Text className="text-slate-400 text-base font-medium">Skip</Text>
        </TouchableOpacity>
      </View>

      {/* ------- Slides ------- */}
      <FlatList
        ref={flatListRef}
        data={SLIDES}
        renderItem={renderSlide}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        snapToAlignment="center"
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        getItemLayout={(_, index) => ({
          length: SCREEN_WIDTH,
          offset: SCREEN_WIDTH * index,
          index,
        })}
      />

      {/* ------- Bottom Controls ------- */}
      <View className="pb-14 px-8">
        {/* Dot indicators */}
        <View className="flex-row justify-center mb-8">
          {SLIDES.map((_, index) => (
            <View
              key={index}
              className={`mx-1.5 rounded-full ${
                index === currentIndex ? 'bg-blue-500' : 'bg-slate-600'
              }`}
              style={{
                width: index === currentIndex ? 24 : 8,
                height: 8,
              }}
            />
          ))}
        </View>

        {/* Next / Get Started button */}
        <TouchableOpacity
          className="bg-blue-500 rounded-lg py-4 items-center"
          onPress={handleNext}
          activeOpacity={0.8}
        >
          <Text className="text-white text-base font-bold">
            {currentIndex === SLIDES.length - 1 ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

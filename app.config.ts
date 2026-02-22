import { ExpoConfig, ConfigContext } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "College Visit",
  slug: "college-visit",
  owner: "", // Set to your Expo account username
  version: "1.0.0",
  runtimeVersion: {
    policy: "appVersion",
  },
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "dark",
  scheme: "college-visit",
  newArchEnabled: true,
  updates: {
    url: "https://u.expo.dev/your-project-id", // Replace with your EAS project URL
  },
  splash: {
    image: "./assets/splash-icon.png",
    resizeMode: "contain",
    backgroundColor: "#0F172A",
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.collegevisit.app",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#0F172A",
    },
    package: "com.collegevisit.app",
  },
  web: {
    favicon: "./assets/favicon.png",
    bundler: "metro",
  },
  plugins: [
    "expo-router",
    "expo-font",
    [
      "expo-sensors",
      {
        motionPermission:
          "Allow College Visit to access device motion for 360° tours.",
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
});

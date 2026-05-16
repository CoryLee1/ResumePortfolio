export default {
  expo: {
    name: "Cory Receipt CV",
    slug: "cory-receipt-cv",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "dark",
    newArchEnabled: true,
    platforms: ["ios", "android"],
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#070707",
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.corylee.receiptcv",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#070707",
      },
      package: "com.corylee.receiptcv",
    },
    plugins: ["expo-asset", "expo-font"],
    extra: {
      eas: {
        projectId: "replace-with-eas-project-id",
      },
    },
  },
};

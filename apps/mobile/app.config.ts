import type { ConfigContext, ExpoConfig } from 'expo/config'
import { withSentry } from '@sentry/react-native/expo'

const updateUrl = process.env.EXPO_UPDATE_URL ?? 'https://u.expo.dev/xxx'
const requestHeaders = process.env.EXPO_CHANNEL_NAME
  ? {
      'expo-channel-name': process.env.EXPO_CHANNEL_NAME,
    }
  : undefined


const config = ({ config }: ConfigContext): ExpoConfig => {
  return {
    ...config,

    name: 'mobile',
    slug: 'mobile',
    scheme: 'mobile',
    version: '0.0.1',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'automatic',
    newArchEnabled: false,
    platforms: ['ios', 'android', 'web'],
    runtimeVersion: '0.0.1',
    updates: {
      url: updateUrl,
      requestHeaders,
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],

    ios: {
      bundleIdentifier: 'com.wuwenbin.mobile',
      supportsTablet: true,
      appStoreUrl:
      'https://apps.apple.com/us/app/emochi-unlimited-chat-with-ai/id6476081894',
    },
    android: {
      package: 'com.wuwenbin.mobile',
      adaptiveIcon: {
        foregroundImage: './assets/icon.png',
        backgroundColor: '#1F104A',
      },
      edgeToEdgeEnabled: true,
      playStoreUrl:
      'https://play.google.com/store/apps/details?id=com.flow.mobile',
    },
    web: {
      bundler: "metro",
      output: "static",
      build: {
        output: 'dist',
      },
      favicon: "./assets/images/favicon.png"
    },
    extra: {
    // All values in extra will be passed to your app.
    //   eas: {
    //     projectId: "your-eas-project-id",
    //   },
      autolinking: {
        android: {
          exclude: ['expo-keep-awake', 'expo-font', '@expo/vector-icons'],
        },
        ios: {
          exclude: ['expo-keep-awake', 'expo-font', '@expo/vector-icons'],
        },
      },
      "react-native-google-mobile-ads": {
        "android_app_id": "ca-app-pub-3940256099942544~3347511713",
        "ios_app_id": "ca-app-pub-3940256099942544~1458002511"
      }
    },
    experiments: {
      tsconfigPaths: true,
      typedRoutes: true,
    },
    plugins: [
      'expo-router',
      [
        "expo-splash-screen",
        {
          "image": "./src/assets/images/splash-icon.png",
          "imageWidth": 200,
          "resizeMode": "contain",
          "backgroundColor": "#ffffff"
        }
      ],
      [
        '@sentry/react-native/expo',
        {
          organization: 'wuwenbin',
          // project: 'react-native',
          // url: 'https://sentry.io',
          project: 'mobile',
          url: 'https://sentry.tongdelove.com',
        },
      ],
      [
        'react-native-iap',
        {
          paymentProvider: 'Play Store',
        },
      ],
      "@react-native-firebase/app",
      "@react-native-firebase/perf",
      "@react-native-firebase/crashlytics",
      "@react-native-firebase/messaging",
    ],
  }
}

export default config

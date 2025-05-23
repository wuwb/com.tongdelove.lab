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
    newArchEnabled: true,
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
    autolinking: {
      android: {
        exclude: ['expo-keep-awake', 'expo-font', '@expo/vector-icons'],
      },
      ios: {
        exclude: ['expo-keep-awake', 'expo-font', '@expo/vector-icons'],
      },
    },
    extra: {
    // All values in extra will be passed to your app.
    //   eas: {
    //     projectId: "your-eas-project-id",
    //   },
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
    ],
  }
}

export default withSentry(config, {
  url: 'https://sentry.tongdelove.com/',
  project: 'mobile',
  organization: 'wuwenbin',
})

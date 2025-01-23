import { ConfigContext, ExpoConfig } from '@expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'UT Coip Mobile',
  slug: 'ut-coip-mobile',
  version: '0.0.1',
  orientation: 'portrait',
  scheme: 'utcoipmobile',
  icon: './assets/icons/IconApp.png',
  userInterfaceStyle: 'light',
  jsEngine: 'hermes',
  developmentClient: {
    silentLaunch: true,
  },
  platforms: ['android', 'ios'],
  runtimeVersion: {
    policy: 'appVersion',
  },
  updates: {
    fallbackToCacheTimeout: 60000,
    url: '',
  },
  splash: {
    image: './assets/images/SplashScreenImg.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  ios: {
    userInterfaceStyle: 'light',
    supportsTablet: true,
    bundleIdentifier: 'com.unitedtractors.coipmobile',
    buildNumber: '1',
  },
  android: {
    userInterfaceStyle: 'light',
    adaptiveIcon: {
      foregroundImage: './assets/icons/IconApp.png',
      backgroundColor: '#ffffff',
    },
    package: 'com.unitedtractors.coipmobile',
  },
  plugins: [
    'expo-router',
    'expo-font',
    [
      'expo-dev-launcher',
      {
        launchMode: 'most-recent',
        addGeneratedScheme: false,
      },
    ],
    [
      'expo-location',
      {
        locationAlwaysAndWhenInUsePermission:
          'Allow $(PRODUCT_NAME) to use your location for access feature maps.',
      },
    ],
    [
      'expo-image-picker',
      {
        photosPermission:
          'allow $(PRODUCT_NAME) to using photo to support attachment feature to server for data jobs.',
      },
    ],
    [
      'expo-build-properties',
      {
        android: {
          compileSdkVersion: 34,
          targetSdkVersion: 34,
          buildToolsVersion: '34.0.0',
          enableShrinkResourcesInReleaseBuilds: true,
          enableProguardInReleaseBuilds: true,
        },
        ios: {
          deploymentTarget: '13.4',
        },
      },
    ],
    [
      '@bam.tech/react-native-app-security',
      {
        preventRecentScreenshots: {
          ios: { enabled: true },
          android: { enabled: true },
        },
      },
    ],
    ['./plugins/withDisableForcedDarkModeAndroid.js', {}],
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    router: {
      origin: false,
    },
    eas: {
      projectId: 'com.unitedtractors.coipmobile',
    },
  },
  owner: '*',
});

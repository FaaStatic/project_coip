import { NativeModules, Platform } from 'react-native';

const { VersioningModule } = NativeModules;

export const VersionApp = () => {
  const versionData =
    Platform.OS === 'android' ? VersioningModule.getConstants() : null;
  const { VERSION_NAME } = versionData;

  return VERSION_NAME;
};

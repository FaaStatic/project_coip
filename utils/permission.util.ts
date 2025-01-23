import { requestMediaLibraryPermissionsAsync } from 'expo-image-picker';
import { requestForegroundPermissionsAsync } from 'expo-location';

const LocationPermission = async () => {
  const permission = await requestForegroundPermissionsAsync();
  return {
    status: permission.granted,
  };
};

const MediaLibraryPermission = async () => {
  const permission = await requestMediaLibraryPermissionsAsync();
  return {
    status: permission.granted,
  };
};

export { LocationPermission, MediaLibraryPermission };

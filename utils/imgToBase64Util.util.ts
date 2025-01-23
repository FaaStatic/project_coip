import ImgToBase64 from 'react-native-image-base64';
import * as FileSystem from 'expo-file-system';
import { GenerateUid } from './generateUuid.util';

export const base64Util = {
  decodeBase64ToFile: async (base64Image: string) => {
    try {
      const nameRand = GenerateUid.generateNumericUUID(8);
      // Define the path for the temporary file
      const fileUri = FileSystem.cacheDirectory + `temp-(${nameRand}).png`;
      // Write the Base64 data to the file
      await FileSystem.writeAsStringAsync(fileUri, base64Image, {
        encoding: FileSystem.EncodingType.Base64,
      });

      return fileUri;
    } catch (error) {
      console.error('Error saving base64 to file:', error);
    }
  },
  ImgToBase64Util: async (path: string) => {
    try {
      return await ImgToBase64.getBase64String(path);
    } catch (error) {
      return null;
    }
  },
};

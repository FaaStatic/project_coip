import * as ImagePicker from 'expo-image-picker';
import ImageResizer from '@bam.tech/react-native-image-resizer';
import { base64Util } from './imgToBase64Util.util';

const openCameraPicker = async () => {
  const result = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    aspect: [16, 9],
    quality: 0.5,
    base64: true,
  });

  const isPotrait = result.assets[0].height > result.assets[0].width;
  const height = isPotrait ? 1280 : 720;
  const width = isPotrait ? 720 : 1280;

  const compressProcess = await ImageResizer.createResizedImage(
    result.assets[0].uri,
    width,
    height,
    'JPEG',
    50,
    0,
    null,
    false,
    {
      mode: 'cover',
    }
  );

  const dataBase64 = await base64Util.ImgToBase64Util(compressProcess.uri);

  return {
    width: width,
    height: height,
    base64: dataBase64,
  };
};

export { openCameraPicker };

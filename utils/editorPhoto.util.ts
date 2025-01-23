import PhotoEditor, { Options } from '@baronha/react-native-photo-editor';
import { deleteOperation } from '@untr/apps-coip/utils/fileSystemOperation.util';
import ImageResizer from '@bam.tech/react-native-image-resizer';
import { base64Util } from './imgToBase64Util.util';

export const openEditorPick = async (pathImage: string, widthImg: number, heightImg: number) => {
  let options: Options = {
    path: pathImage,
    stickers: [],
  };
  const result = await PhotoEditor.open(options);
  const compressProcess = await ImageResizer.createResizedImage(
    String(result),
    widthImg,
    heightImg,
    'JPEG',
    50,
    0
  );
  await deleteOperation(pathImage);
  return await base64Util.ImgToBase64Util(compressProcess.uri);
};

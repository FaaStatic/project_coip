import { Dimensions, PixelRatio } from 'react-native';

const SCALE_FONTS = 1.15;

const { height, width } = Dimensions.get('window');
const BASE_WIDTH = 1024;
const BASE_HEIGHT = 720;
const DEVICE_WIDTH = width > height ? width : height;
const DEVICE_HEIGHT = width < height ? width : height;

export const CustomDimension = {
  sizeInSp: (fontSize: number) => (fontSize / PixelRatio.getFontScale()) * SCALE_FONTS,
  sizeInDp: (pixelSize: number) => pixelSize / PixelRatio.get(),
  GET_HEIGHT: () => height,
  GET_WIDTH: () => width,
  WIDTH_PERCENTAGE: (percentage: number) => width * (percentage / 100),
  HEIGHT_PERCENTAGE: (percentage: number) => height * (percentage / 100),
  IMG_WIDTH: (width: number) => PixelRatio.getPixelSizeForLayoutSize(width),
  IMG_HEIGHT: (height: number) => PixelRatio.getPixelSizeForLayoutSize(height),
  scaledHorizontal: (width: number) => {
    return (width * DEVICE_WIDTH) / BASE_WIDTH;
  },
  scaledVertical: (height: number) => {
    return (height * DEVICE_HEIGHT) / BASE_HEIGHT;
  },
  scaledFontSize: (size: number) => {
    const fontSize = Math.round((size * DEVICE_HEIGHT) / BASE_HEIGHT);
    return DEVICE_WIDTH < BASE_WIDTH ? fontSize + 1 : fontSize;
  },
};

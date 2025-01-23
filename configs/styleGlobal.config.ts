import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const globalStyles = (backgroundColor?: string) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: backgroundColor || '#FFFFFF',
    },
    bottomSafeArea: {
      flex: 1,
      backgroundColor: backgroundColor || '#FFFFFF',
    },
    topSafeArea: {
      flex: 1,
      backgroundColor: backgroundColor || '#FFFFFF',
      paddingTop: useSafeAreaInsets().top,
    },
  });
};

export default globalStyles;

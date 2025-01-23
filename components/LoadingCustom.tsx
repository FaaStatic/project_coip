import { ActivityIndicator, View } from 'react-native';
import Text from './Text';
import { ColorsApp } from '@untr/apps-coip/themes/colorApp.theme';
import { FontsUtils } from '@untr/apps-coip/configs/fonUtils.config';
import { CustomDimension } from '@untr/apps-coip/utils/customDimension.util';

type LoadingCustomProp = {
  showBg?: boolean;
  title?: string;
  heightBg?: number;
  showLoading: boolean;
  classCustom?: string;
};

function LoadingCustom({
  showBg = true,
  title = 'Loading...',
  showLoading,
  heightBg = CustomDimension.GET_HEIGHT(),
  classCustom = 'w-full opacity-80 justify-center items-center z-50',
}: LoadingCustomProp) {
  if (showLoading) {
    return (
      <View
        className={classCustom}
        style={{
          backgroundColor: showBg ? ColorsApp.white : ColorsApp.transparent,
          height: heightBg,
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
        }}
      >
        <ActivityIndicator color={ColorsApp.primary} size={'large'} />
        <View className="items-center">
          <Text
            color={ColorsApp.primary}
            size={CustomDimension.sizeInSp(14)}
            style={{
              fontFamily: FontsUtils.bold,
            }}
          >
            {title}
          </Text>
        </View>
      </View>
    );
  } else {
    return null;
  }
}

export default LoadingCustom;

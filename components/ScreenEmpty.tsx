import { memo } from 'react';
import { View } from 'react-native';
import Text from '@untr/apps-coip/components/Text';
import { IconsApp } from '@untr/apps-coip/themes/iconApp.theme';
import { ColorsApp } from '@untr/apps-coip/themes/colorApp.theme';
import { CustomDimension } from '@untr/apps-coip/utils/customDimension.util';
import { FontsUtils } from '@untr/apps-coip/configs/fonUtils.config';

type EmptyDataProp = {
  title: string;
  description: string;
  heightView?: number;
};

const ScreenEmpty = ({ title, description, heightView }: EmptyDataProp) => {
  return (
    <View
      className="flex-1 h-full w-full items-center justify-center"
      style={{
        height: heightView !== undefined ? heightView : '100%',
      }}
    >
      <IconsApp.IconEmptyData width={40} height={40} color={ColorsApp.errorColor} />
      <Text
        size={CustomDimension.sizeInSp(18)}
        color={ColorsApp.errorColor}
        style={{
          marginTop: 4,
          marginBottom: 4,
          fontFamily: FontsUtils.bold,
        }}
      >
        {title}
      </Text>
      <View
        className="items-center"
        style={{
          width: CustomDimension.WIDTH_PERCENTAGE(60),
        }}
      >
        <Text
          size={CustomDimension.sizeInSp(14)}
          numberOfLines={3}
          textAlign="center"
          color={ColorsApp.errorColor}
        >
          {description}
        </Text>
      </View>
    </View>
  );
};

export default memo(ScreenEmpty);

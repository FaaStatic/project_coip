import { Image, View } from 'react-native';
import Text from '@untr/apps-coip/components/Text';
import { FontsUtils } from '@untr/apps-coip/configs/fonUtils.config';
import { CustomDimension } from '@untr/apps-coip/utils/customDimension.util';

interface BenefitData {
  title: string;
  subtitle: string;
  img: any;
}

export const BenefitLayout = ({ title, subtitle, img }: BenefitData) => {
  return (
    <View className="w-full h-fit mb-4 ps-5 pe-5 flex-row justify-start items-center">
      <Image
        source={img}
        style={{
          resizeMode: 'contain',
          width: 50,
          height: 50,
          marginEnd: 22,
        }}
      />
      <View
        className="flex-1 flex-col pb-3"
        style={{
          borderBottomWidth: 1,
          borderColor: '#E7E7E7',
        }}
      >
        <Text
          size={CustomDimension.sizeInSp(14)}
          style={{
            fontFamily: FontsUtils.bold,
            color: '#404040',
          }}
        >
          {title}
        </Text>
        <Text
          size={CustomDimension.sizeInSp(12)}
          numberOfLines={3}
          style={{
            fontWeight: '400',

            color: '#404040',
          }}
        >
          {subtitle}
        </Text>
      </View>
    </View>
  );
};

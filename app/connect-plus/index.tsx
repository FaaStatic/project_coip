import { memo, useEffect } from 'react';
import { BackHandler, Image, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import CustomHeaderApp from '@untr/apps-coip/components/CustomHeaderApp';
import Text from '@untr/apps-coip/components/Text';
import { BenefitLayout } from './components/BenefitLayout';
import { router } from 'expo-router';
import Space from '@untr/apps-coip/components/Space';
import { LocationPermission, MediaLibraryPermission } from '@untr/apps-coip/utils/permission.util';
import globalStyles from '@untr/apps-coip/configs/styleGlobal.config';
import { CustomDimension } from '@untr/apps-coip/utils/customDimension.util';
import { ImagesApp } from '@untr/apps-coip/themes/imagesApp.theme';
import { FontsUtils } from '@untr/apps-coip/configs/fonUtils.config';
import { dummyBenefit } from '@untr/apps-coip/constants/dummyData.constants';

const ConnectPlus = () => {
  const backButton = () => {
    BackHandler.exitApp();
    return true;
  };

  useEffect(() => {
    LocationPermission();
    MediaLibraryPermission();
    const hardwareBack = BackHandler.addEventListener('hardwareBackPress', backButton);
    return () => hardwareBack.remove();
  }, []);
  return (
    <View className="flex-1 bg-white flex-col" style={globalStyles().topSafeArea}>
      <CustomHeaderApp callback={backButton} title="Connect+" useSync={false} />
      <Image
        source={ImagesApp.ads_connect_plus}
        style={{
          resizeMode: 'cover',
          width: '100%',
          height: CustomDimension.HEIGHT_PERCENTAGE(35),
        }}
      />
      <Space height={30} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingLeft: 20,
          paddingEnd: 20,
        }}
      >
        <Text
          size={CustomDimension.sizeInSp(16)}
          color="#404040"
          style={{
            fontFamily: FontsUtils.bold,
          }}
        >
          Keuntungan Connect +
        </Text>
        <Space height={4} />
        <Text
          size={CustomDimension.sizeInSp(12)}
          color="#404040"
          style={{
            fontWeight: '400',
          }}
        >
          Manfaatkan berbagai fitur menarik ini.
        </Text>
        <Space height={25} />
        {dummyBenefit.map((element, index) => {
          return (
            <BenefitLayout
              key={index + 'XX'}
              title={element.title}
              subtitle={element.subtitle}
              img={element.img}
            />
          );
        })}
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          router.push({
            pathname: 'login-connect',
          });
        }}
        className="justify-self-end ms-5 me-5 pt-3 pb-3 rounded-lg flex-col justify-center items-center mb-6"
        style={{
          backgroundColor: '#030303',
          height: 46,
        }}
      >
        <Text
          size={CustomDimension.sizeInSp(14)}
          style={{
            fontWeight: '600',
            fontFamily: FontsUtils.medium,
            color: 'white',
          }}
        >
          Lanjutkan
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default memo(ConnectPlus);

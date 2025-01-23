import { memo, useState } from 'react';
import { Image, ScrollView, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { router } from 'expo-router';
import Space from '../../../../components/Space';
import CustomHeaderApp from '../../../../components/CustomHeaderApp';
import TextInput from '../../../../components/TextInput';
import Text from '../../../../components/Text';
import { ColorsApp } from '../../../../themes/colorApp.theme';
import { CustomDimension } from '../../../../utils/customDimension.util';
import { ImagesApp } from '../../../../themes/imagesApp.theme';
import { FontsUtils } from '../../../../configs/fonUtils.config';
import { IconsApp } from '../../../../themes/iconApp.theme';

const DashboardConnect = () => {
  const [search, setSearch] = useState('');

  return (
    <View
      className="flex-1 "
      style={{
        backgroundColor: ColorsApp.background,
      }}
    >
      <View
        style={{
          backgroundColor: ColorsApp.primary,
          height: CustomDimension.HEIGHT_PERCENTAGE(4),
        }}
      />
      <View className="h-fit w-full bg-white">
        <Image
          source={ImagesApp.header_ads_connect_plus}
          style={{
            width: CustomDimension.GET_WIDTH(),
            height: CustomDimension.HEIGHT_PERCENTAGE(35),
            resizeMode: 'stretch',
          }}
        />
        <Space height={25} />
        <View className="absolute top-0 left-0 right-0">
          <CustomHeaderApp callback={() => {}} title="Connect +" useSync={false} />
        </View>
        <View className="absolute bottom-2 left-0 right-0 justify-center items-center flex-row">
          <View
            className=" bg-white rounded-3xl shadow-md justify-start items-center flex-row  align-middle"
            style={{
              width: CustomDimension.WIDTH_PERCENTAGE(80),
              height: 36,
              paddingHorizontal: 9,
            }}
          >
            <IconsApp.IconSearch height={15} width={15} />
            <TextInput
              value={search}
              onChange={(value) => {
                setSearch(value);
              }}
              placeholderColor="#7F828B"
              placeholder="Cari Fitur yang anda inginkan"
              stylesBox={{
                width: CustomDimension.WIDTH_PERCENTAGE(50),
                paddingVertical: CustomDimension.scaledVertical(5),
                paddingHorizontal: 5,
              }}
              textStyle={{
                fontSize: CustomDimension.sizeInSp(11),
                color: 'black',
              }}
            />
          </View>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          flexDirection: 'column',
        }}
      >
        <View className="bg-white ps-5 pe-5 pt-2 pb-2 flex-col w-full mb-2">
          <Text
            size={CustomDimension.sizeInSp(16)}
            style={{
              fontFamily: FontsUtils.bold,
              color: '#404040',
            }}
          >
            Maintenance Management
          </Text>
          <Text
            size={CustomDimension.sizeInSp(12)}
            style={{
              fontFamily: FontsUtils.regular,
              color: '#404040',
            }}
          >
            Optimalkan kinerja alat beratmu
          </Text>
          <Space height={16} />
          <View
            className="flex-row w-full justify-start items- pb-5"
            style={{
              width: CustomDimension.GET_WIDTH(),
            }}
          >
            <TouchableOpacity
              className="w-fit h-fit flex-col items-center justify-center"
              style={{
                marginEnd: CustomDimension.scaledVertical(20),
              }}
            >
              <IconsApp.IconTruckManagement
                style={{
                  height: 68,
                  alignSelf: 'center',
                  width: 68,
                }}
              />
              <Space height={4} />
              <View className="w-fit h-fit justify-self-center items-center">
                <Text
                  size={CustomDimension.sizeInSp(11)}
                  numberOfLines={3}
                  style={{
                    textAlign: 'center',
                    width: 100,
                    color: 'black',
                  }}
                >
                  Advance Management
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-fit h-fit flex-col items-center justify-center bg-slate-600"
              style={{
                marginEnd: CustomDimension.scaledVertical(20),
              }}
            >
              <IconsApp.IconExcavator
                style={{
                  height: 68,
                  alignSelf: 'center',
                  width: 68,
                }}
              />
              <Space height={4} />
              <View className="w-fit h-fit justify-self-center items-center">
                <Text
                  size={CustomDimension.sizeInSp(11)}
                  numberOfLines={3}
                  style={{
                    textAlign: 'center',
                    width: 100,
                    color: 'black',
                  }}
                >
                  Lite Module
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View className="h-full  bg-white ps-5 pe-5 pt-2 pb-2 flex-col mb-4">
          <Text
            size={CustomDimension.sizeInSp(16)}
            style={{
              fontFamily: FontsUtils.bold,
              color: '#404040',
            }}
          >
            Operational Management
          </Text>
          <Text
            size={CustomDimension.sizeInSp(12)}
            style={{
              fontFamily: FontsUtils.regular,
              color: '#404040',
            }}
          >
            Pantau penggunaan fuel dan operasional alat berat{' '}
          </Text>
          <Space height={16} />
          <View
            className="flex-row w-full justify-start items- pb-5"
            style={{
              width: CustomDimension.GET_WIDTH(),
            }}
          >
            <TouchableOpacity
              className="w-fit h-fit flex-col items-center justify-center"
              style={{
                marginEnd: CustomDimension.scaledVertical(20),
              }}
            >
              <IconsApp.IconAnalytics
                style={{
                  height: 68,
                  alignSelf: 'center',
                  width: 68,
                }}
              />
              <Space height={4} />
              <View className="w-fit h-fit justify-self-center items-center">
                <Text
                  size={CustomDimension.sizeInSp(11)}
                  numberOfLines={3}
                  style={{
                    textAlign: 'center',
                    color: 'black',
                    width: 100,
                  }}
                >
                  Fuel Analytics
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                router.push({ pathname: '(dashboard)/home' });
              }}
              className="h-fit w-fit flex-col items-center justify-center bg-slate-600"
              style={{
                marginEnd: CustomDimension.scaledVertical(20),
              }}
            >
              <IconsApp.IconCoip
                style={{
                  height: 68,
                  alignSelf: 'center',
                  width: 68,
                }}
              />
              <Space height={4} />
              <View className="h-fit justify-self-center items-center">
                <Text
                  size={CustomDimension.sizeInSp(11)}
                  numberOfLines={3}
                  style={{
                    textAlign: 'center',
                    width: 100,
                    color: 'black',
                  }}
                >
                  COIP
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default memo(DashboardConnect);

import { TouchableOpacity, View } from 'react-native';
import Text from './Text';
import { router } from 'expo-router';
import SyncButton from './SyncButton';
import { CustomDimension } from '@untr/apps-coip/utils/customDimension.util';
import { IconsApp } from '@untr/apps-coip/themes/iconApp.theme';
import { FontsUtils } from '@untr/apps-coip/configs/fonUtils.config';

interface CustomHeaderProp {
  title: string;
  useSync: boolean;
  isCenter?: boolean;
  callback?: () => void;
}

function CustomHeaderApp({
  title,
  useSync,
  isCenter = true,
  callback = null,
}: Readonly<CustomHeaderProp>) {
  return (
    <View
      className="max-w-full h-fit items-center ps-5 pe-5 pt-3 pb-3 flex-row"
      style={{
        justifyContent: isCenter ? (useSync ? 'space-between' : 'flex-start') : 'flex-start',
      }}
    >
      <TouchableOpacity
        className="flex-none"
        style={{
          width: isCenter ? (useSync ? CustomDimension.WIDTH_PERCENTAGE(30) : 'auto') : 'auto',
        }}
        onPress={() => {
          if (callback !== null) {
            callback();
          } else {
            router.back();
          }
        }}
      >
        <IconsApp.IconArrowLeft width={24} height={24} color={'#404040'} />
      </TouchableOpacity>
      <View
        className={isCenter ? 'items-center' : 'items-start'}
        style={{
          // width: useSync ? CustomDimension.WIDTH_PERCENTAGE(30) : 'auto',
          marginStart: isCenter ? (useSync ? 0 : 31) : 16,
          flex: 1,
        }}
      >
        <Text
          type="bold"
          style={{
            fontSize: CustomDimension.sizeInSp(16),
            alignContent: 'center',
            alignSelf: 'flex-start',
            textAlign: useSync ? 'left' : 'center',
            fontFamily: FontsUtils.bold,
            color: '#404040',
          }}
        >
          {title}
        </Text>
      </View>

      {useSync ? (
        <View
          className={isCenter ? '' : 'flex-1 justify-end justify-self-end'}
          style={{
            width: isCenter ? CustomDimension.WIDTH_PERCENTAGE(25) : 'auto',
            alignSelf: 'flex-end',
          }}
        >
          <View className="w-fit-fit self-end">
            <SyncButton />
          </View>
        </View>
      ) : null}
    </View>
  );
}

export default CustomHeaderApp;

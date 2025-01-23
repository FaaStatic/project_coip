import { memo } from 'react';
import Text from './Text';
import { RotateCw } from 'lucide-react-native';
import { ColorsApp } from '@untr/apps-coip/themes/colorApp.theme';
import { CustomDimension } from '@untr/apps-coip/utils/customDimension.util';
import { FontsUtils } from '@untr/apps-coip/configs/fonUtils.config';
import DownloadComponentState from '@untr/apps-coip/states/downloadComponent.state';
import isConnectedState from '@untr/apps-coip/states/isConnectedState.state';
import FirstBootState from '@untr/apps-coip/states/firstBoot.state';
import Toast from 'react-native-toast-message';
import { TouchableOpacity, View } from 'react-native';

const SyncButton = () => {
  const setShowDownload = DownloadComponentState((state) => state.showDownloadProgress);

  const changeFirstBoot = FirstBootState((state) => state.changeFirstBoottState);

  const isOnline = isConnectedState((state) => state.isConnect);
  return (
    <TouchableOpacity
      disabled={!isOnline}
      onPress={() => {
        if (isOnline) {
          setShowDownload(true);
        } else {
          changeFirstBoot(false);
          Toast.show({
            type: 'error',
            text1: 'Internet disconnected',
            text2: 'Internet disconnected you can`t access app with online',
            position: 'bottom',
          });
          setTimeout(() => {
            changeFirstBoot(true);
          }, 3000);
        }
      }}
      className="w-fit h-fit  rounded-full flex-row justify-between items-center"
      style={{
        borderWidth: 4,
        gap: 5,
        backgroundColor: ColorsApp.successColor,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
        shadowColor: ColorsApp.black,
        borderColor: ColorsApp.white,
        paddingHorizontal: CustomDimension.scaledHorizontal(8),
        paddingVertical: CustomDimension.scaledVertical(6),
      }}
    >
      <RotateCw
        size={18}
        color={ColorsApp.white}
        style={{
          alignSelf: 'center',
        }}
      />
      <View>
        <Text
          size={CustomDimension.sizeInSp(12)}
          style={{ fontFamily: FontsUtils.medium, textAlignVertical: 'center' }}
          color={ColorsApp.white}
        >
          Sync
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default memo(SyncButton);

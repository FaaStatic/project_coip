import { memo } from 'react';
import { BackHandler, TouchableOpacity, View } from 'react-native';
import { ColorsApp } from '../../../../themes/colorApp.theme';
import { IconsApp } from '../../../../themes/iconApp.theme';
import Text from '../../../../components/Text';
import { FontsUtils } from '../../../../configs/fonUtils.config';
import { CustomDimension } from '../../../../utils/customDimension.util';

function OtherMenu() {
  return (
    <View
      className="flex-1 pe-5 ps-5 pt-12"
      style={{
        backgroundColor: ColorsApp.white,
      }}
    >
      <Text
        size={CustomDimension.sizeInSp(33)}
        style={{
          fontFamily: FontsUtils.bold,
          color: '#FFD500',
        }}
      >
        Other
      </Text>
      <TouchableOpacity
        className="pt-6 pb-6 ps-2 pe-2 flex-row justify-start items-center"
        style={{
          borderBottomWidth: 1,
          borderColor: '#F0F0F0',
        }}
      >
        <IconsApp.IconUtCall
          width={23}
          height={38}
          style={{
            marginEnd: 23,
          }}
        />
        <Text
          size={18}
          style={{
            color: ColorsApp.textColorPrimary,
            fontFamily: FontsUtils.medium,
          }}
        >
          My Ticket
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="pt-6 pb-6 ps-2 pe-2 flex-row justify-start items-center"
        style={{
          borderBottomWidth: 1,
          borderColor: '#F0F0F0',
        }}
      >
        <IconsApp.IconConnectSettings
          width={23}
          height={38}
          style={{
            marginEnd: 23,
          }}
        />
        <Text
          size={18}
          style={{
            color: ColorsApp.black,
            fontFamily: FontsUtils.medium,
          }}
        >
          Connect +
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="pt-6 pb-6 ps-2 pe-2 flex-row justify-start items-center"
        style={{
          borderBottomWidth: 1,
          borderColor: '#F0F0F0',
        }}
      >
        <IconsApp.IconGearConnectPlus
          width={23}
          height={38}
          style={{
            marginEnd: 23,
          }}
        />
        <Text
          size={18}
          style={{
            color: ColorsApp.black,
            fontFamily: FontsUtils.medium,
          }}
        >
          Settings
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          BackHandler.exitApp();
        }}
        className="pt-6 pb-6 ps-2 pe-2 flex-row justify-start items-center"
        style={{
          borderBottomWidth: 1,
          borderColor: '#F0F0F0',
        }}
      >
        <IconsApp.IconLogout
          width={23}
          height={38}
          style={{
            marginEnd: 23,
          }}
        />
        <Text
          size={18}
          style={{
            color: ColorsApp.black,
            fontFamily: FontsUtils.medium,
          }}
        >
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default memo(OtherMenu);

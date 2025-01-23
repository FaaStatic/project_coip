import { View } from 'react-native';
import Text from '@untr/apps-coip/components/Text';
import { FontsUtils } from '@untr/apps-coip/configs/fonUtils.config';
import { TouchableOpacity } from 'react-native';
import { X } from '@untr/apps-coip/lib/icons/X';
import { schemaDatabase } from '@untr/apps-coip/constants/schemaDatabase.constants';
import { ColorsApp } from '@untr/apps-coip/themes/colorApp.theme';
import { IconsApp } from '@untr/apps-coip/themes/iconApp.theme';
import { CustomDimension } from '@untr/apps-coip/utils/customDimension.util';
import { deleteSpesificSchema } from '@untr/apps-coip/utils/operationStorageDb.util';

type propComponents = {
  callback: (status: boolean) => void;
  setIsOpen: (status: boolean) => void;
  isLogin: boolean;
};

const NoticeFailDeleteUser = ({ callback, setIsOpen, isLogin }: propComponents) => {
  const deleteLoginData = async () => {
    await deleteSpesificSchema(schemaDatabase.Login);
  };
  return (
    <View className="bg-white flex flex-col align-middle items-center justify-between">
      <View className="w-full h-[48px] flex-row mb-[22px] items-center justify-center">
        <View>
          <X
            width={24}
            height={24}
            fontWeight={'900'}
            color={ColorsApp.gray300}
            onPress={async () => {
              if (isLogin) {
                await deleteLoginData();
              }
              setIsOpen(false);
            }}
          />
        </View>
        <View className="flex flex-1 justify-center items-center">
          <Text
            size={CustomDimension.sizeInSp(18)}
            style={{
              color: ColorsApp.black,
              fontWeight: '700',
              fontFamily: FontsUtils.bold,
            }}
          >
            {'Delete Customer'}
          </Text>
        </View>
      </View>
      <IconsApp.IconDeleteUser width={'auto'} height={144} className="mb-5" />
      <Text
        style={{
          fontFamily: FontsUtils.medium,
          fontSize: 14,
          color: '#8E8E8E',
        }}
      >
        You cannot delete this customer because there are outstanding jobs associated with them. To
        delete this customer, please complete or remove the outstanding jobs first.
      </Text>
      <TouchableOpacity
        onPress={() => {
          callback(false);
        }}
        className={`flex flex-col h-[48px] rounded-[9px] bg-[${ColorsApp.primary}] items-center
         justify-center `}
      >
        <Text
          style={{
            fontFamily: FontsUtils.medium,
            fontSize: 14,
            color: 'black',
          }}
        >
          OK
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default NoticeFailDeleteUser;

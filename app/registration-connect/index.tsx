import { memo, useCallback } from 'react';
import { KeyboardAvoidingView, ScrollView, TouchableOpacity, View } from 'react-native';
import CustomHeaderApp from '@untr/apps-coip/components/CustomHeaderApp';
import Space from '@untr/apps-coip/components/Space';
import TextInput from '@untr/apps-coip/components/TextInput';
import Text from '@untr/apps-coip/components/Text';
import { useFocusEffect } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import WarningState from '@untr/apps-coip/states/warningState.state';
import { ImagesApp } from '@untr/apps-coip/themes/imagesApp.theme';
import { CustomDimension } from '@untr/apps-coip/utils/customDimension.util';
import { FontsUtils } from '@untr/apps-coip/configs/fonUtils.config';
import globalStyles from '@untr/apps-coip/configs/styleGlobal.config';
import { useAccountLoginHook } from '@untr/apps-coip/api/loginApp/hooks/account/useAccountLoginHook';
import LoadingState from '@untr/apps-coip/states/loadingState.state';

const RegistrationConnect = () => {
  const { control } = useForm();
  const { isPending, isError, error, isSuccess } = useAccountLoginHook();
  const changeLoading = LoadingState((state) => state.changeLoading);
  const updateWarning = WarningState((state) => state.updateWarning);

  useFocusEffect(
    useCallback(() => {
      changeLoading(isPending);
      if (isError && error) {
        updateWarning(true);
      }
      if (isSuccess) {
        updateWarning(true);
      }
    }, [isPending, error, isSuccess])
  );

  return (
    <KeyboardAvoidingView
      style={globalStyles().topSafeArea}
      className="flex-1 flex-col"
      behavior={'padding'}
    >
      <CustomHeaderApp title="Daftar Connect +" useSync={false} />
      <Space height={33} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          className="items-center justify-center"
          style={{
            height: CustomDimension.HEIGHT_PERCENTAGE(30),
          }}
        >
          <ImagesApp.ImageLogin
            className="justify-self-center"
            width={CustomDimension.WIDTH_PERCENTAGE(80)}
            height={CustomDimension.HEIGHT_PERCENTAGE(30)}
          />
        </View>
        <Space height={44} />
        <View className="flex-1 pe-5 ps-5 ">
          <Text
            size={CustomDimension.sizeInSp(13)}
            style={{
              color: '#787878',
            }}
          >
            Name
          </Text>
          <Controller
            name="userName"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextInput
                value={value}
                onChange={onChange}
                placeholder="Input Your Username"
                placeholderColor="#787878"
                stylesBox={{
                  height: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: '#D3D3D3',
                  marginLeft: -5,
                  marginTop: -5,
                  width: '100%',
                }}
                textStyle={{
                  marginLeft: -5,
                  fontWeight: '700',
                  color: '#1D1D1D',
                  fontSize: CustomDimension.sizeInSp(14),
                }}
              />
            )}
          />

          <Text
            size={CustomDimension.sizeInSp(13)}
            style={{
              color: '#787878',
            }}
          >
            Password
          </Text>
          <Controller
            name="password"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextInput
                value={value}
                onChange={onChange}
                secureTextEntry={true}
                placeholder="Input Your Password"
                placeholderColor="#787878"
                stylesBox={{
                  height: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: '#D3D3D3',
                  marginLeft: -5,
                  marginTop: -5,
                  width: '100%',
                }}
                textStyle={{
                  marginLeft: -5,
                  fontWeight: '700',
                  color: '#1D1D1D',
                  fontSize: CustomDimension.sizeInSp(14),
                }}
              />
            )}
          />

          <Space height={16} />

          <TouchableOpacity
            onPress={() => {}}
            className="justify-self-end pt-3 pb-3 rounded-lg flex-col justify-center items-center"
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
              Daftar Sekarang
            </Text>
          </TouchableOpacity>
          <Space height={16} />
        </View>
        <Space height={100} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default memo(RegistrationConnect);

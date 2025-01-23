import React, { memo, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import CustomHeaderApp from '@untr/apps-coip/components/CustomHeaderApp';
import Space from '@untr/apps-coip/components/Space';
import { FormProvider, useForm } from 'react-hook-form';
import AlertDialogCustom from '@untr/apps-coip/components/AlertDialogCustom';
import { ImagesApp } from '@untr/apps-coip/themes/imagesApp.theme';
import { CustomDimension } from '@untr/apps-coip/utils/customDimension.util';
import globalStyles from '@untr/apps-coip/configs/styleGlobal.config';
import { KeyboardAvoidingView, KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useKeyboard } from '@untr/apps-coip/lib/keyboard';
import { ColorsApp } from '@untr/apps-coip/themes/colorApp.theme';
import { LoginUserTypeSchema } from '@untr/apps-coip/types/user.type';
import LoginProcessBtn from './components/LoginProcessBtn';
import InputLogin from './components/InputLogin';
import { testProps } from '@untr/apps-coip/utils/idComponentHelper.util';
import { TestUnitIDConstant } from '@untr/apps-coip/constants/testUnitID.constants';
import ChooseUserLogin from '@untr/apps-coip/components/ChooseUserLogin/ChooseUserLogin';
import GetCustomerData from '@untr/apps-coip/components/GetCustomerData';
import { UserInfoTokenDto } from '@untr/apps-coip/api/loginApp/types/UserInfoTokenDto';

const LoginConnect = () => {
  const formLogin = useForm<LoginUserTypeSchema>();
  const { isKeyboardVisible, keyboardHeight } = useKeyboard();
  const [loginErrorMsg, setLoginErrorMsg] = useState<any>(null);
  const [openWarning, setOpenWarning] = useState<boolean>(false);
  const [openSelectUser, setOpenSelectUser] = useState<boolean>(false);
  const [dataUserCode, setDataUserCode] = useState<UserInfoTokenDto>(null);
  const [prepareCustomerData, setPrepareCustomerData] = useState<boolean>(false);

  return (
    <FormProvider {...formLogin}>
      <KeyboardAvoidingView
        behavior="padding"
        className="flex-col flex-1"
        style={globalStyles().topSafeArea}
      >
        <CustomHeaderApp title="Login Connect +" useSync={false} />
        <Space height={33} />
        <KeyboardAwareScrollView
          className="flex-1 flex-grow flex-col pt-5"
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          bottomOffset={isKeyboardVisible ? keyboardHeight : 0}
          contentContainerStyle={styles.styleContainerLogin}
        >
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
          <View className="flex-1 flex-col justify-start">
            <InputLogin name="userName" label="Username" />
            <Space height={24} />
            <InputLogin name="password" label="Password" usingForPassword={true} />
            <Space height={48} />
            <LoginProcessBtn
              setLoginErrorMsg={setLoginErrorMsg}
              setOpenWarning={setOpenWarning}
              setOpenUserList={setPrepareCustomerData}
              setUserCode={setDataUserCode}
            />
          </View>

          <AlertDialogCustom
            {...testProps(TestUnitIDConstant.LOGINCONNECT_VIEW_ALERTDIALOGCUSTOM)}
            usingAgree={false}
            callbackDisagree={() => {
              setOpenWarning(false);
            }}
            usingCancel={true}
            titleCancel="Close"
            usingImageCancel={true}
            colorDisAgree={ColorsApp.gray300}
            openAlert={openWarning}
            title={'Login Failed!'}
            description={`${loginErrorMsg || ''}`}
          />
          <GetCustomerData
            open={prepareCustomerData}
            setOpen={setPrepareCustomerData}
            setOpenUserList={setOpenSelectUser}
          />
          <ChooseUserLogin isOpen={openSelectUser} setIsOpen={setOpenSelectUser} isLogin={true} />
        </KeyboardAwareScrollView>
      </KeyboardAvoidingView>
    </FormProvider>
  );
};

const styles = StyleSheet.create({
  styleContainerLogin: {
    flexGrow: 1,
  },

  btnRegisterStyle: {
    width: 'auto',
  },
  regularStyleText: {
    fontSize: CustomDimension.sizeInSp(14),
    fontWeight: '400',
    color: ColorsApp.primary,
  },
  boldStyleText: {
    fontSize: CustomDimension.sizeInSp(13),
    fontWeight: '700',
    color: ColorsApp.primary,
  },
});

export default memo(LoginConnect);

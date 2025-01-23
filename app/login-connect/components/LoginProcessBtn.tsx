import { useFormContext } from 'react-hook-form';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { TestUnitIDConstant } from '@untr/apps-coip/constants/testUnitID.constants';
import { testProps } from '@untr/apps-coip/utils/idComponentHelper.util';
import Text from '@untr/apps-coip/components/Text';
import LoadingState from '@untr/apps-coip/states/loadingState.state';
import { useAccountLoginHook } from '@untr/apps-coip/api/loginApp/hooks/account';
import useLoginProcess from '@untr/apps-coip/hooks/useLoginProcess';
import { CustomDimension } from '@untr/apps-coip/utils/customDimension.util';
import { FontsUtils } from '@untr/apps-coip/configs/fonUtils.config';
import { router } from 'expo-router';
import { UserInfoTokenDto } from '@untr/apps-coip/api/loginApp/types/UserInfoTokenDto';

type LoginProcessProp = {
  setLoginErrorMsg: (data: string) => void;
  setOpenWarning: (data: boolean) => void;
  setOpenUserList: (data: boolean) => void;
  setUserCode: (data: UserInfoTokenDto) => void;
};

const LoginProcessBtn = ({
  setLoginErrorMsg,
  setOpenWarning,
  setOpenUserList,
  setUserCode,
}: LoginProcessProp) => {
  const formUser = useFormContext();
  const changeLoading = LoadingState((state) => state.changeLoading);
  const { mutateAsync: mutateLogin } = useAccountLoginHook();
  const { mutateAsync: mutateProcess } = useLoginProcess();

  const submitData = (data) => {
    changeLoading(true);
    mutateLogin(data, {
      onSuccess: async (data) => {
        try {
          await mutateProcess(data, {
            onSuccess: async (_) => {
              if (data.customerCode) {
                changeLoading(false);
                router.replace({ pathname: '(dashboard)/home' });
              } else {
                await new Promise((resolve) => setTimeout(resolve, 10)); // Simulate async operation
                setUserCode(data);
                setOpenUserList(true);
                changeLoading(false);
              }
            },
          });
        } catch (error) {
          console.log(error);
        }
      },
      onError: (err) => {
        if (err?.response?.data?.errors === undefined) {
          setLoginErrorMsg(err?.response?.data);
        } else {
          const usernameError = err?.response?.data?.errors.UserName[0] || '';
          const passwordError = err?.response?.data?.errors.Password[0] || '';
          if (usernameError !== '') {
            setLoginErrorMsg(`${usernameError || ''}\n${passwordError}`);
          } else {
            setLoginErrorMsg(`${passwordError}`);
          }
        }
        changeLoading(false);
        setTimeout(() => {
          setOpenWarning(true);
        }, 500);
      },
    });
  };

  return (
    <View className="ps-5 pe-5 pt-3 pb-3  items-center justify-center justify-self-end">
      <TouchableOpacity
        {...testProps(TestUnitIDConstant.LOGINCONNECT_BUTTON_LOGIN)}
        onPress={formUser.handleSubmit(submitData)}
        className="w-full h-fit justify-self-center rounded-lg flex-col justify-center items-center"
        style={styles.btnStyle}
      >
        <Text size={CustomDimension.sizeInSp(14)} color="white" style={styles.textBtn}>
          Login
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  textBtn: {
    fontWeight: '600',
    fontFamily: FontsUtils.medium,
  },
  btnStyle: {
    backgroundColor: '#030303',
    height: 46,
  },
});

export default LoginProcessBtn;

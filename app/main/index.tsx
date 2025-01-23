import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, BackHandler, View } from 'react-native';
import { ColorsApp } from '@untr/apps-coip/themes/colorApp.theme';
import FirstBootState from '@untr/apps-coip/states/firstBoot.state';
import { useAutoDeleteJob } from '@untr/apps-coip/hooks/useAutoDeleteJob';
import { useAutoSyncAgain } from '@untr/apps-coip/hooks/useAutoSyncAgain';
import { useGetUserLocal } from '@untr/apps-coip/hooks/useGetUserLocal';
import JailMonkey from 'jail-monkey';
import StatusAlertDialog from '@untr/apps-coip/components/StatusAlertDialog';
import { SafeKeyboardDetector } from '@bam.tech/react-native-app-security';
import RNRestart from 'react-native-restart';

const Main = () => {
  const router = useRouter();
  const { isInDefaultSafeList, inputMethodId } = SafeKeyboardDetector.getCurrentInputMethodInfo();
  const { data, isSuccess, isFetching } = useGetUserLocal();
  const { mutateAsync: mutateAutoDeleteJob } = useAutoDeleteJob();
  const { mutateAsync: mutateAutoSync } = useAutoSyncAgain();
  const [adbEnabled, setAdbEnabled] = useState<boolean>(false);
  const [rooted, setRooted] = useState<boolean>(false);
  const [keyboardProblem, setKeyboardProblem] = useState<boolean>(false);
  const changeFirstBoot = FirstBootState((state) => state.changeFirstBoottState);
  const [restartApp, setRestartApp] = useState<boolean>(false);

  const setupApp = async () => {
    if (data && isSuccess && !isFetching) {
      mutateAutoSync();
      mutateAutoDeleteJob();
      setTimeout(() => {
        router.replace('(dashboard)/home');
      }, 200);
    } else if (data == null && isSuccess) {
      setTimeout(() => {
        router.replace('connect-plus');
      }, 200);
    }
  };

  const checkIsRooted = async () => {
    try {
      if (!isInDefaultSafeList) {
        setKeyboardProblem(true);
        return;
      } else {
        console.log(inputMethodId);
      }
      if (__DEV__) {
        await setupApp();
        return;
      }

      const isJailBroken = JailMonkey.isJailBroken();
      if (isJailBroken) {
        setRooted(true);
        return;
      }

      const isAdbEnabled = JailMonkey.AdbEnabled();
      const isDevSettingsEnabled = await JailMonkey.isDevelopmentSettingsMode();
      if (isAdbEnabled || isDevSettingsEnabled) {
        setAdbEnabled(true);
        return;
      }
      await setupApp();
    } catch (error) {
      console.error('Error during root detection:', error);
    }
  };

  const changeKeyboardFunc = async () => {
    if (restartApp) {
      setRestartApp(false);
      setKeyboardProblem(false);
      RNRestart.restart();
    } else {
      SafeKeyboardDetector.showInputMethodPicker();
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setRestartApp(true);
      setKeyboardProblem(true);
    }
  };

  useEffect(() => {
    changeFirstBoot(true);
    checkIsRooted();
  }, [data, isSuccess]);

  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size="large" color={ColorsApp.primary} />
      <StatusAlertDialog
        isOpen={rooted || adbEnabled}
        isError={true}
        title="Security Issues!"
        callbackCloseAlert={(value) => {
          setRooted(value);
          BackHandler.exitApp();
        }}
        desc={`Your Devices is ${rooted ? 'ROOTED' : ''} ${adbEnabled ? 'DEBUGGING ENABLED' : ''}  detected, For security reason unfortunately you can't access COIP Mobile :"(`}
        titleBtn={'Exit App'}
      />
      <StatusAlertDialog
        isOpen={keyboardProblem}
        isError={true}
        title="Security Issues!"
        callbackCloseAlert={(_) => {
          changeKeyboardFunc();
          setKeyboardProblem(false);
        }}
        desc={`Your keyboard detected not safe, For security reason you must be change keyboard to default`}
        titleBtn={restartApp ? 'Restart App' : 'Change Keyboard'}
      />
    </View>
  );
};

export default Main;

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Theme, ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@untr/apps-coip/lib/components/primitives/portal';
import { DeprecatedUi } from '@untr/apps-coip/lib/components';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { View, StyleSheet, LogBox } from 'react-native';
import ScreenGuardModule from 'react-native-screenguard';
import { setAndroidNavigationBar } from '@untr/apps-coip/lib/android-navigation-bar';
import { NAV_THEME } from '@untr/apps-coip/lib/constants';
import { useColorScheme } from '@untr/apps-coip/lib/useColorScheme';
import * as Font from 'expo-font';
import { onlineManager } from '@tanstack/react-query';
import NetInfo from '@react-native-community/netinfo';
import isConnectedState from '@untr/apps-coip/states/isConnectedState.state';
import FirstBootState from '@untr/apps-coip/states/firstBoot.state';
import LoadingState from '@untr/apps-coip/states/loadingState.state';
import LoadingCustom from '@untr/apps-coip/components/LoadingCustom';
import DownloadComponentState from '@untr/apps-coip/states/downloadComponent.state';
import Toast from 'react-native-toast-message';
import AlertDialogCustom from '@untr/apps-coip/components/AlertDialogCustom';
import DownloadMasterDialog from '@untr/apps-coip/components/DownloadMasterDialog/DownloadMasterDialog';
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useReactQueryDevTools } from '@dev-plugins/react-query';
import { RealmProvider } from '@realm/react';

const { ToastProvider } = DeprecatedUi;

const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
};

export const unstable_settings = {
  initialRouteName: 'index',
};

export { ErrorBoundary } from 'expo-router';

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  ScreenGuardModule.registerWithoutEffect();
  LogBox.ignoreAllLogs(true);
  const queryClient = new QueryClient();
  useReactQueryDevTools(queryClient);
  const { colorScheme, setColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = useState(false);
  const firstBootState = FirstBootState((state) => state.firstBoot);
  const changeFirstBoot = FirstBootState((state) => state.changeFirstBoottState);
  const setConnected = isConnectedState((state) => state.changeConnectState);
  const showDownload = DownloadComponentState((state) => state.showDownloadDialog);
  const setShowDownload = DownloadComponentState((state) => state.showDownloadProgress);
  const setErrorDownload = DownloadComponentState((state) => state.changeErrorDownload);
  const errorDownload = DownloadComponentState((state) => state.errorDownload);
  const changeErrorDownload = DownloadComponentState((state) => state.changeErrorDownload);
  const connected = isConnectedState((state) => state.isConnect);
  const loadingScreen = LoadingState((state) => state.isLoading);

  const setupApp = async () => {
    const theme = await AsyncStorage.getItem('theme');
    await Font.loadAsync({
      'SF-Pro-Regular': require('@untr/apps-coip/assets/fonts/SFProRegular.otf'),
      'SF-Pro-Medium': require('@untr/apps-coip/assets/fonts/SFProMedium.otf'),
      'SF-Pro-Bold': require('@untr/apps-coip/assets/fonts/SFProBold.otf'),
    });
    if (!theme) {
      await AsyncStorage.setItem('theme', 'light');
    }
    await setAndroidNavigationBar('light');
    setColorScheme('light');
    setIsColorSchemeLoaded(true);
  };

  const checkNetworkCondition = async (connected: boolean) => {
    if (connected && !firstBootState) {
      Toast.show({
        type: 'success',
        text1: 'Internet connected',
        text2: 'Internet connected you can access app with online',
        position: 'bottom',
      });
    } else if (!connected && !firstBootState) {
      if (showDownload) {
        setShowDownload(false);
        setErrorDownload(true);
      }
      Toast.show({
        type: 'error',
        text1: 'Internet disconnected',
        text2: 'Internet disconnected you can`t access app with online',
        position: 'bottom',
      });
    }
  };

  useEffect(() => {
    setupApp().finally(() => {
      SplashScreen.hideAsync();
    });
  }, []);

  useEffect(() => {
    onlineManager.setEventListener((setOnline) => {
      return NetInfo.addEventListener((state) => {
        setOnline(!!state.isConnected);
      });
    });
    const unsubscribe = NetInfo.addEventListener((state) => {
      checkNetworkCondition(state.isConnected);
      if (firstBootState) {
        changeFirstBoot(false);
      }
      setConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, [connected]);

  if (!isColorSchemeLoaded) {
    return null;
  }

  return (
    <RealmProvider>
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView style={styles.gestureViewStyle}>
          <AutocompleteDropdownContextProvider>
            <KeyboardProvider>
              <ThemeProvider value={LIGHT_THEME}>
                <StatusBar style={'light'} />
                <BottomSheetModalProvider>
                  <View className="flex-1 w-full h-full">
                    <Stack initialRouteName="main" screenOptions={{ headerShown: false }}>
                      <Stack.Screen
                        name="main"
                        options={{
                          headerShown: false,
                        }}
                      />
                      <Stack.Screen
                        name="connect-plus"
                        options={{
                          headerShown: false,
                        }}
                      />
                      <Stack.Screen
                        name="(menu-connect)"
                        options={{
                          headerShown: false,
                        }}
                      />
                      <Stack.Screen
                        name="(dashboard)"
                        options={{
                          headerShown: false,
                        }}
                      />

                      <Stack.Screen
                        name="job-detail"
                        options={{
                          headerShown: false,
                        }}
                      />
                      <Stack.Screen
                        name="login-connect"
                        options={{
                          headerShown: false,
                        }}
                      />
                      <Stack.Screen
                        name="registration-connect"
                        options={{
                          headerShown: false,
                        }}
                      />
                      <Stack.Screen
                        name="create-jobs"
                        options={{
                          headerShown: false,
                        }}
                      />
                      <Stack.Screen
                        name="report-detail"
                        options={{
                          headerShown: false,
                        }}
                      />
                      <Stack.Screen
                        name="+not-found"
                        options={{
                          headerShown: false,
                        }}
                      />
                    </Stack>
                    {loadingScreen ? <LoadingCustom showLoading={loadingScreen} /> : null}
                    {showDownload ? <DownloadMasterDialog /> : null}
                    {errorDownload ? (
                      <AlertDialogCustom
                        openAlert={errorDownload}
                        title={'Error Synchronizing'}
                        description={
                          'Something wrong with Synchronizing, please check your internet and re-sync again or contact admin.'
                        }
                        usingImageCancel={true}
                        usingAgree={false}
                        usingCancel={true}
                        titleCancel="Close"
                        callbackDisagree={(value) => {
                          changeErrorDownload(value);
                        }}
                      />
                    ) : null}
                    <ToastProvider />
                    <PortalHost />
                  </View>
                </BottomSheetModalProvider>
              </ThemeProvider>
            </KeyboardProvider>
          </AutocompleteDropdownContextProvider>
        </GestureHandlerRootView>
      </QueryClientProvider>
    </RealmProvider>
  );
};
const styles = StyleSheet.create({
  gestureViewStyle: {
    flex: 1,
  },
});
export default RootLayout;

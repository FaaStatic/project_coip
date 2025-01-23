import { Tabs } from 'expo-router';
import { useEffect } from 'react';
import { BackHandler, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FontsUtils } from '@untr/apps-coip/configs/fonUtils.config';
import { ModalToggle } from '@untr/apps-coip/lib/components/ModalToggle';
import { ThemeToggle } from '@untr/apps-coip/lib/components/ThemeToggle';
import { ColorsApp } from '@untr/apps-coip/themes/colorApp.theme';
import { IconsApp } from '@untr/apps-coip/themes/iconApp.theme';
import { CustomDimension } from '@untr/apps-coip/utils/customDimension.util';
import Text from '@untr/apps-coip/components/Text';

const TabsLayout = () => {
  const { bottom } = useSafeAreaInsets();
  const backButton = () => {
    BackHandler.exitApp();
    return true;
  };

  useEffect(() => {
    const hardwareBack = BackHandler.addEventListener('hardwareBackPress', backButton);
    return () => hardwareBack.remove();
  }, []);
  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        tabBarItemStyle: {
          paddingTop: 8,
          paddingBottom: 8,
        },
        tabBarStyle: {
          height: 65 + bottom,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarLabel({ focused }) {
            return (
              <Text
                size={CustomDimension.sizeInSp(12)}
                style={styles(focused).textLabelStyle}
                color={focused ? ColorsApp.primary : ColorsApp.gray500}
              >
                Job
              </Text>
            );
          },
          tabBarIcon({ focused }) {
            if (focused) {
              return <IconsApp.IconGearTabsActive height={24} width={24} />;
            } else {
              return <IconsApp.IconGearTabsNonActive height={20} width={20} />;
            }
          },
          headerLeft: () => <ModalToggle />,
          headerRight: () => <ThemeToggle />,
        }}
      />
      <Tabs.Screen
        name="jobs"
        options={{
          headerShown: false,
          tabBarLabel({ focused }) {
            return (
              <Text
                size={CustomDimension.sizeInSp(12)}
                style={styles(focused).textLabelStyle}
                color={focused ? ColorsApp.primary : ColorsApp.gray500}
              >
                Report
              </Text>
            );
          },
          tabBarIcon({ focused }) {
            if (focused) {
              return <IconsApp.IconsReportsActive height={24} width={24} />;
            } else {
              return <IconsApp.IconsReportsNonActive height={20} width={20} />;
            }
          },
          headerRight: () => <ThemeToggle />,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarLabel({ focused }) {
            return (
              <Text
                size={CustomDimension.sizeInSp(12)}
                style={styles(focused).textLabelStyle}
                color={focused ? ColorsApp.primary : ColorsApp.gray500}
              >
                Profile
              </Text>
            );
          },
          tabBarIcon({ focused }) {
            if (focused) {
              return <IconsApp.IconsUserActive height={24} width={24} />;
            } else {
              return <IconsApp.IconsUserNonActive height={20} width={20} />;
            }
          },
        }}
      />
    </Tabs>
  );
};

const styles = (focused: boolean) =>
  StyleSheet.create({
    textLabelStyle: {
      fontWeight: focused ? '600' : '400',
      fontFamily: focused ? FontsUtils.bold : FontsUtils.regular,
    },
  });

export default TabsLayout;

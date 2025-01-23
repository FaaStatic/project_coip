import { Tabs } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { memo } from 'react';
import Text from '../../../components/Text';
import { FontsUtils } from '../../../configs/fonUtils.config';
import { ColorsApp } from '../../../themes/colorApp.theme';
import { IconsApp } from '../../../themes/iconApp.theme';

function TabsLayout() {
  return (
    <Tabs
      initialRouteName="dashboard-connect"
      screenOptions={{
        tabBarIconStyle: {
          height: 50,
          width: 50,
        },
      }}
    >
      <Tabs.Screen
        name="dashboard-connect"
        options={{
          headerShown: false,
          tabBarLabel: ({ focused }) => {
            return (
              <Text
                size={12}
                style={{
                  fontFamily: focused ? FontsUtils.bold : FontsUtils.regular,
                }}
                color={focused ? ColorsApp.primary : ColorsApp.gray500}
              >
                Home
              </Text>
            );
          },

          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              return (
                <LinearGradient
                  colors={focused ? ['#FFDB27', '#FFF9DB0D', '#FFF9DB0D'] : ['transparent']}
                  style={{
                    height: size + 10,
                    width: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: 4,
                    borderTopWidth: focused ? 3 : 0,
                    borderColor: focused ? '#FFDB27' : 'transparent',
                  }}
                >
                  <IconsApp.IconHomeActive width={25} height={25} />
                </LinearGradient>
              );
            } else {
              return <IconsApp.IconHomeNonActive width={size} height={size} />;
            }
          },
        }}
      />
      <Tabs.Screen
        name="other-menu"
        options={{
          headerShown: false,
          tabBarLabel: ({ focused }) => {
            return (
              <Text
                size={12}
                style={{
                  fontFamily: focused ? FontsUtils.bold : FontsUtils.regular,
                }}
                color={focused ? ColorsApp.primary : ColorsApp.gray500}
              >
                Other
              </Text>
            );
          },
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              return (
                <LinearGradient
                  colors={focused ? ['#FFDB27', '#FFF9DB0D', '#FFF9DB0D'] : ['transparent']}
                  style={{
                    height: size + 10,
                    width: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: 4,
                    borderTopWidth: focused ? 3 : 0,
                    borderColor: focused ? '#FFDB27' : 'transparent',
                  }}
                >
                  <IconsApp.IconOtherActive width={25} height={25} />
                </LinearGradient>
              );
            } else {
              return <IconsApp.IconOtherNonActive width={size} height={size} />;
            }
          },
        }}
      />
    </Tabs>
  );
}

export default memo(TabsLayout);

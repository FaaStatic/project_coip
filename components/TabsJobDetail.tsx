import { useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import Text from './Text';
import { NavigationState, Route, SceneRendererProps } from 'react-native-tab-view';
import { ColorsApp } from '@untr/apps-coip/themes/colorApp.theme';
import { CustomDimension } from '@untr/apps-coip/utils/customDimension.util';
import { UseFormReturn } from 'react-hook-form';
import { inputChecksheetType } from '@untr/apps-coip/types/inputCheckSheetType.type';
import { FontsUtils } from '@untr/apps-coip/configs/fonUtils.config';

type State = NavigationState<Route>;

type tabJobsProps = {
  props: SceneRendererProps & { navigationState: State };
  methodForm?: UseFormReturn<inputChecksheetType>;
};

const TabsJobDetail = ({ props, methodForm }: tabJobsProps) => {
  const [indexPos, setIndexPos] = useState(0);

  return (
    <View className="h-10 w-full items-start flex-col">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          backgroundColor: 'white',
          marginHorizontal: CustomDimension.scaledHorizontal(20),
        }}
      >
        <View className="h-fit" style={{ flexDirection: 'row', gap: 20 }}>
          {props.navigationState.routes.map((route, index) => {
            return (
              <TouchableOpacity
                className="h-9"
                onPress={() => {
                  setIndexPos(index);
                  props.jumpTo(route.key);
                }}
                key={route.key}
                style={{
                  borderBottomColor: ColorsApp.indicatorColor,
                  borderBottomWidth: indexPos === index ? 2 : 0,
                }}
              >
                <Text
                  size={16}
                  style={{ fontFamily: indexPos === index ? FontsUtils.bold : FontsUtils.medium }}
                  color={
                    methodForm.formState.errors[route.key] !== undefined &&
                    methodForm.formState.errors[route.key] !== null
                      ? ColorsApp.errorColor
                      : indexPos === index
                        ? ColorsApp.black500
                        : ColorsApp.gray300
                  }
                >
                  {route.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
      <View
        className="max-w-full"
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#F1F1F1',
          position: 'absolute',
          bottom: 2,
        }}
      />
    </View>
  );
};

export default TabsJobDetail;

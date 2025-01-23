import { memo } from 'react';
import {
  BottomSheet,
  BottomSheetCloseTrigger,
  BottomSheetContent,
  BottomSheetOpenTrigger,
  BottomSheetView,
} from '@untr/apps-coip/lib/components/deprecated-ui';
import { TouchableOpacity, View } from 'react-native';
import { ArrowDown } from 'lucide-react-native';
import Text from './Text';
import Space from './Space';
import { ColorsApp } from '@untr/apps-coip/themes/colorApp.theme';
import { CustomDimension } from '@untr/apps-coip/utils/customDimension.util';
import { FontsUtils } from '@untr/apps-coip/configs/fonUtils.config';

interface CustomBottomSheetProp {
  listData: any[];
  placeholder: string;
  valueHolder: string;
  callback: (data: any) => void;
}

function CustomBottomSheet({
  listData,
  placeholder,
  valueHolder,
  callback,
}: Readonly<CustomBottomSheetProp>) {
  return (
    <BottomSheet>
      <BottomSheetOpenTrigger asChild>
        <TouchableOpacity
          className="flex-1  w-full flex-row justify-center align-middle items-center rounded-md mt-1 mb-2"
          style={{
            height: 35,
            backgroundColor: ColorsApp.background,
          }}
        >
          <Text
            color={ColorsApp.textColorSecondaryVariant}
            size={CustomDimension.sizeInSp(12)}
            style={{ fontFamily: FontsUtils.medium }}
          >
            {valueHolder.length > 0 ? valueHolder : placeholder}
          </Text>
          <ArrowDown
            width={18}
            height={18}
            style={{
              marginStart: 4,
            }}
          />
        </TouchableOpacity>
      </BottomSheetOpenTrigger>
      <BottomSheetContent>
        <BottomSheetView hadHeader={false} className="pt-2 flex-col p-2 justify-center">
          <View className="justify-center items-center flex-col">
            <Text
              color={ColorsApp.textColorSecondaryVariant}
              size={CustomDimension.sizeInSp(14)}
              style={{ fontFamily: FontsUtils.bold }}
            >
              {placeholder}
            </Text>
          </View>

          <Space height={8} />
          {listData.map((element, index) => {
            return (
              <BottomSheetCloseTrigger key={element.id + 'XX' + index} asChild>
                <TouchableOpacity
                  onPress={() => {
                    callback(element);
                  }}
                  style={{
                    borderBottomWidth: listData.length - 1 !== index ? 0.5 : 0,
                    borderColor: ColorsApp.background,
                  }}
                  className="max-w-full h-9 rounded-lg mb-2 align-middle justify-center items-center"
                >
                  <Text
                    style={{
                      fontWeight: '600',
                      color: 'black',
                      fontSize: CustomDimension.sizeInSp(14),
                    }}
                  >
                    {element.title}
                  </Text>
                </TouchableOpacity>
              </BottomSheetCloseTrigger>
            );
          })}
          <View className={'pb-2 pt-4'}></View>
        </BottomSheetView>
      </BottomSheetContent>
    </BottomSheet>
  );
}

export default memo(CustomBottomSheet);

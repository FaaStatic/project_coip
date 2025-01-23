import { memo } from 'react';
import {
  BottomSheet,
  BottomSheetCloseTrigger,
  BottomSheetContent,
  BottomSheetOpenTrigger,
  BottomSheetView,
} from '@untr/apps-coip/lib/components/deprecated-ui';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ArrowDown } from 'lucide-react-native';
import Text from './Text';
import Space from './Space';
import { ColorsApp } from '@untr/apps-coip/themes/colorApp.theme';
import { CustomDimension } from '@untr/apps-coip/utils/customDimension.util';
import { FontsUtils } from '@untr/apps-coip/configs/fonUtils.config';
import { IconsApp } from '@untr/apps-coip/themes/iconApp.theme';
import { useKeyboard } from '@untr/apps-coip/lib/keyboard';

const listGallery = [
  {
    title: 'Open Camera',
    id: 1,
    value: 1,
  },
];

interface CustomAttachFileProp {
  placeholder: string;
  callback: (data: any) => void;
  colorText?: string;
  borderColor?: string;
  disabled?: boolean;
}

const CustomAttachFile = ({
  placeholder,
  callback,
  disabled = true,
  borderColor = `${ColorsApp.transparent}`,
  colorText = `${ColorsApp.textColorSecondaryVariant}`,
}: Readonly<CustomAttachFileProp>) => {
  const { dismissKeyboard } = useKeyboard();

  return (
    <BottomSheet>
      <BottomSheetOpenTrigger asChild>
        <TouchableOpacity
          disabled={disabled}
          onPress={() => {
            dismissKeyboard();
          }}
          style={[styles.btnStyle, { borderColor: `${borderColor}` }]}
        >
          <Text
            color={colorText}
            size={CustomDimension.sizeInSp(12)}
            style={{ fontFamily: FontsUtils.bold }}
          >
            {placeholder}
          </Text>
          <ArrowDown width={18} className="ms-1" height={18} />
        </TouchableOpacity>
      </BottomSheetOpenTrigger>
      {!disabled ? (
        <BottomSheetContent>
          <BottomSheetView className="pt-2 flex-col justify-center">
            <View className="justify-center h-fit items-center flex-col">
              <Text
                color={ColorsApp.black}
                size={CustomDimension.sizeInSp(14)}
                style={{ fontFamily: FontsUtils.bold }}
              >
                {placeholder}
              </Text>
            </View>
            <Space height={24} />
            {listGallery.map((element, index) => {
              return (
                <BottomSheetCloseTrigger key={element.id + 'XX' + index} asChild>
                  <TouchableOpacity
                    onPress={() => {
                      callback(element);
                    }}
                    style={{
                      borderColor: ColorsApp.background,
                    }}
                    className="max-w-full rounded-lg flex-row align-middle justify-center items-center"
                  >
                    {element.id === 1 && (
                      <IconsApp.IconGallery width={24} height={24} color={'black'} />
                    )}
                    {element.id !== 1 && (
                      <IconsApp.IconCamera width={24} height={24} color={'black'} />
                    )}
                    <Space width={8} />
                    <Text
                      size={CustomDimension.sizeInSp(14)}
                      style={{
                        fontFamily: FontsUtils.bold,
                      }}
                    >
                      {element.title}
                    </Text>
                  </TouchableOpacity>
                </BottomSheetCloseTrigger>
              );
            })}
          </BottomSheetView>
        </BottomSheetContent>
      ) : null}
    </BottomSheet>
  );
};
const styles = StyleSheet.create({
  btnStyle: {
    height: 35,
    backgroundColor: ColorsApp.primary,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 2,
    marginTop: 1,
    borderRadius: 5,
  },
});

export default memo(CustomAttachFile);

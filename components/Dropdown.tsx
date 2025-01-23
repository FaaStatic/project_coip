import { ChevronDown, ChevronUp } from 'lucide-react-native';
import React, { memo, useEffect, useState } from 'react';
import { TouchableOpacity, View, ViewStyle } from 'react-native';
import { CustomDimension } from '@untr/apps-coip/utils/customDimension.util';
import { ColorsApp } from '@untr/apps-coip/themes/colorApp.theme';

interface DropdownProps {
  leftChildren: React.JSX.Element;
  children: React.JSX.Element;
  isOpenFirst?: boolean;
  style?: ViewStyle;
  withBorderBottom?: boolean;
  tagOpen?: string | number;
  idOpenContent?: string | number;
  callOpen?: (idTag: string | number) => void;
}

const Dropdown = ({
  idOpenContent = 0,
  children,
  leftChildren,
  isOpenFirst,
  style,
  withBorderBottom = true,
  tagOpen = '',
  callOpen = null,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(isOpenFirst);

  useEffect(() => {
    if (idOpenContent === tagOpen) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [idOpenContent]);
  return (
    <View>
      <TouchableOpacity
        style={[
          {
            flexDirection: 'row',
            gap: 10,
            alignItems: 'center',
            marginTop: CustomDimension.scaledVertical(20),
          },
          style,
        ]}
        onPress={() => {
          if (callOpen !== null) {
            callOpen(tagOpen);
          }
          setIsOpen(!isOpen);
        }}
      >
        <View
          style={{
            borderBottomWidth: withBorderBottom ? 1 : 0,
            borderBottomColor: ColorsApp.background,
            flex: 1,
            paddingBottom: CustomDimension.scaledVertical(20),
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          {leftChildren}
          <View className="items-center justify-center flex-col">
            {isOpen ? (
              <ChevronUp color={ColorsApp.black} />
            ) : (
              <ChevronDown color={ColorsApp.black} />
            )}
          </View>
        </View>
      </TouchableOpacity>

      {isOpen && children}
    </View>
  );
};

export default memo(Dropdown);

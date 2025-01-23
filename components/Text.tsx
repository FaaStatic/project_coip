import type { ReactNode } from 'react';
import { memo } from 'react';
import type { NativeSyntheticEvent, TextLayoutEventData, TextStyle } from 'react-native';
import { Text } from 'react-native';
import { ColorsApp } from '@untr/apps-coip/themes/colorApp.theme';
import { FontsUtils } from '@untr/apps-coip/configs/fonUtils.config';
import { CustomDimension } from '@untr/apps-coip/utils/customDimension.util';

interface Props {
  children: ReactNode;
  style?: TextStyle | TextStyle[];
  numberOfLines?: number | undefined;
  onPress?: () => void;
  type?: 'medium' | 'reguler' | 'bold';
  color?: string;
  size?: number;
  opacity?: number;
  lineHeight?: number;
  textAlign?: 'left' | 'center' | 'right';
  onTextLayout?: (e: NativeSyntheticEvent<TextLayoutEventData>) => void;
}

const Component = ({
  style,
  children,
  numberOfLines,
  onPress,
  type = 'reguler',
  color = ColorsApp.black,
  size = 16,
  opacity,
  lineHeight,
  textAlign = 'left',
  onTextLayout,
}: Props) => {
  const _type = () => {
    if (type === 'bold') {
      return FontsUtils.bold;
    }
    if (type === 'medium') {
      return FontsUtils.medium;
    }
    return FontsUtils.regular;
  };

  return (
    <Text
      style={[
        {
          fontFamily: _type(),
          color,
          fontSize: CustomDimension.sizeInSp(size),
          opacity,
          lineHeight,
          textAlign,
          letterSpacing: -0.26,
        },
        style,
      ]}
      lineBreakMode="middle"
      numberOfLines={numberOfLines}
      onPress={onPress}
      onTextLayout={onTextLayout}
    >
      {children}
    </Text>
  );
};

export default memo(Component);

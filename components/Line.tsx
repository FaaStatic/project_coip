import * as React from 'react';
import { View } from 'react-native';
import { ColorsApp } from '@untr/apps-coip/themes/colorApp.theme';
import { CustomDimension } from '@untr/apps-coip/utils/customDimension.util';

interface LineHorizontalProps {
  height: number;
  color?: string;
}

const LineHorizontal = ({ height, color = ColorsApp.background }: LineHorizontalProps) => {
  return (
    <View
      style={{
        backgroundColor: color,
        height: height,
        marginHorizontal: CustomDimension.scaledHorizontal(-25),
      }}
    />
  );
};

export default LineHorizontal;

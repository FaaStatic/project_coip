import React, { memo } from 'react';
import { View } from 'react-native';

interface Props {
  height?: number;
  width?: number;
}

const Space = ({ width, height }: Props) => <View style={{ height, width }} />;

export default memo(Space);

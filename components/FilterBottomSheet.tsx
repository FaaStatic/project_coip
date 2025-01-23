import React, { memo } from 'react';
import { TouchableOpacity } from 'react-native';
import {
  BottomSheet,
  BottomSheetContent,
  BottomSheetOpenTrigger,
  BottomSheetView,
} from '@untr/apps-coip/lib/components/deprecated-ui/bottom-sheet';
import { IconsApp } from '@untr/apps-coip/themes/iconApp.theme';
import Text from '@untr/apps-coip/components/Text';
import { FontsUtils } from '@untr/apps-coip/configs/fonUtils.config';
import { CustomDimension } from '@untr/apps-coip/utils/customDimension.util';
import Space from '@untr/apps-coip/components/Space';

type filterProps = {
  isFilter?: boolean;
  children?: React.ReactNode;
  title?: string;
};

function FilterBottomSheetCustom({ isFilter, children, title }: filterProps) {
  return (
    <BottomSheet>
      <BottomSheetOpenTrigger asChild>
        <TouchableOpacity className="flex-row justify-center align-middle items-center rounded-md mt-2 mb-2">
          {isFilter && <IconsApp.IconFilter width={24} height={20} />}
          {!isFilter && <IconsApp.IconSort width={20} height={20} />}
        </TouchableOpacity>
      </BottomSheetOpenTrigger>
      <BottomSheetContent>
        <BottomSheetView hadHeader={false} className="pt-2 flex-col p-2 justify-center w-full">
          <Text
            style={{
              fontFamily: FontsUtils.bold,
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: CustomDimension.sizeInSp(18),
              alignSelf: 'center',
            }}
          >
            {title}
          </Text>
          <Space height={16} />
          {children}
        </BottomSheetView>
      </BottomSheetContent>
    </BottomSheet>
  );
}

export default memo(FilterBottomSheetCustom);

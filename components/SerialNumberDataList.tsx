import { ArrowDown } from 'lucide-react-native';
import Text from './Text';
import { ColorsApp } from '@untr/apps-coip/themes/colorApp.theme';
import { CustomDimension } from '@untr/apps-coip/utils/customDimension.util';
import { FontsUtils } from '@untr/apps-coip/configs/fonUtils.config';
import { TouchableOpacity } from 'react-native';

interface CustomBottomSheetProp {
  placeholder: string;
  valueHolder: string;
}

const SerialNumberDataList = ({ placeholder, valueHolder }: Readonly<CustomBottomSheetProp>) => {
  return (
    <TouchableOpacity
      disabled={true}
      className="flex-1  w-full flex-row justify-center align-middle items-center rounded-md mt-1 mb-2"
      style={{
        height: 40,
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
  );
};

export default SerialNumberDataList;

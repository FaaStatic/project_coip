import { View } from 'react-native';
import { ColorsApp } from '@untr/apps-coip/themes/colorApp.theme';
import { CustomDimension } from '@untr/apps-coip/utils/customDimension.util';
import { FontsUtils } from '@untr/apps-coip/configs/fonUtils.config';
import { Skeleton } from '@untr/apps-coip/lib/components/ui/skeleton';
import Text from './Text';

interface CardJobsProps {
  title: string;
  total: number;
  isLoading: boolean;
}

const CardJobs = ({ title, total = 0, isLoading }: CardJobsProps) => {
  if (isLoading) {
    return <Skeleton className="flex-1 rounded-xl h-44 ps-[15px] py-[20px]" />;
  }

  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: ColorsApp.background,
        paddingLeft: CustomDimension.scaledHorizontal(15),
        paddingVertical: CustomDimension.scaledVertical(20),
        flex: 1,
        borderRadius: 16,
      }}
    >
      <View style={{ height: 56 }}>
        <Text size={CustomDimension.sizeInSp(13)} color={ColorsApp.grey} numberOfLines={2}>
          {title}
        </Text>
      </View>
      <Text
        size={CustomDimension.sizeInSp(40)}
        color={ColorsApp.textColorPrimary}
        style={{ fontWeight: 'bold', fontFamily: FontsUtils.bold }}
      >
        {total}
      </Text>
      <Text size={CustomDimension.sizeInSp(14)} color={ColorsApp.listTextColor}>
        List
      </Text>
    </View>
  );
};

export default CardJobs;

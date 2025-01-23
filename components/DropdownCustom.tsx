import { memo } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@untr/apps-coip/lib/components/ui/dropdown-menu';
import { Button } from '@untr/apps-coip/lib/components/ui/button';
import Text from './Text';
import { CustomDimension } from '@untr/apps-coip/utils/customDimension.util';
import { FontsUtils } from '@untr/apps-coip/configs/fonUtils.config';
import { TouchableOpacity } from 'react-native';

interface DropdownData {
  id: string;
  title: string;
}

interface DropdownCustomProp {
  dataItem: DropdownData[];
  callback: (data: any) => void;
  placeholder: string;
  fullWidth?: boolean;
  valueholder: string;
}

const DropdownCustom = ({
  dataItem,
  callback,
  placeholder,
  valueholder,
  fullWidth = false,
}: Readonly<DropdownCustomProp>) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <TouchableOpacity className="h-fit w-fit">
          <Text
            style={{
              fontSize: CustomDimension.sizeInSp(12),
            }}
          >
            {valueholder.length > 0 ? valueholder : placeholder}
          </Text>
        </TouchableOpacity>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className=" mt-2"
        disablePositioningStyle={false}
        style={{
          zIndex: 99,
          flex: 1,
          width: fullWidth ? 256 : 'auto',
        }}
        side="bottom"
        align="start"
      >
        <DropdownMenuLabel
          style={{
            fontFamily: FontsUtils.bold,
            textAlign: 'center',
          }}
        >
          {placeholder}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {dataItem.map((element) => {
          return (
            <DropdownMenuItem
              style={{
                zIndex: 99,
              }}
              key={element.id}
              onPress={() => {
                callback(element);
              }}
            >
              <Text
                style={{
                  color: '#3C3B3B',
                  fontSize: CustomDimension.sizeInSp(12),
                  fontFamily: FontsUtils.medium,
                }}
              >
                {element.title}
              </Text>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default memo(DropdownCustom);

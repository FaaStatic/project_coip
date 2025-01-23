import { ChevronDown, ChevronUp } from 'lucide-react-native';
import { useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import Text from './Text';
import { ColorsApp } from '@untr/apps-coip/themes/colorApp.theme';
import { IconsApp } from '@untr/apps-coip/themes/iconApp.theme';
import { CustomDimension } from '@untr/apps-coip/utils/customDimension.util';
import { FontsUtils } from '@untr/apps-coip/configs/fonUtils.config';

interface SelectedSectionJobProps {
  item: any;
  index: number;
  section?: string;
  type: string;
  onSelectedParent: (type: string, parentIndex: number, section?: string) => void;
  onSelectedChild: (
    type: string,
    parentIndex: number,
    childIndex: number,
    section?: string
  ) => void;
}

const SelectedSectionJob = ({
  item,
  index,
  type,
  onSelectedChild,
  section,
  onSelectedParent,
}: SelectedSectionJobProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <View>
      <TouchableOpacity
        className="justify-between"
        style={{
          flexDirection: 'row',
          gap: 10,
          alignItems: 'flex-start',
          marginTop: CustomDimension.scaledVertical(20),
          borderBottomWidth: 1,
          borderBottomColor: ColorsApp.background,
        }}
        onPress={() => {
          onSelectedParent(type, index, section);
        }}
      >
        <View className="flex-row items-center">
          <Image
            source={item?.selected ? IconsApp.selectedCircle : IconsApp.selectCircle}
            style={{
              height: 16,
              width: 16,
              marginEnd: 8,
              resizeMode: 'contain',
              marginTop: CustomDimension.scaledVertical(2),
            }}
          />
          <Text type="bold">{item.title}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            setIsOpen(!isOpen);
          }}
        >
          <View
            style={{
              flex: 1,
              paddingBottom: CustomDimension.scaledVertical(20),
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <View>
              {isOpen ? (
                <ChevronUp color={ColorsApp.black} />
              ) : (
                <ChevronDown color={ColorsApp.black} />
              )}
            </View>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>

      {isOpen &&
        item.child.map((itm: any, idx: any) => {
          return (
            <TouchableOpacity
              onPress={() => onSelectedChild(type, index, idx, section)}
              key={idx}
              style={{
                flexDirection: 'row',
                gap: 10,
                marginLeft: CustomDimension.scaledVertical(25),
                marginTop: CustomDimension.scaledVertical(20),
              }}
            >
              <View>
                <Image
                  source={itm?.selected ? IconsApp.selectedSquare : IconsApp.selectSquare}
                  style={{
                    height: 16,
                    width: 16,
                    resizeMode: 'contain',
                    marginTop: CustomDimension.scaledVertical(2),
                  }}
                />
              </View>
              <View
                style={{
                  borderBottomWidth: item.child.length > 1 ? 1 : 0,
                  borderBottomColor: ColorsApp.background,
                  flex: 1,
                  paddingBottom: CustomDimension.scaledVertical(20),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Text type="medium" style={{ fontFamily: FontsUtils.medium }}>
                  {itm.title}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
    </View>
  );
};

export default SelectedSectionJob;

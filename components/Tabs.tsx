import { ScrollView, TouchableOpacity, View } from 'react-native';
import Text from './Text';
import { ColorsApp } from '@untr/apps-coip/themes/colorApp.theme';
import { CustomDimension } from '@untr/apps-coip/utils/customDimension.util';

interface TabsProps {
  data: { title: string; id: string }[];
  selected: string;
  setSelected: (id: string) => void;
  withSticky?: boolean;
}

const Tabs = ({ data, selected, setSelected, withSticky }: TabsProps) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{
        backgroundColor: withSticky ? ColorsApp.white : 'transparent',
        marginHorizontal: CustomDimension.scaledHorizontal(-25),
        paddingHorizontal: CustomDimension.scaledHorizontal(25),
      }}
    >
      <View style={{ flexDirection: 'row', gap: 33 }}>
        {data.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => setSelected(item.id)}
              key={index}
              style={{
                borderBottomColor: ColorsApp.indicatorColor,
                borderBottomWidth: item.id === selected ? 2 : 0,
                paddingBottom: 5,
              }}
            >
              <Text
                size={CustomDimension.sizeInSp(14)}
                type={item.id === selected ? 'bold' : 'reguler'}
                color={item.id === selected ? ColorsApp.black : ColorsApp.gray500}
              >
                {item.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default Tabs;

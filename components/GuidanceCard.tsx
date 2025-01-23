import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Text from './Text';
import Space from './Space';
import { CustomDimension } from '@untr/apps-coip/utils/customDimension.util';
import { ColorsApp } from '@untr/apps-coip/themes/colorApp.theme';

interface GuidanceCardProps {
  data: { id: number | string; title: string; guidance_list: string[] }[];
}

const GuidanceCard = ({ data }: GuidanceCardProps) => {
  const [selected, setSelected] = useState(data[0]);
  return (
    <View>
      <View style={{ flexDirection: 'row', gap: 20 }}>
        {data.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => setSelected(item)}
              key={index}
              style={{
                flex: 1,
                backgroundColor:
                  selected?.id === item.id ? ColorsApp.primary : ColorsApp.background,
                paddingVertical: CustomDimension.scaledVertical(12),
                borderRadius: 8,
              }}
            >
              <Text type="medium" size={12} textAlign="center">
                {item.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <Space height={15} />
      <View
        style={{
          padding: 15,
          backgroundColor: ColorsApp.blue200,
          borderRadius: 10,
        }}
      >
        {selected?.guidance_list.map((item, index) => {
          return (
            <View
              style={{
                flexDirection: 'row',
                gap: 5,
                marginBottom: index === data.length ? 0 : 3,
              }}
              key={index}
            >
              <Text style={{ marginTop: CustomDimension.scaledVertical(-5) }}>{'\u2022'}</Text>
              <Text size={12}>{item}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default GuidanceCard;

const styles = StyleSheet.create({
  container: {},
});

import { useMemo, useState } from 'react';
import {
  BottomSheet,
  BottomSheetCloseTrigger,
  BottomSheetContent,
  BottomSheetOpenTrigger,
  BottomSheetView,
} from '@untr/apps-coip/lib/components/deprecated-ui';
import { TouchableOpacity, View } from 'react-native';
import { ArrowDown } from 'lucide-react-native';
import Text from './Text';
import Space from './Space';
import { ColorsApp } from '@untr/apps-coip/themes/colorApp.theme';
import { CustomDimension } from '@untr/apps-coip/utils/customDimension.util';
import { FontsUtils } from '@untr/apps-coip/configs/fonUtils.config';
import LoadingCustom from './LoadingCustom';
import { FlashList } from '@shopify/flash-list';
import TextInput from './TextInput';
import { useQueryClient } from '@tanstack/react-query';
import { useKeyboard } from '@untr/apps-coip/lib/keyboard';
import { useGetAllEquipmentExcavator } from '@untr/apps-coip/hooks/useGetAllEquipmenExcavator';

interface CustomBottomSheetProp {
  placeholder: string;
  valueHolder: string;
  type?: string;
  disabled?: boolean;
  callback: (data: any) => void;
}

const EquipmentDataUnit = ({
  placeholder,
  valueHolder,
  disabled = false,
  callback,
}: Readonly<CustomBottomSheetProp>) => {
  const { isKeyboardVisible, keyboardHeight } = useKeyboard();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isSuccess, refetch, isFetching } =
    useGetAllEquipmentExcavator(search, 1);

  const equipmentList = useMemo(() => {
    return data?.pages.reduce((acc, page) => {
      return [...acc, ...page];
    }, []);
  }, [data]);

  return (
    <View className="w-full h-fit min-h-14">
      <BottomSheet>
        <BottomSheetOpenTrigger asChild disabled={disabled}>
          <TouchableOpacity
            disabled={disabled}
            className="flex-1  w-full flex-row justify-center align-middle items-center rounded-md mt-1 mb-2"
            style={{
              height: 35,
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
        </BottomSheetOpenTrigger>
        {!disabled && (
          <BottomSheetContent
            enableOverDrag={false}
            enableHandlePanningGesture={false}
            enableContentPanningGesture={false}
            enablePanDownToClose={false}
            enableDynamicSizing={false}
            snapPoints={
              isKeyboardVisible
                ? ['75%', CustomDimension.HEIGHT_PERCENTAGE(45) + keyboardHeight]
                : ['45%', CustomDimension.HEIGHT_PERCENTAGE(45)]
            }
          >
            <View className="justify-center items-center flex-col">
              <Text
                color={ColorsApp.textColorSecondaryVariant}
                size={CustomDimension.sizeInSp(14)}
                style={{ fontFamily: FontsUtils.bold }}
              >
                {placeholder}
              </Text>
            </View>
            <Space height={8} />
            <View
              className="rounded-2xl shadow-sm ms-5 me-5 shadow-black "
              style={{
                backgroundColor: ColorsApp.white,
              }}
            >
              <TextInput
                onChange={(value) => {
                  setSearch(value);
                  setTimeout(() => {
                    queryClient.resetQueries({
                      queryKey: ['getEquipmentUnit', search],
                      exact: true,
                    });
                    refetch();
                  }, 500);
                }}
                autoCapitalize="none"
                placeholderColor="black"
                stylesBox={{
                  padding: 10,
                  height: 10,
                  justifyContent: 'center',
                  borderBottomWidth: 0,
                  borderBottomColor: '#D3D3D3',

                  width: '100%',
                }}
                textStyle={{
                  marginLeft: -5,
                  fontWeight: '400',
                  color: 'black',
                  fontSize: CustomDimension.sizeInSp(14),
                }}
                placeholder={'Search unit model here'}
                value={search}
              />
            </View>
            <BottomSheetView className="flex-1">
              {isFetching && !isSuccess ? (
                <View className="flex-1">
                  <LoadingCustom
                    heightBg={CustomDimension.HEIGHT_PERCENTAGE(45)}
                    showLoading={isFetching && !isSuccess}
                    classCustom="w-full h-full justify-center flex-col"
                  />
                </View>
              ) : (
                <View
                  className="pt-2 flex-col p-2  justify-center w-full"
                  style={{
                    height: CustomDimension.HEIGHT_PERCENTAGE(35),
                  }}
                >
                  <Space height={8} />
                  {isSuccess && equipmentList !== undefined && equipmentList.length > 0 && (
                    <View className="flex-1 flex-grow">
                      <FlashList
                        showsVerticalScrollIndicator={false}
                        estimatedFirstItemOffset={10}
                        keyboardShouldPersistTaps="handled"
                        estimatedItemSize={equipmentList.length}
                        data={equipmentList}
                        onEndReached={() => {
                          if (hasNextPage && !isFetchingNextPage) {
                            fetchNextPage();
                          }
                        }}
                        onEndReachedThreshold={0.5}
                        keyExtractor={(item) => `${item?.unitCode}${item?.id}`}
                        renderItem={({ item, index }) => (
                          <BottomSheetCloseTrigger key={item?.id + 'XX' + index} asChild>
                            <TouchableOpacity
                              onPress={() => {
                                callback(item);
                              }}
                              style={{
                                borderBottomWidth: equipmentList?.length - 1 !== index ? 0.5 : 0,
                                borderColor: ColorsApp.background,
                              }}
                              className="max-w-full h-10 rounded-lg mb-2 align-middle justify-center items-center"
                            >
                              <Text
                                style={{
                                  color: '#3C3B3B',
                                  fontSize: CustomDimension.sizeInSp(14),
                                  fontFamily: FontsUtils.bold,
                                }}
                              >
                                {item.unitModel as string}
                              </Text>
                            </TouchableOpacity>
                          </BottomSheetCloseTrigger>
                        )}
                      />
                      <LoadingCustom
                        heightBg={100}
                        classCustom="w-full items-center justify-center flex-col"
                        showLoading={isFetchingNextPage}
                      />
                    </View>
                  )}
                </View>
              )}
            </BottomSheetView>
          </BottomSheetContent>
        )}
      </BottomSheet>
    </View>
  );
};

export default EquipmentDataUnit;

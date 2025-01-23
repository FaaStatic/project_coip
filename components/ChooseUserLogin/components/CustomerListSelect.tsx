import { useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import { useListCustomer } from '@untr/apps-coip/hooks/useListCustomer';
import { addRemoveCustomerList } from '@untr/apps-coip/utils/customer.util';
import Text from '@untr/apps-coip/components/Text';
import { FontsUtils } from '@untr/apps-coip/configs/fonUtils.config';
import { ColorsApp } from '@untr/apps-coip/themes/colorApp.theme';
import { IconsApp } from '@untr/apps-coip/themes/iconApp.theme';

const CustomerListSelect = () => {
  const queryClient = useQueryClient();
  const { data, isFetching } = useListCustomer(true, 0);
  const dropdownController = useRef(null);

  const handleSelectItem = async (item) => {
    await addRemoveCustomerList(item.id, false).then(() => {
      queryClient.fetchQuery({
        queryKey: ['getUserList', false, 1],
      });
    });
  };

  if (isFetching && !data) {
    return (
      <View className="my-[8px] flex-row rounded-[8px] p-[14px] w-full h-[62px] bg-transparent items-center">
        <ActivityIndicator size={'small'} color={ColorsApp.primary} />
        <Text size={14} style={styles.textStyle}>
          Prepare Data ...
        </Text>
      </View>
    );
  }

  return (
    <View className="my-[8px] flex-row rounded-[8px] p-[14px] w-full h-[62px] bg-white border-[#E1E1E1] border-[1px] items-center">
      <View className="flex flex-1">
        <AutocompleteDropdown
          controller={(controller) => {
            dropdownController.current = controller;
          }}
          editable={true}
          clearOnFocus={false}
          closeOnBlur={true}
          loading={false}
          suggestionsListMaxHeight={180}
          debounce={500}
          matchFrom={'any'}
          textInputProps={{
            placeholder: 'Input Customer Name',
            autoCorrect: false,
            autoCapitalize: 'characters',
            style: styles.textInputProp,
            maxLength: 30,
          }}
          inputContainerStyle={styles.inputContainerStyle}
          suggestionsListContainerStyle={styles.suggestionDropdownStyle}
          containerStyle={styles.containerDropdownStyle}
          suggestionsListTextStyle={styles.textInputProp}
          direction={'down'}
          closeOnSubmit={true}
          showChevron={false}
          showClear={false}
          onSubmit={() => {}}
          onSelectItem={handleSelectItem}
          dataSet={data}
        />
      </View>
      <IconsApp.IconLoop width={20} height={20} />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainerStyle: {
    backgroundColor: 'white',
    backfaceVisibility: 'hidden',
  },
  textStyle: {
    fontFamily: FontsUtils.medium,
    color: ColorsApp.black,
    marginStart: 8,
  },
  containerDropdownStyle: {
    borderRadius: 8,
    backgroundColor: ColorsApp.transparent,
    borderColor: '#929292',
  },
  suggestionDropdownStyle: {
    backgroundColor: ColorsApp.white,
    borderRadius: 8,
    padding: 8,
    width: '100%',
    shadowRadius: 8,
  },
  textInputProp: {
    backgroundColor: 'white',
    color: 'black',
    fontSize: 12,
    alignItems: 'center',
    textAlign: 'center',
  },
});
export default CustomerListSelect;

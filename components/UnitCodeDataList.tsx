import { useCallback, useEffect, useRef, useState } from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInputSubmitEditingEventData,
  TouchableOpacity,
  View,
} from 'react-native';
import Text from './Text';
import { ColorsApp } from '@untr/apps-coip/themes/colorApp.theme';
import { CustomDimension } from '@untr/apps-coip/utils/customDimension.util';
import { FontsUtils } from '@untr/apps-coip/configs/fonUtils.config';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import { GenerateUid } from '@untr/apps-coip/utils/generateUuid.util';
import { useGetSpesificUnitCode } from '@untr/apps-coip/hooks/useGetSpesificUnitCode';

interface CustomBottomSheetProp {
  placeholder: string;
  valueHolder: string;
  serialNumber?: string;
  idEquipment?: string;
  disabled?: boolean;
  smr?: number;
  SNunit?: string;
  operatorName?: string;
  callback: (data: any) => void;
}

const UnitCodeDataList = ({
  placeholder,
  valueHolder,
  disabled = false,
  serialNumber = '',
  callback,
  idEquipment,
}: Readonly<CustomBottomSheetProp>) => {
  const dropdownController = useRef(null);
  const { data, refetch } = useGetSpesificUnitCode(serialNumber);

  const processtext = (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
    const textInput = e.nativeEvent.text || null;

    if (!textInput) return;

    const unitLocal = data?.filter((item) => item.title === textInput) || [];

    const idGenEquipment = GenerateUid.Uuid32Bit();
    const param = {
      id: idGenEquipment,
      title: textInput,
      serialNumber: '-',
      smr: 0,
    };

    if (unitLocal.length > 0) {
      const selectedItem = unitLocal[0];
      dropdownController?.current?.setInputText(selectedItem.title);
      callback(selectedItem);
      dropdownController?.current?.setItem(selectedItem);
    } else {
      dropdownController?.current?.setInputText(param.title);
      callback(param);
      dropdownController?.current?.setItem(param);
    }
  };

  const handleSelect = useCallback((value: any) => {
    dropdownController?.current?.setItem(value);
    callback(value);
  }, []);

  const onSubmit = (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
    processtext(e);
  };

  const onHandleSelect = useCallback(
    (value) => {
      handleSelect(value);
    },
    [handleSelect]
  );

  useEffect(() => {
    if (serialNumber) {
      refetch();
    }
  }, [refetch, serialNumber]);

  useEffect(() => {
    if (valueHolder === '-') {
      const idGenEquipment = GenerateUid.Uuid32Bit();
      const param = {
        id: idGenEquipment,
        title: '-',
        serialNumber: '-',
        smr: 0,
      };
      dropdownController?.current?.setInputText('-');
      dropdownController?.current?.setItem(param);
    } else {
      dropdownController?.current?.setInputText(valueHolder);
    }
  }, [valueHolder]);

  return (
    <View>
      {disabled ? (
        <TouchableOpacity
          className="flex-1 h-10 w-full justify-center align-middle items-center rounded-md mt-1 mb-2"
          disabled
          style={{
            backgroundColor: ColorsApp.background,
          }}
        >
          <Text
            color={ColorsApp.textColorSecondaryVariant}
            size={CustomDimension.sizeInSp(12)}
            style={{ fontFamily: FontsUtils.medium }}
          >
            {valueHolder !== '-' ? valueHolder : placeholder}
          </Text>
        </TouchableOpacity>
      ) : (
        <View className="h-fit w-full">
          <AutocompleteDropdown
            controller={(controller) => {
              dropdownController.current = controller;
            }}
            editable={!disabled}
            clearOnFocus={false}
            closeOnBlur={true}
            loading={false}
            suggestionsListMaxHeight={180}
            debounce={500}
            matchFrom={'any'}
            textInputProps={{
              placeholder: 'Input Unit Code',
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
            showClear={true}
            onSubmit={onSubmit}
            onSelectItem={onHandleSelect}
            initialValue={{ id: idEquipment }}
            dataSet={data}
          />
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  inputContainerStyle: {
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    backfaceVisibility: 'hidden',
  },
  containerDropdownStyle: {
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderColor: '#929292',
  },
  suggestionDropdownStyle: {
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
  },
  textInputProp: {
    backgroundColor: '#F0F0F0',
    color: 'black',
    alignItems: 'center',
    borderRadius: 8,
    textAlign: 'center',
  },
});

export default UnitCodeDataList;

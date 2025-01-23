import { FieldErrors, useFieldArray, useFormContext } from 'react-hook-form';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { GenerateUid } from '@untr/apps-coip/utils/generateUuid.util';
import Text from '@untr/apps-coip/components/Text';
import { FontsUtils } from '@untr/apps-coip/configs/fonUtils.config';
import { ColorsApp } from '@untr/apps-coip/themes/colorApp.theme';
import { CustomDimension } from '@untr/apps-coip/utils/customDimension.util';
import {
  inputChecksheetType,
  jobIdentityErrorsType,
  UnitList,
} from '@untr/apps-coip/types/inputCheckSheetType.type';
import UnitItem from './UnitItem';
import Space from '@untr/apps-coip/components/Space';
import { IconsApp } from '@untr/apps-coip/themes/iconApp.theme';
import { memo } from 'react';

type UnitItemComponenetsProp = {
  jobId: string;
  isDisabled: boolean;
  section: string;
};

const UnitItemComponents = ({ jobId, isDisabled, section }: UnitItemComponenetsProp) => {
  const formUnit = useFormContext<inputChecksheetType>();
  const errorsField: FieldErrors<jobIdentityErrorsType> = formUnit.formState.errors;

  const { fields: excavatorList } = useFieldArray({
    control: formUnit.control,
    shouldUnregister: false,
    name: `${section}.excavator_list`,
  });

  const {
    fields: unitList,
    append: addUnitList,
    remove,
  } = useFieldArray({
    control: formUnit.control,
    shouldUnregister: false,
    name: `${section}.unit_list`,
  });

  const addUnit = () => {
    const genUnitList = GenerateUid.Uuid32Bit();
    const dataTemp = {
      id: genUnitList,
      jobId: jobId,
      equipmentId: '',
      open: false,
      operatorName: '',
      isExcavator: false,
      equipment: {
        id: '',
        type: '',
        unitModel: `New Form Unit`,
        serialNumber: '',
        unitCode: '-',
        smr: 0,
        isProductUT: true,
      },
    };
    addUnitList(dataTemp);
  };

  const removeUnit = (index: number) => {
    remove(index);
  };

  return (
    <View className="w-full h-fit">
      {excavatorList !== undefined && excavatorList.length !== undefined ? (
        excavatorList.length > 0 ? (
          <Text
            style={{
              fontFamily: FontsUtils.bold,
            }}
            color={ColorsApp.primary}
            size={CustomDimension.sizeInSp(16)}
          >
            Excavator List
          </Text>
        ) : null
      ) : null}
      {excavatorList !== undefined && excavatorList.length !== undefined
        ? excavatorList.length > 0
          ? excavatorList.map((itemData, index) => {
              const item: UnitList = itemData;
              return (
                <UnitItem
                  errors={errorsField}
                  key={item.id}
                  disabled={isDisabled}
                  open={item?.open ? item?.open : false}
                  isExcavator={true}
                  lengthItem={excavatorList.length || 0}
                  jobId={item.jobId}
                  isProductUT={item.equipment.isProductUT || false}
                  indexUnit={index}
                  unitCode={item.equipment.unitCode}
                  section={section}
                  smr={item.equipment.smr}
                  id={item.id}
                  operatorName={item.operatorName}
                  callbackChangeUnit={async (data) => {
                    formUnit.setValue(`${section}.excavator_list.${index}`, data);
                    formUnit.clearErrors(`${section}.excavator_list.${index}`);
                    await formUnit.trigger(`${section}.excavator_list.${index}`);
                  }}
                  listName={'excavator_list'}
                />
              );
            })
          : null
        : null}
      <Space height={24} />
      {unitList !== undefined && unitList.length !== undefined ? (
        unitList.length > 0 ? (
          <Text
            style={{
              fontFamily: FontsUtils.bold,
            }}
            color={ColorsApp.primary}
            size={CustomDimension.sizeInSp(16)}
          >
            Unit List
          </Text>
        ) : null
      ) : null}

      {unitList !== undefined && unitList.length !== undefined
        ? unitList.length > 0
          ? unitList.map((itemData, index) => {
              const item: UnitList = itemData;
              return (
                <UnitItem
                  open={item?.open ? item?.open : false}
                  errors={errorsField}
                  key={item.id}
                  lengthItem={unitList.length || 0}
                  isExcavator={false}
                  jobId={item.jobId}
                  isProductUT={item.equipment.isProductUT || false}
                  disabled={isDisabled}
                  indexUnit={index}
                  unitCode={item.equipment.unitCode}
                  section={section}
                  smr={item.equipment.smr}
                  id={item.id}
                  operatorName={item.operatorName}
                  callbackChangeUnit={async (data) => {
                    formUnit.setValue(`${section}.unit_list.${index}`, data);
                    formUnit.clearErrors(`${section}.unit_list.${index}`);
                    await formUnit.trigger(`${section}.unit_list.${index}`);
                  }}
                  remove={() => removeUnit(index)}
                  listName={'unit_list'}
                />
              );
            })
          : null
        : null}
      <Space height={16} />
      {unitList.length < 5 && !isDisabled && (
        <TouchableOpacity
          style={styles.styleButtonAddUnit}
          onPress={() => {
            addUnit();
          }}
        >
          <IconsApp.IconAdd className="me-3" height={14} width={14} style={styles.marginEnd10} />
          <Text size={CustomDimension.sizeInSp(14)} style={styles.textBoldStyle}>
            Add Unit
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  marginTop16: {
    marginTop: 16,
  },
  marginBottom24: {
    marginBottom: 24,
  },

  styleButtonAddUnit: {
    backgroundColor: '#3DA7DE',
    height: 45,
    width: '100%',
    flexDirection: 'row',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBoldStyle: {
    fontFamily: FontsUtils.bold,
    color: 'white',
  },
  marginEnd10: {
    marginEnd: 10,
  },
});
export default memo(UnitItemComponents);

import { ArrowDown, Space, Trash2Icon } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { FieldErrors, UseFieldArrayRemove, useFormContext } from 'react-hook-form';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ColorsApp } from '@untr/apps-coip/themes/colorApp.theme';
import EquipmentDataExcavator from '@untr/apps-coip/components/EquipmentDataExcavator';
import EquipmentDataUnit from '@untr/apps-coip/components/EquipmentDataUnit';
import { FontsUtils } from '@untr/apps-coip/configs/fonUtils.config';
import { CustomDimension } from '@untr/apps-coip/utils/customDimension.util';
import { Switch } from '@untr/apps-coip/lib/components/ui/switch';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@untr/apps-coip/lib/components/ui/accordion';
import Text from '@untr/apps-coip/components/Text';
import TextInput from '@untr/apps-coip/components/TextInput';
import { GenerateUid } from '@untr/apps-coip/utils/generateUuid.util';
import { Separator } from '@untr/apps-coip/lib/components/ui/separator';
import SerialNumberDataList from '@untr/apps-coip/components/SerialNumberDataList';
import UnitCodeDataList from '@untr/apps-coip/components/UnitCodeDataList';
import { jobIdentityErrorsType } from '@untr/apps-coip/types/inputCheckSheetType.type';
import { useKeyboard } from '@untr/apps-coip/lib/keyboard';

interface UnitData {
  isProductUT: boolean;
  jobId: string;
  listName: string;
  unitCode: string;
  open: boolean;
  section?: string;
  smr: number;
  indexUnit?: number;
  id?: any;
  isExcavator?: boolean;
  operatorName?: string;
  callbackChangeUnit: (data: any) => void;
  remove?: UseFieldArrayRemove;
  lengthItem?: number;
  disabled?: boolean;
  errors?: FieldErrors<jobIdentityErrorsType>;
}

const UnitItem = ({
  isProductUT,
  unitCode,
  open,
  disabled = false,
  listName,
  smr,
  jobId,
  id,
  operatorName,
  section,
  indexUnit,
  callbackChangeUnit,
  isExcavator = false,
  remove,
  lengthItem,
  errors,
}: Readonly<UnitData>) => {
  const form = useFormContext();
  const idGenEquipment = GenerateUid.Uuid32Bit();
  const [productUt, setProductUT] = useState(isProductUT);
  const [serialNumberIsEdit, setSerialNumberIsEdit] = useState(false);
  const { isKeyboardVisible } = useKeyboard();

  useEffect(() => {
    setProductUT(isProductUT);
  }, []);

  return (
    <View className="h-fit w-full flex-col">
      <Accordion
        type="multiple"
        onValueChange={(_) => {
          form.setValue(`${section}.${listName}.${indexUnit}.open`, !open);
        }}
        collapsable={true}
        defaultValue={open ? [id] : []}
        className="w-full max-w-sm native:max-w-md"
      >
        <AccordionItem value={id}>
          <AccordionTrigger className="flex-row w-full h-fit items-center">
            <Text
              size={CustomDimension.sizeInSp(14)}
              style={[
                styles.fontLabelStyle,
                {
                  color: unitCode !== undefined ? '#3C3B3B' : 'black',
                },
              ]}
            >
              {`${form.watch(`${section}.${listName}.${indexUnit}.equipment.unitModel`) || ''} • ${(() => {
                const code = form.watch(`${section}.${listName}.${indexUnit}.equipment.unitCode`);
                return code === '-' || code === '' ? '' : code;
              })()}`}
            </Text>
            <View className="ms-3 me-2" style={styles.viewStyleSeparator}>
              <View className="items-center justify-center">
                <Separator decorative={true} />
              </View>
            </View>
          </AccordionTrigger>

          <AccordionContent
            className="flex-col pt-3 pb-3"
            style={{
              borderColor: ColorsApp.background,
            }}
          >
            <ScrollView
              scrollEnabled={isKeyboardVisible ? true : false}
              showsVerticalScrollIndicator={false}
              className="w-full h-fit"
            >
              <Text size={CustomDimension.sizeInSp(11)} style={styles.marginBott11} color="#9A9A9A">
                Product United Tractors?
              </Text>
              <View className="flex-row items-center mb-6">
                <Switch
                  checked={form.watch(`${section}.${listName}.${indexUnit}.equipment.isProductUT`)}
                  disabled={disabled}
                  onCheckedChange={(valueCheck) => {
                    setProductUT(valueCheck);
                    const param = {
                      id: form.getValues(`${section}.${listName}.${indexUnit}.id`),
                      jobId: jobId,
                      equipmentId: valueCheck ? '' : idGenEquipment,
                      open: open,
                      operatorName: '',
                      isExcavator: isExcavator,
                      equipment: {
                        id: valueCheck ? '' : idGenEquipment,
                        unitModel: isExcavator ? 'New Form Excavator' : `New Form Unit`,
                        type: 'equipmentvm',
                        unitCode: '',
                        serialNumber: '',
                        smr: 0,
                        isProductUT: valueCheck,
                      },
                    };
                    callbackChangeUnit(param);
                  }}
                  className="w-14 h-fit"
                  style={[
                    styles.borderBlockStyle,
                    {
                      backgroundColor: form.watch(
                        `${section}.${listName}.${indexUnit}.equipment.isProductUT`
                      )
                        ? '#59AD24'
                        : '#CFD1D3',
                    },
                  ]}
                />
                <Text
                  size={CustomDimension.sizeInSp(14)}
                  style={styles.fontMediumStyle}
                  color="#1D1D1D"
                >
                  {form.watch(`${section}.${listName}.${indexUnit}.equipment.isProductUT`)
                    ? 'Yes'
                    : 'No'}
                </Text>
              </View>

              <Text
                numberOfLines={1}
                size={CustomDimension.sizeInSp(12)}
                type="reguler"
                color="#707070"
              >
                Unit Model
              </Text>
              <Space height={7} />
              {productUt && (
                <View className="w-full h-fit min-h-14">
                  {isExcavator ? (
                    <EquipmentDataExcavator
                      disabled={disabled}
                      placeholder={'Choose Unit Model'}
                      valueHolder={form.watch(
                        `${section}.${listName}.${indexUnit}.equipment.unitModel`,
                        0
                      )}
                      type="unit_model"
                      callback={(dataRaw) => {
                        form.setValue(
                          `${section}.${listName}.${indexUnit}.equipment.unitModel`,
                          dataRaw.unitModel
                        );
                        form.setValue(
                          `${section}.${listName}.${indexUnit}.equipment.id`,
                          dataRaw.id
                        );
                        form.setValue(
                          `${section}.${listName}.${indexUnit}.equipmentId`,
                          dataRaw.id
                        );
                        form.setValue(`${section}.${listName}.${indexUnit}.equipment.smr`, 0);
                        form.setValue(
                          `${section}.${listName}.${indexUnit}.equipment.serialNumber`,
                          ''
                        );
                        form.setValue(`${section}.${listName}.${indexUnit}.equipment.unitCode`, '');
                      }}
                    />
                  ) : (
                    <EquipmentDataUnit
                      disabled={disabled}
                      placeholder={'Choose Unit Model'}
                      valueHolder={form.watch(
                        `${section}.${listName}.${indexUnit}.equipment.unitModel`,
                        0
                      )}
                      type="unit_model"
                      callback={async (data) => {
                        form.setValue(
                          `${section}.${listName}.${indexUnit}.equipment.unitModel`,
                          data.unitModel
                        );
                        form.setValue(`${section}.${listName}.${indexUnit}.equipment.id`, data.id);
                        form.setValue(`${section}.${listName}.${indexUnit}.equipmentId`, data.id);
                        form.setValue(`${section}.${listName}.${indexUnit}.equipment.smr`, 0);
                        form.setValue(
                          `${section}.${listName}.${indexUnit}.equipment.serialNumber`,
                          ''
                        );
                        form.setValue(`${section}.${listName}.${indexUnit}.equipment.unitCode`, '');
                        await form.trigger();
                      }}
                    />
                  )}

                  {errors.job_identity?.[listName]?.[indexUnit]?.equipment?.unitModel !==
                  undefined ? (
                    <View className="mt-1">
                      <Text size={CustomDimension.sizeInSp(11)} color={ColorsApp.errorColor}>
                        {
                          errors.job_identity?.[listName]?.[indexUnit]?.equipment?.unitModel
                            ?.message
                        }
                      </Text>
                    </View>
                  ) : null}
                </View>
              )}
              {!productUt && (
                <TextInput
                  editable={!disabled}
                  value={String(
                    form.watch(`${section}.${listName}.${indexUnit}.equipment.unitModel`)
                  )}
                  maxLength={50}
                  onChange={(value) => {
                    form.setValue(`${section}.${listName}.${indexUnit}.equipment.unitModel`, value);
                    form.setValue(
                      `${section}.${listName}.${indexUnit}.equipment.id`,
                      idGenEquipment
                    );
                    form.setValue(
                      `${section}.${listName}.${indexUnit}.equipmentId`,
                      idGenEquipment
                    );
                  }}
                  autoCapitalize={'characters'}
                  placeholder="Input Unit Model"
                  placeholderColor={ColorsApp.background}
                  error={
                    errors.job_identity?.[listName]?.[indexUnit]?.equipment?.unitModel !== undefined
                      ? errors.job_identity?.[listName]?.[indexUnit]?.unitModel?.message
                      : null
                  }
                  stylesBox={[
                    styles.fieldStyle,
                    {
                      borderBottomColor:
                        operatorName !== undefined ? ColorsApp.black : ColorsApp.background,
                    },
                  ]}
                  textStyle={styles.textFieldStyle}
                />
              )}
              <Space height={!productUt ? 12 : 7} />
              <View className="flex-1 h-fit justify-center mt-3 mb-3">
                <Text
                  numberOfLines={1}
                  size={CustomDimension.sizeInSp(12)}
                  type="reguler"
                  color="#707070"
                >
                  Unit Code
                </Text>
                <Space height={7} />
                {productUt ? (
                  <>
                    {disabled ? (
                      <TouchableOpacity
                        disabled={true}
                        className="flex-1  w-full flex-row justify-center align-middle items-center rounded-md mt-1 mb-2"
                        style={styles.buttonArrowStyle}
                      >
                        <Text
                          color={ColorsApp.textColorSecondaryVariant}
                          size={CustomDimension.sizeInSp(12)}
                          style={{ fontFamily: FontsUtils.medium }}
                        >
                          {form.watch(`${section}.${listName}.${indexUnit}.equipment.unitCode`) ||
                            '-'}
                        </Text>
                        <ArrowDown width={18} height={18} style={styles.arrowDownStyle} />
                      </TouchableOpacity>
                    ) : (
                      <UnitCodeDataList
                        placeholder={'-'}
                        valueHolder={form.watch(
                          `${section}.${listName}.${indexUnit}.equipment.unitCode` || '-'
                        )}
                        serialNumber={form.watch(
                          `${section}.${listName}.${indexUnit}.equipment.unitModel`
                        )}
                        SNunit={
                          form.watch(
                            `${section}.${listName}.${indexUnit}.equipment.serialNumber`
                          ) || '-'
                        }
                        operatorName={
                          form.watch(`${section}.${listName}.${indexUnit}.operatorName`) || ''
                        }
                        smr={form.watch(`${section}.${listName}.${indexUnit}.equipment.smr`) || 0}
                        disabled={
                          !(
                            form.watch(
                              `${section}.${listName}.${indexUnit}.equipment.unitModel`
                            ) !== '' &&
                            form.watch(
                              `${section}.${listName}.${indexUnit}.equipment.unitModel`
                            ) !== 'New Form Unit' &&
                            form.watch(
                              `${section}.${listName}.${indexUnit}.equipment.unitModel`
                            ) !== 'New Form Excavator' &&
                            !disabled
                          )
                        }
                        idEquipment={
                          form.watch(`${section}.${listName}.${indexUnit}.equipmentId`) || '0'
                        }
                        callback={(data: any) => {
                          if (data !== null) {
                            form.setValue(
                              `${section}.${listName}.${indexUnit}.equipmentId`,
                              data.id
                            );
                            form.setValue(
                              `${section}.${listName}.${indexUnit}.equipment.id`,
                              data.id
                            );
                            form.setValue(
                              `${section}.${listName}.${indexUnit}.equipment.unitCode`,
                              String(data.title) || '-'
                            );
                            form.setValue(
                              `${section}.${listName}.${indexUnit}.equipment.type`,
                              'equipmentvm'
                            );
                            form.setValue(
                              `${section}.${listName}.${indexUnit}.equipment.serialNumber`,
                              data.serialNumber || '-'
                            );
                            form.setValue(
                              `${section}.${listName}.${indexUnit}.equipment.smr`,
                              Number(data.smr) || 0
                            );
                            const serialNumberCheck = data.serialNumber || '-';
                            if (serialNumberCheck !== '-') {
                              setSerialNumberIsEdit(false);
                            } else {
                              setSerialNumberIsEdit(true);
                            }
                          }
                        }}
                      />
                    )}

                    {errors.job_identity?.[listName]?.[indexUnit]?.equipment?.unitCode !==
                    undefined ? (
                      <View className="mt-1">
                        <Text size={CustomDimension.sizeInSp(14)} color={ColorsApp.errorColor}>
                          {
                            errors.job_identity?.[listName]?.[indexUnit]?.equipment?.unitCode
                              ?.message
                          }
                        </Text>
                      </View>
                    ) : null}
                  </>
                ) : (
                  <TextInput
                    value={String(
                      form.watch(`${section}.${listName}.${indexUnit}.equipment.unitCode`)
                    )}
                    editable={!disabled}
                    autoCapitalize={'characters'}
                    onChange={(value) => {
                      form.setValue(
                        `${section}.${listName}.${indexUnit}.equipment.unitCode`,
                        value
                      );
                    }}
                    maxLength={50}
                    placeholder="Input Unit Code"
                    placeholderColor={ColorsApp.background}
                    error={
                      errors.job_identity?.[listName]?.[indexUnit]?.equipment?.unitCode !==
                      undefined
                        ? errors.job_identity?.[listName]?.[indexUnit]?.equipment?.unitCode?.message
                        : null
                    }
                    stylesBox={[
                      styles.fieldStyle,
                      {
                        borderBottomColor:
                          operatorName !== undefined ? ColorsApp.black : ColorsApp.background,
                      },
                    ]}
                    textStyle={styles.textFieldStyle}
                  />
                )}
              </View>
              <Space height={!productUt ? 12 : 7} />
              <View className="flex-1 h-fit justify-center mb-3">
                <Text
                  numberOfLines={1}
                  size={CustomDimension.sizeInSp(12)}
                  type="reguler"
                  color="#707070"
                >
                  Serial Number
                </Text>
                <Space height={productUt ? 12 : 7} />
                {productUt ? (
                  <>
                    {disabled ? (
                      <TouchableOpacity
                        disabled={true}
                        className="flex-1  w-full flex-row justify-center align-middle items-center rounded-md mt-1 mb-2"
                        style={styles.buttonArrowStyle}
                      >
                        <Text
                          color={ColorsApp.textColorSecondaryVariant}
                          size={CustomDimension.sizeInSp(12)}
                          style={{ fontFamily: FontsUtils.medium }}
                        >
                          {form.watch(`${section}.${listName}.${indexUnit}.equipment.serialNumber`)}
                        </Text>
                        <ArrowDown width={18} height={18} style={styles.arrowDownStyle} />
                      </TouchableOpacity>
                    ) : serialNumberIsEdit ? (
                      <View>
                        <TextInput
                          value={String(
                            form.watch(`${section}.${listName}.${indexUnit}.equipment.serialNumber`)
                          )}
                          editable={!disabled}
                          autoCapitalize={'characters'}
                          onChange={(value) => {
                            if (value !== null) {
                              form.setValue(
                                `${section}.${listName}.${indexUnit}.equipment.serialNumber`,
                                value
                              );
                            }
                          }}
                          maxLength={50}
                          placeholder="Input Serial Number"
                          placeholderColor={ColorsApp.background}
                          error={
                            errors.job_identity?.[listName]?.[indexUnit]?.equipment
                              ?.serialNumber !== undefined
                              ? errors.job_identity?.[listName]?.[indexUnit]?.equipment
                                  ?.serialNumber?.message
                              : null
                          }
                          stylesBox={[
                            styles.fieldStyle,
                            {
                              borderBottomColor:
                                unitCode !== undefined ? ColorsApp.black : ColorsApp.background,
                            },
                          ]}
                          textStyle={styles.textFieldStyle}
                        />
                      </View>
                    ) : (
                      <SerialNumberDataList
                        placeholder={'Choose Serial Number'}
                        valueHolder={
                          form.watch(
                            `${section}.${listName}.${indexUnit}.equipment.serialNumber`
                          ) || '-'
                        }
                      />
                    )}
                    {errors.job_identity?.[listName]?.[indexUnit]?.equipment?.serialNumber !==
                    undefined ? (
                      <View className="mt-1">
                        <Text size={CustomDimension.sizeInSp(14)} color={ColorsApp.errorColor}>
                          {
                            errors?.[section]?.[listName]?.[indexUnit]?.equipment?.serialNumber
                              ?.message
                          }
                        </Text>
                      </View>
                    ) : null}
                  </>
                ) : (
                  <TextInput
                    value={String(
                      form.watch(`${section}.${listName}.${indexUnit}.equipment.serialNumber`)
                    )}
                    editable={!disabled}
                    onChange={(value) => {
                      form.setValue(
                        `${section}.${listName}.${indexUnit}.equipment.serialNumber`,
                        value
                      );
                    }}
                    maxLength={50}
                    autoCapitalize={'characters'}
                    placeholder="Input Serial Number"
                    placeholderColor={ColorsApp.background}
                    error={
                      errors.job_identity?.[listName]?.[indexUnit]?.equipment?.serialNumber !==
                      undefined
                        ? errors.job_identity?.[listName]?.[indexUnit]?.equipment?.serialNumber
                            ?.message
                        : null
                    }
                    stylesBox={[
                      styles.fieldStyle,
                      {
                        borderBottomColor:
                          operatorName !== undefined ? ColorsApp.black : ColorsApp.background,
                      },
                    ]}
                    textStyle={styles.textFieldStyle}
                  />
                )}
              </View>
              <Space height={!productUt ? 12 : 7} />
              <View className="flex-row items-start justify-start mb-6">
                <View
                  className="flex-col"
                  style={{
                    width: CustomDimension.WIDTH_PERCENTAGE(50),
                  }}
                >
                  <Text
                    numberOfLines={1}
                    size={CustomDimension.sizeInSp(12)}
                    type="reguler"
                    color="#707070"
                  >
                    SMR
                  </Text>
                  <Space height={7} />
                  <TextInput
                    value={String(form.watch(`${section}.${listName}.${indexUnit}.equipment.smr`))}
                    editable={!disabled}
                    maxLength={15}
                    onChange={(value) => {
                      const textIsNotRight = value.match(/[,.-]/g);
                      if (!textIsNotRight) {
                        form.setValue(
                          `${section}.${listName}.${indexUnit}.equipment.smr`,
                          Number(value)
                        );
                      }
                    }}
                    placeholder="Input SMR"
                    keyboardType="number-pad"
                    placeholderColor={ColorsApp.background}
                    stylesBox={[
                      styles.fieldStyle,
                      { borderBottomColor: smr > 0 ? ColorsApp.black : ColorsApp.background },
                    ]}
                    error={
                      errors.job_identity?.[listName]?.[indexUnit]?.equipment?.smr !== undefined
                        ? errors.job_identity?.[listName]?.[indexUnit]?.equipment?.smr?.message
                        : null
                    }
                    textStyle={[styles.textFieldStyle, { textAlign: 'left' }]}
                  />
                </View>
                <View
                  className="flex-col"
                  style={{
                    width: CustomDimension.WIDTH_PERCENTAGE(50),
                  }}
                >
                  <Text
                    numberOfLines={1}
                    size={CustomDimension.sizeInSp(12)}
                    type="reguler"
                    color="#707070"
                  >
                    Operator Name
                  </Text>
                  <Space height={7} />
                  <TextInput
                    editable={!disabled}
                    maxLength={50}
                    value={String(form.watch(`${section}.${listName}.${indexUnit}.operatorName`))}
                    onChange={(value) => {
                      try {
                        const emojiRegex =
                          /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g;
                        const specialCharRegex = /[!@#$%^&*(),.?":{}_|<>/-/0-9]/;
                        const containEmoji = emojiRegex.test(value);
                        const containSpecialChar = specialCharRegex.test(value);
                        if (!containEmoji && !containSpecialChar) {
                          form.setValue(`${section}.${listName}.${indexUnit}.operatorName`, value);
                        }
                      } catch (error) {
                        console.log(error);
                      }
                    }}
                    placeholder="Input Operator Name"
                    placeholderColor={ColorsApp.background}
                    error={
                      errors.job_identity?.[listName]?.[indexUnit]?.operatorName !== undefined
                        ? errors.job_identity?.[listName]?.[indexUnit]?.operatorName?.message
                        : null
                    }
                    stylesBox={[
                      styles.fieldStyle,
                      {
                        borderBottomColor:
                          operatorName !== undefined ? ColorsApp.black : ColorsApp.background,
                      },
                    ]}
                    textStyle={[styles.textFieldStyle, { textAlign: 'left' }]}
                  />
                </View>
              </View>

              {lengthItem > 0 && !isExcavator && (
                <TouchableOpacity
                  className="flex-1 w-fit self-end flex-row justify-center h-fit items-center mb-1 bg-transparent"
                  disabled={disabled}
                  onPress={() => {
                    remove();
                  }}
                >
                  <View className="h-6">
                    <Text
                      style={{
                        fontSize: CustomDimension.sizeInSp(14),
                        color: ColorsApp.errorColor,
                        fontFamily: FontsUtils.medium,
                      }}
                    >
                      Delete
                    </Text>
                  </View>

                  <Space width={4} />
                  <Trash2Icon size={20} color={ColorsApp.errorColor} />
                </TouchableOpacity>
              )}
              <Space height={16} />
            </ScrollView>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </View>
  );
};

const styles = StyleSheet.create({
  fieldStyle: {
    height: 10,
    borderBottomWidth: 1,
    marginLeft: -5,
    marginTop: -5,
    width: '100%',
  },
  textFieldStyle: {
    marginLeft: -5,
    fontWeight: '600',
    color: '#707070',
    textAlign: 'center',
    fontSize: CustomDimension.sizeInSp(12),
  },
  arrowDownStyle: {
    marginStart: 4,
  },
  buttonArrowStyle: {
    height: 40,
    backgroundColor: ColorsApp.background,
  },
  fontMediumStyle: {
    fontFamily: FontsUtils.medium,
    marginStart: 8,
  },
  borderBlockStyle: {
    borderBlockColor: '#FFFFFF',
  },
  marginBott11: {
    marginBottom: 11,
  },
  viewStyleSeparator: {
    flex: 1,
    height: 1,
  },
  fontLabelStyle: {
    fontFamily: FontsUtils.bold,
  },
});

export default UnitItem;

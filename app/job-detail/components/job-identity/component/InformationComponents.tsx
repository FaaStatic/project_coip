import { Space } from 'lucide-react-native';
import moment from 'moment';
import { FieldErrors, useFormContext } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import Text from '@untr/apps-coip/components/Text';
import { FontsUtils } from '@untr/apps-coip/configs/fonUtils.config';
import { ColorsApp } from '@untr/apps-coip/themes/colorApp.theme';
import { CustomDimension } from '@untr/apps-coip/utils/customDimension.util';
import TextInput from '@untr/apps-coip/components/TextInput';
import CheckJobIsFilled, { SectionField } from './CheckJobIsFilled';
import { memo } from 'react';
import { jobIdentityErrorsType } from '@untr/apps-coip/types/inputCheckSheetType.type';
import MapsScreen from './MapsScreen';

type InformationComponentsProp = {
  customer: any;
  date: string;
  assignId: string;
  status: number;
  section: string;
  isDisabled: boolean;
};

const InformationComponents = ({
  customer,
  assignId,
  date,
  status,
  section,
  isDisabled,
}: InformationComponentsProp) => {
  const formInformation = useFormContext();
  let errorsField: FieldErrors<jobIdentityErrorsType> = formInformation.formState.errors;

  return (
    <View className="flex-1 w-full h-fit">
      <View>
        <Text size={CustomDimension.sizeInSp(16)} style={styles.labelStyle}>
          Information
        </Text>
      </View>
      <View className="flex-row justify-start align-top items-start">
        <View className="flex-col me-2" style={styles.width45}>
          <Text
            style={{
              fontSize: CustomDimension.sizeInSp(11),
              fontFamily: FontsUtils.regular,
              color: ColorsApp.textColorSecondary,
            }}
          >
            Assignment ID
          </Text>
          <Text style={styles.assignIdstyle}>{assignId}</Text>
        </View>
        <View className="flex-col me-20 align-top">
          <Text style={styles.fontRegularStyle}>Status</Text>
          <Space height={4} />
          <View
            className="w-fit h-fit rounded-2xl pt-1 pb-1 ps-3 pe-3 flex-col justify-center items-center"
            style={{
              backgroundColor:
                status === 2
                  ? ColorsApp.successColor
                  : status === 0
                    ? ColorsApp.errorColor
                    : ColorsApp.primary,
            }}
          >
            <Text style={[styles.fontRegularStyle, { color: 'white' }]}>
              {status === 2 ? 'Completed' : status === 0 ? 'New Assignment' : ' In Progress'}
            </Text>
          </View>
        </View>
      </View>
      <View className="flex-row justify-start align-top items-start mt-3">
        <View className="flex-col me-2" style={styles.width45}>
          <Text style={styles.fontRegularStyle}>Customer</Text>
          <Space height={4} />
          <Text style={styles.fontMediusStyle}>{customer.name}</Text>
        </View>
        <View className="flex-col me-20 align-top">
          <Text style={styles.fontRegularStyle}>Plan Execution</Text>
          <Space height={4} />
          <Text style={styles.fontMediusStyle}>{moment(date).format('dddd, DD MMM yyyy')}</Text>
        </View>
      </View>
      <Space height={16} />
      <View className="flex-row items-center">
        <CheckJobIsFilled sectionField={SectionField.Location} />
        <Space width={4} />
        <Text style={styles.labelTextField}>Location</Text>
      </View>
      <View className="w-full h-52">
        <MapsScreen section={section} isDisabled={isDisabled} status={status} />
      </View>
      <View className="flex-col w-full mt-4 mb-4">
        <Text numberOfLines={1} size={CustomDimension.sizeInSp(12)} type="reguler" color="#707070">
          Location Detail
        </Text>
        <Space height={7} />
        <View className="w-full h-fit">
          <TextInput
            value={String(formInformation.watch(`${section}.location`))}
            editable={!isDisabled}
            onChange={(value) => {
              const textIsNotRight = value.match(/[,.-]/g);
              if (!textIsNotRight) {
                formInformation.setValue(`${section}.location`, value);
                formInformation.clearErrors(`${section}.location`);
              }
            }}
            placeholder="Input Your Location Detail"
            placeholderColor={ColorsApp.grey}
            maxLength={50}
            stylesBox={[
              styles.fieldTextStyle,
              {
                width: '100%',
              },
            ]}
            error={
              errorsField?.job_identity?.location?.message
                ? errorsField?.job_identity?.location?.message
                : ''
            }
            textStyle={styles.textFieldStyle}
          />
        </View>
      </View>
      <View style={styles.marginTop16}>
        <View className="flex-row items-center">
          <CheckJobIsFilled sectionField={SectionField.AverageSpeed} />
          <Space width={4} />
          <Text
            numberOfLines={2}
            size={CustomDimension.sizeInSp(12)}
            type="reguler"
            color="#707070"
          >
            Average Speed in Km/h
          </Text>
        </View>
        <Space height={7} />
        <View className="flex-1 h-fit">
          <TextInput
            value={String(formInformation.watch(`${section}.averageSpeed`))}
            onChange={(value) => {
              const textIsNotRight = value.match(/[,.-]/g);
              if (!textIsNotRight) {
                formInformation.setValue(`${section}.averageSpeed`, Number(value));
                formInformation.clearErrors(`${section}.averageSpeed`);
              }
            }}
            placeholder={
              String(formInformation.watch(`${section}.averageSpeed`)) || 'Input Average Speed Unit'
            }
            placeholderColor={ColorsApp.grey}
            keyboardType="numeric"
            editable={!isDisabled}
            maxLength={5}
            stylesBox={[styles.fieldTextStyle, { width: '100%' }]}
            textStyle={styles.textFieldStyle}
          />
        </View>
        {Object.keys(formInformation.formState.errors).length > 0 &&
        errorsField?.job_identity?.averageSpeed?.message ? (
          <View className="mt-2">
            <Text size={CustomDimension.sizeInSp(11)} color={ColorsApp.errorColor}>
              {(errorsField?.job_identity?.averageSpeed?.message as string) || ''}
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fontMediusStyle: {
    fontSize: CustomDimension.sizeInSp(14),
    fontWeight: '600',
    fontFamily: FontsUtils.medium,
    lineHeight: 16,
    color: '#1D1D1D',
  },
  fontRegularStyle: {
    fontSize: CustomDimension.sizeInSp(11),
    fontWeight: '400',
    color: '#9A9A9A',
  },
  width45: {
    width: '45%',
  },
  labelStyle: {
    color: ColorsApp.secondary,
    fontFamily: FontsUtils.bold,
    marginBottom: 12,
  },
  assignIdstyle: {
    fontSize: CustomDimension.sizeInSp(16),
    color: ColorsApp.successColor,
    fontFamily: FontsUtils.bold,
  },
  fieldTextStyle: {
    height: 10,
    borderBottomWidth: 1,
    borderBottomColor: ColorsApp.black,
    marginLeft: -5,
    marginTop: -5,
    width: '80%',
  },
  textFieldStyle: {
    marginLeft: -5,
    fontWeight: '600',
    color: '#707070',
    fontSize: CustomDimension.sizeInSp(12),
  },
  marginTop16: {
    marginTop: 16,
  },
  marginBottom24: {
    marginBottom: 24,
  },
  labelTextField: {
    fontSize: CustomDimension.sizeInSp(11),
    fontWeight: '400',
    marginBottom: 4,
    color: '#9A9A9A',
  },
  labelTextFieldLocation: {
    color: 'black',
    fontSize: CustomDimension.sizeInSp(14),
  },
  mapboxViewStyle: {
    height: 175,
    borderRadius: 16,
    overflow: 'hidden',
  },
  styleBtnOfflineLocation: {
    backgroundColor: ColorsApp.primary,
  },
});

export default memo(InformationComponents);

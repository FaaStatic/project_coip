import { View, StyleSheet } from 'react-native';
import CheckJobIsFilled, { SectionField } from './CheckJobIsFilled';
import Space from '@untr/apps-coip/components/Space';
import Text from '@untr/apps-coip/components/Text';
import { FieldErrors, useFormContext } from 'react-hook-form';
import { FontsUtils } from '@untr/apps-coip/configs/fonUtils.config';
import { CustomDimension } from '@untr/apps-coip/utils/customDimension.util';
import { ColorsApp } from '@untr/apps-coip/themes/colorApp.theme';
import moment from 'moment';
import { memo, useState } from 'react';
import { TimeManipulation } from '@untr/apps-coip/utils/timeManipulation.util';
import DatePickerBtn from '@untr/apps-coip/components/DatePickerButton/index';
import { jobIdentityErrorsType } from '@untr/apps-coip/types/inputCheckSheetType.type';
type DetailInformationProp = {
  section: string;
  isDisabled: boolean;
  setOpenWarningInput: (data: boolean) => void;
};

const DetailInformationComponents = ({
  section,
  isDisabled,
  setOpenWarningInput,
}: DetailInformationProp) => {
  const formDetail = useFormContext();
  let errorsField: FieldErrors<jobIdentityErrorsType> = formDetail.formState.errors;

  const formatDate = (date: string) => {
    return {
      time: moment(date).utcOffset(7).format('hh:mm'),
      realDate: moment(date).utcOffset(7).format('YYYY-MM-DD'),
      markDate: {
        [moment(date).utcOffset(7).format('YYYY-MM-DD')]: {
          disableTouchEvent: true,
          marked: true,
          selected: true,
        },
      },
    };
  };

  const convertTime = (dateTime: string) => {
    const dateValue = formDetail.getValues(dateTime);

    // If the date is valid, process it; otherwise, use the current date.
    if (dateValue && dateValue !== 'Invalid date') {
      const [realDate, time] = dateValue.split(' ');
      return {
        time,
        realDate,
        markDate: {
          [realDate]: {
            disableTouchEvent: true,
            marked: true,
            selected: true,
          },
        },
      };
    }

    // Fallback to current time if date is invalid or empty
    const currentDate = moment().format('YYYY-MM-DDTHH:mm:ss.SSSZ');
    return formatDate(currentDate);
  };

  const [startTime, setStartTime] = useState<any>(convertTime(`${section}.start_hour`).time);
  const [downTime, setDownTime] = useState<any>(convertTime(`${section}.end_hour`).time);
  const [startDate, setStartDate] = useState<any>(convertTime(`${section}.start_hour`).realDate);
  const [downDate, setDownDate] = useState<any>(convertTime(`${section}.end_hour`).realDate);
  const [markedDateStart, setMarkedDateStart] = useState<any>(
    convertTime(`${section}.start_hour`).markDate
  );
  const [markedDateEnd, setMarkedDateEnd] = useState<any>(
    convertTime(`${section}.end_hour`).markDate
  );

  const timeApp = (timeInput: string) => {
    const timeData = TimeManipulation.convertHourToAmPm(timeInput);
    return timeData;
  };

  const [loadingTime, setLoadingTime] = useState<boolean>(false);

  return (
    <View className="h-fit w-full">
      <Text style={styles.labelTextStyle}>Detail Information</Text>
      <View style={styles.marginBottom24}>
        <View className="flex-row items-center">
          <CheckJobIsFilled sectionField={SectionField.DetailInformation} />
          <Space width={4} />
          <Text
            numberOfLines={2}
            size={CustomDimension.sizeInSp(12)}
            type="reguler"
            color="#707070"
          >
            Start Date
          </Text>
        </View>

        <Space height={7} />
        <View
          className="w-full justify-between align-middle items-center flex-row"
          style={styles.viewDateContainer}
        >
          <View className="flex-row items-center" style={styles.viewDateField}>
            <Text size={CustomDimension.sizeInSp(12)} color="#707070">
              {formDetail.watch(`${section}.start_hour`) !== '' &&
              formDetail.watch(`${section}.start_hour`) !== 'Invalid date'
                ? convertTime(`${section}.start_hour`).realDate + ' ' + startTime
                : 'Select Start Date'}
            </Text>
          </View>
          <View>
            <DatePickerBtn
              markedDates={markedDateStart}
              loading={loadingTime}
              setLoading={setLoadingTime}
              disable={isDisabled}
              usingTime={true}
              setWarning={setOpenWarningInput}
              isStartDate={true}
              setMarkedDate={setMarkedDateStart}
              setSelectTime={setStartTime}
              selectTime={startTime ? timeApp(startTime) : '12:01:AM'}
              selectDate={
                startDate !== '' && startDate !== 'Invalid date'
                  ? startDate
                  : moment().format('YYYY-MM-DD').toString()
              }
              setSelectedDate={setStartDate}
              setSelectResetEnd={(value) => {
                formDetail.setValue(`${section}.end_hour`, value);
              }}
              callbackTime={(dateTimeData) => {
                formDetail.setValue(`${section}.start_hour`, dateTimeData);
                formDetail.clearErrors(`${section}.start_hour`);
              }}
            />
          </View>
        </View>

        {Object.keys(errorsField).length > 0 && errorsField.job_identity?.start_hour?.message ? (
          <View className="mt-2">
            <Text size={CustomDimension.sizeInSp(11)} color={ColorsApp.errorColor}>
              {(errorsField.job_identity?.start_hour?.message as string) || ''}
            </Text>
          </View>
        ) : null}
      </View>
      <View style={styles.marginBottom24}>
        <View className="flex-row items-center">
          <CheckJobIsFilled sectionField={SectionField.DetailInformation} />
          <Space width={4} />
          <Text
            numberOfLines={2}
            size={CustomDimension.sizeInSp(12)}
            type="reguler"
            color="#707070"
          >
            End Date
          </Text>
        </View>

        <Space height={7} />
        <View
          className="w-full justify-between align-middle items-center flex-row"
          style={styles.viewDateContainer}
        >
          <View className="flex-row items-center" style={styles.viewDateField}>
            <Text size={CustomDimension.sizeInSp(12)} color="#707070">
              {formDetail.watch(`${section}.end_hour`) !== '' &&
              formDetail.watch(`${section}.end_hour`) !== 'Invalid date'
                ? convertTime(`${section}.end_hour`).realDate + ' ' + downTime
                : 'Select End Date'}
            </Text>
          </View>
          <View>
            <DatePickerBtn
              markedDates={markedDateEnd}
              usingTime={true}
              loading={loadingTime}
              minDate={startDate}
              isEndDate={true}
              disable={isDisabled}
              selectStartDate={startDate}
              selectStartTime={startTime}
              setWarning={setOpenWarningInput}
              setLoading={setLoadingTime}
              setMarkedDate={setMarkedDateEnd}
              selectTime={downTime !== '' ? timeApp(downTime) : '12:01:AM'}
              setSelectTime={setDownTime}
              selectDate={
                downDate !== '' && downDate !== 'Invalid date'
                  ? downDate
                  : moment().format('YYYY-MM-DD').toString()
              }
              setSelectedDate={setDownDate}
              callbackTime={(dateTimeData) => {
                formDetail.setValue(`${section}.end_hour`, dateTimeData);
                formDetail.clearErrors(`${section}.end_hour`);
              }}
            />
          </View>
        </View>
        {Object.keys(errorsField).length > 0 && errorsField.job_identity?.end_hour?.message ? (
          <View className="mt-2">
            <Text size={CustomDimension.sizeInSp(11)} color={ColorsApp.errorColor}>
              {(errorsField.job_identity?.end_hour?.message as string) || ''}
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyleScreen: { flex: 1 },
  viewContainerScroll: { flexGrow: 1 },
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
  viewLinesStyle: {
    backgroundColor: '#F1F1F1',
    height: 1,
    marginTop: 20,
    marginBottom: 16,
  },
  labelTextStyle: {
    fontWeight: '700',
    fontFamily: FontsUtils.bold,
    lineHeight: 28.8,
    fontSize: CustomDimension.sizeInSp(16),
    marginBottom: 12,
  },
  viewDateContainer: {
    height: 40,
    borderBottomWidth: 1,
    borderColor: 'black',
  },
  viewDateField: {
    width: CustomDimension.WIDTH_PERCENTAGE(80),
    height: 40,
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
  marginEnd10: {
    marginEnd: 10,
  },
  textBoldStyle: {
    fontFamily: FontsUtils.bold,
    color: 'white',
  },
});

export default memo(DetailInformationComponents);

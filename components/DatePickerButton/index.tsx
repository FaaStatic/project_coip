import { DeprecatedUi } from '@untr/apps-coip/lib/components';
import * as React from 'react';
import { Platform, TouchableOpacity, View } from 'react-native';
import CalendarIco from '@untr/apps-coip/assets/icons/CalendarIco.svg';
import { CalendarCustom } from './components';
import Text from '@untr/apps-coip/components/Text';
import { ChevronDown, ChevronUp } from 'lucide-react-native';
import { ColorsApp } from '@untr/apps-coip/themes/colorApp.theme';
import { CustomDimension } from '@untr/apps-coip/utils/customDimension.util';
import { FontsUtils } from '@untr/apps-coip/configs/fonUtils.config';
import { TimeManipulation } from '@untr/apps-coip/utils/timeManipulation.util';
import moment from 'moment';
import Toast from 'react-native-toast-message';
import { useKeyboard } from '@untr/apps-coip/lib';

const {
  BottomSheet,
  BottomSheetCloseTrigger,
  BottomSheetContent,
  BottomSheetOpenTrigger,
  BottomSheetView,
} = DeprecatedUi;

interface CallbackDatePicker {
  setWarning?: (data: boolean) => void;
  setSelectTime?: (timeChoose: string) => void;
  callbackTime?: (dateTime: string) => void;
  minDate?: string;
  maxDate?: string;
  setMinDate?: (value: string) => void;
  setMaxdate?: (value: string) => void;
  markedDates?: {};
  selectDate?: string;
  selectStartDate?: string;
  selectStartTime?: string;
  isEndDate?: boolean;
  isStartDate?: boolean;
  multipleSelected?: boolean;
  loading?: boolean;
  setLoading?: (value: boolean) => void;
  usingTime?: boolean;
  selectTime?: string;
  disable?: boolean;
  callbackApply?: () => void;
  setSelectedDate?: (dateChoose: string) => void;
  setMarkedDate?: (dateChoose: {}) => void;
  setSelectResetEnd?: (timeChoose: string) => void;
  maxDateInput?: string;
  usingReset?: boolean;
}

const DatePickerBtn = ({
  markedDates = {},
  loading = false,
  selectDate = '',
  disable = false,
  usingTime = false,
  minDate = null,
  maxDate = null,
  setSelectResetEnd = null,
  setMaxdate,
  setMinDate,
  callbackApply = null,
  setLoading,
  selectTime = '',
  selectStartDate = null,
  selectStartTime = null,
  isEndDate = false,
  isStartDate = false,
  setSelectedDate,
  setMarkedDate,
  multipleSelected = true,
  setSelectTime,
  maxDateInput = '',
  callbackTime,
  usingReset = false,
}: Readonly<CallbackDatePicker>) => {
  const { dismissKeyboard } = useKeyboard();
  const timeApp = selectTime.split(':');
  const today = new Date();
  const minDateDatepicker = new Date(today.setDate(today.getDate() - 7))
    .toISOString()
    .split('T')[0];
  const [hour, setHour] = React.useState(timeApp[0]);
  const [minute, setMinute] = React.useState(timeApp[1]);
  const [amPm, setAmPm] = React.useState(timeApp[2]);

  const setTodayNow = () => {
    const today = moment(new Date()).format('YYYY-MM-DD hh:mm:A');
    const splitToday = today.split(' ');
    const hourSplit = splitToday[1].split(':');
    const amPmHour = TimeManipulation.convertAmPmTo24Hours(splitToday[1]);
    processingTime(hourSplit, splitToday, amPmHour, today, true);
  };

  const processingTime = (hourSplit, splitToday, amPmHour, today, isTodayProcess) => {
    const updateTime = (time) => {
      setHour(hourSplit[0]);
      setMinute(hourSplit[1]);
      setAmPm(hourSplit[2]);
      setMarkedDate({
        [splitToday[0]]: {
          disableTouchEvent: false,
          selected: true,
          marked: true,
        },
      });
      setSelectedDate(splitToday[0]);
      setSelectTime(time);
      callbackTime(`${splitToday[0]} ${time}`);
    };

    if (isEndDate) {
      const tempStart = selectStartTime.replace(':', '');
      const startDate = new Date(selectStartDate);
      const nowDate = new Date(today);

      if (
        nowDate > startDate ||
        (nowDate.toDateString() === startDate.toDateString() &&
          Number(`${amPmHour}${hourSplit[1]}`) > Number(tempStart))
      ) {
        updateTime(`${amPmHour}:${minute}`);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Change Time Failed',
          text2: `Downtime is Not Bigger than Start Time please check again!`,
          position: 'bottom',
        });
      }
    } else if (isStartDate) {
      setSelectResetEnd('');
      updateTime(`${amPmHour}:${minute}`);
    }
  };

  return (
    <View className="min-w-4 min-h-4 w-fit h-fit justify-center items-center">
      <BottomSheet>
        <BottomSheetOpenTrigger asChild disabled={disable}>
          <TouchableOpacity
            className="flex-0 align-middle items-center"
            onPress={() => {
              dismissKeyboard();
            }}
            style={{
              width: 18,
              height: 18,
            }}
          >
            <CalendarIco width={20} height={20} />
          </TouchableOpacity>
        </BottomSheetOpenTrigger>
        {!disable ? (
          <BottomSheetContent>
            <BottomSheetView hadHeader={false} className="pt-2">
              {usingReset ? (
                <TouchableOpacity
                  className={`h-8 w-16 bg-[${ColorsApp.background}] mt-3 mb-2 flex-col items-center justify-center self-end shadow-2xl`}
                  onPress={() => {
                    let tempMark = markedDates;
                    tempMark = delete markedDates[maxDate];
                    tempMark = delete markedDates[minDate];
                    setMarkedDate({
                      ...markedDates,
                      tempMark,
                    });
                    setMaxdate('');
                    setMinDate('');
                  }}
                >
                  <Text size={CustomDimension.scaledFontSize(12)}>Reset Filter</Text>
                </TouchableOpacity>
              ) : null}

              <CalendarCustom
                className="h-fit"
                renderToHardwareTextureAndroid={Platform.OS === 'android'}
                maxDate={maxDateInput.length > 0 ? maxDateInput : null}
                minDate={minDate || minDateDatepicker}
                onDayPress={(day) => {
                  setLoading(true);
                  if (usingTime) {
                    setMarkedDate({
                      [day.dateString]: {
                        disableTouchEvent: true,
                        selected: true,
                        marked: true,
                      },
                    });
                    setSelectedDate(day.dateString);
                  } else {
                    if (multipleSelected) {
                      const isDuplicate = Object.keys(markedDates)
                        .filter((key) => {
                          if (key === day.dateString) {
                            return true;
                          }
                        })
                        .map((item) => item);
                      if (isDuplicate.length > 0) {
                        const newData = delete markedDates[day.dateString];
                        if (maxDate === day.dateString) {
                          setMaxdate('');
                        } else if (minDate === day.dateString) {
                          setMinDate('');
                        }
                        setMarkedDate({
                          ...markedDates,
                          newData,
                        });
                      } else {
                        const itemSelected: any = Object.entries(markedDates);
                        const filteredEntries = itemSelected.filter(
                          ([key, value]) => value?.selected === true
                        );
                        const filteredObject = Object.fromEntries(filteredEntries);

                        const lengthFilteredObj = Object.keys(filteredObject).length;

                        if (lengthFilteredObj === 0 || minDate.length === 0) {
                          setMarkedDate({
                            ...markedDates,
                            [day.dateString]: {
                              disableTouchEvent: false,
                              selected: true,
                              marked: true,
                            },
                          });
                          setMinDate(day.dateString);
                        } else if (lengthFilteredObj === 1 || maxDate.length === 0) {
                          const minDateFormat = moment(minDate, 'YYYY-MM-DD');
                          const selectDateUser = moment(day.dateString, 'YYYY-MM-DD');
                          const minDateToDate = minDateFormat.toDate();
                          const selectDateUserToDate = selectDateUser.toDate();
                          if (selectDateUserToDate > minDateToDate) {
                            setMarkedDate({
                              ...markedDates,
                              [day.dateString]: {
                                disableTouchEvent: false,
                                selected: true,
                                marked: true,
                              },
                            });
                            setMaxdate(day.dateString);
                          }
                        }
                      }
                    } else {
                      setMarkedDate({
                        [day.dateString]: {
                          disableTouchEvent: false,
                          selected: true,
                          marked: true,
                        },
                      });
                      setSelectedDate(day.dateString);
                    }
                  }

                  setLoading(false);
                }}
                displayLoadingIndicator={loading}
                markingType="dot"
                markedDates={markedDates}
                current={selectDate}
              />
              {usingTime ? (
                <View className="w-full h-fit flex-row justify-center mt-2 mb-2 pt-2 pb-2">
                  <View
                    className="flex-col "
                    style={{
                      marginEnd: CustomDimension.WIDTH_PERCENTAGE(2.5),
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        TimeManipulation.addHour(hour, setHour);
                      }}
                      className="items-center justify-center"
                      style={{
                        height: 27,
                      }}
                    >
                      <ChevronUp color={ColorsApp.black} size={35} />
                    </TouchableOpacity>
                    <View
                      className="mt-3 mb-3 pt-3 pb-3 ps-2 pe-2"
                      style={{
                        borderBottomColor: ColorsApp.black500,
                        borderBottomWidth: 0.5,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: FontsUtils.bold,
                        }}
                        size={CustomDimension.sizeInSp(44)}
                      >
                        {hour}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        TimeManipulation.reduceHour(hour, setHour);
                      }}
                      className="items-center justify-center"
                      style={{
                        height: 27,
                      }}
                    >
                      <ChevronDown color={ColorsApp.black} size={35} />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      paddingTop: 44,
                      paddingBottom: 40,
                      marginEnd: CustomDimension.WIDTH_PERCENTAGE(2.5),
                    }}
                  >
                    <Text size={CustomDimension.sizeInSp(44)} color={ColorsApp.black}>
                      :
                    </Text>
                  </View>
                  <View
                    className="flex-col "
                    style={{
                      marginEnd: CustomDimension.WIDTH_PERCENTAGE(2.5),
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        TimeManipulation.addMinute(minute, setMinute);
                      }}
                      className="items-center justify-center"
                      style={{
                        height: 27,
                      }}
                    >
                      <ChevronUp color={ColorsApp.black} size={35} />
                    </TouchableOpacity>
                    <View
                      className="mt-3 mb-3 pt-3 pb-3 ps-2 pe-2"
                      style={{
                        borderBottomColor: ColorsApp.black500,
                        borderBottomWidth: 0.5,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: FontsUtils.bold,
                        }}
                        size={CustomDimension.sizeInSp(44)}
                      >
                        {minute}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        TimeManipulation.reduceMinute(minute, setMinute);
                      }}
                      className="items-center justify-center"
                      style={{
                        height: 27,
                      }}
                    >
                      <ChevronDown color={ColorsApp.black} size={35} />
                    </TouchableOpacity>
                  </View>
                  <View className="flex-col ">
                    <TouchableOpacity
                      onPress={() => {
                        TimeManipulation.changeAmPm(amPm, setAmPm);
                      }}
                      className="items-center justify-center"
                      style={{
                        height: 27,
                      }}
                    >
                      <ChevronUp color={ColorsApp.black} size={35} />
                    </TouchableOpacity>
                    <View
                      className="mt-3 mb-3 pt-3 pb-3 ps-2 pe-2"
                      style={{
                        borderBottomColor: ColorsApp.black500,
                        borderBottomWidth: 0.5,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: FontsUtils.bold,
                        }}
                        size={CustomDimension.sizeInSp(44)}
                      >
                        {amPm}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        TimeManipulation.changeAmPm(amPm, setAmPm);
                      }}
                      className="items-center justify-center"
                      style={{
                        height: 27,
                      }}
                    >
                      <ChevronDown color={ColorsApp.black} size={35} />
                    </TouchableOpacity>
                  </View>
                </View>
              ) : null}

              {usingTime && isStartDate ? (
                <View className="pb-2 pt-4 mt-2">
                  <TouchableOpacity
                    onPress={() => {
                      setTodayNow();
                    }}
                    className="max-w-full h-14 rounded-lg mb-4 align-middle justify-center items-center"
                    style={{
                      backgroundColor: ColorsApp.primary,
                    }}
                  >
                    <Text
                      color="black"
                      size={CustomDimension.sizeInSp(14)}
                      style={{
                        fontWeight: '600',
                        color: 'black',
                      }}
                    >
                      Set Today Now
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : null}

              <View className={'pb-2'}>
                <BottomSheetCloseTrigger asChild>
                  <TouchableOpacity
                    onPress={() => {
                      if (usingTime) {
                        const timeChoose = `${hour}:${minute}:${amPm}`;
                        const todayNow = `${selectDate} ${timeChoose}`;
                        const todaySplit = todayNow.split(' ');
                        const hoursResult = TimeManipulation.convertAmPmTo24Hours(timeChoose);
                        const hourSplit = timeChoose.split(':');

                        processingTime(hourSplit, todaySplit, hoursResult, selectDate, false);
                      } else {
                        if (callbackApply !== null) {
                          callbackApply();
                        }
                      }
                    }}
                    className="max-w-full h-14 rounded-lg mb-4 align-middle justify-center items-center"
                    style={{
                      backgroundColor: ColorsApp.primary,
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: '600',
                        color: 'black',
                        fontSize: CustomDimension.sizeInSp(14),
                      }}
                    >
                      Apply
                    </Text>
                  </TouchableOpacity>
                </BottomSheetCloseTrigger>
              </View>
            </BottomSheetView>
          </BottomSheetContent>
        ) : null}
      </BottomSheet>
    </View>
  );
};

export default React.memo(DatePickerBtn);

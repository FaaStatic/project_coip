import { router, useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { BackHandler, StyleSheet, View } from 'react-native';
import Text from '@untr/apps-coip/components/Text';
import CustomHeaderApp from '@untr/apps-coip/components/CustomHeaderApp';
import Space from '@untr/apps-coip/components/Space';
import LineHorizontal from '@untr/apps-coip/components/Line';
import DatePickerBtn from '@untr/apps-coip/components/DatePickerButton';
import LoadingCustom from '@untr/apps-coip/components/LoadingCustom';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import LoadingState from '@untr/apps-coip/states/loadingState.state';
import globalStyles from '@untr/apps-coip/configs/styleGlobal.config';
import { ColorsApp } from '@untr/apps-coip/themes/colorApp.theme';
import { CustomDimension } from '@untr/apps-coip/utils/customDimension.util';
import { readAllDatafromDB } from '@untr/apps-coip/utils/operationStorageDb.util';
import { schemaDatabase } from '@untr/apps-coip/constants/schemaDatabase.constants';
import { GenerateUid } from '@untr/apps-coip/utils/generateUuid.util';
import moment from 'moment';
import { ToastProvider } from '@untr/apps-coip/lib/components/deprecated-ui';
import StatusAlertDialog from '@untr/apps-coip/components/StatusAlertDialog';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useGetUserLocal } from '@untr/apps-coip/hooks/useGetUserLocal';
import { useCustomerData } from '@untr/apps-coip/hooks/useCustomerData';
import { checksheetJobType, createJobType, jobItemSchema } from '@untr/apps-coip/types/createJobForm.type';
import ListComponenetJob from './components/ListComponentJob';
import BtnSaveJob from './components/BtnSaveJob';
import { FontsUtils } from '@untr/apps-coip/configs/fonUtils.config';

const CreateJobs = () => {
  const [markedDates, setMarkedDates] = useState({});

  const {
    isPending: customerPending,
    data: dataCustomerName,
    refetch: customerRefetch,
  } = useCustomerData();
  const {
    isPending: userNamePending,
    data: dataUserName,
    refetch: usernameRefetch,
  } = useGetUserLocal();

  const formCreateJob = useForm<createJobType>({
    defaultValues: {
      assignment_id: '',
      numberJob: 0,
      main_title: '',
      date: '',
      plantArea: '',
      status: 0,
      unit: '',
      level: 0,
      customer: '',
      idCustomer: '',
      customerCode: '',
      createdByName: '',
      main_job: [],
      detail_job: [],
    },
  });
  const [isReady, setIsReady] = useState(false);
  const loading = LoadingState((state) => state.isLoading);
  const changeLoading = LoadingState((state) => state.changeLoading);
  const scrollViewRef = useRef(null);
  const numberJobId = GenerateUid.generateNumericUUID(12);

  const [isSuccessCreate, setIsSuccessCreate] = useState(false);
  const [isFailCreate, setIsFailCreate] = useState(false);

  const processFormReady = useCallback(async () => {
    if (!dataUserName || !dataCustomerName) {
      customerRefetch();
      usernameRefetch();
      changeLoading(true);
      return;
    }
    const formReady: checksheetJobType[] = await readAllDatafromDB<checksheetJobType[]>(
      schemaDatabase.CheckSheetJob
    );

    // Helper function to generate job structure
    const createJobStructure = (
      jobType: string,
      isActive: boolean,
      selected: boolean
    ): jobItemSchema[] => {
      return formReady
        .filter(
          (item) =>
            item.jobType === jobType && (isActive === undefined || item.isActive === isActive)
        )
        .map((item) => {
          const idGen = GenerateUid.Uuid32Bit();
          const idGenJob = GenerateUid.Uuid32Bit();
          const newChild = item.childJob.map((child) => ({
            title: child.desc,
            value: jobType === 'ADDITIONAL JOB' ? idGenJob : child.id,
            id: jobType === 'ADDITIONAL JOB' ? idGen : child.id,
            sequence: child.sequence,
            selected: jobType === 'MAIN JOB' || false,
          }));

          return {
            title: item.titleMainJob,
            value: item.id,
            id: item.id,
            sequence: item.sequence,
            selected: selected,
            child: newChild,
          };
        });
    };

    // Generate job data
    const mainJob = createJobStructure('MAIN JOB', true, true);
    const detailJob = createJobStructure('ADDITIONAL JOB', true, false);

    // Generate GUIDs
    const guidJob = GenerateUid.Uuid32Bit();
    const guidCustomer = GenerateUid.Uuid32Bit();
    const param: createJobType = {
      assignment_id: guidJob,
      numberJob: numberJobId as number,
      main_title: `COIP - ${numberJobId}`,
      date: '',
      status: 0,
      unit: '',
      level: 0,
      customerCode: `${dataCustomerName.code}`,
      idCustomer: guidCustomer,
      customer: `${dataCustomerName.name}`,
      createdByName: `${dataUserName.firstname} ${dataUserName.lastname}`,
      plantArea: `${dataUserName.branchSupportArea}`,
      main_job: mainJob,
      detail_job: detailJob,
    };
    // Reset form with the required values
    formCreateJob.reset(param);

    // Simulate loading state change after form reset
    setTimeout(() => {
      changeLoading(false);
      setIsReady(true);
    }, 5000);
  }, [dataUserName, dataCustomerName]);

  useFocusEffect(
    useCallback(() => {
      processFormReady();
      const subscribe = BackHandler.addEventListener('hardwareBackPress', () => {
        if (router.canGoBack()) {
          router.back();
          return true;
        } else {
          return false;
        }
      });
      return () => subscribe.remove();
    }, [processFormReady])
  );

  useEffect(() => {
    if (Object.keys(formCreateJob.formState.errors).length > 0 && scrollViewRef.current) {
      scrollViewRef?.current.scrollTo({ y: 0, animated: true });
    }
  }, [formCreateJob.formState.errors]);

  return (
    <FormProvider {...formCreateJob}>
      <View style={[globalStyles().topSafeArea, styles.viewScreenPositionStyle]}>
        <CustomHeaderApp
          title="Select Job"
          useSync={true}
          isCenter={false}
          callback={() => {
            router.back();
          }}
        />
        <LoadingCustom
          showLoading={
            userNamePending ||
            dataUserName === undefined ||
            customerPending ||
            dataCustomerName === undefined
          }
        />
        {!userNamePending &&
        !customerPending &&
        dataUserName !== undefined &&
        dataCustomerName !== undefined ? (
          <KeyboardAwareScrollView
            ref={scrollViewRef}
            style={styles.keyboardAvoidStyle}
            showsVerticalScrollIndicator={false}
          >
            <Space height={10} />
            <View style={styles.viewInformationStyle}>
              <View style={styles.viewLabelStyleText}>
                <Text
                  numberOfLines={2}
                  size={12}
                  type="medium"
                  color={ColorsApp.textColorSecondaryVariant}
                >
                  Customer
                </Text>
                <Space height={7} />
                <Text numberOfLines={2} size={14} type="bold" style={styles.labelFieldStyleText}>
                  {(dataCustomerName?.name as string) || ''}
                </Text>
              </View>
              <View style={styles.viewLabelStyleText}>
                <Text
                  numberOfLines={2}
                  size={12}
                  type="medium"
                  color={ColorsApp.textColorSecondaryVariant}
                >
                  Plant Area
                </Text>
                <Space height={7} />
                <Text numberOfLines={2} size={14} style={styles.labelFieldStyleText}>
                  {(dataUserName?.branchSupportArea as string) || '-'}
                </Text>
              </View>

              <View style={styles.viewLabelFieldStyleText}>
                <Text
                  numberOfLines={2}
                  size={12}
                  type="medium"
                  color={ColorsApp.textColorSecondaryVariant}
                >
                  Plan Execution
                </Text>
                <Space height={8} />
                <View className="items-center flex-row justify-between ">
                  <View
                    className="flex-col items-start "
                    style={{
                      width: CustomDimension.WIDTH_PERCENTAGE(80),
                    }}
                  >
                    <Text numberOfLines={2} size={14} style={styles.labelFieldStyleText}>
                      {formCreateJob.watch('date').length > 0
                        ? formCreateJob.getValues('date')
                        : 'Input Date Plans Execution'}
                    </Text>
                  </View>
                  <Controller
                    name="date"
                    control={formCreateJob.control}
                    rules={{
                      required: 'Date field required!',
                    }}
                    render={({ field: { value, onChange } }) => (
                      <DatePickerBtn
                        setSelectedDate={async (dateString) => {
                          onChange(dateString);
                          await formCreateJob.trigger();
                        }}
                        callbackApply={() => {
                          if (value.length === 0) {
                            onChange(moment().format('YYYY-MM-DD'));
                          }
                        }}
                        minDate={moment().format('YYYY-MM-DD')}
                        maxDate={moment().add(30).format('YYYY-MM-DD')}
                        multipleSelected={false}
                        loading={loading}
                        maxDateInput={moment().add(30, 'days').format('YYYY-MM-DD')}
                        setLoading={changeLoading}
                        setMarkedDate={setMarkedDates}
                        selectDate={value ? value : ''}
                        markedDates={markedDates}
                      />
                    )}
                  />
                </View>
              </View>
            </View>
            {formCreateJob.formState.errors?.date?.message ? (
              <Text size={CustomDimension.sizeInSp(12)} color={ColorsApp.errorColor}>
                {formCreateJob.formState.errors?.date?.message}
              </Text>
            ) : null}
            <Space height={20} />
            <LineHorizontal height={10} />
            <Space height={20} />
            {isReady && <ListComponenetJob />}
            <Space height={40} />
            {isReady && (
              <BtnSaveJob
                setIsSuccessCreate={setIsSuccessCreate}
                setIsFailCreate={setIsFailCreate}
              />
            )}
            <Space height={70} />
          </KeyboardAwareScrollView>
        ) : null}
        <StatusAlertDialog
          isError={false}
          title={'Create Jobs is Success!'}
          desc={'Your Job is success saved!'}
          titleBtn={'OK'}
          callbackCloseAlert={(value) => {
            changeLoading(true);
            setIsSuccessCreate(value);
            router.replace({
              pathname: '/job-detail',
              params: {
                fromCreateJob: 1,
                isCompleted: 0,
                assignId: formCreateJob.getValues('assignment_id'),
              },
            });
          }}
          isOpen={isSuccessCreate}
        />
        <StatusAlertDialog
          isError={true}
          title={'Create Jobs is Failed!'}
          desc={'Your Job is failed saved!'}
          titleBtn={'OK'}
          callbackCloseAlert={(value) => {
            if (scrollViewRef.current !== null) {
              scrollViewRef.current.scrollTo({ y: 0, animated: true });
            }
            setIsFailCreate(value);
          }}
          isOpen={isFailCreate}
        />
        <ToastProvider />
      </View>
    </FormProvider>
  );
};

const styles = StyleSheet.create({
  viewScreenPositionStyle: {
    position: 'relative',
  },
  viewInformationStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'space-between',
  },
  viewLabelFieldStyleText: {
    width: '100%',
    marginTop: 3,
    borderBottomWidth: 0.5,
    borderBottomColor: ColorsApp.black500,
    paddingBottom: CustomDimension.scaledVertical(15),
  },
  viewLabelStyleText: { width: '48%', marginTop: 3 },
  labelFieldStyleText: { fontFamily: FontsUtils.bold },
  keyboardAvoidStyle: {
    paddingHorizontal: CustomDimension.scaledHorizontal(25),
    paddingBottom: CustomDimension.scaledVertical(15),
  },
});

export default CreateJobs;

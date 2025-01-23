import { useFormContext } from 'react-hook-form';
import { View, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { useJobCreationJobsPatchHook } from '@untr/apps-coip/api/jobCreation/hooks/jobCreation/useJobCreationJobsPatchHook';
import { useSavingForm } from '@untr/apps-coip/hooks/useSavingForm';
import { useSubmitForm } from '@untr/apps-coip/hooks/useSubmitForm';
import isConnectedState from '@untr/apps-coip/states/isConnectedState.state';
import Text from '@untr/apps-coip/components/Text';
import { inputChecksheetType } from '@untr/apps-coip/types/inputCheckSheetType.type';
import { FontsUtils } from '@untr/apps-coip/configs/fonUtils.config';
import { ColorsApp } from '@untr/apps-coip/themes/colorApp.theme';
import ReloadState from '@untr/apps-coip/states/reload.state';
import { useCoipSubmitCheckSheetValueHook } from '@untr/apps-coip/api/msCoip/hooks/coip/useCoipSubmitCheckSheetValueHook';
import Space from '@untr/apps-coip/components/Space';
import { useJobCreationJobsPostHook } from '@untr/apps-coip/api/jobCreation/hooks/jobCreation/useJobCreationJobsPostHook';
import { SyncBeforeSubmit } from '@untr/apps-coip/utils/syncPostDatabase.util';
import { CreateAdditionalJobDto, CreateJobDto, UpdateJobCommand } from '@untr/apps-coip/api/jobCreation';
import { OutputDetail } from '@untr/apps-coip/hooks/useGetFormDetail';
import { CreateCoipFormCommand } from '@untr/apps-coip/api/msCoip';
import { useEffect } from 'react';

type BtnSubmitProp = {
  setIsSubmit: (data: boolean) => void;
  isSync: boolean;
  isSubmit: boolean;
  setLoadingValidation: (data: boolean) => void;
  loadingValidation: boolean;
  setIsErrorStatus: (data: boolean) => void;
  setIsSuccessStatus: (data: boolean) => void;
  setLoadingSubmit: (data: boolean) => void;
  assignId: string;
  dataJob: OutputDetail;
  setSaveProcess: (data: boolean) => void;
  changeRefreshJob: (data: boolean) => void;
  index: number;
};

const BtnSubmitForm = ({
  setIsSubmit,
  setLoadingValidation,
  loadingValidation,
  setIsErrorStatus,
  setIsSuccessStatus,
  assignId,
  setLoadingSubmit,
  index,
  dataJob,
  isSubmit,
  isSync,
  changeRefreshJob,
  setSaveProcess,
}: BtnSubmitProp) => {
  const submitForm = useFormContext();
  const updateReload = ReloadState((state) => state.changeReloadState);
  const { isPending: dataSubmitProcessLoading, mutateAsync: mutateDataSubmitProcess } =
    useSubmitForm();
  const { mutateAsync: mutateDataSaving } = useSavingForm();
  const { mutateAsync: mutateUpdateJobIdentity, isPending: loadingSubmitJobIdentity } =
    useJobCreationJobsPatchHook();
  const { mutateAsync: mutateCheckSheet } = useCoipSubmitCheckSheetValueHook();
  const uploadDataJob = useJobCreationJobsPostHook();

  const isConnected = isConnectedState((state) => state.isConnect);

  const submitFailFunction = async () => {
    setIsSubmit(false);
    setLoadingValidation(false);
    setIsErrorStatus(true);
    setLoadingSubmit(false);
  };

  const loadingSubmitOff = async () => {
    setLoadingValidation(false);
    setSaveProcess(false);
    setLoadingSubmit(false);
    updateReload(true);
  };

  const validationFailFunction = async (error: any) => {
    if (error.err !== undefined) {
      for (let item of error.err) {
        const { name, type, message } = item;
        submitForm.setError(name, {
          type: type,
          message: message,
        });
      }
    }
    setLoadingValidation(false);
    updateReload(false);
    setIsErrorStatus(true);
    setLoadingSubmit(false);
  };

  const syncDataFirst = async () => {
    let listJobs = dataJob.additionalJobs as CreateAdditionalJobDto[];
    let paramJobUpload: CreateJobDto = {
      id: assignId,
      number: dataJob.jobNumber.toString(),
      plantArea: dataJob?.plantArea,
      planExecutionDate: dataJob?.planExecutionDate,
      mainJob: dataJob?.title,
      status: '0',
      createdByName: dataJob.createdByName,
      additionalJobs: listJobs,
    };

    await SyncBeforeSubmit({
      uploadDataJob: uploadDataJob,
      id: assignId,
      data: paramJobUpload,
    });
  };

  const validationForm = async (dataRawSubmit: inputChecksheetType) => {
    setLoadingValidation(true);
    try {
      if (!dataJob.isSync) {
        await syncDataFirst();
      }
      const resultData = await mutateDataSubmitProcess({
        data: dataRawSubmit,
        isSync: isSync,
        assignId: assignId as string,
        index: index,
      });

      return resultData;
    } catch (error) {
      await validationFailFunction(error);
      return null;
    }
  };

  const submitJobIdentityForm = async (jobIdentityData: UpdateJobCommand): Promise<boolean> => {
    setLoadingSubmit(true);
    try {
      let isSuccess = false;
      await mutateUpdateJobIdentity(jobIdentityData, {
        onSuccess: (_) => {
          isSuccess = true;
        },
        onError: async (_) => {
          await submitFailFunction();
          isSuccess = false;
        },
      });
      return isSuccess;
    } catch (error) {
      await submitFailFunction();
    }
  };

  const submitChecksheetForm = async (checkSheetForm: CreateCoipFormCommand): Promise<boolean> => {
    try {
      let isSuccess = false;
      await mutateCheckSheet(checkSheetForm, {
        onSuccess: (_) => {
          isSuccess = true;
        },
        onError: async (_) => {
          await submitFailFunction();
          isSuccess = false;
        },
      });
      return isSuccess;
    } catch (error) {
      await submitFailFunction();
    }
  };

  const saveSubmitSuccessfully = async (
    dataRawSubmit: inputChecksheetType,
    statusJob: boolean,
    statusSheet: boolean
  ) => {
    setSaveProcess(true);
    let isSuccess = false;
    await mutateDataSaving(
      {
        data: dataRawSubmit,
        jobId: assignId,
        isSync: isSync,
        statusCompleted: statusJob && statusSheet ? 2 : 1,
      },
      {
        onSuccess: (_) => {
          isSuccess = true;
        },
        onError: (_) => {
          isSuccess = false;
        },
      }
    );

    if (isSuccess) {
      if (statusJob && statusSheet) {
        setIsSuccessStatus(true);
        changeRefreshJob(true);
        await loadingSubmitOff();
      } else {
        setIsErrorStatus(true);
        await loadingSubmitOff();
      }
    } else {
      setIsErrorStatus(true);
      await loadingSubmitOff();
    }
  };

  const submitData = async (dataRawSubmit: inputChecksheetType) => {
    try {
      setIsSubmit(true);
      await new Promise((_) =>
        setTimeout(async () => {
          const resultValidation = await validationForm(dataRawSubmit);
          if (resultValidation !== null) {
            const jobIdentiySubmit = await submitJobIdentityForm(resultValidation.submitJob);
            if (jobIdentiySubmit) {
              const formCheckSheetSubmit = await submitChecksheetForm(resultValidation.submitForm);
              await saveSubmitSuccessfully(dataRawSubmit, jobIdentiySubmit, formCheckSheetSubmit);
            }
          } else {
            submitFailFunction();
          }
        }, 500)
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSubmit) submitFailFunction();
  }, [isConnected]);

  return (
    <View className="flex-1 h-12">
      <TouchableOpacity
        disabled={!isConnected || loadingValidation || loadingSubmitJobIdentity}
        onPress={() => {
          submitForm.clearErrors();
          setLoadingValidation(true);
          submitForm.handleSubmit(submitData)();
        }}
        style={styles(isConnected).buttonSubmitStyle}
      >
        {loadingValidation || loadingSubmitJobIdentity || dataSubmitProcessLoading ? (
          <View className="flex-row items-center justify-center">
            <ActivityIndicator color={'black'} size={'small'} />
            <Space width={8} />
            <Text size={14} type="medium" style={styles(isConnected).processTextStyle}>
              Submitting ...
            </Text>
          </View>
        ) : (
          <Text size={14} style={styles(isConnected).idleTextStyle}>
            Submit
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = (isConnected?: boolean) =>
  StyleSheet.create({
    idleTextStyle: {
      fontWeight: '600',
      fontFamily: FontsUtils.medium,
      color: isConnected ? 'black' : 'white',
    },
    processTextStyle: {
      fontFamily: FontsUtils.bold,
      color: 'white',
    },
    buttonSubmitStyle: {
      backgroundColor: isConnected ? ColorsApp.primary : ColorsApp.secondaryVariant,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      height: 48,
      flex: 1,
    },
  });

export default BtnSubmitForm;

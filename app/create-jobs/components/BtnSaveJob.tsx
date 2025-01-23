import moment from 'moment';
import { useFormContext } from 'react-hook-form';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useJobCreationJobsPostHook } from '@untr/apps-coip/api/jobCreation/hooks/jobCreation';
import { useSaveCreateJobs } from '@untr/apps-coip/hooks/useSaveCreateJobs';
import isConnectedState from '@untr/apps-coip/states/isConnectedState.state';
import LoadingState from '@untr/apps-coip/states/loadingState.state';
import { createJobType, jobItemSchema } from '@untr/apps-coip/types/createJobForm.type';
import { uploadCreateJobs } from '@untr/apps-coip/types/uploadCreateJobs.type';
import Text from '@untr/apps-coip/components/Text';
import { ColorsApp } from '@untr/apps-coip/themes/colorApp.theme';
import Space from '@untr/apps-coip/components/Space';
import { CustomDimension } from '@untr/apps-coip/utils/customDimension.util';
import { CreateJobDto } from '@untr/apps-coip/api/jobCreation/types/CreateJobDto';
import { GenerateUid } from '@untr/apps-coip/utils/generateUuid.util';

type BtnSaveJobProp = {
  setIsSuccessCreate: (data: boolean) => void;
  setIsFailCreate: (data: boolean) => void;
};

const BtnSaveJob = ({ setIsSuccessCreate, setIsFailCreate }: BtnSaveJobProp) => {
  const saveJob = useFormContext<createJobType>();
  const changeLoading = LoadingState((state) => state.changeLoading);
  const isConnected = isConnectedState((state) => state.isConnect);
  const uploadData = useJobCreationJobsPostHook();
  const { mutate: mutateCreateJobs } = useSaveCreateJobs();

  const validationFail = async (error) => {
    if (error.err !== undefined) {
      error.err.forEach((error) => {
        const path = error.path.join('.');
        saveJob.setError(path, {
          type: 'manual',
          message: error.message,
        });
      });
    }
    changeLoading(false);
    setIsFailCreate(true);
  };

  const validationProcess = async (dataCheckSheet: createJobType) => {
    try {
      const dateNow = new Date();
      const dateExec = moment(saveJob.getValues('date'), 'YYYY-MM-DD').set({
        hour: dateNow.getHours(),
        minute: dateNow.getMinutes(),
        second: dateNow.getSeconds(),
        millisecond: dateNow.getMilliseconds(),
      }).utc();

      let dataAdditional: jobItemSchema[] = saveJob.getValues('detail_job');
      let dataJob = [];
      let dataCheckSheetForm = [];

      for (let itemParent of dataAdditional) {
        const dataItem = itemParent.child
          .filter((item) => item.selected === true)
          .map((item) => {
            const { title, value } = item;
            const generateID = GenerateUid.Uuid32Bit();
            dataJob.push({
              id: generateID,
              jobId: saveJob.getValues('assignment_id'),
              desc: title,
              parameter: itemParent.title,
            });
            return {
              id: value,
              jobId: saveJob.getValues('assignment_id'),
              desc: title,
            };
          });
        if (dataItem.length > 0) {
          const { title, id, sequence } = itemParent;
          dataCheckSheetForm.push({
            title: title,
            value: id,
            id: id,
            sequence: sequence,
            dataChild: dataItem,
          });
        }
      }

      let uploadCheckSheet: CreateJobDto = {
        id: saveJob.getValues('assignment_id'),
        number: `${saveJob.getValues('numberJob')}`,
        plantArea: saveJob.getValues('plantArea'),
        planExecutionDate: dateExec.toISOString(),
        mainJob: saveJob.getValues('main_job')[0]?.title,
        status: String(saveJob.getValues('status')),
        createdByName: saveJob.getValues('createdByName'),
        additionalJobs: dataJob,
      };

      uploadCreateJobs.parse(uploadCheckSheet);
      let savingDataLocal = {
        ...dataCheckSheet,
        title: uploadCheckSheet.mainJob,
        dataForm: dataCheckSheetForm,
        dataJob: dataJob,
      };
      return {
        localSavingData: savingDataLocal,
        uploadCheckSheet: uploadCheckSheet,
      };
    } catch (error) {
      if (error !== undefined) {
        validationFail(error);
      }
    }
  };

  const savingJobLocal = (dataValidation: any) => {
    mutateCreateJobs(
      {
        data: dataValidation.localSavingData,
        isSync: isConnected,
      },
      {
        onSuccess: (_) => {
          setIsSuccessCreate(true);
        },
        onError: (_) => {
          setIsFailCreate(true);
        },
      }
    );
  };

  const submitProcess = async (dataValidation: any) => {
    if (isConnected) {
      uploadData.mutate(dataValidation.uploadCheckSheet, {
        onSuccess: (_) => {
          savingJobLocal(dataValidation);
        },
        onError: (_) => {
          setIsFailCreate(true);
        },
      });
    } else {
      savingJobLocal(dataValidation);
    }
    changeLoading(false);
  };

  const submitData = async (dataCheckSheet: createJobType) => {
    changeLoading(true);
    const dataValidation = await validationProcess(dataCheckSheet);
    await submitProcess(dataValidation);
    changeLoading(false);
  };

  const onInvalid = async (_) => {
    changeLoading(false);
    setIsFailCreate(true);
  };

  return (
    <View>
      <TouchableOpacity
        className="h-12 justify-center items-center"
        onPress={() => saveJob.handleSubmit(submitData, onInvalid)()}
        style={styles.btnStyle}
      >
        <Text size={14} type="bold">
          Save
        </Text>
      </TouchableOpacity>
      <Space height={16} />
      {!isConnected && (
        <View className="mt-2 items-center justify-center">
          <Text size={CustomDimension.sizeInSp(11)} color={ColorsApp.errorColor}>
            *New Job will save to local storage cause internet is disconnected!
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  btnStyle: { backgroundColor: ColorsApp.primary, borderRadius: 10 },
});

export default BtnSaveJob;

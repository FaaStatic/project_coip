import { useMutation } from '@tanstack/react-query';
import { schemaDatabase } from '@untr/apps-coip/constants/schemaDatabase.constants';
import { updateData } from '@untr/apps-coip/utils/operationStorageDb.util';

export type SavingJobParam = {
  data: any;
  jobId: any;
  isSync?: boolean;
  statusCompleted?: number;
};

export const useSavingForm = () => {
  const SavingJobUtil = async (itemData: SavingJobParam) => {
    const { data, jobId, isSync, statusCompleted } = itemData;
    try {
      const keyMap = Object.keys(data).filter((item) => item !== 'job_identity');
      let jobIdentity = data['job_identity'];
      let formJob = {};
      const excavatorList = jobIdentity.excavator_list;
      const unitList = jobIdentity.unit_list;
      const equipmentIdentities = [...excavatorList, ...unitList];
      keyMap.forEach((item) => {
        formJob = {
          ...formJob,
          [item]: data[item],
        };
      });

      await updateData(
        schemaDatabase.CreateJobsItem,
        jobId,
        {
          form_job: JSON.stringify(formJob),
          job_identity: JSON.stringify(jobIdentity),
          status: statusCompleted,
          equipmentIdentities: JSON.stringify(equipmentIdentities),
          isSync: isSync,
          latitude: data.latitude,
          longitude: data.longitude,
          downTimeStartDate: data.start_hour,
          downTimeEndDate: data.end_hour,
        },
        'id'
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  return useMutation({
    mutationKey: ['savingJobs'],
    mutationFn: (itemData: SavingJobParam) => SavingJobUtil(itemData),
    gcTime: 500,
    networkMode: 'always',
  });
};

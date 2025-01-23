import { useMutation } from '@tanstack/react-query';
import moment from 'moment';
import { schemaDatabase } from '@untr/apps-coip/constants/schemaDatabase.constants';
import { createJobItemType } from '@untr/apps-coip/types/createJobItemType.type';
import { deleteSpecificByCondition, readAllDatafromDB } from '@untr/apps-coip/utils/operationStorageDb.util';

export const useAutoDeleteJob = () => {
  const deleteAutoJob = async () => {
    const date7DaysAgo = moment()
      .set({
        hour: 23,
        minute: 59,
        second: 0,
      })
      .toDate();
    date7DaysAgo.setDate(date7DaysAgo.getDate() - 7);
    const dataJob = await readAllDatafromDB<createJobItemType[]>(schemaDatabase.CreateJobsItem);
    for (let item of dataJob) {
      const planExec = moment.utc(item.planExecutionDate, 'YYYY-MM-DD HH:mm:ss.SSS Z').toDate();
      if (planExec < date7DaysAgo) {
        await deleteSpecificByCondition(schemaDatabase.CreateJobsItem, 'id = $0', item.id);
      }
    }
  };

  return useMutation({
    mutationFn: deleteAutoJob,
    mutationKey: ['deleteUnusedJob'],
    networkMode: 'always',
  });
};

import { useMutation } from '@tanstack/react-query';
import moment from 'moment';
import { schemaDatabase } from '@untr/apps-coip/constants/schemaDatabase.constants';
import { readSingleDatafromDB, updateData } from '@untr/apps-coip/utils/operationStorageDb.util';

const AutoSyncJob = async () => {
  try {
    const dataFirstInstall = await readSingleDatafromDB(schemaDatabase.FirstInstall);
    const dateLast = await readSingleDatafromDB(schemaDatabase.Syncs);
    const nowDate = new Date();

    const dateLastFormat = moment(dateLast, 'YYYY-MM-DD').toDate();
    const differenceInMillis = nowDate.getTime() - dateLastFormat.getTime();
    const differenceInDays = differenceInMillis / (1000 * 60 * 60 * 24);
    if (differenceInDays === 7) {
      await updateData(
        schemaDatabase.FirstInstall,
        dataFirstInstall.id as string,
        { isFirst: true },
        'id'
      );
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

export const useAutoSyncAgain = () => {
  return useMutation({
    mutationKey: ['syncAgain2week'],
    mutationFn: AutoSyncJob,
    networkMode: 'always',
  });
};

import { useQuery } from '@tanstack/react-query';
import { schemaDatabase } from '@untr/apps-coip/constants/schemaDatabase.constants';
import { createJobItemType } from '@untr/apps-coip/types/createJobItemType.type';
import { dataCheckSheet } from '@untr/apps-coip/types/inputCheckSheetType.type';
import { readAllDatafromDB } from '@untr/apps-coip/utils/operationStorageDb.util';

const getJobCardStatus = async (queryKey) => {
  try {
    const [_, customerCode] = queryKey;

    const result: createJobItemType[] =
      (await readAllDatafromDB<createJobItemType[]>(schemaDatabase.CreateJobsItem)) || [];
    const result2: dataCheckSheet[] =
      (await readAllDatafromDB<dataCheckSheet[]>(schemaDatabase.CheckSheetMaster)) || [];
    if (customerCode) {
      let final = result
        .filter((item) => {
          JSON.parse(item.customer).code === customerCode;
        })
        .map((item) => item);
      return {
        dataCreateJob: final,
        dataChecksheet: result2,
      };
    }
    return {
      dataCreateJob: result,
      dataChecksheet: result2,
    };
  } catch (error) {
    console.log(error);
    return {
      dataCreateJob: [],
      dataChecksheet: [],
    };
  }
};

export const useGetStatusJob = (customerCode = null, isInternal = false) => {
  return useQuery({
    queryKey: ['jobStatus', customerCode],
    queryFn: ({ queryKey }) => getJobCardStatus(queryKey),
    networkMode: 'always',
    enabled: customerCode !== null || !isInternal,
    select: (data) => {
      const createJob: createJobItemType[] = data.dataCreateJob;
      const cheksheetData: dataCheckSheet[] = data.dataChecksheet;

      return {
        completed: createJob.filter((item) => item.status === 2).length || 0,
        progress: createJob.filter((item) => item.status === 1).length || 0,
        newJob: createJob.length || 0,
        isReadyCheckSheet: cheksheetData?.length > 0,
      };
    },
  });
};

import { useQuery } from '@tanstack/react-query';
import { readSpesificDatafromDB } from '@untr/apps-coip/utils/operationStorageDb.util';
import { schemaDatabase } from '@untr/apps-coip/constants/schemaDatabase.constants';
import { checksheetFormType, jobIdentityType } from '@untr/apps-coip/types/inputCheckSheetType.type';
import { createJobItemType } from '@untr/apps-coip/types/createJobItemType.type';

export type OutputDetail = createJobItemType & {
  parsingJobIdentity: jobIdentityType;
  parsingFormJob: checksheetFormType;
};

const getFormDetail = async ({
  queryKey,
}: {
  queryKey: [string, { assignmentId: string }];
}): Promise<OutputDetail | null> => {
  try {
    const [, { assignmentId }] = queryKey;
    const [processJson] = await readSpesificDatafromDB<createJobItemType[]>(
      schemaDatabase.CreateJobsItem,
      assignmentId,
      'id'
    );

    if (!processJson) return null; // Handle the case where no data is found

    // Parse the JSON fields only once
    const formJob = JSON.parse(processJson.form_job);
    const jobIdentity = JSON.parse(processJson.job_identity);

    return {
      ...processJson,
      parsingJobIdentity: jobIdentity,
      parsingFormJob: formJob,
    };
  } catch (err) {
    console.error(err); // Optionally log the error
    return null; // Return an empty array in case of an error
  }
};

export const useGetFormDetail = ({ assignmentId }) => {
  return useQuery({
    queryKey: ['getFormKey', { assignmentId }],
    queryFn: getFormDetail,
    retry: 1,
    retryDelay: 3000,
    networkMode: 'always',
  });
};

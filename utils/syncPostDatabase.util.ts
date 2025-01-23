import { UseMutationResult } from '@tanstack/react-query';
import { CreateAdditionalJobDto, CreateJobCommand, CreateJobDto } from '@untr/apps-coip/api/jobCreation';
import { schemaDatabase } from '../constants/schemaDatabase.constants';
import { readAllDataWithFilter, updateData } from './operationStorageDb.util';
import { createJobItemType } from '@untr/apps-coip/types/createJobItemType.type';

interface SyncPostDatabaseProps {
  uploadDataJob: UseMutationResult<object, object, CreateJobCommand, unknown>;
}

export const SyncPostDatabase = async ({ uploadDataJob }: SyncPostDatabaseProps) => {
  try {
    const dataCreateJob: createJobItemType[] = await readAllDataWithFilter(
      schemaDatabase.CreateJobsItem,
      'isSync = false'
    );

    //SYNC JOBS POST
    if (dataCreateJob?.length > 0) {
      dataCreateJob?.map((item) => {
        let listJobs = item.additionalJobs as CreateAdditionalJobDto[];
        let data: CreateJobDto = {
          id: item?.id,
          number: item?.jobNumber.toString(),
          plantArea: item?.plantArea,
          planExecutionDate: item?.planExecutionDate,
          mainJob: item?.title,
          status: item?.status.toString(),
          createdByName: item?.createdByName,
          additionalJobs: listJobs,
        };

        uploadDataJob.mutate(data, {
          onSuccess: async (_) => {
            await updateData(schemaDatabase.CreateJobsItem, item.id, true, 'isSync');
          },
          onError: (err) => {
            let error: any = err;
            console.log('error', error?.message);
            throw error;
          },
        });
      });
    }
  } catch (error) {
    console.log('error', error);
  }
};

interface SyncBeforeSubmitProps {
  uploadDataJob: UseMutationResult<object, object, CreateJobCommand, unknown>;
  id: string;
  data: CreateJobDto;
}

export const SyncBeforeSubmit = async ({ uploadDataJob, id, data }: SyncBeforeSubmitProps) => {
  uploadDataJob.mutate(data, {
    onSuccess: async (_) => {
      await updateData(schemaDatabase.CreateJobsItem, id, true, 'isSync');
    },
    onError: (err) => {
      let error: any = err;
      console.log('error', error?.message);
      throw error;
    },
  });
};

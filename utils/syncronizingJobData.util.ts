import {
  bulkInsert,
  readSingleDatafromDB,
  saveDataToDB,
  updateData,
} from '@untr/apps-coip/utils/operationStorageDb.util';
import { schemaDatabase } from '@untr/apps-coip/constants/schemaDatabase.constants';
import Realm from 'realm';
import { TJsonaModel } from 'jsona/lib/JsonaTypes';

//type prop function checksheet download
type ChecksheetDownloadProcessProps = {
  data: TJsonaModel | TJsonaModel[];
  setProgress: (value: number) => void;
  setTempJobData: (value: any[]) => void;
};

type JobDataProp = {
  mainJobs?: any;
  customer?: any;
  equipment?: any;
  jobs?: any;
  totalData: number;
};

const dataJobSyncSetup = async (dataJob: any) => {
  const totalLength =
    dataJob?.mJobs?.length +
    dataJob?.customer?.length +
    dataJob?.equipments?.length +
    dataJob?.jobs?.length;
  return {
    mainJobs: dataJob?.mJobs || [],
    customer: dataJob?.customer || [],
    equipment: dataJob?.equipments || [],
    jobs: dataJob?.jobs || [],
    totalData: totalLength || 0,
  };
};

const mappingProcessDataJob = async (
  dataJob: JobDataProp,
  count,
  setProgress,
  targetProgress,
  totalItem
) => {
  const updateProgress = async () => {
    count += 1;
    if (count >= targetProgress) {
      setProgress((count - 1) / totalItem);
      targetProgress += totalItem * 0.1;
    }
    await new Promise((resolve) => setTimeout(resolve, 0));
  };

  const mainJobDataBulk = await Promise.all(
    dataJob.mainJobs
      .filter((item) => item.isActive)
      .map(async ({ childs, type, id, jobType, desc, createdDate, updatedDate, sequence }) => {
        const saveMap = childs
          .filter((child) => child.isActive)
          .sort((a, b) => a.sequence - b.sequence)
          .map(({ id, type, jobType, desc, createdDate, updatedDate, sequence }) => ({
            id,
            type,
            jobType,
            desc,
            createdDate,
            updatedDate,
            sequence,
          }));

        await updateProgress();
        return {
          id,
          typeData: type,
          jobType,
          titleMainJob: desc,
          sequence: sequence,
          childJob: saveMap,
          isActive: true,
          createdDate,
          updatedDate,
        };
      })
  );

  await bulkInsert(schemaDatabase.CheckSheetJob, mainJobDataBulk, 1000, Realm.UpdateMode.All);

  const equipmentDataBulk = await Promise.all(
    dataJob.equipment.map(async (item) => {
      const {
        id,
        type,
        unitModel,
        serialNumber,
        unitCode,
        smr,
        isProductUT,
        isActive,
        createdDate,
        updatedDate,
      } = item;
      await updateProgress();
      return {
        id,
        type,
        unitModel,
        serialNumber,
        unitCode,
        isProductUT,
        smr: smr ? Number(smr.toFixed(0)) : 0,
        isActive,
        createdDate,
        updatedDate,
      };
    })
  );

  await bulkInsert(schemaDatabase.Equipment, equipmentDataBulk, 1000, Realm.UpdateMode.All);
  await updateProgress();
  await bulkInsert(schemaDatabase.Customer, dataJob.customer, 1000, Realm.UpdateMode.All);
};

export const syncronizingJobDataUtil = async ({
  data,
  setProgress,
  setTempJobData,
}: ChecksheetDownloadProcessProps) => {
  try {
    const dataFirstInstall = await readSingleDatafromDB(schemaDatabase.FirstInstall);
    let syncdate = String(new Date());

    const lastSync = {
      id: new Realm.BSON.ObjectId(),
      dateSync: syncdate,
    };

    const jobSync = await dataJobSyncSetup(data);

    const totalItem = jobSync?.totalData;

    let count: number = 0;
    let targetProgress: number = totalItem * 0.1;

    await mappingProcessDataJob(jobSync, count, setProgress, targetProgress, totalItem);

    //save last sync to local
    await saveDataToDB(schemaDatabase.Syncs, lastSync);

    //save first condition after install data for showing auto sync when data is empty
    await updateData(
      schemaDatabase.FirstInstall,
      dataFirstInstall.id as string,
      { isFirst: false },
      'id'
    );
    setTempJobData(jobSync.jobs);
  } catch (error) {
    console.log('function download error', error);
    throw error;
  }
};

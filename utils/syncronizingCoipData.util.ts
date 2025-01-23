import { schemaDatabase } from '@untr/apps-coip/constants/schemaDatabase.constants';
import Realm from 'realm';
import moment from 'moment';
import { dataCheckSheet } from '@untr/apps-coip/types/inputCheckSheetType.type';
import { createJobItemType } from '@untr/apps-coip/types/createJobItemType.type';
import { checksheetJobType } from '@untr/apps-coip/types/createJobForm.type';
import { GenerateUid } from './generateUuid.util';
import { bulkInsert, readAllDatafromDB, deleteSpesificSchema } from './operationStorageDb.util';

let count: number = 0;
let totalItem: number = 0;
let targetProgress: number = 0;

//type prop function checksheet download
type ChecksheetDownloadProcessProps = {
  data: any;
  dataJob: any[];
  refreshCompleted?: boolean;
  setProgress: (value: number) => void;
};

type CoipDataProp = {
  checksheetMaster?: any;
  checksheetValue?: any;
  totalData: number;
};

type GroupData = {
  id: string;
  jobId: string;
  desc: string;
  sequence: number;
  data: any;
};

type ProcessGroupChecksheetType = {
  workingCondition?: GroupData;
  operationAspect?: GroupData;
  machineSupport?: GroupData;
};

const updateProgress = (setProgress: (data: number) => void) => {
  if (count <= totalItem) {
    count += 1;
  }
  if (count >= targetProgress) {
    setProgress((count - 1) / totalItem);
    if (targetProgress < totalItem) {
      targetProgress += totalItem * 0.1;
    }
  }
};

const filterAndMapCheckSheetData = (
  data: any[],
  jobIdParent: string,
  parameter: string,
  itemData: any
) => {
  if (jobIdParent !== '') {
    return data
      .filter((item) => item.parameter.toLowerCase().trim() === parameter.toLowerCase().trim())
      .filter((item) => String(item.jobId) === jobIdParent)
      .filter(
        (item) =>
          String(item?.assessmentArea)?.toLowerCase().trim() === itemData.desc.toLowerCase().trim()
      )
      .sort((a, b) => Number(a.sequence) - Number(b.sequence))
      .map((item) => {
        const { score = [0], recommendation = '', image = '', comment = '', ...defaultItem } = item;
        return {
          ...defaultItem,
          score: score[0],
          recommendation,
          image,
          comment,
          configScore: [1, 2, 3, 4, 5],
        };
      });
  } else {
    return data
      .filter(
        (item) =>
          item.parameter.toLowerCase().trim() === parameter.toLowerCase().trim() &&
          String(item.parameter).toLowerCase().trim() ===
            String(itemData.parameter).toLowerCase().trim()
      )
      .filter(
        (item) =>
          String(item?.assessmentArea)?.toLowerCase().trim() === itemData.desc.toLowerCase().trim()
      )
      .sort((a, b) => Number(a.sequence) - Number(b.sequence))
      .map((item) => {
        let { jobId, score, configScore, ...refreshData } = item;
        const guidGen = GenerateUid.Uuid32Bit();
        jobId = jobIdParent;
        return {
          ...refreshData,
          id: guidGen,
          jobId,
          comment: '',
          recommendation: '',
          image: '',
          configScore: configScore,
          score: score,
        };
      });
  }
};

const processGroupingCheckSheet = (
  checkSheetMasterData: any,
  itemData: any,
  haveValue: boolean,
  jobIdParent: string
): ProcessGroupChecksheetType => {
  let returnData: ProcessGroupChecksheetType = {};
  const parameters = ['Working Condition', 'Operation Aspect', 'Machine Support'];

  parameters.forEach((param) => {
    const filteredData = haveValue
      ? filterAndMapCheckSheetData(checkSheetMasterData, jobIdParent, param, itemData)
      : filterAndMapCheckSheetData(checkSheetMasterData, '', param, itemData).map((item) => {
          const id = GenerateUid.Uuid32Bit();
          return { ...item, id, jobId: jobIdParent };
        });

    if (filteredData.length > 0) {
      returnData[param] = {
        id: itemData.id,
        jobId: itemData.jobId,
        desc: itemData.desc,
        sequence: itemData.sequence,
        data: filteredData,
      };
    }
  });

  return returnData;
};

const processCollectChecksheet = async (
  formProsesCheksheet: any[],
  mJobsSequences: any,
  ChecksheetMasterData: any,
  ChecksheetMasterValue: any,
  bulkDataSyncJobs: any,
  setProgress: (value: number) => void
) => {
  for (let item of formProsesCheksheet) {
    const {
      id,
      mainJob,
      jobNumber,
      status,
      customerLevel,
      locationDetail,
      plantArea,
      latitude,
      longitude,
      averageSpeed,
      planExecutionDate,
      downTimeStartDate,
      downTimeEndDate,
      createdByName,
      createdBy,
      customer,
      equipmentIdentities,
      additionalJobs,
      createdDate,
      updatedDate,
    } = item;

    let excavatorList = [];
    let unitList = [];
    if (equipmentIdentities.length > 0) {
      equipmentIdentities.map((itm: any) => {
        let data = {
          id: itm.id,
          jobId: id,
          open: false,
          equipmentId: itm.equipmentId || '',
          operatorName: itm.operatorName || '',
          isExcavator: itm.equipment.isExcavator || false,
          equipment: {
            id: itm.equipment.id || '',
            type: itm.equipment.type || '',
            unitModel: itm.equipment.unitModel || '',
            serialNumber: itm.equipment.serialNumber || '',
            unitCode: itm.equipment.unitCode || '',
            smr: itm.equipment.smr || 0,
            isProductUT: itm.equipment.isProductUT,
          },
        };
        // process check and make excavator/unit item to job identity
        if (itm.equipment.unitModel.includes('PC') || itm.equipment.isExcavator === true) {
          excavatorList.push(data);
        } else {
          unitList.push(data);
        }
      });
    }

    if (excavatorList.length === 0) {
      excavatorList.push({
        id: GenerateUid.Uuid32Bit(),
        jobId: id,
        open: false,
        equipmentId: '',
        operatorName: '',
        isExcavator: true,
        equipment: {
          id: '',
          type: '',
          unitModel: 'New Form Excavator',
          smr: 0,
          isProductUT: true,
          unitCode: '-',
        },
      });
    }

    const formJob = additionalJobs.map((itm) => {
      const sequence =
        mJobsSequences
          .find(
            (item) =>
              String(item.desc).toLowerCase().trim() === String(itm.parameter).toLowerCase().trim()
          )
          ?.childs.find(
            (child) =>
              String(child.desc).toLowerCase().trim() === String(itm.desc).toLowerCase().trim()
          )?.sequence || 0;
      return { id: itm.id, jobId: id, sequence, parameter: itm.parameter, desc: itm.desc };
    });

    const checkSheetList = formJob.map((itemData) => {
      const foundData = ChecksheetMasterValue.filter(
        (item) =>
          String(item.jobId) === String(itemData.jobId) &&
          itemData.parameter.toLowerCase().trim() === item.parameter.toLowerCase().trim()
      );
      return processGroupingCheckSheet(
        foundData.length > 0 ? foundData : ChecksheetMasterData,
        itemData,
        foundData.length > 0,
        itemData.jobId
      );
    });

    const sectionForm: Record<string, any> = {};

    ['Working Condition', 'Operation Aspect', 'Machine Support'].forEach((key) => {
      const returnData = checkSheetList
        .map((item) => item[key])
        .filter(Boolean)
        .flat()
        .sort((a, b) => a.sequence - b.sequence);
      if (returnData.length > 0) {
        const sequencesNumb = mJobsSequences.find(
          (item) => item.desc.toLowerCase().trim() === key.toLowerCase().trim()
        )?.sequence;
        const idGen = GenerateUid.Uuid32Bit();
        sectionForm[idGen] = {
          title: key,
          value: idGen,
          sequence: sequencesNumb,
          id: idGen,
          data: returnData,
        };
      }
    });
    const jobIdentity = {
      start_hour: downTimeStartDate
        ? moment(downTimeStartDate).utcOffset('+07:00').format('YYYY-MM-DD HH:mm')
        : '',
      end_hour: downTimeEndDate
        ? moment(downTimeEndDate).utcOffset('+07:00').format('YYYY-MM-DD HH:mm')
        : '',
      latitude: latitude || 0,
      longitude: longitude || 0,
      location: locationDetail || '',
      averageSpeed: averageSpeed || 0,
      excavator_list: excavatorList,
      unit_list: unitList || [],
    };

    bulkDataSyncJobs.push({
      id,
      title: mainJob || 'COIP Mining',
      jobNumber: Number(jobNumber),
      status: Number(status || 0),
      plantArea,
      level: Number(customerLevel) || 0,
      latitude: latitude === null ? 0 : parseFloat(latitude),
      longitude: longitude === null ? 0 : parseFloat(longitude),
      planExecutionDate,
      downTimeStartDate,
      downTimeEndDate,
      job_identity: JSON.stringify(jobIdentity),
      form_job: JSON.stringify(sectionForm),
      customer: JSON.stringify({ id: customer.id, code: customer.code, name: customer.name }),
      createdByName,
      equipmentIdentities: JSON.stringify(equipmentIdentities),
      additionalJobs,
      isSync: true,
      createdAt: createdDate,
      updatedAt: updatedDate,
      createdBy,
    });
    await new Promise((resolve) => setTimeout(resolve, 10)); // Simulate async operation
    updateProgress(setProgress);
  }
};

const dataCoipSetup = async (dataCoip: any) => {
  const totalLength = dataCoip?.checksheetMaster?.length + dataCoip?.checksheetValue?.length;

  return {
    checksheetMaster: dataCoip?.checksheetMaster || [],
    checksheetValue: dataCoip?.checksheetValue || [],
    totalData: totalLength || 0,
  };
};

const mappingCheckheetDataCoip = async (dataJob: any[], setProgress: (value: number) => void) => {
  const checksheetMasterData = [];

  for (let item of dataJob) {
    checksheetMasterData.push({
      ...item,
      jobId: '',
      isSync: false,
      comment: '',
      recommendation: '',
      image: '',
      score: 0,
      configScore: item.score,
      linkVideo: '',
    });
    await new Promise((resolve) => setTimeout(resolve, 10)); // Simulate async operation
    updateProgress(setProgress);
  }

  await bulkInsert(
    schemaDatabase.CheckSheetMaster,
    checksheetMasterData,
    1000,
    Realm.UpdateMode.All
  );
};
const mappingCheckheetJobCoip = async (
  dataJob: CoipDataProp,
  mainJobData: any[],
  setProgress: (value: number) => void,
  jobsData: any[],
  localJobData: any[],
  refreshCompleted: boolean
) => {
  let isNewData = false;
  let bulkDataSyncJobs = [];

  const checkSheetMasterDataFromDB = await readAllDatafromDB<dataCheckSheet[]>(
    schemaDatabase.CheckSheetMaster
  );

  const mjobWithSequence = mainJobData.map((item) => ({
    desc: item.titleMainJob,
    sequence: item.sequence,
    childs: item.childJob,
  }));

  if (localJobData.length === 0 && jobsData.length > 0) {
    isNewData = true;
    await processCollectChecksheet(
      jobsData,
      mjobWithSequence,
      checkSheetMasterDataFromDB,
      dataJob.checksheetValue,
      bulkDataSyncJobs,
      setProgress
    );
  } else if (localJobData.length > 0 && jobsData.length > 0) {
    const dataFiltered = refreshCompleted
      ? jobsData.filter((item) => item.status === '2')
      : jobsData.filter((item) => {
          const localIds = localJobData.filter((item) => item.status === 1).map((item) => item.id);
          return (
            (!localIds.includes(item.id) && item.status === '0') ||
            (item.status === '2' && !localIds.includes(item.id)) ||
            (localIds.includes(item.id) && item.status === '2')
          );
        });

    await processCollectChecksheet(
      dataFiltered,
      mjobWithSequence,
      checkSheetMasterDataFromDB,
      dataJob.checksheetValue,
      bulkDataSyncJobs,
      setProgress
    );
  } else if (localJobData.length > jobsData.length) {
    await deleteSpesificSchema(schemaDatabase.CreateJobsItem);
    if (jobsData.length > 0) {
      isNewData = true;
      await processCollectChecksheet(
        jobsData,
        mjobWithSequence,
        checkSheetMasterDataFromDB,
        dataJob.checksheetValue,
        bulkDataSyncJobs,
        setProgress
      );
    }
  }

  if (bulkDataSyncJobs.length > 0) {
    await bulkInsert(
      schemaDatabase.CreateJobsItem,
      bulkDataSyncJobs,
      1000,
      isNewData ? Realm.UpdateMode.All : Realm.UpdateMode.Modified
    );
  }
};

export const syncronizingCoipDataUtil = async ({
  data,
  dataJob,
  refreshCompleted = false,
  setProgress,
}: ChecksheetDownloadProcessProps) => {
  try {
    const localMasterChecksheet = await readAllDatafromDB<checksheetJobType[]>(
      schemaDatabase.CheckSheetJob
    );
    const localJobData = await readAllDatafromDB<createJobItemType[]>(
      schemaDatabase.CreateJobsItem
    );

    const coipSync = await dataCoipSetup(data);

    totalItem = coipSync.totalData;
    targetProgress = totalItem * 0.1;
    await mappingCheckheetDataCoip(coipSync.checksheetMaster, setProgress);

    await mappingCheckheetJobCoip(
      coipSync,
      localMasterChecksheet,
      setProgress,
      dataJob,
      localJobData,
      refreshCompleted
    );
    count = 0;
    totalItem = 0;
    targetProgress = 0;
  } catch (error) {
    console.log('function download error', error);
    throw error;
  }
};

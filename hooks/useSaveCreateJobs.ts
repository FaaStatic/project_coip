import { useMutation } from '@tanstack/react-query';
import { schemaDatabase } from '@untr/apps-coip/constants/schemaDatabase.constants';
import { checkInputType, dataCheckSheet, jobIdentityType } from '@untr/apps-coip/types/inputCheckSheetType.type';
import { UserTypeSchema } from '@untr/apps-coip/types/user.type';
import { GenerateUid } from '@untr/apps-coip/utils/generateUuid.util';
import { readAllDatafromDB, saveDataToDB } from '@untr/apps-coip/utils/operationStorageDb.util';

type SaveProcessParam = {
  data: any;
  isSync: boolean;
};

export const useSaveCreateJobs = () => {
  const saveProcess = async (param: SaveProcessParam) => {
    try {
      const { data, isSync } = param;
      let dataProcess = data;
      const loginData = await readAllDatafromDB<UserTypeSchema[]>(schemaDatabase.Login);

      const checkSheetMaster = await readAllDatafromDB<dataCheckSheet[]>(
        schemaDatabase.CheckSheetMaster
      );
      let jobIdentityTemp: jobIdentityType = {};
      let sectionForm: checkInputType = {};

      for (let itemDetail of dataProcess.dataForm) {
        const mapChildForm = itemDetail.dataChild.map((itemChild) => {
          const dataCheckSheet = checkSheetMaster
            .filter(
              (itemParam) =>
                String(itemDetail.title).toLowerCase().trim() ===
                String(itemParam.parameter).toLowerCase().trim()
            )
            .filter(
              (item) =>
                String(item?.assessmentArea).toLowerCase().trim() ===
                itemChild?.desc?.toLowerCase().trim()
            )
            .sort((itemA, itemB) => {
              const a = Number(itemA.sequence);
              const b = Number(itemB.sequence);
              return a - b;
            })
            .map((item) => {
              let { jobId, score, configScore, ...refreshData } = item;
              const guidGen = GenerateUid.Uuid32Bit();
              jobId = dataProcess.assignment_id;
              const param = {
                ...refreshData,
                id: guidGen,
                jobId,
                comment: '',
                recommendation: '',
                image: '',
                configScore: configScore,
                score: score,
              };

              return param;
            });

          return {
            id: itemChild.id,
            jobId: itemChild.jobId,
            desc: itemChild.desc,
            data: dataCheckSheet,
          };
        });

        sectionForm = {
          ...sectionForm,
          [itemDetail.id]: {
            id: itemDetail.id,
            title: itemDetail.title,
            value: itemDetail.id,
            sequence: itemDetail.sequence,
            data: mapChildForm,
          },
        };
      }

      const genExcavatorList = GenerateUid.Uuid32Bit();
      jobIdentityTemp = {
        ...jobIdentityTemp,
        start_hour: '',
        end_hour: '',
        location: '',
        latitude: 0,
        longitude: 0,
        averageSpeed: 0,
        excavator_list: [
          {
            id: genExcavatorList,
            jobId: dataProcess.assignment_id,
            open: false,
            equipmentId: '',
            operatorName: '',
            isExcavator: true,
            equipment: {
              id: '',
              type: '',
              unitModel: `New Form Excavator`,
              serialNumber: '',
              unitCode: '-',
              smr: 0,
              isProductUT: true,
            },
          },
        ],
        unit_list: [],
      };

      const customerData = {
        id: dataProcess.idCustomer,
        code: dataProcess.customerCode,
        name: dataProcess.customer,
      };

      await saveDataToDB(schemaDatabase.CreateJobsItem, {
        id: dataProcess.assignment_id,
        title: dataProcess.title,
        jobNumber: Number(dataProcess.numberJob),
        status: Number(dataProcess.status),
        plantArea: dataProcess.plantArea,
        level: 0,
        latitude: 0.0,
        longitude: 0.0,
        planExecutionDate: dataProcess.date,
        downTimeStartDate: null,
        downTimeEndDate: null,
        customer: JSON.stringify(customerData),
        equipmentIdentities: '',
        additionalJobs: dataProcess.dataJob,
        job_identity: JSON.stringify(jobIdentityTemp),
        form_job: JSON.stringify(sectionForm),
        createdByName: dataProcess.createdByName,
        createdAt: new Date(),
        updatedAt: new Date(),
        isSync: isSync,
        createdBy: loginData[0]?.email,
      });

      return {
        isSuccess: true,
        data: dataProcess,
      };
    } catch (error) {
      console.log(error);
      return {
        isSuccess: false,
        data: null,
      };
    }
  };

  return useMutation({
    mutationKey: ['saveJobToLocal'],
    mutationFn: (param: SaveProcessParam) => saveProcess(param),
    gcTime: 500,
    networkMode: 'always',
  });
};

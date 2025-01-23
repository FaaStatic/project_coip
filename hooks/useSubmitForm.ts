import { useMutation } from '@tanstack/react-query';
import moment from 'moment';
import { UpdateJobCommand } from '@untr/apps-coip/api/jobCreation';
import { CreateCoipFormCommand } from '@untr/apps-coip/api/msCoip';
import { checkSheetInputTypeSchema, inputChecksheetSchema } from '@untr/apps-coip/types/inputCheckSheetType.type';

export type SubmitProcessParam = {
  data: any;
  isSync?: boolean;
  assignId?: string;
  index: number;
};

export const useSubmitForm = () => {
  const SubmitJobUtil = async (itemData: SubmitProcessParam) => {
    const { data, assignId, index } = itemData;

    try {
      inputChecksheetSchema.parse(data);
      let dataTemp = data['job_identity'];
      let equipmentIdentities: any = [];
      const excavatorList: any = dataTemp.excavator_list;
      const unitList: any = dataTemp.unit_list;
      equipmentIdentities = [...excavatorList, ...unitList];
      equipmentIdentities = equipmentIdentities.map((item) => {
        item.equipment.serialNumber =
          item.equipment.serialNumber === '-' ? null : item.equipment.serialNumber;
        return item;
      });

      const dataSubmit: UpdateJobCommand = {
        id: assignId as string,
        latitude: String(dataTemp.latitude),
        longitude: String(dataTemp.longitude),
        averageSpeed: Number(dataTemp.averageSpeed),
        locationDetail: dataTemp.location,
        downTimeStartDate: moment(dataTemp.start_hour, 'YYYY-MM-DD HH:mm').toDate().toISOString(),
        downTimeEndDate: moment(dataTemp.end_hour, 'YYYY-MM-DD HH:mm').toDate().toISOString(),
        equipmentIdentities: equipmentIdentities,
      };

      const keyEquipment = Object.keys(data).filter((key) => key !== 'job_identity');

      let dataCheckSheet = [];
      keyEquipment.map((key) => {
        checkSheetInputTypeSchema.parse(data[key]);
        data[key].data.map((item) => {
          item.data.map((item) => {
            const addForm = {
              id: item.id,
              jobId: item.jobId,
              sector: item.sector,
              parameter: item.parameter,
              assessmentArea: item.assessmentArea,
              unitApplication: item.unitApplication,
              klausul: item.klausul,
              description: item.description,
              operationStandard: item.operationStandard,
              guidance: item.guidance,
              score: [item.score],
              weight: item.weight,
              comment: item.comment || '',
              attachment: item.image || '',
              recommendation: item.recommendation || '',
              sequence: item.sequence,
            };
            dataCheckSheet.push(addForm);
          });
        });
      });
      let param: CreateCoipFormCommand = {
        status: '2',
        checksheetValues: dataCheckSheet,
      };

      return { submitJob: dataSubmit, submitForm: param, dataTemp: dataTemp };
    } catch (error) {
      const validationErr = error.errors.map((item) => {
        const path = item.path.join('.');
        return {
          type: 'manual',
          name: path,
          message: item.message,
        };
      });

      throw {
        message: 'An error occurred!',
        err: validationErr,
        index: index,
      };
    }
  };

  return useMutation({
    mutationKey: ['submitProcessJobs'],
    mutationFn: (itemData: SubmitProcessParam) => SubmitJobUtil(itemData),
    gcTime: 500,
    networkMode: 'online',
  });
};

import { useQuery } from '@tanstack/react-query';

import { readAllDatafromDB } from '@untr/apps-coip/utils/operationStorageDb.util';
import { schemaDatabase } from '@untr/apps-coip/constants/schemaDatabase.constants';
import { EquipmentScheme } from '@untr/apps-coip/types/equipmentModel.type';

const getUnitCodeList = async (queryKey) => {
  try {
    const [_, serialNumber] = queryKey;
    if (serialNumber !== '') {
      const result = await readAllDatafromDB<EquipmentScheme[]>(schemaDatabase.Equipment);
      return (
        Array.from(
          new Map(
            result
              .filter((item) => item.isProductUT === true)
              .filter((item) => item.unitModel === serialNumber)
              .filter((item) => item.unitCode !== null && item.unitCode !== undefined)
              .map((item) => [
                item.id,
                {
                  id: item.id,
                  title: item.unitCode,
                  serialNumber: item.serialNumber,
                  smr: item.smr,
                },
              ])
          ).values()
        ) || []
      );
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const useGetSpesificUnitCode = (serialNumber: string = '') => {
  return useQuery({
    queryKey: ['getUnitCodeList', serialNumber],
    queryFn: ({ queryKey }) => getUnitCodeList(queryKey),
    refetchOnMount: false,
    enabled: serialNumber !== '' ? true : false,
    staleTime: Infinity,
    networkMode: 'always',
  });
};

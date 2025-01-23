import { useInfiniteQuery } from '@tanstack/react-query';
import { readAllDatafromDB } from '@untr/apps-coip/utils/operationStorageDb.util';
import { schemaDatabase } from '@untr/apps-coip/constants/schemaDatabase.constants';
import { LIST_SIZE } from '@untr/apps-coip/constants/dummyData.constants';
import { EquipmentScheme } from '@untr/apps-coip/types/equipmentModel.type';

const getEquipmentDataExcavator = async (start, limit, queryKey) => {
  const [_, searchExcavator, type] = queryKey;
  try {
    const result = await readAllDatafromDB<EquipmentScheme[]>(schemaDatabase.Equipment);
    let equipmentExa = result
      .filter((item) => item.isProductUT === true)
      .filter((item) =>
        type === 0 ? String(item.unitModel).includes('PC') : !String(item.unitModel).includes('PC')
      )
      .reduce((acc, item, _) => {
        if (!acc.some((existingItem) => existingItem.unitModel === item.unitModel)) {
          const param = {
            id: item.id,
            unitModel: item.unitModel,
          };
          acc.push(param);
        }
        return acc;
      }, []);

    if (searchExcavator !== '') {
      equipmentExa = equipmentExa
        .filter((item) =>
          String(item.unitModel).toLowerCase().includes(String(searchExcavator).toLowerCase())
        )
        .map((item) => ({
          id: item.id,
          unitModel: item.unitModel,
        }));
    }
    const limitLength = start + limit;
    const compareLength = equipmentExa.length - limitLength;
    if (equipmentExa.length < 10) {
      return equipmentExa;
    } else {
      if (equipmentExa.length >= 10 || compareLength > limitLength) {
        return equipmentExa.slice(start, limitLength);
      } else {
        return equipmentExa.slice(start, start + compareLength + 1);
      }
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const useGetAllEquipmentExcavator = (searchExcavator = '', type = 0) => {
  return useInfiniteQuery({
    queryKey: ['getEquipmentExa', searchExcavator, type],
    queryFn: ({ pageParam = 0, queryKey }) =>
      getEquipmentDataExcavator(pageParam * LIST_SIZE, LIST_SIZE, queryKey),
    initialPageParam: 0,
    refetchOnMount: false,
    staleTime: Infinity,
    networkMode: 'always',
    getNextPageParam: (lastPage, _pages, lastPageParam, _allPages) => {
      if (lastPage.length === 0 || lastPage.length < 10) {
        return undefined;
      }
      return lastPageParam + 1;
    },
  });
};

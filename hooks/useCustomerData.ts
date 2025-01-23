import { useQuery } from '@tanstack/react-query';
import { readSingleDatafromDB } from '@untr/apps-coip/utils/operationStorageDb.util';
import { schemaDatabase } from '@untr/apps-coip/constants/schemaDatabase.constants';

export const useCustomerData = () => {
  const getCustomerData = async () => {
    try {
      return (await readSingleDatafromDB(schemaDatabase.Customer)) || null;
    } catch (error) {
      return null;
    }
  };

  return useQuery({
    queryKey: ['getCustomerData'],
    queryFn: getCustomerData,
    networkMode: 'always',
  });
};

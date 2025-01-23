import { useQuery } from '@tanstack/react-query';
import { schemaDatabase } from '@untr/apps-coip/constants/schemaDatabase.constants';
import { readAllDataWithFilter } from '@untr/apps-coip/utils/operationStorageDb.util';

export const useActiveCustomer = () => {
  const getCustomer = async () => {
    try {
      const result = (
        await readAllDataWithFilter(schemaDatabase.CustomerList, 'isActive = true')
      ).at(0);
      const countUserChoices = await readAllDataWithFilter(
        schemaDatabase.CustomerList,
        'isChoose = true'
      );

      const param = {
        activeCustomer: result,
        countCustomer: countUserChoices.length,
      };
      return param || null;
    } catch (error) {
      return null;
    }
  };

  return useQuery({
    queryKey: ['getLocalCustomerActive'],
    queryFn: getCustomer,
    networkMode: 'always',
  });
};

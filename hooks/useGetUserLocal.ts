import { useQuery } from '@tanstack/react-query';
import { readSingleDatafromDB } from '@untr/apps-coip/utils/operationStorageDb.util';
import { schemaDatabase } from '@untr/apps-coip/constants/schemaDatabase.constants';
import { UserTypeSchema } from '@untr/apps-coip/types/user.type';

export const useGetUserLocal = () => {
  const getLoginData = async () => {
    try {
      const result: UserTypeSchema = await readSingleDatafromDB(schemaDatabase.Login);
      return result || null;
    } catch (error) {
      return null;
    }
  };

  return useQuery({
    queryKey: ['getLocalToken'],
    queryFn: getLoginData,
    networkMode: 'always',
  });
};

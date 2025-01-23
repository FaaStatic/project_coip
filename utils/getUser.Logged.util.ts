import { readAllDatafromDB } from '@untr/apps-coip/utils/operationStorageDb.util';
import { schemaDatabase } from '@untr/apps-coip/constants/schemaDatabase.constants';
import { UserTypeSchema } from '@untr/apps-coip/types/user.type';

export const GetUserLogged = async () => {
  try {
    const loginData = await readAllDatafromDB<UserTypeSchema[]>(schemaDatabase.Login);
    return loginData[0] || null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

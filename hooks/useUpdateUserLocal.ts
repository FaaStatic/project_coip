import { useMutation } from '@tanstack/react-query';
import { schemaDatabase } from '@untr/apps-coip/constants/schemaDatabase.constants';
import Realm from 'realm';
import { updateData, saveDataToDB } from '@untr/apps-coip/utils/operationStorageDb.util';

const updateProcess = async (id: any, data: any) => {
  try {
    await updateData(schemaDatabase.Login, id, data, 'id');
    await saveDataToDB(schemaDatabase.FirstInstall, {
      id: new Realm.BSON.ObjectID(),
      isFirst: true,
    });
    return true;
  } catch (error) {
    return false;
  }
};

const useUpdateUserLocal = () => {
  return useMutation({
    mutationKey: ['keyUpdateLoginProcess'],
    mutationFn: (data: any) => updateProcess(data.id, data.data),
    networkMode: 'always',
  });
};

export default useUpdateUserLocal;

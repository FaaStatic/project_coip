import { schemaDatabase } from '@untr/apps-coip/constants/schemaDatabase.constants';
import Realm from 'realm';
import { customerListType } from '@untr/apps-coip/types/CustomerList.type';
import { bulkInsert, readAllDataWithFilter, updateData } from './operationStorageDb.util';

const createCustomerListDB = async (userList: any, setProgress: (data: number) => void) => {
  try {
    let count = 0;

    const dataItem = userList.data;
    const lengthUser = dataItem.length;
    const mainListDataBulk: customerListType[] = [];
    for (let item of dataItem) {
      const user: customerListType = {
        id: item.id,
        userName: item.attributes.name,
        userCode: item.attributes.code,
        isChoose: false,
        isActive: false,
      };
      mainListDataBulk.push(user);
      count += 1;
      await new Promise((resolve) => setTimeout(resolve, 10)); // Simulate async operation
      setProgress(Math.round(((count + 1) / lengthUser) * 100));
    }

    await bulkInsert(schemaDatabase.CustomerList, mainListDataBulk, 1000, Realm.UpdateMode.All);
    return true;
  } catch (error) {
    console.log('Error', error);
    return false;
  }
};

const addRemoveCustomerList = async (id: string, isRemove: boolean) => {
  try {
    const userList = (await readAllDataWithFilter(schemaDatabase.CustomerList, `id = "${id}"`)).at(
      0
    );

    const param = isRemove ? { isChoose: false } : { isChoose: true };
    if (!isRemove) {
      const userChoose = await readAllDataWithFilter(
        schemaDatabase.CustomerList,
        `isChoose = true`
      );
      if (userChoose.length < 5) {
        await updateData(schemaDatabase.CustomerList, userList.id as string, param, 'id');
        return true;
      } else {
        return false;
      }
    } else {
      await updateData(schemaDatabase.CustomerList, userList.id as string, param, 'id');
      return true;
    }
  } catch (error) {
    console.log('Error', error);
    return false;
  }
};

export { addRemoveCustomerList, createCustomerListDB };

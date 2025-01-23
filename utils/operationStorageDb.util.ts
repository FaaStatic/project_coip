import { schemaConfig } from '@untr/apps-coip/configs/configSchema.config';
import Realm from 'realm';
import { schemaDatabase } from '@untr/apps-coip/constants/schemaDatabase.constants';

const openRealm = async () => {
  try {
    return await Realm.open(schemaConfig);
  } catch (error) {
    console.error('Error opening Realm:', error);
    throw error; // Rethrow to handle in calling function
  }
};

const closeRealm = (realm) => {
  try {
    if (!realm.isClosed) {
      realm.close();
    }
  } catch (error) {
    console.error('Error closed Realm:', error);
    throw error; // Rethrow to handle in calling function
  }
};

const saveDataToDB = async (typeSchema: schemaDatabase, dataInput: {}) => {
  const realm = await openRealm();

  try {
    realm.write(() => {
      realm.create(typeSchema, dataInput, Realm.UpdateMode.Modified);
    });
  } catch (error) {
    console.log('error from realm', typeSchema, dataInput);
    console.log(error);
  } finally {
    closeRealm(realm);
  }
};

const readFilteredFromDB = async (
  typeSchema: schemaDatabase,
  filteredProperty: string,
  valueComparison: any
) => {
  const realm = await openRealm();
  try {
    return realm.objects(typeSchema).filtered(`${filteredProperty} > $0`, valueComparison).toJSON();
  } catch (error) {
    console.log(error);
  }
};

const readAllDatafromDB = async <T>(typeSchema: schemaDatabase): Promise<T> => {
  const realm = await openRealm();
  try {
    return realm.objects(typeSchema).toJSON() as T;
  } catch (error) {
    console.log(error);
  }
};

const readSpesificDatafromDB = async <T>(
  typeSchema: schemaDatabase,
  id: string | number,
  property: string
): Promise<T> => {
  const realm = await openRealm();
  try {
    return realm.objects(typeSchema).filtered(`${property} = $0`, id).toJSON() as T;
  } catch (error) {
    console.log(error);
  }
};

const deleteData = async (typeSchema: schemaDatabase, id: string | number) => {
  const realm = await openRealm();
  try {
    realm.write(() => {
      const toDelete = realm.objects(typeSchema).filtered('id == $0', id);
      realm.delete(toDelete);
    });
    if (!realm.isClosed) {
      realm.close();
    }
  } catch (error) {
    console.log(error);
  } finally {
    closeRealm(realm);
  }
};
const deleteSchema = async () => {
  const realm = await openRealm();
  try {
    realm.write(() => {
      realm.deleteAll();
    });
  } catch (error) {
    console.log(error);
  } finally {
    closeRealm(realm);
  }
};
const deleteSpesificSchema = async (typeSchema: schemaDatabase) => {
  const realm = await openRealm();
  try {
    realm.write(() => {
      const toDelete = realm.objects(typeSchema);
      realm.delete(toDelete);
    });
  } catch (error) {
    console.log(error);
  } finally {
    closeRealm(realm);
  }
};

const updateData = async (
  typeSchema: schemaDatabase,
  id: string | number,
  dataInput: any,
  property: string
) => {
  const realm = await openRealm();
  try {
    realm.write(() => {
      const toUpdate = realm.objects(typeSchema).filtered(`${property} == $0`, id);
      for (let item of toUpdate) {
        Object.keys(dataInput).map((key) => {
          item[key] = dataInput[key];
        });
      }
    });
  } catch (error) {
    console.log(error, id, dataInput);
  } finally {
    closeRealm(realm);
  }
};

const deleteSpecificByCondition = async (
  typeSchema: schemaDatabase,
  condition: string,
  dataCompare: any
) => {
  const realm = await openRealm();
  try {
    realm.write(() => {
      const objectDelete = realm.objects(typeSchema).filtered(condition, dataCompare);
      realm.delete(objectDelete);
    });
  } catch (err) {
    console.log(err);
  } finally {
    closeRealm(realm);
  }
};

const bulkInsert = async (
  typeSchema: string,
  dataInput: Array<{}>,
  chunkSize: number = 1000,
  updateMode: Realm.UpdateMode
) => {
  const realm = await openRealm();
  try {
    const chunkArray = (array: Array<{}>, size: number) => {
      const chunked = [];
      for (let i = 0; i < array.length; i += size) {
        chunked.push(array.slice(i, i + size));
      }
      return chunked;
    };

    const chunks = chunkArray(dataInput, chunkSize);

    chunks.forEach((chunk) => {
      realm.write(() => {
        chunk.forEach((data) => {
          realm.create(typeSchema, data, updateMode);
        });
      });
    });
  } catch (error) {
    console.log('Error from Realm during bulk insert', typeSchema, dataInput);
    console.log(error);
  } finally {
    closeRealm(realm);
  }
};

const readAllDataWithFilter = async (typeSchema: schemaDatabase, filters: string) => {
  const realm = await openRealm();
  try {
    return realm.objects(typeSchema).filtered(filters).toJSON();
  } catch (error) {
    console.log(error);
  }
};

const readSingleDatafromDB = async (typeSchema: schemaDatabase) => {
  const realm = await openRealm();
  try {
    const result = realm.objects(typeSchema)[0]; // Get the first filtered item
    return result ? result.toJSON() : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export {
  saveDataToDB,
  updateData,
  deleteData,
  readAllDatafromDB,
  readSpesificDatafromDB,
  deleteSchema,
  bulkInsert,
  readAllDataWithFilter,
  readSingleDatafromDB,
  readFilteredFromDB,
  deleteSpesificSchema,
  deleteSpecificByCondition,
};

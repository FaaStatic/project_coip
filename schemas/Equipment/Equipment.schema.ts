import Realm, { ObjectSchema } from 'realm';

class Equipment extends Realm.Object<Equipment> {
  static schema: ObjectSchema = {
    name: 'Equipment',
    properties: {
      id: 'string?',
      type: 'string?',
      unitModel: 'string?',
      serialNumber: 'string?',
      isProductUT: { type: 'bool', default: true },
      unitCode: 'string?',
      smr: 'int?',
      createdDate: 'string?',
      updatedDate: 'string?',
    },
  };
  id?: string;
  type?: string;
  unitModel?: string;
  serialNumber?: string;
  unitCode?: string;
  smr?: number;
  createdDate?: string;
  IsProductUT?: boolean;
  updatedDate?: string;
}

export default Equipment;

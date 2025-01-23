import Realm, { ObjectSchema } from 'realm';

class Customer extends Realm.Object<Customer> {
  static schema: ObjectSchema = {
    name: 'Customer',
    primaryKey: 'id',
    properties: {
      id: 'string?',
      code: 'string?',
      name: 'string?',
      type: 'string?',
      createdBy: 'string?',
      createdDate: 'string?',
      updatedBy: 'string?',
      updatedDate: 'string?',
      isActive: 'bool?',
    },
  };
  id?: string;
  code?: string;
  name?: string;
  type?: string;
  createdBy: string;
  createdDate: string;
  updatedBy: string;
  updatedDate: string;
  isActive: boolean;
}

export default Customer;

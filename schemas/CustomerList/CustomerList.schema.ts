import Realm, { ObjectSchema } from 'realm';

class CustomerList extends Realm.Object<CustomerList> {
  static schema: ObjectSchema = {
    name: 'CustomerList',
    primaryKey: 'id',
    properties: {
      id: 'string',
      userName: 'string?',
      userCode: 'string?',
      isChoose: 'bool?',
      isActive: 'bool?',
    },
  };
  id?: string;
  userName?: string;
  userCode?: string;
  isChoose?: boolean;
  isActive?: boolean;
}

export default CustomerList;

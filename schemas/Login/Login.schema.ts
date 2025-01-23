import { ObjectSchema, Realm } from 'realm';

class Login extends Realm.Object<Login> {
  static schema: ObjectSchema = {
    name: 'Login',
    primaryKey: 'id',
    properties: {
      id: 'objectId',
      key_api: 'string?',
      firstname: 'string?',
      lastname: 'string?',
      typeKey: 'string?',
      position: 'string?',
      isInternal: 'bool?',
      level: 'int?',
      email: 'string?',
      photo: 'string?',
      branchSupportArea: 'string?',
      contactNumber: 'string?',
      customerCode: 'string?',
      expiresIn: 'int?',
      refreshToken: 'string?',
    },
  };
  id: Realm.BSON.ObjectId;
  firstname?: string;
  lastname?: string;
  position?: string;
  photo?: string;
  level?: number;
  email?: string;
  isInternal?: boolean;
  key_api?: string;
  typeKey?: string;
  branchSupportArea?: string;
  contactNumber?: string;
  customerCode?: string;
  expiresIn?: number;
  refreshToken?: string;
}

export default Login;

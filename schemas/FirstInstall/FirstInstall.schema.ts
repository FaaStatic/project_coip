import Realm, { ObjectSchema } from 'realm';

class FirstInstall extends Realm.Object<FirstInstall> {
  static schema: ObjectSchema = {
    name: 'FirstInstall',
    primaryKey: 'id',
    properties: {
      id: 'objectId',
      isFirst: { type: 'bool', default: true },
    },
  };
  id?: Realm.BSON.ObjectId;
  isFirst?: boolean;
}

export default FirstInstall;

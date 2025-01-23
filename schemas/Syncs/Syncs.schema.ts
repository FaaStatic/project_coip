import Realm, { ObjectSchema } from 'realm';

class Syncs extends Realm.Object<Syncs> {
  static schema: ObjectSchema = {
    name: 'Syncs',
    primaryKey: 'id',
    properties: {
      id: 'objectId',
      dateSync: 'string?',
    },
  };
  id?: Realm.BSON.ObjectId;
  dateSync?: string;
}

export default Syncs;

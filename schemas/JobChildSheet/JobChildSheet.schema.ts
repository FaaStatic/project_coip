import Realm, { ObjectSchema } from 'realm';

class JobChildSheet extends Realm.Object<JobChildSheet> {
  id?: string;
  type?: string;
  jobType?: string;
  desc?: string;
  createdDate?: string;
  updatedDate?: string;
  isActive?: boolean;
  sequence?: number;

  static schema: ObjectSchema = {
    name: 'JobChildSheet',
    primaryKey: 'id',
    properties: {
      id: 'string?',
      type: 'string?',
      jobType: 'string?',
      sequence: 'int?',
      desc: 'string?',
      createdDate: 'string?',
      updatedDate: 'string?',
      isActive: 'bool?',
    },
  };
}

export default JobChildSheet;

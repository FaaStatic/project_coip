import Realm, { ObjectSchema } from 'realm';

class AdditionalJobs extends Realm.Object<AdditionalJobs> {
  static schema: ObjectSchema = {
    name: 'AdditionalJobs',
    primaryKey: 'id',
    properties: {
      id: 'string?',
      jobId: 'string?',
      desc: 'string?',
      parameter: 'string?',
    },
  };
  id?: string;
  jobId?: string;
  desc?: string;
  parameter?: string;
}

export default AdditionalJobs;

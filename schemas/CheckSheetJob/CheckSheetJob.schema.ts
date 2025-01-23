import Realm, { ObjectSchema } from 'realm';
import JobChildSheet from '@untr/apps-coip/schemas/JobChildSheet/JobChildSheet.schema';

class CheckSheetJob extends Realm.Object<CheckSheetJob> {
  static schema: ObjectSchema = {
    name: 'CheckSheetJob',
    primaryKey: 'id',
    properties: {
      id: 'string?',
      typeData: 'string?',
      jobType: 'string?',
      titleMainJob: 'string?',
      childJob: 'JobChildSheet[]',
      isActive: 'bool?',
      sequence: 'int?',
      updatedDate: 'string?',
      createdDate: 'string?',
    },
  };
  id?: string;
  typeData?: string;
  jobType?: string;
  sequence?: number;
  titleMainJob?: string;
  createdDate?: string;
  updatedDate?: string;
  isActive?: boolean;
  childJob?: Realm.List<JobChildSheet>;
}

export default CheckSheetJob;

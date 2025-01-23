import { ObjectSchema, Realm } from 'realm';
import AdditionalJobs from '@untr/apps-coip/schemas/AdditionalJobs/AdditionalJobs.schema';

class CreateJobsItem extends Realm.Object<CreateJobsItem> {
  static schema: ObjectSchema = {
    name: 'CreateJobsItem',
    primaryKey: 'id',
    properties: {
      id: 'string?',
      jobNumber: 'int?',
      status: 'int?',
      plantArea: 'string?',
      latitude: 'double?',
      longitude: 'double?',
      title: 'string?',
      level: 'int?',
      isSync: 'bool?',
      planExecutionDate: 'string?',
      downTimeStartDate: 'string?',
      downTimeEndDate: 'string?',
      customer: 'string?',
      equipmentIdentities: 'string',
      additionalJobs: 'AdditionalJobs[]',
      job_identity: 'string?',
      form_job: 'string',
      createdByName: 'string?',
      createdBy: 'string?',
      createdAt: 'date?',
      updatedAt: 'date?',
    },
  };
  id: string;
  jobNumber?: number;
  status?: number;
  plantArea: string;
  latitude: number;
  title: string;
  level?: number;
  longitude: number;
  planExecutionDate: string;
  downTimeStartDate: string;
  downTimeEndDate: string;
  isSync?: boolean;
  customer?: string;
  equipmentIdentities?: string;
  additionalJobs?: Realm.List<AdditionalJobs>;
  job_identity?: string;
  form_job?: string;
  createdBy?: string;
  createdByName?: string;
  createdAt: Date;
  updatedAt: Date;
}

export default CreateJobsItem;

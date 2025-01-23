import Realm, { ObjectSchema } from 'realm';

class CheckSheetMaster extends Realm.Object<CheckSheetMaster> {
  static schema: ObjectSchema = {
    name: 'CheckSheetMaster',
    primaryKey: 'id',
    properties: {
      id: 'string?',
      job: { type: 'string', default: '' },
      sector: 'string?',
      parameter: 'string?',
      assessmentArea: 'string?',
      unitApplication: 'string?',
      klausul: 'string?',
      description: 'string?',
      operationStandard: 'string?[]',
      guidance: 'string?[]',
      configScore: 'int?[]',
      score: { type: 'int', default: 0 },
      weight: 'double?',
      sequence: 'int?',
      measurement: 'string?',
      isSync: { type: 'bool', default: false },
      comment: { type: 'string', default: '' },
      recommendation: { type: 'string', default: '' },
      image: { type: 'string', default: '' },
      linkVideo: { type: 'string', default: '' },
    },
  };
  id: string;
  jobId?: string;
  sector?: string;
  parameter?: string;
  assessmentArea?: string;
  unitApplication?: string;
  klausul?: string;
  description?: string;
  operationStandard?: Realm.List<string>;
  guidance?: Realm.List<string>;
  configScore?: Realm.List<Number>;
  score?: number;
  weight?: number;
  sequence?: number;
  measurement?: string;
  comment?: string;
  recommendation?: string;
  isSync?: boolean;
  image?: string;
  linkVideo?: string;
}

export default CheckSheetMaster;

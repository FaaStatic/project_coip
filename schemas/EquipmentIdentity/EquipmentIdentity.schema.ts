import Realm, { ObjectSchema } from 'realm';
import Equipment from '../Equipment/Equipment.schema';

class EquipmentIdentity extends Realm.Object<EquipmentIdentity> {
  static schema: ObjectSchema = {
    name: 'EquipmentIdentity',
    primaryKey: 'id',
    properties: {
      id: 'string?',
      jobId: 'string?',
      equipmentId: 'string?',
      isProductUT: 'bool?',
      operatorName: 'string?',
      equipment: 'Equipment',
    },
  };
  id: string;
  equipmentId?: string;
  jobId?: string;
  isProductUT?: boolean;
  operatorName?: string;
  equipment: Equipment;
}

export default EquipmentIdentity;

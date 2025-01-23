import { encryptionKey } from '@untr/apps-coip/constants/encryptConstant.constants';
import schemas from '@untr/apps-coip/schemas';

const schemaVersion = 3;

export const schemaConfig: Realm.Configuration = {
  schema: Object.values(schemas),
  schemaVersion,
  path: 'db-coip-9.realm',
  shouldCompact: (totalSize: number, usedSize: number) => {
    return usedSize / totalSize >= 0.5;
  },
  deleteRealmIfMigrationNeeded: true,
  encryptionKey: encryptionKey,
};

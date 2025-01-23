import { useMutation } from '@tanstack/react-query';
import { deleteSchema } from '@untr/apps-coip/utils/operationStorageDb.util';

export const useLogoutApp = () => {
  const deleteProcess = async () => {
    await deleteSchema();
  };
  return useMutation({
    mutationKey: ['logoutApp'],
    networkMode: 'always',
    mutationFn: () => deleteProcess(),
  });
};

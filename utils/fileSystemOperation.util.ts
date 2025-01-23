import * as FileSystem from 'expo-file-system';

export const deleteOperation = async (path: string) => {
  await FileSystem.deleteAsync(path);
  return true;
};

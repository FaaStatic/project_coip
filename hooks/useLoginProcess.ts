import { useMutation } from '@tanstack/react-query';
import { axiosConfig } from '@untr/apps-coip/configs/apiManager.config';
import { schemaDatabase } from '@untr/apps-coip/constants/schemaDatabase.constants';
import Realm from 'realm';
import { UserTypeSchema } from '@untr/apps-coip/types/user.type';
import { UserInfoTokenDto } from '@untr/apps-coip/api/loginApp';
import { saveDataToDB } from '@untr/apps-coip/utils/operationStorageDb.util';

const loginProcess = async (data: UserInfoTokenDto) => {
  try {
    const param: UserTypeSchema = {
      id: new Realm.BSON.ObjectID(),
      key_api: data?.tokenResponse?.accessToken,
      firstname: data?.firstName,
      lastname: data?.lastName,
      typeKey: data?.tokenResponse?.tokenType,
      email: data?.email,
      level: data?.roleLevel,
      photo: data?.imagePath,
      branchSupportArea: data?.branchSupportArea,
      contactNumber: data?.contactNumber,
      customerCode: data?.customerCode,
      expiresIn: data?.tokenResponse?.expiresIn,
      refreshToken: data?.tokenResponse?.refreshToken,
      isInternal: data?.customerCode ? false : true,
    };
    axiosConfig.headers.Authorization = `${data.tokenResponse.tokenType} ${data.tokenResponse.accessToken}`;

    await saveDataToDB(schemaDatabase.Login, param);
    await saveDataToDB(schemaDatabase.FirstInstall, {
      id: new Realm.BSON.ObjectID(),
      isFirst: true,
    });
    return true;
  } catch (error) {
    return false;
  }
};

const useLoginProcess = () => {
  return useMutation({
    mutationKey: ['keyLoginProcess'],
    mutationFn: (data: UserInfoTokenDto) => loginProcess(data),
    networkMode: 'online',
  });
};

export default useLoginProcess;

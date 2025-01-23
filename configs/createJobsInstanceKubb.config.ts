import { RequestConfig, ResponseConfig } from '@kubb/swagger-client/client';
import ApiManager from '@untr/apps-coip/configs/apiManager.config';
import { AxiosError } from 'axios';
import { envData } from '@untr/apps-coip/constants/envData.constants';

const uriBase = envData.BASE_URL;
const basePath = '/fas/msjobcreation';

export const createJobsInstanceKubb = async <TData, TError = unknown, TVariables = unknown>(
  config: RequestConfig<TVariables>
): Promise<ResponseConfig<TData>> => {
  return ApiManager.request<TVariables, ResponseConfig<TData>>({
    ...config,
    baseURL: `${uriBase}${basePath}`,
  }).catch((e: AxiosError<TError>) => {
    throw e;
  });
};

export default createJobsInstanceKubb;

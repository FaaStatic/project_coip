import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosStatic,
  InternalAxiosRequestConfig,
} from 'axios';
import qs from 'qs';
import { envData } from '@untr/apps-coip/constants/envData.constants';
import { GetUserLogged } from '@untr/apps-coip/utils/getUser.Logged.util';

const cancelTokenSource = axios.CancelToken.source();

export const axiosConfig: AxiosRequestConfig = {
  baseURL: envData.BASE_URL,
  timeout: 30000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': envData.APIM_KEY,
  },
  paramsSerializer: {
    indexes: null,
    serialize: (param: any) => qs.stringify(param, { allowDots: true, arrayFormat: 'repeat' }),
  },
};

const ApiManager: AxiosInstance = axios.create(axiosConfig);

declare module 'axios' {
  interface AxiosDefaults {
    interceptors?: {
      request: {
        onFulfilled?: Parameters<AxiosInstance['interceptors']['request']['use']>[0];
        onRejected?: Parameters<AxiosInstance['interceptors']['request']['use']>[1];
      };
      response: {
        onFulfilled?: Parameters<AxiosInstance['interceptors']['response']['use']>[0];
        onRejected?: Parameters<AxiosInstance['interceptors']['response']['use']>[1];
      };
    };
  }
}

const _createAxios = (ApiManager as AxiosStatic).create.bind(axios);

(ApiManager as AxiosStatic).create = function create(conf) {
  const instance = _createAxios(conf);
  const defaultIcs = ApiManager.defaults.interceptors;

  const reqInterceptor = defaultIcs?.request ? defaultIcs.request : false;
  const resInterceptor = defaultIcs?.response ? defaultIcs.response : false;

  if (reqInterceptor) {
    instance.interceptors.request.use(reqInterceptor.onFulfilled, reqInterceptor.onRejected);
  }
  if (resInterceptor) {
    instance.interceptors.response.use(resInterceptor.onFulfilled, resInterceptor.onRejected);
  }
  return instance;
};

const requestFulfilled = async (config: InternalAxiosRequestConfig) => {
  const auth = await GetUserLogged();
  if (auth !== null) {
    config.headers['Authorization'] = `Bearer ${auth.key_api}`;
  }

  config.cancelToken = cancelTokenSource.token;

  return config;
};
const requestRejected = (err: AxiosError) => {
  return Promise.reject(err);
};

const responseFulfilled = (res: AxiosResponse) => {
  return res;
};
const responseRejected = async (err: AxiosError) => {
  return Promise.reject(err);
};

ApiManager.defaults.interceptors = {
  request: {
    onFulfilled: requestFulfilled,
    onRejected: requestRejected,
  },
  response: {
    onFulfilled: responseFulfilled,
    onRejected: responseRejected,
  },
};

ApiManager.interceptors.request.use(requestFulfilled, requestRejected);
ApiManager.interceptors.response.use(responseFulfilled, responseRejected);

export default ApiManager;

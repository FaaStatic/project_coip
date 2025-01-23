declare module '@env' {
  export const API_URL: string;
  export const OCP_APIM_KEY: string;
  export const JOB_CREATION_SWAGGER_URL: string;
  export const LOGIN_SWAGGER_URL: string;
}

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    API_URL: string;
    OCP_APIM_KEY: string;
    COIP_SWAGGER_URL: string;
    JOB_CREATION_SWAGGER_URL: string;
    LOGIN_SWAGGER_URL: string;
    // Add other environment variables here
  }
}

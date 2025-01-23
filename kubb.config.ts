import { defineConfig, type UserConfig } from '@kubb/core';
import { pluginTs } from '@kubb/swagger-ts';
import { pluginOas } from '@kubb/plugin-oas';
import { pluginTanstackQuery } from '@kubb/swagger-tanstack-query';

import * as query from '@untr/apps-coip/templates/query/index';
import * as queryOptions from '@untr/apps-coip/templates/queryOptions/index';

export const config = () => {
  const SwaggerUrls = {
    jobCreation: process.env.JOB_CREATION_SWAGGER_URL,
    loginApp: process.env.LOGIN_SWAGGER_URL,
    msCoip: process.env.COIP_SWAGGER_URL,
  };

  /** @type {import('@kubb/core').UserConfig[]} */
  const results: UserConfig[] = Object.entries(SwaggerUrls).map(([key, value]) => {
    const url = value;

    const jobCreationUsed = {
      client: {
        importPath: '@untr/apps-coip/configs/createJobsInstanceKubb.config',
      },
      include: [
        {
          type: 'operationId',
          Pattern: 'JobCreation_JobsPOST',
        },
        {
          type: 'operationId',
          Pattern: 'JobCreation_JobsPATCH',
        },
        {
          type: 'operationId',
          Pattern: 'JobCreation_Syncs',
        },
      ],
    };
    const loginAppUsed = {
      client: {
        importPath: '@untr/apps-coip/configs/loginInstanceKubb.config',
      },
      include: [
        {
          type: 'operationId',
          pattern: '^Account_Login$',
        },
      ],
    };
    const msCoipUsed = {
      client: {
        importPath: '@untr/apps-coip/configs/coipInstanceKubb.config',
      },
    };

    const filterConfig = {
      jobCreation: {},
      loginApp: {
        include: [
          {
            type: 'operationId',
            pattern: '^Account_Login$',
          },
        ],
      },
      msCoip: {},
    };

    const extraConfig = {
      jobCreation: jobCreationUsed,
      loginApp: loginAppUsed,
      msCoip: msCoipUsed,
    };

    return {
      root: '.',
      input: {
        path: url,
      },
      output: {
        path: `./api/${key}`,
        clean: true,
      },
      plugins: [
        pluginOas({
          output: false,
        }),
        pluginTs({
          output: {
            path: 'types',
          },
          ...filterConfig[key],
        }),
        pluginTanstackQuery({
          dataReturnType: 'data',
          transformers: {
            name: (name, type) => {
              if (type === 'function' || type === 'file') {
                return `${name}Hook`;
              }
              return name;
            },
          },
          output: {
            path: './hooks',
          },
          framework: 'react',
          group: {
            type: 'tag',
            output: 'hooks/{{tag}}',
          },
          templates: {
            query: query.templates,
            queryOptions: queryOptions.templates,
          },
          infinite: {
            queryParam: 'pageNumber',
          },
          suspense: false,
          ...extraConfig[key],
        }),
      ],
    };
  });

  return results;
};

export default defineConfig(config());

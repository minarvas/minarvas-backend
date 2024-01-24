import { ConfigModuleOptions } from '@nestjs/config/dist';
import * as Joi from 'joi';
import { join } from 'path';

const getEnvFilePath = (): string => {
  const baseEnvDirectory = 'environments';

  switch (process.env.SERVICE_ENV) {
    case 'local':
      return join(baseEnvDirectory, '.env.local');
    case 'development':
      return join(baseEnvDirectory, '.env.development');
    case 'production':
      return join(baseEnvDirectory, '.env.production');
    default:
      return join(baseEnvDirectory, '.env.development');
  }
};

export const CONFIG_OPTION: ConfigModuleOptions = {
  validationSchema: Joi.object({
    HOST: Joi.string().required(),
    PORT: Joi.number().required(),
    CLIENT: Joi.string().required(),
    MONGODB_URI: Joi.string().required(),
    MONGODB_DATABASE: Joi.string().required(),
    JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
    JWT_ACCESS_TOKEN_EXPIRES_IN: Joi.string().required(),
    JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
    JWT_REFRESH_TOKEN_EXPIRES_IN: Joi.string().required(),
    KAKAO_CLIENT_ID: Joi.string().required(),
    KAKAO_SECRET: Joi.string().required(),
    AWS_REGION: Joi.string().required(),
    AWS_ACCESS_KEY_ID: Joi.string().required(),
    AWS_SECRET_ACCESS_KEY: Joi.string().required(),
  }),
  envFilePath: [getEnvFilePath()],
  isGlobal: true,
};

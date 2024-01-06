import { InternalServerErrorException } from '@nestjs/common';
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
      throw new InternalServerErrorException('SERVICE_ENV is not set.');
  }
};

export const CONFIG_OPTION: ConfigModuleOptions = {
  validationSchema: Joi.object({
    MONGODB_URI: Joi.string().required(),
    MONGODB_DATABASE: Joi.string().required(),
  }),
  envFilePath: [getEnvFilePath()],
  isGlobal: true,
};

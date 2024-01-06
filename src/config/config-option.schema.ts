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
    MYSQL_HOST: Joi.string().required(),
    MYSQL_PORT: Joi.number().required(),
    MYSQL_USERNAME: Joi.string().required(),
    MYSQL_PASSWORD: Joi.string().required(),
    MYSQL_DATABASE: Joi.string().required(),
    MYSQL_SYNCHRONIZE: Joi.boolean().default(false),
    MYSQL_LOGGING: Joi.boolean().default(false),
  }),
  envFilePath: [getEnvFilePath()],
  isGlobal: true,
};

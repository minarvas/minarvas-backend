import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ValidationError } from 'class-validator';
import * as cookieParser from 'cookie-parser';
import * as graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { ValidationException } from './common/exceptions/validation.exception';
import { customOrigin } from './common/utils/cors.util';
import { isProductEnv } from './common/utils/env.util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors: ValidationError[]) => new ValidationException(errors[0]),
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.use(cookieParser());
  app.enableCors({
    origin: customOrigin,
    methods: ['GET', 'HEAD', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'X-Requested-With',
      'X-HTTP-Method-Override',
      'X-Request-Id',
      'Content-Type',
      'Accept',
      'Observe',
      'Authorization',
      'apollo-require-preflight',
    ],
    credentials: true,
    exposedHeaders: ['accesstoken', 'refreshtoken', 'Content-Disposition'],
  });
  app.use('/graphql', graphqlUploadExpress({ maxFileSize: 3000000, maxFiles: 10 }));

  await app.use(helmet({ contentSecurityPolicy: isProductEnv() })).listen(process.env.PORT);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();

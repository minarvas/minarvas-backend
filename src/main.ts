import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { isProductEnv } from './common/utils/env.util';
import { customOrigin } from './common/utils/cors.util';
import { ValidationError } from 'class-validator';
import { ValidationException } from './common/exceptions/validation.exception';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
    origin: !isProductEnv() ? true : customOrigin,
    methods: ['GET', 'HEAD', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'X-Requested-With',
      'X-HTTP-Method-Override',
      'X-Request-Id',
      'Content-Type',
      'Accept',
      'Observe',
      'Authorization',
    ],
    credentials: true,
    exposedHeaders: ['accesstoken', 'refreshtoken', 'Content-Disposition'],
  });

  await app.use(helmet({ contentSecurityPolicy: isProductEnv() })).listen(process.env.PORT);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();

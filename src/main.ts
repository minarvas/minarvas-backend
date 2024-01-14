import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationError } from 'class-validator';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { ValidationException } from './common/exceptions/validation.exception';
import { customOrigin } from './common/utils/cors.util';
import { isProductEnv } from './common/utils/env.util';

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
    ],
    credentials: true,
    exposedHeaders: ['accesstoken', 'refreshtoken', 'Content-Disposition'],
  });

  await app.use(helmet({ contentSecurityPolicy: isProductEnv() })).listen(process.env.PORT);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();

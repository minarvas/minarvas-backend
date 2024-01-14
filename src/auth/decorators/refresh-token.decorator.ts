import { createParamDecorator, Logger, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';
import { GraphqlContext } from '../../graphql/types/graphql-context.type';

export const RefreshToken = createParamDecorator((_: string, context: GraphqlContext) => {
  const logger = new Logger('RefreshTokenDecorator');
  const ctx = GqlExecutionContext.create(context);
  const request = ctx.getContext().req;
  const token = extractTokenFromCookie(request);

  if (!token) {
    logger.error('No refresh token in request cookie');
    throw new UnauthorizedException();
  }

  return token;
});

const extractTokenFromCookie = (request: Request): string | null => {
  return request.cookies['Refresh-Token'] || null;
};

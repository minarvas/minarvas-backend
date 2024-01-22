import { createParamDecorator, Logger, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';
import { GraphqlContext } from '../../graphql/types/graphql-context.type';

export const RefreshToken = createParamDecorator((_: string, context: GraphqlContext) => {
  const logger = new Logger('RefreshTokenDecorator');
  const ctx = GqlExecutionContext.create(context);
  const request = ctx.getContext().req;
  const token = extractTokenFromHeader(request);

  if (!token) {
    logger.error('No refresh token in request header');
    throw new UnauthorizedException();
  }

  return token;
});

const extractTokenFromHeader = (request: Request): string | undefined => {
  const [type, token] = request.headers.authorization?.split(' ') ?? [];
  return type === 'Bearer' ? token : undefined;
};

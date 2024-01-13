import { createParamDecorator, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { GraphqlContext } from '../../graphql/types/graphql-context.type';
import { Request } from 'express';

export const RefreshToken = createParamDecorator((_: string, context: GraphqlContext) => {
  const ctx = GqlExecutionContext.create(context);
  const request = ctx.getContext().req;
  const token = extractTokenFromHeader(request);

  if (!token) {
    throw new UnauthorizedException();
  }

  return token;
});

const extractTokenFromHeader = (request: Request): string | null => {
  return request.cookies['refreshToken'] || null;
};

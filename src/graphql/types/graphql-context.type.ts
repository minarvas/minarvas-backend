import { GraphQLExecutionContext } from '@nestjs/graphql';
import { Request, Response } from 'express';

export type GraphqlContext = GraphQLExecutionContext & {
  req: Request;
  res: Response;
};

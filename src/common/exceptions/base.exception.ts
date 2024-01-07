import { GraphQLError } from 'graphql/error';

export class BaseException extends GraphQLError {
  constructor(message: string, code: string) {
    super(message, null, null, null, null, null, { code });
  }
}

import { GraphQLScalarType, Kind } from 'graphql';
import { Types } from 'mongoose';

export const ObjectIdScalar = new GraphQLScalarType({
  name: 'ObjectId',
  description: 'MongoDB ObjectId scalar type',
  serialize: (value: Types.ObjectId) => value.toHexString(),
  parseValue: (value: string) => new Types.ObjectId(value),
  parseLiteral: (ast) => {
    if (ast.kind === Kind.STRING) {
      return new Types.ObjectId(ast.value); // ast value is always in string format
    }
    return null;
  },
});

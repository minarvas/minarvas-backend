import { registerEnumType } from '@nestjs/graphql';

export enum SortDirection {
  ASC = 1,
  DESC = -1,
}

registerEnumType(SortDirection, { name: 'SortDirection', description: 'Sort direction' });

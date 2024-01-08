import { Field, ObjectType } from '@nestjs/graphql';
import { PaginateResult } from 'mongoose';

@ObjectType()
export class PaginationResponse<T> implements PaginateResult<T> {
  docs: T[];

  @Field()
  hasNextPage: boolean;

  @Field()
  hasPrevPage: boolean;

  @Field()
  limit: number;

  @Field({ nullable: true })
  nextPage: number | null | undefined;

  @Field({ nullable: true })
  offset: number;

  @Field()
  page: number | undefined;

  @Field()
  pagingCounter: number;

  @Field({ nullable: true })
  prevPage: number | null | undefined;

  @Field()
  totalDocs: number;

  @Field()
  totalPages: number;

  meta: any;

  [customLabel: string]: T[] | number | boolean | null | undefined;

  constructor(partial: Partial<PaginationResponse<T>>) {
    Object.assign(this, partial);
  }
}

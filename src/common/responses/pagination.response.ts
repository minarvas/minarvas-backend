import { Field, ObjectType } from '@nestjs/graphql';
import { PaginateResult } from 'mongoose';

@ObjectType()
export class PaginationResponse<T> implements PaginateResult<T> {
  docs: T[];

  @Field({ description: 'Whether there is a next page' })
  hasNextPage: boolean;

  @Field({ description: 'Whether there is a previous page' })
  hasPrevPage: boolean;

  @Field({ description: 'limit number of documents in each page' })
  limit: number;

  @Field({ nullable: true, description: 'Next page number' })
  nextPage: number | null | undefined;

  @Field({ nullable: true, description: 'Number of documents to skip' })
  offset: number;

  @Field({ description: 'Current page number' })
  page: number | undefined;

  @Field({ description: 'Number of documents skipped before this page' })
  pagingCounter: number;

  @Field({ nullable: true, description: 'Previous page number' })
  prevPage: number | null | undefined;

  @Field({ description: 'Total number of documents' })
  totalDocs: number;

  @Field({ description: 'Total number of pages' })
  totalPages: number;

  meta: any;

  [customLabel: string]: T[] | number | boolean | null | undefined;

  constructor(partial: Partial<PaginationResponse<T>>) {
    Object.assign(this, partial);
  }
}

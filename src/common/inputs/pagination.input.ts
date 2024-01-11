import { Field, InputType } from '@nestjs/graphql';
import mongoose from 'mongoose';
import { IsInt, IsOptional, IsPositive, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class PaginateOption implements mongoose.PaginateOptions {
  @Field({ nullable: true, description: 'Page number' })
  @IsPositive()
  @IsInt()
  @IsOptional()
  page?: number;

  @Field({ nullable: true, description: 'Limit number of documents in each page' })
  @IsPositive()
  @IsInt()
  @IsOptional()
  limit?: number;

  @Field({ nullable: true, description: 'Number of documents to skip' })
  @IsPositive()
  @IsInt()
  @IsOptional()
  offset?: number;
}

@InputType()
export class PaginateInput {
  query: { [key: string]: any };

  @Field(() => PaginateOption, { nullable: true, description: 'Pagination options like page, limit, offset' })
  @ValidateNested()
  @Type(() => PaginateOption)
  options: PaginateOption;
}

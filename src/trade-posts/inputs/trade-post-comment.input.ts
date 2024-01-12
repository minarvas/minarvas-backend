import { Field, InputType } from '@nestjs/graphql';
import { IsString, MinLength, ValidateNested } from 'class-validator';
import { PaginateInput } from '../../common/inputs/pagination.input';
import { Type } from 'class-transformer';

@InputType()
export class CreateTradePostCommentInput {
  @Field({ description: 'ID of the trade post to comment on' })
  @IsString()
  tradePostId: string;

  @Field({ description: 'Content of the comment' })
  @IsString()
  @MinLength(1)
  content: string;
}

@InputType()
export class PaginateTradePostCommentInput extends PaginateInput {}

@InputType()
export class GetTradePostCommentInput {
  @Field({ description: 'ID of the trade post' })
  @IsString()
  tradePostId: string;

  @Field(() => PaginateTradePostCommentInput, { description: 'Pagination options like page, limit, offset' })
  @ValidateNested()
  @Type(() => PaginateTradePostCommentInput)
  pagination: PaginateTradePostCommentInput;
}

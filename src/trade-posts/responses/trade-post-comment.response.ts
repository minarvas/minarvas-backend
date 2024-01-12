import { Field, ObjectType } from '@nestjs/graphql';
import { BaseResponse } from '../../common/responses/base.response';
import { ITradePostComment } from '../interfaces/trade-post-comment.interface';
import { Types } from 'mongoose';
import { UserResponse } from '../../users/responses/user.response';
import { PaginationResponse } from '../../common/responses/pagination.response';

@ObjectType()
export class TradePostCommentResponse extends BaseResponse implements ITradePostComment {
  authorId: Types.ObjectId;

  @Field()
  content: string;

  @Field((_) => UserResponse, { description: 'The author of the trade post comment' })
  author: UserResponse;

  constructor(partial: Partial<TradePostCommentResponse>) {
    super(partial);
    Object.assign(this, {
      authorId: partial?.authorId,
      content: partial?.content,
    });
  }
}

@ObjectType()
export class TradePostCommentList extends PaginationResponse<TradePostCommentResponse> {
  @Field(() => [TradePostCommentResponse])
  docs: TradePostCommentResponse[];

  constructor(partial: Partial<TradePostCommentList>) {
    super(partial);
    Object.assign(this, {
      docs: partial?.docs,
    });
  }
}

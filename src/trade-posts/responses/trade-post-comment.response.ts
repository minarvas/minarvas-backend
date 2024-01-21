import { Field, ObjectType } from '@nestjs/graphql';
import { BaseResponse } from '../../common/responses/base.response';
import { PaginationResponse } from '../../common/responses/pagination.response';
import { UserResponse } from '../../users/responses/user.response';
import { ITradePostComment } from '../interfaces/trade-post-comment.interface';
import { TradePostCommentDocument } from '../schemas/trade-post-comment.schema';

@ObjectType()
export class TradePostCommentResponse extends BaseResponse implements ITradePostComment {
  authorId: string;

  @Field()
  content: string;

  @Field((_) => UserResponse, { description: 'The author of the trade post comment' })
  author: UserResponse;

  postId: string;

  constructor(partial: Partial<TradePostCommentDocument>) {
    super(partial);
    Object.assign(this, {
      authorId: partial?.authorId,
      content: partial?.content,
      postId: partial?.postId,
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

import { Field, ObjectType } from '@nestjs/graphql';
import { BaseResponse } from '../../common/responses/base.response';
import { PaginationResponse } from '../../common/responses/pagination.response';
import { UserResponse } from '../../users/responses/user.response';
import { TradeAction } from '../enums/trade-action.enum';
import { TradeStatus } from '../enums/trade-status.enum';
import { ITradePost } from '../interfaces/trade-post.interface';
import { TradePostComment } from '../schemas/trade-post-comment.schema';

@ObjectType()
export class TradePostResponse extends BaseResponse implements ITradePost {
  @Field(() => TradeAction)
  action: TradeAction;

  @Field()
  price: number;

  authorId: string;

  @Field((_) => UserResponse, { description: 'The author of the trade post' })
  author: UserResponse;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => TradeStatus)
  status: TradeStatus;

  @Field({ defaultValue: 0, description: 'The number of comments in the trade post' })
  commentsCount: number;

  @Field({ nullable: true, description: 'The image url of the trade post' })
  image: string;

  @Field({ defaultValue: false, description: 'If the trade post is bookmarked by the user' })
  isBookmarked?: boolean;

  comments: TradePostComment[];

  constructor(partial: Partial<TradePostResponse>) {
    super(partial);
    Object.assign(this, {
      action: partial?.action,
      price: partial?.price,
      authorId: partial?.authorId,
      title: partial?.title,
      description: partial?.description,
      status: partial?.status,
      commentsCount: partial?.comments?.length || 0,
      image: partial?.image,
      isBookmarked: partial?.isBookmarked || false,
    });
  }
}

@ObjectType()
export class TradePostList extends PaginationResponse<TradePostResponse> {
  @Field(() => [TradePostResponse])
  docs: TradePostResponse[];

  constructor(partial: Partial<TradePostList>) {
    super(partial);
    Object.assign(this, {
      docs: partial?.docs,
    });
  }
}

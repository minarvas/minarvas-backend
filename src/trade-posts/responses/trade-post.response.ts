import { ITradePost } from '../interfaces/trade-post.interface';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseResponse } from '../../common/responses/base.response';
import { TradeAction } from '../enums/trade-action.enum';
import { Types } from 'mongoose';
import { TradeStatus } from '../enums/trade-status.enum';
import { UserResponse } from '../../users/responses/user.response';
import { PaginationResponse } from '../../common/responses/pagination.response';

@ObjectType()
export class TradePostResponse extends BaseResponse implements ITradePost {
  @Field(() => TradeAction)
  action: TradeAction;

  @Field()
  price: number;

  authorId: Types.ObjectId;

  @Field((_) => UserResponse, { description: 'The author of the trade post' })
  author: UserResponse;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => TradeStatus)
  status: TradeStatus;

  constructor(partial: Partial<TradePostResponse>) {
    super(partial);
    Object.assign(this, {
      action: partial?.action,
      price: partial?.price,
      authorId: partial?.authorId.toHexString(),
      title: partial?.title,
      description: partial?.description,
      status: partial?.status,
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

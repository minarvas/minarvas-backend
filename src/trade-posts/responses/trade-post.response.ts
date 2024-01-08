import { ITradePost } from '../interfaces/trade-post.interface';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseResponse } from '../../common/responses/base.response';
import { TradeAction } from '../enums/trade-action.enum';
import { Types } from 'mongoose';
import { ObjectIdScalar } from '../../graphql/scalars/object-id.scalar';

@ObjectType()
export class TradePostResponse extends BaseResponse implements ITradePost {
  @Field(() => TradeAction)
  action: TradeAction;

  @Field()
  price: number;

  @Field((_) => ObjectIdScalar)
  authorId: Types.ObjectId;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  constructor(partial: Partial<TradePostResponse>) {
    super(partial);
    Object.assign(this, {
      action: partial?.action,
      price: partial?.price,
      authorId: partial?.authorId,
      title: partial?.title,
      description: partial?.description,
    });
  }
}

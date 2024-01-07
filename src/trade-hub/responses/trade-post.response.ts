import { ITradePost } from '../interfaces/trade-post.interface';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseResponse } from '../../common/responses/base.response';
import { TradeAction } from '../enums/trade-action.enum';

@ObjectType()
export class TradePostResponse extends BaseResponse implements ITradePost {
  @Field(() => TradeAction)
  action: TradeAction;

  @Field()
  price: number;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  constructor(partial: Partial<TradePostResponse>) {
    super(partial);
    Object.assign(this, {
      action: partial?.action,
      price: partial?.price,
      title: partial?.title,
      description: partial?.description,
    });
  }
}

import { PaginationResponse } from '../../common/responses/pagination.response';
import { TradePostResponse } from './trade-post.response';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TradePostPaginationResponse extends PaginationResponse<TradePostResponse> {
  @Field(() => [TradePostResponse])
  docs: TradePostResponse[];

  constructor(partial: Partial<TradePostPaginationResponse>) {
    super(partial);
    Object.assign(this, {
      docs: partial?.docs,
    });
  }
}

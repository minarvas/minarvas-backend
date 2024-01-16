import { Field, ObjectType } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { ObjectIdScalar } from 'src/graphql/scalars/object-id.scalar';
import { TradePostResponse } from 'src/trade-posts/responses/trade-post.response';
import { TradePost } from '../../trade-posts/schemas/trade-post.schema';
import { IBookmark } from '../interfaces/bookmark.interface';

@ObjectType()
export class BookmarkResponse implements IBookmark {
  @Field((_) => ObjectIdScalar, { description: 'The id of the user' })
  userId: Types.ObjectId;

  tradePostIds: Types.ObjectId[];

  @Field(() => [TradePostResponse], { description: 'The trade posts that the user has bookmarked' })
  tradePosts: TradePost[];

  constructor(partial: Partial<BookmarkResponse>) {
    Object.assign(this, {
      userId: partial.userId,
      tradePostIds: partial.tradePosts,
    });
  }
}

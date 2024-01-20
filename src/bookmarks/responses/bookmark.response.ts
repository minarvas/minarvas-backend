import { TradePost } from '../../trade-posts/schemas/trade-post.schema';
import { IBookmark } from '../interfaces/bookmark.interface';

export class BookmarkResponse implements IBookmark {
  userId: string;

  tradePostIds: string[];

  tradePosts: TradePost[];

  constructor(partial: Partial<BookmarkResponse>) {
    Object.assign(this, {
      userId: partial?.userId,
      tradePostIds: partial?.tradePosts,
    });
  }
}

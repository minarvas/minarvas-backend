import { Mutation, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { UserAuth } from '../auth/decorators/auth.decorator';
import { Input } from '../graphql/args/input.args';
import { TradePostResponse } from '../trade-posts/responses/trade-post.response';
import { TradePostService } from '../trade-posts/trade-post.service';
import { AuthorizedUser } from '../users/decorators/user.decorator';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkInput } from './inputs/bookmark.input';
import { BookmarkResponse } from './responses/bookmark.response';

@Resolver(() => BookmarkResponse)
@UserAuth()
export class BookmarkResolver {
  constructor(private readonly bookmarkService: BookmarkService, private readonly tradePostService: TradePostService) {}

  @Mutation(() => BookmarkResponse)
  async createBookmark(@AuthorizedUser('_id') userId: string, @Input() input: CreateBookmarkInput) {
    return this.bookmarkService.createBookmark(userId, input);
  }

  @ResolveField(() => TradePostResponse)
  async tradePosts(@Parent() bookmark: BookmarkResponse) {
    return this.tradePostService.getTradePostsByIds(bookmark.tradePostIds);
  }
}

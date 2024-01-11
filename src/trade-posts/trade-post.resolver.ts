import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { TradePostService } from './trade-post.service';
import { TradePostResponse } from './responses/trade-post.response';
import { AuthorizedUser } from '../users/decorators/user.decorator';
import { Input } from '../graphql/args/input.args';
import {
  CreateTradePostInput,
  GetTradePostInput,
  PaginateTradePostInput,
  UpdateTradePostInput,
} from './inputs/trade-post.input';
import { Types } from 'mongoose';
import { Authorize } from '../auth/decorators/auth.decorator';
import { TradePostAuth } from './decorators/trade-post-auth.decorator';
import { TradePostPaginationResponse } from './responses/trade-post-pagination.response';

@Resolver('TradeHub')
export class TradePostResolver {
  constructor(private readonly tradeHubService: TradePostService) {}

  @Mutation(() => TradePostResponse)
  @Authorize()
  async createTradePost(@AuthorizedUser('_id') userId: Types.ObjectId, @Input() input: CreateTradePostInput) {
    return this.tradeHubService.createTradePost(userId, input);
  }

  @Query(() => TradePostResponse)
  @Authorize()
  async getTradePost(@Input() input: GetTradePostInput) {
    return this.tradeHubService.getTradePost(input.tradePostId);
  }

  @Query(() => TradePostPaginationResponse)
  async getTradePostList(@Input() input: PaginateTradePostInput) {
    return this.tradeHubService.getTradePostList(input);
  }

  @Mutation(() => TradePostResponse)
  @TradePostAuth()
  async updateTradePost(@Input() input: UpdateTradePostInput) {
    return this.tradeHubService.updateTradePost(input);
  }

  @Mutation(() => TradePostResponse)
  @TradePostAuth()
  async deleteTradePost(@Input() input: GetTradePostInput) {
    return this.tradeHubService.deleteTradePost(input.tradePostId);
  }
}

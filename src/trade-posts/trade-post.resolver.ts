import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { TradePostService } from './trade-post.service';
import { TradePostResponse } from './responses/trade-post.response';
import { AuthorizedUser } from '../users/decorators/user.decorator';
import { Input } from '../graphql/args/input.args';
import { CreateTradePostInput, GetTradePostInput, UpdateTradePostInput } from './inputs/trade-post.input';
import { Types } from 'mongoose';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';

@Resolver('TradeHub')
@UseGuards(AuthGuard)
export class TradePostResolver {
  constructor(private readonly tradeHubService: TradePostService) {}

  @Mutation(() => TradePostResponse)
  async createTradePost(@AuthorizedUser('_id') userId: Types.ObjectId, @Input() input: CreateTradePostInput) {
    return this.tradeHubService.createTradePost(userId, input);
  }

  @Query(() => TradePostResponse)
  async getTradePost(@Input() input: GetTradePostInput) {
    return this.tradeHubService.getTradePosts(input.tradePostId);
  }

  @Mutation(() => TradePostResponse)
  async updateTradePost(@Input() input: UpdateTradePostInput) {
    return this.tradeHubService.updateTradePost(input);
  }

  @Mutation(() => TradePostResponse)
  async deleteTradePost(@Input() input: GetTradePostInput) {
    return this.tradeHubService.deleteTradePost(input.tradePostId);
  }
}

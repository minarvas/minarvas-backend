import { Mutation, Resolver } from '@nestjs/graphql';
import { TradePostService } from './trade-post.service';
import { TradePostResponse } from './responses/trade-post.response';
import { AuthorizedUser } from '../users/decorators/user.decorator';
import { Input } from '../graphql/args/input.args';
import { CreateTradePostInput } from './inputs/trade-post.input';
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
}

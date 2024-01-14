import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { Types } from 'mongoose';
import { UserAuth } from '../auth/decorators/auth.decorator';
import { Input } from '../graphql/args/input.args';
import { AuthorizedUser } from '../users/decorators/user.decorator';
import { UserResponse } from '../users/responses/user.response';
import { UserService } from '../users/user.service';
import { TradePostAuth } from './decorators/trade-post-auth.decorator';
import {
  CreateTradePostInput,
  GetTradePostInput,
  PaginateTradePostInput,
  UpdateTradePostInput,
} from './inputs/trade-post.input';
import { TradePostList, TradePostResponse } from './responses/trade-post.response';
import { TradePostService } from './trade-post.service';

@Resolver(() => TradePostResponse)
export class TradePostResolver {
  constructor(private readonly tradePostService: TradePostService, private readonly userService: UserService) {}

  @Mutation(() => TradePostResponse)
  @UserAuth()
  async createTradePost(
    @AuthorizedUser('_id') authorId: Types.ObjectId,
    @Input() input: CreateTradePostInput,
    @Args({ name: 'image', type: () => GraphQLUpload, nullable: true })
    image?: FileUpload,
  ) {
    return this.tradePostService.createTradePost(authorId, input, image);
  }

  @Query(() => TradePostResponse)
  @UserAuth()
  async getTradePost(@Input() input: GetTradePostInput) {
    return this.tradePostService.getTradePost(input.tradePostId);
  }

  @Query(() => TradePostList)
  async getTradePostList(@Input() input: PaginateTradePostInput) {
    return this.tradePostService.getTradePostList(input);
  }

  @ResolveField(() => UserResponse)
  async author(@Parent() tradePost: TradePostResponse) {
    return this.userService.getUser(tradePost.authorId);
  }

  @Mutation(() => TradePostResponse)
  @TradePostAuth()
  async updateTradePost(@Input() input: UpdateTradePostInput) {
    return this.tradePostService.updateTradePost(input);
  }

  @Mutation(() => TradePostResponse, { nullable: true })
  @TradePostAuth()
  async deleteTradePost(@Input() input: GetTradePostInput) {
    return this.tradePostService.deleteTradePost(input.tradePostId);
  }
}

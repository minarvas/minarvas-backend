import { Inject } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { Types } from 'mongoose';
import { OptionalUserAuth, UserAuth } from '../auth/decorators/auth.decorator';
import { Input } from '../graphql/args/input.args';
import { AuthorizedUser } from '../users/decorators/user.decorator';
import { UserResponse } from '../users/responses/user.response';
import { UserService } from '../users/user.service';
import { TradePostAuth } from './decorators/trade-post-auth.decorator';
import {
  BookmarkTradePostInput,
  CreateTradePostInput,
  GetTradePostInput,
  PaginateTradePostInput,
  UpdateTradePostInput,
} from './inputs/trade-post.input';
import { ITradePostService } from './interfaces/trade-post.interface';
import { TradePostList, TradePostResponse } from './responses/trade-post.response';
import { TradePostService } from './trade-post.service';

@Resolver(() => TradePostResponse)
export class TradePostResolver {
  constructor(
    @Inject(ITradePostService) private readonly tradePostService: TradePostService,
    private readonly userService: UserService,
  ) {}

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
  async getTradePost(@AuthorizedUser('_id') userId: string, @Input() input: GetTradePostInput) {
    return this.tradePostService.getTradePost(userId, input.tradePostId);
  }

  @Query(() => TradePostList)
  @OptionalUserAuth()
  async getTradePostList(@AuthorizedUser('_id') userId: string, @Input() input: PaginateTradePostInput) {
    return this.tradePostService.getTradePostList(userId, input);
  }

  @ResolveField(() => UserResponse)
  async author(@Parent() tradePost: TradePostResponse) {
    return this.userService.getUser(tradePost.authorId);
  }

  @Mutation(() => TradePostResponse)
  @TradePostAuth()
  async updateTradePost(@AuthorizedUser('_id') userId: string, @Input() input: UpdateTradePostInput) {
    return this.tradePostService.updateTradePost(userId, input);
  }

  @Mutation(() => TradePostResponse, { nullable: true })
  @TradePostAuth()
  async deleteTradePost(@AuthorizedUser('_id') userId: string, @Input() input: GetTradePostInput) {
    return this.tradePostService.deleteTradePost(userId, input.tradePostId);
  }

  @Query(() => [TradePostResponse], { nullable: true })
  @UserAuth()
  async getBookmarkedTradePosts(@AuthorizedUser('_id') userId: string) {
    return this.tradePostService.getBookmarkedTradePosts(userId);
  }

  @Mutation(() => TradePostResponse)
  @UserAuth()
  async bookmarkTradePost(@AuthorizedUser('_id') userId: string, @Input() input: BookmarkTradePostInput) {
    return this.tradePostService.bookmarkTradePost(userId, input);
  }

  @Query(() => [TradePostResponse])
  @UserAuth()
  async getBookmarkedTradePost(@AuthorizedUser('_id') userId: string) {
    return this.tradePostService.getBookmarkedTradePosts(userId);
  }

  @Mutation(() => TradePostResponse)
  @UserAuth()
  async unbookmarkTradePost(@AuthorizedUser('_id') userId: string, @Input() input: BookmarkTradePostInput) {
    return this.tradePostService.unbookmarkTradePost(userId, input);
  }
}

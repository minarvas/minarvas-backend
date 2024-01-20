import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { endOfHour, startOfHour } from 'date-fns';
import { isEmpty } from 'lodash';
import { Model } from 'mongoose';
import { IBookmarkService } from '../bookmarks/interfaces/bookmark.interface';
import { TradePostNotFound } from './exceptions/trade-post.exception';
import {
  BookmarkTradePostInput,
  CreateTradePostInput,
  PaginateTradePostInput,
  UpdateTradePostInput,
} from './inputs/trade-post.input';
import { ITradePostService } from './interfaces/trade-post.interface';
import { TradePostResponse } from './responses/trade-post.response';
import { TradePost, TradePostDocument } from './schemas/trade-post.schema';
import { TradePostCommentService } from './services/trade-post-comment.service';
import { TradePostPaginationService } from './services/trade-post-pagination.service';
import { TradePostStorageService } from './services/trade-post-storage.service';

@Injectable()
export class TradePostService implements ITradePostService {
  private readonly logger = new Logger(TradePostService.name);
  private readonly CREATION_MAX_IN_HOUR = 5;

  constructor(
    @InjectModel(TradePost.name) private readonly tradePostModel: Model<TradePostDocument>,
    @Inject(IBookmarkService) private readonly bookmarkService: IBookmarkService,
    private readonly tradePostPaginationService: TradePostPaginationService,
    private readonly tradePostStorageService: TradePostStorageService,
    private readonly tradePostCommentService: TradePostCommentService,
  ) {}

  async createTradePost(userId: string, input: CreateTradePostInput, image?: any) {
    const start = startOfHour(new Date());
    const end = endOfHour(new Date());
    const count = await this.tradePostModel.countDocuments({ authorId: userId, createdAt: { $gte: start, $lte: end } });

    // if (count >= this.CREATION_MAX_IN_HOUR) {
    //   throw new TradePostCreationMaxExceeded();
    // }

    const { id: tradePostId } = await this.tradePostModel.create({ ...input, authorId: userId });
    const imageUrl = await this.tradePostStorageService.uploadImage(tradePostId, image);
    const tradePost = await this.tradePostModel.findByIdAndUpdate(tradePostId, { image: imageUrl }, { new: true });
    return new TradePostResponse(tradePost);
  }

  async getTradePostById(tradePostId: string) {
    return this.tradePostModel.findById(tradePostId);
  }

  async getTradePost(userId: string, tradePostId: string) {
    const tradePost = await this.tradePostModel.findById(tradePostId);

    if (!tradePost) {
      throw new TradePostNotFound(tradePostId);
    }

    const result = new TradePostResponse(tradePost);

    if (userId) {
      const bookmark = await this.bookmarkService.getBookmark(userId);
      result.isBookmarked = bookmark?.tradePostIds?.some((id) => id === tradePostId) || false;
    }

    return result;
  }

  async getTradePostList(userId: string, input: PaginateTradePostInput) {
    const { tradePostIds } = await this.bookmarkService.getBookmark(userId);
    const paginatedResult = await this.tradePostPaginationService.paginate(input.query, input.options, tradePostIds);
    return paginatedResult;
  }

  async getTradePostsByIds(tradePostIds: string[]) {
    const tradePosts = await this.tradePostModel.find({ _id: { $in: tradePostIds } });
    return tradePosts.map((tradePost) => new TradePostResponse(tradePost));
  }

  async getBookmarkedTradePosts(userId: string) {
    const bookmark = await this.bookmarkService.getBookmark(userId);

    if (isEmpty(bookmark?.tradePostIds)) {
      return null;
    }

    const tradePosts = await this.getTradePostsByIds(bookmark.tradePostIds);

    if (isEmpty(tradePosts)) {
      return null;
    }

    return tradePosts;
  }

  async updateTradePost(userId: string, input: UpdateTradePostInput) {
    const { tradePostId, ...dto } = input;
    await this.tradePostModel.updateOne({ _id: tradePostId }, dto, { new: true });
    return this.getTradePost(userId, tradePostId);
  }

  async deleteTradePost(userId: string, tradePostId: string) {
    const tradePost = await this.getTradePost(userId, tradePostId);
    if (!tradePost) {
      return null;
    }

    await this.bookmarkService.deleteBookmarks(tradePostId);
    this.tradePostCommentService.deleteTradePostComments(tradePost.comments);
    this.tradePostStorageService.deleteImage(tradePostId);
    await this.tradePostModel.findByIdAndDelete(tradePostId);
    return tradePost;
  }

  async bookmarkTradePost(userId: string, { tradePostId }: BookmarkTradePostInput) {
    await this.bookmarkService.createBookmark(userId, tradePostId);
    await this.tradePostModel.findOneAndUpdate(
      { _id: tradePostId },
      { $addToSet: { bookmarkedBy: userId } },
      { upsert: true },
    );
    return this.getTradePost(userId, tradePostId);
  }

  async unbookmarkTradePost(userId: string, input: BookmarkTradePostInput) {
    await this.bookmarkService.deleteBookmark(userId, input.tradePostId);
    await this.tradePostModel.findOneAndUpdate({ _id: input.tradePostId }, { $pull: { bookmarkedBy: userId } });
    return this.getTradePost(userId, input.tradePostId);
  }
}

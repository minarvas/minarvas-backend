import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { endOfHour, startOfHour } from 'date-fns';
import { Model, Types } from 'mongoose';
import { TradePostCreationMaxExceeded, TradePostNotFound } from './exceptions/trade-post.exception';
import { CreateTradePostInput, PaginateTradePostInput, UpdateTradePostInput } from './inputs/trade-post.input';
import { TradePostResponse } from './responses/trade-post.response';
import { TradePost, TradePostDocument } from './schemas/trade-post.schema';
import { TradePostCommentService } from './services/trade-post-comment.service';
import { TradePostPaginationService } from './services/trade-post-pagination.service';
import { TradePostStorageService } from './services/trade-post-storage.service';

@Injectable()
export class TradePostService {
  private readonly CREATION_MAX_IN_HOUR = 5;

  constructor(
    @InjectModel(TradePost.name) private readonly tradePostModel: Model<TradePostDocument>,
    private readonly tradePostPaginationService: TradePostPaginationService,
    private readonly tradePostStorageService: TradePostStorageService,
    private readonly tradePostCommentService: TradePostCommentService,
  ) {}

  async createTradePost(userId: Types.ObjectId, input: CreateTradePostInput, image?: any) {
    const start = startOfHour(new Date());
    const end = endOfHour(new Date());
    const count = await this.tradePostModel.countDocuments({ authorId: userId, createdAt: { $gte: start, $lte: end } });

    if (count >= this.CREATION_MAX_IN_HOUR) {
      throw new TradePostCreationMaxExceeded();
    }

    const { _id: tradePostId } = await this.tradePostModel.create({ ...input, authorId: userId });
    const imageUrl = await this.tradePostStorageService.uploadImage(tradePostId.toHexString(), image);
    const tradePost = await this.tradePostModel.findByIdAndUpdate(tradePostId, { image: imageUrl }, { new: true });
    return new TradePostResponse(tradePost);
  }

  async getTradePost(tradePostId: string) {
    const tradePost = await this.tradePostModel.findById(tradePostId);

    if (!tradePost) {
      throw new TradePostNotFound(tradePostId);
    }

    return new TradePostResponse(tradePost);
  }

  async getTradePostList(input: PaginateTradePostInput) {
    return this.tradePostPaginationService.paginate(input.query, input.options);
  }

  async getTradePostsByIds(tradePostIds: Types.ObjectId[]) {
    const tradePosts = await this.tradePostModel.find({ _id: { $in: tradePostIds } });
    return tradePosts.map((tradePost) => new TradePostResponse(tradePost));
  }

  async updateTradePost(input: UpdateTradePostInput) {
    const { tradePostId, ...update } = input;
    const newTradePost = await this.tradePostModel.findByIdAndUpdate(tradePostId, update, { new: true });
    return new TradePostResponse(newTradePost);
  }

  async deleteTradePost(tradePostId: string) {
    const tradePost = await this.tradePostModel.findById(tradePostId);
    if (!tradePost) {
      return null;
    }

    this.tradePostCommentService.deleteTradePostComments(tradePost.comments);
    this.tradePostStorageService.deleteImage(tradePostId);
    await this.tradePostModel.findByIdAndDelete(tradePostId);
    return new TradePostResponse(tradePost);
  }
}

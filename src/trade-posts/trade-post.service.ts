import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TradePost, TradePostDocument } from './schemas/trade-post.schema';
import { Model, Types } from 'mongoose';
import { CreateTradePostInput, PaginateTradePostsInput, UpdateTradePostInput } from './inputs/trade-post.input';
import { TradePostResponse } from './responses/trade-post.response';
import { TradePostNotFound } from './exceptions/trade-post.exception';
import { TradePostPaginationService } from './services/trade-post-pagination.service';

@Injectable()
export class TradePostService {
  constructor(
    @InjectModel(TradePost.name) private readonly tradePostModel: Model<TradePostDocument>,
    private readonly tradePostPaginationService: TradePostPaginationService,
  ) {}

  async createTradePost(userId: Types.ObjectId, input: CreateTradePostInput) {
    const tradePost = await this.tradePostModel.create({ ...input, authorId: userId });
    return new TradePostResponse(tradePost);
  }

  async getTradePost(tradePostId: string) {
    const tradePost = await this.tradePostModel.findById(tradePostId);

    if (!tradePost) {
      throw new TradePostNotFound(tradePostId);
    }

    return new TradePostResponse(tradePost);
  }

  async getTradePostList(input: PaginateTradePostsInput) {
    return this.tradePostPaginationService.paginate(input.query, input.options);
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
    await this.tradePostModel.findByIdAndDelete(tradePostId);
    return new TradePostResponse(tradePost);
  }
}

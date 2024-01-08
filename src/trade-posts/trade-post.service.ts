import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TradePost, TradePostDocument } from './schemas/trade-post.schema';
import { Model, Types } from 'mongoose';
import { CreateTradePostInput, UpdateTradePostInput } from './inputs/trade-post.input';
import { TradePostResponse } from './responses/trade-post.response';
import { TradePostNotFound } from './exceptions/trade-post.exception';

@Injectable()
export class TradePostService {
  constructor(@InjectModel(TradePost.name) private readonly tradePostModel: Model<TradePostDocument>) {}

  async createTradePost(userId: Types.ObjectId, input: CreateTradePostInput) {
    const tradePost = await this.tradePostModel.create({ ...input, authorId: userId });
    return new TradePostResponse(tradePost);
  }

  async getTradePosts(tradePostId: string) {
    const tradePost = await this.tradePostModel.findById(tradePostId);

    if (!tradePost) {
      throw new TradePostNotFound(tradePostId);
    }

    return new TradePostResponse(tradePost);
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

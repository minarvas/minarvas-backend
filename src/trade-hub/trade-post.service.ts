import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TradePost, TradePostDocument } from './schemas/trade-post.schema';
import { Model, Types } from 'mongoose';
import { CreateTradePostInput } from './inputs/trade-post.input';
import { TradePostResponse } from './responses/trade-post.response';

@Injectable()
export class TradePostService {
  constructor(@InjectModel(TradePost.name) private readonly tradeHubModel: Model<TradePostDocument>) {}

  async createTradePost(userId: Types.ObjectId, input: CreateTradePostInput) {
    const tradePost = await this.tradeHubModel.create({ ...input, authorId: userId });
    return new TradePostResponse(tradePost);
  }
}

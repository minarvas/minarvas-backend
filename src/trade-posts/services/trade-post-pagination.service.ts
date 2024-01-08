import { Injectable } from '@nestjs/common';
import { TradePost, TradePostDocument, TradePostSchema } from '../schemas/trade-post.schema';
import paginate from 'mongoose-paginate-v2';
import mongoose from 'mongoose';

@Injectable()
export class TradePostPaginationService {
  async paginate() {
    TradePostSchema.plugin(paginate);
    const newModel = mongoose.model<TradePostDocument, mongoose.PaginateModel<TradePostDocument>>(TradePost.name);
    const tradePostList = await newModel.paginate({}, { limit: 10 });
  }
}

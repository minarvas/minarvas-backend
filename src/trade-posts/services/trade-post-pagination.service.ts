import { Injectable } from '@nestjs/common';
import { TradePost } from '../schemas/trade-post.schema';
import { PaginateModel } from 'mongoose';
import { PaginateTradePostOption, PaginateTradePostQuery } from '../inputs/trade-post.input';
import { InjectModel } from '@nestjs/mongoose';
import { TradePostResponse } from '../responses/trade-post.response';
import { TradePostPaginationResponse } from '../responses/trade-post-pagination.response';

@Injectable()
export class TradePostPaginationService {
  constructor(@InjectModel(TradePost.name) private readonly tradePostModel: PaginateModel<TradePost>) {}

  async paginate(query: PaginateTradePostQuery = {}, options: PaginateTradePostOption) {
    const tradePostList = await this.tradePostModel.paginate(query, options);
    return new TradePostPaginationResponse({ ...tradePostList, docs: this.mapDocsToResponse(tradePostList.docs) });
  }

  private mapDocsToResponse(docs: TradePost[]) {
    return docs.map((doc) => new TradePostResponse(doc));
  }
}

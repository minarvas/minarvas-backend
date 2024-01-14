import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, PaginateModel } from 'mongoose';
import { PaginateOption } from '../../common/inputs/pagination.input';
import { PaginateTradePostQuery } from '../inputs/trade-post.input';
import { TradePostList, TradePostResponse } from '../responses/trade-post.response';
import { TradePost } from '../schemas/trade-post.schema';

@Injectable()
export class TradePostPaginationService {
  constructor(@InjectModel(TradePost.name) private readonly tradePostModel: PaginateModel<TradePost>) {}

  async paginate(query: PaginateTradePostQuery = {}, options: PaginateOption) {
    const filter = this.getFilterQuery(query);
    const tradePostList = await this.tradePostModel.paginate(filter, options);
    return new TradePostList({ ...tradePostList, docs: this.mapDocsToResponse(tradePostList.docs) });
  }

  private getFilterQuery({ title, minPrice, maxPrice, start, end, ...rest }: PaginateTradePostQuery) {
    const query: FilterQuery<TradePost> = rest || {};

    if (title) {
      query.title = { $regex: title, $options: 'i' };
    }

    if (minPrice) {
      query.price = { $gte: minPrice };
    }

    if (maxPrice) {
      query.price = { $lte: maxPrice };
    }

    if (start) {
      query.createdAt = { $gte: new Date(start) };
    }

    if (end) {
      query.createdAt = { $lte: new Date(end) };
    }

    return query;
  }

  private mapDocsToResponse(docs: TradePost[]) {
    return docs.map((doc) => new TradePostResponse(doc));
  }
}

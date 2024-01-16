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

  async paginate(query: PaginateTradePostQuery = {}, options: PaginateOption, bookmarkedTradePostIds: string[]) {
    const filter = this.getFilter(query);
    const tradePostList = await this.tradePostModel.paginate(filter, { ...options });
    return new TradePostList({
      ...tradePostList,
      docs: this.mapDocsToResponse(tradePostList.docs, bookmarkedTradePostIds),
    });
  }

  private getFilter({ title, minPrice, maxPrice, start, end, ...rest }: PaginateTradePostQuery) {
    const filter: FilterQuery<TradePost> = rest || {};

    if (title) {
      filter.title = { $regex: title, $options: 'i' };
    }

    if (minPrice) {
      filter.price = { $gte: minPrice };
    }

    if (maxPrice) {
      filter.price = { $lte: maxPrice };
    }

    if (start) {
      filter.createdAt = { $gte: new Date(start) };
    }

    if (end) {
      filter.createdAt = { $lte: new Date(end) };
    }

    return filter;
  }

  private mapDocsToResponse(docs: TradePost[], bookmarkedTradePostIds: string[]) {
    return docs
      .map((doc: TradePost) => new TradePostResponse(doc))
      .map((tradePost) => {
        tradePost.isBookmarked = bookmarkedTradePostIds.some((bookmarkedId) => bookmarkedId === String(tradePost._id));
        return tradePost;
      });
  }
}

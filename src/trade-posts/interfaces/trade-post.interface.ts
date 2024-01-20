import { TradeAction } from '../enums/trade-action.enum';
import { TradeStatus } from '../enums/trade-status.enum';
import { TradePostResponse } from '../responses/trade-post.response';
import { TradePostComment } from '../schemas/trade-post-comment.schema';

export interface ITradePost {
  action: TradeAction;
  title: string;
  description?: string;
  price: number;
  authorId: string;
  status: TradeStatus;
  image?: string;
  comments?: TradePostComment[];
  isBookmarked?: boolean;
}

export const ITradePostService = Symbol('ITradePostService');

export interface ITradePostService {
  getTradePostsByIds(tradePostIds: string[]): Promise<TradePostResponse[]>;
}

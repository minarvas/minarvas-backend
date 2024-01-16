import { Types } from 'mongoose';
import { TradeAction } from '../enums/trade-action.enum';
import { TradeStatus } from '../enums/trade-status.enum';
import { TradePostResponse } from '../responses/trade-post.response';

export interface ITradePost {
  action: TradeAction;
  title: string;
  description?: string;
  price: number;
  authorId: Types.ObjectId;
  status: TradeStatus;
}

export const ITradePostService = Symbol('ITradePostService');

export interface ITradePostService {
  getTradePostsByIds(tradePostIds: string[]): Promise<TradePostResponse[]>;
}

import { TradeStatus } from '../enums/trade-status.enum';
import { TradeAction } from '../enums/trade-action.enum';
import { Types } from 'mongoose';

export interface ITradePost {
  action: TradeAction;
  title: string;
  description?: string;
  price: number;
  authorId: Types.ObjectId;
  status: TradeStatus;
}

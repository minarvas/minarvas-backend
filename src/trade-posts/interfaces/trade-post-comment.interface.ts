import { Types } from 'mongoose';

export interface ITradePostComment {
  content: string;
  authorId: Types.ObjectId;
}

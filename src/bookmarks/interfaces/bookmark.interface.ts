import { Types } from 'mongoose';

export interface IBookmark {
  userId: Types.ObjectId;
  tradePostIds: Types.ObjectId[];
}

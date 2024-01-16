import { Types } from 'mongoose';
import { BookmarkResponse } from '../responses/bookmark.response';

export interface IBookmark {
  userId: Types.ObjectId;
  tradePostIds: string[];
}

export const IBookmarkService = Symbol('IBookmarkService');
export interface IBookmarkService {
  createBookmark(userId: string, tradePostId: string): Promise<BookmarkResponse>;
  getBookmark(userId: string): Promise<BookmarkResponse>;
  deleteBookmark(userId: string, tradePostId: string): Promise<BookmarkResponse>;
  deleteBookmarks(tradePostId: string): Promise<void>;
}

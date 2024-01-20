import { BookmarkResponse } from '../responses/bookmark.response';

export interface IBookmark {
  userId: string;
  tradePostIds: string[];
}

export const IBookmarkService = Symbol('IBookmarkService');
export interface IBookmarkService {
  createBookmark(userId: string, tradePostId: string): Promise<BookmarkResponse>;
  getBookmark(userId: string): Promise<BookmarkResponse>;
  deleteBookmark(userId: string, tradePostId: string): Promise<BookmarkResponse>;
  deleteBookmarks(tradePostId: string): Promise<void>;
}

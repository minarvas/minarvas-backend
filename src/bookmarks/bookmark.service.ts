import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { BookmarkLimitExceeded } from './exceptions/bookmark.exception';
import { IBookmarkService } from './interfaces/bookmark.interface';
import { BookmarkResponse } from './responses/bookmark.response';
import { Bookmark, BookmarkDocument } from './schemas/bookmark.schema';

@Injectable()
export class BookmarkService implements IBookmarkService {
  private readonly logger = new Logger(BookmarkService.name);
  private readonly bookmarkLimit = 10;

  constructor(@InjectModel(Bookmark.name) private readonly bookmarkModel: Model<BookmarkDocument>) {}
  async createBookmark(userId: string, tradePostId: string) {
    const existingBookmark = await this.bookmarkModel.findOne({ userId });
    const count = existingBookmark?.tradePosts?.length || 0;
    if (count >= this.bookmarkLimit) {
      this.logger.error('Bookmark limit exceeded');
      throw new BookmarkLimitExceeded();
    }

    const bookmark = await this.bookmarkModel.findOneAndUpdate(
      { userId },
      { $addToSet: { tradePosts: tradePostId } },
      { upsert: true, new: true },
    );

    this.logger.log(`Bookmark created for user ${userId}`);
    return new BookmarkResponse(bookmark);
  }

  async getBookmark(userId: string) {
    const bookmark = await this.bookmarkModel.findOne({ userId });

    if (!bookmark) {
      return new BookmarkResponse({ userId: new Types.ObjectId(userId), tradePostIds: [] });
    }

    return new BookmarkResponse(bookmark);
  }

  async deleteBookmark(userId: string, tradePostId: string) {
    const bookmark = await this.bookmarkModel.findOneAndUpdate({ userId }, { $pull: { tradePosts: tradePostId } });

    if (!bookmark) {
      return null;
    }

    return new BookmarkResponse(bookmark);
  }

  async deleteBookmarks(tradePostId: string) {
    await this.bookmarkModel.updateMany({}, { $pull: { tradePosts: tradePostId } });
  }
}

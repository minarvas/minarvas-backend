import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BookmarkLimitExceeded } from './exceptions/bookmark.exception';
import { CreateBookmarkInput } from './inputs/bookmark.input';
import { BookmarkResponse } from './responses/bookmark.response';
import { Bookmark, BookmarkDocument } from './schemas/bookmark.schema';

@Injectable()
export class BookmarkService {
  private readonly bookmarkLimit = 10;

  constructor(@InjectModel(Bookmark.name) private readonly bookmarkModel: Model<BookmarkDocument>) {}
  async createBookmark(userId: string, input: CreateBookmarkInput) {
    const existingBookmark = await this.bookmarkModel.findOne({ userId });
    const count = existingBookmark?.tradePosts?.length || 0;
    if (count >= this.bookmarkLimit) {
      throw new BookmarkLimitExceeded();
    }

    const bookmark = await this.bookmarkModel.findOneAndUpdate(
      { userId },
      { $addToSet: { tradePosts: input.tradePostId } },
      { upsert: true, new: true },
    );

    return new BookmarkResponse(bookmark);
  }

  async getBookmark(userId: string) {
    const bookmark = await this.bookmarkModel.findOne({ userId });
    return new BookmarkResponse(bookmark);
  }
}

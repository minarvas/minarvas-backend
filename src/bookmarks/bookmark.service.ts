import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bookmark, BookmarkDocument } from './schemas/bookmark.schema';

@Injectable()
export class BookmarkService {
  constructor(@InjectModel(Bookmark.name) private readonly bookmarkModel: Model<BookmarkDocument>) {}
}

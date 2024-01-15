import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookmarkResolver } from './bookmark.resolver';
import { BookmarkService } from './bookmark.service';
import { Bookmark, BookmarkSchema } from './schemas/bookmark.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Bookmark.name, schema: BookmarkSchema }])],
  providers: [BookmarkResolver, BookmarkService],
})
export class BookmarkModule {}

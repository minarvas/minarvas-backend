import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '../users/user.module';
import { BookmarkService } from './bookmark.service';
import { IBookmarkService } from './interfaces/bookmark.interface';
import { Bookmark, BookmarkSchema } from './schemas/bookmark.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Bookmark.name, schema: BookmarkSchema }]), UserModule],
  providers: [{ provide: IBookmarkService, useClass: BookmarkService }],
  exports: [IBookmarkService],
})
export class BookmarkModule {}

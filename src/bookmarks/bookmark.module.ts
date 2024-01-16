import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TradePostModule } from '../trade-posts/trade-post.module';
import { UserModule } from '../users/user.module';
import { BookmarkResolver } from './bookmark.resolver';
import { BookmarkService } from './bookmark.service';
import { Bookmark, BookmarkSchema } from './schemas/bookmark.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Bookmark.name, schema: BookmarkSchema }]), TradePostModule, UserModule],
  providers: [BookmarkResolver, BookmarkService],
})
export class BookmarkModule {}

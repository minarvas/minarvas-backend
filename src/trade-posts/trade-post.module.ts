import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookmarkModule } from '../bookmarks/bookmark.module';
import { NotificationModule } from '../notifications/notification.module';
import { UserModule } from '../users/user.module';
import { ITradePostService } from './interfaces/trade-post.interface';
import { TradePostCommentResolver } from './resolvers/trade-post-comment.resolver';
import { TradePostComment, TradePostCommentSchema } from './schemas/trade-post-comment.schema';
import { TradePost, TradePostSchema } from './schemas/trade-post.schema';
import { TradePostCommentService } from './services/trade-post-comment.service';
import { TradePostPaginationService } from './services/trade-post-pagination.service';
import { TradePostStorageService } from './services/trade-post-storage.service';
import { TradePostResolver } from './trade-post.resolver';
import { TradePostService } from './trade-post.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TradePost.name, schema: TradePostSchema },
      {
        name: TradePostComment.name,
        schema: TradePostCommentSchema,
      },
    ]),
    UserModule,
    BookmarkModule,
    NotificationModule,
  ],
  providers: [
    TradePostResolver,
    {
      provide: ITradePostService,
      useClass: TradePostService,
    },
    TradePostPaginationService,
    TradePostCommentService,
    TradePostCommentResolver,
    TradePostStorageService,
  ],
  exports: [ITradePostService],
})
export class TradePostModule {}

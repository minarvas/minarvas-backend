import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '../users/user.module';
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
  ],
  providers: [
    TradePostResolver,
    TradePostService,
    TradePostPaginationService,
    TradePostCommentService,
    TradePostCommentResolver,
    TradePostStorageService,
  ],
  exports: [TradePostService],
})
export class TradePostModule {}

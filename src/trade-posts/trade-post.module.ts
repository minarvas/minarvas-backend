import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TradePost, TradePostSchema } from './schemas/trade-post.schema';
import { TradePostResolver } from './trade-post.resolver';
import { TradePostService } from './trade-post.service';
import { UserModule } from '../users/user.module';
import { TradePostPaginationService } from './services/trade-post-pagination.service';
import { TradePostComment, TradePostCommentSchema } from './schemas/trade-post-comment.schema';
import { TradePostCommentService } from './services/trade-post-comment.service';
import { TradePostCommentResolver } from './resolvers/trade-post-comment.resolver';

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
  ],
})
export class TradePostModule {}

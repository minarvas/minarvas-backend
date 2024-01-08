import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TradePost, TradePostSchema } from './schemas/trade-post.schema';
import { TradePostResolver } from './trade-post.resolver';
import { TradePostService } from './trade-post.service';
import { UserModule } from '../users/user.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: TradePost.name, schema: TradePostSchema }]), UserModule],
  providers: [TradePostResolver, TradePostService],
})
export class TradePostModule {}
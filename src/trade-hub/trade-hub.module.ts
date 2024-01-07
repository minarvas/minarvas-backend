import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TradeHubSchema } from './schemas/trade-hub.schema';
import { TradeHubResolver } from './trade-hub.resolver';
import { TradeHubService } from './trade-hub.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'TradeHub', schema: TradeHubSchema }])],
  providers: [TradeHubResolver, TradeHubService],
})
export class TradeHubModule {}

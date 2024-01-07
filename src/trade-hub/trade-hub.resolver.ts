import { Resolver } from '@nestjs/graphql';
import { TradeHubService } from './trade-hub.service';

@Resolver('TradeHub')
export class TradeHubResolver {
  constructor(private readonly tradeHubService: TradeHubService) {}
}

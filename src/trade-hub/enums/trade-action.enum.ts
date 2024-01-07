import { registerEnumType } from '@nestjs/graphql';

export enum TradeAction {
  BUY = 'buy',
  SELL = 'sell',
}

registerEnumType(TradeAction, { name: 'TradeAction', description: 'Trade action like buy, sell' });

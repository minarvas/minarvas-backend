import { registerEnumType } from '@nestjs/graphql';

export enum TradePostErrorCode {
  TRADE_POST_NOT_FOUND = 'TRADE_POST_NOT_FOUND',
  TRADE_POST_CREATION_MAX_EXCEEDED = 'TRADE_POST_CREATION_MAX_EXCEEDED',
}

registerEnumType(TradePostErrorCode, { name: 'TradePostErrorCode', description: 'TradePost error codes' });

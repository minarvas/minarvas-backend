import { registerEnumType } from '@nestjs/graphql';

export enum TradeStatus {
  OPEN = 'open',
  IN_PROGRESS = 'in_progress',
  CLOSED = 'closed',
  COMPLETED = 'completed',
}

registerEnumType(TradeStatus, {
  name: 'TradeStatus',
  description: 'Trade status like open, in_progress, closed, completed',
});

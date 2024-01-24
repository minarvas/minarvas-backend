import { BaseException } from '../../common/exceptions/base.exception';
import { TradePostErrorCode } from '../enums/trade-post-error-code.enum';

export class TradePostNotFound extends BaseException {
  constructor(id: string) {
    super(`TradePost with id ${id} not found`, TradePostErrorCode.TRADE_POST_NOT_FOUND);
  }
}

export class TradePostCreationMaxExceeded extends BaseException {
  constructor() {
    super(`You can only create 5 trade post per hour`, TradePostErrorCode.TRADE_POST_CREATION_MAX_EXCEEDED);
  }
}

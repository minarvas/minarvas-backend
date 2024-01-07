import { TradePostErrorCode } from '../enums/trade-post-error-code.enum';
import { BaseException } from '../../common/exceptions/base.exception';

export class TradePostNotFound extends BaseException {
  constructor(id) {
    super(`TradePost with id ${id} not found`, TradePostErrorCode.TRADE_POST_NOT_FOUND);
  }
}

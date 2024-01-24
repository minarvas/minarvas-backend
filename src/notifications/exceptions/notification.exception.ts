import { BaseException } from 'src/common/exceptions/base.exception';
import { NotificationErrorCode } from '../enums/notification-error-code.enum';

export class CannotBuildMessage extends BaseException {
  constructor(type: string) {
    super(`Cannot build message for type ${type}`, NotificationErrorCode.CANNOT_BUILD_MESSAGE);
  }
}

import { BaseException } from '../../common/exceptions/base.exception';
import { AuthErrorCode } from '../enums/auth-error-code.enum';

export class UnauthorizedException extends BaseException {
  constructor() {
    super(`Unauthorized`, AuthErrorCode.UNAUTHORIZED);
  }
}

export class UnauthenticatedException extends BaseException {
  constructor() {
    super(`Unauthenticated`, AuthErrorCode.UNAUTHENTICATED);
  }
}

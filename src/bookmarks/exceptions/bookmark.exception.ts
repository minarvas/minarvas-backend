import { BaseException } from '../../common/exceptions/base.exception';
import { BookmarkErrorCode } from '../enums/bookmark-error-code.enum';

export class BookmarkLimitExceeded extends BaseException {
  constructor() {
    super(`You can only bookmark 10 trade post`, BookmarkErrorCode.BOOKMARK_LIMIT_EXCEEDED);
  }
}

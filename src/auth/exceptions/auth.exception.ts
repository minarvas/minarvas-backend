import {BaseException} from "../../common/exceptions/base.exception";
import {AuthErrorCode} from "../enums/auth-error-code.enum";

export class Unauthorized extends BaseException {
    constructor() {
        super(`Unauthorized`, AuthErrorCode.UNAUTHORIZED);
    }
}
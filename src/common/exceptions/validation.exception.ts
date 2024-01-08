import {BaseException} from "./base.exception";
import {ValidationError} from "class-validator";

export class ValidationException extends BaseException {
    constructor(error: ValidationError) {
        super(error.toString(), "BAD_USER_INPUT")
    }
}
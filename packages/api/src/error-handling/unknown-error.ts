import { AppDomain, DomainError, ErrorType, HttpStatusCode } from './error-code';

export class UnknownError extends DomainError {
    static errorCode = this.name;
    static type = ErrorType.UnknownError;
    static statusCode = HttpStatusCode.InternalServerError;
    static domain = AppDomain.Platform;

    constructor(readonly message: string) {
        super({
            errorCode: UnknownError.errorCode,
            type: UnknownError.type,
            statusCode: UnknownError.statusCode,
            domain: UnknownError.domain,
            detailedMessage: message,
        });
    }
}

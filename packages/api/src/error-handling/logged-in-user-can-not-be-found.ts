import { AppDomain, DomainError, ErrorType, HttpStatusCode } from './error-code';

export class LoggedInUserCanNotBeFound extends DomainError {
    static errorCode = this.name;
    static type = ErrorType.UnauthorizedError;
    static statusCode = HttpStatusCode.Unauthorized;

    constructor() {
        super({
            errorCode: LoggedInUserCanNotBeFound.errorCode,
            type: LoggedInUserCanNotBeFound.type,
            statusCode: LoggedInUserCanNotBeFound.statusCode,
            domain: AppDomain.Platform,
            detailedMessage: `Logged in user can not be found. Please login again.`,
        });
    }
}

import {
    AppDomain,
    DomainError,
    ErrorType,
    HttpStatusCode,
} from '../../../../error-handling/error-code';

export class FailedToSetPasswordError extends DomainError {
    static readonly errorCode = this.name;
    static readonly type = ErrorType.IdentityProviderError;
    static readonly statusCode = HttpStatusCode.InternalServerError;
    static readonly domain = AppDomain.Platform;

    constructor() {
        super({
            errorCode: FailedToSetPasswordError.errorCode,
            type: FailedToSetPasswordError.type,
            statusCode: FailedToSetPasswordError.statusCode,
            domain: FailedToSetPasswordError.domain,
            detailedMessage: `Failed to set password`,
        });
    }
}

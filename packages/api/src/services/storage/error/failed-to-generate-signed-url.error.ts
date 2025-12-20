import {
    AppDomain,
    DomainError,
    ErrorType,
    HttpStatusCode,
} from '../../../error-handling/error-code';

export class FailedToGenerateSignedUrlError extends DomainError {
    static readonly errorCode = this.name;
    static readonly type = ErrorType.InternalError;
    static readonly statusCode = HttpStatusCode.InternalServerError;
    static readonly domain = AppDomain.Platform;

    constructor(error: unknown) {
        super({
            errorCode: FailedToGenerateSignedUrlError.errorCode,
            type: FailedToGenerateSignedUrlError.type,
            statusCode: FailedToGenerateSignedUrlError.statusCode,
            domain: FailedToGenerateSignedUrlError.domain,
            detailedMessage: `Failed to generate signed url: ${error}`,
        });
    }
}

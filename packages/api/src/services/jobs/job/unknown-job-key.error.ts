import {
    AppDomain,
    DomainError,
    ErrorType,
    HttpStatusCode,
} from '../../../error-handling/error-code';

export class UnknownJobKeyError extends DomainError {
    static readonly errorCode = this.name;
    static readonly type = ErrorType.ConfigurationError;
    static readonly statusCode = HttpStatusCode.InternalServerError;
    static readonly domain = AppDomain.Platform;

    constructor(jobKey: string) {
        super({
            errorCode: UnknownJobKeyError.errorCode,
            type: UnknownJobKeyError.type,
            statusCode: UnknownJobKeyError.statusCode,
            domain: UnknownJobKeyError.domain,
            detailedMessage: `No Job found for key: ${jobKey}`,
        });
    }
}

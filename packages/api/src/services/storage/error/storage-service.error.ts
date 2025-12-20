import {
    AppDomain,
    DomainError,
    ErrorType,
    HttpStatusCode,
} from '../../../error-handling/error-code';

export class StorageServiceError extends DomainError {
    static readonly errorCode = this.name;
    static readonly type = ErrorType.InternalError;
    static readonly statusCode = HttpStatusCode.InternalServerError;
    static readonly domain = AppDomain.Platform;

    constructor(error: unknown) {
        super({
            errorCode: StorageServiceError.errorCode,
            type: StorageServiceError.type,
            statusCode: StorageServiceError.statusCode,
            domain: StorageServiceError.domain,
            detailedMessage: `An error occurred in the storage service: ${error}`,
        });
    }
}

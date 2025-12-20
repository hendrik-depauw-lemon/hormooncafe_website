import { UUID } from '@boostercloud/framework-types';

import {
    AppDomain,
    DomainError,
    ErrorType,
    HttpStatusCode,
} from '../../../error-handling/error-code';

export class FailedToDownloadFileError extends DomainError {
    static readonly errorCode = this.name;
    static readonly type = ErrorType.BusinessValidationError;
    static readonly statusCode = HttpStatusCode.BadRequest;
    static readonly domain = AppDomain.File;

    constructor(fileId: UUID, storageKey: string, error: string) {
        super({
            errorCode: FailedToDownloadFileError.errorCode,
            type: FailedToDownloadFileError.type,
            statusCode: FailedToDownloadFileError.statusCode,
            domain: FailedToDownloadFileError.domain,
            detailedMessage: `Failed to download file with id ${fileId} and storage key ${storageKey} from storage provider: ${error}`,
        });
    }
}

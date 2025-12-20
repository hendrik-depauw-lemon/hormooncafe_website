import { UUID } from '@boostercloud/framework-types';

import {
    AppDomain,
    DomainError,
    ErrorType,
    HttpStatusCode,
} from '../../../error-handling/error-code';

export class FileDoesNotExistWithStorageProvider extends DomainError {
    static readonly errorCode = this.name;
    static readonly type = ErrorType.BusinessValidationError;
    static readonly statusCode = HttpStatusCode.BadRequest;
    static readonly domain = AppDomain.File;

    constructor(fileId: UUID, storageKey: string) {
        super({
            errorCode: FileDoesNotExistWithStorageProvider.errorCode,
            type: FileDoesNotExistWithStorageProvider.type,
            statusCode: FileDoesNotExistWithStorageProvider.statusCode,
            domain: FileDoesNotExistWithStorageProvider.domain,
            detailedMessage: `File with id ${fileId} and storage key ${storageKey} does not exist`,
        });
    }
}

import { UUID } from '@boostercloud/framework-types';
import { HttpStatusCode } from '@lemoncompanies/booster-framework-provider-micro/dist/library/api-adapter';

import { AppDomain, DomainError, ErrorType } from '../../../error-handling/error-code';

export class JobCouldNotBeCancelledError extends DomainError {
    static readonly errorCode = this.name;
    static readonly type = ErrorType.BusinessValidationError;
    static readonly statusCode = HttpStatusCode.BadRequest;
    static readonly domain = AppDomain.Platform;

    constructor(scheduledJobId: UUID) {
        super({
            errorCode: JobCouldNotBeCancelledError.errorCode,
            type: JobCouldNotBeCancelledError.type,
            statusCode: JobCouldNotBeCancelledError.statusCode,
            domain: JobCouldNotBeCancelledError.domain,
            detailedMessage: `Job with id ${scheduledJobId} could not be cancelled`,
        });
    }
}

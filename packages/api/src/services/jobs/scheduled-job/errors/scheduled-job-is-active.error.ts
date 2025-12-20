import { UUID } from '@boostercloud/framework-types';
import { HttpStatusCode } from '@lemoncompanies/booster-framework-provider-micro/dist/library/api-adapter';

import { AppDomain, DomainError, ErrorType } from '../../../../error-handling/error-code';

export class ScheduledJobIsActiveError extends DomainError {
    static readonly errorCode = this.name;
    static readonly type = ErrorType.BusinessValidationError;
    static readonly statusCode = HttpStatusCode.BadRequest;
    static readonly domain = AppDomain.Platform;

    constructor(scheduledJobId: UUID) {
        super({
            errorCode: ScheduledJobIsActiveError.errorCode,
            type: ScheduledJobIsActiveError.type,
            statusCode: ScheduledJobIsActiveError.statusCode,
            domain: ScheduledJobIsActiveError.domain,
            detailedMessage: `Scheduled job with id ${scheduledJobId} is active`,
        });
    }
}

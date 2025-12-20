import { UUID } from '@boostercloud/framework-types';
import { HttpStatusCode } from '@lemoncompanies/booster-framework-provider-micro/dist/library/api-adapter';

import { AppDomain, DomainError, ErrorType } from '../../../../error-handling/error-code';

export class ScheduledJobIsInactiveError extends DomainError {
    static readonly errorCode = this.name;
    static readonly type = ErrorType.BusinessValidationError;
    static readonly statusCode = HttpStatusCode.BadRequest;
    static readonly domain = AppDomain.Platform;

    constructor(scheduledJobId: UUID) {
        super({
            errorCode: ScheduledJobIsInactiveError.errorCode,
            type: ScheduledJobIsInactiveError.type,
            statusCode: ScheduledJobIsInactiveError.statusCode,
            domain: ScheduledJobIsInactiveError.domain,
            detailedMessage: `Scheduled job with id ${scheduledJobId} is inactive`,
        });
    }
}

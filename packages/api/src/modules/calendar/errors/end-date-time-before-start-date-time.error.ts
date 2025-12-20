import {
    AppDomain,
    DomainError,
    ErrorType,
    HttpStatusCode,
} from '../../../error-handling/error-code';

export class EndDateTimeBeforeStartDateTimeError extends DomainError {
    static readonly errorCode = this.name;
    static readonly type = ErrorType.BusinessValidationError;
    static readonly statusCode = HttpStatusCode.BadRequest;
    static readonly domain = AppDomain.Calendar;

    constructor() {
        super({
            errorCode: EndDateTimeBeforeStartDateTimeError.errorCode,
            type: EndDateTimeBeforeStartDateTimeError.type,
            statusCode: EndDateTimeBeforeStartDateTimeError.statusCode,
            domain: EndDateTimeBeforeStartDateTimeError.domain,
            detailedMessage: `End date-time must be after start date-time`,
        });
    }
}

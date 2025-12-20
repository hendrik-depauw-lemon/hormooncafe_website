import { AppDomain, DomainError, ErrorType, HttpStatusCode } from './error-code';

export class FieldNotBlankError extends DomainError {
    static errorCode = this.name;
    static type = ErrorType.BusinessValidationError;
    static statusCode = HttpStatusCode.BadRequest;
    readonly messages: string[];

    constructor(
        readonly fields: string[],
        domain: AppDomain,
    ) {
        const messages = fields.map((field) => `${field} must not be empty`);
        super({
            errorCode: FieldNotBlankError.errorCode,
            type: FieldNotBlankError.type,
            statusCode: FieldNotBlankError.statusCode,
            domain: domain,
            detailedMessage: `Validation errors: ${messages.join(', ')}`,
        });
        this.messages = messages;
    }
}

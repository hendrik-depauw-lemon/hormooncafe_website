import { BoosterDomainError } from '@lemoncompanies/booster-framework-provider-micro/dist/library/api-adapter';

export enum AppDomain {
    Platform = 'Platform',
    File = 'File',
    View = 'View',
    Calendar = 'Calendar',
}

export enum ErrorType {
    BusinessValidationError = 'BusinessValidationError',
    NotFoundError = 'NotFoundError',
    InternalError = 'InternalError',
    UnauthorizedError = 'UnauthorizedError',
    UnknownError = 'UnknownError',
    ConfigurationError = 'ConfigurationError',
    IdentityProviderError = 'IdentityProviderError',
    MailProviderError = 'MailProviderError',
    ConflictError = 'ConflictError',
}

export enum HttpStatusCode {
    BadRequest = 400, // Invalid client request
    Unauthorized = 401, // Authentication required
    Forbidden = 403, // Access to resource is forbidden
    NotFound = 404, // Resource not found
    Conflict = 409, // Request conflicts with server state
    UnprocessableEntity = 422, // Validation error or semantic issue
    InternalServerError = 500, // Generic server error
    NotImplemented = 501, // Functionality not supported
    BadGateway = 502, // Invalid response from upstream server
    ServiceUnavailable = 503, // Server is currently unavailable
    GatewayTimeout = 504, // Upstream server timed out
}

export class DomainError extends BoosterDomainError {
    readonly errorCode!: string;
    readonly type!: ErrorType;
    readonly statusCode!: HttpStatusCode;
    readonly domain!: AppDomain;
    readonly detailedMessage!: string;

    constructor(error: {
        errorCode: string;
        type: ErrorType;
        statusCode: HttpStatusCode;
        domain: AppDomain;
        detailedMessage: string;
    }) {
        super(error.errorCode, error.type, error.statusCode, error.domain, error.detailedMessage);
        Object.assign(this, error);
    }
}

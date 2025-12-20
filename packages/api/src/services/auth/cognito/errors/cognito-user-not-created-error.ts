import {
    AppDomain,
    DomainError,
    ErrorType,
    HttpStatusCode,
} from '../../../../error-handling/error-code';

export class CognitoUserNotCreatedError extends DomainError {
    static readonly errorCode = this.name;
    static readonly type = ErrorType.IdentityProviderError;
    static readonly statusCode = HttpStatusCode.InternalServerError;
    static readonly domain = AppDomain.Platform;

    constructor(email: string) {
        super({
            errorCode: CognitoUserNotCreatedError.errorCode,
            type: CognitoUserNotCreatedError.type,
            statusCode: CognitoUserNotCreatedError.statusCode,
            domain: CognitoUserNotCreatedError.domain,
            detailedMessage: `User with email ${email} was not created in Cognito`,
        });
    }
}

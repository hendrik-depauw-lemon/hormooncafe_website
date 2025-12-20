import {
    AppDomain,
    DomainError,
    ErrorType,
    HttpStatusCode,
} from '../../../../error-handling/error-code';

export class CognitoUserNotFoundError extends DomainError {
    static readonly errorCode = this.name;
    static readonly type = ErrorType.IdentityProviderError;
    static readonly statusCode = HttpStatusCode.InternalServerError;
    static readonly domain = AppDomain.Platform;

    constructor(username: string) {
        super({
            errorCode: CognitoUserNotFoundError.errorCode,
            type: CognitoUserNotFoundError.type,
            statusCode: CognitoUserNotFoundError.statusCode,
            domain: CognitoUserNotFoundError.domain,
            detailedMessage: `User with username '${username}' was not found in Cognito`,
        });
    }
}

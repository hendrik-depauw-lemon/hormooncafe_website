import {
    AppDomain,
    DomainError,
    ErrorType,
    HttpStatusCode,
} from '../../../../error-handling/error-code';

export class CognitoUserNotDeletedError extends DomainError {
    static readonly errorCode = this.name;
    static readonly type = ErrorType.IdentityProviderError;
    static readonly statusCode = HttpStatusCode.InternalServerError;
    static readonly domain = AppDomain.Platform;

    constructor(username: string) {
        super({
            errorCode: CognitoUserNotDeletedError.errorCode,
            type: CognitoUserNotDeletedError.type,
            statusCode: CognitoUserNotDeletedError.statusCode,
            domain: CognitoUserNotDeletedError.domain,
            detailedMessage: `User with username '${username}' was not deleted in Cognito`,
        });
    }
}

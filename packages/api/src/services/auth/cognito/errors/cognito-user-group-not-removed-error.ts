import {
    AppDomain,
    DomainError,
    ErrorType,
    HttpStatusCode,
} from '../../../../error-handling/error-code';
import { Role } from '../../../../modules/system/roles/role.enum';

export class CognitoUserGroupNotRemovedError extends DomainError {
    static readonly errorCode = this.name;
    static readonly type = ErrorType.IdentityProviderError;
    static readonly statusCode = HttpStatusCode.InternalServerError;
    static readonly domain = AppDomain.Platform;

    constructor(username: string, role: Role) {
        super({
            errorCode: CognitoUserGroupNotRemovedError.errorCode,
            type: CognitoUserGroupNotRemovedError.type,
            statusCode: CognitoUserGroupNotRemovedError.statusCode,
            domain: CognitoUserGroupNotRemovedError.domain,
            detailedMessage: `Role ${role} was not removed from user ${username} in Cognito`,
        });
    }
}

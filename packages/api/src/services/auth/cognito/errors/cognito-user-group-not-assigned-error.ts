import {
    AppDomain,
    DomainError,
    ErrorType,
    HttpStatusCode,
} from '../../../../error-handling/error-code';
import { Role } from '../../../../modules/system/roles/role.enum';

export class CognitoUserGroupNotAssignedError extends DomainError {
    static readonly errorCode = this.name;
    static readonly type = ErrorType.IdentityProviderError;
    static readonly statusCode = HttpStatusCode.InternalServerError;
    static readonly domain = AppDomain.Platform;

    constructor(username: string, role: Role) {
        super({
            errorCode: CognitoUserGroupNotAssignedError.errorCode,
            type: CognitoUserGroupNotAssignedError.type,
            statusCode: CognitoUserGroupNotAssignedError.statusCode,
            domain: CognitoUserGroupNotAssignedError.domain,
            detailedMessage: `Role ${role} was not assigned to user ${username} in Cognito`,
        });
    }
}

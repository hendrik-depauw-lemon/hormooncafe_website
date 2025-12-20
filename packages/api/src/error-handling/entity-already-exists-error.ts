import { Class, UUID } from '@boostercloud/framework-types';

import { AppDomain, DomainError, ErrorType, HttpStatusCode } from './error-code';

export class EntityAlreadyExistsError extends DomainError {
    static errorCode = this.name;
    static type = ErrorType.ConflictError;
    static statusCode = HttpStatusCode.Conflict;

    constructor(
        entity: Class<object>,
        readonly id: UUID | string,
        domain: AppDomain,
    ) {
        super({
            errorCode: EntityAlreadyExistsError.errorCode,
            type: EntityAlreadyExistsError.type,
            statusCode: EntityAlreadyExistsError.statusCode,
            domain: domain,
            detailedMessage: `${entity.name} with id '${id.toString()}' already exists.`,
        });
    }
}

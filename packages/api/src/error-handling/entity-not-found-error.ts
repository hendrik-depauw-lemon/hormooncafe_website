import { Class, UUID } from '@boostercloud/framework-types';

import { AppDomain, DomainError, ErrorType, HttpStatusCode } from './error-code';

export class EntityNotFoundError extends DomainError {
    static errorCode = this.name;
    static type = ErrorType.NotFoundError;
    static statusCode = HttpStatusCode.NotFound;

    constructor(
        entity: Class<object>,
        readonly id: UUID,
        domain: AppDomain,
    ) {
        super({
            errorCode: EntityNotFoundError.errorCode,
            type: EntityNotFoundError.type,
            statusCode: EntityNotFoundError.statusCode,
            domain: domain,
            detailedMessage: `${entity.name} with id '${id.toString()}' is not found in domain '${domain}'.`,
        });
    }
}

import { Class, UUID } from '@boostercloud/framework-types';

import { AppDomain, DomainError, ErrorType, HttpStatusCode } from './error-code';

export class EntitiesNotFoundError extends DomainError {
    static errorCode = this.name;
    static type = ErrorType.NotFoundError;
    static statusCode = HttpStatusCode.NotFound;

    constructor(
        entity: Class<object>,
        readonly ids: UUID[],
        domain: AppDomain,
    ) {
        super({
            errorCode: EntitiesNotFoundError.errorCode,
            type: EntitiesNotFoundError.type,
            statusCode: EntitiesNotFoundError.statusCode,
            domain: domain,
            detailedMessage: `${entity.name} with ids '${ids.join(',')}' are not found in domain '${domain}'.`,
        });
    }
}

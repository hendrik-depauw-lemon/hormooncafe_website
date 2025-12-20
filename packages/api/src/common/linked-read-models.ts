import {
    Class,
    EntityInterface,
    ReadModelAction,
    ReadModelInterface,
    UUID,
} from '@boostercloud/framework-types';

import { AppDomain } from '../error-handling/error-code';
import { EntityValidators } from './validators/entity-validators';

type LinkedEntityProjectionResult<TReadModel extends ReadModelInterface> =
    | TReadModel
    | ReadModelAction.Nothing;

type LinkedEntityProjectionFunction<
    TEntity extends EntityInterface,
    TReadModel extends ReadModelInterface,
> = (
    entity?: TEntity,
    readModelId?: UUID,
    readModel?: TReadModel,
) => LinkedEntityProjectionResult<TReadModel> | Promise<LinkedEntityProjectionResult<TReadModel>>;

export async function chainProjections<TReadModel extends ReadModelInterface>(
    readModel: TReadModel,
    ...projections: Array<(readModel: TReadModel) => Promise<TReadModel>>
): Promise<LinkedEntityProjectionResult<TReadModel>> {
    let currentReadModel = readModel;

    for (const projection of projections) {
        currentReadModel = await projection(currentReadModel);
    }

    return currentReadModel;
}

export function projectLinkedEntity<
    TEntity extends EntityInterface,
    TReadModel extends ReadModelInterface,
>(params: {
    entityClass: Class<TEntity>;
    entityId: UUID | undefined;
    oldEntityId: UUID | undefined;
    projectionFunction: LinkedEntityProjectionFunction<TEntity, TReadModel>;
}) {
    const { entityClass, entityId, oldEntityId, projectionFunction } = params;
    return async (readModel: TReadModel) => {
        if (entityId === oldEntityId) return readModel;
        const linkedEntity = entityId
            ? await EntityValidators.entityExists(entityClass, entityId, AppDomain.Platform)
            : undefined;
        const projectionResult = await projectionFunction(linkedEntity, readModel.id, readModel);
        if (projectionResult === ReadModelAction.Nothing) return readModel;
        return projectionResult;
    };
}

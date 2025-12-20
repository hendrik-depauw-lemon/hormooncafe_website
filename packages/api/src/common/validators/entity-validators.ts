import { Booster } from '@boostercloud/framework-core';
import { Class, EntityInterface, UUID } from '@boostercloud/framework-types';

import { EntitiesNotFoundError } from '../../error-handling/entities-not-found-error';
import { EntityAlreadyExistsError } from '../../error-handling/entity-already-exists-error';
import { EntityNotFoundError } from '../../error-handling/entity-not-found-error';
import { AppDomain } from '../../error-handling/error-code';
import { BaseEntity } from '../base-models';

export class EntityValidators {
    static async entityExists<TEntity extends EntityInterface>(
        entityType: Class<TEntity>,
        entityID: UUID,
        appDomain: AppDomain,
    ): Promise<TEntity> {
        const entity = await Booster.entity(entityType, entityID);
        if (!entity) throw new EntityNotFoundError(entityType, entityID, appDomain);
        return entity;
    }

    static async entityDoesNotExist<TEntity extends EntityInterface>(
        entityType: Class<TEntity>,
        entityID: UUID,
        appDomain: AppDomain,
    ): Promise<void> {
        const entity = await Booster.entity(entityType, entityID);

        if (entity) {
            throw new EntityAlreadyExistsError(entityType, entityID, appDomain);
        }
    }

    static async entitiesExist<TEntity extends EntityInterface>(
        entityType: Class<TEntity>,
        entityIDs: UUID[],
        appDomain: AppDomain,
    ): Promise<TEntity[]> {
        const entities = await Promise.all(
            entityIDs.map(async (entityID) => ({
                id: entityID,
                entity: await Booster.entity(entityType, entityID),
            })),
        );

        const missingEntityIDs = entities.filter(({ entity }) => !entity).map(({ id }) => id);

        if (missingEntityIDs.length > 0) {
            throw new EntitiesNotFoundError(entityType, missingEntityIDs, appDomain);
        }

        return entities.filter(({ entity }) => entity).map(({ entity }) => entity) as TEntity[];
    }

    static async entityIsNotDeleted<TEntity extends BaseEntity<TEntity>>(
        entityType: Class<TEntity>,
        entityID: UUID,
        appDomain: AppDomain,
    ): Promise<TEntity> {
        const entity = await this.entityExists(entityType, entityID, appDomain);

        if (entity.deletedAt) {
            throw new EntityNotFoundError(entityType, entityID, appDomain);
        }

        return entity;
    }

    static async entitiesAreNotDeleted<TEntity extends BaseEntity<TEntity>>(
        entityType: Class<TEntity>,
        entityIDs: UUID[],
        appDomain: AppDomain,
    ): Promise<TEntity[]> {
        const entities = await this.entitiesExist(entityType, entityIDs, appDomain);

        const deletedEntities = entities.filter((entity) => entity.deletedAt);

        if (deletedEntities.length > 0) {
            throw new EntitiesNotFoundError(
                entityType,
                deletedEntities.map((entity) => entity.id),
                appDomain,
            );
        }

        return entities;
    }
}

import { Booster } from '@boostercloud/framework-core';
import {
    Class,
    EntityInterface,
    ProjectionMetadata,
    ReadModelAction,
    ReadModelInterface,
    ReadModelJoinKeyFunction,
    UUID,
} from '@boostercloud/framework-types';

type JoinKeyType<TEntity extends EntityInterface, TReadModel extends ReadModelInterface> =
    | keyof TEntity
    | ReadModelJoinKeyFunction<TEntity, TReadModel>;

/**
 * Decorator to register a read model method as a projection
 * for a specific entity
 *
 * @param originEntity The entity that this method will react to
 * @param joinKey
 * @param unProject
 */
export function ProjectsLinkedEntity<
    TEntity extends EntityInterface,
    TReadModel extends ReadModelInterface,
>(
    originEntity: Class<TEntity>,
    readModel: Class<TReadModel>,
    joinKey: JoinKeyType<TEntity, TReadModel>,
): (
    readModelClass: Class<TReadModel>,
    methodName: string,
    methodDescriptor: ProjectionMethod<TEntity, TReadModel>,
) => void {
    return (readModelClass, methodName) => {
        const projectionMetadata = {
            joinKey: joinKey,
            class: readModelClass,
            methodName: methodName,
        } as ProjectionMetadata<EntityInterface, ReadModelInterface>;
        registerProjection(originEntity.name, projectionMetadata);
    };
}

function registerProjection(
    originName: string,
    projectionMetadata: ProjectionMetadata<EntityInterface, ReadModelInterface>,
): void {
    Booster.configureCurrentEnv((config): void => {
        configure(originName, projectionMetadata, config.projections);
    });
}

function configure(
    originName: string,
    projectionMetadata: ProjectionMetadata<EntityInterface, ReadModelInterface>,
    configuration: Record<string, Array<ProjectionMetadata<EntityInterface, ReadModelInterface>>>,
): void {
    const entityProjections = configuration[originName] || [];
    if (entityProjections.indexOf(projectionMetadata) < 0) {
        // Skip duplicate registrations
        entityProjections.push(projectionMetadata);
        configuration[originName] = entityProjections;
    }
}

type ProjectionMethod<
    TEntity extends EntityInterface,
    TReadModel extends ReadModelInterface,
> = TypedPropertyDescriptor<
    (
        entity: TEntity | undefined,
        readModelID: UUID | undefined,
        readModel: TReadModel | undefined,
    ) => TReadModel | ReadModelAction.Nothing
>;

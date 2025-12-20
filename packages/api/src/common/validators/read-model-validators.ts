import { Booster } from '@boostercloud/framework-core';
import { Class, ReadModelInterface, UUID } from '@boostercloud/framework-types';

import { EntitiesNotFoundError } from '../../error-handling/entities-not-found-error';
import { EntityNotFoundError } from '../../error-handling/entity-not-found-error';
import { AppDomain } from '../../error-handling/error-code';

export class ReadModelValidators {
    static async ReadModelExists<TReadModel extends ReadModelInterface>(
        readModelType: Class<TReadModel>,
        readModelID: UUID,
        appDomain: AppDomain,
    ): Promise<TReadModel> {
        const readModel = await Booster.readModel(readModelType)
            // Booster changed typings of the filter and now they don't work with generics anymore
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            .filter({ id: { eq: readModelID } })
            .searchOne();
        if (!readModel) throw new EntityNotFoundError(readModelType, readModelID, appDomain);
        return readModel;
    }

    static async ReadModelsExist<TReadModel extends ReadModelInterface>(
        readModelType: Class<TReadModel>,
        readModelIDs: UUID[],
        appDomain: AppDomain,
    ): Promise<TReadModel[]> {
        const models = await Promise.all(
            readModelIDs.map(async (readModelID) => ({
                id: readModelID,
                readModel: await Booster.readModel(readModelType)
                    // Booster changed typings of the filter and now they don't work with generics anymore
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    .filter({ id: { eq: readModelID } })
                    .searchOne(),
            })),
        );

        const missingReadModelIDs = models
            .filter(({ readModel }) => !readModel)
            .map(({ id }) => id);

        if (missingReadModelIDs.length > 0) {
            throw new EntitiesNotFoundError(readModelType, missingReadModelIDs, appDomain);
        }

        return models
            .filter(({ readModel }) => readModel)
            .map(({ readModel }) => readModel) as TReadModel[];
    }
}

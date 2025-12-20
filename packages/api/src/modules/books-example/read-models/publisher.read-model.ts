import { Projects, ReadModel } from '@boostercloud/framework-core';
import { ProjectionResult, ReadModelAction } from '@boostercloud/framework-types';

import { BaseReadModel } from '../../../common/base-models';
import { Address } from '../../../services/location/address-model';
import { Publisher } from '../entities/publisher.entity';

@ReadModel({ authorize: 'all' })
export class PublisherReadModel extends BaseReadModel<PublisherReadModel> {
    readonly name!: string;
    readonly address?: Address;

    readonly createdAt!: Date;
    readonly updatedAt!: Date;

    @Projects(Publisher, 'id')
    public static projectPublisher(entity: Publisher): ProjectionResult<PublisherReadModel> {
        if (entity.deletedAt) return ReadModelAction.Delete;

        return new PublisherReadModel({
            id: entity.id,
            name: entity.name,
            address: entity.address,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        });
    }
}

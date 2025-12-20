import { Entity, Reduces } from '@boostercloud/framework-core';

import { BaseEntity } from '../../../common/base-models';
import { Address } from '../../../services/location/address-model';
import { PublisherAdded } from '../events/publisher-added.event';
import { PublisherChanged } from '../events/publisher-changed.event';
import { PublisherRemoved } from '../events/publisher-removed.event';

@Entity
export class Publisher extends BaseEntity<Publisher> {
    readonly name!: string;
    readonly address?: Address;

    @Reduces(PublisherAdded)
    public static reducePublisherAdded(event: PublisherAdded): Publisher {
        return new Publisher({
            id: event.id,
            name: event.name,
            address: event.address,
            createdAt: event.eventTime,
            updatedAt: event.eventTime,
        });
    }

    @Reduces(PublisherChanged)
    public static reducePublisherChanged(
        event: PublisherChanged,
        currentPublisher: Publisher,
    ): Publisher {
        return new Publisher({
            ...currentPublisher,
            name: event.name,
            address: event.address,
            updatedAt: event.eventTime,
        });
    }

    @Reduces(PublisherRemoved)
    public static reducePublisherRemoved(
        event: PublisherRemoved,
        currentPublisher: Publisher,
    ): Publisher {
        return new Publisher({
            ...currentPublisher,
            deletedAt: event.eventTime,
        });
    }
}

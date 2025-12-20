import { Event } from '@boostercloud/framework-core';
import { UUID } from '@boostercloud/framework-types';

import { BaseEvent } from '../../../common/base-models';
import { Address } from '../../../services/location/address-model';

@Event
export class PublisherAdded extends BaseEvent<PublisherAdded> {
    readonly id!: UUID;
    readonly name!: string;
    readonly address?: Address;

    public entityID(): UUID {
        return this.id;
    }
}

import { Event } from '@boostercloud/framework-core';
import { UUID } from '@boostercloud/framework-types';

import { BaseEvent } from '../../../common/base-models';

@Event
export class PublisherRemoved extends BaseEvent<PublisherRemoved> {
    readonly id!: UUID;

    public entityID(): UUID {
        return this.id;
    }
}

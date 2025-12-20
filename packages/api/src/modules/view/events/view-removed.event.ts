import { Event } from '@boostercloud/framework-core';
import { UUID } from '@boostercloud/framework-types';

import { BaseEvent } from '../../../common/base-models';

@Event
export class ViewRemoved extends BaseEvent<ViewRemoved> {
    readonly id!: UUID;

    public entityID(): UUID {
        return this.id;
    }
}

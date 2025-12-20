import { Event } from '@boostercloud/framework-core';
import { UUID } from '@boostercloud/framework-types';

import { BaseEvent } from '../../../../common/base-models';

@Event
export class ScheduledJobActivated extends BaseEvent<ScheduledJobActivated> {
    readonly id!: UUID;

    public entityID(): UUID {
        return this.id;
    }
}

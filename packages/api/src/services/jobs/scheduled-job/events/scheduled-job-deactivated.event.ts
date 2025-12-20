import { Event } from '@boostercloud/framework-core';
import { UUID } from '@boostercloud/framework-types';

import { BaseEvent } from '../../../../common/base-models';

@Event
export class ScheduledJobDeactivated extends BaseEvent<ScheduledJobDeactivated> {
    readonly id!: UUID;

    public entityID(): UUID {
        return this.id;
    }
}

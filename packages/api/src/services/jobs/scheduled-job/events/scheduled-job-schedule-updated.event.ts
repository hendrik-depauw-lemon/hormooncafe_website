import { Event } from '@boostercloud/framework-core';
import { UUID } from '@boostercloud/framework-types';

import { BaseEvent } from '../../../../common/base-models';

@Event
export class ScheduledJobScheduleUpdated extends BaseEvent<ScheduledJobScheduleUpdated> {
    readonly id!: UUID;
    readonly schedule!: string;

    public entityID(): UUID {
        return this.id;
    }
}

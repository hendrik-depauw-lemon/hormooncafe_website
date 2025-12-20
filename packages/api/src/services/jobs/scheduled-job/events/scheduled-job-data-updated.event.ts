import { Event } from '@boostercloud/framework-core';
import { UUID } from '@boostercloud/framework-types';

import { BaseEvent } from '../../../../common/base-models';

@Event
export class ScheduledJobDataUpdated extends BaseEvent<ScheduledJobDataUpdated> {
    readonly id!: UUID;
    readonly data?: string;

    public entityID(): UUID {
        return this.id;
    }
}

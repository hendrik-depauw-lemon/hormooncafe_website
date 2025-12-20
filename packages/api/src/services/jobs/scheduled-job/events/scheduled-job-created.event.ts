import { Event } from '@boostercloud/framework-core';
import { UUID } from '@boostercloud/framework-types';

import { BaseEvent } from '../../../../common/base-models';
import { JobKey } from '../../job/job-key';

@Event
export class ScheduledJobCreated extends BaseEvent<ScheduledJobCreated> {
    readonly id!: UUID;
    readonly name!: string;
    readonly schedule!: string;
    readonly jobKey!: JobKey;

    public entityID(): UUID {
        return this.id;
    }
}

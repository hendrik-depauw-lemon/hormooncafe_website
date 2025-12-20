import { Event } from '@boostercloud/framework-core';
import { UUID } from '@boostercloud/framework-types';

import { BaseEvent } from '../../../../common/base-models';
import { JobKey } from '../../job/job-key';

@Event
export class JobExecutionCreated extends BaseEvent<JobExecutionCreated> {
    readonly id!: UUID;
    readonly name!: string;
    readonly scheduledJobId?: UUID;
    readonly jobKey!: JobKey;
    readonly data?: string;

    public entityID(): UUID {
        return this.id;
    }
}

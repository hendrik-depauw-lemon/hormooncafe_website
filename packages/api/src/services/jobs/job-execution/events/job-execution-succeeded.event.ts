import { Event } from '@boostercloud/framework-core';
import { UUID } from '@boostercloud/framework-types';

import { BaseEvent } from '../../../../common/base-models';

@Event
export class JobExecutionSucceeded extends BaseEvent<JobExecutionSucceeded> {
    readonly id!: UUID;
    readonly summary?: string;

    public entityID(): UUID {
        return this.id;
    }
}

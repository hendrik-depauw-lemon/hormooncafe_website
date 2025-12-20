import { Event } from '@boostercloud/framework-core';
import { UUID } from '@boostercloud/framework-types';

import { BaseEvent } from '../../../../common/base-models';

@Event
export class JobExecutionMessageAdded extends BaseEvent<JobExecutionMessageAdded> {
    readonly id!: UUID;
    readonly message!: string;

    public entityID(): UUID {
        return this.id;
    }
}

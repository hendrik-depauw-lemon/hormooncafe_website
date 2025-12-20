import { Event } from '@boostercloud/framework-core';
import { UUID } from '@boostercloud/framework-types';

import { BaseEvent } from '../../../../common/base-models';

@Event
export class JobExecutionItemProcessed extends BaseEvent<JobExecutionItemProcessed> {
    readonly id!: UUID;
    readonly success!: boolean;

    public entityID(): UUID {
        return this.id;
    }
}

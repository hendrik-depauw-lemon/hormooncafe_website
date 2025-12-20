import { Event } from '@boostercloud/framework-core';
import { UUID } from '@boostercloud/framework-types';

import { BaseEvent } from '../../../../common/base-models';

@Event
export class JobExecutionTotalItemsUpdated extends BaseEvent<JobExecutionTotalItemsUpdated> {
    readonly id!: UUID;
    readonly totalItems!: number;

    public entityID(): UUID {
        return this.id;
    }
}

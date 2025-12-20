import { Event } from '@boostercloud/framework-core';
import { UUID } from '@boostercloud/framework-types';

import { BaseEvent } from '../../../common/base-models';

@Event
export class CalendarGroupUpdated extends BaseEvent<CalendarGroupUpdated> {
    readonly id!: UUID;
    readonly name!: string;
    readonly color?: string;

    public entityID(): UUID {
        return this.id;
    }
}

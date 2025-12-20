import { Event } from '@boostercloud/framework-core';
import { UUID } from '@boostercloud/framework-types';

import { BaseEvent } from '../../../common/base-models';

@Event
export class CalendarEventUnlinkedFromGroup extends BaseEvent<CalendarEventUnlinkedFromGroup> {
    readonly id!: UUID;

    public entityID(): UUID {
        return this.id;
    }
}

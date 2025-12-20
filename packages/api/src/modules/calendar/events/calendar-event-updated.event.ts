import { Event } from '@boostercloud/framework-core';
import { UUID } from '@boostercloud/framework-types';

import { BaseEvent } from '../../../common/base-models';

@Event
export class CalendarEventUpdated extends BaseEvent<CalendarEventUpdated> {
    readonly id!: UUID;
    readonly calendarGroupId?: UUID;
    readonly displayName!: string;
    readonly description?: string;
    readonly startDateTime!: Date;
    readonly endDateTime!: Date;
    readonly color?: string;

    public entityID(): UUID {
        return this.id;
    }
}

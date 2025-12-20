import { Event } from '@boostercloud/framework-core';
import { UUID } from '@boostercloud/framework-types';

import { BaseEvent } from '../../../common/base-models';

@Event
export class DateExcludedFromRecurringCalendarEvent extends BaseEvent<DateExcludedFromRecurringCalendarEvent> {
    readonly id!: UUID;
    readonly rRuleSetString!: string;
    readonly excludedDate!: Date;

    public entityID(): UUID {
        return this.id;
    }
}

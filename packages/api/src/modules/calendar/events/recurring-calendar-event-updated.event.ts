import { Event } from '@boostercloud/framework-core';
import { UUID } from '@boostercloud/framework-types';

import { BaseEvent } from '../../../common/base-models';
import { CalendarWeekday } from '../models/calendar-weekday.enum';
import { RecurringCalendarEventFrequency } from '../models/recurring-calendar-event-frequency.enum';

@Event
export class RecurringCalendarEventUpdated extends BaseEvent<RecurringCalendarEventUpdated> {
    readonly id!: UUID;
    readonly calendarGroupId?: UUID;
    readonly timezone!: string;
    readonly displayName!: string;
    readonly description?: string;
    readonly rRuleSetString!: string;
    readonly durationInMinutes!: number;
    readonly frequency!: RecurringCalendarEventFrequency;
    readonly every!: number;
    readonly onWeekdays?: CalendarWeekday[];
    readonly startDate!: Date;
    readonly endDate?: Date;
    readonly color?: string;

    public entityID(): UUID {
        return this.id;
    }
}

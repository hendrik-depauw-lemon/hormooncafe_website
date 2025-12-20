import { UUID } from '@boostercloud/framework-types';

import { BaseValueObject } from '../../../common/base-models';
import { CalendarEventReadModel } from '../read-models/calendar-event.read-model';
import { CalendarWeekday } from './calendar-weekday.enum';
import { RecurringCalendarEventFrequency } from './recurring-calendar-event-frequency.enum';

export class RecurringCalendarEventData extends BaseValueObject<RecurringCalendarEventData> {
    readonly id!: UUID;
    readonly timezone!: string;
    readonly rRuleSetString!: string;
    readonly durationInMinutes!: number;
    readonly frequency!: RecurringCalendarEventFrequency;
    readonly every!: number;
    readonly onWeekdays?: CalendarWeekday[];
    readonly startDate!: Date;
    readonly endDate?: Date;
    readonly createdAt!: Date;
    readonly updatedAt!: Date;
}

export class CalendarEventObject extends BaseValueObject<CalendarEventObject> {
    readonly id!: string;
    readonly calendarGroupId!: UUID | undefined;
    readonly isRecurringCalendarEvent!: boolean;
    readonly recurringCalendarEventData!: RecurringCalendarEventData | undefined;
    readonly displayName!: string;
    readonly description?: string;
    readonly startDateTime!: Date;
    readonly endDateTime!: Date;
    readonly color!: string | undefined;
    readonly createdAt!: Date;
    readonly updatedAt!: Date;
}

export function parseCalendarEventReadModelToCalendarEventObject(
    calendarEventReadModel: CalendarEventReadModel,
): CalendarEventObject {
    return {
        id: calendarEventReadModel.id.toString(),
        calendarGroupId: calendarEventReadModel.calendarGroupId,
        isRecurringCalendarEvent: false,
        recurringCalendarEventData: undefined,
        displayName: calendarEventReadModel.displayName,
        description: calendarEventReadModel.description,
        startDateTime: calendarEventReadModel.startDateTime,
        endDateTime: calendarEventReadModel.endDateTime,
        color: calendarEventReadModel.color,
        createdAt: calendarEventReadModel.createdAt,
        updatedAt: calendarEventReadModel.updatedAt,
    };
}

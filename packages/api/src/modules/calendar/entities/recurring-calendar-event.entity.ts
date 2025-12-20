import { Entity, Reduces } from '@boostercloud/framework-core';
import { UUID } from '@boostercloud/framework-types';

import { BaseEntity } from '../../../common/base-models';
import { DateExcludedFromRecurringCalendarEvent } from '../events/date-excluded-from-recurring-calendar-event.event';
import { RecurringCalendarEventCreated } from '../events/recurring-calendar-event-created.event';
import { RecurringCalendarEventDeleted } from '../events/recurring-calendar-event-deleted.event';
import { RecurringCalendarEventUnlinkedFromGroup } from '../events/recurring-calendar-event-unlinked-from-group.event';
import { RecurringCalendarEventUpdated } from '../events/recurring-calendar-event-updated.event';
import { CalendarWeekday } from '../models/calendar-weekday.enum';
import { RecurringCalendarEventFrequency } from '../models/recurring-calendar-event-frequency.enum';

@Entity
export class RecurringCalendarEvent extends BaseEntity<RecurringCalendarEvent> {
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
    readonly excludedDates!: Date[];

    @Reduces(RecurringCalendarEventCreated)
    public static reduceRecurringCalendarEventCreated(
        event: RecurringCalendarEventCreated,
    ): RecurringCalendarEvent {
        return new RecurringCalendarEvent({
            id: event.id,
            calendarGroupId: event.calendarGroupId,
            timezone: event.timezone,
            displayName: event.displayName,
            description: event.description,
            rRuleSetString: event.rRuleSetString,
            durationInMinutes: event.durationInMinutes,
            frequency: event.frequency,
            every: event.every,
            onWeekdays: event.onWeekdays,
            startDate: event.startDate,
            endDate: event.endDate,
            color: event.color,
            excludedDates: [],
            createdAt: event.eventTime,
            updatedAt: event.eventTime,
            deletedAt: undefined,
        });
    }

    @Reduces(RecurringCalendarEventUpdated)
    public static reduceRecurringCalendarEventUpdated(
        event: RecurringCalendarEventUpdated,
        current: RecurringCalendarEvent,
    ): RecurringCalendarEvent {
        return new RecurringCalendarEvent({
            ...current,
            calendarGroupId: event.calendarGroupId,
            timezone: event.timezone,
            displayName: event.displayName,
            description: event.description,
            rRuleSetString: event.rRuleSetString,
            durationInMinutes: event.durationInMinutes,
            frequency: event.frequency,
            every: event.every,
            onWeekdays: event.onWeekdays,
            startDate: event.startDate,
            endDate: event.endDate,
            color: event.color,
            updatedAt: event.eventTime,
        });
    }

    @Reduces(DateExcludedFromRecurringCalendarEvent)
    public static reduceDateExcludedFromRecurringCalendarEvent(
        event: DateExcludedFromRecurringCalendarEvent,
        current: RecurringCalendarEvent,
    ): RecurringCalendarEvent {
        return new RecurringCalendarEvent({
            ...current,
            rRuleSetString: event.rRuleSetString,
            excludedDates: [...current.excludedDates, event.excludedDate],
            updatedAt: event.eventTime,
        });
    }

    @Reduces(RecurringCalendarEventUnlinkedFromGroup)
    public static reduceRecurringCalendarEventUnlinkedFromGroup(
        event: RecurringCalendarEventUnlinkedFromGroup,
        current: RecurringCalendarEvent,
    ): RecurringCalendarEvent {
        return new RecurringCalendarEvent({
            ...current,
            calendarGroupId: undefined,
            updatedAt: event.eventTime,
        });
    }

    @Reduces(RecurringCalendarEventDeleted)
    public static reduceRecurringCalendarEventDeleted(
        event: RecurringCalendarEventDeleted,
        current: RecurringCalendarEvent,
    ): RecurringCalendarEvent {
        return new RecurringCalendarEvent({
            ...current,
            deletedAt: event.eventTime,
        });
    }
}

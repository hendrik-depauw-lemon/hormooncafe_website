import { Entity, Reduces } from '@boostercloud/framework-core';
import { UUID } from '@boostercloud/framework-types';

import { BaseEntity } from '../../../common/base-models';
import { CalendarEventCreated } from '../events/calendar-event-created.event';
import { CalendarEventDeleted } from '../events/calendar-event-deleted.event';
import { CalendarEventUnlinkedFromGroup } from '../events/calendar-event-unlinked-from-group.event';
import { CalendarEventUpdated } from '../events/calendar-event-updated.event';

@Entity
export class CalendarEvent extends BaseEntity<CalendarEvent> {
    readonly id!: UUID;
    readonly displayName!: string;
    readonly description?: string;
    readonly startDateTime!: Date;
    readonly endDateTime!: Date;
    readonly color?: string;
    readonly calendarGroupId?: UUID;

    @Reduces(CalendarEventCreated)
    public static reduceCalendarEventCreated(event: CalendarEventCreated): CalendarEvent {
        return new CalendarEvent({
            id: event.id,
            displayName: event.displayName,
            description: event.description,
            startDateTime: event.startDateTime,
            endDateTime: event.endDateTime,
            color: event.color,
            calendarGroupId: event.calendarGroupId,
            createdAt: event.eventTime,
            updatedAt: event.eventTime,
            deletedAt: undefined,
        });
    }

    @Reduces(CalendarEventUpdated)
    public static reduceCalendarEventUpdated(
        event: CalendarEventUpdated,
        current: CalendarEvent,
    ): CalendarEvent {
        return {
            ...current,
            calendarGroupId: event.calendarGroupId,
            displayName: event.displayName,
            description: event.description,
            startDateTime: event.startDateTime,
            endDateTime: event.endDateTime,
            color: event.color,
            updatedAt: event.eventTime,
        };
    }

    @Reduces(CalendarEventUnlinkedFromGroup)
    public static reduceCalendarEventUnlinkedFromGroup(
        event: CalendarEventUnlinkedFromGroup,
        current: CalendarEvent,
    ): CalendarEvent {
        return {
            ...current,
            calendarGroupId: undefined,
            updatedAt: event.eventTime,
        };
    }

    @Reduces(CalendarEventDeleted)
    public static reduceCalendarEventDeleted(
        event: CalendarEventDeleted,
        current: CalendarEvent,
    ): CalendarEvent {
        return {
            ...current,
            deletedAt: event.eventTime,
        };
    }
}

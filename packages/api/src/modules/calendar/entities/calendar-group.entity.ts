import { Entity, Reduces } from '@boostercloud/framework-core';
import { UUID } from '@boostercloud/framework-types';

import { BaseEntity } from '../../../common/base-models';
import { CalendarGroupCreated } from '../events/calendar-group-created.event';
import { CalendarGroupDeleted } from '../events/calendar-group-deleted.event';
import { CalendarGroupUpdated } from '../events/calendar-group-updated.event';

@Entity
export class CalendarGroup extends BaseEntity<CalendarGroup> {
    readonly id!: UUID;
    readonly name!: string;
    readonly color?: string;

    @Reduces(CalendarGroupCreated)
    public static reduceCalendarGroupCreated(event: CalendarGroupCreated): CalendarGroup {
        return new CalendarGroup({
            id: event.id,
            name: event.name,
            color: event.color,
            createdAt: event.eventTime,
            updatedAt: event.eventTime,
            deletedAt: undefined,
        });
    }

    @Reduces(CalendarGroupUpdated)
    public static reduceCalendarGroupUpdated(
        event: CalendarGroupUpdated,
        current: CalendarGroup,
    ): CalendarGroup {
        return {
            ...current,
            name: event.name,
            color: event.color,
            updatedAt: event.eventTime,
        };
    }

    @Reduces(CalendarGroupDeleted)
    public static reduceCalendarGroupDeleted(
        event: CalendarGroupDeleted,
        current: CalendarGroup,
    ): CalendarGroup {
        return {
            ...current,
            deletedAt: event.eventTime,
        };
    }
}

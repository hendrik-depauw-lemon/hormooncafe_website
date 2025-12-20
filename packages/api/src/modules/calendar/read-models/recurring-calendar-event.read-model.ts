import { Projects, ReadModel } from '@boostercloud/framework-core';
import { ProjectionResult, ReadModelAction, UUID } from '@boostercloud/framework-types';

import { BaseReadModel } from '../../../common/base-models';
import { RecurringCalendarEvent } from '../entities/recurring-calendar-event.entity';
import { CalendarWeekday } from '../models/calendar-weekday.enum';
import { RecurringCalendarEventFrequency } from '../models/recurring-calendar-event-frequency.enum';

@ReadModel({ authorize: 'all' })
export class RecurringCalendarEventReadModel extends BaseReadModel<RecurringCalendarEventReadModel> {
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

    readonly createdAt!: Date;
    readonly updatedAt!: Date;

    @Projects(RecurringCalendarEvent, 'id')
    static projectSlot(
        entity: RecurringCalendarEvent,
    ): ProjectionResult<RecurringCalendarEventReadModel> {
        if (entity.deletedAt) return ReadModelAction.Delete;

        return new RecurringCalendarEventReadModel({
            id: entity.id,
            calendarGroupId: entity.calendarGroupId,
            timezone: entity.timezone,
            displayName: entity.displayName,
            description: entity.description,
            rRuleSetString: entity.rRuleSetString,
            durationInMinutes: entity.durationInMinutes,
            frequency: entity.frequency,
            every: entity.every,
            onWeekdays: entity.onWeekdays,
            startDate: entity.startDate,
            endDate: entity.endDate,
            color: entity.color,
            excludedDates: entity.excludedDates,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        });
    }
}

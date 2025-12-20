import { Projects, ReadModel } from '@boostercloud/framework-core';
import { ProjectionResult, ReadModelAction, UUID } from '@boostercloud/framework-types';

import { BaseReadModel } from '../../../common/base-models';
import { CalendarEvent } from '../entities/calendar-event.entity';

@ReadModel({ authorize: 'all' })
export class CalendarEventReadModel extends BaseReadModel<CalendarEventReadModel> {
    readonly id!: UUID;
    readonly calendarGroupId?: UUID;
    readonly displayName!: string;
    readonly description?: string;
    readonly startDateTime!: Date;
    readonly endDateTime!: Date;
    readonly color?: string;
    readonly createdAt!: Date;
    readonly updatedAt!: Date;

    @Projects(CalendarEvent, 'id')
    static projectSlot(entity: CalendarEvent): ProjectionResult<CalendarEventReadModel> {
        if (entity.deletedAt) return ReadModelAction.Delete;

        return new CalendarEventReadModel({
            id: entity.id,
            calendarGroupId: entity.calendarGroupId,
            displayName: entity.displayName,
            description: entity.description,
            startDateTime: entity.startDateTime,
            endDateTime: entity.endDateTime,
            color: entity.color,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        });
    }
}

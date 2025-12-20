import { Projects, ReadModel } from '@boostercloud/framework-core';
import { ProjectionResult, ReadModelAction, UUID } from '@boostercloud/framework-types';

import { BaseReadModel } from '../../../common/base-models';
import { CalendarGroup } from '../entities/calendar-group.entity';

@ReadModel({ authorize: 'all' })
export class CalendarGroupReadModel extends BaseReadModel<CalendarGroupReadModel> {
    readonly id!: UUID;
    readonly name!: string;
    readonly color?: string;
    readonly createdAt!: Date;
    readonly updatedAt!: Date;

    @Projects(CalendarGroup, 'id')
    static projectSlot(entity: CalendarGroup): ProjectionResult<CalendarGroupReadModel> {
        if (entity.deletedAt) return ReadModelAction.Delete;

        return new CalendarGroupReadModel({
            id: entity.id,
            name: entity.name,
            color: entity.color,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        });
    }
}

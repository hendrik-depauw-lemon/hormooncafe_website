import { Command } from '@boostercloud/framework-core';
import { Register, UUID } from '@boostercloud/framework-types';

import { BaseCommand } from '../../../common/base-models';
import { IsOptionalHexColor } from '../../../common/validation-decorators/is-hex-color.decorator';
import { NonEmpty } from '../../../common/validation-decorators/non-empty.decorator';
import { EntityValidators } from '../../../common/validators/entity-validators';
import { AppDomain } from '../../../error-handling/error-code';
import { CalendarGroup } from '../entities/calendar-group.entity';
import { CalendarGroupUpdated } from '../events/calendar-group-updated.event';

@Command({ authorize: 'all' })
export class UpdateCalendarGroup extends BaseCommand<UpdateCalendarGroup> {
    readonly calendarGroupId!: UUID;
    @NonEmpty()
    readonly name!: string;
    @IsOptionalHexColor()
    readonly color?: string;

    static async handle(command: UpdateCalendarGroup, register: Register): Promise<UUID> {
        const { calendarGroupId, name, color } = command;

        await EntityValidators.entityIsNotDeleted(
            CalendarGroup,
            calendarGroupId,
            AppDomain.Calendar,
        );

        register.events(
            new CalendarGroupUpdated({
                id: calendarGroupId,
                name: name,
                color: color,
            }),
        );

        return calendarGroupId;
    }
}

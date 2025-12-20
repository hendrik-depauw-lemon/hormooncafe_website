import { Command } from '@boostercloud/framework-core';
import { Register, UUID } from '@boostercloud/framework-types';

import { BaseCommand } from '../../../common/base-models';
import { IsOptionalHexColor } from '../../../common/validation-decorators/is-hex-color.decorator';
import { NonEmpty } from '../../../common/validation-decorators/non-empty.decorator';
import { EntityValidators } from '../../../common/validators/entity-validators';
import { AppDomain } from '../../../error-handling/error-code';
import { CalendarEvent } from '../entities/calendar-event.entity';
import { CalendarGroup } from '../entities/calendar-group.entity';
import { CalendarEventUpdated } from '../events/calendar-event-updated.event';
import { CalendarValidators } from '../utils/calendar-validators';

@Command({ authorize: 'all' })
export class UpdateCalendarEvent extends BaseCommand<UpdateCalendarEvent> {
    readonly calendarEventId!: UUID;
    readonly calendarGroupId?: UUID;
    @NonEmpty()
    readonly displayName!: string;
    readonly description?: string;
    readonly startDateTime!: Date;
    readonly endDateTime!: Date;
    @IsOptionalHexColor()
    readonly color?: string;

    static async handle(command: UpdateCalendarEvent, register: Register): Promise<UUID> {
        const {
            calendarEventId,
            calendarGroupId,
            displayName,
            description,
            startDateTime,
            endDateTime,
            color,
        } = command;

        CalendarValidators.endDateTimeIsAfterStartDateTime(startDateTime, endDateTime);

        if (calendarGroupId) {
            await EntityValidators.entityExists(CalendarGroup, calendarGroupId, AppDomain.Calendar);
        }
        await EntityValidators.entityIsNotDeleted(
            CalendarEvent,
            calendarEventId,
            AppDomain.Calendar,
        );

        register.events(
            new CalendarEventUpdated({
                id: calendarEventId,
                calendarGroupId: calendarGroupId,
                displayName: displayName,
                description: description,
                startDateTime: startDateTime,
                endDateTime: endDateTime,
                color: color,
            }),
        );

        return calendarEventId;
    }
}

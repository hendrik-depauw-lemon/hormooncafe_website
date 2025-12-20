import { Command } from '@boostercloud/framework-core';
import { Register, UUID } from '@boostercloud/framework-types';

import { BaseCommand } from '../../../common/base-models';
import { IsOptionalHexColor } from '../../../common/validation-decorators/is-hex-color.decorator';
import { NonEmpty } from '../../../common/validation-decorators/non-empty.decorator';
import { EntityValidators } from '../../../common/validators/entity-validators';
import { AppDomain } from '../../../error-handling/error-code';
import { CalendarGroup } from '../entities/calendar-group.entity';
import { CalendarEventCreated } from '../events/calendar-event-created.event';
import { CalendarValidators } from '../utils/calendar-validators';
import { DeleteRecurringCalendarEventInstance } from './delete-recurring-calendar-event-instance.command';

@Command({ authorize: 'all' })
export class CreateCalendarEvent extends BaseCommand<CreateCalendarEvent> {
    readonly calendarGroupId?: UUID;
    @NonEmpty()
    readonly displayName!: string;
    readonly description?: string;
    readonly startDateTime!: Date;
    readonly endDateTime!: Date;
    @IsOptionalHexColor()
    readonly color?: string;
    readonly fromRecurringEventId?: UUID;

    static async handle(command: CreateCalendarEvent, register: Register): Promise<UUID> {
        const {
            calendarGroupId,
            displayName,
            description,
            startDateTime,
            endDateTime,
            color,
            fromRecurringEventId,
        } = command;
        const id = UUID.generate();

        if (calendarGroupId) {
            await EntityValidators.entityIsNotDeleted(
                CalendarGroup,
                calendarGroupId,
                AppDomain.Calendar,
            );
        }

        CalendarValidators.endDateTimeIsAfterStartDateTime(startDateTime, endDateTime);

        if (fromRecurringEventId) {
            await DeleteRecurringCalendarEventInstance.handle(
                {
                    recurringCalendarEventId: fromRecurringEventId,
                    instanceDate: startDateTime,
                },
                register,
            );
        }

        register.events(
            new CalendarEventCreated({
                id: id,
                calendarGroupId: calendarGroupId,
                displayName: displayName,
                description: description,
                startDateTime: startDateTime,
                endDateTime: endDateTime,
                color: color,
            }),
        );

        return id;
    }
}

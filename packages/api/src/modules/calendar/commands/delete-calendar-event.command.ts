import { Command } from '@boostercloud/framework-core';
import { Register, UUID } from '@boostercloud/framework-types';

import { BaseCommand } from '../../../common/base-models';
import { EntityValidators } from '../../../common/validators/entity-validators';
import { AppDomain } from '../../../error-handling/error-code';
import { CalendarEvent } from '../entities/calendar-event.entity';
import { CalendarEventDeleted } from '../events/calendar-event-deleted.event';

@Command({ authorize: 'all' })
export class DeleteCalendarEvent extends BaseCommand<DeleteCalendarEvent> {
    readonly calendarEventId!: UUID;

    static async handle(command: DeleteCalendarEvent, register: Register): Promise<UUID> {
        const { calendarEventId } = command;

        await EntityValidators.entityIsNotDeleted(
            CalendarEvent,
            calendarEventId,
            AppDomain.Calendar,
        );

        register.events(
            new CalendarEventDeleted({
                id: calendarEventId,
            }),
        );

        return calendarEventId;
    }
}

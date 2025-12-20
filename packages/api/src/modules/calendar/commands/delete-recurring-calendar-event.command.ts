import { Command } from '@boostercloud/framework-core';
import { Register, UUID } from '@boostercloud/framework-types';

import { BaseCommand } from '../../../common/base-models';
import { EntityValidators } from '../../../common/validators/entity-validators';
import { AppDomain } from '../../../error-handling/error-code';
import { RecurringCalendarEvent } from '../entities/recurring-calendar-event.entity';
import { RecurringCalendarEventDeleted } from '../events/recurring-calendar-event-deleted.event';

@Command({ authorize: 'all' })
export class DeleteRecurringCalendarEvent extends BaseCommand<DeleteRecurringCalendarEvent> {
    readonly recurringCalendarEventId!: UUID;

    static async handle(command: DeleteRecurringCalendarEvent, register: Register): Promise<UUID> {
        const { recurringCalendarEventId } = command;

        await EntityValidators.entityIsNotDeleted(
            RecurringCalendarEvent,
            recurringCalendarEventId,
            AppDomain.Calendar,
        );

        register.events(
            new RecurringCalendarEventDeleted({
                id: recurringCalendarEventId,
            }),
        );

        return recurringCalendarEventId;
    }
}

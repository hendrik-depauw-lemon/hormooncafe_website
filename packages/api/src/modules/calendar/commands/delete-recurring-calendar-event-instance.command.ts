import { Command } from '@boostercloud/framework-core';
import { Register, UUID } from '@boostercloud/framework-types';

import { BaseCommand } from '../../../common/base-models';
import { EntityValidators } from '../../../common/validators/entity-validators';
import { AppDomain } from '../../../error-handling/error-code';
import { RecurringCalendarEvent } from '../entities/recurring-calendar-event.entity';
import { DateExcludedFromRecurringCalendarEvent } from '../events/date-excluded-from-recurring-calendar-event.event';
import { calculateRRuleExDate } from '../utils/calculate-ex-date';
import { parseToRRuleSet } from '../utils/parse-to-rrule-set';

@Command({ authorize: 'all' })
export class DeleteRecurringCalendarEventInstance extends BaseCommand<DeleteRecurringCalendarEventInstance> {
    readonly recurringCalendarEventId!: UUID;
    readonly instanceDate!: Date;

    static async handle(
        command: DeleteRecurringCalendarEventInstance,
        register: Register,
    ): Promise<UUID> {
        const { recurringCalendarEventId, instanceDate } = command;

        const recurring = await EntityValidators.entityIsNotDeleted(
            RecurringCalendarEvent,
            recurringCalendarEventId,
            AppDomain.Calendar,
        );
        const rRuleSet = parseToRRuleSet(recurring.rRuleSetString);
        const dateToExclude = calculateRRuleExDate(
            instanceDate,
            recurring.timezone,
            recurring.startDate,
            recurring.timezone,
        );

        rRuleSet.exdate(dateToExclude);
        register.events(
            new DateExcludedFromRecurringCalendarEvent({
                id: recurringCalendarEventId,
                rRuleSetString: rRuleSet.toString(),
                excludedDate: dateToExclude,
            }),
        );

        return recurringCalendarEventId;
    }
}

import { Command } from '@boostercloud/framework-core';
import { Register, UUID } from '@boostercloud/framework-types';
import { RRuleSet } from 'rrule';

import { BaseCommand } from '../../../common/base-models';
import { IsOptionalHexColor } from '../../../common/validation-decorators/is-hex-color.decorator';
import { NonEmpty } from '../../../common/validation-decorators/non-empty.decorator';
import { Positive } from '../../../common/validation-decorators/positive.decorator';
import { EntityValidators } from '../../../common/validators/entity-validators';
import { AppDomain } from '../../../error-handling/error-code';
import { CalendarGroup } from '../entities/calendar-group.entity';
import { RecurringCalendarEvent } from '../entities/recurring-calendar-event.entity';
import { RecurringCalendarEventUpdated } from '../events/recurring-calendar-event-updated.event';
import { CalendarWeekday } from '../models/calendar-weekday.enum';
import { RecurringCalendarEventFrequency } from '../models/recurring-calendar-event-frequency.enum';
import { calculateRRuleExDate } from '../utils/calculate-ex-date';
import { CalendarValidators } from '../utils/calendar-validators';
import { parseToRRule } from '../utils/parse-to-rrule';
import { parseToRRuleSet } from '../utils/parse-to-rrule-set';

@Command({ authorize: 'all' })
export class UpdateRecurringCalendarEvent extends BaseCommand<UpdateRecurringCalendarEvent> {
    readonly recurringCalendarEventId!: UUID;
    readonly calendarGroupId?: UUID;
    readonly timezone!: string;
    @NonEmpty()
    readonly displayName!: string;
    readonly description?: string;
    @Positive()
    readonly durationInMinutes!: number;
    readonly frequency!: RecurringCalendarEventFrequency;
    readonly onWeekdays?: CalendarWeekday[];
    @Positive()
    readonly every!: number;
    readonly startDate!: Date;
    readonly endDate?: Date;
    @IsOptionalHexColor()
    readonly color?: string;

    static async handle(command: UpdateRecurringCalendarEvent, register: Register): Promise<UUID> {
        const {
            recurringCalendarEventId,
            calendarGroupId,
            timezone,
            displayName,
            description,
            durationInMinutes,
            frequency,
            onWeekdays,
            every,
            startDate,
            endDate,
            color,
        } = command;

        if (endDate) CalendarValidators.endDateTimeIsAfterStartDateTime(startDate, endDate);

        if (calendarGroupId) {
            await EntityValidators.entityExists(CalendarGroup, calendarGroupId, AppDomain.Calendar);
        }

        const recurringEvent = await EntityValidators.entityIsNotDeleted(
            RecurringCalendarEvent,
            recurringCalendarEventId,
            AppDomain.Calendar,
        );

        const originalRRuleSet = parseToRRuleSet(recurringEvent.rRuleSetString);

        // Create a new RRuleSet with the new RRule
        const rRuleSet = new RRuleSet();
        rRuleSet.rrule(
            parseToRRule({
                timezone,
                frequency,
                onWeekdays,
                every,
                startDate,
                endDate,
            }),
        );

        // Copy over all EXRULEs and EXDATEs from the original RRuleSet
        originalRRuleSet.exrules().forEach((exrule) => rRuleSet.exrule(exrule));
        originalRRuleSet.exdates().forEach((exdate) => {
            rRuleSet.exdate(
                calculateRRuleExDate(exdate, recurringEvent.timezone, startDate, timezone),
            );
        });

        register.events(
            new RecurringCalendarEventUpdated({
                id: recurringCalendarEventId,
                calendarGroupId: calendarGroupId,
                timezone: timezone,
                displayName: displayName,
                description: description,
                rRuleSetString: rRuleSet.toString(),
                durationInMinutes: durationInMinutes,
                frequency: frequency,
                every: every,
                onWeekdays: onWeekdays,
                startDate: startDate,
                endDate: endDate,
                color: color,
            }),
        );

        return recurringCalendarEventId;
    }
}

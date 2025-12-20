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
import { RecurringCalendarEventCreated } from '../events/recurring-calendar-event-created.event';
import { CalendarWeekday } from '../models/calendar-weekday.enum';
import { RecurringCalendarEventFrequency } from '../models/recurring-calendar-event-frequency.enum';
import { CalendarValidators } from '../utils/calendar-validators';
import { parseToRRule } from '../utils/parse-to-rrule';

@Command({ authorize: 'all' })
export class CreateRecurringCalendarEvent extends BaseCommand<CreateRecurringCalendarEvent> {
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

    static async handle(command: CreateRecurringCalendarEvent, register: Register): Promise<UUID> {
        const {
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

        if (calendarGroupId) {
            await EntityValidators.entityIsNotDeleted(
                CalendarGroup,
                calendarGroupId,
                AppDomain.Calendar,
            );
        }

        if (endDate) CalendarValidators.endDateTimeIsAfterStartDateTime(startDate, endDate);

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

        const id = UUID.generate();
        register.events(
            new RecurringCalendarEventCreated({
                id: id,
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

        return id;
    }
}

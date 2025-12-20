import { RRule } from 'rrule';

import { CalendarWeekday } from '../models/calendar-weekday.enum';
import { RecurringCalendarEventFrequency } from '../models/recurring-calendar-event-frequency.enum';
import { parseToRRuleDateTime } from './parse-to-rrule-datetime';
import { parseToRRuleFrequency } from './parse-to-rrule-frequency';
import { parseToRRuleWeekdays } from './parse-to-rrule-weekday';

/**
 * Parse options to create an RRule instance.
 *
 * @param options options to create the RRule
 * @returns an RRule instance
 */
export function parseToRRule(options: {
    timezone: string;
    frequency: RecurringCalendarEventFrequency;
    onWeekdays?: CalendarWeekday[];
    every: number;
    startDate: Date;
    endDate?: Date;
}): RRule {
    const { timezone, frequency, onWeekdays, every, startDate, endDate } = options;
    return new RRule({
        freq: parseToRRuleFrequency(frequency),
        ...(frequency === RecurringCalendarEventFrequency.WEEKLY &&
            onWeekdays && {
                byweekday: parseToRRuleWeekdays(onWeekdays),
            }),
        interval: every,
        dtstart: parseToRRuleDateTime(startDate, timezone),
        ...(endDate && { until: parseToRRuleDateTime(endDate, timezone) }),
        tzid: timezone,
    });
}

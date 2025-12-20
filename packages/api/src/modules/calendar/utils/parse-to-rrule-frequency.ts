import { Frequency, RRule } from 'rrule';

import { RecurringCalendarEventFrequency } from '../models/recurring-calendar-event-frequency.enum';

/**
 * Parse an internal RecurringCalendarEventFrequency to an RRule Frequency.
 *
 * @param frequency RecurringCalendarEventFrequency option
 * @returns an RRule.Frequency instance
 */
export function parseToRRuleFrequency(frequency: RecurringCalendarEventFrequency): Frequency {
    switch (frequency) {
        case RecurringCalendarEventFrequency.DAILY:
            return RRule.DAILY;
        case RecurringCalendarEventFrequency.WEEKLY:
            return RRule.WEEKLY;
        case RecurringCalendarEventFrequency.MONTHLY:
            return RRule.MONTHLY;
        case RecurringCalendarEventFrequency.YEARLY:
            return RRule.YEARLY;
        default:
            throw new Error(`Unsupported frequency: ${frequency}`);
    }
}

import { RRule, Weekday } from 'rrule';

import { CalendarWeekday } from '../models/calendar-weekday.enum';

/**
 * Parse an internal CalendarWeekday to an RRule Weekday.
 *
 * @param weekday CalendarWeekday option
 * @returns an RRule.Weekday instance
 */
export function parseToRRuleWeekday(weekday: CalendarWeekday): Weekday {
    switch (weekday) {
        case CalendarWeekday.MONDAY:
            return RRule.MO;
        case CalendarWeekday.TUESDAY:
            return RRule.TU;
        case CalendarWeekday.WEDNESDAY:
            return RRule.WE;
        case CalendarWeekday.THURSDAY:
            return RRule.TH;
        case CalendarWeekday.FRIDAY:
            return RRule.FR;
        case CalendarWeekday.SATURDAY:
            return RRule.SA;
        case CalendarWeekday.SUNDAY:
            return RRule.SU;
        default:
            throw new Error(`Unsupported weekday: ${weekday}`);
    }
}

export function parseToRRuleWeekdays(weekdays: CalendarWeekday[]): Weekday[] {
    return weekdays.map((day) => parseToRRuleWeekday(day));
}

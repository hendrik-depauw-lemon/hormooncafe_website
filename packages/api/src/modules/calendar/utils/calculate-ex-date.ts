import { fromZonedTime } from 'date-fns-tz';

import { parseSegmentsFromDateForTimezone } from './parse-segments-from-date-for-timezone';
import { parseToRRuleDateTime } from './parse-to-rrule-datetime';

export function calculateRRuleExDate(
    exDate: Date,
    oldExDateTimezone: string,
    startDate: Date,
    startDateTimezone: string,
): Date {
    // exdate will be in timezone but rrule will return it as UTC
    const parsedExDate = fromZonedTime(exDate.toISOString().replace('Z', ''), oldExDateTimezone);
    // get year, month and day from parsedExDate in old timezone
    const { year, month, day } = parseSegmentsFromDateForTimezone(parsedExDate, oldExDateTimezone);
    // get hours, minutes and seconds from startDate in new timezone
    const { hour, minute, second } = parseSegmentsFromDateForTimezone(startDate, startDateTimezone);
    // create a new date with year, month, day, hour, minute and second in new timezone
    const adjustedExdate = fromZonedTime(
        new Date(Date.UTC(year, month - 1, day, hour, minute, second))
            .toISOString()
            .replace('Z', ''),
        startDateTimezone,
    );
    // Date should be in required timezone but with a specified timezone of UTC
    return parseToRRuleDateTime(adjustedExdate, startDateTimezone);
}

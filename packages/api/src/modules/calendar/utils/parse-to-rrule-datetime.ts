import { datetime } from 'rrule';

import { parseSegmentsFromDateForTimezone } from './parse-segments-from-date-for-timezone';

/**
 * Helper function to parse a Date into an RRule DateTime in a specific timezone.
 * RRule uses the string version of the date without the 'Z' at the end to consider the timezone.
 * e.g.: dtstart: 2025-01-15T10:00:00Z with tzid "Europe/Brussels"
 * => DTSTART;TZID=Europe/Brussels:20250901T100000.
 *
 * It acts as if the UTC time is in the timezone specified in tzid.
 * We need to specify this because RRule uses this dtstart to calculate the starting hour of the occurrences.
 * Simply keeping the dtstart in UTC would lose us to lose the starting hour of an event since
 * this can change depending on DST and timezone.
 *
 * @param startTime the original date
 * @param timezone the timezone to consider
 * @returns a Date adjusted to the given timezone
 */
export function parseToRRuleDateTime(startTime: Date, timezone: string): Date {
    const { year, month, day, hour, minute, second } = parseSegmentsFromDateForTimezone(
        startTime,
        timezone,
    );
    return datetime(year, month, day, hour, minute, second);
}

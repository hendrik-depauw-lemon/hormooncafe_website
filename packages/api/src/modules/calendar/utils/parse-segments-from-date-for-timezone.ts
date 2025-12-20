/**
 * Helper function to extract date and time components in a specific timezone.
 * e.g.: 2025-01-15T10:00:00Z in "Europe/Brussels"
 * => { year: 2025, month: 1, day: 15, hour: 11, minute: 0, second: 0 }
 *
 * @param date the original date
 * @param timezone the timezone to consider
 * @returns an object with year, month, day, hour, minute, and second
 */
export function parseSegmentsFromDateForTimezone(
    date: Date,
    timezone: string,
): {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
} {
    const options: Intl.DateTimeFormatOptions = {
        timeZone: timezone,
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false,
    };

    const formatter = new Intl.DateTimeFormat([], options);
    const parts = formatter.formatToParts(date);

    const dateTimeParts: { [key: string]: number } = {};
    for (const part of parts) {
        if (part.type !== 'literal') {
            dateTimeParts[part.type] = parseInt(part.value, 10);
        }
    }

    return {
        year: dateTimeParts['year'],
        month: dateTimeParts['month'],
        day: dateTimeParts['day'],
        hour: dateTimeParts['hour'],
        minute: dateTimeParts['minute'],
        second: dateTimeParts['second'],
    };
}

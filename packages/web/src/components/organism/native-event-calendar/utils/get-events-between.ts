import { getClient } from '../../../../utils/urql/getURQLClient';
import { CalendarEvent } from '../../calendar/calendar-types';
import { getCalendarEventsBetweenQuery } from '../_queries/getCalendarEventsBetween';
import { transformCalendarEventObjectToCalendarEvent } from './transform-calendar-event-object-to-calendar-event';

export async function getEventsBetween(
    from: Date,
    to: Date,
    calendarGroupIds: string[],
): Promise<CalendarEvent[]> {
    const result = await getClient().query(getCalendarEventsBetweenQuery, {
        input: {
            startDate: from,
            endDate: to,
            calendarGroupIds: calendarGroupIds.length > 0 ? calendarGroupIds : undefined,
        },
    });
    if (result.error || !result.data) {
        throw new Error(result.error?.message || 'No data returned from query');
    }

    const transformed = result.data.GetCalendarEventsBetween.map(
        transformCalendarEventObjectToCalendarEvent,
    );

    return transformed;
}

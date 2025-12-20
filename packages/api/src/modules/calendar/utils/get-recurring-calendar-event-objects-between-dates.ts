import { Booster } from '@boostercloud/framework-core';
import { UUID } from '@boostercloud/framework-types';

import { CalendarEventObject } from '../models/calendar-event-object';
import { RecurringCalendarEventReadModel } from '../read-models/recurring-calendar-event.read-model';
import { generateCalendarEventObjectsForRecurringCalendarEvents } from './generate-calendar-event-objects-for-recurring-calendar-event';

export async function getRecurringCalendarEventObjectsBetweenDates(
    startDate: Date,
    endDate: Date,
    calendarGroupIds?: UUID[],
): Promise<CalendarEventObject[]> {
    const recurringEvents = await Booster.readModel(RecurringCalendarEventReadModel)
        .filter({
            // Starts before the end date of the range
            startDate: { lte: endDate },
            // Ends after the start date of the range
            or: [{ endDate: { gte: startDate } }, { endDate: { eq: null } }],
            ...(calendarGroupIds && { calendarGroupId: { in: calendarGroupIds } }),
        })
        .search();

    return generateCalendarEventObjectsForRecurringCalendarEvents(
        recurringEvents,
        startDate,
        endDate,
    );
}

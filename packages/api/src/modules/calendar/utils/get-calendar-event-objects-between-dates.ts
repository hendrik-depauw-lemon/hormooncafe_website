import { Booster } from '@boostercloud/framework-core';
import { UUID } from '@boostercloud/framework-types';

import {
    CalendarEventObject,
    parseCalendarEventReadModelToCalendarEventObject,
} from '../models/calendar-event-object';
import { CalendarEventReadModel } from '../read-models/calendar-event.read-model';

export async function getCalendarEventObjectsBetweenDates(
    startDate: Date,
    endDate: Date,
    calendarGroupIds?: UUID[],
): Promise<CalendarEventObject[]> {
    const events = await Booster.readModel(CalendarEventReadModel)
        .filter({
            startDateTime: { lte: endDate },
            endDateTime: { gte: startDate },
            ...(calendarGroupIds && { calendarGroupId: { in: calendarGroupIds } }),
        })
        .search();

    return events.map((e) => parseCalendarEventReadModelToCalendarEventObject(e));
}

import { Query } from '@boostercloud/framework-core';
import { UUID } from '@boostercloud/framework-types';

import { BaseQuery } from '../../../common/base-models';
import { CalendarEventObject } from '../models/calendar-event-object';
import { getCalendarEventObjectsBetweenDates } from '../utils/get-calendar-event-objects-between-dates';
import { getRecurringCalendarEventObjectsBetweenDates } from '../utils/get-recurring-calendar-event-objects-between-dates';
import { setColorsForCalendarEventsInCalendarGroup } from '../utils/set-colors-for-calendar-events-in-calendar-group';

@Query({ authorize: 'all' })
export class GetCalendarEventsBetween extends BaseQuery<GetCalendarEventsBetween> {
    readonly startDate!: Date;
    readonly endDate!: Date;
    readonly calendarGroupIds?: UUID[];

    static async handle(query: GetCalendarEventsBetween): Promise<CalendarEventObject[]> {
        const { startDate, endDate, calendarGroupIds } = query;

        const calendarEvents = await getCalendarEventObjectsBetweenDates(
            startDate,
            endDate,
            calendarGroupIds,
        );
        const recurringCalendarEvents = await getRecurringCalendarEventObjectsBetweenDates(
            startDate,
            endDate,
            calendarGroupIds,
        );
        const coloredEvents = await setColorsForCalendarEventsInCalendarGroup([
            ...calendarEvents,
            ...recurringCalendarEvents,
        ]);

        return coloredEvents;
    }
}

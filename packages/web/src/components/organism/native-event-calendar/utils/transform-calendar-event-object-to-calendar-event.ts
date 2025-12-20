import { CalendarEventObject } from '../../../../gql/generated/graphql';
import { CalendarEvent } from '../../calendar/calendar-types';
import { generateId } from './generate-id';

export function transformCalendarEventObjectToCalendarEvent(
    ev: CalendarEventObject,
): CalendarEvent {
    return {
        id: generateId(ev),
        title: ev.displayName,
        description: ev.description || undefined,
        startDateTime: ev.startDateTime,
        endDateTime: ev.endDateTime,
        color: ev.color || undefined,
    };
}

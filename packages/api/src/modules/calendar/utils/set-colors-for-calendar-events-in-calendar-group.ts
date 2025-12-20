import { Booster } from '@boostercloud/framework-core';

import { CalendarGroup } from '../entities/calendar-group.entity';
import { CalendarEventObject } from '../models/calendar-event-object';

export async function setColorsForCalendarEventsInCalendarGroup(
    events: CalendarEventObject[],
): Promise<CalendarEventObject[]> {
    const calendarGroupColorsMap: Map<string, string | undefined> = new Map();
    const handledEvents: CalendarEventObject[] = [];

    for (const event of events) {
        if (event.color) {
            handledEvents.push(event);
            continue;
        }
        if (!event.calendarGroupId) {
            handledEvents.push(event);
            continue;
        }

        const calendarGroupId = event.calendarGroupId.toString();
        if (calendarGroupColorsMap.has(calendarGroupId)) {
            const color = calendarGroupColorsMap.get(calendarGroupId);
            handledEvents.push({ ...event, color });
            continue;
        }
        const calendarGroup = await Booster.entity(CalendarGroup, calendarGroupId);
        if (!calendarGroup) {
            handledEvents.push(event);
            continue;
        }

        const groupColor = calendarGroup.color;
        calendarGroupColorsMap.set(calendarGroupId, groupColor);
        handledEvents.push({ ...event, color: groupColor });
    }

    return handledEvents;
}

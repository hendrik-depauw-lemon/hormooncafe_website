import { CalendarEventObject } from '../models/calendar-event-object';
import { RecurringCalendarEventReadModel } from '../read-models/recurring-calendar-event.read-model';
import { cleanRRuleOccurrenceDate } from './clean-rrule-occurrence-date';
import { parseToRRuleSet } from './parse-to-rrule-set';

function generateCalendarEventObjectsForRecurringCalendarEvent(
    recurringCalendarEvent: RecurringCalendarEventReadModel,
    rangeStartDate: Date,
    rangeEndDate: Date,
): CalendarEventObject[] {
    const rRuleSet = parseToRRuleSet(recurringCalendarEvent.rRuleSetString);
    const rRuleEventStartDates = rRuleSet.between(rangeStartDate, rangeEndDate, true);
    const eventStartDates = rRuleEventStartDates.map((d) => cleanRRuleOccurrenceDate(d));

    const generatedEvents: CalendarEventObject[] = [];

    eventStartDates.forEach((eventStartDate) => {
        const eventEndDate = new Date(
            eventStartDate.getTime() + recurringCalendarEvent.durationInMinutes * 60 * 1000,
        );

        const generatedEvent: CalendarEventObject = {
            id: `${recurringCalendarEvent.id}-${eventStartDate.getTime()}`,
            calendarGroupId: recurringCalendarEvent.calendarGroupId,
            isRecurringCalendarEvent: true,
            recurringCalendarEventData: {
                id: recurringCalendarEvent.id,
                timezone: recurringCalendarEvent.timezone,
                rRuleSetString: recurringCalendarEvent.rRuleSetString,
                durationInMinutes: recurringCalendarEvent.durationInMinutes,
                frequency: recurringCalendarEvent.frequency,
                every: recurringCalendarEvent.every,
                onWeekdays: recurringCalendarEvent.onWeekdays,
                startDate: recurringCalendarEvent.startDate,
                endDate: recurringCalendarEvent.endDate,
                createdAt: recurringCalendarEvent.createdAt,
                updatedAt: recurringCalendarEvent.updatedAt,
            },
            displayName: recurringCalendarEvent.displayName,
            description: recurringCalendarEvent.description,
            startDateTime: eventStartDate,
            endDateTime: eventEndDate,
            color: recurringCalendarEvent.color,
            createdAt: recurringCalendarEvent.createdAt,
            updatedAt: recurringCalendarEvent.updatedAt,
        };

        generatedEvents.push(generatedEvent);
    });

    return generatedEvents;
}

/**
 * Generate calendar event objects for a recurring calendar event within a specific date range.
 *
 * @param recurringCalendarEvents a list of RecurringCalendarEventReadModels
 * @param rangeStartDate the start of the date range
 * @param rangeEndDate the end of the range (included)
 * @returns a list of CalendarEventObjects
 */
export function generateCalendarEventObjectsForRecurringCalendarEvents(
    recurringCalendarEvents: RecurringCalendarEventReadModel[],
    rangeStartDate: Date,
    rangeEndDate: Date,
): CalendarEventObject[] {
    const generatedEvents: CalendarEventObject[] = [];

    recurringCalendarEvents.forEach((recurringCalendarEvent) => {
        const eventsForThisRecurringEvent = generateCalendarEventObjectsForRecurringCalendarEvent(
            recurringCalendarEvent,
            rangeStartDate,
            rangeEndDate,
        );
        generatedEvents.push(...eventsForThisRecurringEvent);
    });

    return generatedEvents;
}

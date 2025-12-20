import { CalendarEventObject } from '../../../../gql/generated/graphql';

export function generateId(ev: CalendarEventObject): string {
    if (ev.isRecurringCalendarEvent) {
        return `recurring:${ev.recurringCalendarEventData?.id}:${ev.startDateTime.getTime()}`;
    }
    return `regular:${ev.id}`;
}

export function parseId(id: string): {
    isRecurring: boolean;
    id: string;
    occurrenceStartDateTime?: Date;
} {
    const parts = id.split(':');
    if (parts.length < 2) return { isRecurring: false, id };
    const isRecurring = parts[0] === 'recurring';
    const eventId = parts[1];
    if (!isRecurring) return { isRecurring: false, id: eventId };
    if (parts.length < 3) return { isRecurring: false, id: eventId };
    const occurrenceStartDateTime = new Date(Number(parts[2]));
    return { isRecurring, id: eventId, occurrenceStartDateTime };
}

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { Calendar } from '../calendar/Calendar';
import {
    CalendarEvent,
    CalendarEventClickFn,
    EmptySpaceClickFn,
    Period,
    PeriodType,
} from '../calendar/calendar-types';
import { CreateCalendarEventDialog } from './_components/create-calendar-event/CreateCalendarEventDialog';
import { UpdateCalendarEventDialog } from './_components/update-calendar-event/UpdateCalendarEventDialog';
import { UpdateRecurringCalendarEventDialog } from './_components/update-recurring-calendar-event/UpdateRecurringCalendarEventDialog';
import { parseId } from './utils/generate-id';
import { getEventsBetween } from './utils/get-events-between';

interface NativeEventCalendarProps {
    period: Period;
    calendarGroupIds: string[];
    type: PeriodType;
    timezone: string;
    locale: string;
}

export function NativeEventCalendar({
    period,
    calendarGroupIds,
    type,
    timezone,
    locale,
}: NativeEventCalendarProps) {
    const t = useTranslations('calendar');
    const [loading, setLoading] = useState(true);
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [fetchError, setError] = useState<string | undefined>(undefined);

    const [showCreateEventDialog, setShowCreateEventDialog] = useState(false);
    const [createEventDefaultStartDate, setCreateEventDefaultStartDate] = useState<
        Date | undefined
    >(undefined);

    const [showUpdateEventDialog, setShowUpdateEventDialog] = useState(false);
    const [calendarEventIdToUpdate, setCalendarEventIdToUpdate] = useState<string | undefined>(
        undefined,
    );

    const [showUpdateRecurringEventDialog, setShowUpdateRecurringEventDialog] = useState(false);
    const [recurringEventIdToUpdate, setRecurringEventIdToUpdate] = useState<string | undefined>(
        undefined,
    );
    const [occurrenceStartDateTimeToUpdate, setOccurrenceStartDateTimeToUpdate] = useState<
        Date | undefined
    >(undefined);

    const fetchEventsFnWrapper = async (p: Period) => {
        setLoading(true);
        setError(undefined);

        const fetchEvents = async () => {
            const startTime = Date.now();
            const minExecutionTime = 500; // prevent flickering on large components
            const events = await getEventsBetween(p.start, p.end, calendarGroupIds);
            const elapsedTime = Date.now() - startTime;
            const remainingTime = Math.max(0, minExecutionTime - elapsedTime);
            await new Promise((resolve) => setTimeout(resolve, remainingTime));

            setEvents(events);
            setError(undefined);
        };

        fetchEvents()
            .catch((e) => {
                console.error('Error fetching calendar events:', e);
                setError(t('fetch-error'));
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchEventsFnWrapper(period);
    }, [period, calendarGroupIds]);

    const onCalendarEventClick: CalendarEventClickFn = async (event) => {
        const parsed = parseId(event.id);
        if (parsed.isRecurring) {
            setRecurringEventIdToUpdate(parsed.id);
            setOccurrenceStartDateTimeToUpdate(parsed.occurrenceStartDateTime);
            setShowUpdateRecurringEventDialog(true);
        } else {
            setCalendarEventIdToUpdate(parsed.id);
            setShowUpdateEventDialog(true);
        }
    };

    const onEmptySpaceClick: EmptySpaceClickFn = async (date) => {
        setCreateEventDefaultStartDate(date);
        setShowCreateEventDialog(true);
    };

    const cleanupOnFinishMutation = () => {
        setShowCreateEventDialog(false);
        setShowUpdateEventDialog(false);
        setShowUpdateRecurringEventDialog(false);
        setCreateEventDefaultStartDate(undefined);
        setCalendarEventIdToUpdate(undefined);
        setRecurringEventIdToUpdate(undefined);
        setOccurrenceStartDateTimeToUpdate(undefined);
        fetchEventsFnWrapper(period);
    };

    return (
        <div className="relative">
            <Calendar
                events={events}
                onCalendarEventClick={onCalendarEventClick}
                onEmptySpaceClick={onEmptySpaceClick}
                period={period}
                type={type}
                timezone={timezone}
                locale={locale}
                loading={loading}
                error={fetchError}
            />

            <CreateCalendarEventDialog
                open={showCreateEventDialog}
                onOpenChange={setShowCreateEventDialog}
                defaultStartDateTime={createEventDefaultStartDate || undefined}
                timezone={timezone}
                onFinish={cleanupOnFinishMutation}
            />

            <UpdateCalendarEventDialog
                open={showUpdateEventDialog}
                onOpenChange={setShowUpdateEventDialog}
                calendarEventId={calendarEventIdToUpdate}
                timezone={timezone}
                onFinish={cleanupOnFinishMutation}
            />

            <UpdateRecurringCalendarEventDialog
                open={showUpdateRecurringEventDialog}
                onOpenChange={setShowUpdateRecurringEventDialog}
                recurringCalendarEventId={recurringEventIdToUpdate}
                timezone={timezone}
                onFinish={cleanupOnFinishMutation}
                occurrenceStartDateTimeToUpdate={occurrenceStartDateTimeToUpdate}
            />
        </div>
    );
}

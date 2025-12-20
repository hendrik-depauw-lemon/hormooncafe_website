'use client';

import { ErrorOverlay } from '../../atoms/ErrorOverlay';
import { LoadingOverlay } from '../../atoms/LoadingOverlay';
import { CalendarEventTable } from './calendar-event-table/CalendarEventTable';
import {
    CalendarEvent,
    CalendarEventClickFn,
    EmptySpaceClickFn,
    Period,
    PeriodType,
} from './calendar-types';
import { DayCalendar } from './day-calendar/DayCalendar';
import { WeekCalendar } from './week-calendar/WeekCalendar';

interface CalendarProps {
    events: CalendarEvent[];
    onCalendarEventClick: CalendarEventClickFn;
    onEmptySpaceClick: EmptySpaceClickFn;
    period: Period;
    type: PeriodType;
    timezone: string;
    locale: string;
    clickableBlocksPerHour?: number;
    loading?: boolean;
    error?: string;
}

export function Calendar({
    events,
    onCalendarEventClick,
    onEmptySpaceClick,
    clickableBlocksPerHour,
    period,
    type,
    timezone,
    locale,
    loading,
    error,
}: CalendarProps) {
    return (
        <div className="relative">
            {error && <ErrorOverlay message={error} />}
            {loading && <LoadingOverlay />}
            {type === 'day' && (
                <DayCalendar
                    startOfDay={period.start}
                    size="small"
                    events={events}
                    timezone={timezone}
                    locale={locale}
                    onCalendarEventClick={onCalendarEventClick}
                    onEmptySpaceClick={onEmptySpaceClick}
                    clickableBlocksPerHour={clickableBlocksPerHour}
                />
            )}
            {type === 'week' && (
                <WeekCalendar
                    startOfWeek={period.start}
                    size="small"
                    events={events}
                    timezone={timezone}
                    locale={locale}
                    onCalendarEventClick={onCalendarEventClick}
                    onEmptySpaceClick={onEmptySpaceClick}
                    clickableBlocksPerHour={clickableBlocksPerHour}
                />
            )}
            {type === 'month' && (
                <CalendarEventTable
                    events={events.sort(
                        (a, b) => a.startDateTime.getTime() - b.startDateTime.getTime(),
                    )}
                />
            )}
        </div>
    );
}

import { addDays } from 'date-fns';

import { CalendarEvent, CalendarEventClickFn, EmptySpaceClickFn } from '../calendar-types';
import { DayCalendar } from '../day-calendar/DayCalendar';
import { DayCalendarTimeLabels } from '../day-calendar/DayCalendarTimeLabels';

interface WeekCalendarProps {
    timezone: string;
    locale: string;
    startOfWeek: Date;
    events: CalendarEvent[];
    onCalendarEventClick: CalendarEventClickFn;
    onEmptySpaceClick: EmptySpaceClickFn;
    size?: 'small' | 'medium' | 'large';
    clickableBlocksPerHour?: number;
}

export function WeekCalendar({
    timezone,
    locale,
    startOfWeek,
    events,
    onCalendarEventClick,
    onEmptySpaceClick,
    size = 'small',
    clickableBlocksPerHour,
}: WeekCalendarProps) {
    const startsOfDays = Array.from({ length: 7 }, (_, index) => {
        return addDays(startOfWeek, index);
    });

    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-row w-full">
                <DayCalendarTimeLabels locale={locale} addSpacingForHeader={true} />
                <div className="flex-1 grid grid-cols-7 divide-x divide-muted">
                    {startsOfDays.map((startOfDay) => (
                        <DayCalendar
                            key={startOfDay.getTime()}
                            startOfDay={startOfDay}
                            hideTimeLabels={true}
                            showHeader={true}
                            events={events}
                            size={size}
                            timezone={timezone}
                            locale={locale}
                            onCalendarEventClick={onCalendarEventClick}
                            onEmptySpaceClick={onEmptySpaceClick}
                            clickableBlocksPerHour={clickableBlocksPerHour}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

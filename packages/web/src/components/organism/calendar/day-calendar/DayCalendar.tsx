import { CalendarEvent, CalendarEventClickFn, EmptySpaceClickFn } from '../calendar-types';
import { DayCalendarBlocks } from './DayCalendarBlocks';
import { DayCalendarEmptyEventRows } from './DayCalendarEmptyEventRows';
import { DayCalendarEvents } from './DayCalendarEvents';
import { DayCalendarHeader } from './DayCalendarHeader';
import { DayCalendarTimeLabels } from './DayCalendarTimeLabels';

interface DayCalendarProps {
    timezone: string;
    locale: string;
    startOfDay: Date;
    events: CalendarEvent[];
    onCalendarEventClick: CalendarEventClickFn;
    onEmptySpaceClick: EmptySpaceClickFn;
    clickableBlocksPerHour?: number;
    hideTimeLabels?: boolean;
    showHeader?: boolean;
    size?: 'small' | 'medium' | 'large';
}

export function DayCalendar({
    timezone,
    locale,
    startOfDay,
    events,
    onEmptySpaceClick,
    onCalendarEventClick,
    clickableBlocksPerHour,
    hideTimeLabels = false,
    showHeader = false,
    size = 'medium',
}: DayCalendarProps) {
    return (
        <div className={`flex h-full flex-col`}>
            {showHeader && (
                <DayCalendarHeader startOfDay={startOfDay} timezone={timezone} locale={locale} />
            )}
            <div className="isolate flex flex-auto overflow-hidden bg-background">
                <div className="flex flex-row w-full flex-auto overflow-hidden">
                    {!hideTimeLabels && <DayCalendarTimeLabels locale={locale} />}
                    <div className="grid flex-auto grid-cols-1 grid-rows-1">
                        <DayCalendarBlocks calendarSize={size} />
                        <DayCalendarEmptyEventRows
                            startOfDay={startOfDay}
                            onEmptySpaceClick={onEmptySpaceClick}
                            clickableBlocksPerHour={clickableBlocksPerHour}
                        />
                        <DayCalendarEvents
                            startOfDay={startOfDay}
                            events={events}
                            timezone={timezone}
                            onCalendarEventClick={onCalendarEventClick}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

import { Muted } from '../../../atoms/typography/Muted';

interface DayCalendarHeaderProps {
    startOfDay: Date;
    timezone: string;
    locale: string;
}

export function DayCalendarHeader({ startOfDay, timezone, locale }: DayCalendarHeaderProps) {
    return (
        <div className="bg-muted text-center h-7 text-sm font-bold flex items-center justify-center">
            <Muted>
                {startOfDay.toLocaleDateString(locale, {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                    timeZone: timezone,
                })}
            </Muted>
        </div>
    );
}

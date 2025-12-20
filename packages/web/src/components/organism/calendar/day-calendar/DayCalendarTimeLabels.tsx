import { useMemo } from 'react';

import { cn } from '../../../../shadcn/lib/utils';

interface DayCalendarTimeLabelsProps {
    locale: string;
    addSpacingForHeader?: boolean;
}

export function DayCalendarTimeLabels({
    locale,
    addSpacingForHeader = false,
}: DayCalendarTimeLabelsProps) {
    const timeLabels = useMemo(() => {
        // Detect if the locale uses 12-hour format by testing a time
        const testTime = Date.UTC(1970, 0, 1, 14, 0, 0); // 2 PM
        const testFormat = new Intl.DateTimeFormat(locale, {
            hour: 'numeric',
            timeZone: 'UTC',
        }).format(testTime);

        // If the formatted time contains 'PM' or 'AM', it's a 12-hour format locale
        const uses12Hour = /\b(AM|PM|am|pm)\b/.test(testFormat);

        return Array.from({ length: 24 }, (_, hour) => {
            const time = Date.UTC(1970, 0, 1, hour, 0, 0);

            // Format time according to the user's locale preferences
            return new Intl.DateTimeFormat(locale, {
                hour: 'numeric',
                hour12: uses12Hour,
                timeZone: 'UTC',
            }).format(time);
        });
    }, [locale]);

    return (
        <div className="relative w-14 flex-none bg-background border-r-1 border-muted">
            {addSpacingForHeader && <div className="h-7 bg-muted" />}
            <div
                className={cn(
                    'absolute left-0 right-0 bottom-0',
                    addSpacingForHeader ? 'top-11' : 'top-4',
                )}
            >
                {timeLabels.map((label, index) => (
                    <div
                        key={`time-${index}`}
                        className="absolute text-xs leading-5 text-muted-foreground pr-2 text-right w-full"
                        style={{
                            top: `${(index / 24) * 100}%`,
                            transform: 'translateY(-50%)',
                        }}
                    >
                        {label}
                    </div>
                ))}
            </div>
        </div>
    );
}

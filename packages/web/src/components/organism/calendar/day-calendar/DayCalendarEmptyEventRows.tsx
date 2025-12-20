import { EmptySpaceClickFn } from '../calendar-types';

interface DayCalendarEventsProps {
    startOfDay: Date;
    onEmptySpaceClick: EmptySpaceClickFn;
    clickableBlocksPerHour?: number;
}

export function DayCalendarEmptyEventRows({
    startOfDay,
    onEmptySpaceClick,
    clickableBlocksPerHour = 4,
}: DayCalendarEventsProps) {
    const gridRowsInterval = 60 / clickableBlocksPerHour;
    const minutesInDay = 24 * 60;
    const totalGridRows = minutesInDay / gridRowsInterval;

    const handleSlotClick = (gridRow: number) => {
        const minuteOffset = gridRow * gridRowsInterval;
        const slotStartTime = new Date(startOfDay.getTime() + minuteOffset * 60 * 1000);
        onEmptySpaceClick(slotStartTime);
    };

    const handleKeyDown = (event: React.KeyboardEvent, gridRow: number) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleSlotClick(gridRow);
        }
    };

    return (
        <div
            style={{
                gridTemplateRows: `1rem repeat(${totalGridRows}, minmax(0, 1fr))`,
            }}
            className="col-start-1 col-end-2 row-start-1 grid grid-cols-1"
        >
            {Array.from({ length: totalGridRows }).map((_, index) => (
                <div
                    key={index}
                    role="button"
                    tabIndex={0}
                    style={{ gridRow: `${index + 2}` }}
                    onClick={handleSlotClick.bind(null, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="cursor-default"
                />
            ))}
        </div>
    );
}

/* eslint-disable jsx-a11y/anchor-is-valid */

import { differenceInMinutes } from 'date-fns';
import { useMemo } from 'react';

import { cn } from '../../../../shadcn/lib/utils';
import { formatTime } from '../../../../utils/formatDate';
import { CalendarEvent, CalendarEventClickFn } from '../calendar-types';

const minutesInDay = 24 * 60;
const gridRowsInterval = 1;
const totalGridRows = minutesInDay / gridRowsInterval; // Event can start at any minute of the day
const remSpacingAroundEvent = '0.125';

const defaultEventTextColor = '#1E40AF';

interface DayCalendarEventsProps {
    /**
     * The timestamp on which the day starts in the required timezone
     */
    startOfDay: Date;
    events: CalendarEvent[];
    timezone: string;
    onCalendarEventClick: CalendarEventClickFn;
}

type DayCalendarEventsGridItem = {
    calendarEvent: CalendarEvent;
    color: string;
    backgroundColor: string;
    startGridRow: number;
    endGridRow: number;
    widthPercentage: number;
    leftPercentage: number;
};

export function DayCalendarEvents({
    startOfDay,
    events,
    timezone,
    onCalendarEventClick,
}: DayCalendarEventsProps) {
    const eventsWithGridPositions = useMemo<DayCalendarEventsGridItem[]>(() => {
        const gridItems: DayCalendarEventsGridItem[] = [];

        // Create grid items for each event, with calculate grid rows, columns are handled afterwards
        for (const event of events) {
            const gridPosition = calculateGridStartAndGridEnd(
                startOfDay,
                event.startDateTime,
                event.endDateTime,
            );
            if (!gridPosition) continue;

            gridItems.push({
                calendarEvent: event,
                startGridRow: gridPosition.startGridRow,
                endGridRow: gridPosition.endGridRow,
                color: event.color || defaultEventTextColor,
                backgroundColor: generateContrastBackgroundColor(
                    event.color || defaultEventTextColor,
                ),
                widthPercentage: 100,
                leftPercentage: 0,
            });
        }

        const sortedGridItems = gridItems.toSorted((a, b) => a.startGridRow - b.startGridRow);
        const finalGridItems: DayCalendarEventsGridItem[] = [];

        // Handle overlapping events by grouping them and assigning columns
        let currentGroup:
            | {
                  groupStart: Date;
                  groupEnd: Date;
                  columnedGridItems: DayCalendarEventsGridItem[][];
              }
            | undefined = undefined;

        const handleAndInsertCurrentGroup = () => {
            if (!currentGroup) return;
            const widthPercentage = 100 / currentGroup.columnedGridItems.length;
            for (const column of currentGroup.columnedGridItems) {
                const columnIndex = currentGroup.columnedGridItems.indexOf(column);
                for (const gridItem of column) {
                    finalGridItems.push({
                        ...gridItem,
                        widthPercentage,
                        leftPercentage: columnIndex * widthPercentage,
                    });
                }
            }
            currentGroup = undefined;
        };

        for (const gridItem of sortedGridItems) {
            if (!currentGroup) {
                // start new group
                currentGroup = {
                    groupStart: gridItem.calendarEvent.startDateTime,
                    groupEnd: gridItem.calendarEvent.endDateTime,
                    columnedGridItems: [[gridItem]],
                };
                continue;
            }

            if (gridItem.calendarEvent.startDateTime >= currentGroup.groupEnd) {
                // finalize current group
                handleAndInsertCurrentGroup();
                // start new group
                currentGroup = {
                    groupStart: gridItem.calendarEvent.startDateTime,
                    groupEnd: gridItem.calendarEvent.endDateTime,
                    columnedGridItems: [[gridItem]],
                };
                continue;
            }

            // In the current group, find a column where there are no other events that overlap
            let placed = false;
            for (const column of currentGroup.columnedGridItems) {
                // find event with overlap
                const hasOverlappingEvent = column.some((existingGridItem) => {
                    return !(
                        gridItem.calendarEvent.endDateTime <=
                            existingGridItem.calendarEvent.startDateTime ||
                        gridItem.calendarEvent.startDateTime >=
                            existingGridItem.calendarEvent.endDateTime
                    );
                });
                if (!hasOverlappingEvent) {
                    // place in this column
                    column.push(gridItem);
                    placed = true;
                    break;
                }
            }
            // if no column was found, create a new one
            if (!placed) {
                // Need to create a new column
                currentGroup.columnedGridItems.push([gridItem]);
            }
            // Update group end time
            if (gridItem.calendarEvent.endDateTime > currentGroup.groupEnd) {
                currentGroup.groupEnd = gridItem.calendarEvent.endDateTime;
            }
        }
        // finalize the last group
        handleAndInsertCurrentGroup();

        return finalGridItems;
    }, [events, startOfDay]);

    return (
        <ol
            style={{
                gridTemplateRows: `1rem repeat(${totalGridRows}, minmax(0, 1fr)) auto`,
            }}
            className="col-start-1 col-end-2 row-start-1 grid grid-cols-1 pointer-events-none"
        >
            {eventsWithGridPositions.map((gridItem, index) => {
                return (
                    <li
                        key={index}
                        style={{
                            gridRowStart: gridItem.startGridRow,
                            gridRowEnd: gridItem.endGridRow,
                            gridColumnStart: 1,
                            gridColumnEnd: 2,
                            color: gridItem.color,
                            backgroundColor: gridItem.backgroundColor,
                            width: `calc(${gridItem.widthPercentage}% - 2 * ${remSpacingAroundEvent}rem)`,
                            marginTop: `${remSpacingAroundEvent}rem`,
                            marginBottom: `${remSpacingAroundEvent}rem`,
                            marginRight: `${remSpacingAroundEvent}rem`,
                            marginLeft: `calc(${gridItem.leftPercentage}% + ${remSpacingAroundEvent}rem)`,
                        }}
                        className={cn(`relative flex rounded-lg pointer-events-auto`)}
                    >
                        <div
                            role="button"
                            tabIndex={0}
                            onClick={() => onCalendarEventClick(gridItem.calendarEvent)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    onCalendarEventClick(gridItem.calendarEvent);
                                }
                            }}
                            className="absolute inset-1 group flex flex-col overflow-y-auto rounded-lg text-xs/5 break-words [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                        >
                            <p>
                                <time dateTime={gridItem.calendarEvent.startDateTime.toISOString()}>
                                    {formatTime(gridItem.calendarEvent.startDateTime, timezone)}
                                </time>
                                {' | '}
                                <strong>{gridItem.calendarEvent.title}</strong>
                            </p>
                            {gridItem.calendarEvent.description && (
                                <p>{gridItem.calendarEvent.description}</p>
                            )}
                        </div>
                    </li>
                );
            })}
        </ol>
    );
}

const generateContrastBackgroundColor = (textColor: string) => {
    return `${textColor}10`; // 10 in hex = ~6% opacity for lighter colors
};

const calculateGridStartAndGridEnd = (
    startOfDay: Date,
    startDateTime: Date,
    endDateTime: Date,
): { startGridRow: number; endGridRow: number } | undefined => {
    const minutesBetweenStartOfDayAndStart = differenceInMinutes(startDateTime, startOfDay);
    const minutesBetweenStartOfDayAndEnd = differenceInMinutes(endDateTime, startOfDay);

    // if event starts after end of day, return undefined
    if (minutesBetweenStartOfDayAndStart >= minutesInDay) return undefined;
    // if event ends before start of day, return undefined
    if (minutesBetweenStartOfDayAndEnd <= 0) return undefined;

    return {
        // +2 to account for the first row counting as padding and the grid starting at 1
        startGridRow: Math.max(0, minutesBetweenStartOfDayAndStart) / gridRowsInterval + 2,
        endGridRow: Math.min(minutesInDay, minutesBetweenStartOfDayAndEnd) / gridRowsInterval + 2,
    };
};

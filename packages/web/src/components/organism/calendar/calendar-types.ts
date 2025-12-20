export interface CalendarEvent {
    id: string;
    startDateTime: Date;
    endDateTime: Date;
    title: string;
    description: string | undefined;
    color: string | undefined;
}

export type Period = { start: Date; end: Date };
export type PeriodType = 'day' | 'week' | 'month';
export type CalendarEventClickFn = (event: CalendarEvent) => void;
export type EmptySpaceClickFn = (date: Date) => void;

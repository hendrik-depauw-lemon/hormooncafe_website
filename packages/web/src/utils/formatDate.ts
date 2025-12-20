import { format, formatInTimeZone } from 'date-fns-tz';

export const formatDate = (date?: Date): string =>
    date && isValidDate(date) ? format(date, 'dd/MM/yyyy') : '';

export const formatTime = (date?: Date, tz?: string): string =>
    date && isValidDate(date)
        ? tz
            ? formatInTimeZone(date, tz, 'HH:mm')
            : format(date, 'HH:mm')
        : '';

export const formatDateTime = (date?: Date | null): string =>
    date && isValidDate(date) ? format(date, 'dd/MM/yyyy HH:mm') : '';

export const formatDateTimeSeconds = (date?: Date | null): string =>
    date && isValidDate(date) ? format(date, 'dd/MM/yyyy HH:mm:ss ') : '';

const isValidDate = (date: Date) => {
    return date instanceof Date && !isNaN(date.getTime());
};

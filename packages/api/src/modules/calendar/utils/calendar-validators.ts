import { EndDateTimeBeforeStartDateTimeError } from '../errors/end-date-time-before-start-date-time.error';

export class CalendarValidators {
    static endDateTimeIsAfterStartDateTime(startDateTime: Date, endDateTime: Date): void {
        if (endDateTime.getTime() <= startDateTime.getTime()) {
            throw new EndDateTimeBeforeStartDateTimeError();
        }
    }
}

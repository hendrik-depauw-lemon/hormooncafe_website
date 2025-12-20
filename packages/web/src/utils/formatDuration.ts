import { formatDuration as formatFnsDuration, intervalToDuration } from 'date-fns';
import { nlBE } from 'date-fns/locale';

export const formatDuration = (durationInSeconds: number): string =>
    formatFnsDuration(
        intervalToDuration({
            start: 0,
            end: 1000 * durationInSeconds,
        }),
        { locale: nlBE, delimiter: ', ', zero: false },
    );

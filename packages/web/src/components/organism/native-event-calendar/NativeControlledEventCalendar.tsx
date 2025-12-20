'use client';

import useLocale from '../../../hooks/useLocale';
import { useTimeZone } from '../../../i18n/useTimezone';
import { CalendarController } from '../calendar/CalendarController';
import { NativeEventCalendar } from './NativeEventCalendar';

interface NativeControlledEventCalendarProps {
    timezone?: string;
    locale?: string;
}

export function NativeControlledEventCalendar({
    timezone: timezoneInput,
    locale: localeInput,
}: NativeControlledEventCalendarProps) {
    const localTimezone = useTimeZone();
    const timezone = timezoneInput || localTimezone;
    const localLocale = useLocale();
    const locale = localeInput || localLocale;

    return (
        <CalendarController
            defaultPeriodType={'day'}
            showPeriodTypeSelector={true}
            showSelectorIcons={true}
            timezone={timezone}
            locale={locale}
            renderDetail={(period, calendarGroupIds, type, tz, loc) => {
                return (
                    <NativeEventCalendar
                        period={period}
                        calendarGroupIds={calendarGroupIds}
                        type={type}
                        timezone={tz}
                        locale={loc}
                    />
                );
            }}
        />
    );
}

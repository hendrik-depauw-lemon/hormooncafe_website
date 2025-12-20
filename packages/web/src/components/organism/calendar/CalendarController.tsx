'use client';

import { RectangleVertical, Rows2, Rows4 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { DatePicker } from '../../../shadcn/components/ui/date-picker';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../shadcn/components/ui/tabs';
import { Muted } from '../../atoms/typography/Muted';
import { CalendarGroupComboBoxMultiWithQuery } from '../combo-box/calendar-group/CalendarGroupComboBoxMultiWithQuery';
import { Period, PeriodType } from './calendar-types';
import { PeriodCarouselDay } from './period-carousel-day/PeriodCarouselDay';
import { PeriodCarouselMonth } from './period-carousel-month/PeriodCarouselMonth';
import { PeriodCarouselWeek } from './period-carousel-week/PeriodCarouselWeek';

export interface CalendarControllerProps {
    timezone: string;
    locale: string;
    hideTimezoneAndLocale?: boolean;
    hideCalendarGroupSelector?: boolean;
    defaultPeriodType?: PeriodType;
    showPeriodTypeSelector?: boolean;
    showSelectorIcons?: boolean;
    renderDetail: (
        period: Period,
        calendarGroupIds: string[],
        type: PeriodType,
        timezone: string,
        locale: string,
    ) => React.ReactNode;
}

export const CalendarController = ({
    timezone,
    locale,
    hideTimezoneAndLocale = false,
    hideCalendarGroupSelector = false,
    defaultPeriodType,
    showPeriodTypeSelector,
    showSelectorIcons,
    renderDetail,
}: CalendarControllerProps) => {
    const t = useTranslations('common.period-type-selector');

    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [periodType, setPeriodType] = useState<PeriodType>(defaultPeriodType ?? 'day');
    const [calendarPeriod, setCalendarPeriod] = useState<Period | null>(null);
    const [selectedCalendarGroupIds, setSelectedCalendarGroupIds] = useState<string[]>([]);

    const onPeriodChange = (period: Period) => {
        setCalendarPeriod(period);
        setSelectedDate(period.start);
    };

    const onSelectedDateChange = (date: Date | undefined) => {
        setSelectedDate(date ?? new Date());
    };

    useEffect(() => {
        setCalendarPeriod(null);
    }, [periodType]);

    return (
        <div className="flex flex-col">
            <Tabs
                defaultValue={periodType}
                onValueChange={(period) => setPeriodType(period as PeriodType)}
            >
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="flex flex-col sm:flex-row gap-4 items-center">
                        <DatePicker
                            showAsDropdown={true}
                            dateFormat="dd MMMM yyyy"
                            date={selectedDate}
                            onDateChange={onSelectedDateChange}
                            className="w-fit px-4 py-2 border rounded-lg"
                            timezone={timezone}
                        />
                        {!hideTimezoneAndLocale && (
                            <Muted>
                                {timezone} | {locale}
                            </Muted>
                        )}
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        {!hideCalendarGroupSelector && (
                            <div>
                                <CalendarGroupComboBoxMultiWithQuery
                                    value={selectedCalendarGroupIds}
                                    onChange={setSelectedCalendarGroupIds}
                                    hideBadges
                                    showAmountBadge
                                />
                            </div>
                        )}
                        {showPeriodTypeSelector && (
                            <TabsList>
                                <TabsTrigger value="day">
                                    {showSelectorIcons ? <RectangleVertical /> : t('day')}
                                </TabsTrigger>
                                <TabsTrigger value="week">
                                    {showSelectorIcons ? <Rows2 /> : t('week')}
                                </TabsTrigger>
                                <TabsTrigger value="month">
                                    {showSelectorIcons ? <Rows4 /> : t('month')}
                                </TabsTrigger>
                            </TabsList>
                        )}
                    </div>
                </div>
                <TabsContent value="day">
                    <PeriodCarouselDay
                        timezone={timezone}
                        selectedDate={selectedDate ?? new Date()}
                        calendarPeriod={calendarPeriod}
                        onPeriodChange={onPeriodChange}
                    />
                </TabsContent>
                <TabsContent value="week">
                    <PeriodCarouselWeek
                        timezone={timezone}
                        selectedDate={selectedDate ?? new Date()}
                        calendarPeriod={calendarPeriod}
                        onPeriodChange={onPeriodChange}
                    />
                </TabsContent>
                <TabsContent value="month">
                    <PeriodCarouselMonth
                        timezone={timezone}
                        selectedDate={selectedDate ?? new Date()}
                        calendarPeriod={calendarPeriod}
                        onPeriodChange={onPeriodChange}
                    />
                </TabsContent>
            </Tabs>

            <div>
                {calendarPeriod &&
                    renderDetail(
                        calendarPeriod,
                        selectedCalendarGroupIds,
                        periodType,
                        timezone,
                        locale,
                    )}
            </div>
        </div>
    );
};

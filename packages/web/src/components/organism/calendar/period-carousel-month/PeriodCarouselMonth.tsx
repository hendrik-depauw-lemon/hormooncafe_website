import { addMonths, endOfDay, endOfMonth, startOfDay, startOfMonth } from 'date-fns';
import { fromZonedTime } from 'date-fns-tz';
import { useEffect, useState } from 'react';

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '../../../../shadcn/components/ui/carousel';
import { Period } from '../calendar-types';
import { CarouselPeriodMonthItem } from './PeriodCarouselMonthItem';

type PeriodCarouselMonthProps = {
    timezone: string;
    selectedDate: Date;
    calendarPeriod: Period | null;
    onPeriodChange: (period: Period) => void;
};

export function PeriodCarouselMonth({
    timezone,
    selectedDate,
    calendarPeriod,
    onPeriodChange,
}: Readonly<PeriodCarouselMonthProps>) {
    const generateMonths = (date: Date): Period[] => {
        const months: Period[] = [];
        for (let i = -7; i <= 7; i++) {
            const month = addMonths(date, i);
            const start = startOfMonth(startOfDay(month));
            const end = endOfMonth(endOfDay(month));
            const zonedStart = fromZonedTime(start, timezone);
            const zonedEnd = fromZonedTime(end, timezone);
            months.push({ start: zonedStart, end: zonedEnd });
        }
        return months;
    };

    const [slides, setSlides] = useState<Period[]>([]);

    useEffect(() => {
        const newSlides = generateMonths(selectedDate);
        setSlides(newSlides);

        // Select the middle period on initial load if none is selected
        // OR when the selected calendarPeriod is not the middle slide
        if (!calendarPeriod || calendarPeriod.start.getTime() !== newSlides[7].start.getTime()) {
            onPeriodChange({ start: newSlides[7].start, end: newSlides[7].end });
        }
    }, [selectedDate, calendarPeriod]);

    const loadPrev = () => {
        onPeriodChange({ start: slides[6].start, end: slides[6].end });
    };

    const loadNext = () => {
        onPeriodChange({ start: slides[8].start, end: slides[8].end });
    };

    return (
        <>
            {slides.length > 0 && (
                <Carousel
                    opts={{
                        dragFree: false,
                        containScroll: 'keepSnaps',
                        slidesToScroll: 1,
                        align: 'center',
                        watchResize: false,
                        watchSlides: true,
                        startIndex: 7,
                    }}
                    className="relative pb-9"
                >
                    <CarouselContent className="-ml-2 mb-5 mt-2">
                        {slides.map((period) => (
                            <CarouselItem
                                key={period.start.toISOString()}
                                className="basis-1/7 lg:basis-1/11 xl:basis-1/15 pl-2 py-1"
                            >
                                <CarouselPeriodMonthItem
                                    data={period}
                                    selected={
                                        period.start.getTime() === calendarPeriod?.start.getTime()
                                    }
                                    onPeriodSelect={onPeriodChange}
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious
                        className="absolute left-auto right-10 mt-9"
                        onClick={loadPrev}
                    />
                    <CarouselNext className="absolute left-auto right-0 mt-9" onClick={loadNext} />
                </Carousel>
            )}
        </>
    );
}

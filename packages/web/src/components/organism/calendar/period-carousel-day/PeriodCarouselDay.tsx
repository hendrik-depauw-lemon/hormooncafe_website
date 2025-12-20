import { addDays, endOfDay, startOfDay } from 'date-fns';
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
import { CarouselPeriodDayItem } from './PeriodCarouselDayItem';

type PeriodCarouselDayProps = {
    timezone: string;
    selectedDate: Date;
    calendarPeriod: Period | null;
    onPeriodChange: (period: Period) => void;
};

export function PeriodCarouselDay({
    timezone,
    selectedDate,
    calendarPeriod,
    onPeriodChange,
}: Readonly<PeriodCarouselDayProps>) {
    const generateDays = (date: Date): Period[] => {
        const days: Period[] = [];
        for (let i = -7; i <= 7; i++) {
            const day = addDays(date, i);
            const start = startOfDay(day);
            const end = endOfDay(day);
            const zonedStart = fromZonedTime(start, timezone);
            const zonedEnd = fromZonedTime(end, timezone);
            days.push({ start: zonedStart, end: zonedEnd });
        }
        return days;
    };

    const [slides, setSlides] = useState<Period[]>([]);

    useEffect(() => {
        const newSlides = generateDays(selectedDate);
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
                    <CarouselContent className="-ml-2 mb-5 mt-2 ">
                        {slides.map((period) => (
                            <CarouselItem
                                key={period.start.getTime()}
                                className="basis-1/7 lg:basis-1/11 xl:basis-1/15 pl-2 py-1"
                            >
                                <CarouselPeriodDayItem
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

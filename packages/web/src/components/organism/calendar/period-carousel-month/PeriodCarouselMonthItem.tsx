import { format } from 'date-fns-tz';

import { Button } from '../../../../shadcn/components/ui/button';
import { cn } from '../../../../shadcn/lib/utils';
import { Period } from '../calendar-types';

export interface CarouselPeriodMonthItemProps {
    data: Period;
    onPeriodSelect: (period: Period) => void;
    selected?: boolean;
}
export const CarouselPeriodMonthItem = ({
    data,
    selected,
    onPeriodSelect,
}: CarouselPeriodMonthItemProps) => {
    return (
        <Button
            className={cn(
                'flex flex-col items-center justify-center p-2 rounded-lg h-fit w-full transition-all gap-0',
                selected
                    ? 'bg-primary hover:bg-primary/80 m-0 h-full scale-105 my-0'
                    : 'bg-accent hover:bg-accent/70 my-2',
            )}
            onClick={() => onPeriodSelect(data)}
        >
            <p className="text-base">{format(data.start, 'MMM')}</p>
            <span className="text-[10px]">{format(data.start, 'yyyy')}</span>
        </Button>
    );
};

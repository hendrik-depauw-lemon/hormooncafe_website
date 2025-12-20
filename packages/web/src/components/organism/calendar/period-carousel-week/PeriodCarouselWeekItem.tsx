import { getISOWeek } from 'date-fns';
import { useTranslations } from 'next-intl';

import { Button } from '../../../../shadcn/components/ui/button';
import { cn } from '../../../../shadcn/lib/utils';
import { Period } from '../calendar-types';

export interface CarouselPeriodWeekItemProps {
    data: Period;
    onPeriodSelect: (period: Period) => void;
    selected?: boolean;
}
export const CarouselPeriodWeekItem = ({
    data,
    selected,
    onPeriodSelect,
}: CarouselPeriodWeekItemProps) => {
    const t = useTranslations('common.period-type-selector');

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
            <p className="text-base">{getISOWeek(data.start)}</p>
            <span className="text-[10px]">{t('week')}</span>
        </Button>
    );
};

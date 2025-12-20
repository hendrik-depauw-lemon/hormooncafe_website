import { DateRange } from 'react-day-picker';

import { Calendar } from '../../../../shadcn/components/ui/calendar';
import { formatDate } from '../../../../utils/formatDate';
import { FilterInputProps } from './FilterInput';

export function DateRangeInput({
    value,
    onChange,
    onFinished,
}: Omit<FilterInputProps, 'filterModel' | 'filterOperation'>) {
    return (
        <Calendar
            className="w-full"
            mode="range"
            selected={value as DateRange | undefined}
            captionLayout="dropdown"
            onSelect={(date) => {
                onChange(date, formatDate(date?.from) + ' - ' + formatDate(date?.to));
                if (date?.to) onFinished();
            }}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
        />
    );
}

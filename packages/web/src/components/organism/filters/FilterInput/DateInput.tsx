import { Calendar } from '../../../../shadcn/components/ui/calendar';
import { formatDate } from '../../../../utils/formatDate';
import { FilterInputProps } from './FilterInput';

export function DateInput({
    value,
    onChange,
    onFinished,
}: Omit<FilterInputProps, 'filterModel' | 'filterOperation'>) {
    return (
        <Calendar
            className="w-full"
            mode="single"
            selected={value as Date | undefined}
            captionLayout="dropdown"
            onSelect={(date) => {
                onChange(date, formatDate(date));
                onFinished();
            }}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
        />
    );
}
